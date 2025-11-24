import { useState, useEffect } from "react";
import { auth } from "../../../firebase/FirebaseConfig";
import { getOrdersForSeller, updateOrderStatus } from "../../../firebase/orderUtils";
import { Loader2 } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null); // Tracks the ID of the order being updated

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      setError("You must be logged in to view orders.");
      return;
    }

    const unsubscribe = getOrdersForSeller(
      user.uid,
      (newOrders) => {
        setOrders(newOrders);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      // The local state will be updated by the real-time listener,
      // so no need to call setOrders here.
    } catch (err) {
      console.error("Failed to update order status:", err);
      // Optionally show an error message to the user
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#610b0c]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You have no orders yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      Customer ID: {order.userId}
                    </p>
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <p className="text-sm text-gray-900">
                      {new Date(order.createdAt?.toDate()).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold text-[#610b0c]">
                      GH₵{order.totalPrice?.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-none">
                     <div className="flex items-center gap-2">
                      {updatingStatus === order.id && <Loader2 className="w-4 h-4 animate-spin" />}
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingStatus === order.id}
                        className={`text-xs font-medium rounded-lg border-2 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#610b0c] transition-colors ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
