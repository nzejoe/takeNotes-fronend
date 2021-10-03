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
    csrf_token: Cookies.get("csrftoken"),
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

    deleteNote(state, action) {
      const id = action.payload;

      const sendRequest = async () => {
        try {
          const response = await axios({
            method: "DELETE",
            url: `notes/${id}/`,
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": state.csrf_token,
            },
          });
          console.log(response.status);
        } catch (error) {
          console.log(error);
        }
      };

      sendRequest();

      // refresh the note list
      state.refresh = !state.refresh;
    },

    updateNote(state, action){
      const { id, noteUpdate } = action.payload;

      const sendRequest = async() => {
        try {
          // eslint-disable-next-line
          const response = await axios({
            method: "PUT",
            url: `notes/${id}/`,
            headers: {
              "x-csrftoken": state.csrf_token,
              "Content-type": "application/json",
            },
            data: noteUpdate,
          });
        } catch (error) {
          console.log(error)
        }
      };

      // refresh the note list
      state.refresh = !state.refresh;
      sendRequest();
    },

    addNote(state, action) {
      const note = action.payload;

      const sendData = async () => {
        // make the function async to make sure data was sent before refreshing note list
        try {
          // eslint-disable-next-line
          const response = await axios({
            method: "POST",
            url: "/notes/",
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": state.csrf_token,
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
