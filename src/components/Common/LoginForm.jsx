// src/components/LoginForm.js
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/authAPI";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userDetails;
        dispatch(login(email, password, navigate));
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit} className="flex flex-col gap-2">
                <div className="w-full">
                    <p className="text-richblack-100 my-2">
                        Email Address <span className="text-pink-200">*</span>
                    </p>
                    <input
                        className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={userDetails.email}
                        onChange={handleOnChange}
                        autoComplete="on"
                    />
                </div>

                <div className="w-full relative">
                    <p className="text-richblack-100 my-2">
                        Password <span className="text-pink-200">*</span>
                    </p>
                    <input
                        className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password"
                        value={userDetails.password}
                        onChange={handleOnChange}
                        autoComplete="on"
                    />
                    <div
                        className="absolute top-[50px] right-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                </div>

                <div className="my-5">
                    <button
                        className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black"
                        type="submit"
                    >
                        Sign in
                    </button>
                    <div className="mt-2 ml-auto max-w-max text-xs text-blue-100">
                        <Link to="/forgot-password">
                            <p>Forgot Password</p>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
