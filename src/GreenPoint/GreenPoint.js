import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { fetchTotalGreenShop } from '../utils/API';
import { useLockBodyScroll, checkLogin_and_redirect, detectMob } from '../utils/Functions';
import CheckLoginAndRedirect from '../Components/CheckLoginAndRedirect';
import mainTopPic from '../images1/greenPoint/main/main-top.png';
import watering from '../images1/greenPoint/main/watering.png';
import btnIcon1 from '../images1/greenPoint/main/icon-1.png';
import btnIcon2 from '../images1/greenPoint/main/icon-2.png';
import btnIcon3 from '../images1/greenPoint/main/icon-3.png';
import leef from '../images1/greenPoint/main/leef.png';
import partners from '../images1/greenPoint/main/end-partners.png';
import plant from '../images1/greenPoint/main/plant.png';
import bgWorld from '../images1/greenPoint/main/bgWorld.jpg';
import bgCity from '../images1/greenPoint/main/bgCity.jpg';
import missionCard_greenMan from '../images1/greenPoint/main/missionCard-greenMan.png';
import missionCard_bear from '../images1/greenPoint/main/missionCard-bear.png';
import greenPirate from '../images1/greenPoint/main/greenPirate.png';
import closeIcon from '../images1/greenPoint/main/closeIcon.png';
import knMissionIcon from '../images1/greenPoint/main/knMissionIcon.png';
import shareMissionIcon from '../images1/greenPoint/main/shareMissionIcon.png';
import targetIcon from '../images1/greenPoint/main/targetIcon.png';
import doctorBird from '../images1/greenPoint/main/doctorBird.png';
import tree from '../images1/greenPoint/main/tree.png';
import theme from '../images1/greenPoint/main/theme.jpeg';
import talkGreenMan from '../images1/greenPoint/main/talkGreenMan.png';
import talkBird from '../images1/greenPoint/main/talkBird.png';
import '../Member/GreenPoint/Point.scss';
import '../Components/css/Footer.css'
import facebookIcon from '../images1/footer/fb.svg';
import insIcon from '../images1/footer/ig.svg';
import youtubeIcon from '../images1/footer/youtube.svg';
import pointer from '../images1/common/pointer.png';
import CountUp from 'react-countup';

import './GreenPoint.scss';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));

function GreenPoint(props) {

    const [gotoUrl, setGotoUrl] = useState("");
    const [startDate, setStartDate] = useState(new Date())

    const [typeId, setTypeId] = useState("1")
    const [missionType, setMissionType] = useState("")
    const [clickSecret, setClickSecret] = useState(false)
    const [showConversation, setShowConversation] = useState(false);

    const deadline = new Date('2021-09-30')
    const today = new Date()

    const diff = Math.floor((deadline - today) / 86400000);

    //綠積分活動頁-綠生活達人榜+綠生活紀錄榜
    const [activityReport, setActivityReportd] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Point/Index`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess)
                console.log(result)
            setActivityReportd(result.resultObject)
        })
    }, [])


    //總共多少魚多少樹
    const [fetchGreenShop, setFetchGreenShop] = useState([])
    useEffect(() => {

        fetchTotalGreenShop(setFetchGreenShop)
    }, []);

    //觀察到指定數字
    const [rerender, setRerender] = useState(false)
    const countUpRef = useRef(null);
    const lazyLoadImages = (entries) => {
        if (entries[0].isIntersecting) {
            setRerender(true)
        } else {
            setRerender(false)
        }
    };

    //滑到countUp 觸發重新渲染
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 1
        }
        const observer = new IntersectionObserver(lazyLoadImages, options);

        if (countUpRef && countUpRef.current) {
            observer.observe(countUpRef.current)
        }
        return () => observer.unobserve(countUpRef.current);

    }, [countUpRef, lazyLoadImages])


    //觀察到對話框
    const conversationRef = useRef(null);
    const lazyLoadConversation = entries => {
        entries.map(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fadeup");
            }
            return null
        })
    };
    //滑到對話框 觸發lazyLoadConversation
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '300px',
            threshold: 1
        }
        const observerConversation = new IntersectionObserver(lazyLoadConversation, options);
        let observTargets = document.querySelectorAll('.single-conversation');
        observTargets.forEach(target => observerConversation.observe(target))
    }, [conversationRef, lazyLoadConversation])


    let SSL = props.SSL
    let domain = props.domain

    var serialize = require('serialize-javascript');

    //紀錄瀏覽人次API
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/VisitRecord`, {
            method: 'POST',
            body: serialize({
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }, [SSL, domain, serialize]);

    //取得瀏覽人次API
    const [visitedCount, setVisitedCount] = useState([]);
    // https://cors-anywhere.herokuapp.com/
    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Common/VisitCount`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setVisitedCount(result.resultObject)
            });

    }, [SSL, domain]);

    //系統資訊API
    const [siteInfo, setSiteInfo] = useState([]);
    const [items, setItems] = useState([]);

    const type = "Index";
    const code = "Footer";

    useEffect(() => {

        const uri = `${SSL}//${domain}/api/api/Common/SystemInfo`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Type: type,
                Code: code
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setItems(result.resultObject[0].item5.split('<br>'))
                if (result.isSucess) {
                    setSiteInfo(result.resultObject[0]);
                }
            });
    }, [SSL, domain, serialize]);


    function RegularMissionBorad() {
        //我的綠積分任務-常態性任務-里程碑任務-主題特殊任務
        const [missionData, setMissionData] = useState([]);
        useEffect(() => {
            fetch(`${SSL}//${domain}/api/api/Point/MissionRole/1`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess)

                    setMissionData(result.resultObject)
            })
        }, [])

        const RegularTableData = (

            <>
                <tr className="title-tr">
                    <td data-title="綠生活知識＋" className="">綠生活知識＋</td>
                    <td></td>
                    <td></td>

                </tr>
                {missionData.filter(obj => obj.subTypeId === 1).map((data, index) => {
                    const { limitDesc, point, title } = data
                    return (
                        <tr className="seperate-regular-table" key={index}>
                            <td data-title="常態性任務" className="">{title}</td>
                            <td data-title="獲得積分" className="number-center">+{point}</td>
                            <td data-title="每日上限" className="number-center">+{limitDesc}</td>

                        </tr>
                    )
                })}
                <tr className="title-tr">
                    <td data-title="綠生活分享＋" className="">綠生活分享＋</td>
                    <td></td>
                    <td></td>

                </tr>
                {missionData?.filter(obj => obj.subTypeId === 2).map((data, index) => {
                    const { limitDesc, point, title } = data
                    return (
                        <tr className="seperate-regular-table" key={index}>
                            <td data-title="常態性任務" className="">{title}</td>
                            <td data-title="獲得積分" className="number-center">+{point}</td>
                            <td data-title="每日上限" className="number-center">+{limitDesc}</td>

                        </tr>
                    )
                })}

                <tr className="title-tr">
                    <td data-title="綠生活實踐＋" className="">綠生活實踐＋</td>
                    <td></td>
                    <td></td>

                </tr>
                {missionData?.filter(obj => obj.subTypeId === 3).map((data, index) => {
                    const { limitDesc, point, title } = data
                    return (
                        <tr className="seperate-regular-table" key={index}>
                            <td data-title="常態性任務" className="">{title}</td>
                            <td data-title="獲得積分" className="number-center">+{point}</td>
                            <td data-title="每日上限" className="number-center">+{limitDesc}</td>

                        </tr>
                    )
                })}

            </>


        )

        return (
            <>

                <div className="regularMission">
                    <table className="regular-table">
                        <thead className="regular-table-head">
                            <tr>
                                <th>常態性任務</th>
                                <th>獲得積分</th>
                                <th>每日上限</th>

                            </tr>
                        </thead>
                        <tbody className="regular-table-body">
                            {RegularTableData}
                        </tbody>
                    </table>
                </div>
            </>
        );

    }


    function Conversation({ title, content, onClose }) {
        // Call hook to lock body scroll
        useLockBodyScroll();

        return (

            <div className="conversation-bg-container">

                <div className="black-background show"></div>
                <div className="conversation-btn-wrapper">
                    <img onClick={() => setShowConversation(!showConversation)} className="close" src={closeIcon} alt="關閉圖示" />
                    <div className="conversation-container">

                        <div className="single-conversation right">
                            <div><h6 className="right-side-dialogue">鴞博士!請告訴我完成不同任務後可以得到多少分</h6></div>
                            <img src={talkGreenMan} alt="鴞博士!請告訴我完成不同任務後可以得到多少分" />
                        </div>
                        <div className="single-conversation left">
                            <img src={talkBird} alt="來來來，給你我私藏的積分整理表" />
                            <div><h6 className="left-side-dialogue">來來來，給你我私藏的積分整理表。</h6></div>
                        </div>
                        <div className="single-conversation left">
                            <img src={talkBird} alt="" />
                            <RegularMissionBorad />
                        </div>
                        <div className="single-conversation right">
                            <div><h6 className="right-side-dialogue">綠平台有很多資訊頁面，我該從哪裡進入才能完成「綠生活知識+」的任務?</h6></div>
                            <img src={talkGreenMan} alt="綠平台有很多資訊頁面，我該從哪裡進入才能完成「綠生活知識+」的任務?" />
                        </div>
                        <div className="single-conversation left">
                            <img src={talkBird} alt="按讚、分享以上資訊，每進行一個獲取知識的行動可以得到5分，一天最高得到50分獎勵" />
                            <div> <h6 className="left-side-dialogue">只要到「<Link to="/knowledge?page=1&type=0&theme=&n=全部">知識綠</Link>」瀏覽文章、「<Link to="/searchEvent">活動專區</Link>」資訊，或是按讚、分享以上資訊，每進行一個獲取知識的行動可以得到5分，一天最高得到50分獎勵。</h6></div>
                        </div>
                        <div className="single-conversation right">
                            <div><h6 className="right-side-dialogue">我只要分享綠平台上的文章，就算完成綠生活分享+任務了嗎?</h6></div>
                            <img src={talkGreenMan} alt="我只要分享綠平台上的文章，就算完成綠生活分享+任務了嗎?" />
                        </div>
                        <div className="single-conversation left">
                            <img src={talkBird} alt="發表照片、影片和網誌等個人紀錄。偷偷告訴你，上傳影音可以更快累積分數兌換公益捐贈喔!" />
                            <div><h6 className="left-side-dialogue">綠生活分享+必須在「<Link to="/daily/article">秀出我的綠</Link>」發表照片、影片和網誌等個人紀錄。偷偷告訴你，上傳影音可以更快累積分數兌換公益捐贈喔!</h6></div>
                        </div>
                        <div className="single-conversation right">
                            <div><h6 className="right-side-dialogue">我覺得自己每天都過得很環保，也都有實踐綠生活，要怎麼才能換算成績分呢?</h6></div>
                            <img src={talkGreenMan} alt="我覺得自己每天都過得很環保，也都有實踐綠生活，要怎麼才能換算成績分呢?" />
                        </div>
                        <div className="single-conversation left">
                            <img src={talkBird} alt="跟隨綠行動100招檢視自己的實踐情形，除了累積500分獎勵也能紀錄每個月在實現環保生活的進步喔!" />
                            <div><h6 className="left-side-dialogue">每個月透過「<Link to="/daily/score">島嶼探索</Link>」，跟隨綠行動100招檢視自己的實踐情形，除了累積500分獎勵也能紀錄每個月在實現環保生活的進步喔!</h6></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <div>
                {gotoUrl &&
                    <CheckLoginAndRedirect key={gotoUrl} gotoUrl={gotoUrl} />
                }
                <BreadCrumb />
                <div className="green-point green-points">
                    <div className="welcome-section container">
                        <div>
                            <img src={mainTopPic} className="mainTopPic" alt="主題" />
                        </div>
                        <div className="main-top-right-wrapper">
                            <div className="main-right-text">
                                <h2>Welcome to 綠活島</h2>
                                <h3>顛覆你對環保行動的想像</h3>
                                <div className="rounded-div">
                                    <h5>
                                        這裡是人類與自然共存的綠活島，
                                        島上的樹木生長奇快無比、海洋魚
                                        類生態豐富，島上居民自稱「綠友
                                        」，經常有一些神秘的舉動 …
                                    </h5>
                                </div>
                            </div>

                            <div className="button-with-pointer">
                                <button onClick={() => setClickSecret(!clickSecret)} className="point-green-btn">
                                    綠活島揭密
                                </button>
                                {!detectMob() && <img className="pointer-img" src={pointer} alt="綠活島揭密" />}
                            </div>

                        </div>
                        <div className={clickSecret ? "secret-container show" : "secret-container"}>
                            <div className="d-flex">
                                <div className="text-container">
                                    <h5><span className="link">綠寶</span>是熱愛自然和環保的航海家，某天航行時意外發現一座名為「<span className="link">綠活島</span>」的奇特島嶼，不知為何島上樹苗、海域魚類增加速度飛快。</h5>
                                    <h5>為了解開神秘現象，綠寶暗中觀察，他發現居民們日常都<span className="link">實踐著環保行為，並且隨時紀錄，累積成綠積分</span>。原來這些積分可以累積環境效益及公益能量，再透過島上<span className="link">福利社</span>換取樹苗、魚苗等，幫助環境綠化及生物多樣性發展。</h5>
                                    <h5>綠寶被綠活島的生活方式深深吸引，他決定留下來成為這裡的島民「<span className="link">綠友</span>」，持續探索綠活島更多的可能性。</h5>
                                </div>
                                <div className="img-container">
                                    <img onClick={() => setClickSecret(!clickSecret)} className="close" src={closeIcon} alt="關閉圖示" />
                                    <img className="pirate" src={greenPirate} alt="..." />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="total-count-section row container">
                        <div className="mt-4 col-md-6 col-lg-4">
                            <div className="plant-container">
                                <img src={plant} className="plant-png" alt="..." />
                                <img src={watering} className="watering-png" alt="..." />
                            </div>


                        </div>
                        <div className="mt-4 col-md-6 col-lg-4 grey-text">
                            <div className="count-h4-wrapper">
                                <h4>已種了</h4>
                                <h4 ref={countUpRef}><CountUp end={fetchGreenShop.treeCount} redraw={true} useEasing={true} separator="," />棵樹</h4>
                            </div>
                            <h6>平均每年將可吸收<CountUp end={fetchGreenShop.treeCount * 12} redraw={true} useEasing={true} separator="," />公斤CO2</h6>
                            <button onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/reward_point")} className="point-green-btn">
                                立刻加入
                            </button>
                        </div>

                        <div className="mt-4 col-lg-4 grey-text">
                            <div className="rounded-card">
                                <h5>綠生活紀事</h5>
                                <h6>{activityReport.likeCount}個讚 {activityReport.myGreenCount}則照片/影片 {activityReport.blogCount}則網誌</h6>
                            </div>
                            <div className="rounded-card">
                                <h5>島民綠行動</h5>
                                <h6>{activityReport.participateCount}人響應 {activityReport.participateCompleteCount}位完成 {activityReport.participatePercent}%完成率</h6>
                            </div>
                            <Link to="/daily" className="point-green-btn-more">
                                看完整綠活島大事紀
                            </Link>
                        </div>
                    </div>
                    <div className="instruction-section">
                        <div className="container">
                            <div className="d-flex">
                                <button onClick={() => setTypeId("1")} className={typeId === "1" ? "point-green-btn-blank focus" : "point-green-btn-blank"}>
                                    <img src={btnIcon1} alt="..." /><h6>什麼是綠積分</h6>
                                </button>
                                <button onClick={() => setTypeId("2")} className={typeId === "2" ? "point-green-btn-blank focus" : "point-green-btn-blank"}>
                                    <img src={btnIcon2} alt="..." /><h6>綠活島任務</h6>
                                </button>
                                <button onClick={() => setTypeId("3")} className={typeId === "3" ? "point-green-btn-blank focus" : "point-green-btn-blank"}>
                                    <img src={btnIcon3} alt="..." /><h6>綠活福利社</h6>
                                </button>
                            </div>
                        </div>
                        <div className="instruction-content">
                            {/* 什麼是綠積分start */}
                            {typeId === "1" &&
                                <div className="content-wrapper">
                                    <div className="leef-text-wrapper">
                                        <img src={leef} alt="..." />
                                        <h5>綠積分是什麼呢?</h5>
                                    </div>
                                    <h5 className="col-sm-10 col-md-6 col-lg-6">
                                        為了鼓勵熱愛環保、積極落實綠生活的你
                                        ，只要<Link to="/login">入住綠活島</Link>，在綠平台上紀錄綠生
                                        活、瀏覽知識綠文章等行動，就能累積綠
                                        積分獎勵，並透過綠平台進行公益捐贈！
                                    </h5>
                                </div>}
                            {/* 什麼是綠積分end */}
                            {/* 綠活島任務2張卡start */}
                            {typeId === "2" &&
                                <div className="mission-card-wrapper">
                                    <div onClick={() => {
                                        setMissionType("1")
                                        const element = document.getElementById("mission-area")
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'center',
                                                inline: 'center'
                                            })
                                        }
                                    }} className="mission-card">
                                        <div className="img-container">
                                            <img className="background" src={bgWorld} alt="..." />
                                            <img className="character" src={missionCard_bear} alt="..." />
                                        </div>
                                        <div className="btn-wrapper"><button className="mission-btn">主題任務</button></div>
                                    </div>
                                    <div onClick={() => {
                                        setMissionType("2")
                                        const element = document.getElementById("mission-area")
                                        if (element) {
                                            element.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'center',
                                                inline: 'center'
                                            })
                                        }
                                    }} className="mission-card">
                                        <div className="img-container">
                                            <img className="background" src={bgCity} alt="圖示" />
                                            <img className="character" src={missionCard_greenMan} alt="圖示" />
                                        </div>
                                        <div className="btn-wrapper"><button className="mission-btn">常態任務</button></div>
                                    </div>
                                </div>
                            }
                            {/* 綠活島任務2張卡end */}
                            {/* 主題任務start */}
                            <div id="mission-area">
                                {typeId === "2" && missionType === "1" &&
                                    <div className="theme-mission container">
                                        <div style={{ position: "relative" }}>
                                            <h6 className="long-bar">主題任務</h6>
                                            <div className="countdown-container"><p>還剩</p><p>{diff}天</p></div>
                                        </div>
                                        <div className="theme-content">
                                            <div className="title-date-container"><h6>9月活動｜<span style={{ color: "red" }}>居家</span>BINGO 綠活GO</h6><h6 className="date-container">2021/9/13~2021/9/30</h6></div>
                                            <div className="d-flex row">
                                                <div className="grey-bg row col-sm-12 col-md-9 col-lg-9">
                                                    <div className="card-left col-sm-12 col-md-7 col-lg-7">
                                                        <h6>生活環保學堂上線啦！</h6>
                                                        <h6>減碳雙熊帶你認識居家節能小妙招</h6>
                                                        <div className="d-flex">
                                                            <h6 className="number-block">1</h6>
                                                            <h6>進入<Link to="/green_point" onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/point_mission?type=2")}>主題任務活動頁面</Link></h6>
                                                        </div>
                                                        <div className="d-flex">
                                                            <h6 className="number-block">2</h6>
                                                            <h6>翻牌回答居家節能Q&A</h6>
                                                        </div>
                                                        <div className="d-flex">
                                                            <h6 className="number-block">3</h6>
                                                            <h6>依據賓果連線數給予<Link>額外獎勵</Link></h6>
                                                        </div>
                                                    </div>
                                                    <div className="card-right col-sm-12 col-md-3 col-lg-3">
                                                        <img src={theme} alt="..." />
                                                    </div>
                                                </div>
                                                <div className="col-3 mission-card-bears">
                                                    <img src={missionCard_bear} style={{ width: "100%" }} alt="..." />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                }
                                {/* 主題任務end */}
                                {/* 常態任務start */}
                                {typeId === "2" && missionType === "2" &&
                                    <div className="regular-mission-container">
                                        <div className="title-text">
                                            <h4>成為綠活島民，完成每日綠生活任務，</h4>
                                            <h4>在日常生活中實現簡單的綠行動，就能轉換成公益能量!</h4>
                                        </div>
                                        <div className="category-card-container">
                                            <div>
                                                <div className="category-card">
                                                    <img src={knMissionIcon} alt="..." />
                                                    <h5>綠生活知識+</h5>
                                                </div>
                                                <div className="maximum-text-container">
                                                    <h5>最高每日可得</h5>
                                                    <h5>50分</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="category-card">
                                                    <img src={shareMissionIcon} alt="..." />
                                                    <h5>綠生活分享+</h5>
                                                </div>
                                                <div className="maximum-text-container">
                                                    <h5>最高每日可得</h5>
                                                    <h5>50分</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="category-card">
                                                    <img src={targetIcon} alt="..." />
                                                    <h5>綠生活實踐+</h5>
                                                </div>
                                                <div className="maximum-text-container">
                                                    <h5>最高每日可得</h5>
                                                    <h5>50分</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bottom-container">
                                            <div className="img-button-container row">
                                                <div className="doctorBird-dialogue col-sm-12 col-md-8 col-lg-8">
                                                    <h5 className="dialogue_box">想了解更多關於常態任務的訊息嗎?讓環境教育專家鴞博士我來告訴你!</h5>
                                                    <img src={doctorBird} alt="..." />
                                                </div>
                                                <div className="button-wrapper col-3">
                                                    <button onClick={() => {
                                                        setShowConversation(!showConversation)
                                                    }} className="point-green-btn more-btn">我要了解!</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>}
                            </div>
                            {/* 常態任務end */}
                            {/* 綠活福利社start */}
                            {typeId === "3" &&
                                <div className="row content-wrapper reward-point-wrapper">
                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                        <div className="tree-img-container">
                                            <img src={tree} alt="..." />
                                        </div>
                                    </div>
                                    <div className="col-sm-10 col-md-6 col-lg-6 right-container">
                                        <div className="title-with-bottomborder">
                                            <h4>林務局</h4>
                                            <h4>認養、造林捐贈</h4>
                                        </div>
                                        <div>
                                            <h5 className="darker-text">透過實踐綠生活，打造真正的綠色寶島</h5>
                                            <h5>環保與公益不是特定族群的專利，只要你是願意在日常響應綠行動的綠友，擁有對環境以及我們所處的社會有更多影響力!</h5>
                                            <div className="btn-container"><button onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/reward_point")} className="point-green-btn">馬上參與</button></div>
                                        </div>
                                    </div>
                                </div>}
                            {/* 綠活福利社end */}
                        </div>

                        <div className="ending-section row ">
                            <div className="ending-section-wrapper-background">
                                <div className="img-text-wrapper container">
                                    <img src={partners} className="col-sm-12 col-md-6 col-lg-6" alt="..." />
                                    <div className="col-sm-12 col-md-6 col-lg-6">
                                        <h6 className="end-right-card">
                                            即刻成為綠活島的一
                                            員，跟著大家一起探索
                                            島嶼吧！
                                        </h6>
                                    </div>
                                </div>
                                <div className="btn-wrapper">
                                    <Link to="/login" className="point-green-btn">立刻加入綠活島</Link>
                                </div>
                            </div>

                        </div>


                    </div>


                </div>
                <div className="site-footer">
                    <div className="container-fluid">
                        <div className="row footer-wrapper">
                            <div className="offset-lg-1 col-lg-6 col-md-8 col-sm-12">
                                <p className="footer-text-site">{siteInfo.item1}</p>
                                <p className="footer-text-site">{siteInfo.item3}</p>
                                <p className="footer-text-site">電話：{siteInfo.item4}</p>
                                {/* <div>{items.map((items, index) =>
                                    <p className="footer-text-site" key={index}>{items}</p>
                                )}</div> */}
                                <div>
                                    <p>若您有本網頁系統操作問題請洽詢<a href="/CallService" target="_blank" rel="noreferrer noopener" className="call-line">諮詢專線</a></p>
                                </div>
                                <br />
                                {/* <div className="form-link">
                                    <a className="link-with-border" href="https://docs.google.com/forms/d/e/1FAIpQLSfs0eoJ3-B6klu3KaKP28uSAsfQnCyqAShnyr_3Qd0_CY0Vew/viewform"
                                        target="_blank" rel="noreferrer noopener">我要填寫客服需求單</a>
                                </div> */}
                                <div>
                                    <a className="link-with-border" href={String(siteInfo.item10).split(",")[1]} title="網站政策及宣告">{String(siteInfo.item10).split(",")[0]}</a>
                                    <a className="link-with-border" href={String(siteInfo.item7).split(",")[1]} title="意見信箱">{String(siteInfo.item7).split(",")[0]}</a><br />
                                </div>

                            </div>
                            <div className="offset-lg-1 col-lg-5 col-md-6 col-sm-12">
                                <div className="footer-icons-wrapper">
                                    <div className="type-icons-wrapper">
                                        <p className="footer-icons-label">綠色生活</p>
                                        <a className="social-icons" target="_blank" title="綠色生活facebook連結(在新視窗開啟鏈結)" rel="noopener noreferrer" href="https://www.facebook.com/greenlife123/?ref=nf"><img className="footer-social-icon" src={facebookIcon} alt="綠色生活facebook連結" aria-label="綠色生活facebook連結" /></a>
                                    </div>
                                    <div className="type-icons-wrapper">
                                        <p className="footer-icons-label">環保署</p>
                                        <a className="social-icons" target="_blank" title="環保署facebook連結(在新視窗開啟鏈結)" rel="noopener noreferrer" href="https://www.facebook.com/MOENR.TW/"><img className="footer-social-icon" src={facebookIcon} alt="環保署facebook連結" aria-label="環保署facebook連結" /></a>
                                        <a className="social-icons" target="_blank" title="環保署youtube連結(在新視窗開啟鏈結)" rel="noopener noreferrer" href="https://www.youtube.com/user/TaiwanEpa"><img className="footer-social-icon" src={youtubeIcon} alt="環保署youtube連結" aria-label="環保署youtube連結" /></a>
                                        <a className="social-icons" target="_blank" title="環保署instagram連結(在新視窗開啟鏈結)" rel="noopener noreferrer" href="https://www.instagram.com/epa.tw/"><img className="footer-social-icon" src={insIcon} alt="環保署instagram連結" aria-label="環保署instagram連結" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="style-two" />
                        <div className="row">
                            <div className="offset-lg-1 col-lg-5 col-md-6 col-sm-12">{siteInfo.item8}
                            </div>
                            <div className="col-lg-5 col-md-6 col-sm-12">
                                <ul className="social">
                                    <li>更新日期: {siteInfo.item9}</li>
                                    <li>瀏覽人次: {visitedCount}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
                {/* <Footer /> */}
                {showConversation && <Conversation showConversation={showConversation} setShowConversation={setShowConversation} />}
            </div>

        </>
    );
}

export default withRouter(GreenPoint)