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

//*********** update note ****************/
export const updateNote = createAsyncThunk(
  "note/updateNote",
  async (payload, { rejectWithValue, getState }) => {
    const { csrf_token } = getState().note;
    const { id, noteUpdate, token } = payload;
    try {
      const response = await axios({
        url: `notes/${id}/`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-csrftoken": csrf_token,
          authorization: `token ${token}`,
        },
        data: noteUpdate,
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
); //*********** end of update note ****************/

//*********** delete note ****************/
export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (payload, { rejectWithValue, getState }) => {
    const { csrf_token } = getState().note;
    const { id, token } = payload;
    try {
      const response = await axios({
        url: `notes/${id}/`,
        method: "DELETE",
        headers: {
          "x-csrftoken": csrf_token,
          authorization: `token ${token}`,
        },
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
); //*********** end of delete note ****************/

const {actions, reducer} = createSlice({
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

    refreshList(state, action) {
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
  // extra reducers
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

    // update note begins
    [updateNote.pending]: (state, action) => {
      const { requestId } = action.meta; // get request id
      state.curentRequestId = requestId;
    },
    [updateNote.fulfilled]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        state.curentRequestId = null;
      }
    },
    [updateNote.rejected]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        console.log(action.payload);
        state.curentRequestId = null;
      }
    }, // end of update note

    // delete note begins
    [deleteNote.pending]: (state, action) => {
      const { requestId } = action.meta; // get request id
      state.curentRequestId = requestId;
    },
    [deleteNote.fulfilled]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        state.curentRequestId = null;
      }
    },
    [deleteNote.rejected]: (state, action) => {
      const { requestId } = action.meta; // get request id
      if (state.curentRequestId === requestId) {
        console.log(action.payload);
        state.curentRequestId = null;
      }
    }, // end of delete note
  },
});

export const { refreshList, getAllNotes, filterNotes } = actions;

export default reducer;
