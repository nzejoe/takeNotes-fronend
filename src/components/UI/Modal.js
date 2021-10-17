import ReactDOM from 'react-dom'
import React from 'react'

import { useSelector } from 'react-redux'

// modal contents
import UpdateNote from '../Notes/UpdateNote'
import { LabelAdd } from '../Labels'

import styles from './Modal.module.css'



export const ModalContent = ({ close, addLabel }) => {
    const { note, isOpen, label } = useSelector(state => state.modal);

    return (
      <div className={styles.overlay}>
        <div className={`${styles.content} ${!isOpen && styles.remove}`}>
          {note && <UpdateNote {...note} close={close} />}
          {label && <LabelAdd /> }
        </div>
      </div>
    );
}


const Modal = ({ close, addLabel }) => {
  return ReactDOM.createPortal(
    <ModalContent close={close} addLabel={addLabel}/>,
    document.getElementById("modal")
  );
};

export default Modal;
