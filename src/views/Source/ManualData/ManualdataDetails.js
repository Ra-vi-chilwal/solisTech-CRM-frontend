import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "./FilterComponent";
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
import { cilSortAscending } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { fetchLeadSource } from "../../../redux/action/LeadSource/LeadSource";
import { Link } from "react-router-dom";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
import Loading from '../../../components/Loader/loader'
import { useMemo } from "react";
function ManualdataDetails() {
  const dispatch = useDispatch();
  var token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchLeadSource(token));
  }, []);
  const { loading, LeadSource, error } = useSelector((store) => store) || " ";
  const leadSource = LeadSource && LeadSource.userInfo && LeadSource.userInfo.data;
console.log(leadSource,'leadSource')
  // const lead = leadSource && 

  const columns = [
    {
      name: 'Action',

      cell: row => <div>
        <Link to={`${row._id}`} state={row} > <spna className><i class="bi bi-arrows-fullscreen" style={{ marginRight: "8px", fontSize: "14px" }}></i></spna></Link>
        <Link to={`update/${row._id}`} state={row}><button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button></Link>
        <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button>
      </div>
    },
    {
      name: "First Name",
      selector: (row) =>
        <div >

          <a tabindex="0" data-toggle="popover" field="firstName" data-trigger="focus" title={`${row?.firstName}`}>{row?.firstName}</a>,
        </div>
    },
    {
      name: "Last Name",
      selector: (row) => <a tabindex="0" data-toggle="popover" field="lastName" data-trigger="focus" title={`${row?.lastName}`}>{row?.lastName}</a>,
    },
    {
      name: "Email",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" field="email" title={`${row?.email}`}>{row?.email}</a>,
    },
    {
      name: "Phone",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" field="phone" title={`${row?.phone}`}>{row?.phone}</a>,
    },
    {
      name: "Lead Status",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.leadStatus}`}>{row?.leadStatus}</a>,
    },
    {
      name: "Lead Owner",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" field="leadOwner" title={`${row?.leadOwner}`}>{row?.leadOwner}</a>,
    },
    {
      name: "Status",
      selector: (row) =>
        <div>
          {row && row.isShow == "REJECTED" ? <p style={{
            background: "#ff52529e",
            color: "#431010",
            padding: "6px",
            borderRadius: "5px"
          }}>REJECTED</p> : row && row.isShow == "ACCEPTED" ? <p style={{
            background: "#6FF976",

            color: "#2C542F",
            padding: "6px",
            borderRadius: "5px"
          }}>ACCEPTED</p> : <p style={{
            background: "#DFFF54",

            color: "#3C4229",
            padding: "6px",
            borderRadius: "5px"
          }}>PENDING</p>}

        </div>
    },
    {
      name: "Lead Source",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.leadSource}`}>{row?.leadSource}</a>,
    },
    {
      name: "what is your Budget ",
      selector: (row) => <a tabindex="0" data-toggle="popover" data-trigger="focus" title={`${row?.whatisyourbudget}`}>{row?.whatisyourbudget}</a>
      ,
    },

    {
      name: "City",
      selector: (row) => <a tabindex="0" data-toggle="popover" field="category" data-trigger="focus" title={`${row?.city}`}>{row?.city}</a>
    },

    {
      name: "Country",
      selector: (row) => row?.country,
    },
    {
      name: "Date",
      selector: (row) => row?.date,
    },
    {
      name: "Time",
      selector: (row) => row?.time,
    },

    {
      name: "Created At",
      selector: (row) => row?.createdAt,
      cell: (row) => new Date(row.createdAt).toDateString(),
    },
    {
      name: "Updated At",
      selector: (row) => row?.updatedAt,
      cell: (row) => new Date(row.updatedAt).toDateString(),
    },

  ];
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = leadSource && leadSource.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const ExpandableComponent = ({ data }) => {

    return (
      <div>
        <>
          <ul className="p-4 bg-light">
            <p style={{ fontSize: "13px" }}> <strong>Email:</strong> {data && data.email}</p>
            <p style={{ fontSize: "13px" }}> <strong>Phone:</strong> {data && data.phone}</p>
            <p style={{ fontSize: "13px" }}><strong>Description : </strong>{data && data.description}</p>
          </ul>
        </>
      </div>

    );
  };
  return (
    <>
      <div className="text-end" >
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)}
          // onClear={handleClear}
          filterText={filterText} />
      </div>
      <div className='row' >
        <div className="col-xl-12 col-lg-12  col-md-12">

          <div className="card shadow-sm ctm-border-radius grow">

            <div className="card-body align-center">
              <div className="row" >
                <div className="col-md-12 react-table " >
                  <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    selectableRowsHighlight
                    highlightOnHover
                    FixedHeader
                    fixedHeaderScrollHeight='450px'
                    expandableRows
                    expandableRowsComponent={ExpandableComponent}
                    subHeaderComponent={subHeaderComponent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default ManualdataDetails;

