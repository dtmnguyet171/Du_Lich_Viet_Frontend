import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import TourManagement from "../admin/pages/TourManagement";
import History from "../pages/History";
import AccountManagement from "../admin/pages/AccountManagement";
import BookingManagement from "../admin/pages/BookingManagement";
import TourDetails from "../pages/TourDetails";

const Routers = () => {
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/history" element={<History/>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/admin/tour" element={<TourManagement />} />
            <Route path="/admin/account" element={<AccountManagement />} />
            <Route path="/admin/booking" element={<BookingManagement />} />

        </Routes>
    )
}

export default Routers;