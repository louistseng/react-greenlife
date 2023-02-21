import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDate } from '../../../utils/Functions';
import ReactPaginate from 'react-paginate';
import '../../office/Review.scss';
import { clickRecord, getDistrictDrop } from '../../../utils/API';
import { useCookies } from "react-cookie";
import Loader from '../../../Components/Loader';

const BreadCrumb = React.lazy(() => import('../../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../../Components/Footer'));


function GroupTourManagement(props) {

    let SSL = props.SSL;
    let hostname = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    let greenliving = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "https://greenliving.eri.com.tw/GreenLife/GreenTravel/GreenPlatformTravel.aspx" : "https://greenliving.epa.gov.tw/GreenLife/GreenTravel/GreenPlatformTravel.aspx";

    var XLSX = require('xlsx');

    var serialize = require('serialize-javascript');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);
    const [states, setStates] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;
    const [keyWord, setKeyWord] = useState("")

    let history = useHistory();
    //點閱計數API
    useEffect(() => {
        clickRecord("45162DCA-1BC4-45D1-986A-A2FD4539F34B", "19", collector)
    }, [collector]);

    //會員專區-管理者專區-團體行程審核
    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);

    const statusDrop = ["未送出", "待審", "需補件", "初審通過", "複審通過許可上架"]

    const getFetchData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("k", keyWord);
        urlencoded.append("s", states);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${SSL}//${hostname}/APIs/TravelGroupApplyList`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Result === "Success") {
                    setLoading(false)
                    setFetchData(result.Detail)
                    setTotalCount(result.RowsCount)
                    setPageCount(result.PageIndex)
                    if (keyWord !== "" || states !== "") {
                        history.push(`/member/groupTour?k=${keyWord}&s=${states}`)
                    }
                }
            })
            .catch(error => console.log('error', error));
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
            const { ProjNo, CreateDate, States, Travel, ProjName } = data
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(CreateDate)}</td>
                    <td data-title="審查狀態" className="list-date">{States}</td>
                    <td data-title="旅行社名稱" className="manageTable-name">{Travel}</td>
                    <td data-title="行程名稱" className="list-date">{ProjName}</td>
                    <td data-title="詳細資料" className="link-wrapper">
                        {collector === "b7f5b8bb-9ebb-47ca-9693-184db8cc0e77" ?
                            <a href={`${greenliving}?m=View&p=${ProjNo}`} target="_blank">檢視</a>
                            :
                            <a href={`${greenliving}?m=Review&p=${ProjNo}`} target="_blank">審查</a>
                        }
                        <Link to={`/member/groupTour/process?p=${ProjNo}`}>歷程</Link>
                    </td>
                </tr >
            )
        })

    )

    // //json匯出ods
    // const tableHead = ["日期", "審查狀態", "旅行社名稱", "行程名稱"]
    // const handleExport = () => {

    //     fetch(`${SSL}//${domain}/api/api/Manager/Activity/ComplexSearch`, {
    //         method: 'POST',
    //         body: serialize({
    //             Page: String(page),
    //             Count: String(count),
    //             Title: tourTitle,
    //             UnitFullName: unitFullName,
    //             ActivityVerifyStatus: status,
    //         }),
    //         headers: myHeaders
    //     })
    //         .then(res => {
    //             return res.json();
    //         }).then(result => {
    //             //從陣列中刪除Guid欄位
    //             result.resultObject.activitys.forEach(function (v) { delete v.guid });
    //             if (result.isSucess) {
    //                 if (typeof XLSX == 'undefined') XLSX = require('xlsx');
    //                 var ws = XLSX.utils.json_to_sheet(result.resultObject.activitys);

    //                 const wb = XLSX.WorkBook = XLSX.utils.book_new();
    //                 //表格中項目名稱
    //                 ws.A1.v = tableHead[0]
    //                 ws.B1.v = tableHead[1]
    //                 ws.C1.v = tableHead[2]
    //                 ws.D1.v = tableHead[3]
    //                 ws.E1.v = tableHead[4]

    //                 XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
    //                 XLSX.writeFile(wb, `全民綠生活旅遊團體行程管理_共${totalCount}筆.ods`);
    //             }
    //         });
    //     /* generate an XLSX file */
    //     // XLSX.writeFile(wb, "sheetjs.xlsx");
    // }


    return (
        <>

            <BreadCrumb currentPage={"綠色旅遊團體行程管理"} />

            <div className="container member-info-wrapper shareBlog">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

                <div className="col-12 mt-4">
                    <h3 className="green-title">綠色旅遊團體行程管理</h3>
                    <div className="row search-conditions">
                        <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                            <label for="title" className="condition-label">關鍵字查詢</label>
                            <input type="text" name="title" id="title" onChange={e => setKeyWord(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 mb-4">
                            <label for="status" className="condition-label">審查狀態</label>
                            <select className="management-select" id="status" onBlur={e => setStates(e.target.value)}>
                                <option value="">請選擇</option>
                                {statusDrop.map((data, index) =>
                                    <option key={index} value={data}>{data}</option>
                                )}
                            </select>
                        </div>
                        <button onClick={submit} className="condition-submit-btn">查詢</button>
                        {/* <button onClick={handleExport} className="condition-submit-btn">匯出</button> */}
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
                                            <th>旅行社名稱</th>
                                            <th>行程名稱</th>
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

export default withRouter(GroupTourManagement);