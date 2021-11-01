import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthUser } from "../helpers";

// csrf token generator
import Cookie from "js-cookie";

//*********************** login thunk ***************************/
export const userLogin = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState }) => {
    // get token from state
    const { csrf_token } = getState().users;
    try {
      const response = await axios({
        url: "/accounts/login/",
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
          "x-csrftoken": csrf_token,
        },
        data: payload,
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!error) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);//*********************** end of login thunk ***************************/

//*********************** user regiser thunk ***************************/
export const userRegister = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState }) => {
    const { csrf_token } = getState().users;
    // console.log(csrf_token)
    try {
      const response = await axios({
        url: "/accounts/register/",
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "x-CSRFToken": csrf_token,
        },
        data: payload,
      });
      return response.data;
    } catch (err) {
      const error = err;
      if (!err) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);//*********************** end of user regiser thunk ***************************/

//*********************** password reset thunk ***************************/
export const userPasswordReset = createAsyncThunk(
  'users/password_reset',
  async (payload, { rejectWithValue, getState })=>{
    const { csrf_token } = getState().users
    
    try {
      const response = await axios({
            method: "POST",
            url: "accounts/password_reset/",
            headers: {
              "COntent-type": "application/json",
              "X-CSRFToken": csrf_token,
            },
            data: payload,
          });
          return response.data
    } catch (err) {
      const error = err
      if(!error){
        throw err;
      }
      return rejectWithValue(error.response.data)
    }
  }
)//*********************** end of password reset thunk ***************************/

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentRequestId: null
,    users: [],
    isAuthenticated: Boolean(getAuthUser()),
    authUser: null,
    error: null,
    data: null, // use this for password reset
    csrf_token: Cookie.get("csrftoken"),
  },
  reducers: {
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
    requestLogout(state, action) {
      const token = `token ${action.payload}`;

      axios({
        url: "/accounts/logout/",
        method: "POST",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {})
        .catch((err) => console.log(err));

      state.isAuthenticated = false;
      state.authUser = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {

    //******************** login *********************/
    [userLogin.pending]:(state, action)=>{
      const { meta:{requestId} } = action // get the requestId
      state.currentRequestId = requestId;
    },
    
    [userLogin.fulfilled]:(state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload)); // save logged in user to localstorage
      state.error = null; // reset error
      state.isAuthenticated = true;
      state.currentRequestId = null; // reset currentRequestId
    },

    [userLogin.rejected]: (state, action) => {
      const { meta:{requestId} } = action // get the requestId
      if (state.currentRequestId === requestId) {
        state.error = action.payload; // set error
        state.isAuthenticated = false;
        state.authUser = null;
        localStorage.removeItem("user");
      }
    }, //******************** end of login *********************/

    //******************** register *********************/
    [userRegister.pending] :(state, action) => {
      const { meta:{requestId} } = action // get the requestId
      
      state.currentRequestId = requestId;
    },
    [userRegister.fulfilled] :(state, action) => {
       state.error = null;
      state.currentRequestId = null; // reset currentRequestId
    },
    [userRegister.rejected] :(state, action) => {
      const { meta: { requestId } } = action;
      if (state.currentRequestId === requestId){
        state.error = action.payload;
        console.log(action.payload);
      }
    }, //******************** end of register *********************/

    //******************** password reset *********************/
    [userPasswordReset.pending] :(state, action) => {
      const { requestId } = action.meta; // get the requestId

      state.currentRequestId = requestId;
      state.data = null
    },
    [userPasswordReset.fulfilled] :(state, action) => {
      const { requestId } = action.meta; // get the requestId
      if (state.currentRequestId === requestId){
        state.data = action.payload;
        console.log(action.payload)
      }
       state.error = null;
      state.currentRequestId = null; // reset currentRequestId
    },
    [userPasswordReset.rejected] :(state, action) => {
      const { requestId } = action.meta; // get the requestId
      if (state.currentRequestId === requestId){
        state.error = action.payload;
        console.log(state.error);
      }
    }, //******************** end of password reset *********************/
    
  },
});

export const userReducer = userSlice.reducer;

const userAction = userSlice.actions;

export default userAction;
