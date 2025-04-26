// import Course from "../components/core/Dashboard/Buy Course/Course";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Base url = http://localhost:4000/api/v1

export const categories = {
    CATEGORIES_API: BASE_URL + "/courseRoutes/showAllCategories",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SIGNUP_OTP_SENDER: BASE_URL + "/auth/sendotp",
    LOGIN: BASE_URL + "/auth/login",
    LOGOUT: BASE_URL + "/auth/logout",
    CHANGE_PROFILE_IMAGE: BASE_URL + "/Profile/updateDisplayPicture",
    SEND_MAIL : BASE_URL + "/sendMail"
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// Profile PAGE API
export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API : BASE_URL + "/profile/instructorDashboard"
}

// Course PAGE API
export const courseEndpoints = {
    COURSE_DETAILS_API: BASE_URL + "/courseRoutes/getCourseDetails",
    COURSE_CATEGORIES_API: BASE_URL + "/courseRoutes/showAllCategories",
    GET_ALL_COURSE_API: BASE_URL + "/courseRoutes/getAllCourses",
    CREATE_COURSE_API: BASE_URL + "/courseRoutes/createCourse",
    EDIT_COURSE_API: BASE_URL + "/courseRoutes/editCourse",
    CREATE_SECTION_API: BASE_URL + "/courseRoutes/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/courseRoutes/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/courseRoutes/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/courseRoutes/updateSubSection",
    DELETE_SECTION_API: BASE_URL + "/courseRoutes/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/courseRoutes/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/courseRoutes/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/courseRoutes/getFullCourseDetails",
    CREATE_RATING_API: BASE_URL + "/courseRoutes/createRating",
    LECTURE_COMPLETION_API: BASE_URL + "/courseRoutes/updateCourseProgress",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/courseRoutes/myCourses",
};


export const catalogData = {
    CATALOGPAGEDATA_API : BASE_URL + "/courseRoutes/getCategoryPageDetails"
}

export const studentEndpoints = {
    COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API : BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "/payment/sendPaymentSuccessEmail"
}

export const ratingEndpoints = {
    REVIEW_DETAILS_API : BASE_URL + "/courseRoutes/getReviews"
}