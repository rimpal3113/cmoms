
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

function Checkout({ onOrderPlaced }) {
  const { cartItems, totalAmount } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    tableNumber: "",
    specialInstructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        ...formData,
        tableNumber: Number(formData.tableNumber),
        items: cartItems.map((item) => ({
          menuItem: item._id,
          quantity: item.quantity,
        })),
      };

      const response = await placeOrder(orderData);

      onOrderPlaced(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold text-orange-700">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Customer Name"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10 Digit Phone Number"
            pattern="[0-9]{10}"
            maxLength={10}
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="tableNumber"
            type="number"
            min="1"
            value={formData.tableNumber}
            onChange={handleChange}
            placeholder="Table Number"
            required
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="Special Instructions (Optional)"
            className="w-full rounded-lg border p-3"
            rows="3"
          />

          <div className="rounded-lg bg-orange-50 p-4">
            <p className="text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-orange-700">
              ₹{totalAmount}
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
