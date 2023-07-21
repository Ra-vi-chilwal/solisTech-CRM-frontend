import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";

import Loader from '../../../components/Loader/loader'
function ManualdataDetails() {
   
  

    const { loading, userApi, error } =
    useSelector((store) => store) || " ";
const role = userApi?.userInfo?.data

    const columns = [
        {
            name: "First Name",
            selector: (row) => row?.firstName,
        },
        {
            name: "Last Name",
            selector: (row) => row?.lastName,
        },
        {
            name: "Email",
            selector: (row) => row?.email,
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
        {
            name: 'Action',
            cell: row => <div>
                <button className='btn btn-warning me-1 btn-sm'><i className='icon-pencil'></i></button>
                <button className='btn btn-danger btn-sm'><i className=' icon-trash'></i></button>
            </div>
        },
    ];

 
    return (
        loading==true ?<Loader/>:
        <div className="active-projects style-1">
            <DataTableExtensions columns={columns} data={role}>
                <DataTable
                    columns={columns}
                   
                    
                    data={role}
                    direction="auto"
                    fixedHeader
                    fixedHeaderScrollHeight="1000px"
                    pagination
                    responsive
                    striped
                    subHeaderAlign="right"
                    subHeaderWrap
                />
            </DataTableExtensions>
        </div>
    );
}

export default ManualdataDetails;
