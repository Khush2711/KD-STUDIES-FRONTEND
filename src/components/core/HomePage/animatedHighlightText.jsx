import React, { forwardRef } from "react";

// Use forwardRef to allow parent component to access this component's DOM
const AnimatedHighlightText = forwardRef(({ textArray }, ref) => {
    return (
        <>
            {textArray.map((ch, index) => (
                <span
                    key={index}
                    ref={ref}  // Use the passed ref
                    className="char bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold"
                >
                    {ch}
                </span>
            ))}
        </>
    );
});

export default AnimatedHighlightText;

