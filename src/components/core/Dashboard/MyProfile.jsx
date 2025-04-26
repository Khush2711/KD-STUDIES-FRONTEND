import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconbtn from '../../Common/IconBtn';
import Loader from "../../Common/Loader";

function MyProfile() {

    // const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const { user, additionalDetails } = useSelector((state) => state.profile);

    // Safely render user data or fallback
    if (!user && !additionalDetails) {
        return <div className="flex justify-center items-center w-full h-[80vh]">
            <Loader />
        </div>
    }

    return <div className="text-white w-full relative">


        <h1 className="text-3xl font-medium text-richblack-5 mb-20 below-md:mb-40">
            My Profile
        </h1>

        {/* Section 1 */}
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12 below-md:my-10">
            <div className="flex items-center gap-x-4">
                <div className="below-md:absolute below-md:flex below-md:justify-center below-md:items-center top-10 left-1/2 below-md:-translate-x-1/2 below-md:border-[1px] below-md:border-richblack-700 below-md:bg-richblack-800 below-md:p-3 below-md:rounded-full">
                    <img
                        src={`${user.image}`}
                        alt="check your internet"
                        className="aspect-square w-[78px] rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-richblack-5 font-bold capitalize text-xl">{user?.firstName} {user?.lastName}</p>
                    <p className="text-richblack-400 text-sm">{user?.email}</p>
                </div>

            </div>
            <Iconbtn
                text="Edit"
                onClick={() => {
                    navigate("/dashboard/settings")
                }}
            />
        </div>

        {/* Section 2 */}
        <div className="flex flex-col justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12 my-10">

            <div className="flex justify-between">
                <p className="text-richblack-5 font-bold capitalize text-xl">About</p>
                <Iconbtn
                    text="Edit"
                    onClick={
                        () => { navigate("/dashboard/settings") }
                    }
                />
            </div>

            <div className="">
                <p className="text-richblack-400 text-sm">
                    {additionalDetails?.about ?? "Write Something about your self"}
                </p>
            </div>

        </div>

        {/* Section 3 */}
        <div className="flex flex-col justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3 md:p-8 md:px-12 my-10">
            <div className="flex justify-between">
                <p className="text-xl font-bold text-richblack-5">Personal Details</p>
                <Iconbtn
                    text="Edit"
                    onClick={
                        () => { navigate("/dashboard/settings") }
                    }
                />
            </div>


            <div className="">

                <div className="grid grid-cols-2 my-2 below-md:grid-cols-1">
                    <div className="">
                        <p className="text-richblack-400">First Name</p>
                        <p className="text-richblack-5">{user?.firstName}</p>
                    </div>

                    <div className="">
                        <p className="text-richblack-400">Last Name</p>
                        <p className="text-richblack-5">{user?.lastName}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 my-2 below-md:grid-cols-1">
                    <div className="">
                        <p className="text-richblack-400">Email </p>
                        <p className="text-richblack-5">{user?.email}</p>
                    </div>

                    <div className="">
                        <p className="text-richblack-400">Phone Number </p>
                        <p className="text-richblack-5">{additionalDetails?.contactNumber ?? "Add Phone Number"}</p>
                    </div>

                </div>

                <div className="grid grid-cols-2 my-2 below-md:grid-cols-1">
                    <div className="">
                        <p className="text-richblack-400">Gender </p>
                        <p className="text-richblack-5">{additionalDetails?.gender ?? "Add Gender"}</p>
                    </div>

                    <div className="">
                        <p className="text-richblack-400">Date of Birth </p>
                        <p className="text-richblack-5">{additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>


                        

        </div>

    </div>;
}

export default MyProfile;
