import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import "../../DailyGreen/Article.scss";
import JoditEditor from "jodit-react";
import '../../Components/css/suneditor.min.css';
import ImageUploading from 'react-images-uploading';
import ComfirmAlert from '../../Components/ComfirmAlert';
import { myConfig } from '../../utils/JoditConfig';

import { clickRecord, traceRecord, getOrgTypeDrop, getOrgTagDrop } from '../../utils/API';
import { useCookies } from "react-cookie";


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
    const identityType = greenlifeCookies.identityType

    const [errMsg, setErrMsg] = useState("");
    const [images, setImages] = useState([]);
    const [imageInfo, setImageInfo] = useState(null);
    const [textContent, setTextContent] = useState("");
    const [showUploadBtn, setShowUploadBtn] = useState(true);


    const formData = new FormData();
    const { register, errors, handleSubmit } = useForm({});

    var myHeaders = new Headers({
        "Token": memberToken
    });


    //點閱計數API
    useEffect(() => {
        clickRecord("7AD0C05F-C84D-4CEA-B2A7-62B61D4F1FE8", "10", collector)
    }, [collector]);

    //分享經驗分享文章
    const submit = (data) => {
        console.log(data)
        if (textContent) {
            setShowDialog(true)
            setShowText("發布中~")
            window.scrollTo(0, 0)
            document.getElementById('shareBlogBtn').style.pointerEvents = 'none';
            var agreeCheckbox = document.querySelector('input#agreement[type=checkbox]:checked')
            if (agreeCheckbox) {
                formData.append("file", imageInfo);
                // formData.append("Creator", collector);
                formData.append("Content", encodeURIComponent(textContent));
                formData.append("Title", encodeURIComponent(data.title))
                // formData.append("TypeId", typeId);
                formData.append("TypeId", data.typeId);
                formData.append("TagId", data.tagId);

                console.log(imageInfo)

                for (var value of formData.values()) {
                    console.log(value);
                }

                fetch(`${SSL}//${domain}/api/api/GOffice/Article/Add`, {
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
                            //組織帳號須審核, 系統帳號直接前台上架
                            setShowText("經驗分享文章已送出，審核期程約3個工作天，請耐心等候")
                            setTimeout(function () {
                                history.push('/member/BookMarkOffice')
                            }, 500)
                        }
                    });
            } else {
                setErrMsg('請勾選同意授權')
            }

        } else {
            setErrMsg('*請輸入說明欄位')
        }

    }



    //機關類型列表下拉項目API
    const [typeDrop, setTypeDrop] = useState([]);
    //績優標籤列表下拉項目API
    const [tagDrop, setTagDrop] = useState([]);
    useEffect(() => {
        getOrgTypeDrop(setTypeDrop)
        getOrgTagDrop(setTagDrop)
    }, [])


    const onChange = (imageList, addUpdateIndex) => {
        console.log(addUpdateIndex, imageList)
        setImages(imageList);
        if (imageList[0]) {
            if (imageList[0].file.size < 500000) {
                setImages(imageList);
                if (imageList[0]) {
                    setShowUploadBtn(false)
                    // document.getElementById("photoRadio").checked = true;
                    setImageInfo(imageList[0].file)
                    setErrMsg("")
                }
            } else {
                setErrMsg("檔案需小於5MB")
                setImages("");
                setShowUploadBtn(true)
            }
        }

    };

    const onError = (errors, files) => {
        if (errors.maxFileSize) {
            setShowDialog(true)
            setShowText("檔案需小於 5MB")
            traceRecord(collector, "6E9B601E-42F4-49A8-8584-4677BA58154C", "5", "上傳檔案大小超過 5MB", myHeaders)
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
                <h2 className="dark-grey bold mb-3"><i className="fas fa-pencil-alt" aria-hidden="true"></i>&nbsp;發布綠色辦公經驗分享文章</h2>
                <p className="office-upload-desc">&emsp;&emsp;歡迎分享綠色辦公經驗精彩事蹟，您可以用圖文的方式讓大家更加認識貴單位唷，提醒您，文章發布後需3個工作天審核，審核通過後即可於綠色辦公專區看到您的文章內容。</p>
                <div className="upload-input">
                    {identityType === "7" &&
                        <div className="d-flex mb-2">
                            <div className="drop-input-wrapper">
                                <label className="">機關分類</label>
                                <select
                                    name="typeId"
                                    className="blog-input"
                                    ref={register()}
                                >
                                    <option value="">請選擇</option>
                                    {typeDrop.map((data, index) =>
                                        <option key={index} value={data.officeArticleTypeId}>{data.officeArticleTypeName}</option>
                                    )}
                                </select>
                            </div>
                            <div className="drop-input-wrapper">
                                <label className="">績優分類</label>
                                <select
                                    name="tagId"
                                    className="blog-input"
                                    ref={register()}
                                >
                                    <option value="">請選擇</option>
                                    {tagDrop.map((data, index) =>
                                        <option key={index} value={data.Key}>{data.Value}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    }

                    <div className="d-flex mb-1">
                        <label for="title" className="required">文章標題</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="office-upload-input"
                            ref={register({
                                required: "請輸入網誌標題",
                            })} />
                    </div>

                    <div className="d-flex">
                        <label for="uploadImage" className="">上傳封面</label>

                        <ImageUploading
                            multiple
                            maxFileSize="5000000"
                            value={images}
                            onChange={onChange}
                            onError={onError}
                            maxNumber={1}
                            acceptType={["gif", "bmp", "svg", "png", "jpg", "jpeg"]}
                            dataURLKey="data_url"
                            id="uploadImage"
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
                                    <div className="upload__image-wrapper-office">
                                        {showUploadBtn ?
                                            <>
                                                <div className="d-flex">
                                                    <div>
                                                        <button
                                                            className="upload-btn"
                                                            style={isDragging ? { color: "red" } : null}
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            上傳照片
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="office-uploadImg-btn"
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



                <h4 className="share-green-title">文章內容</h4>

                {/* <CKEditor
                        editor={ClassicEditor}
                        data="<p>請輸入網誌內容(10,000字以內)</p>"
                        config={{
                            ckfinder: {
                                uploadUrl: '/Blog/UploadImage'
                            },
                            // plugins: [SimpleUploadAdapter],
                        }}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            setTextContent(data)
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
                    value={textContent}
                    config={myConfig}
                    // tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => setTextContent(newContent)}
                // onChange={e => setTextContent(e)}
                />

                <div className="warning">
                    <p>

                        {errors.title && '*未填寫必填欄位【文章標題】、'}
                        {images.length === 0 && '＊未上傳封面'}

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
                <div className="row bottom-btn-wrapper-office bottom-btn-wrapper">
                    <div className="btn-wrapper col-sm-6 col-md-2 col-lg-2"><button id="shareBlogBtn" onClick={handleSubmit(submit)} className="share-green-btn">送出審核</button></div>
                    <Link className="btn-wrapper col-sm-6 col-md-2 col-lg-2" to="/daily/article"><button className="share-green-btn-cancel">取消</button></Link>
                </div>
            </div>
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(MemberPage);