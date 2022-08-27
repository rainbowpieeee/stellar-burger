import styleModal from "./modal-overlay.module.css";
import { FC } from "react";
import { TModalOverlay } from "../../services/types/data";

const ModalOverlay: FC<TModalOverlay> = ({ children, onClose }) => {
  return (
    <div className={`${styleModal.overlay}`} onClick={onClose}>
      {children}
    </div>
  );
};

export default ModalOverlay;
