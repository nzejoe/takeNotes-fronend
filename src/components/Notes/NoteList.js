import React from 'react'
import { useSelector } from 'react-redux'
import { Note } from '.';
import { AddNote } from '.';

const NoteList = () => {
  const notes = useSelector((state) => state.note.notes); // get notes data from note-slice state
  return <div>
      <AddNote/>
      {notes.map(note => {
          return <Note key={note.id} {...note}/>
      })}
  </div>;
};

export default NoteList