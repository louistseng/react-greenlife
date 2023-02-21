import React, { useState, useEffect } from 'react';
import './greenOffice.scss';
import Footer from '../Components/Footer';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickLogout, getidentityName } from '../utils/Functions';
import { clickRecord, greenlivingLogin, checkGLivingToken } from '../utils/API';
import { GuidContext } from '../utils/Context';
import ComfirmAlert from '../Components/ComfirmAlert';
import SideBtn from '../Components/SideBtn';
import govImg from '../images1/greenOffice/gov.png';
import caseImg from '../images1/login/case-white.png';
import bookImg from '../images1/login/book-white.png';
import groupImg from '../images1/login/group-white.png';
import applyMan from '../images1/greenOffice/applyMan.png';

import { useCookies } from "react-cookie";

function ApplyOffice(props) {
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'
    let domainFormal = "https://greenliving.epa.gov.tw/newPublic";
    let domainTest = "https://greenliving.eri.com.tw/PublicRwd"
    //引入router路徑紀錄
    let history = useHistory()
    //序列化回傳資料-取代JSON.stringify()
    var serialize = require('serialize-javascript');
    //抓資訊網來的JWT
    const params = new URLSearchParams(history.location.search);
    const greenlivingToken = params.get("jwtoken")

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const [identity, setIdentity] = useState(greenlifeCookies.identityType || 0);
    const [unitCode, setUnitCode] = useState("")

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    //點閱計數API
    useEffect(() => {
        clickRecord(GuidContext._currentValue, "16", collector)
    }, [collector]);


    //選擇組織類型
    const typeOnClick = (linkType) => {
        console.log(identity, linkType, unitCode)
        if (!identity) {
            if (greenlivingToken && greenLivingData) {
                greenlivingLogin_and_redirect(linkType, greenLivingData)
            } else {
                clickLogout(removeCookie, collector)
            }

        } else {
            if (linkType !== identity) {
                setShowDialog(true)
                setAlertTitle(`您已具有${getidentityName(identity)}權限`)
                setTimeout(function () {
                    setAlertTitle(`您已具有${getidentityName(identity)}權限 `)
                }, 100)
            } else {
                if (unitCode) {
                    setShowDialog(true)
                    setAlertTitle(`「響應綠色辦公」目前僅開放使用統一編號及機關代碼末碼為"-0"之使用者，造成您的不便敬請見諒`)
                    setTimeout(function () {
                        history.push('/member/memberCenter?sortType=6');
                    }, 800)

                }

            }
        }

    }

    const greenlivingLogin_and_redirect = async (linkType, data) => {
        console.log(linkType)
        console.log(data)
        console.log(props.location.state?.toMemberCenter)
        if (Boolean(greenlivingToken && linkType)) {
            // console.log(identity === null ? String(linkType) : String(identity))
            //資訊網更新資料
            greenlivingLogin(linkType, data, greenlivingToken)
                .then(result => {
                    console.log(result)
                    if (result.isSucess) {
                        // setIdentity(result.resultObject.identityTypeId)
                        if (props.location.state?.toMemberCenter) {
                            history.push('/member/memberCenter')
                        } else {
                            if ((result.resultObject.identityTypeId === 2 || result.resultObject.identityTypeId === 4)) {
                                if (Boolean(result.resultObject.unitCode.match(/-0$/g))) {
                                    history.push({
                                        pathname: '/categories/green_office/evaluation',
                                        state: { city: data.p_addr.substring(0, 3) }
                                    })
                                } else {
                                    setUnitCode(result.resultObject.unitCode)
                                }

                            } else {
                                history.push({
                                    pathname: '/categories/green_office/evaluation',
                                    state: { city: data.u_addr_ch.substring(0, 3) }
                                })
                            }
                        }
                        // if (!greenlifeCookies.identityType) {
                        //     setShowDialog(true)
                        //     setAlertTitle(`已取得${getidentityName(linkType)}權限`)
                        //     setTimeout(function () {
                        //         setAlertTitle(`已取得${getidentityName(linkType)}權限 `)
                        //     }, 100)
                        // }

                    } else {
                        setShowDialog(true)
                        if (result.userMsg !== null) {
                            setAlertTitle(result.userMsg)
                            setTimeout(function () {
                                setAlertTitle(result.userMsg + ' ')
                            }, 100)
                        }
                    }
                })
        }
    }


    //測試用
    // useEffect(() => {
    //     formData.append("U", encodeURIComponent("khusc"))
    //     formData.append("APPID", "GreenLifePlatform")
    //     formData.append("APPKEY", "3325376A037641F5864407C4F768A0F3D5F38BC64B044AB49F532CC5A9A6A48CB6F31920BE704A958A7329BCD4D6DD7D33CE7B3AA9FC4873924FE0503A8434CFD7F64CD1A2024490AB98ABF53A1433A1")

    //     fetch(`${domain.includes('greenlife.eri.com.tw') ? domainTest : domainFormal}/APIs/GLAccount`, {
    //         method: 'POST',
    //         body: formData
    //     }).then(res => {
    //         console.log(res)
    //         return res.json();
    //     }).catch(error => console.error('Error:', error))
    //         .then(result => {
    //             console.log(result)

    //         })

    // },[])

    //驗證資訊網的Token，並回傳帳號(UserGuid)
    const [greenLivingData, setGreenLivingData] = useState([])
    // console.log(greenLivingData)

    var formData = new FormData();

    console.log(identity)

    useEffect(() => {
        console.log(greenlivingToken)
        if (greenlivingToken) {
            setGreenlifeCookies('refreshToken', greenlivingToken, { path: "/", maxAge: 1800 })
            //解析資訊網JWT,回傳userId
            checkGLivingToken(greenlivingToken, history)
                .then(result => {
                    console.log(result)
                    //資訊網-帳號資訊API
                    if (result.isSucess) {
                        const checkIdentity = result.resultObject.identityTypeId
                        formData.append("U", encodeURIComponent(result.resultObject.userGuid))
                        formData.append("APPID", "GreenLifePlatform")
                        formData.append("APPKEY", "3325376A037641F5864407C4F768A0F3D5F38BC64B044AB49F532CC5A9A6A48CB6F31920BE704A958A7329BCD4D6DD7D33CE7B3AA9FC4873924FE0503A8434CFD7F64CD1A2024490AB98ABF53A1433A1")

                        fetch(`${domain.includes('greenlife.eri.com.tw') ? domainTest : domainFormal}/APIs/GLAccount`, {
                            method: 'POST',
                            body: formData
                        }).then(res => {
                            console.log(res)
                            return res.json();
                        }).then(result => {
                            console.log(result)
                            if (result.Result === "Success") {
                                // console.log(result)
                                setGreenLivingData(result.Detail[0])
                                greenlivingLogin_and_redirect(checkIdentity, result.Detail[0])
                            } else {
                                clickLogout(removeCookie, collector)
                            }
                        }).catch(error => console.error('Error:', error))
                        setIdentity(result.resultObject.identityTypeId)
                        sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                        setGreenlifeCookies('userGuid', result.resultObject.userGuid, { path: "/", maxAge: 1800 })
                        setGreenlifeCookies('identityType', result.resultObject.identityTypeId, { path: "/", maxAge: 1800 })
                        setGreenlifeCookies('groups', result.resultObject.groups, { path: "/", maxAge: 1800 })
                        // history.push('/categories/green_office/apply')
                    }
                });
        }
    }, [greenlivingToken])

    //綠色辦公-是否填過-響應申請單
    // useEffect(() => {
    //     fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Participate/2020buytest`, {
    //         method: "GET"
    //     })
    //         .then(res => {
    //             return res.json();
    //         }).then(result => {
    //             // console.log(result)
    //             if (result.resultObject.isWrite) {
    //                 //history.push('/categories/green_office/evaluation_edit')
    //             }
    //         })
    // }, [])

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle={"若權限與實際不符，請撥打平台客服專線由專人為您服務"} showLoginBtn={false} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"選擇組織性質"} /> */}
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="office-apply">
                <h2 className="type-title">請選擇組織性質</h2>
                <div className="org-type-wrapper">
                    <div onClick={() => typeOnClick(3)} className="org-type-button"
                    // to={{
                    //     pathname: identity === 3 ? "/categories/green_office/evaluation" : "/categories/green_office/apply",
                    //     state: { identityType: "3" }
                    // }}
                    >
                        <div className="inner-wrapper">
                            <div className="img-wrapper">
                                <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-企業代表" />
                                <img className="building" src={caseImg} alt="企業圖示" title="響應綠色辦公-企業代表" />
                            </div>
                            <h2>我是企業代表</h2>
                            <h2>我要響應</h2>
                        </div>
                    </div>
                    <Link onClick={() => typeOnClick(2)} className="org-type-button"
                        to={{
                            pathname: (identity === 2 || identity === 4) ? Boolean(unitCode.match(/-0$/g)) ? "/categories/green_office/evaluation" : "/categories/green_office/apply" : "/categories/green_office/apply",
                            state: { identityType: "2" }
                        }}
                    >
                        <div className="inner-wrapper">
                            <div className="img-wrapper">
                                <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-機關代表" />
                                <img className="building" src={govImg} alt="機關圖示" title="響應綠色辦公-機關代表" />
                            </div>
                            <h2>我是機關代表</h2>
                            <h2>我要響應</h2>
                        </div>
                    </Link>
                    <div onClick={() => typeOnClick(4)} className="org-type-button"
                    // to={{
                    //     pathname: identity === 4 ? Boolean(unitCode.match(/-0$/g)) ? "/categories/green_office/evaluation" : "/categories/green_office/apply" : "/categories/green_office/apply",
                    //     state: { identityType: "4" }
                    // }}
                    >
                        <div className="inner-wrapper">
                            <div className="img-wrapper">
                                <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-公立學校" />
                                <img className="building" src={bookImg} alt="學校圖示" title="響應綠色辦公-公立學校" />
                            </div>
                            <h2>我是公立學校</h2>
                            <h2>我要響應</h2>
                        </div>
                    </div>
                    <div onClick={() => typeOnClick(5)} className="org-type-button"
                    // to={{
                    //     pathname: identity === 5 ? "/categories/green_office/evaluation" : "/categories/green_office/apply",
                    //     state: { identityType: "5" }
                    // }}
                    >
                        <div className="inner-wrapper">
                            <div className="img-wrapper">
                                <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-私立學校" />
                                <img className="building" src={bookImg} alt="學校圖示" title="響應綠色辦公-私立學校" />
                            </div>
                            <h2>我是私立學校</h2>
                            <h2>我要響應</h2>
                        </div>
                    </div>
                    <div onClick={() => typeOnClick(6)} className="org-type-button"
                    // to={{
                    //     pathname: identity === 6 ? "/categories/green_office/evaluation" : "/categories/green_office/apply",
                    //     state: { identityType: "6" }
                    // }}
                    >
                        <div className="inner-wrapper">
                            <div className="img-wrapper">
                                <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-團體代表" />
                                <img className="building" src={groupImg} alt="團體圖示" title="響應綠色辦公-團體代表" />
                            </div>
                            <h2>我是團體代表</h2>
                            <h2>我要響應</h2>
                        </div>
                    </div>
                </div>
                {/* <div className="join-line">
                    <h4>你還不是會員嗎？為確保權益，註冊會員才可以參加響應唷</h4>
                    <Link to="/Policy" className="join-btn">
                        <h4>點我註冊會員</h4>
                    </Link>
                </div> */}

            </div>

            <SideBtn history={useHistory()} />
            <Footer />
        </>
    );
}

export default withRouter(ApplyOffice);