import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../Slice/course";
import RatingStars from "../../../Common/RatingStars";
import GetAvgRating from "../../../../utils/avgRating";
import RenderSection from "../../RenderSection";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";
import Loader from "../../../Common/Loader";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import { addToCart } from "../../../../Slice/cartSlice";




function Course() {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(null);

    const fetchCourseData = async () => {
        const data = await fetchCourseDetails(courseId);
        // console.log("FetchCourseData.............",data);
        

        // Check enrollment from the fetched data
        const isStudentEnrolled = data.courseDetails.studentsEnrolled.some(
            (student) => student === user?._id || student._id === user?._id
        );
        
        // Update states
        dispatch(setCourse({ ...data.courseDetails }));
        setIsEnrolled(isStudentEnrolled);

        // Calculate and set average rating
        const count = GetAvgRating(data?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    };


    useEffect(() => {
        setLoading(true);
        fetchCourseData();
        setLoading(false);
    }, [courseId, user])

    const handleCopy = () => {
        const url = window.location.href;
        try {
            navigator.clipboard.writeText(url);
            toast.success("URL copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy URL");
        }

    };

    const handleBuyCourse = () => {
        console.log("Token:", token); // Log the token value
        if (!token) {
            return;
        }
        console.log("Hello");
        buyCourse(token, [courseId], user, navigate, dispatch);
    };

    const handleAddToCart = ()=>{
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR)
        {
            toast.error("As an instructor, you are not permitted to purchase a course.");
            return;
        }
        if(token)
        {
            
            dispatch(addToCart(course));
            return;
        }
        // setConfirmationModal({
        //     text1:"You are not logged in",
        //     text2:"Please login to add to cart",
        //     btn1text:"login",
        //     btntext2:"cancel",
        //     btn1Handler:()=>navigate("/login"),
        //     btn1Handler:()=>setConfirmationModal(null)
        // })
    }

    return <div className="text-richblack-5 ">


        {
            loading ? (
                <div className="flex justify-center items-center w-full h-[80vh]">
                    <Loader />
                </div>
            )
                :
                (
                    <div className="relative h-full w-[1280px] mx-auto below-md:w-auto below-md:flex below-md:justify-center below-md:flex-col">

                        {/* Catalog Card  */}
                        <div className="absolute below-md:relative below-md:w-[350px] below-md:mx-auto md:top-5 md:right-10 flex flex-col justify-center gap-4 rounded-md bg-richblack-700 below-md:bg-richblack-900 p-4 text-richblack-5 below-md:my-5">

                            <div className="">
                                <img
                                    src={course?.thumbnail}
                                    alt="img not found"
                                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover below-md:max-w-full below-md:flex below-md:justify-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="space-x-3 pb-4 text-3xl font-semibold">
                                    Rs. {course?.price}
                                </div>
                                <div className="flex flex-col gap-4">
                                    
                                    <button
                                        onClick={user && isEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
                                        className="px-4 py-2 text-black font-bold rounded-lg bg-yellow-50 cursor-pointer">
                                        {
                                            user && isEnrolled ? "Go to Course" : "Buy Now"
                                        }
                                    </button>
                                    {
                                        !isEnrolled ?
                                            <button
                                                className="px-4 py-2 text-richblack-5 font-bold rounded-lg bg-richblack-800 cursor-pointer"
                                                onClick={handleAddToCart}>
                                                Add to cart
                                            </button>
                                            :
                                            <></>
                                    }
                                </div>
                                <div className="below-md:hidden">
                                    <p className="my-2 text-xl font-semibold ">This Course Includes:</p>
                                    {
                                        course?.tag.map((item, idx) => (
                                            <div key={idx} className="text-[1.125rem]/[1.75rem] text-caribbeangreen-100 flex gap-1 items-center text-xl ">
                                                <span class="text-lg">✓</span>
                                                <span>{item}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex justify-center below-md:hidden">
                                    <button
                                        onClick={handleCopy}
                                        className="text-yellow-100 flex items-center gap-1 justify-center text-center">
                                        <FaShare />
                                        Share
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* section 1 */}
                        <div className="  w-full h-full bg-richblack-800 below-md:bg-richblack-900 py-5 pb-10">
                            <div className="mx-5 ">

                                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px] py-2 mt-10">{course?.courseName}</p>
                                <p className="text-richblack-400 py-2 text-l w-[60%] below-md:w-full text-justify">{course?.CourseDescription}</p>
                                <div className="flex flex-col px-1">

                                    <div className="flex items-center gap-2 py-2 text-xl text-left">
                                        <p className=" text-yellow-100">{avgReviewCount || 0}</p>
                                        <RatingStars Review_Count={avgReviewCount || 0} />
                                        <span className="text-richblack-5 below-md:hidden">({course?.ratingAndReviews.length} Reviews)</span>
                                        <span className="text-richblack-5">{course?.studentsEnrolled?.length} students enrolled</span>
                                    </div>
                                    <p>Created By {course?.instructor?.firstName || "Khush"} {course?.instructor?.lastName || "Desai"}</p>

                                    <div className="flex gap-x-2 items-center mt-2">
                                        <IoIosInformationCircleOutline />
                                        <p>Created At {course?.instructor?.createdAt || 'November 27, 2003 | 19:00 PM'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* section 2 */}
                        <div className="w-[60%] md:ml-5 below-md:mr-0 below-md:w-fit below-md:mx-auto">
                            <div className="my-8 border border-richblack-600 p-8">
                                <p className="text-3xl font-semibold">What you'll learn</p>
                                <p className="mt-5 text-justify">{course?.whatYouWillLearn}</p>
                            </div>
                        </div>

                        {/* section 3 */}
                        <div className="w-full">
                            <RenderSection courseContent={course?.courseContent} totalDuration={course?.totalDuration} />
                        </div>

                    </div>
                )
        }
    </div>;
}

export default Course;
