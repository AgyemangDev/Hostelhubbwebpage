import { Bell, Clock, Users } from "lucide-react";

const NotificationHistoryItem = ({ notification }) => {
  const getAudienceLabel = (audience) => {
    const labels = {
      all: "All Users",
      students: "Students",
      recent_viewers: "Recent Viewers",
      interested: "Interested Users",
    };
    return labels[audience] || audience;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Bell className="h-5 w-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              notification.priority === "high"
                ? "bg-orange-100 text-orange-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {notification.priority === "high" ? "High" : "Normal"}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(notification.sentAt)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {getAudienceLabel(notification.targetAudience)}
          </span>
          <span>•</span>
          <span>{notification.delivered || 0} delivered</span>
        </div>
      </div>
    </div>
  );
};


export default NotificationHistoryItem;