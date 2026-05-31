const RecentLinkItem = ({ shortCode, originalUrl, clickCount, onRefresh }) => {
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  const shortUrl = `${API_BASE}/url/r/${shortCode}`;
  
  // Clean up the URL for display (remove https:// and /api/v1)
  const displayDomain = API_BASE.replace(/^https?:\/\//, '').replace(/\/api\/v1$/, '');
  
  const handleClick = () => {
    // If onRefresh is provided, call it after a short delay
    // to allow the backend to process the click increment
    if (onRefresh) {
      setTimeout(onRefresh, 1000);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-800 last:border-0 gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 items-start sm:items-center flex-1 min-w-0 w-full">
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-accent font-medium shrink-0 hover:underline"
          onClick={handleClick}
        >
          {displayDomain}/.../{shortCode}
        </a>
        <span className="text-gray-400 truncate text-xs sm:text-sm block w-full sm:w-auto max-w-md">
          {originalUrl}
        </span>
      </div>
      <div className="text-gray-500 text-xs sm:text-sm font-medium shrink-0">
        {clickCount} clicks
      </div>
    </div>
  );
};

const RecentLinks = ({ links, loading, onClearAll, onRefresh }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 mb-12">
      <div className="bg-[#242424] rounded-xl border border-gray-800 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base sm:text-lg font-bold">Recent links</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onRefresh()}
              className="bg-[#2a2a2a] border border-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-[#333] transition-colors flex items-center gap-2"
              title="Refresh statistics"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
              Refresh
            </button>
            <button 
              onClick={onClearAll}
              className="bg-[#2a2a2a] border border-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
              disabled={links.length === 0 || loading}
            >
              Clear all
            </button>
          </div>
        </div>
        
        <div className="flex flex-col">
          {loading ? (
            <div className="py-8 text-center text-gray-500 animate-pulse">Loading links...</div>
          ) : links.length > 0 ? (
            links.map((link) => (
              <RecentLinkItem key={link.id} {...link} onRefresh={onRefresh} />
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">No links created yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentLinks;
