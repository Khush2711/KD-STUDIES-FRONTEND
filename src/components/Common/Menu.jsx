import React, { useState } from "react";

function Menu({list}) {

    const [currentTab,setCurrentTab] = useState(list[0]);

    function tabHandler(ele) {
        setCurrentTab(ele)
    }

    return <div className="text-richblack-200 flex gap-5 my-5 below-md:mx-auto bg-richblack-800 w-max below-md::w-full p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {
            list.map((ele, i) => (
                <p className={`px-6 py-1 ${currentTab === ele ? 'bg-richblack-900 text-richblack-5 rounded-full' : ''}`} key={i}
                    onClick={() => { tabHandler(ele) }}>{ele}</p>
            ))
        }
    </div>;
}

export default Menu;
