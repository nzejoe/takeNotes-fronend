import React, { useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// icons
import { VscEdit, VscTrash } from "react-icons/vsc";

import { openNoteModal } from "../../store/modal-slice";

import { deleteNote, refreshList } from "../../store/note-slice";
import { DateDashboard } from "../UI";

// style
import styles from "./Note.module.css";

const Note = ({ id, title, text, created, label: labelID }) => {
  const { authUser } = useSelector((state) => state.users);
  const { labels } = useSelector((state) => state.label);
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
        dispatch(refreshList()); // refresh
        history.push("/home");
      }
    }
  };

  const handleEdit = () => {
    dispatch(openNoteModal({ id, title, text, label: labelID ? labelID : "" }));
  };

  return (
    <React.Fragment>
      <div ref={formRef} className={`${styles.note}`}>
        <DateDashboard date={created} />
        {title  && <h4 style={{ marginBottom: ".5rem" }}>{title}</h4>}
        <p className={styles.note__text}>{text}</p>
        <p className={styles.note__label}>{labelName}</p>
        <div className={styles.note__actions}>
          <button onClick={handleEdit} className={styles.note__actions_btn}>
            <VscEdit className={styles.note__actions_icon} title="Edit" />
          </button>
          <button onClick={handleDelete} className={styles.note__actions_btn}>
            <VscTrash className={styles.note__actions_icon} title="Delete" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default memo(Note);
