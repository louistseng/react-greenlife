import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
import '../GreenTour.scss';
import '../../src/EnglishVersion.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import { clickRecord } from '../utils/API';
import htmlParse from 'html-react-parser';
import verifyLogo from '../images1/greenLogo.gif';
import greenLogo from '../images1/restaurant/blankLeef1.png';
import natureLogo from '../images1/restaurant/nature-logo.png';
import Icon01 from '../images1/flip/food/slideIcon/17_.png';
import Icon02 from '../images1/flip/food/slideIcon/18_.png';
import Icon03 from '../images1/flip/food/slideIcon/19_.png';
import Icon04 from '../images1/flip/food/slideIcon/20_.png';
import Icon05 from '../images1/flip/food/slideIcon/21_.png';
import Icon06 from '../images1/flip/food/slideIcon/22_.png';
import Icon07 from '../images1/flip/food/slideIcon/23_.png';
import Icon08 from '../images1/flip/food/slideIcon/24_.png';
import Icon09 from '../images1/flip/food/slideIcon/25_.png';
import Icon10 from '../images1/flip/food/slideIcon/26_.png';
import Icon11 from '../images1/flip/food/slideIcon/27_.png';
import Icon12 from '../images1/flip/food/slideIcon/28_.png';
import Icon13 from '../images1/flip/food/slideIcon/29_.png';
import Icon14 from '../images1/flip/food/slideIcon/30_.png';
import Icon15 from '../images1/flip/food/slideIcon/31_.png';
import Icon16 from '../images1/flip/food/slideIcon/32_.png';
import ResIcon_001 from '../images1/flip/food/en-icon-001.png';
import ResIcon_002 from '../images1/flip/food/en-icon-002.png';
import ResIcon_003 from '../images1/flip/food/en-icon-003.png';
import ResIcon_004 from '../images1/flip/food/en-icon-004.png';
import ResIcon_005 from '../images1/flip/food/en-icon-005.png';
import ResIcon_006 from '../images1/flip/food/en-icon-006.png';
import ResIcon_007 from '../images1/flip/food/en-icon-007.png';
import ResIcon_008 from '../images1/flip/food/en-icon-008.png';
import resLogo from '../images1/flip/food/res-logo.png';
import greenLogo1 from '../images1/greenLogo(70x70).png';

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));
const Impact = React.lazy(() => import('../Components/EnglishVersion/Impact'));
const TaiwanPartnerMap = React.lazy(() => import('../Components/EnglishVersion/TaiwanPartnerMap'));

function EnglishFlipFood(props) {
    let history = useHistory()
    let SSL = props.SSL;
    let domainFormal = window.location.host.includes("greenlife.eri.com.tw") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    const collector = sessionStorage.getItem("userGuid") || "";
    var serialize = require('serialize-javascript');
    const [greenRes, setGreenRes] = useState(0);
    const [labelRes, setLabelRes] = useState(0);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const [themeId] = useState("8");

    useEffect(() => {
        // 綠色餐廳
        fetch(`${SSL}//${domainFormal}/APIs/Restaurant4?m=&r=1&st=&a=&i=,&cn=&zn=&k=`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setGreenRes(result.RowsCount)
            });

        // 環保標章餐館
        fetch(`${SSL}//${domainFormal}/APIs/Restaurant4?m=&r=2&st=&a=&i=,&cn=&zn=&k=`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setLabelRes(result.RowsCount)
            });
    }, []);

    const impact = [
        { img: resLogo, title: `${greenRes}`, subTitle: "Green Restaurants", desc: "Provide a green and low-carbon dining environment", color: "#F5A626" },
        { img: greenLogo1, title: `${labelRes}`, subTitle: "Green Mark Restaurants", desc: "Restaurants that have obtained an environmental certification even more stringent than Green Restaurants", color: "#F5A626" },

    ]

    //主副標題&小撇步
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${props.SSL}//${props.domain}/api/api/GreenLife/Page/Understand`, {
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
                // console.log(result)
                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });
    }, [props.SSL, props.domain, serialize, themeId]);

    //點閱計數API
    useEffect(() => {
        clickRecord("F20ABEC7-B05E-408A-A44B-D81A4A9ADB6E", "4", collector)
    }, [collector]);

    return (
        <>
            <EnglishBreadcrumb />
            <AddPoint roleId="1" targetGuid="F20ABEC7-B05E-408A-A44B-D81A4A9ADB6E" roleItemId="13" autoAdd={true} />
            <img alt="Green Dining-Banner" title="Green Dining-Banner" className="w-100" src="../../../images/flip/food/topBannerEN.jpg" />
            <div className="container containerBox flip-tour">
                <div className="d-flex top-logo justify-content-start en-food">
                    {/* <img src="images/flip/food/foodLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText en-food-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <p><span className="boldText title-font en-food-sub-title">What is Green Dining</span></p>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" alt="Green Dining" title="Green Dining" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/food/foodPic.svg" />
                        </div>
                    </div>

                    {/* <div className="video-slider mb-5">
                        <div className='col-lg-12 mt-5'>
                            <h3>Green Diet Introduction Video (Mid-Term Planning)</h3>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/Kp5HKQnOn0o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div> */}

                    <div className="content-section">
                        <h3 className="food-title-with-line">How Can you Choose</h3>
                        <div className="choose-box-wrapper">
                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="300" className="choose-box food">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper">
                                        <img src={verifyLogo} alt="Green Mark Restaurant Logo" tilte="Green Mark Restaurant Logo" />
                                    </div>
                                    <div className="en-flip-icon-text">Green Mark Restaurant</div>
                                </div>
                            </div>

                            <div data-aos="fade-up" data-aos-duration="1200" data-aos-offset="300" className="choose-box food">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper">
                                        <img src={greenLogo} alt="Green Restaurant Logo" tilte="Green Restaurant Logo" />
                                    </div>
                                    <div className="en-flip-icon-text">Green Restaurant</div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1200" data-aos-offset="300" className="choose-box food">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper">
                                        <img src={natureLogo} alt="AMOT Traceability Restaurant Logo" tilte="AMOT Traceability Restaurant Logo" />
                                    </div>
                                    <div className="en-flip-icon-text">AMOT Traceability Restaurant</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="" /><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div> */}
                        <h3 className="food-title-with-line">What Can You Do</h3>
                        <div className="tips-list-food row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon01} /><li>Order as much as you will eat</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon02} /><li>Choose local ingredients</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon10} /><li>Select seasonal ingredients</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon03} /><li>Use food ingredients well</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon04} /><li>Choose good agricultural products</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon05} /><li>Choose whole foods</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon06} /><li>Choose natural foods</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon07} /><li>Eat more fruits and vegetables</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon08} /><li>Choose inglorious fruits and vegetables</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon09} /><li>Do not choose ingredients containing conservation species</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon11} /><li>Avoid lengthy cooking times</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon12} /><li>Bring your own eco-friendly tableware</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon13} /><li>Use eco-friendly detergents</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon14} /><li>Separate food waste and recycle</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon15} /><li>Recycle paper utensils rigorously</li></div></div>
                                <div className="outter-ewrapper"><div className="link-wrapper"><img alt="" src={Icon16} /><li>Boil water to make your own tea</li></div></div>
                            </DownloadCarouselFlip>
                        </div>
                    </div>
                    <div className="content-section">
                        <h3 className="res-title-with-line">Three primary responses for green restaurants</h3>
                        <div className="three-point-wrapper">
                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>Implement source reduction</h3>
                                    <img src={ResIcon_001} alt="Implement source reduction" />
                                </div>
                                <div className="bottom-box en">
                                    <div className="animated-text">Do not actively provide disposable products</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>Use local ingredients</h3>
                                    <img src={ResIcon_002} alt="Use local ingredients" />
                                </div>
                                <div className="bottom-box en">
                                    <div className="animated-text">Prioritize using domestic ingredients</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>Promote food-conscious ordering</h3>
                                    <img src={ResIcon_003} alt="Promote food-conscious ordering" />
                                </div>
                                <div className="bottom-box en">
                                    <div className="animated-text">Provide portion options</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="food-title-with-line">Many benefits to becoming a Green Restaurant</h3>
                        <div className="benefit-wrapper">

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={ResIcon_004} alt="Enhance environmental image" />
                                    <h3>Enhance environmental image</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">The public is starting to prefer restaurants with a green image</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={ResIcon_005} alt="Increase customer visit rate" />
                                    <h3>Increase customer visit rate</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">More people are willing to support environmental protection with their consumption</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={ResIcon_006} alt="Strengthen a sense of honor" />
                                    <h3>Strengthen a sense of honor</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">Working in a green restaurant can enhance a sense of identity and motivate employees</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={ResIcon_007} alt="Reduce costs" />
                                    <h3>Reduce costs</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">Environmental protection actions save energy and water and reduce food waste</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={ResIcon_008} alt="Increase media exposure" />
                                    <h3>Increase media exposure</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">EPA organizes media campaigns and related activities from time to time</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="video-slider d-flex justify-content-center row">
                    <div className='video-text col-sm-10 col-md-10 col-lg-10'>
                        <div className="videobox">
                            <iframe width="1000" height="600" src="https://www.youtube.com/embed/HvOpcnBpnnw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <Impact impact={impact} />
            <TaiwanPartnerMap theme="Dining" />
            {/* <SideBtn history={history} /> */}
            {/* <EnglishFooter /> */}
            <Footer />
        </>
    );
}

export default withRouter(EnglishFlipFood);
