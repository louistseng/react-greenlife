import React, { useState, useEffect } from 'react';
import '../GreenProduct.scss';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import greenLogo from '../images1/greenLogo.gif';
import serviceLogo from '../images1/greenProduct/service_mark.png';
import labelBanner from '../images1/greenProduct/label_banner.jpg';
import { clickRecord } from '../utils/API';
import recycleW from '../images1/greenProduct/white-recycle.png';
import leafW from '../images1/greenProduct/white-leaf.png';
import handW from '../images1/greenProduct/white-hand.png';
import qmark from '../images1/greenProduct/qmark.png';
import imark from '../images1/greenProduct/imark.png';
import good1 from '../images1/greenProduct/good1.png';
import good2 from '../images1/greenProduct/good2.png';
import good3 from '../images1/greenProduct/good3.png';
import good4 from '../images1/greenProduct/good4.png';
import good5 from '../images1/greenProduct/good5.png';
import sepLine from '../images1/greenProduct/sepline.png';
import blueArrow from '../images1/greenProduct/blue-arrow.png';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));

function GreenProduct(props) {

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
        clickRecord("EA14CB94-2D43-48C2-A5DD-375E0EA2E99B", "11", collector)
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
            <BreadCrumb currentPage={"環保產品介紹"} />
            <div className="">
                <div className={`product bigbanner mb-3`}>
                    <img className="relative banner" src={labelBanner} width="100%" height="100%" alt="環保產品Banner" title="環保產品Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/GreenProductIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="環保產品介紹圖示"></i>
                                &nbsp;環保產品介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenProductSearch`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-search" aria-hidden="true" alt="環保產品查詢圖示"></i>
                                &nbsp;環保產品查詢
                            </button>
                        </Link>
                        <Link to={`/categories/GreenSpecificationSearch`} className="btn-link">
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-search" aria-hidden="true" alt="環保標章規格查詢圖示"></i>
                                &nbsp;環保標章規格查詢
                            </button>
                        </Link>
                        <a href={`/greenLabel/GreenMarkIntroMarkApply`} className="btn-link" title="加入環保產品鏈結">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入環保產品圖示"></i>
                                &nbsp;加入環保產品
                                {/* <span id="e"> &nbsp;加入綠色餐廳</span>
                            <span id="f">&nbsp;&nbsp;近期開放</span> */}
                            </button>
                        </a>
                        <Link to={`/categories/GreenProductDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="container">
                    {/* <div className="register-btn-wrapper">
                        <a className="register" href="https://greenliving.eri.com.tw/GreenLife/GreenRestaurantNew/DefaultGR.aspx?m=New" target="_blank" rel="noopener noreferrer">我要申請綠色餐廳資格</a>
                    </div> */}

                    <div className="product-intro-title">
                        <h1 className="green-product-title">最新消息</h1>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="d-flex justify-content-start">
                                    <h2 className="rs-intro-subtitle">{artData.typeName}</h2>
                                    <a target="_blank" rel="noopener noreferrer" href={artData.href} title="{artData.title}(在新視窗開啟鏈結)">
                                        <div className="subtitle-content">
                                            <h3>{artData.startTime}  {artData.title}</h3>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="product-intro-title">
                        <h2 className="green-product-title">環保標章</h2>
                        <div className="intro-content">
                            <div>
                                <h3>&emsp;&emsp;「一片綠色樹葉包裹著純淨、不受污染的地球」是環保標章的圖樣形象。我們透過環保標章制度，來
                                    鼓勵廠商製造產品時，考量降低環境污染及節省資源，並促進廢棄物減量及回收再利用，同時也來喚醒消
                                    費者慎選可回收、低污染、省資源的產品，共同提昇環境品質。</h3>

                            </div>
                            <iframe className="video-wrapper" src={`https://www.youtube.com/embed/r87su5BcxZY`} title="可回收低污染省資源。環保標章護家園"></iframe>
                        </div>
                    </div>


                    <div style={{ position: "relative" }} className="product-intro-title">
                        <h2 className="green-product-title">環保標章三大環保理念</h2>
                        <div id="three_actions" style={{ position: "absolute", top: "-150px", left: "0" }}></div>
                        <div className="product-green-btn-wrapper">
                            <div className="product-green-btn">
                                <div className="top-box">
                                    <img src={recycleW} alt="可回收" />
                                    <h3>可回收</h3>
                                </div>
                            </div>
                            <div className="product-green-btn">
                                <div className="top-box">
                                    <img src={leafW} alt="低汙染" />
                                    <h3>低汙染</h3>
                                </div>
                            </div>
                            <div className="product-green-btn">
                                <div className="top-box">
                                    <img src={handW} alt="低汙染" />
                                    <h3>省資源</h3>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="go-wrapper product-intro-title">
                        <h2 className="green-product-title">跟著環保署一起深入了解！</h2>
                        <div>
                            <div className="product-green-btn-wrapper">
                                {/*<div className="moreInfo">
                                    <div className="product-li">
                                        <img src={qmark} className="li-qmark" alt="" title="" />
                                        <h6 className="li-text">啥米！環保標章還有分第二級環保標章？</h6>
                                    </div>
                                    <div className="product-li">
                                        <img src={qmark} className="li-qmark" alt="" title="" />
                                        <h6 className="li-text">啥米！環保標章還有分服務類環保標章？</h6>
                                    </div>
                                    <div className="product-li">
                                        <img src={qmark} className="li-qmark" alt="" title="" />
                                        <h6 className="li-text">啥米！服務類環保標章還有分金、銀、銅級？</h6>
                                    </div>
                                    <div className="product-li">
                                        <img src={imark} className="li-imark" alt="" title="" />
                                        <h6 className="li-text">趕快來跟我們一起走進環保標章大知識吧！</h6>
                                    </div>
                                </div>*/}
                                <div className="product-img-wrapper w-100" style={{ justifyContent: "space-evenly" }}>
                                    {/*<a href={"https://greenliving.epa.gov.tw/newPublic/MarkApply/SeviceFirst#a1"} target="_blank">*/}
                                    <div>
                                        <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceFirst`}>
                                            <div className="intro-circle-btn">
                                                <img src={serviceLogo} className="inner-img1" alt="深入了解服務類環保標章" />
                                                <div className="inner-text">
                                                    <p>點我深入了解</p>
                                                    <h3>服務類<br />環保標章</h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        {/*<a href="https://greenliving.epa.gov.tw/newPublic/GreenMark/First" target="_blank">*/}
                                        <Link to={`/greenLabel/GreenMarkIntroFirst`}>
                                            <div className="intro-circle-btn">
                                                <img src={greenLogo} className="inner-img2" alt="深入了解環保標章" />
                                                <div className="inner-text">
                                                    <p>點我深入了解</p>
                                                    <h3>環保標章</h3>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-intro-title-noline">
                        <div style={{ position: "relative" }} className="recom-agency">
                            <h2 className="green-product-title">取得環保標章的5大好處</h2>
                        </div>
                        <div className="product-five-benefit-wrapper">
                            <div>
                                <img src={good1} alt="取得環保標章的5大好處-滿足環保消費需求" title="取得環保標章的5大好處-滿足環保消費需求" />
                                <h3>滿足環保<br />消費需求</h3>
                            </div>
                            <div>
                                <img src={good2} alt="取得環保標章的5大好處-降低服務營運成本" />
                                <h3>降低服務<br />營運成本</h3>
                            </div>
                            <div>
                                <img src={good3} alt="取得環保標章的5大好處-提升企業綠色形象" />
                                <h3>提升企業<br />綠色形象</h3>
                            </div>
                            <div>
                                <img src={good4} alt="取得環保標章的5大好處-市場區隔行銷推廣" />
                                <h3>市場區隔<br />行銷推廣</h3>
                            </div>
                            <div>
                                <img src={good5} alt="取得環保標章的5大好處-機關民間綠色採購" />
                                <h3>機關民間<br />綠色採購</h3>
                            </div>
                        </div>
                    </div>

                    <img src={sepLine} className="w-100" alt="圖示" title="圖示" />

                    <div style={{ position: "relative" }} className="product-intro-title">
                        <h2 className="green-product-title">業者申請 請看這！</h2>
                        <div className="product-business-apply-wrapper">
                            <div className="product-business-apply-wrapper">
                                <div className="product-business-apply-block" style={{ backgroundColor: "#E0EBF6" }}>
                                    <h3>檢視規格<br />標準及申<br />請條件</h3>
                                </div>
                                <div className="product-business-apply-block" style={{ backgroundColor: "#C1D7EC" }}>
                                    <h3>準備<br />應備文件</h3>
                                </div>
                                <div className="product-business-apply-block" style={{ backgroundColor: "#A4C3E3" }}>
                                    <h3>審驗機構<br />審查</h3>
                                </div>
                            </div>
                            <div className="product-business-apply-wrapper">
                                <div className="product-business-apply-block" style={{ backgroundColor: "#78A6D5" }}>
                                    <h3>線上入口<br />申請</h3>
                                </div>
                                <div className="product-business-apply-block" style={{ backgroundColor: "#5C93CE" }}>
                                    <h3>頒發證書</h3>
                                </div>
                            </div>
                        </div>
                        <div className="product-business-apply-wrapper">
                            <div className="hint-block">
                                <div className="inner-text">
                                    <img src={blueArrow} alt="綜整好制度及法規的指引" />
                                    <h3>綜整好制度及<br />法規的指引</h3>
                                </div>
                                {/*<a href="https://greenliving.epa.gov.tw/newPublic/MarkApply" target="_blank">*/}
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}>
                                    <div className="circle-btn inner-text"><h3>環保標章<br />申請指引<br />點我</h3></div>
                                </Link>
                            </div>
                            <div className="hint-block">
                                <div className="inner-text">
                                    <img src={blueArrow} alt="了解、加入服務類標章的指引" />
                                    <h3>了解、加入服務類<br />標章的指引</h3>
                                </div>
                                {/*<a href="https://greenliving.epa.gov.tw/newPublic/MarkApply/SeviceIndex" target="_blank">*/}
                                <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}>
                                    <div className="circle-btn inner-text"><h3>服務類<br />環保標章<br />申請指引<br />點我</h3></div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div style={{ position: "relative", textAlign: "center" }} className="product-intro-title-noline">
                        <h2><a href="#" onClick={handleShow} className="green-product-title">常見問題<br />&<br />諮詢電話</a></h2>
                        <div>
                            <Modal show={show} onHide={closeModalAndInit} size="xl" centered="true">
                                <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "calc(16px + 1vw)" }}>常見問題&諮詢電話</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="pageChangeBtnDiv">
                                        <a href="#" onClick={() => setIsModalFirstPage(true)} className={isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"} title="常見問題鏈結">常見問題</a>
                                        <a href="#" onClick={() => setIsModalFirstPage(false)} className={!isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"} title="諮詢電話鏈結">諮詢電話</a>
                                    </div>
                                    <div className="pageChangeContent">
                                        <div style={isModalFirstPage ? style.show : style.hide}>
                                            <div className="div-flex-wrap">
                                                <div className="text-center w-50">
                                                    <div className="green-product-title" style={{ height: "4em" }}>機關綠色消費採購</div>
                                                    <div className="row justify-content-around pb-3">
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=284`} target="_blank" title="制度教學文件(在新視窗開啟鏈結)">
                                                                <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true" alt="制度教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>制度教學文件<br />(PDF格式)</span></a>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=336`} target="_blank" title="系統教學文件(在新視窗開啟鏈結)">
                                                                <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true" alt="系統教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>系統教學文件<br />(PDF格式)</span></a>
                                                        </div>
                                                        <div className="col-11 mt-3"></div>
                                                    </div>
                                                </div>
                                                <div className="text-center w-50">
                                                    <div className="green-product-title" style={{ height: "4em" }}>民間企業與團體綠色採購</div>
                                                    <div className="row justify-content-around pb-3">
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=524`} target="_blank" title="制度教學文件(在新視窗開啟鏈結)">
                                                                <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true" alt="制度教學文件圖示"></i></div><span style={{ lineHeight: "1.5em" }}>制度教學文件<br />(ZIP格式)</span></a>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=479`} target="_blank" title="系統教學文件(在新視窗開啟鏈結)">
                                                                <div className="fas-icon" alt="系統教學文件圖示"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true"></i></div><span style={{ lineHeight: "1.5em" }}>系統教學文件<br />(PDF格式)</span></a>
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
                                                <div className="w-100"><a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=196`} title="環保標章申請系統操作說明鏈結">
                                                    <div className="servicebox mt-3 green-title" style={{ fontSize: "calc(10px + 1vw)" }}>
                                                        <div className="div-flex-wrap justify-content-center"><div className="text-right">環保標章申請系統操作說明</div><div className="text-left">(PDF格式)</div></div>
                                                    </div>
                                                </a></div>
                                            </div>
                                        </div>

                                        <table className="product-contact-table" style={!isModalFirstPage ? style.show : style.hide}>
                                            <tr style={{ backgroundColor: "#D7D7D7" }}>
                                                <th style={{ width: "32em", height: "3em" }}>諮詢項目</th>
                                                <th style={{ width: "22em", height: "3em" }}>單位名稱</th>
                                                <th style={{ width: "40em", height: "3em" }}>聯絡方式</th>
                                            </tr>
                                            <tr>
                                                <td rowSpan="2">環保標章－申請與驗證</td>
                                                <td>財團法人台灣商品檢測驗證中心</td>
                                                <td>(03)328-0026#139</td>
                                            </tr>
                                            <tr>
                                                <td>財團法人環境與發展基金會</td>
                                                <td>0800-300-556<br />（如電話無人接聽時，<br />請改寄電子郵件至<br /><a href="mailto:victor@edf.org.tw" target="_blank" title="財團法人環境與發展基金會(在新視窗開啟鏈結)">victor@edf.org.tw</a>)</td>
                                            </tr>
                                            <tr>
                                                <td>環保標章－系統操作</td>
                                                <td>環資國際有限公司</td>
                                                <td>(02)2361-1999#438<br /><Link to="/EmailService" title="寄信至系統客服信箱" target="_blank">寄信至系統客服信箱</Link></td>
                                                {/* <td>(02)2361-1999#438<br /><a href="mailto:victor@edf.org.tw" target="_blank" title="環資國際有限公司(在新視窗開啟鏈結)">寄信至系統客服信箱</a></td> */}
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
            </div>
            <Footer />

        </>
    );
}

export default withRouter(GreenProduct);