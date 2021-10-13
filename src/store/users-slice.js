import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthUser } from "../helpers";

// csrf token generator
import Cookie from "js-cookie";

// login thunk
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
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isAuthenticated: Boolean(getAuthUser()),
    authUser: null,
    error: null,
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
      .then(res => {})
      .catch(err => console.log(err));

      state.isAuthenticated = false;
      state.authUser = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      // save logged in user to localstorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      // reset error
      state.error = null;
      state.isAuthenticated = true;
    },

    [userLogin.rejected]: (state, action) => {
      if (action.payload) {
        // set error
        state.error = action.payload;
        state.isAuthenticated = false;
        state.authUser = null;
        localStorage.removeItem("user");
      }
    },
  },
});

export const userReducer = userSlice.reducer;

const userAction = userSlice.actions;

export default userAction;
