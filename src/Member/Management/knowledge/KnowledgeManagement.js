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


function KnowledgeManagement({ SSL, domain }) {

    var XLSX = require('xlsx');

    var serialize = require('serialize-javascript');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;
    const [knowledgeStatus, setKnowledgeStatus] = useState(""); //審查
    const [title, setTitle] = useState("") //文章名稱
    const [themeId, setThemeId] = useState(""); //知識分類
    const [typeId, setTypeId] = useState(""); //主題分類

    // const [getThemeSort,setThemeSort] = useState([])

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("45162DCA-1BC4-45D1-986A-A2FD4539F34B", "19", collector)
    }, [collector]);

    //會員專區-管理者專區-審核
    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);

    const getFetchData = () => {
        fetch(`${SSL}//${domain}/api/api/Manager/Knowledge/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                Title: title,
                ThemeId: themeId,
                TypeId: typeId,
                KnowledgeVerifyStatus: knowledgeStatus,
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
                    setFetchData(result.resultObject.knowledges)
                    setPageCount(result.resultObject.pageCount)
                    setTotalCount(result.resultObject.totalCount)
                    // console.log("theme", result.resultObject.knowledges)
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

    //知識綠審核狀態下拉項目API
    const [knowledgeStatusDrop, setKnowledgeStatusDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Manager/Knowledge/VerifyStatus`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setKnowledgeStatusDrop(result.resultObject)
                // console.log("審核",result.resultObject)
            });
    }, [SSL, domain])

    //知識分類列表下拉項目API
    const [knTypeDrop, setKnTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Knowledge/Type/Count`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setKnTypeDrop(result.resultObject)
                // console.log("知識", result)
            });
    }, [SSL, domain])

    //主題分類列表下拉項目API
    const [knThemeDrop, setKnThemeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Knowledge/Theme`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setKnThemeDrop(result.resultObject)
                // console.log("主題", result)
            });
    }, [SSL, domain])
    //json匯出ods
    const tableHead = ["日期", "審查狀態", "文章名稱", "知識分類", "主題分類"]
    const handleExport = () => {

        fetch(`${SSL}//${domain}/api/api/Manager/Activity/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                Title: title,
                ThemeId: themeId,
                TypeId: typeId,
                KnowledgeVerifyStatus: knowledgeStatus,
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
                    XLSX.writeFile(wb, `全民綠生活_知識綠管理_共${totalCount}筆.ods`);
                }
            });
        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");

    }

    const tableData = (
        fetchData.map((data, index) => {
            const { guid, title, startDatetime, typeName, themes, status } = data
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(startDatetime)}</td>
                    <td data-title="審查狀態" className="list-date">{status}</td>
                    <td data-title="知識分類" className="list-date">{typeName}</td>
                    <td data-title="主題分類" className="list-date">{knThemeDrop.map(d => d.key === themes[0]?.themeId && d.value)}</td>
                    <td data-title="文章名稱" className="list-date">{title}</td>
                    <td data-title="詳細資料" className="link-wrapper">
                        <Link to={`/member/knowledge_management/review?${guid}`}>檢視</Link>
                        <Link to={`/member/knowledge_management/process?${guid}`}>歷程</Link>
                    </td>
                </tr >
            )
        })

    )

    return (
        <>

            <BreadCrumb currentPage={"知識綠管理"} />

            <div className="container member-info-wrapper shareBlog">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

                <div className="col-12 mt-4">
                    <h3 className="green-title">知識綠管理</h3>
                    <div className="row search-conditions">
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">審查狀態</label>
                            <select className="management-select" onBlur={e => setKnowledgeStatus(e.target.value)}>
                                <option value="">請選擇</option>
                                {knowledgeStatusDrop.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="title" className="condition-label">文章名稱</label>
                            <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="typeId" className="condition-label">知識分類</label>
                            <select className="management-select" id="typeId" onBlur={e => setTypeId(e.target.value)}>
                                <option value="">請選擇</option>
                                {knTypeDrop.map((data, index) =>
                                    <option key={index} value={data.typeId}>{data.typeName}</option>
                                )}
                            </select>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="themeId" className="condition-label">主題分類</label>
                            <select className="management-select" id="themeId" onBlur={e => setThemeId(e.target.value)}>
                                <option value="">請選擇</option>
                                {knThemeDrop.map((data, index) =>
                                    <option key={index} value={data.Key}>{data.value}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end">
                            <button onClick={submit} className="condition-submit-btn">查詢</button>
                            <button onClick={handleExport} className="condition-submit-btn">匯出</button>
                        </div>
                    </div>

                    <div className="management-result-count">查詢結果：共 {totalCount} 則</div>

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
                                            <th>知識分類</th>
                                            <th>主題分類</th>
                                            <th>文章名稱</th>
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
    )
}
export default KnowledgeManagement;