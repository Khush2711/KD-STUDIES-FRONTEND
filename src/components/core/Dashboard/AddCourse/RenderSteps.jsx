import React from "react";
import { useSelector } from "react-redux";
import { Stepper } from "react-form-stepper";

import CourseInformationForm from "./Course Information/CourseInformationForm";
import CourseBuilderForm from "./Course Information/CourseBuilderForm";
import CoursePublishForm from "./Course Information/CoursePublishForm";

import "./stepperStyles.css"; // ⬅️ custom styles for dotted line + active step

function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { label: "Course Information" },
    { label: "Course Builder" },
    { label: "Publishing Course" },
  ];

  return (
    <div className="w-full px-4 py-6 text-white">
      <Stepper
        steps={steps}
        activeStep={step - 1}
        className="custom-stepper"
        completedColor="#FFE83D"
        inactiveColor="#4A4A4A"
        stepClassName="custom-step"
        styleConfig={{
          completedBgColor: "#2C2C2C",
          inactiveBgColor: "#2C2C2C",
          circleFontColor: "#FFE83D",
          size: "1.8em",
          labelFontSize: "0.9rem",
        }}
      />

      <div className="mt-8">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <CoursePublishForm />}
      </div>
    </div>
  );
}

export default RenderSteps;



/**
 *   return (
    <div>
      <div className="flex justify-around m-2">
        {steps.map((item, idx) => (
          <div key={item.id} className="flex items-center">
           
            <div className={`flex flex-col text-white justify-center items-center relative z-[5]`}>
              <p
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex justify-center items-center z-[5]
                  ${step > item.id ? 'bg-yellow-25' : 'bg-richblack-700'}
                  ${step === item.id && "border-2 border-yellow-100 bg-yellow-800 text-yellow-25"}
                `}
              >
                {step > item.id ? (
                  <FaCheck className="text-black text-sm sm:text-base md:text-base" />
                ) : (
                  item.id
                )}
              </p>
              <p className="text-[10px] sm:text-[11px] md:text-[12px] text-center mt-2">{item.title}</p>
            </div>

            
            {item.id < steps.length && (
              <div
                className={`flex-grow border-b-2 border-dashed mt-5 ${
                  item.id < step ? 'border-yellow-25' : 'border-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <CoursePublishForm />}
    </div>
  );
 */