const BenefitCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#610b0c]" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default BenefitCard;