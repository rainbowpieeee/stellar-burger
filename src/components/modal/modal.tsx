import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect, FC } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TModal } from "../../services/types/data";

const modalRoot = document.getElementById("modal") as HTMLDivElement;

const Modal: FC<TModal> = ({ title, onClose, children }) => {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={style.popup} onClick={(e) => e.stopPropagation()}>
        {title && (
          <h2
            className={`${style.popup__title} text text_type_main-large pr-10 mb-10`}
          >
            {title}
          </h2>
        )}
        {children}
        <div className={style.popup__close} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
