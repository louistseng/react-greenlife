import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../../GreenGame/GreenGame.scss';
import GamePageMusic from '../FirstGame/GamePage.mp3';
import { getThemeData } from '../../../src/utils/API';

import gamePageBg from '../../../src/images1/GreenGame/GamePage/game_page.png';
import boat from '../../../src/images1/GreenGame/GamePage/boat.svg';
import boatShadow from '../../../src/images1/GreenGame/GamePage/boat_shadow.svg';

import { TravelSVG, FoodSVG, OfficeSVG, ShoppingSVG, HomeSVG, GreenLifeSVG } from '../../../src/Components/IslandGame/GameData';

const GameCard = React.lazy(() => import("../../Components/IslandGame/GameCard"));
const GreenAlert = React.lazy(() => import("../../Components/IslandGame/GameAlert"));
const ChooseGame = React.lazy(() => import("../../Components/IslandGame/ChooseGame"));
const TopBtn = React.lazy(() => import("../../Components/IslandGame/TopBtn"));



function GamePage(props) {

    const { SSL, domain } = props;

    var serialize = require('serialize-javascript');

    const svgRef = useRef();

    const [start, setStart] = useState(false);
    const [ishint, setIsHint] = useState(false);
    const [friGameAlert, setFriGameAlert] = useState(false);
    const [theme, setTheme] = useState('');
    const [gameCookies] = useCookies([]);
    const [themeFetchData, setThemeFetchData] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    const [visitorAlert, setVisitorAlert] = useState(false);
    const [chooseShow, setChooseShow] = useState(false);
    const [secVisitorShow, setSecVisitorShow] = useState(false);


    const refreshToken = gameCookies.refreshToken || "";
    const visitor = sessionStorage.getItem("visitor") || "";


    let myHeaders = new Headers({
        "Token": refreshToken || visitor,
        "Content-Type": "application/json; charset=utf-8"
    });

    const visitorLeafCount = sessionStorage.getItem('visitorLeafCount');
    const visitorTopic = sessionStorage.getItem('visitorTopic');
    const player = sessionStorage.getItem("player");

    useEffect(() => {
        // 獲取五大主軸
        getThemeData(setThemeFetchData)

        // 登入後刪除訪客sessionStorage
        if (refreshToken) {
            sessionStorage.removeItem("visitor");
            sessionStorage.removeItem("gameTheme");
            setVisitorAlert(false)
        }
        // 已進入過此畫面不顯示介紹視窗
        if (player) {
            setFriGameAlert(true)
        } else {
            setIsHint(true)
        }
    }, [refreshToken])

    // 獲取紀錄
    useEffect(() => {
        if (visitorLeafCount && refreshToken) {
            fetch(`${SSL}//${domain}/api/api/ThemeTask/GLMatch/Record`, {
                method: 'POST',
                headers: myHeaders,
                body: serialize({
                    TopicGuid: visitorTopic,
                    leafcount: visitorLeafCount >= 18 ? "18" : String(visitorLeafCount),
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    console.log("Record", result);
                    sessionStorage.removeItem("visitorLeafCount");
                    sessionStorage.removeItem("visitorTopic");
                    setIsHint(false);
                }
            });
        }
    }, [visitorLeafCount])

    useEffect(() => {
        if (visitorLeafCount != null && isEnd !== true && theme === "" && visitor !== "") {
            setVisitorAlert(true)
        }
    }, [visitorLeafCount, isEnd, theme, visitor])

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
            <div className="game-container" onTouchStart={() => startMusic()}>
                {!start && <audio src={GamePageMusic} id="Audio" autoPlay loop></audio>}
                <img src={gamePageBg} alt="gamePageBg-img" className="game-page-bg" onClick={() => setTheme('')} />
                {(!secVisitorShow && chooseShow) && <ChooseGame setChooseShow={setChooseShow} setSecVisitorShow={setSecVisitorShow} setFriGameAlert={setFriGameAlert} />}
                <TopBtn setChooseShow={setChooseShow} btnText={"查看個人成就"} />
                <div className="five-page-axes">
                    <div className="axes match-img" onClick={() => setTheme(themeFetchData[2]?.themeName)}>
                        <OfficeSVG ref={svgRef} className="game-page-svg" alt="" />
                    </div>
                    <div className="axes match-img" onClick={() => setTheme(themeFetchData[1]?.themeName)}>
                        <FoodSVG ref={svgRef} className="game-page-svg" alt="" />
                    </div>
                    <div className="axes match-img" onClick={() => setTheme(themeFetchData[3]?.themeName)}>
                        <ShoppingSVG ref={svgRef} className="game-page-svg" alt="" />
                    </div>
                    <div className="axes match-img" onClick={() => setTheme(themeFetchData[4]?.themeName)}>
                        <HomeSVG ref={svgRef} className="game-page-svg" alt="" />
                    </div>
                    <div className="axes match-img" onClick={() => setTheme(themeFetchData[0]?.themeName)}>
                        <TravelSVG ref={svgRef} className="game-page-svg" alt="" />
                    </div>
                    <div className="axes match-green-img">
                        <div className="speech-bubble"><h1>歡迎來到「綠寶家族點點樂」！</h1>
                            我是旁白綠寶！可以點我旁邊的家族成員們進入關卡來拿取獎勵唷！</div>
                        <GreenLifeSVG ref={svgRef} className="game-page-svg" alt="" />
                    </div>
                </div>
                <div className="boat-img">
                    <img src={boat} alt="boat" className="boat" />
                    <img src={boatShadow} alt="boat-shadow" className="boat-shadow" />
                </div>
                {(theme !== '') &&
                    <GameCard
                        SSL={props.SSL}
                        domain={props.domain}
                        theme={theme}
                        setTheme={setTheme}
                        themeFetchData={themeFetchData}
                        refreshToken={refreshToken}
                        visitor={visitor}
                        isEnd={isEnd}
                        setIsEnd={setIsEnd}
                        gameCookies={gameCookies}
                        start={start}
                        setStart={setStart}
                    />}
                {visitorAlert &&
                    <GreenAlert visitorAlert={visitorAlert} setVisitorAlert={setVisitorAlert} setTheme={setTheme} />
                }
                {ishint &&
                    <GreenAlert setIsHint={setIsHint} ishint={ishint} setFriGameAlert={setFriGameAlert} />
                }
                {friGameAlert &&
                    <GreenAlert setFriGameAlert={setFriGameAlert} friGameAlert={friGameAlert} />
                }
                {secVisitorShow &&
                    <GreenAlert secVisitorShow={secVisitorShow} setSecVisitorShow={setSecVisitorShow} />
                }

            </div>
        </>
    )
}

export default withRouter(GamePage); 