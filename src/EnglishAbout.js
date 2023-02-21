import React from 'react';
import { withRouter, Link, } from 'react-router-dom';
import './greenliving0914.scss';
import './Components/css/Footer.css';
import { clickRecord } from './utils/API';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Card } from 'react-bootstrap';


import shopImg from './images1/grid-shopping-new.png';
import homeImg from './images1/grid-home-new.png';
import foodImg from './images1/grid-food-new.png';
import tourImg from './images1/grid-tour-new.png';
import officeImg from './images1/grid-office-new.png';
import tourHover from './images1/common/en-tour.png';
import foodHover from './images1/common/en-food.png';
import shopHover from './images1/common/en-shopping.png';
import homeHover from './images1/common/en-home.png';
import officeHover from './images1/common/en-office.png';
// import btnIcon1 from './images1/common/shopping-cart.png';
// import btnIcon2 from './images1/common/compass.png';
// import historyPng from './images1/about/history-2.png';
import searchIcon1 from './images1/about/icon-001.png';
import searchIcon2 from './images1/about/icon-002.png';
import searchIcon3 from './images1/about/icon-003.png';
import searchIcon4 from './images1/about/icon-004.png';
import searchIcon5 from './images1/about/icon-005.png';
import searchIcon6 from './images1/about/icon-006.png';
import searchIcon7 from './images1/about/icon-007.png';
import searchIcon8 from './images1/about/icon-008.png';
import searchIcon9 from './images1/about/icon-009.png';
import searchIcon10 from './images1/about/icon-010.png';
// import tourLogo from './images/favicon.ico'

const EnglishBreadcrumb = React.lazy(() => import('./Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('./Components/EnglishVersion/EnglishFooter'));
const EnglishSlider = React.lazy(() => import('./Components/EnglishSlider'));

function EnglishAbout({ history }) {
    const collector = sessionStorage.getItem("userGuid") || "";

    //連結了解綠生活頁-延遲0.4秒(讓動畫跑完)
    // const delayRedirect = (route) => {
    //     setTimeout(
    //         () => history.push(`/about/intro/${route}`), 400
    //     )
    // }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>AboutGreenLife</title>
                    <meta name="description" content="行政院環境保護署-全民綠生活資訊平台首頁，「綠生活」是一種親環境的生活方式，從食、衣、住、行、育、樂、購等生活小細節做起，來愛護我們的家園。" />
                </Helmet>

                <div id="news" name="news"></div>
                <EnglishBreadcrumb currentPage={"AboutGreenLife"} />
                <div>
                    <div className="myContent">
                        <a className="skip-nav" href="#" title="Center Box" accessKey="c">:::</a>
                        {/* 照片輪播 */}
                        <EnglishSlider />
                        <div className='wrap first en-fri'>
                            <div className="white-bg">
                                <div className="row">
                                    <h1 className='d-flex align-items-center col-12 mt-4'>About Green Life</h1>
                                    <div className="greenlife-note p-2 col-12">
                                        <p>
                                            <div id="intro" name="intro"></div>
                                            <span className='greenlifeDesc'>Green Life is one of the key strategies for Taiwan’s transformation to Net-Zero Emissions by 2050. The Net-Zero Emissions transformation should begin with the promotion of Green Life, which includes changes in people’s behavior and consumption patterns in food, clothing, housing, transportation, education, entertainment, and shopping. This will lead to changes in the industry supply and reduce greenhouse gas emissions.</span>
                                            <span className='greenlifeDesc'>Since 2010, the EPA has been actively promoting the Green Life campaign to introduce the public to the concept of green life and develop their green life behaviors and habits. The EPA also uses the National Green Life Movement Information Platform to encourage the public to respond to and implement green life. “Love the Earth” is not only a style of living but also a very trendy attitude to life. Green life is an eco-friendly way of life. From even the smallest details in life, such as in food, clothing, housing, transportation, education, entertainment, and shopping, we are working together with institutions, schools, enterprises, private organizations, communities, and all people across the country to change small living habits and create a big green life in the future.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="en-sec-crad" >
                            <div id="wedo" name="wedo"></div>
                            <h2>What We Do</h2>
                            <div className="d-flex justify-content-center align-items-center row" >
                                <Card className="col-sm-12 col-md-2 col-lg-2" style={{ width: '18rem', margin: "0 1%" }}>
                                    <Link to="/en_FlipTour" title="">
                                        <Card.Img className="second-card-img" variant="top" src={tourImg}
                                            onMouseOver={e => (e.currentTarget.src = tourHover)}
                                            onMouseOut={e => (e.currentTarget.src = tourImg)}
                                        />
                                        <Card.Body>
                                            <Card.Title>Travel</Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                                <Card className="col-sm-12 col-md-2 col-lg-2" style={{ width: '18rem', margin: "0 1%" }}>
                                    <Link to="/en_FlipFood" title="">
                                        <Card.Img className="second-card-img" variant="top" src={foodImg}
                                            onMouseOver={e => (e.currentTarget.src = foodHover)}
                                            onMouseOut={e => (e.currentTarget.src = foodImg)}
                                        />
                                        <Card.Body>
                                            <Card.Title>Dining</Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                                <Card className="col-sm-12 col-md-2 col-lg-2" style={{ width: '18rem', margin: "0 1%" }}>
                                    <Link to="/en_FlipShopping" title="">
                                        <Card.Img className="second-card-img" variant="top" src={shopImg}
                                            onMouseOver={e => (e.currentTarget.src = shopHover)}
                                            onMouseOut={e => (e.currentTarget.src = shopImg)}
                                        />
                                        <Card.Body>
                                            <Card.Title>Consumption</Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                                <Card className="col-sm-12 col-md-2 col-lg-2" style={{ width: '18rem', margin: "0 1%" }}>
                                    <Link to="/en_FlipHome" title="">
                                        <Card.Img className="second-card-img" variant="top" src={homeImg}
                                            onMouseOver={e => (e.currentTarget.src = homeHover)}
                                            onMouseOut={e => (e.currentTarget.src = homeImg)}
                                        />
                                        <Card.Body>
                                            <Card.Title>Home</Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                                <Card className="col-sm-12 col-md-2 col-lg-2" style={{ width: '18rem', margin: "0 1%", }}>
                                    <Link to="/en_FlipOffice" title="">
                                        <Card.Img className="second-card-img" variant="top" src={officeImg}
                                            onMouseOver={e => (e.currentTarget.src = officeHover)}
                                            onMouseOut={e => (e.currentTarget.src = officeImg)}
                                        />
                                        <Card.Body>
                                            <Card.Title>Office</Card.Title>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </div>
                        </div>

                        <div className="video-slider d-flex justify-content-center row">
                            <div className='video-text col-sm-10 col-md-10 col-lg-8'>
                                <div id="media" name="media"></div>
                                <h2>Green Life Media</h2>
                                <div className="videobox">
                                    <iframe width="1000" height="600" src="https://www.youtube.com/embed/EPZraK8Ntho" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>

                        {/* <div className="thr-side">
                            <h2>Our History</h2>
                            <div>
                                <img src={historyPng} alt="greenlife-history" />
                            </div>
                        </div> */}

                        <div className="relative" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                            data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
                            <div className="ab-search">
                                <img alt="Search in Green Life-Background" title="Search in Green Life-Background" className="bg-img" src="images/greenlifeSearch3.0.jpg" />
                                <div className="icons-wrapper">
                                    <div className="green-bar">
                                        <div id="search" name="search"></div>
                                        <h3>Search in Green Life</h3>
                                        <h4>Green Life Search</h4>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon">
                                        <a href="https://www.greenpoint.org.tw/GPHome/" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon1} data-src={searchIcon1} alt="GreenPoint icon" /><h5>GreenPoint (in Chinese)</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon">
                                        <a href="https://greenbuy.epa.gov.tw/Eng/Index.aspx" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon2} data-src={searchIcon2} alt="Green Mark icon" /><h5>Green Product Online Purchase Platform</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon">
                                        <a href="https://www.circuplus.org/water-refill-map/" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon3} data-src={searchIcon3} alt="CurcuPlus icon" /><h5>CurcuPlus (in Chinese)</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon">
                                        <a href="https://ecolife.epa.gov.tw/" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon4} data-src={searchIcon4} alt="Clean Homeland and Neighborhood icon" /><h5>Clean Homeland and Neighborhood (in Chinese)</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon">
                                        <a href="https://ienv.epa.gov.tw" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon5} data-src={searchIcon5} alt="i-Environment icon" /><h5>i-Environment (in Chinese)</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon">
                                        <a href="https://eeis.epa.gov.tw/front/EngWeb/Default1.aspx" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon6} data-src={searchIcon6} alt="Environmental Education Information System icon" /><h5>Environmental Education Information System</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon">
                                        <a href="https://lcss.epa.gov.tw/en/default.aspx" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon7} data-src={searchIcon7} alt="Low Carbon Sustainable Information System icon" /><h5>Low Carbon and Sustainable Homeland</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon">
                                        <a href="https://cfp-calculate.tw/eng/WebPage/LoginPage.aspx" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon8} data-src={searchIcon8} alt="Carbon Footprint Calculation Platform icon" /><h5>Carbon Footprint Calculation Platform</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon">
                                        <a href="https://ecolife2.epa.gov.tw/coastal/" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon9} data-src={searchIcon9} alt="Beach Cleanup System icon" /><h5>Coastal Clean-up System (in Chinese)</h5>
                                        </a>
                                    </div>
                                    <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon">
                                        <a href="https://hwms.epa.gov.tw/dispPageBox/onceOff/onceOffHp.aspx?ddsPageID=EPATWH" title="(New page)" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}>
                                            <img className="lazy-load" src={searchIcon10} data-src={searchIcon10} alt="Source Reduction of Disposable Products icon" /><h5>Source Reduction of Disposable Products (in Chinese)</h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

                {/* </div> */}
            </HelmetProvider>
            {/* </div> */}
        </>
    );
}

export default withRouter(EnglishAbout);