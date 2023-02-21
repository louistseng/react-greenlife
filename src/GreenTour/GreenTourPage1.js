import React, { useState, useEffect, useRef } from 'react';
import '../carousel.css';
import '../eventDetail.scss';
import '../GreenTour.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import { clickRecord } from '../utils/API';

import tourIcon from '../images1/greenTour/tourIcon.png';
import tourBanner from '../images1/greenTour/gt_bg.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtnOffice = React.lazy(() => import('../Components/SideBtnOffice'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));
const ViewPoint = React.lazy(() => import('../Components/Tour/ViewPoint'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function GreenTourPage(props) {

    // let domainFormal = "greenliving.epa.gov.tw/newPublic";
    // let domainTest = "greenliving.eri.com.tw/PublicRwd"

    const domainFormal = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    let underGreenlivingDomain = domainFormal;

    let history = useHistory()

    const collector = sessionStorage.getItem("userGuid") || "";

    const [tourType, setTourType] = useState("");
    const [loading, setLoading] = useState(true)

    const [pageName, setPageName] = useState("");



    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [fetchRecData, setFetchRecData] = useState([]);

    const [fetchPointList, setFetchPointList] = useState([]);
    const [fetchRestaurantList, setFetchRestaurantList] = useState([]);
    const [fetchHotelList, setFetchHotelList] = useState([]);
    const [tourFeature, setTourFeature] = useState([]);
    const [tourDay, setTourDay] = useState([]);
    const [totalDay, setTotalDay] = useState([]);

    //透過URL抓旅遊行程ProjNo
    const [projNo, setProjNo] = useState(history.location.search.slice(1));

    const collectTypeId = "4"


    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setProjNo(history.location.search.slice(1))

        //點閱計數API
        if (tourType === "1" && (underGreenlivingDomain === domainFormal)) {
            clickRecord(history.location.search.slice(1), "7-1", collector)
        } else if (tourType === "2" && (underGreenlivingDomain === domainFormal)) {
            clickRecord(history.location.search.slice(1), "7-2", collector)
        }
    }, [location, tourType, collector]);

    //GET單一旅遊內容
    useEffect(() => {
        //根據ProjNO抓取後端api資料
        const uri = `${props.SSL}//${domainFormal}/APIs/TravelTourInfo/${projNo}`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result.Detail)
                setLoading(false)
                setTourType(String(result.Detail[0].ProjType))
                setTourFeature(result.Detail[0].Features)
                setTourDay(result.Detail[0].Introduction)
                // setTourContent(result.Detail[0].Introduction.split('%').reduce((acc, x) => acc === null ? [x] : [acc, <div className="content-arrow"><i class="fas fa-arrow-circle-right"></i></div>, x], null))
                setTotalDay(result.Detail[0].TotalDay)
                setFetchData(result.Detail)
                setFetchPointList(result.Detail[0].PointList)
                setFetchRestaurantList(result.Detail[0].RestaurantList)
                setFetchHotelList(result.Detail[0].HotelList)
                setPageName(result.Detail[0].ProjName)

                // console.log(result.Detail[0].ProjType)
                const uriRecG = `${props.SSL}//${domainFormal}/APIs/TravelTour2/4?p=2&k=${result.Detail[0].Travel}`
                const uriRecF = `${props.SSL}//${domainFormal}/APIs/TravelTour2/4?p=1&k=${result.Detail[0].CityName}`
                var uriRec
                if (result.Detail[0].ProjType === 2) {
                    uriRec = uriRecG
                } else {
                    uriRec = uriRecF
                }
                fetch(uriRec, {
                    method: 'GET'
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        var removeIndex = result.Detail.map(function (item) { return item.ProjNo; }).indexOf(projNo);
                        result.Detail.splice(removeIndex, 1);
                        setFetchRecData(result.Detail)
                        // console.log(result.Detail)
                    })

            })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [projNo, domainFormal]);


    let contentLists = [];

    for (let i = 1; i <= totalDay; i++) {
        // console.log(totalDay)
        // console.log(tourDay)
        if (tourDay || totalDay) {
            if (tourDay.includes('$')) {
                contentLists.push(
                    <div className="d-flex parent-day-wrapper">
                        <h3>Day{i}</h3>
                        <div className="day-wrapper">

                            {String(tourDay).split('$')[parseInt(i + i)].split('%').map((items, index) =>
                                <div key={index} className="d-flex content-arrow">
                                    <i className="fas fa-arrow-circle-right" aria-hidden="true" alt={`${items}圖示`}></i>
                                    <p> {items}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            } else if (tourDay.includes('%')) {
                contentLists.push(
                    <div className="d-flex parent-day-wrapper">
                        <h3>Day{i}</h3>
                        <div className="day-wrapper">

                            {String(tourDay).split('%').map((items, index) =>
                                <div key={index} className="d-flex content-arrow">
                                    <i className="fas fa-arrow-circle-right" aria-hidden="true" alt={`${items}圖示`}></i>
                                    <p> {items}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }


        }

    }


    return (
        <>
            <BreadCrumb currentPage={pageName} />
            <AddPoint key={projNo} roleId="1" targetGuid={projNo} roleItemId="12" autoAdd={true} />
            <div className="">
                {/* 上方Banner */}
                <div className={`greenTour bigbanner mb-3`}>
                    <img className="relative" src={tourBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/tourIntro`} className="btn-link" title="前往連結">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色旅遊介紹圖示"></i>
                                &nbsp;綠色旅遊介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=1`} onClick={() => setTourType("1")} className={tourType === "1" ? "onfocus btn-link" : "btn-link"} title="前往連結">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="自由行查詢圖示"></i>
                                &nbsp;自由行查詢
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=2`} onClick={() => setTourType("2")} className={tourType === "2" ? "onfocus btn-link" : " btn-link"} title="前往連結">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-search" aria-hidden="true" alt="團體旅遊查詢圖示"></i>
                                &nbsp;團體旅遊查詢
                            </button>
                        </Link>
                        <Link to={`/categories/tourDownload`} className="btn-link" title="前往連結">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色旅遊介紹"} search={"行程查詢"} category={"greenTour"} color={'#218cb6'} introLink={'tourIntro'} download={"tourDownload"} /> */}
                <div className="container-fluid-middle">
                    <CardDeck className="row">
                        <div ref={componentRef} style={{ marginTop: "40px" }} className="tour col-12 col-md-9 col-lg-9">
                            <div className="inner-content">
                                <Loader loading={loading} />
                                {fetchData.map((fetchData, index) =>
                                    <Card key={index} className="blueBorder">
                                        <div className="d-flex row content-wrapper">
                                            {tourType === "2" ?
                                                <div className="tour-img-wrapper col-sm-12 col-md-12 col-lg-5">
                                                    <img src={fetchData.TourUrl ? fetchData.TourUrl : tourIcon} alt={fetchData.ProjName} title={fetchData.ProjName} />
                                                </div>
                                                :
                                                ""}
                                            <div className={tourType === "1" ? "tour-card-content col-12" : "tour-card-content col-sm-12 col-md-12 col-lg-7"} style={tourType === "1" ? { padding: "calc(12px - .2vw) calc(30px - .2vw)" } : { padding: "calc(12px - .2vw)" }}>
                                                <div className="d-flex justify-content-start category-ul">
                                                    <li style={{ background: "#444343" }}>{fetchData.ProjType === 2 ? "團體旅遊" : "自由行"}</li>

                                                    {fetchData.TravelTourNo === "" ?
                                                        ""
                                                        : <li style={{ background: "orange" }}>{fetchData.TravelTourNo}</li>
                                                    }

                                                    {fetchData.Zoom === "" ?
                                                        ""
                                                        : <li style={{ background: "#f06b62" }}>{fetchData.Zoom}</li>
                                                    }

                                                    <li style={{ background: "#4bcfae" }}>{fetchData.TotalDay}日</li>
                                                    {/* 序號顯示 */}
                                                    {/* {fetchData.ProjType === 2 ? "" : <li className="proj-No" style={{ background: "rgb(239 117 22)" }}>{projNo}</li>} */}
                                                </div>
                                                <div className="content-name">
                                                    <div className="d-flex outterBox">
                                                        <p className="tour-city">{fetchData.Travel === "" ? fetchData.CityName : fetchData.Travel}</p>
                                                    </div>
                                                    <h1 className="tour-title">{fetchData.ProjName}</h1>
                                                </div>

                                                <div className="price">
                                                    {fetchData.Zoom === "" ?
                                                        ""
                                                        :
                                                        <>
                                                            <p>參考價格: &nbsp;&nbsp;</p>
                                                            <p style={{ color: "#f06b62", fontWeight: "600" }}>{fetchData.Price.split('/').shift()} &nbsp;元/人</p>
                                                        </>
                                                    }
                                                </div>

                                                <div className="bottom-content-wrapper">
                                                    {fetchData.ProjType === 2
                                                        ?
                                                        <div className="travel-name">
                                                            <p className="site-link-align-start"><i className="fas fa-tv" aria-hidden="true" alt="旅行社網站圖示"></i>&nbsp;旅行社網站 : <a className="tour-link" target="_blank" rel="noreferrer noopener" href={fetchData.TravelUrl}>{fetchData.TravelUrl}</a></p>
                                                            <p><i className="fas fa-phone" aria-hidden="true" alt="旅行社電話圖示"></i>&nbsp;&nbsp;旅行社電話 : {fetchData.TravelTel}</p>
                                                            {fetchData.Url === "歡迎電話洽詢報名" ?
                                                                <div className="detail-link" ><button className="disabled-tour"><i className="fas fa-edit" aria-hidden="true" alt="歡迎電話洽詢報名圖示"></i>&emsp;歡迎電話洽詢報名</button></div>
                                                                :
                                                                <a className="detail-link" target="_blank" rel="noreferrer noopener" href={fetchData.Url} ><button className=""><i className="fas fa-edit" aria-hidden="true" alt="行程報名資訊圖示"></i>&emsp;行程報名資訊</button></a>
                                                            }
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                    <SocialBtn myStyle='d-flex justify-content-end' handlePrint={handlePrint} url={`categories/greenTour/detailPage?${projNo}`} title={pageName} collectTypeId={collectTypeId} activityGuid={projNo} collector={collector} history={history} />
                                                    {fetchData.ProjType === 2
                                                        ?
                                                        <div className="tour-bottom-text"><p>&emsp;&emsp;※本平台資料僅提供作為綠色旅遊推廣用途，詳情洽旅行社。</p></div>
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                            {fetchData.map((fetchData, index) =>
                                <>
                                    <Card key={index} className="blueBorder content-card">
                                        <div className="">
                                            <h2>行程特色</h2>
                                            {tourFeature.split('<br>').map((items, index) =>
                                                <p>&emsp;&emsp;{items}</p>
                                            )}
                                            {/* <p className="tour-feature">{fetchData.Features}</p> */}
                                        </div>
                                    </Card>

                                    <Card className="mb-3 blueBorder content-card">
                                        <div className="">
                                            <h2>行程內容</h2>
                                            {/* {fetchData.Introduction} */}
                                            <div className="list-wrapper">
                                                {contentLists}
                                            </div>
                                        </div>
                                    </Card>

                                    {
                                        fetchData.PointList.length !== 0
                                            ?
                                            <Card className="mb-3 blueBorder content-card">
                                                <div className="">
                                                    <h3 className="mb-4">綠色景點介紹</h3>
                                                    <div className="list-wrapper">
                                                        {/* {fetchData.PointList.map((data, index) =>
                                                            <>
                                                                <div onClick={handleShow} key={index} className="mr-2 d-flex">
                                                                    <div className="circle-icon2">{index + 1}</div>
                                                                    <p>{data.ViewName}</p>
                                                                </div>
                                                                {show ?
                                                                    <>
                                                                        <div className="pointDetail">
                                                                            <Modal.Title>景點簡介</Modal.Title>
                                                                            <Modal.Body>{data.ViewName}</Modal.Body>
                                                                            <Modal.Body>{data.Address}</Modal.Body>
                                                                            <Modal.Footer>
                                                                                <Button variant="secondary" onClick={handleClose}>
                                                                                    關閉
                                                                                </Button>
                                                                            </Modal.Footer>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    ""
                                                                }
                                                            </>
                                                            )} */}
                                                        {/* {fetchPointList.map((viewPoint, index) => (
                                                            <ViewPoint getActiveView={getActiveView} active={active} viewPoint={viewPoint} index={index} />
                                                        ))} */}
                                                        {fetchPointList.map((data, index) => (
                                                            <a href={data.Url} target="_blank" rel="noreferrer noopener" id={index} key={index} className="modal-title mr-2 d-flex">
                                                                <div className="circle-icon2">{index + 1}</div>
                                                                <p>{data.ViewName}</p>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Card>
                                            :
                                            ""
                                    }

                                    {
                                        fetchData.RestaurantList.length !== 0
                                            ?
                                            <Card className="mb-3 blueBorder content-card">
                                                <div className="">
                                                    <h3 className="mb-4">綠色餐廳介紹</h3>
                                                    <div className="d-flex justify-content-start">
                                                        {/* {fetchRestaurantList.map((viewPoint, index) => (
                                                            <ViewPoint viewPoint={viewPoint} index={index} />
                                                        ))} */}
                                                        {fetchRestaurantList.map((data, index) => (
                                                            <a href={data.Url} target="_blank" rel="noreferrer noopener" id={index} key={index} className="modal-title mr-2 d-flex">
                                                                <div className="circle-icon2">{index + 1}</div>
                                                                <p>{data.ViewName}</p>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Card>
                                            :
                                            ""
                                    }

                                    {
                                        fetchData.HotelList.length !== 0
                                        &&
                                        <Card className="mb-3 blueBorder content-card">
                                            <div className="">
                                                <h3 className="mb-4">環保旅宿介紹</h3>
                                                <div className="d-flex justify-content-start">
                                                    {/* {fetchHotelList.map((viewPoint, index) => (
                                                        <ViewPoint viewPoint={viewPoint} index={index} />
                                                    ))} */}
                                                    {fetchHotelList.map((data, index) => (
                                                        <a href={data.Url} target="_blank" rel="noreferrer noopener" id={index} key={index} className="modal-title mr-2 d-flex">
                                                            <div className="circle-icon2">{index + 1}</div>
                                                            <p>{data.ViewName}</p>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Card>
                                    }
                                </>
                            )}

                            {tourType === "1" &&
                                <Card className="mb-3 blueBorder content-card">
                                    <div className="d-block">
                                        <h2>其他人也看過</h2>
                                        <div className="rec-content-wrapper">
                                            {fetchRecData.map((fetchRecData, index) =>
                                                <Link onClick={() => setProjNo(fetchRecData.ProjNo)} title={"前往" + fetchRecData.ProjName} key={index} as={Link} to={`/categories/greenTour/detailPage?${fetchRecData.ProjNo}`}>
                                                    < div className="tour-rec">
                                                        <div className="day-city-wrapper">
                                                            <div className="category-ul">
                                                                <li style={{ background: "#4bcfae" }}>{fetchRecData.TotalDay}日</li>
                                                            </div>
                                                            <div className="city-area">
                                                                <h3>{fetchRecData.Travel === "" ? fetchRecData.CityName : fetchRecData.Travel}</h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="tour-rec-content">{fetchRecData.ProjName}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            }
                        </div>

                        {tourType === "2" &&
                            <div className="col-12 col-md-3 col-lg-3 sideCard-container">
                                <Card className="sideCard blueBorder">
                                    <Card.Body>
                                        <h2 className="share-text">其他人也看過</h2>
                                        {fetchRecData.map((fetchRecData, index) =>
                                            <Link onClick={() => setProjNo(fetchRecData.ProjNo)} title={"前往" + fetchRecData.ProjName} key={index} as={Link} to={`/categories/greenTour/detailPage?${fetchRecData.ProjNo}`}>
                                                <Card className="mb-3 rec-card">
                                                    <div>
                                                        <img src={fetchRecData.TourUrl ? fetchRecData.TourUrl : tourIcon} alt="" />
                                                        <div><h3 className="rec-title">{fetchRecData.ProjName}</h3></div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        )}
                                    </Card.Body>
                                </Card>
                            </div>
                        }
                    </CardDeck>
                </div>
            </div >
            {tourType === "2" ?
                <SideBtnOffice history={history} type={"團體旅遊"} />
                :
                <SideBtn history={history} />
            }
            <Footer />
        </>
    );
}

export default withRouter(GreenTourPage);