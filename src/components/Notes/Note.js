import React, { useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { openNoteModal } from "../../store/modal-slice";

import { deleteNote, refreshList } from "../../store/note-slice";
import { DateDashboard } from "../UI";

// style
import classes from "./Note.module.css";

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
      <div ref={formRef} className={`${classes.note}`}>
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
      </div>
    </React.Fragment>
  );
};

export default memo(Note);
