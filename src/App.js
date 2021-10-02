import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


import { noteActions } from "./store/note-slice";
import {NoteList} from "./components/Notes";

import "./App.css";

function App() {
  const refresh = useSelector(state => state.note.refresh)
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // fetch data from server
  const fetchNotes = useCallback( async ()=>{
    setIsLoading(true);

    try {
      const response = await axios.get("/notes/");
      dispatch(noteActions.setNotes(response.data))
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  },[dispatch]);

  // fetch data on first render
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes, refresh]); // fetch data whenever the refresh state changes

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <NoteList />
    </div>
  );
}

export default App;
