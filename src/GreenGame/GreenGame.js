import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import '../GreenGame/GreenGame.scss';
import GreenGameMusic from './GreenGame.mp3';
import { detectMob } from '../../src/utils/Functions'

import main from '../../src/images1/GreenGame/Main/game_main.png';
import adventure from '../../src/images1/GreenGame/Main/adventure.svg';
import gameName from '../../src/images1/GreenGame/Main/game_name.png';
import boat from '../../src/images1/GreenGame/Main/boat.svg';
import boatShadow from '../../src/images1/GreenGame/Main/boat_shadow.svg';

import { ReactComponent as TravelSVG } from '../../src/images1/GreenGame/Main/travel.svg'
import { ReactComponent as HomeSVG } from '../../src/images1/GreenGame/Main/home.svg'
import { ReactComponent as ShoppingSVG } from '../../src/images1/GreenGame/Main/shopping.svg'
import { ReactComponent as FoodSVG } from '../../src/images1/GreenGame/Main/food.svg'
import { ReactComponent as OfficeSVG } from '../../src/images1/GreenGame/Main/office.svg'


const GreenAlert = React.lazy(() => import("../Components/IslandGame/GameAlert"));


function GreenGame(props) {
    const [show, setShow] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [greenlifeCookies] = useCookies([]);
    const svgRef = useRef();

    const refreshToken = greenlifeCookies.refreshToken || "";
    const visitorToken = sessionStorage.getItem("visitor") || "";

    useEffect(() => {
        if (visitorToken || refreshToken) {
            sessionStorage.removeItem("visitor");
            sessionStorage.removeItem("gameTheme");
            sessionStorage.removeItem("player");
        }
        if (refreshToken !== "") {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [refreshToken, visitorToken])

    useEffect(() => {
        document.getElementById('Audio').volume = 0.2;

        // 判斷手機電腦
        let mode = Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
        if (typeof window.orientation !== 'undefined') {
            if (mode === 'portrait') {
                window.alert("為了您的遊戲體驗，請將手機螢幕調整為橫式再遊玩，謝謝！")
            }
        }
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
            <div className="game-main" id="game-main" onTouchStart={() => startMusic()}>
                <audio src={GreenGameMusic} id="Audio" autoPlay loop ></audio>
                <img src={main} alt="main-img" className="main-img" onClick={() => setShow(false)} />
                <img src={gameName} alt="gameName-img" className="game-name" />
                <div className="boat-img">
                    <img src={boat} alt="boat-img" className="boat" />
                    <img src={boatShadow} alt="boat-img" className="boat-shadow" />
                </div>
                {isLogin ?
                    <Link to="/gamePage" className="adventure-btn" >
                        <img src={adventure} alt="adventure-btn-img" />
                        <div className="adventure-btn-text">一起探索</div>
                    </Link>
                    :
                    <div className="adventure-btn" onClick={() => setShow(true)} >
                        <img src={adventure} alt="adventure-btn-img" />
                        <div className="adventure-btn-text">一起探索</div>
                    </div>
                }
                {show && <GreenAlert show={show} SSL={props.SSL} domain={props.domain} />}
                <div className="five-main-axes">
                    <TravelSVG ref={svgRef} className="svg-img" alt="" style={{ width: "13%" }} />
                    <HomeSVG ref={svgRef} className="svg-img" alt="" style={{ width: "20%" }} />
                    <ShoppingSVG ref={svgRef} className="svg-img" alt="" style={{ width: "13%" }} />
                    <FoodSVG ref={svgRef} className="svg-img" alt="" style={{ width: "15%" }} />
                    <OfficeSVG ref={svgRef} className="svg-img" alt="" style={{ width: "10%" }} />
                </div>
            </div>
        </>
    )
}

export default GreenGame; 