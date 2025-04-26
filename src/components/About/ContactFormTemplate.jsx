import React from "react";
import ContactForm from "./ContactForm";
import { useLocation } from "react-router-dom";

function ContactFormTemplate() {

  const location = useLocation();



  return <div className=" mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
    <div className="mx-auto border border-richblack-600 rounded-xl p-6 flex flex-col gap-4">
      <p className="text-center text-4xl font-mono font-semibold">
        {
          location.pathname === '/about' ? "Get in Touch" : "Got a Idea? We've got the skills. Let's team up"
        }
      </p>
      <p className="text-center text-richblack-300 ">
        {
          location.pathname === '/about' ? "We'd love to here for you, Please fill out this form." : "Tell us more about yourself and what you're got in mind."
        }
      </p>

      <ContactForm />
    </div>

  </div>;
}

export default ContactFormTemplate;
