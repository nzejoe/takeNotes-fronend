import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNotes } from '../../store/note-slice';

import { Note } from '.';

// styles
import classes from "./NoteList.module.css";

const NoteList = () => {
  const notes = useSelector(state => state.note.filteredNotes);
  const { authUser } = useSelector(state => state.users)

  const token = authUser && authUser.token

  const dispatch = useDispatch()

  useEffect(()=>{
    if(token){
      dispatch(fetchNotes(token));
    }
  },[dispatch,token])

  return (
    <div className={classes['note-list']}>
      {notes && notes.map((note) => {
        return <Note key={note.id} {...note} />;
      })}
    </div>
  );
};

export default NoteList;
