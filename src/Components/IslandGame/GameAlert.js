import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../GreenGame/GreenGame.scss';
import guideAlert from '../../../src/images1/GreenGame/Main/guide_alert.svg';

import { ReactComponent as GreenLifeSVG } from '../../../src/images1/GreenGame/GamePage/green_life.svg';


function GameAlert(props) {

    const svgRef = useRef();

    const { show, SSL, domain, setIsHint, ishint, friGameAlert, setFriGameAlert, visitorAlert, setVisitorAlert, secAlertShow, setSecAlertShow, secVisitorShow, setSecVisitorShow, thirdAlert, setThirdAlert } = props;

    // 紀錄訪客紀錄
    const visitorStart = () => {
        if (sessionStorage.getItem("visitorLeafCount")) {
            sessionStorage.removeItem("visitorLeafCount")
            setVisitorAlert(false)
        } else {
            fetch(`${SSL}//${domain}/api/api/Auth/Token`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: {
                    u: '-'
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    sessionStorage.setItem("visitor", result.resultObject.split(":")[1])
                }
            });
        }
    }

    return (
        <>
            {show &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <h1>歡迎來到綠活群島，我是綠寶!</h1>
                        <GreenLifeSVG ref={svgRef} alt="" className="alert-greenlife" style={{ width: "25%" }} />
                        <br />
                        <p>在這裡你可以認識我可愛的家人們，也可以跟著我們一起玩遊戲、一起探索綠活群島，了解我們如何在日常生活中實踐綠生活！</p>
                        <p>接下來先讓我帶你們認識我可愛的家人們吧！</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="/login" className="col-5" onClick={() => sessionStorage.setItem('gameLogin', new Date())}>登入會員</Link>
                            <Link to="/gamePage" className="col-5" onClick={() => visitorStart()}>訪客身份繼續</Link>
                        </div>
                    </div>
                </div>
            }
            {visitorAlert &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <h1>提醒您，您現在身份為訪客！</h1>
                        <GreenLifeSVG ref={svgRef} alt="" className="alert-greenlife" style={{ width: "25%" }} />
                        <br />
                        <p>訪客身份無法保存您辛苦玩的分數，也無法累積獎勵兌換抽獎資格喔！</p>
                        <p>請問是否要登入會員呢？</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="/login" className="col-5" onClick={() => sessionStorage.setItem('gameLogin', new Date())}>登入會員</Link>
                            <Link to="/gamePage" onClick={() => visitorStart()} className="col-5">訪客身份繼續</Link>
                        </div>
                    </div>
                </div>
            }
            {ishint &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <br />
                        <p>我們家有響應綠色辦公的辦公爸、堅持綠色消費的消費媽、實踐綠色飲食的飲食哥、崇尚綠色旅遊的旅遊妹、打造綠色居家的居家弟，以及最最最可愛的我-綠寶！</p>
                        {/* <br /> */}
                        <p>在這裡不但可以了解每個家人日常中最喜歡做哪些綠行動，還有三款小遊戲可以遊玩並蒐集獎勵，獎勵不僅可以解鎖成就，還能拿來換平台綠積分，年底還有機會參加特別的活動喔！</p>
                        {/* <br /> */}
                        <p>快跟著我一起玩遊戲，認識綠寶家族吧！</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="#" className="col-5 alert-close-btn" onClick={() => {
                                setIsHint(false)
                                setFriGameAlert(true)
                            }}>關閉</Link>
                        </div>
                    </div>
                </div>
            }
            {friGameAlert &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <h1>嗨，歡迎來到第一關卡，綠寶家族點點樂！</h1>
                        <br />
                        <p>快來跟我一起玩遊戲認識綠寶家族成員！</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="#" className="col-5" onClick={() => {
                                sessionStorage.setItem("player", new Date())
                                setFriGameAlert(false)
                            }}>關閉</Link>
                        </div>
                    </div>
                </div>
            }
            {secAlertShow &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <h1>嗨，歡迎來到第二個關卡，知識綠知多少!</h1>
                        <br />
                        <p>快跟我一起來比賽，看看誰更了解辦公爸、消費媽、飲食哥、旅遊妹吧!</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="#" className="col-5" onClick={() => setSecAlertShow(false)}>關閉</Link>
                        </div>
                    </div>
                </div>
            }

            {secVisitorShow &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <h1>提醒您，您現在身份為訪客！</h1>
                        <GreenLifeSVG ref={svgRef} alt="" className="alert-greenlife" style={{ width: "25%" }} />
                        <br />
                        <p>訪客身份無法遊玩知識綠知多少，也無法累積獎勵兌換抽獎資格喔！</p>
                        <p>請問是否要登入會員呢？</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="/login" className="col-5" onClick={() => sessionStorage.setItem('knGameLogin', new Date())}>登入會員</Link>
                            <Link to="#" onClick={() => setSecVisitorShow(false)} className="col-5">關閉</Link>
                        </div>
                    </div>
                </div>
            }

            {thirdAlert &&
                <div className="alert-container">
                    <img src={guideAlert} alt="guide-alert-img" className="guide-alert-img" />
                    <div className="alert-content">
                        <h1>嗨，歡迎來到第三個關卡綠活小屋大解密！</h1>
                        <br />
                        <p>在這裡可以透過之前累積的獎勵，解鎖綠活小屋裡的神秘物件！</p>
                        <p>快來跟我一起揭開綠寶家族綠活小屋的秘密吧！</p>
                        <div className="check-login d-flex justify-content-between col-12 row">
                            <Link to="#" className="col-5" onClick={() => setThirdAlert(false)}>關閉</Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default GameAlert;