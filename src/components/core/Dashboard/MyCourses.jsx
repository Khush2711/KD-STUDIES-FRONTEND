import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import Iconbtn from "../../Common/IconBtn";
import CourseTable from "./InstructorCourse/CourseTable";
import { useSelector } from "react-redux";

function MyCourses() {

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token);
    if (result) {
      console.log("result.data.courses..........................",result.data.courses);
      setCourses(result.data.courses);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  return <div>
    <div className="text-white flex justify-between">
      <h1 className="text-xl">My Courses</h1>

      <Iconbtn
        text="Add Course +"
        onClick={() => { navigate("/dashboard/add-course") }}
      />

    </div>

    {courses && <CourseTable courses={courses} setCourses={setCourses} />}

  </div>;
}

export default MyCourses;
