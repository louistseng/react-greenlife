import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
import '../../src/EnglishVersion.scss';
import { HashLink } from 'react-router-hash-link';
import { Link, withRouter, useHistory } from 'react-router-dom';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import htmlParse from 'html-react-parser';
import { clickRecord } from '../utils/API';
import { pad, getCityId } from '../utils/Functions';
import tourSvg from '../images1/flip/tour/tourPic.svg';
import buildingIcon from '../images1/flip/tour/buildingIcon.png';
import tablewareImg from '../images1/restaurant/intro/threePoint/tableware.png';
import Icon17 from '../images1/flip/tour/slideIcon/17_.png';
import Icon18 from '../images1/flip/tour/slideIcon/18_.png';
import Icon19 from '../images1/flip/tour/slideIcon/19_.png';
import Icon20 from '../images1/flip/tour/slideIcon/20_.png';
import Icon21 from '../images1/flip/tour/slideIcon/21_.png';
import Icon22 from '../images1/flip/tour/slideIcon/22_.png';
import Icon23 from '../images1/flip/tour/slideIcon/23_.png';
import Icon24 from '../images1/flip/tour/slideIcon/24_.png';
import Icon25 from '../images1/flip/tour/slideIcon/25_.png';
import Icon26 from '../images1/flip/tour/slideIcon/26_.png';
import Icon27 from '../images1/flip/tour/slideIcon/27_.png';
import Icon28 from '../images1/flip/tour/slideIcon/28_.png';
import Icon29 from '../images1/flip/tour/slideIcon/29_.png';
import Icon30 from '../images1/flip/tour/slideIcon/30_.png';
import Icon31 from '../images1/flip/tour/slideIcon/31_.png';
import Icon32 from '../images1/flip/tour/slideIcon/32_.png';
import Icon33 from '../images1/flip/tour/slideIcon/33_.png';
import freeTour from '../images1/flip/tour/freeTour.png';
import groupTour from '../images1/flip/tour/groupTour.png';
import accom from '../images1/flip/tour/accom.png';
import greenLogo1 from '../images1/greenLogo(70x70).png';

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));
const Impact = React.lazy(() => import('../Components/EnglishVersion/Impact'));
const TaiwanPartnerMap = React.lazy(() => import('../Components/EnglishVersion/TaiwanPartnerMap'));

function EnglishFlipTour(props) {
    let history = useHistory()
    let SSL = props.SSL;
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw';
    // let domainFormal = window.location.host.includes("greenlife.eri.com.tw") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    let domainFormal = "greenliving.epa.gov.tw/newPublic"
    const collector = sessionStorage.getItem("userGuid") || "";
    var serialize = require('serialize-javascript');
    const [freeCount, setFreeCount] = useState(0);
    const [groupCount, setGroupCount] = useState(0);
    const [hotelCount, setHotelCount] = useState(0);
    const [labelCount, setLabelCount] = useState(0);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const themeId = "7";

    useEffect(() => {

        // 自由行
        fetch(`${SSL}//${domainFormal}/APIs/TravelTour?p=1`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setFreeCount(result.RowsCount)
            });

        // 團體旅遊
        fetch(`${SSL}//${domainFormal}/APIs/TravelTour?p=2`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setGroupCount(result.RowsCount)
            });

        // 環保旅店
        fetch(`${SSL}//${domainFormal}/APIs/Hotels/1?m=&h=1&ic=&cn=&zn=&k=`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log( result)
                setHotelCount(result.RowsCount)
            });

        // 環保標章旅館
        fetch(`${SSL}//${domainFormal}/APIs/Hotels/1?m=&h=2&ic=&cn=&zn=&k=`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setLabelCount(result.RowsCount)
            });

    }, []);

    const impact = [
        { img: freeTour, title: `${freeCount}`, subTitle: "Self-guided Itineraries", desc: "Go wherever you want and enjoy green travel", color: "#59bfee" },
        { img: groupTour, title: `${groupCount}`, subTitle: "Group Travel Itineraries", desc: "Go with a travel agent and enjoy green travel", color: "#59bfee" },
        { img: accom, title: `${hotelCount}`, subTitle: "Eco-friendly Hotels", desc: "Providing an eco-friendly and low-carbon environment for hospitality", color: "#59bfee" },
        { img: greenLogo1, title: `${labelCount}`, subTitle: "Green Mark Hotels", desc: "Hotels that have obtained an environmental certification even more stringent than eco-friendly hotels", color: "#59bfee" },
    ]

    //點閱計數API
    useEffect(() => {
        clickRecord("F4E3870E-035A-415E-9368-00D40023E5C0", "4", collector)
    }, [collector]);

    //主副標題&小撇步
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${SSL}//${domain}/api/api/GreenLife/Page/Understand`, {
            method: 'POST',
            body: serialize({
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });

    }, [SSL, domain, serialize, themeId]);

    return (
        <>

            <EnglishBreadcrumb />
            <AddPoint roleId="1" targetGuid="F4E3870E-035A-415E-9368-00D40023E5C0" roleItemId="13" autoAdd={true} />
            <img alt="green-tour" title="green-tour" className="w-100" src="images/flip/tour/topBannerEN.jpg" />
            <div className="container containerBox flip-tour">
                <div className="d-flex top-logo justify-content-start en-tour">
                    {/* <img src="images/flip/tour/tourLogo.png" /> */}
                    <div className="flip-etitle">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <p><span className="boldText title-font tour-sub-title">What is Green Travel</span></p>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {/* {content.split("<br>").map((items, index) =>
                                    <p key={index}><span>&emsp;&emsp;{items}</span></p>
                                )} */}
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src={tourSvg} alt="green tour" title="green tour img" />
                        </div>
                    </div>

                    {/* <div className="video-slider mb-5">
                        <div className='col-lg-12 mt-5'>
                            <h3>綠色旅遊介紹影片(中期規劃)</h3>
                             <iframe width="560" height="315" src="https://www.youtube.com/embed/Kp5HKQnOn0o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div> */}

                    <div className="content-section">
                        <h3 className="en-title-with-line">How Can you Choose</h3>
                        <div className="choose-box-wrapper">

                            <div data-aos="fade-up" data-aos-duration="500" className="choose-box tour">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><i className="fas fa-binoculars"></i></div>
                                    <div className="en-flip-icon-text">Join a green trip</div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1000" className="choose-box tour">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><i className="fas fa-map-marker-alt"></i></div>
                                    <div className="en-flip-icon-text">Choose green attractions</div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1200" className="choose-box tour">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={tablewareImg} alt="Choose Green Restaurants" title="Choose Green Restaurants" /></div>
                                    <div className="en-flip-icon-text">Choose Green Restaurants</div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1400" className="choose-box tour">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={buildingIcon} alt="Stay in eco-friendly hotels" title="Stay in eco-friendly hotels"></img></div>
                                    <div className="en-flip-icon-text">Stay in eco-friendly hotels</div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1600" className="choose-box tour" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><i className="fas fa-leaf"></i></div>
                                    <div className="en-flip-icon-text">Choose eco-friendly travel services</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="en-title-with-line">What Can You Do</h3>
                        <div className="tips-list-tour row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon17} /><li>Participate in a green trip</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon18} /><li>Choose green attractions  </li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon19} /><li>Choose green restaurants</li></div></div>

                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon20} /><li>Choose eco-friendly hotels</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon21} /><li>Increase outdoor activities</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon22} /><li>Protect nature and ecology</li></div></div>

                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon23} /><li>Bring your own water container</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon24} /><li>Bring your own toiletries</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon25} /><li>Use low-carbon vehicles</li></div></div>

                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon26} /><li>Walk instead of taking a vehicle</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon27} /><li>Look up green service information</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon28} /><li>Pack leftovers after dining out</li></div></div>

                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon29} /><li>Don’t change bed sheets every day in accommodations</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon30} /><li>Support local products</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon31} /><li>Keep public toilets clean</li></div></div>

                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon32} /><li>Reduce waste</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon33} /><li>No disposable clothes</li></div></div>

                            </DownloadCarouselFlip>
                        </div>
                    </div>

                </div>
            </div >
            <Impact impact={impact} />
            <TaiwanPartnerMap theme="Travel" />
            {/* <SideBtn history={history} /> */}
            {/* <EnglishFooter /> */}
            <Footer />
        </>
    );
}

export default withRouter(EnglishFlipTour);