import React, {useEffect, useState } from "react";
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

    const [sliderValue, setSliderValue] = useState(0); 
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(sliderValue);


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
                            Search your arrival
                        </label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter arrival here..." />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="destinationInput">
                        <label htmlFor="city">
                            Search your destination
                        </label>
                        <div className="input flex">
                            <input type="text" placeholder="Enter destination here..." />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="priceInput">
                        <div className="label_total flex">
                            <label htmlFor="" className="price">Max Price</label>
                            <h3 className="total">{formattedPrice}</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="20000000" min="0" step="1000000" value={sliderValue} onChange={handleSliderChange} />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <HiFilter className="icon" />
                        <span>FILTER</span>
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