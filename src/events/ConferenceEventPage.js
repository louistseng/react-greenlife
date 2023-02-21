import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import './events.scss';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));

function ConferenceEventPage(props) {
    const { SSL, domain } = props;

    let myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
    });

    let history = useHistory()


    const params = new URLSearchParams(history.location.search);
    const searchGuid = params.get('guid')

    const [fetchBaseData, setFetchBaseData] = useState([])
    const [fetchDetailData1, setFetchDetailData1] = useState([])
    const [fetchDetailData2, setFetchDetailData2] = useState([])
    const [fetchFileData, setFetchFileData] = useState([])


    useEffect(() => {

        fetch(`${SSL}//${domain}/api/api/Meeting/Single?mGuid=${searchGuid}`, {
            method: 'POST',
            headers: myHeaders,
        })
            .then(response => response.json())
            .then(result => {
                const objResult = result.resultObject.resultObject;
                setFetchBaseData(Object.values(objResult)[1])
                setFetchDetailData1(Object.values(objResult)[2][0].mType === 1 ? Object.values(objResult)[2][0] : null)
                setFetchDetailData2(Object.values(objResult)[2][1] || (Object.values(objResult)[2][0].mType === 2 && Object.values(objResult)[2][0]))
                setFetchFileData(Object.values(objResult)[3])

                console.log(Object.values(objResult))
            })
            .catch(error => console.log('error', error));
    }, [SSL, domain, myHeaders, searchGuid])

    return (
        <>
            <BreadCrumb currentPage={"淨零綠生活社會溝通"} />
            <div className="event-page container">
                <div className="col-12 row m-0 meeting-banner">
                    <img src={fetchFileData.filter(d => d.fType === 0)[0]?.url} alt="" className="col-12" width="100%" height="480px" />
                </div>
                <h1>{fetchBaseData.meetingName}</h1>
                <hr className="title-bottom-line col-1" />
                <p className="meeting-desc">{fetchBaseData.meetingInfo}</p>
                <div className="detail-list col-12 row">
                    <div className="col-6 mb-5">
                        <h2>會議時間</h2>
                        <hr />
                        <div>
                            <h4>{fetchBaseData.meetingStart} ~ {fetchBaseData.meetingEnd}</h4>
                        </div>
                    </div>
                    <div className="col-6 mb-5">
                        <h2>主辦單位</h2>
                        <hr />
                        <div className="d-flex">
                            <h4>{fetchBaseData.organizer}</h4>
                        </div>
                    </div>

                    <div className="col-12">
                        <h2>會議資訊</h2>
                        <hr />
                        <div className="info col-12 row d-flex justify-content-around">
                            <div className="info-card col-sm-12 col-md-5 col-lg-5">
                                <h3 style={{ color: fetchDetailData1?.detail1 ? "#6cb15e" : "#a5a4a4" }}>實體會議</h3>
                                <div>
                                    <span className="info-label">活動地點</span><span>{fetchDetailData1?.detail1 || "無"}</span>
                                </div>
                                <div>
                                    <span className="info-label">活動地址</span><span>{fetchDetailData1?.detail2 || "無"}</span>
                                </div>
                                <div>
                                    <span className="info-label">交通方式</span><span>{fetchDetailData1?.detail3 || "無"}</span>
                                </div>
                                <div className="d-flex justify-content-center link-btn-group">
                                    <a href={fetchDetailData1 ? fetchDetailData1?.detail7 : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={fetchBaseData.meetingName}
                                        className="link-btn"
                                        style={{ backgroundColor: fetchDetailData1?.detail1 ? "#6cb15e" : "#a5a4a4" }}>
                                        {fetchDetailData1 ? "點擊報名實體會議" : "無開放實體會議"}</a>
                                </div>
                            </div>
                            <div className="info-card col-sm-12 col-md-5 col-lg-5">
                                <h3 style={{ color: fetchDetailData2?.detail9 ? "#6cb15e" : "#a5a4a4" }}>線上會議</h3>
                                {fetchDetailData2 !== [] ?
                                    <>
                                        <div>
                                            <span>{fetchDetailData2?.detail1}</span>
                                        </div>
                                    </>
                                    : "無線上會議資訊"
                                }
                                <br />
                                <div>
                                    <span className="info-label">會議限制</span>
                                    <span>{fetchDetailData2?.detail9 ? "不限身份報名" : "無"}</span>
                                </div>
                                <div>
                                    <span className="info-label">報名限制</span>
                                    <span>{fetchDetailData2?.detail9 ? "不限身份報名" : "無"}</span>
                                </div>
                                <div className="d-flex justify-content-center link-btn-group">
                                    <a href={fetchDetailData2 ? fetchDetailData2?.detail7 : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={fetchBaseData.meetingName}
                                        className="link-btn"
                                        style={{ backgroundColor: fetchDetailData2?.detail9 ? "#6cb15e" : "#a5a4a4" }}>
                                        {fetchDetailData2?.detail6 ? fetchDetailData2?.detail6 : "無開放線上會議"}</a>
                                    <a href={fetchDetailData2 ? fetchDetailData2?.detail10 : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={fetchBaseData.meetingName}
                                        className="link-btn"
                                        style={{ backgroundColor: fetchDetailData2?.detail9 ? "#6cb15e" : "#a5a4a4" }}>
                                        {fetchDetailData2?.detail9 ? fetchDetailData2?.detail9 : "無開放線上觀看"}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 info-fileDownload">
                        <h2>會議資料</h2>
                        <hr />
                        <p>歡迎點擊下載會議資料</p>
                        <div className="col-12 row d-flex justify-content-between m-0">
                            {fetchFileData.map((d, i) =>
                                d.fType !== 0 &&
                                <a key={i} href={d.url} download={d.name} title={d.name} className="col-3 fileDownload"
                                    style={{
                                        backgroundColor: ((d.fCase === 0 || d.fCase === 2) && "#ddd") || ((d.fCase === 1) && "#6cb15e"),
                                        color: ((d.fCase === 0 || d.fCase === 2) && "black") || ((d.fCase === 1) && "#fff")
                                    }}>
                                    <p>{d.name}</p>
                                    {d.fCase === 0 && <span>本會議無{d.name}</span>}
                                    {d.fCase === 1 && <span>(點我下載PDF)</span>}
                                    {d.fCase === 2 && <span>待提供{d.name}</span>}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="col-12 info-contact">
                        <h2>聯絡資訊</h2>
                        <hr />
                        <div><span className="container">聯絡窗口</span>{fetchBaseData.container}</div>
                        <div><span className="container">聯絡電話</span>{fetchBaseData.containTel}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default withRouter(ConferenceEventPage);