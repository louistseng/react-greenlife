import React, { useState, useEffect } from 'react';
import '../../src/flipGrid//FlipTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import { clickRecord } from '../utils/API';
import markBanner from '../images1/img/english_mark.jpg';
import verifyLogo from '../images1/greenLogo.webp';
import markIcon1 from '../images1/img/en-mark-icon/可回收.png';
import markIcon2 from '../images1/img/en-mark-icon/低汙染.png';
import markIcon3 from '../images1/img/en-mark-icon/省能源.png';
import Icon01 from '../images1/img/en-mark-icon/滿足環保消費需求.png';
import Icon02 from '../images1/img/en-mark-icon/降低營運服務成本.png';
import Icon03 from '../images1/img/en-mark-icon/提升企業綠色形象.png';
import Icon04 from '../images1/img/en-mark-icon/市場區隔行銷推廣.png';
import Icon05 from '../images1/img/en-mark-icon/機關民間綠色採購.png';
import btnIcon1 from '../images1/img/en-mark-icon/環保標章制度2.png';
import btnIcon2 from '../images1/img/en-mark-icon/環保標章規格2.png';

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function EnglishMark(props) {
    let history = useHistory()
    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const [themeId] = useState("2");

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
                console.log(result)
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
            <EnglishBreadcrumb currentPage={"GreenMark"} />
            <AddPoint roleId="1" targetGuid="F20ABEC7-B05E-408A-A44B-D81A4A9ADB6E" roleItemId="13" autoAdd={true} />
            <img alt="markBanner" title="markBanner" className="w-100" src={markBanner} />
            <div className="container containerBox flip-mark">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/food/foodLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText mark-top-title">GreenMark</h1>
                        {/* <p><span className="boldText title-font tour-top-subtitle"></span></p> */}
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <div className="d-flex justify-content-around align-items-center row top-side">
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" alt="logo" title="logo" className="col-sm-12 col-md-4 col-lg-4 mb-4" src={verifyLogo} />
                            <div className="inner-article col-12 col-md-8 col-lg-8">
                                <p><span className="boldText title-font mark-sub-title">A green leaf wraps around a pure and unpolluted earth</span></p>
                                This is the symbol of the Green Mark. Through the Green Mark system, we encourage manufacturers to consider how they can reduce environmental pollution and save resources during the product manufacturing process. By promoting waste reduction and recycling, we also remind consumers to carefully choose recyclable, low-pollution, and resource-saving products to protect the environmental.
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="english-mark-line">Three environmental protection concepts of the Green Mark</h3>
                        <div className="choose-box-wrapper">

                            <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="300" className="choose-box mark">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={markIcon1} alt="recyclable-img" /></div>
                                    <div className="en-flip-icon-text">Recyclable</div>
                                </div>
                            </div>

                            <div data-aos="fade-up" data-aos-duration="1200" data-aos-offset="300" className="choose-box mark">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={markIcon2} alt="low-polluting-img"></img></div>
                                    <div className="en-flip-icon-text">Low-polluting</div>
                                </div>
                            </div>
                            <div data-aos="fade-up" data-aos-duration="1200" data-aos-offset="300" className="choose-box mark">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={markIcon3} alt="resource-saving-img"></img></div>
                                    <div className="en-flip-icon-text">Energy-saving</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="english-mark-line">Five benefits of the Green Mark</h3>
                        <div className="tips-list-mark row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <img alt="Meet the needs of green consumption" src={Icon01} />
                                        <div className="li-text">
                                            <li>Meet the needs of</li>
                                            <li>green consumption</li>
                                        </div>
                                    </div>
                                </div>

                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <img alt="Reduce operating service costs" src={Icon02} />
                                        <div className="li-text">
                                            <li>Reduce operating</li>
                                            <li>service costs</li>
                                        </div>
                                    </div>
                                </div>

                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <img alt="Improve corporations’ green image" src={Icon03} />
                                        <div className="li-text">
                                            <li>Improve corporations’</li>
                                            <li>green image</li>
                                        </div>
                                    </div>
                                </div>
                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <img alt="Market segmentation and marketing" src={Icon04} />
                                        <div className="li-text">
                                            <li>Market segmentation</li>
                                            <li>and marketing</li>
                                        </div>
                                    </div>
                                </div>
                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <img alt="Private sector green procurement" src={Icon05} />
                                        <div className="li-text">
                                            <li>Private sector</li>
                                            <li>green procurement</li>
                                        </div>
                                    </div>
                                </div>
                            </DownloadCarouselFlip>
                        </div>

                        {/* <div className="content-section">
                            <h3 className="english-mark-line">環保標章介紹影片</h3>
                            <iframe className="video-wrapper mt-4" width="560" height="315" src="https://www.youtube.com/embed/UMj0ejkPKJE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div> */}
                    </div>

                    {/* <div className="content-section">
                        <h3 className="english-mark-line">環保標章三十周年專區(內容待補充)</h3>
                        <p className="d-flex justify-content-center align-items-center">臺灣環保標章三十周年專區，感謝您一路相伴，接露三十周年相關活動資訊</p>
                    </div> */}

                    <div className="content-section">
                        <h3 className="english-mark-line">Read more</h3>
                        <div className="mark-btn d-flex justify-content-around align-items-center row">
                            <Link to="/en_MarkInfo" title="mark-info" className="col-12 col-md-5 col-lg-5 d-flex justify-content-center align-items-center mt-4">
                                <img src={btnIcon1} alt="btnIcon1" />
                                <h4>Introduction of the Green Mark System</h4>
                            </Link>
                            <Link to="/en_MarkInfo#4" title="mark-info" className="col-12 col-md-5 col-lg-5 d-flex justify-content-center align-items-center mt-4">
                                <img src={btnIcon2} alt="btnIcon2" />
                                <h4>Specifications and standards for applying the Green Mark</h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(EnglishMark);
