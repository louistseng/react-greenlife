import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';

import { Link } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { getExportDate } from '../utils/Functions';
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { clickRecord } from '../utils/API';
import tourBanner from '../images1/greenTour/gt_bg.jpg';
import TwCitySelector from 'tw-city-selector';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Loader = React.lazy(() => import('../Components/Loader'));
const TourItem = React.lazy(() => import('../Components/Greenliving/TourItem'));
const SideBtnOffice = React.lazy(() => import('../Components/SideBtnOffice'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));

function GreenTour(props) {
    var XLSX = require('xlsx');

    //從URL抓搜尋參數
    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const myPage = params.get('page')
    const [tourType, setTourType] = useState(params.get('type') || "2");
    const tourDay = params.get('d')
    const tourKeyword = params.get('search')
    const tourRegion = params.get('region')
    const search = params.get('searched')

    const domainFormal = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    let domainTest = "greenliving.eri.com.tw/PublicRwd"

    const [click, setClick] = useState(false);
    const [prevType, setPrevType] = useState("");
    const [loading, setLoading] = useState(true)

    const [fetchData, setFetchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [totalDay1, setTotalDay1] = useState(false);
    const [totalDay2, setTotalDay2] = useState(false);
    const [totalDay3, setTotalDay3] = useState(false);

    const [keyWord, setKeyWord] = useState("");
    const [page, setPage] = useState(myPage)
    const [pageCount, setPageCount] = useState("")

    const [searched, setSearched] = useState(false)
    const [cityName, setCityName] = useState("");

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        if (tourType === "1") {
            clickRecord("28230434-907A-4A44-9372-F45135119701", "7", collector)
        } else if (tourType === "2") {
            clickRecord("C9B6683C-03CB-4553-A5B5-1B73AD971371", "7", collector)
        }
    }, [tourType, collector]);

    const totalDay1Change = () => {
        setTotalDay1(!totalDay1)

    }
    const totalDay2Change = () => {
        setTotalDay2(!totalDay2)

    }
    const totalDay3Change = () => {
        setTotalDay3(!totalDay3)
    }

    //查詢按鈕事件
    const submit = (e) => {
        window.scrollTo(0, 0)
        setLoading(true)
        if (click) {
            setClick(false)
        }
        //避免重整頁面
        e.preventDefault()
        setSearched(true)

        //判斷勾選天數
        var arrayCheck = []
        var checkboxes = document.querySelectorAll('input#formHorizontalRadios1[type=checkbox]:checked, input#formHorizontalRadios2[type=checkbox]:checked, input#formHorizontalRadios3[type=checkbox]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            arrayCheck.push(Number(checkboxes[i].value))
        }

        let num1, num2;

        if (arrayCheck.length === 1) {
            if (arrayCheck[0] !== 3) {
                num1 = arrayCheck[0]
                num2 = arrayCheck[0]
            } else {
                num1 = arrayCheck[0]
                num2 = false
            }

        } else if (arrayCheck.length === 2) {
            num1 = arrayCheck[0]
            num2 = arrayCheck[1]
        } else {
            num1 = ''
            num2 = ''
        }

        //天數-回傳格式整理
        const formattedVar = num1 + (num2 === false ? "" : ',' + num2)

        //判斷區域勾選
        var regionCheckVar = []
        var regionCheckboxes = document.querySelectorAll('input#north[type=checkbox]:checked, input#mid[type=checkbox]:checked, input#south[type=checkbox]:checked, input#east[type=checkbox]:checked, input#near[type=checkbox]:checked')
        for (i = 0; i < regionCheckboxes.length; i++) {
            regionCheckVar.push(Number(regionCheckboxes[i].value))
        }

        //提交查詢時,push參數到URL
        history.push(`/categories/greenTour?searched=true&type=${tourType}&region=${regionCheckVar}&d=${formattedVar}&search=${keyWord}`)

    };

    function handleExport() {
        const sizeUri = `${props.SSL}//${domainFormal}/APIs/TravelTourExcel/${searchCount}?p=${tourType}&z=${tourRegion}&d=${tourDay}&k=${tourKeyword === null ? "" : tourKeyword}`
        // const sizeUri = `https://greenliving.epa.gov.tw/newPublic/GreenTravel/GetTravelExcel?ProjTypeStr=${tourType}&Zoom=${tourRegion}&StrDay=${tourDay}&Key=${keyWord}`

        if (fetchData.length !== 0) {
            fetch(sizeUri, {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    const fileName = tourType === "1" ? "自由行行程" : "團體行程"
                    const fileDate = getExportDate()
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                    var ws = XLSX.utils.json_to_sheet(result.Detail);
                    //隱藏橫列
                    // ws['!rows'] = [];
                    // ws['!rows'][0] = { hidden: true };
                    //隱藏直行
                    ws['!cols'] = [];
                    // ws['!cols'][1] = { hidden: true };
                    // ws['!cols'][0] = { hidden: true };
                    var wb = XLSX.utils.book_new();

                    if (tourType === "2") {
                        ws.A1.v = "核定編號"
                        ws.B1.v = "地區"
                        ws.C1.v = "旅行社名稱"
                        ws.D1.v = "行程名稱"
                        ws.E1.v = "行程天數"
                        ws.F1.v = "價格"
                        ws.G1.v = "行程特色"
                        ws.H1.v = "行程內容"
                        ws.I1.v = "旅行社網站"
                        ws.J1.v = "旅行社電話"
                        ws.K1.v = "報名網址"
                    } else if (tourType === "1") {
                        ws.A1.v = "縣市"
                        ws.B1.v = "行程名稱"
                        ws.C1.v = "天數"
                        ws.D1.v = "行程特色"
                        ws.E1.v = "行程內容"
                        ws.F1.v = "綠色景點"
                        ws.G1.v = "綠色餐廳"
                        ws.H1.v = "環保旅館"
                    }

                    XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
                    XLSX.writeFile(wb, `綠生活_綠色旅遊_${fileName}${fileDate}.ods`);

                    /* generate an XLSX file */
                    // XLSX.writeFile(wb, "sheetjs.xlsx");

                });

        }
    }

    //改變頁碼後的動作
    let basePage = myPage

    useEffect(() => {

        setPrevType(tourType)

        if (tourType && prevType && tourType !== prevType) {
            setKeyWord('')
            var checkboxes = document.querySelectorAll('input#formHorizontalRadios1[type=checkbox]:checked, input#formHorizontalRadios2[type=checkbox]:checked, input#formHorizontalRadios3[type=checkbox]:checked')
            var regionCheckboxes = document.querySelectorAll('input#north[type=checkbox]:checked, input#mid[type=checkbox]:checked, input#south[type=checkbox]:checked, input#east[type=checkbox]:checked, input#near[type=checkbox]:checked')
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false
            }
            for (i = 0; i < regionCheckboxes.length; i++) {
                regionCheckboxes[i].checked = false
            }
        }

        setLoading(true)
        window.scrollTo(0, 0)

        //依查詢條件fetch
        const uriSearched = `${props.SSL}//${domainFormal}/APIs/TravelTour/${basePage}?p=${tourType}&z=${tourRegion}&d=${tourDay}&k=${tourKeyword}`;
        //預設-查詢前全行程
        const uri = `${props.SSL}//${domainFormal}/APIs/TravelTour/${basePage}?p=${tourType}`;

        //如果網址參數有值(代表是查詢結果的換頁事件)就fetch:uriSearched,
        // 沒有值(代表是全部行程的換頁事件)就fetch:uri

        const getFetchData = async () => {
            try {
                const response = await fetch((search === 'true' ? uriSearched : uri));
                const result = await response.json();
                console.log(result)
                setLoading(false)
                setSearchCount(result.RowsCount)
                setFetchData(result.Detail)
                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                setPage(result.PageIndex);
            } catch (err) {
                // console.log(err)
            }
        }
        getFetchData()

    }, [basePage, tourType, domainFormal, tourKeyword, prevType, search, tourDay, tourRegion]);

    const handlePageClick = (data) => {

        setPage(data.selected + 1);
        history.push(`/categories/greenTour?searched=${searched}&page=${data.selected + 1}&type=${tourType}&region=${tourRegion}&d=${tourDay}&search=${tourKeyword}`)

    };


    return (
        <>

            <div className={click ? "ac-aside-backdrop show" : "ac-aside-backdrop"} onClick={() => setClick(false)}></div>
            <BreadCrumb />
            {/* <TourBanner intro={"綠色旅遊介紹"} search={"行程查詢"} category={"greenTour"} color={'#218cb6'} introLink={'tourIntro'} download={"tourDownload"} /> */}

            <div className={`greenTour bigbanner mb-3`}>
                <img className="relative" src={tourBanner} width="100%" height="100%" alt="Banner" />

                <div className="Button-wrapper">
                    <Link to={`/categories/tourIntro`} className="btn-link">
                        <button className="bannerButton bannerButton-line">
                            <i className="fas fa-binoculars" aria-hidden="true" alt="綠色旅遊介紹圖示"></i>
                            &nbsp;綠色旅遊介紹
                        </button>
                    </Link>
                    {/* 切換h1標題標籤 */}
                    {tourType !== "1" &&
                        <Link to={`/categories/greenTour?type=1`} onClick={() => setTourType("1")} className={tourType === "1" ? "onfocus btn-link" : "btn-link"}>
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="自由行查詢圖示"></i>
                                &nbsp;自由行查詢
                            </button>
                        </Link>}
                    {tourType === "1" &&
                        <Link to={`/categories/greenTour?type=1`} onClick={() => setTourType("1")} className={tourType === "1" ? "onfocus btn-link" : "btn-link"}>
                            <button className="bannerButton bannerButton-line ">
                                <h1 style={{ fontSize: "calc(12px + 0.6vw)", fontWeight: "600", marginBottom: "0" }}>
                                    <i className="fas fa-map-marker-alt" aria-hidden="true" alt="自由行查詢圖示"></i>
                                    &nbsp;自由行查詢
                                </h1>
                            </button>
                        </Link>}
                    {/* 切換h1標題標籤 */}
                    {tourType !== "2" &&
                        <Link to={`/categories/greenTour?type=2`} onClick={() => setTourType("2")} className={tourType === "2" ? "onfocus btn-link" : " btn-link"}>
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-search" aria-hidden="true" alt="團體旅遊查詢圖示"></i>
                                &nbsp;團體旅遊查詢
                            </button>
                        </Link>}
                    {tourType === "2" &&
                        <Link to={`/categories/greenTour?type=2`} onClick={() => setTourType("2")} className={tourType === "2" ? "onfocus btn-link" : " btn-link"}>
                            <button className="bannerButton bannerButton-line">
                                <h1 style={{ fontSize: "calc(12px + 0.6vw)", fontWeight: "600", marginBottom: "0" }}>
                                    <i className="fas fa-search" aria-hidden="true" alt="團體旅遊查詢圖示"></i>
                                    &nbsp;團體旅遊查詢
                                </h1>
                            </button>
                        </Link>}
                    <Link to={`/categories/tourDownload`} className="btn-link">
                        <button className="bannerButton bannerButton-line none-line">
                            <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                            &nbsp;下載專區
                        </button>
                    </Link>
                </div>
            </div>

            <div style={{ height: click ? "calc(55vh + 30px)" : "auto", overflow: "hidden" }} className="row justify-content-center  restaurant res-hidden-content">
                <div onClick={() => setClick(!click)} className="responsive-search tour-color">
                    <i className="fas fa-search" aria-hidden="true" alt="圖示"></i><div className="responsive-search-text">關鍵字、核定編號、旅行社、景點名稱、行程類別、區域、 行程天數</div>
                </div>

                <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-tour show' : 'search-tour'} `}>
                    <Form className="form-text col-12">
                        <div className="col-md-3 col-lg-12">
                            <Form.Label for="key-word" className="col-12 bottom-line tour-bottom-line form-label col-form-label col" style={{ color: "rgb(33, 140, 182)" }}>關鍵字查詢</Form.Label>
                            <Form.Control placeholder="請輸入關鍵字" id="key-word" onChange={e => setKeyWord(e.target.value)} value={keyWord} aria-label="請輸入關鍵字" />
                            <span className="keyword-note">{tourType === "2" ? "*可查詢核定編號/旅行社/景點名稱" : "*可查詢景點名稱"}</span>
                        </div>
                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="north" className="col-12 bottom-line tour-bottom-line form-label col-form-label col">區域</Form.Label>
                            <Col sm={12}>
                                <Form.Check label="北部" name="北部" type="checkbox" id="north" value="1" />
                                <Form.Check label="中部" name="中部" type="checkbox" id="mid" value="2" />
                                <Form.Check label="南部" name="南部" type="checkbox" id="south" value="3" />
                                <Form.Check label="東部" name="東部" type="checkbox" id="east" value="4" />
                                <Form.Check label="離島" name="離島" type="checkbox" id="near" value="5" />
                            </Col>
                        </div>

                        {/* <fieldset className="col-md-5 col-lg-12">
                            <legend className="col-12 bottom-line tour-bottom-line form-label col-form-label col">縣市別</legend>
                            <div role="tw-city-selector" className="city-selector-set-has-value" data-has-zipcode data-standard-words>
                                <Col sm={12}>
                                    <div>
                                        <select className="county" id="county" onChange={(e) => {
                                            setCityName(e.target.value)
                                        }} title="Select City"></select>
                                    </div>
                                </Col>
                                <Form.Label as="legend" for="district" column className="col-12 bottom-line tour-bottom-line form-label col-form-label col">地區<span className="section-note">(鄉/鎮/市/區)</span></Form.Label>
                                <Col sm={12}>
                                    <div>
                                        <select className="district" id="district"></select>
                                    </div>
                                </Col>
                            </div>
                        </fieldset> */}

                        <div className="col-md-5  col-lg-12">
                            <Form.Label for="formHorizontalRadios1" className="col-12 bottom-line tour-bottom-line form-label col-form-label col">
                                行程天數</Form.Label>
                            <Col sm={12}>
                                <Form.Check
                                    type="checkbox"
                                    label="1日"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    value="1"
                                    onChange={totalDay1Change}

                                />
                                <Form.Check
                                    type="checkbox"
                                    label="2日"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    value="2"
                                    onChange={totalDay2Change}

                                />
                                <Form.Check
                                    type="checkbox"
                                    label="3日以上(含)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios3"
                                    onChange={totalDay3Change}
                                    value="3"

                                />
                            </Col>
                        </div>

                        <Button className="searchButton category-search-button col-12" variant="primary" type="submit" onClick={submit} >
                            <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                            &nbsp;查詢
                        </Button>
                        <Button className="exportButton col-12" onClick={handleExport}><i className="far fa-arrow-alt-circle-down" aria-hidden="true" alt="匯出圖示"></i>&nbsp;匯出</Button>
                        {/* <a target="_blank" href={`https://greenliving.epa.gov.tw/newPublic/GreenTravel/GetTravelExcel?ProjTypeStr=${tourType}&Zoom=${tourRegion}&StrDay=${tourDay}&Key=${keyWord}`}>1111</a> */}
                    </Form>
                </div>
                <div className="col-10 col-lg-8 ">
                    <div className="">
                        <div className="d-flex search-result">
                            <p className="">查詢結果 :</p>
                            <div className="right-result">
                                <div className="sorted-count-wrapper">
                                    <page>此頁{fetchData.length}筆</page>
                                    <page>共有{searchCount}筆</page>
                                    <page>{page}/{pageCount}頁 </page>
                                </div>

                            </div>
                        </div>

                        <div className="inner-content">
                            {loading ? <Loader loading={loading} /> :
                                fetchData
                                    // .sort((a, b) => {
                                    //     if (a.TravelTourNo < b.TravelTourNo) return -1;
                                    //     if (a.TravelTourNo > b.TravelTourNo) return 1;
                                    // })
                                    .map((fetchData, index) =>
                                        <TourItem fetchData={fetchData} index={index} />
                                    )
                            }
                        </div>
                    </div>
                    <>
                        {!loading &&
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
                        }
                    </>
                </div>
            </div>
            {tourType === "2" ?
                <SideBtnOffice history={history} type={"團體旅遊"} />
                :
                <SideBtn history={history} />
            }
            <Footer />


        </>
    );
}

export default GreenTour;