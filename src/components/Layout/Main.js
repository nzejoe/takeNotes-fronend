import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modal-slice';

// styles
import styles from "./Layout.module.css";

import { NoteList } from "../Notes";
import { LabelList } from "../Labels";
import { AddNote } from "../Notes";

const Main = () => {
  const dispatch = useDispatch()
    return (
      <div className={styles.main}>
        <aside className={styles.aside}>
          <LabelList />
        </aside>
        <main>
          <button onClick={()=> dispatch(openModal())}>open modal</button>
          <AddNote />
          <NoteList />
        </main>
      </div>
    );
}

export default Main
