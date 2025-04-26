import { createSlice } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "../utils/encryptionUtils";

const initialState = {
    user: null,
    token: null,
    signupData: null,
    loading: false,
    emailSent: false,
};

const localStorageToken = localStorage.getItem("token");
if(localStorageToken)
{
    initialState.token = localStorageToken;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setEmailSent(state, action) {
            state.emailSent = action.payload;
        },
        setUserData(state, action) {
            const userData = action.payload;
            if (userData) {
                state.user = userData;
                state.token = userData.token;

                // Encrypt and store in localStorage
                const encryptedData = encryptData({ userData });
                localStorage.setItem("userData", encryptedData);
            }
        },
        clearUserData(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("userData");
        }
    }
});

export const {
    setToken,
    setSignupData,
    setLoading,
    setEmailSent,
    setUserData,
    clearUserData
} = authSlice.actions;

export default authSlice.reducer;
