import React from 'react'
import { useSelector } from 'react-redux'

import { Note } from '.';

// styles
import classes from "./Note.module.css";

const NoteList = () => {
  const { filteredNotes } = useSelector((state) => state.note);

  return (
    <div className={classes['note-list']}>
      {filteredNotes && filteredNotes.map((note) => {
        return <Note key={note.id} {...note} />;
      })}
    </div>
  );
};

export default NoteList;
