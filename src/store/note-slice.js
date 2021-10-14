import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// js-cookie for generating csrf token
import Cookies from "js-cookie";

//*********** fetch notes ****************/
export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (paylod, { getState }) => {
    return await axios({
      url: "/notes/",
      method: "GET",
      headers: {
        authorization: `token ${paylod}`,
      },
    }).then((res) => res.data);
  }
); //*********** end of fetch notes ****************/

//*********** add notes ****************/
export const addNewNote = createAsyncThunk(
  "note/addNote",
  async (payload, { rejectWithValue, getState }) => {
    const { newNote, token } = payload;
    const { csrftoken } = getState().note;

    try {
      const response = await axios({
        url: "/notes/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-csrftoken": csrftoken,
          authorization: `token ${token}`,
        },
        data: newNote,
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
); //*********** end of add notes ****************/

const noteSlice = createSlice({
  name: "note",
  initialState: {
    curentRequestId: null,
    allNotes: [],
    filteredNotes: [],
    refresh: 0,
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
      state.refresh++;
      return state;
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
      state.refresh++;
      return state;
    },
  },

  extraReducers: {
    // fetch notes begins
    [fetchNotes.pending]: (state, action) => {
      const { requestId } = action.meta; // get request id
      state.curentRequestId = requestId;
    },
    [fetchNotes.fulfilled]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        state.allNotes = action.payload;
        state.filteredNotes = state.allNotes;
        state.curentRequestId = null;
      }
    },
    [fetchNotes.rejected]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        console.log(action.payload);
        state.curentRequestId = null;
      }
    }, // end of fetch notes

    // add note begins
    [addNewNote.pending]: (state, action) => {
      const { requestId } = action.meta; // get request id
      state.curentRequestId = requestId;
    },
    [addNewNote.fulfilled]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        state.refresh++;
        state.curentRequestId = null;
      }
    },
    [addNewNote.rejected]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        console.log(action.payload);
        state.curentRequestId = null;
      }
    }, // end of add note
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
