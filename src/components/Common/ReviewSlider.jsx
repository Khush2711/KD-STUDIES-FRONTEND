import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { apiConnector } from "../../services/apiconnector";
import { ratingEndpoints } from "../../services/apis";
import { Swiper, SwiperSlide } from "swiper/react";

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const response = await apiConnector("GET", ratingEndpoints.REVIEW_DETAILS_API);
                if (response?.data?.success) {
                    setReviews(response.data.ratings);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        fetchAllReviews();
    }, []);

    // Function to truncate review text
    const truncateText = (text, maxWords) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
    };

    return (
        <div className="text-richblack-5">
            <div className="h-[250px] max-w-maxContent">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={24}
                    loop={true}
                    className="mySwiper text-richblack-5 overflow-visible"
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, FreeMode, Pagination]}
                    breakpoints={{
                        1024: { slidesPerView: 3 },
                        768: { slidesPerView: 2 },
                        480: { slidesPerView: 1 },
                        380: { slidesPerView: 1 },
                    }}
                >
                    {reviews.map((review, idx) => (
                        <SwiperSlide key={idx} className="overflow-visible relative z-50 bg-richblack-800 p-4 rounded-lg">

                            <div className="flex flex-col gap-2">

                                <div className="flex gap-x-4">

                                    <img
                                        src={review?.user?.image
                                            ? review?.user?.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                        alt="Profile Pic"
                                        className="h-12 w-12 object-cover rounded-full border border-richblack-600"
                                    />

                                    <div className="">
                                        <p className="text-lg font-semibold capitalize">{review?.user?.firstName} {review?.user?.lastName}</p>
                                        <p className="text-sm text-richblack-400 font-extralight">{review?.course?.courseName}</p>
                                    </div>
                                </div>

                                <p>{review?.review?.slice(0, 20)}{review?.review?.length > 15 ? "..." : ""}</p>


                            </div>
                            <div className="flex text-[#ffd700] items-center gap-2">
                                <p className="text-base">{review?.rating.toFixed(1)}</p>
                                <ReactStars
                                    count={5}
                                    value={review?.rating}
                                    size={24}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                            </div>

                            <p className="mt-2 text-sm text-richblack-300">{truncateText(review.reviewText, truncateWords)}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ReviewSlider;
