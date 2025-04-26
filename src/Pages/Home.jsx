import React, { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButtton from "../components/core/HomePage/Button";
import banner from "../assets/Images/banner.mp4";
import "./CSS/Home.css";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import Instructor from "../assets/Images/Instructor.png";
import Footer from "../components/Common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHighlightText from '../components/core/HomePage/animatedHighlightText';
import AnimatedHeading from '../components/core/HomePage/AnimatedHeading';
import ReviewSlider from '../components/Common/ReviewSlider';

gsap.registerPlugin(ScrollTrigger);

function Home() {

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".subheading-animation", {
                opacity: 0,
                delay: 0.5,
                duration: 1,
                x: -100,
                scrollTrigger: {
                    trigger: ".subheading-animation",
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                },
            });
        });
        return () => (ctx.revert());  // Cleanup on component unmount
    }, []);


    return (<div>

        {/* Section 1 */}
        <div className="setion-1 relative mx-auto flex flex-col w-11/12 max-w-[1000px] items-center text-white justify-between">

            {/* Button */}
            <Link to={'signup'}>

                <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95" >
                    <div className="flex border-b-[1px] items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900:">
                        <p>Become an Instructor</p>
                        <FaArrowRightLong />
                    </div>
                </div>
            </Link>

            <AnimatedHeading heading={"Empower Your Future with "} highlightText={"Coding Skills"} />


            {/* Subheading */}
            <div className="mt-5 wt-[90%] text-center text-lg font-bold  text-richblack-300 below-md:text-justify below-md:hyphens-auto subheading-animation" >
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>



            {/* Button */}
            <div className="flex gap-10 mt-8">
                <CTAButtton active={true} link={"/signup"}>Learn More</CTAButtton>
                <CTAButtton>Book a Demo</CTAButtton>
            </div>

            {/* Video */}
            <div className="shadow-blue-200 my-8 mx-3 strong custom-shadow">
                <video muted loop autoPlay src={banner} />
            </div>

            {/* Code section 1.1 */}
            <div className="">
                {/* { position, heading, subheading, ctabtn1, ctabtn2, codeBlock, backgroundGradient } */}
                <CodeBlocks
                    position={`lg:flex-row`}
                    heading={
                        <div>
                            Unlock your <HighlightText text={`coding potential`} /> with our online courses.
                        </div>
                    }
                    subheading={
                        <div>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false
                        }
                    }
                    codeBlock={`<!DOCTYPE html>
                    <html>
                    <head><title>Example</title>
                    <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                    <h1><a href="/">Header</a>
                    </h1>
                    <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>
                    </nav>`}
                    textColor={"text-yellow-25"}
                    backgroundColor={"codeblock1"}
                />
            </div>

            {/* Code section 1.2 */}
            <div className="">
                {/* { position, heading, subheading, ctabtn1, ctabtn2, codeBlock, backgroundGradient } */}
                <CodeBlocks
                    position={`flex-row-reverse`}
                    heading={
                        <div className="">
                            Start <HighlightText text={`coding in seconds`} />
                        </div>
                    }
                    subheading={
                        <div>Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</div>
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false
                        }
                    }
                    codeBlock={`import React from 'react';
                                const MyComponent = () => {
                                    return (
                                    <div>
                                    <h1>Hello, World!</h1>
                                    <p>This is a basic React component.</p>
                                    </div>
                                    );
                                };
                                export default MyComponent;
                                `}

                    textColor={"pure-greys-100"}
                    backgroundColor={"codeblock2"}
                />
            </div>


            <ExploreMore />

        </div>




        {/* Section 2 */}
        <div className="bg-pure-greys-5 text-richblack-700 below-md:relative ">
            <div className="homepage_bg h-[350px] ">
                <div className="w-11/12 max-w-maxContentTab flex flex-col justify-center items-center gap-5 mx-auto">

                    <div className="h-[150px] below-md:h-[100px]"></div>

                    <div className="flex flex-row gap-7 text-white">
                        <CTAButtton active={true} link={"/signup"}>
                            <div className="flex items-center gap-2 ">
                                Explore Full Catalog
                                <FaArrowRightLong />
                            </div>
                        </CTAButtton>

                        <CTAButtton active={false} link={"/signup"}>
                            Learn More
                        </CTAButtton>

                    </div>

                </div>
            </div>

            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto mt-[110px] relative">
                <div className="flex gap-20 below-md:flex-col">
                    <div className="text-4xl below-md:text-center font-semibold w-[45%] below-md:w-full below-md:absolute below-md:-top-48 font-inter">
                        Get the skills you need for a <HighlightText text={"job that is in demand."} />
                        {/* <AnimatedHeading heading={"Get the skills you need for a "} highlightText={"job that is in demand."} fullAnimation={true} /> */}
                    </div>

                    <div className="flex flex-col w-[40%] below-md:w-full below-md:items-center gap-20 items">
                        <p className="text-[16px] below-md:t text-pretty capitalize below-md:items-center font-mono">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>

                        <div className="w-64">
                            <CTAButtton active={true} link={"/signup"}>Learn More</CTAButtton>
                        </div>
                    </div>
                </div>
                <TimelineSection />
                <LearningLanguageSection />
            </div>

        </div>

        {/* Section 3 */}
        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col gap-8 bg-richblack-900 text-white py-10">
            <div className="flex my-10 gap-10 below-md:flex-col below-md:items-center">
                <div className="instructor-shadow md:w-[80%] ml-5">
                    <img src={Instructor} alt="Instructor" />
                </div>
                <div className="flex flex-col gap-10 below-md:items-center">
                    <h2 className="text-4xl font-bold md:w-[50%] mt-12 below-md:text-center">
                        Become an <HighlightText text={"Instructor"} />
                    </h2>
                    <p className="text-richblack-400 md:w-[80%] font-medium text-lg">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className="w-fit">
                        <CTAButtton link={"/signup"} active={true}>
                            <div className="flex items-center gap-2">
                                Start Teaching Today
                                <FaArrowRightLong />
                            </div>
                        </CTAButtton>
                    </div>

                </div>
            </div>

            <div className="flex justify-center">
                <h2 className="text-4xl font-bold mt-10">Reviews from other learners</h2>
            </div>
            <div className="">

                {/* review slider */}
                <ReviewSlider />
            </div>
        </div>
    </div>);
}

export default Home;