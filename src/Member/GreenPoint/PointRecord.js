import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDate } from '../../utils/Functions';
import ReactPaginate from 'react-paginate';
import '../office/Review.scss';
import './Point.scss';
import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

const Points = React.lazy(() => import('../../Components/GreenPoint/Points'));

function Management(props) {

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');
    let history = useHistory()

    const paramsSearch = new URLSearchParams(history.location.search)

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [mainTypeId, setMainTypeId] = useState("");
    const [roleId, setRoleId] = useState("");
    const [pointStatus, setPointStatus] = useState("");

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [clickState, setClickState] = useState("clickDate");
    //會員功能api的header
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("666204C6-A820-4C6C-95E0-C6A269D1FAA0", "22", collector)
    }, [collector]);

    //我的綠積分歷程查詢
    //換頁的時候在抓一次
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);

    //我的綠積分任務-任務類型下拉
    const [bookMark, setBookMark] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Point/Tag`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setBookMark(result.resultObject)
            })
    }, [])

    //我的綠積分任務-狀態下拉
    const [statusDrop, setStatusDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Point/State`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setStatusDrop(result.resultObject)
            })
    }, [])

    //我的綠積分任務-任務項目下拉
    const [roleDrop, setRoleDrop] = useState([]);
    useEffect(() => {
        if (mainTypeId)
            fetch(`${SSL}//${domain}/api/api/Point/Roles/${mainTypeId}`, {
                method: 'GET',
                headers: myHeaders
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess)
                    setRoleDrop(result.resultObject)
            })
    }, [mainTypeId])

    //抓會員的綠積分資料
    const getFetchData = () => {
        console.log(pointStatus)
        fetch(`${SSL}//${domain}/api/api/Point/Record`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                StartTime: startDate ? String(formatDate(startDate)) : "",
                EndTime: endDate ? String(formatDate(endDate)) : "",
                MainTypeId: String(mainTypeId),
                RoleId: String(roleId),
                GreenPointState: String(pointStatus)
            }),
            headers: myHeaders
        })
            .then(res => {
                //401使用者驗證錯誤的話, 清除cookie資料
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            }).then(result => {
                if (result.isSucess) {
                    setLoading(false)
                    setFetchData(result.resultObject.pointOrders)
                    setPageCount(result.resultObject.pageCount)
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

    //按下換頁按鈕觸發
    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    const tableData = (
        fetchData.map((data, index) => {
            const { creatime, typeName, itemTypeName, stateName, point, isOnceReceived } = data
            return (
                <tr>
                    <td data-title="日期">{formatDate(creatime)}</td>
                    <td data-title="任務類型" className="list-date">{typeName}</td>
                    <td data-title="任務項目" className="download-time">{itemTypeName}</td>
                    <td data-title="狀態">{stateName}</td>
                    <td data-title="綠積分數">{point}分</td>
                    <td data-title="已領取" className="align-center">{isOnceReceived ? <i class="fas fa-check" aria-hidden="true"></i> : ""}</td>
                </tr>
            )
        })
    )



    return (
        <>
            <div className="col-12 col-lg-8 green-points">
                <Points memberToken={memberToken} />
                <div className="mt-3">
                    {/* 查詢區域start */}
                    <h3 className="point-section-title">我的綠積分查詢</h3>
                    <div className="row search-conditions">
                        <div className="col-12 timeSearch-lable-input-wrapper">
                            <label for="date" className="condition-label auto-width">時間區間</label>
                            <div className="time-select-wrapper">
                                <div>
                                    <input
                                        className="datePicker point-search-select"
                                        type="date"
                                        name="date"
                                        id="date"
                                        onChange={e => setStartDate(e.target.value)}
                                        max={endDate}
                                        defaultValue={paramsSearch.get('startDate')}
                                    ></input>
                                </div>
                                <div>～</div>
                                <div>
                                    <input
                                        className="datePicker point-search-select"
                                        type="date"
                                        name="date"
                                        id="date"
                                        onChange={e => setEndDate(e.target.value)}
                                        min={startDate}
                                        defaultValue={paramsSearch.get('endDate')}
                                    ></input>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label className="condition-label">任務類型</label>
                            <select className="management-select" onBlur={e => {
                                setMainTypeId(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                {bookMark.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">狀態</label>
                            <select className="management-select" onBlur={e => {
                                setPointStatus(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                {statusDrop.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>)}
                            </select>
                        </div>

                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label className="condition-label">任務項目</label>
                            <select className="management-select" onBlur={e => {
                                setRoleId(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                {roleDrop.map((data, index) =>
                                    <option value={data.id}>{data.Value}</option>
                                )}
                            </select>
                        </div>

                        <button onClick={submit} className="condition-submit-btn">查詢</button>
                    </div>
                    {/* 查詢區域end */}
                    {/* 查詢結果start */}
                    <div className="member-table-outter-wrapper">
                        <table className="review-card rwd-table">
                            <thead className="text-content-wrapper">
                                <tr>
                                    <th>日期</th>
                                    <th>任務類型</th>
                                    <th>任務項目</th>
                                    <th>狀態</th>
                                    <th>綠積分數</th>
                                    <th className="align-center">已領取</th>
                                </tr>
                            </thead>
                            <tbody className="card-content">
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                    {/* 查詢結果end */}
                </div>

            </div>
            {/* 頁碼 */}
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
    );
}

export default withRouter(Management);