import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import ReactPaginate from 'react-paginate';
import { clickLogout, formatDate } from '../../../utils/Functions';
import '../../office/Review.scss';
import { clickRecord } from '../../../utils/API';


function GreenProcess(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    // const [collector, setCollector] = useState(cookies.get('userGuid'));
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = window.location.hostname.length > 10 ? greenlifeCookies.refreshToken : "";
    const [authGuid, setAuthGuid] = useState(history.location.search.slice(1));

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //用URL抓GUID
    const setLink = () => {
        setAuthGuid(history.location.search.slice(1))
    }

    //點閱計數API
    useEffect(() => {
        clickRecord("D7E97EC4-F239-4D0A-80F3-CEB2CF745616", "19", collector)
    }, [collector]);


    //會員專區-管理者專區-綠色辦公響應管理>歷程

    const [applyRecords, setApplyRecords] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        setLink()
        fetch(`${SSL}//${domain}/api/api/Manager/MyGreen/Record`, {
            method: 'POST',
            body: serialize({
                Guid: authGuid,
                Page: String(page),
                Count: String(count)
            }),
            headers: myHeaders
        })
            .then(res => {
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setPageCount(result.resultObject.pageCount)
                    setApplyRecords(result.resultObject.records)
                }
            });
    }, [SSL, domain, serialize, collector]);



    const processTableData = (
        applyRecords.map((data, index) => {
            const { createTime, desc, status, statusUser } = data
            return (
                <tr key={index}>
                    <td data-title="狀態" className="list-date">{status}</td>
                    <td data-title="建立者" className="download-time">{statusUser}</td>
                    <td data-title="建立日期">{formatDate(createTime)}</td>
                    <td data-title="備註與說明">{desc === "null" ? "" : desc}</td>
                </tr>
            )
        })
    )

    //換頁
    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    return (
        <>
            {/* 
            <BreadCrumb currentPage={"歷程"} />
            <div className="container office_evaluation_process member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-12 col-lg-8">
                <h3 className="green-title">秀出我的綠文章審核<i class="fas fa-chevron-circle-right" aria-hidden="true"></i>歷程</h3>

                <div className="section">
                    <h4 className="review-section-title">申請歷程</h4>
                    <div className="member-table-outter-wrapper">
                        <table className="review-card rwd-table">
                            <thead className="text-content-wrapper">
                                <tr>
                                    <th>狀態</th>
                                    <th>建立者</th>
                                    <th>建立日期</th>
                                    <th>備註與說明</th>
                                </tr>
                            </thead>
                            <tbody className="card-content">
                                {processTableData}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ReactPaginate
                    forcePage={page - 1}
                    style={{ visibility: 'visible' }}
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

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(GreenProcess);