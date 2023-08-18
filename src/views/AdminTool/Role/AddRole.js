import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import config from '../../../config'
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
function AddRole(props) {
  const showModal = props && props.showModal;
  const setShowModal = props && props.setShowModal;
  const { loading, userInfo, error } =
  useSelector((store) => store.userInfo) || " ";
  const checkrole = userInfo?.payload?.role?.[0] 
  var token = localStorage.getItem("token");

  const permissionOptions = [
    { value: "read", label: "Read" },
    { value: "create", label: "Create" },
    { value: "delete", label: "Delete" },
    { value: "update", label: "Update" },
  ];
  const [selected, setSelected] = useState([permissionOptions[0]]);
  const initialValues = {
    companyId: checkrole?.title =="superAdmin" ? " ": checkrole?.companyId,
    title: "",
    slug: "",
  };
  const validationSchema = Yup.object({
    companyId: Yup.string().required("companyId is required"),
    title: Yup.string().required("title is required"),
  });
  const onSubmit = async (values) => {
   try {
    const response = await axios.post(`${config.API_URL}/role/add`,{companyId:values.companyId,title:values.title,slug:values.slug,permission:selected}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const userData = response.data;
    if(userData.code == "DUPLICATEDATA"){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'User Already Exists',

      })
      setShowModal(false)
    }
    if(userData.code == "CREATED"){
      Swal.fire({
        icon: 'success',
        title: 'Woh...',
        text: 'User Registered ',
  
      })
      setShowModal(false)
    }
   } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: error,

    })
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
              <h3 className="text-xl ">Add Role</h3>
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
                              htmlFor="name"
                              className="mb-3 block text-sm font-medium text-dark dark:text-white"
                            >
                              Company ID
                            </label>
                            <Field
                              name="companyId"
                              
                              type="text"
                              disabled= {checkrole?.title =="superadmin" ? false: true}
                              placeholder="Enter your  Company ID"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="companyId"
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
                              Title
                            </label>
                            <Field
                              name="title"
                              onChange={(e) => {
                                setFieldValue("title", e.target.value);
                                setFieldValue(
                                  "slug",
                                  e.target.value
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                );
                              }}
                              as="select"
                              placeholder="Enter your Title"
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            >
                              <option value="admin">Admin</option>
                              <option value="manager">Manager(BDM)</option>
                              <option value="lead">Lead Executive(BDE)</option>
                            </Field>
                            <ErrorMessage
                              name="title"
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
                              Slug
                            </label>
                            <Field
                              type="text"
                              name="slug"
                              value={initialValues.slug}
                              disabled={true}
                              style={{ background: "#3a353d3d" }}
                              placeholder={values.slug}
                              className="w-full rounded-md border border-transparent py-2.5 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                            />
                            <ErrorMessage
                              name="slug"
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
                              className="mb-3 block text-sm font-medium text-dark dark:text-white "
                            >
                              Permissions
                            </label>
                            <Select
                              defaultValue={[permissionOptions[0]]}
                              isMulti
                              name="permission"
                              options={permissionOptions}
                              className="basic-multi-select py-2.5 "
                              classNamePrefix="select"
                              onChange={setSelected}
                              value={initialValues.permission}
                             
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
