import React, { useState, useEffect, useRef } from 'react';
import './greenOffice.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import SideBtnOffice from '../Components/SideBtnOffice';
import { Card, Form, Button, Row } from 'react-bootstrap';
import { formatDateDot, formatDate, pad, getYear, getBgColor, getTypeBgColor } from '../utils/Functions';
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import JoditEditor from "jodit-react";
import "react-datepicker/dist/react-datepicker.css";
import { clickRecord, getOrgTypeDrop, getOrgTagDrop } from '../utils/API';
import { useCookies } from "react-cookie";

const Footer = React.lazy(() => import('../Components/Footer'));
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Loader = React.lazy(() => import('../Components/Loader'));

function Participate(props) {
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');
    let history = useHistory();

    //從URL抓搜尋參數
    const paramsSearch = new URLSearchParams(history.location.search);

    const [month, setMonth] = useState(0)
    const [time, setTime] = useState("")
    const [year, setYear] = useState("0")

    const [keyWord, setKeyWord] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const count = "10";
    const [cityId, setCityId] = useState("");
    const [sortType, setSortType] = useState(10);
    const [identityType, setIdentityType] = useState([]);

    const [resultTagArray, setResultTagArray] = useState([]);


    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(true)
    const [searched, setSearched] = useState(false);

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("6893E811-74EB-4699-9DB2-384A1A2F087D", "10", collector)
    }, [collector]);

    //文字編輯器config
    const config = {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        inline: true,

    }
    const editor = useRef(null)
    const joditDate = new Date("2021-07-12")

    //縣市別下拉式選單API
    const [cityDrop, setCityDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/Citys`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setCityDrop(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])

    //綠色辦公-查詢的特殊成果項目-下拉
    const [resultTag, setResultTag] = useState([]);
    useEffect(() => {
        getOrgTagDrop(setResultTag)
    }, [])

    //綠色辦公-查詢的類別項目-下拉
    const [typeTag, setTypeTag] = useState([]);
    useEffect(() => {
        getOrgTypeDrop(setTypeTag)
    }, [])

    //綠色辦公-排序下拉選單項目
    const [sortTypeDrop, setSortTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Article/SortType`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setSortTypeDrop(result.resultObject)
                }

            });
    }, [])

    //fetch響應名單+複合查詢
    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [lastEditTime, setLastEditTime] = useState("");

    const complexSearch = (sortype) => {
        const params = new URLSearchParams(history.location.search);

        setKeyWord(params.get('n'))

        let inputYear = params.get('year') || (time && String(getYear(time)));
        let requestPayload;

        if (inputYear === "0" || inputYear === "" || inputYear === "1970") {
            requestPayload = serialize({
                Title: params.get('n') || keyWord,
                CityId: params.get('city') || String(cityId),
                Year: "0",
                Month: params.get('month') || pad(month),
                TypeIds: params.get('type') || String(identityType),
                TagIds: params.get('award') || String(resultTagArray),
                SortType: params.get('sort') || String(sortType),
                Page: inputYear === "" ? "1" : params.get('page'),
                Count: count
            });
        } else {
            requestPayload = serialize({
                Title: params.get('n') || keyWord,
                CityId: params.get('city') || String(cityId),
                Year: params.get('year') || (time && String(getYear(time))),
                Month: params.get('month') || pad(month),
                TypeIds: params.get('type') || String(identityType),
                TagIds: params.get('award') || String(resultTagArray),
                SortType: params.get('sort') || String(sortType),
                Page: params.get('page') || String(page),
                Count: count
            });
        }

        fetch(`${SSL}//${domain}/api/api/GOffice/Article/ComplexSearch`, {
            method: 'POST',
            body: requestPayload,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result.resultObject)
                if (result.isSucess) {
                    setFetchData(result.resultObject.articles)
                    setPageCount(result.resultObject.pageCount)
                    setTotalCount(result.resultObject.totalCount)
                    setLastEditTime(result.resultObject.lastEditTime)
                    setLoading(false)
                    // console.log("resultTagArray",resultTagArray)
                }
            });
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        history.push(`/categories/green_office/shared_articles?page=${page}&type=${identityType}&award=${resultTagArray}&city=${cityId}&year=${year}&month=${month}&sort=${sortType}&n=${keyWord}`)
        complexSearch()
    }, [page])


    useEffect(() => {
        if (searched) {
            complexSearch()
        }

    }, [sortType]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/categories/green_office/shared_articles?page=${data.selected + 1}&type=${identityType}&award=${resultTagArray}&city=${cityId}&year=${year}&month=${month}&sort=${sortType}&n=${keyWord}`)
    };

    const searchOnchange = () => {
        setSearched(false)
    }

    const sortOnchange = (e) => {
        setSortType(e.target.value)
        history.push(`/categories/green_office/shared_articles?page=${page}&type=${identityType}&award=${resultTagArray}&city=${cityId}&year=${year}&month=${month}&sort=${e.target.value}&n=${keyWord}`)
        complexSearch(e.target.value)
    }

    var arrayCheck = []
    var resultArrayCheck = []
    // console.log("arrayCheck",arrayCheck)
    // console.log("resultarrayCheck",resultArrayCheck)


    const submit = async (e) => {
        if (year === "0") {
            history.push(`/categories/green_office/shared_articles?page=${page}&type=${identityType}&award=${resultTagArray}&city=${cityId}&month=${month}&sort=${sortType}&n=${keyWord}`)
        } else {
            history.push(`/categories/green_office/shared_articles?page=${page}&type=${identityType}&award=${resultTagArray}&city=${cityId}&year=${year}&month=${month}&sort=${sortType}&n=${keyWord}`)
        }
        setSearched(true)
        window.scrollTo(0, 300)
        setPage(1)
        e.preventDefault()

        setLoading(true)
        complexSearch()
    }

    const getIdentityCheck = () => {

        var chks = document.querySelectorAll('input#typeCheckbox0[type=checkbox]:checked, input#typeCheckbox1[type=checkbox]:checked, input#typeCheckbox2[type=checkbox]:checked, input#typeCheckbox3[type=checkbox]:checked, input#typeCheckbox4[type=checkbox]:checked, input#typeCheckbox5[type=checkbox]:checked, input#typeCheckbox6[type=checkbox]:checked, input#typeCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(Number(chks[i].value))
            setIdentityType(arrayCheck)
        }

        history.push(`/categories/green_office/shared_articles?page=${page}&type=${arrayCheck}&award=${resultTagArray}&city=${cityId}&year=${year}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chks.length === 0 && setIdentityType([])

    }

    const getResultCheck = () => {
        var chksResult = document.querySelectorAll('input#resultCheckbox0[type=checkbox]:checked, input#resultCheckbox1[type=checkbox]:checked, input#resultCheckbox2[type=checkbox]:checked, input#resultCheckbox3[type=checkbox]:checked, input#resultCheckbox4[type=checkbox]:checked, input#resultCheckbox5[type=checkbox]:checked, input#resultCheckbox6[type=checkbox]:checked, input#resultCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chksResult.length; i++) {
            resultArrayCheck.push(Number(chksResult[i].value))
            setResultTagArray(resultArrayCheck)
            // console.log("resultarrayCheck",resultArrayCheck)

        }
        history.push(`/categories/green_office/shared_articles?page=${page}&type=${identityType}&award=${resultArrayCheck}&city=${cityId}&year=${year}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chksResult.length === 0 && setResultTagArray([])
    }



    return (
        <>
            <BreadCrumb currentPage={"經驗分享-文章清單"} />
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="container office-participate">
                <div className="title-wrapper">
                    <h1>經驗分享</h1><h2 className="subtitle">文章清單</h2>
                </div>
                <div className="content-wrapper shared-article row">
                    <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-office show' : 'search-office'} `}>
                        <Form className="form-text">
                            <Form.Group className="col-md-3 col-lg-12" controlId="formBasicEmail">
                                <Form.Label htmlFor="關鍵字查詢">關鍵字查詢</Form.Label>
                                <Form.Control id="關鍵字查詢" onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit(e)
                                    }
                                }} placeholder="請輸入關鍵字" value={keyWord} onChange={e => setKeyWord(e.target.value === "" ? "" : e.target.value)} />
                                <span className="keyword-note">*可查詢單位名稱</span>
                            </Form.Group>

                            <fieldset className="col-md-5 col-lg-12" style={{ margin: "1.2vw 0" }}>
                                <legend className="form-label" style={{ width: 'auto' }}>縣市別</legend>
                                <Form.Control className="myInput" id="縣市別" as="select" defaultValue="請選擇" onChange={() => searchOnchange()} onBlur={e => setCityId(e.target.value)}
                                    aria-label="縣市別">
                                    <option value="">請選擇</option>
                                    {cityDrop.map((data, index) =>
                                        <option key={index} defaultValue={data.cityId === paramsSearch.get('city')} value={data.cityId}>{data.cityName}</option>
                                    )}

                                </Form.Control>
                            </fieldset>

                            <fieldset className="col-md-5 col-lg-12" style={{ margin: "1.6vw 0" }}>
                                <legend className="form-label">日期區間</legend>
                                <div className="data-wrapper">
                                    <DatePicker
                                        onChange={date => {
                                            setTime(date)
                                            setYear(getYear(date))
                                            searchOnchange()
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        placeholderText="年份"
                                        selected={time}
                                        className="myInput"
                                        title="年份"
                                    />
                                    <Form.Control className="myInput" id="日期區間" as="select" defaultValue={paramsSearch.get('month')} onChange={() => searchOnchange()} onBlur={e => {
                                        setMonth(e.target.value)
                                    }}
                                        aria-label="月份">
                                        <option value="0">月份</option>
                                        <option value="01">1月</option>
                                        <option value="02">2月</option>
                                        <option value="03">3月</option>
                                        <option value="04">4月</option>
                                        <option value="05">5月</option>
                                        <option value="06">6月</option>
                                        <option value="07">7月</option>
                                        <option value="08">8月</option>
                                        <option value="09">9月</option>
                                        <option value="10">10月</option>
                                        <option value="11">11月</option>
                                        <option value="12">12月</option>
                                    </Form.Control>
                                </div>
                            </fieldset>
                            <div>
                                <Form.Check
                                    type="checkbox"
                                    className="participate-checkbox"
                                    label="不限"
                                    id="dateCheckbox"
                                    name="dateCheckbox"
                                    value="不限"
                                    checked={year === "" || year === "1970" || year === "0" || year === null || year == 1970}
                                    disabled
                                />
                            </div>
                            <fieldset className="col-md-5  col-lg-12">
                                <legend className="col-12 form-label col-form-label col">
                                    類別
                                </legend>
                                <Form.Group as={Row} onChange={() => {
                                    getIdentityCheck()
                                    searchOnchange()

                                }} style={{ display: "block" }}>
                                    {typeTag.map((data, index) =>
                                        <Form.Check
                                            key={index}
                                            type="checkbox"
                                            label={data.officeArticleTypeName}
                                            className={"checkboxlabel typeCheckbox" + index}
                                            id={"typeCheckbox" + index}
                                            name="typeCheckbox"
                                            value={data.officeArticleTypeId}
                                            defaultChecked={paramsSearch.get('type') && paramsSearch.get('type').includes(index + 1)}
                                        />
                                    )}
                                </Form.Group>
                            </fieldset>

                            <fieldset className="col-md-5  col-lg-12">

                                <legend className="col-12 form-label col-form-label col">
                                    特殊成果
                                </legend>
                                <Form.Group as={Row} onChange={() => {
                                    getResultCheck()
                                    searchOnchange()
                                }} style={{ display: "block" }}>
                                    {resultTag.map((data, index) =>
                                        <Form.Check
                                            key={index}
                                            type="checkbox"
                                            label={data.value}
                                            className={"checkboxlabel resultCheckbox" + index}
                                            id={"resultCheckbox" + index}
                                            name="resultCheckbox"
                                            value={data.key}
                                            defaultChecked={paramsSearch.get('award') && paramsSearch.get('award').includes(index + 1)}
                                        />
                                    )}
                                </Form.Group>
                            </fieldset>

                            <Button className="searchButton col-12" variant="primary" type="submit" onClick={e => submit(e)} >
                                <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                                &nbsp;查詢
                            </Button>

                        </Form>
                    </div>
                    <div className="col-sm-12 col-md-10 col-lg-9 ">
                        <div className="">
                            <div className="result-outter-wrapper">
                                <div className="search-result-wrapper">
                                    <div className="office-sorted-wrapper">
                                        <p className="result-title">查詢結果 :</p>
                                        <p className="search-result-value">此頁{totalCount > count ? count : totalCount}筆</p>
                                        <p className="search-result-value">共有{totalCount}筆</p>
                                        <p className="search-result-value">第{page}/{pageCount}頁 </p>
                                    </div>

                                    <div className="search-result">
                                        <p className="result-title">選擇排序</p>
                                        <select as="select" className="sortDrop" value={paramsSearch.get('sort') || "10"} onChange={(e) => sortOnchange(e)} aria-label="選擇排序">
                                            {sortTypeDrop.map((sortType, index) =>
                                                <option key={index} value={sortType.typeId}>{sortType.typeName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="article-update-time"><p className="result-title">最後更新日期:</p><p className="search-result-value">{formatDate(lastEditTime)}</p></div>
                            </div>

                            <div className="inner-content">
                                {loading ? <Loader loading={loading} /> :
                                    <div className="article-outter-wrapper">
                                        {fetchData.length === 0 ?
                                            <p>沒有相關結果喔~</p>
                                            :
                                            fetchData
                                                .map((data, index) =>
                                                    <Link as={Link} key={index} to={`/categories/green_office/shared_articles/mypage?${data.guid}`}>
                                                        <Card className="office-article-card">
                                                            <div className="d-flex row ariticle-list-card">

                                                                <img
                                                                    className="col-4 office-article-img"
                                                                    alt={data.title}
                                                                    title={data.title}
                                                                    src={data.picHref !== "" ? data.picHref : "../../images/blankLeef.png"} />


                                                                <div className="col-8 rs-right-content">
                                                                    <p>{formatDateDot(data.createTime)}</p>
                                                                    <div className="title-content-wrapper">
                                                                        <h3 className="office-title">{data.title}</h3>
                                                                        <div className="office-article-content">
                                                                            {/* {new Date(data?.createTime) > joditDate ?
                                                                                <JoditEditor
                                                                                    ref={editor}
                                                                                    value={data.content}
                                                                                    config={config}
                                                                                />
                                                                                :
                                                                                data.content.split('<br>').slice(0, 2).map((items, index) =>
                                                                                    <h6 key={index}>&emsp;&emsp;{items}</h6>
                                                                                )} */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="award-btn">
                                                                        {data.tags.map((tag, index) =>
                                                                            <div key={index} className="companyAwards"
                                                                                style={getBgColor(tag.officeArticleTagId)}>
                                                                                {tag.officeArticleTagName}</div>
                                                                        )}
                                                                        <div className="companyAwards"
                                                                            style={getTypeBgColor(data.typeId)}>
                                                                            {data.typeName}</div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Link>

                                                )}
                                    </div>
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

            </div>

            <SideBtnOffice history={useHistory()} type={"綠色辦公"} />
            <Footer />
        </>
    );
}

export default withRouter(Participate);