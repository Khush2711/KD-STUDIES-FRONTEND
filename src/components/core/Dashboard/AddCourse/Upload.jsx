import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || editData || "");
  const inputRef = useRef(null);

  // Function to preview file
  const previewFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Handles file selection when user clicks "Browse"
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setValue(name, file);

      // Reset file input value to allow re-selecting the same file
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  // Handles file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setValue(name, file);

      // Reset file input value to allow re-selecting the same file
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true, // Prevents default file picker opening on click
  });

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        onClick={(e) => {
          e.stopPropagation(); // Prevents unnecessary file dialog triggers
          inputRef.current?.click(); // Manually opens file picker
        }}
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          onChange={handleFileChange} // Handles manual file selection
        />

        {previewSource ? (
          <div
            className="flex w-full flex-col p-6"
            onClick={(e) => e.stopPropagation()} // Prevents file picker from opening on preview click
          >
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video controls width="400">
                <source src={previewSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering file picker
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);

                  // Reset file input value so same file can be selected again
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
