import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isAuthenticated: false,
        authenticatedUser:{}
    },
    reducers:{
        
    }
})