import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const {actions, reducer} = createSlice({
    name:'label',
    initialState:{
        currentRequestId: null,
        labels: [{id:0 ,name: ''}],
        refresh: 0
    },
    reducers: {
        setLabels(state, action){
            state.labels = action.payload;
        },
    }
});


export const {setLabels} = actions

export default reducer