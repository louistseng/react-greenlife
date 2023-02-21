import React, { useEffect, useState, useReducer, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
//import { logout } from '../utils/Auth';
import penIcon from "../images1/greenMan/pen.png";
import settingIcon from "../images1/login/setting.png";
import caseIcon from "../images1/login/case.png";
import greenLeef from "../images1/greenMan/blankLeef1.png";
import logoutIcon from "../images1/greenMan/logout.png";
import heartIcon from "../images1/greenMan/heart.png";
import dollarIcon from '../images1/navBar/dollar.png';
import greenMan from "../images1/greenMan/greenMan.png";
import ComfirmAlert from '../Components/ComfirmAlert';
import './Info.scss';
import { getMemberCard, logoutLog, getMemberProfile } from '../utils/API';
import { clickLogout, checkAuth } from '../utils/Functions';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../utils/Context';
import TruncateMarkup from "react-truncate-markup";


function InfoSideMenu() {

    let history = useHistory()

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState([]);
    const [subTitle, setSubTitle] = useState("");
    const [showNote, setShowNote] = useState(true);

    // const [memberInfo, setMemberInfo] = useState([])
    const [memberData, setMemberData] = useState([]);
    //引入context(Provider在 App.js)
    const { contextMemberInfo, setContextMemberInfo, contextFriendGuid, setContextFriendGuid } = useContext(AuthContext);

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MzEzMzA4NDgsIm5iZiI6MTYzMTMyOTA0OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiZGI4OTYyZTMtZjlhNy00ODdkLThiMjQtZWRiMWEyYWZkNzg4In0.3GK2_HIBLhqSZkAc0yFJ3lReAXhxIbJ0krnH4V36TGtWUfRDrt49yj7oSTkWpJl19zMNy5s_s9315VV87AYi_Q";
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const [shouldTruncate, setShouldTruncate] = useState(true)

    //toggle收合功能列
    const initialData = {
        clickHeart: false,
        clickShare: false,
        clickRecord: false,
        clickPoint: true,
        setUp: false,
        manaActivity: false,
        manaGreen: false,
        manaEvent: false,
        updateEvent: false,
        clickDownload: false,
    };
    const [click, setClick] = useReducer(
        (click, clickDetail) => ({ ...click, ...clickDetail }),
        initialData
    );

    //登出按鈕
    const clickLogoutToAbout = () => {
        logoutLog(collector)
        sessionStorage.removeItem("userGuid")
        removeCookie('userGuid', { path: '/' })
        removeCookie('refreshToken', { path: '/' })
        removeCookie('identityType', { path: '/' })
        removeCookie('greenlivingJWT', { path: '/' })
        removeCookie('groups', { path: '/' })
        window.location.href = "/about";
    }

    //取得會員資訊
    useEffect(() => {
        getMemberProfile(collector, memberToken, clickLogout, removeCookie)
            .then(result => {
                if (result.isSucess) {
                    //儲存到context
                    setContextMemberInfo(result.resultObject)
                }
            })
        getMemberCard(collector, contextFriendGuid, memberToken, setMemberData, clickLogout, removeCookie)

    }, [contextFriendGuid])


    //會員專區-會員中心-最新追蹤的列表
    const [memberFollow, setMemberFollow] = useState([])
    const [followPage, setFollowPage] = useState(1)
    const [followPageCount, setFollowPageCount] = useState(0)
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Member/Follow`, {
            method: 'POST',
            body: serialize({
                Page: String(followPage),
                Count: "5",
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setMemberFollow(result.resultObject.members)
                setFollowPageCount(result.resultObject.pageCount)
            });
    }, [followPage])

    //個人簡介高度大於3排, 就顯示詳全文...
    // useEffect(() => {
    //     var divs = document.querySelectorAll('.truncate');
    //     for (var i = 0; i < divs.length; i++) {
    //         if (divs[0]?.offsetWidth > 72) {
    //             setShouldTruncate(true)
    //         } else {
    //             setShouldTruncate(false)
    //         }
    //     }
    // }, [])

    const toggleTruncate = () => {
        setShouldTruncate(!shouldTruncate);
    };

    const readMoreEllipsis = (
        <span>
            ...{" "}
            <span onClick={toggleTruncate} style={{ color: "#4469ce" }}>
                【…詳全文】
            </span>
        </span>
    );


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle={showNote ? subTitle : "若權限與實際不符，請撥打平台客服專線由專人為您服務"} showLoginBtn={showNote} history={history} showNote={showNote} />
            }
            <div className="left-side col-12 col-md-10 col-lg-3">
                <Card>
                    <div onClick={() => setContextFriendGuid("")} className="d-flex justify-content-start mb-1">
                        <Link to="/member/memberCenter?sortType=6">
                            <img className="clip-avatar" src={contextMemberInfo?.headPic || greenMan} alt="會員頭像" title="會員頭像" />
                        </Link>
                        <div className="ml-3">
                            <Link to="/member/memberCenter?sortType=6"><h4>{contextMemberInfo?.nickName || contextMemberInfo?.name}</h4></Link>
                            {/* <div className="d-flex">
                                <img width="10%" height="10%" src={greenLeef} alt="綠積分圖示" title="綠積分圖示" />
                                <h6 className="member-info-text">綠積分</h6>
                                <h6 className="member-info-num">{memberData.point}</h6>
                                <h6 className="member-info-text">點</h6>
                                <i className="fas fa-question-circle"></i>
                            </div> */}
                        </div>
                    </div>
                    {/* <input type="checkbox" name="toggle" id="toggle" style={{ display: "none" }} />
                    <p className="dark-grey member-intro-limit truncate">{contextMemberInfo?.introduction}</p>
                    <label for="toggle" className="truncate"></label> */}
                    {shouldTruncate ? (
                        <TruncateMarkup key={contextMemberInfo?.introduction} lines={3} ellipsis={readMoreEllipsis}>
                            <p className="dark-grey member-intro-limit truncate">
                                {contextMemberInfo?.introduction}
                            </p>
                        </TruncateMarkup>
                    ) : (
                        <p className="dark-grey member-intro-limit">
                            {contextMemberInfo?.introduction}
                            <span onClick={toggleTruncate} style={{ color: "#4469ce" }}>
                                {'【收合】'}
                            </span>
                        </p>
                    )}
                    <div className="member-info-text-bold d-flex">
                        <h6>粉絲數</h6><h6>&nbsp;{memberData.fans}&nbsp;</h6><h6>人</h6>
                    </div>
                    <div className="member-info-text-bold d-flex">
                        <h6>追蹤者</h6><h6>&nbsp;{memberData.follower}&nbsp;</h6><h6>人</h6>
                    </div>
                </Card>


                <Card data-tut="infoMenu__step2" id="infoMenu__step2">
                    <h4>功能清單</h4>
                    {(contextMemberInfo?.identityTypeId === 7 || contextMemberInfo?.identityTypeId === 1) &&
                        <>
                            <div className="function-wrapper">
                                <div className="d-flex" onClick={() => {
                                    // setClickHeart(!clickHeart)
                                    setClick({ clickHeart: !click.clickHeart });
                                    // var element = document.getElementById("myDIV");
                                    // element.classList.add("mystyle");
                                }}>
                                    <img className="list-icons" src={heartIcon} alt="收藏圖示" title="收藏圖示" />
                                    <h5>收藏</h5>
                                    <div className={click.clickHeart ? "none-rotate" : "rotate"}>
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className={click.clickHeart ? "drop-list show" : "drop-list"}>
                                    <ul>
                                        <a href="/member/BookMark?type=1&name=活動&link=/searchEvent" title="活動鏈結">活動</a>
                                        <a href="/member/BookMark?type=2&name=知識綠&link=/knowledge" title="知識綠鏈結">知識綠</a>
                                        <a href="/member/BookMark?type=4&name=綠色旅遊&link=/categories/greenTour" title="綠色旅遊行程鏈結">綠色旅遊行程</a>
                                        <a href="/member/BookMark?type=5&name=綠色餐廳&link=/categories/restaurant" title="綠色餐廳名單鏈結">綠色餐廳名單</a>
                                        <a href="/member/BookMark?type=6&name=環保旅宿&link=/categories/accommodation" title="環保旅宿名單鏈結">環保旅宿名單</a>
                                        {/* <a href="/member/BookMark?type=7&name=綠色商店&link=/categories/greenShop">綠色商店名單</a> */}
                                    </ul>
                                </div>
                            </div>
                        </>
                    }
                    {/* 目前不給組織帳號分享功能 */}
                    {(contextMemberInfo?.identityTypeId === 1 || contextMemberInfo?.identityTypeId === 7) &&
                        <div className="function-wrapper">
                            <div className="d-flex" onClick={() => setClick({ clickShare: !click.clickShare })}>
                                <img className="list-icons" src={penIcon} alt="分享圖示" title="分享圖示" />
                                <h5>分享</h5>
                                <div className={click.clickShare ? "none-rotate" : "rotate"}>
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className={click.clickShare ? "drop-list show" : "drop-list"}>
                                <ul>
                                    {(contextMemberInfo?.identityTypeId === 2 || contextMemberInfo?.identityTypeId === 3 || contextMemberInfo?.identityTypeId === 4 || contextMemberInfo?.identityTypeId === 5 || contextMemberInfo?.identityTypeId === 6 || contextMemberInfo?.identityTypeId === 7) &&
                                        <Link to="/member/BookMarkActivity?name=活動&link=/member/shareActivity&type=1">活動上傳</Link>
                                    }

                                    <>
                                        <a href="/member/BookMarkShare?name=秀出你的綠&link=/daily/article&type=2" title="照片/影片上傳鏈結">照片/影片上傳</a>
                                        <a href="/member/BookMarkBlog?name=綠生活網誌&link=/member/shareBlog&type=3" title="網誌上傳鏈結">網誌上傳</a>
                                        <a href="/member/BookMarkKnowledge?name=知識綠&link=/member/shareKnowledge&type=4" title="知識綠上傳鏈結">知識綠上傳</a>
                                        <a href="/member/bookMarkConference?name=社會溝通會議&link=/member/conferenceEventUpload&type=6" title="社會溝通會議上傳鏈結">社會溝通會議上傳</a>
                                    </>

                                </ul>
                            </div>
                        </div>}


                    {(contextMemberInfo?.identityTypeId === 2 || contextMemberInfo?.identityTypeId === 3 || contextMemberInfo?.identityTypeId === 4 || contextMemberInfo?.identityTypeId === 5 || contextMemberInfo?.identityTypeId === 6 || contextMemberInfo?.identityTypeId === 7) &&
                        <>
                            <div className="function-wrapper">
                                <div className="d-flex" onClick={() => setClick({ clickRecord: !click.clickRecord })}>
                                    <img className="list-icons" src={caseIcon} alt="綠色辦公圖示" title="綠色辦公圖示" />
                                    <h5>綠色辦公</h5>
                                    <div className={click.clickRecord ? "none-rotate" : "rotate"}>
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className={click.clickRecord ? "drop-list show" : "drop-list"}>
                                    <ul>
                                        <Link onClick={() => checkAuth(String(contextMemberInfo?.identityTypeId), contextMemberInfo.unitCode, setShowDialog, setAlertTitle, setShowNote, history)} to={memberToken ? (contextMemberInfo?.identityTypeId === 2 || contextMemberInfo?.identityTypeId === 4) ? Boolean(contextMemberInfo?.unitCode?.match(/-0|-GL$/g)) ? "/categories/green_office/evaluation" : "#" : "/categories/green_office/evaluation" : "#"}>響應綠色辦公</Link>
                                        {(contextMemberInfo?.identityTypeId === 2 || contextMemberInfo?.identityTypeId === 3 || contextMemberInfo?.identityTypeId === 4 || contextMemberInfo?.identityTypeId === 5 || contextMemberInfo?.identityTypeId === 6 || contextMemberInfo?.identityTypeId === 7) &&
                                            <Link to="/member/BookMarkOffice">經驗分享文章</Link>
                                        }
                                    </ul>
                                </div>
                            </div>
                            {/* 綠色旅遊團體行程 */}
                            <Link to="/member/tourList" className="function-wrapper">
                                <div className="d-flex">
                                    <img className="list-icons" src={caseIcon} alt="綠色辦公圖示" title="綠色辦公圖示" />
                                    <h5>綠色旅遊團體行程</h5>
                                </div>
                            </Link>
                        </>
                    }

                    <div data-tut="infoMenu__step3" id="infoMenu__step3">
                        {(contextMemberInfo?.identityTypeId === 7 || contextMemberInfo?.identityTypeId === 1) &&
                            <div className="function-wrapper">
                                <div className="d-flex" onClick={() => setClick({ clickPoint: !click.clickPoint })}>
                                    <img className="list-icons dollarIcon" src={dollarIcon} alt="綠積分" title="綠積分圖示" />
                                    <h5>綠積分</h5>
                                    <div className={click.clickPoint ? "none-rotate" : "rotate"}>
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className={click.clickPoint ? "drop-list show" : "drop-list"}>
                                    <ul>
                                        <Link to="/member/point_mission?type=1">綠生活任務</Link>
                                        {/* <Link to="/member/reward_point">綠活福利社</Link> */}
                                    </ul>
                                </div>
                            </div>}
                    </div>
                </Card>


                <Card>
                    <h4>帳號管理</h4>
                    {contextMemberInfo?.identityTypeId !== 4 &&
                        <div className="function-wrapper">
                            <div className="d-flex" onClick={() => setClick({ setUp: !click.setUp })}>
                                <img className="list-icons" src={settingIcon} alt="維護帳號資料圖示" title="維護帳號資料圖示" />
                                <h5>設定</h5>
                                <div className={click.setUp ? "none-rotate" : "rotate"}>
                                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className={click.setUp ? "drop-list show" : "drop-list"}>
                                <ul>
                                    {contextMemberInfo?.identityTypeId === 1 &&
                                        <Link to="/member/edit">個人基本資料維護</Link>}
                                    {contextMemberInfo?.identityTypeId === 7 &&
                                        <Link to="/member/edit">個人基本資料維護</Link>}
                                    {contextMemberInfo?.identityTypeId === 2 &&
                                        <Link to={{
                                            pathname: "/member/government_auth",
                                            state: { identityType: "2" }
                                        }}>機關</Link>}

                                    {contextMemberInfo?.identityTypeId === 3 &&
                                        <Link to={{
                                            pathname: "/member/general_auth",
                                            state: { identityType: "3" }
                                        }}>企業</Link>}

                                    {contextMemberInfo?.identityTypeId === 4 &&
                                        <Link to={{
                                            pathname: "/member/government_auth",
                                            state: { identityType: "4" }
                                        }}>公立學校</Link>}
                                    {contextMemberInfo?.identityTypeId === 5 &&
                                        <Link to={{
                                            pathname: "/member/general_auth",
                                            state: { identityType: "5" }
                                        }}>私立學校</Link>}

                                    {contextMemberInfo?.identityTypeId === 6 &&
                                        <Link to={{
                                            pathname: "/member/general_auth",
                                            state: { identityType: "6" }
                                        }}>團體</Link>}

                                    {contextMemberInfo?.accountTypeId === 1 && <Link to="/resetPassword">變更密碼</Link>}
                                    {/* <li to="/">(隱私權設定)</li> */}
                                </ul>
                            </div>
                        </div>
                    }


                    <div style={{ cursor: "pointer" }} onClick={clickLogoutToAbout} className="d-flex">
                        <img className="list-icons" src={logoutIcon} alt="登出圖示" title="登出圖示" />
                        <h5>登出</h5>
                    </div>
                </Card>

                {(contextMemberInfo?.identityTypeId === 7 || contextMemberInfo?.identityTypeId === 8 || collector === "tailin.yao" || collector === "epagreenlife") &&
                    <Card>
                        <h4>管理者專區</h4>

                        {contextMemberInfo?.identityTypeId === 7 &&
                            <>
                                <div className="function-wrapper">
                                    <div className="d-flex" onClick={() => setClick({ manaEvent: !click.manaEvent })}>
                                        <h5>活動管理</h5>
                                        <div className={click.manaEvent ? "none-rotate" : "rotate"}>
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className={click.manaEvent ? "drop-list show" : "drop-list"}>
                                        <ul>
                                            <Link to="/member/activity_management">活動管理</Link>
                                        </ul>
                                    </div>
                                </div>
                                <div className="function-wrapper">
                                    <div className="d-flex" onClick={() => setClick({ manaGreen: !click.manaGreen })}>
                                        <h5>我的綠行動</h5>
                                        <div className={click.manaGreen ? "none-rotate" : "rotate"}>
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className={click.manaGreen ? "drop-list show" : "drop-list"}>
                                        <ul>
                                            <Link to="/member/myGreen_management">秀出我的綠</Link>
                                            <Link to="/member/blog_management">網誌管理</Link>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <Link to="/member/office_article_management" className="function-wrapper">
                                        <h5>經驗分享文章管理</h5>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/member/knowledge_management" className="function-wrapper">
                                        <h5>知識綠管理</h5>
                                    </Link>
                                </div>
                            </>
                        }

                        {(contextMemberInfo?.identityTypeId === 7 || contextMemberInfo?.identityTypeId === 8 || collector === "tailin.yao" || collector === "epagreenlife") &&
                            <>
                                <div className="function-wrapper">
                                    <div className="d-flex" onClick={() => setClick({ manaActivity: !click.manaActivity })}>
                                        <h5>綠生活選擇</h5>
                                        <div className={click.manaActivity ? "none-rotate" : "rotate"}>
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className={click.manaActivity ? "drop-list show" : "drop-list"}>
                                        <ul>
                                            {(contextMemberInfo?.identityTypeId === 7 || contextMemberInfo?.identityTypeId === 8) && <Link to="/member/office_management">綠色辦公管理</Link>}
                                            <Link to="/member/groupTour">綠色旅遊團體行程管理</Link>
                                        </ul>
                                    </div>
                                </div>
                                <div className="function-wrapper">
                                    <div className="d-flex" onClick={() => setClick({ clickDownload: !click.clickDownload })}>
                                        <h5>前台上架</h5>
                                        <div className={click.clickDownload ? "none-rotate" : "rotate"}>
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className={click.clickDownload ? "drop-list show" : "drop-list"}>
                                        <ul>
                                            <Link to="/member/material">下載專區 & Banner</Link>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        }


                        {contextMemberInfo?.identityTypeId === 7 &&
                            <>
                                <Link to="/member/click_record" className="function-wrapper">
                                    <h5>瀏覽量檢視</h5>
                                </Link>

                                <Link to="/member/user_info" style={{ cursor: "pointer" }} className="d-flex function-wrapper">
                                    <h5>帳號權限管理</h5>
                                </Link>
                                {domain === "greenlife.eri.com.tw" &&
                                    <Link to="/testGa" className="function-wrapper">
                                        <h5>測試機GA測試連結</h5>
                                    </Link>}
                            </>
                        }
                    </Card>
                }


                {/* {(identityType === "7" || identityType === "1") && */}
                <Card>
                    <h4>我的綠友圈</h4>
                    <>
                        <div>
                            {memberFollow.map((data) =>
                                //可連結到綠友的個人生活軌跡
                                // <Link to="/member/memberCenter" onClick={() => setContextFriendGuid(data.userGuid)} key={data.userGuid} className="function-wrapper sideMenu-friends">
                                //     <div>
                                //         <img className="clip-avatar-sideMenu" src={data.headPicPath || greenMan} alt="會員頭像" title="會員頭像" />
                                //     </div>
                                //     <h5>{data.nickName}</h5>
                                // </Link>

                                <div key={data.userGuid} className="sideMenu-friends">
                                    <div>
                                        <img className="clip-avatar-sideMenu" src={data.headPicPath || greenMan} alt="會員頭像" title="會員頭像" />
                                    </div>
                                    <h5>{data.nickName}</h5>
                                </div>
                            )}
                        </div>
                        <div className="friends-btn-container">
                            {followPage !== 1 && <button onClick={() => setFollowPage(followPage - 1)}><i class="fas fa-arrow-circle-left" aria-hidden="true"></i></button>}
                            {followPage < followPageCount && <button onClick={() => setFollowPage(followPage + 1)}><i class="fas fa-arrow-circle-right" aria-hidden="true"></i></button>}
                        </div>
                    </>
                </Card>
                {/* } */}
            </div>

        </>
    );
}
export default InfoSideMenu;