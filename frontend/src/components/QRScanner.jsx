
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function QRScanner({ onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        const cameras = await Html5Qrcode.getCameras();

        if (!mounted) return;

        if (!cameras.length) {
          setCameraError("No camera found.");
          return;
        }

        await scanner.start(
          cameras[0].id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            if (scannedRef.current) return;

            scannedRef.current = true;

            scanner.stop().catch(console.error);

            try {
              const scannedURL = new URL(decodedText);

              if (scannedURL.origin === window.location.origin) {
                onScanSuccess(decodedText);
              } else {
                alert("Invalid Cafe QR Code!");
                onClose();
              }
            } catch {
              alert("Please scan a valid Cafe QR Code!");
              onClose();
            }
          },
          () => {}
        );
      } catch (error) {
        if (mounted) {
          setCameraError("Camera permission denied or unavailable.");
        }
        console.error(error);
      }
    };

    startScanner();

    return () => {
      mounted = false;

      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop()
          .then(() => scannerRef.current?.clear())
          .catch(console.error);
      }
    };
  }, [onClose, onScanSuccess]);

  const stopScanner = async () => {
    const scanner = scannerRef.current;

    if (scanner?.isScanning) {
      await scanner.stop();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-orange-700">
          Scan Cafe QR Code
        </h2>

        <div id="qr-reader" className="w-full overflow-hidden" />

        {cameraError && (
          <p className="mt-3 text-center text-red-600">
            {cameraError}
          </p>
        )}

        <button
          onClick={stopScanner}
          className="mt-5 w-full rounded-lg bg-red-600 py-3 text-white hover:bg-red-700"
        >
          Stop Scanning
        </button>
      </div>
    </div>
  );
}

export default QRScanner;
