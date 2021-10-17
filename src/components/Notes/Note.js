import React, { useState, useRef, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { openNoteModal, closeNoteModal } from "../../store/modal-slice";

import { deleteNote, refreshList } from "../../store/note-slice";
import { DateDashboard } from "../UI";
import Modal from "../UI/Modal";

// style
import classes from "./Note.module.css";

const Note = ({ id, title, text, created, label: labelID }) => {
  const { authUser } = useSelector((state) => state.users);
  const [edit, setEdit] = useState(false);
  const labels = useSelector((state) => state.label.labels);
  const formRef = useRef();

  const token = authUser && authUser.token;
  //dispatch
  const dispatch = useDispatch();

  // history
  const history = useHistory();

  // get label name
  const label = labels.find((thisLabel) => thisLabel.id === labelID);
  let labelName = "";
  if (label) {
    // if note has label
    labelName = label.name; // set name
  }

  // delete action
  const handleDelete = async () => {
    if (token) {
      const resultAction = await dispatch(deleteNote({ id, token }));
      if (deleteNote.fulfilled.match(resultAction)) {
        // redirect to home page
        setEdit(false);
        dispatch(refreshList()); // refresh
        history.push("/home");
      }
    }
  };

  const handleClose = useCallback(() => {
    const timer = setTimeout(() => {
      if (edit) {
        setEdit(false);
        dispatch(closeNoteModal())
      } else {
        clearTimeout(timer);
      }
    }, 1000);
  }, [edit, dispatch]);

  const handleEdit = () => {
    setEdit(true);
    dispatch(openNoteModal({ id, title, text, label: labelID ? labelID : "" }));
  };

  return (
    <React.Fragment>
      <div ref={formRef} className={`${classes.note} ${edit && classes.edit}`}>
        {edit ? (
          <Modal close={handleClose} isEditing={edit} />
        ) : (
          <div>
            <DateDashboard date={created} />
            <h4>{title}</h4>
            <p>{text}</p>
            <p>
              <small>{labelName}</small>
            </p>
            <div className="actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Note;
