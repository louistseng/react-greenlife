import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getCityId } from '../utils/Functions';
import { CompSignUp } from '../utils/API';
import ComfirmAlert from '../Components/ComfirmAlert';
import TwCitySelector from 'tw-city-selector';
import "../Login.scss";

import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";
import greenLogo from "../images1/green-logo.PNG";
import { lab } from 'd3-color';



const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function CompanySignUp(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    const [loginEmail, setLoginEmail] = useState('');

    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [showFocus, setShowFocus] = useState(false);

    const [unitCityId, setUnitCityId] = useState("0");
    const [contectCityId, setContectCityId] = useState("0");
    const [zipCode, setZipCode] = useState("0");
    const [contectZipCode, setContectZipCode] = useState("0");

    const identityType = props.location.state === undefined ? "3" : props.location.state.identityType
    // const identityType = "3"

    const [greenlifeCookies, setGreenlifeCookies] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        if (identityType === "3") {
            clickRecord("247BEFB0-2243-4AC7-A07E-412BAEA37B92", "16", collector)
        } else if (identityType === "5") {
            clickRecord("90B85BB5-2DF0-4570-B0FC-21011AA4D238", "16", collector)
        } else if (identityType === "6") {
            clickRecord("0FA1B8DC-BC03-424E-8731-198F8BEBE589", "16", collector)
        }
    }, [collector, identityType]);

    //定義台灣縣市二級下拉選單
    useEffect(() => {
        new TwCitySelector({
            el: '.city-selector-set-has-value',
            elCounty: '.county',
            elDistrict: '.district',
            standardWords: true,
        });

        new TwCitySelector({
            el: '.city-selector',
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

    function OnSelectContectChange(event) {
        const elements = Array.from(document.querySelectorAll("[data-zipcode]"))
            .find(el => el.innerHTML === event.currentTarget.value);
        setContectZipCode(elements.dataset.zipcode)

    }

    const [contectSelectErr, setContectSelectErr] = useState(false)
    const [citySelectErr, setCitytSelectErr] = useState(false)

    //驗證email信
    const verifyEmail = async (data) => {
        if (contectCityId === "0" || contectZipCode === "0") {
            setContectSelectErr(true)
        }

        if (unitCityId === "0" || zipCode === "0") {
            setCitytSelectErr(true)
        }

        if (data.email && data.password && data.password_repeat && !contectSelectErr && !citySelectErr) {
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
                        // console.log('錯誤')
                    }

                });

        } else {
            // console.log("enter email!")
        }

    }



    const { register, errors, handleSubmit, watch } = useForm({});

    const onSubmit = async (data) => {

        console.log(data);
        setShowDialog(true)

        CompSignUp(data.email, data.verify, identityType, data.password, data.applyName, data.tel, data.mobile, data.faxNumber, contectCityId, contectZipCode, data.contectAddr, data.unitCode, data.unitFullName, data.unitCHName, data.unitENName, data.manager, data.unitTel, data.unitFax, data.unitMail, data.unitHref, unitCityId, zipCode, data.unitAddr, setShowText, setShowDialog, setSubTitle, history, setGreenlifeCookies)
    };


    const password = useRef({});
    password.current = watch("password", "");

    return (
        <>

            <BreadCrumb currentPage={identityType === "3" ? '企業帳號申請' : identityType === "6" ? "團體帳號申請" : "學校帳號申請"} />
            {showDialog &&
                <ComfirmAlert key={subTitle} alertTitle={showText} subTitle={subTitle} showLoginBtn={false} history={props.history} />
            }
            <div className="container containerBox flip-tour">
                <div className="sightUp-card-wrapper-comp">
                    {/* <img src="images/flip/food/foodLogo.png" /> */}
                    <div className="signUp-content">
                        <img className="logo" src={greenLogo} alt="全民綠生活Logo" title="全民綠生活Logo"></img>
                        <div className="pbsightUp-title"><h2>{identityType === "3" ? '企業帳號申請' : identityType === "6" ? "民間帳號申請" : "學校帳號申請"}</h2></div>
                        {/* <div className="signUp-notice"><h5>在您註冊之前, 請先閱讀本站的<a href="#">使用條款</a>及<a href="#">隱私政策</a>，請勿使用真實姓名、注音、表情符號做為帳號名稱。</h5></div> */}
                        {identityType === "5" &&
                            <div className="school-radio-wrapper">
                                <div className="radio-title">請選擇學校性質</div>
                                <Link
                                    className="radio-wrapper"
                                    to={{
                                        pathname: "/signUp_options/organization_SignUp/gov_SignUp",
                                        state: { identityType: "4" }
                                    }}>
                                    <input type="radio" id="publicSchool" name="school" value="publicSchool" defaultChecked={identityType === "4"} />
                                    <label for="publicSchool">公立學校（機關代碼）</label>
                                </Link>
                                <div className="radio-wrapper">
                                    <input type="radio" id="privateSchool" name="school" value="privateSchool" defaultChecked={identityType === "5"} />
                                    <label for="privateSchool">私立學校（統一編號）</label>
                                </div>
                            </div>
                        }
                        <div className="d-flex signUp-form-wrapper">

                            <form className="signUp-form" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <h2 className="org-subtitle">一、聯絡人資料</h2>
                                    <div className="input-wrapper-signUp">
                                        <h3 className="org_label required">姓名</h3>
                                        <label for="applyName"></label>
                                        <input
                                            type="text"
                                            name="applyName"
                                            id="applyName"
                                            title="applyName"
                                            size="61"
                                            placeholder=""
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入姓名",
                                                pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                                            })} />
                                        <div className="warning">
                                            {errors.applyName && '不可含特殊字元'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">E-mail</div>
                                        <label for="applyName"></label>
                                        <input
                                            onBlur={e => setLoginEmail(e.target.value)}
                                            type="text"
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
                                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/,
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
                                        <div className="org_label required">聯絡電話</div>
                                        <label for="tel"></label>
                                        <input
                                            type="tel"
                                            name="tel"
                                            id="tel"
                                            title="tel"
                                            placeholder="例如: 02-66308000#216"
                                            size="61"
                                            maxLength="20"
                                            aria-required="true"
                                            // ref={register({ required: true })} 
                                            ref={register({
                                                required: "請輸入聯絡電話",
                                                pattern: /^(0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+))?$/,
                                                minLength: {
                                                    value: 9,
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">例如: 02-66308000#216</h4>  */}
                                        <div className="warning">

                                            {errors.tel && "電話不符/未填寫"}&emsp;

                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">行動電話</div>
                                        <label for="mobile"></label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            id="mobile"
                                            title="mobile"
                                            size="61"
                                            maxLength="10"
                                            placeholder="例如: 09XXXXXXXX"
                                            ref={register({
                                                pattern: /^09[0-9]+$/,
                                                minLength: {
                                                    value: 10,
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">例如: 09XXXXXXXX</h4> */}
                                        <div className="warning">
                                            {errors.mobile && "行動電話格式不符"}
                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">聯絡傳真</div>
                                        <label for="faxNumber"></label>
                                        <input
                                            type="tel"
                                            name="faxNumber"
                                            id="faxNumber"
                                            title="faxNumber"
                                            placeholder="例如: 02-66308000"
                                            size="61"
                                            maxLength="13"
                                            // ref={register({ required: true })} 
                                            ref={register({
                                                minLength: {
                                                    value: 9,
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">例如: 02-66308000</h4> */}
                                        <div className="warning">
                                            {errors.faxNumber && "聯絡傳真格式不符"}&emsp;
                                        </div>
                                    </div>

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">聯絡地址</div>
                                        <div className="city-selector-set-has-value city-select-withInput" data-has-zipcode data-standard-words>
                                            <div className="city-select-wrapper">
                                                <select className={contectCityId !== "0" ? "county signUp-addr-select changed" : "county signUp-addr-select"} title="縣市" onChange={(e) => {
                                                    setContectCityId(getCityId(e.target.value))
                                                }}></select>
                                                <select className={contectZipCode !== "0" ? "district signUp-addr-select changed" : "district signUp-addr-select"} title="區域" onChange={OnSelectContectChange}></select>
                                            </div>
                                            <label for="contectAddr"></label>
                                            <input
                                                type="text"
                                                name="contectAddr"
                                                id="contectAddr"
                                                title="contectAddr"
                                                maxLength="50"
                                                minLength="4"
                                                size="35"
                                                placeholder=""
                                                aria-required="true"
                                                ref={register({
                                                    required: "請輸入聯絡地址",
                                                })} />
                                        </div>
                                        <div className="warning">
                                            {errors.contectAddr && '聯絡地址格式不符  '}
                                            {contectSelectErr && '聯絡地址不完整'}
                                        </div>

                                    </div>
                                </div>


                                <div>
                                    <h2 className="org-subtitle">二、申請單位資料</h2>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">統一編號/工廠編號</div>
                                        <label for="unitCode"></label>
                                        <input
                                            name="unitCode"
                                            id="unitCode"
                                            title="unitCode"
                                            placeholder=""
                                            size="61"
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入統一編號/工廠編號",
                                                pattern: /^[0-9]+$/,
                                            })} />
                                        <div className="warning">
                                            {errors.unitCode && '統一編號/工廠編號為數字'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div>
                                        <div className="example-text" onClick={() => { setShowFocus(!showFocus) }}>
                                            <i className="fas fa-question-circle" aria-hidden="true"></i>提醒：如您要響應綠色辦公，請以<span className="warning-text">綠色生活資訊帳號</span>登入，勿申請新帳號，以免無法計入評核成績。</div>
                                    </div>
                                    {showFocus === true && (
                                        <div className="reminder-container">
                                            <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={() => { setShowFocus(false) }}>X</button>
                                            提醒：「響應綠色辦公」目前已開放民間之綠色採購人員權限，貴單位如欲響應綠色辦公，請由貴單位「綠色採購人員（-0帳號管理者）」填寫響應措施表，或由該使用者提供帳號，以供其他人員填寫響應措施表。避免造成重複響應問題。如欲查詢所屬單位綠色採購人員，請撥打系統諮詢專線 02-2361-1999#438。
                                        </div>
                                    )}

                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">單位中文名稱</div>
                                        <label for="unitFullName"></label>
                                        <input
                                            size="61"
                                            name="unitFullName"
                                            id="unitFullName"
                                            title="unitFullName"
                                            placeholder=""
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入單位中文名稱",
                                                pattern: /[\u4E00-\u9FFF]/
                                            })} />
                                        <div className="warning">
                                            {errors.unitFullName && '請輸入中文'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">單位中文簡稱</div>
                                        <label for="unitCHName"></label>
                                        <input
                                            size="61"
                                            name="unitCHName"
                                            id="unitCHName"
                                            title="unitCHName"
                                            placeholder=""
                                            ref={register({
                                                pattern: /[\u4E00-\u9FFF]/
                                            })} />
                                        <div className="warning">
                                            {errors.unitCHName && '請輸入中文'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">單位英文名稱</div>
                                        <label for="unitENName"></label>
                                        <input
                                            size="61"
                                            name="unitENName"
                                            id="unitENName"
                                            title="unitENName"
                                            placeholder=""
                                            ref={register({
                                                pattern: /[A-Za-z]/
                                            })} />
                                        <div className="warning">
                                            {errors.unitENName && '請輸入英文'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">負責人/主管</div>
                                        <label for="manager"></label>
                                        <input
                                            name="manager"
                                            id="manager"
                                            title="manager"
                                            placeholder=""
                                            size="61"
                                            aria-required="true"
                                            ref={register({
                                                required: "請輸入負責人/主管",
                                            })} />
                                        <div className="warning">
                                            {errors.manager && '格式不符'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">單位聯絡電話</div>
                                        <label for="unitTel"></label>
                                        <input
                                            type="tel"
                                            name="unitTel"
                                            id="unitTel"
                                            title="unitTel"
                                            placeholder="例如: 02-66308000#216"
                                            size="61"
                                            maxLength="20"
                                            aria-required="true"
                                            // ref={register({ required: true })} 
                                            ref={register({
                                                pattern: /^((0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+)))|([0-9]) ?$/,
                                                required: "請輸入單位聯絡電話",
                                                minLength: {
                                                    value: 10,
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text"></h4> */}
                                        <div className="warning">
                                            {errors.unitTel && '單位聯絡電話格式不符'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">單位聯絡傳真</div>
                                        <label for="unitFax"></label>
                                        <input
                                            type="tel"
                                            name="unitFax"
                                            id="unitFax"
                                            title="unitFax"
                                            placeholder="例如: 02-66308000"
                                            size="61"
                                            maxLength="13"
                                            // ref={register({ required: true })} 
                                            ref={register({
                                                pattern: /^(0\d{1,3})(?:-)(\d{7,8})?$/,
                                                minLength: {
                                                    value: 9,
                                                }
                                            })}
                                        />
                                        {/* <h4 className="example-text">例如: 02-66308000</h4> */}
                                        <div className="warning">
                                            {errors.unitFax && '單位聯絡傳真格式不符'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">備用E-mail</div>
                                        <label for="unitMail"></label>
                                        <input
                                            name="unitMail"
                                            id="unitMail"
                                            title="unitMail"
                                            placeholder=""
                                            size="61"
                                            ref={register({
                                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                            })} />
                                        <div className="warning">
                                            {errors.unitMail && '備用E-mail格式不符'}
                                        </div>
                                        {/* register an input */}
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label">網址</div>
                                        <label for="unitHref"></label>
                                        <input
                                            name="unitHref"
                                            id="unitHref"
                                            title="unitHref"
                                            placeholder=""
                                            size="61"
                                            ref={register({
                                                pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
                                            })} />
                                        <div className="warning">
                                            {errors.unitHref && '網址格式不符'}
                                        </div>
                                    </div>
                                    <div className="input-wrapper-signUp">
                                        <div className="org_label required">登記地址</div>
                                        <div className="city-selector city-select-withInput" data-has-zipcode data-standard-words>
                                            <div className="city-select-wrapper">
                                                <select className={unitCityId !== "0" ? "county signUp-addr-select changed" : "county signUp-addr-select"} title="縣市" onChange={(e) => {
                                                    setUnitCityId(getCityId(e.target.value))
                                                }}></select>
                                                <select className={zipCode !== "0" ? "district changed signUp-addr-select" : "district signUp-addr-select"} title="區域" onChange={OnSelectChange}></select>
                                            </div>
                                            <label for="unitAddr"></label>
                                            <input
                                                type="text"
                                                name="unitAddr"
                                                id="unitAddr"
                                                title="unitAddr"
                                                maxLength="50"
                                                minLength="4"
                                                size="35"
                                                placeholder=""
                                                aria-required="true"
                                                ref={register({
                                                    required: "請輸入單位登記地址",
                                                })} />
                                        </div>
                                        {/* register an input */}
                                        <div className="warning">
                                            {errors.unitAddr && '單位登記地址格式不符  '}
                                            {citySelectErr && '單位登記地址不完整'}
                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <div className="input-wrapper-signUp">
                                        <h2 className="org-valid-title required">三、請輸入驗證碼</h2>
                                        {/* <div className="d-flex"> */}
                                        <div className="verify-btn-input">
                                            <label for="verify"></label>
                                            <input
                                                className="valid-num-input-comp"
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
                                        {/* </div> */}
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

export default withRouter(CompanySignUp);