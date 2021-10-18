import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { addNewNote } from '../../store/note-slice';
import { closeAddNoteModal } from '../../store/modal-slice';

import styles from './Note.module.css'

const AddNote = () => {
    // useSelector
    const { authUser } = useSelector(state => state.users);
    const labels = useSelector(state => state.label.labels);
    // useState
    const [selectLabel, setSelectedLabel] = useState('');
    const [isEditing, setIsEditing] = useState(true)
    // useRef
    const titleRef = useRef();
    const textRef = useRef();
    // history & dispatch
    const history = useHistory();
    const dispatch = useDispatch();

    const token = authUser && authUser.token

    const handleSubmit = async(event) => {
        event.preventDefault();
        setSelectedLabel('')
        const newNote = {
            title: titleRef.current.value,
            text: textRef.current.value,
            label: selectLabel,
        }

        dispatch(addNewNote({newNote, token}));

        titleRef.current.value = '';
        textRef.current.value = '';

        setIsEditing(false);
        setTimeout(() => {
          dispatch(closeAddNoteModal());
          history.push('/home');
        }, 1000);

    };

    const labelChangeHandler = (event) => {
      setSelectedLabel(event.target.value);
    };

    const cancelHandler = () => {
      setIsEditing(false)
      setTimeout(()=>{
        dispatch(closeAddNoteModal());
      },1000)
    };
    
    return (
      <form
        onSubmit={handleSubmit}
        className={`${styles.form__update} ${!isEditing && "remove"}`}
      >
        <div className="form-group">
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            ref={titleRef}
            className={styles.input}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text"></label>
          <textarea
            id="text"
            placeholder="Take a note..."
            ref={textRef}
            cols="50"
            rows="10"
            className={styles.input}
          />
        </div>
        <div className="form-group">
          <label htmlFor="label"></label>
          <select
            name="label"
            id="label"
            onChange={labelChangeHandler}
            value={selectLabel}
            className={`${styles.input} ${styles.select}`}
          >
            <option value="">Choose label</option>
            {labels.map((label) => {
              return (
                <option key={label.id} value={label.id}>
                  {label.name}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">save</button>
        <button type="button" onClick={cancelHandler}>Cancel</button>
      </form>
    );
}

export default AddNote
