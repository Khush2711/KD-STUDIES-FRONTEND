import React from "react";
import frontImage from "../assets/Images/login.webp";
import Template from "../components/Common/Template";

const user = ["Student", "Instructor"];

const data = { 
    title: "Welcome Back",
    subtitle :"Discover your passions,",
    HighlightPoint : "Be Unstoppable",
    FormType : "login", 
    frontImage : frontImage,
    user : user
}


function Login() {
  return <div>
    <Template {...data} />
  </div>;
}

export default Login;
