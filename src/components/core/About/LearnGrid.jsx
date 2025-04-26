import React from "react";
import HighlightText from "../HomePage/HighlightText";

const learnGridData = [
    {
        order: 1,
        title: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order: 2,
        title: "Our Learning Methods",
        description: "KD Studies partners with more than 275+ leading universities and companies to bring"
    },
    {
        order: 3,
        title: "",
        description: ""
    },
    {
        order: 5,
        title: "Certification",
        description: "KD Studies partners with more than 275+ leading universities and companies to bring"
    },
    {
        order: 6,
        title: 'Rating "Auto-grading"',
        description: "KD Studies partners with more than 275+ leading universities and companies to bring"
    },
    {
        order: 7,
        title: 'Ready to Work',
        description: "KD Studies partners with more than 275+ leading universities and companies to bring"
    }

]

function LearnGrid() {
    return <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
        <div className="flex flex-col gap-5 md:col-span-2 below-md:mb-2">
            <h2 className="text-richblack-5 text-4xl font-bold">World-Class Learning for <br /> <HighlightText text={"Anyone, Anywhere"} /> </h2>
            <p className="font-semibold w-[80%] text-richblack-300">KD Studies partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>

            <div className="">
                <button className="text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black">Learn More</button>
            </div>
        </div>



        {
            learnGridData.map((item) => (
                item.description !== "" ? (
                <div className={`${item.order % 2 ? 'bg-richblack-700' : 'bg-richblack-800'} px-8 py-10 flex flex-col gap-5`} key={item.order} >
                    <p className="text-richblack-5 text-xl">{item.title}</p>
                    <p>{item.description}</p>
                </div>
                )
                :
                (
                    <div className={`bg-richblack-900`} key={item.order} >
                    </div>
                )
            ))
        }

    </div>;
}

export default LearnGrid;
