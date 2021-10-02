import { createSlice } from "@reduxjs/toolkit";



const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes(state, action){
        state.notes = action.payload;
    }
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice;
