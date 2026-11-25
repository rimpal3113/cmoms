
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Checkout from "./Checkout";
import OrderSuccess from "../pages/OrderSuccess";

function Cart({ onContinueShopping }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalAmount,
    clearCart,
  } = useCart();

  // Order Successfully Placed
  const handleOrderPlaced = (order) => {
    clearCart();
    setCompletedOrder(order);
    setShowCheckout(false);
  };

  // Order Success Page
 if (completedOrder) {
  return (
    <OrderSuccess
      order={completedOrder}
      onContinue={() => {
        setCompletedOrder(null);
        onContinueShopping();
      }}
    />
  );
}

  // Checkout Page
  if (showCheckout) {
    return (
      <Checkout onOrderPlaced={handleOrderPlaced} />
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-orange-700">
        My Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <ShoppingCart
            size={50}
            className="mx-auto mb-4 text-orange-500"
          />
          <h2 className="text-xl font-bold">Your Cart is Empty</h2>
          <p className="mt-2 text-gray-500">
            Please add some delicious items!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow"
              >
                <img
                  src={
                    item.image ||
                    "https://placehold.co/100x100?text=Food"
                  }
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold">{item.name}</h2>

                  <p className="mt-1 text-orange-600">
                    ₹{item.price}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="rounded bg-orange-100 p-2"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="rounded bg-orange-100 p-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-3 text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            <div className="flex justify-between">
              <span>Total Items</span>
              <span>
                {cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="my-4 flex justify-between border-t pt-4">
              <span className="font-semibold">Total Amount</span>
              <span className="text-xl font-bold text-orange-600">
                ₹{totalAmount}
              </span>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
