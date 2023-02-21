import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../GreenGame/GreenGame.scss';
import closeBtn from '../../../images1/GreenGame/GamePage/Theme_bg/close_btn.svg';
import office_scenes from '../../../images1/GreenGame/HouseGamePage/theme_bg/office_scenes.gif';
import food_scenes from '../../../images1/GreenGame/HouseGamePage/theme_bg/food_scenes.gif';
import shopping_scenes from '../../../images1/GreenGame/HouseGamePage/theme_bg/shopping_scenes.gif';
import home_scenes from '../../../images1/GreenGame/HouseGamePage/theme_bg/home_scenes.gif';
import travel_scenes from '../../../images1/GreenGame/HouseGamePage/theme_bg/travel_scenes.gif';
import flower from '../../../images1/GreenGame/HouseGamePage/flower.png';
import { officeBg, foodBg, shoppingBg, homeBg, travelBg, leafOffice, leafFood, leafShopping, leafHome, leafTravel, } from '../GameData';


function ThemeCard(props) {
    const { theme, setTheme } = props;
    const [click, setClick] = useState(false);

    let color, bgColor, themeCard, themeScenes, themeLeaf;
    switch (theme) {
        case "綠色辦公":
            color = "#09B082";
            bgColor = "#0C7356";
            themeCard = officeBg;
            themeScenes = office_scenes;
            themeLeaf = leafOffice;
            break;
        case "綠色飲食":
            color = "#F7A14A";
            bgColor = "#A36527";
            themeCard = foodBg;
            themeScenes = food_scenes;
            themeLeaf = leafFood;
            break;
        case "綠色消費":
            color = "#EF6B69";
            bgColor = "#A14343";
            themeCard = shoppingBg;
            themeScenes = shopping_scenes;
            themeLeaf = leafShopping;
            break;
        case "綠色居家":
            color = "#FEE62E";
            bgColor = "#AB9700";
            themeCard = homeBg;
            themeScenes = home_scenes;
            themeLeaf = leafHome;
            break;
        case "綠色旅遊":
            color = "#2DBAD5";
            bgColor = "#1A7081";
            themeCard = travelBg;
            themeScenes = travel_scenes;
            themeLeaf = leafTravel;
            break;
        default:
    }

    return (
        <>
            <div className="house-card">
                <img src={themeCard} alt="theme-bg" className="theme-bg" />
                <img src={closeBtn} alt="close-btn" className="close-btn" onClick={() => setTheme("")} />
                <div className="d-flex row col-12 card-content">
                    <div className="col-1 left" style={{ backgroundColor: color }}>
                        <div className="title">居家第的綠色小屋</div>
                    </div>
                    <div className="col-7 center">
                        <img src={themeScenes} alt="themeScenes" />
                    </div>
                    <div className="col-4 right p-0">
                        <div className="row">
                            <div className="col-2 p-0">
                                <div className="right-btn" style={{ backgroundColor: click == true ? bgColor : color }} onClick={() => setClick(false)}>物品欄</div>
                                <div className="right-btn" style={{ backgroundColor: click == false ? bgColor : color }} onClick={() => setClick(true)}>小知識</div>
                            </div>
                            <div className="col-10 right-content" style={{ backgroundColor: color }}>
                                <div className="d-flex flex-column">
                                    <div>
                                        <p className="intro mt-2" style={{ backgroundColor: bgColor }}>
                                            可使用之前獲得的獎牌解鎖物品，累積的獎牌越多，開放的物品就越多喔！快來一起解鎖物品，窺探居家弟的小屋吧！
                                        </p>
                                        <div className="intro-card">
                                            <div className="theme-leaf" >
                                                已有獎牌數<img src={themeLeaf} alt="theme-leaf" width="10%" />
                                                <span>25</span>
                                            </div>
                                            {click ?
                                                <div className="d-flex flex-column" style={{ backgroundColor: bgColor }}>
                                                    <div className="stuff-img row" style={{ backgroundColor: "#fff" }}>
                                                        <img src={flower} alt="" className="col-4" width="10%" />
                                                        <div className="col-8 align-self-center">室內種植綠色植栽</div>
                                                    </div>
                                                    <div className="stuff-leaf" style={{ backgroundColor: "#fff" }}>
                                                        室內種植綠色植栽不僅能讓我們的心情感到安定及療癒，甚至還能淨化空氣中二氧化碳、甲醛、甲苯…等有機物質，原來植栽除了環境美觀之外，更是好處多多！
                                                    </div>
                                                </div>
                                                :
                                                <div className="d-flex justify-content-around row" style={{ backgroundColor: bgColor }}>
                                                    <div className="stuff-img d-flex justify-content-center align-items-center" style={{ backgroundColor: "#fff" }}>
                                                        <img src={flower} alt="" className="col-7" width="10%" />
                                                    </div>
                                                    <div className="col-5 stuff-leaf" style={{ backgroundColor: "#fff" }}>
                                                        需要獎牌數
                                                        <div style={{ backgroundColor: "#fff" }}>解鎖</div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ThemeCard;