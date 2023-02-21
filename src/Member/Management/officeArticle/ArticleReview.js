import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDateTime, getBgColor, getTypeBgColor } from '../../../utils/Functions';
import ComfirmAlert from '../../../Components/ComfirmAlert';
import '../../office/Review.scss';
import '../../office/evaluation.scss';
import '../../../Knowledge.scss';
import '../../../GreenOffice/greenOffice.scss';
import { Card } from 'react-bootstrap';
import JoditEditor from "jodit-react";
import { readOnlyConfig } from '../../../utils/JoditConfig';
import { clickRecord, getOrgTagDrop } from '../../../utils/API';
import { useCookies } from "react-cookie";

function BlogReview(props) {

    let history = useHistory()
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjgwNDIwNjAsIm5iZiI6MTYyODA0MDI2MCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.btxClyGWwl4UOUgTnLCKvZpxiJAccY1M4GMcwrXGLh18w5qU2Z_SXmU6_YMA4tb2tqFP8iLgYW0pBjjnNJbL4g";

    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
    const [fetchData, setFetchData] = useState([]);
    const [tag, setTag] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);

    const [verifyDesc, setVerifyDesc] = useState("");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const editor = useRef(null)

    //點閱計數API
    useEffect(() => {
        clickRecord("57855A2C-DA2B-4F58-852D-A59EEA34A546", "19", collector)
    }, [collector]);

    //用URL抓GUID
    const setLink = () => {
        setBlogGuid(history.location.search.slice(1))
    }


    //送出審核按鈕
    const [isVerifyPass, setIsVerifyPass] = useState(false);
    const submit = async () => {

        // console.log(String(selectedTag || tag.map(data => data.officeArticleTagId)))
        setShowDialog(true)
        setAlertTitle("處理中~")
        document.getElementById('reviewSubmitBtn').style.pointerEvents = 'none';

        fetch(`${props.SSL}//${props.domain}/api/api/Manager/OfficeArticle/Edit`, {
            method: 'POST',
            body: serialize({
                Guid: blogGuid,
                IsVerify: String(isVerifyPass),
                VerifyDesc: encodeURIComponent(verifyDesc) || "",
                TagIds: String(selectedTag || tag.map(data => data.officeArticleTagId))
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
                    history.push('/member/office_article_management');
                }
            });
    }


    //單一經驗分享文章內容
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Article/ByGuid`, {
                method: 'POST',
                body: serialize({
                    Guid: blogGuid
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                // console.log(res)
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setFetchData(result.resultObject)
                    setTag(result.resultObject.tags)
                }
            })
    }, [blogGuid]);

    //會員專區-管理者專區-網誌管理-檢視
    const [boardData, setBoardData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            fetch(`${props.SSL}//${props.domain}/api/api/Manager/OfficeArticle/View`, {
                method: 'POST',
                body: serialize({
                    Guid: blogGuid
                }),
                headers: myHeaders
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setBoardData(result.resultObject)
                }
            })
    }, [blogGuid]);

    //綠色辦公-查詢的特殊成果項目-下拉
    const [resultTag, setResultTag] = useState([]);
    useEffect(() => {
        getOrgTagDrop(setResultTag)
    }, [])


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

    var arrayCheck = []

    const getThemeCheck = () => {
        var chks = document.querySelectorAll('input#resultCheckbox0[type=checkbox]:checked, input#resultCheckbox1[type=checkbox]:checked, input#resultCheckbox2[type=checkbox]:checked, input#resultCheckbox3[type=checkbox]:checked, input#resultCheckbox4[type=checkbox]:checked, input#resultCheckbox5[type=checkbox]:checked, input#resultCheckbox6[type=checkbox]:checked, input#resultCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setSelectedTag(arrayCheck)
        }
        // history.push(`/categories/green_office/participate?page=${page}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chks.length === 0 && setSelectedTag([])
    }
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
                            {resultTag.map((data, index) =>
                                <label for={"resultCheckbox" + index} key={index} className="reviewLabel">
                                    <input key={index} type="checkbox" defaultChecked={tag.map(data => data.officeArticleTagId).includes(data.Key)} value={data.Key} name={"resultCheckbox" + index} id={"resultCheckbox" + index} onClick={() => getThemeCheck()} />
                                    {data.Value}
                                </label>
                            )}
                        </div>
                        <div className="d-flex">
                            <input onClick={verifyCheck} defaultChecked={boardData?.isVerify} type="radio" id="r1" name="passRadio" value="true" />
                            <label for="r1">通過</label>
                            <input onClick={verifyCheck} key={boardData?.isVerify === false} defaultChecked={boardData?.isVerify === false} type="radio" id="r2" name="passRadio" value="false" />
                            <label for="r2">補件</label>
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



                <Card className="section col-12">
                    <div className="inner-content">
                        {/* <Loader loading={loading} /> */}
                        <div className="mb-3 envResponseContent">
                            <div className="">
                                <div className="kn-top-content">
                                    <div className="award-btn">
                                        {tag.map((tag, index) =>
                                            <div key={index} className="companyAwards"
                                                style={getBgColor(tag.officeArticleTagId)}>
                                                {tag.officeArticleTagName}</div>
                                        )}
                                        <div className="companyAwards"
                                            style={getTypeBgColor(fetchData.typeId)}>
                                            {fetchData.typeName}</div>
                                    </div>
                                    <div className="d-flex kn-page-title">
                                        <h6>{fetchData.title}</h6>
                                    </div>

                                    <div className="kn-tag-name">
                                        {/* <h6>{fetchData.themes[0].themeName}</h6> */}
                                    </div>
                                    <div className="office-creator-btn-wrapper">
                                        <div className="col-md-6 col-lg-7 creator-wrapper">
                                            <div className="d-flex">
                                                <img className="avatar-img" style={{ width: "40px", height: "50px" }} src="../../../images/knowledge/avatar.png" alt="作者頭貼" title="作者頭貼" />
                                                <h6 className="kn-creator">{fetchData.creator}</h6>
                                            </div>
                                            <h6 className="">&emsp;發表於{formatDateTime(fetchData.createTime)}</h6>

                                        </div>
                                    </div>
                                </div>
                                <div className="office-page-bottom-content" >
                                    <hr />
                                    <img className="reveiwContent-img" src={fetchData.picHref} alt={fetchData.title} title={fetchData.title} />
                                    <JoditEditor
                                        ref={editor}
                                        value={fetchData.content}
                                        config={readOnlyConfig}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>



            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(BlogReview);