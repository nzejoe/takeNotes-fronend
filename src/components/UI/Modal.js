import ReactDOM from 'react-dom'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { closeLabel } from '../../store/modal-slice'

// modal contents
import UpdateNote from '../Notes/UpdateNote'
import { LabelAdd } from '../Labels'

import styles from './Modal.module.css'



export const ModalContent = ({ close, addLabel }) => {
    const { update, isOpen,labelAdd } = useSelector(state => state.modal);

    return (
      <div className={styles.overlay}>
        <div className={`${styles.content} ${!isOpen && styles.remove}`}>
          {update && <UpdateNote {...update} close={close} />}
          {labelAdd && <LabelAdd/> }
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
