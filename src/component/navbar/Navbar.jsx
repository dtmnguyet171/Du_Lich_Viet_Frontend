import React, { useState } from "react";
import "./navbar.css";
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { Link } from "react-router-dom";
const Navbar = () => {
    const [active, setActive] = useState('navBar');
    // Function to toggle navBar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }

    // Function to toggle navBar
    const removeNabar = () => {
        setActive('navBar')
    }

    return(
        <div className="navBarSection">
            <header className="header flex">

                <div className="logoDiv">
                    <a href="/" className="logo flex">
                        <h1> <MdOutlineTravelExplore className="icon"/>
                            Travel.</h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">

                        <li className="navItem">
                            <a href="/" className="navLink">Home</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Packages</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Shop</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">About</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Pages</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Blogs</a>
                        </li>

                        <li className="navItem">
                            <a href="" className="navLink">Contact</a>
                        </li>

                        <button className="btn">
                            <Link to="/login">SIGN IN</Link>
                        </button>
                    </ul>

                    <div onClick={removeNabar} className="closeNavbar">
                        <AiFillCloseCircle className="icon"/>
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon"/>
                </div>
            </header>
        </div>
    )
}
export default Navbar;