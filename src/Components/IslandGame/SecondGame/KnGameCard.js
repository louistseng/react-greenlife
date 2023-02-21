import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../GreenGame/GreenGame.scss';
import KnGameStartMusic from '../../../../src/GreenGame/SecondGame/KnGameStart.mp3';
import startBtn from '../../../../src/images1/GreenGame/GamePage/btnBg.svg';
import closeBtn from '../../../../src/images1/GreenGame/GamePage/Theme_bg/close_btn.svg';
import correct from '../../../../src/images1/GreenGame/secGamePage/kn_card/correct.svg';
import incorrect from '../../../../src/images1/GreenGame/secGamePage/kn_card/incorrect.svg';
import { leafOffice, leafFood, leafShopping, leafHome, leafTravel, officeIconData, foodIconData, shoppingIconData, homeIconData, travelIconData, iconTextData, officeDesc, foodDesc, shoppingDesc, homeDesc, travelDesc, successOffice, successFood, successHome, successShopping, successTravel, failureOffice, failureFood, failureHome, failureShopping, failureTravel, TravelSVG, FoodSVG, OfficeSVG, ShoppingSVG, HomeSVG, officeBg, foodBg, shoppingBg, homeBg, travelBg } from '../GameData';

function KnGameCard(props) {
    const { SSL, domain, refreshToken, myHeaders, serialize, themeId, themeName, setGameCardShow, setStart, start } = props;

    const [title, setTitle] = useState("");
    const [fetchData, setFetchData] = useState([]);
    const [level, setLevel] = useState(1)
    const [topicGuid, setTopicGuid] = useState("");
    const [answer, setAnswer] = useState(null);
    const [nextDesc, setNextDesc] = useState("");
    const [maxGrade, setMaxGrade] = useState();
    const [finishReplay, setFinishReplay] = useState(false);
    const [passThreshold, setPassThreshold] = useState();
    const [leafCount, setLeafCount] = useState(0);
    const [pass, setPass] = useState(null);
    const [finishImg, setFinishImg] = useState(null);
    const [isEnd, setIsEnd] = useState(false);


    let color, themeBg, themeSvg, themeLeaf, themeDesc, themeIconData, themeIconText, passBg, failBg, qaCount, finishBg, themeLink;

    switch (themeId) {
        case 1:
            color = "#0d3b43";
            themeBg = travelBg;
            themeSvg = <TravelSVG />
            themeLeaf = leafTravel;
            themeDesc = travelDesc;
            themeIconData = travelIconData;
            themeIconText = iconTextData[4];
            passBg = successTravel;
            failBg = failureTravel;
            finishBg = "#C2F5FF";
            qaCount = 17;
            themeLink = "flipTour";
            break;
        case 2:
            color = "#61370c";
            themeBg = foodBg;
            themeSvg = <FoodSVG />
            themeLeaf = leafFood;
            themeDesc = foodDesc;
            themeIconData = foodIconData;
            themeIconText = iconTextData[1];
            passBg = successFood;
            failBg = failureFood;
            finishBg = "#FFD7B0";
            qaCount = 16;
            themeLink = "flipFood";
            break;
        case 3:
            color = '#09362b';
            themeBg = officeBg;
            themeSvg = <OfficeSVG />
            themeLeaf = leafOffice;
            themeDesc = officeDesc;
            themeIconData = officeIconData;
            themeIconText = iconTextData[0];
            passBg = successOffice;
            failBg = failureOffice;
            finishBg = "#C3FFF0";
            qaCount = 22;
            themeLink = "flipOffice";
            break;
        case 4:
            color = "#610c15";
            themeBg = shoppingBg;
            themeSvg = <ShoppingSVG />
            themeLeaf = leafShopping;
            themeDesc = shoppingDesc;
            themeIconData = shoppingIconData;
            themeIconText = iconTextData[2];
            passBg = successShopping;
            failBg = failureShopping;
            finishBg = "#FFD7D4";
            qaCount = 15;
            themeLink = "flipShopping";
            break;
        case 5:
            color = "#4c4615";
            themeBg = homeBg;
            themeSvg = <HomeSVG />
            themeLeaf = leafHome;
            themeDesc = homeDesc;
            themeIconData = homeIconData;
            themeIconText = iconTextData[3];
            passBg = successHome;
            failBg = failureHome;
            finishBg = "#FFF7BF";
            qaCount = 30;
            themeLink = "flipHome";
            break;
        default:
    }

    // 進入畫面
    useEffect(() => {
        getTopicData()
        getMaxGrade()
        // 調整音量大小
        document.getElementById('Audio').volume = 0.2;
    }, [SSL, domain, level])

    // 遊戲開始後答題對錯判斷
    useEffect(() => {
        if (start) {
            if (fetchData.length > 0) {
                if (fetchData[0].answer === answer && answer !== null) {
                    setTitle(themeDesc[0].correctReplay);
                    setLeafCount(leafCount + 1)
                    saveReplay(topicGuid, answer)
                    if (!isEnd) {
                        setNextDesc("你真的太厲害了! 往下一題邁進吧!")
                    } else {
                        setNextDesc("答題結束!")
                    }
                }
                else if (fetchData[0].answer !== answer && answer !== null) {
                    setTitle(themeDesc[0].inCorrectReplay);
                    saveReplay(topicGuid, answer)
                    if (!isEnd) {
                        setNextDesc("沒關係不要氣餒! 再繼續一起努力!")
                    } else {
                        setNextDesc("答題結束!")
                    }
                }
            }
        }
    }, [answer, fetchData])

    // 遊戲開始
    const startGame = () => {
        setStart(true)
        setTitle(themeDesc[0].themeQa)
    }

    // 下一題及答題結束判斷
    const handleNext = () => {
        setAnswer(null)
        setTopicGuid("")
        setTitle(themeDesc[0].themeQa)
        if (level === qaCount) {
            setFinishReplay(true)
            sendReplay()
            if (leafCount >= passThreshold) {
                setFinishImg(passBg)
                setPass(true)
            } else {
                setFinishImg(failBg)
                setPass(false)
            }
        } else {
            setLevel(level + 1)
        }
        // 最後一題文字切換
        if (level === qaCount - 1) {
            setIsEnd(true)
        }
    }

    // 遊戲結束
    const endGame = () => {
        setGameCardShow(false)
        setStart(false)
        setReplaysData([])
        if (sessionStorage.getItem("gameTheme")) {
            sessionStorage.removeItem("gameTheme")
        }
    }

    // 問答題目
    const getTopicData = () => {
        fetch(`${SSL}//${domain}/api/api/ThemeTask/GLQuiz/Topic`, {
            method: 'POST',
            headers: myHeaders,
            body: serialize({
                IsLogin: refreshToken !== "" ? "y" : "n",
                themeId: String(themeId),
                level: String(level)
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                // console.log("知識綠題目", result)
                setFetchData(result.resultObject.topics)
                setLevel(result.resultObject.topics[0].level)
                setPassThreshold(result.resultObject.passThreshold)
                sessionStorage.setItem('gameTheme', result.resultObject.topics[0].theme)
            }
        });
    }

    // 儲存答題guid及答案
    const [ReplaysData, setReplaysData] = useState([]);
    const saveReplay = (topicGuid, answer) => {
        if (topicGuid !== "") {
            setReplaysData(current => [...current, { topicGuid: topicGuid, Replay: answer }]);
        }
    }

    // 回傳回答
    const sendReplay = () => {
        if (ReplaysData.length <= qaCount) {
            fetch(`${SSL}//${domain}/api/api/ThemeTask/GLQuiz/Record`, {
                method: 'POST',
                headers: myHeaders,
                body: serialize({
                    "Replays": ReplaysData
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    // console.log("record", result)
                }
            });
        }
    }

    // 取得個人最高分
    const getMaxGrade = () => {
        fetch(`${SSL}//${domain}/api/api/ThemeTask/GLQuiz/MaxGrade?themeId=${String(themeId)}`, {
            method: 'POST',
            headers: myHeaders,
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                // console.log(result)
                setMaxGrade(result.resultObject)
            }
        });
    }

    return (
        <>
            {fetchData.length > 0 &&
                <div className="kn-card">
                    {start && <audio src={KnGameStartMusic} id="Audio" autoPlay loop></audio>}
                    <img src={themeBg} alt="kn-card-bg" className="kn-card-bg" />
                    <img src={closeBtn} alt="close-btn" className="close-btn" onClick={() => endGame()} />
                    {fetchData.map((fetchData, i) =>
                        themeDesc.map((data, index) =>
                            <div key={i} className="card-content row">
                                <div className="left-content d-flex justify-content-center align-items-center">
                                    {finishReplay ?
                                        <div className="finish-text">
                                            {pass ?
                                                <>
                                                    <p>闖關成功</p>
                                                    <p>太棒了</p>
                                                    <p>恭喜闖關成功!</p>
                                                </>
                                                :
                                                <>
                                                    <p>闖關失敗</p>
                                                    <p>可惜失敗了..</p>
                                                    <p>別氣餒再接再厲!</p>
                                                </>
                                            }
                                        </div>
                                        :
                                        <div className="group">
                                            {themeSvg}
                                            {start ?
                                                <>
                                                    <p className="stage-text">STAGE<span>&nbsp;&nbsp;{level}/{qaCount}</span></p>
                                                    <p className="leaf-area" style={{ backgroundColor: color }}>
                                                        <img src={leafOffice} alt="leaf-img" />&nbsp;&nbsp;<span>{leafCount}</span>
                                                    </p>
                                                </>
                                                :
                                                <>
                                                    <p className="desc-fri">{data.themeTitle.split(" ")[0]}</p>
                                                    <p className="desc-sec">{data.themeTitle.split(" ")[1]}</p>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>

                                {start ?
                                    <div className="question-container">
                                        {finishReplay ?
                                            <div className="finish-count-area" style={{ background: finishBg, color: color }}>
                                                <p>獲得獎勵</p>
                                                <img src={themeLeaf} alt="theme-leaf" />
                                                <span>&nbsp; X &nbsp;{leafCount}</span>
                                            </div>
                                            :
                                            <>
                                                <div className="title">{title}</div>
                                                <div className="qa-outside">
                                                    {answer !== null ?
                                                        <div className="qa d-flex justify-content-center flex-column">
                                                            <p className="desc">{fetchData.desc1}</p>
                                                            <p>{fetchData.desc2}</p>
                                                        </div>
                                                        :
                                                        <div className="qa d-flex justify-content-center align-items-center">
                                                            <p>{fetchData.question}</p>
                                                        </div>
                                                    }
                                                </div>
                                            </>
                                        }
                                    </div>
                                    :
                                    <div className="center-content">
                                        <div className="top">
                                            <div className="title">{data.title}</div>
                                            <div className="desc">{data.desc}</div>
                                            <div className="more-outside d-flex justify-content-center align-items-center">
                                                <Link to={`/about/intro/${themeLink}`} title={`${themeName}了解更多連結`} target="_blank" className="more" style={{ border: `6px solid ${color}`, backgroundColor: color }}>了解更多</Link>
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="title">{data.how}</div>
                                            <div className="bottom-card d-flex justify-content-center align-items-center">
                                                {themeIconData.map((icon, indx) =>
                                                    <div className="do-icon-card" key={indx} style={{ backgroundColor: color, color: "#fff" }}>
                                                        <img src={icon} alt="do-icon-card-img" />
                                                        <span>{themeIconText[indx]}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="more-outside d-flex justify-content-center align-items-center">
                                                <Link to="/achievementPage" title="都這樣做，了解更多連結" className="more" style={{ border: `6px solid ${color}`, backgroundColor: color }}>了解更多</Link>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {start ?
                                    <div className="answer-container">
                                        {answer !== null ?
                                            <>
                                                <p className="next-text">{nextDesc.split(" ")[0]}</p>
                                                <p className="next-text">{nextDesc.split(" ")[1]}</p>
                                                <div className="next-btn" onClick={() => handleNext()}>{isEnd ? "看結果" : "下一題"}</div>
                                            </>
                                            :
                                            <>
                                                {finishReplay ?
                                                    <img src={finishImg} alt="finish-img" className="finish-img" />
                                                    :
                                                    <>
                                                        <div className="answer-btn" id="btn" >
                                                            <img src={correct} alt="correct" onClick={() => {
                                                                setAnswer("O")
                                                                setTopicGuid(fetchData.topicGuid)
                                                            }} />
                                                        </div>
                                                        <div className="answer-btn" id="btn2">
                                                            <img src={incorrect} alt="incorrect" onClick={() => {
                                                                setAnswer("X")
                                                                setTopicGuid(fetchData.topicGuid)
                                                            }} />
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                    :
                                    <div className="right-content">
                                        <div className="right-card">
                                            <div className="title">一起參加問答遊戲</div>
                                            <p className="rule">
                                                <span className="rule-span">遊玩方式</span>
                                                <span>請看看問題內發生的事</span>
                                            </p>
                                            <p className="rule">
                                                {/* <span className="rule-span-blank"></span> */}
                                                <span>認為{data.familyCall}會這樣做，請選擇</span>
                                                <img src={correct} alt="correct" width="10%" />
                                            </p>
                                            <p className="rule">
                                                {/* <span className="rule-span-blank"></span> */}
                                                <span>認為這不是{data.familyCall}，請選擇</span>
                                                <img src={incorrect} alt="incorrect" width="10%" />
                                            </p>
                                            <p className="rule">
                                                <span className="rule-span">遊戲規則</span>
                                                <span>題目共{qaCount}題</span>
                                            </p>
                                            <p className="rule">
                                                <span className="rule-span">過關獎勵</span>
                                                <img src={themeLeaf} alt="" width="10%" />
                                                <span>&nbsp;X&nbsp;{qaCount}</span>
                                                <span className="leaf-count" style={{ backgroundColor: color }}>已獲得&nbsp;{maxGrade}/{qaCount}</span>
                                            </p>
                                            <div className="start-btn-outside">
                                                <div className="start-game-btn d-flex justify-content-center" onClick={() => startGame()}>
                                                    <img src={startBtn} alt="start-game-btn" className="start-game-btn-mg" width="60%" />
                                                    <span>start</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }  </div>
                        )
                    )}
                </div>
            }
        </>
    )
}
export default KnGameCard;