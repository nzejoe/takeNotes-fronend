import { createSlice } from "@reduxjs/toolkit";


const labelSlice = createSlice({
    name:'label',
    initialState:{
        labels: [{id:0 ,name: ''}]
    },
    reducers: {
        setLabels(state, action){
            state.labels = action.payload;
        },
    }
});

const labelReducer = labelSlice.reducer

export const labelActions = labelSlice.actions

export default labelReducer;