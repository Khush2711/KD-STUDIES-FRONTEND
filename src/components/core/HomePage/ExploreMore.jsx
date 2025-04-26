import React, { useEffect, useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import "./css/ExploreMore.css"

const tabName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

function ExploreMore() {


    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [courses, setCourse] = useState(HomePageExplore.filter((ele) => ele.tag === currentTab));
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    useEffect((ele) => {
        const data = HomePageExplore.filter((ele) => ele.tag === currentTab);
        setCourse(data);
        setCurrentCard(data[0].courses[0].heading);
    }, [currentTab])




    return <div className="flex flex-col m-10 relative">

        <h2 className="text-4xl font-bold text-center">Unlock the <HighlightText text={"Power of Code"} /></h2>
        <p className="text-center text-richblack-300 text-lg font-semibold mt-1">Learn to Build Anything You Can Imagine</p>

        <div className="below-md:hidden flex gap-5 my-10 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            {
                tabName.map((ele, i) => (
                    <p className={`text-[16px] px-6 py-2 hover:bg-richblack-900 hover:text-richblack-5 transition-all duration-75 ${currentTab === ele ? 'bg-richblack-900 text-richblack-5' : ''} rounded-full`}
                        key={i}
                        onClick={() => { setCurrentTab(ele) }}>{ele}</p>
                ))
            }
        </div>

        <div className="relative my-20">

            <div className="flex gap-10 absolute -left-28 below-md:relative below-md:left-auto below-md:flex-wrap below-md:justify-center below-md:items-center">
                {
                    courses[0].courses.map((ele, i) => (
                        <div className={`bg-richblack-800 w-[300px] flex flex-col gap-5 transition-all duration-[0.5s]
                            ${currentCard === ele.heading ? 'bg-white text-black shadow-[15px_15px_#ffd60a] ' : ''}`}
                            key={i}
                            onClick={() => { setCurrentCard(ele.heading) }}>
                            <h2 className="font-bold text-xl mt-3 mx-4">{ele.heading}</h2>
                            <p 
                            className={`text-pure-greys-300 px-5 py-2 border-b-2 border-dashed ${currentCard === ele.heading ? 'border-black' : 'border-richblack-600'}`}>{ele.description}</p>

                            <div className="flex justify-between px-5 py-2 text-blue-300 font-bold mb-2">
                                <div className="flex items-center gap-2">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                    </svg>
                                    <p>{ele.level}</p>
                                </div>
                                <div className="flex gap-2 items-center font-bold">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.25 12h-0.25v-3.25c0-0.965-0.785-1.75-1.75-1.75h-4.25v-2h0.25c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.413-0.338-0.75-0.75-0.75h-2.5c-0.412 0-0.75 0.337-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h0.25v2h-4.25c-0.965 0-1.75 0.785-1.75 1.75v3.25h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.413 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.337-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75h-0.25v-3h4v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v2.5c0 0.412 0.338 0.75 0.75 0.75h2.5c0.412 0 0.75-0.338 0.75-0.75v-2.5c0-0.412-0.338-0.75-0.75-0.75zM3 15h-2v-2h2v2zM9 15h-2v-2h2v2zM7 4v-2h2v2h-2zM15 15h-2v-2h2v2z"></path>
                                    </svg>
                                    <p>{ele.lessionNumber} Lessons</p>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>

    </div>;
}

export default ExploreMore;