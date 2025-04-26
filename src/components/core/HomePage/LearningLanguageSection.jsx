import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../HomePage/Button";

function LearningLanguageSection() {
  return <div>
    <div className="flex flex-col gap-5">
      <div className="">
        <h2 className="text-4xl font-semibold text-center mt-20">Your swiss knife for <HighlightText text={"learning any language"} /></h2>
        <p className="text-center text-richblack-600 mx-auto mt-3 text-base w-[70%] font-medium">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
      </div>

      {/* Images */}

      <div className="flex items-center justify-center mt-5 relative below-md:flex-col">
        <img src={know_your_progress} alt="know_your_progress" className="object-contain md:-mr-32" />
        <img src={Compare_with_others} alt="Compare_with_others" className="object-contain below-md:-mt-9 "/>
        <img src={Plan_your_lessons} alt="Plan_your_lessons" className="object-contain below-md:-mt-16  md:-ml-36"/>
      </div>

      <div className="flex justify-center mb-10">
        <CTAButton active={true} link="/signup">
          Learn More
        </CTAButton>
      </div>

    </div>
  </div>;
}

export default LearningLanguageSection;
