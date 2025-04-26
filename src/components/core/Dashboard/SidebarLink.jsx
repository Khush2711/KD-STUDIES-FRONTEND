import React from "react";
import * as reactIcons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function SidebarLink({ id, name, path, icon }) {
    const dispatch = useDispatch();
    const ICON = reactIcons[icon];
    const location = useLocation();

    const isActive = location.pathname === path;

    return (
        <NavLink
            to={path}
            className={`relative px-8 py-2 text-sm font-medium ${isActive ? 'bg-yellow-600' : 'opacity-50'} text-white`}
        >
            <span
                className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            ></span>
            <div className="flex items-center gap-x-2">
                {ICON && <ICON className="text-lg" />}
                <span>{name}</span>
            </div>
        </NavLink>
    );
}

export default SidebarLink;
