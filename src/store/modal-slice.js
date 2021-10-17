import { createSlice } from "@reduxjs/toolkit";


const {actions, reducer} = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        note: null,
        label: false,
    },
    reducers: {
        openNoteModal:(state, action)=>{
            state.note = action.payload;
            state.isOpen = true
        },
        closeNoteModal:(state, action)=>{
            state.isOpen = false;
            state.note = null;
        },
        openLabelModal:(state, action)=>{
            state.label = true
            state.isOpen = true
        },
        closeLabelModal:(state, action)=>{
            state.label = false
            state.isOpen = false
        },
    }
});

export const { openNoteModal, closeNoteModal, openLabelModal, closeLabelModal } = actions;

export default reducer;