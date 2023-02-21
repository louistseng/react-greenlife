import React, { useState, useEffect, useRef } from 'react';
import '../eventDetail.scss';
import '../Knowledge.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import followBtn from "../images1/knowledge/trackBtn.png";
import { clickRecord, addTrack } from '../utils/API';
import { formatDate, formatDateTime } from '../utils/Functions';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';
import JoditEditor from "jodit-react";
import { readOnlyConfig } from '../utils/JoditConfig';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function EventDetail(props) {

    let SSL = props.SSL
    let domain = props.domain
    //let domain = "greenlife.epa.gov.tw"

    //序列化回傳資料-取代JSON.stringify()
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken;
    //引入router路徑紀錄
    let history = useHistory();

    //會員功能api(追蹤)需要的headers
    let myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [pageName, setPageName] = useState("");
    const [creatorName, setCreatorName] = useState("");
    const [creatorGuid, setCreatorGuid] = useState("");
    const [fetchRecData, setFetchRecData] = useState([]);
    const [track, setTrack] = useState(false);
    const collectTypeId = "2"
    //透過URL抓知識guid
    const [infoGuid, setInfoGuid] = useState(history.location.search.slice(1));
    const [video, setVideo] = useState("")
    const [driveVideo, setDriveVideo] = useState("")
    const [faceBookVideo, setFaceBookVideo] = useState("")

    const editor = useRef(null)
    useEffect(() => {
        const textarea = document.querySelector("textarea")
        if (textarea !== null) {
            textarea.setAttribute("title", "textarea")
        }
        //<img/> 新增 alt 替代文字
        const jodit = document.querySelector(".jodit-wysiwyg")
        if (jodit !== null) {
            const img = jodit.querySelectorAll('img')
            const aTag = jodit.querySelectorAll('a')
            for (let i = 0; i < img.length; i++) {
                img[i].setAttribute("alt", `${fetchData[0].title}-${i + 1}`);
            }
            for (let i = 0; i < aTag.length; i++) {
                aTag[i].setAttribute("title", `${fetchData[0].title}-${i + 1}`);
                if (i === 9 || i === 10) {
                    aTag[i].remove()
                }
            }
            // console.log(img)
        }
    })

    // 文章hashtag上色
    useEffect(() => {
        const hashtag = document.querySelectorAll("#hashtag-value");
        if (hashtag !== null) {
            for (let i = 0; i < hashtag.length; i++) {
                const hashValue = hashtag[i].getAttribute("value").split("#")[1];

                switch (hashValue) {
                    case "綠色辦公": hashtag[i].style.background = "#8ACCBD";
                        break;
                    case "綠色消費": hashtag[i].style.background = "#F3A894";
                        break;
                    case "綠色旅遊": hashtag[i].style.background = "#ABDCE6";
                        break;
                    case "綠色居家": hashtag[i].style.background = "#F5E185";
                        break;
                    case "綠色飲食": hashtag[i].style.background = "#F5A626";
                        break;
                    default: hashtag[i].style.background = "#FFF";
                }

            }
        }
    })

    //抓URL改變,例如上一頁(history.push)
    useEffect(() => {
        setInfoGuid(history.location.search.slice(1))
    }, [history.location.search]);


    //GET單一知識內容
    useEffect(() => {
        //點閱數計數器API
        clickRecord(infoGuid, "14-1", collector)
        const uri = `${SSL}//${domain}/api/api/Knowledge/ByGuid`;

        fetch(uri, {
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
            if (result.isSucess) {
                setFetchData(result.resultObject)
                setPageName(result.resultObject[0].title)
                setCreatorName(result.resultObject[0].creatorName)
                setCreatorGuid(result.resultObject[0].creatorGuid)
                console.log(result)
                //確認作者是否追蹤
                if (result.resultObject[0].creatorGuid) {
                    fetch(`${SSL}//${domain}/api/api/Common/Collect/Check`, {
                        method: 'POST',
                        body: serialize({
                            Guid: result.resultObject[0].creatorGuid,
                            Collector: collector
                        }),
                        headers: myHeaders
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            if (result.isSucess) {
                                setTrack(result.resultObject)
                            }
                        });
                }
                if (result.resultObject[0].videoPath) {
                    if (result.resultObject[0].videoPath.includes('drive.google')) {
                        setDriveVideo(result.resultObject[0].videoPath.split('/')[5])
                    }
                    setVideo(result.resultObject[0].videoPath.includes('watch?v=') ? result.resultObject[0].videoPath.split('=')[1].split('&')[0] : result.resultObject[0].videoPath.substring(result.resultObject[0].videoPath.lastIndexOf('/') + 1))
                    if (result.resultObject[0].videoPath.includes("facebook")) {
                        setFaceBookVideo(result.resultObject[0].videoPath.split('v=')[1])
                    }

                }
            } else {
                history.goBack()
            }

        })
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)
    }, [infoGuid, SSL, domain, serialize, collector]);


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
                headers: myHeaders
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


    //其他人也看過
    useEffect(() => {
        const uriRec = `${SSL}//${domain}/api/api/Knowledge/Recommand`;
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

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle=" " showLoginBtn={false} history={history} />
            }
            <BreadCrumb currentPage={pageName} />
            <div className="kn">
                {/* 上方Banner */}
                <div className="container-fluid-middle">
                    <AddPoint key={infoGuid} roleId="1" targetGuid={infoGuid} roleItemId="1" autoAdd={true} />
                    <CardDeck className="row">
                        <div ref={componentRef} className="knPage-main-content kn-Border col-12 col-lg-9">
                            <div className="res-inner-content">

                                {fetchData.map((fetchData, index) =>
                                    <div key={index} className="mb-3">
                                        <div className="d-flex row content-wrapper">

                                            <div className="kn-top-content">
                                                <div className="title-wrapper">
                                                    <div>
                                                        <span className="title-tag" style={{ background: fetchData.color }}>{fetchData.typeName}</span>
                                                    </div>
                                                    <div className="d-flex kn-page-title" id="kn-page-title">
                                                        <h1>{fetchData.title}</h1>
                                                    </div>
                                                </div>
                                                <div className="kn-tag-name">
                                                    {fetchData.themes.map((data, index) =>
                                                        <p key={index} id="hashtag-value" value={data.themeName}>{data.themeName}</p>
                                                    )}
                                                </div>
                                                <div className="kn-creator-btn-wrapper">
                                                    <div className="col-md-7 col-lg-7 creator-wrapper">
                                                        <img className="avatar-img" style={{ width: "40px", height: "50px" }} src="../../images/knowledge/avatar.png" alt="作者頭貼" title="作者頭貼" />
                                                        <p className="kn-creator">{fetchData.creatorName}</p>
                                                        <p className="">&emsp;分享於{formatDate(fetchData.startDatetime)}</p>
                                                    </div>
                                                    <SocialBtn className="col-md-10 col-lg-5" myStyle='' handlePrint={handlePrint} activityGuid={infoGuid} url={`knowledge/info?${infoGuid}`} title={pageName} collectTypeId={collectTypeId} collector={collector} history={history} roleId="2" roleItemId="6" />
                                                </div>
                                            </div>
                                            <div className="kn-bottom-content" >
                                                <hr />

                                                {fetchData.videoPath
                                                    ?
                                                    fetchData.videoPath.includes("drive.google") ?
                                                        <iframe className="video-wrapper" src={`https://drive.google.com/file/d/${driveVideo}/preview`} title={fetchData.title}></iframe>
                                                        :
                                                        fetchData.videoPath.includes("facebook") ?
                                                            /* <iframe className="video-wrapper" src={fetchData.videoPath}></iframe> */
                                                            <iframe className="video-wrapper" src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${faceBookVideo}`} title={fetchData.title}></iframe>
                                                            :
                                                            <iframe className="video-wrapper" src={`https://www.youtube.com/embed/${video}`} title={fetchData.title}></iframe>
                                                    :
                                                    fetchData.picPath ?
                                                        fetchData.picPath.length > 20 ?
                                                            <img className="img-wrapper" src={fetchData.picPath} alt={fetchData.title} title={fetchData.title} />
                                                            :
                                                            ""
                                                        :
                                                        ""
                                                }
                                                {/* <h6 className="inner-article-detail">{fetchData.content}</h6> */}
                                                {<JoditEditor
                                                    ref={editor}
                                                    value={fetchData.content}
                                                    config={readOnlyConfig}
                                                />
                                                }
                                            </div>

                                        </div>
                                    </div>

                                )}
                            </div>

                        </div>
                        <div className="col-10 col-lg-3 sideCard-container">
                            <Card className="sideCard author kn-Border">
                                <Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <img className="side-avatar-img" src="../../images/knowledge/avatar.png" alt="作者頭貼" title="作者頭貼" />
                                        <div className="creator-right">
                                            <p>作者</p>
                                            <p className="kn-creator track-creator">{creatorName}</p>
                                        </div>
                                    </div>
                                    <div className="track-btn-wrapper">
                                        {track ?
                                            <button onClick={cancelTrack} className="track-btn">
                                                <div id="a">
                                                    <i className="fas fa-check" aria-hidden="true"></i>已追蹤
                                                </div>
                                                <div id="b">
                                                    <i className="fas fa-ban" aria-hidden="true"></i>取消追蹤
                                                </div>
                                            </button>
                                            :
                                            <button onClick={() => addTrack(creatorGuid, collector, memberToken, setTrack, setShowDialog, setAlertTitle)} className="track-btn"><img src={followBtn} alt="follow-button" />追蹤</button>
                                        }
                                    </div>
                                    <p className="creator-text">環保署優質小編，崇尚環保，以環保為己任。</p>
                                </Card.Body>
                            </Card>

                            <Card className="sideCard">
                                <Card.Body>
                                    <h2 className="share-text">其他人也看過</h2>
                                    {fetchRecData.map((fetchRecData, index) =>
                                        <Link onClick={() => setInfoGuid(fetchRecData.guid)} title={fetchRecData.title} key={index} as={Link} to={`/knowledge/info?${fetchRecData.guid}`}>
                                            <Card className="rec-card">
                                                <div>
                                                    <img className="ev-detail-img" src={!fetchRecData.picPath ? "../../images/blankLeef.png" : `${fetchRecData.picPath}`} alt="" />
                                                    <div className="kn-rec-text">
                                                        <div className="rec-time"><span>{formatDate(fetchRecData.startDatetime)}</span></div>
                                                        <div><p className="kn-rec-title">{fetchRecData.title}</p></div>
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
            <SideBtn history={history} />
            <Footer />
        </>
    );

}

export default withRouter(EventDetail);