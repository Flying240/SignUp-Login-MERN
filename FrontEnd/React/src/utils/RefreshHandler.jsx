import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const publicPaths = ["/login", "/signup", "/forgot-password"];

        // Check if current path starts with /reset-password
        const isResetPasswordPath =
            location.pathname.startsWith("/reset-password");

        if (token) {
            // Authenticated user trying to access public routes
            if (publicPaths.includes(location.pathname)) {
                navigate("/home", { replace: true });
            }
        } else {
            // Non-authenticated user trying to access protected routes
            if (
                !publicPaths.includes(location.pathname) &&
                !isResetPasswordPath
            ) {
                navigate("/login", { replace: true });
            }
        }
    }, [location.pathname, navigate]);

    return null;
};

export default RefreshHandler;
