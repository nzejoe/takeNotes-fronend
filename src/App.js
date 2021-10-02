import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";


import { noteActions } from "./store/note-slice";
import NoteList from "./components/NoteList";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const dispatch = useDispatch()

  // fetch data from server
  async function fetchNotes() {
    setIsLoading(true)

    try {
      const response = await axios.get("/notes/");
      setNotes(response.data)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // fetch data on first render
  useEffect(()=>{
    fetchNotes();
  },[])

  useEffect(() => {
    dispatch(noteActions.setNotes(notes));
  },[notes ,dispatch]);


  if(isLoading){
    return <h2>Loading...</h2>
  }


  return <div>
    <NoteList/>
  </div>;
}

export default App;
