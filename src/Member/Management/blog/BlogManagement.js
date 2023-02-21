import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clickLogout, formatDate } from '../../../utils/Functions';
import ReactPaginate from 'react-paginate';
import '../../office/Review.scss';
import { clickRecord } from '../../../utils/API';
import { useCookies } from "react-cookie";
import Loader from '../../../Components/Loader';

const BreadCrumb = React.lazy(() => import('../../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../../Components/Footer'));


function BlogManagement(props) {

    var XLSX = require('xlsx');

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjcyNzAwNDIsIm5iZiI6MTYyNzI2ODI0MiwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.DXlbBvBGGqhOIk0005QHu6Uc-8wms0DSPhimPX68AO9wOGnbib4HxO1U65ykAp6gb-f2EJiI7MSluPn7UOQCvw";

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [blogVerifyStatus, setBlogVerifyStatus] = useState(0);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;
    const [title, setTitle] = useState("")

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("600C3DFF-855D-451A-BEC4-194DE489C4C0", "19", collector)
    }, [collector]);

    //會員專區-管理者專區-網誌審核
    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);


    const getFetchData = () => {
        fetch(`${SSL}//${domain}/api/api/Manager/Blog/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                Title: title,
                BlogVerifyStatus: String(blogVerifyStatus),
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
                    setFetchData(result.resultObject.blogs)
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
            const { guid, nickName, title, status, createTime, account, accountTypeName } = data
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(createTime)}</td>
                    <td data-title="審查狀態" className="list-date">{status}</td>
                    <td data-title="暱稱" className="manageTable-name">{nickName}
                        <div className="point-percent"><h6>帳號：{account}</h6><h6>來源：{accountTypeName}</h6></div></td>
                    {/* <td data-title="來源">{accountTypeName}</td> */}
                    {/* <td data-title="帳號">{account}</td> */}
                    <td data-title="文章標題" className="list-date">{title}</td>
                    <td data-title="詳細資料" className="link-wrapper">
                        <Link to={`/member/blog_management/review?${guid}`}>檢視</Link>
                        <Link to={`/member/blog_management/process?${guid}`}>歷程</Link>
                    </td>
                </tr >
            )
        })

    )

    //網誌審核狀態下拉項目API
    const [blogStatusDrop, setBlogStatusDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Manager/Blog/VerifyStatus`, {
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


    //json匯出ods
    const tableHead = ["日期", "審查狀態", "暱稱", "文章標題", "來源", "帳號"]
    const handleExport = () => {

        fetch(`${SSL}//${domain}/api/api/Manager/Blog/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: "1",
                Count: String(count),
                Title: title,
                BlogVerifyStatus: blogVerifyStatus,
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                //從陣列中刪除Guid欄位
                result.resultObject.blogs.forEach(function (v) { delete v.guid });
                if (result.isSucess) {
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                    var ws = XLSX.utils.json_to_sheet(result.resultObject.blogs);

                    const wb = XLSX.WorkBook = XLSX.utils.book_new();
                    //表格中項目名稱
                    ws.A1.v = tableHead[0]
                    ws.B1.v = tableHead[1]
                    ws.C1.v = tableHead[2]
                    ws.D1.v = tableHead[3]
                    ws.E1.v = tableHead[4]
                    ws.F1.v = tableHead[5]


                    XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
                    XLSX.writeFile(wb, `全民綠生活_網誌管理_共${totalCount}家.ods`);
                }
            });






        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");

    }


    return (
        <>

            <BreadCrumb currentPage={"網誌管理"} />

            <div className="container member-info-wrapper shareBlog">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

                <div className="col-12 mt-4">
                    <h3 className="green-title">網誌管理</h3>
                    <div className="row search-conditions">

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
                            <label className="condition-label">審查狀態</label>
                            <select className="management-select" onBlur={e => setBlogVerifyStatus(e.target.value)}>
                                <option value="">請選擇</option>
                                {blogStatusDrop.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>
                                )}
                            </select>
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
                                            <th>暱稱</th>
                                            <th>文章標題</th>
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

export default withRouter(BlogManagement);