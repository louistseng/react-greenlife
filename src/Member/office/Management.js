import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickLogout } from '../../utils/Functions';
import ReactPaginate from 'react-paginate';
import './Review.scss';
import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";
import Loader from '../../Components/Loader';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));
const InfoSideMenu = React.lazy(() => import('../InfoSideMenu'));

function Management(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    // const [collector, setCollector] = useState(cookies.get('userGuid'));
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const [count, setCount] = useState(30);

    const [cityId, setCityId] = useState("");
    const [unitFullName, setUnitFullName] = useState("");
    const [participateStatus, setParticipateStatus] = useState("");
    const [unitCode, setUnitCode] = useState("");
    const [isScoring, setIsScoring] = useState("");


    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "UserGuid": collector,
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("EC378E95-EB0B-4BA0-821A-70117DA1D937", "19", collector)
    }, []);

    //會員專區-管理者專區-綠色辦公審核
    useEffect(() => {
        submit()

    }, [page]);

    const submit = () => {
        setLoading(true)

        fetch(`${SSL}//${domain}/api/api/Manager/Participate/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                CityId: cityId,
                UnitFullName: unitFullName,
                ParticipateStatus: participateStatus,
                UnitCode: unitCode,
                IsScoring: isScoring
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

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    const tableData = (
        fetchData.map((data, index) => {
            const { creatorGuid, identityTypeName, cityName, name, scoring, status } = data
            return (
                <tr key={index}>
                    <td data-title="審查狀態" className="list-date">{status}</td>
                    <td data-title="評核計分" className="download-time">{scoring}</td>
                    <td data-title="單位性質">{identityTypeName}</td>
                    <td data-title="縣市別">{cityName}</td>
                    <td data-title="單位名稱">{name}</td>
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
    }, [])

    return (
        <>

            <BreadCrumb currentPage={"綠色辦公響應管理"} />

            <div className="container member-info-wrapper shareBlog row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} />

                <div className="col-12 col-lg-8">
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
                            <label for="unitFullName" className="condition-label">單位名稱</label>
                            <input type="text" name="unitFullName" id="unitFullName" onChange={e => setUnitFullName(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="unitCode" className="condition-label">統一編號</label>
                            <input type="text" name="unitCode" id="unitCode" onChange={e => setUnitCode(e.target.value)}
                                onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="participateStatus" className="condition-label">審查狀態</label>
                            <select className="management-select" id="ParticipateStatus" onBlur={e => setParticipateStatus(e.target.value)}>
                                <option value="">請選擇</option>
                                <option value="1">待審核</option>
                                <option value="2">前台上架</option>
                                <option value="3">退件</option>
                                <option value="7">過期</option>
                            </select>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                            <label for="isScoring" className="condition-label">評核計分</label>
                            <select className="management-select" id="isScoring" onBlur={e => {
                                setIsScoring(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                <option value={true}>計分</option>
                                <option value={false}>不計分</option>
                            </select>
                        </div>

                        <button onClick={submit} className="condition-submit-btn">查詢</button>
                    </div>

                    <div className="management-result-count">查詢結果：共 {totalCount} 家</div>

                    <div className="member-table-outter-wrapper">
                        <table className="review-card rwd-table">
                            <thead className="text-content-wrapper">
                                <tr>
                                    <th>審查狀態</th>
                                    <th>評核計分</th>
                                    <th>單位性質</th>
                                    <th>縣市別</th>
                                    <th>單位名稱</th>
                                    <th>詳細資料</th>
                                </tr>
                            </thead>
                            <tbody className="card-content">
                                {loading
                                    ?
                                    <Loader loading={loading} />
                                    :
                                    fetchData.length === 0
                                        ?
                                        <p>查無搜尋結果</p>
                                        :
                                        tableData
                                }
                            </tbody>

                        </table>

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