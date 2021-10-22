import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewNote } from "../../store/note-slice";
//icons
import { VscClose, VscSave } from "react-icons/vsc";
import styles from "./Note.module.css";

const AddNote = ({ closeModalHandler }) => {
  // useSelector
  const { authUser } = useSelector((state) => state.users);
  const { labels } = useSelector((state) => state.label);
  // useState
  const [selectLabel, setSelectedLabel] = useState("");
  // useRef
  const titleRef = useRef();
  const textRef = useRef();
  // history & dispatch
  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSelectedLabel("");
    const newNote = {
      title: titleRef.current.value,
      text: textRef.current.value,
      label: selectLabel,
    };

    if (newNote.text && newNote.title) {
      dispatch(addNewNote({ newNote, token }));

      closeModalHandler(); // close modal

      titleRef.current.value = "";
      textRef.current.value = "";
    }
  };

  const labelChangeHandler = (event) => {
    setSelectedLabel(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form__update}`}>
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
      <div className={styles.form__actions}>
        <button type="submit" className={styles.form__actions_btn}>
          <VscSave className={styles.actions__icon} title="Save"/>
        </button>
        <button
          type="button"
          onClick={closeModalHandler}
          className={`${styles.form__actions_btn}`}
          title="Cancel"
        >
          <VscClose className={styles.actions__icon} title="Cancel"/>
        </button>
      </div>
    </form>
  );
};

export default AddNote;
