import React, { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import CTAButtton from "./Button";
import { TypeAnimation } from "react-type-animation";
import "./css/CodeBlocks.css";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeBlock,
  textColor,
  backgroundColor,
}) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });
  /*
    useEffect(() => {
      if (inView) {
        
        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
            toggleActions: "play reverse play reverse",
          },
        });
  
        const tlCode = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        });
  
      
        tlText
          .fromTo(
            ".textBox1",
            { opacity: 0, x: -200 },
            { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }
          )
          .fromTo(
            ".textBox2",
            { opacity: 0, x: 200 },
            { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
            "<"
          );
  
        tlCode
          .fromTo(
            ".codeBox1",
            { opacity: 0, scale: 0.8, y: 100 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
          )
          .fromTo(
            ".codeBox2",
            { opacity: 0, scale: 0.8, y: 100 },
            { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 },
            "<" // Ensures the animation for codeBox2 runs at the same time as codeBox1
          );
      }
    }, [inView]);
  
    */

  return (
    <div
      ref={ref}
      className={`below-md:flex-col flex ${position} my-28 justify-between gap-12 items-center`}
    >
      
      {/* Section 1 */}
      <div
        className={`below-md:w-[100%] w-[60%] flex flex-col gap-12 ${position === "lg:flex-row" ? `textBox1` : `textBox2`}`}
      >
        <div className="text-4xl below-md:text-center below-md:hyphens-auto">
          {heading}
        </div>

        <div className="text-richblack-300 font-bold">
          {subheading}
        </div>

        <div className="flex gap-10">
          <CTAButtton active={ctabtn1.active} link={ctabtn1.link}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRightLong />
            </div>
          </CTAButtton>

          <CTAButtton active={ctabtn2.active} link={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButtton>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className={`h-fit flex text-base below-md:w-full w-[50%] py-4 border-2 bg-transparent border-richblack-400 relative
          ${position === "lg:flex-row" ? `codeBox1` : `codeBox2`} `}
      >
        <div
          className={`absolute ${backgroundColor} rounded-[100%]`}
        ></div>

        <div className="text-center flex flex-col md:w-[10%] text-richblack-400 font-inter font-bold relative">
          {[...Array(12)].map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 ${textColor} relative`}
        >
          <TypeAnimation
            sequence={[codeBlock, 5000, ""]}
            repeat={Infinity}
            style={{ whiteSpace: "pre-line" }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
