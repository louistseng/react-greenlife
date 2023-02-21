import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import ReactPaginate from 'react-paginate';
import { clickLogout, formatDate } from '../../../utils/Functions';
import '../../office/Review.scss';
import { clickRecord } from '../../../utils/API';


function GroupTourProcess(props) {

    let history = useHistory()
    let SSL = props.SSL;
    let hostname = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    //url get 團體旅遊申請編號
    const params = new URLSearchParams(history.location.search);
    const p = params.get('p');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    // const [authGuid, setAuthGuid] = useState(history.location.search.slice(1));

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 30;

    //用URL抓GUID
    // const setLink = () => {
    //     setAuthGuid(history.location.search.slice(1))
    // }

    //點閱計數API
    useEffect(() => {
        clickRecord("E3FF770C-0B2E-44E8-B4EF-BB21B7107E22", "19", collector)
    }, [collector]);


    //會員專區-管理者專區-團體行程管理>歷程

    const [applyRecords, setApplyRecords] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        // setLink()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("p", p);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${SSL}//${hostname}/APIs/TravelGroupApplyRecord/${page}`, requestOptions)
            .then(res => {
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            })
            .then(result => {
                // console.log(result)
                setApplyRecords(result.Detail)
                setPageCount(result.PageIndex)
            })
            .catch(error => console.log('error', error));
    }, [SSL, hostname, collector]);


    const processTableData = (
        applyRecords.map((data, index) => {
            const { KeyinDate, ProjNo, States, KeyinUser } = data
            return (
                <tr key={index}>
                    <td data-title="狀態" className="list-date">{States}</td>
                    <td data-title="建立者" className="download-time">{KeyinUser}</td>
                    <td data-title="建立日期">{formatDate(KeyinDate)}</td>
                    <td data-title="申請編號">{ProjNo}</td>
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
            <div className="col-12 col-lg-8">
                <h3 className="green-title">團體行程審核<i class="fas fa-chevron-circle-right" aria-hidden="true"></i>歷程</h3>
                <div className="section">
                    <h4 className="review-section-title">申請歷程</h4>
                    <div className="member-table-outter-wrapper">
                        <table className="review-card rwd-table">
                            <thead className="text-content-wrapper">
                                <tr>
                                    <th>狀態</th>
                                    <th>建立者</th>
                                    <th>建立日期</th>
                                    <th>申請編號</th>
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

export default withRouter(GroupTourProcess);