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

    //點閱計數API
    useEffect(() => {
        clickRecord("51236BDC-B8D8-43F3-BFB4-91C17E490F5C", "6", collector)
    }, [collector]);

    //fetch最新消息
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
            <BreadCrumb currentPage={"綠色餐廳介紹"} />
            <div className="">
                <div className={`restaurant bigbanner mb-3`}>
                    <img className="relative" src={resBanner} width="100%" height="100%" alt="綠色餐廳Banner" title="綠色餐廳Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/resIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色餐廳介紹圖示"></i>
                                &nbsp;綠色餐廳介紹
                            </button>
                        </Link>
                        <Link to={`/categories/restaurant`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="綠色餐廳查詢圖示"></i>
                                &nbsp;綠色餐廳查詢
                            </button>
                        </Link>
                        <a className="btn-link" target="_blank" rel="noopener noreferrer" title="加入綠色餐廳鏈結(在新視窗開啟鏈結)" href={`${SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} onClick={() => clickRecord("E54B7ABD-B570-4AAA-9ACD-3C6201A82F8C", "6", collector)}>
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入綠色餐廳圖示"></i>
                                &nbsp;加入綠色餐廳
                                {/* <span id="e"> &nbsp;加入綠色餐廳</span>
                            <span id="f">&nbsp;&nbsp;近期開放</span> */}
                            </button>
                        </a>
                        <Link to={`/categories/resDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色餐廳介紹"} search={"綠色餐廳查詢"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}

                <div className="container">
                    {/* <div className="register-btn-wrapper">
                        <a className="register" href="https://greenliving.eri.com.tw/GreenLife/GreenRestaurantNew/DefaultGR.aspx?m=New" target="_blank" rel="noopener noreferrer">我要申請綠色餐廳資格</a>
                    </div> */}

                    <div className="intro-title">
                        <h1 className="res-orange">最新消息</h1>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="d-flex justify-content-start">
                                    <h4 className="rs-intro-subtitle">{artData.typeName}</h4>
                                    <a target="_blank" rel="noopener noreferrer" title="(在新視窗開啟鏈結)" href={artData.href}>
                                        <div className="subtitle-content">
                                            <h3>{artData.startTime}  {artData.title}</h3>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="intro-title">
                        <h2 className="res-orange">綠色餐廳</h2>
                        <div className="intro-content">
                            <div className="">
                                <h3>&emsp;&emsp;綠色餐廳是以環境友善為理念，提供環保、低碳之供餐及用餐環境，以減少對環境的衝擊，也呼應氣候變遷、食品安全、循環經濟等議題。</h3>

                            </div>
                            <iframe className="video-wrapper" src={`https://www.youtube.com/embed/HvOpcnBpnnw`} title="綠色餐廳正夯 當吃貨也可以好好愛地球"></iframe>
                        </div>
                    </div>


                    <div style={{ position: "relative" }} className="intro-title">
                        <h2 className="res-orange">綠色餐廳響應三大要點</h2>
                        <div id="three_actions" style={{ position: "absolute", top: "-150px", left: "0" }}></div>
                        <div className="three-point-wrapper">
                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>做好源頭減量</h3>
                                    <img src={reduceImg} alt="做好源頭減量" />

                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">不主動提供一次性用品</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>使用在地食材</h3>
                                    <img src={ingredientsImg} alt="使用在地食材" />

                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">優先使用國產食材</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <h3>推行惜食點餐</h3>
                                    <img src={tablewareImg} alt="推行惜食點餐" />

                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">提供餐點份量調整服務</div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="go-wrapper intro-title">
                        <h2 className="res-orange">跟著環保署一起GO！</h2>

                        <div>
                            <div className="btn-area">
                                <div style={{ position: "relative" }} className="tour-site">
                                    <div className="btn-wrapper">
                                        <Link className="intro-circle-btn" to="/categories/restaurant?searched=true&page=1&level=&type=2&activity=&d=,&city=&dist=&search=">
                                            <div>
                                                <div className="img-wrapper"><img src={verifyLogo} alt="環保標章餐館" /></div>
                                                <div className="inner-text">
                                                    <h3>查詢</h3>
                                                    <h3>環保標章餐館</h3>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link className="intro-circle-btn" to="/categories/restaurant?searched=true&page=1&level=&type=1&activity=&d=,&city=&dist=&search=">
                                            <div>
                                                <div className="img-wrapper"><img src={greenLogo} alt="綠色餐廳" /></div>
                                                <div className="inner-text">
                                                    <h3>查詢</h3>
                                                    <h3>綠色餐廳</h3>
                                                </div>
                                            </div>
                                        </Link>
                                        <a className="intro-circle-btn" href="https://tinyurl.com/mryc97bb">
                                            <div>
                                                <div className="img-wrapper"><img src={natureLogo} alt="溯源餐廳" /></div>
                                                <div className="inner-text">
                                                    <h3>了解</h3>
                                                    <h3>AMOT溯源餐廳</h3>
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
                            <h2 className="res-orange">加入綠色餐廳好處多多</h2>
                        </div>

                        <div className="benefit-wrapper">

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={protectLogo} alt="提升環保形象" />
                                    <h3>提升環保形象</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">具有環保形象的餐廳已逐漸被民眾納入優先考量</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={buildingLogo} alt="增加顧客來店率" />
                                    <h3>增加顧客來店率</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">民眾環保意識增長，越來越多人願意以消費支持環保</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={proudLogo} alt="提升榮譽感" />
                                    <h3>提升榮譽感</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">取得綠色餐廳可提升員工對工作的認同感及向心力</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={leefLogo} alt="節省成本" />
                                    <h3>節省成本</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">環保行為可達到節能省水及減少廚餘之效</div>
                                </div>
                            </div>

                            <div className="single-outter-wrapper">
                                <div className="top-box">
                                    <img src={exploreLogo} alt="增加媒體曝光度" />
                                    <h3>增加媒體曝光度</h3>
                                </div>
                                <div className="bottom-box">
                                    <div className="animated-text">環保署不定期舉辦媒體廣宣及相關活動</div>
                                </div>
                            </div>


                        </div>



                        <div className="tour-join">
                            <ul className="">
                                <h3 className="tour-join-title">申請資格</h3>
                                <p>&emsp;&emsp;只要你是合法設立並登記之餐飲業者，並且符合<HashLink className="res-link" to="/categories/resIntro#three_actions">綠色餐廳3項響應作為</HashLink>並上傳佐證文件，即可申請成為綠色餐廳。</p>
                            </ul>


                            <ul>
                                <h3 className="tour-join-title">簡單申請一起加入綠色餐廳行列！</h3>
                                <div className="apply-wrapper">
                                    <div className="tour-apply-wrapper">
                                        <div className="blue-button food">
                                            <div className="img-wrapper">
                                                <img src={paperImg} alt="填寫響應申請表" />
                                                <h4>填寫響應申請表</h4>
                                            </div>
                                        </div>
                                        <img className="arrow" src={arrowImg} alt="向右箭頭" />


                                        <div className="blue-button food">
                                            <div className="img-wrapper">
                                                <img src={uploadImg} alt="上傳佐證照片" />
                                                <h4>上傳佐證照片</h4>
                                            </div>
                                        </div>
                                        <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                        <div className="blue-button food-submit">
                                            <div className="img-wrapper">
                                                <img src={checkImg} alt="送出完成" />
                                                <h4>送出完成</h4>
                                            </div>
                                        </div>

                                    </div>
                                    <h4 className="join-note">尚未加入的餐飲業者們，<a className="res-link" target="_blank" rel="noopener noreferrer" href={`${SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} >加入綠色餐廳</a>的行列，成為綠色餐廳的一份子吧！</h4>
                                </div>
                            </ul>

                            <ul className="res-more">
                                <h3 className="tour-join-title">想問更多</h3>
                                <table className="contact-title">
                                    <tbody>
                                        <tr>
                                            <td className="res-more-border-right">
                                                <div className="icon-text-wrapper"><i className="fas fa-phone" aria-hidden="true" alt="電話圖示"></i><h4>&nbsp;電話</h4></div>
                                            </td>
                                            <td className="contact-info">
                                                {/* <p className="bold">(02)2311-7722 #2925 賴小姐（汎宇電商股份有限公司）</p> */}
                                                <p>(06)363-6619 張小姐（工業技術研究院）</p>
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="res-more-border-right">
                                                <div className="contact-second icon-text-wrapper"><img className="report-info-img" src={uploadComputerImg} alt="系統填報聯絡資訊圖示" /><h4>&nbsp;系統填報問題</h4></div>
                                            </td>
                                            <td className="contact-info">
                                                <p className="bold">(02)2361-1999#437（環資國際有限公司）</p>
                                                {/* <p className="bold">(02)2361-1999 #437（環資國際有限公司）</p> */}
                                                <br />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="res-more-border-right">
                                                <div className="contant-email icon-text-wrapper"><i className="far fa-envelope" aria-hidden="true" alt="e-mail圖示"></i><h4>&nbsp;e-mail</h4></div>
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
                <SideBtnOffice history={useHistory()} type={"綠色餐廳"} />
            </div>
            <Footer />

        </>
    );
}

export default withRouter(GreenTour);