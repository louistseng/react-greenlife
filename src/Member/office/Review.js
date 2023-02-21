import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout } from '../../utils/Functions';
import ComfirmAlert from '../../Components/ComfirmAlert';
import './Review.scss';
import './evaluation.scss';
import Checkbox from './Checkbox';
import { energyCheckboxes, waterCheckboxes, fuelCheckboxes, paperCheckboxes, reduceCheckboxes, trashCheckboxes, itemShopCheckboxes, plantCheckboxes, teachCheckboxes, finalCheckboxes } from './checkboxes';

import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));
const InfoSideMenu = React.lazy(() => import('../InfoSideMenu'));

function Review(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    // const [collector, setCollector] = useState(cookies.get('userGuid'));
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [authGuid, setAuthGuid] = useState(history.location.search.slice(1));

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "UserGuid": collector,
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("D54FA376-503F-49FC-A42E-CFB87F318D35", "19", collector)
    }, []);

    //用URL抓GUID
    const setLink = () => {
        setAuthGuid(history.location.search.slice(1))
    }

    //縣市別下拉式選單API
    const [fetchCityData, setFetchCityData] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/Citys`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setFetchCityData(result.resultObject)
                // console.log(result)
            });
    }, [])


    //會員專區-管理者專區-綠色辦公響應管理>檢視
    const [fetchStatus, setFetchStatus] = useState([]);
    const [checkboxData, setCheckboxData] = useState([]);
    const [verifyDesc, setVerifyDesc] = useState("");
    const [verifyDescNote, setVerifyDescNote] = useState("");
    useEffect(() => {
        window.scrollTo(0, 0)
        setLink()
        fetch(`${SSL}//${domain}/api/api/Manager/Participate/View`, {
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
                if (result.isSucess) {
                    setFetchStatus(result.resultObject.application)
                    setCheckboxData(result.resultObject.participate)
                    setVerifyDescNote(result.resultObject.verifyDesc)
                    setIsScoringChange(result.resultObject.participate.isScoring)
                    setIsVerifyPass(result.resultObject.participate.isVerify)
                }
            });
    }, []);


    //送出審核按鈕
    const [isVerifyPass, setIsVerifyPass] = useState(false);
    const [isScoringChange, setIsScoringChange] = useState(false);
    const submit = async () => {
        setShowDialog(true)
        setAlertTitle("處理中~")
        document.getElementById('reviewSubmitBtn').style.pointerEvents = 'none';

        fetch(`${SSL}//${domain}/api/api/Manager/Participate/Edit`, {
            method: 'POST',
            body: serialize({
                Guid: authGuid,
                IsVerify: String(isVerifyPass),
                IsScoring: String(isScoringChange),
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
                    history.push('/member/management');
                }
            });
    }


    const scoringCheck = () => {
        // console.log("scoring")
        var scoring = document.querySelectorAll('input#result-scored[type=checkbox]:checked')
        if (scoring.length > 0) {
            // console.log(true)
            setIsScoringChange(true)
        } else {
            // console.log(false)
            setIsScoringChange(false)
        }
    }


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
    // console.log(isScoringChange)

    const currentTableData = (

        <tr>
            <td data-title="審查狀態" className="list-date">{fetchStatus.status}</td>
            <td data-title="評核計分" className="download-time">{fetchStatus.isScoring}</td>
            <td data-title="單位性質">{fetchStatus.identityTypeName}</td>
            <td data-title="縣市別">{fetchStatus.cityName}</td>
            <td data-title="單位名稱">{fetchStatus.name}</td>
        </tr>

    )

    // const filteredArray = energyCheckboxes.filter((checkbox) =>
    //     checkbox.name === "i1_1_1".toUpperCase()
    // )
    // console.log(filteredArray)
    console.log(checkboxData.forEPA === null)
    console.log(checkboxData.forEPA)
    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle={" "} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            <BreadCrumb currentPage={"檢視"} />

            <div className="container office_evaluation_review member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} />

                <div className="col-12 col-lg-8">
                    <h3 className="green-title">綠色辦公審核</h3>
                    <div className="section">
                        <h4 className="review-section-title">申請狀態</h4>
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
                        <h4 className="review-section-title">申請內容</h4>
                        <div className="review-table-outter-wrapper">
                            <h6 className="review-copy-title">響應項目: {checkboxData.totalCount}/35</h6>

                            <div className="final-banner">
                                <ul className="final-list">
                                    {finalCheckboxes.map((item, index) => (
                                        <div className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={true} />
                                            <label className="checkbox-text share-green-title" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                    <div className="final-select-wrapper">
                                        <Checkbox className="review_checkbox" readOnly={true} name="I6-1-3" checked={true} />
                                        <label for="q" className="checkbox-text  share-green-title" key="finalcheckBox3">3. 請問本次響應是否由縣市環保局協助輔導</label>
                                        <div className="yes-no-wrapper">
                                            <input className="myCheckbox" disabled id="yesforcity" name="city" type="radio" defaultChecked={checkboxData.forEPA} /><label for="yesforcity">是</label>
                                            {/* <select id="selectcity" readOnly disabled={true} value={checkboxData.epaCityId || "0"} className="city-select">
                                                <option value="0">請選擇縣市</option>
                                                {fetchCityData.map((fetchData, index) =>
                                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                                )}
                                            </select> */}
                                            <input className="myCheckbox" disabled name="city" id="noforcity" type="radio" defaultChecked={!checkboxData.forEPA} /><label for="noforcity">否</label>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                            <div className="energy-banner">
                                <div className="banner-main">
                                    <h2>指標1&nbsp;:&nbsp;節省能資源</h2>
                                </div>
                                <ul className="energy-list">
                                    <div className="text-wrapper">
                                        <div className="list-title"><p>項目1</p></div>
                                        <h5>節約用電</h5>
                                    </div>
                                    {energyCheckboxes
                                        .map((item, index) => (
                                            <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                                <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                                <label className="checkbox-text" key={item.key}>{item.label}</label>
                                            </div>
                                        ))}
                                </ul>
                                <ul className="energy-list">
                                    <div className="text-wrapper">
                                        <div className="list-title"><p>項目2</p></div>
                                        <h5>節約用水</h5>
                                    </div>
                                    {waterCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                </ul>
                                <ul className="energy-list">
                                    <div className="text-wrapper">
                                        <div className="list-title"><p>項目3</p></div>
                                        <h5>節約用油</h5>
                                    </div>
                                    {fuelCheckboxes.map((item, index) => (
                                        <>
                                            <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                                <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                                <label className="checkbox-text" key={item.key}>{item.label}</label>
                                            </div>
                                        </>
                                    ))}
                                </ul>
                                <ul className="energy-list">
                                    <div className="text-wrapper">
                                        <div className="list-title"><p>項目4</p></div>
                                        <h5>節約用紙</h5>
                                    </div>
                                    {paperCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className="reduce-banner">
                                <div className="banner-main">
                                    <h2>指標2&nbsp;:&nbsp;源頭減量</h2>
                                </div>
                                <ul className="energy-list">
                                    <div className="text-wrapper">
                                        <div className="list-title"><p>項目1</p></div>
                                        <h5>減塑減廢</h5>
                                    </div>
                                    {reduceCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                </ul>
                                <ul className="energy-list">
                                    <div className="text-wrapper">
                                        <div className="list-title"><p>項目2</p></div>
                                        <h5>垃圾分類</h5>
                                    </div>
                                    {trashCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className="greenShop-banner">
                                <div className="banner-main">
                                    <h2>指標3&nbsp;:&nbsp;綠色採購</h2>
                                </div>
                                <ul className="energy-list">

                                    {itemShopCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className="envir-banner">
                                <div className="banner-main">
                                    <h2>指標4&nbsp;:&nbsp;環境綠美化</h2>
                                </div>
                                <ul className="energy-list">

                                    {plantCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className="promote-banner">
                                <div className="banner-main">
                                    <h2>指標5&nbsp;:&nbsp;倡議宣導</h2>
                                </div>
                                <ul className="energy-list">

                                    {teachCheckboxes.map((item, index) => (
                                        <div style={{ display: checkboxData[item.name.toLowerCase()] ? "flex" : "none" }} className="box-text-wrapper" key={index}>
                                            <Checkbox className="review_checkbox" readOnly={true} name={item.name} checked={checkboxData[item.name.toLowerCase()]} />
                                            <label className="checkbox-text" key={item.key}>{item.label}</label>
                                        </div>
                                    ))}
                                    <div className="text-area-wrapper">
                                        <input readOnly className="myCheckbox" name="I5_1_8" id="I5_1_8" checked={checkboxData["i5_1_8"] || false} type="checkbox"></input>
                                        <label for="I5_1_8" className="checkbox-text">8 .其他（請自行列舉具體措施）</label>
                                        <textarea className="evaluation-textarea readOnly" value={checkboxData.i5_1_8Desc || ""} readOnly
                                            placeholder="請簡述對於「綠色辦公」其他創意作為(500字為限)" />
                                    </div>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="section review-result">
                        <h4 className="review-section-title">審查結果</h4>
                        <div className="member-table-outter-wrapper">
                            <div className="box-text-wrapper">
                                <input onClick={scoringCheck} defaultChecked={checkboxData.isScoring} type="checkbox" name="result-scored" id="result-scored" />
                                <label for="result-scored" className="checkbox-text">列入計分</label>
                            </div>
                            <div className="d-flex">
                                <input onClick={verifyCheck} defaultChecked={checkboxData.isVerify} type="radio" id="r1" name="passRadio" value="true" />
                                <label for="r1">通過</label>
                                <input onClick={verifyCheck} defaultChecked={checkboxData.isReturn} type="radio" id="r2" name="passRadio" value="false" />
                                <label for="r2">不通過</label>
                            </div>
                            <div className="d-flex">
                                <label for="note">備註與說明：</label>
                                <div>
                                    <input onBlur={(e) => setVerifyDesc(e.target.value)} className="note-input" type="text" name="note" id="note" />
                                    <p>{verifyDescNote !== "null" && verifyDescNote}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review-sumbit-btn">
                        <button id="reviewSubmitBtn" onClick={submit} className="send-btn">確認送出</button>
                        <button onClick={() => history.goBack()} className="cancel-btn">取消</button>
                    </div>

                </div>

            </div>


            <Footer />

        </>
    );
}

export default withRouter(Review);