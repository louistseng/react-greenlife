import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../GreenGame/GreenGame.scss';
import GameStartMusic from '../../../src/GreenGame/FirstGame/GameStart.mp3';
import { leafOffice, leafFood, leafShopping, leafHome, leafTravel, office, food, shopping, home, travel, officeIconData, foodIconData, shoppingIconData, homeIconData, travelIconData, officeData, foodData, shoppingData, homeData, travelData, iconTextData, successOffice, successFood, successShopping, successHome, successTravel, failureOffice, failureFood, failureHome, failureShopping, failureTravel } from './GameData';

import mainOffice from '../../../src/images1/GreenGame/GamePage/Theme_bg/main_office.svg';
import mainFood from '../../../src/images1/GreenGame/GamePage/Theme_bg/main_food.svg';
import mainShopping from '../../../src/images1/GreenGame/GamePage/Theme_bg/main_shopping.svg';
import mainHome from '../../../src/images1/GreenGame/GamePage/Theme_bg/main_home.svg';
import mainTravel from '../../../src/images1/GreenGame/GamePage/Theme_bg/main_travel.svg';
import closeBtn from '../../../src/images1/GreenGame/GamePage/Theme_bg/close_btn.svg';

import times from '../../../src/images1/GreenGame/GamePage/timer.png';
import stars from '../../../src/images1/GreenGame/GamePage/stars.svg';
import starsColor from '../../../src/images1/GreenGame/GamePage/stars_color.svg';
import startBtn from '../../../src/images1/GreenGame/GamePage/btnBg.svg';

function GameCard(props) {
    const { SSL, domain, theme, setTheme, themeFetchData, visitor, refreshToken, isEnd, setIsEnd, start, setStart } = props;

    var serialize = require('serialize-javascript');

    const [seconds, setSeconds] = useState(0);
    const [level, setLevel] = useState(1);
    const [iconLavelData, setIconLavelData] = useState();
    const [starsData, setStarsData] = useState([]);
    const [isOpen, setIsOpen] = useState([]);
    const [firstPickedIndex, setFirstPickedIndex] = useState(null);
    const [secondPickedIndex, setSecondPickedIndex] = useState(null);
    const [leafCount, setLeafCount] = useState(0);
    const [levelLeafCount, setLevelLeafCount] = useState(0);
    const [pass, setPass] = useState(false);
    const [topicGuid, setTopicGuid] = useState("");
    const [height, setHeight] = useState("")
    const [maxGrade, setMaxGrade] = useState(0);
    const [passThreshold, setPassThreshold] = useState();
    const [next, setNext] = useState(true);

    let myHeaders = new Headers({
        "Token": refreshToken || visitor,
        "Content-Type": "application/json; charset=utf-8"
    });

    // 調整音量大小
    useEffect(() => {
        document.getElementById('Audio').volume = 0.2;
    }, [])

    const startGame = () => {
        setStart(true)
    }

    // 視窗關閉
    const handleClose = () => {
        setTheme('')
        setIsEnd(false)
        setStart(false)
        if (sessionStorage.getItem("gameTheme")) {
            sessionStorage.removeItem("gameTheme")
        }
    }

    // 下一關
    const handleNext = useCallback(() => {
        setTheme('')
        setIsEnd(false)
        setStart(false)
        setLevel()
        if (refreshToken) {
            getNext()
            setTheme(theme)
            setIsOpen([])
            setLeafCount(0)
            setFirstPickedIndex(null)
            setSecondPickedIndex(null)
        }
    }, [leafCount])

    // 關卡等級
    const getNext = () => {
        const themeId = themeFetchData.filter(d => d.themeName === theme)[0]?.themeid;

        if (refreshToken) {
            fetch(`${SSL}//${domain}/api/api/ThemeTask/GLMatch/Next`, {
                method: 'POST',
                headers: myHeaders,
                body: serialize({
                    themeId: String(themeId),
                    session: String(level)
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    // console.log("下一關", result)
                    setLevel(result.resultObject)
                }
            });
        }
    }
    // 獲取topicGuid
    const getTopic = () => {
        const themeId = themeFetchData.filter(d => d.themeName === theme)[0]?.themeid;

        fetch(`${SSL}//${domain}/api/api/ThemeTask/GLMatch/Topic`, {
            method: 'POST',
            headers: myHeaders,
            body: serialize({
                IsLogin: refreshToken ? "Y" : "N",
                themeId: String(themeId),
                level: String(level)
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                // console.log("獲取topicGuid", result)
                setTopicGuid(result.resultObject.topics[0].topicGuid)
                setLevelLeafCount(result.resultObject?.records[0]?.leafcount || 0)
                setMaxGrade(result.resultObject.topics[0].maxGrade)
                setPassThreshold(result.resultObject.topics[0].passThreshold)
                if (refreshToken || visitor) {
                    sessionStorage.setItem('visitorTopic', result.resultObject.topics[0].topicGuid)
                    sessionStorage.setItem('gameTheme', result.resultObject.topics[0].theme)
                }
            }
        });
    }
    // 獲取紀錄
    const getRecord = () => {
        if (isEnd && refreshToken && topicGuid) {
            fetch(`${SSL}//${domain}/api/api/ThemeTask/GLMatch/Record`, {
                method: 'POST',
                headers: myHeaders,
                body: serialize({
                    TopicGuid: topicGuid,
                    leafcount: String(leafCount),
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    // console.log("Record", result)
                    setPass(result.resultObject.isPass)
                }
            });
        }
    }

    useEffect(() => {
        getNext()
    }, [refreshToken])

    useEffect(() => {
        getTopic()
    }, [level])

    useEffect(() => {
        if (isEnd && refreshToken && topicGuid) {
            getRecord()
        }
    }, [isEnd, refreshToken, topicGuid])

    // 訪客計分
    useEffect(() => {
        if (isEnd && visitor) {
            leafCount >= 5 ? setPass(true) : setPass(false)
            sessionStorage.setItem('visitorLeafCount', leafCount)
        }
    }, [isEnd, leafCount, visitor])

    let color, themeBg, themeImg, themeLeaf, fetchData, passBg, failBg, iconData, iconText, themeLink;
    switch (theme) {
        case '綠色辦公':
            themeBg = mainOffice;
            themeImg = office;
            themeLeaf = leafOffice;
            color = '#09362b';
            fetchData = officeData;
            passBg = successOffice;
            failBg = failureOffice;
            iconData = officeIconData;
            iconText = iconTextData[0];
            themeLink = "flipOffice";
            break;
        case '綠色飲食':
            themeBg = mainFood;
            themeImg = food;
            themeLeaf = leafFood;
            color = "#61370c";
            fetchData = foodData;
            passBg = successFood;
            failBg = failureFood;
            iconData = foodIconData;
            iconText = iconTextData[1];
            themeLink = "flipFood";
            break;
        case '綠色消費':
            themeBg = mainShopping;
            themeImg = shopping;
            themeLeaf = leafShopping;
            color = "#610c15";
            fetchData = shoppingData;
            passBg = successShopping;
            failBg = failureShopping;
            iconData = shoppingIconData;
            iconText = iconTextData[2];
            themeLink = "flipShopping";
            break;
        case '綠色居家':
            themeBg = mainHome;
            themeImg = home;
            themeLeaf = leafHome;
            color = "#4c4615";
            fetchData = homeData;
            passBg = successHome;
            failBg = failureHome;
            iconData = homeIconData;
            iconText = iconTextData[3];
            themeLink = "flipHome";
            break;
        case '綠色旅遊':
            themeBg = mainTravel;
            themeImg = travel;
            themeLeaf = leafTravel;
            color = "#0d3b43";
            fetchData = travelData;
            passBg = successTravel;
            failBg = failureTravel;
            iconData = travelIconData;
            iconText = iconTextData[4];
            themeLink = "flipTour";
            break;
        default:
    }

    // 隨即出題
    const shuffleArray = (arr) => {
        let newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
        }
        return newArr;
    }

    // 等級配分icon、星星、秒數
    useEffect(() => {
        switch (level) {
            case 1:
                setIconLavelData(shuffleArray(fetchData[1][0]));
                setStarsData([starsColor, stars, stars, stars, stars]);
                setSeconds(20);
                setHeight("10vw");
                setNext(true);
                break;
            case 2:
                setIconLavelData(shuffleArray(fetchData[2][0]));
                setStarsData([starsColor, starsColor, stars, stars, stars]);
                setSeconds(20);
                setHeight("10vw");
                setNext(true);
                break;
            case 3:
                setIconLavelData(shuffleArray(fetchData[3][0]));
                setStarsData([starsColor, starsColor, starsColor, stars, stars]);
                setSeconds(25);
                setHeight("7.2vw");
                setNext(true);
                break;
            case 4:
                setIconLavelData(shuffleArray(fetchData[4][0]));
                setStarsData([starsColor, starsColor, starsColor, starsColor, stars]);
                setSeconds(30);
                setHeight("7vw");
                setNext(true);
                break;
            case 5:
                setIconLavelData(shuffleArray(fetchData[5][0]));
                setStarsData([starsColor, starsColor, starsColor, starsColor, starsColor]);
                setSeconds(35);
                setHeight("5vw");
                setNext(false);
                break;
            default:
        }
    }, [level])

    // 計時器
    let timer = null;
    function countDown() {
        timer = setTimeout(function () { setSeconds(seconds - 1) }, 1000);
    }
    function stopCountDown() {
        clearTimeout(timer);
        timer = null;
    }

    useEffect(() => {
        if (start) {
            if (seconds > 0) {
                countDown()
                if (isEnd) {
                    stopCountDown()
                }
            } else {
                // console.log('time up')
                stopCountDown()
                setIsEnd(true)
            }
        } else {
            stopCountDown()
        }
    }, [start, seconds]);

    const cardPressHandle = (index) => {
        let isOpenCard = [...isOpen]
        //不允許再點擊
        if (isOpenCard[index]) {
            return;
        }
        isOpenCard[index] = true;
        // 用戶選擇第一張牌時
        if (firstPickedIndex == null && secondPickedIndex == null) {
            setIsOpen(isOpenCard)
            setFirstPickedIndex(index)
            // 用戶選擇第二張牌時
        } else if (firstPickedIndex != null && secondPickedIndex == null) {
            setIsOpen(isOpenCard)
            setSecondPickedIndex(index)
        }
    }

    const calculateGameResult = () => {
        if (firstPickedIndex != null && secondPickedIndex != null) {
            // 判斷是否結束 
            if (iconLavelData?.length > 0) {
                let totalOpens = isOpen.filter((isOpen) => isOpen)
                if (totalOpens.length === iconLavelData?.length) {
                    // 處理結束時未存取最後一片葉子
                    setLeafCount(leafCount + 1)
                    setIsEnd(true)
                    return;
                }
            }

            //判斷第一張牌和第二張牌是否相同
            let firstSymbol = iconLavelData[firstPickedIndex];
            let secondSymbol = iconLavelData[secondPickedIndex];

            if (firstSymbol !== secondSymbol) {
                //Incorrect
                setTimeout(() => {
                    let isOpenCard = [...isOpen]
                    isOpenCard[firstPickedIndex] = false
                    isOpenCard[secondPickedIndex] = false

                    setFirstPickedIndex(null)
                    setSecondPickedIndex(null)
                    setIsOpen(isOpenCard)
                }, 1000);
            } else {
                //Correct
                setLeafCount(leafCount + 1)
                setFirstPickedIndex(null)
                setSecondPickedIndex(null)
            }
        }
    }

    useEffect(() => {
        if (secondPickedIndex != null) {
            calculateGameResult()
        }
    }, [secondPickedIndex])

    return (
        <>
            {start ?
                <div className="game-card">
                    <audio src={GameStartMusic} id="Audio" autoPlay loop></audio>
                    <img src={themeBg} alt="theme-bg" className="theme-bg" />
                    <img src={closeBtn} alt="close-btn" className="close-btn" onClick={() => handleClose()} />
                    <div className="card-content">
                        <img src={themeImg} alt="theme-img" className="theme-img" />
                        <div className="header col-12 row">
                            <div className="header-center col-10 d-flex justify-content-between align-items-center">
                                <div className="theme-name">{theme}</div>
                                <div className="level">STAGE<span>{level}</span>/5</div>
                                <div className="header-right col-6 d-flex">
                                    <div className="leef-area" style={{ backgroundColor: color }}>
                                        <img src={themeLeaf} alt="theme-leef" className="theme-leef-img" />
                                        <span>{leafCount}</span>
                                    </div>
                                    <div className="timer-area" style={{ backgroundColor: color }}>
                                        <img src={times} alt="timer" className="timer-img" />
                                        <span>{seconds}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="match-game d-flex justify-content-center align-items-center ">
                            {isEnd ?
                                <div className="finish-match col-12 row d-flex justify-content-around align-items-center">
                                    <div className="col-5 left-side" style={{ backgroundColor: color, filter: "brightness(2.1)" }}>
                                        <div className="font">獲得獎勵</div>
                                        <div className="getLeef">
                                            <img src={themeLeaf} alt="" width="10%" className="col-4" style={{ filter: "brightness(0.5)" }} />
                                            <span className="font"> X {leafCount}</span>
                                        </div>
                                    </div>
                                    {pass ?
                                        <div className="col-5 right-side">
                                            <div className="font">闖關成功！太棒了恭喜闖關成功！</div>
                                            <img src={passBg} alt="" className="col-10" />
                                            {/* <div className="font">太棒了恭喜闖關成功!</div> */}
                                        </div>
                                        :
                                        <div className="col-5 right-side">
                                            <div className="font">闖關失敗...不要氣餒再接再厲！</div>
                                            <img src={failBg} alt="" className="col-10" />
                                            {/* <div className="font">不要氣餒再接再厲!</div> */}
                                        </div>
                                    }
                                    {next &&
                                        <div className="next-btn" onClick={() => handleNext()}>
                                            <img src={startBtn} alt="next-btn-img" className="next-btn-img" width="40%" />
                                            <span>下一關</span>
                                        </div>
                                    }
                                </div>
                                :
                                iconLavelData.map((icon, index) =>
                                    <div className="match-card" key={index} onClick={() => cardPressHandle(index)}
                                        style={{ height: height, margin: level === 1 ? "2%" : "1%" }}>
                                        {isOpen[index] ? <img src={themeLeaf} alt="" className="theme-icon" /> : <img src={icon} alt="" className="match-icon" />}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="game-card">
                    <img src={themeBg} alt="theme-bg" className="theme-bg" />
                    <img src={closeBtn} alt="close-btn" className="close-btn" onClick={() => handleClose()} />
                    <div className="card-content">
                        <img src={themeImg} alt="theme-img" className="theme-img" />
                        <div className="header col-12 row">
                            <div className="header-center col-10 d-flex align-items-center">
                                <div className="theme-name">{theme}</div>
                                <p className="">{fetchData[0]?.title}</p>
                            </div>
                        </div>
                        <div className="intro-card col-12 row">
                            <div className="left-side col col-6">
                                <div className="intro">
                                    <div className="title">{theme}是什麼?</div>
                                    <div className="text">{fetchData[0].desc}</div>
                                    <Link to={`/about/intro/${themeLink}`} title={`${theme}，了解更多連結`} target="_blank" className="more" style={{ backgroundColor: color }}>了解更多</Link>
                                </div>
                                <div className="intro">
                                    <div className="title">都這樣做!</div>
                                    <div className="text d-flex justify-content-center align-items-end">
                                        {iconData.map((icon, index) =>
                                            <div className="do-icon-card" key={index} style={{ backgroundColor: color, color: "#fff" }}>
                                                <img src={icon} alt="" title="" />
                                                <span>{iconText[index]}</span>
                                            </div>
                                        )}
                                    </div>
                                    <Link to="/achievementPage" title="都這樣做，了解更多連結" className="more" style={{ backgroundColor: color }}>了解更多</Link>
                                </div>
                            </div>
                            <div className="right-side col-6">
                                <div className="intro">
                                    <div className="title">一起玩遊戲了解更多{theme}</div>
                                    <div className="text">
                                        <div className="stage-area">
                                            <div className="stage d-flex justify-content-center align-items-end" style={{ color: color }}>STAGE<p><span>{level}</span>/5</p></div>
                                            <div className="d-flex justify-content-center align-items-center p-2">
                                                {visitor ?
                                                    starsData.map((stars, index) =>
                                                        <img key={index} src={stars} alt="" width="10%" />
                                                    )
                                                    :
                                                    starsData.map((stars, index) =>
                                                        <img key={index} src={stars} alt="" width="10%" onClick={() => setLevel(index + 1)} />
                                                    )}
                                            </div>
                                        </div>
                                        <div className="game-rule">
                                            <div className="rule">
                                                <span>遊玩方式</span>
                                                點擊相同圖樣獲取獎勵，點擊{passThreshold}次即過關
                                            </div>
                                            <div className="award">
                                                <span>通關獎勵</span>
                                                <img src={themeLeaf} alt="" width="10%" />
                                                X {maxGrade || 0}
                                                <span className="leef-count" style={{ backgroundColor: color }}>已獲得 {levelLeafCount} / {maxGrade}</span>
                                            </div>
                                        </div>
                                        <div className="start-game-btn" onClick={() => startGame()}>
                                            <img src={startBtn} alt="start-game-btn" className="start-btn-img" width="40%" />
                                            <span>start</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default GameCard;