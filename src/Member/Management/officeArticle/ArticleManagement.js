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


function ArticleManagement(props) {

    var XLSX = require('xlsx');

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjgwNDIwNjAsIm5iZiI6MTYyODA0MDI2MCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.btxClyGWwl4UOUgTnLCKvZpxiJAccY1M4GMcwrXGLh18w5qU2Z_SXmU6_YMA4tb2tqFP8iLgYW0pBjjnNJbL4g";

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [officeArticleVerifyStatus, setOfficeArticleVerifyStatus] = useState("");
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
        clickRecord("A23184F9-9BB1-42FE-8F0B-2342D95095E8", "19", collector)
    }, [collector]);

    //會員專區-管理者專區-網誌審核
    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);


    const getFetchData = () => {
        fetch(`${SSL}//${domain}/api/api/Manager/OfficeArticle/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                UnitFullName: title,
                OfficeArticleVerifyStatus: officeArticleVerifyStatus,
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
                    setFetchData(result.resultObject.articles)
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
            const { guid, identityTypeName, cityName, name, title, status, createTime, account, accountTypeName } = data
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(createTime)}</td>
                    <td data-title="審查狀態" className="list-date">{status}</td>
                    <td data-title="單位性質">{identityTypeName}</td>
                    <td data-title="縣市別">{cityName}</td>
                    <td data-title="單位名稱" className="manageTable-name">{name}
                        <div className="point-percent"><h6>帳號：{account}</h6><h6>來源：{accountTypeName}</h6></div></td>
                    {/* <td data-title="來源">{accountTypeName}</td> */}
                    {/* <td data-title="來源">{accountTypeName}</td> */}
                    {/* <td data-title="帳號">{account}</td> */}
                    <td data-title="文章標題" className="list-date">{title}</td>
                    <td data-title="詳細資料" className="link-wrapper">
                        <Link to={`/member/office_article_management/review?${guid}`}>檢視</Link>
                        <Link to={`/member/office_article_management/process?${guid}`}>歷程</Link>
                    </td>
                </tr >
            )
        })

    )

    //審核狀態下拉項目API
    const [statusDrop, setStatusDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Manager/OfficeArticle/VerifyStatus`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setStatusDrop(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])


    //json匯出ods
    const tableHead = ["日期", "審查狀態", "單位名稱", "文章標題", "來源", "帳號"]
    const handleExport = () => {

        fetch(`${SSL}//${domain}/api/api/Manager/OfficeArticle/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: "1",
                Count: String(count),
                UnitFullName: title,
                OfficeArticleVerifyStatus: officeArticleVerifyStatus,
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                //從陣列中刪除Guid欄位
                result.resultObject.articles.forEach(function (v) { delete v.guid });
                if (result.isSucess) {
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                    var ws = XLSX.utils.json_to_sheet(result.resultObject.articles);

                    const wb = XLSX.WorkBook = XLSX.utils.book_new();
                    //表格中項目名稱
                    ws.A1.v = tableHead[0]
                    ws.B1.v = tableHead[1]
                    ws.C1.v = tableHead[2]
                    ws.D1.v = tableHead[3]
                    ws.E1.v = tableHead[4]
                    ws.F1.v = tableHead[5]



                    XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
                    XLSX.writeFile(wb, `全民綠生活_綠色辦公經驗分享文章管理_共${totalCount}家.ods`);
                }
            });

        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");

    }


    return (
        <>

            <BreadCrumb currentPage={"綠色辦公經驗分享文章管理"} />

            <div className="container member-info-wrapper shareBlog">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

                <div className="col-12 mt-4">
                    <h3 className="green-title">綠色辦公經驗分享文章管理</h3>
                    <div className="row search-conditions">

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="title" className="condition-label">帳號單位</label>
                            <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="officeArticleVerifyStatus" className="condition-label">審查狀態</label>
                            <select className="management-select" id="officeArticleVerifyStatus" onBlur={e => setOfficeArticleVerifyStatus(e.target.value)}>
                                <option value="">請選擇</option>
                                {statusDrop.map((data, index) =>
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
                                            <th>單位性質</th>
                                            <th>縣市別</th>
                                            <th>單位名稱</th>
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

export default withRouter(ArticleManagement);