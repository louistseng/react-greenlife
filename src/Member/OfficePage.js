import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import "../DailyGreen/Article.scss";
import "../GreenOffice/greenOffice.scss";
import { formatDate, getBgColor, getTypeBgColor } from '../utils/Functions';
import { readOnlyConfig } from '../utils/JoditConfig';
import JoditEditor from "jodit-react";

// import logoutIcon from "../images1/login/signUp-normal.png"

function OfficePage(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [fetchData, setFetchData] = useState([]);
    const [textContent, setTextContent] = useState("");

    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
    const [tag, setTag] = useState([])


    //用URL抓GUID
    const setLink = () => {
        setBlogGuid(history.location.search.slice(1))
    }
    const editor = useRef(null)


    const onError = (errors, files) => {
        console.log(errors, files)
    }

    //單一經驗分享文章內容

    useEffect(() => {
        window.scrollTo(0, 0)
        setLink()
        if (blogGuid)
        fetch(`${SSL}//${domain}/api/api/GOffice/Article/ByGuid`, {
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
                setFetchData(result.resultObject)
                setTextContent(result.resultObject.content)
                setTag(result.resultObject.tags)
            }
        })
    }, [blogGuid]);


    return (
        <>

            {/* <BreadCrumb currentPage={"個人專頁"} />

            <div className="container member-info-wrapper shareBlog row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}
            <div className="col-12 col-lg-8 blog-page-wrapper">
                <div className="award-btn">
                    {tag.map((tag, index) =>
                        <div key={index} className="companyAwards"
                            style={getBgColor(tag.officeArticleTagId)}>
                            {tag.officeArticleTagName}</div>
                    )}
                    <div className="companyAwards"
                        style={getTypeBgColor(fetchData.typeId)}>
                        {fetchData.typeName}</div>
                </div>
                <div className="d-flex kn-page-title">
                    <h6>{fetchData.title}</h6>
                </div>
                <div className="second-title-wrapper">
                    <div><h6>發表於{formatDate(fetchData.createTime)}</h6></div>
                </div>
                <img src={fetchData.picHref} className="share-page-img" alt="圖示"/>

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

export default withRouter(OfficePage);