import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Note } from '.';

// styles
import classes from "./NoteList.module.css";

const NoteList = () => {
  const notes = useSelector(state => state.note.filteredNotes);

  useEffect(()=>{

  })

  return (
    <div className={classes['note-list']}>
      {notes.map((note) => {
        return <Note key={note.id} {...note} />;
      })}
    </div>
  );
};

export default NoteList
