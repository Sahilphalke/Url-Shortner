import { useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import { toast } from 'sonner';

const UrlShortenerForm = ({ onUrlCreated, onAuthRequired }) => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [useAlias, setUseAlias] = useState(false);
  const [useExpiry, setUseExpiry] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    setLoading(true);

    try {
      const payload = { originalUrl: url };
      if (useAlias && customAlias) payload.customAlias = customAlias;
      if (useExpiry) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        payload.expiresAt = expiryDate.toISOString();
      }

      await api.createUrl(payload);
      toast.success("URL shortened successfully!");
      setUrl('');
      setCustomAlias('');
      onUrlCreated();
    } catch (err) {
      toast.error(err.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mb-8">
      <form onSubmit={handleSubmit} className="bg-[#242424] p-4 sm:p-6 rounded-xl border border-gray-800 relative overflow-hidden">
        {!isAuthenticated && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="bg-[#1a1a1a] border border-gray-800 px-6 py-4 rounded-xl shadow-2xl text-center">
              <p className="text-sm font-medium mb-3">Please sign in to shorten URLs</p>
              <button 
                type="button"
                onClick={onAuthRequired}
                className="bg-accent text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-500 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          <input 
            type="url" 
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-very-long-url.com/paste/here..." 
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base text-gray-300 focus:outline-none focus:border-gray-500 w-full"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#2a2a2a] border border-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333] transition-colors w-full sm:w-auto disabled:opacity-50"
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </div>
        
        {useAlias && (
          <div className="mb-4">
            <input 
              type="text" 
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              placeholder="Enter custom alias (optional)" 
              className="w-full sm:w-1/2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-gray-500"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={useAlias}
              onChange={(e) => setUseAlias(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-transparent" 
            />
            <span>Custom alias</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input 
              type="checkbox" 
              checked={useExpiry}
              onChange={(e) => setUseExpiry(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-transparent" 
            />
            <span>Expires in 7 days</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default UrlShortenerForm;
