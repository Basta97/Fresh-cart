import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isCallingApi, setCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  let navigate = useNavigate();

  const signUp = async (user) => {
    try {
      setCallingApi(true);
      setApiError(null);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        user
      );
      setSuccessMessage("Registration successful! Redirecting...");
      console.log(data);
      setTimeout(() => navigate("/login"), 1500);
      // Add redirect logic here
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setCallingApi(false);
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
  });

  const onSubmit = (values) => {
    signUp(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Create New Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-green-600 hover:text-green-500">
              Sign in
            </a>
          </p>
        </div>

        {successMessage && (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          {apiError && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
              <FiAlertCircle className="flex-shrink-0" />
              {apiError}
            </div>
          )}

          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                id="name"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600 dark:border-gray-600 dark:text-white dark:focus:border-green-500 bg-transparent"
                placeholder=" "
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
              >
                Full Name
              </label>
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600 dark:border-gray-600 dark:text-white dark:focus:border-green-500 bg-transparent"
                placeholder=" "
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
              >
                Email Address
              </label>
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600 dark:border-gray-600 dark:text-white dark:focus:border-green-500 bg-transparent"
                placeholder=" "
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600 dark:border-gray-600 dark:text-white dark:focus:border-green-500 bg-transparent"
                placeholder=" "
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="rePassword"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
              >
                Confirm Password
              </label>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {formik.errors.rePassword}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-600 dark:border-gray-600 dark:text-white dark:focus:border-green-500 bg-transparent"
                placeholder=" "
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="phone"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
              >
                Phone Number
              </label>
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <FiAlertCircle /> {formik.errors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isCallingApi}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 disabled:opacity-50"
            >
              {isCallingApi ? (
                <>
                  <ClipLoader color="#fff" size={20} />
                  <span>Registering...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-green-600 hover:text-green-500">
                Terms of Service
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}