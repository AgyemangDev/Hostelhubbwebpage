const FeatureBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
    <div className="p-2 bg-white/20 rounded-lg">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-white font-medium">{text}</span>
  </div>
);

export default FeatureBadge;
