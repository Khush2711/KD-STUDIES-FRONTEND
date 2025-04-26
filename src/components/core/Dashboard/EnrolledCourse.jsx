import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import Loader from "../../Common/Loader";
import { useNavigate } from "react-router-dom";

function EnrolledCourse() {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getEnrolledCourseData = async () => {
        try {
            let data = await getUserEnrolledCourses(token);
            setEnrolledCourses(data);
            console.log(`data...............................`, data);

        } catch (error) {
            console.log("Error while fetching enrolled courses:", error);
        }
    };

    useEffect(() => {
        getEnrolledCourseData();
    }, []);

    return (
        <div className="text-richblack-5">
            {!enrolledCourses ? (
                <div className="h-[70vh] flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <>
                    <h2 className="text-3xl text-richblack-50">Enrolled Courses</h2>
                    {!enrolledCourses.length ? (
                        <p>You are not enrolled in any courses.</p>
                    ) : (
                        <div className="my-8 text-richblack-5">

                            {/* header */}
                            <div className="grid rounded-t-lg bg-richblack-500 grid-cols-3 px-2 py-4">
                                <p>Course Name</p>
                                <p>Duration</p>
                                <p>Progress</p>
                            </div>

                            {/* data */}
                            <div className="">
                                {enrolledCourses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="cursor-pointer grid grid-cols-3 p-2  border border-richblack-700 rounded-none items-center"

                                        onClick={() =>
                                            navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-x-5">
                                            <img
                                                src={course.thumbnail}
                                                alt={course.courseName}
                                                className="w-[50px] h-[50px] rounded"
                                            />
                                            <div className="flex flex-col gap-3">
                                                <p>{course.courseName}</p>
                                                <p>{course.description}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>{course.totalDuration}</p>
                                        </div>
                                        <div>
                                            <p>Progress: {course.progressPercentage || 0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default EnrolledCourse;

/**
 <div>
                            <table>
                                <thead>
                                    <tr className="flex rounded-t-lg bg-richblack-500 ">
                                        <th colSpan={2}>Course Name</th>
                                        <th>Duration</th>
                                        <th>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledCourses.map((course) => (
                                        <tr
                                            key={course._id}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                navigate(
                                                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                )
                                            }
                                        >
                                            <td className="flex items-center gap-x-5">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.courseName}
                                                    className="w-[50px] h-[50px]"
                                                />
                                                <div className="flex flex-col gap-3">
                                                    <p>{course.courseName}</p>
                                                    <p>{course.description}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{course.totalDuration}</p>
                                            </td>
                                            <td>
                                                <p>Progress: {course.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage || 0}
                                                    height="8px"
                                                    isLabelVisible={false}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
 */