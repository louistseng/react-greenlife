import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { clickLogout, formatDate } from '../../../utils/Functions';
import '../../office/Review.scss';
import { clickRecord } from '../../../utils/API';


function Process(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    // const [collector, setCollector] = useState(cookies.get('userGuid'));
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = window.location.hostname.length > 10 ? greenlifeCookies.refreshToken : "";
    const [authGuid, setAuthGuid] = useState(history.location.search.slice(1));

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
        clickRecord("BBC400BC-C8DA-4746-B037-511463F8638D", "19", collector)
    }, [collector]);


    //會員專區-管理者專區-綠色辦公響應管理>歷程

    const [nowStatus, setNowStatus] = useState([]);
    const [participateTime, setParticipateTime] = useState([]);
    const [applyRecords, setApplyRecords] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        setLink()
        fetch(`${SSL}//${domain}/api/api/Manager/Participate/History`, {
            method: 'POST',
            body: serialize({
                Guid: authGuid
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
                    setNowStatus(result.resultObject.nowStatus)
                    setParticipateTime(result.resultObject.participateCalendar)
                    setApplyRecords(result.resultObject.records)
                }
            });
    }, [SSL, domain, serialize, collector]);


    const currentTableData = (

        <tr>
            <td data-title="審查狀態" className="list-date">{nowStatus.status}</td>
            <td data-title="評核計分" className="download-time">{nowStatus.isScoring}</td>
            <td data-title="單位性質">{nowStatus.identityTypeName}</td>
            <td data-title="縣市別">{nowStatus.cityName}</td>
            <td data-title="單位名稱">{nowStatus.name}</td>
        </tr>

    )

    const statusTableData = (
        <tr>
            <td data-title="生效日" className="list-date">{participateTime.verifyTime ? formatDate(participateTime.verifyTime) : "-"}</td>
            <td data-title="展延通知日" className="download-time">{participateTime.noticeTime ? formatDate?.(participateTime.noticeTime) : "-"}</td>
            <td data-title="到期日">{participateTime.endVerifyTime ? formatDate(participateTime.endVerifyTime) : "-"}</td>
        </tr>
    )

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



    return (
        <>
{/* 
            <BreadCrumb currentPage={"歷程"} />
            <div className="container office_evaluation_process member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

                <div className="col-12 col-lg-8">
                    <h3 className="green-title">綠色辦公審核</h3>
                    <div className="section">
                        <h4 className="review-section-title">目前狀態</h4>
                        <div className="member-table-outter-wrapper">
                            <table className="review-card rwd-table">
                                <thead className="text-content-wrapper">
                                    <tr>
                                        <th>審查狀態</th>
                                        <th>評核計分</th>
                                        <th>單位性質</th>
                                        <th>縣市別</th>
                                        <th>單位名稱</th>
                                    </tr>
                                </thead>
                                <tbody className="card-content">
                                    {currentTableData}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="section">
                        <h4 className="review-section-title">響應狀態</h4>
                        <div className="member-table-outter-wrapper">
                            <table className="review-card rwd-table">
                                <thead className="text-content-wrapper">
                                    <tr>
                                        <th>生效日</th>
                                        <th>展延通知日</th>
                                        <th>到期日</th>
                                    </tr>
                                </thead>
                                <tbody className="card-content">
                                    {statusTableData}
                                </tbody>
                            </table>
                        </div>
                    </div>
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

                </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(Process);