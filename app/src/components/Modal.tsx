import type { ReactNode } from "react";

interface ModalProperties {
  label: string;
  header?: ReactNode;
  message?: string;
  footer?: string;
}

const Modal = ({
  label,
  header,
  message,
  footer = "Close",
}: ModalProperties) => {
  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          )?.showModal()
        }
      >
        {label}
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">{footer}</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export { Modal };
