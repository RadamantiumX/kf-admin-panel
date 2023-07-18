import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../contexts/ContextProvider";

export default function  DefaultLayout() {
    const {token, notification} = useStateContext();

    if(!token){
        return <Navigate to="/login"/>
    }


    return(
    <>
    <main>
        <Sidebar/>
        <Outlet/>
        {/* Notifications */}
        {notification&&<div className="notification">{notification}</div>}
    </main>
    </>
    );
}