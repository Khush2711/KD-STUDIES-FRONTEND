import React, { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../Slice/authSlice";
import { sendOTP } from "../../services/operations/authAPI";
import Loader from "./Loader";
import toast from "react-hot-toast";

function SignupForm({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // States for password visibility
    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false,
    });

    const handlePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // State for loading status
    // const { signupData } = useSelector((state) => state.auth);

    // State for current tab (user type selection)
    const [currentTab, setCurrentTab] = useState(user[0]);

    // Handle user type selection (current tab)
    const tabHandler = (ele) => {
        setCurrentTab(ele);
    };

    // Form data state
    const [userData, setUserData] = useState({
        accountType: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Handle form input changes
    const handleOnChange = (e) => {
        setUserData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // const { firstName, lastName, email, password, confirmPassword } = userData;

        // Password match validation
        if (userData.password !== userData.confirmPassword) {
            toast.error("Password and Confirm Password do not match.");
            return;
        }

        // // Password length validation
        // if (password.length < 8) {
        //     toast.error("Kindly ensure your password is at least 8 characters long.");
        //     return;
        // }

        // Dispatch signup data to Redux store
        // Assuming userData holds the form values
        dispatch(setSignupData({
            firstName: userData.firstName,   // Make sure this is coming from the right input
            lastName: userData.lastName,     // Same here
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
            accountType: currentTab,
        }));



        // Call sendOTP API to send OTP to the user’s email
        try {
            await dispatch(sendOTP(userData.email)); // Assuming sendOTP dispatches the action
            navigate('/verify'); // Navigate to verification page if OTP sent successfully
        } catch (error) {
            console.error("Error sending OTP:", error); // Handle the error if OTP failed to send
        }
    };


    return (

        <form className="flex flex-col gap-2" onSubmit={handleOnSubmit}>
            {/* User type tabs */}
            <div className="text-richblack-200 flex gap-5 my-5 below-md:mx-auto bg-richblack-800 w-max below-md:w-full p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                {user.map((ele, i) => (
                    <p
                        className={`px-6 py-1 ${currentTab === ele ? 'bg-richblack-900 text-richblack-5 rounded-full' : ''}`}
                        key={i}
                        onClick={() => tabHandler(ele)}
                    >
                        {ele}
                    </p>
                ))}
            </div>

            {/* First Name & Last Name */}
            <div className="flex gap-4">
                <div className="w-full">
                    <p className="text-richblack-100 my-2">
                        First Name <span className="text-pink-200">*</span>
                    </p>
                    <input
                        className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                        value={userData.firstName}
                        name='firstName'
                        type="text"
                        placeholder="Enter First Name"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="w-full">
                    <p className="text-richblack-100 my-2">
                        Last Name <span className="text-pink-200">*</span>
                    </p>
                    <input
                        className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                        value={userData.lastName}
                        name="lastName"
                        type="text"
                        placeholder="Enter Last Name"
                        onChange={handleOnChange}
                    />
                </div>
            </div>

            {/* Email Address */}
            <div className="w-full">
                <p className="text-richblack-100 my-2">
                    Email Address <span className="text-pink-200">*</span>
                </p>
                <input
                    className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                    name="email"
                    value={userData.email}
                    type="email"
                    placeholder="Enter Email Address"
                    onChange={handleOnChange}
                />
            </div>

            {/* Password and Confirm Password */}
            <div className="flex gap-4 below-md:flex-col custom:flex-row">
                <div className="w-full relative">
                    <p className="text-richblack-100 my-2 relative">
                        Create Password <span className="text-pink-200">*</span>
                        <input
                            className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                            type={passwordVisibility.password ? 'text' : 'password'}
                            placeholder="Enter Password"
                            name="password"
                            value={userData.password}
                            onChange={handleOnChange}
                        />
                        <div onClick={() => handlePasswordVisibility("password")}>
                            {!passwordVisibility.password ? <FiEye className="absolute top-9 right-4" /> : <FiEyeOff className="absolute top-9 right-4" />}
                        </div>
                    </p>
                </div>
                <div className="w-full relative">
                    <p className="text-richblack-100 my-2 relative">
                        Confirm Password <span className="text-pink-200">*</span>
                        <input
                            className="w-full focus:outline-none custom-box-shadow bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleOnChange}
                        />
                        <div onClick={() => handlePasswordVisibility("confirmPassword")}>
                            {!passwordVisibility.confirmPassword ? <FiEye className="absolute top-9 right-4" /> : <FiEyeOff className="absolute top-9 right-4" />}
                        </div>
                    </p>
                </div>
            </div>

            {/* Submit Button */}
            <div className="my-5">

                <button className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black" type="submit">
                    Create Account
                </button>

            </div>
        </form >
    );
}

export default SignupForm;
