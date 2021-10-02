import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { noteActions } from '../../store/note-slice';

const AddNote = () => {
    const titleRef = useRef();
    const textRef = useRef();

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newNote = {
            title: titleRef.current.value,
            text: textRef.current.value,
            label: 2,
        }
        dispatch(noteActions.addNote(newNote));
        titleRef.current.value = '';
        textRef.current.value = ''
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title"></label>
            <input type="text" id="title" placeholder="title" ref={titleRef}/>
          </div>
          <div className="form-group">
            <label htmlFor="text"></label>
            <textarea id="text" placeholder="note" ref={textRef} cols="50" rows="5"/>
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    );
}

export default AddNote
