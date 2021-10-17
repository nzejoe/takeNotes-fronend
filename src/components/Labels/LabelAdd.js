import React, { useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLabelModal } from "../../store/modal-slice";
import { addLabel, refreshList } from "../../store/label-slice";

// styles
import styles from "./Label.module.css";

const LabelAdd = () => {
  const { authUser } = useSelector((state) => state.users);
  const { labels } = useSelector((state) => state.label);
  const labelRef = useRef();
  const [isEditing, setIsEditing] = useState(true);

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  // this handles add cancellation
  const closeHandler = () => {
    setIsEditing(false);
    setTimeout(()=>{
      dispatch(closeLabelModal());
    }, 1000)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const label = labelRef.current.value;
    if (token && label) {
      const resultAction = await dispatch(
        addLabel({ label: { name: label }, token })
      );
      if (addLabel.fulfilled.match(resultAction)) {
        setIsEditing(false);
        setTimeout(() => {
          dispatch(refreshList());
          dispatch(closeLabelModal());
        }, 1000);
      }
    }
  };

  return (
    <div className={`${styles.add__label} ${!isEditing && 'remove'}`}>
      <form className={`${styles.form__add}`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add label"
          className={styles.input}
          ref={labelRef}
        />
        <button type="submit" className={styles.btn__submit}>
          Add
        </button>
      </form>
      {labels.map((label) => {
        return (
          <span key={label.id} className={styles.label}>
            {label.name}
          </span>
        );
      })}
      <hr />
      <button onClick={closeHandler}>close</button>
    </div>
  );
};

export default memo(LabelAdd);
