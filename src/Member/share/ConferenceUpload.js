import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { formatDateTime } from "../../utils/Functions"
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

function ConferenceUpload(props) {
    const editor = useRef(null)

    myConfig.placeholder = "請輸入會議簡介(2,000字以內)"
    myConfig.width = '88%';

    let history = useHistory()
    let SSL = props.SSL;
    let domain = props.domain;
    //序列化回傳資料-取代JSON.stringify()
    // var serialize = require('serialize-javascript');

    const params = new URLSearchParams(history.location.search);
    const meetGuid = params.get('edit')
    const editMode = Boolean(params.get('edit'))

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    var myHeaders = new Headers({
        // "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });
    const [errMsg, setErrMsg] = useState("");
    const [images, setImages] = useState([]);
    const [imageUpload, setImageUpload] = useState("");
    const [cityId, setCityId] = useState("");
    const [meetingStart, setMeetingStart] = useState("");
    const [startTime, setStartTime] = useState("");
    const [addrCode, setAddrCode] = useState("");
    const [pptFile, setPPTFile] = useState("");
    const [agendaFile, setAgendaFile] = useState("");
    const [recordFile, setRecordFile] = useState("");
    const [pptHref, setPPTHref] = useState("");
    const [agendaHref, setAgendaHref] = useState("");
    const [recordHref, setRecordHref] = useState("");
    const [pptFileUpload, setPptFileUpload] = useState(null);
    const [agendaFileUpload, setAgendaFileUpload] = useState(null);
    const [recordFileUpload, setRecordFileUpload] = useState(null);
    const [providedPpt, setProvidedPpt] = useState(false);
    const [providedAgenda, setProvidedAgenda] = useState(false);
    const [providedRecord, setProvidedRecord] = useState(false);
    const [isDelete, setIsDelete] = useState("N");

    const [guid, setGuid] = useState("");
    const [mType1, setMType1] = useState(null);
    const [mType2, setMType2] = useState(null);

    const { register, errors, handleSubmit } = useForm({});

    const [intro, setIntro] = useState("");

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        if (imageList[0]) {
            setImageUpload(imageList[0].file)
        }
    };

    //點閱計數API
    useEffect(() => {
        clickRecord("6E9B601E-42F4-49A8-8584-4677BA58154C", "5", collector)
    }, [collector]);

    const formData = new FormData();
    const fileFormData = new FormData();
    const formDataDetail1 = new FormData();
    const formDataDetail2 = new FormData();

    //提交上傳表單
    const submit = (data) => {
        console.log("data", data)
        // console.log(intro)
        var agreeCheckbox = document.querySelector('input#agreement[type=checkbox]:checked')
        if (!agreeCheckbox) {
            setErrMsg('請勾選同意授權')
        } else {
            // window.scrollTo(0, 0)
            setShowDialog(true)
            setAlertTitle('送出中~')

            formData.append("MeetingName", data.title);
            formData.append("MeetingInfo", intro);
            formData.append("Organizer", data.organizer);
            formData.append("Container", data.Container);
            formData.append("ContainTel", data.ContainTel);
            formData.append("MeetingStart", formatDateTime(data.meetingStart));
            formData.append("MeetingEnd", formatDateTime(data.meetingEnd));
            formData.append("StartTime", formatDateTime(data.startTime));
            formData.append("EndTime", formatDateTime(data.endTime));

            fetch(`${SSL}//${domain}/api/api/Meeting/Add/Base`, {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        setGuid(result.resultObject)
                        // 實體
                        if (mType1) {
                            formDataDetail1.append("MeetingGuid", result.resultObject);
                            formDataDetail1.append("MType", mType1 && "1");
                            formDataDetail1.append("Detail1", data.addrDesc);
                            formDataDetail1.append("Detail2", data.addr);
                            formDataDetail1.append("Detail3", data.transportation);
                            formDataDetail1.append("Detail4", 'B');
                            formDataDetail1.append("Detail5", '不限');
                            formDataDetail1.append("Detail6", data.linkText);
                            formDataDetail1.append("Detail7", data.link);
                            formDataDetail1.append("Detail8", 'A');
                            // formData.append("Detail9", data.watchLinkText);
                            // formData.append("Detail10", data.watchLink);
                            formDataDetail1.append("DetailCity", cityId);
                            formDataDetail1.append("DetailZip", addrCode);
                            formDataDetail1.append("DetailOther", '');

                            fetch(`${SSL}//${domain}/api/api/Meeting/Add/Detail`, {
                                method: 'POST',
                                headers: myHeaders,
                                body: formDataDetail1
                            })
                                .then(res => {
                                    // console.log(res)
                                    return res.json();
                                }).then(result => {
                                    if (result.isSucess) {
                                        console.log("實體上傳成功", result)
                                    }
                                })
                        }
                        // 線上
                        setTimeout(() => {
                            if (mType2) {
                                formDataDetail2.append("MeetingGuid", result.resultObject);
                                formDataDetail2.append("MType", mType2 && "2");
                                formDataDetail2.append("Detail1", data.descText);
                                formDataDetail2.append("Detail2", data.addr);
                                formDataDetail2.append("Detail3", data.transportation);
                                formDataDetail2.append("Detail4", 'B');
                                formDataDetail2.append("Detail5", '不限');
                                formDataDetail2.append("Detail6", data.OnlineLinkText);
                                formDataDetail2.append("Detail7", data.OnlineLink);
                                formDataDetail2.append("Detail8", 'A');
                                formDataDetail2.append("Detail9", data.watchLinkText);
                                formDataDetail2.append("Detail10", data.watchLink);
                                formData.append("DetailCity", cityId);
                                formData.append("DetailZip", addrCode);
                                formData.append("DetailOther", '');

                                fetch(`${SSL}//${domain}/api/api/Meeting/Add/Detail`, {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: formDataDetail2
                                })
                                    .then(res => {
                                        return res.json();
                                    }).then(result => {
                                        if (result.isSucess) {
                                            console.log("線上上傳成功", result)
                                        }
                                    })
                            }
                        }, 1000);

                        // 宣傳圖上傳
                        if (imageUpload !== "") {
                            fileFormData.append("MeetingGuid", result.resultObject);
                            fileFormData.append("FType", "0");
                            fileFormData.append("FCase", "1");
                            fileFormData.append("Name", data.title);
                            fileFormData.append("File", imageUpload);
                            fileFormData.append("SupplyDate", formatDateTime(data.startTime));

                            fetch(`${SSL}//${domain}/api/api/Meeting/Add/File`, {
                                method: 'POST',
                                headers: myHeaders,
                                body: fileFormData
                            })
                                .then(res => {
                                    return res.json();
                                }).then(result => {
                                    // console.log(result)
                                    if (result.isSucess) {
                                        console.log("圖片上傳成功", result)
                                        setShowDialog(true)
                                        setAlertTitle("會議活動已送出，審核期程約3個工作天，請耐心等候")
                                        setTimeout(function () {
                                            history.push('/member/bookMarkConference?name=社會溝通會議&link=/member/conferenceEventUpload&type=6');
                                        }, 1000)
                                    }
                                })
                        } else {
                            setShowDialog(true)
                            setAlertTitle("會議活動已送出，審核期程約3個工作天，請耐心等候")
                            setTimeout(function () {
                                history.push('/member/bookMarkConference?name=社會溝通會議&link=/member/conferenceEventUpload&type=6');
                            }, 1000)
                        }
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
        formData.append("guid", meetGuid);
        formData.append("MeetingName", data.title || fetchBaseData.meetingName);
        formData.append("MeetingInfo", intro || fetchBaseData.meetingInfo);
        formData.append("Organizer", data.organizer || fetchBaseData.organizer);
        formData.append("Container", data.Container || fetchBaseData.Container);
        formData.append("ContainTel", data.ContainTel || fetchBaseData.ContainTel);
        formData.append("MeetingStart", formatDateTime(data.meetingStart) || fetchBaseData.meetingStart);
        formData.append("MeetingEnd", formatDateTime(data.meetingEnd) || fetchBaseData.meetingEnd);
        formData.append("StartTime", formatDateTime(data.startTime) || fetchBaseData.startTime);
        formData.append("EndTime", formatDateTime(data.endTime) || fetchBaseData.endTime);

        fetch(`${SSL}//${domain}/api/api/Meeting/Edit/Base`, {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setGuid(result.resultObject)

                    let editDetail = `${SSL}//${domain}/api/api/Meeting/Edit/Detail`;

                    if (mType1) {
                        formDataDetail1.append("Id", String(fetchDetailData1.id));
                        formDataDetail1.append("MeetingGuid", meetGuid);
                        formDataDetail1.append("MType", "1");
                        formDataDetail1.append("Detail1", data.addrDesc || fetchDetailData1.detail1);
                        formDataDetail1.append("Detail2", data.addr || fetchDetailData1.detail2);
                        formDataDetail1.append("Detail3", data.transportation || fetchDetailData1.detail3);
                        formDataDetail1.append("Detail4", 'B');
                        formDataDetail1.append("Detail5", '不限');
                        formDataDetail1.append("Detail6", data.linkText || fetchDetailData1.detail6);
                        formDataDetail1.append("Detail7", data.link || fetchDetailData1.detail7);
                        formDataDetail1.append("Detail8", 'A');
                        // formDataDetail1.append("Detail9", data.watchLinkText || fetchDetailData1.detail9);
                        // formDataDetail1.append("Detail10", data.watchLink || fetchDetailData1.detail10);
                        formDataDetail1.append("DetailCity", cityId || fetchDetailData1.detailCity);
                        formDataDetail1.append("DetailZip", addrCode || fetchDetailData1.detailZip);
                        formDataDetail1.append("DetailOther", '');
                        formDataDetail1.append("IsDelete", isDelete);
                    }

                    fetch(editDetail, {
                        method: 'POST',
                        headers: myHeaders,
                        body: formDataDetail1
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            if (result.isSucess) {
                                console.log("實體更新成功", result)
                            }
                        })

                    if (mType2) {
                        formDataDetail2.append("Id", String(fetchDetailData2.id));
                        formDataDetail2.append("MeetingGuid", meetGuid);
                        formDataDetail2.append("MType", "2");
                        formDataDetail2.append("Detail1", data.descText || fetchDetailData2.detail1);
                        formDataDetail2.append("Detail2", data.addr || fetchDetailData2.detail2);
                        formDataDetail2.append("Detail3", data.transportation || fetchDetailData2.detail3);
                        formDataDetail2.append("Detail4", 'B');
                        formDataDetail2.append("Detail5", '不限');
                        formDataDetail2.append("Detail6", data.OnlineLinkText || fetchDetailData2.detail6);
                        formDataDetail2.append("Detail7", data.OnlineLink || fetchDetailData2.detail7);
                        formDataDetail2.append("Detail8", 'A');
                        formDataDetail2.append("Detail9", data.watchLinkText || fetchDetailData2.detail9);
                        formDataDetail2.append("Detail10", data.watchLink || fetchDetailData2.detail10);
                        // formDataDetail2.append("DetailCity", cityId || fetchDetailData2.detailCity);
                        // formDataDetail2.append("DetailZip", addrCode || fetchDetailData2.detailZip);
                        formDataDetail2.append("DetailOther", '');
                        formDataDetail2.append("IsDelete", isDelete);
                    }

                    fetch(editDetail, {
                        method: 'POST',
                        headers: myHeaders,
                        body: formDataDetail2
                    })
                        .then(res => {
                            // console.log(res)
                            return res.json();
                        }).then(result => {
                            if (result.isSucess) {
                                console.log("線上更新成功", result)
                            }
                        })

                    // 圖片更新
                    if (imageUpload !== "") {
                        const fileDetail = fetchFileData.filter(d => d.fType == 0);
                        fileFormData.append("Id", String(fileDetail[0].id));
                        fileFormData.append("MeetingGuid", meetGuid);
                        fileFormData.append("FType", "0");
                        fileFormData.append("FCase", "1");
                        fileFormData.append("Name", data.title);
                        imageUpload !== "" && fileFormData.append("File", imageUpload);
                        imageUpload === "" && fileFormData.append("Href", fetchFileData[0].url);
                        fileFormData.append("SupplyDate", formatDateTime(data.startTime));
                        fileFormData.append("IsDelete", isDelete);

                        fetch(`${SSL}//${domain}/api/api/Meeting/Edit/File`, {
                            method: 'POST',
                            headers: myHeaders,
                            body: fileFormData
                        })
                            .then(res => {
                                return res.json();
                            }).then(result => {
                                // console.log(result)
                                if (result.isSucess) {
                                    console.log("圖片更新成功", result)
                                    setShowDialog(true)
                                    setAlertTitle("會議活動已送出，審核期程約3個工作天，請耐心等候")
                                    setTimeout(function () {
                                        history.push('/member/bookMarkConference?name=社會溝通會議&link=/member/conferenceEventUpload&type=6');
                                    }, 1000)
                                }
                            })
                    } else {
                        setShowDialog(true)
                        setAlertTitle("會議活動已送出，審核期程約3個工作天，請耐心等候")
                        setTimeout(function () {
                            history.push('/member/bookMarkConference?name=社會溝通會議&link=/member/conferenceEventUpload&type=6');
                        }, 1000)
                    }

                } else {
                    setShowDialog(true)
                    setAlertTitle(result.userMsg)
                    setTimeout(function () {
                        setAlertTitle(result.userMsg + " ")
                    }, 100)
                }

            });

    }

    const [fetchBaseData, setFetchBaseData] = useState([])
    const [fetchDetailData1, setFetchDetailData1] = useState([])
    const [fetchDetailData2, setFetchDetailData2] = useState([])
    const [fetchFileData, setFetchFileData] = useState([])

    //單一活動內容
    useEffect(() => {
        if (editMode)
            fetch(`${props.SSL}//${props.domain}/api/api/Meeting/Single?mGuid=${meetGuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        const objResult = result.resultObject.resultObject;
                        const objectFetchData = Object.values(objResult)
                        setFetchBaseData(objectFetchData[1])
                        if (objectFetchData[2][0] || objectFetchData[2][1]) {
                            setFetchDetailData1(objectFetchData[2][0]?.mType === 1 ? objectFetchData[2][0] : null)
                            setFetchDetailData2(objectFetchData[2][1] || (objectFetchData[2][0]?.mType === 2 && objectFetchData[2][0]))
                        }
                        setFetchFileData(objectFetchData[3])

                        if (objectFetchData[2][0]?.mType === 1) {
                            setMType1(true)
                        }
                        if (objectFetchData[2][1]?.mType === 2) {
                            setMType2(true)
                        }
                        console.log(objectFetchData)

                        const dataFile1 = objectFetchData[3].filter(d => d.fType === 1 && d.fCase === 1)
                        if (dataFile1[0]) {
                            setPptFileUpload(true)
                            setPPTHref(dataFile1[0].url)
                        }
                        const dataFile2 = objectFetchData[3].filter(d => d.fType === 2 && d.fCase === 1)
                        if (dataFile2[0]) {
                            setAgendaFileUpload(true)
                            setAgendaHref(dataFile2[0].url)
                        }
                        const dataFile3 = objectFetchData[3].filter(d => d.fType === 3 && d.fCase === 1)
                        if (dataFile3[0]) {
                            setRecordFileUpload(true)
                            setRecordHref(dataFile3[0].url)
                        }
                    }
                });
    }, [props.SSL, props.domain]);

    useEffect(() => {
        if (pptFile !== "" && pptFile !== undefined && providedPpt !== true) {
            setPptFileUpload(true)
        }
        if (agendaFile !== "" && agendaFile !== undefined && providedPpt !== true) {
            setAgendaFileUpload(true)
        }
        if (recordFile !== "" && recordFile !== undefined && providedPpt !== true) {
            setRecordFileUpload(true)
        }
    }, [pptFile, agendaFile, recordFile, providedAgenda, providedRecord, providedPpt])

    useEffect(() => {
        if (providedPpt === true) {
            setPPTFile("")
            setPptFileUpload(false)
        }
        if (providedAgenda === true) {
            setAgendaFile("")
            setAgendaFileUpload(false)
        }
        if (providedRecord === true) {
            setRecordFile("")
            setRecordFileUpload(false)
        }
    }, [pptFileUpload, agendaFileUpload, recordFileUpload, providedPpt, providedAgenda, providedRecord])

    const fileUrl = `${SSL}//${domain}/api/api/Meeting/Add/File`
    const editFileUrl = `${SSL}//${domain}/api/api/Meeting/Edit/File`

    // 會議簡報
    useEffect(() => {
        const fileDetail = fetchFileData.filter(d => d.fType === 1);
        if (guid !== "") {
            var formdata = new FormData();
            editMode && formdata.append("Id", String(fileDetail[0].id));
            formdata.append("MeetingGuid", editMode ? meetGuid : guid);
            formdata.append("FType", "1");
            formdata.append("FCase", pptFile || pptHref ? "1" : providedPpt ? "2" : "0");
            formdata.append("Name", "會議簡報");
            formdata.append("SupplyDate", "2022-09-15T10:50:00");
            formdata.append("IsDelete", isDelete);
            pptFile !== "" && formdata.append("File", pptFile);
            pptFile === "" && formdata.append("Href", pptHref);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(editMode ? editFileUrl : fileUrl, requestOptions)
                .then(response => response.json())
                .then(result => console.log("會議簡報", result))
                .catch(error => console.log('error', error));
        }
    }, [guid, pptFile])

    // 會議議程
    useEffect(() => {
        const fileDetail = fetchFileData.filter(d => d.fType === 2);
        if (guid !== "") {
            var formdata = new FormData();
            editMode && formdata.append("Id", String(fileDetail[0].id));
            formdata.append("MeetingGuid", editMode ? meetGuid : guid);
            formdata.append("FType", "2");
            formdata.append("FCase", agendaFile || agendaHref ? "1" : providedAgenda ? "2" : "0");
            formdata.append("Name", "會議議程");
            formdata.append("SupplyDate", "2022-09-15T10:50:00");
            formdata.append("IsDelete", isDelete);
            agendaFile !== "" && formdata.append("File", agendaFile);
            agendaFile === "" && formdata.append("Href", agendaHref);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(editMode ? editFileUrl : fileUrl, requestOptions)
                .then(response => response.json())
                .then(result => console.log("會議議程", result))
                .catch(error => console.log('error', error));
        }
    }, [guid, agendaFile])

    // 會議紀錄
    useEffect(() => {
        const fileDetail = fetchFileData.filter(d => d.fType === 3);
        if (guid !== "") {
            var formdata = new FormData();
            editMode && formdata.append("Id", String(fileDetail[0].id));
            formdata.append("MeetingGuid", editMode ? meetGuid : guid);
            formdata.append("FType", "3");
            formdata.append("FCase", recordFile || recordHref ? "1" : providedRecord ? "2" : "0");
            formdata.append("Name", "會議紀錄");
            formdata.append("SupplyDate", "2022-09-15T10:50:00");
            formdata.append("IsDelete", isDelete);
            recordFile !== "" && formdata.append("File", recordFile);
            recordFile === "" && formdata.append("Href", recordHref);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(editMode ? editFileUrl : fileUrl, requestOptions)
                .then(response => response.json())
                .then(result => console.log("會議紀錄", result))
                .catch(error => console.log('error', error));
        }
    }, [guid, recordFile])

    // 刪除會議活動
    const comfirm = () => window.confirm("確定要刪除嗎?");
    useEffect(() => {
        if (isDelete === "Y") {
            comfirm()
            if (comfirm() === true) {
                fetch(`${SSL}//${domain}/api/api/Meeting/Delete?mGuid=${meetGuid}`, {
                    method: 'POST',
                    headers: myHeaders,
                })
                    .then(res => {
                        // console.log(res)
                        return res.json();
                    }).then(result => {
                        // console.log(result)
                        if (result.isSucess) {
                            if (imageUpload === "") {
                                setShowDialog(true)
                                setAlertTitle("會議活動已刪除")

                                setTimeout(function () {
                                    history.push('/member/bookMarkConference?name=社會溝通會議&link=/member/conferenceEventUpload&type=6');
                                }, 1000)
                            }
                        }
                    })
            } else {
                setIsDelete("N")
            }
        }
    }, [isDelete])

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

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            <div className="col-sm-12 col-md-10 col-lg-9">
                <h2 className="dark-grey bold mb-3">社會溝通會議上傳</h2>
                <div>
                    <div className="input-wrapper">
                        <label title="label" className="member-info-label">活動圖片</label>
                        {images.length > 0 ?
                            ""
                            :
                            editMode ?
                                <img width="10%" src={fetchFileData[0]?.url} alt="封面圖片" />
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
                                acceptType={["gif", "bmp", "gif", "png", "jpg", "jpeg"]}
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
                                                上傳圖片
                                            </button>
                                            <h6 className="upload-note">照片解析度400*400，檔案小於5MB</h6>

                                        </div>

                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <label for="title" className="member-info-label required">會議名稱</label>
                        <input
                            name="title"
                            id="title"
                            style={{ width: "100%" }}
                            placeholder="請輸入會議名稱(100字以內)"
                            defaultValue={fetchBaseData?.meetingName}
                            ref={register({
                                required: "請輸入會議名稱",
                                maxLength: {
                                    value: 100,
                                    message: "字數須在100字以內"
                                }
                            })}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="intro" className="member-info-label required">活動概敘</label>
                        <JoditEditor
                            ref={editor}
                            value={fetchBaseData?.meetingInfo}
                            config={myConfig}
                            // tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => {
                                setIntro(newContent)
                            }}
                        // onChange={e => setTextContent(e)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <label for="meetingStart" className="member-info-label required">會議時間</label>
                        <div className="time-label-wrapper">
                            <input
                                className="startDatetime"
                                type="datetime-local"
                                defaultValue={fetchBaseData?.meetingStart}
                                name="meetingStart"
                                id="meetingStart"
                                ref={register({
                                    required: "請選擇時間",
                                })}
                                onBlur={(e) => setMeetingStart(e.target.value)}
                            ></input>
                        </div>
                        <div className="time-label-wrapper">
                            <label for="meetingEnd" className="member-info-label">至</label>
                            <input
                                className="endDatetime"
                                type="datetime-local"
                                defaultValue={fetchBaseData?.meetingEnd}
                                name="meetingEnd"
                                id="meetingEnd"
                                min={meetingStart}
                                ref={register({
                                    required: "請選擇時間",
                                })}
                            ></input>
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label for="startTime" className="member-info-label required">發佈時間</label>
                        <div className="time-label-wrapper">
                            <input
                                className="startDatetime"
                                type="datetime-local"
                                defaultValue={fetchBaseData?.startTime}
                                name="startTime"
                                id="startTime"
                                ref={register({
                                    required: "請選擇時間",
                                })}
                                onBlur={(e) => setStartTime(e.target.value)}
                            ></input>
                        </div>
                        <div className="time-label-wrapper">
                            <label for="endTime" className="member-info-label">至</label>
                            <input
                                className="endDatetime"
                                type="datetime-local"
                                defaultValue={fetchBaseData?.endTime}
                                name="endTime"
                                id="endTime"
                                min={startTime}
                                ref={register({
                                    required: "請選擇時間",
                                })}
                            ></input>
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <label for="organizer" className="member-info-label required">主辦單位</label>
                        <input
                            type="text"
                            maxLength="50"
                            name="organizer"
                            id="organizer"
                            defaultValue={fetchBaseData?.organizer}
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
                    {/* <Form.Group> */}
                    <div className="input-wrapper">
                        <label for="ConferenceInformation" className="member-info-label required">會議資訊</label>
                        <Form.Check
                            className="col-5"
                            type="checkbox"
                            name="physicalMeeting"
                            id="physicalMeeting"
                            value="1"
                            label="實體會議"
                            style={{ fontSize: "24px" }}
                            defaultChecked={mType1}
                            onClick={() => setMType1(!mType1)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="addrDesc" className="member-info-label">活動地點</label>
                        <input
                            type="text"
                            maxLength="50"
                            name="addrDesc"
                            id="addrDesc"
                            defaultValue={mType1 ? fetchDetailData1.detail1 : ""}
                            placeholder="請輸入詳細地點，如:象山遊客中心...等資訊(50字以內)"
                            style={{ width: "100%" }}
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                        ></input>
                    </div>
                    <div className="input-wrapper">
                        <label for="cityId" className="member-info-label">活動地址</label>
                        <div className="city-select-wrapper signUp-addr-select">
                            <select
                                name="cityId"
                                id="cityId"
                                className="signUp-addr-select"
                                value={cityId || fetchDetailData1?.detailCity}
                                onChange={(e) => setCityId(e.target.value)}
                                ref={register({
                                    // required: "請選擇活動地址",
                                })}
                            >
                                <option value="">請選擇</option>
                                <option value="999">全國</option>
                                {dropDown.map((dropDown, index) =>
                                    <option key={index} value={dropDown.cityId}>{dropDown.cityName}</option>
                                )}
                            </select>

                            {cityId !== "999" &&
                                <select className="signUp-addr-select select-auto-width"
                                    // key={blogData.addrCode}
                                    value={addrCode || fetchDetailData1?.detailZip}
                                    onChange={e => {
                                        setAddrCode(e.target.value)
                                    }}
                                >
                                    <option value="">請選擇</option>
                                    {districtDrop.map((fetchData, index) =>
                                        <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                    )}
                                </select>}
                        </div>
                        <label for="addr"></label>
                        <input
                            className="col-sm-12 col-md-12 col-lg-8"
                            type="text"
                            name="addr"
                            id="addr"
                            defaultValue={mType1 ? fetchDetailData1?.detail2 : ""}
                            maxLength="100"
                            minLength="4"
                            size="40"
                            placeholder="請輸入活動地址"
                            ref={register({
                                maxLength: {
                                    value: 100,
                                    message: "字數須在100字以內"
                                }
                            })}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="transportation" className="member-info-label">交通方式</label>
                        <input
                            type="text"
                            maxLength="50"
                            name="transportation"
                            id="transportation"
                            defaultValue={mType1 ? fetchDetailData1?.detail3 : ""}
                            placeholder="請輸入交通方式，如台北火車站、劍潭捷運站...等資訊(50字以內)"
                            style={{ width: "100%" }}
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                        ></input>
                    </div>
                    <div className="input-wrapper">
                        <label for="linkText" className="member-info-label">報名連結</label>
                        <input
                            className="signUp-addr-select col-sm-12 col-md-12 col-lg-5"
                            type="text"
                            maxLength="50"
                            name="linkText"
                            id="linkText"
                            defaultValue={mType1 ? fetchDetailData1?.detail6 : ""}
                            placeholder="請輸入顯示文字(50字內)"
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                        ></input>
                        <input
                            className="col-sm-12 col-md-12 col-lg-5"
                            type="text"
                            maxLength="100"
                            name="link"
                            id="link"
                            defaultValue={mType1 ? fetchDetailData1?.detail7 : ""}
                            placeholder="請輸入網址(100字內)"
                            ref={register({
                                maxLength: {
                                    value: 100,
                                    message: "字數須在100字以內"
                                }
                            })}
                        ></input>
                    </div>

                    <div className="input-wrapper">
                        <label title="OnlineConferenceInformation" className="member-info-label"></label>
                        <Form.Check
                            className="col-5"
                            type="checkbox"
                            name="onlineMeeting"
                            id="onlineMeeting"
                            value="2"
                            label="線上會議"
                            style={{ fontSize: "24px" }}
                            defaultChecked={mType2}
                            onClick={() => setMType2(!mType2)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label for="descText" className="member-info-label">說明文字</label>
                        <input
                            type="text"
                            maxLength="50"
                            name="descText"
                            id="descText"
                            defaultValue={mType2 ? fetchDetailData2?.detail1 : ""}
                            placeholder="請輸入說明文字(50字以內)"
                            style={{ width: "100%" }}
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                        ></input>
                    </div>
                    <div className="input-wrapper">
                        <label for="watchLinkText" className="member-info-label">觀看連結</label>
                        <input
                            className="signUp-addr-select col-sm-12 col-md-12 col-lg-5"
                            type="text"
                            maxLength="50"
                            name="watchLinkText"
                            id="watchLinkText"
                            defaultValue={mType2 ? fetchDetailData2?.detail9 : ""}
                            placeholder="請輸入顯示文字(50字內)"
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                        ></input>
                        <input
                            className="col-sm-12 col-md-12 col-lg-5"
                            type="text"
                            maxLength="50"
                            name="watchLink"
                            id="watchLink"
                            defaultValue={mType2 ? fetchDetailData2?.detail10 : ""}
                            placeholder="請輸入網址(100字內)"
                            ref={register({
                                maxLength: {
                                    value: 100,
                                    message: "字數須在100字以內"
                                }
                            })}
                        ></input>
                    </div>

                    <div className="input-wrapper">
                        <label for="OnlineLinkText" className="member-info-label">報名連結</label>
                        <input
                            className="signUp-addr-select col-sm-12 col-md-12 col-lg-5"
                            type="text"
                            maxLength="50"
                            name="OnlineLinkText"
                            id="OnlineLinkText"
                            placeholder="請輸入顯示文字(10字內)"
                            defaultValue={mType2 ? fetchDetailData2?.detail6 : ""}
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在10字以內"
                                }
                            })}
                        ></input>
                        <input
                            className="col-sm-12 col-md-12 col-lg-5"
                            type="text"
                            maxLength="50"
                            name="OnlineLink"
                            id="OnlineLink"
                            placeholder="請輸入網址"
                            defaultValue={mType2 ? fetchDetailData2?.detail7 : ""}
                            ref={register({
                                maxLength: {
                                    value: 50,
                                    message: "字數須在50字以內"
                                }
                            })}
                        ></input>
                    </div>
                    {/* </Form.Group> */}

                    <Form.Group>
                        <div>
                            <label for="meetFileCheckbox1" className="member-file-label member-info-label  required">會議資料</label>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox1"
                                    name="meetFileCheckbox"
                                    value="1"
                                    label="會議簡報"
                                    style={{ fontSize: "24px" }}
                                    defaultChecked={pptFileUpload}
                                    onClick={() => setPptFileUpload(!pptFileUpload)}
                                />
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox2"
                                    name="meetFileCheckbox"
                                    value="2"
                                    label="上傳會議簡報"
                                    defaultChecked={pptFileUpload}
                                    onClick={() => setPptFileUpload(!pptFileUpload)}
                                />
                                <div className="col-2"></div>
                                <input
                                    type="file"
                                    multiple="multiple"
                                    id="uploadFile1"
                                    title="uploadFile1"
                                    maxLength="1"
                                    className="input-file col-10"
                                    acceptType=".pdf,.gif,.bmp,.png,.jpg,.jpeg"
                                    onChange={(e) => setPPTFile(e.target.files[0])}
                                />
                                <div className="col-2"></div>
                                {(pptFile === "" && providedPpt === false) &&
                                    <div className="col-10">{fetchFileData.map(d => d.fType === 1 && d.url)}</div>}
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <span className="col-10">允許格式: .pdf .gif .bmp .png .jpg .jpeg 上傳限制5MB</span>
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox3"
                                    name="meetFileCheckbox"
                                    value="3"
                                    label="待提供會議簡報"
                                    defaultChecked={providedPpt}
                                    onClick={() => setProvidedPpt(!providedPpt)}
                                />
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox4"
                                    name="meetFileCheckbox"
                                    value="4" label="會議議程"
                                    style={{ fontSize: "24px" }}
                                    defaultChecked={agendaFileUpload}
                                    onClick={() => setAgendaFileUpload(!agendaFileUpload)}
                                />
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox5"
                                    name="meetFileCheckbox"
                                    value="5"
                                    label="上傳會議議程"
                                    defaultChecked={agendaFileUpload}
                                    onClick={() => setAgendaFileUpload(!agendaFileUpload)}
                                />
                                <div className="col-2"></div>
                                <input
                                    type="file"
                                    multiple="multiple"
                                    id="uploadFile2"
                                    title="uploadFile2"
                                    maxLength="1"
                                    className="input-file col-10"
                                    acceptType=".pdf,.gif,.bmp,.png,.jpg,.jpeg"
                                    onChange={(e) => setAgendaFile(e.target.files[0])} />
                                <div className="col-2"></div>
                                {(agendaFile === "" && providedAgenda === false) &&
                                    <div className="col-10">{fetchFileData.map(d => d.fType === 2 && d.url)}</div>}
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <span className="col-10">允許格式: .pdf .gif .bmp .png .jpg .jpeg 上傳限制5MB</span>
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox6"
                                    name="meetFileCheckbox"
                                    value="6"
                                    label="待提供會議議程"
                                    defaultChecked={providedAgenda}
                                    onClick={() => setProvidedAgenda(!providedAgenda)}
                                />
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox7"
                                    name="meetFileCheckbox"
                                    value="7"
                                    label="會議紀錄"
                                    style={{ fontSize: "24px" }}
                                    defaultChecked={recordFileUpload}
                                    onClick={() => setRecordFileUpload(!recordFileUpload)}
                                />
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox8"
                                    name="meetFileCheckbox"
                                    value="8"
                                    label="上傳會議紀錄"
                                    defaultChecked={recordFileUpload}
                                    onClick={() => setRecordFileUpload(!recordFileUpload)}
                                />
                                <div className="col-2"></div>
                                <input
                                    type="file"
                                    multiple="multiple"
                                    id="uploadFile3"
                                    title="uploadFile3"
                                    maxLength="1"
                                    className="input-file col-10"
                                    acceptType=".pdf,.gif,.bmp,.png,.jpg,.jpeg" onChange={(e) => setRecordFile(e.target.files[0])} />
                                <div className="col-2"></div>
                                {(recordFile === "" && providedRecord === false) &&
                                    <div className="col-10">{fetchFileData.map(d => d.fType === 3 && d.url)}</div>}
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <span className="col-10">允許格式: .pdf .gif .bmp .png .jpg .jpeg 上傳限制5MB</span>
                            </div>
                            <div className="col-12 row m-0">
                                <div className="col-2"></div>
                                <Form.Check
                                    className="col-10"
                                    type="checkbox"
                                    id="meetFileCheckbox9"
                                    name="meetFileCheckbox"
                                    value="9"
                                    label="待提供會議紀錄"
                                    defaultChecked={providedRecord}
                                    onClick={() => setProvidedRecord(!providedRecord)}
                                />
                            </div>
                        </div>
                        <br />
                    </Form.Group>

                    <div>
                        <div className="input-wrapper">
                            <label title="label" className="member-info-label">聯絡資訊</label>
                            <label for="Container" className="member-info-label">聯絡窗口</label>
                            <input
                                className="col-sm-12 col-md-12 col-lg-8"
                                type="text"
                                maxLength="10"
                                name="Container"
                                id="Container"
                                defaultValue={fetchBaseData.container}
                                style={{ width: "100%" }}
                                placeholder="請輸入承辦人姓名"
                                ref={register({
                                    maxLength: {
                                        value: 10,
                                        message: "字數須在10字以內"
                                    }
                                })}
                            ></input>
                        </div>
                        <div className="input-wrapper">
                            <label title="label" className="member-info-label"></label>
                            <label for="ContainTel" className="member-info-label">聯絡電話</label>
                            <input
                                className="col-sm-12 col-md-12 col-lg-8"
                                type="text"
                                maxLength="20"
                                name="ContainTel"
                                id="ContainTel"
                                defaultValue={fetchBaseData.containTel}
                                style={{ width: "100%" }}
                                placeholder="請輸入承辦人電話"
                                ref={register({
                                    maxLength: {
                                        value: 20,
                                        message: "字數須在20字以內"
                                    }
                                })}
                            ></input>
                        </div>
                    </div>

                    <div className="warning">
                        <p>
                            {errors.meetingName ||
                                errors.meetingStart ||
                                errors.meetingEnd ||
                                errors.organizer
                                ? '未填寫' : ""}
                            {errors.meetingName && '【活動名稱】、'}
                            {errors.meetingStart && '【活動發佈開始時間】、'}
                            {errors.meetingEnd && '【活動發佈結束時間】、'}
                            {errors.organizer && '【主辦單位】、'}

                            {errors.meetingName ||
                                errors.meetingStart ||
                                errors.meetingEnd ||
                                errors.organizer ?
                                '欄位' : ""}
                        </p>
                    </div>
                    {!editMode &&
                        <div className="agreement-checkbox text-center">
                            <h6 className="agreement">
                                <label for="agreement"></label>
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    id="agreement"
                                />同意授權本內容及圖片發布於本平台
                            </h6>
                        </div>
                    }
                </div >

                <div className="input-wrapper info-btn-wrapper-center">
                    <h6 style={{ color: "red" }}>{errMsg}{errors.content && '請輸入說明欄位'}</h6>
                    {editMode ?
                        <>
                            <button onClick={handleSubmit(submitEdit)} className="upload-btn btn">送出</button>
                            {(fetchDetailData1 !== []) && <button onClick={() => setIsDelete("Y")} className="upload-btn btn" style={{ backgroundColor: "rgb(183 85 47)" }}>刪除</button>}
                        </>
                        :
                        <button onClick={handleSubmit(submit)} className="upload-btn btn">送出審核</button>}

                    <button className="info-canel-btn btn" onClick={() => history.goBack()}>取消</button>
                </div>

            </div >
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(ConferenceUpload);