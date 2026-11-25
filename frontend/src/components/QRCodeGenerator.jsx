
import { QRCodeCanvas } from "qrcode.react";
import { X, Download } from "lucide-react";

function QRCodeGenerator({ onClose }) {
  const menuURL = `${window.location.origin}/?order=true`;

  const downloadQR = () => {
    const canvas = document.getElementById("cafe-qr");
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "Cafe-Menu-QR.png";
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">

        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <X size={22} />
        </button>

        <h2 className="mb-2 text-xl font-bold text-orange-700">
          Cafe Menu QR Code
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Scan this QR code to order
        </p>

        <div className="mb-4 flex justify-center">
          <QRCodeCanvas
            id="cafe-qr"
            value={menuURL}
            size={200}
            level="H"
          />
        </div>

        <p className="mb-5 break-all text-xs text-gray-500">
          {menuURL}
        </p>

        <button
          onClick={downloadQR}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
        >
          <Download size={18} />
          Download QR Code
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-lg border border-gray-300 py-2 font-semibold text-gray-700 hover:bg-gray-100"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default QRCodeGenerator;
