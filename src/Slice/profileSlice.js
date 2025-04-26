import { createSlice } from "@reduxjs/toolkit";
import { decryptData } from "../utils/encryptionUtils";
import { useNavigate } from "react-router-dom";

const initialState = {
  signupData: null,
  loading: false,
  user: null,
  additionalDetails: null
};

const profileSlice = createSlice({
  name: "Profile",
  initialState: initialState,

  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },
    setUser: (state, value) => {
      state.user = value.payload
    },
    setAdditionalDetails: (state, value) => {
      state.additionalDetails = value.payload
    }
  }
})

export const { setSignupData, setLoading, setUser, setAdditionalDetails } = profileSlice.actions;
export default profileSlice.reducer;

/*
export const initializeUser = () => (dispatch) => {

  // const navigate = useNavigate();
  const encryptedData = localStorage.getItem("userData");
  const sys_ref = localStorage.getItem("sys_ref");
  if (encryptedData) {
    try {
      const decryptedData = decryptData(encryptedData);
      const decryptAdditionalData = decryptData(sys_ref);

      console.log(decryptAdditionalData);

      // Validate the expiry time
      const currentTime = new Date().getTime();
      if (decryptedData.expiryTime && decryptedData.expiryTime > currentTime) {
        dispatch(setUser(decryptedData)); // Set decrypted user data in Redux
        dispatch(setAdditionalDetails({ ...decryptAdditionalData })); // Correct function name here
      } else {
        console.warn("User data has expired.");
        localStorage.removeItem("userData"); // Remove expired data
        localStorage.removeItem("token"); // Remove expired data
        localStorage.removeItem("sys_ref");
        // navigate("/");
      }
    } catch (error) {
      console.error("Failed to decrypt user data:", error);
      localStorage.removeItem("userData"); // Remove expired data
      localStorage.removeItem("token"); // Remove corrupted data
      localStorage.removeItem("sys_ref");
      // navigate("/");
    }
  }
};
*/