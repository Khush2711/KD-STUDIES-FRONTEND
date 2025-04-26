import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Common/Loader";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

function UpdatePassword() {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const location = useLocation();

    const { Loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    function handlePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function handleConfirmPasswordVisibility() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return <div className="flex items-center justify-center h-[85vh]">
        {
            Loading ? (
                <Loader />
            ) : (
                <div className="text-richblack-100 flex flex-col gap-4 ">
                    <h1 className="text-white font-bold text-2xl">Choose New Password</h1>
                    <p className="text-richblack-100 text-sm">Almost done. Enter your new password and you are all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label htmlFor="password">
                            <p className="text-richblack-100 my-2">New Password
                                <sup>
                                    <span className="text-pink-700">*</span>
                                </sup>
                            </p>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                                type={`${showPassword ? 'text' : 'password'}`}
                                name="password"
                                value={formData.password}
                                required
                                onChange={handleOnChange}
                            />
                            <div className="absolute top-[35%] right-[5%]">

                                {
                                    showPassword ? <FiEyeOff onClick={handlePasswordVisibility} />
                                        :
                                        <FiEye onClick={handlePasswordVisibility} />
                                }
                            </div>
                        </div>

                        {/* --------------------------------------------------------------------------------- */}

                        <label htmlFor="password">
                            <p className="text-richblack-100 my-2">Confirm Password
                                <sup>
                                    <span className="text-pink-700">*</span>
                                </sup>
                            </p>
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100"
                                type={`${showConfirmPassword ? 'text' : 'password'}`}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                required
                                onChange={handleOnChange}
                            />
                            <div className="absolute top-[35%] right-[5%]">
                                {
                                    showConfirmPassword ? <FiEyeOff onClick={handleConfirmPasswordVisibility} />
                                        :
                                        <FiEye onClick={handleConfirmPasswordVisibility} />
                                }
                            </div>
                        </div>
                        <div className="">
                            <button type="submit" className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black my-5">
                                Reset Password
                            </button>

                            <div className="">
                                <Link to="/login">
                                    <p className="flex items-center gap-2"><span>←</span> Back To Login</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    </div>;
}

export default UpdatePassword;
