import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../../GreenGame/GreenGame.scss';
import { getThemeData } from '../../../src/utils/API';
import KnGamePageMusic from '../../../src/GreenGame/SecondGame/KnGamePage.mp3';

import mapBg from '../../../src/images1/GreenGame/secGamePage/map_bg.png';
import TravelIslandSVG from '../../../src/images1/GreenGame/secGamePage/tour_island.svg';
import HomeIslandSVG from '../../../src/images1/GreenGame/secGamePage/home_island.svg';
import ShoppingIslandSVG from '../../../src/images1/GreenGame/secGamePage/shopping_island.svg';
import FoodIslandSVG from '../../../src/images1/GreenGame/secGamePage/food_island.svg';
import OfficeIslandSVG from '../../../src/images1/GreenGame/secGamePage/office_island.svg';
import { TravelSVG, FoodSVG, OfficeSVG, ShoppingSVG, HomeSVG, office, food, shopping, home, travel } from '../../../src/Components/IslandGame/GameData';

const ChooseGame = React.lazy(() => import("../../Components/IslandGame/ChooseGame"));
const TopBtn = React.lazy(() => import("../../Components/IslandGame/TopBtn"));
const GreenAlert = React.lazy(() => import("../../Components/IslandGame/GameAlert"));
const KnGameCard = React.lazy(() => import("../../Components/IslandGame/SecondGame/KnGameCard"));

function KnGamePage(props) {
    const { SSL, domain } = props;

    const [gameCookies] = useCookies([]);
    const [chooseShow, setChooseShow] = useState(false);
    const [secAlertShow, setSecAlertShow] = useState(true);
    const [gameCardShow, setGameCardShow] = useState(false);
    const [start, setStart] = useState(false);
    const [themeFetchData, setThemeFetchData] = useState([]);
    const [themeId, setThemeId] = useState("");
    const [themeName, setThemeName] = useState("");

    var serialize = require('serialize-javascript');

    const refreshToken = gameCookies.refreshToken || "";

    let myHeaders = new Headers({
        "Token": refreshToken,
        "Content-Type": "application/json; charset=utf-8"
    });


    // 獲取主題
    useEffect(() => {
        getThemeData(setThemeFetchData)
        // 調整音量大小
        if (!start) {
            document.getElementById('Audio').volume = 0.2;
        }
    }, [])

    // 手機版音樂設定
    const startMusic = () => {
        let audio = document.getElementById('Audio');
        audio.play();
        audio.volume = 0.2;
        audio.muted = false;
    }

    const handleOpenGameCard = (d) => {
        setThemeId(themeFetchData[d.index].themeid)
        setThemeName(themeFetchData[d.index].themeName)
        setGameCardShow(true)
    }

    const themeImg = [
        { IslandBg: OfficeIslandSVG, themeImg: office, index: 2 },
        { IslandBg: ShoppingIslandSVG, themeImg: shopping, index: 3 },
        { IslandBg: TravelIslandSVG, themeImg: travel, index: 0 },
        { IslandBg: FoodIslandSVG, themeImg: food, index: 1 },
        { IslandBg: HomeIslandSVG, themeImg: home, index: 4 }
    ]
    return (
        <>
            <div className="game-container" onTouchStart={() => startMusic()}>
                {!start && <audio src={KnGamePageMusic} id="Audio" autoPlay loop></audio>}
                <img src={mapBg} alt="" className="map-bg" />
                {chooseShow && <ChooseGame setChooseShow={setChooseShow} />}
                <TopBtn setChooseShow={setChooseShow} btnText={"查看個人成就"} />
                {!chooseShow && <GreenAlert secAlertShow={secAlertShow} setSecAlertShow={setSecAlertShow} />}
                <div className="theme-island-outside">
                    {themeImg.map((d, i) =>
                        <img key={i} src={d.IslandBg}
                            className="theme-island" alt="theme-island"
                            onClick={() => handleOpenGameCard(d)} />
                    )}
                    {themeImg.map((d, i) =>
                        <img key={i} src={d.themeImg}
                            style={{ width: "10%", height: "30%" }}
                            className="theme-island" alt="theme-island"
                            onClick={() => handleOpenGameCard(d)} />
                    )}
                </div>
                {gameCardShow &&
                    <KnGameCard
                        SSL={SSL}
                        domain={domain}
                        refreshToken={refreshToken}
                        serialize={serialize}
                        myHeaders={myHeaders}
                        themeId={themeId}
                        themeName={themeName}
                        setGameCardShow={setGameCardShow}
                        setStart={setStart}
                        start={start}
                    />
                }
            </div>
        </>
    );
}

export default withRouter(KnGamePage);