import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { formatDateTime } from "../utils/Functions"
import "./Info.scss";
import ComfirmAlert from '../Components/ComfirmAlert';
import { useForm } from 'react-hook-form';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import JoditEditor from "jodit-react";
import ImageUploading from 'react-images-uploading';
import greenMan from "../images1/greenMan/greenMan.png";
import { Form } from 'react-bootstrap';
import config from '../utils/JoditConfig';
import { clickRecord, getCityDrop, getDistrictDrop, traceRecord } from '../utils/API';
import { useCookies } from "react-cookie";
// import logoutIcon from "../images1/login/signUp-normal.png"

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const InfoSideMenu = React.lazy(() => import('./InfoSideMenu'));



function ActivityUpload(props) {
    const editor = useRef(null)


    config.placeholder = "請輸入活動簡介(5,000字以內)"

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    //序列化回傳資料-取代JSON.stringify()
    var serialize = require('serialize-javascript');
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identityType = greenlifeCookies.identityType || ""

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const [images, setImages] = useState([]);
    const [imageUpload, setImageUpload] = useState("");
    const [activityThemeId, setActivityThemeId] = useState([]);
    const [cityId, setCityId] = useState("");
    const [startDatetime, setStartDatetime] = useState("");
    const [anotherStartDatetime, setAnotherStartDatetime] = useState("");
    const [addrCode, setAddrCode] = useState("");

    const { register, errors, handleSubmit } = useForm({});


    const [intro, setIntro] = useState("");
    const [anotherTimeDrop, setAnotherTimeDrop] = useState(false);


    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        if (imageList[0]) {
            setImageUpload(imageList[0].data_url)
        }
    };


    //點閱計數API
    useEffect(() => {
        clickRecord("6E9B601E-42F4-49A8-8584-4677BA58154C", "5", collector)
    }, [collector]);

    //提交上傳表單
    const submit = (data) => {
        console.log(data)
        console.log(formatDateTime(data.anotherStartDatetime) + "," + formatDateTime(data.anotherEndDatetime))
        console.log(intro, addrCode, String(activityThemeId))
        var agreeCheckbox = document.querySelector('input#agreement[type=checkbox]:checked')
        if (!agreeCheckbox) {
            alert('請勾選同意授權')
        } else {
            window.scrollTo(0, 0)
            setShowDialog(true)
            setAlertTitle('送出中~')

            fetch(`${SSL}//${domain}/api/api/Activity/Add`, {
                method: 'POST',
                body: serialize({
                    Title: data.title,
                    Introduction: intro,
                    Organizer: data.organizer,
                    OrganizerInfo: data.organizerInfo,
                    StartDatetime: formatDateTime(data.startDatetime),
                    EndDatetime: formatDateTime(data.endDatetime),
                    AnotherDatetime: data.anotherStartDatetime && data.anotherEndDatetime && formatDateTime(data.anotherStartDatetime) + "," + formatDateTime(data.anotherEndDatetime),
                    Href: data.href,
                    CityId: data.cityId,
                    AddrCode: addrCode,
                    Addr: data.addr,
                    TypeId: data.typeId,
                    ThemeId: String(activityThemeId),
                    AddrDesc: data.addressDesc,
                    PictureBase64: imageUpload,
                }),
                headers: myHeaders
            })
                .then(res => {
                    console.log(res)
                    return res.json();
                }).then(result => {
                    console.log(result)
                    if (result.isSucess) {
                        setShowDialog(true)
                        setAlertTitle("活動已送出，審核期程約3個工作天，請耐心等候")
                        setTimeout(function () {
                            history.push('/member/memberCenter?sortType=6');
                        }, 1000)
                    } else {
                        setShowDialog(true)
                        setAlertTitle(result.userMsg)
                        setTimeout(function () {
                            setAlertTitle(result.userMsg + " ")
                        }, 100)
                    }

                });

        }
    }

    //縣市下拉選單API
    const [dropDown, setDropDown] = useState([]);
    useEffect(() => {
        getCityDrop(setDropDown)
    }, [])

    const [districtDrop, setDistrictDrop] = useState([]);
    //行政區下拉選單
    useEffect(() => {
        if (cityId)
            getDistrictDrop(cityId, setDistrictDrop)
    }, [cityId]);

    //活動主題下拉選單API
    const [dropDownTheme, setDropDownTheme] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Activity/Theme/List`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDropDownTheme(result.resultObject)
                console.log(result)
            });
    }, [SSL, domain])




    var arrayCheck = []
    const getThemeCheck = () => {
        var chks = document.querySelectorAll('input#themeCheckbox0[type=checkbox]:checked, input#themeCheckbox1[type=checkbox]:checked, input#themeCheckbox2[type=checkbox]:checked, input#themeCheckbox3[type=checkbox]:checked, input#themeCheckbox4[type=checkbox]:checked, input#themeCheckbox5[type=checkbox]:checked, input#themeCheckbox6[type=checkbox]:checked, input#themeCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setActivityThemeId(arrayCheck)
        }
        // history.push(`/categories/green_office/participate?page=${page}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chks.length === 0 && setActivityThemeId([])
    }

    const onError = (errors, files) => {
        console.log(errors, files)
        if (errors.maxFileSize) {
            setShowDialog(true)
            setAlertTitle("檔案需小於 5MB")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案大小超過 5MB", myHeaders)
        } else if (errors.acceptType) {
            setShowDialog(true)
            setAlertTitle("檔案格式僅限：gif, bmp, svg, png, jpg")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案格式不符", myHeaders)
        } else {
            console.log("other Error")
        }
    }

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            <BreadCrumb currentPage={"活動上傳"} />

            <div className="container member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} />

                <div className="col-sm-12 col-md-10 col-lg-9">
                    <h2 className="dark-grey bold mb-3">活動上傳</h2>
                    <div>
                        <div className="input-wrapper">
                            <label className="member-info-label">封面照片</label>
                            {images.length > 0 ?
                                ""
                                :
                                <img width="10%" src={greenMan} alt="上傳圖片示意位置" />
                            }
                            <div>
                                {/* <button className="upload-btn">上傳照片</button>
                                <h6 className="upload-note">照片解析度400*400，檔案小於2MB</h6> */}

                                <ImageUploading
                                    multiple
                                    maxFileSize="5000000"
                                    value={images}
                                    onChange={onChange}
                                    onError={onError}
                                    maxNumber={1}
                                    acceptType={["gif", "bmp", "svg", "png", "jpg"]}
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
                                                    <img src={image.data_url} alt="img_url" width="100" />
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
                            <label for="title" className="member-info-label required">活動名稱</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                style={{ width: "100%" }}
                                placeholder="請輸入活動名稱(100字以內)"
                                ref={register({
                                    required: "請輸入活動名稱",
                                    maxLength: {
                                        value: 100,
                                        message: "字數須在100字以內"
                                    }
                                })}
                            ></input>
                        </div>

                        <div className="input-wrapper">

                            <label for="startDatetime" className="member-info-label required">活動開始時間</label>
                            <div className="time-label-wrapper">
                                <input
                                    className="startDatetime"
                                    type="datetime-local"
                                    name="startDatetime"
                                    id="startDatetime"
                                    ref={register({
                                        required: "請選擇時間",
                                    })}
                                    onBlur={(e) => setStartDatetime(e.target.value)}
                                ></input>
                            </div>
                            <div className="time-label-wrapper">
                                <label for="endDatetime" className="member-info-label required">活動結束時間</label>
                                <input
                                    className="endDatetime"
                                    type="datetime-local"
                                    name="endDatetime"
                                    id="endDatetime"
                                    min={startDatetime}
                                    ref={register({
                                        required: "請選擇時間",
                                    })}
                                ></input>
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <button className="upload-btn btn" onClick={() => setAnotherTimeDrop(!anotherTimeDrop)}>{anotherTimeDrop ? "取消" : "新增時間"}</button>
                        </div>
                        {anotherTimeDrop &&
                            <div className="input-wrapper">
                                <label for="anotherStartDatetime" className="member-info-label">其他開始時間</label>
                                <div className="time-label-wrapper">
                                    <input
                                        className="startDatetime"
                                        type="datetime-local"
                                        name="anotherStartDatetime"
                                        id="anotherStartDatetime"
                                        ref={register({
                                            required: "請選擇時間",
                                        })}
                                        onBlur={(e) => setAnotherStartDatetime(e.target.value)}
                                    ></input>
                                </div>                          <div className="time-label-wrapper">
                                    <label for="anotherEndDatetime" className="member-info-label">其他結束時間</label>
                                    <input
                                        className="endDatetime"
                                        type="datetime-local"
                                        name="anotherEndDatetime"
                                        id="anotherEndDatetime"
                                        min={anotherStartDatetime}
                                        ref={register({
                                            required: "請選擇時間",
                                        })}
                                    ></input>
                                </div>
                            </div>
                        }


                        <div className="input-wrapper">
                            <label for="organizer" className="member-info-label required">主辦單位</label>
                            <input
                                type="text"
                                maxLength="50"
                                name="organizer"
                                id="organizer"
                                style={{ width: "100%" }}
                                placeholder="請輸入主辦單位(50字以內)"
                                ref={register({
                                    required: "請輸入主辦單位",
                                    maxLength: {
                                        value: 50,
                                        message: "字數須在50字以內"
                                    }
                                })}
                            ></input>
                        </div>
                        <div className="input-wrapper">
                            <label for="cityId" className="member-info-label required">活動地點</label>

                            <div className="city-select-wrapper">
                                <select
                                    name="cityId"
                                    className="select-auto-width"
                                    onBlur={(e) => setCityId(e.target.value)}
                                    ref={register({
                                        required: "請選擇活動地點",
                                    })}
                                >
                                    <option value="">請選擇</option>
                                    {dropDown.map((dropDown, index) =>
                                        <option key={index} value={dropDown.cityId}>{dropDown.cityName}</option>
                                    )}
                                </select>

                                <select className="signUp-addr-select select-auto-width" value={addrCode} onChange={e => {
                                    setAddrCode(e.target.value)
                                }}>
                                    <option value="">請選擇</option>
                                    {districtDrop.map((fetchData, index) =>
                                        <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                    )}
                                </select>
                            </div>
                            <label for="addr"></label>
                            <input
                                type="text"
                                name="addr"
                                id="addr"
                                maxLength="50"
                                minLength="4"
                                size="40"
                                ref={register({
                                    required: "請輸入地址",
                                })}
                            />

                        </div>
                        <div className="input-wrapper">
                            <label for="addressDesc" className="member-info-label">詳細地點</label>
                            <input
                                type="text"
                                maxLength="50"
                                name="addressDesc"
                                id="addressDesc"
                                style={{ width: "100%" }}
                                placeholder="請輸入詳細地點，如:象山遊客中心...等資訊(50字以內)"
                                ref={register({
                                    maxLength: {
                                        value: 50,
                                        message: "字數須在50字以內"
                                    }
                                })}
                            ></input>
                        </div>
                        <div className="input-wrapper">
                            <label for="organizerInfo" className="member-info-label">聯絡資訊</label>
                            <input
                                type="text"
                                maxLength="50"
                                placeholder="請輸入承辦人姓名、電話、e-mail等資訊(50字以內)"
                                ref={register({
                                    maxLength: {
                                        value: 50,
                                        message: "字數須在50字以內"
                                    }
                                })}
                                name="organizerInfo"
                                id="organizerInfo"
                                style={{ width: "100%" }}
                            ></input>
                        </div>
                        <div className="input-wrapper">
                            <label for="typeId" className="member-info-label required">活動類型</label>
                            <select
                                name="typeId"
                                id="typeId"
                                ref={register({
                                    required: "請選擇活動類型",
                                })}
                            >
                                <option value="">請選擇</option>
                                <option value="1">實體活動</option>
                                <option value="2">線上活動</option>
                            </select>
                        </div>
                        <Form.Group className="input-wrapper" onChange={() => {
                            getThemeCheck()
                        }}>
                            <Form.Label for="themeCheckbox0" className="member-info-label required">活動主題</Form.Label>
                            <div className="theme-checkbox-wrapper">
                                {dropDownTheme.map((dropDown, index) =>
                                    <Form.Check
                                        key={index}
                                        className="theme-checkbox"
                                        type="checkbox"
                                        label={dropDown.themeName}
                                        id={"themeCheckbox" + index}
                                        name="themeCheckbox"
                                        value={dropDown.themeId}
                                    />
                                )}
                            </div>
                        </Form.Group>

                        <div className="input-wrapper">
                            <label for="href" className="member-info-label">相關連結</label>
                            <input
                                type="text"
                                name="href"
                                id="href"
                                style={{ width: "100%" }}
                                placeholder="請輸入網址"
                                ref={register({
                                    pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
                                })}
                            ></input>
                        </div>

                        <div className="input-wrapper">
                            <label className="member-info-label required">活動簡介</label>
                            {/* <CKEditor
                                name="describe"
                                editor={ClassicEditor}
                                data="<p>請輸入活動簡介(2,000字以內)</p>"
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setIntro(data)
                                    console.log({ event, editor, data });
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);

                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            /> */}
                            <JoditEditor
                                ref={editor}
                                value={intro}
                                config={config}
                                // tabIndex={1} // tabIndex of textarea
                                onBlur={e => {
                                    setIntro(e)
                                }}
                            // onChange={e => setTextContent(e)}
                            />
                        </div>
                        <div className="warning">
                            <p>
                                {errors.title ||
                                    errors.openTime ||
                                    errors.startDatetime ||
                                    errors.endDatetime ||
                                    errors.organizer ||
                                    errors.district ||
                                    errors.typeId ||
                                    errors.themeId ||
                                    errors.describe ?
                                    '未填寫' : ""}
                                {errors.title && '【活動名稱】、'}
                                {errors.startDatetime && '【活動開始時間】、'}
                                {errors.endDatetime && '【活動結束時間】、'}
                                {errors.organizer && '【主辦單位】、'}
                                {errors.district && '【活動地區】、'}
                                {errors.typeId && '【活動類型】、'}
                                {errors.themeId && '【活動主題】、'}
                                {errors.describe && '【活動簡介】'}

                                {errors.title ||
                                    errors.openTime ||
                                    errors.startDatetime ||
                                    errors.endDatetime ||
                                    errors.organizer ||
                                    errors.district ||
                                    errors.typeId ||
                                    errors.themeId ||
                                    errors.describe ?
                                    '欄位' : ""}
                            </p>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h6 className="agreement">
                                <label for="agreement"></label>
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    id="agreement"
                                />同意授權本內容及圖片發布於本平台
                            </h6>
                        </div>
                    </div>

                    <div className="input-wrapper info-btn-wrapper-center">
                        <button onClick={handleSubmit(submit)} className="upload-btn btn">送出審核</button>
                        <button className="info-canel-btn btn" onClick={() => history.goBack()}>取消</button>
                    </div>

                </div>
            </div>


            <Footer />

        </>
    );
}

export default withRouter(ActivityUpload);