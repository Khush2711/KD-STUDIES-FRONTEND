import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../../Common/IconBtn";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [videoBarActive, setVideoBarActive] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length || !sectionId || !subSectionId) return;

    const currentSection = courseSectionData.find((sec) => sec._id === sectionId);
    if (!currentSection) return;

    const currentSubSection = currentSection.subSection.find(
      (sub) => sub._id === subSectionId
    );
    if (!currentSubSection) return;

    setActiveStatus(currentSection._id);
    setVideoBarActive(currentSubSection._id);
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  const handleSectionClick = (courseId) => {
    setActiveStatus((prev) => (prev === courseId ? null : courseId));
    setRotatedArrows((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  return (
    <>
      {/* Open Button: Visible only when sidebar is closed */}
      {!isOpen && (
        <button
          className="text-white fixed top-10 left-0 z-50 text-3xl transform -translate-x-1/2 hover:left-5 hover:text-5xl transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <IoIosArrowDroprightCircle />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen w-[250px] bg-richblack-800 text-richblack-5 p-4 z-40 transform transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button: Visible only when sidebar is open */}
        {isOpen && (
          <div
            className="absolute text-3xl -right-4 top-[60%] text-white cursor-pointer  hover:text-5xl transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            <IoIosArrowDropleftCircle />
          </div>
        )}

        {/* Top Buttons and Course Info */}
        <div className="mb-4">
          <div className="flex justify-between items-center gap-x-4 below-md:scale-90">
            <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="flex mt-2 h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            >
              <FaArrowLeftLong />
            </button>
            <Iconbtn text="Add Review" onClick={() => setReviewModal(true)} />
          </div>

          <div className="mt-3">
            <p className="text-lg font-semibold">{courseEntireData?.courseName}</p>
            <p className="text-sm text-gray-300">
              {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
            </p>
          </div>
        </div>

        {/* Course Sections */}
        <div>
          {courseSectionData.map((course) => (
            <div key={course._id} className="mb-2">
              {/* Section Title */}
              <div
                className="flex justify-between items-center bg-richblack-600 px-5 py-4 cursor-pointer"
                onClick={() => handleSectionClick(course._id)}
              >
                <span className="font-medium">{course.sectionName}</span>
                <FaCaretDown
                  style={{
                    transform: rotatedArrows[course._id] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              {/* Subsections */}
              {activeStatus === course._id && (
                <div className="">
                  {course.subSection.map((topic) => (
                    <div
                      key={topic._id}
                      className={`cursor-pointer flex gap-3 px-2 py-2 font-semibold border-b border-richblack-600 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 text-richblack-800"
                          : "bg-richblack-50 text-richblack-800"
                      }`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures?.includes(topic._id)}
                        readOnly
                        className="cursor-pointer"
                      />
                      <span>{topic.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
