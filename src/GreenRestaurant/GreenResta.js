import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import SideBtnOffice from '../Components/SideBtnOffice';
import { Link, withRouter } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import TwCitySelector from 'tw-city-selector';
import ReactPaginate from 'react-paginate';
import greenLogo from '../images1/greenLogo.gif';
import greenBlank from '../images1/restaurant/green-res.png';
import resBanner from '../images1/restaurant/gt_bg1.jpg';

import { getExportDate } from '../utils/Functions';
import { clickRecord } from '../utils/API';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));

function GreenTour(props) {

    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const myPage = params.get('page')

    const resTypeUrl = params.get('type')
    const city = params.get('city')
    const dist = params.get('dist')
    const resKeyword = params.get('search')
    const activity = params.get('activity')
    const extra = params.get('d')
    const level = params.get('level')
    const search = params.get('searched')


    let domainFormal = window.location.hostname === "localhost" ? 'greenliving.eri.com.tw/PublicRwd' : window.location.hostname === "greenlife.eri.com.tw" ? "greenliving.eri.com.tw/PublicRwd" : 'greenliving.epa.gov.tw/newPublic';


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

    const [click, setClick] = useState(false);

    const [loading, setLoading] = useState(true)

    const [fetchData, setFetchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [resType1, setResType1] = useState(false);
    const [resType2, setResType2] = useState(false);
    const [resType3, setResType3] = useState(false);
    const [resType4, setResType4] = useState(false);

    const [zipCode, setZipCode] = useState("");
    const [cityName, setCityName] = useState("");

    const [keyWord, setKeyWord] = useState("");

    const [page, setPage] = useState(myPage);
    const [pageCount, setPageCount] = useState("");

    const [searched, setSearched] = useState(false);


    let activityName = [];
    let actionName = [];
    let levelName = [];

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("40EA54C9-1B3D-4BA3-B5DD-FEB1BC0C3402", "6", collector)
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



    //定義台灣縣市二級下拉選單
    useEffect(() => {
        new TwCitySelector({
            el: '.city-selector-set-has-value',
            elCounty: '.county',
            elDistrict: '.district',
            standardWords: true,
        });
    }, [])

    //台灣縣市二級下拉選單改變觸發事件
    function OnSelectChange(event) {
        const elements = Array.from(document.querySelectorAll(" [data-zipcode]"))
            .find(el => el.innerHTML === event.currentTarget.value);

        setZipCode(event.currentTarget.value)
    }

    //查詢按鈕事件
    const submit = async (e) => {

        window.scrollTo(0, 0)
        if (click) {
            setClick(false)
        }
        setLoading(true)
        //避免重整頁面
        e.preventDefault()

        setSearched(true)

        //判斷綠色餐廳&環保標章餐館
        let resTypeVar
        if (!resType1) {
            if (resType2) {
                if (resType3 || resType4) {
                    resTypeVar = 0
                } else {
                    resTypeVar = 2
                }
            } else {
                if (resType3 || resType4) {
                    resTypeVar = 1
                } else {
                    resTypeVar = 0
                }
            }
        } else {
            if (resType2) {
                if (resType3 || resType4) {
                    resTypeVar = 1
                } else {
                    resTypeVar = 0
                }
            } else {
                resTypeVar = 1
            }
        }


        //判斷環保標章餐館級別勾選
        var levelCheckVar = []

        var levelCheckboxes = document.querySelectorAll('input#gold[type=checkbox]:checked, input#silver[type=checkbox]:checked, input#copper[type=checkbox]:checked')

        for (var i = 0; i < levelCheckboxes.length; i++) {
            levelCheckVar.push(Number(levelCheckboxes[i].value))
            levelName.push(levelCheckboxes[i].name)
        }

        //判斷勾選額外環保作為
        var arrayCheck = []
        var checkboxes = document.querySelectorAll('input#formHorizontalRadios0[type=checkbox]:checked, input#formHorizontalRadios1[type=checkbox]:checked, input#formHorizontalRadios2[type=checkbox]:checked, input#formHorizontalRadios3[type=checkbox]:checked, input#formHorizontalRadios4[type=checkbox]:checked, input#formHorizontalRadios5[type=checkbox]:checked, input#formHorizontalRadios6[type=checkbox]:checked, input#formHorizontalRadios7[type=checkbox]:checked')

        for (i = 0; i < checkboxes.length; i++) {
            arrayCheck.push(Number(checkboxes[i].value))
            actionName.push(checkboxes[i].name)
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

        const formattedVar = num1 + (num2 === false ? "" : ',' + num2)

        //判斷參與的活動勾選
        var activityCheckVar = []
        var activityCheckboxes = document.querySelectorAll('input#visit[type=checkbox]:checked, input#point[type=checkbox]:checked, input#discount[type=checkbox]:checked')

        for (i = 0; i < activityCheckboxes.length; i++) {
            activityCheckVar.push(Number(activityCheckboxes[i].value))
            activityName.push(activityCheckboxes[i].name)
        }



        // const uri = `https://cors-anywhere.herokuapp.com/https://greenliving.eri.com.tw/PublicRwd/APIs/TravelTour?p=${projType}&z=${region}&d=${formatted}&k=${keyWord}`;
        if (levelCheckVar.length !== 0) {
            resTypeVar = 2
        }

        if (arrayCheck.length !== 0 || activityCheckVar.length !== 0) {
            resTypeVar = 1
            if (levelCheckVar.length !== 0) {
                resTypeVar = 0
            }
        }

        const resType = resType1 ? "" : (resType3 && !resType4) ? "1" : (!resType3 && resType4) ? "3" : (resType3 && resType4) ? "1,3" : "";

        history.push(`/categories/restaurant?searched=true&page=1&level=${levelCheckVar}&type=${resTypeVar}&st=${resType}&activity=${activityCheckVar}&d=${formattedVar}&city=${cityName}&dist=${zipCode}&search=${keyWord}`)


        const uri = `${props.SSL}//${domainFormal}/APIs/Restaurant4?m=${levelCheckVar}&r=${resTypeVar}&st=${resType}&a=${activityCheckVar}&i=${formattedVar}&cn=${cityName}&zn=${zipCode}&k=${keyWord}`;

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
                //提交查詢後的頁碼
                setPage(result.PageIndex)
            });
    };

    //改變頁碼後的動作
    let basePage = myPage

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0)

        const resType = resType1 ? "" : (resType3 && !resType4) ? "1" : (!resType3 && resType4) ? "3" : (resType3 && resType4) ? "1,3" : "";

        //依查詢條件fetch
        const uriSearched = `${props.SSL}//${domainFormal}/APIs/Restaurant4/${basePage}?m=${level}&r=${resTypeUrl}&st=${resType}&a=${activity}&i=${extra}&cn=${city}&zn=${dist}&k=${resKeyword}`;

        //預設-查詢前全行程
        const uri = `${props.SSL}//${domainFormal}/APIs/Restaurant4/${basePage}`;

        //如果網址參數有值(代表是查詢結果的換頁事件)就fetch:uriSearched,
        // 沒有值(代表是全部行程的換頁事件)就fetch:uri
        fetch((search === 'true' ? uriSearched : uri), {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                setSearchCount(result.RowsCount)
                setFetchData(result.Detail)

                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                setPage(result.PageIndex)
                // console.log(result.RowsCount / 10)
            });

    }, [basePage, domainFormal]);

    const resType = resType1 ? "" : (resType3 && !resType4) ? "1" : (!resType3 && resType4) ? "3" : (resType3 && resType4) ? "1,3" : "";

    const handlePageClick = (data) => {


        setPage(data.selected + 1);
        history.push(`/categories/restaurant?searched=${searched}&page=${data.selected + 1}&level=${level}&type=${resTypeUrl}&st=${resType}&activity=${activity}&d=${extra}&city=${city}&dist=${dist}&search=${resKeyword}`)

    };

    // 匯出EXCEL
    function handleExportExcel() {
        //依查詢條件fetch
        const uriSearched = `${props.SSL}//${domainFormal}/APIs/RestaurantIntro/${searchCount}?m=${level}&r=${resTypeUrl}&st=${resType}&a=${activity}&i=${extra}&cn=${city}&zn=${dist}&k=${resKeyword}`;

        //預設-查詢前全行程
        const uri = `${props.SSL}//${domainFormal}/APIs/RestaurantIntro/${searchCount}`;

        var XLSX = require('xlsx');

        if (fetchData.length !== 0) {
            fetch((search == true ? uriSearched : uri), {
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
                        delete item.AddressZip
                        delete item.Id
                        delete item.ImgByte
                        delete item.Introduction
                        delete item.Lon
                        delete item.Latitude
                        delete item.LicenseNo
                        delete item.Longitude
                        delete item.OfficialWebsite
                        delete item.RestNo
                        delete item.RestView
                        delete item.SubType
                        item.Active = item.Active === "4" ? "環保集點" : "--"
                        item.RestType = item.RestType === 1 ? "綠色餐廳" : "環保餐館"
                        item.Notes = "--"
                        // 級別轉中文
                        fetchData.forEach(d => {
                            if (d.Notes !== "" && item.Name === d.Name) {
                                item.Notes = d.Notes
                            }
                        })
                        // 環保作為轉中文
                        let inquiry = []
                        item.Inquiry.split(",").forEach(d => {
                            switch (d) {
                                case "1": inquiry.push("環境管理")
                                    break;
                                case "2": inquiry.push("綠色採購")
                                    break;
                                case "3": inquiry.push("食材及餐點")
                                    break;
                                case "4": inquiry.push("源頭減量")
                                    break;
                                case "5": inquiry.push("惜食(打包服務)")
                                    break;
                                case "6": inquiry.push("惜食(善用食材)")
                                    break;
                                case "7": inquiry.push("環境教育")
                                    break;
                            }
                        })
                        item.Inquiry = inquiry.toString()
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
                    ws.A1.v = "餐廳類別"
                    ws.B1.v = "縣市別"
                    ws.C1.v = "餐廳名稱"
                    ws.D1.v = "餐廳電話"
                    ws.E1.v = "餐廳地址"
                    ws.F1.v = "參與活動"
                    ws.G1.v = "額外環保作為"
                    ws.H1.v = "環保標章餐館級別"

                    XLSX.utils.book_append_sheet(wb, ws, "Table Export");
                    XLSX.writeFile(wb, `綠生活_綠色餐廳_${fileDate}.ods`);

                    /* generate an XLSX file */
                    // XLSX.writeFile(wb, "sheetjs.xlsx");
                });
        }
    }



    return (
        <>
            <div className={click ? "ac-aside-backdrop show" : "ac-aside-backdrop"} onClick={() => setClick(false)}></div>
            <BreadCrumb />
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
                            <h1 style={{ fontSize: "calc(12px + 0.6vw)", fontWeight: "600", marginBottom: "0" }}>
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="綠色餐廳查詢圖示"></i>
                                &nbsp;綠色餐廳查詢</h1>
                        </button>
                    </Link>
                    {/*  */}
                    <a className="btn-link" target="_blank" title="另開視窗" rel="noopener noreferrer" href={`${props.SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} onClick={() => clickRecord("E54B7ABD-B570-4AAA-9ACD-3C6201A82F8C", "6", collector)}>
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
            <div style={{ height: click ? "calc(55vh + 30px)" : "auto", overflow: "hidden" }} className="row justify-content-center restaurant res-hidden-content">
                <div onClick={() => setClick(!click)} className="responsive-search">
                    <i className="fas fa-search" aria-hidden="true" alt="圖示"></i><div className="responsive-search-text">關鍵字、縣市別、地區、餐廳性質、環保標章餐館、參與的活動、額外環保行為</div>
                </div>


                <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-tour show' : 'search-tour'} `}>
                    <Form className="form-text col-12">
                        <div className="col-md-3 col-lg-12">
                            <Form.Label for="key-word" className="col-12 res-bottom-line bottom-line form-label col-form-label col" style={{ color: "rgb(255, 153, 51)" }}>關鍵字查詢</Form.Label>
                            <Form.Control style={{ borderColor: "#FF9933" }} id="key-word" placeholder="請輸入關鍵字" onChange={e => setKeyWord(e.target.value)} title="請輸入關鍵字" />
                            <span className="keyword-note">可查詢餐廳名稱/統一編號</span>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="county" className="col-12 res-bottom-line bottom-line">縣市別</Form.Label>
                            <div role="tw-city-selector" className="city-selector-set-has-value" data-has-zipcode data-standard-words>
                                <Col sm={12}>
                                    <div>
                                        <select className="county" id="county" onChange={(e) => {
                                            setCityName(e.target.value)
                                        }} title="Select City"></select>
                                    </div>
                                </Col>
                                <Form.Label as="legend" for="district" column className="col-12 res-bottom-line bottom-line">地區<span className="section-note">(鄉/鎮/市/區)</span></Form.Label>
                                <Col sm={12}>
                                    <div>
                                        <select className="district" id="district" onChange={OnSelectChange}></select>
                                    </div>
                                </Col>
                            </div>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="greenRes" className="col-12 res-bottom-line bottom-line">餐廳性質</Form.Label>
                            <Col sm={12}>
                                <Form.Check
                                    label="綠色餐廳"
                                    name="綠色餐廳"
                                    type="checkbox"
                                    id="greenRes"
                                    value="1"
                                    onChange={() => {
                                        setResType1(!resType1)
                                    }}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            setResType1(!resType1)
                                        }
                                    }} />
                                <Form.Check
                                    label="環保標章餐館"
                                    name="環保標章餐館"
                                    type="checkbox"
                                    id="verify"
                                    value="2"
                                    onChange={() => {
                                        setResType2(!resType2)
                                    }}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            setResType2(!resType2)
                                        }
                                    }} />
                                <Form.Check
                                    label="綠色餐廳(員工餐廳)"
                                    name="綠色餐廳(員工餐廳)"
                                    type="checkbox"
                                    id="greenEmployee"
                                    value="3"
                                    onChange={() => {
                                        setResType3(!resType3)
                                    }}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            setResType3(!resType3)
                                        }
                                        setResType3(!resType3)
                                    }} />
                                <Form.Check
                                    label="綠色餐廳(AMOT溯源餐廳)"
                                    name="綠色餐廳(AMOT溯源餐廳)"
                                    type="checkbox"
                                    id="greenNature"
                                    value="4"
                                    onChange={() => {
                                        setResType4(!resType4)
                                    }}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            setResType4(!resType4)
                                        }
                                    }} />
                            </Col>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="gold" className="col-12 res-bottom-line bottom-line">環保標章餐館級別 </Form.Label>
                            <Col sm={12}>
                                <Form.Check className="level gold" label="金級" name="金級" type="checkbox" id="gold" value="1" />
                                <Form.Check className="level silver" label="銀級" name="銀級" type="checkbox" id="silver" value="2" />
                                <Form.Check className="level copper" label="銅級" name="銅級" type="checkbox" id="copper" value="3" />
                            </Col>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="visit" className="col-12 res-bottom-line bottom-line">參與的活動 </Form.Label>
                            <Col sm={12}>

                                <Form.Check className="pati visit" label="環保集點" name="環保集點" type="checkbox" id="visit" value="4" />
                                {/* <Form.Check className="pati point" label="消費贈點" name="消費贈點" type="checkbox" id="point" value="2" />
                                    <Form.Check className="pati discount" label="點數折抵" name="點數折抵" type="checkbox" id="discount" value="3" /> */}
                            </Col>
                        </div>

                        <div className="col-md-5  col-lg-12">
                            <Form.Label for="formHorizontalRadios0" className="col-12 res-bottom-line bottom-line">
                                額外環保作為 </Form.Label>
                            <Col sm={12}>
                                <Form.Check
                                    type="checkbox"
                                    label="全部"
                                    name="全部"
                                    id="formHorizontalRadios0"
                                    value="0"

                                />
                                <Form.Check
                                    type="checkbox"
                                    label="環境管理"
                                    name="環境管理"
                                    id="formHorizontalRadios1"
                                    value="1"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="綠色採購"
                                    name="綠色採購"
                                    id="formHorizontalRadios2"
                                    value="2"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="食材及餐點"
                                    name="食材及餐點"
                                    id="formHorizontalRadios3"
                                    value="3"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="源頭減量"
                                    name="源頭減量"
                                    id="formHorizontalRadios4"
                                    value="4"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="惜食(打包服務)"
                                    name="惜食(打包服務)"
                                    id="formHorizontalRadios5"
                                    value="5"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="惜食(善用食材)"
                                    name="惜食(善用食材)"
                                    id="formHorizontalRadios6"
                                    value="6"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="環境教育"
                                    name="環境教育"
                                    id="formHorizontalRadios7"
                                    value="7"
                                />
                            </Col>
                        </div>

                        <Button className="res-searchButton category-search-button mt-3 col-12" variant="primary" type="submit" onClick={submit} >
                            <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                            查詢
                        </Button>
                        <Button id="btnExportExcel" className="res-searchButton category-search-button mt-3 col-12" variant="primary" onClick={handleExportExcel}>
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
                                            <a as={Link} key={index} target="_blank" rel="noreferrer noopener" href={`/categories/restaurant/detailPage?res=${fetchData.Id}&type=${fetchData.RestType}`}>
                                                <Card className="res-card">
                                                    <div className="d-flex row content-wrapper search-list-card">
                                                        <div className="col-4 res-img">
                                                            <img
                                                                className="lazy-load"
                                                                alt={fetchData.Name}
                                                                title={fetchData.Name}
                                                                src={"../../images/blankLeef.png"}
                                                                data-src={fetchData.ImgByte !== "" ? fetchData.ImgByte : "../../images/blankLeef.png"} />
                                                            {/* <img src={fetchData.RestPicList[0].RestUrl === "" ? "../images/greenTour/unload.PNG" : fetchPicPath} alt={fetchData.Name} title={fetchData.Name} /> */}
                                                        </div>
                                                        <div className="col-8 rs-right-content">
                                                            <div className="d-flex">
                                                                <div>
                                                                    <div className="d-flex justify-content-start category-ul">
                                                                        {fetchData.RestType === 1 ?
                                                                            <li style={{ background: "#ffbb00" }}>綠色餐廳</li>
                                                                            :
                                                                            <li style={{ background: "#ffbb00" }}>環保標章餐館</li>

                                                                        }
                                                                        {fetchData.SubType.includes("1") &&
                                                                            <li style={{ background: "#FE6568" }}>員工餐廳</li>
                                                                        }
                                                                        {fetchData.Active.indexOf(4) === -1 ?
                                                                            ""
                                                                            : <li style={{ background: "#67cf06" }}>環保集點</li>
                                                                        }
                                                                        {fetchData.SubType.includes("3") &&
                                                                            <li style={{ background: "#1c7c54" }}>AMOT溯源餐廳</li>
                                                                        }
                                                                        {fetchData.RestNo !== "" &&
                                                                            <li style={{ background: "#FF9A35" }}>{fetchData.RestNo}</li>
                                                                        }
                                                                        {/* {fetchData.Active.indexOf(2) === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#f05f5f" }}>消費贈點</li>
                                                                    }

                                                                    {fetchData.Active.indexOf(3) === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#1ec0f1" }}>點數折抵</li>
                                                                    } */}
                                                                        {fetchData.Notes.indexOf("金級") === -1 ||
                                                                            <li style={{ background: "#ff9933" }}>金級</li>
                                                                        }
                                                                        {fetchData.Notes.indexOf("銀級") === -1 ||
                                                                            <li style={{ background: "#999999" }}>銀級</li>
                                                                        }
                                                                        {fetchData.Notes.indexOf("銅級") === -1 ||
                                                                            <li style={{ background: "#cc5c28" }}>銅級</li>
                                                                        }
                                                                    </div>
                                                                    <div className="content-name">
                                                                        <div className="d-flex outterBox">
                                                                            <p>{fetchData.Address.substring(0, 3)}</p>
                                                                        </div>
                                                                        <h2 title={fetchData.Name} className="res-title">{fetchData.Name}</h2>
                                                                    </div>

                                                                </div>

                                                                <div className="res-logo-wrapper">
                                                                    <img className="resType-logo" src={fetchData.RestType === 1 ? greenBlank : greenLogo} alt="綠色餐廳類別圖示" />
                                                                </div>
                                                            </div>
                                                            <div className="res-address">
                                                                <h3 className="ad-subtitle"><i className="fas fa-home" aria-hidden="true" alt="餐廳地址圖示"></i>&nbsp;餐廳地址:</h3>
                                                                <h3 className="ad-content" title={fetchData.Address}>{fetchData.Address.replaceAll("台", "臺")}</h3>
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
                        {/* <ul
                            style={{ visibility: loading ? 'hidden' : 'visible' }}
                            className="page-lists"
                        >
                            <Pagination.Prev
                                className="list-btn"
                                onClick={() => {
                                    setPage(page - 1)
                                    history.push(`/categories/restaurant?searched=${searched}&page=${page - 1}&level=${level}&type=${resTypeUrl}&activity=${activity}&d=${extra}&city=${city}&dist=${dist}&search=${resKeyword}`)
                                    // searched ? setSearchedPage(searchedPage - 1) : setPage(page - 1)
                                }}
                                disabled={(page === 1) ?
                                    true : false}
                            />
                            {lists}
                            <Pagination.Next
                                onClick={() => {
                                    setPage(page + 1)
                                    history.push(`/categories/restaurant?searched=${searched}&page=${page + 1}&level=${level}&type=${resTypeUrl}&activity=${activity}&d=${extra}&city=${city}&dist=${dist}&search=${resKeyword}`)
                                    // searched ? setSearchedPage(searchedPage + 1) : setPage(page + 1)
                                }}
                                disabled={(page === pageCount) ?
                                    true : false}
                            />
                        </ul> */}
                    </>
                </div>
            </div>

            {/* <SideBtn history={history} type={"綠色餐廳"} /> */}
            <SideBtnOffice history={useHistory()} type={"綠色餐廳"} />
            <Footer />


        </>
    );
}

export default withRouter(GreenTour);