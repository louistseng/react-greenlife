import React, { useState, useEffect } from 'react';
import '../GreenShop.scss';
import { Link, withRouter } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';
import SideBtnOffice from '../Components/SideBtnOffice';

import greenLogo from '../images1/greenLogo.gif';
import greenLogo2 from '../images1/greenLogo2.png';
import shopBanner from '../images1/greenShop/shop_banner.jpg';
import { clickRecord } from '../utils/API';
import { formatDate } from '../utils/Functions';
import { HashLink } from 'react-router-hash-link';
import iconset from '../images1/greenShop/greenshop-iconset.png';
import sixPointer1 from '../images1/greenShop/1.png';
import sixPointer2 from '../images1/greenShop/2.png';
import sixPointer3 from '../images1/greenShop/3.png';
import sixPointer4 from '../images1/greenShop/4.png';
import sixPointer5 from '../images1/greenShop/5.png';
import sixPointer6 from '../images1/greenShop/6.png';
import greenArrow from '../images1/greenShop/green-arrow.png';
import oIcon from '../images1/greenShop/ok.png';
import xIcon from '../images1/greenShop/no.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
//const TourBanner = React.lazy(() => import('../Components/TourBanner'))

function GreenShop(props) {

    let history = useHistory()
    //let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    //let resFormal = "https://greenliving.epa.gov.tw";
    //let resTest = "https://greenliving.eri.com.tw";

    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainFormalBack = "greenliving.epa.gov.tw"

    const [artData, setArtData] = useState([]);
    const count = "8";
    const themeId = "2";
    // console.log(window.location.hostname)

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("01A0F973-A5A3-40FB-98C1-4B47FB97D616", "9", collector)
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

    // Modal服務諮詢專線遮罩
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isModalFirstPage, setIsModalFirstPage] = useState(true);
    const style = {
        hide: {
            display: "none"
        },
        show: {
            display: ""
        }
    };
    // 處理關閉Modal並重置為預設分頁
    const closeModalAndInit = () => {
        setIsModalFirstPage(true);
        handleClose();
    };

    return (
        <>
            <BreadCrumb currentPage="綠色商店介紹" />{/*   */}
            <div className="">
                <div className={`shop bigbanner mb-3`}>
                    <img className="relative banner" src={shopBanner} width="100%" height="100%" alt="綠色商店Banner" title="綠色商店Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/GreenShopIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色商店介紹圖示"></i>
                                &nbsp;綠色商店介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenShopSearch`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="綠色商店查詢圖示"></i>
                                &nbsp;綠色商店查詢
                            </button>
                        </Link>
                        <Link to={`/categories/GreenShopIntro/GreenShopApply`} className="btn-link">
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入綠色商店圖示"></i>
                                &nbsp;加入綠色商店
                            </button>
                        </Link>
                        <Link to={`/categories/GreenShopDownload`} className="btn-link">
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

                    <div className="shop-intro-title">
                        <h1 className="shop-title">最新消息</h1>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="d-flex justify-content-start">
                                    <h2 className="rs-intro-subtitle">{artData.typeName}</h2>
                                    <a target="_blank" rel="noopener noreferrer" href={artData.href}>
                                        <div className="subtitle-content">
                                            <h3>{artData.startTime}  {artData.title}</h3>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="shop-intro-title">
                        <h2 className="shop-title">綠色商店</h2>
                        <div className="intro-content">
                            <div>
                                <h3>&emsp;&emsp;「綠色商店」，意即該賣場內販售「綠色商品」，而「綠色商品」是指經政府驗證通過取得環保標章、節能標章、
                                    省水標章、綠建材標章等，有綠色標章的產品或服務。</h3>
                                <h3>&emsp;&emsp;102年度起更進一步結合網路購物平台設置了網路綠色商店，並落實綠色商店設置規範及綠色商店教育功能，強
                                    化民眾對於「環保標章」認識及「綠色消費」的認同，鼓勵優先購買環境保護相關產品，促進綠色產業發展及減少
                                    對環境負面衝擊，以提升環境品質。</h3>

                            </div>
                            <div style={{ textAlign: "center" }}>
                                <img src={iconset} className="w-100" alt="綠色商店綠色標章集合圖" title="綠色商店綠色標章集合圖" />{/*shop-iconSet-img */}
                            </div>
                        </div>
                    </div>


                    <div style={{ position: "relative" }} className="shop-intro-title">
                        <h2 className="shop-title">綠色商店6大指標</h2>
                        <div className="shop-icon-wrapper">
                            <div className="shop-icon-wrapper">
                                <div className="intro-circle" style={{ borderColor: "#DBE3F2" }}>
                                    <div className="top-box">
                                        <img src={sixPointer1} alt="綠色商品導入與管理" title="綠色商品導入與管理" />
                                        <div className="inner-text"><h3>綠色商品<br />導入與管理</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#B7C7E4" }}>
                                    <div className="top-box">
                                        <img src={sixPointer2} alt="綠色行銷推廣" title="綠色行銷推廣" />
                                        <div className="inner-text"><h3>綠色行銷<br />推廣</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#93AAD8" }}>
                                    <div className="top-box">
                                        <img src={sixPointer3} alt="賣場環保概念" title="賣場環保概念" />
                                        <div className="inner-text"><h3>賣場<br />環保概念</h3></div>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-icon-wrapper">
                                <div className="intro-circle" style={{ borderColor: "#4373BE" }}>
                                    <div className="top-box">
                                        <img src={sixPointer4} alt="綠色消費觀念宣導" title="綠色消費觀念宣導" />
                                        <div className="inner-text"><h3>綠色消費<br />觀念宣導</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#365692" }}>
                                    <div className="top-box">
                                        <img src={sixPointer5} alt="參與或辦理環保活動" title="參與或辦理環保活動" />
                                        <div className="inner-text"><h3>參與或辦理<br />環保活動</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#243961" }}>
                                    <div className="top-box">
                                        <img src={sixPointer6} alt="資源回收宣導" title="資源回收宣導" />
                                        <div className="inner-text"><h3>資源回收<br />宣導</h3></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="go-wrapper shop-intro-title">
                        <h2 className="shop-title">業者申請 請看這！</h2>
                        <div className="shop-business-apply-wrapper">
                            <div className="shop-business-apply-wrapper">
                                <div className="btn-list">
                                    <div className="green-btn-long"><h3>網路綠色商店</h3></div>
                                    <div className="green-btn-long"><h3>實體連鎖型<br />綠色商店</h3></div>
                                    <div className="green-btn-long"><h3>實體非連鎖型<br />綠色商店</h3></div>
                                </div>
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStore" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopApply`}>
                                        <div className="yellow-btn-high">
                                            <div>
                                                <h3>線上申請</h3>
                                                <span>(看更多請點我)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <img src={greenArrow} alt="流程方向箭頭" />
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStoreReview" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopReview`}>
                                        <div className="yellow-btn-high">
                                            <div>
                                                <h3>審查</h3>
                                                <span>(看更多請點我)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <img src={greenArrow} alt="流程方向箭頭" />
                            </div>
                            <div className="shop-business-apply-wrapper">
                                <div className="btn-list">
                                    <div className="yellow-btn">
                                        <div>
                                            <h3>通過</h3>
                                            <img src={oIcon} alt="通過" />
                                        </div>
                                    </div>
                                    <div className="red-btn">
                                        <div>
                                            <h3>不通過</h3>
                                            <img src={xIcon} alt="不通過" />
                                        </div>
                                    </div>
                                </div>
                                <img src={greenArrow} alt="流程方向箭頭" />
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStoreReview" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopReview`}>
                                        <div className="yellow-btn-high" style={{ backgroundColor: "rgb(202, 222, 184)" }}>
                                            <div>
                                                <h3 style={{ color: "rgb(47, 65, 31)" }}>成為<br />綠色商店</h3>
                                                <span>(看更多請點我)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStoreTrack" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopTrack`}>
                                        <div className="yellow-btn-bottom">
                                            <div>
                                                <h3>業者<br />定期<br />更新</h3>
                                                <span>(看更多請<br />點我)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="btn-list">
                                    <Link to={`/categories/GreenShopIntro/GreenShopStatistics`}>
                                        <div className="yellow-btn-bottom">
                                            <div>
                                                <h3>查看<br />歷年<br />新增<br />家數</h3>
                                                <span>(看更多請<br />點我)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shop-intro-title-noline" style={{ position: "relative", textAlign: "center" }}>
                        <h2><a href="#" onClick={handleShow} className="shop-title">常見問題<br />&<br />諮詢電話</a></h2>
                        <div>
                            <Modal show={show} onHide={closeModalAndInit} size="xl" centered="true">
                                <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "calc(16px + 1vw)" }}>常見問題&諮詢電話</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="pageChangeBtnDiv">
                                        <a href="#" onClick={() => setIsModalFirstPage(true)} className={isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>常見問題</a>
                                        <a href="#" onClick={() => setIsModalFirstPage(false)} className={!isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>諮詢電話</a>
                                    </div>
                                    <div className="pageChangeContent">
                                        <div style={isModalFirstPage ? style.show : style.hide}>
                                            <div className="div-flex-wrap">
                                                <div className="text-center w-50">
                                                    <div className="shop-title" style={{ height: "4em" }}>機關綠色消費採購</div>
                                                    <div className="row justify-content-around pb-3">
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=284`} target="_blank">
                                                                <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true" alt="制度教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>制度教學文件<br />(PDF格式)</span></a>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=336`} target="_blank">
                                                                <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true" alt="系統教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>系統教學文件<br />(PDF格式)</span></a>
                                                        </div>
                                                        <div className="col-11 mt-3"></div>
                                                    </div>
                                                </div>
                                                <div className="text-center w-50">
                                                    <div className="shop-title" style={{ height: "4em" }}>民間企業與團體綠色採購</div>
                                                    <div className="row justify-content-around pb-3">
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=524`} target="_blank">
                                                                <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true" alt="制度教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>制度教學文件<br />(ZIP格式)</span></a>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=479`} target="_blank">
                                                                <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true" alt="系統教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>系統教學文件<br />(PDF格式)</span></a>
                                                        </div>
                                                        <div className="col-11 mt-3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-100"><Link to={`/greenLabel/GreenMarkIntroMarkApply`} target="_blank">
                                                    <div className="servicebox mt-3 green-title" style={{ fontSize: "calc(10px + 1vw)" }}>
                                                        申請環保標章
                                                    </div>
                                                </Link></div>
                                                <div className="w-100"><a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=196`}>
                                                    <div className="servicebox mt-3 green-title" style={{ fontSize: "calc(10px + 1vw)" }}>
                                                        <div className="div-flex-wrap justify-content-center"><div className="text-right">環保標章申請系統操作說明</div><div className="text-left">(PDF格式)</div></div>
                                                    </div>
                                                </a></div>
                                            </div>
                                        </div>

                                        <table className="shop-contact-table" style={!isModalFirstPage ? style.show : style.hide}>
                                            <tr style={{ backgroundColor: "#D7D7D7" }}>
                                                <th style={{ width: "32em", height: "3em" }}>諮詢項目</th>
                                                <th style={{ width: "22em", height: "3em" }}>單位名稱</th>
                                                <th style={{ width: "40em", height: "3em" }}>聯絡方式</th>
                                            </tr>
                                            <tr>
                                                <td rowSpan="2">綠色商店－申請制度</td>
                                                <td>財團法人環境與發展基金會</td>
                                                <td>0800-300-556</td>
                                            </tr>
                                            <tr>
                                                <td>各縣市環保局</td>
                                                <td>各縣市環保局</td>
                                            </tr>
                                            <tr>
                                                <td>綠色商店－線上申請操作</td>
                                                <td>環資國際有限公司</td>
                                                <td>(02)2361-1999#438<br /><Link to="/EmailService" title="寄信至系統客服信箱" target="_blank">寄信至系統客服信箱</Link></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={closeModalAndInit} style={{ fontSize: "1em", padding: "0.375em 0.75em" }}>關閉</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>

                </div>
                <SideBtn history={history} />
                <SideBtnOffice history={useHistory()} type={"綠色餐廳"} />
            </div>
            <Footer />

        </>
    );
}

export default withRouter(GreenShop);