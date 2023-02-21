import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clickLogout, formatDate } from '../../../utils/Functions';
import ReactPaginate from 'react-paginate';
import '../../office/Review.scss';
import { clickRecord, getDistrictDrop } from '../../../utils/API';
import { useCookies } from "react-cookie";
import Loader from '../../../Components/Loader';

const BreadCrumb = React.lazy(() => import('../../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../../Components/Footer'));


function ActivityManagement(props) {

    var XLSX = require('xlsx');

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [activityVerifyStatus, setActivityVerifyStatus] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;
    const [title, setTitle] = useState("")
    const [account, setAccount] = useState("");
    const [cityId, setCityId] = useState("");
    const [unitFullName, setUnitFullName] = useState("");
    const [addrCode, setAddrCode] = useState("");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("45162DCA-1BC4-45D1-986A-A2FD4539F34B", "19", collector)
    }, [collector]);

    //會員專區-管理者專區-活動審核
    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);


    const getFetchData = () => {
        fetch(`${SSL}//${domain}/api/api/Manager/Activity/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                Title: title,
                CityId: cityId,
                AddrCode: addrCode,
                Account: account,
                UnitFullName: unitFullName,
                ActivityVerifyStatus: activityVerifyStatus,
            }),
            headers: myHeaders
        })
            .then(res => {
                // console.log(res)
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setLoading(false)
                    setFetchData(result.resultObject.activitys)
                    setPageCount(result.resultObject.pageCount)
                    setTotalCount(result.resultObject.totalCount)
                }
            });

    }

    //查詢按鈕
    const submit = () => {
        //查詢結果回到第一頁
        setPage(1)
        setLoading(true)
        getFetchData()
    }

    //換頁
    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    const tableData = (
        fetchData.map((data, index) => {
            const { guid, createTime, status, cityName, administrativeDistrictName, unitFullName, account, accountTypeName, title } = data
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(createTime)}</td>
                    <td data-title="審查狀態" className="list-date">{status}</td>
                    <td data-title="縣市" className="list-date">{cityName}</td>
                    <td data-title="行政區" className="list-date">{administrativeDistrictName}</td>
                    <td data-title="單位名稱" className="manageTable-name">{unitFullName}
                        <div className="point-percent"><h6>帳號：{account}</h6><h6>來源：{accountTypeName}</h6></div></td>
                    {/* <td data-title="來源">{accountTypeName}</td> */}
                    {/* <td data-title="帳號">{account}</td> */}
                    <td data-title="活動名稱" className="list-date">{title}</td>
                    <td data-title="詳細資料" className="link-wrapper">
                        <Link to={`/member/activity_management/review?${guid}`}>檢視</Link>
                        <Link to={`/member/activity_management/process?${guid}`}>歷程</Link>
                    </td>
                </tr >
            )
        })

    )

    //網誌審核狀態下拉項目API
    const [blogStatusDrop, setBlogStatusDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Manager/Activity/VerifyStatus`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setBlogStatusDrop(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])

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

    //單位-行政區下拉選單
    const [districtDrop, setDistrictDrop] = useState([])
    useEffect(() => {
        if (cityId)
            getDistrictDrop(cityId, setDistrictDrop)
    }, [cityId]);


    //json匯出ods
    const tableHead = ["日期", "審查狀態", "縣市", "行政區", "來源", "帳號", "單位名稱", "活動名稱"]
    const handleExport = () => {

        fetch(`${SSL}//${domain}/api/api/Manager/Activity/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                Title: title,
                CityId: cityId,
                AddrCode: addrCode,
                Account: account,
                UnitFullName: unitFullName,
                ActivityVerifyStatus: activityVerifyStatus,
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                //從陣列中刪除Guid欄位
                result.resultObject.activitys.forEach(function (v) { delete v.guid });
                if (result.isSucess) {
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                    var ws = XLSX.utils.json_to_sheet(result.resultObject.activitys);

                    const wb = XLSX.WorkBook = XLSX.utils.book_new();
                    //表格中項目名稱
                    ws.A1.v = tableHead[0]
                    ws.B1.v = tableHead[1]
                    ws.C1.v = tableHead[2]
                    ws.D1.v = tableHead[3]
                    ws.E1.v = tableHead[4]
                    ws.F1.v = tableHead[5]
                    ws.G1.v = tableHead[6]
                    ws.H1.v = tableHead[7]


                    XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
                    XLSX.writeFile(wb, `全民綠生活_活動管理_共${totalCount}筆.ods`);
                }
            });
        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");

    }


    return (
        <>

            <BreadCrumb currentPage={"活動管理"} />

            <div className="container member-info-wrapper shareBlog">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

                <div className="col-12 mt-4">
                    <h3 className="green-title">活動管理</h3>
                    <div className="row search-conditions">
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">縣市別</label>
                            <select className="management-select" onChange={e => setCityId(e.target.value)}>
                                <option value="">請選擇</option>
                                <option value="999">全國</option>
                                {cityDrop.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>
                            {cityId !== "999" && <select className="signUp-addr-select select-auto-width management-select" key={fetchData.addrCode} value={addrCode || fetchData.addrCode} onChange={e => {
                                setAddrCode(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                {districtDrop.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>}
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="title" className="condition-label">標題</label>
                            <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="activityVerifyStatus" className="condition-label">審查狀態</label>
                            <select className="management-select" id="activityVerifyStatus" onBlur={e => setActivityVerifyStatus(e.target.value)}>
                                <option value="">請選擇</option>
                                {blogStatusDrop.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>
                                )}
                            </select>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="account" className="condition-label">帳號名稱</label>
                            <input type="text" name="account" id="account" onChange={e => setAccount(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="unitFullName" className="condition-label">單位名稱</label>
                            <input type="text" name="unitFullName" id="unitFullName" onChange={e => setUnitFullName(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>


                        <button onClick={submit} className="condition-submit-btn">查詢</button>
                        <button onClick={handleExport} className="condition-submit-btn">匯出</button>
                    </div>

                    <div className="management-result-count">查詢結果：共 {totalCount} 家</div>

                    <div className="member-table-outter-wrapper">
                        {loading
                            ?
                            <Loader loading={loading} />
                            :
                            fetchData.length === 0
                                ?
                                <p>查無搜尋結果</p>
                                :
                                <table className="review-card rwd-table">
                                    <thead className="text-content-wrapper text-content-wrapper-darkgreen">
                                        <tr>
                                            {/* <i className="fas fa-sort-down"></i> */}
                                            <th>日期</th>
                                            <th>審查狀態</th>
                                            <th>縣市</th>
                                            <th>行政區</th>
                                            <th>單位名稱</th>
                                            <th>活動名稱</th>
                                            <th>詳細資料</th>
                                        </tr>
                                    </thead>
                                    <tbody className="card-content">
                                        {tableData}
                                    </tbody>
                                </table>
                        }
                    </div>

                </div>
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

            </div>


            <Footer />

        </>
    );
}

export default withRouter(ActivityManagement);