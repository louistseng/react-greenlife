import React, { useState, useEffect } from 'react';
import '../GreenProduct.scss';
import { Link, withRouter } from 'react-router-dom';
import { Card, Table, Form, Button, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Logo from "../../src/images1/green-logo.PNG";
import greenLogo from '../images1/greenLogo.gif';
import greenLogo2 from '../images1/greenLogo2.png';
import labelBanner from '../images1/greenProduct/label_banner.jpg';
import { clickRecord } from '../utils/API';
import { formatDate, getExportDate, formatDateTime } from '../utils/Functions';
import printJS from 'print-js'

import EcoMark_1 from '../images1/EcoMark/01節能標章.png';
import EcoMark_2 from '../images1/EcoMark/02省水標章.png';
import EcoMark_3 from '../images1/EcoMark/03綠建材標章.png';
import EcoMark_4 from '../images1/EcoMark/04減碳標籤.png';
import EcoMark_5 from '../images1/EcoMark/05投審會.png';
import EcoMark_6 from '../images1/EcoMark/06採購網.png';
import PdfIcon from '../images1/download/PdfIcon.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));

var yearList = [];

const productColor = "#a279ad";
const yearBegin = 1994;
const yearEnd = new Date().getFullYear()

for (let i = 0; i <= (yearEnd - yearBegin); i++) {
    yearList.push(yearEnd - i);

}
var DateTime = new Date();

function GreenProduct(props) {

    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const myPage = params.get('page')

    const cn = params.get('cn') || ""
    const ctn = params.get('ctn') || ""
    const t = params.get('t') || ""
    const k = params.get('k') || ""
    const sta = params.get('sta') || ""
    const crn = params.get('crn') || ""
    const num = params.get('num') || ""
    const y = params.get('y') || ""
    const m = params.get('m') || ""
    const search = params.get('searched') || ""

    let hostname = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    const [click, setClick] = useState(false);

    const [loading, setLoading] = useState(true)

    const [fetchData, setFetchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [keyWord, setKeyWord] = useState("");
    const [tonerKeyWord, setTonerKeyWord] = useState("");
    const [applyingKeyWord, setApplyingKeyWord] = useState("");
    const [corpName, setCorpName] = useState("");
    const [serialType, setSerialType] = useState("");
    const [productNum, setProductNum] = useState("");

    const [page, setPage] = useState(myPage);
    const [pageCount, setPageCount] = useState("");
    const [year, setYear] = useState("");
    const [searched, setSearched] = useState(false);
    const [statusCheckName, setStatusCheckName] = useState([]);

    const [productTypeId, setProductTypeId] = useState(0);
    const [productListId, setProductListId] = useState(0);

    const [month, setMonth] = useState("")

    const [showEpProduct, setShowEpProduct] = useState(false);
    const [showTonerCartridge, setShowTonerCartridge] = useState(false);
    const [showApplyingCase, setShowApplyingCase] = useState(false);
    const [functionName, setFunctionName] = useState("environment-protect-product");

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("8367205F-8B79-4617-AA63-6B103155E806", "11", collector)
    }, [collector]);

    // 常見的環保標章產品進入頁面
    useEffect(() => {
        if (cn !== "") {
            setSearched(true)
        }
    }, [searched, cn])

    //規格標準大分類清單(精簡欄位)
    const [productTypeDrop, setProductTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${hostname}/APIs/CriteriaTypeList`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).then(result => {
            // console.log(result)
            setProductTypeDrop(result.Detail)
        })

        // 進入畫面查詢類別顯示環保標章類別查詢
        setShowEpProduct(true);
        setShowTonerCartridge(false);
        setShowApplyingCase(false);
    }, [hostname, props.SSL])

    //規格標準清單(精簡欄位)
    const [productListDrop, setProductListDrop] = useState([]);
    useEffect(() => {
        if (productTypeId)
            fetch(`${props.SSL}//${hostname}/APIs/CriteriaList/${productTypeId}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setProductListDrop(result.Detail)
            })
    }, [hostname, productTypeId, props.SSL])


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
            }
            return null
        })
    }

    let observer = new IntersectionObserver(lazyLoadImages, options);
    let observTargets = document.querySelectorAll('.lazy-load');

    observTargets.forEach(target => observer.observe(target))

    const key = keyWord.split(" ").join("");
    const tonerKeyword = tonerKeyWord.split(" ").join("");
    const applyingKeyword = applyingKeyWord.split(" ").join("");
    // console.log("key", key)

    let producutTypeCheckVar = []
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

        //判斷證書狀態勾選
        var statusCheckVar = []
        var activityCheckboxes = document.querySelectorAll('input#statusCheck0[type=checkbox]:checked, input#statusCheck1[type=checkbox]:checked, input#statusCheck2[type=checkbox]:checked, input#statusCheck3[type=checkbox]:checked, input#statusCheck4[type=checkbox]:checked, input#statusCheck5[type=checkbox]:checked')

        for (const element of activityCheckboxes) {
            statusCheckVar.push(Number(element.value))
        }
        var checkName = []
        for (const element of activityCheckboxes) {
            checkName.push(element.name)
        }
        setStatusCheckName(checkName)

        history.push(`/categories/greenProductSearch?searched=true&page=1&sta=${statusCheckVar}&k=${key}&crn=${corpName}&t=${serialType}&ctn=${productTypeId === 0 ? "" : productTypeId}&cn=${productListId === 0 ? "" : productListId}${productNum && '&num=' + productNum}&y=${year}&m=${month}`)

        let uri = `${props.SSL}//${hostname}/APIs/ProductsQuery?sta=${statusCheckVar}&k=${key}&crn=${corpName}&t=${serialType}&ctn=${productTypeId === 0 ? "" : productTypeId}&cn=${productListId === 0 ? "" : productListId}${productNum && '&num=' + productNum}&y=${year}&m=${month}`;


        if (functionName === 'toner-cartridge') {
            let productCheckboxes = document.querySelectorAll('input#producutType0[type=checkbox]:checked, input#producutType1[type=checkbox]:checked, input#producutType2[type=checkbox]:checked, input#producutType3[type=checkbox]:checked')
            for (const element of productCheckboxes) {
                producutTypeCheckVar.push(Number(element.value))
            }
            uri = `${props.SSL}//${hostname}/APIs/ProductsQuery?ctn=first&sta=${statusCheckVar}${producutTypeCheckVar !== [] && `&cn=${producutTypeCheckVar}`}${tonerKeyword && `&k=${tonerKeyword}`}`;
            history.push(`/categories/greenProductSearch?searched=true&page=1&sta=${statusCheckVar}${tonerKeyword && `&k=${tonerKeyword}`}&ctn=first${producutTypeCheckVar && `&cn=${producutTypeCheckVar}`}`);
        }

        if (functionName === 'applying-case') {
            history.push(`/categories/greenProductSearch?searched=true&page=1${applyingKeyword && `&k=${applyingKeyword}`}&ct=${productTypeId === 0 ? "" : productTypeId}&c=${productTypeId == "" || productListId === 0 ? "" : productListId}`);

            uri = `${props.SSL}//${hostname}/APIs/Application?_=eri${applyingKeyword && `&k=${applyingKeyword}`}&ct=${productTypeId === 0 ? "" : productTypeId}&c=${productTypeId == "" || productListId === 0 ? "" : productListId}`;
        }

        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                setLoading(false)
                setFetchData(result.Detail)
                //取得總頁數 = 總比數 / 每頁筆數 +1
                setSearchCount(result.RowsCount)
                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                setPage(result.PageIndex)
                setProductTypeId(0)
                setProductListId(0)
                setKeyWord("")
            });
    };


    //改變頁碼後的動作
    let basePage = myPage

    //依查詢條件fetch
    let uriSearched = `${props.SSL}//${hostname}/APIs/ProductsQuery/${basePage}?sta=${sta}&k=${k}&crn=${corpName}&t=${serialType}&ctn=${ctn}&cn=${cn}${num && '&num=' + num}&y=${y}&m=${m}`;

    let uri = `${props.SSL}//${hostname}/APIs/ProductsQuery/${basePage}`;

    if (functionName === 'applying-case') {
        uriSearched = `${props.SSL}//${hostname}/APIs/Application/${basePage}?_=eri${key && `&k=${key}`}&ct=${productTypeId === 0 ? "" : productTypeId}&c=${productTypeId == "" || productListId === 0 ? "" : productListId}${productNum && '&num=' + productNum}`;
        uri = `${props.SSL}//${hostname}/APIs/Application/${basePage}`;

    }
    // console.log(uriSearched)

    //所有列表-匯出
    let searchAll = `${props.SSL}//${hostname}/APIs/ProductsQueryAll/1?sta=${sta}&k=${k}&crn=${corpName}&t=${serialType}&ctn=${ctn}&cn=${cn}${num && '&num=' + num}&y=${y}&m=${m}`;

    let All = `${props.SSL}//${hostname}/APIs/ProductsQueryAll/1`
    // console.log(searchAll)

    useEffect(() => {
        setLoading(false)

        //     //如果網址參數有值(代表是查詢結果的換頁事件)就fetch:uriSearched,
        //     // 沒有值(代表是全部行程的換頁事件)就fetch:uri
        //     // fetch((search === 'true' ? uriSearched : uri)

        if (search === 'true') {
            setLoading(true)
            window.scrollTo(0, 0)
            fetch((uriSearched), {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    setLoading(false)
                    setSearchCount(result.RowsCount)
                    setFetchData(result.Detail)
                    // console.log(result)
                    setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                    setPage(result.PageIndex)
                    // console.log(result.RowsCount / 10)
                });
        }

    }, [basePage, hostname, search, showApplyingCase, uri, uriSearched]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/categories/greenProductSearch?searched=${searched}&page=${data.selected + 1}&sta=${sta}&k=${k}&crn=${crn}&t=${t}&ctn=${ctn}&cn=${cn}${num && '&num=' + num}&y=${y}&m=${m}`);
        if (showEpProduct) {
            history.push(`/categories/greenProductSearch?searched=${searched}&page=${data.selected + 1}&sta=${sta}&k=${k}&crn=${crn}&t=${t}&ctn=${ctn}&cn=${cn}${num && '&num=' + num}&y=${y}&m=${m}`);
        }

        if (showTonerCartridge) {
            history.push(`/categories/greenProductSearch?searched=${searched}&page=${data.selected + 1}&sta=${sta}${tonerKeyword && `&k=${tonerKeyword}`}&ctn=first${producutTypeCheckVar && `&cn=${cn}`}`);
        }

        if (showApplyingCase) {
            history.push(`/categories/greenProductSearch?searched=${searched}&page=${data.selected + 1}${applyingKeyword && `&k=${applyingKeyword}`}&ct=${productTypeId === 0 ? "" : productTypeId}&c=${productTypeId == "" || productListId === 0 ? "" : productListId}`);
        }
        if (cn !== "") {
            history.push(`/categories/greenProductSearch?searched=${searched}&page=${page + 1}&sta=${sta}&k=${k}&crn=${crn}&t=${t}&ctn=${ctn}&cn=${cn}${num && '&num=' + num}&y=${y}&m=${m}`);
        }
    };

    function handleExportExcel() {
        var XLSX = require('xlsx');

        if (functionName === 'toner-cartridge') {
            // const selectTonerCartridgeValue = selectTonerCartridgeRef.current.value;
            searchAll = `${props.SSL}//${hostname}/APIs/ProductsQuery?ctn=first&sta=${sta}${producutTypeCheckVar && `&cn=${producutTypeCheckVar}`}${tonerKeyword && `&k=${tonerKeyword}`}`;
            All = `${props.SSL}//${hostname}/APIs/ProductsQuery`;
        }

        if (functionName === 'applying-case') {
            searchAll = `${props.SSL}//${hostname}/APIs/Application`;
            All = `${props.SSL}//${hostname}/APIs/Application`;
        }


        if (fetchData.length !== 0) {
            fetch((search === 'true' ? searchAll : All), {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log("result", result.Detail)
                    const file = result.Detail;
                    const fileDate = getExportDate()
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    file.forEach(item => {
                        delete item.CorpFrontMan
                        delete item.CorpNameEn
                        delete item.ManufacturerNumber
                        delete item.NameEN
                        delete item.ProView
                        delete item.SignDate
                        delete item.Memo
                        delete item.ImgByte
                        delete item.PdfUrl

                        item.copyFactoryName = item.FactoryName?.slice(0, -1)
                        item.copyFactoryAddr = item.FactoryAddr?.slice(0, -1)
                        item.copyCriteriaClass = item.CriteriaClass
                        item.copyCriteriaClassNo = item.CriteriaClassNo
                        item.copyCriteria = item.Criteria
                        item.copyCriteriaNo = item.CriteriaNo
                        item.copyValidDate = formatDate(item.ValidDate)
                        item.copyVerificationName = item.VerificationName

                        delete item.FactoryName
                        delete item.FactoryAddr
                        delete item.CriteriaClass
                        delete item.CriteriaClassNo
                        delete item.Criteria
                        delete item.CriteriaNo
                        delete item.ValidDate
                        delete item.VerificationName

                    })

                    console.log("file", file)
                    var ws = XLSX.utils.json_to_sheet(result.Detail);
                    ws['!cols'] = [];

                    var wb = XLSX.utils.book_new();
                    ws.A1.v = "證書狀態"
                    ws.B1.v = "類別"
                    ws.C1.v = "標章號碼"
                    ws.D1.v = "產品名稱"
                    ws.E1.v = "型號"
                    ws.F1.v = "系列型號"
                    ws.G1.v = "公司名稱"
                    ws.H1.v = "工廠名稱"
                    ws.I1.v = "工廠地址"
                    ws.J1.v = "規格標準大分類"
                    ws.K1.v = "規格標準大分類編號"
                    ws.L1.v = "規格標準/環境訴求"
                    ws.M1.v = "規格標章編號"
                    ws.N1.v = "證書期限"
                    ws.O1.v = "驗證機構"



                    XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
                    XLSX.writeFile(wb, `綠生活_環保標章_${fileDate}.ods`);
                });
        }
    }


    function handleExportPdf() {

        const ctnType = productTypeDrop.filter(item => item.CriteriaTypeNo === ctn).map(data => data.CriteriaClass)
        const cnType = productListDrop.filter(item => String(item.CriteriaNo) === cn).map(data => data.Criteria)

        if (functionName === 'toner-cartridge') {
            // const selectTonerCartridgeValue = selectTonerCartridgeRef.current.value;
            searchAll = `${props.SSL}//${hostname}/APIs/ProductsQuery?ctn=first&sta=${sta}${producutTypeCheckVar && `&cn=${producutTypeCheckVar}`}${tonerKeyword && `&k=${tonerKeyword}`}`;
            All = `${props.SSL}//${hostname}/APIs/ProductsQuery`;
        }

        if (functionName === 'applying-case') {
            searchAll = `${props.SSL}//${hostname}/APIs/Application`;
            All = `${props.SSL}//${hostname}/APIs/Application`;
        }

        fetch((search === 'true' ? searchAll : All), {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log("all", result.Detail)
                const file = result.Detail;
                file.forEach(item => {
                    item.ValidDate = formatDate(item.ValidDate)
                })
                printJS({
                    printable: file, properties: [
                        { field: 'ShowStatus', displayName: '證書狀態' },
                        { field: 'Class', displayName: '類別' },
                        { field: 'Num', displayName: '標章號碼' },
                        { field: 'NameZH', displayName: '產品名稱' },
                        { field: 'CorpName', displayName: '公司名稱' },
                        { field: 'FactoryName', displayName: '工廠名稱' },
                        { field: 'FactoryAddr', displayName: '工廠地址' },
                        { field: 'CriteriaClass', displayName: '規格標準大分類' },
                        { field: 'Criteria', displayName: '規格標準/環境訴求' },
                        { field: 'ValidDate', displayName: '證書期限' },
                    ], type: 'json',
                    documentTitle: '全民綠生活資訊平台-環保標章',
                    style: '.custom-h4 { color:red; display:flex; float:right }' +
                        '.logo { width: 20%; display:flex; float:right }',
                    header: `<h1><img class="logo" src=${Logo} alt='Logo'></img></h1>` +
                        '<h2>環保標章產品查詢結果</h2>' +
                        `<h3>查詢條件：</h3>` +
                        '\n' +
                        `<h4>關鍵字查詢：${k}</h4>` +
                        '\n' +
                        `<h4>廠商名稱：${crn}</h4>` +
                        '\n' +
                        `<h4>型號/系列型號：${t}</h4>` +
                        '\n' +
                        `<h4>產品類別：${ctnType + '&nbsp;' + cnType}</h4>` +
                        '\n' +
                        `<h4>標章號碼：${num}</h4>` +
                        '\n' +
                        `<h4>當月發證：${y ? y + '年' : ''}${m ? m + '月' : ''}</h4>` +
                        '\n' +
                        `<h4>證書狀態：${sta !== '' ? statusCheckName : ''}</h4>` +
                        `<h4 class="custom-h4">共${searchCount}筆資料&nbsp;&nbsp;查詢時間：${formatDateTime(DateTime)}</h4> `,
                })
            });
    }

    const shopColor = "#ab65e4";

    const displayEnvironmentalProtection = () => {
        setFunctionName('environment-protect-product');

        setShowEpProduct(true);
        setShowTonerCartridge(false);
        setShowApplyingCase(false);

        history.push(`/categories/greenProductSearch`);
    }

    const displayTonerCartridge = () => {
        setFunctionName('toner-cartridge');

        setShowEpProduct(false);
        setShowTonerCartridge(true);
        setShowApplyingCase(false);

        history.push(`/categories/greenProductSearch`);
    }

    const displayApplyingCase = () => {
        setFunctionName('applying-case');

        setShowEpProduct(false);
        setShowTonerCartridge(false);
        setShowApplyingCase(true);

        history.push(`/categories/greenProductSearch`);
    }


    const buttonClass = {
        button: {
            backgroundColor: "#a279ad",
            borderRadius: "8px",
            fontSize: "1.2rem",
            width: "48%",
            margin: "10px 2px",
            border: "1px solid #a279ad",
            padding: "4px",
            color: "#FFF",
            textAlign: "center"
        },
        applyingButton: {
            backgroundColor: "#a279ad",
            borderRadius: "8px",
            fontSize: "1.2rem",
            width: "100%",
            margin: "10px 2px",
            border: "1px solid #a279ad",
            padding: "4px",
            color: "#FFF",
            textAlign: "center"
        }
    }

    const iconStyle = {
        pdf: {
            width: "calc(36px + 1.2vw)",
            padding: "5px"
        }
    }

    function isDisplay(functionName) {
        switch (functionName) {
            case 'environment-protect-product':
                if (document.getElementById('divKeywordSearch') !== null) {

                    document.getElementById('divKeywordSearch').style.display = 'none';
                    document.getElementById('fieldsetKeywordSearch').style.display = 'block';
                    document.getElementById('fieldsetApplyingKeywordSearch').style.display = 'none';

                    document.getElementById('fieldsetTradeNameInput').style.display = 'block';
                    document.getElementById('fieldsetTypeNoInput').style.display = 'block';
                    document.getElementById('fieldsetProductCategory').style.display = 'block';
                    document.getElementById('fieldsetLabelNoInput').style.display = 'block';
                    document.getElementById('fieldsetCertificateSelect').style.display = 'block';
                    document.getElementById('fieldsetCertificateStatus').style.display = 'block';

                    document.getElementById('btnExportExcel').style.display = 'block';
                    document.getElementById('btnExportPDF').style.display = 'block';
                }

                break;
            case 'toner-cartridge':
                document.getElementById('divKeywordSearch').style.display = 'block';
                document.getElementById('fieldsetKeywordSearch').style.display = 'none';
                document.getElementById('fieldsetApplyingKeywordSearch').style.display = 'none';

                document.getElementById('fieldsetTradeNameInput').style.display = 'none';
                document.getElementById('fieldsetTypeNoInput').style.display = 'none';
                document.getElementById('fieldsetProductCategory').style.display = 'none';
                document.getElementById('fieldsetLabelNoInput').style.display = 'none';
                document.getElementById('fieldsetCertificateSelect').style.display = 'none';
                document.getElementById('fieldsetCertificateStatus').style.display = 'block';

                document.getElementById('btnExportExcel').style.display = 'block';
                document.getElementById('btnExportPDF').style.display = 'block';
                break;
            case 'applying-case':
                document.getElementById('divKeywordSearch').style.display = 'none';
                document.getElementById('fieldsetKeywordSearch').style.display = 'none';
                document.getElementById('fieldsetTradeNameInput').style.display = 'none';
                document.getElementById('fieldsetApplyingKeywordSearch').style.display = 'block';

                document.getElementById('fieldsetTypeNoInput').style.display = 'none';
                document.getElementById('fieldsetProductCategory').style.display = 'block';
                document.getElementById('fieldsetLabelNoInput').style.display = 'none';
                document.getElementById('fieldsetCertificateSelect').style.display = 'none';
                document.getElementById('fieldsetCertificateStatus').style.display = 'none';

                document.getElementById('btnExportExcel').style.display = 'none';
                document.getElementById('btnExportPDF').style.display = 'none';
                break;

            default:
                break;
        }
    }

    return (
        <>
            <div className={click ? "ac-aside-backdrop show" : "ac-aside-backdrop"} onClick={() => setClick(false)}></div>
            <BreadCrumb currentPage={"環保產品查詢"} />
            <div className={`product bigbanner mb-3`}>
                <img className="relative banner" src={labelBanner} width="100%" height="100%" alt="環保產品查詢" />

                <div className="Button-wrapper">
                    <Link to={`/categories/GreenProductIntro`} className="btn-link">
                        <button className="bannerButton bannerButton-line">
                            <i className="fas fa-binoculars" aria-hidden="true" alt="環保產品介紹圖示"></i>
                            &nbsp;環保產品介紹
                        </button>
                    </Link>
                    <Link to={`/categories/greenProductSearch`} className="onfocus btn-link">
                        <button className="bannerButton bannerButton-line ">
                            <h1 className="m-0">
                                <i className="fas fa-search" aria-hidden="true" alt="環保產品查詢圖示"></i>
                                &nbsp;環保產品查詢
                            </h1>
                        </button>
                    </Link>
                    <Link to={`/categories/GreenSpecificationSearch`} className="btn-link">
                        <button className="bannerButton bannerButton-line soon-btn">
                            <i className="fas fa-search" aria-hidden="true" alt="環保標章規格查詢圖示"></i>
                            &nbsp;環保標章規格查詢
                        </button>
                    </Link>
                    <Link to={`/greenLabel/GreenMarkIntroMarkApply`} className="btn-link">
                        {/*  */}
                        {/*<a href={`${SSL}//${hostname}/MarkApply`} target="_blank" className="btn-link">*/}
                        {/* <Link to={`/greenLabel/GreenMarkIntroMarkApply`} className="btn-link"> */}

                        <button className="bannerButton bannerButton-line soon-btn">
                            <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入環保產品圖示"></i>
                            &nbsp;加入環保產品
                            {/* <span id="e"> &nbsp;加入綠色餐廳</span>
                            <span id="f">&nbsp;&nbsp;近期開放</span> */}
                        </button>
                    </Link>
                    <Link to={`/categories/GreenProductDownload`} className="btn-link">
                        <button className="bannerButton bannerButton-line none-line">
                            <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                            &nbsp;下載專區
                        </button>
                    </Link>
                </div>
            </div>
            {/* <TourBanner intro={"綠色餐廳介紹"} search={"綠色餐廳查詢"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}
            <div style={{ height: click ? "calc(55vh + 30px)" : "auto", overflow: "hidden" }} className="row justify-content-center product res-hidden-content">
                <div onClick={() => setClick(!click)} className="responsive-search" style={{ borderColor: "#ab65e4" }}>
                    <i className="fas fa-search" style={{ color: "#ab65e4" }} aria-hidden="true" alt="圖示"></i><div className="responsive-search-text">產品名稱、產品型號、標章編號...</div>
                </div>


                <div className={`col-12 col-sm-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-tour show' : 'search-tour'} `}>
                    <Form className="form-text col-12">
                        <fieldset className="col-md-3 col-lg-12">
                            <legend htmlFor="exampleFormControlSelect3" as="legend" className="col-12 product-bottom-line bottom-line form-label col-form-label col" style={{ color: shopColor }}>查詢類別</legend>
                            <div className="shop-type">
                                <Button className="physicalStore" onClick={displayEnvironmentalProtection} style={buttonClass.button} >
                                    環保產品
                                </Button>
                                <Button className="onlineStore" onClick={displayTonerCartridge} style={buttonClass.button} >
                                    碳粉匣對應型號
                                </Button>
                            </div>
                            <div className="shop-type">
                                <Button className="onlineStore" onClick={displayApplyingCase} style={buttonClass.applyingButton} >
                                    申請中案件查詢
                                </Button>
                            </div>
                            <div id="divKeywordSearch" style={isDisplay(`${functionName}`)}>
                                <Form.Control className="product-form-border" id="關鍵字查詢" placeholder="適用機型廠牌/型號" onChange={e => setTonerKeyWord(e.target.value)} aria-label="適用機型廠牌/型號" />
                                <Form.Check
                                    label="原生碳粉匣"
                                    type="checkbox"
                                    id="producutType0"
                                    value="74"
                                />
                                <Form.Check
                                    label="回收再利用碳粉匣"
                                    type="checkbox"
                                    id="producutType1"
                                    value="50"
                                />
                                <Form.Check
                                    label="影像輸出裝置"
                                    type="checkbox"
                                    id="producutType2"
                                    value="78"
                                />
                                <Form.Check
                                    label="列印機"
                                    type="checkbox"
                                    id="producutType3"
                                    value="19"
                                />
                            </div>

                        </fieldset>
                        <div id="fieldsetKeywordSearch" className="col-md-3 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="key-word1" className="col-12 product-bottom-line bottom-line form-label col-form-label col">關鍵字查詢</Form.Label>
                            <Form.Control className="product-form-border" id="key-word1" placeholder="請輸入關鍵字" onChange={e => setKeyWord(e.target.value)} value={keyWord} />
                        </div>

                        <div id="fieldsetApplyingKeywordSearch" className="col-md-3 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="key-word2" className="col-12 product-bottom-line bottom-line form-label col-form-label col">關鍵字查詢</Form.Label>
                            <Form.Control className="product-form-border" id="key-word2" placeholder="請輸入關鍵字" onChange={e => setApplyingKeyWord(e.target.value)} />
                        </div>
                        <div id="fieldsetTradeNameInput" className="col-md-5 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="fieldsetTradeName" className="col-12 product-bottom-line bottom-line form-label col-form-label col">廠商名稱</Form.Label>
                            <Form.Control className="product-form-border" id="fieldsetTradeName" placeholder="輸入廠商名稱" onChange={e => setCorpName(e.target.value)} />
                        </div>

                        <div id="fieldsetTypeNoInput" className="col-md-5 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="fieldsetTypeNo" className="col-12 product-bottom-line bottom-line form-label col-form-label col">型號/系列型號</Form.Label>
                            <Form.Control className="product-form-border" id="fieldsetTypeNo" placeholder="輸入型號" onChange={e => setSerialType(e.target.value)} />
                        </div>

                        <div id="fieldsetProductCategory" className="col-md-5 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="exampleFormControlSelect1" className="col-12 product-bottom-line bottom-line form-label col-form-label col">產品類別</Form.Label>
                            <select className="product-form-border form-control" id="exampleFormControlSelect1"
                                onChange={e => {
                                    setProductTypeId(e.target.value)
                                }}
                            >
                                <option value="0" selected={productTypeId === 0}>請選擇</option>
                                {productTypeDrop.map((data, index) =>
                                    <option key={index} value={data.CriteriaTypeNo}>{data.CriteriaClass}</option>
                                )}
                            </select>
                            {(Boolean(productTypeId) && productTypeId != "0") &&
                                <select className="product-form-border form-control" id="exampleFormControlSelect2"
                                    onChange={e => {
                                        setProductListId(e.target.value)
                                    }}>
                                    <option value="0">請選擇</option>
                                    {productListDrop.map((data, index) =>
                                        <option key={index} value={data.CriteriaNo}>{data.Criteria}</option>
                                    )}
                                </select>}
                        </div>

                        <div id="fieldsetLabelNoInput" className="col-md-5 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="fieldsetLabelNo" className="col-12 product-bottom-line bottom-line form-label col-form-label col">標章號碼</Form.Label>
                            <Form.Control className="product-form-border" id="fieldsetLabelNo" placeholder="輸入標章號碼" onChange={e => setProductNum(e.target.value)} aria-label="標章號碼" />
                        </div>

                        <div id="fieldsetCertificateSelect" className="col-md-5 col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="fieldsetCertificate" className="col-12 product-bottom-line bottom-line form-label col-form-label col">當月發證</Form.Label>
                            <select onChange={(e) => setYear(e.target.value)} className="drop-kn product-form-border form-control" id="fieldsetCertificate" name="month" aria-label="當月發證">
                                <option value="0">請選擇</option>
                                {yearList.map(data =>
                                    <option key={data} value={data}>{data}</option>
                                )}
                            </select>
                            {year &&
                                <select className="drop-kn product-form-border form-control" name="month" onChange={(e) => setMonth(e.target.value)}>
                                    <option value="">月份</option>
                                    <option value="1">1月</option>
                                    <option value="2">2月</option>
                                    <option value="3">3月</option>
                                    <option value="4">4月</option>
                                    <option value="5">5月</option>
                                    <option value="6">6月</option>
                                    <option value="7">7月</option>
                                    <option value="8">8月</option>
                                    <option value="9">9月</option>
                                    <option value="10">10月</option>
                                    <option value="11">11月</option>
                                    <option value="12">12月</option>
                                </select>
                            }
                        </div>

                        <div id="fieldsetCertificateStatus" className="col-md-5  col-lg-12" style={isDisplay(`${functionName}`)}>
                            <Form.Label for="statusCheck0" className="col-12 product-bottom-line bottom-line form-label col-form-label col">
                                證書狀態</Form.Label>
                            <Col sm={12}>
                                <Form.Check
                                    type="checkbox"
                                    label="有效"
                                    name="有效"
                                    id="statusCheck0"
                                    value="1"
                                    defaultChecked={!params.get('status') || params.get('status')?.includes("1")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="過期"
                                    name="過期"
                                    id="statusCheck1"
                                    value="2"
                                    defaultChecked={params.get('status')?.includes("2")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="註銷(廢止)"
                                    name="註銷(廢止)"
                                    id="statusCheck4"
                                    value="5"
                                    defaultChecked={params.get('status')?.includes("5")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="註銷(撤銷)"
                                    name="註銷(撤銷)"
                                    id="statusCheck5"
                                    value="6"
                                    defaultChecked={params.get('status')?.includes("6")}
                                />
                            </Col>
                        </div>

                        <Button className="product-searchButton category-search-button mt-3 col-12" variant="primary" type="submit" onClick={submit} >
                            <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                            查詢
                        </Button>
                        <Button id="btnExportExcel" className="product-searchButton category-search-button mt-3 col-12" variant="primary" onClick={handleExportExcel}>
                            <i className="far fa-arrow-alt-circle-down" aria-hidden="true" alt="匯出EXCEL圖示"></i>&nbsp;匯出EXCEL
                        </Button>
                        <Button id="btnExportPDF" className="product-searchButton category-search-button mt-3 col-12" variant="primary" onClick={handleExportPdf}>
                            <i className="far fa-arrow-alt-circle-down" aria-hidden="true" alt="匯出PDF圖示"></i>&nbsp;匯出PDF
                        </Button>
                        <div className="col-12">
                            <a href="https://greenbuy.epa.gov.tw/" target="_blank" rel="noopener noreferrer" className="eco-mark mt-4 d-flex justify-content-center" title="採購網查詢">
                                <img className="w-50" src={EcoMark_6} alt="採購網查詢" />
                            </a>
                            <a href="https://www.energylabel.org.tw/purchasing/product/index.aspx" target="_blank" rel="noopener noreferrer" className="eco-mark mt-4 d-flex justify-content-center" title="節能標章產品查詢">
                                <img className="w-50" src={EcoMark_1} alt="節能標章產品" />
                            </a>
                            <a href="https://www.waterlabel.org.tw/productsearch/productsearch1.aspx" target="_blank" rel="noopener noreferrer" className="eco-mark mt-4 d-flex justify-content-center" title="省水標章產品查詢">
                                <img className="w-50" src={EcoMark_2} alt="省水標章產品" />
                            </a>
                            <a href="https://tinyurl.com/437jnxe8" target="_blank" rel="noopener noreferrer" className="eco-mark mt-4 d-flex justify-content-center" title="綠建材標章產品查詢">
                                <img className="w-50" src={EcoMark_3} alt="綠建材標章產品" />
                            </a>
                            <a href="https://cfp-calculate.tw/cfpc/Carbon/WebPage/visitors/FLProductinfo.aspx" target="_blank" rel="noopener noreferrer" className="eco-mark mt-4 d-flex justify-content-center" title="碳足跡減量標籤產品查詢">
                                <img className="w-50" src={EcoMark_4} alt="碳足跡減量標籤產品" />
                            </a>
                            <a href="https://www.moeaic.gov.tw/news.view?do=data&id=1312&lang=ch&type=business_ann" target="_blank" rel="noopener noreferrer" className="eco-mark mt-4 d-flex justify-content-center" title="陸資投資資訊產品查詢">
                                <img className="w-50" src={EcoMark_5} alt="陸資投資資訊產品" />
                            </a>
                        </div>
                    </Form>
                </div>
                <div className="col-10 col-lg-8 ">
                    <div className="" id="print_js">
                        <div className="d-flex product-search-result">
                            <p className="">查詢結果 :</p>
                            <div className="right-result">
                                <div className="sorted-count-wrapper">
                                    <p>此頁{fetchData.length}筆</p>
                                    <p>共有{searchCount}筆</p>
                                    <p>{page}/{pageCount}頁 </p>
                                </div>
                            </div>
                            <p>查詢時間為：{formatDateTime(DateTime)}</p>
                            <div>
                                <Button className="export-pdf border border-5 mx-2 mb-4 labelReport" variant="outline-secondary">
                                    <i className="far fa-arrow-alt-circle-down labelReport" aria-hidden="true" alt="環保標章審查通過各類統計報表圖示"></i>
                                    <Link className="labelReport" style={{ 'color': '#6c757d' }} to={`/categories/GreenProductReport`}>環保標章審查通過各類統計報表</Link>
                                </Button>

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
                                    functionName === 'environment-protect-product' || functionName === 'toner-cartridge' ?
                                        fetchData
                                            .map((fetchData, index) =>
                                                <Card key={index} className="res-card">
                                                    <div className="d-flex row content-wrapper search-list-card">
                                                        <div className="col-4 res-img product-img">
                                                            <a as={Link} key={index} target="_blank" rel="noreferrer noopener" href={`/categories/greenProductdetailPage?product=${fetchData.Num}&type=${fetchData.Class}`}>
                                                                <img
                                                                    className="lazy-load"
                                                                    alt={`${fetchData.NameZH}(另開視窗)`}
                                                                    title={`${fetchData.NameZH}(另開視窗)`}
                                                                    src={fetchData.ImgByte !== "" ? fetchData.ImgByte : "../../images/blankLeef.png"}
                                                                    data-src={fetchData.ImgByte !== "" ? fetchData.ImgByte : "../../images/blankLeef.png"} />
                                                            </a>
                                                        </div>
                                                        <div className="col-8 rs-right-content porduct-content">
                                                            <div className="d-flex">
                                                                <div className="show-status">
                                                                    <div className="category-ul">
                                                                        <li style={{ background: fetchData.ShowStatus === "有效" ? "#15aa08" : "grey", width: "calc(30px + 1vw)" }}>{fetchData.ShowStatus}</li>
                                                                        <p style={{ color: fetchData.ShowStatus === "有效" ? "#15aa08" : "grey" }} className="product-num">{fetchData.Num}</p>
                                                                        <a href={fetchData.PdfUrl} className="pdf-btn" download={fetchData.NameZH} title="下載PDF(另開視窗)">匯出PDF</a>
                                                                    </div>
                                                                    <div className="validDate-container">
                                                                        <p>有效期&nbsp;:&nbsp;{formatDate(fetchData.SignDate)}
                                                                            至&nbsp;{formatDate(fetchData.ValidDate)}</p>
                                                                    </div>
                                                                    <div className="d-flex category-ul">
                                                                        <li style={{ background: productColor, minHeight: "40px" }} className="d-flex justify-content-center align-items-center">{fetchData.CriteriaClass}</li>
                                                                        {fetchData.CriteriaClassNo !== 0 &&
                                                                            <li style={{ background: productColor, minHeight: "40px" }} className="d-flex justify-content-center align-items-center">{fetchData.CriteriaNo + "." + fetchData.Criteria}</li>
                                                                        }
                                                                    </div>
                                                                    <div className="content-name">
                                                                        <h2 className="product-title">{fetchData.NameZH}</h2>
                                                                        <h3 className="product-subTitle" style={{ fontSize: "calc(10px + 0.8vw)" }}>{fetchData.Type}&nbsp;{fetchData.Memo}&nbsp;{fetchData.Num === "18877" && fetchData.SerialType}</h3>
                                                                    </div>

                                                                </div>

                                                                <div className="res-logo-wrapper">
                                                                    <img alt="綠色餐廳類別圖示" className="resType-logo" src={fetchData.Class === 2 ? greenLogo2 : greenLogo} />
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <h4 className="ad-subtitle">廠商:{fetchData.CorpName}</h4>
                                                                {/* 工廠名稱和地址 資訊網資料不知道為什麼後面都會有一個頓號 */}
                                                                <h4 className="ad-content">工廠地址:{fetchData.FactoryAddr?.slice(0, -1)}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        :
                                        (fetchData === undefined || fetchData[0]?.MoeaLicense === undefined ?
                                            <div className="embla-bottom">
                                                <div className="embla__viewport">
                                                    <p>查無搜尋結果</p>
                                                </div>
                                            </div>
                                            :
                                            fetchData
                                                .map((fetchData, index) =>
                                                    <Card key={index} className="res-card">
                                                        <div className="d-flex row content-wrapper search-list-card">
                                                            <div className="col-12 porduct-content">
                                                                <Table bordered responsive="md">
                                                                    <thead>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th scope='row'>產品名稱</th>
                                                                            <td>{fetchData.MoeaLicense}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th scope='row'>廠商名稱</th>
                                                                            <td>{fetchData.EUICName}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th scope='row'>類別</th>
                                                                            <td>{fetchData.PClassContent}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th scope='row'>規格標準</th>
                                                                            <td>{fetchData.PItemCode}{fetchData.CriteriaContent}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope='row'>申請日</th>
                                                                            <td>{formatDate(fetchData.PublishedDate)}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope='row'>下載PDF</th>
                                                                            <td>
                                                                                <a href={fetchData.PdfUrl} target="_blank" rel="noopener noreferrer" className="url-tag" title="下載PDF" >
                                                                                    <img src={PdfIcon} alt="下載PDF" aria-label="下載PDF" style={iconStyle.pdf} />
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                )
                                        )

                                }

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

export default withRouter(GreenProduct);