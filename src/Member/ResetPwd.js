import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickLogout } from '../utils/Functions';
import "../Login.scss";
import "./Info.scss";
import { useForm } from 'react-hook-form';
import ComfirmAlert from '../Components/ComfirmAlert';

import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";


function ResetPwd(props) {

    let SSL = props.SSL
    let domain = props.domain
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [subTitle, setSubTitle] = useState(" ");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("65108F23-6833-4CEC-8982-8E1833DED69B", "18", collector)
    }, [collector]);

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    //取得信箱驗證碼API
    const verifyEmail = async (data) => {
        if (data.oldPassword && data.password && data.password_repeat) {
            window.scrollTo(0, 0)

            fetch(`${SSL}//${domain}/api/api/Auth/PwdMail`, {
                method: 'POST',
                body: JSON.stringify({
                    Pwd: data.oldPassword
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        setShowDialog(true)
                        setAlertTitle("驗證碼已寄至您的信箱, 5分鐘以內有效")
                        setSubTitle("請您至信箱內確認驗證碼")
                    } else {
                        setShowDialog(true)
                        setAlertTitle(result.userMsg)
                        setSubTitle(" ")
                    }

                });
        }
    }


    const onSubmit = async (data) => {
        setShowDialog(true)
        setAlertTitle("提交中")
        setSubTitle(" ")

        await fetch(`${SSL}//${domain}/api/api/Auth/Pwd/Edit`, {
            method: 'POST',
            body: JSON.stringify({
                Pwd: data.oldPassword,
                NewPwd: data.password,
                VerifyStr: data.verify
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setShowDialog(true)
                    setAlertTitle("變更密碼成功")
                    setSubTitle(" ")
                    clickLogout(removeCookie, collector)
                } else {
                    setAlertTitle("變更密碼失敗")
                    setSubTitle(" ")
                }
            });
    };



    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle={subTitle} alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"帳號資料編輯"} />

            <div className="container member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-lg-9">
                <h2 className="dark-grey bold mb-3">變更密碼</h2>
                <div className="input-wrapper-pwd row">
                    <label for="oldPassword" className="col-2" ><h5>舊密碼</h5></label>
                    <input
                        type="password"
                        className="col-8"
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="請輸入舊密碼"
                        ref={register({
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/,
                            required: "請輸入您的舊密碼",
                            minLength: {
                                value: 12,
                                message: "密碼長度需大於12個字元"
                            }
                        })}
                    />
                    <div className="warning col-2">
                        {errors.password && '密碼格式不符'}
                    </div>
                </div>
                <div className="input-wrapper-pwd row">
                    <label for="password" className="col-2" ><h5>新密碼</h5></label>
                    <input
                        type="password"
                        className="col-8"
                        name="password"
                        id="password"
                        placeholder="請輸入新密碼(至少12碼，包含大小寫英文、數字及特殊符號)"
                        ref={register({
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/,
                            required: "請輸入您的新密碼",
                            minLength: {
                                value: 12,
                                message: "密碼長度需大於12個字元"
                            }
                        })}
                    />
                    <div className="warning col-2">
                        {errors.password && '密碼格式不符'}
                    </div>
                </div>

                <div className="input-wrapper-pwd row">
                    <label for="password_repeat" className="col-2" ><h5>新密碼確認</h5></label>
                    <h5 className="col-2">新密碼確認</h5>
                    <input
                        type="password"
                        className="col-8"
                        name="password_repeat"
                        id="password_repeat"
                        placeholder="請再輸入一次您的新密碼"
                        // ref={register({ required: true })} 
                        ref={register({
                            validate: value =>
                                value === password.current || "請再確認密碼"
                        })}
                    />
                    <div className="warning col-2">
                        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                    </div>
                </div>

                <div className="input-wrapper-pwd row">
                    <label for="verify" className="col-2" ><h5>驗證碼</h5></label>
                    <input
                        className="col-4"
                        type="text"
                        name="verify"
                        id="verify"
                        placeholder="請輸入驗證碼"
                        ref={register({ pattern: /\d+/ })} />
                    <div className="warning">
                        {errors.verify && '驗證碼有誤'}
                    </div>
                    <div onClick={handleSubmit(verifyEmail)} className="col-4 valid-number" data-toggle="modal" data-target="#exampleModalCenter"><h4>取得電子信箱驗證碼</h4></div>
                </div>

                <div className="input-wrapper info-btn-wrapper">
                    <button onClick={handleSubmit(onSubmit)} className="upload-btn btn">確認變更</button>
                    <Link to={'/member/memberCenter'} className="info-canel-btn btn">取消</Link>
                </div>
            </div>
            {/* </div> */}
            <div style={{ height: "45vh" }} className="search-content"></div>

            {/* <Footer /> */}

        </>
    );
}

export default withRouter(ResetPwd);