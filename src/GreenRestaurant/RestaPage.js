import React, { useState, useEffect, useRef } from 'react';
import '../carousel.css';
import '../eventDetail.scss';
import '../GreenTour.scss';
import { useReactToPrint } from 'react-to-print';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import { clickRecord } from '../utils/API';
import SideBtnOffice from '../Components/SideBtnOffice';

import greenLogo from '../images1/greenLogo.gif';
import resBanner from '../images1/restaurant/gt_bg1.jpg';
import greenBlank from '../images1/restaurant/green-res.png';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
//const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function EventDetail(props) {
    let history = useHistory()

    let SSL = props.SSL;
    let domainFormal = window.location.hostname === "localhost" ? 'greenliving.eri.com.tw/PublicRwd' : window.location.hostname === "greenlife.eri.com.tw" ? "greenliving.eri.com.tw/PublicRwd" : 'greenliving.epa.gov.tw/newPublic';

    let underGreenlivingDomain = domainFormal;

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

    const [loading, setLoading] = useState(true)

    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [fetchRecData, setFetchRecData] = useState([]);
    const [fetchRec2Data, setFetchRec2Data] = useState([]);

    const [activity, setActivity] = useState([]);
    const [essential, setEssential] = useState([]);
    const [cityName, setCityName] = useState("");

    const [pageName, setPageName] = useState("");
    const collectTypeId = "5"

    const collector = sessionStorage.getItem("userGuid") || "";
    //透過URL抓餐廳ID
    const params = new URLSearchParams(history.location.search);
    const [resId, setResId] = useState(params.get('res'));

    // const [resType, setResType] = useState(history.location.search.slice(1));
    const resType = params.get('type')

    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setResId(params.get('res'))
    }, [location]);

    //GET單一餐廳內容
    useEffect(() => {
        //根據餐廳Id抓取後端api資料
        const uri = `${props.SSL}//${domainFormal}/APIs/Restaurant2/${resId}/${resType}`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                //點閱數計數器API
                if (underGreenlivingDomain === domainFormal) {
                    clickRecord(resId, "6-1", collector)
                }
                setActivity(result.Detail[0].Active)
                setEssential(result.Detail[0].Inquiry)
                setFetchData(result.Detail)
                setCityName(result.Detail[0].CityName)
                setPageName(result.Detail[0].Name)
                console.log(result.Detail)
                //接到區域代號(郵遞區號)後, 推薦-fetch同區域的餐廳
                let length
                const uriRec1 = `${props.SSL}//${domainFormal}/APIs/RestaurantIntro/4?z=${result.Detail[0].AddressZip}`
                // fetch(`https://cors-anywhere.herokuapp.com/https://greenliving.eri.com.tw/publicrwd/APIs/TravelTour2/4?k=${result.Detail[0].Travel}`, {
                fetch(uriRec1, {
                    method: 'GET'
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {

                        //刪除同筆資料(刪除ID符合-current url)
                        var removeIndex = result.Detail.map(function (item) { return String(item.Id); }).indexOf(resId);
                        result.Detail.splice(removeIndex, 1);
                        setFetchRecData(result.Detail)
                        // let recArray = [...fetchRecData]
                        // recArray.push(result.Detail)
                        length = 3 - result.Detail.length

                        //推薦餐廳-同區域不滿三筆, 以同縣市別補滿三筆
                        if (result.Detail.length < 3) {
                            fetch(`${props.SSL}//${domainFormal}/APIs/RestaurantIntro/${length}?cn=${cityName}`, {
                                method: 'GET'
                            })
                                .then(res => {
                                    return res.json();
                                }).then(result => {
                                    var removeIndex = result.Detail.map(function (item) { return String(item.Id); }).indexOf(resId);
                                    result.Detail.splice(removeIndex, 1);
                                    // setFetchRecData([fetchRecData[0], [result.Detail, result.Detail[0]]])
                                    // recArray[0].unshift(...[result.Detail])
                                    setFetchRec2Data(result.Detail)
                                    // console.log(result.Detail)
                                })
                        }

                    })


            })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [resId]);

    return (
        <>

            <BreadCrumb currentPage={pageName} />
            <AddPoint key={resId} roleId="1" targetGuid={resId} roleItemId="10" autoAdd={true} />
            <div className="">
                {/* 上方Banner */}
                <div className={`restaurant bigbanner mb-3`}>
                    <img className="relative" src={resBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/resIntro`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色餐廳介紹圖示"></i>
                                &nbsp;綠色餐廳介紹
                            </button>
                        </Link>
                        <Link to={`/categories/restaurant`} className="onfocus btn-link">
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
                <div className="container-fluid-middle">
                    <CardDeck className="row">
                        <div ref={componentRef} style={{ marginTop: "40px" }} className="res-main-content col-12 col-md-9 col-lg-9">
                            <div className="res-inner-content res">
                                <Loader loading={loading} />
                                {fetchData.map((fetchData, index) =>
                                    <Card key={`card_${index}`} className="res-Border">
                                        <div className="row content-wrapper">
                                            <div className="res-img-wrapper col-sm-12 col-md-12 col-lg-5">
                                                <img alt={fetchData.Name} title={fetchData.Name} src={fetchData.ImgByte !== "" ? fetchData.ImgByte : "../../images/blankLeef.png"} />
                                                {/* <img src={fetchData.RestUrl === "" ? "../../images/greenTour/unload.PNG" : fetchData.RestUrl} alt={fetchData.Name} title={fetchData.Name} /> */}
                                            </div>
                                            <div className="res-card-content col-sm-12 col-md-12 col-lg-7">

                                                <span className="d-flex content-name">
                                                    <div className="">
                                                        <div className="d-flex outterBox">
                                                            <p>{fetchData.Address.substring(0, 3).replaceAll("台", "臺")}</p>

                                                        </div>
                                                        <h1 title={fetchData.Name} className="res-title">{fetchData.Name}</h1>
                                                    </div>
                                                    <img className="content-resType-logo" src={fetchData.RestType === 1 ? greenBlank : greenLogo} alt="綠色餐廳類別圖示" />

                                                </span>

                                                <div className="res-name">
                                                    <div className="">
                                                        <p className="site-link-align-start"><i className="fas fa-tv" alt="官方網站圖示"></i>&nbsp;官方網站 : <a target="_blank" rel="noopener noreferrer" title="官方網站鏈結(在新視窗開啟鏈結)" href={fetchData.OfficialWebsite.includes("http") ? fetchData.OfficialWebsite : `https://${fetchData.OfficialWebsite}`}>&emsp;&emsp;{fetchData.OfficialWebsite}</a></p>
                                                        <p><i className="fas fa-phone" aria-hidden="true" alt="聯絡電話圖示"></i>&nbsp;&nbsp;聯絡電話 : {fetchData.Phone}</p>
                                                        <p><i className="fas fa-home" aria-hidden="true" alt="餐廳地址圖示"></i>&nbsp;&nbsp;餐廳地址 : {fetchData.Address}</p>
                                                    </div>
                                                    <SocialBtn myStyle='d-flex justify-content-end' handlePrint={handlePrint} url={`categories/restaurant/detailPage?res=${resId}&type=${resType}`} title={pageName} collectTypeId={collectTypeId} activityGuid={resId} collector={collector} history={history} />
                                                    <div className="res-bottom-text"><p>&emsp;&emsp;※本平台資料為商家提供作為推廣用途，詳情請參閱商家網站。</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                            {fetchData.map((fetchData, index) =>
                                <>
                                    <Card key={index} className="res-Border res-content ">
                                        <div className="">
                                            <h2 className="content-title"><i className="fas fa-play" alt="餐廳特色圖示"></i>&nbsp;餐廳特色</h2>
                                            <div>
                                                <div>
                                                    <div className="resBtn-wrapper">
                                                        <h3><i className="fas fa-home" aria-hidden="true" alt="餐廳性質圖示"></i>餐廳性質 : &nbsp;</h3>
                                                        <ul className="d-flex justify-content-start ">
                                                            <div className={fetchData.RestType === 1 ? "res-btn-active res-bt" : "res-bt"}>綠色餐廳</div>
                                                            <div className={fetchData.RestType === 2 ? "res-btn-active res-bt" : "res-bt"}>環保標章餐館</div>
                                                            <div className={fetchData.SubType.includes("1") ? "res-btn-active res-bt" : "res-bt"}>員工餐廳</div>
                                                            <div className={fetchData.SubType.includes("3") ? "res-btn-active res-bt" : "res-bt"}>AMOT溯源餐廳</div>
                                                            {/* {fetchData.RestType === 1
                                                                        ?
                                                                        ""
                                                                        :
                                                                        <a href="#"><h6 className="d-flex"><i class="fas fa-cloud-download-alt"></i><div className="">環保標章資訊檢視</div></h6></a>
                                                                    } */}
                                                        </ul>
                                                    </div>
                                                    {fetchData.Notes &&
                                                        <div className="resBtn-wrapper">
                                                            <h3><i className="fas fa-home" aria-hidden="true" alt="環保標章餐館級別圖示"></i>環保標章餐館級別 : &nbsp;</h3>
                                                            <ul className="d-flex justify-content-start ">
                                                                <div className={fetchData.Notes.includes("金級") ? "res-btn-active res-bt" : "res-bt"}>金級</div>
                                                                <div className={fetchData.Notes.includes("銀級") ? "res-btn-active res-bt" : "res-bt"}>銀級</div>
                                                                <div className={fetchData.Notes.includes("銅級") ? "res-btn-active res-bt" : "res-bt"}>銅級</div>
                                                            </ul>
                                                        </div>}
                                                </div>

                                            </div>
                                            {fetchData.RestType === 1
                                                &&
                                                <>

                                                    {activity.includes(4) &&
                                                        <>
                                                            <h3 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="綠色餐廳參與的活動圖示"></i>&nbsp;綠色餐廳參與的活動</h3>
                                                            <div className="resBtn-wrapper">
                                                                <ul className="d-flex justify-content-start ">
                                                                    <div className="res-btn-active res-bt">環保集點</div>
                                                                </ul>
                                                                {/* <div className={activity.includes(2) ? "res-btn-active res-bt" : "res-bt"}>消費贈點</div>
                                                            <div className={activity.includes(3) ? "res-btn-active res-bt" : "res-bt"}>點數折抵</div> */}
                                                            </div>
                                                        </>
                                                    }

                                                    <h4 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="綠色餐廳作為"></i>&nbsp;綠色餐廳作為</h4>


                                                    <div className="resBtn-wrapper">
                                                        <ul className="d-flex justify-content-start ">
                                                            <div className="res-btn-active res-bt">源頭減量</div>
                                                            <div className="res-btn-active res-bt">在地食材</div>
                                                            <div className="res-btn-active res-bt">惜食點餐</div>
                                                        </ul>
                                                    </div>


                                                    <h4 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="綠色餐廳額外作為圖示"></i>&nbsp;綠色餐廳額外作為</h4>
                                                    <div className="alt-ul">
                                                        <div>
                                                            {/* d-flex justify-content-start */}
                                                            <div className="mb-4 resBtn-wrapper">
                                                                {essential.includes(1) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">環境管理</div>
                                                                        <p>良好的用餐環境、落實垃圾分類與廚餘回收。</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(2) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">綠色採購</div>
                                                                        <p>至少採用一項含有環保標章之清潔、衛生紙…等用品或設備。</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(3) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">推行惜食點餐</div>
                                                                        <p>提供客製化餐點，如餐點份量減少。</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(4) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">源頭減量</div>
                                                                        <p>主動告知有打包服務並盡量提供相關環保包裝，如紙餐盒、紙吸管…等。</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(5) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">源頭減量</div>
                                                                        <p>主動告知有打包服務並盡量提供相關環保包裝，如紙餐盒、紙吸管…等。</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(6) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">惜食不浪費</div>
                                                                        <p>以耗損零為目標，剩餘食材提供給員工或捐給相關剩食組織。</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(7) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">環境教育</div>
                                                                        <p>對員工宣導綠色餐廳概念教育訓練，店內設置文宣作消費者端推廣</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>

                                            }
                                            {/* <p className="tour-feature">{fetchData.Features}</p> */}
                                        </div>
                                        {/* <div className="m-4">
                                                    <h4 className="mb-4 content-title"><i class="fas fa-play"></i>&nbsp;綠色餐廳介紹</h4>
                                                    <div className="list-wrapper">
                                                        {fetchData.Introduction}
                                                    </div>
                                                </div> */}
                                        {activity == "4" &&
                                            <>
                                                <h4 className="greenpoint-exchange"><i className="fas fa-play" aria-hidden="true" alt="本餐廳為環保集點特約通路圖示"></i>&nbsp;本餐廳為環保集點特約通路!</h4>
                                                <p>歡迎使用綠點於本店折抵消費或兌換商品，可兌換內容詳見:<a className="greenpoint-line" href="https://sys.greenpoint.org.tw/GpConsumerApp/Function/commodity4OnlineMgt/RootList.aspx">環保集點_電子優惠卷</a>。</p>
                                                <p>※環保集點，讓您可透過「搭乘大眾運輸」、「購買綠色商品」或「從事環保行動」賺取綠點，並用綠點折抵綠色餐廳費用，或兌換各式綠色產品與服務喔！更多詳情請看：<a className="greenpoint-line" href="https://www.greenpoint.org.tw/GPHome/index.php/exchange/restaurant">環保集點_綠色餐廳</a>。</p>
                                            </>
                                        }
                                    </Card>


                                </>
                            )}

                        </div>
                        <div className="col-12 col-md-3 col-lg-3 sideCard-container">

                            <Card className="sideCard res-Border">
                                <Card.Body>
                                    <h2 className="share-text">其他人也看過</h2>
                                    {fetchRecData.map((fetchRecData, index) =>
                                        <Link onClick={() => setResId(fetchRecData.Id)} key={`1_${index}`} as={Link} to={`/categories/restaurant/detailPage?res=${fetchRecData.Id}&type=${fetchRecData.RestType}`}>
                                            <Card className="mb-3 rec-card">
                                                <div>
                                                    <img style={{ width: "100%" }} alt="" src={fetchRecData.ImgByte !== "" ? fetchRecData.ImgByte : "../../images/blankLeef.png"} />
                                                    {/* <img src={fetchRecData.RestUrl === "" ? "../../images/greenTour/unload.PNG" : fetchRecData.RestUrl} alt={fetchRecData.Name} title={fetchRecData.Name} /> */}
                                                    <div><h3 className="rec-title">{fetchRecData.Name}</h3></div>
                                                </div>
                                            </Card>
                                        </Link>
                                    )}
                                    {fetchRec2Data.map((fetchRec2Data, index) =>
                                        <Link onClick={() => setResId(fetchRec2Data.Id)} title={fetchRec2Data.Name} key={`2_${index}`} as={Link} to={`/categories/restaurant/detailPage?res=${fetchRec2Data.Id}&type=${fetchRec2Data.RestType}`}>
                                            <Card className="mb-3 rec-card">
                                                <div>
                                                    <img alt="" src={fetchRec2Data.ImgByte !== "" ? fetchRec2Data.ImgByte : "../../images/blankLeef.png"} />
                                                    <div><h3 className="rec-title">{fetchRec2Data.Name}</h3></div>
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
            {/* <SideBtn history={history} /> */}
            <SideBtnOffice history={useHistory()} type={"綠色餐廳"} />
            <Footer />
        </>
    );
}

export default withRouter(EventDetail);