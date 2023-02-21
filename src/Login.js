import React, { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import "./Login.scss";
import greenLogo from "./images1/green-logo.PNG";
import facebookLogo from "./images1/login/facebookDarkBlue.png";
import googleLogo from "./images1/login/google.png";
import verifyLogo from './images1/greenLogo.gif';
import greenPointLogo from './images1/login/greenPoint.png';
import { useForm } from 'react-hook-form';
import { clickRecord } from './utils/API';
import { clickLogout } from './utils/Functions';
import { useCookies } from "react-cookie";
import GoogleLogin from 'react-google-login';
import ComfirmAlert from './Components/ComfirmAlert';
import { set } from 'react-ga';

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));

function Login(props) {
    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const params = window.location.href;
    const params2 = new URLSearchParams(history.location.search);
    const greenlivingToken = params2.get("jwtoken")
    const greenPointToken = params2.get("data")

    const [loginPassword, setLoginPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const [loginEmail, setLoginEmail] = useState(greenlifeCookies.userEmail);
    const collector = greenlifeCookies.userGuid || "";
    //alert提醒視窗顯示
    const [alertTitle, setAlertTitle] = useState("");


    //從comfirmAlert的登入按鈕來的可以指定導向, 需要先登入後再重新導向的頁面也會用到
    //ex:導覽列-我的綠行動-綠生活任務
    const goHere = props.location.state?.goHere

    //fb註冊
    useLayoutEffect(() => {

        const fbToken = params.split('#access_token=')[1]
        const uriFb = `${SSL}//${domain}/api/api/Auth/Login/FB`

        if (fbToken) {
            fetch(uriFb, {
                method: 'POST',
                body: serialize({
                    AccessToken: fbToken
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                        //maxAge-30分鐘後過期(後端驗證token api也是30分鐘)
                        setGreenlifeCookies('refreshToken', result.resultObject.token, { path: '/', maxAge: 1800 });
                        setGreenlifeCookies('userGuid', result.resultObject.userGuid, { path: "/", maxAge: 1800 })
                        setGreenlifeCookies('identityType', result.resultObject.identityTypeId, { path: "/", maxAge: 1800 })
                        setGreenlifeCookies('groups', result.resultObject.groups, { path: "/", maxAge: 1800 })
                        //fb,google,環保集點 快速登入後要導到同意條款
                        history.push(goHere || '/Policy')
                    } else {
                        setErrMsg(result.userMsg)
                    }
                });
        }

    }, [SSL, domain, greenlifeCookies.refreshToken, greenlifeCookies.userGuid, params, params2, removeCookie, serialize]);

    //點閱計數API
    useEffect(() => {
        clickRecord("74217D1A-B97A-4E48-AE81-8330F3164F94", "17", collector)
    }, [collector]);


    //一般登入
    const submit = () => {
        //如果記住email打勾, 把email存在cookie裡
        var rememberEmail = document.querySelectorAll('input#rememberEmail[type=checkbox]:checked')
        if (rememberEmail.length > 0) {
            setGreenlifeCookies('userEmail', loginEmail);
        } else {
            removeCookie('userEmail')
        }

        window.scrollTo(0, 0)
        fetch(`${SSL}//${domain}/api/api/Auth/Login/Normal`, {
            method: 'POST',
            body: JSON.stringify({
                Email: loginEmail,
                Pwd: loginPassword
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                    //maxAge-30分鐘後過期(後端驗證token api也是30分鐘)
                    setGreenlifeCookies('refreshToken', result.resultObject.token, { path: '/', maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" });
                    setGreenlifeCookies('userGuid', result.resultObject.userGuid, { path: "/", maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    setGreenlifeCookies('identityType', result.resultObject.identityTypeId, { path: "/", maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    setGreenlifeCookies('groups', result.resultObject.groups, { path: "/", maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    //如果沒有指定導向url, 就導到會員中心
                    history.push(goHere || '/member/memberCenter');
                } else {
                    setErrMsg(result.userMsg)
                }

            });

    }

    //資訊網登入
    useEffect(() => {
        if (greenlivingToken) {
            history.push({
                pathname: '/categories/green_office/apply',
                search: `?jwtoken=${greenlivingToken}`,
                state: { toMemberCenter: true, goHere: goHere }
            });
        }
    }, [greenlivingToken])


    //環保集點登入
    useEffect(() => {
        if (greenPointToken) {
            fetch(`${SSL}//${domain}/api/api/Auth/Login/GreenPoint`, {
                method: 'POST',
                body: serialize({
                    GPointToken: greenPointToken
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })
                .then(res => {
                    if (res.status === 403) {
                        clickLogout(removeCookie, collector)
                        throw new Error(res.statusText);
                    } else {
                        return res.json();
                    }
                }).then(result => {
                    sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                    //maxAge-30分鐘後過期(後端驗證token api也是30分鐘)
                    setGreenlifeCookies('refreshToken', result.resultObject.token, { path: "/", maxAge: 1800 })
                    setGreenlifeCookies('userGuid', result.resultObject.userGuid, { path: "/", maxAge: 1800 })
                    setGreenlifeCookies('identityType', result.resultObject.identityTypeId, { path: "/", maxAge: 1800 })
                    setGreenlifeCookies('groups', result.resultObject.groups, { path: "/", maxAge: 1800 })
                    const myHeaders = new Headers({
                        "Content-Type": "application/json; charset=utf-8",
                        "Token": result.resultObject.token
                    });
                    //環保集點在他們那邊會先同意條款(PolicyForGPoint.js)
                    //api判斷有資料的話(有登入過), 直接導到會員中心, 沒有資料導到編輯頁
                    fetch(`${SSL}//${domain}/api/api/Member/Profile/Check`, {
                        method: 'GET',
                        headers: myHeaders
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            if (result.isSucess) {
                                history.push({
                                    pathname: goHere || '/member/edit',
                                    state: { haveData: result.resultObject }
                                })
                            }
                        })
                })
        }
    }, [])


    const { register, errors, handleSubmit } = useForm({});

    //google註冊-回傳token
    const responseGoogle = (response) => {
        const uriGoogle = `${SSL}//${domain}/api/api/Auth/Login/Google`;
        fetch(uriGoogle, {
            method: 'POST',
            body: serialize({
                accessToken: response.tokenId
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                //maxAge-30分鐘後過期(後端驗證token api也是30分鐘)
                setGreenlifeCookies('refreshToken', result.resultObject.token, { path: '/', maxAge: 1800 });
                setGreenlifeCookies('userGuid', result.resultObject.userGuid, { path: "/", maxAge: 1800 })
                setGreenlifeCookies('identityType', result.resultObject.identityTypeId, { path: "/", maxAge: 1800 })
                setGreenlifeCookies('groups', result.resultObject.groups, { path: "/", maxAge: 1800 })
                //fb,google,環保集點 快速登入後要導到同意條款
                history.push(goHere || '/Policy')
            })
    }

    return (
        <>
            <BreadCrumb currentPage={"會員登入"} />

            <div className="login-card-wrapper">
                <Form onKeyPress={e => {
                    if (e.which === 13) {
                        handleSubmit(submit)
                    }
                }} >
                    <div className="login-card">
                        <img className="logo" src={greenLogo} alt="logo"></img>
                        <div style={{ color: "red" }}>{errMsg}</div>
                        <span className="d-flex justify-content-center"><h2 className="login-text">還不是會員嗎?&nbsp;</h2><Link to="/Policy" title="立即註冊(另開視窗)"><h2 className="login-text">立即註冊新帳號</h2></Link></span>
                        <div className="normal-login"><h3>一般登入</h3></div>
                        <div className="login-border">
                            <Form.Control
                                title="Email輸入"
                                className="login-email"
                                placeholder="請輸入E-MAIL"
                                name="email"
                                defaultValue={loginEmail || ""}
                                onBlur={e => setLoginEmail(e.target.value)}
                                ref={register({
                                    required: "請輸入您的Email",
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                })}
                            />
                            {/* <p style={{ color: "red", position: "absolute" }}>{errors.email && 'Email格式有誤'}</p> */}
                        </div>
                        <div className="login-border">
                            <Form.Control
                                spellcheck="false"
                                title="密碼輸入"
                                type="password"
                                className="login-password"
                                placeholder="請輸入密碼"
                                name="password"
                                onBlur={e => setLoginPassword(e.target.value)}
                                ref={register({
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/,
                                    required: "請輸入您的密碼",
                                    minLength: {
                                        value: 12,
                                        message: "密碼長度需大於12個字元"
                                    }
                                })}
                            />
                            {/* <p style={{ color: "red", position: "absolute" }}>{errors.password && '密碼有誤'}</p> */}
                            {errors.password &&
                                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={"您輸入的帳號或密碼不正確"} history={history} />
                            }
                        </div>
                        <div className="waring-text">請注意：若密碼輸入不正確超過3次以上，</div>
                        <div className="waring-text">帳號將會鎖定30分鐘</div>

                        <div type="submit" className="login-submit" onClick={handleSubmit(submit)}><h4>登入</h4></div>
                        <div className="between-wrapper">
                            <Link className="forget-pwd" to="/regisPassword" title="忘記密碼(另開視窗)">忘記密碼?</Link>
                            <Form.Check
                                label="記住E-mail"
                                className="remember-check"
                                type="checkbox"
                                id="rememberEmail"
                            />
                        </div>
                        {/* &display=popup */}
                        <div className="login-outside-container">
                            <h5 className="login-text">其他平台帳號快速登入</h5>
                            <div className="login-btn-wrapper">
                                {/*facebook登入*/}
                                {/* {domain.includes("greenlife.eri.com.tw") &&
                                    <a href="https://www.facebook.com/v8.0/dialog/oauth?client_id=671711793527935&response_type=token&redirect_uri=https://greenlife.eri.com.tw/login" title="FACEBOOK登入">
                                        <img alt="FACEBOOK登入"
                                            src={facebookLogo}
                                            className="circle-btn"
                                        />
                                        <h6>Facebook</h6>
                                    </a>}
                                {domain.includes("greenlife.epa.gov.tw") &&
                                    <a href='https://www.facebook.com/v8.0/dialog/oauth?client_id=671711793527935&response_type=token&redirect_uri=https://greenlife.epa.gov.tw/login' title="FACEBOOK登入">
                                        <img alt="FACEBOOK登入"
                                            src={facebookLogo}
                                            className="circle-btn"
                                        />
                                        <h6>Facebook</h6>
                                    </a>} */}

                                <GoogleLogin
                                    clientId="1098236736077-btshlu2s7sephf72kjpphi0iso8mc219.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    // onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <div style={{ cursor: "pointer" }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <img className="circle-btn" alt="GOOGLE登入" title="GOOGLE登入" src={googleLogo} />
                                            <h6>Google</h6>
                                        </div>
                                    )}
                                />


                                {/*環保集點登入*/}
                                <a href={domain.includes("greenlife.eri.com.tw") ? "https://web-test.greenpoint.org.tw/GpConsumerApp/Function/Login.aspx?OAuth=greenlife" : "https://sys.greenpoint.org.tw/GpConsumerApp/Function/Login.aspx?Oauth=greenlife"}>
                                    <img className="circle-btn-border" src={greenPointLogo} alt="環保集點登入" tltle="環保集點登入" />
                                    <h6>環保集點</h6>
                                </a>

                            </div>
                            <h6 className="login-text">或</h6>
                            <h6 className="login-text">綠生活業務帳號快速登入</h6>
                            <div className="login-btn-wrapper">
                                {/*綠色生活資訊網登入*/}
                                <a href={domain.includes('greenlife.epa.gov.tw') ? "https://greenliving.epa.gov.tw/GreenLife/Anonymous/LoginGreenLife.aspx?u=1" : "https://greenliving.eri.com.tw/GreenLife/Anonymous/LoginGreenLife.aspx?u=1"}>
                                    <div className="circle-btn-border" tltle="綠色生活資訊網登入">
                                        <img src={verifyLogo} alt="綠色生活資訊網登入" />
                                    </div>
                                    <h6>綠色生活資訊網</h6>
                                </a>

                            </div>
                        </div>
                        {/* <div className="login-btn-wrapper">
                            <a href={domain.includes('greenlife.epa.gov.tw') ? "https://greenliving.epa.gov.tw/GreenLife/Anonymous/LoginGreenLife.aspx" : "https://greenliving.eri.com.tw/GreenLife/Anonymous/LoginGreenLife.aspx"} className="greenliving_login"><img src={verifyLogo} alt="綠色生活資訊網登入" tltle="綠色生活資訊網登入" /><h6>綠色生活資訊網</h6></a>
                        </div> */}

                        {/* <Link to="/"><h6 className="back-link">greenlife.epa.gov.tw</h6></Link> */}
                    </div>
                    <Footer />
                </Form>
            </div>




        </>
    );
}

export default withRouter(Login);