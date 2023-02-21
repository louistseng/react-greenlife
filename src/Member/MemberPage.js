import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { clickLogout, detectMob } from '../utils/Functions';
import "./MemberPage.scss";
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import WordCloud from '../Components/WordCloud';

import greenLeef from "../images1/greenMan/blankLeef1.png";
import greenMan from "../images1/greenMan/greenMan.png";
import treePng from '../images1/greenPoint/point-tree.png';
import fishPng from '../images1/greenPoint/point-fish.png';
import greenManPng from '../images1/greenMan/greenManStep.png';

import { clickRecord, getMemberCard, fetchMyTotalGreenShop, getMemberProfile, EditDesignationPic } from '../utils/API';
import { useCookies } from "react-cookie";

import { AuthContext } from '../utils/Context';

import PropTypes from 'prop-types'
import Tour from 'reactour'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const Points = React.lazy(() => import('../Components/GreenPoint/Points'));

function MemberPage(props) {

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identityType = greenlifeCookies.identityType

    const { setContextMemberInfo, contextFriendGuid } = useContext(AuthContext);

    const [trace, setTrace] = useState([]);

    const [greenLifeResult, setGreenLifeResult] = useState([]);
    const [memberData, setMemberData] = useState([]);

    const [memberInfo, setMemberInfo] = useState([])

    //API規則:如果有傳Token且有效, 則以token這個使用者優先
    //所以這裡如果contextFriendGuid存在(有點擊綠友), 就headers就用myFriendHeader,才能取到綠友資料
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });
    var myFriendHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8"
    });

    useEffect(() => {
        //第一次登入的話 使用者指南setOpen(true)
        if (props.location.state?.firstLogin) {
            setOpen(true)
        }
        //點閱計數API
        clickRecord("E59882A6-8B22-4C47-A9CD-099CA1C50E0F", "18", collector)
    }, []);


    //call會員資料的api
    useEffect(() => {
        getMemberProfile(collector, memberToken, clickLogout, removeCookie)
            .then(result => {
                if (result.isSucess) {
                    setMemberInfo(result.resultObject)
                    setDesignationPicId(result.resultObject.designationId)
                }
            })
        getMemberCard(collector, contextFriendGuid, memberToken, setMemberData, clickLogout, removeCookie)
    }, [contextFriendGuid])


    //會員-綠生活成果
    useEffect(() => {
        window.scrollTo(0, 0)
        if (memberToken) {
            const urlToken = `${props.SSL}//${props.domain}/api/api/Member/Report`
            const urlGuid = `${props.SSL}//${props.domain}/api/api/Member/Report/${contextFriendGuid || collector}`
            fetch(urlGuid, {
                method: 'GET',
                headers: contextFriendGuid ? myFriendHeaders : myHeaders
            })
                .then(res => {
                    //401使用者驗證錯誤的話, 清除cookie資料, 自動導回登入頁
                    if (res.status === 401) {
                        clickLogout(removeCookie, collector)
                        throw new Error(res.statusText);
                    } else {
                        return res.json();
                    }
                }).catch(error => console.error('Error:', error))
                .then(result => {
                    if (result.isSucess) {
                        setTrace(result.resultObject.trace)
                        setGreenLifeResult(result.resultObject.greenLifeResult)
                    }
                })
        }
    }, [collector, memberToken, contextFriendGuid]);


    //自己多少魚多少樹
    const [myFetchGreenShop, setMyFetchGreenShop] = useState([]);
    useEffect(() => {
        fetchMyTotalGreenShop(memberToken, setMyFetchGreenShop)
    }, []);

    //綠生活軌跡-自己可用的稱號圖片
    const [picOptions, setPicOptions] = useState(false)
    const [designationPic, setDesignationPic] = useState([]);
    const [designationPicId, setDesignationPicId] = useState(0);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/Member/DesignationPic`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDesignationPic(result.resultObject)
            });
    }, [])

    // 活動專頁訪客註冊登入跳轉頁面
    // 前導頁導向設定
    useEffect(() => {
        const getLoginType = sessionStorage.getItem("loginType");
        const gameLogin = sessionStorage.getItem("gameLogin");
        const knGameLogin = sessionStorage.getItem("knGameLogin");
        const gameEventLogin = sessionStorage.getItem("gameEventLogin");

        // const getLocalStorng = localStorage.getItem("guidToken");
        // if (getLocalStorng) {
        //     window.location.href = "/localEvents";
        // }
        if (getLoginType === "gov") {
            window.location.href = "/categories/green_office/evaluation";
            sessionStorage.removeItem("loginType");
        }
        // 遊戲導向
        if (gameLogin) {
            window.location.href = "/gamePage";
            sessionStorage.removeItem("gameLogin");
            sessionStorage.removeItem("visitor");
        }
        // 遊戲二導向
        if (knGameLogin) {
            window.location.href = "/knGamePage";
            sessionStorage.removeItem("knGameLogin");
            sessionStorage.removeItem("visitor");
        }
        // 遊戲活動頁導向
        if (gameEventLogin) {
            window.location.href = "/gameEvent";
            sessionStorage.removeItem("gameEventLogin");
        }
    }, [])

    //使用者指南共用的客製排版
    function HelperComponent({ current, content, totalSteps, gotoStep, close }) {
        return (
            <div className="CustomHelper__content">
                <div className="step-wrapper">
                    <div className="step-img-wrapper">
                        <img src={greenManPng} className="step-card-img" alt="greenMan" />
                    </div>
                    <div className="step-card-right">
                        {content}
                        <button
                            onClick={() => {
                                gotoStep(current + 1)
                            }}
                            disabled={current === totalSteps - 1}
                            className="CustomHelper__nextBtn"

                        >下一步</button>
                    </div>
                </div>
            </div>
        )
    }

    //使用者指南config
    const steps = [
        {
            selector: '[data-tut="memberCenter__step1"]',
            content: function HelperComponent() {
                return (
                    <>
                        <h4 style={{ color: "#4CA642" }}>歡迎加入成為綠友</h4>
                        <h4>這是你的會員名片，你可以依照你的喜好編輯會員資料。</h4>
                    </>
                )
            },
            // position: [100, 300],
            action: () => {
                //不能點連結
                disableLink()
                enableBodyScroll(document.querySelector("#memberCenter__step1"))
                setTimeout(function () {

                    const element = document.getElementById("memberCenter__step1")
                    if (element && !detectMob()) {
                        element.scrollIntoView({
                            behavior: 'auto',
                            block: 'center',
                            inline: 'center'
                        })

                        disableBodyScroll(document.querySelector("#memberCenter__step1"))
                    }
                    // 
                }, 200)


            }

        },
        {
            selector: '[data-tut="infoMenu__step2"]',
            content: function HelperComponent({ goTo }) {
                HelperComponent.propTypes = {
                    goTo: PropTypes.func.isRequired,
                }

                return (
                    <h4>這邊可以<span style={{ color: "orange" }}>收藏</span>你在上方主功能看到喜歡的文章跟綠生活資訊, 還可以透過分享<span style={{ color: "orange" }}>發布照片、影片跟網誌</span>唷!</h4>
                )
            },
            position: [0, 20],
            action: () => {
                disableBodyScroll(document.querySelector("#infoMenu__step2"))

            }

        },
        {
            selector: '[data-tut="infoMenu__step3"]',
            content: function HelperComponent() {
                return (
                    <>
                        <h4>透過<span style={{ color: "orange" }}>任務功能</span>執行常態任務跟
                            主題任務就可以獲得<span style={{ color: "#4CA642" }}>綠積分</span>唷！</h4>
                    </>
                )
            },
            action: () => {
                disableBodyScroll(document.querySelector("#infoMenu__step3"))

            }
        },
        {
            selector: '[data-tut="memberCenter__step4"]',
            content: function HelperComponent() {
                return (
                    <>
                        <div className="CustomHelper__content">
                            <div className="step-wrapper">
                                <div className="step-img-wrapper">
                                    <img src={greenManPng} className="step-card-img" alt="greenMan" />
                                </div>
                                <div className="step-card-right">
                                    <h4 style={{ color: "#4CA642" }}>檢視自己的綠足跡</h4>
                                    <h4>你的<span style={{ color: "orange" }}>綠積分紀錄以及綠生活成果</span>都可以在這邊查看，開始體驗<span style={{ color: "#4CA642" }}>綠生活</span>的樂趣吧！</h4>

                                </div>
                            </div>
                        </div>

                    </>
                )
            },
            action: () => {
                enableLink()
                enableBodyScroll(document.querySelector("#memberCenter__step4"))
                setTimeout(function () {

                    if (!detectMob())
                        disableBodyScroll(document.querySelector("#memberCenter__step4"))
                }, 200)

            }
        }

    ]



    const disableBody = target => disableBodyScroll(target)
    // const enableBody = target => enableBodyScroll(target)
    const enableBody = () => {
        enableBodyScroll(document.querySelector("#memberCenter__step1"))
        enableBodyScroll(document.querySelector("#infoMenu__step2"))
        enableBodyScroll(document.querySelector("#infoMenu__step3"))
        enableBodyScroll(document.querySelector("#memberCenter__step4"))
    }


    const [isTourOpen, setOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)

    const selectDesignationPic = (e) => {
        setPicOptions(false)
        setDesignationPicId(e.target.id)
    }

    const saveDesignationPic = () => {
        //更新會員頭像
        EditDesignationPic(designationPicId, myHeaders)
            .then(result => {
                if (result.isSucess)
                    //更新會員資料context
                    getMemberProfile(collector, memberToken, clickLogout, removeCookie)
                        .then(result => {
                            if (result.isSucess) {
                                setContextMemberInfo(result.resultObject)
                            }
                        })
            })
    }

    const disableLink = () => {
        var anchors = document.getElementsByTagName("a");
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].onclick = function () { return false; };
        }
    }

    const enableLink = () => {
        var anchors = document.getElementsByTagName("a");
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].onclick = function () { return true; };
        }
    }


    return (
        <>

            <Tour
                onBeforeClose={enableBody}
                onRequestClose={() => setOpen(currentStep === 4 ? false : true)}
                steps={steps}
                isOpen={isTourOpen}
                maskClassName="myStep-mask"
                className="myStep-helper"
                showNumber={false}
                rounded={20}
                showNavigation={false}
                getCurrentStep={(curr) => {
                    setCurrentStep(curr + 1)
                }}
                showCloseButton={currentStep === 4}
                CustomHelper={currentStep === 4 ? null : HelperComponent}
                lastStepNextButton={<div className="CustomHelper__nextBtn start-btn"><h4>開始體驗</h4></div>}
                prevButton={<div></div>}
            />

            {/* <BreadCrumb currentPage={"個人專頁"} /> */}

            {/* <div className="container member-center member-info-wrapper row">
                <InfoSideMenu key={memberToken} collector={collector} memberToken={memberToken} greenlivingToken={greenlivingToken} history={history} identityType={identityType}/> */}
            <div className="col-12 col-lg-9 member-center">
                {(identityType === "2" || identityType === "3" || identityType === "4" || identityType === "5" || identityType === "6") &&
                    <div className="greenliving-mask">
                        <h3>功能建置中，敬請期待…</h3>
                    </div>
                }

                <div className="">
                    <div className="d-flex">
                        {contextFriendGuid &&
                            <>
                                <h2 className="friend-name">{memberData.name}</h2>
                                <h2 className="member-center-subtitle">的</h2>
                            </>}
                        <h2 className="member-center-title">個人綠生活軌跡</h2>
                    </div>
                    <div className="member-profile" id="memberCenter__step1" data-tut="memberCenter__step1" style={{ background: memberData.businessCardBGC }}>
                        <div className="d-flex row">
                            <div className="headPic_and_follwer col-sm-12 col-md-4 col-lg-4">
                                {/* src={designationPic[+designationPicId - 1].picPath}  */}
                                <div className="avatar-wrapper">
                                    <img className="avatar-img" src={contextFriendGuid ? (memberData.headPic || greenMan) : (designationPic[designationPicId === null ? 0 : designationPic.findIndex(obj => obj.id == designationPicId)]?.picPath)} alt="會員頭貼" />
                                </div>
                                {Boolean(contextFriendGuid) ||
                                    <div className="change-btn-wrapper" style={picOptions ? { visibility: "hidden" } : { visibility: "visible" }}>
                                        {memberInfo.designationId !== designationPicId &&
                                            <h6 className="change-avatar-btn" onClick={saveDesignationPic}>儲存</h6>}
                                        <h6 className="change-avatar-btn" onClick={() => setPicOptions(true)} >更換頭像</h6>
                                    </div>}
                                {picOptions &&
                                    <div className="designation_Pic-position">
                                        <div className="designation_Pic-wrapper">
                                            {designationPic?.map((data, index) =>
                                                <img onClick={selectDesignationPic} key={index} src={data.picPath} id={data.id} className="designation_Pic" alt="圖示" />
                                                // <img onClick={selectDesignationPic} id={2} className="designation_Pic" src="https://cdn.pixabay.com/photo/2020/02/11/16/25/manarola-4840080_960_720.jpg" />
                                            )}
                                        </div>
                                    </div>}

                                {/* <div className="member-info-text-bold d-flex">
                                    <h6>粉絲數</h6><h6>&nbsp;{memberData.fans}&nbsp;</h6><h6>人</h6>
                                </div>
                                <div className="member-info-text-bold d-flex">
                                   <h6>追蹤者</h6><h6>&nbsp;{memberData.follower}&nbsp;</h6><h6>人</h6>
                                </div> */}
                            </div>
                            <div className="profile-intro col-sm-12 col-md-8 col-lg-8">
                                <div>
                                    {/* <div className="nickName_and_headPic">
                                        <div>
                                            <h5>暱稱</h5>
                                            <h5 className="member-value">{memberData.name}</h5>
                                        </div>
                                        <div className="d-flex">
                                            <h5>大頭貼</h5>
                                            <img className="clip-avatar" src={memberData?.headPic || greenMan} alt="會員頭像" title="會員頭像" />
                                        </div>
                                    </div> */}
                                    <div>
                                        <div className="d-flex"><h5>稱號</h5>
                                            <div className="manageTable-name">
                                                <i className="fas fa-question-circle" aria-hidden="true"></i>
                                                <div className="point-percent">
                                                    <h6>稱號會隨著獲得的綠積分變化</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="member-value">{memberData.designation}</h5>
                                    </div>
                                    <div className="fans-follwer-wrapper">
                                        <div className="single-wrapper"><h6>粉絲數</h6><h6>&nbsp;{memberData.fans}&nbsp;</h6><h6>人</h6></div>
                                        <div className="single-wrapper"><h6>追蹤者</h6><h6>&nbsp;{memberData.follower}&nbsp;</h6><h6>人</h6></div>
                                    </div>
                                    <div>
                                        <h5>個人簡介</h5>
                                        <p className="dark-grey member-intro-limit">{memberData.introduction}</p>
                                    </div>
                                </div>
                                <div className="edit-section d-flex">
                                    {identityType === "7" &&
                                        <div onClick={() => setOpen(true)}>（測試用）點我顯示網頁操作說明</div>}
                                    <Link className="edit-link" to={(identityType === "2" || identityType === "4") ? "/member/government_auth" : (identityType === "3" || identityType === "5" || identityType === "6") ? "/member/general_auth" : "/member/edit"}>編輯會員資料</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="green-points" data-tut="memberCenter__step4">
                        <Points memberToken={memberToken} withoutTitle={false} collector={contextFriendGuid || collector} />
                    </div>
                    {/* <div className="green-charity">
                        <h3 className="member-center-subtitle">綠公益</h3>
                        <div className="section-wrapper">
                            <div className="tree-section-member">
                                <img src={treePng} />
                                <div className="text-number-wrapper"><h4>種了</h4><h4 className="number-area">{myFetchGreenShop?.treeCount}</h4><h4>棵樹</h4></div>
                            </div>
                            <div className="fish-section-member">
                                <img src={fishPng} />
                                <div className="text-number-wrapper"><h4>放流</h4><h4 className="number-area">{myFetchGreenShop?.fishCount}</h4><h4>條魚</h4></div>
                            </div>
                        </div>
                    </div> */}

                </div>

                <div className="section-results">
                    <h2 className="member-center-subtitle">綠成果</h2>
                    <div className="card-wrapper">
                        {/* <Card className="trace-card redCard">
                            <h6>參加了</h6>
                            <div className="center-text">
                                <div className="number-area">
                                    <h1>{trace.activityCount}</h1>
                                    <h6>場</h6>
                                </div>
                                <h2>活動</h2>
                            </div>
                        </Card> */}
                        <Card className="trace-card orangeCard">
                            <h6>分享了</h6>
                            <div className="center-text">
                                <div className="number-area">
                                    <h1>{trace.myGreenCount}</h1>
                                    <h6>張</h6>
                                </div>
                                <h2>照片/影片</h2>
                            </div>
                        </Card>
                        <Card className="trace-card greenCard">
                            <h6>發佈了</h6>
                            <div className="center-text">
                                <div className="number-area">
                                    <h1>{trace.blogCount}</h1>
                                    <h6>篇</h6>
                                </div>
                                <h2>網誌</h2>
                            </div>
                        </Card>
                        {/* <Card className="trace-card blueCards">
                            <h6>目前綠生活評價</h6>
                            <div className="center-text">
                                <div className="number-area">
                                    <h1 className="font-text">{trace.expertScore}</h1>

                                </div>

                            </div>
                        </Card> */}
                    </div>
                    {/* <div id="lineChart">
                        <LineChart key={greenLifeResult} greenLifeResult={greenLifeResult} options={[]} series={[]} type="line" height={350} />
                    </div> */}

                </div>
                <div className="section-results activity-results">
                    {/* <h2 className="member-center-title">活動成果</h2> */}
                    <div className="chart-wrapper">
                        {/* <div id="wordCloud"> */}
                        {/* <WordCloud /> */}
                        {/* <div className="wordCloud-title">
                                    <h6>參加者縣市分布比率</h6>
                                </div> */}
                        {/* </div>
                        <div id="pieChart"> */}
                        {/* <PieChart greenLifeResult={greenLifeResult} options={[]} series={[]} type="line" height={350} /> */}
                        {/* </div> */}

                    </div>
                </div>
                <div className="section-results">
                    {/* <div className="green-friend-title-wrapper"> */}
                    {/* <h2 className="member-center-title ">綠友圈</h2> */}
                    <div className="d-flex">
                        {/* {dropDownSort.map((data, index) =>
                                    <div
                                        key={index}
                                        id={data.typeId}
                                        onClick={() => {
                                            setSortTypeId(data.typeId);
                                            history.push(`/member/memberCenter?sortType=${data.typeId}`);
                                        }}
                                        className={sortTypeId === data.typeId ? "sort-type focus" : "sort-type"}
                                    >
                                        <h6 style={sortTypeId === data.typeId ? { color: "white" } : {}}>{data.typeName}</h6></div>
                                )} */}
                    </div>
                    {/* </div> */}
                    <div className="card-wrapper">
                        <div className="green-friend-wrapper ranking">
                            {/* <h6>綠活動</h6>
                            <h6>活動排行榜</h6>
                            <div className="ranking-wrapper">
                                <div className="place">
                                    <h3 style={selected ? { color: "#FFCC33" } : {}}>1</h3>
                                </div>
                                <div className="ranking-card" style={selected ? { background: "#009933" } : {}}>
                                    <div>
                                        <img className="clip-avatar" src={greenMan} alt="大頭貼" title="大頭貼" />
                                    </div>
                                    <div className="ranking-card-data-wrapper" style={selected ? { color: "white" } : {}}>
                                        <h5 className="ranking-name" style={selected ? { color: "white" } : {}}></h5>
                                        <div className="ranking-number">
                                            <h5 style={selected ? { color: "white" } : {}}>0</h5>
                                            <h5 style={selected ? { color: "white" } : {}}>次</h5>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="ranking-wrapper">
                                    <div className="place">
                                        <h3>2</h3>
                                    </div>
                                    <div className="ranking-card">
                                        <div>
                                            <img className="clip-avatar" src={greenMan} alt="大頭貼" title="大頭貼" />
                                        </div>
                                        <div className="ranking-card-data-wrapper">
                                            <h5 className="ranking-name">綠小寶</h5>
                                            <div className="ranking-number">
                                                <h5>12</h5>
                                                <h5>次</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                        </div>
                        {/* <div className="green-friend-wrapper ranking">
                            <h6>綠網美</h6>
                            <h6>照片影片排行榜</h6>
                            <div className="ranking-wrapper">
                                <div className="place">
                                    <h3 style={selected ? { color: "#FFCC33" } : {}}>{rankCurGreen.rank}</h3>
                                </div>
                                <div className="ranking-card" style={selected ? { background: "#009933" } : {}}>
                                    <div>
                                        <img className="clip-avatar" src={rankCurGreen.headPic || greenMan} alt="大頭貼" title="大頭貼" />
                                    </div>
                                    <div className="ranking-card-data-wrapper" style={selected ? { color: "white" } : {}}>
                                        <h5 className="ranking-name" style={selected ? { color: "white" } : {}}>{rankCurGreen.nickName}</h5>
                                        <div className="ranking-number">
                                            <h5 style={selected ? { color: "white" } : {}}>&nbsp;{rankCurGreen.score}</h5>
                                            <h5 style={selected ? { color: "white" } : {}}>則</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="green-friend-wrapper ranking">
                            <h6>綠文青</h6>
                            <h6>網誌排行榜</h6>
                            <div className="ranking-wrapper">
                                <div className="place">
                                    <h3 style={selected ? { color: "#FFCC33" } : {}}>{rankcurBlog.rank}</h3>
                                </div>
                                <div className="ranking-card" style={selected ? { background: "#009933" } : {}}>
                                    <div>
                                        <img className="clip-avatar" src={rankcurBlog.headPic} alt="大頭貼" title="大頭貼" />
                                    </div>
                                    <div className="ranking-card-data-wrapper" style={selected ? { color: "white" } : {}}>
                                        <h5 className="ranking-name" style={selected ? { color: "white" } : {}}>{rankcurBlog.nickName}</h5>
                                        <div className="ranking-number">
                                            <h5 style={selected ? { color: "white" } : {}}>&nbsp;{rankcurBlog.score}</h5>
                                            <h5 style={selected ? { color: "white" } : {}}>篇</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="green-friend-wrapper ranking">
                            <h6>綠智囊</h6>
                            <h6>達人評分榜</h6>
                            <div className="ranking-wrapper">
                                <div className="place">
                                    <h3 style={selected ? { color: "#FFCC33" } : {}}>{rankCurExpert.rank}</h3>
                                </div>
                                <div className="ranking-card" style={selected ? { background: "#009933" } : {}}>
                                    <div>
                                        <img className="clip-avatar" src={rankCurExpert.headPic} alt="大頭貼" title="大頭貼" />
                                    </div>
                                    <div className="ranking-card-data-wrapper" style={selected ? { color: "white" } : {}}>
                                        <h5 className="ranking-name" style={selected ? { color: "white" } : {}}>{rankCurExpert.nickName}</h5>
                                        <div className="ranking-number">
                                            <h5 style={selected ? { color: "white" } : {}}>&nbsp;{rankCurExpert.score}</h5>
                                            <h5 style={selected ? { color: "white" } : {}}>分</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>

                </div>

            </div>
            {/* </div> */}


            {/* <Footer /> */}

        </>
    );
}

export default withRouter(MemberPage);