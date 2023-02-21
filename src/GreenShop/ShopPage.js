import React, { useState, useEffect, useRef } from 'react';
import '../carousel.css';
import '../eventDetail.scss';
import '../GreenTour.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';

import { Card, CardDeck } from 'react-bootstrap';
import { clickRecord } from '../utils/API';
import greenLogo from '../images1/greenLogo.gif';
import greenLogo2 from '../images1/greenLogo2.png';
import greenShop from '../images1/greenShop/greenShop.png';
import energyLabel from '../images1/greenShop/energyLabel.png';
import waterLabel from '../images1/greenShop/waterLabel.png';
import buildingLabel from '../images1/greenShop/buildingLabel.png';
import carbonLabel from '../images1/greenShop/carbonLabel.png';
import shopBanner from '../images1/greenShop/shop_banner.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function ShopPage(props) {

    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
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

    const [fetchRecData, setFetchRecData] = useState([]);

    //透過URL抓Num
    const params = new URLSearchParams(history.location.search);
    const [Num, setNum] = useState(params.get('no'));

    const collectTypeId = "7"

    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setNum(params.get('no'))
    }, [location]);

    //點閱計數API
    useEffect(() => {
        clickRecord("40EA54C9-1B3D-4BA3-B5DD-FEB1BC0C3402", "6", collector)
    }, [collector]);


    //標章產品基本資料精準查詢(詳細欄位)
    const [listType, setListType] = useState([]);
    const [markType, setMarkType] = useState([]);
    useEffect(() => {
        //根據ProjNO抓取後端api資料
        const uri = `${props.SSL}//${domainFormal}/APIs/Stores2/${Num}`;
        if (Num)
            fetch(uri, {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log("result",result)
                    setFetchData(result.Detail[0])
                    setPageName(result.Detail[0].StoreName)
                    setListType(result.Detail[0].GoodsListType)
                    setMarkType(result.Detail[0].GoodsMarkType)
                    //其他人也看過-以同產品類別大項，列前3個
                    const uriRec1 = `${props.SSL}//${domainFormal}/APIs/Stores?cn=${result.Detail[0].CityName}`
                    console.log(uriRec1)
                    fetch(uriRec1, {
                        method: 'GET'
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            console.log("其他人也看", result)
                            //刪除同筆資料(刪除ID符合-current url)
                            var removeIndex = result.Detail.map(function (item) { return String(item.Num); }).indexOf(Num);
                            result.Detail.splice(removeIndex, 1);
                            setFetchRecData(result.Detail.slice(0, 3))
                            // let recArray = [...fetchRecData]
                            // recArray.push(result.Detail)
                        })
                })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [Num, domainFormal]);



    //綠色商店商品查詢
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        if (Num)
            fetch(`${props.SSL}//${domainFormal}/APIs/StoreGoods/${Num}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setProductList(result.Detail)
                setLoading(false)

            })
    }, [Num])


    return (
        <>
            <BreadCrumb currentPage={pageName} />
            <AddPoint key={Num} roleId="1" targetGuid={Num} roleItemId="12" autoAdd={true} />
            {/* 上方Banner */}
            <div className={`shop bigbanner mb-3`}>
                <img className="relative banner" src={shopBanner} width="100%" height="100%" alt="Banner" />
                <div className="Button-wrapper">
                    <Link to={`/categories/GreenShopIntro`} className="btn-link">
                        <button className="bannerButton bannerButton-line">
                            綠色商店介紹
                        </button>
                    </Link>
                    <Link to={`/categories/greenShopSearch`} className="onfocus btn-link">
                        <button className="bannerButton bannerButton-line ">
                            綠色商店查詢
                        </button>
                    </Link>
                    {/*  */}
                    <Link to={`/categories/GreenShopIntro/GreenShopApply`} className="btn-link">
                        <button className="bannerButton bannerButton-line soon-btn">
                            <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入綠色商店圖示"></i>
                            &nbsp;加入綠色商店
                        </button>
                    </Link>
                    <Link to={`/categories/GreenShopDownload`} className="btn-link">
                        <button className="bannerButton bannerButton-line none-line">
                            下載專區
                        </button>
                    </Link>
                </div>

                <div className="container-fluid-middle">
                    <CardDeck className="row shop">
                        <div ref={componentRef} style={{ marginTop: "40px" }} className="tour col-12 col-md-9 col-md-9 col-lg-9">
                            <div className="inner-content">
                                <Loader loading={loading} />

                                <Card className="product-form-border border-radius">
                                    <div className="d-flex row res-card-content">
                                        <div className="col-sm-12 col-md-12 col-lg-4">
                                            <div className="tour-img-wrapper height-100">
                                                {fetchData?.StorePic &&
                                                    <img
                                                        className="lazy-load"
                                                        alt={fetchData?.StoreName}
                                                        title={fetchData?.StoreName}
                                                        src={fetchData?.StorePic}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-8">
                                            <div className="content-outside-container">
                                                <div>
                                                    <div className="d-flex">
                                                        <div>
                                                            <div className="">
                                                                <div className="d-flex outterBox">
                                                                    {fetchData.CityName && <p className="city-text">{fetchData.CityName}</p>}
                                                                </div>
                                                                <h1 className="store-name">{fetchData.StoreName}</h1>
                                                                <p className="store-type">{fetchData.StoreClass}</p>
                                                            </div>
                                                        </div>

                                                        <div className="res-logo-wrapper">
                                                            <img className="resType-logo" src={greenShop} alt="綠色商店類別圖示" />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="content-name">
                                                            {/* <h5 className="">{fetchData.NameEN}</h5>
                                                            <h6 className="">{fetchData.Type}</h6> */}
                                                        </div>
                                                        <p className="content-factory">聯絡電話:{fetchData.Phone}</p>
                                                        <p className="content-factory">商店地址:{fetchData.StoreAddr}</p>
                                                    </div>
                                                </div>
                                                <div className="bottom-content-wrapper">

                                                    <SocialBtn myStyle='d-flex justify-content-end' handlePrint={handlePrint} url={`/categories/shop/detailPage?${Num}`} title={pageName} collectTypeId={collectTypeId} activityGuid={Num} collector={collector} history={history} />
                                                    {/* <div className="tour-bottom-text"><p>&emsp;&emsp;※本平台資料為民眾提供作為推廣綠色產品用途，詳情請參閱環保產品查詢網頁。</p></div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Card>

                            </div>

                            <>
                                <Card className="product shop-wrapper product-form-border content-card border-radius">
                                    <div className="">
                                        <h2 className="content-title with-border"><i className="fas fa-play" aria-hidden="true" alt="綠色產品陳列方式圖示"></i>&nbsp;商店特色</h2>
                                        <div className="resBtn-wrapper">
                                            <h3>綠色產品陳列方式</h3>
                                            <ul className="d-flex justify-content-start">
                                                {listType.map((list, index) =>
                                                    <div key={index} className={list.IsMatch ? "shop-btn-active shop-btn" : "shop-btn"}>{list.AboutInfo}</div>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="resBtn-wrapper">
                                            <h3>綠色產品標示方式</h3>
                                            <ul className="d-flex justify-content-start">
                                                {markType.map((list, index) =>
                                                    <div key={index} className={list.IsMatch ? "shop-btn-active shop-btn" : "shop-btn"}>{list.AboutInfo}</div>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="resBtn-wrapper">
                                            <h3>資源回收設施之設置</h3>
                                            <ul className="d-flex justify-content-start">
                                                <div className={"shop-btn-active shop-btn"}>{fetchData.Recycle}處</div>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="">
                                        <h2 className="content-title with-border"><i className="fas fa-play" aria-hidden="true" alt="販賣環保產品圖示"></i>&nbsp;販賣環保產品</h2>
                                        <div className="resBtn-wrapper">
                                            {productList.some(e => e.GClass === '第一類產品') &&
                                                <div className="">
                                                    <div className="align-center">
                                                        <img src={greenLogo} className="label-Img" alt="環保標章產品" />
                                                        <h3>環保標章產品</h3>
                                                    </div>
                                                    <div className="labels-container">
                                                        {/* to={`/categories/product/detailPage?product=4648&type=${list.GClass === "第一類產品" && "1"}`} */}
                                                        {productList.filter(l => l.GClass === "第一類產品").map((list, index) =>
                                                            <div key={index} className="shop-btn-active shop-btn">
                                                                <h3>{list.Name}</h3>
                                                                <p>{list.LabelNo}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>}
                                            {productList.some(e => e.GClass === '第二類環境保護產品') &&
                                                <div className="">
                                                    <div className="align-center">
                                                        <img src={greenLogo2} className="label-Img" alt="第二類環境保護產品" />
                                                        <h3>第二類環境保護產品</h3>
                                                    </div>
                                                    <div className="labels-container">
                                                        {productList.filter(l => l.GClass === "第二類環境保護產品").map((list, index) =>
                                                            <Link to={`/categories/product/detailPage?product=${list.LabelNo}&type=${list.GClass === "第二類環境保護產品" && "2"}`} key={index} className="shop-btn-active shop-btn">
                                                                <h3>{list.Name}</h3>
                                                                <p>{list.LabelNo}</p>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>}
                                            {productList.some(e => e.GClass === '節能標章產品') &&
                                                <div className="">
                                                    <div className="align-center">
                                                        <img src={energyLabel} className="label-Img" alt="節能標章產品" />
                                                        <h3>節能標章產品</h3>
                                                    </div>
                                                    <div className="labels-container">
                                                        {productList.filter(l => l.GClass === "節能標章產品").map((list, index) =>
                                                            <div key={index} className="shop-btn-active shop-btn">
                                                                <h3>{list.Name}</h3>
                                                                <p>{list.LabelNo}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>}
                                            {productList.some(e => e.GClass === '省水標章產品') &&
                                                <div className="">
                                                    <div className="align-center">
                                                        <img src={waterLabel} className="label-Img" alt="省水標章產品" />
                                                        <h3>省水標章產品</h3>
                                                    </div>
                                                    <div className="labels-container">
                                                        {productList.filter(l => l.GClass === "省水標章產品").map((list, index) =>
                                                            <div key={index} className="shop-btn-active shop-btn">
                                                                <h3>{list.Name}</h3>
                                                                <p>{list.LabelNo}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>}
                                            {productList.some(e => e.GClass === '綠建材標章產品') &&
                                                <div className="">
                                                    <div className="align-center">
                                                        <img src={buildingLabel} className="label-Img" alt="綠建材標章產品" />
                                                        <h3>綠建材標章產品</h3>
                                                    </div>
                                                    <div className="labels-container">
                                                        {productList.filter(l => l.GClass === "綠建材標章產品").map((list, index) =>
                                                            <div key={index} className="shop-btn-active shop-btn">
                                                                <h6>{list.Name}</h6>
                                                                <p>{list.LabelNo}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>}
                                            {productList.some(e => e.GClass === '碳標籤產品') &&
                                                <div className="">
                                                    <div className="align-center">
                                                        <img src={carbonLabel} className="label-Img" alt="碳標籤產品" />
                                                        <h3>碳標籤產品</h3>
                                                    </div>
                                                    <div className="labels-container">
                                                        {productList.filter(l => l.GClass === "碳標籤產品").map((list, index) =>
                                                            <div key={index} className="shop-btn-active shop-btn">
                                                                <h3>{list.Name}</h3>
                                                                <p>{list.LabelNo}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>

                                </Card>
                            </>


                        </div>
                        {/* <div className="col-12 col-md-3 col-lg-3 sideCard-container mb-5">
                            <Card className="sideCard product-form-border">
                                <Card.Body>
                                    <h4 className="share-text">其他人也看過</h4> */}
                        {fetchRecData.map((fetchRecData, index) =>
                            <Link onClick={() => setNum(fetchRecData.Id)} title={fetchRecData.NameZH} key={`1_${index}`} as={Link} to={`/categories/greenProductdetailPage?product=${fetchRecData.Num}&type=${fetchRecData.Class}`}>
                                <Card className="mb-3 rec-card">
                                    <div>
                                        {/* http://localhost:3000/categories/greenProductdetailPage?product=14451&type=1 */}
                                        <img style={{ width: "100%" }} alt="" src={fetchRecData.ImgByte !== "" ? fetchRecData.ImgByte : "../../images/blankLeef.png"} />
                                        {/* <img src={fetchRecData.RestUrl === "" ? "../../images/greenTour/unload.PNG" : fetchRecData.RestUrl} alt={fetchRecData.Name} title={fetchRecData.Name} /> */}
                                        <div><h2 className="rec-title">{fetchRecData.NameZH}</h2></div>
                                    </div>
                                </Card>
                            </Link>
                        )}
                        {/* </Card.Body>
                            </Card>
                        </div> */}


                    </CardDeck>
                </div>
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(ShopPage);