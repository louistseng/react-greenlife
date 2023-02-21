import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDateTime, getTypeBgColor } from '../../../utils/Functions';
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
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjY0OTUxODgsIm5iZiI6MTYyNjQ5MzM4OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.Mw5jgL0UZi1BFhe0d6kOIFX9J0o7u8yWSRZ5M8LA8n6frzZ1bM3QtFsAJXKCcEJWw-2YCS8bBdGLql6XcbEa5Q";

    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
    const [fetchData, setFetchData] = useState([]);

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
        clickRecord("6C8BBF21-339E-4B49-8DB3-EC562D2011A0", "19", collector)
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

        fetch(`${props.SSL}//${props.domain}/api/api/Manager/Blog/Edit`, {
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
                    history.push('/member/blog_management');
                }
            });
    }




    //單一網誌內容
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            fetch(`${props.SSL}//${props.domain}/api/api/Blog/${blogGuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setFetchData(result.resultObject)
                }
            })
    }, [blogGuid]);

    //會員專區-管理者專區-網誌管理-檢視
    const [boardData, setBoardData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            console.log(blogGuid)
        fetch(`${props.SSL}//${props.domain}/api/api/Manager/Blog/View`, {
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
                            <input onClick={verifyCheck} defaultChecked={boardData?.isVerify} type="radio" id="r1" name="passRadio" value="true" />
                            <label for="r1">通過</label>
                            <input onClick={verifyCheck} key={boardData.isVerify === false} defaultChecked={boardData.isVerify === false} type="radio" id="r2" name="passRadio" value="false" />
                            <label for="r2">不通過</label>
                        </div>
                        <div className="d-flex">
                            <label for="note">備註與說明：</label>
                            <div>
                                <input onBlur={(e) => setVerifyDesc(e.target.value)} className="note-input" type="text" nmae="note" id="note" />
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
                                                <h6 className="title-tag" style={getTypeBgColor(fetchData.typeId)}>{fetchData.typeName}</h6>
                                            </div>
                                            <div className="d-flex justify-content-between kn-page-title">
                                                <h6>{fetchData.title}</h6>
                                            </div>
                                        </div>
                                        <div className="kn-creator-btn-wrapper">
                                            <div className="col-md-10 col-lg-7 creator-wrapper">
                                                <div className="d-flex">
                                                    <img className="avatar-img" style={{ width: "40px", height: "50px" }} src="../../images/knowledge/avatar.png" alt="作者頭貼" title="作者頭貼" />
                                                    <p className="kn-creator">{fetchData.creatorName}</p>
                                                </div>
                                                <p className="">&emsp;發表於{formatDateTime(fetchData.createTime)}</p>
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