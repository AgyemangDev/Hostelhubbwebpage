const MetricRow = ({ label, value, icon: Icon, color }) => (
  <div className="ta">
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
    <span className="text-lg font-bold text-gray-900">{value}</span>
  </div>
);
export default MetricRow;
