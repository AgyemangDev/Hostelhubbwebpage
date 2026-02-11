import { useNavigate } from "react-router-dom";

const InsightCard = ({ title, description, actionText, actionLink }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg p-4 border border-blue-200">
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <button
        onClick={() => navigate(actionLink)}
        className="text-sm text-[#610b0c] font-medium hover:underline"
      >
        {actionText} →
      </button>
    </div>
  );
};

export default InsightCard;
