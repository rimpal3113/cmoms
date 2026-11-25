
import { Coffee, ShoppingCart, QrCode } from "lucide-react";

function Navbar({ setPage, totalQuantity, onShowQR }) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-4 shadow">
      <h1 className="flex items-center gap-2 text-xl font-bold text-orange-700">
        <Coffee />
        Cafe Ordering
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setPage("menu")}
          className="font-semibold"
        >
          Menu
        </button>

        <button
          onClick={() => setPage("cart")}
          className="flex items-center gap-2 font-semibold text-orange-600"
        >
          <ShoppingCart size={20} />
          Cart ({totalQuantity})
        </button>

        {/* QR Code Button - Laptop Only */}
        <button
          onClick={onShowQR}
          className="hidden md:flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700"
        >
          <QrCode size={20} />
          QR Code
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
