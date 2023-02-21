import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref'
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import '../GreenProduct/GreenProductCount.scss';
import '../GreenOffice/greenOffice.scss';

import { getYear, percentage } from '../utils/Functions';

import markBannerSmall from '../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Loader = React.lazy(() => import('../Components/Loader'));

function GreenProductCount(props) {
    let history = useHistory()

    const [loading, setLoading] = useState(false)

    const paramsSearch = new URLSearchParams(history.location.search);
    const myPage = paramsSearch.get('page');

    const [labelClass, setLabelClass, labelClassRef] = useState("first");
    const [labelClassErr, setLabelClassErr] = useState(false)

    const [corpTable, setCorpTable, corpTableRef] = useState([]);
    let arrCorpTable = [];

    const [countCorp, setCountCorp] = useState([]);

    const [totalCount, setTotalCount, totalCountRef] = useState(0);
    const [showTotalCount, setShowTotalCount] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);

    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    const [year, setYear, yearRef] = useState(new Date());
    const [month, setMonth, monthRef] = useState("");

    const [searched, setSearched, searchedRef] = useState(false);

    let arrCountCorp = [];
    let basePage = myPage

    let SSL = props.SSL;
    let domainFormal = "greenliving.epa.gov.tw/newPublic";
    let hostname = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    const inputYearRef = useRef(null);
    const inputMonthRef = useRef(null);

    const tableData = (
        <>
            <tr>
                <td>總計</td>
                <td>{showTotalCount ? totalCountRef.current : ""}</td>
                <td>100%</td>
            </tr>
            {corpTableRef.current.map((data, index) => {
                const { corpName, productNum, productPercent } = data
                return (
                    <tr key={index}>
                        <td data-title="廠商名稱" className="list-date">{corpName}</td>
                        <td data-title="獲頒產品數量" className="list-date">{productNum}</td>
                        <td data-title="百分比" className="download-time">{productPercent}</td>
                    </tr>
                )
            })}
        </>
    );

    useEffect(() => {
        fetchData();
        setFirstLoad(true);
    }, [basePage, domainFormal])


    function fetchData() {
        setLoading(true);

        const yearValue = inputYearRef.current.input.value;
        const monthValue = inputMonthRef.current.value;


        let getAllUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll/${basePage}?ctn=${labelClass}&y=${getYear(year)}&m=${month}`;

        // 初次Render畫面
        if (!searchedRef.current) {
            let currentYear = today.getFullYear();
            setYear(currentYear);
            getAllUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll/${basePage}?ctn=${labelClass}&y=${currentYear}&m=${currentMonth}`;
        }


        let getConditionUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll/${basePage}?searched=${searched}&ctn=${labelClass}&y=${yearValue}&m=${monthValue}`;
        if (year === '1970' || month === '0') {
            getConditionUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll/${basePage}?searched=${searched}&ctn=${labelClassRef.current}`;
        }

        fetch((searchedRef.current ? getConditionUrl : getAllUrl), {
            method: "GET"
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.Result === "Success") {
                if (result.RowsCount > 0) {


                    let tempCounter = {};

                    const groupByCriteria = groupByProduct(["CorpName"]);
                    for (let [groupName, values] of Object.entries(groupByCriteria(result.Detail))) {
                        tempCounter[groupName] = values.length;
                    }

                    setTotalCount(result.RowsCount);

                    arrCountCorp.push(tempCounter);
                    setCountCorp(arrCountCorp);

                    if (arrCountCorp.length > 0) {

                        for (const key in arrCountCorp[0]) {

                            let objectCorp = {};
                            // objectCorp.corpName = 
                            objectCorp.corpName = key;
                            objectCorp.productNum = arrCountCorp[0][key];

                            setTotalCount(result.RowsCount);
                            setShowTotalCount(true);

                            objectCorp.productPercent = percentage(objectCorp.productNum, result.RowsCount);
                            arrCorpTable.push(objectCorp);
                            setCorpTable(arrCorpTable);
                        }

                    }
                } else {
                    arrCorpTable.length = 0;
                    setCorpTable(arrCorpTable);
                }
                setLoading(false);
            }

        });
    }

    const submit = () => {

        if (!labelClass) {
            setLabelClassErr(true)
        } else {
            setLabelClassErr(false)
        }

        setLoading(true)
        // e.preventDefault()

        setSearched(true);

        fetchData();
    }

    const reset = () => {
        setYear("");
        setMonth("0");
    }

    const groupByProduct = (keys) => (array) =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = keys.map((key) => obj[key]).join("-");
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    return (
        <>
            <BreadCrumb currentPage="廠商獲頒產品數統計" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="廠商獲頒產品數統計" /></div>

            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            <Link to={`/categories/GreenProductReport`} title="前往連結"><div className="col-12 col-md-6 col-lg-12">環保標章產品審查通過及有效數報表</div></Link>
                            <Link to={`/categories/GreenProductCount`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12" title="前往連結">廠商獲頒產品數統計</div></Link>
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>廠商獲頒產品數統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <Form.Label htmlFor="themeCheckbox0">標章類別:</Form.Label>
                                <div>
                                    <label>
                                        <input type="radio" id="firstLabel" name="性別" value="first"
                                            checked={labelClass === "first"}
                                            onChange={e => {
                                                setLabelClass(String(e.target.value))
                                            }}
                                        />
                                        第一類環境保護產品
                                    </label>
                                    <label>
                                        <input type="radio" id="secondLabel" name="性別" value="second"
                                            checked={labelClass === "second"}
                                            onChange={e => {
                                                setLabelClass(String(e.target.value))
                                            }}
                                        />
                                        第二類環境保護產品
                                    </label>
                                </div>

                                <div className="warning" style={{ "color": "red" }}>
                                    {labelClassErr && '請選擇分類保護產品'}
                                </div>

                                <Form.Label htmlFor="startDate">通過年度：</Form.Label>
                                <DatePicker
                                    onChange={date => {
                                        setFirstLoad(false)
                                        setYear(date)
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    placeholderText="年份"
                                    selected={
                                        firstLoad ?
                                            today :
                                            year
                                    }
                                    className="form-control"
                                    id="日期區間"
                                    title="日期區間"
                                    style={{ 'width': 'auto' }}
                                    ref={inputYearRef}
                                />

                                <Form.Label htmlFor="month">通過月份：</Form.Label>
                                <Form.Control name="month" as="select" style={{ 'width': 'auto', 'display': 'inline' }}
                                    defaultValue={currentMonth}
                                    ref={inputMonthRef}
                                    onChange={e => {
                                        setMonth(e.target.value)
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

                                <input id="btnSearch" className='btn btn-success' style={{ 'background': '#6cb15e', 'color': 'white' }} value="開始查詢"
                                    type="button" onClick={submit} />
                                <input id="btnReset" type="button" className='btn btn-success' style={{ 'background': '#6cb15e', 'color': 'white' }} value="重新設定" onClick={reset} />
                                <div className="table-outter-wrapper">
                                    {loading
                                        ?
                                        <Loader loading={loading} />
                                        :
                                        corpTableRef.current.length === 0
                                            ?
                                            <p>查無搜尋結果</p>
                                            :
                                            <>
                                                <table className="review-card rwd-table">
                                                    <thead className="text-content-wrapper text-content-wrapper-darkgreen" style={{ 'text-align': 'center' }}>
                                                        <tr>
                                                            <th>廠商名稱</th>
                                                            <th>獲頒產品數量</th>
                                                            <th>百分比</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="card-content-office card-content-darkgreen">
                                                        {tableData}
                                                    </tbody>
                                                </table>
                                                {/* <ReactPaginate
                                                    forcePage={page - 1}
                                                    style={{ visibility: loading ? 'hidden' : 'visible' }}
                                                    previousLabel={'上一頁'}
                                                    nextLabel={'下一頁'}
                                                    breakLabel={'...'}
                                                    breakClassName={'break-me'}
                                                    pageCount={pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={6}
                                                    onPageChange={handlePageClick}
                                                    containerClassName={'pagination'}
                                                    subContainerClassName={'pages pagination'}
                                                    activeClassName={'active'}
                                                    disabledClassName={'disabled'}
                                                />
                                                <span>/ 共有{searchCount}家廠商</span> */}

                                            </>

                                    }
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}
export default withRouter(GreenProductCount)
