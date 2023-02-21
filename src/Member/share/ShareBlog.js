import React, { useState, useEffect, useRef } from 'react';
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

function MemberPage(props) {

    const editor = useRef(null)

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";


    const [errMsg, setErrMsg] = useState("");
    const [images, setImages] = useState([]);
    const [imageInfo, setImageInfo] = useState(null);
    const [textContent, setTextContent] = useState("");
    const [showUploadBtn, setShowUploadBtn] = useState(true);

    const [themeId, setThemeId] = useState("");
    const [title, setTitle] = useState("");

    const formData = new FormData();
    const { register, errors, handleSubmit } = useForm({});

    var myHeaders = new Headers({
        "Token": memberToken
    });


    console.log(themeId)

    //點閱計數API
    useEffect(() => {
        clickRecord("4776A4D8-AD19-4726-B4DB-38395C7611CB", "25", collector)
    }, [collector]);

    //分享綠生活網誌
    const submit = () => {
        if (textContent && imageInfo) {
            var agreeCheckbox = document.querySelector('input#agreement[type=checkbox]:checked')
            console.log(agreeCheckbox)
            if (agreeCheckbox) {
                document.getElementById('shareBlogBtn').style.pointerEvents = 'none';
                setShowDialog(true)
                setShowText("網誌發布中~")
                window.scrollTo(0, 0)
                formData.append("file", imageInfo);
                // formData.append("Creator", collector);
                formData.append("Content", encodeURIComponent(textContent));
                formData.append("Title", encodeURIComponent(title))
                // formData.append("TypeId", typeId);
                formData.append("TypeId", themeId);

                console.log(title)
                console.log(imageInfo)

                for (var value of formData.values()) {
                    console.log(value);
                }

                fetch(`${SSL}//${domain}/api/api/Blog/Add`, {
                    method: 'POST',
                    body: formData,
                    headers: myHeaders
                })
                    .then(res => {
                        console.log(res)
                        return res.json();
                    }).then(result => {
                        console.log(result)
                        if (result.isSucess) {
                            setShowText("網誌已送出，審核期程約3個工作天，請耐心等候")
                            setTimeout(function () {
                                history.push('/member/BookMarkBlog?name=綠生活網誌&link=/member/shareBlog&type=3')
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


    //主題分類列表下拉項目API
    const [knThemeDrop, setKnThemeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Blog/Types`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setKnThemeDrop(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])


    const onChange = (imageList, addUpdateIndex) => {
        console.log(addUpdateIndex, imageList)
        setImages(imageList);
        if (imageList[0]) {
            if (imageList[0].file.size < 2500000) {
                if (imageList[0]) {
                    setShowUploadBtn(false)
                    // document.getElementById("photoRadio").checked = true;
                    setImageInfo(imageList[0].file)
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
                        setImageInfo(result);
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
                <h2 className="dark-grey bold mb-3"><i className="fas fa-pencil-alt" aria-hidden="true"></i>&nbsp;發表綠生活網誌</h2>
                <p>歡迎上傳綠生活相關照片及影片，例如綠色餐廳吃飯自拍，綠色旅遊個人照、環保旅宿開箱...等等，若您上傳與綠生活無關的照片及影片，編輯有權將照片刪除及收回綠積分。</p>
                <h4 className="share-green-title">步驟1 上傳網誌封面</h4>

                <div className="d-flex upload-input row">
                    <div className="col-sm-12 col-md-5 col-lg-5">
                        <div className="d-flex mb-1">
                            <label className="required">網誌分類</label>
                            <select
                                onBlur={e => setThemeId(e.target.value)}
                                name="themeId"
                                className="blog-input"
                                ref={register({
                                    required: "請選擇網誌分類",
                                })}
                            >
                                <option value="">請選擇</option>
                                {knThemeDrop.map((data, index) =>
                                    <option key={index} value={data.id}>{data.name}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label for="title" className="required">網誌標題</label>
                            <input
                                onBlur={e => setTitle(e.target.value)}
                                id="title"
                                name="title"
                                type="text"
                                className="blog-input"
                                ref={register({
                                    required: "請輸入網誌標題",
                                    maxLength: {
                                        value: 50,
                                        message: "需小於50個字元"
                                    }
                                })} />
                        </div>
                    </div>
                    <div className="d-flex col-sm-12 col-md-7 col-lg-7">
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
                                <>
                                    <div className="upload__image-wrapper w-100">
                                        {showUploadBtn ?
                                            <>
                                                <div
                                                    className="blog-uploadImg-btn"
                                                    style={isDragging ? { color: "red" } : null}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <div className="text-wrapper">
                                                        <h6><i className="fas fa-camera" aria-hidden="true"></i></h6>
                                                        <h6 className="upload-note">點擊上傳網誌封面</h6>
                                                        <h6 className="upload-note">建議寬高皆大於640像素</h6>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            imageList.map((image, index) => (
                                                <div key={index} className="image-item share-blog-img">
                                                    <img src={image.data_url} alt="image_url" width="100" />
                                                    <div className="d-flex justify-content-end image-item__btn-wrapper">
                                                        <button className="share-green-btn" onClick={() => onImageUpdate(index)}><i className="fas fa-redo-alt" aria-hidden="true"></i>&nbsp;重新上傳</button>
                                                        {/* <button className="share-green-btn" onClick={() => {
                                                                    onImageRemove(index)
                                                                    setShowUploadBtn(true)
                                                                }}>移除</button> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>


                                </>
                            )}
                        </ImageUploading>

                    </div>


                </div>
                <h4 className="share-green-title">步驟2 輸入內容</h4>
                <JoditEditor
                    ref={editor}
                    value={textContent}
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
                        {errors.title && '【網誌標題】、'}
                        {errors.typeId && '【網誌分類】'}

                        {errors.title ||
                            errors.typeId ?
                            '欄位' : ""}

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
                <div className="row bottom-btn-wrapper">
                    <div className="btn-wrapper col-sm-6 col-md-2 col-lg-2"><button id="shareBlogBtn" onClick={handleSubmit(submit)} className="share-green-btn">送出</button></div>
                    <Link className="btn-wrapper col-sm-6 col-md-2 col-lg-2" to="/daily/article"><button className="share-green-btn-cancel">取消</button></Link>
                </div>
            </div>
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(MemberPage);