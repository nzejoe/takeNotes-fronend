import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// js-cookie for generating csrf token
import Cookies from "js-cookie";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    allNotes: [],
    filteredNotes: [],
    refresh: false,
  },
  reducers: {

    setNotes(state, action) {
      state.allNotes = action.payload; // set all notes with returned note data from server
      state.filteredNotes = state.allNotes; // set filtered notes with all notes
    },

    getAllNotes(state) {
      state.filteredNotes = state.allNotes;
    },

    filterNotes(state, action) {
      state.filteredNotes = state.allNotes.filter(
        (note) => note.label === action.payload
      );
    },

    addNote(state, action) {
      const note = action.payload;
      const csrf_token = Cookies.get("csrftoken");

      const sendData = async () => {
        // make the function async to make sure data was sent before refreshing note list
        try {
          // eslint-disable-next-line
          const response = await axios({
            method: "POST",
            url: "/notes/",
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrf_token,
            },
            data: note,
          });
        } catch (error) {
          console.log(error);
        }
      };

      sendData();

      // refresh the note list
      state.refresh = !state.refresh;
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
