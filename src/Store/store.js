import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducer";

const Store = configureStore({
    reducer:rootReducer,
})

export default Store;