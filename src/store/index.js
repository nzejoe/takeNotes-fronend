import { configureStore } from "@reduxjs/toolkit";

import labelReducer from "./label-slice";
import noteSlice from "./note-slice";


const store = configureStore({
    reducer:{note: noteSlice.reducer,label: labelReducer}
});

export default store;