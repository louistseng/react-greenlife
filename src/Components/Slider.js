import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import sliderImg1 from '../images1/about/slide4.png';
import sliderImg2 from '../images1/about/slide1.jpg';
import sliderImg3 from '../images1/about/slide2.jpg';
import sliderImg6 from '../images1/about/sliderGreen.jpg';
import sliderImg7 from '../images1/about/slide7.png';
import { set } from 'react-ga';


function Slider() {

    const [trans, setTrans] = useState('')
    const count = useRef(0);
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }



    var serialize = require('serialize-javascript');


    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const memberToken = greenlifeCookies.refreshToken || "";
    const [fetchData, setFetchData] = useState([])
    const [length, setLength] = useState([])

    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/DLoad/Material`, {
            method: 'POST',
            body: serialize({
                Page: "1",
                Count: "10",
                StartTime: "2001/01/01",
                EndtTime: "2200/12/25",
                TypeId: "7",
                ThemeId: "5",
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Token": ""
            }
        })
            .then(res => {
                // console.log(res)
                return res.json()
            }).then(result => {
                if (result.isSucess) {
                    // console.log(result.resultObject.listItems)
                    setFetchData(result.resultObject.listItems)
                    setLength(result.resultObject.totalCount)
                }
            })
    }, [])

    let rightLength = []
    let leftLength = []
    if (length !== []) {
        for (let i = 0; i < length; i++) {
            rightLength.push(`translateX(${i - (101 * i)}%)`)
            leftLength.push(`translateX(${i - (101 * i)}%)`)
        }
    }
    const right = rightLength;
    const left = leftLength.reverse();

    useEffect(() => {
        const interval = setInterval(slideCard, 10000);
        return () => clearInterval(interval);
    });

    function slideCard() {
        setTrans(right[count.current++ % length])
        // console.log(count.current++ % length)
    };

    function goNext() {
        setTrans(right[count.current++ % length])
    }

    function goBack() {
        setTrans(left[count.current++ % length])
    }

    var clicks = 9527;
    function onClick() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks;
    };

    return (
        <>
            {/* <div className="page1" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
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
                            <Link to={`/localEvents`} title="輪播圖-1">
                                <img src={sliderImg7} alt="輪播圖-1" />
                                <div className="bannerText font">
                                </div>
                            </Link>
                        </li>
                        <li className="carousel__slide">
                            <img src={sliderImg6} alt="輪播圖-2" />
                            <div className="bannerText font">
                            </div>
                        </li>

                        <li className="carousel__slide">
                            <a href={`${SSL}//${domain}/login`} title="輪播圖-3">
                                <img src={sliderImg1} alt="輪播圖-3" />
                                <div className="bannerText font">
                                </div>
                            </a>
                        </li>
                        <li className="carousel__slide">
                            <img src={sliderImg2} alt="輪播圖-4" />
                            <div className="bannerText font">
                            </div>
                        </li>
                        <li className="carousel__slide">
                            <img src={sliderImg3} alt="輪播圖-5" />
                            <div className="bannerText font">
                            </div>
                        </li>
                    </div>
                </div>
            </div> */}

            <div className="page1" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
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
                                        <a href={fetchData.linkSite} title={fetchData.title}>
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
            </div>

        </>
    );
}

export default Slider;