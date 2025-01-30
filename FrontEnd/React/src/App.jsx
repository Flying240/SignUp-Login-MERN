import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signUp";
import LogIn from "./pages/Login";
import Home from "./pages/home";
import NotFound from "./pages/NotFound";
import RefreshHandler from "./utils/RefreshHandler";
import { toast, ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utils/toastAlerts";
import { useEffect, useState } from "react";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
    //to know backend server is down
    const [isServerUp, setIsServerUp] = useState(true);

    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await axios.get("http://localhost:3000");
                setIsServerUp(response.status === 200);
            } catch (error) {
                setIsServerUp(false);
            }
        };

        const intervalId = setInterval(checkServer, 10000);
        checkServer(); // Initial check

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array - run once on mount

    useEffect(() => {
        if (!isServerUp) {
            handleError("Server is down, please try again later");
        }
    }, [isServerUp]);

    return (
        <>
            <ToastContainer />

            <BrowserRouter>
                {/*
                as home page  needs user to be authenticated to access it, so i will check in local storage
                if token exist .
                
                - If the user is authenticated and tries to access login, signup, or root ("/") pages,
                  they are redirected to the `/home` page.
                - If the user is unauthenticated and tries to access a protected route like `/home`,
                  they are redirected to the `/login` page.
                
                The `RefreshHandler` runs whenever the pathname or navigation state changes,
                ensuring that the user cannot bypass authentication checks.
                 as we have passed it as useEffect component.

            */}
                <RefreshHandler />

                <Routes>
                    {/* Redirect root path ("/") to `/home` */}
                    <Route
                        path="/"
                        element={<Navigate to="/home" />}
                    />

                    {/* Signup page */}
                    <Route
                        path="/signup"
                        element={<SignUp />}
                    />

                    {/* Login page */}
                    <Route
                        path="/login"
                        element={<LogIn />}
                    />

                    {/* forgotPassword */}
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    {/*reset password */}
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />

                    {/* Home page (protected route) */}
                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    {/* Catch-all route for undefined paths */}
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
