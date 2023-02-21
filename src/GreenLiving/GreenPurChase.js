import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import { useHistory } from "react-router-dom";
import { clickRecord } from '../utils/API';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import purchaseBanner from '../images1/img/banner_buy_small.jpg';
import pieJpg from '../images1/img/pie.jpg';
import affairBar from '../images1/greenLiving/affairGreenPurchaseBar.png';
import peopleBar from '../images1/greenLiving/peopleGreenPurchaseBar.jpg';
import icon3D_01 from '../images1/img/icon_3D_01.png';
import icon3D_02 from '../images1/img/icon_3D_02.png';
import bannerLink1 from '../images1/img/banner_link_01.jpg';
import bannerLink3 from '../images1/img/banner_link_03.jpg';
import bannerLink4 from '../images1/img/banner_link_04.png';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));

function GreenPurChase(props) {
    let history = useHistory()
    let SSL = "https:"
    let domainFormalFront = "greenliving.epa.gov.tw/newPublic"
    let domainFormalBack = "greenliving.epa.gov.tw"

    // 測試機domain
    let testSSL = props.SSL;
    let testdomainFormal = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";


    const [newsData, setNewsData] = useState([]);

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("D104FC4C-FE39-43D4-9C0E-FB68EB2C4060", "23-2", collector)
    }, [collector]);

    //fetch最新消息
    useEffect(() => {
        fetch(`${SSL}//${testdomainFormal}/APIs/News/`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setNewsData(result.Detail);
            });
    }, [SSL, testdomainFormal]);

    // Modal服務諮詢專線遮罩
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isModalFirstPage, setIsModalFirstPage] = useState(true);
    // 處理關閉Modal並重置為預設分頁
    const closeModalAndInit = () => {
        setIsModalFirstPage(true);
        handleClose();
    };

    // 推動成果資料選擇
    const [isAffair, setIsAffair] = useState(false);
    const style = {
        hide: {
            display: "none"
        },
        show: {
            display: ""
        }
    };

    return (
        <>
            {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine"></link>*/}
            <BreadCrumb currentPage="【標章及採購】綠色採購" />
            <div className=""><img src={purchaseBanner} className="w-100 banner" alt="Bnner" /></div>
            <div className=" container">
                <div className="row ">
                    <div className="col-lg-5 col-md-12 mt-2">
                        <div className="p-3 bgwhite newsbox bluebar">
                            <div><h1>最新消息</h1></div>
                            {newsData.filter(function (data) { return data.NClasses[0] != "英文專區" ? true : false; })//排除英文最新消息
                                .sort((a, b) => a.IsImportant >= b.IsImportant ? 1 : -1)
                                .sort((a, b) => a.OnlineDt <= b.OnlineDt ? 1 : -1)
                                .slice(0, 5).map(data =>
                                    <div>
                                        <i className="bluetext" aria-hidden="true">{new Date(data.OnlineDt).toLocaleDateString()}</i>
                                        <i className={data.IsImportant == 1 ? "hottext" : ""} aria-hidden="true">{data.IsImportant == 1 ? "HOT!" : ""}</i>
                                        <Link to={`/searchEvent/eventDetail?news=${data.Id}`} target="_blank" title="另開視窗">{data.Subject}</Link>
                                    </div>
                                )}

                            <div className="col-12 greenbtn text-center "><Link to="/searchEvent?localNews" title="前往連結">更多消息</Link></div>

                        </div>

                    </div>

                    <div className="col-lg-7 col-md-12 mt-2">
                        <div className="row">
                            <div className="col-12 greenbar">
                                <h2>推動成果</h2>
                            </div>

                            <div className="col-12 resultbar mt-2">
                                <div className="col-12 greenbtn text-center">
                                    <a href="#Gov" title="機關綠採鏈結" onClick={() => setIsAffair(false)}>機關綠採</a>
                                    <a href="#Aff" title="民間綠採鏈結" onClick={() => setIsAffair(true)}>民間綠採</a>
                                </div>
                                <div className="col-12 text-center">
                                    <img src={pieJpg} style={isAffair ? style.hide : style.show} width="100%" alt="圖示-1" />
                                    <img src={affairBar} style={isAffair ? style.show : style.hide} width="80%" alt="圖示-2" />
                                    <img src={peopleBar} style={isAffair ? style.show : style.hide} width="80%" alt="圖示-3" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <!-- 2個連結--> */}
                <div className="row introduce justify-content-between mt-3" >
                    <div className="col-lg-6 col-md-6 col-12">
                        {/*<a href={`${SSL}//${domainFormalFront}/GreenPurchase/Government`} target="_blank">*/}{/*to="/greenPurChase/GreenPurChaseOrgan"*/}
                        <Link to={`/greenPurChase/GreenPurchaseIntroLaw`}>
                            <div className="pt-3"><img src={icon3D_01} width="30%" height="30%" alt="前往連結" /></div>
                            <div>了解機關綠色消費採購</div>
                        </Link>
                        <div className="row justify-content-around pb-3">
                            <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=284`} title="制度教學文件(另開視窗)" target="_blank">
                                    <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true"></i></div>
                                    <div className="div-flex-wrap justify-content-center"><div className="text-right text-height">制度教學文件</div><div className="text-left text-height">(PDF格式)</div></div>
                                </a>
                            </div>
                            <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=336`} title="系統教學文件(另開視窗)" target="_blank">
                                    <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true"></i></div>
                                    <div className="div-flex-wrap justify-content-center"><div className="text-right text-height">系統教學文件</div><div className="text-left text-height">(PDF格式)</div></div>
                                </a>
                            </div>
                            <div className="col-11 mt-3"></div>
                        </div>
                        <div className="paperbtn mt-3">
                            <a href="https://greenliving.epa.gov.tw/GreenLife/Anonymous/LoginById.aspx" title="登入系統申報機關綠色採購(另開視窗)" target="_blank">
                                <div className="fas-icon"><i className="col-12 fas fa-school fa-fw fa-3x" aria-hidden="true"></i></div>
                                登入系統申報機關綠色採購</a>
                        </div>
                        <div className="col-11 mt-3"></div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                        {/*<a href={`${SSL}//${domainFormalFront}/Application/PrivateEnterprises`} target="_blank">*/}{/*to="/greenPurChase/GreenPurChaseAffair"*/}
                        <Link to={`/greenPurChase/GreenPurchaseIntroPriEnterprises`} title="前往連結">
                            <div className="pt-3"><img src={icon3D_02} width="30%" height="30%" alt="前往連結" /></div>
                            <div>了解民間企業與團體綠色採購</div>
                        </Link>
                        <div className="row justify-content-around pb-3">
                            <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=524`} title="制度教學文件(另開視窗)" target="_blank">
                                    <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true"></i></div>
                                    <div className="div-flex-wrap justify-content-center"><div className="text-right text-height">制度教學文件</div><div className="text-left text-height">(ZIP格式)</div></div>
                                </a>
                            </div>
                            <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=479`} title="系統教學文件(另開視窗)" target="_blank">
                                    <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true"></i></div>
                                    <div className="div-flex-wrap justify-content-center"><div className="text-right text-height">系統教學文件</div><div className="text-left text-height">(PDF格式)</div></div>
                                </a>
                            </div>
                            <div className="col-11 mt-3"></div>
                        </div>
                        <div className="paperbtn mt-3">
                            <a href="https://greenliving.epa.gov.tw/GreenLife/PurChaseRpt/login.aspx" title="登入系統申報民間企業與團體綠色採購(另開視窗)" target="_blank">
                                <div className="fas-icon"><i className="col-12 fas fa-city fa-fw fa-3x" aria-hidden="true"></i></div>
                                登入系統申報民間企業與團體綠色採購
                            </a>
                        </div>
                        <div className="col-11 mt-3"></div>
                    </div>


                </div>

                {/* <!-- 服務諮詢專線--> */}
                <div className="col-12 servicebox mt-3"><a href="#" onClick={handleShow}><div className=""><i className="fas fa-search p-1" aria-hidden="true"></i>服務諮詢專線</div></a></div>
                <div>
                    <Modal show={show} onHide={closeModalAndInit} size="xl" centered="true">
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: "calc(16px + 1vw)" }}>服務諮詢專線</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="pageChangeBtnDiv">
                                <a href="#" title="常見問題鏈結" onClick={() => setIsModalFirstPage(true)} className={isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>常見問題</a>
                                <a href="#" title="諮詢電話鏈結" onClick={() => setIsModalFirstPage(false)} className={!isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>諮詢電話</a>
                            </div>
                            {/* 常見問題 */}
                            <div className="pageChangeContent">
                                <div style={isModalFirstPage ? style.show : style.hide}>
                                    <div className="div-flex-wrap">
                                        <div className="text-center w-50">
                                            <div className="green-title" style={{ height: "4em" }}>機關綠色消費採購</div>
                                            <div className="row justify-content-around pb-3">
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=284`} target="_blank" title="制度教學文件(在新視窗開啟鏈結)">
                                                        <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true"></i></div><span style={{ lineHeight: "1.5em" }} aria-hidden="true">制度教學文件<br />(PDF格式)</span></a>
                                                </div>
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=336`} target="_blank" title="系統教學文(在新視窗開啟鏈結)">
                                                        <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true"></i></div><span style={{ lineHeight: "1.5em" }} aria-hidden="true">系統教學文件<br />(PDF格式)</span></a>
                                                </div>
                                                <div className="col-11 mt-3"></div>
                                            </div>
                                        </div>
                                        <div className="text-center w-50">
                                            <div className="green-title" style={{ height: "4em" }}>民間企業與團體綠色採購</div>
                                            <div className="row justify-content-around pb-3">
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=524`} target="_blank" title="制度教學文件(在新視窗開啟鏈結)">
                                                        <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true"></i></div><span style={{ lineHeight: "1.5em" }}>制度教學文件<br />(ZIP格式)</span></a>
                                                </div>
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=479`} target="_blank" title="系統教學文件(在新視窗開啟鏈結)">
                                                        <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true"></i></div><span style={{ lineHeight: "1.5em" }}>系統教學文件<br />(PDF格式)</span></a>
                                                </div>
                                                <div className="col-11 mt-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="text-center">
                                        <div className="w-100"><Link to={`/greenLabel/GreenMarkIntroMarkApply`} target="_blank">
                                            <div className="servicebox mt-3 green-title">
                                                申請環保標章
                                            </div>
                                        </Link></div>
                                        <div className="w-100"><a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=196`}>
                                            <div className="servicebox mt-3 green-title">
                                                <div className="div-flex-wrap justify-content-center"><div className="text-right">環保標章申請系統操作說明</div><div className="text-left">(PDF格式)</div></div>
                                            </div>
                                        </a></div>
                                    </div>*/}
                                </div>
                                {/* 諮詢電話 */}
                                <table className="shop-contact-table" style={!isModalFirstPage ? style.show : style.hide}>
                                    <tr style={{ backgroundColor: "#D7D7D7" }}>
                                        <th style={{ width: "32em", height: "3em" }}>諮詢項目</th>
                                        <th style={{ width: "22em", height: "3em" }}>單位名稱</th>
                                        <th style={{ width: "40em", height: "3em" }}>聯絡方式</th>
                                    </tr>
                                    <tr style={{ backgroundColor: "#EBF1DE", height: "3em" }}>
                                        <td headers="advisory">機關綠色採購</td>
                                        <td headers="name">環資國際有限公司</td>
                                        <td headers="tel">
                                            (02)2361-1999#438<br />
                                            <Link to={`/EmailService`} title="寄信至系統客服信箱(在新視窗開啟鏈結)" target="_blank" style={{ color: "blue" }}>寄信至系統客服信箱</Link>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#EBF1DE", height: "3em" }}>
                                        <td headers="advisory">機關綠色採購-機關綠色採購評核與不統計審查</td>
                                        <td headers="name">財團法人台灣產業服務基金會</td>
                                        <td headers="tel">(02)7704-5241<br />（如電話無人接聽時，請改寄電子郵件至<br />pinjun@ftis.org.tw<br />yishwang@ftis.org.tw)</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#DBEEF4", height: "3em" }}>
                                        <td rowspan="2" headers="advisory">環保標章-申請與驗證</td>
                                        <td headers="name">財團法人台灣商品檢測驗證中心</td>
                                        <td headers="tel">(03)328-0026#139</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#DBEEF4", height: "3em" }}>
                                        <td headers="name">財團法人環境與發展基金會</td>
                                        <td headers="tel">0800-300-556<br />（如電話無人接聽時，請改寄電子郵件至victor@edf.org.tw)</td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#DBEEF4", height: "3em" }}>
                                        <td headers="advisory">環保標章-系統操作</td>
                                        <td headers="name">環資國際有限公司</td>
                                        <td headers="tel">
                                            (02)2361-1999#438<br />
                                            <Link to={`/EmailService`} title="寄信至系統客服信箱(在新視窗開啟鏈結)" target="_blank" style={{ color: "blue" }}>寄信至系統客服信箱</Link>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={closeModalAndInit} style={{ fontSize: "1em", padding: "0.375em 0.75em" }}>關閉</Button>
                        </Modal.Footer>
                    </Modal>
                </div>{/* onClick={handleClose}  */}

                {/* <!-- 相關連結--> */}
                <div className="row aboutlink mt-2 justify-content-center">
                    <div className="col-12 p-2"> 相關連結</div>
                    <div className="col-lg-3 col-md-6"><Link to="/greenPurChase/GreenProductDetailsGov" title="前往連結"><img src={bannerLink1} alt="綠色產品相關" /></Link></div>{/*綠色產品相關*/}
                    <div className="col-lg-3 col-md-6"><a href="https://greenbuy.epa.gov.tw/" title="另開視窗" target="_blank" rel="noopener noreferrer"><img src={bannerLink4} alt="環保產品線上採購網" /></a></div>{/*環保產品線上採購網*/}
                    <div className="col-lg-3 col-md-6"><Link to="/greenPurChase/GreenProductForeign" title="前往連結"><img src={bannerLink3} alt="國外環保標章網站" /></Link></div>{/*國外環保標章網站*/}
                </div>
                <SideBtn history={history} />
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenPurChase);
