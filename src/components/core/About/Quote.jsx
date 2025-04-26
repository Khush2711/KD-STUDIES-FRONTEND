import React from "react";
import HighlightText from "../HomePage/HighlightText";

function Quote() {
    return <div>
        <h2 className="text-richblack-5 text-4xl below-md:text-xl font-bold normal-case">We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightText text={" combines technology"} />,
            <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"> expertise</span>,
            and community to create an
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold"> unparalleled educational experience.</span>
        </h2>
    </div>;
}

export default Quote;
