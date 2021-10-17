import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const csrf_token = Cookies.get('csrftoken')

//******** fetch label ********/
export const fetchLabels = createAsyncThunk(
  "label/fetchLabels",
  async (payload, { rejectWithValue }) => {
    try {
      const response = axios({
        url: "/labels/",
        method: "GET",
        headers: {
          authorization: `token ${payload}`,
        },
      });
      return (await response).data;
    } catch (err) {
      const error = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
); //******** end of fetch label ********/

//******** add label ********/
export const addLabel = createAsyncThunk(
  "label/add",
  async (payload, { rejectWithValue }) => {
      const { label, token } = payload
    try {
      const response = axios({
        url: "/labels/",
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'x-csrftoken': csrf_token,
          authorization: `token ${token}`,
        },
        data: label
      });
      return (await response).data;
    } catch (err) {
      const error = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
); //******** end of add label ********/

const { actions, reducer } = createSlice({
  name: "label",
  initialState: {
    currentRequestId: null,
    labels: [{ id: 0, name: "" }],
    refresh: 0,
  },
  reducers: {
    refreshList(state, action) {
      state.refresh++
    },
  },
  extraReducers: {
      // fetch
      [fetchLabels.pending]:(state, action)=>{
        const { requestId } = action.meta
        state.currentRequestId = requestId
      },
      [fetchLabels.fulfilled]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            state.labels = action.payload
            state.currentRequestId = null
        }
      },
      [fetchLabels.rejected]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            console.log(action.payload)
            state.currentRequestId = null
        }
      },// end of fetch
      // add
      [addLabel.pending]:(state, action)=>{
        const { requestId } = action.meta
        state.currentRequestId = requestId
      },
      [addLabel.fulfilled]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            state.refresh ++
            state.currentRequestId = null
        }
      },
      [addLabel.rejected]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            console.log(action.payload)
            state.currentRequestId = null
        }
      },// end of add
  }
});

export const { refreshList } = actions;

export default reducer;
