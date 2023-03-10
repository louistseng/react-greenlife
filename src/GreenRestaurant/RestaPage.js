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

    //???????????????????????????
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    //??????????????????api??????
    const [fetchData, setFetchData] = useState([]);
    const [fetchRecData, setFetchRecData] = useState([]);
    const [fetchRec2Data, setFetchRec2Data] = useState([]);

    const [activity, setActivity] = useState([]);
    const [essential, setEssential] = useState([]);
    const [cityName, setCityName] = useState("");

    const [pageName, setPageName] = useState("");
    const collectTypeId = "5"

    const collector = sessionStorage.getItem("userGuid") || "";
    //??????URL?????????ID
    const params = new URLSearchParams(history.location.search);
    const [resId, setResId] = useState(params.get('res'));

    // const [resType, setResType] = useState(history.location.search.slice(1));
    const resType = params.get('type')

    //???URL??????,???????????????(history.push)
    const location = useLocation();
    useEffect(() => {
        setResId(params.get('res'))
    }, [location]);

    //GET??????????????????
    useEffect(() => {
        //????????????Id????????????api??????
        const uri = `${props.SSL}//${domainFormal}/APIs/Restaurant2/${resId}/${resType}`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                //??????????????????API
                if (underGreenlivingDomain === domainFormal) {
                    clickRecord(resId, "6-1", collector)
                }
                setActivity(result.Detail[0].Active)
                setEssential(result.Detail[0].Inquiry)
                setFetchData(result.Detail)
                setCityName(result.Detail[0].CityName)
                setPageName(result.Detail[0].Name)
                console.log(result.Detail)
                //??????????????????(????????????)???, ??????-fetch??????????????????
                let length
                const uriRec1 = `${props.SSL}//${domainFormal}/APIs/RestaurantIntro/4?z=${result.Detail[0].AddressZip}`
                // fetch(`https://cors-anywhere.herokuapp.com/https://greenliving.eri.com.tw/publicrwd/APIs/TravelTour2/4?k=${result.Detail[0].Travel}`, {
                fetch(uriRec1, {
                    method: 'GET'
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {

                        //??????????????????(??????ID??????-current url)
                        var removeIndex = result.Detail.map(function (item) { return String(item.Id); }).indexOf(resId);
                        result.Detail.splice(removeIndex, 1);
                        setFetchRecData(result.Detail)
                        // let recArray = [...fetchRecData]
                        // recArray.push(result.Detail)
                        length = 3 - result.Detail.length

                        //????????????-?????????????????????, ???????????????????????????
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
        //render?????????,?????????????????????(??????Link????????? ??????????????????????????????????????????)
        window.scrollTo(0, 0)
    }, [resId]);

    return (
        <>

            <BreadCrumb currentPage={pageName} />
            <AddPoint key={resId} roleId="1" targetGuid={resId} roleItemId="10" autoAdd={true} />
            <div className="">
                {/* ??????Banner */}
                <div className={`restaurant bigbanner mb-3`}>
                    <img className="relative" src={resBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/resIntro`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <Link to={`/categories/restaurant`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                            </button>
                        </Link>
                        <a className="btn-link" target="_blank" rel="noopener noreferrer" title="????????????????????????(????????????????????????)" href={`${SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} onClick={() => clickRecord("E54B7ABD-B570-4AAA-9ACD-3C6201A82F8C", "6", collector)}>
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="????????????????????????"></i>
                                &nbsp;??????????????????
                                {/* <span id="e"> &nbsp;??????????????????</span>
                            <span id="f">&nbsp;&nbsp;????????????</span> */}
                            </button>
                        </a>
                        <Link to={`/categories/resDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="??????????????????"></i>
                                &nbsp;????????????
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"??????????????????"} search={"??????????????????"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}
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
                                                            <p>{fetchData.Address.substring(0, 3).replaceAll("???", "???")}</p>

                                                        </div>
                                                        <h1 title={fetchData.Name} className="res-title">{fetchData.Name}</h1>
                                                    </div>
                                                    <img className="content-resType-logo" src={fetchData.RestType === 1 ? greenBlank : greenLogo} alt="????????????????????????" />

                                                </span>

                                                <div className="res-name">
                                                    <div className="">
                                                        <p className="site-link-align-start"><i className="fas fa-tv" alt="??????????????????"></i>&nbsp;???????????? : <a target="_blank" rel="noopener noreferrer" title="??????????????????(????????????????????????)" href={fetchData.OfficialWebsite.includes("http") ? fetchData.OfficialWebsite : `https://${fetchData.OfficialWebsite}`}>&emsp;&emsp;{fetchData.OfficialWebsite}</a></p>
                                                        <p><i className="fas fa-phone" aria-hidden="true" alt="??????????????????"></i>&nbsp;&nbsp;???????????? : {fetchData.Phone}</p>
                                                        <p><i className="fas fa-home" aria-hidden="true" alt="??????????????????"></i>&nbsp;&nbsp;???????????? : {fetchData.Address}</p>
                                                    </div>
                                                    <SocialBtn myStyle='d-flex justify-content-end' handlePrint={handlePrint} url={`categories/restaurant/detailPage?res=${resId}&type=${resType}`} title={pageName} collectTypeId={collectTypeId} activityGuid={resId} collector={collector} history={history} />
                                                    <div className="res-bottom-text"><p>&emsp;&emsp;????????????????????????????????????????????????????????????????????????????????????</p></div>
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
                                            <h2 className="content-title"><i className="fas fa-play" alt="??????????????????"></i>&nbsp;????????????</h2>
                                            <div>
                                                <div>
                                                    <div className="resBtn-wrapper">
                                                        <h3><i className="fas fa-home" aria-hidden="true" alt="??????????????????"></i>???????????? : &nbsp;</h3>
                                                        <ul className="d-flex justify-content-start ">
                                                            <div className={fetchData.RestType === 1 ? "res-btn-active res-bt" : "res-bt"}>????????????</div>
                                                            <div className={fetchData.RestType === 2 ? "res-btn-active res-bt" : "res-bt"}>??????????????????</div>
                                                            <div className={fetchData.SubType.includes("1") ? "res-btn-active res-bt" : "res-bt"}>????????????</div>
                                                            <div className={fetchData.SubType.includes("3") ? "res-btn-active res-bt" : "res-bt"}>AMOT????????????</div>
                                                            {/* {fetchData.RestType === 1
                                                                        ?
                                                                        ""
                                                                        :
                                                                        <a href="#"><h6 className="d-flex"><i class="fas fa-cloud-download-alt"></i><div className="">????????????????????????</div></h6></a>
                                                                    } */}
                                                        </ul>
                                                    </div>
                                                    {fetchData.Notes &&
                                                        <div className="resBtn-wrapper">
                                                            <h3><i className="fas fa-home" aria-hidden="true" alt="??????????????????????????????"></i>???????????????????????? : &nbsp;</h3>
                                                            <ul className="d-flex justify-content-start ">
                                                                <div className={fetchData.Notes.includes("??????") ? "res-btn-active res-bt" : "res-bt"}>??????</div>
                                                                <div className={fetchData.Notes.includes("??????") ? "res-btn-active res-bt" : "res-bt"}>??????</div>
                                                                <div className={fetchData.Notes.includes("??????") ? "res-btn-active res-bt" : "res-bt"}>??????</div>
                                                            </ul>
                                                        </div>}
                                                </div>

                                            </div>
                                            {fetchData.RestType === 1
                                                &&
                                                <>

                                                    {activity.includes(4) &&
                                                        <>
                                                            <h3 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="?????????????????????????????????"></i>&nbsp;???????????????????????????</h3>
                                                            <div className="resBtn-wrapper">
                                                                <ul className="d-flex justify-content-start ">
                                                                    <div className="res-btn-active res-bt">????????????</div>
                                                                </ul>
                                                                {/* <div className={activity.includes(2) ? "res-btn-active res-bt" : "res-bt"}>????????????</div>
                                                            <div className={activity.includes(3) ? "res-btn-active res-bt" : "res-bt"}>????????????</div> */}
                                                            </div>
                                                        </>
                                                    }

                                                    <h4 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="??????????????????"></i>&nbsp;??????????????????</h4>


                                                    <div className="resBtn-wrapper">
                                                        <ul className="d-flex justify-content-start ">
                                                            <div className="res-btn-active res-bt">????????????</div>
                                                            <div className="res-btn-active res-bt">????????????</div>
                                                            <div className="res-btn-active res-bt">????????????</div>
                                                        </ul>
                                                    </div>


                                                    <h4 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="??????????????????????????????"></i>&nbsp;????????????????????????</h4>
                                                    <div className="alt-ul">
                                                        <div>
                                                            {/* d-flex justify-content-start */}
                                                            <div className="mb-4 resBtn-wrapper">
                                                                {essential.includes(1) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">????????????</div>
                                                                        <p>????????????????????????????????????????????????????????????</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(2) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">????????????</div>
                                                                        <p>?????????????????????????????????????????????????????????????????????????????????</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(3) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">??????????????????</div>
                                                                        <p>????????????????????????????????????????????????</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(4) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">????????????</div>
                                                                        <p>????????????????????????????????????????????????????????????????????????????????????????????????</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(5) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">????????????</div>
                                                                        <p>????????????????????????????????????????????????????????????????????????????????????????????????</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(6) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">???????????????</div>
                                                                        <p>?????????????????????????????????????????????????????????????????????????????????</p>
                                                                    </div>
                                                                }
                                                                {essential.includes(7) &&
                                                                    <div className="d-flex">
                                                                        <div className="res-btn-active res-bt extra">????????????</div>
                                                                        <p>???????????????????????????????????????????????????????????????????????????????????????</p>
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
                                                    <h4 className="mb-4 content-title"><i class="fas fa-play"></i>&nbsp;??????????????????</h4>
                                                    <div className="list-wrapper">
                                                        {fetchData.Introduction}
                                                    </div>
                                                </div> */}
                                        {activity == "4" &&
                                            <>
                                                <h4 className="greenpoint-exchange"><i className="fas fa-play" aria-hidden="true" alt="??????????????????????????????????????????"></i>&nbsp;????????????????????????????????????!</h4>
                                                <p>??????????????????????????????????????????????????????????????????????????????:<a className="greenpoint-line" href="https://sys.greenpoint.org.tw/GpConsumerApp/Function/commodity4OnlineMgt/RootList.aspx">????????????_???????????????</a>???</p>
                                                <p>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????<a className="greenpoint-line" href="https://www.greenpoint.org.tw/GPHome/index.php/exchange/restaurant">????????????_????????????</a>???</p>
                                            </>
                                        }
                                    </Card>


                                </>
                            )}

                        </div>
                        <div className="col-12 col-md-3 col-lg-3 sideCard-container">

                            <Card className="sideCard res-Border">
                                <Card.Body>
                                    <h2 className="share-text">??????????????????</h2>
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
                    {/*base64??????*/}
                    {/* <img style={{ width:"20%" }} title="test" alt="test" src={`data:image/png;base64, ${imgUrl}`}/> */}
                </div>
            </div>
            {/* <SideBtn history={history} /> */}
            <SideBtnOffice history={useHistory()} type={"????????????"} />
            <Footer />
        </>
    );
}

export default withRouter(EventDetail);