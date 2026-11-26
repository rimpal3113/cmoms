
import { useState } from "react";
import Menu from "./pages/Menu";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";
import QRCodeGenerator from "./components/QRCodeGenerator";

function App() {
  const [page, setPage] = useState("menu");
  const [showQR, setShowQR] = useState(false);

  const { totalQuantity } = useCart();

  // Check QR ordering URL
  const isQROrder =
    new URLSearchParams(window.location.search).get("order") === "true";

  // Back to Menu
  const backToMenu = () => {
    setPage("menu");
  };

  return (
    <div className="min-h-screen bg-orange-50">

      {/* Navbar - Laptop and Mobile */}
      <Navbar
        setPage={setPage}
        totalQuantity={totalQuantity}
        onShowQR={() => setShowQR(true)}
      />

      {/* QR Code Popup */}
      {showQR && !isQROrder && (
        <QRCodeGenerator
          onClose={() => setShowQR(false)}
        />
      )}

      {/* Menu and Order - All Screen Sizes */}
      <div>
        {page === "menu" ? (
          <Menu />
        ) : (
          <Cart onBackToMenu={backToMenu} />
        )}
      </div>

    </div>
  );
}

export default App;
