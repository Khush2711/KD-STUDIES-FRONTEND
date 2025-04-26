import toast from "react-hot-toast";
import { setLoading, setEmailSent, setToken, clearUserData } from "../../Slice/authSlice";
import { apiConnector } from "../apiconnector";
import { categories } from "../apis";
// import { useNavigate } from "react-router-dom";
import { setUser, setLoading as profileLoader, setAdditionalDetails } from "../../Slice/profileSlice";
import { setUserData } from "../../Slice/authSlice";
import { decryptData, encryptData } from "../../utils/encryptionUtils"; // Import encryption utility

export function getPasswordResetToken(email) {
    return async (dispatch) => {
        dispatch(setLoading(true));  // Start loading

        try {
            const response = await apiConnector("POST", categories.RESETPASSWORDTOKEN_API, { email });
            // console.log("Reset Password Response......", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            dispatch(setEmailSent(true));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while sending the password reset email.");
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", categories.RESETPASSWORD_API, { password, confirmPassword, token });
            // console.log("Reset Password Response......", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password Update Successfully....");
            dispatch(setEmailSent(true));
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while updating password.");
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}


export function Signup({ accountType, firstName, lastName, email, password, confirmPassword, otp, navigate }) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", categories.SIGNUP_API, { firstName, lastName, email, password, confirmPassword, accountType, otp });



            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfully....");
            dispatch(setEmailSent(true));
            dispatch(setToken(response.data.token));


            const user = response.data.user;
            const userImage = user?.image
                ? user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

            dispatch(setUser({ ...user, image: userImage }));


            console.log('response : ', response);


            let encryptedData = encryptData(user);
            localStorage.setItem("userData", encryptedData);
            localStorage.setItem("token", user.token);

            dispatch(setUser(user));

            navigate('/dashboard/my-profile');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error occurred while Signup.");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function sendOTP(email) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", categories.SIGNUP_OTP_SENDER, { email });

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent Successfully....");
            dispatch(setEmailSent(true));
            return Promise.resolve(); // Resolving promise to handle in SignupForm
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while sending OTP.");
            return Promise.reject(error); // Rejecting promise to handle error in SignupForm
        } finally {
            dispatch(setLoading(false));
        }
    };
}



export const login = (email, password, navigate) => async (dispatch) => {
    try {
        // const response = await axios.post("/api/login", { email, password });
        const response = await apiConnector("POST", categories.LOGIN, { email, password });

        const userData = response.data; // Assuming user data and token are returned
        // Dispatch user data to Redux store
        dispatch(setUserData(userData.user));
        dispatch(setToken(userData.user.token));


        let encryptedData = encryptData(userData.user);
        let encryptedAdditionalData = encryptData(userData?.user?.additionDetails);
        localStorage.setItem("userData", encryptedData);
        localStorage.setItem("sys_ref", encryptedAdditionalData);
        localStorage.setItem("token", userData.user.token);

        dispatch(setUser(userData.user));
        dispatch(setAdditionalDetails(userData?.user?.additionDetails));

        // Navigate to the dashboard or any protected route
        navigate("/dashboard/my-profile");
    } catch (error) {
        toast.error(error.response.data.message || "Login Failed")
        console.error("Login failed:", error);
    }
};


export function logout(navigate) {
    return async (dispatch) => {
        try {
            // Logout request with credentials to ensure cookies are sent
            await apiConnector("POST", categories.LOGOUT, null, { withCredentials: true });

            dispatch(clearUserData());
            localStorage.removeItem("sys_ref");
            localStorage.removeItem("userData");
            localStorage.removeItem("token");

            toast.success("Logged out");
            navigate("/"); // Redirect to login page
            window.location.reload("/");
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed, please try again");
        }
    };
}

// Change Profile image

/*
export function changeProfile(navigate, formData) {
    return async (dispatch) => {
        try {

            let headers = {
                Authorisation: localStorage.getItem("token")
            }
            console.log(formData);

            // Logout request with credentials to ensure cookies are sent
            let profileImage = await apiConnector("PUT", categories.CHANGE_PROFILE_IMAGE, formData, headers, { withCredentials: true });
            console.log(profileImage);
            toast.success("Profile Image Changed Successfully");
            let userData = encryptData(profileImage);
            console.log(userData);
            localStorage.setItem(userData);
            dispatch(setUserData(profileImage));

        } catch (error) {
            console.error("Failed to change profile", error);
            toast.error("Failed to upload image");
            console.log(error);
        }
    };
}
*/

export function changeProfile(navigate, formData) {
    return async (dispatch) => {
        try {
            let headers = {
                Authorisation: localStorage.getItem("token")
            }
            console.log(formData);

            // Logout request with credentials to ensure cookies are sent
            let profileImage = await apiConnector("PUT", categories.CHANGE_PROFILE_IMAGE, formData, headers, { withCredentials: true });
            console.log(profileImage);

            // Successfully updated profile image
            toast.success("Profile Image Changed Successfully");

            // Dispatch the updated profile image to Redux store
            dispatch(setUser(profileImage.data)); // Assuming `profileImage.data` contains the updated user info

            // Update the local storage with the new image (and other user data if needed)
            const updatedUserData = { ...profileImage.data }; // Adjust as needed
            let encryptedData = encryptData(profileImage)
            localStorage.setItem("user", JSON.stringify(encryptedData));  // Store updated data in localStorage

        } catch (error) {
            console.error("Failed to change profile", error);
            toast.error("Failed to upload image");
            console.log(error);
        }
    };
}


export function sendMail({ email, title, body }) {
    return async (dispatch) => {
        dispatch(setLoading(true));  // Start loading

        try {
            const response = await apiConnector("POST", categories.SEND_MAIL, { email, title, body });
            // console.log("Reset Password Response......", response);

            if (!response?.data?.success) {
                throw new Error(response.data.message);
            }

            toast.success("Mail Sent Successfully....");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while sending the mail...");
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    };
}