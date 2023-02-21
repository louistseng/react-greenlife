import React, { useState, useEffect, useContext, useRef } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { detectMob, checkLogin_and_redirect } from '../utils/Functions';
import { useHistory } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { Form } from 'react-bootstrap';
import './css/NavBar.scss';
import FontSizeChanger from 'react-font-size-changer';
import { isWebpSupported } from "react-image-webp/dist/utils";

import CheckLoginAndRedirect from '../Components/CheckLoginAndRedirect';
import { AuthContext } from '../utils/Context';
import greenLogo from "../images1/green-logo.PNG";
import greenLogoWebp from "../images1/green-logo.webp";
import fontIcon from "../images1/about/u70.png";
import homeIcon from '../images1/about/u84.png';
import aboutIcon from '../images1/navBar/about.png';
import activityIcon from '../images1/navBar/activity.png';
import greenIcon from '../images1/navBar/green.png';
import verifyIcon from '../images1/navBar/verify.png';
import dataIcon from '../images1/navBar/data.png';
import greenManNav from '../images1/greenMan/greenManNav.png';
import { formatDateTime } from '../../src/utils/Functions';

function NavBar() {
    let domain = window.location.host;

    //google站內搜尋
    useEffect(() => {
        const includeScript = () => {
            var cx = '7a502e0e8f34030f9';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        }
        includeScript();

    }, []);

    const keyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            window.location.replace(`/search?q=${e.target.value}`);
            return false;
        }
    }

    const [dropDown, setDropDown] = useState(true);
    const [keyWord, setKeyWord] = useState("");
    const [gotoUrl, setGotoUrl] = useState("");
    const [show, setShow] = useState(true);


    const showMemberBtn = sessionStorage.getItem("userGuid");
    const { contextMemberInfo } = useContext(AuthContext);
    const [centerFocus, setCenterFocus] = useState(false)

    const headPic = contextMemberInfo?.headPic

    function setUp() {
        var ui_w = 375;
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var html_ = document.getElementsByTagName('html')[0];
        html_.style.fontSize = (clientWidth / ui_w) * 5 + 'px';
    }

    function setDown() {
        var ui_w = 375;
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var html_ = document.getElementsByTagName('html')[0];
        html_.style.fontSize = (clientWidth / ui_w) * 4 + 'px';
    }

    useEffect(() => {
        const fontUp = document.querySelector('.fontUp')
        const fontDown = document.querySelector('.fontDown')
        fontUp.addEventListener("keydown", function () {
            setUp()
        })
        fontDown.addEventListener("keydown", function () {
            setDown()
        })
    })
    //  關閉遊戲活動
    const date = new Date()
    useEffect(() => {
        if (formatDateTime(date) >= "2022/12/27 00:00") {
            setShow(false)
        }
    }, [])

    return (
        <>

            <Sticky innerZ={100} enabled={true} top={0} bottomBoundary={0}>
                {gotoUrl &&
                    <CheckLoginAndRedirect key={gotoUrl} gotoUrl={gotoUrl} />
                }
                <nav className="nav-top">
                    <div className="top-dflex">
                        {centerFocus ?
                            <a className="centerFocus" href="#c" title="按Enter至主內容區" accessKey="c" tabIndex={0} onBlur={() => setCenterFocus(false)}>按Enter至主內容區</a>
                            :
                            <a className="skip-nav-c" id="skip-nav-c" href="#c" title="中央內容區塊" accessKey="c" tabIndex={0} onFocus={() => setCenterFocus(true)}>:::</a>
                        }

                        <a className="skip-nav" href="#" title="上方導覽連結區" accessKey="u">:::</a>
                        <div className="green-logo">
                            <Link as={Link} to="/"><img src={isWebpSupported() ? greenLogoWebp : greenLogo} alt="全民綠生活LOGO" title="全民綠生活LOGO" /></Link>
                            {/* <Link as={Link} to="/"><img src={"/images/newYear/inside-newYear-logo.png"} alt="全民綠生活LOGO" title="全民綠生活LOGO" /></Link> */}
                        </div>

                        <form className="form-inline-ori">
                            <ul className="nav-top-ul font">
                                <a className="skip-nav" href="#" title="網站搜尋" accessKey="s">:::</a>
                                {/* <div className="searchDropdown"> */}
                                {/* <div className="searchDropbtn" onClick={() => setSearchDropDown(!searchDropDown)}><i class="fas fa-search"></i></div> */}

                                <div id="myDropdown" className='searchDropdown-content show'>
                                    <Form.Control onKeyPress={e => keyPress(e)} type="text" title="站內搜尋" className="search-input" placeholder="綠色旅遊、綠色辦公..." onChange={e => setKeyWord(e.target.value === "" ? " " : e.target.value)} />
                                    <Link className="searchBtn-kn" to={`/search?q=${keyWord}`} id="searchBtn" title="searchBtn" role={"Button"} ><i className="fas fa-search" title="站內搜尋" desc="站內搜尋" ></i></Link>
                                </div>
                                {/* </div> */}

                                <div className="font-changer ">
                                    <li className="d-block fontChanger-left">
                                        <img src={fontIcon} alt="字級圖示"></img>
                                        <p className="fontTopText" title="網站導覽">字級</p>
                                    </li>
                                    <FontSizeChanger
                                        targets={['#target']}
                                        onChange={(element, newValue, oldValue) => {
                                        }}
                                        options={{
                                            stepSize: 1,
                                            range: 1
                                        }}
                                        customButtons={{
                                            up: <span className="fontUp" style={{ 'fontSize': '28px', "cursor": "pointer" }} tabIndex={0}>大</span>,
                                            down: <span className="fontDown" style={{ 'fontSize': '28px', "cursor": "pointer" }} tabIndex={0}>小</span>,
                                            style: {
                                                backgroundColor: 'transparent',
                                                color: 'grey',
                                                border: 'none',
                                                WebkitBoxSizing: 'border-box',
                                                WebkitBorderRadius: '5px',
                                                width: '30px',
                                            },
                                            buttonsMargin: 10
                                        }}
                                    />
                                </div>
                                <Link as={Link} to="/about" id="goMain">
                                    <li className="d-block nav-top-li border-left">
                                        <img src={homeIcon} alt=""></img>
                                        <p title="回首頁">回首頁</p>
                                    </li>
                                </Link>
                                <Link as={Link} to="/siteNavigator">
                                    <li className="d-block nav-top-li">
                                        <i className="far fa-compass" aria-hidden="true" alt=""></i>
                                        <p title="網站導覽">網站導覽</p>
                                    </li>
                                </Link>
                                {/* <a>
                                    <li className="d-block nav-top-li soon-btn">
                                        <i className="fas fa-pencil-alt"></i> */}
                                {/* <p title="寫網誌">寫網誌</p> */}
                                {/* <p title="寫網誌">
                                            <span id="e">&nbsp;&nbsp;寫網誌</span>
                                            <span id="f">&nbsp;&nbsp;近期開放</span>
                                        </p>
                                    </li>
                                </a> */}

                                {/* <a>
                                    <li className="d-block nav-top-li soon-btn">
                                        <i className="fas fa-camera"></i> */}
                                {/* <p title="傳每日照片">傳每日照片</p> */}
                                {/* <p className="soon-btn" title="傳每日照片">
                                            <span id="e">&nbsp;&nbsp;傳每日照片</span>
                                            <span id="f">&nbsp;&nbsp;近期開放</span>
                                        </p>
                                    </li>
                                </a> */}

                                {/* <a className="greenPoint-nav">
                                    <li className="d-block nav-top-li soon-btn dropbtn-greenPoint">
                                        <i className="far fa-check-circle greenPoint-pink-scale"></i> */}
                                {/* <p title="傳每日照片">傳每日照片</p> */}
                                {/* <p className="soon-btn" title="每日一綠">
                                            <span id="e">&nbsp;&nbsp;每日一綠</span>
                                            <span id="f">&nbsp;&nbsp;近期開放</span>
                                        </p>
                                    </li>
                                </a> */}

                                <div className="dropdown-drop greenPoint-nav" tabIndex={0}>
                                    <li className="d-block nav-top-li soon-btn font">
                                        <img className="nav-island" src={greenManNav} alt="" />
                                        <p className="island_p">
                                            <span>我的綠行動</span>
                                            {/*  id="e" */}
                                            {/* <span id="f">&nbsp;&nbsp;近期開放</span> */}
                                        </p>
                                    </li>
                                    <div className="dropdown-menu-ori nav-item-drop none" tabIndex={0}>
                                        <Link as={Link} to="/daily" className="nav-aniBtn" tabIndex={0}>綠生活成果榜</Link>
                                        {/* 登入後導回原本要去的頁面 */}
                                        <div onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/point_mission?type=1")} className="nav-aniBtn" tabIndex={0}>綠生活任務</div>
                                        <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/greenGame">綠寶家族的綠活群島生活</Link>
                                        {/* <Link className="nav-aniBtn" to={showMemberBtn ? "/member/memberCenter" : "/login"}>加入成為綠友</Link> */}
                                    </div>
                                </div>
                            </ul>
                            <div className="d-flex justify-content-center nav-top-ul">
                                <Link to={showMemberBtn ? "/member/memberCenter" : "/AdvancingPage"}>
                                    {/* <Link to={showMemberBtn ? "/member/memberCenter" : "/login"}> */}
                                    {headPic ?
                                        <div className="d-block nav-top-li-grey avetar">
                                            <img src={headPic} className="clip-headpic-nav" alt="" title="會員頭像" />
                                        </div>
                                        :
                                        <li className="d-block nav-top-li-grey avetar" id="avetar">
                                            <i className="fas fa-user-circle" aria-hidden="true" title="登入圖示" alt=""></i>
                                        </li>
                                    }

                                    <div className="avatar-note">{showMemberBtn ? "會員專區【已登入】" : "登入"}</div>
                                </Link>
                                <>
                                    <Link to="/en_About" className="d-flex align-items-center">
                                        <li className="d-block nav-top-li">
                                            <button style={{ backgroundColor: "#6CB15E", color: "#fff", border: "none", borderRadius: "10px", padding: "8px 14px", margin: "0px 5px 0 20px", fontSize: "calc(10px + 1vw)", fontWeight: "600" }}>EN</button>
                                        </li>
                                    </Link>
                                </>
                            </div>
                        </form>
                    </div>
                </nav>
                <div className={dropDown ? 'topnav-ori' : 'topnav-ori responsive'}>

                    <div className={dropDown ? "drop-first-layer" : "drop-first-layer show"}>
                        <Link to={showMemberBtn ? "/member/memberCenter" : "/login"} title="前往登入">
                            <li className="d-block nav-top-li-grey avetar" id="avetar">
                                <i className="fas fa-user-circle" aria-hidden="true" title="bar" alt=""></i>
                            </li>
                        </Link>
                    </div>
                    <div className="dropdown-drop" tabIndex={0}>
                        <Link to="/about">
                            <div className="dropbtn">
                                <img className="nav-img" src={aboutIcon} alt="關於綠生活圖示" />
                                <div>關於綠生活</div>
                            </div>
                        </Link>
                        {(!dropDown || !detectMob()) &&
                            <div className="dropdown-menu-ori nav-item-drop none" tabIndex={0}>
                                <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/about#page1" tabIndex={0}>最新消息</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/about#intro" tabIndex={0}>了解綠生活</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/about#anchor3" tabIndex={0}>綠生活焦點照片</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/about#anchor4" tabIndex={0}>常用查詢</Link>
                            </div>}
                    </div>

                    <div className="dropdown-drop" onClick={() => setDropDown(true)} tabIndex={0}>
                        <Link as={Link} to="/searchEvent">
                            <div className="dropbtn">
                                <img className="nav-img" src={activityIcon} alt="活動專區圖示" />
                                <div>活動專區</div>
                            </div>
                        </Link>
                        {(!dropDown || !detectMob()) &&
                            <div className="dropdown-menu-ori nav-item-drop none">
                                {/* <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/localEvents">綠生活活動</Link> */}
                                <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/conferenceEvent">淨零綠生活社會溝通</Link>
                                {show && <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/gameEvent">2022綠寶家族抽獎活動</Link>}
                            </div>}
                    </div>
                    <div className="dropdown-drop" onClick={() => setDropDown(true)} tabIndex={0}>
                        <Link as={Link} to="/categories">
                            <div className="dropbtn">
                                <img className="nav-img" src={greenIcon} alt="綠生活選擇圖示" />
                                <div>綠生活選擇</div>
                            </div>
                        </Link>
                    </div>


                    <div className="dropdown-drop" onClick={() => setDropDown(true)}>
                        <Link as={Link} to="/knowledge?page=1&type=0&theme=&n=全部" onClick={() => setDropDown(true)}>
                            <div className="dropbtn">
                                <img className="nav-img" src={activityIcon} alt="" />
                                知識綠
                            </div>
                        </Link>
                    </div>

                    {/* <div className="dropdown-drop">
                        <button className="dropbtn">
                            <img src={dailyIcon} alt="每日一綠圖示" />
                            <div>每日一綠</div>
                            </button>
                        <div className={dropDown ? "dropdown-menu-ori nav-item-drop none" : "dropdown-menu-ori nav-item-drop"}>
                            <Link to="/daily/article?type=1" className="drop-verify nav-aniBtn"> */}
                    {/* 秀出我的綠 */}
                    {/* <span id="k">秀出你的綠</span>
                                <span id="l">近期開放</span>
                            </Link>
                            <Link className="nav-aniBtn" to="/knowledge?page=1&type=0&theme=&n=全部" onClick={() => setDropDown(true)}>知識綠</Link>
                            <a href="#" className="drop-verify nav-aniBtn"> */}
                    {/* 綠生活達人榜榜 */}
                    {/* <span id="i">綠生活達人榜</span>
                                <span id="j">近期開放</span>
                            </a>
                        </div>
                    </div> */}

                    {/* 不開放 */}
                    {/* <div className="dropdown-drop">
                        <button className="dropbtn verify">
                            <img className="nav-img" src={verifyIcon} alt="標章及採購圖示" />
                            <span id="g">標章及採購</span>
                            <span id="h">近期開放&emsp;</span>
                        </button>
                    </div> */}
                    {/* 開放 */}
                    <div className="dropdown-drop" tabIndex={0}>
                        <div className="dropbtn dropbtn-focus verify">
                            <img className="nav-img" src={verifyIcon} alt="標章及採購圖示" />
                            <div>標章及採購</div>
                        </div>
                        {(!dropDown || !detectMob()) &&
                            <div className="dropdown-menu-ori nav-item-drop none" tabIndex={0}>
                                <Link as={Link} onClick={() => setDropDown(true)} to="/greenLabel" className="nav-aniBtn" tabIndex={0}>環保標章</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} to="/greenPurChase" className="nav-aniBtn" tabIndex={0}>綠色採購</Link>
                            </div>}
                    </div>

                    <div className="dropdown-drop" onClick={() => setDropDown(true)}>
                        <Link as={Link} to="/download/promote?type=1" onClick={() => setDropDown(true)}>
                            <div className="dropbtn verify">
                                <img className="nav-img" src={dataIcon} alt="下載專區圖示" />
                                <div>下載專區</div>
                            </div>
                        </Link>
                    </div>

                    {detectMob() &&
                        <div className={(dropDown || !detectMob()) ? "green-display" : "dropdown-drop"}>
                            <button className="dropbtn">
                                <img className="nav-img" src={greenManNav} alt="我的綠行動" />
                                <div>我的綠行動</div>
                            </button>
                            {(!dropDown || !detectMob()) &&
                                <div className="dropdown-menu-ori nav-item-drop none">
                                    <Link as={Link} onClick={() => setDropDown(true)} className="nav-aniBtn" to="/greenGame">綠寶家族的綠活群島生活</Link>
                                    <Link as={Link} onClick={() => setDropDown(true)} to="/daily" className="nav-aniBtn" >綠生活成果榜</Link>
                                    <div onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/point_mission?type=1")} className="nav-aniBtn" >綠生活任務</div>
                                    {/* <Link as={Link} onClick={() => setDropDown(true)} to={showMemberBtn ? "/member/memberCenter" : "/login"} className="nav-aniBtn" >加入成為綠友</Link> */}
                                </div>}
                        </div>
                    }

                    {/* <div className="dropdown-drop"> */}
                    {/* onClick={() => setDropDown(true)} */}
                    {/* <Link as={Link}> */}
                    {/* <button className="dropbtn verify">
                                <img src={dataIcon} /> */}
                    {/* 綠色資料庫 */}
                    {/* <span id="g">綠色資料庫</span>
                                <span id="h">近期開放</span>
                            </button> */}
                    {/* </Link> */}
                    {/* </div> */}

                    {/* <a>
                        <div className="dropdown-drop">
                            <Link as={Link}>
                                <button className="dropbtn">
                                    <img src="../../images/navBar/focus.png" />
                                近期焦點
                            </button>
                            </Link>
                        </div>
                    </a> */}
                    <a href="#" className="icon icon-bar" title="bar" id="bar" onClick={() => setDropDown(false)}>
                        <i className="fa fa-bars" aria-hidden="true" title="選單圖示" desc="選單圖示"></i>
                    </a>



                    <div className={dropDown ? "drop-first-layer" : "drop-first-layer show"}>
                        <Link as={Link} to="/siteNavigator" onClick={() => setDropDown(true)}>
                            <li className="d-block nav-top-li siteNav" id="siteNav">
                                <i className="far fa-compass" aria-hidden="true" title="網站導覽圖示" desc="網站導覽圖示"></i>
                                <p title="網站導覽">網站導覽</p>
                            </li>
                        </Link>

                        <div className="w-100">
                            <Form.Control className="search-input" placeholder="綠色旅遊、綠色辦公..." title="站內搜尋" onBlur={e => setKeyWord(e.target.value === "" ? " " : e.target.value)} />
                            <Link className="searchBtn-kn-nav" to={`/search?q=${keyWord}`} id="searchBtn" title="searchBtn">
                                <i className="fas fa-search" title="站內搜尋圖示" desc="站內搜尋圖示" ></i>
                            </Link>
                        </div>
                    </div>

                    <a href="#" className="icon icon-cancel" title="cancel" id="cancel" onClick={() => setDropDown(true)}>
                        <i className="fas fa-times" aria-hidden="true" title="關閉圖示" desc="關閉圖示"></i>
                    </a>
                </div>

            </Sticky>
            <div className={dropDown ? "aside-backdrop" : "aside-backdrop show"} onClick={() => setDropDown(true)}></div>
        </>
    );
}

export default NavBar;