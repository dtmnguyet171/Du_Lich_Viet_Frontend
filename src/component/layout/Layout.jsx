import React, { useContext, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Routers from "../../router/Routers";
import Footer from "../footer/Footer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "ADMIN") {
            navigate("/admin");
        }
    }, []);
    return (
        <>
            <Navbar />
            <Routers />
            {role === "USER" || role === "ADMIN" ? <Footer /> : <></>}
        </>
    )
}

export default Layout;