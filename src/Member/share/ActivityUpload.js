import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { formatDateTime, formatDateTimeDash } from "../../utils/Functions"
import "../Info.scss";
import ComfirmAlert from '../../Components/ComfirmAlert';
import { useForm } from 'react-hook-form';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import JoditEditor from "jodit-react";
import ImageUploading from 'react-images-uploading';
import greenMan from "../../images1/greenMan/greenMan.png";
import { Form } from 'react-bootstrap';
import { myConfig } from '../../utils/JoditConfig';
import { clickRecord, getCityDrop, getDistrictDrop, traceRecord } from '../../utils/API';
import { useCookies } from "react-cookie";
// import logoutIcon from "../images1/login/signUp-normal.png"

function ActivityUpload(props) {
    const editor = useRef(null)

    myConfig.placeholder = "請輸入活動簡介(5,000字以內)"
    myConfig.width = '88%';

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    //序列化回傳資料-取代JSON.stringify()
    var serialize = require('serialize-javascript');

    const params = new URLSearchParams(history.location.search);
    const blogGuid = params.get('edit')
    const editMode = Boolean(params.get('edit'))
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });
    const [errMsg, setErrMsg] = useState("");
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
        console.log(((data.anotherStartDatetime && data.anotherEndDatetime) && formatDateTime(data.anotherStartDatetime) + "," + formatDateTime(data.anotherEndDatetime)) || "",)
        console.log(intro, addrCode, String(activityThemeId))
        var agreeCheckbox = document.querySelector('input#agreement[type=checkbox]:checked')
        if (!agreeCheckbox) {
            setErrMsg('請勾選同意授權')
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
                    OrganizerInfo: data.organizerInfo || "",
                    StartDatetime: formatDateTime(data.startDatetime),
                    EndDatetime: formatDateTime(data.endDatetime),
                    AnotherDatetime: ((data.anotherStartDatetime && data.anotherEndDatetime) && formatDateTime(data.anotherStartDatetime) + "," + formatDateTime(data.anotherEndDatetime)) || "",
                    Href: data.href || "",
                    CityId: String(data.cityId),
                    AddrCode: String(addrCode) || "",
                    Addr: String(data.addr) || "",
                    TypeId: String(data.typeId),
                    ThemeId: String(activityThemeId),
                    AddrDesc: data.addrDesc,
                    PictureBase64: imageUpload || "",
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
                            history.push('/member/BookMarkActivity?name=活動&link=/daily/article&type=1');
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

    //編輯更新內容
    const submitEdit = (data) => {
        fetch(`${props.SSL}//${props.domain}/api/api/Activity/Edit`, {
            method: 'POST',
            body: serialize({
                Title: encodeURIComponent(data.title || blogData.title),
                Introduction: intro || blogData.introduction,
                Organizer: data.organizer || blogData.organizer,
                OrganizerInfo: data.organizerInfo || blogData.organizerInfo,
                StartDatetime: formatDateTime(data.startDatetime || blogData.startDatetime),
                EndDatetime: formatDateTime(data.endDatetime || blogData.endDatetime),
                AnotherDatetime: (data.anotherStartDatetime && data.anotherEndDatetime && formatDateTime(data.anotherStartDatetime) + "," + formatDateTime(data.anotherEndDatetime)) || blogData.anotherDatetime,
                Href: data.href || blogData.href,
                CityId: String(data.cityId || blogData.cityId),
                AddrCode: String(addrCode || blogData.addrCode),
                Addr: data.addr || blogData.addr,
                TypeId: String(data.typeId || blogData.typeId),
                ThemeId: String(activityThemeId),
                AddrDesc: data.addrDesc || blogData.addrDesc,
                Guid: blogGuid,
                PicPath: blogData.picPath || "",
                PictureBase64: imageUpload || "",
            }),
            headers: myHeaders
        })
            .then(res => {
                console.log(res)
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess) {
                    history.push('/member/BookMarkActivity?name=活動&link=/daily/article&type=1')
                }
            });


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
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案大小超過 5MB", myHeaders)
        } else if (errors.acceptType) {
            setShowDialog(true)
            setAlertTitle("檔案格式僅限：gif, bmp, svg, png, jpg")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案格式不符", myHeaders)
        } else {
            console.log("other Error")
        }
    }


    //單一活動內容
    const [blogData, setBlogData] = useState([]);
    useEffect(() => {
        if (editMode)
            fetch(`${props.SSL}//${props.domain}/api/api/Activity/GetSingle`, {
                method: 'POST',
                body: serialize({
                    Guid: blogGuid
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    console.log(res)
                    return res.json();
                }).then(result => {
                    console.log(result)
                    if (result.isSucess) {
                        setBlogData(result.resultObject[0])
                        setCityId(result.resultObject[0].cityId)
                        setActivityThemeId(result.resultObject[0].themes.map(obj => obj.themeId))
                    }
                });
    }, [props.SSL, props.domain]);



    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"活動上傳"} />

            <div className="container member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-sm-12 col-md-10 col-lg-9">
                <h2 className="dark-grey bold mb-3">活動上傳</h2>
                <div>
                    <div className="input-wrapper">
                        <label className="member-info-label">封面照片</label>
                        {images.length > 0 ?
                            ""
                            :
                            editMode ?
                                <img width="30%" src={blogData.picPath} alt="封面圖片" />
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
                        <label for="title" className="member-info-label required">活動名稱</label>
                        <input
                            name="title"
                            id="title"
                            style={{ width: "100%" }}
                            placeholder="請輸入活動名稱(100字以內)"
                            defaultValue={blogData.title}
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
                                defaultValue={blogData.createDatetime}
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
                                defaultValue={blogData.endDatetime}
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
                    {(anotherTimeDrop || blogData.anotherDatetime) &&
                        <div className="input-wrapper">
                            <label for="anotherStartDatetime" className="member-info-label">其他開始時間</label>
                            <div className="time-label-wrapper">
                                <input
                                    className="startDatetime"
                                    type="datetime-local"
                                    defaultValue={formatDateTimeDash(blogData.anotherDatetime?.split(',')[0]) || ""}
                                    name="anotherStartDatetime"
                                    id="anotherStartDatetime"
                                    ref={register()}
                                    onBlur={(e) => setAnotherStartDatetime(e.target.value)}
                                ></input>
                            </div>
                            <div className="time-label-wrapper">
                                <label for="anotherEndDatetime" className="member-info-label">其他結束時間</label>
                                <input
                                    className="endDatetime"
                                    type="datetime-local"
                                    key={blogData.anotherDatetime}
                                    defaultValue={formatDateTimeDash(blogData.anotherDatetime?.split(',')[0]) || ""}
                                    name="anotherEndDatetime"
                                    id="anotherEndDatetime"
                                    min={anotherStartDatetime}
                                    ref={register()}
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
                            defaultValue={blogData.organizer}
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
                                id="cityId"
                                className="select-auto-width"
                                value={cityId}
                                onChange={(e) => setCityId(e.target.value)}
                                ref={register({
                                    required: "請選擇活動地點",
                                })}
                            >
                                <option value="">請選擇</option>
                                <option value="999">全國</option>
                                {dropDown.map((dropDown, index) =>
                                    <option key={index} value={dropDown.cityId}>{dropDown.cityName}</option>
                                )}
                            </select>

                            {cityId !== "999" &&
                                <select className="signUp-addr-select select-auto-width" key={blogData.addrCode} value={addrCode || blogData.addrCode} onChange={e => {
                                    setAddrCode(e.target.value)
                                }}>
                                    <option value="">請選擇</option>
                                    {districtDrop.map((fetchData, index) =>
                                        <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                    )}
                                </select>}
                        </div>
                        {cityId !== "999" &&
                            <>
                                <label for="addr"></label>
                                <input type="text" name="addr" id="addr" defaultValue={blogData.addr} maxLength="50" minLength="4" size="40"
                                    ref={register({
                                        required: "請輸入地址",
                                    })}
                                />
                            </>}
                    </div>
                    <div className="input-wrapper">
                        <label for="addrDesc" className="member-info-label">詳細地點</label>
                        <input
                            type="text"
                            maxLength="50"
                            name="addrDesc"
                            id="addrDesc"
                            defaultValue={blogData.addrDesc}
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
                            name="organizerInfo"
                            id="organizerInfo"
                            defaultValue={blogData.organizerInfo}
                            placeholder="請輸入承辦人姓名、電話、e-mail等資訊(50字以內)"
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                            style={{ width: "100%" }}
                        ></input>
                    </div>
                    <div className="input-wrapper">
                        <label for="typeId" className="member-info-label required">活動類型</label>
                        <select
                            name="typeId"
                            id="typeId"
                            key={blogData.typeId}
                            defaultValue={String(blogData.typeId)}
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
                                    defaultChecked={blogData.themes?.map(obj => obj.themeId).includes(index + 1)}

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
                            defaultValue={blogData.href}
                            placeholder="請輸入網址"
                            ref={register({
                                pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
                            })}
                        ></input>
                    </div>

                    <div className="input-wrapper">
                        <label for="intro" className="member-info-label required">活動簡介</label>
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
                            value={blogData.introduction}
                            config={myConfig}
                            // tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                setIntro(newContent)
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
                    <h6 style={{ color: "red" }}>{errMsg}{errors.content && '請輸入說明欄位'}</h6>
                    {editMode ?
                        <button onClick={handleSubmit(submitEdit)} className="upload-btn btn">送出</button>
                        :
                        <button onClick={handleSubmit(submit)} className="upload-btn btn">送出審核</button>}

                    <button className="info-canel-btn btn" onClick={() => history.goBack()}>取消</button>
                </div>

            </div>
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(ActivityUpload);