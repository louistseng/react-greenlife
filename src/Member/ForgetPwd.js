import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "../Login.scss";
import "./Info.scss";
import { useForm } from 'react-hook-form';
import { clickLogout } from '../utils/Functions';

import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));

function ResetPwd(props) {
    let SSL = props.SSL
    let domain = props.domain


    const [collector, setCollector] = useState("");
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const [loginEmail, setLoginEmail] = useState('');


    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [subTitle, setSubTitle] = useState(" ");

    const { register, errors, handleSubmit, watch } = useForm({});
    const password = useRef({});
    password.current = watch("password", "");

    var serialize = require('serialize-javascript');

    //點閱計數API
    useEffect(() => {
        clickRecord("C4E8368E-F03C-42F1-A8F2-70E4B5EDB8AC", "18", collector)
    }, [collector]);

    //忘記密碼-取得驗證碼API
    const verifyEmail = () => {
        window.scrollTo(0, 0)
        setShowDialog(true)
        setAlertTitle("提交中")
        setSubTitle(" ")
        if (loginEmail) {
            fetch(`${SSL}//${domain}/api/api/Auth/ForgotPwdMail`, {
                method: 'POST',
                body: serialize({
                    Email: loginEmail
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        setCollector(result.resultObject)
                        setAlertTitle("驗證碼已寄至您的信箱, 5分鐘以內有效")
                        setSubTitle("請您至信箱內確認驗證碼")
                    } else {
                        setAlertTitle(result.userMsg)
                        setSubTitle("  ")
                    }

                });
        } else {
            setShowDialog(true)
            setAlertTitle("E-mail有誤喔~")
            setSubTitle(" ")
            setTimeout(function () {
                setAlertTitle('E-mail有誤喔~ ')
            }, 100)
        }


    }


    const onSubmit = async (data) => {

        setShowDialog(true)
        setAlertTitle("提交中")
        setSubTitle(" ")

        await fetch(`${SSL}//${domain}/api/api/Auth/Pwd/Forgot`, {
            method: 'POST',
            body: serialize({
                UserGuid: collector,
                NewPwd: data.password,
                VerifyStr: data.verify,
                Email: data.email
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setShowDialog(true)
                    setAlertTitle("設定密碼成功, 請重新登入")
                    setSubTitle("請使用新密碼登入 ")
                    clickLogout(removeCookie, collector)
                } else {
                    setAlertTitle(result.userMsg)
                    setSubTitle("請再次確認")
                }

            });

    };



    return (
        <>
            {showDialog &&
                <ComfirmAlert key={subTitle} subTitle={subTitle} alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            <BreadCrumb currentPage={"帳號資料編輯"} />
            <div className="container member-info-wrapper row">
                {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken}/> */}
                <div className="col-sm-11 col-md-9 col-lg-9">
                    <h2 className="dark-grey bold mb-3">忘記密碼</h2>
                    <div className="input-wrapper-pwd row">

                        <label for="e-mail" className="col-2" ><h3>E-mail</h3></label>
                        <input
                            onBlur={e => setLoginEmail(e.target.value)}
                            type="e-mail"
                            className="col-3"
                            name="email"
                            id="e-mail"
                            placeholder="請輸入您的E-mail"
                            ref={register({
                                required: "請輸入email",
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            })} />
                        <div className="warning forget-pwd-warning">
                            {errors.email && 'E-mail格式有誤'}
                        </div>
                        <div onClick={verifyEmail} className="col-4 valid-number" data-toggle="modal" data-target="#exampleModalCenter"><h4>取得電子信箱驗證碼</h4></div>
                    </div>


                    <div className="input-wrapper-pwd row">

                        <label for="verify" className="col-2"><h5>驗證碼</h5></label>
                        <input
                            type="text"
                            className="col-4"
                            name="verify"
                            id="verify"
                            placeholder="請輸入驗證碼"
                            ref={register({
                                pattern: /\d+/,
                                required: "驗證碼為必填",
                            })} />
                        <div className="warning forget-pwd-warning">
                            {errors.verify && '驗證碼有誤'}
                        </div>

                    </div>
                    <div className="input-wrapper-pwd row">

                        <label for="password" className="col-2" ><h5>新密碼</h5></label>
                        <input
                            type="password"
                            className="col-7"
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
                        <div className="warning forget-pwd-warning col-2">
                            {errors.password && '密碼格式不符'}
                        </div>
                    </div>

                    <div className="input-wrapper-pwd row">

                        <label for="password_repeat" className="col-2"><h5>新密碼確認</h5></label>
                        <input
                            type="password"
                            className="col-7"
                            name="password_repeat"
                            id="password_repeat"
                            placeholder="請再輸入一次您的新密碼"
                            // ref={register({ required: true })} 
                            ref={register({
                                required: "請再輸入一次您的新密碼",
                                validate: value =>
                                    value === password.current || "請再確認密碼"
                            })}
                        />
                        <div className="warning forget-pwd-warning col-2">
                            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                        </div>
                    </div>
                    <div className="input-wrapper info-btn-wrapper">
                        <button onClick={handleSubmit(onSubmit)} className="upload-btn btn">確認變更</button>
                        <Link to={'/MemberInfo'} className="info-canel-btn btn">取消</Link>
                    </div>

                </div>
            </div>
            <div style={{ height: "20vh" }} className="search-content"></div>
            <Footer />

        </>
    );
}

export default withRouter(ResetPwd);