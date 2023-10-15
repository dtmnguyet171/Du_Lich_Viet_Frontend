import React, {useEffect} from "react";
import video from '../Video/video.mp4'
import './hero.css'
import {GrLocation} from 'react-icons/gr'
import {HiFilter} from 'react-icons/hi'
import {SlSocialFacebook} from 'react-icons/sl'
import {AiOutlineInstagram} from 'react-icons/ai'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'

import Aos from 'aos';
import 'aos/dist/aos.css'

const Hero = () => {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])


    return(
        <section className="home">
            <div className="overlay"></div>
            <video src={video} loop muted autoPlay typeof="video/mp4"></video>

            <div className="homeContent container">
                <div className="textDiv">
                    <span data-aos='fade-up' className="smallText">
                        Our Packages
                    </span>
                        <h1 data-aos='fade-up' className="homeTitle">
                            Search Your Holiday 
                        </h1>
                </div>


                <div data-aos='fade-up' className="cardDiv grid">
                    <div className="destinationInput">
                        <label htmlFor="city">
                            Search your destination 
                        </label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter name here..." />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">
                            Select your date:
                        </label>
                        <div className="input flex">
                            <input type="date" placeholder="Enter your date..." />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <HiFilter className="icon" />
                        <span>MORE FILTER</span>
                    </div>
                </div>

                <div data-aos='fade-up' className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <SlSocialFacebook className="icon"/>
                        <AiOutlineInstagram className="icon"/>
                        <SiTripadvisor className="icon"/>
                    </div>
                    <div className="leftIcons">
                    <BsListTask className="icon"/>
                    <TbApps className="icon"/>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero;