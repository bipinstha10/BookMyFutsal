import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) {
    return null;
  } // render nothing when closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
