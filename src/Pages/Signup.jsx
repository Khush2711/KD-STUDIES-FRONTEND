import React, { useState } from "react";
import SignupImage from "../assets/Images/signup.webp";
import Template from "../components/Common/Template";

const user = ["Student", "Instructor"];

const data = { 
    title: "Join the millions learning to code with StudyNotion for free",
    subtitle :"Build skills for today, tomorrow, and beyond.",
    HighlightPoint : "Education to future-proof your career.",
    FormType : "signup", 
    frontImage : SignupImage,
    user : user
};

function Signup() {

    return <div className="w-11/12 mx-auto ">

        <Template {...data}/>

    </div>;
}

export default Signup;
