import ReactDOM from 'react-dom'
import React from 'react'

import { useSelector } from 'react-redux'

// modal contents
import UpdateNote from '../Notes/UpdateNote'

import styles from './Modal.module.css'



export const ModalContent = ({ close }) => {
    const { update, isOpen } = useSelector(state => state.modal);

    return (
      <div className={styles.overlay}>
        <div className={`${styles.content} ${!isOpen && styles.remove}`}>
          {update && <UpdateNote {...update} close={close} />}
        </div>
      </div>
    );
}


const Modal = ({ close }) => {
  return ReactDOM.createPortal(
    <ModalContent close={close} />,
    document.getElementById("modal")
  );
};

export default Modal;
