import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/toastAlerts";

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = { name, email, password };

            const response = await axios.post(
                "http://localhost:3000/auth/signup",
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

                console.log("User signed up:", response);
                handleSuccess("User signed up successfully!");
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
        } catch (error) {
            // If error response contains message, use it, otherwise fallback to generic message
            console.error("Error during sign-up:", error);
            handleError(
                error.response?.data?.error?.details?.[0].message ||
                    error.response?.data?.message
                    || error?.message
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <ToastContainer></ToastContainer>

            <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white d-flex justify-content-center">
                <h2 className="text-2xl font-bold pb-5">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium"
                        >
                            Your name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                            placeholder="Andrew Jackson"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                            placeholder="andrew@mail.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium"
                        >
                            Your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                            placeholder="*********"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            type="submit"
                            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
                        >
                            Register
                        </button>
                        <div className="flex items-center text-sm">
                            <p>Already have an account?</p>
                            <button
                                type="button"
                                className="underline cursor-pointer ml-1"
                                onClick={() => navigate("/login")}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
