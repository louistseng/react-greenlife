import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "../../DailyGreen/Article.scss";
import ComfirmAlert from '../../Components/ComfirmAlert';
import ImageUploading from 'react-images-uploading';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';
import { clickRecord, traceRecord } from '../../utils/API';
import { useCookies } from "react-cookie";


function MemberPage(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [images, setImages] = useState([]);
    const [imageInfo, setImageInfo] = useState(null);
    const [textContent, setTextContent] = useState("");
    const [showUploadBtn, setShowUploadBtn] = useState(true);
    const [valid, setValid] = useState(false);
    const [videoHref, setVideoHref] = useState("");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const formData = new FormData();

    //點閱計數API
    useEffect(() => {
        clickRecord("7AD0C05F-C84D-4CEA-B2A7-62B61D4F1FE8", "10", collector)
    }, [collector]);

    //分享綠生活照片
    const submit = () => {
        console.log(errors);
        if (textContent) {
            if (document.getElementById("videoRadio").checked) {
                document.getElementById('shareGreenBtn').style.pointerEvents = 'none';
                setErrMsg('')
                console.log("video")

                fetch(`${SSL}//${domain}/api/api/MyGreen/Video/Share`, {
                    method: 'POST',
                    body: serialize({
                        VideoPath: videoHref,
                        Content: textContent
                    }),
                    headers: myHeaders
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        console.log(result)
                        if (result.isSucess) {
                            document.getElementById('shareGreenBtn').style.pointerEvents = 'none';
                            history.push('/member/BookMarkShare?name=秀出你的綠&link=/member/shareGreen&type=2')
                        }
                    });

            } else if (document.getElementById("photoRadio").checked) {
                document.getElementById('shareGreenBtn').style.pointerEvents = 'none';
                setErrMsg('')
                console.log("photo")
                // formData.append("Creator", collector);
                formData.append("Content", encodeURIComponent(textContent));
                formData.append("file", imageInfo, imageInfo.name);
                console.log(formData)
                console.log(imageInfo)
                for (var value of formData.values()) {
                    console.log(value);
                }

                fetch(`${SSL}//${domain}/api/api/MyGreen/Pic/Add`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        "UserGuid": collector,
                        "Token": memberToken
                    }
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        if (result.isSucess) {
                            setShowDialog(true)
                            setShowText("照片/影片已送出，審核期程約3個工作天，請耐心等候")
                            document.getElementById('shareGreenBtn').style.pointerEvents = 'none';
                            history.push('/member/BookMarkShare?name=秀出你的綠&link=/member/shareGreen&type=2')
                        }

                    });
            } else {
                setErrMsg('*請選擇上傳照片或影片')
            }

        } else {
            setErrMsg('*請輸入說明欄位')
        }

    }


    const onChange = (imageList, addUpdateIndex) => {
        console.log(addUpdateIndex, imageList)
        setImages(imageList);
        document.getElementById("photoRadio").checked = true;
        if (imageList[0]) {
            if (imageList[0].file.size < 2500000) {
                if (imageList[0]) {
                    setShowUploadBtn(false)
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
        document.getElementById("photoRadio").checked = false;
        if (errors.maxFileSize) {
            setErrMsg("檔案需小於10MB")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案大小超過 5MB", myHeaders)
        } else if (errors.acceptType) {
            setShowDialog(true)
            setShowText("檔案格式僅限：gif, bmp, svg, png, jpg")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案格式不符", myHeaders)
        } else {
            console.log("other Error")
        }
    }


    const { register, errors, handleSubmit } = useForm({});

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

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={showText} subTitle=" " alertTitle={showText} showLoginBtn={false} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"個人專頁"} />
            <div className="container member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

            <div className="col-12 col-lg-8">
                <h2 className="dark-grey bold mb-3"><i class="fas fa-camera" aria-hidden="true"></i>&nbsp;分享綠生活照片/影片</h2>
                <p>歡迎上傳綠生活相關照片及影片，例如綠色餐廳吃飯自拍，綠色旅遊個人照、環保旅宿開箱...等等，若您上傳與綠生活無關的照片及影片，編輯有權將照片刪除及收回綠積分。</p>
                <h4 className="share-green-title">步驟1 選擇</h4>
                <ul>
                    <div className="d-flex row upload-input">
                        <div className="d-flex col-sm-12 col-md-6 col-lg-6">

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
                                        <div>
                                            <div className="upload__image-wrapper d-flex">
                                                <h4><input required type="radio" name="upload" id="photoRadio" value="photo" /><label for="photoRadio">上傳照片</label></h4>
                                                <div>
                                                    {showUploadBtn ?
                                                        <>
                                                            <button
                                                                className="share-green-btn"
                                                                style={isDragging ? { color: "red" } : null}
                                                                onClick={onImageUpload}
                                                                {...dragProps}
                                                            >
                                                                上傳照片
                                                            </button>
                                                            <h6 className="upload-note">檔案小於5MB</h6>
                                                        </>

                                                        :
                                                        ""
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="d-flex">
                                                    <h4>檔案名稱:&emsp;</h4>
                                                    {images.length !== 0 ?
                                                        imageList.map((image, index) => (
                                                            <h6 key={index}>
                                                                {image.file.name}</h6>
                                                        ))
                                                        :
                                                        valid ?
                                                            <a href={videoHref} target="_blank" rel="noreferrer noopener" title="影片鏈結">{videoHref}</a>
                                                            :
                                                            ""


                                                    }
                                                </div>
                                                <div className="">
                                                    <h4>檔案預覽:</h4>
                                                    {imageList.map((image, index) => (
                                                        <div key={index} className="image-item share-green-img">
                                                            <img src={image.data_url} alt="image_url" width="100" />
                                                            <div className="d-flex image-item__btn-wrapper">
                                                                <button className="share-green-btn" onClick={() => onImageUpdate(index)}><i class="fas fa-redo-alt" aria-hidden="true"></i>&nbsp;重新上傳</button>
                                                                <button className="share-green-btn" onClick={() => {
                                                                    onImageRemove(index)
                                                                    setShowUploadBtn(true)
                                                                }}>移除</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </ImageUploading>

                        </div>
                        <div className="video-input-wrapper col-sm-12 col-md-6 col-lg-6">
                            <div className="d-flex"><input disabled={images.length !== 0} type="radio" name="upload" id="videoRadio" value="video" /><h4><label for="videoRadio">上傳影片</label></h4>
                                <input
                                    className="video-input"
                                    id="videoRadio"
                                    onChange={e =>
                                        setVideoHref(e.target.value)
                                    }
                                    disabled={images.length !== 0}
                                    placeholder="請輸入網址"
                                />
                                <div>
                                    <button disabled={images.length !== 0} onClick={onSubmit} type="submit" className={videoHref === "" ? "share-green-btn-disabled" : "share-green-btn"}>新增</button>
                                </div>
                            </div>

                            <div className="warning">
                                {errors.uploadVideo && '請輸入有效網址'}
                            </div>
                            <h6 className="upload-note">請先將影片上傳至Youtube、Google雲端等來源，再輸入網址</h6>
                        </div>

                    </div>


                </ul>
                <h4 className="share-green-title">步驟2 輸入說明</h4>
                <textarea onChange={(e) => {
                    setTextContent(e.target.value)
                }}
                    name="content"
                    ref={register({
                        // required: "請輸入說明",
                        maxLength: {
                            value: 500,
                            message: "字數限制500個字元"
                        }
                    })}
                    placeholder="請輸入說明文字，字數限制500個字元"
                    rows="4" cols="2" form="usrform">
                </textarea>
                <div className="warning">
                    {errors.content && '字數限制500個字元'}
                </div>
                <div className="row bottom-btn-wrapper">
                    <h6 style={{ color: "red" }}>{errMsg}</h6>
                    <div className="btn-wrapper col-sm-6 col-md-2 col-lg-2"><button id="shareGreenBtn" onClick={handleSubmit(submit)} className="share-green-btn">送出</button></div>
                    <div className="btn-wrapper col-sm-6 col-md-2 col-lg-2" onClick={() => history.goBack()}><button className="share-green-btn-cancel">取消</button></div>
                </div>
            </div>
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(MemberPage);