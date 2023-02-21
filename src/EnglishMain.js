import React, { useEffect, useRef, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import greenLogo from './images1/en_green_logo.png';
import './EnglishVersion.scss';
import mainImg from './images1/common/english-main.jpg';
import greenLogo1 from './images1/greenLogo1.png';
import tour from './images1/common/greenTour.png';
import food from './images1/common/greenFood.png';
import shopping from './images1/common/greenShopping.png';
import home from './images1/common/greenHome.png';
import office from './images1/common/greenOffice.png';
import tourHover from './images1/common/en-tour.png';
import foodHover from './images1/common/en-food.png';
import shopHover from './images1/common/en-shopping.png';
import homeHover from './images1/common/en-home.png';
import officeHover from './images1/common/en-office.png';
import btnIcon1 from './images1/common/shopping-cart.png';
import btnIcon2 from './images1/common/compass.png';

function EnglishMain(props) {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>PortalGreenLife</title>
                </Helmet>
            </HelmetProvider>
            <div className="english-entrance col-10 col-sm-10 col-md-10 col-lg-10" >
                <div className="logo-img" >
                    <Link to="/" title="National Green Life Movement logo">
                        <img src={greenLogo} alt="National Green Life Movement logo" />
                    </Link>
                </div>
                <div className="menu">
                    <h2 className="menu-title p-4">The 12 key strategies of the Taiwan Net-Zero Emissions by 2050 transformation include the policy of Net-Zero Green Life, which aims to integrate all aspects of life and introduce corresponding policies and guidelines. This will allow more people to take eco-friendly actions together. We aim to help government agencies, private enterprises and organizations, businesses, and citizens all learn how to live a net-zero green life, including aspects such as travel, dining, shopping, homes, and offices! Click on the graphic below for more information.</h2>
                    <div className="menu-list d-flex justify-content-center col-12 row">
                        <div className="col-sm-12 col-md-2 col-lg-2 menu-img">
                            <Link to="/en_FlipTour" className="">
                                <img src={tour} alt="tour icon" />
                                <p className="">Green Travel</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-2 col-lg-2 menu-img">
                            <Link to="/en_FlipFood" className="">
                                <img src={food} alt="food icon" />
                                <p className="">Green Dining</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-2 col-lg-2 menu-img">
                            <Link to="/en_FlipShopping" className="">
                                <img src={shopping} alt="shop icon" />
                                <p className="">Green Consumption</p>
                            </Link>
                        </div>
                        <div className="green-consumption-menu-bottom col-12 col-sm-12 col-md-12 col-lg-12 row">
                            <div className="menu-bottom-depiction col-sm-12 col-md-6 col-lg-6">
                                <div className="menu-bottom-button">
                                    <h3>The Environmental Protection Administration in Taiwan has also established the Green Mark and Green Procurement System as part of the Green Consumption movement. Please click the link below for more details.</h3>
                                    <div className="d-flex justify-content-center align-items-center mt-4 menu-bottom-button-link">
                                        <Link to="/en_Mark" className="d-flex justify-content-center align-items-center col-sm-12 col-md-5 col-lg-5">
                                            <img src={greenLogo1} alt="" title="" style={{ width: "10%" }} />
                                            GreenMark
                                        </Link>
                                        <Link to="/en_Procurement" className="d-flex justify-content-center align-items-center col-sm-12 col-md-5 col-lg-5 menu-bottom-button-link">
                                            <img src={btnIcon1} alt="" title="" style={{ width: "15%" }} />
                                            GreenProcurement
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-2 col-lg-2 menu-img">
                            <Link to="/en_FlipHome" className="">
                                <img src={home} alt="home icon" />
                                <p className="">Green Home</p>
                            </Link>
                        </div>
                        <div className="col-sm-12 col-md-2 col-lg-2 menu-img">
                            <Link to="/en_FlipOffice" className="">
                                <img src={office} alt="office icon" />
                                <p className="">Green Office</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu-bottom col-12 col-sm-12 col-md-12 col-lg-12 row">
                    <div className="menu-bottom-img col-sm-12 col-md-6 col-lg-6">
                        <img src={mainImg} alt="main img" style={{ width: "80%" }} />
                    </div>
                    <div className="menu-bottom-depiction col-sm-12 col-md-6 col-lg-6">
                        <div className="arrow"></div>
                        <div className="menu-bottom-button">
                            <h3>The Environmental Protection Administration in Taiwan has also established the Green Mark and Green Procurement System as part of the Green Consumption movement. Please click the link below for more details.</h3>
                            <div className="d-flex justify-content-center align-items-center mt-4 menu-bottom-button-link">
                                <Link to="/en_Mark" className="d-flex justify-content-center align-items-center col-sm-12 col-md-5 col-lg-5">
                                    <img src={greenLogo1} alt="" title="" style={{ width: "10%" }} />
                                    GreenMark
                                </Link>
                                <Link to="/en_Procurement" className="d-flex justify-content-center align-items-center col-sm-12 col-md-5 col-lg-5 menu-bottom-button-link">
                                    <img src={btnIcon1} alt="" title="" style={{ width: "15%" }} />
                                    GreenProcurement
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-bottom-link d-flex justify-content-center align-items-center col-sm-12 col-md- col-lg-12 row my-2">
                    <div className="col-sm-12 col-md-9 col-lg-9">
                        <h3>Want to know how to implement green dining, green shopping, green travel, having a green home, living a green life, and working in a green office?</h3>
                        <h3 >
                            <p>Check out <Link to="/en_About" title="National Green Life Movement Platform">the National Green Life Movement Information Platform</Link> to learn more.</p>
                        </h3>
                    </div>
                    <div className="col-sm-12 col-md-3 col-lg-3 menu-bottom-enter d-flex justify-content-center align-items-center">
                        <Link to="/en_About" className="">
                            <img src={btnIcon2} alt="" title="" />
                            Enter
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )

}
export default withRouter(EnglishMain);