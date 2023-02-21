import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "../DailyGreen/Article.scss";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import ImageUploading from 'react-images-uploading';
import ComfirmAlert from '../Components/ComfirmAlert';
import JoditEditor from "jodit-react";
import { myConfig } from '../utils/JoditConfig';
import { useForm } from 'react-hook-form';
import { clickRecord, getOrgTypeDrop, getOrgTagDrop } from '../utils/API';
import { useCookies } from "react-cookie";


// import logoutIcon from "../images1/login/signUp-normal.png"


function EditOffice(props) {

    const editor = useRef(null)

    let history = useHistory()

    var serialize = require('serialize-javascript');

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identityType = greenlifeCookies.identityType
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [images, setImages] = useState([]);
    const [imageUpload, setImageUpload] = useState("");
    const [textContent, setTextContent] = useState("");
    const [showUploadBtn, setShowUploadBtn] = useState(true);
    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
    const [tag, setTag] = useState([])

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });
    //用URL抓GUID
    const setLink = () => {
        setBlogGuid(history.location.search.slice(1))
        clickRecord("BD4A247D-76BE-4015-9462-35BF994BEAAC", "10", collector)
    }

    const { register, errors, handleSubmit } = useForm({});

    const initialState = {
        typeId: "",
        title: "",
    }
    const [ourState, ourSetState] = useState(initialState);
    const { typeId, title } = ourState

    function handleEventChange(event) {
        ourSetState({ ...ourState, [event.target.name]: event.target.value });
    }

    //編輯更新綠生活照片
    const submit = () => {

        clickRecord("BD4A247D-76BE-4015-9462-35BF994BEAAC", "10", collector)
        console.log(String(blogData.tags.map(data => data.officeArticleTagId)))
        if (textContent) {
            fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Article/Edit`, {
                method: 'POST',
                body: serialize({
                    Title: encodeURIComponent(title || blogData.title),
                    Guid: blogData.guid,
                    // PicHref: blogData.picHref.replaceAll("\\", "\\\\") || "",
                    PicHref: blogData.picHref || "",
                    PictureBase64: imageUpload || "",
                    Content: encodeURIComponent(textContent),
                    TypeId: String(typeId || blogData.typeId),
                    TagId: String(selectedTag || blogData.tags.map(data => data.officeArticleTagId))
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        setShowDialog(true)
                        setAlertTitle("編輯成功")
                        history.push('/member/BookMarkOffice')
                    }
                });
        }
    }

    //單一文章內容
    const [blogData, setBlogData] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0)
        setLink()
        fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Article/ByGuid`, {
            method: 'POST',
            body: serialize({
                Guid: blogGuid
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                setBlogData(result.resultObject)
                setTag(result.resultObject.tags)
                setTextContent(result.resultObject.content)
            }
        });

    }, [props.SSL, props.domain]);



    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        if (imageList[0]) {
            setShowUploadBtn(false)
            setImageUpload(imageList[0].data_url)
        }
    };

    const onError = (errors, files) => {
        console.log(errors, files)
    }

    //機關類型列表下拉項目API
    const [typeDrop, setTypeDrop] = useState([]);
    //績優標籤列表下拉項目API
    const [tagDrop, setTagDrop] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    useEffect(() => {
        getOrgTypeDrop(setTypeDrop)
        getOrgTagDrop(setTagDrop)
    }, [])

    var arrayCheck = []

    const getThemeCheck = () => {
        var chks = document.querySelectorAll('input#resultCheckbox0[type=checkbox]:checked, input#resultCheckbox1[type=checkbox]:checked, input#resultCheckbox2[type=checkbox]:checked, input#resultCheckbox3[type=checkbox]:checked, input#resultCheckbox4[type=checkbox]:checked, input#resultCheckbox5[type=checkbox]:checked, input#resultCheckbox6[type=checkbox]:checked, input#resultCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setSelectedTag(arrayCheck)
        }
        // history.push(`/categories/green_office/participate?page=${page}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chks.length === 0 && setSelectedTag([])
    }

    console.log(String(selectedTag || blogData.tags.map(data => data.officeArticleTagId)))

    return (
        <>

            {/* <BreadCrumb currentPage={"個人專頁"} />

            <div className="container member-info-wrapper shareBlog row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            <div className="col-12 col-lg-8">
                <h2 className="dark-grey bold mb-3"><i className="fas fa-pencil-alt" aria-hidden="true"></i>&nbsp;編輯綠色辦公經驗分享</h2>
                {/* <p>歡迎上傳綠生活相關照片及影片，例如綠色餐廳吃飯自拍，綠色旅遊個人照、環保旅宿開箱...等等，若您上傳與綠生活無關的照片及影片，編輯有權將照片刪除及收回綠積分。</p> */}
                {/* <h4>步驟1 上傳文章封面</h4> */}
                <ul>
                    <div className="d-flex upload-input row">
                        <div className="col-sm-12 col-md-5 col-lg-5">
                            {identityType === "7" &&
                                <div className="mb-2">
                                    <div className="drop-input-wrapper">
                                        <label className="">機關分類</label>
                                        <select
                                            onChange={handleEventChange}
                                            value={typeId || blogData.typeId}
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
                                        <label for="merit-sort" >績優分類</label>
                                        <div>
                                            {tagDrop.map((data, index) =>
                                                <label for="merit-checkbox" key={index} className="reviewLabel">
                                                    <input key={index} type="checkbox" name="merit-checkbox" defaultChecked={tag.map(data => data.officeArticleTagId).includes(data.Key)} value={data.Key} id={"resultCheckbox" + index} onClick={() => getThemeCheck()} />
                                                    {data.Value}
                                                </label>
                                            )}
                                        </div>
                                        {/* <select
                                            onChange={handleEventChange}
                                            // || blogData?.tags[0].officeArticleTagId
                                            value={tagId}
                                            name="tagId"
                                            className="blog-input"
                                            ref={register()}
                                        >
                                            <option value="">請選擇</option>
                                            {tagDrop.map((data, index) =>
                                                <option key={index} value={data.Key}>{data.Value}</option>
                                            )}
                                        </select> */}
                                    </div>
                                </div>
                            }
                            <div>
                                <label for="title" className="required">標題</label>
                                <input
                                    onChange={handleEventChange}
                                    defaultValue={blogData.title}
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="blog-input"
                                    ref={register({
                                        required: "請輸入標題",
                                    })} />
                            </div>
                        </div>
                        <div className="d-flex col-sm-12 col-md-7 col-lg-7">

                            <ImageUploading
                                multiple
                                maxFileSize="2000000"
                                value={images}
                                onChange={onChange}
                                onError={onError}
                                maxNumber={1}
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

                                        <div className="upload__image-wrapper">
                                            {showUploadBtn ?
                                                <>
                                                    {images ?
                                                        <div
                                                            className="blog-uploadImg-btn"
                                                            style={isDragging ? { color: "red" } : null}
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            <div className="upload-img-mask">
                                                                <h5>點我更新文章封面</h5>
                                                                <div>
                                                                    <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                                                                </div>
                                                            </div>
                                                            <img className="unploaded-img" src={blogData.picHref} alt="上傳封面圖片" title="上傳封面圖片" />

                                                        </div>
                                                        :
                                                        <div
                                                            className="blog-uploadImg-btn"
                                                            style={isDragging ? { color: "red" } : null}
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            <div className="text-wrapper">
                                                                <h6><i className="fas fa-camera" aria-hidden="true"></i></h6>
                                                                <h6 className="upload-note">點擊上傳文章封面</h6>
                                                                <h6 className="upload-note">建議寬高皆大於640像素</h6>
                                                            </div>
                                                        </div>
                                                    }

                                                </>
                                                :
                                                imageList.map((image, index) => (
                                                    <div key={index} className="image-item share-blog-img">
                                                        <img src={image.data_url} width="100" alt="image_url" />
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
                </ul>


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
                        {errors.title && '【標題】、'}

                        {errors.title ||
                            errors.typeId ?
                            '欄位' : ""}
                    </p>
                </div>

                <div className="row bottom-btn-wrapper">
                    <div className="btn-wrapper col-sm-6 col-md-2 col-lg-2"><button onClick={handleSubmit(submit)} className="share-green-btn">送出</button></div>
                    <Link className="btn-wrapper col-sm-6 col-md-2 col-lg-2" to="/member/BookMarkOffice"><button className="share-green-btn-cancel">取消</button></Link>
                </div>
            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(EditOffice);