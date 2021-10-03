import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { noteActions } from "../../store/note-slice";

const Note = ({id, title, text, created,label:labelID }) => {
  const [edit, setEdit] = useState(false);
  const labels = useSelector(state => state.label.labels)
  const formRef = useRef()

  const [enteredTitle, setEnterdTitle] = useState(title);
  const [enteredText, setEnteredText] = useState(text);

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

  // close edit form when focus is lost
  const handleEdit = (event) => {
    if(edit && !formRef.current.contains(event.target)){
      setEdit(false)
      
      // ignore update and set back the values 
      setEnterdTitle(title)
      setEnteredText(text)
    }
  };
 useEffect(()=>{
    document.addEventListener("mousedown", handleEdit);
   return ()=>{ document.removeEventListener("mousedown", handleEdit);}
 }) // end of focus lost

  // edit submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const noteUpdate = {
      title: enteredTitle,
      text: enteredText
    }
    dispatch(noteActions.updateNote({id, noteUpdate}))
    setEdit(false)
  };

  const editForm = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          placeholder="title"
          value={enteredTitle}
          onChange={(e) => setEnterdTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="text"></label>
        <textarea
          id="text"
          placeholder="note"
          cols="50"
          rows="5"
          value={enteredText}
          onChange={(e) => setEnteredText(e.target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );


  return (
    <div ref={formRef}>
      {edit ? (
        editForm
      ) : (
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
            <button onClick={()=>setEdit(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Note;
