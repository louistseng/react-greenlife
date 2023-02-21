import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './css/ComfirmAlert.scss';
import greenMan from "../images1/greenMan/greenMan.png";
import verifyLogo from '../images1/greenLogo.gif';
import closeIcon from '../images1/greenPoint/main/closeIcon.png';
import { useLockBodyScroll } from '../utils/Functions';
import { useCookies } from "react-cookie";
import $, { data } from 'jquery';

function BingoPopUp(props) {
    // Call hook to lock body scroll
    // useLockBodyScroll();
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var serialize = require('serialize-javascript');
    const [greenlifeCookies] = useCookies([]);
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MzEzMzA4NDgsIm5iZiI6MTYzMTMyOTA0OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiZGI4OTYyZTMtZjlhNy00ODdkLThiMjQtZWRiMWEyYWZkNzg4In0.3GK2_HIBLhqSZkAc0yFJ3lReAXhxIbJ0krnH4V36TGtWUfRDrt49yj7oSTkWpJl19zMNy5s_s9315VV87AYi_Q";

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });
    const [rightAnswer, setRightAnswer] = useState(props.rightAnswer);
    const [answer, setAnswer] = useState(null);
    const [showNote, setShowNote] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const submit = () => {
        setShowNote(true)
        if (answer && answer === String(props.data.answer)) {
            setRightAnswer(true)
            setTimeout(function () {
                window.location.href = "/member/point_mission?type=2";
            }, 500)
        } else {
            setRightAnswer(false)
            setTimeout(function () {
                window.location.href = "/member/point_mission?type=2";
            }, 500)
        }

        fetch(`${SSL}//${domain}/api/api/Bingo/Reply`, {
            method: 'POST',
            body: serialize({
                topicGuid: props.data.topicGuid,
                x: props.data.x,
                y: props.data.y,
                reply: Number(answer)
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
            });

    }

    console.log(props.data)
    // console.log(props.rightAnswer)
    // console.log(rightAnswer)

    useEffect(() => {
        window.scrollTo({ top: 300, behavior: 'smooth' })
    }, [])

    return (

        <div className="popUp-bg-container">

            {props.showDialog &&
                <>
                    <div className="black-background show"></div>
                    <div className="popUp-btn-wrapper">
                        <div className="popUp-container">
                            <div className="close-icon-container">
                                <img onClick={() => {
                                    props.setShowDialog(false)
                                    setShowNote(false)
                                    setAnswer(null)
                                }} className="bingo-close" src={closeIcon}
                                    onKeyPress={() => {
                                        props.setShowDialog(false)
                                        setShowNote(false)
                                        setAnswer(null)
                                    }}
                                    tabIndex={0}
                                />
                            </div>
                            <div className="question-container">
                                <div className="d-flex row mb-2">
                                    <h6 className="col-2 question-title">項目</h6>
                                    <h6 className="col-10 question-title-type">{props.data.type}</h6>
                                </div>
                                <div className="d-flex row">
                                    <h6 className="col-2 question-title">情境</h6>
                                    <div className="col-10">
                                        <h6 className="mb-3">{props.data.situation}</h6>
                                        <div className="text-radio-container">
                                            <input defaultChecked={props.data.reply === 1} type="radio" id="huey" name="drone" value={1}
                                                disabled={props.data.reply === 1 || props.data.reply === 2 || props.data.reply === 3 || props.data.correct === 1}
                                                onChange={e => {
                                                    setAnswer(e.target.value)
                                                }}
                                            />
                                            <label for="huey">{props.data.option1}</label>
                                        </div>
                                        <div>
                                            <input defaultChecked={props.data.reply === 2} type="radio" id="dewey" name="drone" value={2}
                                                disabled={props.data.reply === 1 || props.data.reply === 2 || props.data.reply === 3 || props.data.correct === 1}
                                                onChange={e => {
                                                    setAnswer(e.target.value)
                                                }} />
                                            <label for="dewey">{props.data.option2}</label>
                                        </div>
                                        {props.data.option3 &&
                                            <div>
                                                <input defaultChecked={props.data.reply === 3} type="radio" id="louie" name="drone" value={3}
                                                    disabled={props.data.reply === 1 || props.data.reply === 2 || props.data.reply === 3 || props.data.correct === 1}
                                                    onChange={e => {
                                                        setAnswer(e.target.value)
                                                    }} />
                                                <label for="louie">{props.data.option3}</label>
                                            </div>}
                                    </div>
                                </div>
                                <div className="bingo-btn-container">
                                    {(showNote || props.data.reply) &&
                                        <>
                                            {(rightAnswer || props.data.correct === 1) && <h5 className="answer-note">正確答案!你是綠生活達人</h5>}
                                            {(!rightAnswer && props.data.correct === 0) && <h5 className="answer-note">不對唷!多多加油充實綠生活知識</h5>}
                                        </>}
                                    {answer && <button onClick={() => submit()} id="submitBtn" className="bingo-submit-btn">送出</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    );
}
export default BingoPopUp