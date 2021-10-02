import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// js-cookie for generating csrf token
import Cookies from 'js-cookie'



const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    refresh: false,
  },
  reducers: {
    setNotes(state, action){
        state.notes = action.payload;
    },
    addNote(state, action){
      const note = action.payload;
      const csrf_token = Cookies.get("csrftoken");

      axios({
        method: "POST",
        url: "/notes/",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrf_token,
        },
        data: note,
      }).catch(error => console.log(error));

      // refresh the note list
      state.refresh = !state.refresh;
    }
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
