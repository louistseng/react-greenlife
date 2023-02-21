import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "../Login.scss";
import ComfirmAlert from '../Components/ComfirmAlert';
import greenLogo from "../images1/green-logo.PNG";
import signUpNormal from "../images1/login/signUp-normal.png";
import { YearPicker, DayPicker } from 'react-dropdown-date';
import { pad } from '../utils/Functions';
import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function PublicSignUp(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    const [greenlifeCookies, setGreenlifeCookies] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";

    const [loginEmail, setLoginEmail] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");
    const [subTitle, setSubTitle] = useState("");

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [gender, setGender] = useState("");

    const [genderErr, setGenderErr] = useState(false)
    const [yearErr, setYearErr] = useState(false)

    const identityType = "1"

    //點閱計數API
    useEffect(() => {
        clickRecord("B7A58B12-3208-4729-8F10-F8C684C189BA", "16", collector)
    }, [collector]);

    useEffect(() => {
        //select 標籤加 title
        const select = document.querySelector("select")
        select.setAttribute("title", "西元年")
    })

    //寄送驗證碼按鈕
    const verifyEmail = async (data) => {
        if (!gender) {
            setGenderErr(true)
        } else {
            setGenderErr(false)
        }
        if (!year) {
            setYearErr(true)
        } else {
            setYearErr(false)
        }
        if (gender && year) {
            setGenderErr(false)
            setYearErr(false)
            if (loginEmail && data.password && data.password_repeat && data.nickName) {

                fetch(`${SSL}//${domain}/api/api/Auth/Register/Mail`, {
                    method: 'POST',
                    body: JSON.stringify({
                        Email: loginEmail,
                        IdentityTypeId: identityType
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        // console.log(result)
                        if (result.isSucess) {
                            setShowDialog(true)
                            setShowText("驗證碼已寄至您的信箱, 5分鐘以內有效")
                            setSubTitle("請您至信箱內確認驗證碼")
                        } else {
                            setShowDialog(true)
                            setShowText(result.userMsg)
                            setSubTitle(" ")
                            setTimeout(function () {
                                setShowText(result.userMsg + " ")
                            }, 100)
                        }

                    });

            } else {
                // console.log("未填寫Email!")
            }
        }

    }



    const { register, errors, handleSubmit, watch } = useForm({});

    const onSubmit = async (data) => {
        setShowDialog(true)
        fetch(`${SSL}//${domain}/api/api/Auth/Register`, {
            method: 'POST',
            body: JSON.stringify({
                Email: data.email,
                VerifyStr: data.verify,
                Password: data.password,
                IdentityTypeId: identityType,
                NickName: data.nickName,
                Gender: String(gender),
                Birth_Year: String(year),
                // Birth_Month: String(month),
                // Birth_Day: String(pad(day)),
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                    setGreenlifeCookies('refreshToken', result.resultObject.token, { path: '/', maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    setGreenlifeCookies('userGuid', result.resultObject.userGuid, { path: '/', maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    setGreenlifeCookies('identityType', result.resultObject.identityTypeId, { path: "/", maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    setGreenlifeCookies('groups', result.resultObject.groups, { path: "/", maxAge: 1800, secure: Boolean(domain === "greenlife.epa.gov.tw"), sameSite: "lax" })
                    setShowText("註冊成功")
                    setSubTitle("歡迎加入全民綠色生活")
                    //一般帳號註冊完成導到會員中心看操作說明
                    setTimeout(function () {
                        setShowDialog(false)
                    }, 1000)
                    setTimeout(function () {
                        history.push({
                            pathname: '/member/memberCenter',
                            state: { firstLogin: true }
                        });
                    }, 1500)
                } else {
                    setShowText(result.userMsg)
                }
            });



    };



    const password = useRef({});
    password.current = watch("password", "");

    useEffect(() => {
        const selectYear = document.getElementById('year')
        if (selectYear !== null) {
            selectYear.setAttribute("aria-label", "出生年");
        }
    })

    return (
        <>

            <BreadCrumb currentPage={"會員註冊"} />
            <div className="sightUp-card-wrapper">
                {showDialog &&
                    <ComfirmAlert key={subTitle} alertTitle={showText} subTitle={subTitle} showLoginBtn={false} history={props.history} />
                }
                <div className="signUp-content">
                    <img className="logo" src={greenLogo} alt="全民綠生活平台logo" title="全民綠生活平台logo"></img>
                    <div className="pbsightUp-title"><img src={signUpNormal} alt="個人帳號註冊圖示" /><h2>個人帳號註冊</h2></div>
                    {/* <div className="signUp-notice"><h5>在您註冊之前, 請先閱讀本站的<a href="#">使用條款</a>及<a href="#">隱私政策</a>，請勿使用真實姓名、注音、表情符號做為帳號名稱。</h5></div> */}
                    <div className="d-flex signUp-form-wrapper">

                        <form className="signUp-form" onSubmit={e => e.preventDefault()}>
                            <div className="input-wrapper-signUp">
                                <h3 className="required">E-mail</h3>
                                <input
                                    onBlur={e => setLoginEmail(e.target.value)}
                                    className="input-pbSignUp"
                                    name="email"
                                    id="email"
                                    placeholder="請輸入您的E-mail"
                                    aria-required="true"
                                    ref={register({
                                        required: "請輸入email",
                                        pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                    })}
                                    aria-label="請輸入您的E-mail"
                                />
                                <div className="warning">
                                    {errors.email && 'E-mail格式不符'}
                                </div>
                                {/* register an input */}
                            </div>

                            <div className="input-wrapper-signUp">
                                <h3 className="required">密碼</h3>
                                <input
                                    type="password"
                                    className="input-pbSignUp"
                                    name="password"
                                    id="password"
                                    placeholder="請輸入密碼(至少12碼，包含大小寫英文、數字及特殊符號)"
                                    aria-required="true"
                                    ref={register({
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/,
                                        required: "請輸入密碼",
                                        minLength: {
                                            value: 12,
                                            message: "密碼長度需大於12個字元"
                                        }
                                    })}
                                    aria-label="請輸入您的密碼"
                                />
                                <div className="warning">
                                    {errors.password && '密碼格式不符'}
                                </div>
                            </div>

                            <div className="input-wrapper-signUp">
                                <h3 className="required">確認密碼</h3>
                                <input
                                    type="password"
                                    className="input-pbSignUp"
                                    name="password_repeat"
                                    id="password_repeat"
                                    placeholder="請再次輸入密碼"
                                    // ref={register({ required: true })} 
                                    aria-required="true"
                                    ref={register({
                                        validate: value =>
                                            value === password.current || "請再確認密碼"
                                    })}
                                    aria-label="請再次輸入密碼"
                                />
                                <div className="warning">
                                    {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                                </div>
                            </div>

                            <div className="input-wrapper-signUp">
                                <h3 className="required">暱稱</h3>
                                <input
                                    type="text"
                                    className="input-pbSignUp"
                                    name="nickName"
                                    id="nickName"
                                    placeholder="請輸入暱稱"
                                    // ref={register({ required: true })} 
                                    aria-required="true"
                                    ref={register({
                                        required: "請輸入暱稱",
                                        pattern: /[a-zA-Z0-9\u4E00-\u9FFF]+$/,
                                        maxLength: {
                                            value: 20,
                                            message: "暱稱需小於20個字元 不可包含特殊符號"
                                        }
                                    })}
                                    aria-label="請輸入暱稱"
                                />
                                <div className="warning">
                                    {errors.nickName && <p>{errors.nickName.message}</p>}
                                </div>
                            </div>

                            <div className="input-wrapper-signUp pbSignUp">
                                <h3 className="required">出生年</h3>
                                <YearPicker
                                    defaultValue={'西元'}
                                    reverse                     // default is ASCENDING
                                    value={year}     // mandatory
                                    onChange={(year) => {
                                        setYear(year)
                                    }}
                                    id={'year'}
                                    name={'year'}
                                    classes={'classes info-drop'}
                                    optionClasses={'option classes'}
                                />
                                {/* <select className="info-drop" value={month} name="month" onChange={(e) => {
                                    setMonth(e.target.value)
                                }}>
                                    <option value="0">月</option>
                                    <option value="01">1月</option>
                                    <option value="02">2月</option>
                                    <option value="03">3月</option>
                                    <option value="04">4月</option>
                                    <option value="05">5月</option>
                                    <option value="06">6月</option>
                                    <option value="07">7月</option>
                                    <option value="08">8月</option>
                                    <option value="09">9月</option>
                                    <option value="10">10月</option>
                                    <option value="11">11月</option>
                                    <option value="12">12月</option>
                                </select>
                                <DayPicker
                                    defaultValue={'日'}
                                    year={year}    // mandatory
                                    endYearGiven              // mandatory if end={} is given in YearPicker
                                    value={day}    // mandatory
                                    onChange={(day) => {
                                        if (day < 10) {
                                            setDay(day)
                                        } else {
                                            setDay(day)
                                        }
                                    }
                                    }
                                    id={'day'}
                                    name={'day'}
                                    classes={'classes info-drop'}
                                    optionClasses={'option classes'}
                                /> */}
                                <div className="warning">
                                    {yearErr && '請選擇出生年'}
                                </div>
                            </div>


                            <div className="input-wrapper-signUp">
                                <h3 className="required">性別</h3>
                                <div className="pbSignUp-sex">
                                    <input type="radio" name="gender-M" id="gender-M" value="1" checked={gender === "1"}
                                        onChange={e => { setGender(String(e.target.value)) }}
                                    ></input>
                                    <label htmlFor="gender-M">男</label>
                                </div>
                                <div className="pbSignUp-sex">
                                    <input type="radio" value="0" name="gender-W" id="gender-W" checked={gender === "0"}
                                        onChange={e => { setGender(String(e.target.value)) }}
                                    ></input>
                                    <label htmlFor="gender-W">女</label>
                                </div>
                                <div className="pbSignUp-sex">
                                    <input type="radio" value="2" name="gender" id="gender" checked={gender === "2"}
                                        onChange={e => { setGender(String(e.target.value)) }}
                                    ></input>
                                    <label htmlFor="gender">不公開</label>
                                </div>
                                <div className="warning">
                                    {genderErr && '請選擇您的性別'}
                                </div>

                            </div>




                            <div className="input-wrapper-signUp mb-5">
                                <h3 className="required">驗證碼</h3>
                                <input
                                    className="valid-num-input input-pbSignUp"
                                    name="verify"
                                    id="verify"
                                    placeholder="請輸入驗證碼"
                                    aria-required="true"
                                    ref={register({ pattern: /\d+/ })}
                                    aria-label="請輸入驗證碼" />

                                <button
                                    onClick={handleSubmit(verifyEmail)}
                                    className="valid-number"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter">
                                    <h4>取得電子信箱驗證碼</h4>
                                </button>
                            </div>

                            <button className="sigUp-submit" type="submit" onClick={handleSubmit(onSubmit)}>送出</button>
                            <Link to="/signUp_options"><button className="sigUp-cancel" type="submit" >取消</button></Link>
                            {/* <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div> */}
                        </form>
                    </div>
                </div>
            </div>

            {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src={greenMan} />
                        </div>
                        <div class="modal-footer">
                            <Link to="/accountInfo"><button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button></Link>

                        </div>
                    </div>
                </div>
            </div> */}


            <Footer />

        </>
    );
}

export default withRouter(PublicSignUp);