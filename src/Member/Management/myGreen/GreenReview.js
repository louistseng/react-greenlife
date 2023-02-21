import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDateTime } from '../../../utils/Functions';
import ComfirmAlert from '../../../Components/ComfirmAlert';
import '../../office/Review.scss';
import '../../office/evaluation.scss';
import '../../../Knowledge.scss';

import JoditEditor from "jodit-react";

import { clickRecord } from '../../../utils/API';
import { useCookies } from "react-cookie";

function BlogReview(props) {

    let history = useHistory()
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2Mjk5Njk5OTgsIm5iZiI6MTYyOTk2ODE5OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.NClXfKIwgKOf8u3I0izEFBK-1OAWWrqWo8XXj_auC8LSBE8eBGYjW6U5b5nyHVNphRta9hYqZAoHWyJniOidEg";

    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
    const [fetchData, setFetchData] = useState([]);
    const [video, setVideo] = useState("")
    const [driveVideo, setDriveVideo] = useState("")
    const [faceBookVideo, setFaceBookVideo] = useState("")

    const [verifyDesc, setVerifyDesc] = useState("");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //文字編輯器config
    const config = {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        inline: true,
    }

    const editor = useRef(null)

    //點閱計數API
    useEffect(() => {
        clickRecord("CD545D5E-CDCB-4F44-8C4C-9C7E273E6743", "19", collector)
    }, [collector]);

    //用URL抓GUID
    const setLink = () => {
        setBlogGuid(history.location.search.slice(1))
    }


    //送出審核按鈕
    const [isVerifyPass, setIsVerifyPass] = useState(false);
    const submit = async () => {
        setShowDialog(true)
        setAlertTitle("處理中~")
        document.getElementById('reviewSubmitBtn').style.pointerEvents = 'none';

        fetch(`${props.SSL}//${props.domain}/api/api/Manager/MyGreen/Edit`, {
            method: 'POST',
            body: serialize({
                Guid: blogGuid,
                IsVerify: String(isVerifyPass),
                VerifyDesc: encodeURIComponent(verifyDesc) || ""
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
                    history.push('/member/myGreen_management');
                }
            });
    }

    //單一我的綠內容
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            fetch(`${props.SSL}//${props.domain}/api/api/MyGreen/Content`, {
                method: 'POST',
                body: serialize({
                    Guid: blogGuid
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log(result)
                    if (result.isSucess) {
                        setFetchData(result.resultObject)
                        if (result.resultObject.videoPath) {
                            if (result.resultObject.videoPath.includes('drive.google')) {
                                setDriveVideo(result.resultObject.videoPath.split('/')[5])
                            }
                            setVideo(result.resultObject.videoPath.includes('watch?v=') ? result.resultObject.videoPath.split('=')[1].split('&')[0] : result.resultObject.videoPath.substring(result.resultObject.videoPath.lastIndexOf('/') + 1))
                            if (result.resultObject.videoPath.includes("facebook")) {
                                setFaceBookVideo(result.resultObject.videoPath.split('v=')[1])
                            }
                        }
                    }
                })
    }, [blogGuid]);

    //會員專區-管理者專區-秀出我的綠管理-檢視
    const [boardData, setBoardData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            console.log(blogGuid)
        fetch(`${props.SSL}//${props.domain}/api/api/Manager/MyGreen/View`, {
            method: 'POST',
            body: serialize({
                Guid: blogGuid
            }),
            headers: myHeaders
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result)
            if (result.isSucess) {
                setBoardData(result.resultObject)
            }
        })
    }, [blogGuid]);


    const verifyCheck = () => {
        var element = document.getElementsByName('passRadio');
        for (var i = 0; i < element.length; i++) {
            if (element[i].checked)
                if (element[i].value === "true") {
                    setIsVerifyPass(true)
                } else if (element[i].value === "false") {
                    setIsVerifyPass(false)
                }

        }
    }

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
                            <input onClick={verifyCheck} defaultChecked={boardData.isVerify} type="radio" id="r1" name="passRadio" value="true" />
                            <label for="r1">通過</label>
                            <input onClick={verifyCheck} key={boardData.isVerify === false} defaultChecked={boardData.isVerify === false} type="radio" id="r2" name="passRadio" value="false" />
                            <label for="r2">不通過</label>
                        </div>
                        <div className="d-flex">
                            <label for="note">備註與說明：</label>
                            <div>
                                <input onBlur={(e) => setVerifyDesc(e.target.value)} className="note-input" type="text" name="note" id="note" />
                                <p>{boardData.verifyDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="review-sumbit-btn">
                    <button id="reviewSubmitBtn" onClick={submit} className="send-btn">確認送出</button>
                    <button onClick={() => history.goBack()} className="cancel-btn">取消</button>
                </div>



                <div className="section">

                    <div className="knPage-main-content kn-Border col-12 col-lg-9">
                        <div className="res-inner-content">
                            <div className="mb-3">
                                <div className="d-flex row content-wrapper">
                                    <div className="kn-top-content">
                                        <div className="title-wrapper">
                                            <div>
                                                <h6 className="title-tag" style={{ background: fetchData.color }}>{fetchData.typeName}</h6>
                                            </div>
                                            <div className="d-flex justify-content-between kn-page-title">
                                                <h6>{fetchData.title}</h6>
                                            </div>
                                        </div>
                                        <div className="kn-creator-btn-wrapper">
                                            <div className="col-md-10 col-lg-7 creator-wrapper">
                                                <div className="d-flex">
                                                    <img className="avatar-img" style={{ width: "40px", height: "50px" }} src={fetchData.picture || "../../images/knowledge/avatar.png"} alt="作者頭貼" title="作者頭貼" />
                                                    <p className="kn-creator">{fetchData.nickName}</p>
                                                </div>
                                                <p className="">&emsp;發表於{formatDateTime(fetchData.createDateTime)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="kn-bottom-content" >
                                        <hr />

                                        {
                                            fetchData.picHref ?
                                                fetchData.picHref.length > 20 ?
                                                    <img className="img-wrapper reveiwContent-img" src={fetchData.picHref} alt={fetchData.title} title={fetchData.title} />
                                                    :
                                                    ""
                                                :
                                                fetchData.videoPath ?
                                                    fetchData.videoPath.includes("drive.google") ?
                                                        <iframe className="video-wrapper" src={`https://drive.google.com/file/d/${driveVideo}/preview`} title={fetchData.title}></iframe>
                                                        :
                                                        fetchData.videoPath.includes("facebook") ?
                                                            /* <iframe className="video-wrapper" src={fetchData.videoPath}></iframe> */
                                                            <iframe className="video-wrapper" src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${faceBookVideo}`} title={fetchData.title}></iframe>
                                                            :
                                                            <iframe className="video-wrapper" src={`https://www.youtube.com/embed/${video}`} title={fetchData.title}></iframe>
                                                    :
                                                    ""
                                        }
                                        {/* <h6 className="inner-article-detail">{fetchData.content}</h6> */}

                                        <JoditEditor
                                            ref={editor}
                                            value={fetchData.content}
                                            config={config}
                                        />

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>



            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(BlogReview);