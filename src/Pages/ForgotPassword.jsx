import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Loader from "../components/Common/Loader";
import { setEmailSent } from "../Slice/authSlice";

function ForgotPassword() {

    const emailSent = useSelector((state) => state.auth.emailSent);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (emailSent) {
            dispatch(setEmailSent(false));
        }
        dispatch(getPasswordResetToken(email));
    }

    useEffect(()=>{
        dispatch(setEmailSent(false));
    },[])

    return <div className="flex justify-center items-center h-[85vh]">


        {
            loading ? (
                <Loader/>

            ) : (
                <div className="flex flex-col text-white w-[300px] gap-4">
                    <h1 className="text-white font-bold text-2xl">
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>
                    <p className="text-richblack-100 text-sm">
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try another recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p className="text-richblack-100 my-2">
                                        Email Address <span className="text-pink-200">*</span>
                                    </p>
                                    <input className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100" type="email"
                                        placeholder="Enter Email ID"
                                        name="email"
                                        required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }} />

                                </label>
                            )
                        }

                        <button type="submit" className="py-2 rounded-lg font-inter font-bold w-full bg-yellow-50 text-black my-5">
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>

                        <div className="">
                            <Link to="/login">
                                <p className="flex items-center gap-2"><span>←</span> Back To Login</p>
                            </Link>
                        </div>

                    </form>



                </div>
            )
        }
    </div>;
}

export default ForgotPassword;