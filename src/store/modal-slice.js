import { createSlice } from "@reduxjs/toolkit";


const {actions, reducer} = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        update: ''
    },
    reducers: {
        openModal:(state, action)=>{
            state.update = action.payload;
            state.isOpen = true
        },
        closeModal:(state, action)=>{
            state.isOpen = false;
            state.update = '';
        }
    }
});

export const { openModal, closeModal } = actions;

export default reducer;