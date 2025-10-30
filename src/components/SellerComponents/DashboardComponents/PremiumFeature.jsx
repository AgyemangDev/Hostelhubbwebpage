// Premium Feature Component
const PremiumFeature = ({ icon: Icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
    <div className="p-3 bg-white/10 rounded-lg inline-flex mb-4">
      <Icon className="w-6 h-6 text-amber-400" />
    </div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export default PremiumFeature;