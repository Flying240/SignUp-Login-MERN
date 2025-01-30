import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toastAlerts";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const reqEmail = location?.state?.email || "";
    const [email, setEmail] = useState(reqEmail);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/auth/forgot-password",
                { email },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response?.data?.success) {
                handleSuccess("Reset link sent to your email!");
                setTimeout(() => {
                    window.open(
                        "https://mail.google.com",
                        "_blank",
                        "noopener,noreferrer"
                    );
                }, 2000);
            }
        } catch (error) {
            handleError(
                error.response?.data?.message || "Failed to send reset email"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-black">
            <ToastContainer />
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-full max-w-md p-8 rounded-2xl shadow-lg">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-semibold text-white drop-shadow-md">
                        Forgot Password?
                    </h1>
                    <p className="text-gray-300">
                        Enter your email below and we’ll send you a reset link.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-200"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-300 transition duration-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-300 flex items-center justify-center 
                            ${
                                isLoading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-blue-400 hover:text-blue-500 hover:underline transition duration-200"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
