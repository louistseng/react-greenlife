import React, { useEffect, useRef, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import './main.css';
import { ReactComponent as SVG } from './main6.min.svg'
import { select, selectAll } from "d3";
import greenLogo from './images1/logo-small.png'
import greenLogoIcon from './images1/greenLogo1.png'
import accessibility from './images1/footer/accessibility.png';

import shoppingPic from './images1/flip/main-leaf/shopping.png';
import foodPic from './images1/flip/main-leaf/food.png';
import homePic from './images1/flip/main-leaf/home.png';
import tourPic from './images1/flip/main-leaf/tour.png';
import officePic from './images1/flip/main-leaf/office.png';


import { Helmet, HelmetProvider } from 'react-helmet-async';
import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";
import { Modal, Form, Button } from 'react-bootstrap';
import { formatDateTime } from './utils/Functions';

function Main(props) {

    let SSL = props.SSL
    let domain = props.domain
    let history = useHistory()
    var serialize = require('serialize-javascript');

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    // const [show, setShow] = useState(false);
    const [target, setTarget] = useState(undefined);

    // 首頁 modal 
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const date = new Date()

    // useEffect(() => {
    //     if (formatDateTime(date) <= "2023/01/02 00:00") {
    //         handleShow()
    //     }

    //     // 性能監聽指標分析
    //     // function showNavigationDetails() {
    //     //     const [entry] = performance.getEntriesByType("navigation");
    //     //     console.table(entry.toJSON());
    //     // }
    //     // showNavigationDetails()
    // }, [])

    // 節慶背景圖只顯示在電腦
    // const [showBg, setShowBg] = useState(true)
    // useEffect(() => {
    //     // 判斷手機電腦
    //     if (typeof window.orientation !== 'undefined') {
    //         setShowBg(false)
    //     }
    // }, [])

    //紀錄瀏覽人次API
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/VisitRecord`, {
            method: 'POST',
            body: serialize({
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                // console.log(res)
            }).then(result => {
                // console.log(result)
            });
    }, [SSL, domain, serialize]);

    //取得瀏覽人次API
    const [visitedCount, setVisitedCount] = useState([]);
    // https://cors-anywhere.herokuapp.com/
    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Common/VisitCount`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setVisitedCount(result.resultObject)
                // console.log(result)
            });

    });


    //點閱計數API
    useEffect(() => {
        clickRecord("EF2F13BA-8DE4-4914-A255-A6751BC15DD2", "1", collector)
    }, [collector]);

    //系統資訊API
    const [siteInfo, setSiteInfo] = useState([]);
    // const [items, setItems] = useState([]);

    const type = "Index";
    const code = "Footer";


    useEffect(() => {

        const uri = `${SSL}//${domain}/api/api/Common/SystemInfo`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Type: type,
                Code: code
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // setItems(result.resultObject[0].item5.split('<br>'))
                if (result.isSucess) {
                    setSiteInfo(result.resultObject[0]);
                }
            });
    }, []);


    return (
        <>
            <HelmetProvider className="helmet-provider">
                <Helmet>
                    <title>全民綠生活資訊平台 - 入口網頁</title>
                    <meta name="description" content="行政院環境保護署-全民綠生活資訊平台首頁，「綠生活」是一種親環境的生活方式，從食、衣、住、行、育、樂、購等生活小細節做起，來愛護我們的家園。" />
                </Helmet>
                {/* 節慶背景圖 */}
                {/* <div className="new-year-bg" style={{ backgroundImage: showBg ? `url("images/newYear/island-background.png")` : "" }}> */}
                <a className="skip-nav" href="#" title="上方導覽連結區" accessKey="u">:::</a>
                <div className="logo">
                    <h1><a href="#" title="全民綠生活LOGO"><img src={greenLogo} alt="全民綠生活LOGO" /></a></h1>
                    {/* <h1><a href="#" title="全民綠生活LOGO"><img src={"/images/newYear/island-newYear-logo.png"} alt="全民綠生活LOGO" /></a></h1> */}
                </div>
                <div className="main-content-wrapper" >
                    <div className="App d-flex">
                        <div className="svg-wrapper col-sm-12 col-md-12 col-lg-10">
                            <Link to="/about/intro/flipTour" title="flipTour" className="eco"
                                onMouseOver={() => setTarget(1)}
                                onMouseLeave={() => setTarget(undefined)}
                                style={{ opacity: target === 1 || target === undefined ? "1" : "0.2" }}>
                                <img src={tourPic} alt="eco-tour" id="eco-tour" className="eco-tour" />
                            </Link>
                            <Link to="/about/intro/flipShopping" title="flipShopping" className="eco"
                                onMouseOver={() => setTarget(2)}
                                onMouseLeave={() => setTarget(undefined)}
                                style={{ opacity: target === 2 || target === undefined ? "1" : "0.2" }}>
                                <img src={shoppingPic} alt="eco-shopping" id="eco-shopping" className="eco-shopping" />
                            </Link>
                            <Link to="/about/intro/flipFood" title="flipFood" className="eco"
                                onMouseOver={() => setTarget(3)}
                                onMouseLeave={() => setTarget(undefined)}
                                style={{ opacity: target === 3 || target === undefined ? "1" : "0.2" }}>
                                <img src={foodPic} alt="eco-food" id="eco-food" className="eco-food" />
                            </Link>
                            <Link to="/about/intro/flipHome" title="flipHome" className="eco"
                                onMouseOver={() => setTarget(4)}
                                onMouseLeave={() => setTarget(undefined)}
                                style={{ opacity: target === 4 || target === undefined ? "1" : "0.2" }}>
                                <img src={homePic} alt="eco-home" id="eco-home" className="eco-home" />
                            </Link>
                            <Link to="/about/intro/flipOffice" title="flipOffice" className="eco"
                                onMouseOver={() => setTarget(5)}
                                onMouseLeave={() => setTarget(undefined)}
                                style={{ opacity: target === 5 || target === undefined ? "1" : "0.2" }}>
                                <img src={officePic} alt="eco-office" id="eco-office" className="eco-office" />
                            </Link>
                        </div>
                        {/* <Modal show={show} onHide={handleClose} centered style={{ fontSize: "calc(10px + 0.4vw)" }}>
                            <Modal.Header closeButton>
                                <Modal.Title>重要通知</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>親愛的使用者您們好：</p>
                                <p>配合環保署主機更新作業，將於以下時間進行系統更新：</p>
                                <p>12月24日（六）、12月25日（日）</p>
                                <p>12月31日（六）、1月1日（日）</p>
                                <p className="m-0">若於更新期間進行系統操作，可能導致資料儲存異常，</p>
                                <p>建議若有相關需求，請提前完成，謝謝。</p>
                                <p>若有任何問題，請洽客服專線02-23611999#438</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#6c757d", borderColor: "#6c757d", fontSize: "calc(10px + 0.4vw)" }}>
                                    我了解了~
                                </Button>
                            </Modal.Footer>
                        </Modal> */}

                        <div className="main-icons-wrapper">
                            <div className="side-menu row">
                                <>
                                    <Link className="col-3" to="/en_Main" title="English">
                                        <ul>
                                            <li className="btn1 button">
                                                <i class="fab fa-pagelines" aria-hidden="true" alt="english-img"></i>
                                                <h2>English</h2>
                                            </li>
                                        </ul>
                                    </Link>
                                </>
                                <Link className="col-3" to="/about#intro" title="了解綠生活">
                                    <ul>
                                        <li className="btn1 button">
                                            <i className="fas fa-book" aria-hidden="true" alt="了解綠生活圖示"></i>
                                            <h2>
                                                了解綠生活
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                                <Link className="col-3" to="/categories" title="響應綠生活">
                                    <ul>
                                        <li className="btn2 button">
                                            <i className="fas fa-utensils" aria-hidden="true" alt="響應綠生活圖示"></i>
                                            <h2>
                                                響應綠生活
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                                <Link className="col-3" to="/searchEvent" title="參加綠生活">
                                    <ul>
                                        <li className="btn3 button">
                                            <i className="fas fa-hand-point-right" aria-hidden="true" alt="參加綠生活圖示"></i>
                                            <h2>
                                                參加綠生活
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                                <Link className="col-3" to="/daily" title="紀錄綠生活">
                                    <ul>
                                        <li className="btn4 button">
                                            <i className="fas fa-home" aria-hidden="true" alt="紀錄綠生活圖示"></i>
                                            <h2>
                                                紀錄綠生活
                                                {/* <span id="a">紀錄綠生活</span> */}
                                                {/* <span id="b">近期開放</span> */}
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                                <Link className="col-3" to="/greenLabel" title="申請環保標章">
                                    <ul>
                                        <li className="btn6 button">
                                            <img src={greenLogoIcon} className="button-img" style={{ width: "8%", height: "8%" }} aria-hidden="true" alt="申請環保標章圖示" />
                                            <h2>
                                                申請環保標章
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                                <Link className="col-3 link-shopping" to="/greenPurChase" title="加入綠色採購">
                                    <ul>
                                        <li className="btn7 button">
                                            <i className="fas fa-shopping-cart" aria-hidden="true" alt="加入綠色採購圖示"></i>
                                            <h2>
                                                加入綠色採購
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                                <Link className="col-3" to="/about#news" title="進入首頁">
                                    <ul>
                                        <li className="btn5 button">
                                            <i className="fas fa-location-arrow" aria-hidden="true" alt="進入首頁"></i>
                                            <h2>
                                                進入首頁
                                            </h2>
                                        </li>
                                    </ul>
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="footer-main">
                        <div className="content row">
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                {/* <div className="form-link-main">
                                    <a className="footer-main-link" href="https://docs.google.com/forms/d/e/1FAIpQLSfs0eoJ3-B6klu3KaKP28uSAsfQnCyqAShnyr_3Qd0_CY0Vew/viewform"
                                        target="_blank" rel="noreferrer noopener">我要填寫客服需求單</a>
                                </div> */}
                                <div className="d-flex">
                                    <Link className="footer-main-link" to="/EmailService" title="平台客服信箱鏈結">平台客服信箱</Link>
                                    <a className="footer-main-link" href={String(siteInfo.item7).split(",")[1]} title="網站政策及宣告鏈結">{String(siteInfo.item7).split(",")[0]}</a>
                                    <a className="footer-main-link" href={String(siteInfo.item10).split(",")[1]} title="意見信箱鏈結">{String(siteInfo.item10).split(",")[0]}</a>
                                </div>
                            </div>
                            <div className="row footer-text col-sm-12 col-md-12 col-lg-9 justify-content-center">

                                <div className="col-sm-12 col-md-6">
                                    <div className="main-address"><p>地址:{siteInfo.item3}</p></div>
                                    <div className="main-date"><p>更新日期:{siteInfo.item9}</p></div>
                                    <div className="main-visited"><p>瀏覽人次:{visitedCount}</p></div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="main-rights">
                                        <p>{siteInfo.item1}&nbsp;&nbsp;
                                            <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20220908164911" title="無障礙網站">
                                                <img src={accessibility} border="0" width="88" height="31" alt="通過A無障礙網頁檢測" />
                                            </a>
                                        </p>
                                    </div>
                                    <div className="main-phone"> <p>聯絡電話: {siteInfo.item4}</p></div>
                                    {/* <div className="main-contact"> <div>{items.map((items, index) =>
                                        <p key={index}>{items}</p>
                                    )}</div></div> */}
                                    <div>
                                        <div>
                                            <p>若您有本網頁系統操作問題請洽詢 <a href="/CallService" target="_blank" rel="noreferrer noopener" className="call-line" title="諮詢專線鏈結">諮詢專線(另開視窗)</a></p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                {/* </div> */}
            </HelmetProvider>

        </>
    );
}
export default Main;