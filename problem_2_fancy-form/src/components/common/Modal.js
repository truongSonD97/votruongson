
import * as OriginModal from "react-modal";
import IconClose from "../icons/IconClose";

 const Modal = ({ isOpen, onRequestClose, children }) => {
  return (
    <OriginModal isOpen={isOpen} onRequestClose={onRequestClose} className="modal relative">
        <IconClose className='close-icon' onClick={onRequestClose}/>
      {children}
    </OriginModal>
  );
};

export default Modal
