import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { fetchUserApi } from "../../../redux/action/UserApi/UserApi";
// import user from "../User/user";
function UpdateLead(props) {
  //permissions 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserApi(token));
  }, [])
  var token = localStorage.getItem("token");
  const location = useLocation();
  const receivedData = location && location.state;
  console.log(receivedData._id)
  const showModal = props && props.showModal;
  const setShowModal = props && props.setShowModal;
  const { companyInfo } = useSelector((store) => store) || " ";
  const company = companyInfo?.userInfo?.data;
  const { loading, userInfo, error } = useSelector((store) => store.userInfo) || " ";

  const companyData = userInfo?.payload?.company
  const { userApi } = useSelector((store) => store) || " ";
  const userDetails = userApi?.userInfo?.data;
  const companyId = userInfo?.payload?.company;
  const filterUser = userDetails && userDetails.filter((ele) => {
    return ele.company._id === companyId;
  });
  console.log(receivedData.assignedUser)
  //role
  const { RoleData } = useSelector((store) => store) || " ";
  const role = RoleData?.userInfo?.data;
  const userPermission = userInfo && userInfo.payload && userInfo.payload && userInfo.payload.role[0]?.permission
  const id = receivedData && receivedData._id;
  const initialValues = {
    leadOwner: receivedData && receivedData.leadOwner || "",
    lastName: receivedData && receivedData.lastName || "",
    firstName: receivedData && receivedData.firstName || "",
    email: receivedData && receivedData.email || "",
    phone: receivedData && receivedData.phone || "",
    leadStatus: receivedData && receivedData.leadStatus || "",
    leadSource: receivedData && receivedData.leadSource || "",
    whatisyourbudget: receivedData && receivedData.whatisyourbudget || "",
    date: receivedData && receivedData.date || "",
    time: receivedData && receivedData.time || "",
    state: receivedData && receivedData.state || "",
    city: receivedData && receivedData.city || "",
    country: receivedData && receivedData.country || "",
    description: receivedData && receivedData.description || "",
    assignedManager: receivedData && receivedData.assignedUser && receivedData.assignedUser[0] && receivedData.assignedUser[0].id || "",
    alternateManager: receivedData && receivedData.assignedUser && receivedData.assignedUser[1] && receivedData.assignedUser[1].id || "",
    assignedLead: receivedData && receivedData.assignedUser && receivedData.assignedUser[2] && receivedData.assignedUser[2].id || "",
    alternateLead: receivedData && receivedData.assignedUser && receivedData.assignedUser[3] && receivedData.assignedUser[3].id || "",
    reminderCall: receivedData && receivedData.reminderCall && receivedData.reminderCall.substring(0, 16) || "",
    company: companyData,
    keyValuePairs: [{ key: '', value: '' }],
  };
  const validationSchema = Yup.object({
    leadOwner: Yup.string().required("Lead Owner is required"),
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Last Name is required"),
    leadStatus: Yup.string().required("Lead Status is required"),
    leadSource: Yup.string().required("Lead Source is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    description: Yup.string().required("Description is required"),
    assignedManager: Yup.string().required("Assigned Manager is required"),

  });
  // All exists
  // const userPermission = permission.map((perm) => perm.value);
  // const allExist = userPermission.every((perm) =>
  //   permissionOptions.some((option) => option.value === perm.value)
  // );


  const permission = [
    { value: "read", label: "Read" },
    { value: "create", label: "Create" },
    { value: "update", label: "Update" },
    //  { value: "delete", label: "Delete" },
  ];
  // Check if all values in 'permissionValues' exist in 'permissionOptions'
  const allExist = permission.every((value) =>
    userPermission.some((option) => option.value === value.value)
  );
  const permissionExists = permission.every((value) =>
    userPermission.some((option) => option.value === value.value)
  );

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/leadSource/update/${id}`, {
        ...values, assignedUser: [{
          "id": values.assignedManager,
          "managerstatus": true,
          "key": "M1"
        },
        {
          "id": values.alternateManager,
          "managerstatus": false,
          "key": "M2"
        },
        {
          "id": values.assignedLead,
          "leadstatus": true,
          "key": "L1"
        },
        {
          "id": values.alternateLead,
          "leadstatus": false,
          "key": "L2"
        },
        ]
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type for file upload
            // Add any other headers you need
          },
        }
      );
      const userData = response.data;
      console.log(userData)
      if (userData.code == "DUPLICATEDATA") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "User Already Exists",
        });

      }
      if (userData.code == "UPDATED") {
        Swal.fire({
          icon: "success",
          title: "Woh...",
          text: "Lead Updated ",
        });

      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });

    }
  };
  // filter for option field .
  const expectedValues = ["read"];
  const expectedManager = ["read", "create", "update"];
  const expectedAdmin = ["read", "create", "update", 'delete'];
  // filter for show and hide input field && 
  const inputfiledforLead = userPermission.every((perm, index) => perm.value === expectedManager[index]) && userPermission.length === expectedManager.length
  const inputfiledforManager = userPermission.every((perm, index) => perm.value === expectedAdmin[index]) && userPermission.length === expectedAdmin.length


  return (
    <div>
      <div className=" items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80">
        <div className="relative w-100 my-6 mx-auto max-w-sm  flex  ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-100 bg-white outline-none focus:outline-none">
            {/*header*/}
            <h3 className="p-4 text-bolder" style={{ fontWeight: "600" }}>
              Lead Information
            </h3>
            {/*body*/}
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            // initialValues={{ friends: ['jared', 'ian', 'brent'] }}
            >
              {({ values, setFieldValue, errors, dirty, isValid }) => {
                console.log(values)
                return (
                  <Form>
                    <div className="relative p-6 flex-auto">
                      <div className="-mx-4 flex flex-wrap">

                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="firstName"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              First Name
                            </label>
                            <Field
                              name="firstName"
                              type="text"
                              placeholder="Enter your  First Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="firstName"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="lastName"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Last Name
                            </label>
                            <Field
                              name="lastName"
                              type="text"
                              placeholder="Enter your  Last Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="lastName"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="email"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Email
                            </label>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Enter your Email"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="email"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="phone"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Phone
                            </label>
                            <Field
                              type="number"
                              name="phone"
                              placeholder="Enter your phone"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="phone"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="leadSource"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Lead Status
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="leadStatus"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT LEAD STATUS--</option>
                              <option value="none">NONE</option>
                              <option value="attempted-to-contact">
                                Attempted to Contact
                              </option>
                              <option value="cold-lead">Cold Lead</option>
                              <option value="warm-lead">Warm Lead</option>
                              <option value="hot-lead">Hot Lead</option>
                              <option value="contact-in-future">
                                Contact in Future
                              </option>
                              <option value="Contacted">Contacted</option>
                              <option value="Junk-lead">Junk Lead</option>
                              <option value="Lost-lead">Lost Lead</option>
                              <option value="not-Contacted">
                                Not Contacted
                              </option>
                              <option value="Pre-Qualified">
                                Pre-Qualified
                              </option>
                              <option value="not-Qualified">
                                Not Qualified
                              </option>
                            </Field>

                            <ErrorMessage
                              name="leadStatus"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="leadSource"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Lead Source
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="leadSource"

                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT LEAD SOURCE--</option>
                              <option value="none">NONE</option>
                              <option value="advertisement">
                                Advertisement
                              </option>
                              <option value="cold-call">Cold Lead</option>
                              <option value="employee-referral">Employee Referral</option>
                              <option value="web-download">
                                Web Download
                              </option>
                              <option value="web-referal">Web Referal</option>
                              <option value="google">Google</option>
                              <option value="linkdin">Linkdin</option>
                              <option value="just-dial">
                                Justdial
                              </option>

                              <option value="other">
                                Other
                              </option>
                            </Field>

                            <ErrorMessage
                              name="leadSource"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        {/* Leads */}
                       {inputfiledforManager ?<>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="assignedManager"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Assigned Manager
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="assignedManager"
                              placeholder="Enter your lead Source"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT ASSIGNED MANAGER--</option>
                              {filterUser && filterUser.filter(item => item?.role?.permission.every((perm, index) => perm.value === expectedManager[index]) 
                              && item?.role?.permission.length === expectedManager.length).map((ele) => {
                                return (
                                  <>
                                    <option value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                  </>
                                )
                              })}
                            </Field>

                            <ErrorMessage
                              name="assignedManager"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="alternateManager"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Alternate Assigned Manager
                            </label>
                            <Field
                              as="select"
                              type="text"
                              name="alternateManager"
                              style={{ background: values.assignedManager == "" || null ? "#d8caca" : "" }}
                              disabled={values.assignedManager == "" || null}
                              placeholder="Enter your lead Source"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option>--SELECT ALTERNATE ASSIGNED MANAGER--</option>
                              {filterUser && filterUser.filter(item => item?.role?.permission.every((perm, index) => perm.value === expectedManager[index]) && item?.role?.permission.length === expectedManager.length && values.assignedManager !== item._id).map((ele) => {
                                return (
                                  <>
                                    <option value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                  </>
                                )
                              })}
                            </Field>
                          </div>
                        </div>
                       </> :""}

                        {inputfiledforLead ? 
                          <>
                            <div className="w-full px-4 md:w-1/2">
                              <div className="mb-8">
                                <label
                                  htmlFor="assignedLead"
                                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                >
                                  Assigned Lead
                                </label>
                                <Field
                                  as="select"
                                  type="text"

                                  name="assignedLead"
                                  placeholder="Enter your lead Source"
                                  className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                >
                                  <option value={""}>--SELECT ASSIGNED LEAD--</option>
                                  {filterUser && filterUser.filter(item => item?.role?.permission.every((perm, index) => perm.value === expectedValues[index]) && item?.role?.permission.length === expectedValues.length).map((ele) => {
                                    return (
                                      <>
                                        <option
                                          value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                      </>
                                    )
                                  })}
                                </Field>

                                <ErrorMessage
                                  name="assignedLead"
                                  render={(msg) => (
                                    <small style={{ color: "red" }}>{msg}</small>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                              <div className="mb-8">
                                <label
                                  htmlFor="alternateLead"
                                  className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                >
                                  Alternate Assigned Lead
                                </label>
                                <Field
                                  as="select"
                                  type="text"
                                  style={{ background: values.assignedLead == "" || null ? "#d8caca" : "" }}
                                  disabled={values.assignedLead == "" || null}
                                  name="alternateLead"
                                  placeholder="Enter your lead Source"
                                  className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                >
                                  <option value={""}>--SELECT ALTERNATE ASSIGNED LEAD--</option>
                                  {filterUser && filterUser.filter(item => item?.role?.permission.every((perm, index) => perm.value === expectedValues[index]) && item?.role?.permission.length === expectedValues.length && values.assignedLead !== item._id).map((ele) => {
                                    return (
                                      <>
                                        <option
                                          value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                      </>
                                    )
                                  })}
                                </Field>

                                <ErrorMessage
                                  name="alternateLead"
                                  render={(msg) => (
                                    <small style={{ color: "red" }}>{msg}</small>
                                  )}
                                />
                              </div>
                            </div>
                          </>
                          : ""}
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="name"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Lead Owner
                            </label>
                            <Field
                              name="leadOwner"
                              type="text"
                              placeholder="Enter your  Lead Owner Name"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="leadOwner"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="whatisyourbudget"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              What is Your Budget
                            </label>
                            <Field
                              type="text"
                              name="whatisyourbudget"
                              placeholder="Enter your Your Budget"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="whatisyourbudget"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="date"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              date
                            </label>
                            <Field
                              type="date"
                              name="date"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="date"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="time"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Time
                            </label>
                            <Field
                              type="time"
                              name="time"
                              placeholder="Enter your Plan"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="time"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

                        <div className="w-full  ">
                          {" "}
                          <h3
                            className="p-4 text-bolder"
                            style={{ fontWeight: "600" }}
                          >
                            Address Information
                          </h3>{" "}
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8 pt-2">
                            <label
                              htmlFor="state"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              State
                            </label>
                            <Field
                              type="text"
                              name="state"
                              placeholder="Enter your  state"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="state"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="city"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              City
                            </label>
                            <Field
                              type="text"
                              name="city"
                              placeholder="Enter your  city"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="city"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="country"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Country
                            </label>
                            <Field
                              type="text"
                              name="country"
                              placeholder="Enter your Country"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />

                            <ErrorMessage
                              name="country"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="reminderCall"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Reminder call
                            </label>
                            <Field
                              type="datetime-local"
                              name="reminderCall"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="reminderCall"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>


                        <div className="w-full">
                          {" "}
                          <h3
                            className="p-4 text-bolder"
                            style={{ fontWeight: "600" }}
                          >
                            Description Information
                          </h3>{" "}
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="description "
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Description
                            </label>
                            <Field
                              component="textarea"
                              name="description"
                              placeholder="Enter your  Description"
                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="description"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        { }
                        <div className="w-full px-4">
                          <div className="mb-8">
                            <fieldset> <h3
                              className="p-4 text-bolder"
                              style={{ fontWeight: "600" }}
                            >
                              Meeting Information
                            </h3>{" "}
                              <FieldArray
                                name="api"
                                render={arrayHelpers => (
                                  <>
                                    <div className="col d-flex justify-content-end">
                                      <div className="mt-4 mb-3">
                                        {values.api &&
                                          values.api.length >= 0 ? (
                                          <>
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-primary"
                                              style={{ marginRight: "4px", background: "green", border: "1px solid green" }}
                                              onClick={() =>
                                                arrayHelpers.remove("")
                                              } // remove a contact from the list
                                            >
                                              -
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-success"
                                              style={{ color: "white", background: "blue" }}
                                              onClick={() =>
                                                arrayHelpers.push("")
                                              } // insert an empty contact
                                            >
                                              +
                                            </button>
                                          </>
                                        ) :
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-success"
                                            style={{ background: "green", color: "white" }}
                                            onClick={() =>
                                              arrayHelpers.push("")
                                            }
                                          >
                                            {/* show this when user has removed all contacts from the list */}
                                            +
                                          </button>
                                        }
                                      </div>
                                    </div>
                                    {values && values.api && values.api.map((api, index) => (
                                      <div className="grid grid-cols-12 col-span-12 gap-2">
                                        <div className="row">
                                          <div className="col-4 mb-2">

                                            <label
                                              htmlFor="meetingLocation"
                                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                              Meeting Location
                                            </label>
                                            <Field
                                              id="meetingLocation"
                                              type="text"
                                              name={`api.${index}.clientName`}
                                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                              placeholder="Meeting Location"
                                            />
                                            <ErrorMessage
                                              name={`api.${index}.meetingLocation`}
                                              render={(msg) => (
                                                <div
                                                  style={{ color: "red" }}
                                                >
                                                  {msg}
                                                </div>
                                              )}
                                            />
                                          </div>
                                          <div className="col-4 mb-2">
                                            <label
                                              htmlFor="meetingHost"
                                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                              Meeting Host
                                            </label>
                                            <Field
                                              id="meetingHost"
                                              type="text"
                                              name={`api.${index}.meetingHost`}
                                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                              placeholder="Meeting Host"
                                            />
                                            <ErrorMessage
                                              name={`api.${index}.meetingHost`}
                                              render={(msg) => (
                                                <div
                                                  style={{ color: "red" }}
                                                >
                                                  {msg}
                                                </div>
                                              )}
                                            />
                                          </div>
                                          <div className="col-4 mb-2">
                                            <label
                                              htmlFor="meetingType"
                                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                              Meeting Type
                                            </label>
                                            <Field
                                              id="meetingType"
                                              type="text"
                                              name={`api.${index}.meetingType`}
                                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                              placeholder="Meeting Type"
                                            />
                                            <ErrorMessage
                                              name={`api.${index}.meetingType`}
                                              render={(msg) => (
                                                <div
                                                  style={{ color: "red" }}
                                                >
                                                  {msg}
                                                </div>
                                              )}
                                            />
                                          </div>
                                          <div className="col-4 mb-2">
                                            <label
                                              htmlFor="meetingdate"
                                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                              Meeting Date
                                            </label>
                                            <Field
                                              id="meetingdate"
                                              type="date"
                                              name={`api.${index}.meetingdate`}
                                              className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                              placeholder="Meeting Date"
                                            />
                                            <ErrorMessage
                                              name={`api.${index}.meetingdate`}
                                              render={(msg) => (
                                                <div
                                                  style={{ color: "red" }}
                                                >
                                                  {msg}
                                                </div>
                                              )}
                                            />
                                          </div>
                                          <div className="w-full px-4 md:w-1/2">
                                            <div className="mb-8">
                                              <label
                                                htmlFor="meetingHilight "
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Meeting Highlights
                                              </label>
                                              <Field
                                                component="textarea"
                                                name="meetingHighlight"
                                                placeholder="About Meeting"
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                              />
                                              <ErrorMessage
                                                name="meetingHighlight"
                                                render={(msg) => (
                                                  <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full px-4 md:w-1/2">
                                            <div className="mb-8">
                                              <label
                                                htmlFor="followUp "
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                              >
                                                Follow Up
                                              </label>
                                              <Field
                                                component="textarea"
                                                name="followUp"
                                                placeholder="Follow Up"
                                                className="w-full textarea rounded-md border border-transparent py-2.5 px-6 text-base 
                              text-body-color placeholder-body-color shadow-one outline-none focus:border-primary 
                              focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                              />
                                              <ErrorMessage
                                                name="followUp"
                                                render={(msg) => (
                                                  <small style={{ color: "red" }}>{msg}</small>
                                                )}
                                              />
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                    ))
                                    }
                                  </>
                                )}
                              />
                            </fieldset>
                          </div>
                        </div>
                        {/* //*/}

                        <div className="w-75 px-4">
                          <button
                            className="rounded-md py-2.5 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                            style={{ background: "#3C4B64" }}
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

      {/* -------------------- */}
    </div>
  );
}

export default UpdateLead;
