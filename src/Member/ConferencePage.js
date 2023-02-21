import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import "../DailyGreen/Article.scss";
import '../eventDetail.scss';
import { formatDate } from '../utils/Functions';
import JoditEditor from "jodit-react";
import { readOnlyConfig } from '../utils/JoditConfig';
import { clickRecord } from '../../src/utils/API';

// import logoutIcon from "../images1/login/signUp-normal.png"

function ConferencePage(props) {

    const { SSL, domain } = props;

    const editor = useRef()

    let history = useHistory()

    const blogGuid = history.location.search.slice(1);

    const collector = sessionStorage.getItem("userGuid") || "";

    const [fetchBaseData, setFetchBaseData] = useState([])
    const [fetchDetailData1, setFetchDetailData1] = useState([])
    const [fetchDetailData2, setFetchDetailData2] = useState([])
    const [fetchFileData, setFetchFileData] = useState([])


    useEffect(() => {
        //點閱計數API
        clickRecord(blogGuid, "26-1", collector)

        fetch(`${SSL}//${domain}/api/api/Meeting/Single?mGuid=${blogGuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(result => {
                const objResult = result.resultObject.resultObject;
                setFetchBaseData(Object.values(objResult)[1])
                setFetchDetailData1(Object.values(objResult)[2][0])
                setFetchDetailData2(Object.values(objResult)[2][1] || (Object.values(objResult)[2][0].mType == 2 && Object.values(objResult)[2][0]))
                setFetchFileData(Object.values(objResult)[3])

                // console.log(Object.values(objResult))

            })
            .catch(error => console.log('error', error));
    }, [])



    return (
        <>
            <div className="col-12 col-lg-8 main-card-wapper">
                <div className="top-card">
                    <h1 className="main-title">{fetchBaseData.meetingName}</h1>
                </div>
                <hr />
                <ul >
                    <li className="detail-list"><span className="ul-title">活動日期</span><span>{formatDate(fetchBaseData.meetingStart)} ~ {fetchBaseData.meetingEnd}</span></li>
                    <li className="detail-list"><span className="ul-title">主辦單位</span><span>{fetchBaseData.organizer}</span></li>
                    <li className="detail-list"><span className="ul-title">聯絡人</span><span>{fetchBaseData.container}</span></li>
                    <li className="detail-list"><span className="ul-title">聯絡電話</span><span>{fetchBaseData.containTel}</span></li>
                    <li className="detail-list"><span className="ul-title">實體/線上</span><span>{fetchDetailData1 && "實體會議"}/{fetchDetailData2 && "線上會議"}</span></li>
                    <li className="detail-list"><span className="ul-title">活動地點</span><span>{fetchDetailData1.detail1}</span></li>
                    {fetchDetailData2?.detail7 &&
                        <li className="detail-list">
                            <span className="ul-title">實體報名連結</span>
                            <a target="_blank" rel="noopener noreferrer" href={fetchDetailData1.detail7} title={`${fetchDetailData1.detail6}報名連結(在新視窗開啟鏈結)`}>{fetchDetailData1.detail6}</a>
                        </li>
                    }
                    {fetchDetailData2?.detail1 &&
                        <li className="detail-list">
                            <span className="ul-title">說明文字</span><span>{fetchDetailData2?.detail1}</span>
                        </li>
                    }
                    {fetchDetailData2?.detail7 &&
                        <li className="detail-list">
                            <span className="ul-title">線上報名連結</span>
                            <a target="_blank" rel="noopener noreferrer" href={fetchDetailData2.detail7} title={`${fetchDetailData2.detail6}報名連結(在新視窗開啟鏈結)`}>{fetchDetailData2.detail6}</a>
                        </li>
                    }
                    {fetchDetailData2?.detail10 &&
                        <li className="detail-list">
                            <span className="ul-title">觀看連結</span>
                            <a target="_blank" rel="noopener noreferrer" href={fetchDetailData2.detail10} title={`${fetchDetailData2.detail9}觀看連結(在新視窗開啟鏈結)`}>{fetchDetailData2.detail9}</a>
                        </li>
                    }

                </ul>
                <div className="content-img-wrapper">
                    <div className="single-img-wrapper">
                        <img style={{ position: "relative" }} className="content-img" alt={fetchFileData[0]?.name ? fetchFileData[0]?.name : "content-img"} src={fetchFileData[0]?.url} />
                    </div>
                </div>

                <div className="inner-article-detail mt-5">
                    <JoditEditor
                        ref={editor}
                        value={fetchBaseData.meetingInfo}
                        config={readOnlyConfig}
                    // tabIndex={1} // tabIndex of textarea  
                    // onChange={e => setTextContent(e)}
                    />
                </div>


            </div>
        </>
    );
}

export default withRouter(ConferencePage);