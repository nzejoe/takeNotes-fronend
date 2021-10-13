import { configureStore } from "@reduxjs/toolkit";

import labelReducer from "./label-slice";
import noteSlice from "./note-slice";
import { userReducer } from "./users-slice";


const store = configureStore({
    reducer:{note: noteSlice.reducer,label: labelReducer, users: userReducer}
});

export default store;