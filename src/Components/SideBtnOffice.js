import React, { useState, useEffect } from 'react';
import './css/sideBtn.css';
import { getMemberProfile } from '../utils/API';
import { checkAuth, clickLogout } from '../utils/Functions'
import { animateScroll as scroll } from 'react-scroll'
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';
import $ from 'jquery';

function SideBtnOffice(props) {

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identity = greenlifeCookies.identityType || 0;
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState([]);
    const [subTitle, setSubTitle] = useState("");
    const [showNote, setShowNote] = useState(true);

    const [memberInfo, setMemberInfo] = useState([]);

    //右側"回到上方"按鈕
    const goTop = () => {
        scroll.scrollToTop();
    }

    useEffect(() => {
        $(function () {
            var $inp = $('#toTop-btn');

            $inp.bind('keydown', function (e) {
                var key = e.which;
                if (key == 13) {
                    e.preventDefault();

                    $("#goMain").focus();

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                }

            });

        });
    })

    //綠色辦公-判斷組織權限
    useEffect(() => {

        if (collector && memberToken) {
            getMemberProfile(collector, memberToken, clickLogout, removeCookie)
                .then(result => {
                    if (result.isSucess) {
                        setMemberInfo(result.resultObject)
                    }
                })
        }
    }, [collector, memberToken])


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle={showNote ? "" : "若權限與實際不符，請撥打平台客服專線由專人為您服務"} showLoginBtn={showNote} history={props.history} showNote={showNote} />
            }
            <div className="sideBtn-wrapper">
                {props.type === "綠色餐廳" &&
                    <a target="_blank" href="\Files\GreenLife\綠平台_綠色餐廳申請操作說明介紹&QA(1120201).pdf" download="綠平台_綠色餐廳申請操作說明介紹&QA(1120201).pdf" title="操作說明下載(另開視窗)">
                        <div className="instruction-btn sideBtn"><div className="instruction-wrapper">操作說明<div className="instruction-dowload"><i className="fas fa-download" aria-hidden="true" alt="下載PDF圖示"></i>下載PDF</div></div></div>
                    </a>
                }
                {props.type === "環保旅店" &&
                    <a target="_blank" href="\Files\GreenLife\1110808_環保旅店申請操作說明.pdf" download="1110808_環保旅店申請操作說明.pdf" title="操作說明下載(另開視窗)">
                        <div className="instruction-btn sideBtn"><div className="instruction-wrapper">操作說明<div className="instruction-dowload"><i className="fas fa-download" aria-hidden="true" alt="下載PDF圖示"></i>下載PDF</div></div></div>
                    </a>
                }

                {props.type === "團體旅遊" &&
                    <a target="_blank" href="\Files\GreenLife\1111025_綠色旅遊團體旅遊行程申請操作說明&QA.pdf" download="1111025_綠色旅遊團體旅遊行程申請操作說明&QA.pdf" title="操作說明下載(另開視窗)">
                        <div className="instruction-btn sideBtn"><div className="instruction-wrapper">操作說明<div className="instruction-dowload"><i className="fas fa-download" aria-hidden="true" alt="下載PDF圖示"></i>下載PDF</div></div></div>
                    </a>
                }
                {props.type === "綠色辦公" &&
                    <>
                        <a target="_blank" href="\Files\GreenLife\綠色辦公響應問答集1111021.pdf" download="綠色辦公響應問答集1111021.pdf" title="綠色辦公問題集(另開視窗)">
                            <div className="instruction-btn sideBtn"><div className="instruction-wrapper">問題集<div className="instruction-dowload"><i className="fas fa-download" aria-hidden="true" alt="下載PDF圖示"></i>下載PDF</div></div></div>
                        </a>
                        <a target="_blank" href="\Files\GreenLife\1111025_綠平台_綠色辦公響應操作說明介紹&QA.pdf" download="1111025_綠平台_綠色辦公響應操作說明介紹&QA.pdf" title="操作說明下載(另開視窗)">
                            <div className="instruction-btn sideBtn"><div className="instruction-wrapper">操作說明<div className="instruction-dowload"><i className="fas fa-download" aria-hidden="true" alt="下載PDF圖示"></i>下載PDF</div></div></div>
                        </a>
                        <Link onClick={() => checkAuth(identity, memberInfo.unitCode, setShowDialog, setAlertTitle, setShowNote, props.history)} to={memberToken ? (identity === "2" || identity === "4") ? Boolean(memberInfo?.unitCode?.match(/-0|-GL$/g)) ? "/categories/green_office/evaluation" : "/categories/green_office" : "/categories/green_office/evaluation" : "#"}><div className="toPrev-btn sideBtn">我要響應<i className="fas fa-bullhorn sideBtn-icon" aria-hidden="true" alt="我要響應圖示"></i></div></Link>
                    </>
                }
                <div className="toTop-btn sideBtn" id="toTop-btn" onClick={() => goTop()} tabIndex={0}>TOP<i className="fas fa-sort-up sideBtn-icon" alt="至頂圖示"></i></div>
                <div className="toPrev-btn sideBtn" onClick={() => props.history.goBack()} onKeyPress={e => { if (e.which === 13) { props.history.goBack() } }} tabIndex={0}>上一頁<i className="fas fa-undo-alt sideBtn-icon" aria-hidden="true" alt="回上一頁圖示"></i></div>
            </div>
        </>
    );
}

export default SideBtnOffice;