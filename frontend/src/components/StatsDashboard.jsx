const StatCard = ({ value, label, loading }) => (
  <div className="bg-[#242424] p-6 rounded-xl border border-gray-800 flex-1 min-w-[200px]">
    <div className="text-3xl font-bold mb-1">
      {loading ? <span className="animate-pulse opacity-50">...</span> : value}
    </div>
    <div className="text-gray-400 text-sm font-medium">{label}</div>
  </div>
);

const StatsDashboard = ({ stats, loading }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard value={stats.totalLinks} label="Links created" loading={loading} />
      <StatCard value={stats.totalClicks} label="Total clicks" loading={loading} />
      <StatCard value={stats.activeToday} label="Active today" loading={loading} />
    </div>
  );
};

export default StatsDashboard;
