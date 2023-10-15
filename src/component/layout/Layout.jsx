import React from "react";
import Navbar from "../navbar/Navbar";
import Routers from "../../router/Routers";
import Footer from "../footer/Footer";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Routers />
            <Footer />
        </>
    )
}

export default Layout;