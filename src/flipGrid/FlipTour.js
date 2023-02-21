import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
import { HashLink } from 'react-router-hash-link';
import { Link, withRouter, useHistory } from 'react-router-dom';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import htmlParse from 'html-react-parser';

import { clickRecord } from '../utils/API';

import topBanner from '../images1/flip/tour/topBanner.jpg';
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

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function FlipTour(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');

    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");

    const themeId = "1";


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

            <BreadCrumb currentPage={"綠色旅遊 (玩得夠綠)"} />
            <AddPoint roleId="1" targetGuid="F4E3870E-035A-415E-9368-00D40023E5C0" roleItemId="13" autoAdd={true} />
            <img alt="綠色旅遊-橫幅" title="綠色旅遊-橫幅" className="w-100" src={topBanner} />
            <div className="container containerBox flip-tour">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/tour/tourLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <h2><span className="boldText title-font tour-sub-title">綠色旅遊</span></h2>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {/* {content.split("<br>").map((items, index) =>
                                    <p key={index}><span>&emsp;&emsp;{items}</span></p>
                                )} */}
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src={tourSvg} alt="綠色旅遊圖示" title="綠色旅遊圖示" />
                        </div>
                    </div>
                    <div className="content-section">
                        <h3 className="title-with-line">你可以這樣選</h3>
                        <div className="choose-box-wrapper">

                            <Link data-aos="fade-up" data-aos-duration="500" className="choose-box tour" to="/categories/greenTour?type=2" title="參加綠色行程">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><i className="fas fa-binoculars" aria-hidden="true"></i></div>
                                    <div className="flip-icon-text">參加綠色行程</div>
                                </div>
                            </Link>
                            <HashLink data-aos="fade-up" data-aos-duration="1000" className="choose-box tour" to="/categories/tourIntro#tour_site" title="選擇綠色景點">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><i className="fas fa-map-marker-alt" aria-hidden="true"></i></div>
                                    <div className="flip-icon-text">選擇綠色景點</div>
                                </div>
                            </HashLink>
                            <HashLink data-aos="fade-up" data-aos-duration="1200" className="choose-box tour" to="/categories/restaurant" title="選用綠色餐廳">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={tablewareImg} alt="" /></div>
                                    <div className="flip-icon-text">選用綠色餐廳</div>
                                </div>
                            </HashLink>
                            <HashLink data-aos="fade-up" data-aos-duration="1400" className="choose-box tour" to="/categories/accommodation" title="選住環保旅宿">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={buildingIcon} alt=""></img></div>
                                    <div className="flip-icon-text">選住環保旅宿</div>
                                </div>
                            </HashLink>
                            <HashLink data-aos="fade-up" data-aos-duration="1600" className="choose-box tour" to="/categories/tourIntro#recom_agency" scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} title="選環保旅行社">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><i className="fas fa-leaf" aria-hidden="true"></i></div>
                                    <div className="flip-icon-text">選環保旅行社</div>
                                </div>
                            </HashLink>
                        </div>


                    </div>


                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="綠色旅遊小撇步" title="綠色旅遊小撇步" /><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div> */}
                        <h3 className="title-with-line">你可以這樣做</h3>
                        <div className="tips-list-tour row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon17} /><li>參加綠色行程</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon18} /><li>選擇綠色景點  </li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon19} /><li>選用綠色餐廳</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon20} /><li>選住環保旅宿</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon21} /><li>增加戶外活動</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon22} /><li>保護自然生態</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon23} /><li>自備裝水容器</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon24} /><li>自備盥洗用品</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon25} /><li>騎乘低碳運具</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon26} /><li>步行代替乘車</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon27} /><li>查綠服務資訊</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon28} /><li>打包用餐剩食</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon29} /><li>續住不換床單</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon30} /><li>支持在地產品</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon31} /><li>維持公廁整潔</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon32} /><li>減少產生垃圾</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper"><img alt="" src={Icon33} /><li>不穿免洗衣物</li></div></div>

                            </DownloadCarouselFlip>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="title-with-line">綠色旅遊資訊</h3>
                        <div className="d-flex justify-content-center">

                            <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={345}>
                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?EFFD623E-0831-4DC1-A2F8-3D0C23032ADB'>
                                    <img className="ev-detail-img" src="\images\knowledge\2.全民綠生活-綠色生態 低碳環境教育遊程.jpg" alt="" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <p>2021/12/03</p>
                                        </div>
                                        <div>
                                            <p className="flip-kn-title">全民綠生活-綠色生態 低碳環境教育遊程</p>
                                        </div>
                                    </div>
                                </Link>
                                <a className="flip-rec-card card" as={Link} href='https://greenlife.epa.gov.tw/knowledge/info?9C39F24A-4AA4-4967-A6DE-F880C930A778'>
                                    <img className="ev-detail-img" src="\images\knowledge\低碳享遊慢。精品。花蓮.jpg" alt="" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <p>2021/10/02</p>
                                        </div>
                                        <div>
                                            <p className="flip-kn-title">低碳享遊 / 慢。精品。花蓮</p>
                                        </div>
                                    </div>
                                </a>

                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?E6C0DDA7-3510-4188-ACEC-7D4C696A5992'>
                                    <img className="ev-detail-img" src="\images\knowledge\E6C0DDA7-3510-4188-ACEC-7D4C696A5992.png" alt="" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <p>2020/11/30</p>
                                        </div>
                                        <div>
                                            <p className="flip-kn-title">【逛夜市也能綠生活】(環保署長張子敬ｘ吃貨主播蔡尚樺)</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link className="flip-rec-card card" as={Link} to='/knowledge/info?703DC7E1-F187-4754-8B2E-297AC4F8DC59'>
                                    <img className="ev-detail-img" src="\images\knowledge\703DC7E1-F187-4754-8B2E-297AC4F8DC59.png" alt="" />
                                    <div className="flip-kn-text">
                                        <div className="rec-time">
                                            <p>2020/11/30</p>
                                        </div>
                                        <div>
                                            <p className="flip-kn-title">綠色旅遊輕鬆玩 行程規畫免煩腦!</p>
                                        </div>
                                    </div>
                                </Link>

                            </DownloadCarouselFlip>
                        </div>
                    </div>

                </div>


            </div >
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipTour);