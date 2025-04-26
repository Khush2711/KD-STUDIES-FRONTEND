import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Common/Loader";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import BottomNavigationBar from "../components/Common/BottomNavigationBar";


function Dashboard() {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return <div className="flex">
            <Sidebar />
            <div className="h-[90vh] flex justify-center items-center w-[80vw]">
                <Loader />
            </div>
        </div>;
    }

    return <>

        <div className="relative flex min-h-[cal(100vh-3.5rem)]">

            <Sidebar />
            <div className="w-full">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>


            <BottomNavigationBar />
        </div>;
    </>
}

export default Dashboard;
