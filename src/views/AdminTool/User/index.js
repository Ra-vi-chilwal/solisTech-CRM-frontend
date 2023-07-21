import React, { useEffect } from "react";
import AddUser from "./AddUser";
import UserDetails from "./detailsUser";
import { useDispatch } from "react-redux";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";

export default function Modal() {
  var token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchUserApi(token));
  }, [])
  return (
    <>
      <button
        className=" text-white  font-bold uppercase text-sm px-6 py-3 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
        type="button"
        onClick={() => setShowModal(true)} style={{background:"#3C4B64" }}
      >
        + Add User
      </button>
      {showModal ? (
        <>
        <AddUser  showModal={showModal} setShowModal={setShowModal}/>
        </>
      ) : <UserDetails />}
      
    </>
  );
}