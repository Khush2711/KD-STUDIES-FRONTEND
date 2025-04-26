import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import Loader from "../../../Common/Loader";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

function Instructor() {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const getCourseDataWithStats = async () => {
        setLoading(true);

        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);

        console.log(instructorApiData);

        if (instructorApiData?.length) {
            setInstructorData(instructorApiData);
        }
        if (result?.data?.courses) {
            setCourseData(result.data.courses);
            // console.log("courseData............", result.data.courses);

        }

        setLoading(false); // Fix loading state
    };

    useEffect(() => {
        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0) || 0;
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0) || 0;

    return (
        <div className="text-white">
            <div className="m-3">
                <p className=" text-2xl font-bold text-richblack-5 capitalize">Hi {user?.firstName} 👋</p>
                <p className="font-medium text-richblack-200">Let's start something new</p>
            </div>

            {loading ? (
                // <Loader />
                <></>
            ) : courseData?.length > 0 ? (
                <div>
                    <div className="flex ">
                        <InstructorChart courses={instructorData} />
                        <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-5 gap-y-4 m-3 my-5">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div>
                                <p className="text-lg text-richblack-200">Total Courses</p>
                                <p className="text-xl  font-bold text-richblack-5">{courseData.length}</p>
                            </div>

                            <div>
                                <p className="text-lg text-richblack-200">Total Students</p>
                                <p className="text-xl  font-bold text-richblack-5">{totalStudents}</p>
                            </div>

                            <div>
                                <p className="text-lg text-richblack-200">Total Income</p>
                                <p className="text-xl  font-bold text-richblack-5">Rs. {totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="m-3 rounded-md bg-richblack-800 p-6">

                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">Your Courses</p>
                            <Link to="/dashboard/my-courses" className="text-yellow-300">
                                <p>View all</p>
                            </Link>
                        </div>

                        <div className="flex gap-x-2 below-md:flex-col">
                            {courseData.slice(0, 3).map((course) => (
                                <div key={course._id} className="flex flex-col my-2 gap-y-4">
                                    <img
                                        className=" aspect-video md:h-[201px] w-full rounded-md object-cover"
                                        src={course?.thumbnail}
                                        alt="Course Image" />

                                    <div className="below-md:flex below-md:flex-col below-md:justify-center below-md:items-center">
                                        <p className="text-sm font-medium text-richblack-50">{course?.courseName}</p>

                                        <div className="mt-1 flex items-center space-x-2 ">
                                            <p className="text-xs font-medium text-richblack-300">{totalStudents} Students</p>
                                            <p className="text-sm font-medium text-richblack-50">|</p>
                                            <p className="text-xs font-medium text-richblack-300">Rs. {totalAmount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ) : (
                <div className="flex justify-center items-center h-24 flex-col gap-y-10 mt-20">
                    <p className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">You have not created any courses yet</p>
                    <p className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-richblack-5 px-6 py-4 rounded-full text-4xl font-semibold lg:w-[70%] ">
                        <Link to={"/dashboard/add-course"}>Create a course</Link>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Instructor;
