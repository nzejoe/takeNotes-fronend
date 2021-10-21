import React, { useRef, useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modal-slice";
import {
  addLabel,
  refreshList,
  updateLabel,
  deleteLabel,
} from "../../store/label-slice";

// utils
import { onFocusLost } from "../../helpers";

// icons
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { BsBookmarkCheck } from "react-icons/bs";

// styles
import styles from "./Label.module.css";

const Label = ({ label, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState(label.name);
  const editFormRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLabel({ label: { name: labelName }, id: label.id, token }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteLabel({ id: label.id, token }));
    setIsEditing(false);
    console.log("deleted");
  };

  useEffect(()=>{
    window.addEventListener("mousedown", (e)=>{
      onFocusLost(e, editFormRef, isEditing, setIsEditing);
    })
    return ()=>{
      window.removeEventListener("mousedown", (e) => {
        onFocusLost(e, editFormRef, isEditing, setIsEditing);
      });
    }
  },[isEditing])

  return (
    <React.Fragment>
      {isEditing ? (
        <form
          className={`${styles.form__add}`}
          onSubmit={handleSubmit}
          ref={editFormRef}
        >
          <input
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            type="text"
            placeholder="Add label"
            className={styles.input}
          />
          <span className={styles.edit__actions}>
            <button type="submit" className={styles.edit__submit}>
              <FaSave className={styles.edit__actions_btn} title="Save" />
            </button>
            <FaTimes
              className={styles.edit__actions_btn}
              title="Cancel"
              onClick={() => setIsEditing(false)}
            />
          </span>
        </form>
      ) : (
        <span key={label.id} className={styles.label}>
          {label.name}
          <span className={styles.label__actions}>
            {" "}
            <FaEdit
              title="Edit"
              className={`${styles.action__edit} ${styles.action__btn}`}
              onClick={() => setIsEditing(true)}
            />{" "}
            <FaTrash
              title="Delete"
              className={`${styles.action__delete} ${styles.action__btn}`}
              onClick={handleDelete}
            />
          </span>
        </span>
      )}
    </React.Fragment>
  );
};

const LabelAdd = ({ closeModalHandler }) => {
  const { authUser } = useSelector((state) => state.users);
  const { labels } = useSelector((state) => state.label);
  const labelRef = useRef();

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  // label add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const label = labelRef.current.value;
    if (token && label) {
      const resultAction = await dispatch(
        addLabel({ label: { name: label }, token })
      );
      if (addLabel.fulfilled.match(resultAction)) {
        labelRef.current.value = '';
        dispatch(refreshList());
      }
    }
  }; // end of label add

  return (
    <div className={`${styles.add__label}`}>
      <form className={`${styles.form__add}`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add label"
          className={styles.input}
          ref={labelRef}
        />
        <button type="submit" className={styles.btn__submit}>
          <BsBookmarkCheck className={styles.btn__submit_icon} title="Add" />
        </button>
      </form>
      {labels.map((label) => {
        return <Label key={label.id} label={label} token={token} />;
      })}
      <hr />
      <button onClick={closeModalHandler}>close</button>
    </div>
  );
};

export default memo(LabelAdd);
