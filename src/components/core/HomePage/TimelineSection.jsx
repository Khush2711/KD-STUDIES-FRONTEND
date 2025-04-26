import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"
import "./css/TimelineSection.css"

const timeLine = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to success company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority"
    }, {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    }, {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution"
    },
]

function TimelineSection() {
    return <div className="w-11/12 max-w-maxContent mx-auto my-10 ">
        <div className="flex below-md:flex-col gap-15 items-center">
            <div className="lg:w-[40%] flex flex-col gap-10">
                {
                    timeLine.map((element, index) => {
                        return (
                            <div className="flex gap-6" key={index}>

                                <div className="w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center relative">
                                    <img className="" src={element.Logo} alt="Logo" />
                                    {
                                        index + 1 !== timeLine.length ? <div className="h-[30px] below-md:hidden absolute top-14 border-l border-dotted"></div> : <></>
                                    }
                                </div>

                                <div className="">
                                    <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                    <p className="text-base">{element.Description}</p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className="relative shadow-blue-200 my-8 mx-3 strong custom-shadow">
                <img className="shadow-white object-cover h-fit" src={TimelineImage} alt="TimelineImage" />

                <div className="absolute below-md:scale-50 bg-caribbeangreen-700 flex text-white uppercase py-6 md:left-[50%] md:translate-x-[-45%] md:translate-y-[-50%] below-md:translate-x-[-15%] below-md:translate-y-[-40%]">

                    <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <p className="font-bold text-3xl ">10</p>
                        <p className="text-caribbeangreen-300 text-sm ">Years of Experience</p>
                    </div>
                    <div className="flex gap-5 items-center px-7">
                        <p className="font-bold text-3xl ">250</p>
                        <p className="text-caribbeangreen-300 text-sm ">types of courses</p>
                    </div>

                </div>
            </div>

        </div>
    </div>;
}

export default TimelineSection;
/* {
    timeLine.map((element,index)=>{
        return (
            <div className="my-1 flex gap-4 relative" key={index}>
                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img className="" src={element.Logo} alt="Logo"/>
                {
                    index+1 != timeLine.length ? <div className="h-[30px] absolute top-16 border-l border-dotted"></div> : <></>
                }
                </div>
                <div className="">
                    <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                    <p className="text-base">{element.Description}</p>
                </div>

            </div>
        )
    })
}
    */