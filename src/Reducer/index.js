import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import profileReducer from "../Slice/profileSlice";
import cartReducer from "../Slice/cartSlice";
import viewCourseReducer from "../Slice/viewCourseSlice";
import courseReducer from "../Slice/course";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    viewCourse: viewCourseReducer,
    course:courseReducer
})

export default rootReducer;