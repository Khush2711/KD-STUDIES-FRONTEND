import React, { useEffect, useRef, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RxTriangleDown } from "react-icons/rx";
import Loader from "../Common/Loader";


function RenderSection({ courseContent, totalDuration }) {

  const [totalLecture, setTotalLecture] = useState(0);
  const [isOpenAll, setIsOpenAll] = useState(false); // Track open/collapse state
  const detailRefs = useRef([]); // Store refs for each details element

  // Open all sections
  const openAll = () => {
    detailRefs.current.forEach((detail) => {
      if (detail) detail.open = true;
    });
    setIsOpenAll(true);
  };

  // Collapse all sections
  const collapseAll = () => {
    detailRefs.current.forEach((detail) => {
      if (detail) detail.open = false;
    });
    setIsOpenAll(false);
  };


  useEffect(() => {

    if (!courseContent) return;
    // let a = 0;
    // console.log("course content.............................", courseContent);

    const totalSubsections = courseContent.reduce(
      (total, section) => total + section.subSection.length,
      0
    );
    setTotalLecture(totalSubsections);
  }, [courseContent])

  if (!courseContent) {
    return <Loader />
  }

  return <div className="relative">

    <div className="m-5">
      <p className="text-[28px] font-extrabold">Course Content</p>

      <div className="flex justify-between md:w-[60%] w-full ">
        <div className="">
          <p className="flex gap-2 text-xl font-semibold">
            <span className="text-xs">
              {courseContent?.length} section(s)
            </span>
            <span className="text-xs">
              {totalLecture} lecture(s)
            </span>
            <span className="text-xs">
              {totalDuration} Total Duration
            </span>
          </p>
        </div>

        <div className="text-yellow-100">
          {
            isOpenAll ? (
              <button
                onClick={collapseAll}
                className="bg-red-500 text-xl rounded"
              >
                Collapse All
              </button>
            )
              :
              (
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={openAll}
                    className="bg-green-500  text-xl text-yellow-100 rounded"
                  >
                    Open All
                  </button>

                </div>
              )
          }
        </div>
      </div>
    </div>


    {
      courseContent?.map((section, idx) => (
        <details key={idx}
          // ref={(el) => detailRefs.current.push(el)}
          ref={(el) => detailRefs.current.push(el)}
          className="group overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 md:w-[60%] ml-5">
          <summary className="cursor-pointer flex items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s] no-marker">
            <p className="flex items-center gap-x-1">
              <RxTriangleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              <span className="text-xl text-white">{section.sectionName}</span>
            </p>
            <div className="space-x-4">
              <span className="text-yellow-25">{section.subSection.length} Lecture(s)</span>
            </div>
          </summary>

          <div className="relative  overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]">

            <div className="text-textHead flex flex-col gap-2  font-semibold">

              <div className="flex flex-col justify-between ">

                {section?.subSection?.map((item, idx) => (
                  <div className="flex gap-x-4 items-center relative overflow-hidden bg-richblack-900  p-5 border border-solid border-richblack-600">
                    <FaVideo />
                    <p key={idx} className="text ">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </details>
      ))
    }

  </div>;
}

export default RenderSection;