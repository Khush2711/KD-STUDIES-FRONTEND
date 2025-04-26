import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Course_Card from "./Course_Card";
import { Autoplay } from "swiper/modules";

function CourseSlider({ courses }) {
  return (
    <div className="overflow-visible relative z-50">
      {courses?.length ? (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={200}
            loop={true}
            className="mySwiper text-richblack-5 overflow-visible"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpoints={{
              1024: { slidesPerView: 3 },
            }}
          >
            {courses.map((course, idx) => (
              <SwiperSlide key={idx} className="overflow-visible relative z-50 ">
                <Course_Card course={course} Height={"h-[150px]"} weight={"w-[350px]"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <p>No Course Found</p>
      )}
    </div>
  );
}

export default CourseSlider;
