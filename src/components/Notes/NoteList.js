import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";

import { noteActions } from "../../store/note-slice";

import { Note } from '.';
import { AddNote } from '.';

const NoteList = () => {
  const refresh = useSelector((state) => state.note.refresh);
  const notes = useSelector((state) => state.note.notes); // get notes data from note-slice state
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // fetch data from server
  const fetchNotes = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get('/notes/');
      dispatch(noteActions.setNotes(response.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  },[dispatch]);

  // fetch data on first render
  useEffect(() => {
    fetchNotes();
  }, [refresh,fetchNotes]); // fetch data whenever the refresh state changes


  const noteList = notes.map(note => {
          return <Note key={note.id} {...note}/>
      })
  
  const content = !isLoading ? noteList : <h2>Loading...</h2>;

  return <div>
      <AddNote/>
      {content}
  </div>;
};

export default NoteList
