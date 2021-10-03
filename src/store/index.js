import { configureStore } from "@reduxjs/toolkit";

import noteSlice from "./note-slice";
import labelReducer from "./label-slice";


const store = configureStore({
    reducer:{note: noteSlice.reducer, label: labelReducer}
});

export default store;