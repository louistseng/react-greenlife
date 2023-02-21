import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import "../DailyGreen/Article.scss";
import '../eventDetail.scss';
import { formatDate } from '../utils/Functions';
import JoditEditor from "jodit-react";
import { useCookies } from "react-cookie";
import { readOnlyConfig } from '../utils/JoditConfig';

// import logoutIcon from "../images1/login/signUp-normal.png"

function MemberPage(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToke || "";

    const [fetchData, setFetchData] = useState([]);

    const [showUploadBtn, setShowUploadBtn] = useState(true);
    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //用URL抓GUID
    const setLink = () => {
        setBlogGuid(history.location.search.slice(1))
    }
    const editor = useRef(null)


    const onError = (errors, files) => {
        console.log(errors, files)
    }

    //單一網誌內容

    useEffect(() => {
        window.scrollTo(0, 0)
        setLink()
        if (blogGuid)
            console.log(blogGuid)
        fetch(`${SSL}//${domain}/api/api/Blog/${blogGuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result)
            if (result.isSucess) {
                setFetchData(result.resultObject)
            }

        })
    }, [blogGuid]);



    return (
        <>

            {/* <BreadCrumb currentPage={"個人專頁"} />

            <div className="container member-info-wrapper shareBlog row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}
            <div className="col-12 col-lg-8 blog-page-wrapper">
                <h2 className="dark-grey bold">{fetchData.title}</h2>
                <div className="second-title-wrapper">
                    <div className="type-marker">{fetchData.typeName}</div>
                    <div><h6>發表於{formatDate(fetchData.createTime)}</h6></div>
                </div>
                {/* <p>歡迎上傳綠生活相關照片及影片，例如綠色餐廳吃飯自拍，綠色旅遊個人照、環保旅宿開箱...等等，若您上傳與綠生活無關的照片及影片，編輯有權將照片刪除及收回綠積分。</p> */}
                {/* <h4>步驟1 上傳網誌封面</h4> */}


                {/* <div id="editor">
                    {fetchData.content}
                    </div> */}

                <div className="content-img-wrapper">
                    <div className="single-img-wrapper"><img style={{ position: "relative" }} className="content-img" alt={fetchData.title} title={fetchData.title} src={fetchData.picHref} /></div>
                </div>

                <JoditEditor
                    ref={editor}
                    value={fetchData.content}
                    config={readOnlyConfig}
                // tabIndex={1} // tabIndex of textarea  
                // onChange={e => setTextContent(e)}
                />




                {/* <h4>步驟2 輸入內容</h4> */}
            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(MemberPage);