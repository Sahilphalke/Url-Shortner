import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UrlShortenerForm from './components/UrlShortenerForm';
import StatsDashboard from './components/StatsDashboard';
import RecentLinks from './components/RecentLinks';
import AuthModal from './components/AuthModal';
import { api } from './utils/api';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';

import { Toaster, toast } from 'sonner';

function AppContent() {
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0, activeToday: 0 });
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, token } = useAuth();

  const fetchData = useCallback(async (isSilent = false) => {
    if (!isAuthenticated) return;

    if (!isSilent) setLoading(true);
    try {
      const [statsRes, linksRes] = await Promise.all([
        api.getStats(),
        api.getUrls()
      ]);
      setStats(statsRes.data);
      setLinks(linksRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      // Only show error toast if not a silent background update
      if (!isSilent) toast.error("Failed to load data");
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
        Promise.resolve().then(() => {
            setStats({ totalLinks: 0, totalClicks: 0, activeToday: 0 });
            setLinks([]);
        });
        return;
    }
    Promise.resolve().then(() => {
        fetchData();
    });

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchData(true);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [fetchData, isAuthenticated, token]);

  const handleUrlCreated = () => {
    fetchData(); 
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all your links?")) {
      try {
        await api.clearUrls();
        toast.success("All links cleared successfully!");
        fetchData();
      } catch (err) {
        toast.error(err.message || "Failed to clear links");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-accent selection:text-black">
      <Toaster theme="dark" position="top-right" richColors />
      <div className="container mx-auto max-w-6xl pb-10">
        <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
        <Hero />
        <UrlShortenerForm 
          onUrlCreated={handleUrlCreated} 
          onAuthRequired={() => setIsAuthModalOpen(true)} 
        />
        <StatsDashboard stats={stats} loading={loading} />
        <RecentLinks 
          links={links} 
          loading={loading} 
          onClearAll={handleClearAll}
          onRefresh={() => fetchData(true)} 
        />
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
