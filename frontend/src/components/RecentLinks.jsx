const RecentLinkItem = ({ shortCode, originalUrl, clickCount }) => {
  const shortUrl = `${window.location.protocol}//${window.location.hostname}:5000/api/v1/url/r/${shortCode}`;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-800 last:border-0 gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 items-start sm:items-center flex-1 min-w-0 w-full">
        <a 
          href={shortUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-accent font-medium shrink-0 hover:underline"
        >
          {window.location.hostname}:5000/.../{shortCode}
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

const RecentLinks = ({ links, loading, onClearAll }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 mb-12">
      <div className="bg-[#242424] rounded-xl border border-gray-800 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base sm:text-lg font-bold">Recent links</h2>
          <button 
            onClick={onClearAll}
            className="bg-[#2a2a2a] border border-gray-700 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
            disabled={links.length === 0 || loading}
          >
            Clear all
          </button>
        </div>
        
        <div className="flex flex-col">
          {loading ? (
            <div className="py-8 text-center text-gray-500 animate-pulse">Loading links...</div>
          ) : links.length > 0 ? (
            links.map((link) => (
              <RecentLinkItem key={link.id} {...link} />
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
