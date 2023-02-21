import React, { useState, useEffect, useRef } from 'react';
import '../carousel.css';
import '../eventDetail.scss';
import '../GreenTour.scss';
import '../GreenProduct.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';

import { Card, CardDeck, Col, Row } from 'react-bootstrap';
import { clickRecord } from '../utils/API';
import { formatDate } from '../utils/Functions';
import greenLogo from '../images1/greenLogo1.png';
import greenLogo2 from '../images1/greenLogo2.png';
import googleMap from '../images1/common/googleMap-png.png';
import labelBanner from '../images1/greenProduct/label_banner.jpg';
import { Table } from 'react-bootstrap';
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function ProductPage(props) {

    let SSL = props.SSL;
    let domainFormal = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    // let SSL = "https:";
    // let domainFormal = "greenliving.epa.gov.tw/newPublic"

    let history = useHistory()

    const collector = sessionStorage.getItem("userGuid") || "";

    const [loading, setLoading] = useState(true)

    const [pageName, setPageName] = useState("");



    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [imgList, setImgList] = useState([]);

    const [fetchRecData, setFetchRecData] = useState([]);
    const [currentImg, setCurrentImg] = useState("");

    //透過URL抓Num
    const params = new URLSearchParams(history.location.search);
    const [Num, setNum] = useState(params.get('product'));
    const [type, setType] = useState(params.get('type'));

    const [markArr, setMarkArr] = useState("")

    const collectTypeId = ""

    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setLoading(true)
        setNum(params.get('product'))
        setType(params.get('type'))
    }, [location]);

    //點閱計數API
    useEffect(() => {
        clickRecord("40EA54C9-1B3D-4BA3-B5DD-FEB1BC0C3402", "6", collector)
    }, [collector]);


    //標章產品基本資料精準查詢(詳細欄位)
    useEffect(() => {

        //根據ProjNO抓取後端api資料
        const uri = `${SSL}//${domainFormal}/APIs/ProductBaseDetail/${Num}/${type}`;
        // console.log("api",`${props.SSL}//${domainFormal}/APIs/ProductBaseDetail/${Num}/${type}`)
        if (Num)
            fetch(uri, {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    setFetchData(result.Detail[0])
                    setPageName(result.Detail[0].NameZH)
                    setImgList(result.Detail[0].ImageList[0])
                    setCurrentImg(result.Detail[0].ImageList[0]?.PicFront)
                    setMarkArr(result.Detail[0].SerialType)
                    // console.log("fetchData", result)
                    //其他人也看過-以同產品類別大項，列前3個
                    const uriRec1 = `${props.SSL}//${domainFormal}/APIs/ProductsQuery?ctn=${result.Detail[0].CriteriaClassNo}`
                    fetch(uriRec1, {
                        method: 'GET'
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            //刪除同筆資料(刪除ID符合-current url)
                            var removeIndex = result.Detail.map(function (item) { return String(item.Num); }).indexOf(Num);
                            result.Detail.splice(removeIndex, 1);
                            setFetchRecData(result.Detail.slice(0, 3))
                            // let recArray = [...fetchRecData]
                            // recArray.push(result.Detail)
                            // console.log("其他人也看",result.Detail.slice(0, 3))
                        })
                })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [Num, domainFormal]);


    //標章產品詳細資料精準查詢(基本欄位)
    const [allFactory, setAllFactory] = useState([])
    const [factory, setFactory] = useState([]);
    const [factorySec, setFactorySec] = useState([])
    const [capability, setCapability] = useState([]);
    const [benefit, setBenefit] = useState([]);
    const [transitTrue, setTransitTrue] = useState([]);
    const [otherInfo, setOtherInfo] = useState([]);
    const [greenStore, setGreenStore] = useState([]);
    const [servciePlace, setServciePlace] = useState([]);
    const [transitVisual, setTransitVisual] = useState([]);
    const [isElse, setIsElse] = useState([])
    const [detail, setDetail] = useState([])

    useEffect(() => {
        if (Num) {
            fetch(`${SSL}//${domainFormal}/APIs/ProductDetails/${Num}/${type}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                setAllFactory(result.Detail[0].Factorys)
                setFactory(result.Detail[0].Factorys[0])
                // setFactorySec(result.Detail[0].Factorys[0])
                setCapability(result.Detail[0].Capability)
                setIsElse(result.Detail[0].Capability[0])
                setBenefit(result.Detail[0].Benefit)
                setTransitTrue(result.Detail[0].TransitTrue)
                setOtherInfo(result.Detail[0].OtherInfo[0])
                setGreenStore(result.Detail[0].GreenStore)
                setServciePlace(result.Detail[0].ServciePlace[0])
                setTransitVisual(result.Detail[0].TransitVisual[0])
                // console.log("result", result)

                result.Detail[0].TransitTrue.map(d => {
                    if (d.Url.includes('www') && !d.Url.includes('http://www') && !d.Url.includes('https://www')) {
                        d.Url = "http://" + d.Url
                    }
                })
            })

            fetch(`${SSL}//${domainFormal}/APIs/ProductBaseDetail/${Num}/${type}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                console.log('result', result.Detail[0])
                setDetail(result.Detail[0])

                result.Detail.map(d => {
                    if (d.CorpUrl.includes('www') && !d.CorpUrl.includes('http://www') && !d.CorpUrl.includes('https://www')) {
                        d.CorpUrl = "http://" + d.CorpUrl
                    }
                })
            })

        }
    }, [Num])



    return (
        <>
            <BreadCrumb currentPage={pageName} />
            <AddPoint key={Num} roleId="1" targetGuid={Num} roleItemId="12" autoAdd={true} />
            <div className="product">
                {/* 上方Banner */}
                <div className={`bigbanner mb-3`}>
                    {/* <img className="relative" src={labelBanner} width="100%" height="100%" alt="" /> */}
                    <img className="relative banner" src={labelBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/GreenProductIntro`} className="btn-link" title="前往連結">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="環保產品介紹圖示"></i>
                                &nbsp;環保產品介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenProductSearch`} className="onfocus btn-link" title="前往連結">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-search" aria-hidden="true" alt="環保標章查詢圖示"></i>
                                &nbsp;環保標章查詢
                            </button>
                        </Link>
                        <Link to={`/categories/GreenSpecificationSearch`} className="btn-link" title="前往連結">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-search" aria-hidden="true" alt="環保標章規格查詢圖示"></i>
                                &nbsp;環保標章規格查詢
                            </button>
                        </Link>
                        {/*  */}
                        <a href={`/greenLabel/GreenMarkIntroMarkApply`} target="_blank" className="btn-link" title="另開視窗">
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入環保產品圖示"></i>
                                &nbsp;加入環保產品
                                {/* <span id="e"> &nbsp;加入綠色餐廳</span>
                                <span id="f">&nbsp;&nbsp;近期開放</span> */}
                            </button>
                        </a>
                        <Link to={`/categories/GreenProductDownload`} className="btn-link" title="前往連結">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色旅遊介紹"} search={"行程查詢"} category={"greenTour"} color={'#218cb6'} introLink={'tourIntro'} download={"tourDownload"} /> */}
                <div className="container-fluid-middle">
                    <CardDeck className="row">
                        <div ref={componentRef} style={{ marginTop: "40px" }} className="tour col-12 col-md-9 col-md-9 col-lg-9">
                            <div className="inner-content">
                                <Loader loading={loading} />

                                <Card className="product-form-border border-radius">
                                    <div className="d-flex row res-card-content">
                                        <div className="col-sm-12 col-lg-4">
                                            <div className="res-img product-img">
                                                <img
                                                    className="lazy-load"
                                                    alt={"環保標章圖示"}
                                                    title={fetchData?.NameZH}
                                                    src={currentImg || greenLogo}
                                                />
                                            </div>
                                            {/* <img src={fetchData.RestPicList[0].RestUrl === "" ? "../images/greenTour/unload.PNG" : fetchPicPath} alt={fetchData.Name} title={fetchData.Name} /> */}
                                            {imgList !== [] &&
                                                <div className="product-img-container">
                                                    <div className={imgList?.PicFront ? "single-img" : "single-img img-contain"}>
                                                        <img alt="PicFront" src={imgList?.PicFront || greenLogo} onClick={e => setCurrentImg(e.target.src)} />
                                                    </div>
                                                    <div className={imgList?.PicSide ? "single-img" : "single-img img-contain"}>
                                                        <img alt="PicSide" src={imgList?.PicSide || greenLogo} onClick={e => setCurrentImg(e.target.src)} className="single-img" />
                                                    </div>
                                                    <div className={imgList?.PicUp ? "single-img" : "single-img img-contain"}>
                                                        <img alt="PicUp" src={imgList?.PicUp || greenLogo} onClick={e => {
                                                            // console.log(e.target.src)
                                                            setCurrentImg(e.target.src)
                                                        }} />
                                                    </div>
                                                    <div className={imgList?.PicPro ? "single-img" : "single-img img-contain"}>
                                                        <img alt="PicPro" src={imgList?.PicPro || greenLogo} onClick={e => setCurrentImg(e.target.src)} className="single-img" />
                                                    </div>
                                                    <div className={imgList?.PicClose ? "single-img" : "single-img img-contain"}>
                                                        <img alt="PicClose" src={imgList?.PicClose || greenLogo} onClick={e => setCurrentImg(e.target.src)} className="single-img" />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        {fetchData !== [] &&
                                            <div className="col-sm-12 col-md-12 col-lg-8">
                                                <div className="content-outside-container">
                                                    <div>
                                                        <div className="d-flex">
                                                            <div>
                                                                <div className="category-ul">
                                                                    <li style={fetchData?.ShowStatus === "有效" ? { background: "#15aa08" } : { background: "grey" }}>{fetchData?.ShowStatus}</li>
                                                                    <p style={{ color: fetchData.ShowStatus === "有效" ? "#15aa08" : "grey" }} className="product-num">{fetchData.Num}</p>
                                                                    <a href={fetchData.PdfUrl} className="pdf-btn" download={fetchData.NameZH} title="下載PDF(另開視窗)">匯出PDF</a>
                                                                </div>
                                                                <div className="d-flex category-ul">
                                                                    <li style={{ background: "#ab65e4" }}>{fetchData.CriteriaClass}</li>
                                                                    <li style={{ background: "#ab65e4" }}>{fetchData.CriteriaNo + "." + fetchData.Criteria}</li>
                                                                </div>
                                                                <div className="validDate-container pos-none">
                                                                    <li>生效日&nbsp;:&nbsp;{formatDate(fetchData.SignDate)}</li>
                                                                    <li>到期日&nbsp;:&nbsp;{formatDate(fetchData.ValidDate)}</li>
                                                                </div>
                                                            </div>
                                                            <div className="res-logo-wrapper">
                                                                <img alt="標章圖示" className="resType-logo" src={fetchData.Class === 2 ? greenLogo2 : greenLogo} />
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="content-name">
                                                                {fetchData.NameZH && <h1 className="product-title">{fetchData.NameZH}</h1>}
                                                                <span>{fetchData.NameEN}</span>
                                                                {fetchData.Num === "17635" || fetchData.Num === "17413" || fetchData.Num === "16608" ?
                                                                    <p>
                                                                        {fetchData.Type}<span className="mark1 mark-type">!</span>
                                                                        {markArr.split("、TASKalfa 4002i")}<span className="mark2 mark-type">!</span>
                                                                        {markArr.split("TASKalfa 5002i、")}<span className="mark3 mark-type">!</span>
                                                                        <span className="ml-2">{fetchData.Memo !== "" && fetchData.Memo}</span>

                                                                        <div className="mark-box1 mark-detail">
                                                                            生產工廠：
                                                                            <p>{factory.InfoNameCN}</p>
                                                                            <p>{factory.InfoNameCN}</p>
                                                                        </div>
                                                                        <div className="mark-box2 mark-detail">
                                                                            生產工廠：
                                                                            <p>{factory.InfoNameCN}</p>
                                                                            <p>{factory.InfoNameCN}</p>
                                                                        </div>
                                                                        <div className="mark-box3 mark-detail">
                                                                            生產工廠：
                                                                            <p className="content-factory-verify">{factory.InfoNameCN}</p>
                                                                        </div>
                                                                    </p>
                                                                    :
                                                                    <p className="content-factory-verify">{fetchData.Type}&nbsp;</p>
                                                                }
                                                            </div>
                                                            <div>
                                                                <p className="content-factory-verify">廠商:{fetchData.CorpName}</p>

                                                            </div>
                                                            <p className="content-factory-verify">驗證機構:{fetchData.VerificationName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="bottom-content-wrapper">

                                                        <SocialBtn myStyle='d-flex justify-content-end' handlePrint={handlePrint} url={`/categories/product/detailPage?${Num}`} title={pageName} collectTypeId={collectTypeId} activityGuid={Num} collector={collector} history={history} hideHeart={true} />
                                                        {/* <div className="tour-bottom-text"><p>&emsp;&emsp;※本平台資料為民眾提供作為推廣綠色產品用途，詳情請參閱環保產品查詢網頁。</p></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                </Card>

                            </div>
                            <>
                                <Card className="product-form-border content-card border-radius">
                                    <h2 className="content-title" tabIndex={0}><i className="fas fa-play" aria-hidden="true" alt="產品說明圖示"></i>&nbsp;產品說明</h2>
                                    <hr />
                                    <Table bordered responsive="lg">
                                        <thead>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="product-explanation-th">產品名稱</th>
                                                <td>{fetchData.NameZH}&nbsp;&nbsp;{fetchData.NameEN}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">型號:</th>
                                                <td>{fetchData.Type}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">系列型號</th>
                                                <td>{fetchData.SerialType}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">級別</th>
                                                <td>{fetchData.Memo}</td>
                                            </tr>

                                            <tr>
                                                <th className="product-explanation-th">產品分類及規格標準</th>
                                                <tr>
                                                    <td>{fetchData.CriteriaNo + "." + fetchData.Criteria}</td>
                                                </tr>
                                                <tr>
                                                    <td>{fetchData.CriteriaClass}</td>
                                                </tr>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">驗證機構</th>
                                                <td>{fetchData.VerificationName}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">環保標章編號及證明書</th>
                                                <tr>
                                                    <th>編號</th>
                                                    <td>{fetchData.Num}</td>
                                                </tr>
                                                <tr>
                                                    <th>生效日</th>
                                                    <td>{formatDate(fetchData.SignDate)}</td>
                                                </tr>
                                                <tr>
                                                    <th>到期日</th>
                                                    <td>{formatDate(fetchData.ValidDate)}</td>
                                                </tr>
                                                {fetchData.DateExtendDate !== "0001-01-01T00:00:00" &&
                                                    <tr>
                                                        <th>延展到期日</th>
                                                        <td>{formatDate(fetchData.DateExtendDate)}</td>
                                                    </tr>
                                                }
                                                <tr>
                                                    <th className="product-explanation-th">狀態</th>
                                                    <td style={{ color: fetchData.ShowStatus === "註銷(撤銷)" || fetchData.ShowStatus === "註銷(廢止)" ? "red" : "" }}>{fetchData.ShowStatus}</td>
                                                </tr>
                                                <tr>
                                                    <th className="product-explanation-th">備註說明</th>
                                                    <td style={{ color: fetchData.ShowStatus === "註銷(撤銷)" || fetchData.ShowStatus === "註銷(廢止)" ? "red" : "" }}>{fetchData.StatusNote ? fetchData.StatusNote : "無"}</td>
                                                </tr>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">廠商名稱</th>
                                                <td>{fetchData.CorpName ? fetchData.CorpName : servciePlace?.ServicePlaceName}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">公司地址</th>
                                                <td>{fetchData?.CorpAddress ? fetchData?.CorpAddress : servciePlace?.ServicePlaceAddr}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">公司網址</th>

                                                < td >
                                                    <a href={detail.CorpUrl} target="_blank" className="url-tag" title={detail.CorpName + "另開視窗"}>{detail.CorpUrl ? detail.CorpUrl : "無"}</a>
                                                </td>

                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">銷售聯絡人</th>
                                                <td>{fetchData.CriteriaClass === "服務類" ? "-" : fetchData.CorpSales}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">聯絡電話</th>
                                                <td>{fetchData.CriteriaClass === "服務類" ? "-" : fetchData.CorpTel}</td>
                                            </tr>
                                            <tr>
                                                <th className="product-explanation-th">聯絡傳真</th>
                                                <td>{fetchData.CriteriaClass === "服務類" ? "-" : fetchData.CorpFax}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <h2 className="content-title"><i className="fas fa-play" aria-hidden="true" alt="產品介紹圖示"></i>&nbsp;產品介紹</h2>
                                    <div className="resBtn-wrapper">
                                        {factory &&
                                            <>
                                                <Table bordered responsive style={{ overflow: "hidden" }}>
                                                    <thead className="product-btn-active">
                                                        <tr className="row">
                                                            <th className="col-6 col-lg-3">生產工廠名稱(中文)</th>
                                                            <th className="col-6 col-lg-3">生產工廠名稱(英文)</th>
                                                            <th className="col-6 col-lg-3">生產工廠地址(中文)</th>
                                                            <th className="col-6 col-lg-3">生產工廠地址(英文)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allFactory.map(data =>
                                                            <>
                                                                <tr className="row">
                                                                    <td className="col-6 col-lg-3">
                                                                        {/* 名稱 */}
                                                                        {data?.InfoNameCN && <p>{data?.InfoNameCN}</p>}
                                                                    </td>
                                                                    <td className="col-6 col-lg-3">
                                                                        {/* 名稱 */}
                                                                        {data?.InfoNameEN && <p>{data?.InfoNameEN}</p>}
                                                                    </td>
                                                                    <td className="col-6 col-lg-3">
                                                                        {/* 地址 */}
                                                                        {data?.InfoAddCN && <p>{data?.InfoAddCN}</p>}
                                                                    </td>
                                                                    <td className="col col-lg-3">
                                                                        {/* 地址 */}
                                                                        {data?.InfoAddEN && <p>{data?.InfoAddEN}</p>}
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </>
                                        }
                                        <div className="resBtn-wrapper">
                                            {servciePlace && (
                                                <Table bordered responsive style={{ overflow: "hidden" }}>
                                                    <thead className="product-btn-active">
                                                        <tr className="row">
                                                            <th className="col-5 col-lg-5">服務場所名稱</th>
                                                            <th className="col-5 col-lg-5">服務場所地址</th>
                                                            <th className="col-2 col-lg-2">Goolge Map</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="row">
                                                            <td className="col-5 col-lg-5">
                                                                {servciePlace?.ServicePlaceName && <p>{servciePlace?.ServicePlaceName}</p>}
                                                            </td>
                                                            <td className="col-5 col-lg-5">
                                                                {servciePlace?.ServicePlaceAddr && <p>{servciePlace?.ServicePlaceAddr}</p>}
                                                                {servciePlace?.ServicePlaceAddrE && <p>{servciePlace?.ServicePlaceAddrE}</p>}
                                                            </td>
                                                            <td className="col-2 col-lg-2">
                                                                {servciePlace.ServicePlaceAddr && <a href={`https://www.google.com.tw/maps/place/${servciePlace.ServicePlaceAddr}`} target="_blank" rel="noreferrer noopener" title="另開視窗">
                                                                    <img className="googleMap-img" src={googleMap} alt="googleMap" />
                                                                </a>}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            )
                                            }
                                        </div>

                                        <Table striped bordered hover responsive style={{ display: (capability == "" || isElse.CodeName == "其它") ? "none" : "" }}>
                                            <thead className="product-btn-active">
                                                <tr>
                                                    <th className="col-4 col-lg-4">功能規格</th>
                                                    <th className="col-4 col-lg-4">補充文件</th>
                                                    <th className="col-4 col-lg-4">說明</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {capability.map(data =>
                                                    <tr style={{ display: data.CodeName == "其它" ? "none" : "" }}>
                                                        <td className="col-4 col-lg-4">
                                                            {/* 規格 */}
                                                            <p className="content-wrap">{data.CodeName ? data.CodeName : "無"}</p>
                                                        </td>
                                                        <td className="col-4 col-lg-4">
                                                            {/* 補充文件 */}

                                                            <p className="content-wrap">{data.Specification ? data.Specification : "無"}</p>
                                                        </td>
                                                        <td className="col-4 col-lg-4">
                                                            {/* 說明 */}
                                                            <p className="content-wrap">{data.Description ? data.Description : "無"}</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>

                                        {benefit[0] && (
                                            <Table bordered responsive style={{ display: (capability == "" || isElse.CodeName == "其它") ? "none" : "" }}>
                                                <thead className="product-btn-active">
                                                    <tr>
                                                        <th className="col-4 col-lg-4">環境效能</th>
                                                        <th className="col-4 col-lg-4">效益</th>
                                                        <th className="col-4 col-lg-4">其他說明</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="col-4 col-lg-4">
                                                            {/* 環境效益 */}
                                                            <p>{benefit.map(data => data.CodeName ? data.CodeName : "無").join("、")}</p>
                                                        </td>
                                                        <td className="col-4 col-lg-4">
                                                            {/* 效益 */}
                                                            <p>{benefit.map(data => data.Benefit ? data.Benefit : "無").join("、")}</p>
                                                        </td><td className="col-4 col-lg-4">
                                                            {/* 其他說明 */}
                                                            <p>{benefit.map(data => data.OtherDescription ? data.OtherDescription : "無").join("、")}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        )
                                        }
                                    </div>


                                    {fetchData.CriteriaClassNo !== 14 &&
                                        <>
                                            <h2 className="content-title "><i className="fas fa-play" aria-hidden="true" alt="產品銷售通路圖示"></i>&nbsp;產品銷售通路</h2>
                                            <div className="resBtn-wrapper">
                                                <Table bordered responsive style={{ overflow: "hidden" }}>
                                                    <thead className="product-btn-active">
                                                        <tr className="row">
                                                            <th className="col-lg-2">實體通路名稱</th>
                                                            <th className="col-lg-2">銷售地點</th>
                                                            <th className="col-lg-2">網址</th>
                                                            <th className="col-lg-2">聯絡人</th>
                                                            <th className="col-lg-2">聯絡地址</th>
                                                            <th className="col-lg-2">連絡電話</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {transitTrue.map(d =>
                                                            <tr className="row">
                                                                <td className=" col-lg-2">
                                                                    <p> {d.Compellation ? d.Compellation : factory.InfoAddCN}</p>
                                                                </td>
                                                                <td className=" col-lg-2">
                                                                    <p> {d.Location ? d.Location : factory.InfoAddCN}</p>
                                                                </td>
                                                                <td className="c col-lg-2">
                                                                    <p>
                                                                        {d.Url !== "" && d.Url !== "無" ?
                                                                            <a href={d.Url} target="_blank" className="url-tag" title="(另開視窗)"> {d.Url}</a>
                                                                            : "無"
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td className=" col-lg-2">{d.Sales !== "" ? d.Sales : "無"}</td>
                                                                <td className=" col-lg-2">{d.SalesMobile !== "" ? d.SalesMobile : "無"}</td>
                                                                <td className=" col-lg-2">{d.SalesTel !== "" ? d.SalesTel : "無"}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </div>
                                            {greenStore[0] &&
                                                <>
                                                    <h2 className="content-title "><i className="fas fa-play" aria-hidden="true" alt="綠色商店通路圖示"></i>&nbsp;綠色商店通路</h2>
                                                    <div className="resBtn-wrapper">
                                                        <Table striped bordered hover responsive>
                                                            <thead className="product-btn-active">
                                                                <tr className="row">
                                                                    <th className="col-6 col-lg-2">商店名稱</th>
                                                                    <th className="col-6 col-lg-2">聯絡人</th>
                                                                    <th className="col-6 col-lg-4">聯絡地址</th>
                                                                    <th className="col-6 col-lg-2">聯絡電話</th>
                                                                    <th className="col-12 col-lg-2">Google-Map</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {greenStore.map(data => (
                                                                    <tr className="row">
                                                                        <td className="col-6 col-lg-2">
                                                                            <p>{data.StoreName}</p>
                                                                        </td>
                                                                        <td className="col-6 col-lg-2">
                                                                            <p>{data.UnderTake}</p>
                                                                        </td>
                                                                        <td className="col-6 col-lg-4">
                                                                            <p>{data.StoreAddr}</p>
                                                                        </td>
                                                                        <td className="col-6 col-lg-2">
                                                                            <p>{data.ContactTel}</p>
                                                                        </td>
                                                                        <td className="col-12 col-lg-2">
                                                                            <a href={`https://www.google.com.tw/maps/place/${data.StoreAddr}`} target="_blank" rel="noreferrer noopener" title="(在新視窗開啟鏈結)">
                                                                                <img className="googleMap-img" src={googleMap} alt="googleMap" />
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                ))}


                                                            </tbody>transitVisua
                                                        </Table>
                                                        {transitVisual[0] && (
                                                            <Table bordered responsive>
                                                                <thead className="product-btn-active">
                                                                    <tr>
                                                                        <th className="col-6 col-lg-6">虛擬購物平台名稱</th>
                                                                        {transitVisual.Url && <th className="col-6 col-lg-6">網址</th>}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="col-6 col-lg-6">{transitVisual.Compellation}</td>
                                                                        {transitVisual.Url &&
                                                                            <td className="col-6 col-lg-6">
                                                                                <a href={transitVisual.Url} title="url鏈結">{transitVisual.Url}</a>
                                                                            </td>
                                                                        }
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        )
                                                        }
                                                    </div>
                                                </>
                                            }

                                            {otherInfo.OtherInformation &&
                                                <>
                                                    <h2 className="content-title "><i className="fas fa-play" aria-hidden="true" alt="其他產品說明圖示"></i>&nbsp;其他產品說明</h2>
                                                    <div className="resBtn-wrapper">
                                                        <Table bordered responsive>
                                                            <thead className="product-btn-active">
                                                                <tr>
                                                                    <th className="col-12 col-lg-12">聯絡電話</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="col-12 col-lg-12">
                                                                        {otherInfo.OtherInformation.split("<BR>").map(data =>
                                                                            <p>{data}</p>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    }
                                </Card>
                            </>

                            {/* 
                            {tourType === "1" &&
                                <Card className="mb-3 blueBorder content-card">
                                    <div className="d-block">
                                        <p>其他人也看過</p>
                                        <div className="rec-content-wrapper">
                                            {fetchRecData.map((fetchRecData, index) =>
                                                <Link onClick={() => setNum(fetchRecData.ProjNo)} title={fetchRecData.ProjName} key={index} as={Link} to={`/categories/greenTour/detailPage?${fetchRecData.ProjNo}`}>
                                                    <div className="tour-rec">
                                                        <div className="day-city-wrapper">
                                                            <div className="category-ul">
                                                                <li style={{ background: "#4bcfae" }}>{fetchRecData.TotalDay}日</li>
                                                            </div>
                                                            <div className="city-area">
                                                                <h6>{fetchRecData.Travel === "" ? fetchRecData.CityName : fetchRecData.Travel}</h6>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h6 className="tour-rec-content">{fetchRecData.ProjName}</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            } */}
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 sideCard-container mb-5">

                            <Card className="sideCard product-form-border">
                                <Card.Body>
                                    <h2 className="share-text">其他人也看過</h2>
                                    {fetchRecData.map((fetchRecData, index) =>
                                        <Link onClick={() => setNum(fetchRecData.Id)} title={fetchRecData.NameZH + "-前往連結"} key={`1_${index}`} as={Link} to={`/categories/greenProductdetailPage?product=${fetchRecData.Num}&type=${fetchRecData.Class}`}>
                                            <Card className="mb-3 rec-card">
                                                <div>
                                                    {/* http://localhost:3000/categories/greenProductdetailPage?product=14451&type=1 */}
                                                    <img style={{ width: "100%" }} alt="" src={fetchRecData.ImgByte !== "" ? fetchRecData.ImgByte : "../../images/blankLeef.png"} />
                                                    {/* <img src={fetchRecData.RestUrl === "" ? "../../images/greenTour/unload.PNG" : fetchRecData.RestUrl} alt={fetchRecData.Name} title={fetchRecData.Name} /> */}
                                                    <div><h3 className="rec-title">{fetchRecData.NameZH}</h3></div>
                                                </div>
                                            </Card>
                                        </Link>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>


                    </CardDeck>
                </div>
            </div >
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(ProductPage);