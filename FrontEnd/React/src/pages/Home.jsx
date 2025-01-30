import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/toastAlerts";
import { ToastContainer } from "react-toastify";
import FetchProducts from "../components/FetchProducts";

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        //parse the userInfo
        userInfo = JSON.parse(userInfo);

        setUserInfo(userInfo);
    }, []);

    const handleLogout = () => { 
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        handleSuccess("User logged out successfully!");

        setTimeout(() => {
            navigate("/LogIn");
        }, 2000);
    };

    return (
        <div>
            <ToastContainer />
            <h1>Welcome {userInfo?.name}</h1>

            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={handleLogout}
            >
                LogOut
            </button>

            <FetchProducts />
        </div>
    );
};

export default Home;
