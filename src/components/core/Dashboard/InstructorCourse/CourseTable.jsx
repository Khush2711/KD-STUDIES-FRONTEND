import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../Common/confirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";

function CourseTable({ courses, setCourses }) {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;

    // Calculate total pages
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Get courses for the current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result.data.courses);
        }
    };

    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId }, token);
        fetchCourses();
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div className="text-richblack-5 my-10">
            <Table>
                <Thead className="border border-richblack-800">
                    <Tr className="m-[20px] richblack-800 p-8 text-left">
                        <Th className="border border-richblack-800 p-2 text-sm font-medium text-richblack-100 mb-5 below-md:hidden ">Courses</Th>
                        {/* <Th className="border border-richblack-800 p-2">Duration</Th> */}
                        <Th className="border border-richblack-800 p-2 text-sm font-medium text-richblack-100 mb-5 ">Price</Th>
                        <Th className="border border-richblack-800 p-2 text-sm font-medium text-richblack-100 ">Actions</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {currentCourses.length === 0 ? (
                        <Tr className="border border-richblack-800 p-8 m-2">
                            <Td colSpan="4" className="text-center p-8">No Courses Found</Td>
                        </Tr>
                    ) : (
                        currentCourses.map((course) => (
                            <Tr key={course._id} className="border border-richblack-800 text-center">
                                <Td className="m-2 flex gap-x-2 items-center border-richblack-800 richblack-800 below-md:flex-col">
                                    <img
                                        src={course?.thumbnail}
                                        alt="course"
                                        className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col text-left m-2 gap-y-1">
                                        <p className="text-lg font-semibold text-richblack-5 mt-3">{course?.courseName}</p>
                                        <p className="text-xs text-richblack-300">{course?.CourseDescription}</p>
                                        <p className="text-[12px] text-white">Created {new Date(course?.createdAt).toLocaleDateString()}</p>
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-50">DRAFT</p>
                                        ) : (
                                            <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">PUBLISHED</p>
                                        )}
                                    </div>
                                </Td>

                                {/* <Td className="border border-richblack-800 px-5">2hr 30min</Td> */}
                                <Td className="border-richblack-800 border richblack-800 p-8">
                                    <p className="text-sm font-medium text-richblack-100 mb-5 pivoted ">₹{course.price}</p>
                                </Td>

                                <Td className="">

                                    <div className="flex gap-x-2 p-2">
                                        <button
                                            title="Edit"
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 mr- mb-"
                                            disabled={loading}
                                            onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}>
                                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        </button>


                                        <button
                                            title="Delete"
                                            disabled={loading}
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => { },
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })
                                            }
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">

                                                <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between mt-4 gap-4 items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-white">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}

export default CourseTable;
