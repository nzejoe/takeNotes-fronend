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

//******** update label ********/
export const updateLabel = createAsyncThunk(
  "label/update",
  async (payload, { rejectWithValue }) => {
      const { id, label, token, } = payload
    try {
      const response = axios({
        url: `/labels/${id}/`,
        method: "PUT",
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
); //******** end of update label ********/

//******** delete label ********/
export const deleteLabel = createAsyncThunk(
  "label/delete",
  async (payload, { rejectWithValue }) => {
      const { id, token, } = payload
    try {
      const response = axios({
        url: `/labels/${id}/`,
        method: "DELETE",
        headers: {
          'x-csrftoken': csrf_token,
          authorization: `token ${token}`,
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
); //******** end of delete label ********/

const { actions, reducer } = createSlice({
  name: "label",
  initialState: {
    currentRequestId: null,
    labels: [{ id: 0, name: "" }],
    error: null,
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
            state.error = null;
            state.refresh ++
            state.currentRequestId = null
        }
      },
      [addLabel.rejected]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            // console.log(action.payload);
            state.error = action.payload;
            console.log(state.error)
            state.currentRequestId = null
        }
      },// end of add

      // update
      [updateLabel.pending]:(state, action)=>{
        const { requestId } = action.meta
        state.currentRequestId = requestId
      },
      [updateLabel.fulfilled]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            state.refresh ++
            state.currentRequestId = null
        }
      },
      [updateLabel.rejected]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            console.log(action.payload)
            state.currentRequestId = null
        }
      },// end of update

      // delete
      [deleteLabel.pending]:(state, action)=>{
        const { requestId } = action.meta
        state.currentRequestId = requestId
      },
      [deleteLabel.fulfilled]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            state.refresh ++
            state.currentRequestId = null
        }
      },
      [deleteLabel.rejected]:(state, action)=>{
        const { requestId } = action.meta
        if(state.currentRequestId === requestId){
            console.log(action.payload)
            state.currentRequestId = null
        }
      },// end of delete
  }
});

export const { refreshList } = actions;

export default reducer;
