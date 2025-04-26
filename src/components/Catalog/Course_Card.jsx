import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../Common/RatingStars";
import GetAvgRating from "../../utils/avgRating";

function Course_Card({ course, Height, weight }) {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div className=" mb-4 overflow-visible relative z-50 group w-[410px]">
            <Link to={`/courses/${course._id}`}>
                <div className="transition-transform duration-300 group-hover:scale-[1.1] will-change-transform relative z-50">
                    <div className={`${Height} ${weight}`}>
                        <img
                            src={course?.thumbnail}
                            alt={course?.description}
                            className={`w-full h-full object-cover rounded-xl`}
                        />
                    </div>

                    <div className="my-4">
                        <p className="text-xl font-semibold">{course?.courseName}</p>
                        {/* <p className="text-richblack-5 ">
                            Learn from <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                                {course?.instructor?.firstName || "Khush"} {course?.instructor?.lastName || "Desai"}
                            </span>
                        </p> */}


                        <div className="flex flex-col gap-2 px-1 py-3">

                            <div className="flex items-center gap-2">
                                <span className="text-xl text-richblack-5">{avgReviewCount || 0}</span>
                                <RatingStars Review_Count={avgReviewCount || 0} />
                                <span className="text-richblack-400">{course?.ratingAndReviews.length} Ratings</span>
                            </div>
                        </div>
                        <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Course_Card;
