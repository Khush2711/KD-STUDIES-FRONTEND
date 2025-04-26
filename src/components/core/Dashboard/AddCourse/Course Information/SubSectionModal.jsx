import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setSubSection } from "../../../../../Slice/course";
import { RxCross1 } from "react-icons/rx";
import Iconbtn from "../../../../Common/IconBtn";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Upload from "../Upload";

function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if ((view || edit) && modalData) {
      setValue("lectureTitle", modalData?.title || "");
      setValue("lectureDesc", modalData?.description || "");
      setValue("lectureVideo", modalData?.videoUrl || "");
    }
  }, [modalData, setValue, view, edit]);

  const isFormUpdated = () => {
    if (!modalData) return false;
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  const handleEditSubSection = async () => {
    if (!modalData) return;

    // console.warn("sectionId", modalData.sectionId);
    // console.warn("subSectionId", modalData._id);

    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

      if (result) {
        // console.log("RESULT.............................:", result);
        dispatch(setCourse({ ...result?.data }));
      }
      toast.success("Sub-section updated successfully");

    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    console.log("BEFORE COURSE UPDATE____________________________________________________________________", course);


    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
        return;
      } else {
        handleEditSubSection();
        return;
      }
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);


    const result = await createSubSection(formData, token);
    if (result) {
      dispatch(setCourse({ ...result?.courses }));
      // console.log("RESULT.............................:",result?.courses);
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="below-md:flex below-md:justify-center below-md:items-center fixed inset-0 z-[1000] !mt-0  bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="flex flex-col justify-center items-center gap-y-2">


        <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 max-h-[600px] max-w-[450px] rounded-lg border border-richblack-400 bg-richblack-800 p-5 py-4 overflow-y-scroll">

          <div className="modal-header flex justify-between ">
            <p className="font-bold">{view ? "Viewing" : add ? "Adding" : "Editing"} Lecture</p>
            <button
              className="text-richblack-5"
              onClick={() => (!loading ? setModalData(null) : {})}>
              <RxCross1 />
            </button>
          </div>

          {/* Upload Video Component */}

          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view && modalData ? modalData.videoUrl : null}
            editData={edit && modalData ? modalData.videoUrl : null}
          />

          {/* Lecture Title Input */}
          <div className="form-group ">
            <label htmlFor="lectureTitle">Lecture Title</label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100 "
            />
            {errors.lectureTitle && <span className="error-text">Lecture Title is required</span>}
          </div>

          {/* Lecture Description Input */}
          <div className="form-group ">
            <label htmlFor="lectureDesc">Lecture Description</label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="focus:outline-none custom-box-shadow w-full bg-richblack-700 px-2 py-2 rounded-lg drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-b border-richblack-100 "
            ></textarea>
            {errors.lectureDesc && <span className="error-text">Lecture Description is required</span>}
          </div>

          {/* Submit Button */}
          {!view && (
            <div className="form-actions">
              <Iconbtn text={loading ? "Loading..." : edit ? "Save Changes" : "Save"} />
            </div>
          )}
        </form>

      </div>

    </div>
  );
}

export default SubSectionModal;
