import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { clickLogout } from '../../utils/Functions';
import { getCityDrop, getDistrictDrop, getMemberProfile } from '../../utils/API';
import "../Info.scss";
import ImageUploading from 'react-images-uploading';

import ComfirmAlert from '../../Components/ComfirmAlert';
import greenMan from "../../images1/greenMan/greenMan.png";

import { clickRecord, traceRecord } from '../../utils/API';
import { useCookies } from "react-cookie";
import { AuthContext } from '../../utils/Context';

function Edit(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [memberData, setMemberData] = useState([]);


    const [images, setImages] = useState([]);
    const [imageUpload, setImageUpload] = useState("");
    const [picHref, setPicHref] = useState("");

    const [headPic, setHeadPic] = useState("")
    const [onEdited, setOnEdited] = useState(false)


    const [unitCityId, setUnitCityId] = useState("");
    const [unitAddrCode, setUnitAddrCode] = useState("");

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identityType = greenlifeCookies.identityType || ""
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const { setContextMemberInfo, } = useContext(AuthContext);

    // const identityType = props.location.state.identityType
    //const identityType = "2"

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList[0].data_url);
        setOnEdited(true)
        setImages(imageList);
        if (imageList[0]) {
            setImageUpload(imageList[0].data_url)
        }

    };

    //點閱計數API
    useEffect(() => {
        if (identityType === "2") {
            clickRecord("5C078860-1ECA-467F-90C2-BAB2FA15A286", "18", collector)
        } else if (identityType === "4") {
            clickRecord("33337AC0-2F5C-4807-A0D6-3167D5B6D4A1", "18", collector)
        }
    }, [identityType, collector]);

    const onError = (errors, files) => {
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
                setPicHref(result.resultObject.headPic === null ? "" : result.resultObject.headPic)
                setUnitCityId(result.resultObject.unitCityId)
                setUnitAddrCode(result.resultObject.unitAddrCode)
            });
    }, [SSL, domain, collector]);


    const [cityDrop, setCityDrop] = useState([])
    //城市下拉選單
    useEffect(() => {
        getCityDrop(setCityDrop)
    }, []);

    const [district, setDistrict] = useState([])
    //行政區下拉選單
    useEffect(() => {
        if (unitCityId)
            getDistrictDrop(unitCityId, setDistrict)
    }, [unitCityId]);


    const { register, errors, handleSubmit } = useForm({});

    //編輯個人資訊
    const onSubmit = async (data) => {
        setShowDialog(true)

        if (onEdited) {
            fetch(`${SSL}//${domain}/api/api/Member/Profile`, {
                method: 'POST',
                body: serialize({
                    HeadPic: picHref,
                    PictureBase64: imageUpload || "",
                    UnitCode: data.unitCode || memberData.unitCode,
                    UnitFullName: data.unitFullName || memberData.unitFullName,
                    Name: encodeURIComponent(data.name) || encodeURIComponent(memberData.name),
                    Email: data.email || memberData.email,
                    Tel: data.tel || memberData.tel,
                    UnitCityId: unitCityId || memberData.unitCityId,
                    UnitAddrCode: unitAddrCode || memberData.unitAddrCode,
                    UnitAddr: data.unitAddr || memberData.unitAddr
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        setShowDialog(true)
                        setAlertTitle('更新成功')
                        getMemberProfile(collector, memberToken, clickLogout, removeCookie)
                            .then(result => {
                                console.log(result)
                                if (result.isSucess) {
                                    setContextMemberInfo(result.resultObject)
                                }
                            })
                        // history.push('/member/memberCenter');
                    } else {
                        setShowDialog(true)
                        setAlertTitle(result.userMsg || '更新失敗')
                    }

                });
        } else {
            setShowDialog(true)
            setAlertTitle('您尚未更動')
            setTimeout(function () {
                setAlertTitle('您尚未更動 ')
            }, 100)
        }

        // GovSignUp(data.email, data.verify, identityType, data.password, data.unitCode, data.unitFullName, data.applyName, data.telNumber, unitCityId, zipCode, data.address, setShowText, history)

    };


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle="" alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {/* <BreadCrumb currentPage={identityType === "2" ? '公家機關帳號申請' : "學校單位帳號申請"} />
            <div className="container member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-12 col-lg-8">
                <h2 className="dark-grey bold mb-3">{identityType === "2" ? '公家機關帳號編輯' : "學校單位帳號編輯"}</h2>
                <div>
                    <div className="input-wrapper">
                        <label className="member-info-label org">變更頭像</label>
                        {images.length > 0 ?
                            ""
                            :
                            <img className="clip-avatar-edit" src={headPic ? headPic : greenMan} alt="會員頭貼" />
                        }
                        <div>
                            {/* <button className="upload-btn">上傳照片</button>
                                <h6 className="upload-note">照片解析度400*400，檔案小於2MB</h6> */}

                            <ImageUploading
                                multiple
                                maxFileSize="5242880"
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
                                                <img src={image.data_url} width="100" alt="image_url" />
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
                        <label for="unitCode" className="member-info-label org required">機關代碼</label>
                        <input
                            type="text"
                            className="input-pbSignUp readonly-color"
                            name="unitCode"
                            id="unitCode"
                            ref={register({
                                // pattern: /-0$/,
                                required: "請輸入機關代碼",
                            })}
                            readOnly
                            defaultValue={memberData.unitCode}
                            placeholder={memberData.unitCode || ""}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label for="unitFullName" className="member-info-label org required">機關名稱全銜</label>
                        <input
                            type="text"
                            className="input-pbSignUp"
                            name="unitFullName"
                            id="unitFullName"
                            ref={register({
                                required: "請輸入機關名稱全銜",
                                maxLength: {
                                    value: 40,
                                    required: "請輸入機關名稱全銜",
                                }
                            })}
                            onChange={(e) => setOnEdited(true)}
                            defaultValue={memberData.unitFullName}
                            placeholder={memberData.unitFullName || ""}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label for="name" className="member-info-label org required">承辦人姓名</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            size="32"
                            ref={register({
                                required: "請輸入承辦人姓名",
                                pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                            })}
                            onChange={(e) => setOnEdited(true)}
                            defaultValue={memberData.name}
                            placeholder={memberData.name || ""}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label for="email" className="member-info-label org required">承辦人E-mail</label>
                        <input
                            type="email"
                            className="readonly-color"
                            name="email"
                            id="email"
                            size="32"
                            ref={register({
                                required: "請輸入email",
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            })}
                            readOnly
                            defaultValue={memberData.email}
                            placeholder={memberData.email || ""}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label for="tel" className="member-info-label org required">承辦人聯絡電話</label>
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder={memberData.tel || ""}
                            size="15"
                            maxLength="20"
                            ref={register({
                                pattern: /^(0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+))?$/,
                                required: "請輸入聯絡電話",
                                minLength: {
                                    value: 9,
                                }
                            })}
                            onChange={(e) => setOnEdited(true)}
                            defaultValue={memberData.tel}
                        />
                    </div>


                    <div className="input-wrapper city-select-withInput">
                        <label for="unitAddr" className="member-info-label org required">機關地址</label>
                        <div className="city-select-wrapper">
                            <select value={unitCityId} onChange={e => {
                                setUnitCityId(e.target.value)
                                setOnEdited(true)
                            }}>
                                <option value="">請選擇</option>
                                {cityDrop.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>
                            <select value={unitAddrCode} onChange={e => {
                                setUnitAddrCode(e.target.value)
                                setOnEdited(true)
                            }}>
                                <option value="">請選擇</option>
                                {district.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>
                        </div>
                        <input
                            type="text"
                            name="unitAddr"
                            id="unitAddr"
                            maxLength="50"
                            minLength="4"
                            placeholder={memberData.unitAddr || ""}
                            defaultValue={memberData.unitAddr}
                            ref={register({
                                required: "請輸入單位登記地址",
                            })}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>

                    <div className="input-wrapper info-btn-wrapper">
                        <button onClick={handleSubmit(onSubmit)} className="upload-btn btn">儲存設定</button>
                        <Link to="/member/memberCenter?sortType=6"><button className="info-canel-btn btn">取消</button></Link>
                    </div>



                </div>

            </div>
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(Edit);