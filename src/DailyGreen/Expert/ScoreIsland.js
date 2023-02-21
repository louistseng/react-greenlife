import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Expert.scss';
import { getMemberCard, clickRecord } from '../../utils/API';
import { clickLogout } from '../../utils/Functions';
import greenManBoat from '../../images1/dailyGreen/expert/icon_greenbo_onship.png';
import roadMapBg from '../../images1/dailyGreen/expert/bg_roadmap_01_sm.png';
import dogPic from '../../images1/dailyGreen/dailyScore/dog.png';
import boat from '../../images1/dailyGreen/dailyScore/boat_go.png';
import foodPic from '../../images1/dailyGreen/expert/foodPic.png';
import tourPic from '../../images1/dailyGreen/expert/tourPic.png';
import homePic from '../../images1/dailyGreen/expert/homePic.png';
import officePic from '../../images1/dailyGreen/expert/officePic.png';
import shopPic from '../../images1/dailyGreen/expert/shopPic.png';
import oceanLight2 from '../../images1/dailyGreen/expert/ocean-light2.png';
import oceanDark2 from '../../images1/dailyGreen/expert/ocean-dark2.png';
import barrel from '../../images1/dailyGreen/expert/barrel.png';
import rock from '../../images1/dailyGreen/expert/rock.png';
import miniIsland from '../../images1/dailyGreen/expert/mini-island.png';
import bottle from '../../images1/dailyGreen/expert/bottle.png';

import pointFood from '../../images1/dailyGreen/expert/pointFood.png';
import pointTour from '../../images1/dailyGreen/expert/pointTour.png';
import pointShop from '../../images1/dailyGreen/expert/pointShop.png';
import pointOffice from '../../images1/dailyGreen/expert/pointOffice.png';
import pointHome from '../../images1/dailyGreen/expert/pointHome.png';
import { useCookies } from "react-cookie";

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function ScoreIsland(props) {

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2Mjc5ODA3NzQsIm5iZiI6MTYyNzk3ODk3NCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.Nw7EFUh-47y9_FwPHtJoiUaPSBGu2UbVu7YGsmhO20yUMf-wbXyxLOWuMXyaYk2cNU6UQ95fSNNkeH7LzKD6XA";
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const today = new Date()

    //點閱計數API
    useEffect(() => {
        clickRecord("DE87735D-9CB4-479D-8FE4-6CD3FABCB0FC", "21", collector)
    }, [collector]);


    //船的台詞-五座島嶼的那些資料
    const [totalData, setTotalData] = useState([]);
    const [islandData, setIslandData] = useState([]);
    useEffect(() => {


        fetch(`${props.SSL}//${props.domain}/api/api/Expert/Report`, {
            method: 'GET',
            headers: myHeaders
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess)
                console.log(result)
            setTotalData(result.resultObject)
            setIslandData(result.resultObject.themeReports)
        })

    }, [])


    const [memberData, setMemberData] = useState([]);

    useEffect(() => {
        getMemberCard(collector, memberToken, setMemberData, clickLogout, removeCookie)
    }, [])

    return (
        <>
            <BreadCrumb />
            <div className="score-island">
                <div className="top-banner">
                    <img className="roadMapBg" src={roadMapBg} alt="..." />
                    <div className="text-area">
                        <img src={greenManBoat} alt="..." />
                        <div className="top-banner-text">
                            <h4>歡迎來到綠活海域，跟著綠寶船長一起探索綠活島吧！</h4>
                            <h5>
                                綠活海域有５大島嶼，各島嶼分別代表綠色飲食、綠色旅遊、綠色辦公、綠色居家及綠色消費， 跟著綠寶船長用綠生活行動轉換為綠生活能量灌溉島嶼，打造「綠活群島」吧！</h5>
                        </div>
                    </div>
                </div>

                <div className="ocean-area">

                    <div className="single-conversation left">
                        <div className="boat-container">
                            <img className="iconfaceship_roadmap" src={boat} alt="..." />
                            <img className="iconbighead" src={memberData.designationPicPath || dogPic} alt="..." />
                        </div>
                        <div>
                            <div className="left-side-dialogue">
                                <h5 className="green-name">{memberData.name}:</h5>
                                <h6>報告船長，{today.getMonth() + 1}月<span style={{ color: "#007bb3" }}>綠活海域</span><span style={{ color: "#ff4843" }}>已經探索{totalData?.thisMonthComplete * 100}%</span>，島民給我了<span style={{ color: "#ff4843" }}>{totalData?.totalAvg}星</span>的評價，讓我們繼續用綠行動出航打造「綠活群島」吧！</h6>
                            </div>
                        </div>
                    </div>

                    <div className="islandContainer">

                        <div className="two-islands-wrapper">
                            <div className="island-and-tooltip">

                                <Link to="/cardGame" className="island-wrapper">
                                    <img className="island" src={foodPic} alt="..." />
                                    <img className="oceanLight" src={oceanLight2} alt="..." />
                                    <img className="oceanDark" src={oceanDark2} alt="..." />
                                    <img className="right-pointer" src={pointFood} alt="..." />
                                </Link>
                                {/* <div className="score-toolTip tooltip-food">
                                    <div className="text-with-border">
                                        <h4 className="blue-title">飲食之島</h4>
                                        <div className="tooltip-align-between"><h4>本月已探索</h4><h4 style={{ color: "#ff4843" }}>{islandData[1]?.thisMonthPercent}%</h4></div>
                                        <div className="tooltip-align-between"><h4>本月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[1]?.thisMonthAvg}星</h4></div>
                                        <div className="tooltip-align-between"><h4>前月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[1]?.lastMonthAng}星</h4></div>
                                        <h4>船長評語:</h4>
                                        <h4>你是<span style={{ color: "#519e28" }}>綠生活島主！</span>{islandData[1]?.comment}</h4>
                                    </div>
                                </div> */}
                            </div>

                            <div className="island-and-tooltip">

                                <Link to="/daily/score/get_score?theme=1" className="island-wrapper">
                                    <img className="rock" src={rock} alt="..." />
                                    <img className="rock-oceanLight small-island" src={oceanLight2} alt="..." />
                                    <img className="rock-oceanDark small-island" src={oceanDark2} alt="..." />
                                    <img className="island" src={tourPic} alt="..." />
                                    <img className="oceanLight" src={oceanLight2} alt="..." />
                                    <img className="oceanDark" src={oceanDark2} alt="..." />
                                    <img className="left-pointer" src={pointTour} alt="..." />
                                </Link>
                                {/* <div className="score-toolTip tooltip-tour">
                                    <div className="text-with-border">
                                        <h4 className="blue-title">旅遊之島</h4>
                                        <div className="tooltip-align-between"><h4>本月已探索</h4><h4 style={{ color: "#ff4843" }}>{islandData[0]?.thisMonthPercent}%</h4></div>
                                        <div className="tooltip-align-between"><h4>本月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[0]?.thisMonthAvg}星</h4></div>
                                        <div className="tooltip-align-between"><h4>前月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[0]?.lastMonthAng}星</h4></div>
                                        <h4>船長評語:</h4>
                                        <h4>你是<span style={{ color: "#519e28" }}>綠生活島主！</span>{islandData[0]?.comment}</h4>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="island-and-tooltip">

                                <Link to="/daily/score/get_score?theme=4" className="island-wrapper">
                                    <img className="barrel" src={barrel} alt="..." />
                                    <img className="barrel-oceanLight small-island" src={oceanLight2} alt="..." />
                                    <img className="barrel-oceanDark small-island" src={oceanDark2} alt="..." />
                                    <img className="island" src={officePic} alt="..." />
                                    <img className="oceanLight" src={oceanLight2} alt="..." />
                                    <img className="oceanDark" src={oceanDark2} alt="..." />
                                    <img className="right-pointer" src={pointOffice} alt="..." />
                                </Link>
                                {/* <div className="score-toolTip tooltip-office">
                                    <div className="text-with-border">
                                        <h4 className="blue-title">辦公之島</h4>
                                        <div className="tooltip-align-between"><h4>本月已探索</h4><h4 style={{ color: "#ff4843" }}>{islandData[3]?.thisMonthPercent}%</h4></div>
                                        <div className="tooltip-align-between"><h4>本月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[3]?.thisMonthAvg}星</h4></div>
                                        <div className="tooltip-align-between"><h4>前月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[3]?.lastMonthAng}星</h4></div>
                                        <h4>船長評語:</h4>
                                        <h4>你是<span style={{ color: "#519e28" }}>綠生活島主！</span>{islandData[3]?.comment}</h4>
                                    </div>
                                </div> */}
                            </div>


                        </div>
                        <div className="two-islands-wrapper">
                            <div className="island-and-tooltip">

                                <Link to="/daily/score/get_score?theme=3" className="island-wrapper">
                                    <img className="bottle" src={bottle} alt="..." />
                                    <img className="island" src={homePic} alt="..." />
                                    <img className="oceanLight" src={oceanLight2} alt="..." />
                                    <img className="oceanDark" src={oceanDark2} alt="..." />
                                    <img className="left-pointer" src={pointHome} alt="..." />
                                </Link>
                                {/* <div className="score-toolTip tooltip-home">
                                    <div className="text-with-border">
                                        <h4 className="blue-title">居家之島</h4>
                                        <div className="tooltip-align-between"><h4>本月已探索</h4><h4 style={{ color: "#ff4843" }}>{islandData[2]?.thisMonthPercent}%</h4></div>
                                        <div className="tooltip-align-between"><h4>本月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[2]?.thisMonthAvg}星</h4></div>
                                        <div className="tooltip-align-between"><h4>前月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[2]?.lastMonthAng}星</h4></div>
                                        <h4>船長評語:</h4>
                                        <h4>你是<span style={{ color: "#519e28" }}>綠生活島主！</span>{islandData[2]?.comment}</h4>
                                    </div>
                                </div> */}
                            </div>

                            <div className="island-and-tooltip">

                                <Link to="/daily/score/get_score?theme=5" className="island-wrapper">
                                    <img className="mini-island" src={miniIsland} alt="..." />
                                    <img className="mini-island-oceanLight small-island" src={oceanLight2} alt="..." />
                                    <img className="mini-island-oceanDark small-island" src={oceanDark2} alt="..." />
                                    <img className="right-pointer" src={pointShop} alt="..." />
                                    <img className="island" src={shopPic} alt="..." />
                                    <img className="oceanLight" src={oceanLight2} alt="..." />
                                    <img className="oceanDark" src={oceanDark2} alt="..." />

                                </Link>
                                {/* <div className="score-toolTip tooltip-shop">
                                    <div className="text-with-border">
                                        <h4 className="blue-title">消費之島</h4>
                                        <div className="tooltip-align-between"><h4>本月已探索</h4><h4 style={{ color: "#ff4843" }}>{islandData[4]?.thisMonthPercent}%</h4></div>
                                        <div className="tooltip-align-between"><h4>本月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[4]?.thisMonthAvg}星</h4></div>
                                        <div className="tooltip-align-between"><h4>前月平均星等</h4><h4 style={{ color: "#ff4843" }}>{islandData[4]?.lastMonthAng}星</h4></div>
                                        <h4>船長評語:</h4>
                                        <h4>你是<span style={{ color: "#519e28" }}>綠生活島主！</span>{islandData[4]?.comment}</h4>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}

export default withRouter(ScoreIsland)