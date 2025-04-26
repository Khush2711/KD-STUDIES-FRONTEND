import React from "react";
import { Link } from "react-router-dom";

function Button({ children, active, link }) {
    return <Link to={link}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800'} transition-all hover:scale-95 duration-200 text-[1em] below-md:p-2`}>
            {children}
        </div>
    </Link>;
}

export default Button;
