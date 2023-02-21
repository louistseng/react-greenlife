import React, { useState, useEffect, useRef } from 'react';
import '../eventDetail.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import { isWebpSupported } from "react-image-webp/dist/utils";

import { clickRecord } from '../utils/API';
import greenLogo from '../images1/greenLogo.gif';

import verifyHotelPng from '../images1/accommodation/verifyHotel.png';
import verifyHotelWebp from '../images1/accommodation/verifyHotel.webp';
import blankLeafWebp from "../images1/blankLeef.webp";
import blankLeafPng from "../images1/blankLeef.png";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtnOffice = React.lazy(() => import('../Components/SideBtnOffice'));
// const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));


function AccomPage(props) {

    let domainFormal = window.location.host.includes("greenlife.eri.com.tw") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    let underGreenlivingDomain = domainFormal;

    let history = useHistory()
    const [loading, setLoading] = useState(true)

    const collector = sessionStorage.getItem("userGuid") || "";

    const params = new URLSearchParams(history.location.search);
    //透過URL抓餐廳ID
    const [hotelId, setHotelId] = useState(params.get('hotel'));
    const hotelType = params.get('type')
    const hotelNo = params.get('hotelNo')


    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [fetchRecData, setFetchRecData] = useState([]);

    const [activity, setActivity] = useState([]);
    const collectTypeId = "6"
    const [pageName, setPageName] = useState("");


    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setHotelId(params.get('hotel'))
    }, [location]);

    //GET單一旅遊內容
    useEffect(() => {
        //根據ProjNO抓取後端api資料
        // const uri = `https://cors-anywhere.herokuapp.com/https://greenliving.eri.com.tw/public/APIs/TravelTourInfo/${projNo}`;
        const uri = `${props.SSL}//${domainFormal}/APIs/Hotels2/${hotelId}/${hotelType}?hno=${hotelNo !== "" ? hotelNo : "A0000"}`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                //點閱數計數器API
                if (underGreenlivingDomain === domainFormal) {
                    clickRecord(hotelId, "8-1", collector)
                }
                if (hotelType === "1") {
                    setActivity(result.Detail[0].InteCaseList[0])
                    console.log(result.Detail[0])
                }
                setFetchData(result.Detail)
                if (result.Detail.length > 0) {
                    setPageName(result.Detail[0].Name)
                }

                const uriRec1 = `${props.SSL}//${domainFormal}/APIs/HotelsIntro/4?cz=${result.Detail[0].CityName}`

                fetch(uriRec1, {
                    method: 'GET'
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        //刪除同筆資料(刪除ID符合-current url)
                        var removeIndex = result.Detail.map(function (item) { return String(item.Num); }).indexOf(hotelId);
                        result.Detail.splice(removeIndex, 1);
                        setFetchRecData(result.Detail)
                        // let recArray = [...fetchRecData]
                        // recArray.push(result.Detail)
                    })
            })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [hotelId, hotelNo, collector, props.SSL]);

    return (
        <>

            <BreadCrumb currentPage={pageName} />
            <AddPoint key={hotelId} roleId="1" targetGuid={hotelId} roleItemId="11" autoAdd={true} />
            <div className="">
                {/* 上方Banner */}
                <TourBanner intro={"近期開放"} search={"環保旅宿查詢"} category={"accommodation"} introLink={'accomIntro'} download={"accomDownload"} join={"join"} />
                <div className="container-fluid-middle">
                    <CardDeck className="row">
                        <div ref={componentRef} className="res-main-content col-12 col-md-9 col-lg-9">
                            <div className="res-inner-content res">
                                <Loader loading={loading} />
                                {fetchData.map((fetchData, index) =>
                                    <Card key={index} className="accom-Border">
                                        <div className="d-flex row content-wrapper">
                                            <div className="res-img-wrapper col-sm-12 col-md-12 col-lg-5">
                                                <img style={{ width: "100%" }} alt={fetchData.Name} title={fetchData.Name} src={fetchData.ImgByte !== "" ? fetchData.ImgByte : "../../images/blankLeef.png"} />
                                                {/* <img src={fetchData.RestUrl === "" ? "../../images/greenTour/unload.PNG" : fetchData.RestUrl} alt={fetchData.Name} title={fetchData.Name} /> */}
                                            </div>
                                            <div className="res-card-content col-sm-12 col-md-12 col-lg-7">

                                                <span className="d-flex content-name">
                                                    <div className="">
                                                        <div className="d-flex outterBox">
                                                            <p>{fetchData.HotelType === 1 ? fetchData.Address.substring(0, 3).replaceAll("台", "臺") : fetchData.ServicePlaceAddr.substring(0, 3).replaceAll("台", "臺")}</p>

                                                        </div>
                                                        <h1 title={fetchData.Name} className="res-title">{fetchData.Name}</h1>
                                                    </div>
                                                    <img className="content-resType-logo" alt="環保旅宿類別圖示" src={fetchData.HotelType === 2 ? greenLogo : isWebpSupported() ? verifyHotelWebp : verifyHotelPng} />
                                                </span>
                                                <div className="res-name">
                                                    <div className="">
                                                        {fetchData.OfficialWebsite ? <p><i className="fas fa-tv" aria-hidden="true" alt="官方網站圖示"></i><span>&nbsp;官方網站 : <a target="_blank" title="官方網站(在新視窗開啟鏈結)" rel="noopener noreferrer" href={fetchData.OfficialWebsite}>{fetchData.OfficialWebsite}</a></span></p> : ""}
                                                        {fetchData.Phone !== "-#" && <p><i className="fas fa-phone" aria-hidden="true" alt="市話圖示"></i><span>&nbsp;&nbsp;市話 : {fetchData.Phone === "0266318031" ? "(02)6631-8000" : fetchData.Phone}</span></p>}
                                                        {fetchData.Mobile !== "暫不提供" && <p><i className="fas fa-phone" aria-hidden="true" alt="手機圖示"></i><span>&nbsp;&nbsp;手機 : {fetchData.Mobile}</span></p>}
                                                        <p><i className="fas fa-home" aria-hidden="true" alt="旅宿地址圖示"></i><span>&nbsp;&nbsp;旅宿地址 : {fetchData.HotelType === 1 ? fetchData.Address : fetchData.ServicePlaceAddr}</span></p>
                                                    </div>
                                                    <SocialBtn myStyle='d-flex justify-content-end' handlePrint={handlePrint} url={`categories/accommodation/detailPage?hotel=${hotelId}&type=${hotelType}`} title={pageName} activityGuid={hotelId} collectTypeId={collectTypeId} collector={collector} history={history} />
                                                    <div className="res-bottom-text"><p>&emsp;&emsp;※本平台資料為商家提供作為推廣用途，詳情請參閱商家網站。</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                            {fetchData.map((fetchData, index) =>
                                <Card key={index} className="accom-Border res-content">
                                    <div className="m-3">
                                        <h2 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="圖示"></i>&nbsp;旅宿特色</h2>
                                        <div>
                                            <div>
                                                <div className="d-flex justify-content-start mb-4 resBtn-wrapper">
                                                    <h3><i className="fas fa-home" aria-hidden="true" alt="旅宿性質圖示"></i>旅宿性質 : &nbsp;</h3>
                                                    <div className={fetchData.HotelType === 1 ? "accom-btn-active accom-bt" : "accom-bt"}>環保旅店</div>
                                                    <div className={fetchData.HotelType === 2 ? "accom-btn-active accom-bt" : "accom-bt"}>環保標章旅館</div>
                                                </div>
                                                <div className="d-flex justify-content-start mb-4 resBtn-wrapper">
                                                    <h3><i className="fas fa-home" aria-hidden="true" alt="環保標章旅館級別圖示"></i>環保標章旅館級別 : &nbsp;</h3>
                                                    <div className={fetchData.Memo.includes("金級") ? "accom-btn-active accom-bt" : "accom-bt"}>金級</div>
                                                    <div className={fetchData.Memo.includes("銀級") ? "accom-btn-active accom-bt" : "accom-bt"}>銀級</div>
                                                    <div className={fetchData.Memo.includes("銅級") ? "accom-btn-active accom-bt" : "accom-bt"}>銅級</div>
                                                </div>
                                                <div className="d-flex justify-content-start mb-2 resBtn-wrapper">
                                                    <h3><i class="fas fa-info-circle" aria-hidden="true" alt="參與本次活動介紹及環保作為圖示"></i>參與本次活動介紹及環保作為： &nbsp;</h3>
                                                </div>
                                                <div className="activity-info d-flex justify-content-start mb-4 resBtn-wrapper">{fetchData.Memo.replace("/", " ")}</div>
                                            </div>

                                        </div>
                                        {fetchData.HotelType === 1
                                            ?
                                            <>
                                                <h4 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="配合環保旅宿方案圖示"></i>&nbsp;配合環保旅宿方案</h4>
                                                <div>
                                                    <div className="d-block mb-3 resBtn-wrapper resBtn-width">
                                                        <div className={activity.InteCase4 === "1" ? "accom-btn-active accom-bt" : "accom-bt"}>
                                                            {activity.InteCase4 === "1" ?
                                                                `方案一：自備盥洗用品入住，提供優惠：${activity.InteCase4_6}`
                                                                :
                                                                "方案一：自備盥洗用品入住，依相關配套提供優惠"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-block mb-3 resBtn-wrapper resBtn-width">
                                                        <div className={activity.InteCase4 === "2" ? "accom-btn-active accom-bt" : "accom-bt"}>
                                                            {activity.InteCase4 === "2" ?
                                                                `方案二：續住不更換床單及毛巾者，提供優惠：${activity.InteCase4_6}`
                                                                :
                                                                "方案二：續住不更換床單及毛巾者，依相關配套提供優惠"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-block mb-3 resBtn-wrapper resBtn-width">
                                                        <div className={activity.InteCase4 === "3" ? "accom-btn-active accom-bt" : "accom-bt"}>
                                                            {activity.InteCase4 === "3" ?
                                                                `方案三：自備盥洗用品或續住不更換床單及毛巾，提供優惠：${activity.InteCase4_6}`
                                                                :
                                                                "方案三：自備盥洗用品或續住不更換床單及毛巾，依相關配套提供優惠"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-block mb-3 resBtn-wrapper resBtn-width">
                                                        <div className={activity.InteCase4 === "4" ? "accom-btn-active accom-bt" : "accom-bt"}>
                                                            {activity.InteCase4 === "4" ?
                                                                `方案四：自備盥洗用品且續住不更換床單及毛巾，再加碼相關優惠：${activity.InteCase4_6}`
                                                                :
                                                                "方案四：自備盥洗用品優惠依相關配套提供優惠，且續住不更換床單及毛巾優惠再加碼相關優惠"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-block mb-3 resBtn-wrapper resBtn-width">
                                                        <div className={activity.InteCase4 === "5" ? "accom-btn-active accom-bt" : "accom-bt"}>
                                                            {activity.InteCase4 === "5" ?
                                                                `方案五：提供房價較一般客房優惠的環保客房供民眾選擇：${activity.InteCase4_6}`
                                                                :
                                                                "方案五：提供房價較一般客房優惠的環保客房供民眾選擇"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-block mb-3 resBtn-wrapper resBtn-width">
                                                        <div className={activity.InteCase4 === "6" ? "accom-btn-active accom-bt" : "accom-bt"}>方案六：業者自行設計</div>
                                                    </div>
                                                    {activity.InteCase4 === "6" &&
                                                        <>
                                                            <div className="d-flex justify-content-start mb-2">
                                                                <div style={{ fontSize: "calc(12px + 0.6vw)" }}>優惠方案說明：&nbsp;</div>
                                                            </div>
                                                            <div className="activity-info d-flex justify-content-start mb-4">{activity.InteCase4_6}</div>
                                                        </>
                                                    }
                                                </div>
                                            </>
                                            :
                                            ""
                                        }
                                    </div>
                                </Card>

                            )}

                        </div>
                        <div className="col-12 col-md-3 col-lg-3 sideCard-container">

                            <Card className="sideCard accom-Border mb-5">
                                <Card.Body>
                                    <h2 className="share-text">其他人也看過</h2>
                                    {fetchRecData.map((fetchRecData, index) =>
                                        <Link onClick={() => setHotelId(fetchRecData.Num)} key={index} as={Link} to={`/categories/accommodation/detailPage?hotel=${fetchRecData.Num}&type=${fetchRecData.HotelType}`}>
                                            <Card className="mb-3 rec-card" title="前往連結">
                                                <div>
                                                    <img alt="" src={fetchRecData.ImgByte !== "" ? fetchRecData.ImgByte : isWebpSupported() ? blankLeafWebp : blankLeafPng} />
                                                    {/* <img src={fetchRecData.RestUrl === "" ? "../../images/greenTour/unload.PNG" : fetchRecData.RestUrl} alt={fetchRecData.Name} title={fetchRecData.Name} /> */}
                                                    <div><h3 className="rec-title">{fetchRecData.Name}</h3></div>
                                                </div>
                                            </Card>
                                        </Link>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </CardDeck>
                    {/*base64圖片*/}
                    {/* <img style={{ width:"20%" }} title="test" alt="test" src={`data:image/png;base64, ${imgUrl}`}/> */}
                </div>
            </div>
            <SideBtnOffice history={useHistory()} type={"環保旅店"} />
            {/* <SideBtn history={history} /> */}
            <Footer />
        </>
    );

}

export default withRouter(AccomPage);