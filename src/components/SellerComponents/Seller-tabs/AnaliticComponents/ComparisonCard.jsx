const ComparisonCard = ({ label, views, sales, revenue, trend }) => (
  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-semibold text-gray-900 text-sm">{label}</h4>
      {trend && (
        <span className="text-xs font-semibold text-green-600">{trend}</span>
      )}
    </div>
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Views</span>
        <span className="font-semibold text-gray-900">
          {views.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Sales</span>
        <span className="font-semibold text-gray-900">{sales}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Revenue</span>
        <span className="font-semibold text-gray-900">
          GH₵{revenue.toLocaleString()}
        </span>
      </div>
    </div>
  </div>
);

export default ComparisonCard;
