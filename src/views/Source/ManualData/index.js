import React, { useEffect } from "react";
import AddmanualData from "./AddmanualData";
import ManualdataDetails from "./ManualdataDetails";
import { useDispatch } from "react-redux";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
import {fetchLeadSource} from "../../../redux/action/LeadSource/LeadSource"
import FilterComponent from "./FilterComponent";
export default function Modal() {
  var token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(fetchUserApi(token));
      dispatch(fetchLeadSource(token))
  }, [])
  return (
    <>
    <div className="d-flex">
    <button
        className=" text-white  font-bold uppercase text-sm px-6 py-3 rounded  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex"
        type="button"
        onClick={() => setShowModal(true)} style={{background:"#3C4B64" }}
      >
        + Add Source
      </button>

    </div>
   
      {showModal ? (
        <>
        <AddmanualData  showModal={showModal} setShowModal={setShowModal}/>
        </>
      ) : <ManualdataDetails />}
      
    </>
  );
}