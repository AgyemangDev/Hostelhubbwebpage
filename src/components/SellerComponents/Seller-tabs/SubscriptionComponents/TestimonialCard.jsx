import { Star } from "lucide-react";

const TestimonialCard = ({ name, role, content, rating }) => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
      ))}
    </div>
    <p className="text-gray-700 mb-4 italic">"{content}"</p>
    <div>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  </div>
);

export default TestimonialCard;