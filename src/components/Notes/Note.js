import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { noteActions } from "../../store/note-slice";

const Note = ({id, title, text, created,label:labelID }) => {
  const labels = useSelector(state => state.label.labels)

  //dispatch
  const dispatch = useDispatch()

  // get label name
  const label = labels.find((thisLabel) => thisLabel.id === labelID);
  let labelName = ''
  if(label){ // if note has label
    labelName = label.name // set name
  }

  // delete action
  const handleDelete = () => {
    dispatch(noteActions.deleteNote(id));
  };



  return (
    <div>
      <p>
        <small>{created}</small>
      </p>
      <h4>{title}</h4>
      <p>{text}</p>
      <p>
        <small>{labelName}</small>
      </p>
      <div className="actions">
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <hr />
    </div>
  );
};

export default Note;
