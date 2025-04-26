import React, { useState } from "react";
import BackgroundSignupGrid from "../../assets/Images/frame.png";
import HighlightText from "../../components/core/HomePage/HighlightText";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";
import Loader from "./Loader";



function Template({ title, subtitle, HighlightPoint, FormType, frontImage, user }) {

    const { loading } = useSelector((state) => state.auth);


    return <div className="w-11/12 mx-auto ">

        {
            loading ? (

                <div className="flex items-center justify-center h-[80vh]">
                    <Loader />
                </div>

            ) :
                (

                    <div className="flex my-10 justify-between below-md:flex-col-reverse below-md:gap-12 custom:gap-28">

                        <div className="w-[500px] below-md:w-full below-md:mx-auto text-white ">

                            <div className="flex flex-col gap-4 below-md:items-center">
                                <h2 className="text-3xl font-bold">{title}</h2>

                                <p className=" text-richblack-100 text-xl">{subtitle}<br></br>
                                    <span className="italic font-edu-sa text-base"><HighlightText text={HighlightPoint} /></span>
                                </p>
                            </div>

                            {/* FORM */}
                            {
                                FormType === "login" ? <LoginForm user={user} /> : <SignupForm user={user} />
                            }


                        </div>


                        {/* Images */}
                        <div className="flex justify-center below-md:w-full">
                            <div className="relative below-md:mx-8 ">
                                <img className="xl:w-[500px]  absolute -top-5 -left-5" src={frontImage} alt="backgroundFrame" />
                                <img className="xl:w-[500px]" src={BackgroundSignupGrid} alt="backgroundFrame" />
                            </div>
                        </div>

                    </div>


                )
        }
    </div>;
}

export default Template;
