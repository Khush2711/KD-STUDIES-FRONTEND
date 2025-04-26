import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../Slice/course";

function EditCourse() {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const popluateCourseDetail = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            console.log("courses.....................:",result)
            if (result?.data?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.data.courseDetails));
            }
            setLoading(false);
        }
        popluateCourseDetail()
    }, []);


    if (loading) {
        return <div className="">Loading...</div>
    }

    return <div className="text-richblack-5">

        <h1>Edit Course</h1>

        <div className="">
            {
                course ? (<RenderSteps />) : (<p>Course Not Found</p>)
            }
        </div>

    </div>;
}

export default EditCourse;
