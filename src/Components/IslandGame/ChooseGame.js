import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import chooseGame from '../../../src/images1/GreenGame/GamePage/choose_game.png';
import closeBtn from '../../../src/images1/GreenGame/GamePage/Theme_bg/close_btn.svg';
import chooseGameBtn from '../../../src/images1/GreenGame/GamePage/btnBg.svg';


function ChooseGame(props) {
    const { setChooseShow, setSecVisitorShow, setFriGameAlert } = props;

    const domain = window.location.hostname;
    const [host, setHost] = useState(true);
    const visitor = sessionStorage.getItem("visitor") || "";

    useEffect(() => {
        if (visitor) {
            setHost(false)
        }
    }, [])

    const handleClick = () => {
        if (window.location.pathname === "/gamePage" || window.location.pathname === "/achievementPage") {
            if (visitor) {
                setSecVisitorShow(true)
                setChooseShow(false)
            }
        }
    }

    const handleGamePageClick = () => {
        if (window.location.pathname === "/gamePage") {
            setFriGameAlert(true)
            setChooseShow(false)
        }
    }

    return (
        <>
            <div className="choose-btn-alert">
                <img src={chooseGame} alt="choose-game" className="choose-game-bg" width="50%" />
                <img src={closeBtn} alt="close-btn" className="close-btn" onClick={() => setChooseShow(false)} />
                <Link to="/gamePage" title="綠寶家族點點樂" className="choose-btn" onClick={() => handleGamePageClick()}>
                    <img src={chooseGameBtn} alt="btn-bg" />
                    <p>綠寶家族點點樂</p>
                </Link>
                <Link to={host ? "/knGamePage" : "#"} title="知識綠知多少" className="choose-btn" onClick={() => handleClick()}>
                    <img src={chooseGameBtn} alt="btn-bg" />
                    <p>知識綠知多少</p>
                </Link>
                <Link to="#" title="" className="choose-btn">
                    <img src={chooseGameBtn} alt="" />
                    <p>敬請期待</p>
                </Link>
                {/* 綠活小屋大解密開啟 */}
                {/* <Link to="/houseGamePage" title="綠活小屋大解密" className="choose-btn">
                    <img src={chooseGameBtn} alt="btn-bg" />
                    <p>綠活小屋大解密</p>
                </Link> */}
            </div>
        </>
    );
}

export default ChooseGame;