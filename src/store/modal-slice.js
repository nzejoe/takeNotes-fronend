import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    add: false,
    note: null,
    label: false,
  },
  reducers: {
    openAddNoteModal: (state, action) => {
      state.add = true;
      state.isOpen = true;
    },
    openNoteModal: (state, action) => {
      state.note = action.payload;
      state.isOpen = true;
    },
    openLabelModal: (state, action) => {
      state.label = true;
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.note = null;
      state.add = false;
      state.label = false;
    },
  },
});

export const {
  openNoteModal,
  openAddNoteModal,
  openLabelModal,
  closeModal,
} = actions;

export default reducer;
