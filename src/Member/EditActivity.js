// import React, { useState, useEffect, useRef } from 'react';
// import { Link, withRouter, useHistory } from 'react-router-dom';
// import "../DailyGreen/Article.scss";
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ImageUploading from 'react-images-uploading';
// import { Form } from 'react-bootstrap';
// import ComfirmAlert from '../Components/ComfirmAlert';
// import JoditEditor from "jodit-react";
// import { myConfig } from '../utils/JoditConfig';
// import { useForm } from 'react-hook-form';
// import { clickRecord } from '../utils/API';
// import { formatDateTime } from "../utils/Functions"
// import { useCookies } from "react-cookie";
// import greenMan from "../images1/greenMan/greenMan.png";


// // import logoutIcon from "../images1/login/signUp-normal.png"


// function MemberPage(props) {

//     const editor = useRef(null)

//     let history = useHistory()

//     var serialize = require('serialize-javascript');

//     const [greenlifeCookies] = useCookies([]);

//     const collector = greenlifeCookies.userGuid || "";
//     const memberToken = greenlifeCookies.refreshToken || "";

//     const [images, setImages] = useState([]);
//     const [imageUpload, setImageUpload] = useState("");
//     const [intro, setIntro] = useState("");
//     const [showUploadBtn, setShowUploadBtn] = useState(true);
//     const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
//     const [activityThemeId, setActivityThemeId] = useState([]);
//     const [addrCode, setAddrCode] = useState("");
//     const [startDatetime, setStartDatetime] = useState("");
//     const [anotherTimeDrop, setAnotherTimeDrop] = useState("");
//     const [anotherStartDatetime, setAnotherStartDatetime] = useState("");
//     //alert提醒視窗顯示
//     const [showDialog, setShowDialog] = useState(false);
//     const [alertTitle, setAlertTitle] = useState("");

//     var myHeaders = new Headers({
//         "Content-Type": "application/json; charset=utf-8",
//         "Token": memberToken
//     });
//     //用URL抓GUID
//     const setLink = () => {
//         setBlogGuid(history.location.search.slice(1))
//         clickRecord("EA632857-9646-4147-B572-9F3464517CE8", "5", collector)
//     }

//     const { register, errors, handleSubmit } = useForm({});

//     const initialState = {
//         themeId: "",
//         title: ""
//     }
//     const [ourState, ourSetState] = useState(initialState);
//     const { themeId, title } = ourState

//     function handleEventChange(event) {
//         ourSetState({ ...ourState, [event.target.name]: event.target.value });
//     }

//     var arrayCheck = []
//     const getThemeCheck = () => {
//         var chks = document.querySelectorAll('input#themeCheckbox0[type=checkbox]:checked, input#themeCheckbox1[type=checkbox]:checked, input#themeCheckbox2[type=checkbox]:checked, input#themeCheckbox3[type=checkbox]:checked, input#themeCheckbox4[type=checkbox]:checked, input#themeCheckbox5[type=checkbox]:checked, input#themeCheckbox6[type=checkbox]:checked, input#themeCheckbox7[type=checkbox]:checked')
//         for (var i = 0; i < chks.length; i++) {
//             arrayCheck.push(chks[i].value)
//             setActivityThemeId(arrayCheck)
//         }
//         // history.push(`/categories/green_office/participate?page=${page}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
//         chks.length === 0 && setActivityThemeId([])
//     }

//     //編輯更新綠生活照片
//     const submit = (data) => {
//         fetch(`${props.SSL}//${props.domain}/api/api/Activity/Edit`, {
//             method: 'POST',
//             body: serialize({
//                 Title: encodeURIComponent(data.title || blogData.title),
//                 Introduction: intro,
//                 Organizer: data.organizer,
//                 OrganizerInfo: data.organizerInfo,
//                 StartDatetime: formatDateTime(data.startDatetime),
//                 EndDatetime: formatDateTime(data.endDatetime),
//                 AnotherDatatime: data.anotherStartDatetime && data.anotherEndDatetime && formatDateTime(data.anotherStartDatetime) + "," + formatDateTime(data.anotherEndDatetime),
//                 Href: data.href,
//                 CityId: data.cityId,
//                 AddrCode: addrCode,
//                 Addr: data.addr,
//                 TypeId: String(data.typeId || blogData.typeId),
//                 ThemeId: String(activityThemeId),
//                 AddrDesc: data.addrDesc,
//                 Guid: blogGuid,
//                 // PicHref: blogData.picHref.replaceAll("\\", "\\\\") || "",
//                 PicHref: blogData.picHref || "",
//                 PictureBase64: imageUpload || "",
//             }),
//             headers: myHeaders
//         })
//             .then(res => {
//                 return res.json();
//             }).then(result => {
//                 if (result.isSucess) {
//                     history.push('/member/BookMarkBlog?name=綠生活網誌&link=/member/shareBlog&type=9')
//                 }
//             });


//     }

//     //單一網誌內容
//     const [blogData, setBlogData] = useState([]);
//     useEffect(() => {
//         window.scrollTo(0, 0)
//         setLink()
//         fetch(`${props.SSL}//${props.domain}/api/api/Blog/${blogGuid}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json; charset=utf-8'
//             }
//         })
//             .then(res => {
//                 return res.json();
//             }).then(result => {
//                 if (result.isSucess) {
//                     setBlogData(result.resultObject)
//                 }
//             });

//     }, [props.SSL, props.domain]);


//     const onChange = (imageList, addUpdateIndex) => {
//         setImages(imageList);
//         if (imageList[0]) {
//             setShowUploadBtn(false)
//             setImageUpload(imageList[0].data_url)

//         }

//     };

//     const onError = (errors, files) => {
//         console.log(errors, files)
//     }

//     //主題分類列表下拉項目API
//     const [knThemeDrop, setKnThemeDrop] = useState([]);
//     useEffect(() => {
//         fetch(`${props.SSL}//${props.domain}/api/api/Knowledge/Theme`, {
//             method: 'GET'
//         })
//             .then(res => {
//                 return res.json();
//             }).then(result => {
//                 setKnThemeDrop(result.resultObject)
//                 // console.log(result)
//             });
//     }, [props.SSL, props.domain])

//     return (
//         <>

//             {/* <BreadCrumb currentPage={"個人專頁"} />

//             <div className="container member-info-wrapper shareBlog row">
//                 <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}
//             {showDialog &&
//                 <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
//             }
//             <div className="col-12 col-lg-8">
//                 <h2 className="dark-grey bold mb-3"><i className="fas fa-pencil-alt"></i>&nbsp;編輯綠生活網誌</h2>
//                 {/* <p>歡迎上傳綠生活相關照片及影片，例如綠色餐廳吃飯自拍，綠色旅遊個人照、環保旅宿開箱...等等，若您上傳與綠生活無關的照片及影片，編輯有權將照片刪除及收回綠積分。</p> */}
//                 {/* <h4>步驟1 上傳網誌封面</h4> */}
//                 <div>
//                     <div className="input-wrapper">
//                         <label className="member-info-label">封面照片</label>
//                         {images.length > 0 ?
//                             ""
//                             :
//                             <img width="10%" src={greenMan} alt="上傳圖片示意位置" />
//                         }
//                         <div>
//                             {/* <button className="upload-btn">上傳照片</button>
//                                 <h6 className="upload-note">照片解析度400*400，檔案小於2MB</h6> */}

//                             <ImageUploading
//                                 multiple
//                                 maxFileSize="5000000"
//                                 value={images}
//                                 onChange={onChange}
//                                 onError={onError}
//                                 maxNumber={1}
//                                 acceptType={["gif", "bmp", "svg", "png", "jpg"]}
//                                 dataURLKey="data_url"
//                             >
//                                 {({
//                                     imageList,
//                                     onImageUpload,
//                                     onImageUpdate,
//                                     onImageRemove,
//                                     isDragging,
//                                     dragProps
//                                 }) => (
//                                     // write your building UI
//                                     <div className="upload__image-wrapper d-flex">
//                                         {imageList.map((image, index) => (
//                                             <div key={index} className="image-item">
//                                                 <img src={image.data_url} alt="image_url" width="100" />
//                                                 <div className="image-item__btn-wrapper">
//                                                     <button className="update-btn" onClick={() => onImageUpdate(index)}>更換</button>
//                                                     <button className="remove-btn" onClick={() => onImageRemove(index)}>移除</button>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                         <div>
//                                             <button
//                                                 className="upload-btn"
//                                                 style={isDragging ? { color: "red" } : null}
//                                                 onClick={onImageUpload}
//                                                 {...dragProps}
//                                             >
//                                                 上傳照片
//                                             </button>
//                                             <h6 className="upload-note">照片解析度400*400，檔案小於5MB</h6>

//                                         </div>

//                                     </div>
//                                 )}
//                             </ImageUploading>
//                         </div>
//                     </div>

//                     <div className="input-wrapper">
//                         <label for="title" className="member-info-label required">活動名稱</label>
//                         <input
//                             type="text"
//                             name="title"
//                             id="title"
//                             style={{ width: "100%" }}
//                             placeholder="請輸入活動名稱(20字以內)"
//                             ref={register({
//                                 required: "請輸入活動名稱",
//                                 maxLength: {
//                                     value: 20,
//                                     message: "字數須在20字以內"
//                                 }
//                             })}
//                         ></input>
//                     </div>

//                     <div className="input-wrapper">

//                         <label for="startDatetime" className="member-info-label required">活動開始時間</label>
//                         <div className="time-label-wrapper">
//                             <input
//                                 className="startDatetime"
//                                 type="datetime-local"
//                                 name="startDatetime"
//                                 id="startDatetime"
//                                 ref={register({
//                                     required: "請選擇時間",
//                                 })}
//                                 onBlur={(e) => setStartDatetime(e.target.value)}
//                             ></input>
//                         </div>
//                         <div className="time-label-wrapper">
//                             <label for="endDatetime" className="member-info-label required">活動結束時間</label>
//                             <input
//                                 className="endDatetime"
//                                 type="datetime-local"
//                                 name="endDatetime"
//                                 id="endDatetime"
//                                 min={startDatetime}
//                                 ref={register({
//                                     required: "請選擇時間",
//                                 })}
//                             ></input>
//                         </div>
//                     </div>

//                     <div className="input-wrapper">
//                         <button className="upload-btn btn" onClick={() => setAnotherTimeDrop(!anotherTimeDrop)}>{anotherTimeDrop ? "取消" : "新增時間"}</button>
//                     </div>
//                     {anotherTimeDrop &&
//                         <div className="input-wrapper">
//                             <label for="anotherStartDatetime" className="member-info-label">其他開始時間</label>
//                             <div className="time-label-wrapper">
//                                 <input
//                                     className="startDatetime"
//                                     type="datetime-local"
//                                     name="anotherStartDatetime"
//                                     id="anotherStartDatetime"
//                                     ref={register({
//                                         required: "請選擇時間",
//                                     })}
//                                     onBlur={(e) => setAnotherStartDatetime(e.target.value)}
//                                 ></input>
//                             </div>                          <div className="time-label-wrapper">
//                                 <label for="anotherEndDatetime" className="member-info-label">其他結束時間</label>
//                                 <input
//                                     className="endDatetime"
//                                     type="datetime-local"
//                                     name="anotherEndDatetime"
//                                     id="anotherEndDatetime"
//                                     min={anotherStartDatetime}
//                                     ref={register({
//                                         required: "請選擇時間",
//                                     })}
//                                 ></input>
//                             </div>
//                         </div>
//                     }


//                     <div className="input-wrapper">
//                         <label for="organizer" className="member-info-label required">主辦單位</label>
//                         <input
//                             type="text"
//                             maxLength="50"
//                             name="organizer"
//                             id="organizer"
//                             style={{ width: "100%" }}
//                             placeholder="請輸入主辦單位(50字以內)"
//                             ref={register({
//                                 required: "請輸入主辦單位",
//                                 maxLength: {
//                                     value: 50,
//                                     message: "字數須在50字以內"
//                                 }
//                             })}
//                         ></input>
//                     </div>
//                     <div className="input-wrapper">
//                         <label for="cityId" className="member-info-label required">活動地點</label>

//                         <div className="city-select-wrapper">
//                             <select
//                                 name="cityId"
//                                 className="select-auto-width"
//                                 onBlur={(e) => setCityId(e.target.value)}
//                                 ref={register({
//                                     required: "請選擇活動地點",
//                                 })}
//                             >
//                                 <option value="">請選擇</option>
//                                 {dropDown.map((dropDown, index) =>
//                                     <option key={index} value={dropDown.cityId}>{dropDown.cityName}</option>
//                                 )}
//                             </select>

//                             <select className="signUp-addr-select select-auto-width" value={addrCode} onChange={e => {
//                                 setAddrCode(e.target.value)
//                             }}>
//                                 <option value="">請選擇</option>
//                                 {districtDrop.map((fetchData, index) =>
//                                     <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
//                                 )}
//                             </select>
//                         </div>
//                         <label for="addr"></label>
//                         <input
//                             type="text"
//                             name="addr"
//                             id="addr"
//                             maxLength="50"
//                             minLength="4"
//                             size="40"
//                             ref={register({
//                                 required: "請輸入地址",
//                             })}
//                         />

//                     </div>
//                     <div className="input-wrapper">
//                         <label for="addressDesc" className="member-info-label">詳細地點</label>
//                         <input
//                             type="text"
//                             maxLength="50"
//                             name="addressDesc"
//                             id="addressDesc"
//                             style={{ width: "100%" }}
//                             placeholder="請輸入詳細地點，如:象山遊客中心...等資訊(50字以內)"
//                             ref={register({
//                                 maxLength: {
//                                     value: 50,
//                                     message: "字數須在50字以內"
//                                 }
//                             })}
//                         ></input>
//                     </div>
//                     <div className="input-wrapper">
//                         <label for="organizerInfo" className="member-info-label">聯絡資訊</label>
//                         <input
//                             type="text"
//                             maxLength="50"
//                             id="organizerInfo"
//                             placeholder="請輸入承辦人姓名、電話、e-mail等資訊(50字以內)"
//                             ref={register({
//                                 maxLength: {
//                                     value: 50,
//                                     message: "字數須在50字以內"
//                                 }
//                             })}
//                             name="organizerInfo"
//                             style={{ width: "100%" }}
//                         ></input>
//                     </div>
//                     <div className="input-wrapper">
//                         <label for="typeId" className="member-info-label required">活動類型</label>
//                         <select
//                             name="typeId"
//                             ref={register({
//                                 required: "請選擇活動類型",
//                             })}
//                         >
//                             <option value="">請選擇</option>
//                             <option value="1">實體活動</option>
//                             <option value="2">線上活動</option>
//                         </select>
//                     </div>
//                     <Form.Group className="input-wrapper" onChange={() => {
//                         getThemeCheck()
//                     }}>
//                         <Form.Label for="themeCheckbox0" className="member-info-label required">活動主題</Form.Label>
//                         <div className="theme-checkbox-wrapper">
//                             {dropDownTheme.map((dropDown, index) =>
//                                 <Form.Check
//                                     key={index}
//                                     className="theme-checkbox"
//                                     type="checkbox"
//                                     label={dropDown.themeName}
//                                     id={"themeCheckbox" + index}
//                                     name="themeCheckbox"
//                                     value={dropDown.themeId}
//                                 />
//                             )}
//                         </div>
//                     </Form.Group>

//                     <div className="input-wrapper">
//                         <label for="href" className="member-info-label">相關連結</label>
//                         <input
//                             type="text"
//                             name="href"
//                             id="href"
//                             style={{ width: "100%" }}
//                             placeholder="請輸入網址"
//                             ref={register({
//                                 pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
//                             })}
//                         ></input>
//                     </div>

//                     <div className="input-wrapper">
//                         <label for="introduction" className="member-info-label required">活動簡介</label>
//                         <JoditEditor
//                             ref={editor}
//                             value={intro}
//                             config={myConfig}
//                             // tabIndex={1} // tabIndex of textarea
//                             onBlur={newContent => {
//                                 setIntro(newContent)
//                             }}
//                         // onChange={e => setTextContent(e)}
//                         />
//                     </div>
//                     <div className="warning">
//                         <p>
//                             {errors.title ||
//                                 errors.openTime ||
//                                 errors.startDatetime ||
//                                 errors.endDatetime ||
//                                 errors.organizer ||
//                                 errors.district ||
//                                 errors.typeId ||
//                                 errors.themeId ||
//                                 errors.describe ?
//                                 '未填寫' : ""}
//                             {errors.title && '【活動名稱】、'}
//                             {errors.startDatetime && '【活動開始時間】、'}
//                             {errors.endDatetime && '【活動結束時間】、'}
//                             {errors.organizer && '【主辦單位】、'}
//                             {errors.district && '【活動地區】、'}
//                             {errors.typeId && '【活動類型】、'}
//                             {errors.themeId && '【活動主題】、'}
//                             {errors.describe && '【活動簡介】'}

//                             {errors.title ||
//                                 errors.openTime ||
//                                 errors.startDatetime ||
//                                 errors.endDatetime ||
//                                 errors.organizer ||
//                                 errors.district ||
//                                 errors.typeId ||
//                                 errors.themeId ||
//                                 errors.describe ?
//                                 '欄位' : ""}
//                         </p>
//                     </div>
//                     <div className="d-flex justify-content-center">
//                         <h6 className="agreement">
//                             <label for="agreement"></label>
//                             <input
//                                 type="checkbox"
//                                 name="agreement"
//                                 id="agreement"
//                             />同意授權本內容及圖片發布於本平台
//                         </h6>
//                     </div>
//                 </div>

//                 <div className="row bottom-btn-wrapper">
//                     <div className="btn-wrapper col-sm-6 col-md-2 col-lg-2"><button onClick={handleSubmit(submit)} className="share-green-btn">送出</button></div>
//                     <Link className="btn-wrapper col-sm-6 col-md-2 col-lg-2" to="/member/BookMarkBlog?name=綠生活網誌&link=/member/shareBlog&type=9"><button className="share-green-btn-cancel">取消</button></Link>
//                 </div>
//             </div>

//             {/* </div>
//             <Footer /> */}

//         </>
//     );
// }

// export default withRouter(MemberPage);