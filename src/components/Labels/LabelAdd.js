import React, { useRef, useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLabel,
  refreshList,
  updateLabel,
  deleteLabel,
} from "../../store/label-slice";

// utils
import { onFocusLost } from "../../helpers";

// icons
import {
  VscEdit,
  VscTrash,
  VscSave,
  VscClose,
  VscAdd,
  VscArrowRight,
} from "react-icons/vsc";


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
          className={`${styles.form__add} ${styles.label__edit}`}
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
            <button type="submit" className={styles.edit__actions_btn}>
              <VscSave className={styles.edit__actions_icon} title="Save" />
            </button>
            <button className={styles.edit__actions_btn}>
              <VscClose
                className={styles.edit__actions_icon}
                title="Cancel"
                onClick={() => setIsEditing(false)}
              />
            </button>
          </span>
        </form>
      ) : (
        <span key={label.id} className={styles.label__add_list}>
          <VscArrowRight className={styles.label__icon} />
          <span style={{ marginLeft: "1rem" }}>{label.name}</span>
          <span className={styles.label__actions}>
            {" "}
            <VscEdit
              title="Edit"
              className={`${styles.action__edit} ${styles.action__btn}`}
              onClick={() => setIsEditing(true)}
            />{" "}
            <VscTrash
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
  const { labels, error } = useSelector((state) => state.label);
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
      {error && <p className={styles.form__error}>{error.name}</p>}
      <form className={`${styles.form__add}`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add label"
          className={styles.input}
          ref={labelRef}
        />
        <button type="submit" className={styles.btn__submit}>
          <VscAdd className={styles.btn__submit_icon} title="Add" />
        </button>
      </form>
      {labels.map((label) => {
        return <Label key={label.id} label={label} token={token} />;
      })}
      <hr style={{margin: '1rem 0', color: "var(--primary-dark-gray)"}}/>
      <button onClick={closeModalHandler} className={styles.close__btn} title="Cancel">
        <VscClose className={styles.close__btn_icon} />
      </button>
    </div>
  );
};

export default memo(LabelAdd);
