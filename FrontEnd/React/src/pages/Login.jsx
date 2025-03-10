import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toastAlerts";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const LogIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = { email, password };

            const response = await axios.post(
                "http://localhost:3000/auth/login",
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);
            const { success, message, token, userInfo } = response.data;
            if (success == true) {
                localStorage.setItem("token", token);
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

                console.log("User loggined up:", response);
                handleSuccess("User loggined up successfully!");
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
        } catch (error) {
            // If error response contains message, use it, otherwise fallback to generic message
            console.error("Error during sign-up:", error);
            handleError(
                error.response?.data?.error?.details?.[0].message ||
                    error.response?.data?.message ||
                    error?.message
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            {/* Display error alert */}
            <ToastContainer></ToastContainer>

            <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div className="w-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Sign in
                        </h1>
                        <p className="mt-2 text-gray-500">
                            Sign in below to access your account
                        </p>
                    </div>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="relative mt-6">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    autoComplete="NA"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Email Address
                                </label>
                            </div>
                            <div className="relative mt-6">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <label
                                    htmlFor="password"
                                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2 text-right">
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:underline focus:outline-none focus:text-gray-800"
                                    onClick={() => {
                                        navigate("/forgot-password", {state: {email: email}});
                                    }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="my-6">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                                >
                                    Sign in
                                </button>
                            </div>
                            <p className="text-center text-sm text-gray-500">
                                Don&#x27;t have an account yet?
                                <button
                                    type="button"
                                    className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                                    onClick={() => {
                                        navigate("/signup");
                                    }}
                                >
                                    Sign up
                                </button>
                                .
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
