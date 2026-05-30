import { useAuth } from '../context/useAuth';

const Navbar = ({ onAuthClick }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center py-6 px-4 max-w-5xl mx-auto gap-4 sm:gap-0">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <span className="text-xl font-bold tracking-tight">Snip.ly</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 items-center">
        <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700 text-xs sm:text-sm font-medium hover:bg-[#3a3a3a] transition-colors">Dashboard</button>
        <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700 text-xs sm:text-sm font-medium hover:bg-[#3a3a3a] transition-colors">Analytics</button>
        <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#2a2a2a] border border-gray-700 text-xs sm:text-sm font-medium hover:bg-[#3a3a3a] transition-colors">Settings</button>
        
        <div className="h-6 w-[1px] bg-gray-700 mx-2 hidden sm:block"></div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3 ml-2">
            <span className="text-sm text-gray-400">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
            <button 
              onClick={logout}
              className="px-3 sm:px-4 py-2 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 text-xs sm:text-sm font-medium hover:bg-red-900/30 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onAuthClick}
            className="px-3 sm:px-4 py-2 rounded-lg bg-accent text-black text-xs sm:text-sm font-bold hover:bg-green-500 transition-colors ml-2"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
