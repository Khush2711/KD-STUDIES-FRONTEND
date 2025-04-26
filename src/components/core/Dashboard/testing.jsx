import React, { useState } from "react";
import { FaUpload } from "react-icons/fa6";
import Loader from "../../Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../../services/operations/authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


function Settings() {

    const user = useSelector((state) => state.profile.user);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (!user || loading) {
        return <div className="flex">
            <div className="h-[90vh] flex justify-center items-center w-[80vw]">
                <Loader />
            </div>
        </div>;
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log(file);
        } else {
            setSelectedFile(null);
        }
    };

    const handleFileOnClick = () => {
        try {
            setLoading(true);
            if (!selectedFile) {
                toast.error("Please select the file first...");
                setLoading(false);
                return;
            }
            const formData = new FormData();
            formData.append("displayPicture", selectedFile);
            dispatch(changeProfile(navigate, formData));
            setLoading(false);
        }
        catch (err) {
            toast.error("Something went wrong...");
            console.log(err);
            setLoading(false);
        }
    }

    return <div className="text-richblack-5 flex items-center gap-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12">

        <div className="">
            <img src={user?.image} className="aspect-square w-[78px] rounded-full object-cover" alt="check your internet" />
        </div>

        <div className="flex flex-col gap-2">
            <p>Change Profile Picture</p>
            <div className="flex space-x-5">

                <div className="">

                    {/*  */}
                    <label
                        htmlFor="profile"
                        className="cursor-pointer w-[5em] flex items-center rounded-md border-[1px] border-richblack-700 bg-richblack-700 justify-center py-1"
                    >
                        Select
                    </label>
                    <input
                        type="file"
                        name="profile"
                        id="profile"
                        accept="image/*"
                        className="hidden" // Hide the file input element
                        onChange={handleFileChange}
                    />

                </div>
                {/*  */}
                <button className="flex items-center justify-center gap-2 bg-yellow-50 font-bold text-black rounded w-[6em]"
                    onClick={handleFileOnClick}>
                    Upload
                    <FaUpload />
                </button>
            </div>
        </div>

    </div >;
}

export default Settings;
