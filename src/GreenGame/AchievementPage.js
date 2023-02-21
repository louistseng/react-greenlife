import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../GreenGame/GreenGame.scss';
import { getMemberProfile } from '../utils/API';
import { clickLogout } from '../utils/Functions';
import AchievementPageMusic from './AchievementPage.mp3';
import achievementsBg from '../../src/images1/GreenGame/Achievements/achievements_bg.png';
import guideAlert from '../../src/images1/GreenGame/Main/guide_alert.svg';
import userName from '../../src/images1/GreenGame/Achievements/user_name.svg';
import { leafOffice, leafFood, leafShopping, leafHome, leafTravel, travelArr, foodArr, officeArr, shoppingArr, homeArr, travelTextArr, foodTextArr, officeTextArr, shoppingTextArr, homeTextArr, TravelSVG, FoodSVG, OfficeSVG, ShoppingSVG, HomeSVG } from '../../src/Components/IslandGame/GameData';


const TopBtn = React.lazy(() => import("../../src/Components/IslandGame/TopBtn"));
const ChooseGame = React.lazy(() => import("../../src/Components/IslandGame/ChooseGame"));
const GreenAlert = React.lazy(() => import("../../src/Components/IslandGame/GameAlert"));

function AchievementPage(props) {
    const { SSL, domain } = props;

    const svgRef = useRef();

    var serialize = require('serialize-javascript');

    const [show, setShow] = useState(true);
    const [themeId, setThemeId] = useState(1);
    const [gameCookies, removeCookie] = useCookies([]);
    const [themeFetchData, setThemeFetchData] = useState([]);
    const [locked, setLocked] = useState([false, false, false, false, false]);
    const [totalLeafCount, setTotalLeafCount] = useState([null, null, null, null, null]);
    const [nickName, setNickName] = useState("");
    const [chooseShow, setChooseShow] = useState(false);
    const [secVisitorShow, setSecVisitorShow] = useState(false);

    const refreshToken = gameCookies.refreshToken || "";
    const userGuid = gameCookies.userGuid || "";

    let myHeaders = new Headers({
        "Token": refreshToken,
        "Content-Type": "application/json; charset=utf-8"
    });

    let src, bgColor, bgIconColor, iconText;
    switch (themeId) {
        case 1: src = travelArr;
            bgColor = "#2DBAD5";
            bgIconColor = "#1A7081";
            iconText = travelTextArr;
            break;
        case 2: src = foodArr;
            bgColor = "#F7A14A";
            bgIconColor = "#A36527";
            iconText = foodTextArr;
            break;
        case 3: src = officeArr;
            bgColor = "#09B082";
            bgIconColor = "#0C7356";
            iconText = officeTextArr;
            break;
        case 4: src = shoppingArr;
            bgColor = "#EF6B69";
            bgIconColor = "#A14343";
            iconText = shoppingTextArr;
            break;
        case 5: src = homeArr;
            bgColor = "#FEE62E";
            bgIconColor = "#AB9700";
            iconText = homeTextArr;
            break;
        default:
    }

    // 手動執行排程
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Achievement/Program`, {
            method: 'POST',
            headers: myHeaders,
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                console.log("排程", result)
            }
        });
    }, [])

    const gameTheme = sessionStorage.getItem("gameTheme");

    useEffect(() => {
        if (gameTheme) {
            setTimeout(() => {
                sessionStorage.removeItem("gameTheme")
            }, 1000);
        }
    }, [])

    // 獲取會員資訊
    useEffect(() => {
        if (refreshToken) {
            getMemberProfile(userGuid, refreshToken, clickLogout, removeCookie)
                .then(result => {
                    if (result.isSucess) {
                        // console.log(result)
                        setNickName(result.resultObject.nickName)
                    }
                })
        }
    }, [refreshToken, removeCookie, userGuid])

    // 五大主軸
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/ThemeTask/GLMatch/Themes`, {
            method: 'GET',
        }).then(response => response.json())
            .then(result => {
                if (result.httpCode === 200) {
                    // console.log(result)
                    setThemeFetchData(result.resultObject)
                    if (gameTheme) {
                        const d = result.resultObject.filter(d => d.themeName === gameTheme)
                        // console.log(d)
                        setThemeId(d[0].themeid)
                        setShow(false)
                    }
                }
            })
            .catch(error => console.log('error', error));
    }, [SSL, domain])

    // 成就查詢
    useEffect(() => {
        if (refreshToken) {
            // handleAchievementFetch()
            handleGetLeaf()
        }
    }, [refreshToken, themeFetchData.length])

    let leafCountArr = [];
    let themeLocked = [];

    // 目前累積葉子數
    const handleGetLeaf = async () => {
        for (let i = 0; i < themeFetchData.length; i++) {
            await fetch(`${SSL}//${domain}/api/api/Achievement/LeafCount`, {
                method: 'POST',
                headers: myHeaders,
                body: serialize({
                    Themeid: String(i + 1),
                    UserGuid: userGuid,
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    // console.log("成就查詢", result)

                    const leafCount = result.resultObject;

                    //展開後將數值個別放入
                    const newCount = [...totalLeafCount];
                    newCount[i] = leafCount === 0 ? null : leafCount;
                    setTotalLeafCount(newCount)

                    leafCountArr.push(newCount[i])
                    setTotalLeafCount(leafCountArr)

                    const newData = [...locked];
                    newData[i] = leafCount === 0 ? false : true;
                    setLocked(newData)

                    themeLocked.push(newData[i])
                    setLocked(themeLocked)
                }
            });
        }
    }

    // 成就查詢-詳細
    // const handleAchievementFetch = async () => {
    //     for (let i = 0; i < themeFetchData.length; i++) {
    //         await fetch(`${SSL}//${domain}/api/api/Achievement/ComplexSearch`, {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: serialize({
    //                 Themeid: String(i + 1),
    //                 UserGuid: userGuid,
    //                 Year: "2022",
    //                 Month: "11",
    //                 Page: "1",
    //                 Count: "10"
    //             }),
    //         }).then(res => {
    //             return res.json();
    //         }).then(result => {
    //             if (result.isSucess) {
    //                 console.log("ComplexSearch查詢", result)

    //                 const leafCount = result.resultObject?.achievements[0]?.leafcount;

    //                 //展開後將數值個別放入
    //                 const newCount = [...totalLeafCount];
    //                 newCount[i] = leafCount === undefined ? null : leafCount;
    //                 setTotalLeafCount(newCount)

    //                 leafCountArr.push(newCount[i])
    //                 setTotalLeafCount(leafCountArr)

    //                 const newData = [...locked];
    //                 newData[i] = leafCount === undefined ? false : true;
    //                 setLocked(newData)

    //                 themeLocked.push(newData[i])
    //                 setLocked(themeLocked)

    //             }
    //         });
    //     }
    // }

    useEffect(() => {
        document.getElementById('Audio').volume = 0.2;
    }, [])

    // 手機版音樂設定
    const startMusic = () => {
        let audio = document.getElementById('Audio');
        audio.play();
        audio.volume = 0.2;
        audio.muted = false;
    }

    return (
        <>
            <div className="game-container-ac" id="game-container-ac" onTouchStart={() => startMusic()}>
                <audio src={AchievementPageMusic} id="Audio" autoPlay loop></audio>
                <img src={achievementsBg} alt="gamePageBg-img" className="game-page-bg" />
                {chooseShow && <ChooseGame setChooseShow={setChooseShow} setSecVisitorShow={setSecVisitorShow} />}
                <TopBtn setChooseShow={setChooseShow} btnText={"返回地圖"} />
                <div className="achievements-alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="new-player" >
                        <img src={userName} alt="new-player-img" />
                        <span>{nickName ? nickName : "Player"}</span>
                    </div>
                    <div className="personal-achievements">
                        <div className="col-12 row">
                            <div className="col-1 column achievements-list">
                                <div onClick={() => setShow(true)} className={show ? "show-btn" : "list-btn"}>獎牌總覽</div>
                                <div onClick={() => setShow(false)} className={show ? "list-btn" : "show-btn"}>綠行動100招</div>
                            </div>
                            <hr />
                            {show ?
                                <div className="col-11 row">
                                    <div className={locked[0] ? "achevement-item-unlocked" : "achevement-item-locked"}>
                                        <TravelSVG ref={svgRef} className="theme-img" alt="" style={{ width: "80%" }} />
                                        <img src={leafTravel} alt="" title="" className="leef-icon" width="70%" />
                                        <div className={locked[0] ? "unlocked" : "locked"}>
                                            <div>{totalLeafCount[0] == null ? "LOCKED" : totalLeafCount[0]}</div>
                                        </div>
                                    </div>
                                    <div className={locked[1] ? "achevement-item-unlocked" : "achevement-item-locked"}>
                                        <FoodSVG ref={svgRef} className="theme-img" alt="" style={{ width: "80%" }} />
                                        <img src={leafFood} alt="" title="" className="leef-icon" width="70%" />
                                        <div className={locked[1] ? "unlocked" : "locked"}>
                                            <div>{totalLeafCount[1] == null ? "LOCKED" : totalLeafCount[1]}</div>
                                        </div>
                                    </div>
                                    <div className={locked[3] ? "achevement-item-unlocked" : "achevement-item-locked"}>
                                        <ShoppingSVG ref={svgRef} className="theme-img" alt="" style={{ width: "80%" }} />
                                        <img src={leafShopping} alt="" title="" className="leef-icon" width="70%" />
                                        <div className={locked[3] ? "unlocked" : "locked"}>
                                            <div>{totalLeafCount[3] == null ? "LOCKED" : totalLeafCount[3]}</div>
                                        </div>
                                    </div>
                                    <div className={locked[4] ? "achevement-item-unlocked" : "achevement-item-locked"}>
                                        <HomeSVG ref={svgRef} className="theme-img" alt="" style={{ width: "80%" }} />
                                        <img src={leafHome} alt="" title="" className="leef-icon" width="70%" />
                                        <div className={locked[4] ? "unlocked" : "locked"}>
                                            <div>{totalLeafCount[4] == null ? "LOCKED" : totalLeafCount[4]}</div>
                                        </div>
                                    </div>
                                    <div className={locked[2] ? "achevement-item-unlocked" : "achevement-item-locked"}>
                                        <OfficeSVG ref={svgRef} className="theme-img" alt="" style={{ width: "80%" }} />
                                        <img src={leafOffice} alt="" title="" className="leef-icon" width="70%" />
                                        <div className={locked[2] ? "unlocked" : "locked"}>
                                            <div>{totalLeafCount[2] == null ? "LOCKED" : totalLeafCount[2]}</div>
                                        </div>
                                    </div>
                                    <div className="warning-text">獎牌每天早上8點跟晚上會更新一次，記得上來看看自己獲得的獎牌喔！</div>
                                </div>
                                :
                                <div className="col-11 row">
                                    <div className="col-12 theme-btn">
                                        {themeFetchData.map((d, i) =>
                                            <button key={i} onClick={() => setThemeId(i + 1)} className="">{d.themeName}</button>
                                        )}
                                    </div>
                                    <div className="col-12 card-wrap" style={{ backgroundColor: bgColor }}>
                                        {src.map((d, index) =>
                                            <div key={index} className="icon-card" style={{ backgroundColor: bgIconColor }}>
                                                <img src={d} alt="icon-card" />
                                                <span>{iconText[index]}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
                {secVisitorShow &&
                    <GreenAlert secVisitorShow={secVisitorShow} setSecVisitorShow={setSecVisitorShow} />
                }
            </div>
        </>
    )
}

export default withRouter(AchievementPage); 