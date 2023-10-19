import React, { useEffect } from "react";
import "./tour.css";
import tours from "../../assets/data/tours";
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from "react-icons/hi";
import Aos from "aos";
import "aos/dist/aos.css";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const Data = tours;

const Tours = () => {

    // Create a react hook to add a scroll animation
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const { data, loading, error } = useFetch(`${BASE_URL}/tour/getAll`);

    // Kiểm tra nếu dữ liệu trả về không phải là một mảng, chuyển đổi nó thành mảng

    if (loading) {
        return <h4>Loading...........</h4>;
    }

    if (error) {
        return <h4>{error}</h4>;
    }
    // Lọc những tour có thuộc tính featured bằng true

    if (!data.length) {
        return <h4>Tour Not Found.</h4>;
    }

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    data.map(({ id, arrival, depart, type, price, title, image }) => {
                        const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
                        return (
                            <div key={id} data-aos="fade-up" className="singleDestination">
                                <div className="imageDiv">
                                    <img src={image} alt={title} />
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">
                                        {title}
                                    </h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className="icon" />
                                        <span className="name">{depart} - {arrival}</span>
                                    </span>

                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>{type}</span>
                                        </div>
                                        <div className="price">
                                            <h5>{formattedPrice}</h5>
                                        </div>
                                    </div>

                                    {/* <div className="desc">
                                        <p>{description}</p>
                                    </div> */}

                                    <button className="btn flex">
                                        DETAILS <HiOutlineClipboardCheck className="icon" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Tours;