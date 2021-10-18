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
    closeAddNoteModal: (state, action) => {
      state.isOpen = false;
      state.add = false;
    },
    openNoteModal: (state, action) => {
      state.note = action.payload;
      state.isOpen = true;
    },
    closeNoteModal: (state, action) => {
      state.isOpen = false;
      state.note = null;
    },
    openLabelModal: (state, action) => {
      state.label = true;
      state.isOpen = true;
    },
    closeLabelModal: (state, action) => {
      state.label = false;
      state.isOpen = false;
    },
  },
});

export const {
  openNoteModal,
  closeNoteModal,
  openLabelModal,
  closeLabelModal,
  openAddNoteModal,
  closeAddNoteModal,
} = actions;

export default reducer;
