import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { YearPicker, DayPicker } from 'react-dropdown-date';
import { clickLogout, formatDate } from '../../utils/Functions';
import "../Info.scss";
import ImageUploading from 'react-images-uploading';
import ComfirmAlert from '../../Components/ComfirmAlert';
import { useForm } from 'react-hook-form';
import greenMan from "../../images1/greenMan/greenMan.png";

import OutsideAlerter from '../../Components/OutsideEdit';
import { clickRecord, traceRecord, getMemberProfile } from '../../utils/API';
import { useCookies } from "react-cookie";
import { AuthContext } from '../../utils/Context';
import Compressor from 'compressorjs';


function Edit(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const { setContextMemberInfo, } = useContext(AuthContext);

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [showLeaveAlert, setShowLeaveAlert] = useState(false);
    const [leaveAlertTitle, setLeaveAlertTitle] = useState("");

    const [year, setYear] = useState("");
    const [memberData, setMemberData] = useState([]);

    const [images, setImages] = useState([]);
    const [imageUpload, setImageUpload] = useState("");
    const [picHref, setPicHref] = useState("");

    // const [nickName, setNickName] = useState("");
    const [gender, setGender] = useState("");
    const [intro, setIntro] = useState("");

    const [headPic, setHeadPic] = useState("")
    const [onEdited, setOnEdited] = useState(false)

    const [genderErr, setGenderErr] = useState(false)
    const [yearErr, setYearErr] = useState(false)

    const firstLogin = Boolean(props.location.state?.haveData === false)


    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);


    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identityType = greenlifeCookies.identityType || ""

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });


    //點閱計數API
    useEffect(() => {
        console.log(props.location.state?.haveData)
        clickRecord("EF11AE92-2128-40B2-A41C-983D2FF2602F", "18", collector)
    }, [collector]);


    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList[0]);
        setOnEdited(true)
        setImages(imageList);
        if (imageList[0]) {
            setImageUpload(imageList[0].data_url)
        }
        if (imageList[0]) {
            if (imageList[0].file.size < 2500000) {
                if (imageList[0]) {
                    setImageUpload(imageList[0].data_url)
                }
            } else {
                //照片大於2.5MB的話, 壓縮照片到原本的0.1倍
                new Compressor(imageList[0].file, {
                    quality: 0.1,
                    success(result) {
                        console.log(result)
                        // blob轉成base64
                        var reader = new FileReader();
                        reader.readAsDataURL(result);
                        reader.onloadend = function () {
                            var base64data = reader.result;
                            setImageUpload(base64data);
                        }
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            }
        }

    };

    const onError = (errors, files) => {
        if (errors.maxFileSize) {
            setShowDialog(true)
            setAlertTitle("檔案需小於 10MB")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案大小超過 10MB", myHeaders)
        } else if (errors.acceptType) {
            setShowDialog(true)
            setAlertTitle("檔案格式僅限：gif, bmp, svg, png, jpg")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案格式不符", myHeaders)
        } else {
            console.log("other Error")
        }
    }

    useEffect(() => {
        if (firstLogin) {
            //第一次登入, 提醒填寫必填欄位
            setTimeout(function () {
                setLeaveAlertTitle("請填寫必填欄位：  Email、暱稱、出生年、性別 ")
                setShowLeaveAlert(false)
            }, 100)
        }
    }, [leaveAlertTitle])

    //編輯個人資訊
    const submit = (data) => {

        //性別沒填就顯示警語

        if (!gender) {
            setGenderErr(true)
        } else {
            setGenderErr(false)
        }
        //年份沒填就顯示警語
        if (!year) {
            setYearErr(true)
        } else {
            setYearErr(false)
        }
        //有性別跟年份值才能更新資料
        if (gender && year) {
            setGenderErr(false)
            setYearErr(false)

            window.scrollTo(0, 0)
            // console.log(imageUpload)
            if (onEdited) {
                fetch(`${SSL}//${domain}/api/api/Member/Profile`, {
                    method: 'POST',
                    body: serialize({
                        Gender: String(gender),
                        Birth_Year: String(year),
                        Introduction: encodeURIComponent(intro) || "",
                        PictureBase64: imageUpload || "",
                        HeadPic: picHref || "",
                        NickName: encodeURIComponent(data.nickName),
                        Email: data.email
                    }),
                    headers: myHeaders
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        console.log(result)
                        console.log(firstLogin)
                        if (result.isSucess) {
                            if (!firstLogin) {
                                setShowDialog(true)
                                setAlertTitle('更新成功')
                                getMemberProfile(collector, memberToken, clickLogout, removeCookie)
                                    .then(result => {
                                        if (result.isSucess) {
                                            setContextMemberInfo(result.resultObject)
                                            if (imageUpload) history.go(0)
                                        }
                                    })

                            }
                            //props.location.state === false 為第一次登入
                            //快速登入的一般帳號（fb, google, 環保集點）回填完導到會員中心看操作說明
                            history.push({
                                pathname: '/member/memberCenter',
                                state: { firstLogin: firstLogin }
                            });
                        } else {
                            setAlertTitle(result.userMsg || '更新失敗')
                            setShowDialog(true)
                        }

                    });
            } else {
                setShowDialog(true)
                setAlertTitle('您尚未更動')
                setTimeout(function () {
                    setAlertTitle('您尚未更動 ')
                }, 100)
            }
        }
    }

    useEffect(() => {

        //單一會員詳細資料

        fetch(`${SSL}//${domain}/api/api/Member/Profile`, {
            method: 'GET',
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
                console.log(result)
                setMemberData(result.resultObject)
                setHeadPic(result.resultObject.headPic)
                localStorage.setItem('headPic', result.resultObject.headPic);
                // setNickName(result.resultObject.name)
                setIntro(result.resultObject.introduction === null ? "" : result.resultObject.introduction)
                setGender(String(result.resultObject.gender))
                setPicHref(result.resultObject.headPic === null ? "" : result.resultObject.headPic)

                setYear(result.resultObject.birth_Year)
            });

    }, []);

    const { register, errors, handleSubmit, watch } = useForm({});

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {showLeaveAlert && <ComfirmAlert key={showLeaveAlert} subTitle=" " alertTitle={leaveAlertTitle} showLoginBtn={false} history={props.history} />}
            {/* <BreadCrumb currentPage={"帳號資料編輯"} /> */}
            {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}
            <OutsideAlerter firstLogin={firstLogin} setShowLeaveAlert={setShowLeaveAlert} setLeaveAlertTitle={setLeaveAlertTitle} identityType={identityType}>

                <h2 className="dark-grey bold mb-3">帳號資料編輯</h2>
                <div>
                    <div className="input-wrapper">
                        <label for="greenMan" className="member-info-label">變更頭像</label>
                        {images.length > 0 ?
                            ""
                            :
                            <img className="clip-avatar-edit" src={headPic || greenMan} alt="預設綠寶圖片" title="預設綠寶圖片" />
                        }
                        <div>
                            {/* <button className="upload-btn">上傳照片</button>
                                <h6 className="upload-note">照片解析度400*400，檔案小於2MB</h6> */}

                            <ImageUploading
                                multiple
                                maxFileSize="10485760"
                                value={images}
                                onChange={onChange}
                                onError={onError}
                                maxNumber={1}
                                acceptType={["gif", "bmp", "svg", "png", "jpg", "jpeg"]}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps
                                }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper d-flex">
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image.data_url} alt="image_url" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                    <button className="update-btn" onClick={() => onImageUpdate(index)}>更換</button>
                                                    <button className="remove-btn" onClick={() => onImageRemove(index)}>移除</button>
                                                </div>
                                            </div>
                                        ))}
                                        <div>
                                            <button
                                                className="upload-btn"
                                                style={isDragging ? { color: "red" } : null}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                上傳照片
                                            </button>
                                            <h6 className="upload-note">照片解析度400*400，檔案小於5MB</h6>

                                        </div>

                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label for="email" className="member-info-label required">Email</label>
                        <input type="email" name="email" id="email" onBlur={e => {
                            // setNickName(e.target.value)
                            setOnEdited(true)
                        }} style={{ width: "100%" }} defaultValue={memberData.email} placeholder={memberData.email ? memberData.email : "請輸入email"}
                            aria-required="true"
                            ref={register({
                                required: "請輸入email",
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            })}
                            className={(memberData.accountTypeId === 1 || memberData.accountTypeId === 3) && "readonly-color"}
                            readOnly={memberData.accountTypeId === 1 || memberData.accountTypeId === 3}
                        />
                        <div className="warning">
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label for="nickName" className="member-info-label required">暱稱</label>
                        <input type="text" name="nickName" id="nickName"
                            onBlur={e => {
                                // setNickName(e.target.value)
                                setOnEdited(true)
                            }}
                            style={{ width: "100%" }}
                            defaultValue={memberData.nickName}
                            placeholder={memberData.nickName || "請輸入暱稱"}
                            aria-required="true"
                            ref={register({
                                required: "請輸入暱稱",
                                pattern: /[a-zA-Z0-9\u4E00-\u9FFF]+$/,
                                maxLength: {
                                    value: 20,
                                    message: "暱稱需小於20個字元 不可包含特殊符號"
                                }
                            })}

                        />

                    </div>

                    {memberData?.accountTypeId === 1 &&
                        <div className="input-wrapper">
                            <label className="member-info-label">密碼</label>
                            <div className="btn-note-wrapper">
                                <Link to="/resetPassword" className="upload-btn">變更密碼</Link>
                                <h6 className="upload-note">前次變更密碼日期：{formatDate(memberData.lastEditPwdTime)}</h6>
                            </div>
                        </div>}

                    <div className="input-wrapper">
                        <label className="member-info-label required">出生年</label>
                        <YearPicker
                            defaultValue={'西元'}
                            reverse                     // default is ASCENDING
                            value={year}     // mandatory
                            onChange={(year) => {
                                setYear(year)
                                setOnEdited(true)
                            }}
                            id={'year'}
                            name={'year'}
                            classes={'classes info-drop'}
                            optionClasses={'option classes'}
                        />
                        {/* <select className="info-drop" value={month || ""} name="month" onChange={(e) => {
                            setMonth(e.target.value)
                            setOnEdited(true)
                        }}>
                            <option value="0">月</option>
                            <option value="1">1月</option>
                            <option value="2">2月</option>
                            <option value="3">3月</option>
                            <option value="4">4月</option>
                            <option value="5">5月</option>
                            <option value="6">6月</option>
                            <option value="7">7月</option>
                            <option value="8">8月</option>
                            <option value="9">9月</option>
                            <option value="10">10月</option>
                            <option value="11">11月</option>
                            <option value="12">12月</option>
                        </select>
                        <DayPicker
                            defaultValue={'日'}
                            year={year}    // mandatory
                            endYearGiven              // mandatory if end={} is given in YearPicker
                            value={day || ""}    // mandatory
                            onChange={(day) => {
                                setDay(day)
                                setOnEdited(true)
                            }}
                            id={'day'}
                            name={'day'}
                            classes={'classes info-drop'}
                            optionClasses={'option classes'}
                        /> */}
                        <div>
                            <div className="warning">
                                {yearErr && '請選擇出生年'}
                            </div>
                        </div>
                        <i className="fas fa-lock" aria-hidden="true"></i><h6>不公開</h6>
                    </div>

                    <div className="input-wrapper">
                        <label for="性別" className="member-info-label required">性別</label>
                        <label><input type="radio" id="性別"
                            onChange={e => {
                                setGender(String(e.target.value))
                                setOnEdited(true)

                            }} name="性別" value="1" checked={gender === "1"} />
                            男</label>
                        <label for="性別"><input type="radio" onChange={e => {
                            setGender(String(e.target.value))
                            setOnEdited(true)
                        }} name="性別" value="0" checked={gender === "0"} />
                            女</label>
                        <label for="性別"><input type="radio" onChange={e => {
                            setGender(String(e.target.value))
                            setOnEdited(true)
                        }} name="性別" value="2" checked={gender === "2"} />
                            不公開</label>
                        <div className="warning">
                            {genderErr && '請選擇您的性別'}
                        </div>
                        {/* <input type="radio" onChange={e => {
                                setGender(String(e.target.value))
                                setOnEdited(true)
                            }} name="不公開" value="2" checked={gender === "2"}></input>
                            <label>不公開</label> */}
                    </div>

                    <div className="input-wrapper">
                        <div className="member-info-label">
                            <label className="">個人簡介</label>
                            <p className="intro-note">(需小於150個字元)</p>
                        </div>
                        <textarea name="intro" onBlur={e => {
                            setIntro(e.target.value)
                            setOnEdited(true)
                        }}
                            className="intro-text"
                            type="text"
                            defaultValue={memberData.introduction}
                            placeholder={memberData.introduction || "請輸入個人簡介"}
                            maxLength="150"
                            ref={register({
                                maxLength: {
                                    value: 150,
                                    message: "需小於150個字元"
                                }
                            })}
                        >
                        </textarea>
                        <div className="warning">
                            {errors.intro && <p>{errors.intro.message}</p>}
                        </div>
                    </div>
                    <div className="warning-edit">
                        {errors.nickName && <p>暱稱需小於20個字元 不可包含特殊符號</p>}
                    </div>
                    <div className="input-wrapper info-btn-wrapper">
                        <button onClick={handleSubmit(submit)} className="upload-btn btn">儲存設定</button>
                        <Link to="/member/memberCenter?sortType=6" onClick={(e) => {
                            if (firstLogin)
                                e.preventDefault()
                        }}>
                            <button className="info-canel-btn btn">取消</button>
                        </Link>
                    </div>

                    {/* <div className="input-wrapper auth-wrapper">
                            <label className="member-info-label-auth">申請/編輯其他帳號權限</label>
                            <Link className="auth-btn" to="/member/government_auth">
                                <div>
                                    <img className="company" src={govIcon} />

                                    <h4>政府機關</h4>
                                </div>
                            </Link>
                            <Link className="auth-btn" to="/member/company_auth">
                                <div>
                                    <img className="company" src={compIcon} />

                                    <h4>民間企業</h4>
                                </div>
                            </Link>
                        </div> */}


                </div>


            </OutsideAlerter>


        </>
    );
}

export default withRouter(Edit);