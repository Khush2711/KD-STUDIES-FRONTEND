import React, { useEffect } from "react";
import AnimatedHeading from "../components/core/HomePage/AnimatedHeading";
import gsap from "gsap";
import bannerImg1 from "../assets/Images/aboutus1.webp";
import bannerImg2 from "../assets/Images/aboutus2.webp";
import bannerImg3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/About/Quote";
import foundStory from "../assets/Images/FoundingStory.png";
import HighlightText from "../components/core/HomePage/HighlightText";
import StatsComponent from "../components/core/About/StatsComponent";
import LearnGrid from "../components/core/About/LearnGrid";
import ContactFormTemplate from "../components/About/ContactFormTemplate";
import ReviewSlider from "../components/Common/ReviewSlider";

function About() {

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

    return <div>
        {/* Section 1 */}
        <section className="text-richblack-5 bg-richblack-700">
            <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10">
                <header className="mt-16 relative">
                    <AnimatedHeading heading={"Driving Innovation in Online Education for a "} highlightText={" Brighter Future"} />
                    <p className="mt-5 text-center text-lg font-bold  text-richblack-300 below-md:text-justify below-md:hyphens-auto subheading-animation flex justify-center md:px-52">KD studies is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

                    <div className=" h-[10rem] below-md:h-[4rem] mt-5 md:mt-24">
                        <div className="absolute grid grid-cols-3 gap-3 -bottom-100 md:gap-5  ">
                            <img src={bannerImg1} alt="bannerImg1" className="h-auto max-w-full" />
                            <img src={bannerImg2} alt="bannerImg2" className="h-auto max-w-full" />
                            <img src={bannerImg3} alt="bannerImg3" className="h-auto max-w-full" />
                        </div>
                    </div>
                </header>

            </div>
        </section>


        {/* Section 2 */}
        <section className="border-b border-richblack-700 mx-auto flex w-11/12 max-w-maxContent  text-richblack-500">
            <div className="mt-40 mb-10 px-5 text-center">
                <Quote />
            </div>
        </section>

        {/* Section 3 */}
        <section className="mx-auto flex w-11/12 max-w-maxContent text-richblack-500">
            <div className="grid  grid-rows-2 grid-cols-2 md:gap-8 md:mt-20 md:gap-y-28 w-full md:p-8 p-4 below-md:gap-2 below-md:grid-rows-4 below-md:grid-cols-1 below-md:text-justify">
                {/* row 1  col 1*/}
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent below-md::w-[70%] ">
                        Our Founding Story
                    </h2>
                    <p className="text-base font-medium text-richblack-300 below-md:w-[95%]">
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className="text-base font-medium text-richblack-300 below-md:w-[95%]">
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                {/* row 1  col 2*/}
                <div className="flex justify-center items-center w-full">
                    <img src={foundStory} alt="foundStory" className="shadow-[0_0_20px_0] shadow-[#FC6767] w-full" />
                </div>

                {/* row 2 col 1*/}
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent md:w-[70%]">
                        Our Vision
                    </h2>
                    <p className="text-richblack-300">
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>

                {/* row 2 col 2*/}
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent text-4xl font-semibold bg-clip-text md:w-[70%]">
                        Our Mission
                    </h2>
                    <p className="text-richblack-300">
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <section>
            <div className="md:-mt-28">
                <StatsComponent />
            </div>
        </section>

        {/* Section 5 */}
        <section className="mx-auto mt-20 flex flex-col w-11/12 max-w-maxContent text-white mb-10">
            <LearnGrid />
            <ContactFormTemplate />
        </section>

        <section className="mx-auto mt-20 flex flex-col w-11/12 max-w-maxContent text-white mb-10">
            <p className="text-richblack-5 text-3xl my-5 text-center font-bold">Review from other learners</p>
            <ReviewSlider />
        </section>

    </div>;
}

export default About;