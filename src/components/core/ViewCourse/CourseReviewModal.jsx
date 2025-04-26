import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import Iconbtn from "../../Common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";

function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const onSubmit = async (data) => {
    const rating = await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    console.log("Rating..........................:",rating)
    setReviewModal(false);
  };

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <p className="text-lg font-semibold">Add Review</p>
          <button onClick={() => setReviewModal(false)}>Close</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* User Info */}
          <div className="user-info">
            <img
              src={user?.image}
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">Posting Publicly</p>
            </div>
          </div>

          {/* Review Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-6"
          >
            {/* Rating Stars */}
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              value={watch("courseRating") || 0}
              activeColor="#ffd700"
            />

            {/* Review Input */}
            <div className="w-full mt-4">
              <label htmlFor="courseExperience" className="block font-medium">
                Add Your Experience*
              </label>
              <textarea
                id="courseExperience"
                placeholder="Share your experience..."
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] w-full p-2 border rounded-md"
              />
              {errors.courseExperience && (
                <span className="text-red-500 text-sm">
                  Please add your experience
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <Iconbtn text="Save" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CourseReviewModal;
