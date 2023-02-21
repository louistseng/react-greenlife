import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import "../../DailyGreen/Article.scss";
import JoditEditor from "jodit-react";
import '../../Components/css/suneditor.min.css';
import ImageUploading from 'react-images-uploading';
import ComfirmAlert from '../../Components/ComfirmAlert';
import { myConfig } from '../../utils/JoditConfig';
import { clickRecord, traceRecord } from '../../utils/API';
import { useCookies } from "react-cookie";
import Compressor from 'compressorjs';
import { Form } from 'react-bootstrap';
import { formatDateTime, formatDate, formatDateTimeDash } from "../../utils/Functions"


function ShareKnowledge(props) {

    const editor = useRef(null)

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    var serialize = require('serialize-javascript');

    const params = new URLSearchParams(history.location.search);
    const blogGuid = params.get('edit')
    const editMode = Boolean(params.get('edit'))
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";


    const [showUploadBtn, setShowUploadBtn] = useState(true);
    const [errMsg, setErrMsg] = useState(""); //img 錯誤訊息
    const [images, setImages] = useState([]); // img_url
    const [imageUpload, setImageUpload] = useState("");
    const [reUploadImg, setReUploadImage] = useState(false);
    const [textContent, setTextContent] = useState(""); //內容

    const [title, setTitle] = useState(""); //標題
    const [date, setDate] = useState(""); //時間
    const [typeId, setTypeId] = useState(""); //知識分類
    const [themeId, setThemeId] = useState([]) //主題分類
    const [videoHref, setVideoHref] = useState(""); //影片
    const [valid, setValid] = useState(false);
    const [href, setHref] = useState("");



    const formData = new FormData();
    const { register, errors, handleSubmit } = useForm({});

    var myHeaders = new Headers({
        "Token": memberToken
    });

    const onSubmit = () => {
        var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        if (videoHref && videoHref.match(re)) {
            setValid(true)
            document.getElementById("videoRadio").checked = true;
            setErrMsg("")
        } else {
            setErrMsg("請輸入有效網址")
        }
        console.log("not match")

    }

    // const [memberInfo, setMemberInfo] = useState([])
    // useEffect(() => {
    //     getMemberProfile(collector, memberToken)
    //         .then(
    //             result => {
    //                 if (result.isSucess) {
    //                     setMemberInfo(result.resultObject.name)
    //                     console.log("result", result)
    //                 }
    //             }
    //         )
    // }, [collector, memberToken])



    //點閱計數API
    useEffect(() => {
        clickRecord("4776A4D8-AD19-4726-B4DB-38395C7611CB", "25", collector)
    }, [collector]);


    //分享知識綠
    const submit = () => {
        if (textContent && imageUpload) {
            var agreeCheckbox = document.querySelector('input#agreement[type=checkbox]:checked')
            // console.log(agreeCheckbox)
            if (agreeCheckbox) {
                // document.getElementById('shareBlogBtn').style.pointerEvents = 'none';
                setShowDialog(true)
                setShowText("文章發布中~")
                window.scrollTo(0, 0)
                formData.append("Title", encodeURIComponent(title));
                formData.append("Content", encodeURIComponent(textContent));
                formData.append("guid", blogGuid);
                formData.append("startDatetime", date);
                formData.append("TypeId", typeId);
                formData.append("ThemeId", themeId);
                formData.append("PictureBase64", imageUpload);
                formData.append("VideoPath", videoHref);

                for (var value of formData.values()) {
                    // console.log(value);
                }

                fetch(`${SSL}//${domain}/api/api/Knowledge/Add`, {
                    method: 'POST',
                    body: formData,
                    headers: myHeaders
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        // console.log(result)
                        if (result.isSucess) {
                            setShowText("知識綠文章已送出，審核期程約3個工作天，請耐心等候")
                            setTimeout(function () {
                                history.push('/member/knowledge_management')
                            }, 500)
                        }
                    });
            } else {
                setErrMsg('請勾選同意授權')
            }

        } else {
            setErrMsg('*請確認是否填妥必填欄位')
        }

    }

    const submitEdit = (data) => {
        formData.append("Title", encodeURIComponent(data.title) || blogData.title);
        formData.append("Content", textContent || blogData.content);
        formData.append("Guid", blogGuid);
        formData.append("StartDatetime", formatDateTime(data.startDatetime || blogData.startDatetime));
        formData.append("TypeId", String(data.typeId) || blogData.typeId);
        formData.append("ThemeId", String(themeId) || blogData.themeId);
        formData.append("PicPath", blogData.picPath || "");
        formData.append("PictureBase64", imageUpload);
        formData.append("VideoPath", data.videoRadio || blogData.videoPath);

        for (var value of formData.values()) {
            // console.log(value);
        }

        fetch(`${props.SSL}//${props.domain}/api/api/Knowledge/Edit`, {
            method: 'POST',
            body: formData,
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    // console.log(result)
                    setShowDialog(true)
                    setShowText("知識綠文章已更新，審核中，請耐心等候")
                    setTimeout(function () {
                        history.push('/member/knowledge_management')
                    }, 500)
                    // history.push('/member/BookMarkKnowledge?name=知識綠&link=/member/shareKnowledge&type=4')
                }
            });


    }

    //單一活動內容
    const [blogData, setBlogData] = useState([]);
    const [dateTime, setDateTime] = useState()
    useEffect(() => {
        if (editMode)
            fetch(`${props.SSL}//${props.domain}/api/api/Knowledge/ByGuid`, {
                method: 'POST',
                body: serialize({
                    Guid: blogGuid
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
                        setBlogData(result.resultObject[0])
                        setTypeId(result.resultObject[0].typeId)
                        setThemeId(result.resultObject[0].themes.map(obj => obj.themeId))
                        setDateTime(result.resultObject[0].startDatetime.split('T')[0])
                    }
                });
    }, [props.SSL, props.domain]);

    //知識分類列表下拉項目API
    const [knTypeDrop, setKnTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Knowledge/Type/Count`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setKnTypeDrop(result.resultObject.filter(d => d.typeName != "文宣"))
                // console.log("知識", result)
            });
    }, [SSL, domain])



    //活動主題下拉選單API
    const [dropDownTheme, setDropDownTheme] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Knowledge/Theme`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDropDownTheme(result.resultObject)
                // console.log(result.resultObject)
            });
    }, [SSL, domain])

    //主題分類checkbox
    var arrayCheck = []
    const getThemeCheck = () => {
        var chks = document.querySelectorAll('input#themeCheckbox0[type=checkbox]:checked, input#themeCheckbox1[type=checkbox]:checked, input#themeCheckbox2[type=checkbox]:checked, input#themeCheckbox3[type=checkbox]:checked, input#themeCheckbox4[type=checkbox]:checked, input#themeCheckbox5[type=checkbox]:checked, input#themeCheckbox6[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setThemeId(arrayCheck)
            // console.log("checkbox", arrayCheck)
        }
        chks.length === 0 && setThemeId([])
    }

    const onChange = (imageList, addUpdateIndex) => {
        console.log("img", addUpdateIndex, imageList)
        setImages(imageList);
        if (imageList[0]) {
            setImageUpload(imageList[0].data_url)
            if (imageList[0].file.size < 2500000) {
                if (imageList[0]) {
                    setShowUploadBtn(false)
                    setErrMsg("")

                }
            } else {
                // setErrMsg("檔案需小於5MB")
                // setImages("");
                setShowUploadBtn(false)
                //照片大於2.5MB的話, 壓縮照片到原本的0.1倍
                new Compressor(imageList[0].file, {
                    quality: 0.1,
                    success(result) {
                        console.log(result)
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
            setErrMsg("檔案需小於10MB")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案大小超過 10MB", myHeaders)
        } else if (errors.acceptType) {
            setShowDialog(true)
            setShowText("檔案格式僅限：gif, bmp, svg, png, jpg")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案格式不符", myHeaders)
        } else {
            console.log("other Error")
        }
    }

    // const [detail, setDetail] = useState([])
    // // const pageDesign = [figma cssExmple]
    // // const pageApi = [public api]
    // // const pageData = [food]
    // useEffect(() => {
    //     fetch(`${SSL}//${domain}/api/api/Knowledge/Theme`, {
    //         method: "GET",
    //     }).then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             setDetail(result.resultObject)
    //         })
    // }, [])

    return (
        <>
            <div className={showDialog ? "black-background show" : "black-background"}></div>
            {showDialog &&
                <ComfirmAlert key={showText} subTitle=" " alertTitle={showText} showLoginBtn={false} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"個人專頁"} />
            <div className="container member-info-wrapper shareBlog row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}
            <div className="col-12 col-lg-8">
                <h2 className="dark-grey bold mb-3"><i className="fas fa-pencil-alt" aria-hidden="true"></i>&nbsp;知識綠上傳</h2>

                <div className="d-flex upload-input row">
                    <div className="col-sm-12 col-md-5 col-lg-5">
                        <div>
                            <label for="title" className="required">文章標題</label>
                            <input
                                onBlur={e => setTitle(e.target.value)}
                                name="title"
                                id="title"
                                className="blog-input"
                                placeholder="請輸入標題(150字以內)"
                                defaultValue={blogData.title}
                                ref={register({
                                    required: "請輸入文章標題",
                                    maxLength: {
                                        value: 150,
                                        message: "字數須在150字以內"
                                    }
                                })}
                            ></input>
                        </div>
                        <div>
                            <label for="uploadTime" className={!editMode && "required"} style={{ marginRight: editMode && "7px" }}>上架時間</label>
                            <input
                                onBlur={e => setDate(e.target.value)}
                                defaultValue={dateTime}
                                disabled={editMode}
                                id="uploadTime"
                                name="uploadTime"
                                type="date"
                                className="blog-input"
                                ref={register({
                                    required: "請選擇上架時間",
                                })} />
                        </div>
                        <div className="d-flex mb-1">
                            <label for="typeId" className="required">知識分類</label>
                            <select
                                onBlur={e => setTypeId(e.target.value)}
                                key={typeId}
                                defaultValue={typeId}
                                id="typeId"
                                name="typeId"
                                className="blog-input"
                                ref={register({
                                    required: "請選擇知識分類",
                                })}
                            >
                                <option value="">請選擇</option>
                                {knTypeDrop.map((data, index) =>
                                    <option key={index} value={data.typeId} selected={typeId === data.typeId} >{data.typeName}</option>
                                )}
                            </select>
                        </div>

                        {/* <div>
                            <label for="href" className="mr-1">相關連結</label>
                            <input
                                onBlur={e => setHref(e.target.value)}
                                name="href"
                                id="href"
                                className="blog-input"
                                placeholder="請輸入連結"
                                defaultValue={blogData.href}
                            ></input>
                        </div> */}

                        <Form.Group className="" onChange={() => {
                            getThemeCheck()
                        }}>
                            <Form.Label for="themeCheckbox0" className="d-block required">主題分類</Form.Label>
                            <div className="theme-checkbox-wrapper">
                                {dropDownTheme.map((dropDown, index) =>
                                    <Form.Check
                                        key={index}
                                        className="theme-checkbox"
                                        type="checkbox"
                                        label={dropDown.value}
                                        id={"themeCheckbox" + index}
                                        name="themeCheckbox"
                                        value={dropDown.key}
                                        defaultChecked={blogData.themes?.map(obj => obj.themeId).includes(index + 1)}

                                    />
                                )}
                            </div>
                        </Form.Group>
                    </div>
                    {(editMode && blogData.picPath !== null && !reUploadImg) &&
                        <div className="col-sm-12 col-md-7 col-lg-7">
                            <img width="100%" style={{ maxWidth: "500px" }} src={blogData.picPath} alt="封面圖片" />
                            <button onClick={() => setReUploadImage(true)} className="share-green-btn">重新上傳</button>
                        </div>}
                    <div className="d-flex col-sm-12 col-md-7 col-lg-7 image-upload">
                        {(reUploadImg || !editMode) &&
                            <ImageUploading
                                multiple
                                maxFileSize="10485760"
                                value={images}
                                defaultValue={blogData.picPath}
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
                                    <>
                                        <div className="upload__image-wrapper w-100">
                                            {showUploadBtn ?
                                                <>
                                                    <label>封面照片:</label>
                                                    <div
                                                        className="blog-uploadImg-btn"
                                                        style={isDragging ? { color: "red" } : null}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                    >
                                                        <div className="text-wrapper">
                                                            <h6><i className="fas fa-camera" aria-hidden="true"></i></h6>
                                                            <h6 className="upload-note">點擊上傳文章封面</h6>
                                                            <h6 className="upload-note">照片解析度400*400，檔案小於5MB</h6>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                imageList.map((image, index) => (
                                                    <div key={index} className="image-item share-blog-img">
                                                        <img src={image.data_url ? image.data_url : blogData.picPath} alt="image_url" style={{ height: "50%", verticalAlign: "center" }} />
                                                        <div className="d-flex justify-content-end image-item__btn-wrapper">
                                                            <button className="share-green-btn" onClick={() => onImageUpdate(index)}><i className="fas fa-redo-alt" aria-hidden="true"></i>&nbsp;重新上傳</button>
                                                            <button className="share-green-btn" onClick={() => {
                                                                onImageRemove(index)
                                                                setShowUploadBtn(true)
                                                            }}>移除</button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>


                                    </>
                                )}
                            </ImageUploading>
                        }
                    </div>

                    <div className="col-sm-12 col-md-5 col-lg-5 mt-4"></div>
                    <div className="col-sm-12 col-md-7 col-lg-7 mt-4">
                        <div className="d-flex"><input disabled={images.length !== 0} type="radio" name="upload" id="videoRadio" value="video" /><h4><label for="videoRadio">上傳影片</label></h4>
                            <input
                                onBlur={e =>
                                    setVideoHref(e.target.value)
                                }
                                defaultValue={blogData.videoHref}
                                type="text"
                                id="videoRadio"
                                className="video-input"
                                name="videoRadio"
                                placeholder="請輸入網址"
                                ref={register({
                                    maxLength: {
                                        value: 100,
                                        message: "字數須在100字以內"
                                    }
                                })}
                            />
                            <div>
                                <button disabled={images.length !== 0} onClick={onSubmit} type="submit" className={videoHref === "" ? "share-green-btn" : "share-green-btn-disabled"}>新增</button>
                            </div>
                        </div>

                        <div className="warning">
                            {errors.uploadVideo && '請輸入有效網址'}
                            {blogData.videoPath || videoHref ?
                                valid ?
                                    <a href={videoHref} target="_blank" rel="noreferrer noopener" title="影片鏈結">{videoHref}</a>
                                    :
                                    <a href={blogData.videoPath} target="_blank" rel="noreferrer noopener" title="影片鏈結">{blogData.videoPath}</a>
                                :
                                <h6 className="upload-note mb-4">請先將影片上傳至Youtube、Google雲端等來源，再輸入網址</h6>
                            }
                        </div>
                    </div>
                </div>
                <h4 className="share-green-title">文章內容</h4>
                <JoditEditor
                    ref={editor}
                    value={blogData.content}
                    config={myConfig}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setTextContent(newContent)}
                // onChange={e => setTextContent(e)}
                />

                <div className="warning">
                    <p>
                        {errors.title ||
                            errors.typeId ?
                            '未填寫' : ""}
                        {errors.title && '【文章標題】、'}
                        {errors.typeId && '【分類】'}
                    </p>
                    <p>{errMsg}</p>
                </div>
                <div className="d-flex">
                    <h6>
                        <label for="agreement"></label>
                        <input
                            type="checkbox"
                            name="agreement"
                            id="agreement"
                        />同意授權本內容及圖片發布於本平台
                    </h6>
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

export default withRouter(ShareKnowledge);