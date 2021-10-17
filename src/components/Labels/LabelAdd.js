import React, { useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLabelModal } from "../../store/modal-slice";
import { addLabel, refreshList, updateLabel, deleteLabel } from "../../store/label-slice";


// icons
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'

// styles
import styles from "./Label.module.css";

const Label = ({ label, token })=>{
  const [isEditing, setIsEditing] = useState(false);
  const [labelName, setLabelName] = useState(label.name)

  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(updateLabel({label: {name: labelName}, id:label.id ,token}))
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteLabel({ id: label.id, token }));
    setIsEditing(false);
    console.log('deleted')
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <form className={`${styles.form__add}`} onSubmit={handleSubmit}>
          <input
            value={labelName}
            onChange={(e)=>setLabelName(e.target.value)}
            type="text"
            placeholder="Add label"
            className={styles.input}
          />
          <span className={styles.edit__actions}>
            <button type="submit" className={styles.edit__submit}>
              <FaSave className={styles.edit__actions_btn} title="Save"/>
            </button>
            <FaTimes className={styles.edit__actions_btn} title="Cancel" onClick={()=>setIsEditing(false)}/>
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
}

const LabelAdd = () => {
  const { authUser } = useSelector((state) => state.users);
  const { labels } = useSelector((state) => state.label);
  const labelRef = useRef();
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  // this handles add cancellation
  const closeHandler = () => {
    setIsOpen(false);
    setTimeout(()=>{
      dispatch(closeLabelModal());
    }, 1000)
  };

  // label add
  const handleSubmit = async (e) => {
    e.preventDefault();
    const label = labelRef.current.value;
    if (token && label) {
      const resultAction = await dispatch(
        addLabel({ label: { name: label }, token })
      );
      if (addLabel.fulfilled.match(resultAction)) {
        setIsOpen(false);
        setTimeout(() => {
          dispatch(refreshList());
          dispatch(closeLabelModal());
        }, 1000);
      }
    }
  };// end of label add

  

  return (
    <div className={`${styles.add__label} ${!isOpen && 'remove'}`}>
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
        return <Label key={label.id} label={label} token={token}/>
      })}
      <hr />
      <button onClick={closeHandler}>close</button>
    </div>
  );
};

export default memo(LabelAdd);
