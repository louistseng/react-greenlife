import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { clickRecord } from '../utils/API';
import SideBtnOffice from '../Components/SideBtnOffice';

import verifyLogo from '../images1/greenLogo.gif';
import greenLogo from '../images1/restaurant/blankLeef1.png';
import natureLogo from '../images1/restaurant/nature-logo.png';
import buildingLogo from '../images1/restaurant/intro/building.png';
import protectLogo from '../images1/restaurant/intro/protect.png';
import proudLogo from '../images1/restaurant/intro/proud.png';
import leefLogo from '../images1/restaurant/intro/leef.png';
import exploreLogo from '../images1/restaurant/intro/explore.png';
import paperImg from '../images1/greenTour/intro/paper.png';
import ingredientsImg from '../images1/restaurant/intro/threePoint/ingredients.png';
import reduceImg from '../images1/restaurant/intro/threePoint/reduce.png';
import tablewareImg from '../images1/restaurant/intro/threePoint/tableware.png';
import uploadImg from '../images1/restaurant/intro/upload.png';
import uploadComputerImg from '../images1/greenTour/intro/upload.png';
import checkImg from '../images1/greenTour/intro/check.png';
import arrowImg from '../images1/greenTour/intro/arrowImg.png';
import resBanner from '../images1/restaurant/gt_bg1.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
//const TourBanner = React.lazy(() => import('../Components/TourBanner'))


function GreenTour(props) {

    let history = useHistory()
    let SSL = props.SSL;
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw';

    // let resFormal = window.location.hostname === "localhost" ? 'greenliving.eri.com.tw' : window.location.hostname === "greenlife.eri.com.tw" ? "greenliving.eri.com.tw" : 'greenliving.epa.gov.tw';

    // let resFormal = "https://greenliving.epa.gov.tw";
    // let resTest = "https://greenliving.eri.com.tw";

    let resFormal = "";
    switch (window.location.hostname) {
        case "localhost":
        case "greenlife.eri.com.tw":
            resFormal = 'greenliving.eri.com.tw';
            break;
        case "greenlife.epa.gov.tw":
            resFormal = 'greenliving.epa.gov.tw';
            break;
    }


    const [artData, setArtData] = useState([]);
    const count = "8";
    const themeId = "2";
    // console.log(window.location.hostname)

    const collector = sessionStorage.getItem("userGuid") || "";

    //????????????API
    useEffect(() => {
        clickRecord("51236BDC-B8D8-43F3-BFB4-91C17E490F5C", "6", collector)
    }, [collector]);

    //fetch????????????
    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/GreenLife/News/List`, {
            method: 'POST',
            body: JSON.stringify({
                Count: count,
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setArtData(result.resultObject)
            });

    }, [SSL, domain]);




    return (
        <>
            <BreadCrumb currentPage={"??????????????????"} />
            <div className="">
                <div className={`restaurant bigbanner mb-3`}>
                    <img className="relative" src={resBanner} width="100%" height="100%" alt="????????????Banner" title="????????????Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/resIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <Link to={`/categories/restaurant`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <a className="btn-link" target="_blank" rel="noopener noreferrer" title="????????????????????????(????????????????????????)" href={`${SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} onClick={() => clickRecord("E54B7ABD-B570-4AAA-9ACD-3C6201A82F8C", "6", collector)}>
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                                {/* <span id="e"> &nbsp;??????????????????</span>
                            <span id="f">&nbsp;&nbsp;????????????</span> */}
                            </button>
                        </a>
                        <Link to={`/categories/resDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="??????????????????"></i>
                                &nbsp;????????????
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"??????????????????"} search={"??????????????????"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}

                <div className="container">
                    {/* <div className="register-btn-wrapper">
                        <a className="register" href="https://greenliving.eri.com.tw/GreenLife/GreenRestaurantNew/DefaultGR.aspx?m=New" target="_blank" rel="noopener noreferrer">??????????????????????????????</a>
                    </div> */}

                    <div className="intro-title">
                        <h1 className="res-orange">????????????</h1>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="d-flex justify-content-start">
                                    <h4 className="rs-intro-subtitle">{artData.typeName}</h4>
                                    <a target="_blank" rel="noopener noreferrer" title="(????????????????????????)" href={artData.href}>
                                        <div className="subtitle-content">
                                            <h3>{artData.startTime}  {artData.title}</h3>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="intro-title">
                        <h2 className="res-orange">????????????</h2>
                        <div className="intro-content">
                            <div className="">
                                <h3>&emsp;&emsp;???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</h3>

                            </div>
                            <iframe className="video-wrapper" src={`https://www.youtube.com/embed/HvOpcnBpnnw`} title="?????????????????? ?????????????????????????????????"></iframe>
                        </div>
                    </div>


                    <div style={{ position: "relative" }} className="intro-title">
                        <h2 className="res-orange">??????????????????????????????</h2>
                        <div id="three_actions" style={{ position: "absolute", top: "-150px", left: "0" }}></div>
                        <div className="three-point-wrapper">
                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>??????????????????</h3>
                                    <img src={reduceImg} alt="??????????????????" />

                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">??????????????????????????????</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>??????????????????</h3>
                                    <img src={ingredientsImg} alt="??????????????????" />

                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">????????????????????????</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>??????????????????</h3>
                                    <img src={tablewareImg} alt="??????????????????" />

                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">??????????????????????????????</div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="go-wrapper intro-title">
                        <h2 className="res-orange">?????????????????????GO???</h2>

                        <div>
                            <div className="btn-area">
                                <div style={{ position: "relative" }} className="tour-site">
                                    <div className="btn-wrapper">
                                        <Link className="intro-circle-btn" to="/categories/restaurant?searched=true&page=1&level=&type=2&activity=&d=,&city=&dist=&search=">
                                            <div>
                                                <div className="img-wrapper"><img src={verifyLogo} alt="??????????????????" /></div>
                                                <div className="inner-text">
                                                    <h3>??????</h3>
                                                    <h3>??????????????????</h3>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link className="intro-circle-btn" to="/categories/restaurant?searched=true&page=1&level=&type=1&activity=&d=,&city=&dist=&search=">
                                            <div>
                                                <div className="img-wrapper"><img src={greenLogo} alt="????????????" /></div>
                                                <div className="inner-text">
                                                    <h3>??????</h3>
                                                    <h3>????????????</h3>
                                                </div>
                                            </div>
                                        </Link>
                                        <a className="intro-circle-btn" href="https://tinyurl.com/mryc97bb">
                                            <div>
                                                <div className="img-wrapper"><img src={natureLogo} alt="????????????" /></div>
                                                <div className="inner-text">
                                                    <h3>??????</h3>
                                                    <h3>AMOT????????????</h3>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="intro-title" >
                        <div style={{ position: "relative" }} className="recom-agency">
                            <h2 className="res-orange">??????????????????????????????</h2>
                        </div>

                        <div className="benefit-wrapper">

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={protectLogo} alt="??????????????????" />
                                    <h3>??????????????????</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">???????????????????????????????????????????????????????????????</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={buildingLogo} alt="?????????????????????" />
                                    <h3>?????????????????????</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">?????????????????????????????????????????????????????????????????????</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={proudLogo} alt="???????????????" />
                                    <h3>???????????????</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">??????????????????????????????????????????????????????????????????</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={leefLogo} alt="????????????" />
                                    <h3>????????????</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">??????????????????????????????????????????????????????</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={exploreLogo} alt="?????????????????????" />
                                    <h3>?????????????????????</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">???????????????????????????????????????????????????</div>
                                </div>
                            </div>


                        </div>



                        <div className="tour-join">
                            <ul className="">
                                <h3 className="tour-join-title">????????????</h3>
                                <p>&emsp;&emsp;???????????????????????????????????????????????????????????????<HashLink className="res-link" to="/categories/resIntro#three_actions">????????????3???????????????</HashLink>?????????????????????????????????????????????????????????</p>
                            </ul>


                            <ul>
                                <h3 className="tour-join-title">?????????????????????????????????????????????</h3>
                                <div className="apply-wrapper">
                                    <div className="tour-apply-wrapper">
                                        <div className="blue-button food">
                                            <div className="img-wrapper">
                                                <img src={paperImg} alt="?????????????????????" />
                                                <h4>?????????????????????</h4>
                                            </div>
                                        </div>
                                        <img className="arrow" src={arrowImg} alt="????????????" />


                                        <div className="blue-button food">
                                            <div className="img-wrapper">
                                                <img src={uploadImg} alt="??????????????????" />
                                                <h4>??????????????????</h4>
                                            </div>
                                        </div>
                                        <img className="arrow" src={arrowImg} alt="????????????" />

                                        <div className="blue-button food-submit">
                                            <div className="img-wrapper">
                                                <img src={checkImg} alt="????????????" />
                                                <h4>????????????</h4>
                                            </div>
                                        </div>

                                    </div>
                                    <h4 className="join-note">?????????????????????????????????<a className="res-link" target="_blank" rel="noopener noreferrer" href={`${SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} >??????????????????</a>????????????????????????????????????????????????</h4>
                                </div>
                            </ul>

                            <ul className="res-more">
                                <h3 className="tour-join-title">????????????</h3>
                                <table className="contact-title">
                                    <tbody>
                                        <tr>
                                            <td className="res-more-border-right">
                                                <div className="icon-text-wrapper"><i className="fas fa-phone" aria-hidden="true" alt="????????????"></i><h4>&nbsp;??????</h4></div>
                                            </td>
                                            <td className="contact-info">
                                                {/* <p className="bold">(02)2311-7722 #2925 ?????????????????????????????????????????????</p> */}
                                                <p>(06)363-6619 ????????????????????????????????????</p>
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="res-more-border-right">
                                                <div className="contact-second icon-text-wrapper"><img className="report-info-img" src={uploadComputerImg} alt="??????????????????????????????" /><h4>&nbsp;??????????????????</h4></div>
                                            </td>
                                            <td className="contact-info">
                                                <p className="bold">(02)2361-1999#437??????????????????????????????</p>
                                                {/* <p className="bold">(02)2361-1999 #437??????????????????????????????</p> */}
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="res-more-border-right">
                                                <div className="contant-email icon-text-wrapper"><i className="far fa-envelope" aria-hidden="true" alt="e-mail??????"></i><h4>&nbsp;e-mail</h4></div>
                                            </td>
                                            <td className="contact-info">
                                                <p className="email-text">OliveChang@itri.org.tw</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </ul>

                        </div>
                    </div>

                </div>
                {/* <SideBtn history={history} /> */}
                <SideBtnOffice history={useHistory()} type={"????????????"} />
            </div>
            <Footer />

        </>
    );
}

export default withRouter(GreenTour);