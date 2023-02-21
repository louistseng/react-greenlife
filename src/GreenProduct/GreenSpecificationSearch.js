import React, { useState, useEffect } from 'react';
import '../GreenProduct.scss';
import { Link, withRouter } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import greenLogo from '../images1/greenLogo.gif';
import greenLogo2 from '../images1/greenLogo2.png';
import labelBanner from '../images1/greenProduct/label_banner.jpg';
import { clickRecord } from '../utils/API';
import { formatDate, getExportDate } from '../utils/Functions';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));

var yearList = [];

const productColor = "#a279ad";
const yearBegin = 1994;
const yearEnd = new Date().getFullYear()

for (var i = 0; i <= (yearEnd - yearBegin); i++) {
    yearList.push(yearEnd - i);

}


function GreenProductJoin(props) {

    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const myPage = params.get('page')

    const cn = params.get('cn') || ""
    const ctn = params.get('ctn') || ""
    const t = params.get('t') || ""
    const k = params.get('k') || ""
    const a = params.get('a') || ""
    const crn = params.get('crn') || ""
    const num = params.get('num') || ""
    const y = params.get('y') || ""
    const m = params.get('m') || ""
    const search = params.get('searched') || ""


    let SSL = props.SSL;

    let domainFormal = window.location.hostname === "localhost" ? 'greenliving.eri.com.tw/PublicRwd' : window.location.hostname === "greenlife.eri.com.tw" ? "greenliving.eri.com.tw/PublicRwd" : 'greenliving.epa.gov.tw/newPublic';


    const [click, setClick] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true)
    const [fetchData, setFetchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [keyWord, setKeyWord] = useState("");
    // const [corpName, setCorpName] = useState("");
    // const [serialType, setSerialType] = useState("");
    // const [productNum, setProductNum] = useState("");

    const [page, setPage] = useState(myPage);
    const [pageCount, setPageCount] = useState("");
    const [year, setYear] = useState("");
    const [searched, setSearched] = useState(false);


    const [productTypeId, setProductTypeId] = useState(0);
    const [productListId, setProductListId] = useState(0);

    const [month, setMonth] = useState("")

    let actionName = [];
    let levelName = [];

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("8367205F-8B79-4617-AA63-6B103155E806", "11", collector)
    }, [collector]);



    //規格標準大分類清單(精簡欄位)
    const [productTypeDrop, setpProductTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${domainFormal}/APIs/CriteriaTypeList`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).then(result => {
            setpProductTypeDrop(result.Detail)
        })
    }, [])

    //規格標準清單(精簡欄位)
    const [productListDrop, setProductListDrop] = useState([]);
    useEffect(() => {
        if (productTypeId)
            fetch(`${props.SSL}//${domainFormal}/APIs/CriteriaList/${productTypeId}`, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                setProductListDrop(result.Detail)
                console.log(result)
            })
    }, [productTypeId])


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

    // 第二類環保標章
    useEffect(() => {
        if (productListId == "second") {
            setProductTypeId(0)
            setProductListId(0)
            setKeyWord("第二類環保標章")
        }
        if (productListId != "second" && productListId !== 0 && productListId != "second" && productListId !== 0) {
            setKeyWord("")
        }
    })



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

        //狀態勾選
        var statusCheckVar = []
        var activityCheckboxes = document.querySelectorAll('input#statusCheck0[type=checkbox]:checked, input#statusCheck1[type=checkbox]:checked')

        for (i = 0; i < activityCheckboxes.length; i++) {
            statusCheckVar.push(Number(activityCheckboxes[i].value))
        }
        // console.log("sta",statusCheckVar)

        history.push(`/categories/GreenSpecificationSearch?searched=true&page=1&a=${statusCheckVar}&k=${keyWord}&ctn=${productTypeId === 0 ? "" : productTypeId}&cn=${productListId === 0 ? "" : productListId}&y=${year}&m=${month}`)

        const uri = `${props.SSL}//${domainFormal}/APIs/Criteria/?a=${statusCheckVar}&k=${keyWord}&ctn=${productTypeId === 0 ? "" : productTypeId}&cn=${productListId === 0 ? "" : productListId}&y=${year}&m=${month}`;
        // console.log(uri)
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
                // console.log(result.RowsCount / 10)
                //提交查詢後的頁碼
                setPage(result.PageIndex)
                setProductTypeId(0)
                setProductListId(0)
                setKeyWord("")
            });
    };

    //改變頁碼後的動作
    let basePage = myPage

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0)

        const uriSearched = `${props.SSL}//${domainFormal}/APIs/Criteria/${basePage}?a=${a}&k=${k}&ctn=${ctn}&cn=${cn}&y=${y}&m=${m}`;
        console.log(uriSearched)

        //依查詢條件fetch
        //預設-查詢前全行程
        const uri = `${props.SSL}//${domainFormal}/APIs/Criteria/${basePage}`;

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
                console.log(result)
                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                setPage(result.PageIndex)
                // console.log(result.RowsCount / 10)
            });

    }, [basePage, domainFormal]);


    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/categories/GreenSpecificationSearch?searched=${searched}&page=${data.selected + 1}&a=${a}&k=${k}&crn=${crn}&t=${t}&ctn=${ctn}&cn=${cn}${num && '&num=' + num}&y=${y}&m=${m}`)
    };

    // 匯出Excel
    function handleExportExcel() {
        //依查詢條件fetch
        const uriSearched = `${SSL}//${domainFormal}/APIs/CriteriaAll?a=${a}&k=${k}&ctn=${ctn}&cn=${cn}&y=${y}&m=${m}`;

        //預設-查詢前全行程
        const uri = `${SSL}//${domainFormal}/APIs/CriteriaAll`;

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
                        delete item.AnnouncementPDF
                        delete item.AnnouncementPDFE
                        delete item.CriteriaE
                        delete item.CriteriaTypeNo
                        delete item.IsCanApply
                        item.ApplyCopy = item.Apply === "green" ? "有效" : "無效"
                        item.CriteriaNoCopy = item.CriteriaNo
                        item.CriteriaTypeCustomNoCopy = item.CriteriaTypeCustomNo
                        item.CriteriaClassCopy = item.CriteriaClass
                        item.CriteriaCopy = item.Criteria
                        item.PMarkCopy = item.PMark
                        item.AnnouncementDateCopy = formatDate(item.AnnouncementDate);
                        delete item.Apply
                        delete item.CriteriaNo
                        delete item.CriteriaTypeCustomNo
                        delete item.CriteriaClass
                        delete item.Criteria
                        delete item.PMark
                        delete item.AnnouncementDate
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
                    ws.A1.v = "狀態"
                    ws.B1.v = "編號"
                    ws.C1.v = "分類號"
                    ws.D1.v = "規格標準大分類"
                    ws.E1.v = "規格標準名稱"
                    ws.F1.v = "產品相關標示"
                    ws.G1.v = "公告日期"

                    XLSX.utils.book_append_sheet(wb, ws, "Table Export");
                    XLSX.writeFile(wb, `綠生活_環保標章規格_${fileDate}.ods`);


                    /* generate an XLSX file */
                    // XLSX.writeFile(wb, "sheetjs.xlsx");
                });
        }
    }

    const style = {
        show: {
            display: ""
        },
        hide: {
            display: "none"
        }
    }

    return (
        <>
            <div className={click ? "ac-aside-backdrop show" : "ac-aside-backdrop"} onClick={() => setClick(false)}></div>
            <BreadCrumb currentPage={"環保產品查詢"} />
            <div className={`product bigbanner mb-3`}>
                <img className="relative" src={labelBanner} width="100%" height="100%" alt="環保產品查詢" />

                <div className="Button-wrapper">
                    <Link to={`/categories/GreenProductIntro`} className="btn-link">
                        <button className="bannerButton bannerButton-line">
                            <i className="fas fa-binoculars" aria-hidden="true" alt="環保產品介紹圖示"></i>
                            &nbsp;環保產品介紹
                        </button>
                    </Link>
                    <Link to={`/categories/greenProductSearch`} className="btn-link">
                        <button className="bannerButton bannerButton-line ">
                            <i className="fas fa-search" aria-hidden="true" alt="環保產品查詢圖示"></i>
                            &nbsp;環保產品查詢
                        </button>
                    </Link>
                    <Link to={`/categories/GreenSpecificationSearch`} className="onfocus btn-link">
                        <button className="bannerButton bannerButton-line soon-btn">
                            <h1 style={{ fontSize: "calc(12px + 0.6vw)", fontWeight: "600", marginBottom: "0" }}>
                                <i className="fas fa-search" aria-hidden="true" alt="環保標章規格查詢圖示"></i>
                                &nbsp;環保標章規格查詢
                            </h1>
                        </button>
                    </Link>
                    <a href={`/greenLabel/GreenMarkIntroMarkApply`} className="btn-link" title="加入環保產品鏈結">
                        <button className="bannerButton bannerButton-line">
                            <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入環保產品圖示"></i>
                            &nbsp;加入環保產品
                            {/* <span id="e"> &nbsp;加入綠色餐廳</span>
                            <span id="f">&nbsp;&nbsp;近期開放</span> */}
                        </button>
                    </a>
                    <Link to={`/categories/GreenProductDownload`} className="btn-link">
                        <button className="bannerButton bannerButton-line none-line">
                            <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="圖示"></i>
                            &nbsp;下載專區
                        </button>
                    </Link>
                </div>
            </div>
            {/* <TourBanner intro={"綠色餐廳介紹"} search={"綠色餐廳查詢"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}
            <div style={{ height: click ? "calc(55vh + 30px)" : "auto", overflow: "hidden" }} className="row justify-content-center product res-hidden-content">
                <div onClick={() => setClick(!click)} className="responsive-search" style={{ borderColor: "#ab65e4" }}>
                    <i className="fas fa-search" style={{ color: "#ab65e4" }} aria-hidden="true" alt="輸入關鍵字圖示"></i><div className="responsive-search-text">請輸入關鍵字</div>
                </div>
                <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-tour show' : 'search-tour'} `}>
                    <Form className="form-text col-12">
                        <div className="col-md-3 col-lg-12">
                            <Form.Label for="key-word" className="col-12 product-bottom-line bottom-line">關鍵字查詢</Form.Label>
                            <Form.Control className="product-form-border" id="key-word" placeholder="請輸入關鍵字" onChange={e => setKeyWord(e.target.value)} aria-label="關鍵字查詢" value={keyWord} />
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="exampleFormControlSelect1" className="col-12 product-bottom-line bottom-line">規格標準分類</Form.Label>
                            <select className="product-form-border form-control" id="exampleFormControlSelect1"
                                onChange={e => {
                                    setProductTypeId(e.target.value)
                                    setProductListId(e.target.value)
                                }}
                                aria-label="規格標準分類"
                            >
                                <option value="0" selected={productTypeId == 0}>請選擇</option>
                                {productTypeDrop.map((data, index) =>
                                    <option key={index} value={data.CriteriaTypeNo}>{data.CriteriaClass}</option>
                                )}
                            </select>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="month" className="col-12 product-bottom-line bottom-line">發布年度</Form.Label>
                            <select onChange={(e) => setYear(e.target.value)} className="drop-kn product-form-border form-control" name="month" id="month" aria-label="發布年度">
                                <option value="">請選擇</option>
                                {yearList.map(data =>
                                    <option value={data}>{data}</option>
                                )}
                            </select>
                            {/* {year &&
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
                            } */}
                        </div>

                        <div className="col-md-5  col-lg-12">
                            <Form.Label for="statusCheck1" className="col-12 product-bottom-line bottom-line">狀態</Form.Label>
                            <Col sm={12}>
                                <Form.Check
                                    type="checkbox"
                                    label="有效"
                                    name="有效"
                                    id="statusCheck1"
                                    value="1"
                                    defaultChecked={params.get('a')?.includes("1")}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="無效"
                                    name="無效"
                                    id="statusCheck0"
                                    value="0"
                                    defaultChecked={params.get('a')?.includes("0")}
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
                                            <Card className="res-card">
                                                <div className="d-flex row content-wrapper search-list-card">
                                                    <div className="col-12 product-right-content">
                                                        <div className="d-flex">
                                                            <div>
                                                                <div className="category-ul">
                                                                    <li style={fetchData.Apply === "green" ? { background: "#15aa08" } : { background: "grey" }}>
                                                                        {fetchData.Apply === "green" ? "有效" : "無效"}</li>
                                                                </div>
                                                                <ul className="criteria-content-name">
                                                                    <li className="criteria-title">公告日期:{formatDate(fetchData.AnnouncementDate)}</li>
                                                                    <li className="criteria-title">分類號:{fetchData.CriteriaTypeCustomNo}</li>
                                                                    <li className="criteria-title">規格標準分類:{fetchData.CriteriaClass}</li>
                                                                    <li className="criteria-title">規格標準:{fetchData.Criteria}</li>
                                                                    <li className="criteria-title product-file">
                                                                        應備文件:
                                                                        <button className="fileBtnColor"><a style={{ color: "white" }} href={fetchData.AnnouncementPDF} title="中文內容(下載pdf檔)">中文內容PDF檔</a></button>
                                                                        <button className="fileBtnColor" style={fetchData.AnnouncementPDFE ? style.show : style.hide}><a style={{ color: "white" }} href={fetchData.AnnouncementPDFE} title="英文內容(下載pdf檔)">英文內容PDF檔</a></button>
                                                                        <button className="fileBtnColor"><a style={{ color: "white" }} href={`https://greenliving.epa.gov.tw/newPublic/GreenMark/CriteriaClauseDataPDF?CriteriaName=${fetchData.Criteria}&CriteriaNo=${fetchData.CriteriaNo}`} download={fetchData.Criteria} target="_blank" title="應備文件(下載pdf檔)">應備文件PDF檔</a></button>
                                                                    </li>
                                                                </ul>
                                                                {/*<div className="pointDetail">
                                                                    <Modal show={show} onHide={handleClose} size="xl" centered="true">
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title>應備文件</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <table>
                                                                                <tr>
                                                                                    <th style={{ width: "32rem", height: "3rem" }}>規格標準條文</th>
                                                                                    <th style={{ width: "22rem", height: "3rem" }}>其他應檢附資料</th>
                                                                                    <th style={{ width: "40rem", height: "3rem" }}>類型</th>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "#EBF1DE", height: "3rem" }}>
                                                                                    <td headers="advisory">1.適用範圍</td>
                                                                                    <td headers="name">{fetchData.CriteriaClass}</td>
                                                                                    <td headers="name"></td>
                                                                                    <td headers="tel"></td>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "#EBF1DE", height: "3rem" }}>
                                                                                    <td headers="advisory">2.用語及定義</td>
                                                                                    <td headers="name"></td>
                                                                                    <td headers="name"></td>
                                                                                    <td headers="tel"></td>
                                                                                </tr>
                                                                                <tr style={{ backgroundColor: "#EBF1D", height: "3rem" }}>
                                                                                    <td headers="advisory">3.特性</td>
                                                                                    <td headers="name"></td>
                                                                                    <td headers="name"></td>
                                                                                    <td headers="tel"></td>
                                                                                </tr>
                                                                            </table>
                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="success" onClick={handleClose}>關閉</Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </div>*/}
                                                            </div>


                                                            <div className="res-logo-wrapper">
                                                                <img className="resType-logo" src={fetchData.Class === 2 ? greenLogo2 : greenLogo} alt="綠色餐廳類別圖示" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>

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

export default withRouter(GreenProductJoin);