import { createSlice } from "@reduxjs/toolkit";


const {actions, reducer} = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        update: '',
        labelAdd: false,
    },
    reducers: {
        openModal:(state, action)=>{
            state.update = action.payload;
            state.isOpen = true
        },
        closeModal:(state, action)=>{
            state.isOpen = false;
            state.update = '';
        },
        openLabel:(state, action)=>{
            state.labelAdd = true
            state.isOpen = true
        },
        closeLabel:(state, action)=>{
            state.labelAdd = false
            state.isOpen = false
        },
    }
});

export const { openModal, closeModal, openLabel, closeLabel } = actions;

export default reducer;