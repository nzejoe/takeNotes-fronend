import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
// note actions
import { updateNote, refreshList } from "../../store/note-slice";

//icons
import { VscClose, VscSave } from "react-icons/vsc";

// styles
import styles from './Note.module.css'

const UpdateNote = ({ id, title, text, label: labelID, closeModalHandler }) => {
  const { authUser } = useSelector((state) => state.users);
  const { labels } = useSelector((state) => state.label);

  const [enteredTitle, setEnterdTitle] = useState(title);
  const [enteredText, setEnteredText] = useState(text);
  const [labelValue, setLabelValue] = useState(labelID);

  //dispatch
  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const noteUpdate = {
      title: enteredTitle,
      text: enteredText,
      label: labelValue,
    };

    if (token) {
      const resultAction = await dispatch(
        updateNote({ id, noteUpdate, token })
      );
      if (updateNote.fulfilled.match(resultAction)) {
        dispatch(refreshList()); // refresh
        closeModalHandler();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form__update}`}>
      <div className="form-group">
        <label htmlFor="title"></label>
        <input
          className={styles.input}
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
          className={styles.input}
          id="text"
          placeholder="note"
          cols="50"
          rows="4"
          value={enteredText}
          onChange={(e) => setEnteredText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="label"></label>
        <select
          className={`${styles.input} ${styles.select}`}
          name="label"
          id="label"
          onChange={(e) => setLabelValue(e.target.value)}
          value={labelValue}
        >
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
          <VscSave className={styles.actions__icon} title="Save" />
        </button>
        <button
          type="button"
          onClick={closeModalHandler}
          className={`${styles.form__actions_btn}`}
          title="Cancel"
        >
          <VscClose className={styles.actions__icon} title="Cancel" />
        </button>
      </div>
    </form>
  );
};

export default memo(UpdateNote);
