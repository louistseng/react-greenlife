import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
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

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function FlipFood(props) {

    let history = useHistory()

    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const [themeId] = useState("2");

    const greenRes = 'https://greenlife.epa.gov.tw/categories/resIntro';
    const greenFood = 'https://greenlife.epa.gov.tw/greenLabel/GreenMarkIntroMarkApplySeviceIndex';



    //????????????&?????????
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

    //????????????API
    useEffect(() => {
        clickRecord("F20ABEC7-B05E-408A-A44B-D81A4A9ADB6E", "4", collector)
    }, [collector]);



    return (
        <>
            <BreadCrumb currentPage={"???????????? (????????????)"} />
            <AddPoint roleId="1" targetGuid="F20ABEC7-B05E-408A-A44B-D81A4A9ADB6E" roleItemId="13" autoAdd={true} />
            <img alt="????????????-??????" title="????????????-??????" className="w-100" src="../../../images/flip/food/topBanner.jpg" />
            <div className="container containerBox flip-tour">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/food/foodLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>
                <div className="detail-info">
                    <div>
                        <h2><span className="boldText title-font tour-sub-title">????????????</span></h2>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}

                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" alt="????????????" title="????????????" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/food/foodPic.svg" />
                        </div>
                    </div>
                    <div className="content-section">
                        <h3 className="title-with-line">??????????????????</h3>
                        <div className="choose-box-wrapper">

                            <Link data-aos="fade-up" data-aos-duration="1000" data-aos-offset="300" className="choose-box food" to="/categories/restaurant?searched=true&page=1&level=&type=2&activity=&d=,&city=&dist=&search=" title="??????????????????">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={verifyLogo} alt="????????????????????????" tilte="????????????????????????" /></div>
                                    <div className="flip-icon-text">??????????????????</div>
                                </div>
                            </Link>

                            <Link data-aos="fade-up" data-aos-duration="1200" data-aos-offset="300" className="choose-box food" to="/categories/restaurant?searched=true&page=1&level=&type=1&activity=&d=,&city=&dist=&search=" title="????????????">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={greenLogo} alt="??????????????????" tilte="??????????????????"></img></div>
                                    <div className="flip-icon-text">????????????</div>
                                </div>
                            </Link>
                            <a data-aos="fade-up" data-aos-duration="1200" data-aos-offset="300" className="choose-box food" href="https://tinyurl.com/mryc97bb" title="????????????">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={natureLogo} alt="??????????????????" tilte="??????????????????"></img></div>
                                    <div className="flip-icon-text">AMOT????????????</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="?????????????????????" title="?????????????????????" /><span className="boldText title-font tour-subtitle">?????????????????????</span></div> */}
                        <h3 className="title-with-line">??????????????????</h3>
                        <div className="tips-list-food row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <img alt="" src={Icon01} />
                                        <li>??????????????????</li>
                                    </div>
                                </div>

                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <a href="https://www.afa.gov.tw/cht/index.php?code=list&ids=1103" title="????????????????????????">
                                            <img alt="" src={Icon02} /><li>??????????????????</li>
                                        </a>
                                    </div>
                                </div>

                                <div className="outter-wrapper">
                                    <div className="link-wrapper">
                                        <a href="https://www.afa.gov.tw/cht/index.php?code=list&ids=1103" title="????????????????????????">
                                            <img alt="" src={Icon03} />
                                            <li>??????????????????</li>
                                        </a>
                                    </div>
                                </div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon04} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon05} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon06} /><li>??????????????????</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon07} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon08} /><li>??????NG??????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon09} /><li>??????????????????</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon10} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon11} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon12} /><li>??????????????????</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon13} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon14} /><li>??????????????????</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon15} /><li>??????????????????</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon16} /><li>??????????????????</li></div></div>


                            </DownloadCarouselFlip>
                        </div>
                    </div>


                    <div className="content-section">
                        <h3 className="title-with-line">??????????????????</h3>
                        <div className="d-flex justify-content-center">

                            <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={290}>
                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?E6C0DDA7-3510-4188-ACEC-7D4C696A5992'>
                                    <img className="ev-detail-img" src="\images\knowledge\E6C0DDA7-3510-4188-ACEC-7D4C696A5992.png" alt="??????????????????????????????(?????????????????????????????????????????????)" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <h6>2020/11/30</h6>
                                        </div>
                                        <div>
                                            <h6 className="flip-kn-title">??????????????????????????????(?????????????????????????????????????????????)</h6>
                                        </div>
                                    </div>
                                </Link>


                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?062C712C-036E-4F4F-947B-2F5EBD7A72A2'>
                                    <img className="ev-detail-img" src="\images\knowledge\062C712C-036E-4F4F-947B-2F5EBD7A72A2.jpg" alt="?????????????????? ?????????????????????????????????" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <h6>2020/11/19</h6>
                                        </div>
                                        <div>
                                            <h6 className="flip-kn-title">?????????????????? ?????????????????????????????????</h6>
                                        </div>
                                    </div>
                                </Link>

                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?C1011762-9869-4E6B-BB7A-1A6F7A37B81A'>
                                    <img className="ev-detail-img" src="\images\knowledge\01??????????????????.jpg" alt="???????????????????????????????????????" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <h6>2021/04/23</h6>
                                        </div>
                                        <div>
                                            <h6 className="flip-kn-title">???????????????????????????????????????</h6>
                                        </div>
                                    </div>
                                </Link>


                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?6A0530B5-5036-412B-BC6E-72C2C719282D'>
                                    <img className="ev-detail-img" src="\images\knowledge\02???????????????.jpg" alt="????????????????????????????????????" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <h6>2021/04/23</h6>
                                        </div>
                                        <div>
                                            <h6 className="flip-kn-title">????????????????????????????????????</h6>
                                        </div>
                                    </div>
                                </Link>

                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?C94D3BC0-0F08-4CC3-A2F9-3E2DBA686AC7'>
                                    <img className="ev-detail-img" src="\images\knowledge\03???????????????.jpg" alt="????????????????????????????????????" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <h6>2021/04/23</h6>
                                        </div>
                                        <div>
                                            <h6 className="flip-kn-title">????????????????????????????????????</h6>
                                        </div>
                                    </div>
                                </Link>



                            </DownloadCarouselFlip>
                        </div>
                    </div>
                </div>



                {/* <Link to="/categories/restaurant"><div className="col-sm-10 col-md-4 col-lg-4 joinBtn">??????????????????</div></Link> */}
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipFood);
