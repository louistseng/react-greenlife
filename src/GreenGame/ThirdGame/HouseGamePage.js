import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../../GreenGame/GreenGame.scss';
import { getThemeData } from '../../../src/utils/API';
import house_bg from '../../images1/GreenGame/HouseGamePage/house_bg.jpg'
import { TravelSVG, FoodSVG, OfficeSVG, ShoppingSVG, HomeSVG } from '../../Components/IslandGame/GameData';


const GreenAlert = React.lazy(() => import("../../Components/IslandGame/GameAlert"));
const ChooseGame = React.lazy(() => import("../../Components/IslandGame/ChooseGame"));
const TopBtn = React.lazy(() => import("../../Components/IslandGame/TopBtn"));
const ThemeCard = React.lazy(() => import("../../Components/IslandGame/ThirdGame/ThemeCard"));

function HouseGamePage(props) {
    const { SSL, domain } = props;

    const [gameCookies] = useCookies([]);
    const [friGameAlert, setFriGameAlert] = useState(false);
    const [chooseShow, setChooseShow] = useState(false);
    const [secVisitorShow, setSecVisitorShow] = useState(false);
    const [thirdAlert, setThirdAlert] = useState(true);
    const [theme, setTheme] = useState("");


    var serialize = require('serialize-javascript');

    const refreshToken = gameCookies.refreshToken || "";

    let myHeaders = new Headers({
        "Token": refreshToken,
        "Content-Type": "application/json; charset=utf-8"
    });


    return (
        <>
            <div className="house-game-container">
                <img src={house_bg} alt="house-bg" className="house-bg" />
                {(!secVisitorShow && chooseShow) && <ChooseGame setChooseShow={setChooseShow} setSecVisitorShow={setSecVisitorShow} setFriGameAlert={setFriGameAlert} />}
                <TopBtn setChooseShow={setChooseShow} btnText={"查看個人成就"} />
                <div className="d-flex theme-svg">
                    <OfficeSVG onClick={() => setTheme("綠色辦公")} width="40%" />
                    <FoodSVG onClick={() => setTheme("綠色飲食")} width="40%" />
                    <ShoppingSVG onClick={() => setTheme("綠色消費")} width="40%" />
                    <HomeSVG onClick={() => setTheme("綠色居家")} width="40%" />
                    <TravelSVG onClick={() => setTheme("綠色旅遊")} width="40%" />
                </div>
                {theme != "" && <ThemeCard theme={theme} setTheme={setTheme} />}
                <GreenAlert thirdAlert={thirdAlert} setThirdAlert={setThirdAlert} />

            </div>
        </>
    );
}

export default withRouter(HouseGamePage);