import React from "react";

import { NoteList } from "../Notes";
import { LabelList } from "../Labels";
import { AddNote } from "../Notes";

// styles
import classes from "./Content.module.css";

const Content = () => {
  return (
    <div className={classes.content}>
      <aside className={classes.aside}>
        <LabelList />
      </aside>
      <main className={classes.main}>
        <AddNote />
        <NoteList />
      </main>
    </div>
  );
};

export default Content;
