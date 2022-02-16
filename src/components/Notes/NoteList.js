import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Note } from '.';
import { fetchNotes } from '../../store/note-slice';

// styles
import classes from "./Note.module.css";

const NoteList = () => {
  const { filteredNotes, refresh } = useSelector((state) => state.note);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchNotes())
  },[refresh, dispatch])

  return (
    <div className={classes['note-list']}>
      {filteredNotes && filteredNotes.map((note) => {
        return <Note key={note.id} {...note} />;
      })}
    </div>
  );
};

export default NoteList;
