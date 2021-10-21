import ReactDOM from "react-dom";
import React, { memo, useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// modal contents
import { AddNote } from "../Notes";
import UpdateNote from "../Notes/UpdateNote";
import { LabelAdd } from "../Labels";
import { closeModal } from "../../store/modal-slice";

import styles from "./Modal.module.css";

export const ModalContent = () => {
  const { note, label, add } = useSelector((state) => state.modal);
  const [openModal, setOpenModal] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const closeModalHandler = () => {
    setOpenModal(false);
    setTimeout(() => {
      history.push("/home");
      dispatch(closeModal());
    }, 1000);
  };

  return (
    <div className={`${styles.overlay} ${!openModal && "remove"}`}>
      <div className={`${styles.content}`}>
        {note && <UpdateNote {...note} closeModalHandler={closeModalHandler} />}
        {label && <LabelAdd closeModalHandler={closeModalHandler} />}
        {add && <AddNote closeModalHandler={closeModalHandler} />}
      </div>
    </div>
  );
};

const Modal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <React.Fragment>
      {isOpen &&
        ReactDOM.createPortal(
          <ModalContent />,
          document.getElementById("modal")
        )}
    </React.Fragment>
  );
};

export default memo(Modal);
