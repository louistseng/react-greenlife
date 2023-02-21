import React, { useState, useEffect } from 'react';
import './greenOffice.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import { formatDate, pad, getYear } from '../utils/Functions';
import SideBtnOffice from '../Components/SideBtnOffice';
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { clickRecord, getCityDrop } from '../utils/API';
import { useCookies } from "react-cookie";

const Footer = React.lazy(() => import('../Components/Footer'));
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Loader = React.lazy(() => import('../Components/Loader'));

function Participate(props) {

    var serialize = require('serialize-javascript');
    let history = useHistory();
    //從URL抓搜尋參數
    const paramsSearch = new URLSearchParams(history.location.search);

    const [month, setMonth] = useState(paramsSearch.get('month') || 0)
    const time = new Date(+0)
    const [year, setYear] = useState("")

    const [keyWord, setKeyWord] = useState(paramsSearch.get('n'));
    const [page, setPage] = useState(paramsSearch.get('page') || 1);
    const [pageCount, setPageCount] = useState(0)
    const count = "30";
    const [cityId, setCityId] = useState(paramsSearch.get('city'));
    const [sortType, setSortType] = useState(paramsSearch.get('sort') || 10);
    const [identityType, setIdentityType] = useState(paramsSearch.get('type'));

    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(true)
    const [searched, setSearched] = useState(false);

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("A07EB12A-A99A-4A9C-A6CA-04CE7E414A0B", "10", collector)
    }, [collector]);


    //縣市別下拉式選單API
    const [cityDrop, setCityDrop] = useState([]);
    useEffect(() => {
        getCityDrop(setCityDrop)
    }, [])

    //綠色辦公-查詢的單位性質項目
    const [identity, setIdentity] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Participate/IdentityType`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setIdentity(result.resultObject)
                }
            });
    }, [props.SSL, props.domain])

    //綠色辦公-排序下拉選單項目
    const [sortTypeDrop, setSortTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Participate/SortType`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setSortTypeDrop(result.resultObject)
                    setLoading(false)
                }
            });
    }, [props.SSL, props.domain])

    //fetch響應名單+複合查詢
    const [sortTable, setSortTable] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [lastEditTime, setLastEditTime] = useState("");

    const complexSearch = () => {

        const params = new URLSearchParams(history.location.search);
        let inputYear = params.get('year') ? params.get('year') : String(getYear(time));
        let requestPayload;

        if (inputYear === "NaN") {
            inputYear = "1970"
        }

        if (inputYear === "0" || inputYear === "" || inputYear === "1970") {
            requestPayload = serialize({
                Name: params.get('n') || keyWord,
                CityId: params.get('city') || String(cityId),
                Year: "0",
                Month: params.get('month') || pad(month),
                IdentityTypeIds: params.get('type') || String(identityType),
                SortType: params.get('sort') || String(sortType),
                Page: inputYear === "" ? "1" : params.get('page'),
                Count: count
            });
        } else {
            requestPayload = serialize({
                Name: params.get('n') || keyWord,
                CityId: params.get('city') || String(cityId),
                Year: params.get('year') || String(getYear(time)),
                Month: params.get('month') || pad(month),
                IdentityTypeIds: params.get('type') || String(identityType),
                SortType: params.get('sort') || String(sortType),
                Page: params.get('page') || String(page),
                Count: count
            });
        }


        fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Participate/ComplexSearch`, {
            method: 'POST',
            body: requestPayload,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result.resultObject)
                if (result.isSucess) {
                    window.scrollTo({ top: 200, behavior: 'smooth' })
                    setSortTable(result.resultObject.participates)
                    setPageCount(result.resultObject.pageCount)
                    setTotalCount(result.resultObject.totalCount)
                    setLastEditTime(result.resultObject.lastEditTime)
                    setLoading(false)
                }
            });
    }

    useEffect(() => {
        complexSearch()
        const params = new URLSearchParams(history.location.search);
        if (params.get('page') !== null) {
            setPage(params.get('page'))
        }

    }, [page])

    useEffect(() => {
        if (searched) {
            complexSearch()
        }
    }, [sortType]);

    const handlePageClick = (data) => {

        var chks = document.querySelectorAll('input#identityCheckbox0[type=checkbox]:checked, input#identityCheckbox1[type=checkbox]:checked, input#identityCheckbox2[type=checkbox]:checked, input#identityCheckbox3[type=checkbox]:checked, input#identityCheckbox4[type=checkbox]:checked, input#identityCheckbox5[type=checkbox]:checked, input#identityCheckbox6[type=checkbox]:checked, input#identityCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setIdentityType(arrayCheck)
        }

        setPage(data.selected + 1);
        history.push(`/categories/green_office/participate?page=${data.selected + 1}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
    };

    const searchOnchange = () => {
        setSearched(false)
    }

    var arrayCheck = []

    const submit = async (e) => {

        if (year === "0") {
            history.push(`/categories/green_office/participate?page=1&type=${identityType}&city=${cityId}&month=${month}&sort=${sortType}&n=${keyWord}`)
        }
        else {

            history.push(`/categories/green_office/participate?page=1&type=${identityType}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
        }

        setSearched(true)

        var chks = document.querySelectorAll('input#identityCheckbox0[type=checkbox]:checked, input#identityCheckbox1[type=checkbox]:checked, input#identityCheckbox2[type=checkbox]:checked, input#identityCheckbox3[type=checkbox]:checked, input#identityCheckbox4[type=checkbox]:checked, input#identityCheckbox5[type=checkbox]:checked, input#identityCheckbox6[type=checkbox]:checked, input#identityCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setIdentityType(arrayCheck)

        }

        setPage(1)

        e.preventDefault()

        setLoading(true)
        complexSearch()
    }

    const getIdentityCheck = () => {


        var chks = document.querySelectorAll('input#identityCheckbox0[type=checkbox]:checked, input#identityCheckbox1[type=checkbox]:checked, input#identityCheckbox2[type=checkbox]:checked, input#identityCheckbox3[type=checkbox]:checked, input#identityCheckbox4[type=checkbox]:checked, input#identityCheckbox5[type=checkbox]:checked, input#identityCheckbox6[type=checkbox]:checked, input#identityCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setIdentityType(arrayCheck)
        }
        history.push(`/categories/green_office/participate?page=${page}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chks.length === 0 && setIdentityType([])
    }

    const sortOnchange = (e) => {
        setSortType(e.target.value)
        history.push(`/categories/green_office/participate?page=${page}&type=${identityType}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${e.target.value}&n=${keyWord}`)
        complexSearch()
    }

    const tableData = (

        sortTable.map((data, index) => {
            const { createTime, cityName, identityName, name, participateCount } = data
            return (
                <tr key={index}>
                    <td data-title="響應日期" className="list-date">{formatDate(createTime)}</td>
                    <td data-title="縣市" className="list-date">{cityName}</td>
                    <td data-title="單位性質" className="download-time">{identityName}</td>
                    <td data-title="單位名稱" className="table-align-left">{name}</td>
                    <td data-title="響應措施數量">{participateCount}</td>
                </tr>
            )
        })
    )

    return (
        <>
            <BreadCrumb currentPage={"綠色夥伴-響應名單"} />
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="container office-participate">
                <div className="title-wrapper">
                    <h1>綠色夥伴</h1><h2 className="subtitle">響應名單</h2>
                </div>
                <div className="content-wrapper row">
                    <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-office show' : 'search-office'} `}>
                        <Form className="form-text">
                            <Form.Group className="col-md-3 col-lg-12" controlId="formBasicEmail">
                                <Form.Label for="關鍵字查詢">關鍵字查詢</Form.Label>
                                <Form.Control id="關鍵字查詢" onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit(e)
                                    }
                                }} placeholder="請輸入關鍵字" value={keyWord} onChange={e => setKeyWord(e.target.value === "" ? "" : e.target.value)} />
                                <span className="keyword-note">*可查詢單位名稱</span>
                            </Form.Group>

                            <fieldset className="col-md-5 col-lg-12">
                                <legend className="form-label">縣市別</legend>
                                <Form.Control className="myInput" id="縣市別" as="select" defaultValue="請選擇" onChange={() => searchOnchange()} onBlur={e => setCityId(e.target.value)}
                                    aria-label="縣市別"
                                >
                                    <option value="">請選擇</option>
                                    {cityDrop.map((data, index) =>
                                        <option key={index} defaultValue={data.cityId === paramsSearch.get('city')} value={data.cityId}>{data.cityName}</option>
                                    )}

                                </Form.Control>
                            </fieldset>

                            <fieldset className="col-md-5 col-lg-12" style={{ margin: '1.2vw 0' }} >
                                <legend className="form-label" style={{ width: 'auto' }}>日期區間</legend>
                                <div className="data-wrapper">
                                    <DatePicker
                                        onChange={date => {
                                            setYear(date)
                                            searchOnchange()
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        placeholderText="年份"
                                        selected={year}
                                        className="myInput"
                                        id="日期區間"
                                        title="日期區間"
                                    />
                                    <Form.Control className="myInput" name="month" as="select" defaultValue={paramsSearch.get('month')} onChange={e => {
                                        setMonth(e.target.value)
                                        searchOnchange()
                                    }}
                                        aria-label="選擇月份"
                                    >
                                        <option value="0">月份</option>
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
                                    </Form.Control>
                                </div>
                            </fieldset>
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
                            <div className="col-md-5  col-lg-12">
                                <Form.Group as={Row} onChange={() => {
                                    getIdentityCheck()
                                    searchOnchange()
                                }}>
                                    <Form.Label for="identityCheckbox0" id="tblFruits" as="legend" column className="col-12">
                                        單位性質
                                    </Form.Label>
                                    <div>
                                        {identity.map((data, index) =>
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                className="participate-checkbox"
                                                label={data.identityTypeName}
                                                id={"identityCheckbox" + index}
                                                name="identityCheckbox"
                                                value={data.identityTypeId}
                                                defaultChecked={paramsSearch.get('type') && paramsSearch.get('type').includes(index + 1)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>
                            </div>

                            <Button className="searchButton col-12" variant="primary" type="submit" onClick={submit} >
                                <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                                &nbsp;查詢
                            </Button>

                        </Form>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-9 ">
                        <div className="">
                            <div className="result-outter-wrapper">
                                <div className="search-result-wrapper">
                                    <div className="office-sorted-wrapper">
                                        <p className="result-title">查詢結果 :</p>
                                        <p className="search-result-value">此頁{totalCount < count ? totalCount : count}筆</p>
                                        <p className="search-result-value">共有{totalCount}筆</p>
                                        <p className="search-result-value">第{page}/{pageCount}頁 </p>
                                    </div>

                                    <div className="search-result"><p className="result-title">最後更新日期:</p><p className="search-result-value">{formatDate(lastEditTime)}</p></div>
                                    <div className="search-result">
                                        <p className="result-title">選擇排序</p>
                                        <select className="sortDrop" value={paramsSearch.get('sort') || "10"} onChange={(e) => sortOnchange(e)} aria-label="選擇排序">
                                            {sortTypeDrop.map((sortType, index) =>
                                                <option key={index} value={sortType.typeId}>{sortType.typeName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="inner-content">
                                {loading ? <Loader loading={loading} /> :
                                    <div className="table-outter-wrapper">
                                        {sortTable.length === 0 ?
                                            <p>沒有相關結果喔~</p>
                                            :
                                            <table className="review-card rwd-table">
                                                <thead className="text-content-wrapper text-content-wrapper-darkgreen">
                                                    <tr>
                                                        {/* <i className="fas fa-sort-down"></i> */}
                                                        <th>響應日期</th>
                                                        <th>縣市</th>
                                                        <th>單位性質</th>
                                                        <th>單位名稱</th>
                                                        <th>響應措施數量</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="card-content-office card-content-darkgreen">
                                                    {tableData}
                                                </tbody>
                                            </table>
                                        }
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