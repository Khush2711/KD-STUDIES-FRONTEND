import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdSettings } from "react-icons/io";
import * as Icons from "react-icons/vsc"; // Assuming react-icons/vsc is used

// import { ACCOUNT_TYPE } from "../utils/constants";
import sidebarLinks from "../../data/dashboard-links"; // Assuming sidebarLinks.js is in a 'data' folder

const BottomNavigationBar = () => {
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.profile);
    const accountType = user?.accountType;

    // Filter links based on user's account type and remove those without a type
    const filteredLinks = sidebarLinks.filter(
        (link) =>
            !link.type || // Include links without a specific type (like "My Profile")
            link.type === accountType
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-richblack-900 text-richblack-5 py-2 border-t border-richblack-700 md:hidden z-50">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {filteredLinks.map((link) => {
                    const Icon = Icons[link.icon];
                    return (
                        <>
                            <NavLink
                                key={link.id}
                                to={link.path}
                                className={`flex flex-col font-extrabold p-2 px-4 items-center justify-center gap-1 ${pathname === link.path ? "text-richblack-5 bg-yellow-800  relative" : "text-richblack-5"
                                    }`}
                            >
                                {Icon && <Icon size={30} />}
                                {/* <span className="text-xs">{link.name}</span> */}
                                {
                                    pathname === link.path && ( <div className="absolute bg-yellow-50 w-full h-1 bottom-0"></div> )
                                }
                            </NavLink>
                        </>
                    );
                })}

                <NavLink
                    to={"/dashboard/settings"}
                    className={`flex flex-col items-center justify-center gap-1 ${pathname === "/dashboard/settings" ? "text-yellow-200" : "text-richblack-5"
                        }`}
                >
                    <IoMdSettings size={30} />
                    {/* <span className="text-xs">{link.name}</span> */}
                </NavLink>
            </div>
        </div>
    );
};

export default BottomNavigationBar;