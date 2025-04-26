import React from "react";
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../Slice/cartSlice";


function RenderCartCourses() {

  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return <div>
    {
      cart.map((course, key) => (
        <div className="flex">
          <div className="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-richblack-400 pb-6 pt-6">
            <img className="md:h-[148px] md:w-[220px] h-[100px] w-[180px] rounded-lg object-cover" src={course?.thumbnail} alt="" />
            <div className="">
              <p className="text-lg font-semibold text-richblack-5 poppins">{course?.courseName}</p>
              <p className="text-sm text-richblack-300">{course?.category?.name}</p>
              <div className="flex items-center">
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>

              </div>
            </div>

            <div className="flex flex-col justify-center below-md:flex-row below-md:items-center below-md:gap-x-4">

              <p className="mb-6 text-2xl md:text-3xl font-medium text-yellow-100">₹{course?.price}</p>
              <div className="flex justify-center below-md:items-center ">
                <button
                  className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[8px] text-pink-200 text-lg font-medium"
                  onClick={() => {
                    dispatch(removeFromCart(course._id))
                  }}>
                  <MdDelete />
                  {/* <span>Remove</span> */}
                </button>
              </div>
            </div>

          </div>


        </div>
      ))
    }
  </div>;
}

export default RenderCartCourses;
