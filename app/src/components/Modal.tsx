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
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn btn-md text-xl btn-circle btn-ghost hover:bg-[#0C0C0C] text-[#24cfa6] absolute right-2 top-2 border-none"
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
