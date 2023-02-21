import React, { useState, useEffect, useRef } from 'react';
import '../Knowledge.scss';
import './greenOffice.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import { clickRecord } from '../utils/API';
import { formatDate, formatDateTime, getBgColor, getTypeBgColor } from '../utils/Functions';
import { useCookies } from "react-cookie";
import JoditEditor from "jodit-react";
import { readOnlyConfig } from '../utils/JoditConfig';
import SideBtnOffice from '../Components/SideBtnOffice';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));

function OfficePage(props) {

    let SSL = props.SSL
    let domain = props.domain
    //序列化回傳資料-取代JSON.stringify()
    var serialize = require('serialize-javascript');

    //引入router路徑紀錄
    let history = useHistory();

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const editor = useRef(null)
    const joditDate = new Date("2021-07-12")

    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [pageName, setPageName] = useState("");
    const [fetchRecData, setFetchRecData] = useState([]);
    const collectTypeId = "2"
    //透過URL抓知識guid
    const [infoGuid, setInfoGuid] = useState(history.location.search.slice(1));
    const [tag, setTag] = useState([])
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [track, setTrack] = useState(false)
    const [creatorGuid, setCreatorGuid] = useState("");
    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();

    useEffect(() => {
        // 自動產生的 Textarea 標籤 加上 title
        const textareaList = document.querySelectorAll('textarea');
        for (let idx = 0; idx < textareaList.length; idx++) {
            textareaList[idx].setAttribute("title", "textarea");
        }
        //<img/> 新增 alt 替代文字
        const joditImg = document.querySelector(".jodit-wysiwyg")
        if (joditImg !== null) {
            const img = joditImg.querySelectorAll('img')
            const title = document.querySelector("#office-page-title").textContent;
            for (let i = 0; i < img.length; i++) {
                img[i].setAttribute("alt", `${title} + "內文圖示-" + ${i}`);
            }
            // console.log(img)
        }
    })

    useEffect(() => {
        setInfoGuid(history.location.search.slice(1))
        //點閱計數API
        clickRecord(history.location.search.slice(1), "10-1", collector)
    }, [location, collector]);





    //GET單一文章內容
    useEffect(() => {
        //點閱數計數器API
        // clickRecord(infoGuid, recordTypeId, clicker)
        const uri = `${SSL}//${domain}/api/api/GOffice/Article/ByGuid`;

        fetch(uri, {
            method: 'POST',
            body: serialize({
                Guid: infoGuid
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            // console.log(res)
            return res.json();
        }).then(result => {
            console.log(result)
            if (result.isSucess) {
                setFetchData(result.resultObject)
                setTag(result.resultObject.tags)
                setPageName(result.resultObject.title)
                setCreatorGuid(result.resultObject.creatorGuid)
                //確認作者是否追蹤
                if (props.memberField && result.resultObject.creatorGuid) {
                    fetch(`${SSL}//${domain}/api/api/Common/Collect/Check`, {
                        method: 'POST',
                        body: serialize({
                            Guid: result.resultObject[0].creatorGuid,
                            Collector: collector
                        }),
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        }
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            if (result.isSucess) {
                                setTrack(result.resultObject)
                            }
                        });
                }

            } else {
                history.goBack()
            }

        })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [infoGuid, SSL, domain, serialize, collector]);


    //其他人也看過
    useEffect(() => {
        const uriRec = `${SSL}//${domain}/api/api/GOffice/Article/Recommand`;
        fetch(uriRec, {
            method: 'POST',
            body: serialize({
                Guid: infoGuid
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();

        }).then(result => {
            setFetchRecData(result.resultObject)
            // console.log(result.resultObject)

        })
    }, [infoGuid, SSL, domain, serialize])

    //取消追蹤作者(會員)
    const cancelTrack = () => {
        setShowDialog(true)
        setAlertTitle("確定要取消追蹤嗎")
        if (track) {
            fetch(`${SSL}//${domain}/api/api/Common/Collect/Cancel`, {
                method: 'POST',
                body: serialize({
                    Collector: collector,
                    Guid: creatorGuid,
                    TypeId: "3"
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {

                    if (result.isSucess) {
                        setShowDialog(true)
                        setTimeout(function () {
                            history.go(0)
                        }, 1000)
                    } else {
                        setShowDialog(true)
                        setAlertTitle("已取消追蹤")
                        setTrack(false)
                    }
                });
        }
    }


    return (
        <>
            <BreadCrumb currentPage={pageName} />
            <div className="kn">
                {/* 上方Banner */}
                <div className="container-fluid-middle">
                    <CardDeck className="row">
                        <div ref={componentRef} className="office-main-content kn-Border col-12 col-lg-9">
                            <div className="inner-content">
                                {/* <Loader loading={loading} /> */}

                                <div className="mb-3 envResponseContent">
                                    <div className="d-flex row">

                                        <div className="kn-top-content">
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
                                            <div className="d-flex kn-page-title" id="office-page-title">
                                                <h1>{fetchData.title}</h1>
                                            </div>

                                            <div className="kn-tag-name">
                                                {/* <h6>{fetchData.themes[0].themeName}</h6> */}
                                            </div>
                                            <div className="office-creator-btn-wrapper">
                                                <div className="col-md-6 col-lg-7 creator-wrapper">
                                                    <img className="avatar-img" style={{ width: "40px", height: "50px" }} src="../../../images/knowledge/avatar.png" alt="作者頭像" title="作者頭像" />
                                                    <p className="kn-creator">{fetchData.creator}</p>
                                                    <p className="">&emsp;發表於{formatDateTime(fetchData.createTime)}</p>
                                                </div>
                                                <SocialBtn className="col-md-6 col-lg-5" myStyle='' handlePrint={handlePrint} activityGuid={infoGuid} url={`knowledge/info?${infoGuid}`} title={pageName} collectTypeId={collectTypeId} collector={collector} history={history} hideHeart={true} />
                                            </div>
                                        </div>
                                        <div className="office-page-bottom-content" >
                                            <hr />
                                            <img className="" src={fetchData.picHref} alt={fetchData.title} title={fetchData.title} />

                                            {new Date(fetchData?.createTime) > joditDate ?
                                                <JoditEditor
                                                    ref={editor}
                                                    value={fetchData.content}
                                                    config={readOnlyConfig}
                                                />
                                                :
                                                <div className="office-article-page-content">
                                                    {fetchData.content &&
                                                        fetchData.content.split('<br>').map((items, index) =>
                                                            <h6 key={index}>&emsp;&emsp;{items}</h6>
                                                        )}
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-3 sideCard-container">


                            <Card className="sideCard">
                                <Card.Body>
                                    <h2 className="share-text">其他人也看過</h2>
                                    {fetchRecData.map((fetchRecData, index) =>
                                        <Link onClick={() => setInfoGuid(fetchRecData.guid)} title={fetchRecData.title} key={index} as={Link} to={`/categories/green_office/shared_articles/mypage?${fetchRecData.guid}`}>
                                            <Card className="rec-card">
                                                <div>
                                                    <img className="ev-detail-img" src={!fetchRecData.picHref ? "../../images/blankLeef.png" : `${fetchRecData.picHref}`} alt="" />
                                                    <div className="kn-rec-text">
                                                        <div className="rec-time"><h3>{formatDate(fetchRecData.createTime)}</h3></div>
                                                        <div><h4 className="kn-rec-title">{fetchRecData.title}</h4></div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>


                    </CardDeck>

                </div>
            </div>
            <SideBtnOffice history={useHistory()} />
            <Footer />
        </>
    );

}

export default withRouter(OfficePage);