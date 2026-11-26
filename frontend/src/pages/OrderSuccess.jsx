
import { CheckCircle, Utensils } from "lucide-react";

function OrderSuccess({ order, onContinue }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <CheckCircle
          size={70}
          className="mx-auto mb-5 text-green-500"
        />

        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for ordering with us.
        </p>

        {order && (
          <div className="my-6 rounded-lg bg-orange-50 p-5 text-left">
            <p className="font-semibold">
              Order ID: {order._id}
            </p>

            <p className="mt-2">
              Customer: {order.customerName}
            </p>

            <p className="mt-2">
              Total Amount: ₹{order.totalAmount}
            </p>

            <p className="mt-2">
              Status: {order.status}
            </p>
          </div>
        )}

        <button
          onClick={onContinue}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 text-white hover:bg-orange-700"
        >
          <Utensils size={20} />
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
