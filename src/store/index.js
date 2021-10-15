import { configureStore } from "@reduxjs/toolkit";

import labelReducer from "./label-slice";
import noteRducer from "./note-slice";
import { userReducer } from "./users-slice";


const store = configureStore({
    reducer:{note: noteRducer,label: labelReducer, users: userReducer}
});

export default store;