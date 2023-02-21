import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/Functions';
import "../eventSlider.css";
import "../carousel.css";

const EventSlider = ({ activityTypeId, SSL, title }) => {

    var serialize = require('serialize-javascript');

    const [loading, setLoading] = useState(true)
    const [showSlider, setShowSlider] = useState(true)
    const [searchData, setSearchData] = useState([]);

    const [SLIDE_COUNT, setSLIDE_COUNT] = useState(0)
    const slides = Array.from(Array(SLIDE_COUNT).keys());

    let link = [];
    let media = [];
    let nameRec = [];
    let dateRec = [];

    for (var i = 0; i < searchData.length; i++) {
        link.push(searchData[i].guid)
        media.push(searchData[i].picPath)
        nameRec.push(searchData[i].title)
        dateRec.push(formatDate(searchData[i].startDatetime))
    }


    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const [count, setCount] = useState("10");

    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Activity/GetByType`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                TypeId: activityTypeId,
                Count: count
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                //console.log(result)

                setLoading(false)
                if (result.isSucess) {
                    setSearchData(result.resultObject);
                    setSLIDE_COUNT(result.resultObject.length)
                }
            });
    }, []);

    return (
        <>
            {searchData.length > 0 &&
                <div>
                    <h2 className="green-eventTitle">{title}</h2>
                    {/* <span className="d-flex mt-5"><div className="greenline"></div><h1 className="event-category">好康活動</h1><div className="greenline"></div></span> */}

                    <div id="carouselExampleIndicators" className="carousel carousel-event carouselSlider slide mt-3" data-ride="carousel">

                        <div className="event-slider-wrapper">
                            <ol className="carousel-indicators">
                                {slides.map((index) => (
                                    <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                                ))}
                                {/* <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                            </ol>

                            <div className="carousel-inner">
                                {slides.map((index) => (

                                    <div key={index} className={index === 0 ? "active carousel-item" : "carousel-item"}>
                                        <Link as={Link} to={`/searchEvent/eventDetail?${link[index]}`}>
                                            <img className="" src={media[index]} alt={nameRec[index]} />
                                            <div className="text-bg">
                                                <h3>{dateRec[index]}</h3>
                                                <h4>{nameRec[index]}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                ))}

                                {/* <div key={index} class="carousel-item active">
                            <Link as={Link} to={`/searchEvent/eventDetail?${link[index]}`}>
                                <img className="" src={media[index]} alt={nameRec[index]} />
                                <div className="text-bg">
                                    <h2>{dateRec[index]}</h2>
                                    <h1>{nameRec[index]}</h1>
                                </div>
                            </Link>
                        </div> */}
                                {/* <div class="carousel-item">
                            <Link as={Link} to={`/searchEvent/eventDetail?${link[1]}`}>
                                <img class="d-block w-80" src={media[1]} alt={nameRec[1]} />
                                <div class="w-100 text-bg">
                                    <h2>{dateRec[1]}</h2>
                                    <h1>{nameRec[1]}</h1>
                                </div>
                            </Link>
                        </div>
                        <div class="carousel-item">
                            <Link as={Link} to={`/searchEvent/eventDetail?${link[2]}`}>
                                <img class="d-block w-80" src={media[2]} alt={nameRec[2]} />
                                <div class="w-100 text-bg">
                                    <h2>{dateRec[2]}</h2>
                                    <h1>{nameRec[2]}</h1>
                                </div>
                            </Link>
                        </div> */}

                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" title="carouselExampleIndicators-prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" title="carouselExampleIndicators-next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default EventSlider;