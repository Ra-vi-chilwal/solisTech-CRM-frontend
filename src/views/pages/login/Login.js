import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import config from "../../../config";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../redux/action/user";
import logo from '../../../assets/images/SoliTech-Logo-01.png'
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  var token = localStorage.getItem("token");
  const { loading, userInfo, error } =
    useSelector((store) => store.userInfo) || " ";

  if ((userInfo && userInfo.verified) || userInfo?.code === "FETCHED") {
    window.location.replace("/");
  }
  if (error) {
    console.log(error);
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required()
      .min(6, "password is too short -should be 6 chars minimum"),
  });
  const onSubmit = (values) => {
    dispatch(fetchUserInfo(values));
  };
  return (
    <>
      <section
        className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28"
        style={{ background: "#090E34" }}
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="mx-auto max-w-[500px] rounded-md  bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]"
                style={{ background: "#1D2144" }}
              >
                <img src={logo} alt='logo' className="w-25"/>
                <h3 className="mb-3 text-center text-2xl font-bold text-white dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Login to your account for a faster checkout.
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <Field
                        type="email"
                        defaultValue="admin@dreamguys.in"
                        placeholder="Enter your Email"
                        name="email"
                        className=" form-control w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg) => (
                          <small style={{ color: "red" }}>{msg}</small>
                        )}
                      />
                    </div>
                    <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                      <div>
                        <a
                          href="#0"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="mb-6">
                      <button
                        className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </Form>
                </Formik>

                <p className="text-center text-base font-medium text-body-color">
                  Don’t you have an account?
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
}

export default Login;
