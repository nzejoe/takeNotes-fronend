import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "../UI";
import { openAddNoteModal } from "../../store/modal-slice";

// styles
import styles from "./Layout.module.css";

import { NoteList } from "../Notes";
import { LabelList } from "../Labels";

const Main = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const [showLabel, setShowLabel] = useState(false);

  const dispatch = useDispatch();

  const handleEditing = () => {
    dispatch(openAddNoteModal());
  };


  return (
    <div className={styles.main}>
      <aside
        className={styles.aside}
        onMouseOver={() => setShowLabel(true)}
        onMouseOut={() => setShowLabel(false)}
      >
        <LabelList showLabel={showLabel} />
      </aside>
      <main className={styles.content__main}>
        <div className={styles.input__wrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Take a note..."
            onClick={handleEditing}
          />
        </div>
        {isOpen && <Modal />}
        <div className={styles.note__list}>
          <NoteList />
        </div>
      </main>
    </div>
  );
};

export default Main;
