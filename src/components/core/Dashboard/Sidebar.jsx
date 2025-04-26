import React, { useState } from "react";
import sidebarLinks from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Common/Loader";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../Common/confirmationModal";

function Sidebar() {

    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModalState, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return <Loader />;
    }

    const extraRoute = [{ id: 1010, name: "Settings", path: "dashboard/settings", icon: "VscSettingsGear" }]

    return <div className="h-[100vh] below-md:hidden">
        <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[100vh] bg-richblack-800 py-10 ">

            <div className="flex flex-col">
                {
                    sidebarLinks.map((item) => {
                        if (item?.type && user?.accountType !== item.type) return null;
                        // {console.log(user?.accountType)}
                        return (
                            <SidebarLink {...item} key={item.id} />
                        )
                    })
                }
            </div>

            <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600"></div>

            <div className="flex flex-col">
                <SidebarLink
                    {...extraRoute[0]}
                />

                <button
                    onClick={() => {
                        setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => {
                                dispatch(logout(navigate)); // Correct logout logic
                                setConfirmationModal(null); // Close the modal
                            },
                            btn2Handler: () => setConfirmationModal(null) // Cancel closes the modal
                        });
                        
                    }}

                    className="text-sm font-medium text-richblack-300 ml-8"
                >
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <p>
                            loggout
                        </p>
                    </div>
                </button>
            </div>

        </div>

        {
            confirmationModalState && <ConfirmationModal modalData={confirmationModalState} />
        }


    </div>;
}

export default Sidebar;