import React, { useState, useEffect, useRef } from 'react';
import './Article.scss';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import ComfirmAlert from '../Components/ComfirmAlert';
import { useReactToPrint } from 'react-to-print';
import greenMan from "../images1/greenMan/greenMan.png";
import followBtn from "../images1/knowledge/trackBtn.png";
import { formatDate } from "../utils/Functions";
import { addTrack, clickRecord } from "../utils/API";
import { useCookies } from "react-cookie";

const SocialBtn = React.lazy(() => import("../Components/SocialBtn"));
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function ArticleInfo(props) {

    let SSL = props.SSL
    let domain = props.domain
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    let history = useHistory();
    var serialize = require('serialize-javascript');
    const [video, setVideo] = useState("")
    const [fetchData, setFetchData] = useState([]);
    const [creator, setCreator] = useState("");
    const [track, setTrack] = useState(false);
    const [likeClick, setlikeClick] = useState(false);
    const collectTypeId = "8"

    const [editing, setEditing] = useState(false);
    const [textContent, setTextContent] = useState("");
    const [socialBtn, setSocialBtn] = useState(false);
    const [artiGuid, setArtiGuid] = useState(history.location.search.slice(1));
    const [curLikeCount, setCurLikeCount] = useState(0);

    const [autoAdd, setAutoAdd] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "db8962e3-f9a7-487d-8b24-edb1a2afd788";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MzAzOTY3NTMsIm5iZiI6MTYzMDM5NDk1MywiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiZGI4OTYyZTMtZjlhNy00ODdkLThiMjQtZWRiMWEyYWZkNzg4In0.tqCTSXj58Mz8UslLWoRBrh1vDjywHaq3EclwVvLXSI8MA6MejkTY37c6WGl1ER6I7uzPwFJa_VTog6BkLAUToQ";
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setArtiGuid(history.location.search.slice(1))
    }, [location]);

    //文章
    useEffect(() => {
        // history.push(`/daily/article/info?${data.guid}`)
        window.scrollTo(0, 0)
        clickRecord(artiGuid, "15-1", collector)
        fetch(`${SSL}//${domain}/api/api/MyGreen/Content`, {
            method: 'POST',
            body: serialize({
                Guid: artiGuid
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setFetchData(result.resultObject)
                    setCurLikeCount(result.resultObject.likeCount)
                    setCreator(result.resultObject.creator)
                    //確認是否收藏、追蹤
                    if (collector) {
                        fetch(`${SSL}//${domain}/api/api/Common/Collect/Check`, {
                            method: 'POST',
                            body: serialize({
                                Guid: result.resultObject.creator,
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
                    if (result.resultObject.videoPath) {
                        setVideo(result.resultObject.videoPath.includes('watch?v=') ? result.resultObject.videoPath.split('=')[1].split('&')[0] : result.resultObject.videoPath.substring(result.resultObject.videoPath.lastIndexOf('/') + 1))
                    }
                }
            });

    }, [SSL, domain, serialize]);


    //確認是否按讚
    const getlikeCount = () => {
        if (collector) {
            fetch(`${SSL}//${domain}/api/api/MyGreen/Like/Check`, {
                method: 'POST',
                body: serialize({
                    Guid: artiGuid,
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        if (result.resultObject) {
                            setlikeClick(true)
                            document.getElementById("thumbIcon").setAttribute("data-prefix", "fas");
                        } else {
                            setlikeClick(false)
                            document.getElementById("thumbIcon").setAttribute("data-prefix", "far");
                        }

                    }
                });
        }
    }

    //確認是否按讚
    useEffect(() => {
        getlikeCount()
    }, [curLikeCount])

    const hoverThumb = () => {
        let thumbState = document.getElementById("thumbIcon").getAttribute("data-prefix")
        document.getElementById("thumbIcon").setAttribute("data-prefix", thumbState === "fas" ? "far" : "fas");
    }

    //按下大拇指ICON執行
    const clickThumb = () => {
        document.getElementById('thumbEvent').style.pointerEvents = 'none';

        //有登入
        if (collector) {
            //有按過讚-取消按讚API
            if (likeClick) {
                fetch(`${SSL}//${domain}/api/api/MyGreen/Like/Cancel`, {
                    method: 'POST',
                    body: serialize({
                        Guid: fetchData.guid,
                    }),
                    headers: myHeaders
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        if (result.isSucess) {
                            setCurLikeCount(result.resultObject)
                            setTimeout(function () {
                                document.getElementById('thumbEvent').style.pointerEvents = 'auto';
                            }, 100)
                        }
                    })
                //沒有按過讚-按讚API
            } else {
                //＋綠積分
                setAutoAdd(true)
                //按讚api
                fetch(`${SSL}//${domain}/api/api/MyGreen/Like`, {
                    method: 'POST',
                    body: serialize({
                        Guid: fetchData.guid,
                    }),
                    headers: myHeaders
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        if (result.isSucess) {
                            setCurLikeCount(result.resultObject)
                            setTimeout(function () {
                                document.getElementById('thumbEvent').style.pointerEvents = 'auto';
                            }, 100)
                        }
                    });
            }
            //沒有登入
        } else {
            setShowDialog(true)
            setAlertTitle("請先登入喔~")
            setTimeout(function () {
                document.getElementById('thumbEvent').style.pointerEvents = 'auto';
                setAlertTitle("請先登入喔~ ")
            }, 100)
        }

    }


    //取消追蹤作者(會員)
    const cancelTrack = () => {
        setShowDialog(true)
        setAlertTitle("確定要取消追蹤嗎")
        if (track) {
            fetch(`${SSL}//${domain}/api/api/Common/Collect/Cancel`, {
                method: 'POST',
                body: serialize({
                    Collector: collector,
                    Guid: creator,
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
                        // setTimeout(function () {
                        //     history.go(0)
                        // }, 1000)
                    }
                });
        }
    }


    //更新編輯文字
    const updateContent = () => {
        setEditing(!editing)
        if (textContent && editing) {
            clickRecord("2A5A9B27-A169-4927-A0B7-279B2C1E0B52", "15", collector)
            fetch(`${SSL}//${domain}/api/api/MyGreen/Update`, {
                method: 'POST',
                body: serialize({
                    Guid: fetchData.guid,
                    Content: textContent
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        // console.log(result)
                        setShowDialog(true)
                        setAlertTitle("編輯成功")
                        history.push("/member/BookMarkShare?name=秀出我的綠&link=/daily/article&type=2")
                    }
                });
        }

    }



    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle=" " showLoginBtn={alertTitle.includes("請先登入喔~") && true} history={props.history} />
            }
            <BreadCrumb currentPage={'內容'} />
            <AddPoint key={artiGuid} roleId="3" targetGuid={artiGuid} roleItemId="9" autoAdd={true} />
            <AddPoint key={autoAdd} roleId="2" targetGuid={artiGuid} roleItemId="3" autoAdd={autoAdd} />
            <div className="container-fluid mt-2">
                <div className="article-wrapper" ref={componentRef}>
                    <div className="green-article-page row">
                        <div className="col-sm-12 col-md-9 col-lg-9 media">
                            {!fetchData.videoPath
                                ?
                                <img className="article-img" src={fetchData.picHref} alt={fetchData.content} />
                                :
                                <iframe className="video-wrapper" title={fetchData.content} src={`https://www.youtube.com/embed/${video}`}></iframe>
                            }
                        </div>
                        <div className="right-info col-sm-12 col-md-3 col-lg-3">

                            <div className="d-flex creator">
                                <img className="clip-avatar" width="30%" alt="作者頭像" title="作者頭像" src={fetchData.creatorHeadPic ? fetchData.creatorHeadPic : greenMan} />
                                <div>
                                    <p>作者</p>
                                    <h1>{fetchData.nickName}</h1>
                                </div>
                            </div>
                            {/* 如果作者不為當前使用者-可以追蹤 */}
                            {fetchData.creator !== collector ?
                                track ?
                                    <button onClick={cancelTrack} className="track-btn">
                                        <div id="a">
                                            <i className="fas fa-check" aria-hidden="true"></i>已追蹤
                                        </div>
                                        <div id="b">
                                            <i className="fas fa-ban" aria-hidden="true"></i>取消追蹤
                                        </div>
                                    </button>
                                    :
                                    <button onClick={() => addTrack(creator, collector, memberToken, setTrack, setShowDialog, setAlertTitle)} className="track-btn"><img src={followBtn} alt="追蹤圖示" title="追蹤圖示" />追蹤</button>
                                :
                                ""
                            }
                            <div className="d-flex justify-content-between">
                                <p className="post-time">發表於{formatDate(fetchData.createDateTime)}</p>
                                {/* 如果作者為當前使用者-可以編輯 */}
                                {fetchData.creator === collector ? <h5 onClick={updateContent} className="article-info-btn" id="completebutton">{editing ? "完成" : "編輯"} </h5> : ""}
                            </div>


                            <div className="d-flex article-func">
                                <div id="thumbEvent" onClick={clickThumb} onMouseEnter={hoverThumb} onMouseLeave={hoverThumb}><i id="thumbIcon" className="far fa-thumbs-up" aria-hidden="true"></i><p>{curLikeCount}</p></div>
                                {/* toggle socialBtn */}
                                <div onClick={() => setSocialBtn(!socialBtn)}><i className="fas fa-share-alt" aria-hidden="true"></i></div>

                                {socialBtn &&
                                    <div className="arti-info-socailBtn">
                                        <SocialBtn myStyle="arti-info-shareBtn" collectTypeId={collectTypeId} handlePrint={handlePrint} hideHeart={true} title={"秀出我的綠"} url={`daily/article/info?${artiGuid}`} activityGuid={artiGuid} history={history} roleId="2" roleItemId="7" />
                                    </div>
                                }
                            </div>
                            <div className="green-article-content">

                                <div onBlur={(e) => {
                                    if (e.target.innerText.length > 500) {
                                        setErrMsg("字數限制500個字元")
                                        document.getElementById('completebutton').style.pointerEvents = 'none';
                                    } else {
                                        setTextContent(e.target.innerText)
                                        document.getElementById('completebutton').style.pointerEvents = 'auto';
                                    }
                                }} className={editing ? "high-light" : ""} contentEditable={String(editing)}>
                                    <p>{fetchData.content}</p>
                                </div>
                            </div>
                            {errMsg ? <p style={{ color: "red" }}>{errMsg}</p> : ""}
                        </div>
                    </div>
                    <div style={{ height: "40vh" }} className="search-content"></div>

                </div>

            </div>
            <Footer />
        </>
    );
}

export default withRouter(ArticleInfo);