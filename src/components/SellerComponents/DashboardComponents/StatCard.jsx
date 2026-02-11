import { Lock } from "lucide-react";

const StatCard = ({
  icon: Icon,
  title,
  value,
  color,
  gradient,
  subtitle,
  trend,
  locked,
}) => (
  <div className="relative bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all group overflow-hidden">
    {locked && (
      <div className="absolute top-3 right-3 p-1.5 bg-amber-100 rounded-full">
        <Lock className="w-4 h-4 text-amber-600" />
      </div>
    )}

    <div
      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>

    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-500">{subtitle}</p>
      {trend && (
        <span className="text-xs font-semibold text-green-600">{trend}</span>
      )}
    </div>
  </div>
);

export default StatCard;
