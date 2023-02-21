import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GovSignUp } from '../utils/API';
import { getCityId } from '../utils/Functions';
import TwCitySelector from 'tw-city-selector';
import "../Login.scss";
import ComfirmAlert from '../Components/ComfirmAlert';
import greenLogo from "../images1/green-logo.PNG";

import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";
import { Label } from 'react-bootstrap';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function PublicSignUp(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    const [loginEmail, setLoginEmail] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [showFocus, setShowFocus] = useState(false);

    const [unitCityId, setUnitCityId] = useState("0");
    const [zipCode, setZipCode] = useState("0");

    const [greenlifeCookies, setGreenlifeCookies] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";

    const identityType = props.location.state === undefined ? "2" : props.location.state.identityType
    // const identityType = "2"

    //點閱計數API
    useEffect(() => {
        if (identityType === "2") {
            clickRecord("717EDA61-9141-4A7C-A676-7A2075F817D6", "16", collector)
        } else if (identityType === "4") {
            clickRecord("90B85BB5-2DF0-4570-B0FC-21011AA4D238", "16", collector)
        }
    }, []);

    //定義台灣縣市二級下拉選單
    useEffect(() => {
        new TwCitySelector({
            el: '.city-selector-set-has-value',
            elCounty: '.county',
            elDistrict: '.district',
            standardWords: true,
        });
    }, [])

    //台灣縣市二級下拉選單改變觸發事件
    function OnSelectChange(event) {
        const elements = Array.from(document.querySelectorAll("[data-zipcode]"))
            .find(el => el.innerHTML === event.currentTarget.value);
        setZipCode(elements.dataset.zipcode)
    }

    //驗證碼
    const verifyEmail = async (data) => {

        if (data.email && data.password && data.password_repeat) {
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
                    // console.log(res)
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
                        // console.log('錯誤')
                    }

                });

        } else {
            // console.log("未輸入Email")
        }

    }

    const { register, errors, handleSubmit, watch } = useForm({});

    const onSubmit = async (data) => {
        setShowDialog(true)
        GovSignUp(data.email, data.verify, identityType, data.password, data.unitCode, data.unitFullName, data.applyName, data.telNumber, unitCityId, zipCode, data.address, setShowText, setShowDialog, setSubTitle, history, setGreenlifeCookies)

    };


    const password = useRef({});
    password.current = watch("password", "");


    return (
        <>

            <BreadCrumb currentPage={identityType === "2" ? '機關帳號申請' : "學校單位帳號申請"} />
            <div className="container containerBox flip-tour">
                <div className="sightUp-card-wrapper-comp">
                    {showDialog &&
                        <ComfirmAlert key={subTitle} alertTitle={showText} subTitle={subTitle} showLoginBtn={false} history={props.history} />
                    }
                    <div className="signUp-content">
                        <img className="logo" src={greenLogo} alt="logo"></img>
                        <div className="pbsightUp-title"><h2>{identityType === "2" ? '機關帳號申請' : "學校單位帳號申請"}</h2></div>
                        {/* <div className="signUp-notice"><h5>在您註冊之前, 請先閱讀本站的<Link to="/Policy">使用條款</Link>及<Link to="/Policy">隱私政策</Link>，請勿使用真實姓名、注音、表情符號做為帳號名稱。</h5></div> */}
                        {identityType === "4" &&
                            <div className="school-radio-wrapper">
                                <div className="radio-title">請選擇學校性質</div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="publicSchool" name="school" value="publicSchool" title="publicSchool" defaultChecked={identityType === "4"} />
                                    <label for="publicSchool">公立學校（機關代碼）</label>
                                </div>
                                <Link
                                    className="radio-wrapper"
                                    to={{
                                        pathname: "/signUp_options/organization_SignUp/general_SignUp",
                                        state: { identityType: "5" }
                                    }}>
                                    <input type="radio" id="privateSchool" name="school" value="privateSchool" title="privateSchool" defaultChecked={identityType === "5"} />
                                    <label for="privateSchool">私立學校（統一編號）</label>
                                </Link>
                            </div>
                        }
                        <div className="d-flex signUp-form-wrapper">

                            <form className="signUp-form" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">承辦人E-mail</div>
                                        <label for="email"></label>
                                        <input
                                            onBlur={e => setLoginEmail(e.target.value)}
                                            name="email"
                                            id="email"
                                            title="email"
                                            size="61"
                                            placeholder=""
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入email",
                                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                            })} />
                                        <div className="warning">
                                            {errors.email && 'E-mail格式不符'}
                                        </div>
                                        {/* register an input */}
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">密碼</div>
                                        <label for="password"></label>
                                        <input
                                            type="password"
                                            size="61"
                                            name="password"
                                            id="password"
                                            title="password"
                                            aria-required="true"
                                            placeholder="至少１２碼，需包含大小寫英文、數字及特殊符號"
                                            ref={register({
                                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/,
                                                required: "請輸入密碼",
                                                minLength: {
                                                    value: 12,
                                                    message: "密碼長度需大於12個字元"
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">至少１２碼，需包含大小寫英文、數字及特殊符號</h4> */}
                                        <div className="warning">
                                            {errors.password && '密碼格式不符'}
                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">確認密碼</div>
                                        <label for="password_repeat"></label>
                                        <input
                                            type="password"
                                            size="61"
                                            name="password_repeat"
                                            id="password_repeat"
                                            title="password_repeat"
                                            placeholder="請再次輸入密碼"
                                            aria-required="true"
                                            // ref={register({ required: true })} 
                                            ref={register({
                                                validate: value =>
                                                    value === password.current || "請再確認密碼"
                                            })}
                                        />
                                        <div className="warning">
                                            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">機關代碼</div>
                                        <label for="unitCode"></label>
                                        <input
                                            type="text"
                                            name="unitCode"
                                            id="unitCode"
                                            title="unitCode"
                                            size="61"
                                            placeholder="例如：3.55-0"
                                            aria-required="true"
                                            ref={register({
                                                // pattern: /-0$/,
                                                required: "請輸入機關代碼",
                                            })}
                                        />
                                        <div className="warning">
                                            {errors.unitCode && <p>請輸入機關代碼</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="example-text example" onClick={() => { setShowFocus(!showFocus) }}>
                                            <i className="fas fa-question-circle" aria-hidden="true"></i>提醒：如您要響應綠色辦公，請以<span className="warning-text">綠色生活資訊帳號</span>登入，勿申請新帳號，以免無法計入評核成績。</span>
                                    </div>
                                    {showFocus === true && (
                                        <div className="reminder-container">
                                            <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={() => { setShowFocus(false) }}>X</button>
                                            提醒：「響應綠色辦公」目前已開放機關及公立學校之綠色採購人員權限，其代碼末碼須為「-0」及「-GL」之使用者，以免造成重複響應問題。
                                            貴單位如欲響應綠色辦公，請貴單位「綠色採購人員（-0帳號管理者）」填寫響應措施表，或由該使用者申請「-GL」分帳號，以供其他人員填寫響應措施表。如欲查詢所屬單位綠色採購人員，請撥打系統諮詢專線02-2361-1999#438。</div>
                                    )}


                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">機關名稱全銜</div>
                                        <label for="unitFullName"></label>
                                        <input
                                            className=""
                                            name="unitFullName"
                                            id="unitFullName"
                                            title="unitFullName"
                                            placeholder="例如：行政院環境保護署"
                                            size="61"
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入機關名稱全銜",
                                                maxLength: {
                                                    value: 40,
                                                    required: "請輸入機關名稱全銜",
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">例如：行政院環境保護署</h4> */}
                                        <div className="warning">
                                            {errors.unitFullName && <p>{errors.unitFullName.message}</p>}
                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">承辦人姓名</div>
                                        <label for="applyName"></label>
                                        <input
                                            name="applyName"
                                            id="applyName"
                                            title="applyName"
                                            size="61"
                                            placeholder=""
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入承辦人姓名",
                                                pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                                            })} />
                                        <div className="warning">
                                            {errors.applyName && '不可含特殊字元及數字'}
                                        </div>
                                        {/* register an input */}
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">承辦人聯絡電話</div>
                                        <label for="telNumber"></label>
                                        <input
                                            type="tel"
                                            name="telNumber"
                                            id="telNumber"
                                            title="telNumber"
                                            placeholder="例如: 02-66308000#216"
                                            size="61"
                                            maxLength="20"
                                            aria-required="true"
                                            // ref={register({ required: true })} 
                                            ref={register({
                                                pattern: /^((0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+)))|([0-9]) ?$/,
                                                required: "請輸入聯絡電話",
                                                minLength: {
                                                    value: 10,
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">例如: 02-66308000#216</h4> */}
                                        <div className="warning">
                                            {errors.telNumber && "電話不符/未填寫"}&emsp;
                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">機關地址</div>
                                        <div role="tw-city-selector" className="city-selector-set-has-value city-select-withInput" data-has-zipcode data-standard-words>
                                            <div className="city-select-wrapper">
                                                <select className={unitCityId !== "0" ? "county signUp-addr-select changed" : "county signUp-addr-select"} title="縣市" onChange={(e) => {
                                                    setUnitCityId(getCityId(e.target.value))
                                                }}></select>
                                                <select className={zipCode !== "0" ? "district signUp-addr-select changed" : "district signUp-addr-select"} title="區域" onChange={OnSelectChange}></select>
                                            </div>
                                            <label for="address"></label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                title="address"
                                                maxLength="50"
                                                size="35"
                                                minLength="4"
                                                placeholder=""
                                                aria-required="true"
                                                ref={register({
                                                    required: "請輸入單位登記地址",
                                                })} />
                                        </div>
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label gov-verify-title required">請輸入驗證碼</div>
                                        <div className="verify-btn-input">
                                            <label for="verify"></label>
                                            <input
                                                className="valid-num-input input-pbSignUp"
                                                name="verify"
                                                id="verify"
                                                title="verify"
                                                placeholder=""
                                                aria-required="true"
                                                ref={register({ pattern: /\d+/ })} />

                                            <button
                                                onClick={handleSubmit(verifyEmail)}
                                                className="valid-number"
                                                data-toggle="modal"
                                                data-target="#exampleModalCenter">
                                                <h4>取得電子信箱驗證碼</h4>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="submit-btn-wrapper">
                                    <button className="sigUp-submit" type="submit" onClick={handleSubmit(onSubmit)}>送出</button>
                                    <Link to="/signUp_options/organization_SignUp"><button className="sigUp-cancel" type="submit" >取消</button></Link>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>






            </div>
            <Footer />

        </>
    );
}

export default withRouter(PublicSignUp);