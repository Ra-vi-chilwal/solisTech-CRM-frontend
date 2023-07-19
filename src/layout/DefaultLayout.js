import React, {useState } from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/loader";
import user from "../views/AdminTool/User/user";
const DefaultLayout = () => {
  const { loading, userInfo, error } = useSelector((state) => state.userInfo);
  // useEffect(()=>{
  // setUserToken(userInfo?.userInfo)
  // },[])

  return (
    <div>
      {loading  ? (
        <Loader />
      ) : (( userInfo?.token) || ( userInfo?.verify))  ? (
        <>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
            <Outlet />
          </div>
          <AppFooter />
        </div>
      </>
      ) :  (
        window.location.replace("/auth/login") 
      )}
    </div>
  );
};

export default DefaultLayout;
