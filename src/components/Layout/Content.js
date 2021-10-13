import React from "react";

import { NoteList } from "../Notes";
import { LabelList } from "../Labels";
import { AddNote } from "../Notes";

// styles
import styles from "./Layout.module.css";

const Content = () => {
  return (
    <div className={styles.content}>
      <aside className={styles.aside}>
        <LabelList />
      </aside>
      <main className={styles.main}>
        <AddNote />
        <NoteList />
      </main>
    </div>
  );
};

export default Content;
