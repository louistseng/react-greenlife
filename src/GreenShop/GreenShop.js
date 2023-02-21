import React, { useState, useEffect } from 'react';
import '../GreenShop.scss';

import { Link, withRouter } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import greenShop from '../images1/greenShop/greenShop.png';
import { clickRecord } from '../utils/API';
import { getCityName, getCityId, formatDate, getExportDate, formatDateTime } from '../utils/Functions';
import shopBanner from '../images1/greenShop/shop_banner.jpg';
import { set } from 'react-ga';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));

const shopColor = "#e5848a";

function GreenShop(props) {

    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const myPage = params.get('page')

    const typeCode = params.get('t') || ""
    const search = params.get('searched') || ""

    //let hostname = "greenliving.epa.gov.tw/newPublic";
    //let domainTest = "greenliving.eri.com.tw/PublicRwd"

    //let resFormal = "https://greenliving.epa.gov.tw";
    //let resTest = "https://greenliving.eri.com.tw";

    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    // let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let hostname = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";


    const [click, setClick] = useState(false);

    const [loading, setLoading] = useState(true)

    const [fetchData, setFetchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [cityName, setCityName] = useState(params.get('cn') || "");
    const [keyWord, setKeyWord] = useState(params.get('k') || "");
    const [shopType, setShopType] = useState(params.get('sc') || "B");
    const [onlineShopType, setOnlineShopType] = useState("");
    const [page, setPage] = useState(myPage);
    const [pageCount, setPageCount] = useState("");

    const [searched, setSearched] = useState(false);
    const [showOnline, setShowOnline] = useState(false);

    const [jumpPage, setJumpPage] = useState("greenShopDetailPage");

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("6EAD2038-C299-4CEB-9C46-B9B8433642F2", "9", collector)
    }, [collector]);


    //延遲載入Lazy-loading
    let options = {
        root: null,
        rootMargin: '300px',
        threshold: 0.1
    }

    const lazyLoadImages = (entries, observer) => {

        entries.map(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.getAttribute('data-src');
                // entry.target.visibility = "visible"
                // console.log(entry)
            }
            return null

        })
    }

    let observer = new IntersectionObserver(lazyLoadImages, options);
    let observTargets = document.querySelectorAll('.lazy-load');

    observTargets.forEach(target => observer.observe(target))


    //查詢按鈕事件
    const submit = async (e) => {
        setJumpPage("greenShopDetailPage");

        window.scrollTo(0, 0)
        if (click) {
            setClick(false)
        }
        setLoading(true)
        //避免重整頁面
        e.preventDefault()
        setSearched(true)

        history.push(`/categories/greenShopSearch?searched=true&page=1&t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`)

        let uri = `${props.SSL}//${hostname}/APIs/Stores?t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`;
        if (onlineShopType !== "") {
            // const testSite = "https://greenliving.eri.com.tw/PublicRwd";
            uri = `${props.SSL}//${hostname}/APIs/StoresWeb`;
            setJumpPage("greenOnlineShopDetailPage");
            history.push(`/categories/greenShopSearch?searched=true&page=1&t=${typeCode}&cn=${cityName}&k=${keyWord}&no=${onlineShopType}`)

        }
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setLoading(false)
                setFetchData(result.Detail)
                //取得總頁數 = 總比數 / 每頁筆數 +1
                setSearchCount(result.RowsCount)
                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                // console.log(result.RowsCount / 10)
                //提交查詢後的頁碼
                setPage(result.PageIndex)
            });
    };

    //改變頁碼後的動作
    let basePage = myPage

    useEffect(() => {


        setLoading(true)
        window.scrollTo(0, 0)

        //依查詢條件fetch
        let uriSearched = `${props.SSL}//${hostname}/APIs/Stores/${basePage}?t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`;

        //預設-查詢前全行程
        let uri = `${props.SSL}//${hostname}/APIs/Stores/${basePage}?t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`;


        if (onlineShopType !== "") {
            uriSearched = `${props.SSL}//${hostname}/APIs/StoresWeb`;
            uri = `${props.SSL}//${hostname}/APIs/StoresWeb`;
        }

        //如果網址參數有值(代表是查詢結果的換頁事件)就fetch:uriSearched,
        // 沒有值(代表是全部行程的換頁事件)就fetch:uri
        fetch((search === 'true' ? uriSearched : uri), {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setLoading(false)
                setSearchCount(result.RowsCount)
                setFetchData(result.Detail)
                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                setPage(result.PageIndex)
                // console.log(result.RowsCount / 10)
            });

    }, [basePage, hostname]);

    function handleExportExcel() {
        //依查詢條件fetch
        let uriSearched = `${props.SSL}//${hostname}/APIs/StoresIntro/${searchCount}?&t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`;

        //預設-查詢前全行程
        let uri = `${props.SSL}//${hostname}/APIs/StoresIntro/${searchCount}?&t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`;

        if (onlineShopType !== "") {
            uriSearched = `${props.SSL}//${hostname}/APIs/StoresWebIntro/${searchCount}`;
            uri = `${props.SSL}//${hostname}/APIs/StoresWebIntro/${searchCount}`;
        }

        var XLSX = require('xlsx');

        if (fetchData.length !== 0) {
            fetch((search === 'true' ? uriSearched : uri), {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log("xlsx-result", result.Detail)
                    const file = result.Detail;
                    const fileDate = getExportDate()
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    file.forEach(item => {
                        delete item.Email
                        delete item.ImageName
                        delete item.StoreID
                        delete item.StoreNickName
                        delete item.StorePic
                        delete item.TypeName
                    })

                    // console.log(file)
                    var ws = XLSX.utils.json_to_sheet(result.Detail);
                    //隱藏橫列
                    // ws['!rows'] = [];
                    // ws['!rows'][0] = { hidden: true };
                    //隱藏直行
                    ws['!cols'] = [];
                    // ws['!cols'][1] = { hidden: true };
                    // ws['!cols'][0] = { hidden: true };
                    var wb = XLSX.utils.book_new();
                    if (onlineShopType !== "") {
                        ws.A1.v = "綠色商店名稱"
                        ws.B1.v = "商店網站"
                        ws.C1.v = "商店編號"
                        ws.D1.v = "聯絡人"
                        ws.E1.v = "聯絡電話"
                    } else {
                        ws.A1.v = "綠色商店名稱"
                        ws.B1.v = "縣市"
                        ws.C1.v = "聯絡地址"
                        ws.D1.v = "商店編號"
                        ws.E1.v = "聯絡人"
                        ws.F1.v = "連絡電話"
                        ws.G1.v = "綠色商店類型"
                    }
                    XLSX.utils.book_append_sheet(wb, ws, "Table Export");
                    XLSX.writeFile(wb, `綠生活_綠色商店_${fileDate}.ods`);

                    /* generate an XLSX file */
                    // XLSX.writeFile(wb, "sheetjs.xlsx");
                });
        }
    }

    //縣市別下拉式選單API
    const [cityDrop, setCityDrop] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/Common/Citys`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setCityDrop(result.resultObject)
                // console.log(result)
            });
    }, [props.SSL, props.domain])


    const handlePageClick = (data) => {

        setPage(data.selected + 1);
        history.push(`/categories/greenShopSearch?searched=${searched}&page=${data.selected + 1}&t=${typeCode}&cn=${cityName}&k=${keyWord}&sc=${shopType}`)

    };

    const displayPhysical = () => {
        setOnlineShopType("");
        setShowOnline(false);
    }

    const displayOnline = () => {
        setOnlineShopType("O")
        setShowOnline(true);
    }

    const showItem = {
        show: {
            display: ""
        },
        hide: {
            display: "none"
        },
        button: {
            backgroundColor: "rgb(229, 132, 138)",
            borderRadius: "8px",
            fontSize: "calc(12px + 1vw)",
            width: "48%",
            margin: "10px 2px",
            border: "1px solid #e5848a",
            padding: "0%"
        }
    }

    return (
        <>
            <div className={click ? "ac-aside-backdrop show" : "ac-aside-backdrop"} onClick={() => setClick(false)}></div>
            <BreadCrumb currentPage={"綠色商店查詢"} />
            <div className={`shop bigbanner mb-3`}>
                <img className="relative banner" src={shopBanner} width="100%" height="100%" alt="綠色商店" />

                <div className="Button-wrapper">
                    <Link to={`/categories/GreenShopIntro`} className="btn-link">
                        <button className="bannerButton bannerButton-line">
                            <i className="fas fa-binoculars" aria-hidden="true" alt="綠色商店介紹圖示"></i>
                            &nbsp;綠色商店介紹
                        </button>
                    </Link>
                    <Link to={`/categories/greenShopSearch`} className="onfocus btn-link">
                        <button className="bannerButton bannerButton-line ">
                            <h1 style={{ fontSize: "calc(12px + 0.6vw)", fontWeight: "600", marginBottom: "0" }}>
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="綠色商店查詢圖示"></i>
                                &nbsp;綠色商店查詢
                            </h1>
                        </button>
                    </Link>
                    <Link to={`/categories/GreenShopIntro/GreenShopApply`} className="btn-link" target="_blank">
                        <button className="bannerButton bannerButton-line soon-btn">
                            <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入綠色商店圖示"></i>
                            &nbsp;加入綠色商店
                        </button>
                    </Link>
                    <Link to={`/categories/GreenShopDownload`} className="btn-link">
                        <button className="bannerButton bannerButton-line none-line">
                            <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                            &nbsp;下載專區
                        </button>
                    </Link>
                </div>
            </div>
            {/* <TourBanner intro={"綠色商店介紹"} search={"綠色商店查詢"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}
            <div style={{ height: click ? "calc(55vh + 30px)" : "auto", overflow: "hidden" }} className="row justify-content-center restaurant res-hidden-content">
                <div onClick={() => setClick(!click)} className="responsive-search">
                    <i className="fas fa-search" aria-hidden="true" alt="圖示"></i><div className="responsive-search-text">關鍵字、縣市別、地區、商店性質</div>
                </div>


                <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-tour show' : 'search-tour'} `}>
                    <Form className="form-text col-12">
                        <div className="col-md-3 col-lg-12">
                            <Form.Label for="key-word" className="col-12 shop-bottom-line bottom-line form-label col-form-label col" style={{ color: shopColor }}>關鍵字查詢</Form.Label>
                            <Form.Control style={{ borderColor: shopColor }} placeholder="請輸入關鍵字" id="key-word" onChange={e => setKeyWord(e.target.value)} aria-label="請輸入關鍵字" />
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="county" className="col-12 shop-bottom-line bottom-line form-label col-form-label col" style={{ color: shopColor }}>縣市別詢</Form.Label>
                            <Form.Control className="shop-form-border" as="select" aria-label="縣市別" id="county" value={getCityId(cityName)} onChange={(e) => {
                                setCityName(getCityName(e.target.value))
                                //history.push(`/searchEvent?page=${page}&pageNews=${pageNews}&city=${e.target.value}&org=${organizer}&keyword=${activityTitle}&theme=${activityThemeId}&startDate=${startDate}&endDate=${endDate}&searched=1`)
                            }}>
                                <option value="">請選擇</option>
                                {cityDrop.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId} >{fetchData.cityName}</option>
                                )}
                            </Form.Control>
                        </div>

                        <div className="col-md-3 col-lg-12">
                            <Form.Label for="shop-name" className="col-12 shop-bottom-line bottom-line form-label col-form-label col" style={{ color: shopColor }}>商店名稱</Form.Label>
                            <Form.Control className="shop-form-border" placeholder="請輸入商店名稱" id="shop-name" onChange={e => setKeyWord(e.target.value)} aria-label="請輸入商店名稱" />
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="exampleFormControlSelect1" as="legend" column className="col-12 shop-bottom-line bottom-line form-label col-form-label col" style={{ color: shopColor }}>商店類別</Form.Label>
                            <div className="shop-type">
                                <Button className="physicalStore" onClick={displayPhysical} style={showItem.button} >
                                    實體商店
                                </Button>
                                <Button className="onlineStore" onClick={displayOnline} style={showItem.button} >
                                    網路商店
                                </Button>
                            </div>
                            <select className="shop-form-border form-control" id="exampleFormControlSelect1"
                                style={showOnline ? showItem.hide : showItem.show}
                                onChange={e => {
                                    setShopType(e.target.value)
                                }} aria-label="商品類別">
                                {/*<option value="">請選擇</option>*/}
                                <option value="B">非連鎖型</option>
                                <option value="A">連鎖型</option>
                            </select>
                            <select className="shop-form-border form-control" id="selectOnlineStore"
                                style={showOnline ? showItem.show : showItem.hide}
                                onChange={e => {
                                    setOnlineShopType(e.target.value)
                                }} aria-label="商品類別">
                                {/*<option value="">請選擇</option>*/}
                                <option value="O">網路綠色商店</option>
                            </select>
                        </div>


                        <Button className="shop-searchButton category-search-button mt-3 col-12" variant="primary" type="submit" onClick={submit} >
                            <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                            查詢
                        </Button>
                        <Button id="btnExportExcel" className="shop-searchButton category-search-button mt-3 col-12" variant="primary" onClick={handleExportExcel}>
                            <i className="far fa-arrow-alt-circle-down" aria-hidden="true" alt="匯出EXCEL圖示"></i>&nbsp;匯出EXCEL
                        </Button>
                    </Form>
                </div>
                <div className="col-10 col-lg-8 ">
                    <div className="">
                        <div className="d-flex search-result">
                            <p className="">查詢結果 :</p>
                            <div className="right-result">
                                <div className="sorted-count-wrapper">
                                    <p>此頁{fetchData.length}筆</p>
                                    <p>共有{searchCount}筆</p>
                                    <p>{page}/{pageCount}頁 </p>
                                </div>

                            </div>
                        </div>
                        {loading
                            ?
                            <Loader loading={loading} />
                            :
                            <div className="inner-content">

                                {fetchData.length === 0
                                    ?
                                    <div className="embla-bottom">
                                        <div className="embla__viewport">
                                            <p>查無搜尋結果</p>
                                        </div>
                                    </div>
                                    :
                                    fetchData
                                        // .sort((a, b) => {
                                        //     if (a.TravelTourNo < b.TravelTourNo) return -1;
                                        //     if (a.TravelTourNo > b.TravelTourNo) return 1;
                                        // })
                                        .map((fetchData, index) =>
                                            <a as={Link} key={index} target="_blank" rel="noreferrer noopener" href={`/categories/${jumpPage}?no=${fetchData.StoreID}`}>
                                                <Card className="res-card">
                                                    <div className="d-flex row content-wrapper search-list-card">
                                                        <div className="col-4 res-img">
                                                            <img
                                                                className="lazy-load"
                                                                alt={fetchData.StoreName}
                                                                title={fetchData.StoreName}
                                                                src={"../../images/blankLeef.png"}
                                                                data-src={fetchData.StorePic !== "" ? fetchData.StorePic : "../../images/blankLeef.png"} />
                                                            {/* <img src={fetchData.RestPicList[0].RestUrl === "" ? "../images/greenTour/unload.PNG" : fetchPicPath} alt={fetchData.Name} title={fetchData.Name} /> */}
                                                        </div>
                                                        <div className="col-8 rs-right-content shop-content">
                                                            <div className="d-flex">
                                                                <div>
                                                                    <div className="">
                                                                        <div className="d-flex outterBox">
                                                                            <p className="city-text">{fetchData.CityName}</p>
                                                                        </div>
                                                                        <h2 className="store-name">{fetchData.StoreName}</h2>
                                                                        <p className="store-type">{fetchData.StoreClass}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="res-logo-wrapper">
                                                                    <img className="resType-logo" src={greenShop} alt="綠色商店類別圖示" />
                                                                </div>
                                                            </div>
                                                            <div className="res-address">
                                                                <h3 className="ad-subtitle"><i className="fas fa-home" aria-hidden="true" alt="商店地址圖示"></i>&nbsp;商店地址:</h3>
                                                                <h3 className="ad-content">{fetchData.StoreAddr.replaceAll("台", "臺")}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </a>

                                        )}
                            </div>
                        }
                    </div>
                    <>
                        <ReactPaginate
                            forcePage={page - 1}
                            style={{ visibility: loading ? 'hidden' : 'visible' }}
                            previousLabel={'上一頁'}
                            nextLabel={'下一頁'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                        />
                    </>
                </div>
            </div>

            <SideBtn history={history} />
            <Footer />


        </>
    );
}

export default withRouter(GreenShop);