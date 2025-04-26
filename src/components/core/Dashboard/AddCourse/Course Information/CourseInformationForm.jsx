import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../Slice/course";
import { COURSE_STATUS } from "../../../../../utils/constants";
import Iconbtn from "../../../../Common/IconBtn";
import toast from "react-hot-toast";
import ChipInput from "./ChipInput";
import Upload from "../Upload";

function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCoure } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  const getCategory = async () => {
    try {
      setLoading(true);
      const result = await fetchCourseCategories();
      if (result.length > 0) {
        setCourseCategory(result);
      }
    } catch (error) {
      toast.error("Failed to fetch categories. Please try again later.");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
    console.error(course);
    if (editCoure) {
      setValue("courseTitle", course.courseName);
      setValue("CourseDescription", course.CourseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
  }, []);

  useEffect(() => {
    // console.error(course);
    if (course) {
      setValue("courseTitle", course.courseName);
      setValue("CourseDescription", course.CourseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id);
      setValue("courseRequirements", course.instructions);
      setValue("thumbnailImage", course.thumbnail);
      // formData.append("tag", data.courseTags);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.CourseDescription !== course.CourseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags?.toString() !== course.tag?.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseRequirements?.toString() !==
      course.instructions?.toString() ||
      currentValues.courseImage !== course.thumbnail
    );
  };

  const onSubmit = async (data) => {
    // console.log(data);
    
    try {
      if (editCoure) {
        if (isFormUpdated()) {
          const currentValues = getValues()
          const formData = new FormData()
          // console.log(data)
          formData.append("courseId", course._id)
          if (currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle)
          }
          if (currentValues.courseShortDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseShortDesc)
          }
          if (currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice)
          }
          if (currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags))
          }
          if (currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append("whatYouWillLearn", data.courseBenefits)
          }
          if (currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory)
          }
          if (
            currentValues.courseRequirements.toString() !==
            course.instructions.toString()
          ) {
            formData.append(
              "instructions",
              JSON.stringify(data.courseRequirements)
            )
          }
          if (currentValues.courseImage !== course.thumbnail) {
            formData.append("thumbnailImage", data.courseImage)
          }
          // console.log("Edit Form data: ", formData)
          setLoading(true)
          const result = await editCourseDetails(formData, token)
          setLoading(false)
          if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
          }
        }
      } else {
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("CourseDescription", data.CourseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("thumbnailImage", data.courseImage);

        // console.log(`data.courseRequirements : ${data.courseRequirements}............. JSON.stringify(data.courseRequirements) ${JSON.stringify(data.courseRequirements)}`);
        console.log(`data.courseCategory : ${data.courseCategory}`);


        // *** KEY CHANGE: Join tags array into a string ***
        const tagsString = data.courseTags ? data.courseTags.join(",") : ""; // Handle potential undefined/null
        formData.append("tag", tagsString);

        console.log("Course Data:", formData);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          toast.success("Course created successfully!");
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later."); // User-friendly error message
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[8px]-md border-richblack-700 text-richblack-5 bg-richblack-800 p-6 space-y-8 border "
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="courseTitle" className="text-richblack-5 ">
          Course Title<sup className="text-red">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter Course Title"
          className="w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && (
          <span className="text-red text-sm">Course Title is required.</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="CourseDescription" className="text-richblack-5">
          Course Short Description<sup className="text-red">*</sup>
        </label>
        <textarea
          id="CourseDescription"
          placeholder="Enter Course Description"
          className="min-h-[140px] w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none"
          {...register("CourseDescription", { required: true })}
        ></textarea>
        {errors.CourseDescription && (
          <span className="text-red text-sm">
            Course Description is required.
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-1">
        <label htmlFor="coursePrice">
          Course Price<sup className="text-red">*</sup>
        </label>
        <input
          type="number"
          id="coursePrice"
          placeholder="Enter Price"
          className="pl-8 w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none"
          {...register("coursePrice", { required: true })}
        />
        <HiOutlineCurrencyRupee className="text-richblack-5 absolute top-[3.2rem] left-2 transform -translate-y-1/2 text-gray-500" />
        {errors.coursePrice && (
          <span className="text-red text-sm">Course Price is required.</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="courseCategory">
          Course Category<sup className="text-red">*</sup>
        </label>
        <select
          id="courseCategory"
          className="w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none"
          defaultValue={editCoure ? course.category._id : ""}
          {...register("courseCategory", { required: true })}
        >
          <option className="w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none" value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategory.map((item) => (
              <option key={item._id} value={item._id} className="w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none">
                {item.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <>
            <br />
            <span className="text-red text-sm">
              Course Category is required.
            </span>
          </>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCoure ? course?.thumbnail : null}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="courseBenefits">
          Benefits of the Course<sup className="text-red">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the Course"
          className="min-h-[130px] w-full bg-richblack-700 p-[12px] text-richblack-5 rounded-[8px] outline-none"
          {...register("courseBenefits", { required: true })}
        ></textarea>
        {errors.courseBenefits && (
          <span className="text-red text-sm">
            Course Benefits is required.
          </span>
        )}
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {editCoure && (
        <button
          type="button"
          className="flex items-center gap-x-2 bg-richblack-300"
          onClick={() => dispatch(setStep(2))}
        >
          Continue Without Saving
        </button>
      )}

      <Iconbtn
        text={editCoure ? "Save Changes" : "Next"}
        disabled={loading}
      />
    </form>
  );
}

export default CourseInformationForm;
