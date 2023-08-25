import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
function AddLead(props) {
  var token = localStorage.getItem("token");
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
  //role
  const { RoleData } = useSelector((store) => store) || " ";
  const role = RoleData?.userInfo?.data;
  const initialValues = {
    leadOwner: "",
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    leadStatus: "",
    leadSource: "",
    whatisyourbudget: "",
    date: "",
    time: "",
    state: "",
    city: "",
    country: "",
    description: "",
    assignedManager: "",
    alternateManager: "",
    company: companyData
  };

  const validationSchema = Yup.object({
    leadOwner: Yup.string().required("Lead Owner is required"),
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    leadStatus: Yup.string().required("Lead Status is required"),
    leadSource: Yup.string().required("Lead Source is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    description: Yup.string().required("Description is required"),
    assignedManager: Yup.string().required("Assigned Manager is required"),

  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/leadSource/add`, {
        ...values, assignedUser: [{
          "id": values.assignedManager,
          "managerstatus": true,
          "key": "M1"
        },
        {
          "id": values.alternateManager,
          "managerstatus": false,
          "key": "M2"
        }]
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
      if (userData.code == "DUPLICATEDATA") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "User Already Exists",
        });
        setShowModal(false);
      }
      else if (userData.code == "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Woh...",
          text: "Lead Registered ",
        });
        setShowModal(false);
      }
      else if (userData.code == "ERROROCCURED") {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: error,
        });
        setShowModal(false);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error,
      });
      setShowModal(false);
    }
  };
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
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue, errors, dirty, isValid }) => {

                return (
                  <Form>
                    <div className="relative p-6 flex-auto">
                      <div className="-mx-4 flex flex-wrap">
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
                              {filterUser && filterUser.filter(item => item && item.role && item.role.slug == "manager").map((ele) => {
                             
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
                              {filterUser && filterUser.filter(item => (item && item.role && item.role.slug == "manager") && values.assignedManager !==item._id).map((ele) => {
                                return (
                                  <>
                                    <option value={ele._id}>{(ele.firstName).charAt(0).toUpperCase() + ele.firstName.slice(1)} {(ele.lastName).charAt(0).toUpperCase() + ele.lastName.slice(1)}</option>
                                  </>
                                )
                              })}
                            </Field>
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
                              placeholder="Enter your  Country"
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
                        <div className="w-full  ">
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
                        {/* //*/}

                        <div className="w-75 px-4">
                          <button
                            className="rounded-md py-2.5
                             px-9 text-base font-medium text-white
                              transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
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

export default AddLead;
