import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import sliderImg1 from '../images1/about/en-banner.png';

function EnglishSlider() {

    const [trans, setTrans] = useState('')
    const count = useRef(0);
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    //四張圖
    const right = ['translateX(0%)'];
    const left = ['translateX(0%)'];

    function slideCard() {
        setTrans(right[count.current++ % 1])
        // console.log(count.current)
    };

    function goNext() {
        setTrans(right[count.current++ % 1])
    }

    function goBack() {
        setTrans(left[count.current++ % 1])
    }

    var clicks = 9527;
    function onClick() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };

    useEffect(() => {

        const interval = setInterval(slideCard, 10000);
        return () => clearInterval(interval);
    });
    return (
        <>
            <div className="page1" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
                <span id="page1"></span>
                <div className="carousel">
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-1" title="carousel-1" defaultChecked />
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-2" title="carousel-2" />
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-3" title="carousel-3" />

                    <div className="carousel__controls">
                        <label onClick={goBack} className="carousel__control carousel__control--backward" htmlFor="A"></label>
                        <label onClick={goNext} className="carousel__control carousel__control--forward" htmlFor="B"></label>
                        <label onClick={goNext} className="carousel__control carousel__control--forward" htmlFor="C"></label>
                        <label onClick={goNext} className="carousel__control carousel__control--forward" htmlFor="D"></label>
                        <label onClick={goNext} className="carousel__control carousel__control--forward" htmlFor="E"></label>
                    </div>
                    <div id="carousel__track" className="carousel__track" style={{ transform: trans }}>
                        <li className="carousel__slide">
                            {/* <Link to={`/localEvents`} title="carousel-1"> */}
                            <img src={sliderImg1} alt="carousel-1" />
                            <div className="bannerText font">
                            </div>
                            {/* </Link> */}
                        </li>
                        {/* <li className="carousel__slide">
                            <img src={sliderImg6} alt="carousel-2" />
                            <div className="bannerText font">
                            </div>
                        </li>

                        <li className="carousel__slide">
                            <a href={`${SSL}//${domain}/login`} title="carousel-3">
                                <img src={sliderImg1} alt="carousel-3" />
                                <div className="bannerText font">
                                </div>
                            </a>
                        </li>
                        <li className="carousel__slide">
                            <img src={sliderImg2} alt="carousel-4" />
                            <div className="bannerText font">
                            </div>
                        </li>
                        <li className="carousel__slide">
                            <img src={sliderImg3} alt="carousel-5" />
                            <div className="bannerText font">
                            </div>
                        </li> */}
                    </div>
                </div>
            </div>

            {/* <div className="page1" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
                <span id="page1"></span>
                <div className="carousel">
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-1" title="carousel-1" defaultChecked />
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-2" title="carousel-2" />
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-3" title="carousel-3" />
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-4" title="carousel-4" />
                    <input className="carousel__activator" type="radio" name="carousel" id="carousel-5" title="carousel-5" />
                    <div className="carousel__controls">
                        <label title="goBack_1" onClick={goBack} className="carousel__control carousel__control--backward" for="A"></label>
                        <label title="goNext_1" onClick={goNext} className="carousel__control carousel__control--forward" for="B"></label>
                        <label title="goNext_2" onClick={goNext} className="carousel__control carousel__control--forward" for="C"></label>
                        <label title="goNext_3" onClick={goNext} className="carousel__control carousel__control--forward" for="D"></label>
                        <label title="goNext_4" onClick={goNext} className="carousel__control carousel__control--forward" for="E"></label>
                    </div>
                    <div id="carousel__track" className="carousel__track" style={{ transform: trans }}>
                        {fetchData.sort((a, b) => {
                            if (a.order > b.order) return 1;
                            if (a.order < b.order) return -1;
                        })
                            .map((fetchData, index) =>
                                <li key={index} className="carousel__slide" >
                                    {fetchData.linkSite !== null ?
                                        <a href={fetchData.linkSite} title={fetchData.title + "(另開視窗)"} target="_blank">
                                            <img src={fetchData.href} alt={fetchData.themeName + fetchData.order} />
                                            <div className="bannerText font">
                                            </div>
                                        </a>
                                        :
                                        <>
                                            <img src={fetchData.href} alt={fetchData.themeName + fetchData.order} />
                                            <div className="bannerText font">
                                            </div>
                                        </>
                                    }
                                </li>
                            )}
                    </div>
                </div>
            </div> */}

        </>
    );
}

export default EnglishSlider;