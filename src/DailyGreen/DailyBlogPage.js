import React, { useState, useEffect, useRef } from 'react';
import '../eventDetail.scss';
import '../Knowledge.scss';

import { useReactToPrint } from 'react-to-print';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import followBtn from "../images1/knowledge/trackBtn.png";
import { clickRecord, addTrack } from '../utils/API';
import { formatDate, formatDateTime, getTypeBgColor } from '../utils/Functions';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';
import JoditEditor from "jodit-react";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const SocialBtn = React.lazy(() => import('../Components/SocialBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function DailyBlogPage(props) {

    let SSL = props.SSL
    let domain = props.domain
    // let domain = "greenlife.epa.gov.tw";
    //序列化回傳資料-取代JSON.stringify()
    var serialize = require('serialize-javascript');
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    //引入router路徑紀錄
    let history = useHistory();

    var myHeaders = new Headers({
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
    const [creatorGuid, setCreatorGuid] = useState("");
    const [fetchRecData, setFetchRecData] = useState([]);
    const [track, setTrack] = useState(false);
    const [likeClick, setlikeClick] = useState(false);
    const collectTypeId = "2"
    //透過URL抓知識guid
    const [blogGuid, setBlogGuid] = useState(history.location.search.slice(1));
    const [curLikeCount, setCurLikeCount] = useState(0);

    const [autoAdd, setAutoAdd] = useState(false);

    //文字編輯器config
    const config = {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        inline: true,
        useSearch: false,
        disablePlugins: "source"
    }

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
                img[i].setAttribute("alt", `${fetchData.title}-${i + 1}`);
            }
            for (let i = 0; i < aTag.length; i++) {
                aTag[i].setAttribute("title", `${fetchData.title}-${i + 1}`);
                if (i === 9 || i === 10) {
                    aTag[i].remove()
                }
            }
            // console.log(img)
        }
    })

    //點閱計數API
    useEffect(() => {
        clickRecord(blogGuid, "25-1", collector)
    }, [blogGuid]);

    //抓URL改變,例如上一頁(history.push)
    useEffect(() => {
        setBlogGuid(history.location.search.slice(1))
    }, [history.location.search]);

    //單一網誌內容

    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            fetch(`${SSL}//${domain}/api/api/Blog/${blogGuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setCurLikeCount(result.resultObject.likeCount)
                    setFetchData(result.resultObject)
                    setPageName(result.resultObject.title)
                    setCreatorGuid(result.resultObject.creator)
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
                }

            })
    }, [blogGuid, track]);


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

    //確認是否按讚
    const getlikeCount = () => {
        if (collector) {
            fetch(`${SSL}//${domain}/api/api/Blog/Like/Check`, {
                method: 'POST',
                body: serialize({
                    Guid: blogGuid,
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
                fetch(`${SSL}//${domain}/api/api/Blog/Like/Cancel`, {
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
                fetch(`${SSL}//${domain}/api/api/Blog/Like`, {
                    method: 'POST',
                    body: serialize({
                        Guid: fetchData.guid,
                    }),
                    headers: myHeaders
                })
                    .then(res => {
                        return res.json();
                    }).then(result => {
                        // console.log(result)
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


    //其他人也看過
    useEffect(() => {
        window.scrollTo(0, 0)
        if (blogGuid)
            fetch(`${SSL}//${domain}/api/api/Blog/Recommand/${blogGuid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setFetchRecData(result.resultObject)
                }

            })
    }, [blogGuid]);


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle=" " showLoginBtn={false} history={history} />
            }
            <BreadCrumb currentPage={pageName} />
            <AddPoint key={blogGuid} roleId="4" targetGuid={blogGuid} roleItemId="8" autoAdd={true} />
            <AddPoint key={autoAdd} roleId="2" targetGuid={blogGuid} roleItemId="4" autoAdd={autoAdd} />
            {/* <AddPoint key={blogGuid} roleId="1" targetGuid={blogGuid} autoAdd={true} /> */}
            <div className="kn">
                {/* 上方Banner */}
                <div className="container-fluid-middle">
                    <CardDeck className="row">
                        <div ref={componentRef} className="knPage-main-content kn-Border col-12 col-lg-9">
                            <div className="res-inner-content">

                                <div className="mb-3">
                                    <div className="d-flex row content-wrapper">

                                        <div className="kn-top-content">
                                            <div className="title-wrapper-withThumb">
                                                <div>

                                                    <p className="title-tag" style={getTypeBgColor(fetchData.typeId)}>{fetchData.typeName}</p>
                                                    <div className="kn-page-title" id="daily-page-title">
                                                        <h1>{fetchData.title}</h1>

                                                    </div>
                                                </div>
                                                <div className="blog-func">
                                                    <div id="thumbEvent" onClick={clickThumb} onMouseEnter={hoverThumb} onMouseLeave={hoverThumb}><i id="thumbIcon" className="far fa-thumbs-up" aria-hidden="true"></i><p>{curLikeCount}</p></div>
                                                </div>
                                            </div>

                                            <div className="kn-creator-btn-wrapper">
                                                <div className="col-md-10 col-lg-7 creator-wrapper">
                                                    <img className="avatar-img" style={{ width: "40px", height: "50px" }} src="../../images/knowledge/avatar.png" alt="作者頭貼" title="作者頭貼" />
                                                    <p className="kn-creator">{fetchData.creatorName}</p>
                                                    <p className="">&emsp;發表於{formatDateTime(fetchData.createTime)}</p>
                                                </div>
                                                <SocialBtn className="col-md-10 col-lg-5" myStyle='' handlePrint={handlePrint} activityGuid={blogGuid} url={`daily/blog/info?${blogGuid}`} title={pageName} collectTypeId={collectTypeId} collector={collector} history={history} hideHeart={true} />
                                            </div>
                                        </div>
                                        <div className="kn-bottom-content" >
                                            <hr />

                                            {
                                                fetchData.picHref ?
                                                    <img className="img-wrapper" src={fetchData.picHref} alt={fetchData.title} title={fetchData.title} />
                                                    :
                                                    ""
                                            }
                                            {/* <h6 className="inner-article-detail">{fetchData.content}</h6> */}
                                            <JoditEditor
                                                ref={editor}
                                                value={fetchData.content}
                                                config={config}
                                            />
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="col-10 col-lg-3 sideCard-container">
                            <Card className="sideCard author kn-Border">
                                <Card.Body>
                                    <div className="d-flex justify-content-center">
                                        <img className="side-avatar-img" src="../../images/knowledge/avatar.png" alt="作者頭貼" title="作者頭貼" />
                                        <div className="creator-right">
                                            <p>作者</p>
                                            <p className="kn-creator track-creator">{fetchData.creatorName}</p>
                                        </div>
                                    </div>
                                    <div className="track-btn-wrapper" key={track}>
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
                                                <button onClick={() => addTrack(creatorGuid, collector, memberToken, setTrack, setShowDialog, setAlertTitle)} className="track-btn"><img src={followBtn} alt="follow-button" />追蹤</button>
                                            :
                                            ""
                                        }
                                    </div>
                                    <p className="creator-text">環保署優質小編，崇尚環保，以環保為己任。</p>
                                </Card.Body>
                            </Card>

                            <Card className="sideCard">
                                <Card.Body>
                                    <h2 className="share-text">其他人也看過</h2>
                                    {fetchRecData.map((fetchRecData, index) =>
                                        <Link onClick={() => setBlogGuid(fetchRecData.guid)} title={fetchRecData.title} key={index} as={Link} to={`/daily/blog/info?${fetchRecData.guid}`}>
                                            <Card className="rec-card">
                                                <div>
                                                    <img className="ev-detail-img" src={!fetchRecData.picHref ? "../../images/blankLeef.png" : `${fetchRecData.picHref}`} alt="" />
                                                    <div className="kn-rec-text">
                                                        <div className="rec-time"><span>{formatDate(fetchRecData.createTime)}</span></div>
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

export default withRouter(DailyBlogPage);