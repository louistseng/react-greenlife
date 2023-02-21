import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import groupIcon from '../images1/greenTour/group2.png';
import recomIcon from '../images1/greenTour/recom1.png';
import greenLogo from '../images1/greenLogo.gif';
import resLogo from '../images1/restaurant/greenRes.png';
import accomLogo from '../images1/accommodation/verifyHotel.png';
import buildingLogo from '../images1/greenTour/intro/building.png';
import nationalParkLogo from '../images1/greenTour/intro/nationalPark.png';
import forestLogo from '../images1/greenTour/intro/forest.png';
import goldImg from '../images1/greenTour/intro/goldImg.png';
import silverImg from '../images1/greenTour/intro/silverImg.png';
import copperImg from '../images1/greenTour/intro/copperImg.png';
import firstImg from '../images1/greenTour/angency/first.png';
import secondImg from '../images1/greenTour/angency/second.png';
import thirdImg from '../images1/greenTour/angency/third.png';
import forthImg from '../images1/greenTour/angency/forth.png';
import fifthImg from '../images1/greenTour/angency/fifth.png';
import sixthImg from '../images1/greenTour/angency/sixth.png';
import seventhImg from '../images1/greenTour/angency/seventh.jpg';
import eighthImg from '../images1/greenTour/angency/eighth.png';
import ninthImg from '../images1/greenTour/angency/ninth.png';
import tenthImg from '../images1/greenTour/angency/tenth.jpg';
import eleventhImg from '../images1/greenTour/angency/eleventh-min.png';
import twelfthImg from '../images1/greenTour/angency/twelfth.jpg';
import thirteenthImg from '../images1/greenTour/angency/thirteenth.jpg';
import fourteenthImg from '../images1/greenTour/angency/fourteenth.jpg';


import paperImg from '../images1/greenTour/intro/paper.png';
import messageImg from '../images1/greenTour/intro/message.png';
import signInImg from '../images1/greenTour/intro/sign-in.png';
import uploadImg from '../images1/greenTour/intro/upload.png';
import checkImg from '../images1/greenTour/intro/check.png';
import arrowImg from '../images1/greenTour/intro/arrowImg.png';
import tourBanner from '../images1/greenTour/gt_bg.jpg';

import { clickRecord } from '../utils/API';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtnOffice = React.lazy(() => import('../Components/SideBtnOffice'));


function TourIntro(props) {

    let history = useHistory();

    let SSL = props.SSL;
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw';

    const [artData, setArtData] = useState([]);
    const count = "2";
    const themeId = "1";

    const { hash } = window.location;

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("C1A82C66-C05D-4B94-879E-381F93F9E436", "7", collector)
    }, [collector]);

    //fetch最新消息
    useEffect(() => {

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
                //抓anchor位置
                if (hash) {
                    const id = hash.replace('#', '');
                    const element = document.getElementById(id)
                    // console.log(element)
                    if (element) {
                        element.scrollIntoView()
                    }
                }
            });
    }, [SSL, domain]);


    return (
        <>
            <BreadCrumb currentPage={"綠色旅遊介紹"} />
            <div className="greenTour container-fluid">
                <div className={`greenTour bigbanner mb-3`}>
                    <img className="relative" src={tourBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/tourIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色旅遊介紹圖示"></i>
                                &nbsp;綠色旅遊介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=1`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="自由行查詢圖示"></i>
                                &nbsp;自由行查詢
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=2`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-search" aria-hidden="true" alt="團體旅遊查詢圖示"></i>
                                &nbsp;團體旅遊查詢
                            </button>
                        </Link>
                        <Link to={`/categories/tourDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色旅遊介紹"} search={"行程查詢"} category={"greenTour"} color={'#218cb6'} introLink={"tourIntro"} download={"tourDownload"} /> */}
                <div className="container">
                    <div className="intro-title">
                        <h1 className="tour-bule">最新消息</h1>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="news-wrapper">
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

                    <div className="intro-title">
                        <h2 className="tour-bule">綠色旅遊</h2>
                        <div className="intro-content">
                            <div className="">
                                <h3>&emsp;&emsp;在旅遊的過程中選擇對環境友善的方式，依環保、低碳方向規劃旅遊行程，降低環境負荷、維護自然景觀生態，體會更深度的綠色旅遊模式！</h3>

                            </div>
                            <iframe className="video-wrapper" src={`https://www.youtube.com/embed/CIOHXQXksTk`} title="綠色旅遊輕鬆玩 行程規畫免煩腦!"></iframe>
                        </div>
                    </div>


                    <div className="intro-title">
                        <h2 className="tour-bule">跟著環保署一起綠色旅遊！</h2>
                        <div className="text-btn-wrapper">
                            <div className="intro-content">
                                <div className="">
                                    <h3>&emsp;&emsp;環保署為鼓勵國人實踐綠色旅遊，更結合地方政府及相關旅遊業者，串聯綠色景點、綠色餐廳與環保旅宿，推出精選綠色旅遊行程。不管是時下最夯團體旅遊，或是精彩豐富的自由行，一起輕鬆玩出綠生活！</h3>
                                </div>
                            </div>
                            <Link className="intro-circle-btn" to="/categories/greenTour?type=2" title="前往連結">
                                <div>
                                    <div className="img-wrapper"><img src={groupIcon} alt="前往連結" /></div>
                                    <div className="inner-text">
                                        <h4>團體</h4>
                                        <h4>旅遊行程</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="intro-title">
                        <h2 className="tour-bule">看更多環保局推薦行程</h2>
                        <div className="text-btn-wrapper">
                            <div className="intro-content">
                                <div className="">
                                    <h3>&emsp;&emsp;各縣市環保局從交通、餐飲到旅宿，積極的輔導業者成為綠色產業鏈的一環，讓綠色產業深根在我們的生活，推薦各地特色行程提供民眾更多的選擇。</h3>
                                </div>
                            </div>
                            <Link className="intro-circle-btn" to="/categories/greenTour?type=1" title="前往連結">
                                <div>
                                    <div className="img-wrapper"><img src={recomIcon} alt="前往連結" /></div>
                                    <div className="inner-text">
                                        <h4>環保局</h4>
                                        <h4>推薦行程</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="plan-wrapper intro-title">
                        <h2 className="tour-bule">你也可以自己規劃</h2>

                        <div>
                            <div className="btn-area">
                                <div style={{ position: "relative" }} className="tour-site">
                                    <div id="tour_site" style={{ position: "absolute", top: "-150px", left: "0" }}></div>

                                    <h3>綠色景點</h3>
                                    <div className="btn-wrapper">
                                        <a className="intro-circle-btn" href=" https://eecs.epa.gov.tw/frontRWD/_cert/place_qry.aspx" target="_blank" rel="noreferrer noopener" title="另開視窗">
                                            <div>
                                                <div className="img-wrapper"><img src={buildingLogo} alt="另開視窗" /></div>
                                                <div className="inner-text">
                                                    <h4>環境教育場所</h4>
                                                    <h4>查詢</h4>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="intro-circle-btn" href="https://np.cpami.gov.tw/" target="_blank" rel="noreferrer noopener" title="另開視窗">
                                            <div>
                                                <div className="img-wrapper"><img src={nationalParkLogo} alt="另開視窗" /></div>
                                                <div className="inner-text">
                                                    <h4>台灣</h4>
                                                    <h4>國家公園</h4>
                                                </div>
                                            </div>
                                        </a>
                                        <a className="intro-circle-btn" href="https://www.forest.gov.tw/travel" target="_blank" rel="noreferrer noopener" title="另開視窗">
                                            <div>
                                                <div className="img-wrapper"><img src={forestLogo} alt="另開視窗" /></div>
                                                <div className="inner-text">
                                                    <h4>林務局</h4>
                                                    <h4>旅遊資訊</h4>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-area">
                                <div style={{ position: "relative" }} className="tour-res">
                                    <div id="tour_res" style={{ position: "absolute", top: "-140px", left: "0" }}></div>
                                    <h3>綠色餐廳</h3>
                                    <div className="two-btn-wrapper">
                                        <Link className="intro-circle-btn" to="/categories/restaurant?searched=true&page=1&level=&type=2&activity=&d=,&city=&dist=&search=" title="前往連結" >
                                            <div>
                                                <div className="img-wrapper"><img src={greenLogo} alt="前往連結" /></div>
                                                <div className="inner-text">
                                                    <h4>環保標章餐館</h4>
                                                    {/* <h5>旅遊行程</h5> */}
                                                </div>
                                            </div>
                                        </Link>
                                        <Link className="intro-circle-btn" to="/categories/restaurant?searched=true&page=1&level=&type=1&activity=&d=,&city=&dist=&search=" title="前往連結" >
                                            <div>
                                                <div className="img-wrapper"><img src={resLogo} alt="前往連結" /></div>
                                                <div className="inner-text">
                                                    <h4>綠色餐廳</h4>
                                                    {/* <h5>旅遊行程</h5> */}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div style={{ position: "relative" }} className="tour-accom">
                                    <div id="tour_accom" style={{ position: "absolute", top: "-140px", left: "0" }}></div>
                                    <h3>環保旅宿</h3>
                                    <div className="two-btn-wrapper">
                                        <Link className="intro-circle-btn" to="/categories/accommodation?searched=true&page=1&level=&type=2&d=&city=&dist=&search=" title="前往連結" >
                                            <div>
                                                <div className="img-wrapper"><img src={greenLogo} alt="前往連結" title="環保標章旅館" /></div>
                                                <div className="inner-text">
                                                    <h4>環保標章旅館</h4>
                                                    {/* <h5>旅遊行程</h5> */}
                                                </div>
                                            </div>
                                        </Link>
                                        <Link className="intro-circle-btn" to="/categories/accommodation?searched=true&page=1&level=&type=1&d=&city=&dist=&search=" title="前往連結" >
                                            <div>
                                                <div className="img-wrapper"><img src={accomLogo} alt="前往連結" title="環保旅店" /></div>
                                                <div className="inner-text">
                                                    <h4>環保旅店</h4>
                                                    {/* <h5>旅遊行程</h5> */}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="intro-title" >
                        <div style={{ position: "relative" }} className="recom-agency">
                            <div id="recom_agency" style={{ position: "absolute", top: "-150px", left: "0" }}></div>
                            <h2 className="tour-bule">還是沒想法嗎？ </h2>
                            <div className="d-flex">
                                <h2 className="tour-bule">找</h2>
                                <h2 className="title-green-link">環保標章旅行社</h2>
                                <h2 className="tour-bule">給你建議！</h2>
                            </div>
                        </div>

                        <div className="agency-wrapper">
                            <div className="inner-wrapper">
                                <a href="https://www.ecotourtaiwan.com" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={goldImg} alt="金獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={firstImg} alt="原森旅行社" />
                                            <h3>原森旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://tinyurl.com/y3dsmzby" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={secondImg} alt="樂亞旅行社" />
                                            <h3>樂亞旅行社股份有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://www.liontravel.com/info/aboutlion/tw/milestone.asp" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={thirdImg} alt="雄獅旅行社" />
                                            <h3>雄獅旅行社股份有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://tinyurl.com/3vam4zvv" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={forthImg} alt="僑益旅行社" />
                                            <h3>僑益旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://www.g-life.org.tw/main.php" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={fifthImg} alt="綠生活旅行社" />
                                            <h3>綠生活旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>

                                <a href="https://www.settour.com.tw/act/mkt/greentour/" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={tenthImg} alt="東南旅行社股份有限公司" />
                                            <h3>東南旅行社股份有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://www.taiwantour.org/" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={eleventhImg} alt="佳安旅行社股份有限公司" />
                                            <h3>佳安旅行社股份有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://www.colatour.com.tw/" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={twelfthImg} alt="康福旅行社股份有限公司(可樂旅遊)" />
                                            <h3>康福旅行社股份有限公司(可樂旅遊)</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://yaodongtravel.com/" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={silverImg} alt="銀獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={thirteenthImg} alt="耀動國際旅行社" />
                                            <h3>耀動國際旅行社</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://tinyurl.com/mv4hxd9s" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={copperImg} alt="銅獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={sixthImg} alt="華信旅行社有限公司" />
                                            <h3>華信旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://tinyurl.com/ywp2s26y" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={copperImg} alt="銅獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={seventhImg} alt="千百度國際旅行社有限公司" />
                                            <h3>千百度國際旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://tinyurl.com/2vj6enp7" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={copperImg} alt="銅獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={eighthImg} alt="飛馬國際旅行社有限公司" />
                                            <h3>飛馬國際旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://tinyurl.com/r9tmsvzx" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={copperImg} alt="銅獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={ninthImg} alt="馨樂旅行社有限公司" />
                                            <h3>馨樂旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <a href="https://www.fly168.com.tw/" target="_blank" rel="noreferrer noopener" className="single-agency-wrapper" title="另開視窗">
                                    <img className="trophy" src={copperImg} alt="銅獎盃" />
                                    <div className="agency-detail">
                                        <div className="img-text-wrapper">
                                            <img src={fourteenthImg} alt="飛揚旅行社有限公司" />
                                            <h3>飛揚旅行社有限公司</h3>
                                        </div>
                                        <div className="agency-site"><h3><i className="fas fa-desktop" aria-hidden="true" alt="官方網站圖示"></i>官方網站</h3></div>
                                    </div>
                                </a>
                                <p className="note">註：優先順序依環保標章旅行業級別及標章核發日期排序</p>
                            </div>
                        </div>
                    </div>

                    <div className="intro-title tour-join">
                        <div className="intro-text-wrapper">
                            <h2 className="tour-bule">我是旅行社，我想一起加入綠色旅遊行列！</h2>

                        </div>
                        <ul className="">
                            <h3 className="tour-join-title">申請資格</h3>
                            <p>&emsp;&emsp;只要你是合法設立並登記具旅行業營業項目之業者，就可以申請綠色旅遊團體行程，點我下載<a target="_blank" rel="noopener noreferrer" href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=531" download="旅行業綠色旅遊行程申請與核定作業說明【pdf】">旅行業綠色旅遊之團體行程申請與核定作業說明.pdf</a></p>
                        </ul>
                        <ul className="">
                            <h3 className="tour-join-title">行程認定</h3>
                            <div className="button-text-wrapper">
                                <div className="day-button">1日行程</div>
                                <div className="text-area">
                                    <p>行程符合至少選擇1處環境教育設施場所或生態遊憩場所，及至少選擇1間綠色餐廳用餐。</p>
                                </div>
                            </div>
                            <div className="button-text-wrapper">
                                <div className="day-button">2日行程</div>
                                <div className="text-area">
                                    <p>行程符合至少選擇1處環境教育設施場所或生態遊憩場所、至少選擇1間綠色餐廳用餐及至少選擇1間環保標章旅館或環保旅店住宿。</p>
                                </div>
                            </div>
                            <div className="button-text-wrapper">
                                <div className="day-button">3日以上行程</div>
                                <div className="text-area">
                                    <p>行程符合至少選擇2處環境教育設施場所或生態遊憩場所、至少選擇1間綠色餐廳用餐及至少選擇1間環保標章旅館或環保旅店住宿。</p>
                                </div>
                            </div>
                        </ul>

                        {/* <ul>
                            <h3 className="tour-join-title">簡單申請一起加入綠色旅遊行列！</h3>
                            <div className="apply-wrapper">
                                <div className="tour-apply-wrapper">
                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={paperImg} alt="書面提出申請" />
                                            <h6>書面提出申請</h6>
                                        </div>
                                    </div>
                                    <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={messageImg} alt="公文通知核定結果" />
                                            <h6>公文通知核定結果</h6>
                                        </div>
                                    </div>
                                    <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={uploadImg} alt="行程上架" />
                                            <h6>行程上架</h6>
                                        </div>
                                    </div>
                                    <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={checkImg} alt="完成" />
                                            <h6>完成</h6>
                                        </div>
                                    </div>

                                </div>
                                <Link to="/categories/tourDownload" title="前往連結"><p>（點我看更多詳細內容）</p></Link>
                            </div>
                        </ul> */}

                        <ul>
                            <h3 className="tour-join-title">簡單申請一起加入綠色旅遊行列！</h3>
                            <div className="apply-wrapper">
                                <div className="tour-apply-wrapper">
                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={signInImg} alt="登入帳號" />
                                            <h4>登入帳號</h4>
                                        </div>
                                    </div>
                                    <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={paperImg} alt="線上申請" />
                                            <h4>線上申請</h4>
                                            <a href={"https://greenliving.epa.gov.tw/GreenLife/GreenTravel/GreenPlatformTravel.aspx?m=New"} target="_blank" style={{ textDecoration: "underline", fontWeight: "600" }}>(線上申請表單請點我)</a>
                                        </div>
                                    </div>
                                    <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={checkImg} alt="行程上架" />
                                            <h4>審核通過</h4>
                                        </div>
                                    </div>
                                    <img className="arrow" src={arrowImg} alt="向右箭頭" />

                                    <div className="blue-button">
                                        <div className="img-wrapper">
                                            <img src={uploadImg} alt="審核通過" />
                                            <h4>行程上架</h4>
                                        </div>
                                    </div>

                                </div>
                                <Link to="/categories/tourDownload" title="前往連結"><p>（點我看更多詳細內容）</p></Link>
                            </div>
                        </ul>
                        <ul className="tour-more">
                            <h3 className="tour-join-title">想問更多</h3>
                            <div className="d-flex">
                                <div className="contact-title">
                                    <div className="icon-text-wrapper"><i className="fas fa-phone" aria-hidden="true" alt="電話圖示"></i><h4 className="phone">&nbsp;電話</h4></div>
                                    <div className="contact-email icon-text-wrapper"><i className="far fa-envelope" aria-hidden="true" alt="e-mail圖示"></i><h4>&nbsp;e-mail</h4></div>
                                </div>
                                <div className="contact-info">
                                    {/* <p className="bold">(02)-2311-7722#2925 賴小姐（汎宇電商股份有限公司）</p> */}
                                    <p>(06)363-6619 張小姐（工業技術研究院）</p>
                                    <br />
                                    <p>OliveChang@itri.org.tw</p>
                                </div>
                            </div>
                            <p></p>
                        </ul>
                    </div>
                </div>
            </div>
            <SideBtnOffice history={history} type={"團體旅遊"} />
            <Footer />
        </>
    );
}

export default withRouter(TourIntro);