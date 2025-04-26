import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseStep, setStep } from "../../../../../Slice/course";
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { MdNavigateNext } from "react-icons/md";
import Iconbtn from "../../../../Common/IconBtn";

function PublishCourse() {
    const { register, getValues, setValues, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState();

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValues("public", true);
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourse = () => {
        dispatch(resetCourseStep());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            goToCourse();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        setLoading(false);
        if (result) goToCourse();
    }

    const handleOnSubmit = () => {
        handleCoursePublish();
    }

    return <div className="space-y-8 rounded-md border-[1px] text-richblack-5 border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-bold">Publish Course</p>
        <form onSubmit={handleOnSubmit}>
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="Public"
                    {...register("public")}
                    className="rounded h-4 w-4"
                />

                <label htmlFor="Public">
                    Make this course as Public
                </label>
            </div>

            {/* Next Prev Button */}
            <div className="flex justify-end gap-x-3">
                <button
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <Iconbtn
                    disabled={loading}
                    text="Save Changes"
                >
                    <MdNavigateNext />
                </Iconbtn>
            </div>

        </form>
    </div>;
}

export default PublishCourse;
