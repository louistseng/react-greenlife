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

    //????????????API
    useEffect(() => {
        clickRecord("01A0F973-A5A3-40FB-98C1-4B47FB97D616", "9", collector)
    }, [collector]);

    //fetch????????????
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

    // Modal????????????????????????
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
    // ????????????Modal????????????????????????
    const closeModalAndInit = () => {
        setIsModalFirstPage(true);
        handleClose();
    };

    return (
        <>
            <BreadCrumb currentPage="??????????????????" />{/*   */}
            <div className="">
                <div className={`shop bigbanner mb-3`}>
                    <img className="relative banner" src={shopBanner} width="100%" height="100%" alt="????????????Banner" title="????????????Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/GreenShopIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <Link to={`/categories/greenShopSearch`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <Link to={`/categories/GreenShopIntro/GreenShopApply`} className="btn-link">
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <Link to={`/categories/GreenShopDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="??????????????????"></i>
                                &nbsp;????????????
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"??????????????????"} search={"??????????????????"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}

                <div className="container">
                    {/* <div className="register-btn-wrapper">
                        <a className="register" href="https://greenliving.eri.com.tw/GreenLife/GreenRestaurantNew/DefaultGR.aspx?m=New" target="_blank" rel="noopener noreferrer">??????????????????????????????</a>
                    </div> */}

                    <div className="shop-intro-title">
                        <h1 className="shop-title">????????????</h1>
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
                        <h2 className="shop-title">????????????</h2>
                        <div className="intro-content">
                            <div>
                                <h3>&emsp;&emsp;??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    ????????????????????????????????????????????????????????????????????????</h3>
                                <h3>&emsp;&emsp;102?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                    ????????????????????????????????????????????????</h3>

                            </div>
                            <div style={{ textAlign: "center" }}>
                                <img src={iconset} className="w-100" alt="?????????????????????????????????" title="?????????????????????????????????" />{/*shop-iconSet-img */}
                            </div>
                        </div>
                    </div>


                    <div style={{ position: "relative" }} className="shop-intro-title">
                        <h2 className="shop-title">????????????6?????????</h2>
                        <div className="shop-icon-wrapper">
                            <div className="shop-icon-wrapper">
                                <div className="intro-circle" style={{ borderColor: "#DBE3F2" }}>
                                    <div className="top-box">
                                        <img src={sixPointer1} alt="???????????????????????????" title="???????????????????????????" />
                                        <div className="inner-text"><h3>????????????<br />???????????????</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#B7C7E4" }}>
                                    <div className="top-box">
                                        <img src={sixPointer2} alt="??????????????????" title="??????????????????" />
                                        <div className="inner-text"><h3>????????????<br />??????</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#93AAD8" }}>
                                    <div className="top-box">
                                        <img src={sixPointer3} alt="??????????????????" title="??????????????????" />
                                        <div className="inner-text"><h3>??????<br />????????????</h3></div>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-icon-wrapper">
                                <div className="intro-circle" style={{ borderColor: "#4373BE" }}>
                                    <div className="top-box">
                                        <img src={sixPointer4} alt="????????????????????????" title="????????????????????????" />
                                        <div className="inner-text"><h3>????????????<br />????????????</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#365692" }}>
                                    <div className="top-box">
                                        <img src={sixPointer5} alt="???????????????????????????" title="???????????????????????????" />
                                        <div className="inner-text"><h3>???????????????<br />????????????</h3></div>
                                    </div>
                                </div>
                                <div className="intro-circle" style={{ borderColor: "#243961" }}>
                                    <div className="top-box">
                                        <img src={sixPointer6} alt="??????????????????" title="??????????????????" />
                                        <div className="inner-text"><h3>????????????<br />??????</h3></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="go-wrapper shop-intro-title">
                        <h2 className="shop-title">???????????? ????????????</h2>
                        <div className="shop-business-apply-wrapper">
                            <div className="shop-business-apply-wrapper">
                                <div className="btn-list">
                                    <div className="green-btn-long"><h3>??????????????????</h3></div>
                                    <div className="green-btn-long"><h3>???????????????<br />????????????</h3></div>
                                    <div className="green-btn-long"><h3>??????????????????<br />????????????</h3></div>
                                </div>
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStore" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopApply`}>
                                        <div className="yellow-btn-high">
                                            <div>
                                                <h3>????????????</h3>
                                                <span>(??????????????????)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <img src={greenArrow} alt="??????????????????" />
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStoreReview" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopReview`}>
                                        <div className="yellow-btn-high">
                                            <div>
                                                <h3>??????</h3>
                                                <span>(??????????????????)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <img src={greenArrow} alt="??????????????????" />
                            </div>
                            <div className="shop-business-apply-wrapper">
                                <div className="btn-list">
                                    <div className="yellow-btn">
                                        <div>
                                            <h3>??????</h3>
                                            <img src={oIcon} alt="??????" />
                                        </div>
                                    </div>
                                    <div className="red-btn">
                                        <div>
                                            <h3>?????????</h3>
                                            <img src={xIcon} alt="?????????" />
                                        </div>
                                    </div>
                                </div>
                                <img src={greenArrow} alt="??????????????????" />
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStoreReview" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopReview`}>
                                        <div className="yellow-btn-high" style={{ backgroundColor: "rgb(202, 222, 184)" }}>
                                            <div>
                                                <h3 style={{ color: "rgb(47, 65, 31)" }}>??????<br />????????????</h3>
                                                <span>(??????????????????)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="btn-list">
                                    {/*<a href="https://greenliving.epa.gov.tw/newPublic/Application/GreenStoreTrack" target="_blank">*/}
                                    <Link to={`/categories/GreenShopIntro/GreenShopTrack`}>
                                        <div className="yellow-btn-bottom">
                                            <div>
                                                <h3>??????<br />??????<br />??????</h3>
                                                <span>(????????????<br />??????)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="btn-list">
                                    <Link to={`/categories/GreenShopIntro/GreenShopStatistics`}>
                                        <div className="yellow-btn-bottom">
                                            <div>
                                                <h3>??????<br />??????<br />??????<br />??????</h3>
                                                <span>(????????????<br />??????)</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shop-intro-title-noline" style={{ position: "relative", textAlign: "center" }}>
                        <h2><a href="#" onClick={handleShow} className="shop-title">????????????<br />&<br />????????????</a></h2>
                        <div>
                            <Modal show={show} onHide={closeModalAndInit} size="xl" centered="true">
                                <Modal.Header closeButton>
                                    <Modal.Title style={{ fontSize: "calc(16px + 1vw)" }}>????????????&????????????</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="pageChangeBtnDiv">
                                        <a href="#" onClick={() => setIsModalFirstPage(true)} className={isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>????????????</a>
                                        <a href="#" onClick={() => setIsModalFirstPage(false)} className={!isModalFirstPage ? "pageChangeBtnFocus pageChangeBtn" : "pageChangeBtnNotFocus pageChangeBtn"}>????????????</a>
                                    </div>
                                    <div className="pageChangeContent">
                                        <div style={isModalFirstPage ? style.show : style.hide}>
                                            <div className="div-flex-wrap">
                                                <div className="text-center w-50">
                                                    <div className="shop-title" style={{ height: "4em" }}>????????????????????????</div>
                                                    <div className="row justify-content-around pb-3">
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=284`} target="_blank">
                                                                <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true" alt="????????????????????????"></i></div><span style={{ lineHeight: "1.5em" }}>??????????????????<br />(PDF??????)</span></a>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=336`} target="_blank">
                                                                <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true" alt="????????????????????????"></i></div><span style={{ lineHeight: "1.5em" }}>??????????????????<br />(PDF??????)</span></a>
                                                        </div>
                                                        <div className="col-11 mt-3"></div>
                                                    </div>
                                                </div>
                                                <div className="text-center w-50">
                                                    <div className="shop-title" style={{ height: "4em" }}>?????????????????????????????????</div>
                                                    <div className="row justify-content-around pb-3">
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=524`} target="_blank">
                                                                <div className="fas-icon"><i class="col-12 fas fa-file-alt fa-fw fa-3x" aria-hidden="true" alt="????????????????????????"></i></div><span style={{ lineHeight: "1.5em" }}>??????????????????<br />(ZIP??????)</span></a>
                                                        </div>
                                                        <div className="col-lg-5 col-md-5 col-11 paperbtn mt-3">
                                                            <a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=479`} target="_blank">
                                                                <div className="fas-icon"><i className="col-12 fas fa-desktop fa-fw fa-3x" aria-hidden="true" alt="????????????????????????"></i></div><span style={{ lineHeight: "1.5em" }}>??????????????????<br />(PDF??????)</span></a>
                                                        </div>
                                                        <div className="col-11 mt-3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-100"><Link to={`/greenLabel/GreenMarkIntroMarkApply`} target="_blank">
                                                    <div className="servicebox mt-3 green-title" style={{ fontSize: "calc(10px + 1vw)" }}>
                                                        ??????????????????
                                                    </div>
                                                </Link></div>
                                                <div className="w-100"><a href={`${SSL}//${domainFormalBack}/GreenLife/green-life/downtime.aspx?id=196`}>
                                                    <div className="servicebox mt-3 green-title" style={{ fontSize: "calc(10px + 1vw)" }}>
                                                        <div className="div-flex-wrap justify-content-center"><div className="text-right">????????????????????????????????????</div><div className="text-left">(PDF??????)</div></div>
                                                    </div>
                                                </a></div>
                                            </div>
                                        </div>

                                        <table className="shop-contact-table" style={!isModalFirstPage ? style.show : style.hide}>
                                            <tr style={{ backgroundColor: "#D7D7D7" }}>
                                                <th style={{ width: "32em", height: "3em" }}>????????????</th>
                                                <th style={{ width: "22em", height: "3em" }}>????????????</th>
                                                <th style={{ width: "40em", height: "3em" }}>????????????</th>
                                            </tr>
                                            <tr>
                                                <td rowSpan="2">???????????????????????????</td>
                                                <td>????????????????????????????????????</td>
                                                <td>0800-300-556</td>
                                            </tr>
                                            <tr>
                                                <td>??????????????????</td>
                                                <td>??????????????????</td>
                                            </tr>
                                            <tr>
                                                <td>?????????????????????????????????</td>
                                                <td>????????????????????????</td>
                                                <td>(02)2361-1999#438<br /><Link to="/EmailService" title="???????????????????????????" target="_blank">???????????????????????????</Link></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={closeModalAndInit} style={{ fontSize: "1em", padding: "0.375em 0.75em" }}>??????</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>

                </div>
                <SideBtn history={history} />
                <SideBtnOffice history={useHistory()} type={"????????????"} />
            </div>
            <Footer />

        </>
    );
}

export default withRouter(GreenShop);