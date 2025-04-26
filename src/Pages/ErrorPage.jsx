import React from 'react';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#0d1117] text-white text-center">
            <h1 className="text-9xl font-bold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text  text-transparent md:w-[70%]">404</h1>
            <h2 className="text-2xl mt-4"><HighlightText text={"Oops! We can't find that page."} /></h2>
            <p className="mt-2 text-richblack-200">
                The page you're looking for might have been removed, or it’s temporarily unavailable.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 text-lg font-semibold bg-[#3a3d41] hover:bg-[#343a40] text-white rounded-md transition duration-200 ease-in-out"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
