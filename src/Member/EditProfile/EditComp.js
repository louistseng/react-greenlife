import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { getCityDrop, getDistrictDrop } from '../../utils/API';
import { useForm } from 'react-hook-form';
import { clickLogout } from '../../utils/Functions';
import "../Info.scss";
import ImageUploading from 'react-images-uploading';
import ComfirmAlert from '../../Components/ComfirmAlert';
import greenMan from "../../images1/greenMan/greenMan.png";

import { clickRecord, traceRecord, getMemberProfile } from '../../utils/API';
import { useCookies } from "react-cookie";
import { AuthContext } from '../../utils/Context';

function Edit(props) {

    let history = useHistory()

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
    const [cityId, setCityId] = useState("");
    const [addrCode, setAddrCode] = useState("");
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
    // const identityType = "3"


    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList[0].data_url);
        setOnEdited(true)
        setImages(imageList);
        if (imageList[0]) {
            setImageUpload(imageList[0].data_url)
        }

    };

    const onError = (errors) => {
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

    //點閱計數API
    useEffect(() => {
        if (identityType === "3") {
            clickRecord("9CBCC2C7-52B6-4778-B649-3DF4E12107DB", "18", collector)
        } else if (identityType === "6") {
            clickRecord("3F75DA73-8829-4ED3-98F0-487636AA1D55", "18", collector)
        } else if (identityType === "5") {
            clickRecord("33337AC0-2F5C-4807-A0D6-3167D5B6D4A1", "18", collector)
        }
    }, [identityType, collector]);

    const [cityDrop, setCityDrop] = useState([])
    const [district, setDistrict] = useState([])
    const [contectCityDrop, setContectCityDrop] = useState([])
    const [contectDistrict, setContectDistrict] = useState([])

    //單位-城市下拉選單
    useEffect(() => {
        getCityDrop(setCityDrop)
        getCityDrop(setContectCityDrop)

    }, []);


    //單位-行政區下拉選單
    useEffect(() => {
        if (unitCityId)
            getDistrictDrop(unitCityId, setDistrict)
    }, [unitCityId]);


    //行政區下拉選單
    useEffect(() => {
        if (cityId)
            getDistrictDrop(cityId, setContectDistrict)
    }, [cityId]);


    useEffect(() => {

        // 單一會員詳細資料
        fetch(`${props.SSL}//${props.domain}/api/api/Member/Profile`, {
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
                // console.log(result)
                setMemberData(result.resultObject)
                setHeadPic(result.resultObject.picture)
                localStorage.setItem('headPic', result.resultObject.picture);
                setPicHref(result.resultObject.picture === null ? "" : result.resultObject.picture)

                setUnitAddrCode(result.resultObject.unitAddrCode)
                setUnitCityId(result.resultObject.unitCityId)
                setAddrCode(result.resultObject.addrCode)
                setCityId(result.resultObject.cityId)

            });

    }, [props.SSL, props.domain]);

    const { register, errors, handleSubmit } = useForm({});


    //編輯個人資訊
    const onSubmit = async (data) => {

        if (onEdited) {
            fetch(`${props.SSL}//${props.domain}/api/api/Member/Profile`, {
                method: 'POST',
                body: serialize({
                    HeadPic: picHref || "",
                    PictureBase64: imageUpload || "",
                    Name: encodeURIComponent(data.name) || encodeURIComponent(memberData.name),
                    Email: data.email || memberData.email,
                    Tel: data.tel || memberData.tel,
                    Mobile: data.mobile || memberData.mobile,
                    Fax: data.fax === memberData.fax ? memberData.fax : data.fax,
                    CityId: cityId || memberData.cityId,
                    AddrCode: addrCode || memberData.addrCode,
                    Addr: data.addr || memberData.addr,
                    UnitCode: data.unitCode || memberData.unitCode,
                    UnitFullName: data.unitFullName || memberData.unitFullName,
                    UnitCHName: data.unitCHName || memberData.unitCHName,
                    UnitENName: data.unitENName || memberData.unitENName,
                    UnitManager: data.unitManager || memberData.unitManager,
                    UnitTel: data.unitTel || memberData.unitTel,
                    UnitFax: data.unitFax || memberData.unitFax,
                    UnitMail: data.unitMail || memberData.unitMail,
                    UnitHref: data.unitHref || memberData.unitHref,
                    UnitCityId: unitCityId || memberData.unitCityId,
                    UnitAddrCode: unitAddrCode || memberData.unitAddrCode,
                    UnitAddr: data.unitAddr || memberData.unitAddr
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
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
                        history.push('/member/memberCenter?sortType=6');
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
        // console.log(data);
        setShowDialog(true)

    };



    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {/* <BreadCrumb currentPage={identityType === "3" ? '企業帳號編輯' : identityType === "6" ? "民間團體帳號編輯" : "學校單位帳號編輯"} />
            <div className="container member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-12 col-lg-8">
                <h2 className="dark-grey bold mb-3">{identityType === "3" ? '企業帳號編輯' : identityType === "6" ? "民間團體帳號編輯" : "學校單位帳號編輯"}</h2>
                <div>
                    <div className="input-wrapper">
                        <label className="member-info-label org">變更頭像</label>
                        {images.length > 0 ?
                            ""
                            :
                            <img className="clip-avatar-edit" src={headPic ? headPic : greenMan} alt="會員頭貼" title="會員頭貼" />
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

                    <div>
                        <h2 className="org-subtitle">一、聯絡人資料</h2>

                        <div className="input-wrapper">
                            <label for="name" className="member-info-label org required">姓名</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                size="61"
                                ref={register({
                                    required: "請輸入姓名",
                                    pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                                })}
                                defaultValue={memberData.name}
                                placeholder={memberData.name || ""}
                                onChange={(e) => setOnEdited(true)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label for="email" className="member-info-label org required">E-mail</label>
                            <input
                                type="text"
                                className="input-pbSignUp readonly-color"
                                name="email"
                                id="email"
                                size="61"
                                readOnly
                                ref={register({
                                    required: "請輸入email",
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                })}
                                defaultValue={memberData.email}
                                placeholder={memberData.email || ""}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label for="tel" className="member-info-label org required">聯絡電話</label>
                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                size="61"
                                maxLength="20"
                                ref={register({
                                    required: "請輸入聯絡電話",
                                    pattern: /^(0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+))?$/,
                                    minLength: {
                                        value: 9,
                                    }
                                })}
                                defaultValue={memberData.tel}
                                placeholder={memberData.tel || ""}
                                onChange={(e) => setOnEdited(true)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label for="mobile" className="member-info-label org">行動電話</label>
                            <input
                                // onBlur={e => setMobile(e.target.value)}
                                type="tel"
                                name="mobile"
                                id="mobile"
                                size="61"
                                maxLength="10"
                                ref={register({
                                    pattern: /^09[0-9]+$/,
                                    minLength: {
                                        value: 10,
                                    }
                                })}
                                defaultValue={memberData.mobile}
                                placeholder={memberData.mobile || ""}
                                onChange={(e) => setOnEdited(true)}
                            />
                            {/* <div className="warning">
                                    {errors.mobile && "行動電話格式不符"}
                                </div> */}
                        </div>

                        {/* <div className="input-wrapper">
                                <label className="member-info-label org">聯絡傳真</label>
                                <input
                                    type="tel"
                                    className=""
                                    name="fax"
                                    size="15"
                                    maxLength="13"
                                    ref={register({
                                        pattern: /^(0\d{1,3})(?:-)(\d{7,8})?$/,
                                        valueAsNumber: true,
                                        minLength: {
                                            value: 9,
                                        }
                                    })}
                                    defaultValue={memberData.fax}
                                    placeholder={memberData.fax || ""}
                                    onChange={(e) => setOnEdited(true)}
                                /> */}
                        {/* <div className="warning">
                                    {errors.faxNumber && "聯絡傳真格式不符"}&emsp;
                                    </div> */}
                        {/* </div> */}

                        <div className="input-wrapper">
                            <label for="fax" className="member-info-label org">聯絡傳真</label>
                            <input
                                type="tel"
                                name="fax"
                                id="fax"
                                size="61"
                                maxLength="13"
                                ref={register({
                                    pattern: /^(0\d{1,3})(?:-)(\d{7,8})?$/,
                                    minLength: {
                                        value: 9,
                                    }
                                })}
                                defaultValue={memberData.fax}
                                placeholder={memberData.fax || ""}
                                onChange={(e) => setOnEdited(true)}
                            />
                        </div>

                        <div className="input-wrapper city-select-withInput">
                            <label className="member-info-label org required">聯絡地址</label>
                            <div className="city-select-wrapper">
                                <select className="signUp-addr-select" value={cityId} onChange={e => {
                                    setCityId(e.target.value)
                                    setOnEdited(true)
                                }}>
                                    <option value="">請選擇</option>
                                    {contectCityDrop.map((fetchData, index) =>
                                        <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                    )}
                                </select>
                                <select className="signUp-addr-select" value={addrCode} onChange={e => {
                                    setAddrCode(e.target.value)
                                    setOnEdited(true)
                                }}>
                                    <option value="">請選擇</option>
                                    {contectDistrict.map((fetchData, index) =>
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
                                    required: "請輸入聯絡地址",
                                })}
                                defaultValue={memberData.addr}
                                placeholder={memberData.addr || ""}
                                onChange={(e) => setOnEdited(true)}
                            />

                        </div>


                    </div>
                </div>

                <div>
                    <h2 className="org-subtitle">二、申請單位資料</h2>
                    <div className="input-wrapper">
                        <label for="unitCode" className="member-info-label org required">統一編號/工廠編號</label>
                        <input
                            className="readonly-color"
                            type="text"
                            name="unitCode"
                            id="unitCode"
                            size="61"
                            ref={register({
                                required: "請輸入統一編號/工廠編號",
                                pattern: /^[0-9]+$/,
                            })}
                            defaultValue={memberData.unitCode}
                            placeholder={memberData.unitCode || ""}
                            readOnly
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitFullName" className="member-info-label org required">單位中文名稱</label>
                        <input
                            type="text"
                            size="61"
                            name="unitFullName"
                            id="unitFullName"
                            ref={register({
                                required: "請輸入單位中文名稱",
                                pattern: /[\u4E00-\u9FFF]/
                            })}
                            defaultValue={memberData.unitFullName}
                            placeholder={memberData.unitFullName || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitCHName" className="member-info-label org">單位中文簡稱</label>
                        <input
                            type="text"
                            size="61"
                            name="unitCHName"
                            id="unitCHName"
                            ref={register({
                                pattern: /[\u4E00-\u9FFF]/
                            })}
                            defaultValue={memberData.unitCHName}
                            placeholder={memberData.unitCHName || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitENName" className="member-info-label org">單位英文名稱</label>
                        <input
                            type="text"
                            size="61"
                            name="unitENName"
                            id="unitENName"
                            defaultValue={memberData.unitENName}
                            placeholder={memberData.unitENName || ""}
                            ref={register({
                                pattern: /[A-Za-z]/
                            })}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitManager" className="member-info-label org required">負責人/主管</label>
                        <input
                            type="text"
                            name="unitManager"
                            id="unitManager"
                            size="61"
                            ref={register({
                                required: "請輸入負責人/主管",
                            })}
                            defaultValue={memberData.unitManager}
                            placeholder={memberData.unitManager || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitTel" className="member-info-label org required">單位聯絡電話</label>
                        <input
                            type="tel"
                            name="unitTel"
                            id="unitTel"
                            size="61"
                            maxLength="20"
                            ref={register({
                                required: "請輸入連絡電話",
                                pattern: /^((0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+)))|([0-9]) ?$/,
                                minLength: {
                                    value: 10,
                                }
                            })}
                            defaultValue={memberData.unitTel}
                            placeholder={memberData.unitTel || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitFax" className="member-info-label org">單位聯絡傳真</label>
                        <input
                            type="tel"
                            name="unitFax"
                            id="unitFax"
                            size="61"
                            maxLength="13"
                            // ref={register({ required: true })} 
                            ref={register({
                                pattern: /^(0\d{1,3})(?:-)(\d{7,8})?$/,
                                minLength: {
                                    value: 9,
                                }
                            })}
                            defaultValue={memberData.unitFax}
                            placeholder={memberData.unitFax || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitMail" className="member-info-label org">備用E-mail</label>
                        <input
                            type="email"
                            name="unitMail"
                            id="unitMail"
                            size="61"
                            ref={register({
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            })}
                            defaultValue={memberData.unitMail}
                            placeholder={memberData.unitMail || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="unitHref" className="member-info-label org">網址</label>
                        <input
                            type="text"
                            name="unitHref"
                            id="unitHref"
                            size="61"
                            ref={register({
                                pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
                            })}
                            defaultValue={memberData.unitHref}
                            placeholder={memberData.unitHref || ""}
                            onChange={(e) => setOnEdited(true)}
                        />
                    </div>
                    <div className="input-wrapper city-select-withInput">
                        <label className="member-info-label org required">登記地址</label>
                        <div className="city-select-wrapper">
                            <select className="signUp-addr-select" value={unitCityId} onChange={e => {
                                setUnitCityId(e.target.value)
                                setOnEdited(true)
                            }}>
                                <option value="">請選擇</option>
                                {cityDrop.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>
                            <select className="signUp-addr-select" value={unitAddrCode} onChange={e => {
                                setUnitAddrCode(e.target.value)
                                setOnEdited(true)
                            }}>
                                <option value="">請選擇</option>
                                {district.map((fetchData, index) =>
                                    <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                )}
                            </select>
                        </div>
                        <label for="unitAddr" className="member-info-label org">網址</label>
                        <input
                            type="text"
                            name="unitAddr"
                            id="unitAddr"
                            maxLength="50"
                            minLength="4"
                            size="40"
                            ref={register({
                                required: "請輸入單位登記地址",
                            })}
                            defaultValue={memberData.unitAddr}
                            placeholder={memberData.unitAddr || ""}
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