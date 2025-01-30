import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toastAlerts";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        console.log("Changing password input:", e.target.name, e.target.value);
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with passwords:", passwords);
        setIsLoading(true);

        if (passwords.password !== passwords.confirmPassword) {
            console.error("Passwords do not match!");
            handleError("Passwords don't match!");
            setIsLoading(false);
            return;
        }

        if (passwords.password.length < 6) {
            console.error("Password is too short!");
            handleError("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/auth/reset-password/${token}`,
                { password: passwords.password },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Server response:", response.data);
            if (response.data.success) {
                handleSuccess("Password reset successful!");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            console.error(
                "Error resetting password:",
                error.response?.data?.message || error
            );
            handleError(
                error.response?.data?.message || "Failed to reset password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <ToastContainer />
            <div className="w-full max-w-lg p-8 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Reset Your Password
                </h2>
                <p className="text-gray-300 text-center mb-6">
                    Enter your new password to regain access
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-gray-300 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={passwords.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition duration-300 flex justify-center items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 text-sm text-blue-400 hover:underline w-full text-center"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
