import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import {fetchRole} from "../../../redux/action/role/role"
function RoleDetails() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchRole());
    }, [])
    const { loading, RoleData, error } =
    useSelector((store) => store) || " ";
const role = RoleData?.userInfo?.data;

    const columns = [
        {
            name: "Title",
            selector: (row) => row?.title,
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

    const ExpandableComponent = (props) => {
        return (
            <>
                <div className="p-4">
                    {role &&
                        role.map((item,index) => {
                     
                            return (
                                <div className="d-flex align-items-center justify-content-between" key={index}>
                                    {/* <strong>{item.permission}</strong> */}
                                    <ul>
                                        {item && item.permission.map((item, index) => {
                                            console.log(item)
                                            return (
                                                <li key={index} style={{ float: "left" }}><div className='badge badge-sm badge-dark m-1'>{item.value}</div></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                </div>
            </>
        );
    };
    return (
        <div className="active-projects style-1">
            <DataTableExtensions columns={columns} data={role}>
                <DataTable
                    columns={columns}
                    expandableRows={true}
                    expandableRowsComponent={ExpandableComponent}
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

export default RoleDetails;
