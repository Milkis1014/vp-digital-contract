import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import BuilderPage from "../pages/BuilderPage";

interface ContractModalProps {
  isOpen: boolean;
  checkIn: string;
  checkOut: string;
  onClose: () => void;
}

export const ContractModal = ({
  isOpen,
  checkIn,
  checkOut,
  onClose,
}: ContractModalProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const handleCloseRequest = () => {
    setShowConfirm(true);
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white shadow-2xl rounded-xl">
        {/* ── Close button (top-right corner) ─────────────────────────────── */}
        <button
          onClick={handleCloseRequest}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* ── Confirmation dialog (renders on top of the form) ─────────────── */}
        {showConfirm && (
          <CloseConfirmDialog
            onConfirm={handleConfirmClose}
            onCancel={handleCancelClose}
          />
        )}

        {/* ── Form content ─────────────────────────────────────────────────── */}
        <div className="p-6">
          <BuilderPage
            initialCheckin={checkIn}
            initialCheckout={checkOut}
            onClose={onClose} // closes after successful Save & Download
          />
        </div>
      </div>
    </div>
  );
};

// ─── Confirmation dialog shown when the user clicks "Close" ─────────────────
const CloseConfirmDialog = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  // Dark overlay on top of the modal itself
  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-lg">
    <div className="bg-white rounded-xl shadow-xl p-6 mx-4 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle
          className="text-amber-500 shrink-0"
          size={22}
        />
        <h3 className="text-base font-semibold text-gray-800">
          Discard this contract?
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-5">
        You haven't saved yet. Closing now will lose all the details you've
        entered. Are you sure?
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 text-sm font-medium transition"
        >
          Keep editing
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 text-sm font-medium transition"
        >
          Yes, discard
        </button>
      </div>
    </div>
  </div>
);
