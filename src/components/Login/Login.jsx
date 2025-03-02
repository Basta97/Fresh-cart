import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ClipLoader } from 'react-spinners';
import { FiAlertCircle } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../contexts/tokenContext';

export default function Login() {
    const navigate = useNavigate();
    const [isCallingApi, setCallingApi] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const {setToken}= useContext(tokenContext);

    const signIn = async (user) => {
        try {
            setCallingApi(true);
            setApiError(null);
            const { data } = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/auth/signin',
                user
            );
            
            // Store token and redirect
            setTimeout(() => setToken(data.token), 1000);
            
            localStorage.setItem('authToken', data.token);
            
            setSuccessMessage('Login successful! Redirecting...');
            setTimeout(() => navigate('/'), 1000);
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                              error.message || 
                              'Login failed. Please try again.';
            setApiError(errorMessage);
        } finally {
            setCallingApi(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            signIn(values);
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <a 
                            href="/register" 
                            className="text-green-600 hover:text-green-500 transition-colors"
                            aria-label="Navigate to registration page"
                        >
                            Sign up
                        </a>
                    </p>
                </div>

                {successMessage && (
                    <div 
                        role="alert" 
                        className="p-4 bg-green-100 text-green-800 rounded-lg dark:bg-green-900 dark:text-green-200"
                    >
                        {successMessage}
                    </div>
                )}

                <form 
                    onSubmit={formik.handleSubmit}
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-8 pt-8 pb-8"
                    noValidate
                >
                    {apiError && (
                        <div 
                            role="alert"
                            className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 dark:bg-red-900 dark:text-red-200"
                        >
                            <FiAlertCircle className="flex-shrink-0" aria-hidden="true" />
                            {apiError}
                        </div>
                    )}

                    <div className="space-y-6">
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
                                autoComplete="email"
                                aria-required="true"
                                aria-describedby="email-error"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
                            >
                                Email Address
                            </label>
                            {formik.touched.email && formik.errors.email && (
                                <p 
                                    id="email-error"
                                    className="text-red-500 text-xs mt-1 flex items-center gap-1 dark:text-red-400"
                                >
                                    <FiAlertCircle aria-hidden="true" /> 
                                    {formik.errors.email}
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
                                autoComplete="current-password"
                                aria-required="true"
                                aria-describedby="password-error"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm dark:peer-focus:text-green-500"
                            >
                                Password
                            </label>
                            {formik.touched.password && formik.errors.password && (
                                <p 
                                    id="password-error"
                                    className="text-red-500 text-xs mt-1 flex items-center gap-1 dark:text-red-400"
                                >
                                    <FiAlertCircle aria-hidden="true" /> 
                                    {formik.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <NavLink to="/forgot-password" 
                                href="/forgot-password" 
                                className="text-sm text-green-600 hover:text-green-500 transition-colors dark:text-green-400 dark:hover:text-green-300"
                                aria-label="Reset your password"
                            >
                                Forgot password?
                            </NavLink>
                        </div>

                        <button
                            type="submit"
                            disabled={isCallingApi}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-700 dark:hover:bg-green-600"
                            aria-live="polite"
                        >
                            {isCallingApi ? (
                                <>
                                    <ClipLoader 
                                        color="#fff" 
                                        size={20} 
                                        aria-label="Loading spinner" 
                                    />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}