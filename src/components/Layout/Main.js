import React from 'react'

// styles
import styles from "./Layout.module.css";

import { NoteList } from "../Notes";
import { LabelList } from "../Labels";
import { AddNote } from "../Notes";

const Main = () => {
    return (
        <div className={styles.main}>
          <aside className={styles.aside}>
            <LabelList />
          </aside>
          <main >
            <AddNote />
            <NoteList />
          </main>
        </div>
    );
}

export default Main
