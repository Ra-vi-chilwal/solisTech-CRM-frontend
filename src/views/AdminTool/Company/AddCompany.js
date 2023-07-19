import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from '../../../config'
import { useSelector } from "react-redux";
import user from "../User/user";
function AddRole(props) {
  const showModal = props && props.showModal;
  const setShowModal = props && props.setShowModal;
  const { loading, userInfo, error } =
  useSelector((store) => store.userInfo) || " ";
  const checkrole = userInfo?.payload?.role?.[0] 
  const [selected, setSelected] = useState(null);

const users = userInfo
  const initialValues = {
    company:"" ,
    email: "",
    plan: "",
    PurchasedOn:"",
    companyLogo:"",
  };

  console.log(initialValues)
  const validationSchema = Yup.object({
    company: Yup.string().required("companyis required"),
    email: Yup.string().required("email is required"),
    plan: Yup.string().required("plan is required"),
    PurchasedOn: Yup.string().required("PurchasedOn is required"),
   
  });
  const onSubmit = async (values) => {

    try {
    const response = await axios.post(`${config.API_URL}/company/add`,
    {...values,companyLogo:selected}, {headers: {
      'Content-Type': 'multipart/form-data', // Set the content type for file upload
      // Add any other headers you need
   }});
    const userData = response.data;
    console.log(userData)
   } catch (error) {
    console.log(error)
   }
  };
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto sticky inset-0 z-50 outline-none focus:outline-none w-80">
        <div className="relative w-100 my-6 mx-auto max-w-sm  flex  justify-center">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-75 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl ">Add Company</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none  outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
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
                              htmlFor="company"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Company Name
                            </label>
                            <Field
                              name="company"
                              
                              type="text"
                              disabled= {checkrole?.title =="superAdmin" ? false: true}
                              placeholder="Enter your  Company ID"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="company"
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
                              Comapny Email
                            </label>
                            <Field
                              name="email"
                              type="email"
                              placeholder="Enter your Title"
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
                              htmlFor="plan"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Plan
                            </label>
                            <Field
                             as="select"
                              type="text"
                              name="plan"
                             
                              placeholder='Enter your Plan'
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option >--SELECT PLAN--</option>
                              <option >ABC</option>
                              <option >PQR</option>
                              <option >XYZ</option>
                              <option >RRR</option>
                            </Field>
                            <ErrorMessage
                              name="plan"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="PurchasedOn"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              PurchasedOn
                            </label>
                            <Field
                              type="date"
                              name="PurchasedOn"
                              onChange={(e) => {
                                setFieldValue("PurchasedOn", e.target.value);
                                setFieldValue(
                                  "ExpireOn",
                                  e.target.value
                                    
                                );
                              }}
                              placeholder='PurchasedOn date'
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="PurchasedOn"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              ExpireOn
                            </label>
                            <Field
                              type="date"
                              name="ExpireOn"
                             disabled={true}
                              placeholder='PurchasedOn date'
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                          <div className="mb-8">
                            <label
                              htmlFor="companyLogo"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              Company Logo
                            </label>
                            <Field
                                  id="pdfFile"
                                  type="file"
                                  name="pdfFile"
                                  className="form-control pt-1"
                                  onChange={(e, element, param) => {
                                    if ((element = e.target.files[0])) {
                                      setSelected(element);
                                    } else {
                                      Swal.fire({
                                        icon: "warning",
                                        title: "Error",
                                        text: "Something went wrong",
                                        focusConfirm: true,
                                        toast: true,
                                        width: "450px",
                                      }).then(function () {
                                        navigate(0);
                                      });
                                    }
                                  }}
                                />
                            <ErrorMessage
                              name="companyLogo"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )}
                            />
                          </div>
                        </div>

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
    </div>
  );
}

export default AddRole;
