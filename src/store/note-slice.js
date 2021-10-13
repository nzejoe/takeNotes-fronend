import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// js-cookie for generating csrf token
import Cookies from "js-cookie";

export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (paylod, {getState}) => {
    return await axios({
      url: "/notes/",
      method: "GET",
      headers: {
        authorization: `token ${paylod}`,
      },
    }).then((res) => res.data);
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {
    allNotes: [],
    filteredNotes: [],
    refresh: false,
    csrf_token: Cookies.get("csrftoken"),
  },
  reducers: {
    getAllNotes(state) {
      state.filteredNotes = state.allNotes;
    },

    filterNotes(state, action) {
      state.filteredNotes = state.allNotes.filter(
        (note) => note.label === action.payload
      );
      return state;
    },

    deleteNote(state, action) {
      const id = action.payload;

      // send request
      axios({
        method: "DELETE",
        url: `notes/${id}/`,
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": state.csrf_token,
        },
      })
        .then((res) => res.data)
        .catch((err) => console.log(err));

      // refresh the note list
      return { ...state, refresh: !state.refresh };
    },

    updateNote(state, action) {
      const { id, noteUpdate } = action.payload;

      // send request
      axios({
        method: "PUT",
        url: `notes/${id}/`,
        headers: {
          "x-csrftoken": state.csrf_token,
          "Content-type": "application/json",
        },
        data: noteUpdate,
      })
        .then((res) => res.data)
        .catch((err) => console.log(err));

      // refresh the note list
      return { ...state, refresh: !state.refresh };
    },

    addNote(state, action) {
      const note = action.payload;

      // send request
      axios({
        method: "POST",
        url: "/notes/",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": state.csrf_token,
        },
        data: note,
      })
        .then((res) => res.data)
        .catch((err) => console.log(err));

      // refresh the note list
      return { ...state, refresh: !state.refresh };
    },
  },

  extraReducers: {
    [fetchNotes.fulfilled]: (state, action) => {
      state.allNotes = action.payload;
      state.filteredNotes = state.allNotes;
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
