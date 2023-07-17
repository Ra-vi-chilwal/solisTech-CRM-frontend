import React from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/loader";
const DefaultLayout = () => {
  const { loading, userInfo, error } = useSelector((state) => state && state.userInfo);
  return (
    <div>
      {loading && loading ? (
        <Loader />
      ) : (userInfo && userInfo.verify == true)  ? (
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
        // window.location.replace("/auth/login")
         console.log("sdj")
      )}
    </div>
  );
};

export default DefaultLayout;
