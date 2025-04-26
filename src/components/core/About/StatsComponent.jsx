import React from "react";

const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
]


function StatsComponent() {
    return <div className="bg-richblack-700 ">
        <div className="mx-auto w-11/12 max-w-maxContent below-md:grid below-md:grid-rows-2 below-md:grid-cols-2 flex justify-evenly p-5">
            {
                Stats.map((item, index) => (
                    <div className="p-5" key={index}>
                        <p className="text-center text-richblack-5 text-4xl font-bold">{item.count}</p>
                        <p className="text-richblack-500 font-semibold text-xl ">{item.label}</p>
                    </div>
                ))
            }
        </div>
    </div>;
}

export default StatsComponent;
