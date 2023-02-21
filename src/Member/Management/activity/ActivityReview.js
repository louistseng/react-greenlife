import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDate } from '../../../utils/Functions';
import ComfirmAlert from '../../../Components/ComfirmAlert';
import { Card } from 'react-bootstrap';
import '../../office/Review.scss';
import '../../office/evaluation.scss';
import '../../../eventDetail.scss';
import JoditEditor from "jodit-react";
import { readOnlyConfig } from '../../../utils/JoditConfig';
import { clickRecord } from '../../../utils/API';
import { useCookies } from "react-cookie";

function ActivityReview(props) {

    let history = useHistory()
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjczNjc4NzEsIm5iZiI6MTYyNzM2NjA3MSwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.0rA7yTaIB6xiWW2hs2f-FqA2S1FZBpe7VU0A9ekpbSQ_3kSqJGREa-m5gT6qxoWwqK93TVAI0EE2C8oNW5leiA";

    const [activityGuid, setActivityGuid] = useState(history.location.search.slice(1));
    const [fetchData, setFetchData] = useState([]);

    const [verifyDesc, setVerifyDesc] = useState("");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });


    const editor = useRef(null)

    //點閱計數API
    useEffect(() => {
        clickRecord("52A85065-C999-42C5-A505-3044F896EB4F", "19", collector)
    }, [collector]);

    //用URL抓GUID
    const setLink = () => {
        setActivityGuid(history.location.search.slice(1))
    }


    //送出審核按鈕
    const [isVerifyPass, setIsVerifyPass] = useState();
    const [activityTypeId, setActivityTypeId] = useState();

    const submit = async () => {
        setShowDialog(true)
        setAlertTitle("處理中~")
        document.getElementById('reviewSubmitBtn').style.pointerEvents = 'none';

        fetch(`${props.SSL}//${props.domain}/api/api/Manager/Activity/Edit`, {
            method: 'POST',
            body: serialize({
                Guid: activityGuid,
                IsVerify: isVerifyPass !== undefined ? String(isVerifyPass) : String(boardData.isVerify),
                VerifyDesc: encodeURIComponent(verifyDesc) || "",
                ActivityTypeId: activityTypeId,
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
                if (result.isSucess) {
                    setShowDialog(true)
                    setAlertTitle('成功提交審核')
                    history.push('/member/activity_management');
                }
            });
    }



    const [boardData, setBoardData] = useState([]);
    const [activityList, setActivityList] = useState([])
    useEffect(() => {
        //單一網誌內容
        window.scrollTo(0, 0)
        if (activityGuid) {
            fetch(`${props.SSL}//${props.domain}/api/api/Activity/GetSingle`, {
                method: 'POST',
                body: serialize({
                    Guid: activityGuid
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setFetchData(result.resultObject[0])
                    setActivityTypeId(result.resultObject[0].typeId)
                }
            })

            //會員專區-管理者專區-活動管理-檢視
            fetch(`${props.SSL}//${props.domain}/api/api/Manager/Activity/View`, {
                method: 'POST',
                body: serialize({
                    Guid: activityGuid
                }),
                headers: myHeaders
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setBoardData(result.resultObject)
                    setIsVerifyPass(result.resultObject.IsVerify)
                }
            })
        }

        //活動/熱門下拉
        fetch(`${props.SSL}//${props.domain}/api/api/Activity/Type/List`)
            .then(res => {
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            }).then(result => {
                if (result.isSucess) {
                    // console.log(result.resultObject)
                    const activity4 = { typeName: '一縣市一活動', typeId: 4 }
                    setActivityList(result.resultObject.concat(activity4).filter(d => d.typeId !== 1))
                }
            });
    }, [activityGuid]);

    console.log("isVerifyPass", boardData)

    // const filteredArray = energyCheckboxes.filter((checkbox) =>
    //     checkbox.name === "i1_1_1".toUpperCase()
    // )
    // console.log(filteredArray)

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle={" "} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"檢視"} />
            <div className="container office_evaluation_review member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-12 col-lg-8 office_evaluation_review">
                <div className="section review-result">
                    <h4 className="review-section-title">審查結果</h4>
                    <div className="member-table-outter-wrapper">

                        <div className="d-flex">
                            <input onClick={() => setIsVerifyPass(true)} defaultChecked={boardData.isVerify} type="radio" id="r1" name="passRadio" value="true" />
                            <label for="isPassRadio">通過</label>
                            <input onClick={() => setIsVerifyPass(false)} key={boardData.isVerify === false} defaultChecked={boardData.isVerify === false} type="radio" id="r2" name="passRadio" value="false" />
                            <label for="passRadio">不通過</label>
                        </div>
                        <div className="d-flex">
                            {activityList.map(d => {
                                const { typeName, typeId } = d;
                                return (
                                    <>
                                        <input key={d.typeId} onClick={(e) => setActivityTypeId(e.target.value)} defaultChecked={activityTypeId === typeId} type="radio" id="a1" name="activityRadio" value={typeId} />
                                        <label for="activityRadio">{typeName}</label>
                                    </>
                                )
                            })}
                        </div>
                        <div className="d-flex">
                            <label for="note">備註與說明：</label>
                            <div>
                                <input onBlur={(e) => setVerifyDesc(e.target.value)} className="note-input" type="text" name="note" id="note" />
                                <p>{boardData?.verifyDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="review-sumbit-btn">
                    <button id="reviewSubmitBtn" onClick={submit} className="send-btn">確認送出</button>
                    <button onClick={() => history.goBack()} className="cancel-btn">取消</button>
                </div>



                <Card className="section p-4">
                    <div className="top-card">
                        <h1 className="main-title">{fetchData.title}</h1>
                        <div className="d-flex">
                            <span className="d-flex hashtag">
                                <div className="kn-tag-name">
                                    {fetchData.themes?.map((data, index) =>
                                        <>
                                            <h6 key={index}>#{data.themeName}</h6>
                                        </>
                                    )}
                                </div>
                            </span>

                        </div>
                    </div>
                    <hr />
                    <ul >
                        <li className="detail-list"><span className="ul-title">活動日期</span><span>{formatDate(fetchData.startDatetime)} ~ {fetchData.endDatetime ? formatDate(fetchData.endDatetime) : ""}</span></li>
                        <li className="detail-list"><span className="ul-title">主辦單位</span><span>{fetchData.organizer}</span></li>
                        <li className="detail-list"><span className="ul-title">活動地點</span><span>{fetchData.cityName}</span></li>
                        <li className="detail-list"><span className="ul-title">聯絡資訊</span><span>{fetchData.organizerInfo}</span></li>
                        <li className="detail-list">
                            <span className="ul-title">相關連結</span>
                            {fetchData.EventLink || fetchData.href ?
                                <a target="_blank" rel="noopener noreferrer" href={fetchData.href} title="活動鏈結">活動網址</a>
                                :
                                <span>暫無相關資訊</span>
                            }
                        </li>

                    </ul>
                    <div className="content-img-wrapper">
                        <div className="single-img-wrapper"><img style={{ position: "relative" }} className="content-img reveiwContent-img" alt={fetchData.title} title={fetchData.title} src={fetchData.picPath} /></div>
                    </div>

                    <div className="inner-article-detail mt-5">
                        <JoditEditor
                            ref={editor}
                            value={fetchData.introduction}
                            config={readOnlyConfig}
                        // tabIndex={1} // tabIndex of textarea  
                        // onChange={e => setTextContent(e)}
                        />
                    </div>
                </Card>



            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(ActivityReview);