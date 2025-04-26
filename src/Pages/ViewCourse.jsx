import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setEntireCourseData,
  setCourseSectionData,
  setTotalNoOfLectures,
} from "../Slice/viewCourseSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log("courseData...........................",courseData);
      
      dispatch(setCourseSectionData(courseData.data.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.data.courseDetails));
      dispatch(setCompletedLectures(courseData.data.completedVideos));
      let lectures = 0;
      courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures));
    }
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="flex">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div className="flex-grow">
          <Outlet />
        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
}

export default ViewCourse;
