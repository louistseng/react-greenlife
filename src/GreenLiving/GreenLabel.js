import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import { useHistory } from "react-router-dom";
import { clickRecord } from '../utils/API';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import markBanner from '../images1/img/banner_mark_small.jpg';
import icon1 from '../images1/img/icon_01.png';
import icon2 from '../images1/img/icon_02.png';
import icon3 from '../images1/img/icon_03.png';
import icon4 from '../images1/img/icon_04.png';
import icon5 from '../images1/img/icon_05.png';
import icon6 from '../images1/img/icon_06.png';
import icon7 from '../images1/img/icon_07.png';
import icon8 from '../images1/img/icon_08.png';
import bannerLink1 from '../images1/img/banner_link_01.jpg';
import bannerLink2 from '../images1/img/banner_link_02.jpg';
import bannerLink3 from '../images1/img/banner_link_03.jpg';
import bannerLink4 from '../images1/img/banner_link_04.png';
import greenMarkLogo from '../images1/greenLogo.gif';

import computerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/A1-009-017電腦主機.png';
import printerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/A2-011-019列印機.png';
import paperLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/A3-027-002辦公室用紙.png';
import cleanerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/A4-008-068肌膚毛髮清潔劑.png';
import washerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/A5-018-023洗衣機.png';
import labtopLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/B1-012-059筆記型電腦.png';
import printImageLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/B2-015-078影像輸出裝置.png';
import cutterLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/B3-030-146電動碎紙機.png';
import homeCleanerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/B4-007-025家用清潔劑.png';
import refigerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/B5-019-028電冰箱.png';
import personComputerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/C1-013-066桌上型個人電腦.png';
import scanerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/C2-017-088掃描器.png';
import carLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/C3-040-094小汽車.png';
import toiletPaperLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/C4-001-003衛生用紙.png';
import airConditionerLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/C5-020-029冷氣機.png';
import monitorLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/D1-010-018顯示器.png';
import tonerCartriLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/D2-014-074原生碳粉匣.png';
import motorLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/D3-042-110機車.png';
import waterSaveToiletLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/D4-023-027二段式省水馬桶.png';
import bedLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/D5-041-097床墊.png';
import bringProjectorLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/E1-016-082可攜式投影機.png';
import recyTonerCartriLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/E2-004-050回收再利用碳粉匣.png';
import eMotorLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/E3-039-021電動機車.png';
import faucetLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/E4-024-040省水龍頭及其器材配件.png';
import cupLogo from '../images1/greenLiving/GreenMarkIntro/ProductIcon/E5-043-113重複使用飲料容器.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));

function GreenLabel(props) {
    let history = useHistory()
    let SSL = props.SSL;
    let domainFormal = "greenliving.epa.gov.tw/newPublic";
    let domainFormalBack = "greenliving.epa.gov.tw";

    // 測試機domain
    let testSSL = props.SSL;
    let testdomainFormal = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    const [newsData, setNewsData] = useState([]);
    const [validLabelCount, setValidLabelCount] = useState([]);

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("F999EA8A-ACF4-4BC2-A646-AB6DE896D463", "23-1", collector)
    }, [collector]);

    //fetch最新消息
    const fetchNewsSize = 100;
    useEffect(() => {
        fetch(`${SSL}//${testdomainFormal}/APIs/NewsIntro/${fetchNewsSize}`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setNewsData(result.Detail);
            });
    }, [SSL, testdomainFormal]);

    const totalNewsAmount = 11;//9
    let hotNewsCount = newsData.filter(function (data) { return data.IsHot == 1 ? true : false; }).length;
    let otherNewsCount = (totalNewsAmount - hotNewsCount) > 0 ? (totalNewsAmount - hotNewsCount) : 1;
    const hotNewsSubjectLimit = 37, otherNewsSubjectLimit = 38;//59, 60

    //fetch有效標章數
    /*useEffect(() => {
        fetch(`${SSL}//${domainFormal}/APIs/ProductsCount`, {
            method: 'GET'
        })
        .then(res => {
            return res.json();
        }).then(result => {
            setValidLabelCount(result.Detail);
        }).catch(error => console.log(error));

    }, [SSL, domainFormal]);*/

    // Modal服務諮詢專線遮罩
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isModalFirstPage, setIsModalFirstPage] = useState(true);

    // Modal API說明遮罩
    const [showAPI, setShowAPI] = useState(false);
    const handleShowAPIClose = () => setShowAPI(false);
    const handleShowAPIShow = () => setShowAPI(true);
    const [testView, setTestView] = useState(false);
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
            <BreadCrumb currentPage="【標章及採購】環保標章" />
            <div className=""><img src={markBanner} className="w-100 banner" alt="環保標章" /></div>
            <div className=" container">
                <div className="row ">
                    <div className="col-lg-5 col-md-12 mt-2">
                        <div className="p-3 bgwhite newsbox bluebar">
                            {/* Hot最新消息 */}
                            <div><h1 style={{ fontWeight: "bolder" }}>最新消息<i className="hottext" aria-hidden="true">HOT</i></h1></div>
                            {newsData.filter(function (data) { return data.NClasses[0] != "英文專區" && data.IsHot == 1 ? true : false; })//排除英文最新消息
                                .sort((a, b) => a.OnlineDt <= b.OnlineDt ? 1 : -1)
                                .map(data =>
                                    <div>
                                        <i className="bluetext" aria-hidden="true">{new Date(data.OnlineDt).toLocaleDateString()}</i>
                                        <i className={data.IsHot == 1 ? "hottext" : ""} aria-hidden="true">{data.IsHot == 1 ? "HOT!" : ""}</i>
                                        <Link to={`/searchEvent/eventDetail?news=${data.Id}`} target="_blank" title="另開視窗">{
                                            data.Subject.length > hotNewsSubjectLimit ? (data.Subject.substring(0, hotNewsSubjectLimit) + "...") : data.Subject
                                        }</Link>
                                    </div>
                                )}
                            {/* 一般最新消息 */}
                            <div style={{ marginTop: "0.5em" }}><h2 style={{ fontWeight: "bolder" }}>最新消息</h2></div>
                            {newsData.filter(function (data) { return data.NClasses[0] != "英文專區" && data.IsHot == 0 ? true : false; })//排除英文最新消息
                                .sort((a, b) => a.OnlineDt <= b.OnlineDt ? 1 : -1)
                                .slice(0, otherNewsCount).map(data =>
                                    <div>
                                        <i className="bluetext" aria-hidden="true">{new Date(data.OnlineDt).toLocaleDateString()}</i>
                                        <i className={data.IsHot == 1 ? "hottext" : ""} aria-hidden="true">{data.IsHot == 1 ? "HOT!" : ""}</i>
                                        <Link to={`/searchEvent/eventDetail?news=${data.Id}`} target="_blank" title="另開視窗">{
                                            data.Subject.length > otherNewsSubjectLimit ? (data.Subject.substring(0, otherNewsSubjectLimit) + "...") : data.Subject
                                        }</Link>
                                    </div>
                                )}
                            <div className="col-12 greenbtn text-center "><Link to="/searchEvent?localNews" title="前往連結">更多消息</Link></div>
                        </div>

                    </div>

                    <div className="col-lg-7 col-md-12">{/* mt-2 */}
                        <div className="green-row justify-content-between">
                            {/*<div style={testView ? style.hide : style.show}>
                            <div className="div-flex-wrap space-between">
                                <div className="col-lg-6 col-md-6 col-12 green-row">
                                    <div className="col-12 greenbar w-100 h-100">
                                        <h5>最新成果</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 green-row">
                                    <a href="#" onClick={() => setTestView(true)}><div className="col-12 greenbar w-100">
                                        <h5>常見的環保標章產品</h5>
                                    </div></a>
                                </div>
                            </div>
                            <div className="div-flex space-between">
                                <div className="products mt-2" style={{width: "49%"}}>
                                    <div className="green-row" style={{width: "100%"}}>
                                        <div className="col-lg-12 col-md-12 col-12 h-50 text-bolder text-large">目前通過環保標章產品數於標章有效期內</div>
                                        <div className="col-lg-12 col-md-12 col-12 align-items-end text-right" style={{marginTop: "1em"}}>
                                            <Link to={`/categories/GreenProductSearch`} target="_blank" title="另開視窗" className="text-black" style={{height: "100%"}}>
                                                {validLabelCount.map(data => 
                                                    <i>{(data != null ? data.TotalValid : "-")}</i>
                                                )}筆
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="products mt-2" style={{width: "49%"}}>
                                    <div className="green-row" style={{width: "100%"}}>
                                        <div className="col-lg-12 col-md-12 col-12 h-50 text-bolder text-large">第一類與第二類業者統計數</div>
                                        <div className="col-lg-12 col-md-12 col-12 align-items-end text-right" style={{marginTop: "1em"}}>
                                            <Link to={`/categories/GreenProductSearch`} target="_blank" title="另開視窗" className="text-black" style={{height: "100%"}}>
                                                {validLabelCount.map(data =>
                                                    <i>{(data != null ? data.CorpCount : "-")}</i>
                                                )}筆
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>*/}

                            {/*<div style={!testView ? style.hide : style.show}>*/}
                            {/*<div className="div-flex-wrap space-between">
                                <div className="col-lg-6 col-md-6 col-12 green-row">
                                    <a href="#" onClick={() => setTestView(false)}><div className="col-12 greenbar w-100 h-100">
                                        <h5>最新成果</h5>
                                    </div></a>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 green-row">
                                    <div className="col-12 greenbar w-100">
                                        <h5>常見的環保標章產品</h5>
                                    </div>
                                </div>
                            </div>*/}
                            <div className="col-lg-12 col-md-12 col-12 green-row">
                                <div className="col-12 greenbar w-100">
                                    <h2>常見的環保標章產品</h2>
                                </div>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2" style={{ width: "100%" }}>
                                <div className="productlist-index w-100 text-center">
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=17`} target="_blank" title="另開視窗"><img src={computerLogo} alt="另開視窗" title="" /><p>電腦主機</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=59`} target="_blank" title="另開視窗"><img src={labtopLogo} alt="另開視窗" title="" /><p>筆記型電腦</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=66`} target="_blank" title="另開視窗"><img src={personComputerLogo} alt="另開視窗" title="" /><p>桌上型個人電腦</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=18`} target="_blank" title="另開視窗"><img src={monitorLogo} alt="另開視窗" title="" /><p>顯示器</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=82`} target="_blank" title="另開視窗"><img src={bringProjectorLogo} alt="另開視窗" title="" /><p>可攜式投影機</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=19`} target="_blank" title="另開視窗"><img src={printerLogo} alt="另開視窗" title="" /><p>列印機</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=78`} target="_blank" title="另開視窗"><img src={printImageLogo} alt="另開視窗" title="" /><p>影像輸出裝置</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=88`} target="_blank" title="另開視窗"><img src={scanerLogo} alt="另開視窗" title="" /><p>掃描器</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=74`} target="_blank" title="另開視窗"><img src={tonerCartriLogo} alt="另開視窗" title="" /><p>原生碳粉匣</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=1&cn=50`} target="_blank" title="另開視窗"><img src={recyTonerCartriLogo} alt="另開視窗" title="" /><p>回收再利用碳粉匣</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=7&cn=2`} target="_blank" title="另開視窗"><img src={paperLogo} alt="另開視窗" title="" /><p>辦公室用紙</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=7&cn=146`} target="_blank" title="另開視窗"><img src={cutterLogo} alt="另開視窗" title="" /><p>電動碎紙機</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=94`} target="_blank" title="另開視窗"><img src={carLogo} alt="另開視窗" title="" /><p>小汽車</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=110`} target="_blank" title="另開視窗"><img src={motorLogo} alt="另開視窗" title="" /><p>機車</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=21`} target="_blank" title="另開視窗"><img src={eMotorLogo} alt="另開視窗" title="" /><p>電動機車</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=2&cn=68`} target="_blank" title="另開視窗"><img src={cleanerLogo} alt="另開視窗" title="" /><p>肌膚毛髮<br />清潔劑</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=2&cn=25`} target="_blank" title="另開視窗"><img src={homeCleanerLogo} alt="另開視窗" title="" /><p>家用清潔劑</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=1&cn=3`} target="_blank" title="另開視窗"><img src={toiletPaperLogo} alt="另開視窗" title="" /><p>衛生用紙</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=5&cn=27`} target="_blank" title="另開視窗"><img src={waterSaveToiletLogo} alt="另開視窗" title="" /><p>二段式<br />省水馬桶</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=5&cn=40`} target="_blank" title="另開視窗"><img src={faucetLogo} alt="另開視窗" title="" /><p>省水龍頭<br />及其器材配件</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=23`} target="_blank" title="另開視窗"><img src={washerLogo} alt="另開視窗" title="" /><p>洗衣機</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=28`} target="_blank" title="另開視窗"><img src={refigerLogo} alt="另開視窗" title="" /><p>電冰箱</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=29`} target="_blank" title="另開視窗"><img src={airConditionerLogo} alt="另開視窗" title="" /><p>冷氣機</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=97`} target="_blank" title="另開視窗"><img src={bedLogo} alt="另開視窗" title="另開視窗" /><p>床墊</p></Link></div>
                                    <div><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=113`} target="_blank" title="另開視窗"><img src={cupLogo} alt="另開視窗" title="" /><p>重複使用<br />飲料容器</p></Link></div>
                                </div>
                            </div>
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                <div className="div-flex-wrap">
                    {/*環保標章介紹與查詢*/}
                    <div className="serviceblock">
                        <Link to={`/categories/greenProductSearch`}><div className="servicebox" title="前往連結">
                            <i className="fas fa-search p-1" aria-hidden="true"></i>環保標章介紹與查詢
                        </div></Link>
                        <div className="div-flex-wrap">
                            {/*btn 1*/}
                            <div style={{ width: "49%" }}>
                                <Link to={`/greenLabel/GreenMarkIntroFirst`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon1} width="100%" height="100%" alt="" />
                                    <span>環保標章介紹</span>
                                </div></Link>
                            </div>
                            {/*btn 2*/}
                            <div style={{ width: "49%" }}>
                                {/*<a href={`${SSL}//${domainFormal}/Product/ProductQuery`} target="_blank" title="另開視窗">*/}
                                <Link to={`/categories/GreenProductSearch`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon4} width="100%" height="100%" alt="" />
                                    <span>環保產品查詢</span>
                                </div></Link>
                            </div>
                        </div>
                        <div className="div-flex-wrap">
                            {/*btn 3*/}
                            {/*<div style={{ width: "49%" }}>
                                <Link to={`/greenLabel/GreenMarkIntroLockFactory`}><div className="servicebtn div-flex">
                                    <img src={icon7} width="100%" height="100%" alt="違規公司與產品" title="前往連結" />
                                    <span>違規公司與產品查詢</span>
                                </div></Link>
                            </div>*/}
                            <div style={{ width: "49%" }}>
                                <Link to={`/categories/GreenSpecificationSearch`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon7} width="100%" height="100%" alt="" />
                                    <span>規格標準查詢</span>
                                </div></Link>
                            </div>
                            {/*btn 4*/}
                            <div style={{ width: "49%" }}>
                                {/*<a href={`${SSL}//${domainFormal}/APIs`} target="_blank" title="另開視窗">*/}
                                {/*<Link to={`/greenLabel/GreenMarkIntroApis`}>*/}
                                <a href="#" onClick={handleShowAPIShow}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon8} width="100%" height="100%" alt="" />
                                    <span>API服務說明</span>
                                </div></a>
                            </div>
                        </div>
                    </div>
                    {/*環保標章申請*/}
                    <div className="serviceblock">
                        {/*<a href={`${SSL}//${domainFormal}/MarkApply`} target="_blank" title="另開視窗">*/}
                        <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="servicebox" title="前往連結">
                            <i className="fas fa-search p-1" aria-hidden="true"></i>環保標章申請
                        </div></Link>
                        <div className="div-flex-wrap">
                            {/*btn 1*/}
                            <div style={{ width: "49%" }}>
                                <Link to={`/greenLabel/GreenMarkIntroCriteriaDraft`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon1} width="100%" height="100%" alt="" />
                                    <span>規格標準訂定與查詢</span>
                                </div></Link>
                            </div>
                            {/*btn 2*/}
                            <div style={{ width: "49%" }}>
                                {/*<a href={`${SSL}//${domainFormal}/MarkApply`} target="_blank" title="另開視窗"> */}
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon4} width="100%" height="100%" alt="" />
                                    <span>標章申請資訊與指引</span>
                                </div></Link>
                            </div>
                        </div>
                        <div className="div-flex-wrap">
                            {/*btn 3*/}
                            <div style={{ width: "49%" }}>
                                <Link to={`/greenLabel/GreenMarkIntroCertificationLab`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon7} width="100%" height="100%" alt="" />
                                    <span>檢測實驗室資訊查詢</span>
                                </div></Link>
                            </div>
                            {/*btn 4*/}
                            <div style={{ width: "49%" }}>
                                {/*<a href={`${SSL}//${domainFormal}/Law/CouncilResolution`} target="_blank" title="另開視窗">*/}
                                <Link to={`/greenLabel/GreenMarkIntroLawMarkApplication`}><div className="servicebtn div-flex" title="前往連結">
                                    <img src={icon8} width="100%" height="100%" alt="" />
                                    <span>法規及審議會決議查詢</span>
                                </div></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* API服務說明 */}
                <div>
                    <Modal show={showAPI} onHide={handleShowAPIClose} size="xl" centered="true">
                        <Modal.Header closeButton>
                            <Modal.Title>API服務說明</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className=" pt-3 mb-2 text-indent">若需要API說明，請洽信箱wwlryu@eri.com.tw，謝謝！</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={handleShowAPIClose}>關閉</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {/* <!-- 2個連結按鈕--> */}
                {/*<div className="row">
                    <div className="col-6 servicebox mt-3">
                        <div className="">
                            <Link to={`/categories/greenProductSearch`}>
                                <i className="fas fa-search p-1"></i>環保標章介紹與查詢
                            </Link>
                        </div>
                    </div>
                    <div className="col-6 servicebox mt-3">
                        <div className="">
                            <a href={`${SSL}//${domainFormal}/MarkApply`} target="_blank" title="另開視窗">
                                <i className="fas fa-pencil-alt"></i>環保標章申請
                            </a>
                        </div>
                    </div>
                </div>

                {/* <!-- 8個連結--> * /}
                <div className="row fastlink">
                    {/*<div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/GreenMark/First`} target="_blank" title="另開視窗"><div><div><img src={icon1} width="100%" height="100%" alt="" /></div><div>環保標章介紹</div></div></a></div>* /}
                    <div className="col-lg-3 col-md-6 col-12"><Link to={`/greenLabel/GreenMarkIntroFirst`}><div><div><img src={icon1} width="100%" height="100%" alt="" /></div><div>環保標章介紹</div></div></Link></div>
                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/Product/ProductQuery`} target="_blank" title="另開視窗"><div><div><img src={icon4} width="100%" height="100%" alt="" /></div><div>環保產品查詢</div></div></a></div>
                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/GreenMark/CriteriaDraft`} target="_blank" title="另開視窗"><div><div><img src={icon3} width="100%" height="100%" alt="" /></div><div>規格標準訂定與查詢</div></div></a></div>
                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/MarkApply`} target="_blank" title="另開視窗"><div><div><img src={icon2} width="100%" height="100%" alt="" /></div><div>標章申請資訊與指引</div></div></a></div>

                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/Product/LockFactory`} target="_blank" title="另開視窗"><div><div><img src={icon7} width="100%" height="100%" alt="" /></div><div>違規公司與產品查詢</div></div></a></div>
                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/APIs`} target="_blank" title="另開視窗"><div><div><img src={icon8} width="100%" height="100%" alt="" /></div><div>API服務說明</div></div></a></div>
                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/Laboratory`} target="_blank" title="另開視窗"><div><div><img src={icon5} width="100%" height="100%" alt="" /></div><div>檢測實驗室資訊查詢</div></div></a></div>
                    <div className="col-lg-3 col-md-6 col-12"><a href={`${SSL}//${domainFormal}/Law/CouncilResolution`} target="_blank" title="另開視窗"><div><div><img src={icon6} width="100%" height="100%" alt="" /></div><div>法規及審議會決議查詢</div></div></a></div>
                </div>*/}

                {/* <!-- 服務諮詢專線--> */}
                <div>
                    <a href={`${SSL}//${domainFormalBack}/GreenLife/Anonymous/LoginById.aspx`} target="_blank" title="另開視窗"><div className=""><div className="col-12 servicebox mt-3">
                        {/*<i className="fas fa-search p-1"></i>*/}
                        <img src={greenMarkLogo} className="green-mark-small-img" alt="環保標章圖像" title="環保標章圖像" /><span style={{ fontSize: "calc(18px + 0.4vw)", marginLeft: "0.5em", verticalAlign: "middle" }}>登入系統申請環保標章</span></div></div>
                    </a>
                    <a href="#" onClick={handleShow}><div className=""><div className="col-12 servicebox mt-3">
                        <i className="fas fa-search p-1" aria-hidden="true"></i>服務諮詢專線</div></div>
                    </a>
                </div>
                <div>
                    <Modal show={show} onHide={closeModalAndInit} size="xl" centered="true">
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: "calc(16px + 1vw)" }}>服務諮詢專線</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="pageChangeBtnDiv">
                                <a href="#" onClick={() => setIsModalFirstPage(true)} className={isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>諮詢電話</a>
                                <a href="#" onClick={() => setIsModalFirstPage(false)} className={!isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>常見問題</a>
                            </div>
                            <div className="pageChangeContent">
                                <table className="shop-contact-table" style={isModalFirstPage ? style.show : style.hide}>
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
                                            <Link to={`/EmailService`} title="寄信至系統客服信箱(另開視窗)" target="_blank" style={{ color: "blue" }}>寄信至系統客服信箱</Link>
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
                                            <Link to={`/EmailService`} title="寄信至系統客服信箱(另開視窗)" target="_blank" style={{ color: "blue" }}>寄信至系統客服信箱</Link>
                                        </td>
                                    </tr>
                                </table>

                                <div style={!isModalFirstPage ? style.show : style.hide}>
                                    {/*<div className="div-flex-wrap">
                                        <div className="text-center w-50">
                                            <div className="green-title" style={{height: "4em"}}>機關綠色消費採購</div>
                                            <div className="row justify-content-around pb-3">
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=284`} target="_blank" title="另開視窗">
                                                    <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x"></i></div><span style={{lineHeight: "1.5em"}}>制度教學文件<br />(PDF格式)</span></a>
                                                </div>
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=336`} target="_blank" title="另開視窗">
                                                    <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x"></i></div><span style={{lineHeight: "1.5em"}}>系統教學文件<br />(PDF格式)</span></a>
                                                </div>
                                                <div className="col-11 mt-3"></div>
                                            </div>
                                        </div>
                                        <div className="text-center w-50">
                                            <div className="green-title" style={{height: "4em"}}>民間企業與團體綠色採購</div>
                                            <div className="row justify-content-around pb-3">
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=524`} target="_blank" title="另開視窗">
                                                    <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x"></i></div><span style={{lineHeight: "1.5em"}}>制度教學文件<br />(ZIP格式)</span></a>
                                                </div>
                                                <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                    <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=479`} target="_blank" title="另開視窗">
                                                    <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x"></i></div><span style={{lineHeight: "1.5em"}}>系統教學文件<br />(PDF格式)</span></a>
                                                </div>
                                                <div className="col-11 mt-3"></div>
                                            </div>
                                        </div>
                                    </div>*/}
                                    <div className="text-center">
                                        <div className="w-100"><Link to={`/greenLabel/GreenMarkIntroMarkApply`} target="_blank" title="另開視窗">
                                            <div className="servicebox mt-3 green-title">
                                                申請環保標章
                                            </div>
                                        </Link></div>
                                        <div className="w-100"><a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=196`}>
                                            <div className="servicebox mt-3 green-title">
                                                <div className="div-flex-wrap justify-content-center"><div className="text-right">環保標章申請系統操作說明</div><div className="text-left">(PDF格式)</div></div>
                                            </div>
                                        </a></div>
                                    </div>
                                </div>
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
                    <div className="col-lg-4 col-md-6"><Link to="/greenLabel/GreenProductDetailsGov" title="前往連結"><img src={bannerLink1} alt="綠色產品相關" /></Link></div>{/*綠色產品相關*/}
                    <div className="col-lg-4 col-md-6"><a href="https://greenbuy.epa.gov.tw/" title="另開視窗" target="_blank" rel="noopener noreferrer"><img src={bannerLink4} alt="環保產品線上採購網" /></a></div>{/*環保產品線上採購網*/}
                    <div className="col-lg-4 col-md-6"><Link to="/greenLabel/GreenProductForeign" title="前往連結"><img src={bannerLink3} alt="國外環保標章網站" /></Link></div>{/*國外環保標章網站*/}
                    <div className="col-lg-4 col-md-6"><Link to="/greenLabel/GreenProductLaboratory" title="前往連結"><img src={bannerLink2} alt="研究與測試單位" /></Link></div>{/*研究與測試單位*/}

                </div>
                <SideBtn history={history} />
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenLabel);
