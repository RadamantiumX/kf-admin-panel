import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useStateContext } from "../contexts/ContextProvider";

export default function  DefaultLayout() {
    const {token} = useStateContext();

    if(!token){
        return <Navigate to="/login"/>
    }


    return(
    <>
    <main>
        <Sidebar/>
        <Outlet/>
    </main>
    </>
    );
}