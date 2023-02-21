import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { clickLogout, formatDate } from '../../utils/Functions';
import ReactPaginate from 'react-paginate';
import '../office/Review.scss';
import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";
import Loader from '../../Components/Loader';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));


function Management(props) {

    var XLSX = require('xlsx');

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [greenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;

    const [cityId, setCityId] = useState("");
    const [unitFullName, setUnitFullName] = useState("");
    const [participateStatus, setParticipateStatus] = useState("");
    const [unitCode, setUnitCode] = useState("");
    const [isScoring, setIsScoring] = useState("");
    const [sortType, setSortType] = useState("10");
    const [account, setAccount] = useState("");
    const [acType, setAcType] = useState("");

    const [clickState, setClickState] = useState("clickDate");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("EC378E95-EB0B-4BA0-821A-70117DA1D937", "19", collector)
    }, [collector]);

    //會員專區-管理者專區-綠色辦公審核
    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);

    //換排序
    useEffect(() => {
        //查詢結果回到第一頁
        setPage(1)
        getFetchData()
    }, [sortType]);

    const getFetchData = () => {
        // console.log(sortType)
        fetch(`${SSL}//${domain}/api/api/Manager/Participate/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                CityId: cityId,
                UnitFullName: unitFullName,
                ParticipateStatus: participateStatus,
                UnitCode: unitCode,
                IsScoring: isScoring,
                SortType: sortType,
                Account: account,
                AcType: acType
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
                    setFetchData(result.resultObject.participates)
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
            const { creatorGuid, identityTypeName, cityName, name, scoring, status, createTime, account, accountTypeName } = data
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(createTime)}</td>
                    <td data-title="審查狀態" className="list-date">{status}</td>
                    <td data-title="評核計分" className="download-time">{scoring}</td>
                    <td data-title="單位性質">{identityTypeName}</td>
                    <td data-title="縣市別">{cityName}</td>
                    <td data-title="單位名稱" className="manageTable-name">{name}
                        <div className="point-percent"><h6>帳號：{account}</h6></div></td>
                    <td data-title="來源">{accountTypeName}</td>
                    {/* <td data-title="帳號">{account}</td> */}
                    <td data-title="詳細資料" className="link-wrapper">
                        <Link to={`/member/management/review?${creatorGuid}`}>檢視</Link>
                        <Link to={`/member/management/process?${creatorGuid}`}>歷程</Link>
                    </td>
                </tr >
            )
        })
    )

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

    //帳號類型下拉項目API
    const [acTypeDrop, setAcTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/AcTypes`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setAcTypeDrop(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])


    //json匯出ods
    const tableHead = ["審查狀態", "評核計分", "縣市別", "單位性質", "單位名稱", "日期", "帳號", "來源"]
    const handleExport = () => {

        fetch(`${SSL}//${domain}/api/api/Manager/Participate/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: "1",
                Count: String(totalCount),
                CityId: cityId,
                UnitFullName: unitFullName,
                ParticipateStatus: participateStatus,
                UnitCode: unitCode,
                IsScoring: isScoring,
                SortType: sortType,
                Account: account,
                AcType: acType
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                //從陣列中刪除Guid欄位
                result.resultObject.participates.forEach(function (v) { delete v.creatorGuid });
                if (result.isSucess) {
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                    var ws = XLSX.utils.json_to_sheet(result.resultObject.participates);

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
                    XLSX.writeFile(wb, `全民綠生活_綠色辦公響應_共${totalCount}家.ods`);
                }
            });



        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");

    }


    return (
        <>

            <BreadCrumb currentPage={"綠色辦公響應管理"} />

            <div className="container member-info-wrapper shareBlog">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

                <div className="col-12 mt-4">
                    <h3 className="green-title">綠色辦公響應管理</h3>
                    <div className="row search-conditions">
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">縣市別</label>
                            <select className="management-select" onBlur={e => setCityId(e.target.value)}>
                                <option value="">請選擇</option>
                                {cityDrop.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="name" className="condition-label">單位名稱</label>
                            <input type="text" name="name" id="name" onChange={e => setUnitFullName(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="serialNumber" className="condition-label">統一編號</label>
                            <input type="text" name="serialNumber" id="serialNumber" onChange={e => setUnitCode(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label className="condition-label">審查狀態</label>
                            <select className="management-select" onBlur={e => setParticipateStatus(e.target.value)}>
                                <option value="">請選擇</option>
                                <option value="1">待審核</option>
                                <option value="2">前台上架</option>
                                <option value="3">退件</option>
                                <option value="7">過期</option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">評核計分</label>
                            <select className="management-select" onBlur={e => {
                                setIsScoring(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                <option value={true}>計分</option>
                                <option value={false}>不計分</option>
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
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">帳號來源</label>
                            <select className="management-select" onBlur={e => {
                                setAcType(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                {acTypeDrop.map((data, index) =>
                                    <option key={index} value={data.accountTypeId}>{data.accountTypeName}</option>
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
                                    <thead className="text-content-wrapper">
                                        <tr>
                                            <th onClick={() => {
                                                setClickState("clickDate")
                                                setSortType(sortType === "10" ? "9" : "10")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>日期</h6>
                                                    {clickState === "clickDate" &&
                                                        <div className={sortType === "9" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            <th onClick={() => {
                                                setClickState("clickStatus")
                                                setSortType(sortType === "20" ? "19" : "20")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>審查狀態</h6>
                                                    {clickState === "clickStatus" &&
                                                        <div className={sortType === "19" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            <th onClick={() => {
                                                setClickState("clickScore")
                                                setSortType(sortType === "22" ? "21" : "22")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>評核計分</h6>
                                                    {clickState === "clickScore" &&
                                                        <div className={sortType === "21" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            <th onClick={() => {
                                                setClickState("clickType")
                                                setSortType(sortType === "16" ? "15" : "16")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>單位性質</h6>
                                                    {clickState === "clickType" &&
                                                        <div className={sortType === "15" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            <th onClick={() => {
                                                setClickState("clickCity")
                                                setSortType(sortType === "18" ? "17" : "18")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>縣市別</h6>
                                                    {clickState === "clickCity" &&
                                                        <div className={sortType === "17" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            <th onClick={() => {
                                                setClickState("clickName")
                                                setSortType(sortType === "24" ? "23" : "24")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>單位名稱</h6>
                                                    {clickState === "clickName" &&
                                                        <div className={sortType === "23" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            <th onClick={() => {
                                                setClickState("clickAcType")
                                                setSortType(sortType === "28" ? "27" : "28")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>來源</h6>
                                                    {clickState === "clickAcType" &&
                                                        <div className={sortType === "27" ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                        </div>}
                                                </div>
                                            </th>
                                            {/* <th onClick={() => {
                                                setClickAccount(!clickAccount)
                                                setSortType(clickAccount ? "27" : "28")
                                            }}>
                                                <div className="d-flex">
                                                    <h6>帳號</h6>
                                                    {(sortType === "27" || sortType === "28") &&
                                                        <div className={clickAccount ? "none-rotate-management" : "rotate-management"}>
                                                            <i className="fas fa-angle-down "></i>
                                                        </div>}
                                                </div>
                                            </th> */}
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

export default withRouter(Management);