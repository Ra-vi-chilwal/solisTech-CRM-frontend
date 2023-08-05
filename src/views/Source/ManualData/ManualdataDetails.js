import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import avtar from '../../../assets/images/avatars/download-removebg-preview.png'
import Loader from "../../../components/Loader/loader";

import {
    CButton,
    CCard,
    CCardBody,
    CCardImage,
    CCardText,
    CCardTitle,
    CCol,
    CContainer,

    CRow,
} from "@coreui/react";
import { cilSortAscending } from '@coreui/icons'
import CIcon from "@coreui/icons-react";
import { fetchLeadSource } from "../../../redux/action/LeadSource/LeadSource";
function ManualdataDetails() {
    const dispatch = useDispatch()
    var token = localStorage.getItem("token");
    useEffect(()=>{
        dispatch(fetchLeadSource(token))
    },[])
    const { loading, LeadSource, error } = useSelector((store) => store) || " ";
    console.log(LeadSource,'sdk')
    const leadSource = LeadSource && LeadSource.userInfo && LeadSource.userInfo.data;
    console.log(leadSource,'5t6')
    return (
        <>
        {leadSource == 'No data found'?  <p>No Data Found</p>:
            <CContainer>
                <table class="table">
                    <tbody>
                        {leadSource && leadSource.map((result) => {
                            return (
                                <>
                                    <tr>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <h1 style={{ fontSize: "43px", textTransform: "uppercase", padding: "26px 39px" }} className="short-name"><strong>{result && result.firstName && result.firstName[0]}</strong></h1>
                                                <div>

                                                    <h1 style={{ fontSize: "20px", paddingLeft: "12px" }} className="pt-1 "> <strong>{result.firstName} {result.lastName}</strong></h1>
                                                    <div className="d-flex" style={{ paddingLeft: "12px" }}>
                                                        <i class="bi bi-sort-up" style={{
                                                            fontSize: "18px",
                                                            fontWeight: "600"
                                                        }}></i>
                                                        <h1 style={{ fontSize: "13px" }} className="pt-1 m-1"><strong>Lead Status :</strong>{result.leadStatus}</h1>
                                                    </div>
                                                    <div className="d-flex" style={{ paddingLeft: "12px" }}>
                                                        <i class="bi bi-geo-alt  " style={{
                                                            fontSize: "18px",
                                                            fontWeight: "600"
                                                        }}></i>
                                                        <h1 style={{ fontSize: "13px" }} className="pt-1 m-1"><strong>Location :</strong>{result.city}</h1>
                                                    </div>
                                                    <div className="d-flex" style={{ paddingLeft: "12px" }}>
                                                        <i class="bi bi-envelope  " style={{
                                                            fontSize: "18px",
                                                            fontWeight: "600"
                                                        }}></i>
                                                        <h1 style={{ fontSize: "13px" }} className="pt-1 m-1"><strong>Email :</strong> {result.email}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src={avtar} className="img-fluid" style={{ width: "130px", height: "62px" }} />
                                                <h1 style={{ fontSize: "16px" }} className="pt-3 m-1"><strong>Lead Owner :</strong>{result.leadOwner}</h1>
                                            </div>
                                        </div>





                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-success text-light rounded-circle m-1">✔</button>
                                            <button className="btn btn-danger text-light rounded-circle m-1">✖</button>
                                        </div>
                                    </tr>
                                    <hr />
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </CContainer>}
        </>
    );
}

export default ManualdataDetails;
