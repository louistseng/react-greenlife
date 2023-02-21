import React, { useState, useEffect, useReducer } from 'react';
import './Expert.scss';
import BreadCrumb from '../../Components/BreadCrumb';
import ComfirmAlert from '../../Components/ComfirmAlert';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import SideBtn from '../../Components/SideBtn';
import { clickRecord } from '../../utils/API';
import { pad, clickLogout } from '../../utils/Functions';
import { useCookies } from "react-cookie";
import greenMan from "../../images1/greenMan/greenMan.png";
import greenFood from '../../images1/common/greenFood.png';
import greenTour from '../../images1/common/greenTour.png';
import greenHome from '../../images1/common/greenHome.png';
import greenShopping from '../../images1/common/greenShopping.png';
import greenOffice from '../../images1/common/greenOffice.png';
import dogPic from '../../images1/dailyGreen/dailyScore/dog.png';
import boat from '../../images1/dailyGreen/dailyScore/boat_go.png';

import foodBanner from '../../images1/flip/food/topBanner.jpg';
import homeBanner from '../../images1/flip/home/topBanner.jpg';
import officeBanner from '../../images1/flip/office/topBanner.jpg';
import shoppingBanner from '../../images1/flip/shopping/topBanner.jpg';
import tourBanner from '../../images1/flip/tour/topBanner.jpg';

function init(initialData) {
    return initialData
}

function reducer(state, action) {
    switch (action.type) {
        case 'SELECT':
            return ({ ...state, ...action.payload });
        case 'RESET':
            return init(action.payload);
        case 'DEFAULT':
            return init(action.payload);
        default:
            throw new Error()
    }
}



function GetScore(props, initialData) {

    let history = useHistory()
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjgxNDI3MjksIm5iZiI6MTYyODE0MDkyOSwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiYjdmNWI4YmItOWViYi00N2NhLTk2OTMtMTg0ZGI4Y2MwZTc3In0.bqCInYOILsp56qOOg1Kx19Oxcw0QoMq7uiKhW15CYtAO0H4_jEukWky-39ILlVs7mASA3iZ9K9xDyuRMcrqMQA";

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    var serialize = require('serialize-javascript');

    const params = new URLSearchParams(history.location.search);
    const [themeId, setThemeId] = useState(params.get('theme'));
    const [creatTime, setCreatTime] = useState("");

    const bannerArray = [tourBanner, foodBanner, homeBanner, officeBanner, shoppingBanner]


    //點閱計數API
    useEffect(() => {
        if (Boolean(creatTime)) {
            //已建立--達人自評新增頁面
            clickRecord("BA1237C1-3084-44EC-A8DC-8056CCB164A1", "21", collector)
        } else {
            //未建立--達人自評編輯頁面
            clickRecord("79F316EE-15AB-4D42-BD89-9795D8DEB38C", "21", collector)
        }
    }, [collector]);

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [state, dispatch] = useReducer(reducer, initialData, init)
    console.log(state)


    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setThemeId(params.get('theme'))
    }, [location]);




    //自評項目Title
    const [titleData, setTitleData] = useState([]);
    useEffect(() => {
        if (themeId)
            fetch(`${props.SSL}//${props.domain}/api/api/Expert/Score/Titles/${themeId}`, {
                method: 'GET',
                headers: myHeaders
            }).then(res => {
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            }).then(result => {
                if (result.isSucess)
                    console.log(result)
                setTitleData(result.resultObject)
            })

    }, [themeId])


    const submit = () => {
        setShowDialog(true)
        setAlertTitle("提交中~")
        fetch(`${props.SSL}//${props.domain}/api/api/Expert/Score/Edit`, {
            method: 'POST',
            body: serialize({
                Item01: String(state.item01 || "0"),
                Item02: String(state.item02 || "0"),
                Item03: String(state.item03 || "0"),
                Item04: String(state.item04 || "0"),
                Item05: String(state.item05 || "0"),
                Item06: String(state.item06 || "0"),
                Item07: String(state.item07 || "0"),
                Item08: String(state.item08 || "0"),
                Item09: String(state.item09 || "0"),
                Item10: String(state.item10 || "0"),
                Item11: String(state.item11 || "0"),
                Item12: String(state.item12 || "0"),
                Item13: String(state.item13 || "0"),
                Item14: String(state.item14 || "0"),
                Item15: String(state.item15 || "0"),
                Item16: String(state.item16 || "0"),
                Item17: String(state.item17 || "0"),
                Item18: String(state.item18 || "0"),
                Item19: String(state.item19 || "0"),
                Item20: String(state.item20 || "0"),
                Item21: String(state.item21 || "0"),
                Item22: String(state.item22 || "0"),
                Item23: String(state.item23 || "0"),
                Item24: String(state.item24 || "0"),
                Item25: String(state.item25 || "0"),
                Item26: String(state.item26 || "0"),
                Item27: String(state.item27 || "0"),
                Item28: String(state.item28 || "0"),
                Item29: String(state.item29 || "0"),
                Item30: String(state.item30 || "0"),
                ThemeId: themeId,
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess) {
                    setShowDialog(true)
                    setAlertTitle("成功提交！")
                    history.go(0);
                } else {
                    setAlertTitle(result.userMsg)
                }
            })
    }


    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/Expert/Score`, {
            method: 'POST',
            body: serialize({
                ThemeId: themeId
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess)
                    dispatch({ type: "DEFAULT", payload: result.resultObject })
                setCreatTime(result.resultObject.createTime)
            })

    }, [themeId])


    // //點閱計數API
    // useEffect(() => {
    //     clickRecord("F20ABEC7-B05E-408A-A44B-D81A4A9ADB6E", "4", collector)
    // }, [collector]);

    const TableData = (
        <>
            {titleData.map((data, index) => {
                const { order, item, desc } = data
                return (
                    <tr className="" key={index}>
                        <td data-title="標題" className="getScore-title-td">
                            <div className="score-title-wrapper">
                                <h4 className="title-number">{pad(order)}</h4>
                                <div className="score-text-wrapper">
                                    <h4>{item}</h4>
                                    <h6>{desc}</h6>
                                </div>
                            </div>
                        </td>
                        <td data-title="總是做到" className="">
                            {state[`item${pad(order)}`] ?
                                state[`item${pad(order)}`] === 5 ?
                                    <img className="score-select-img" src={greenMan} alt="已選擇" />
                                    :
                                    <button className="select-btn reselect-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 5 } })}>選擇</button>
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 5 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="經常做到" className="">
                            {state[`item${pad(order)}`] ?
                                state[`item${pad(order)}`] === 4 ?
                                    <img className="score-select-img" src={greenMan} alt="已選擇" />
                                    :
                                    <button className="select-btn reselect-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 4 } })}>選擇</button>
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 4 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="偶爾做到" className="">
                            {state[`item${pad(order)}`] ?
                                state[`item${pad(order)}`] === 3 ?
                                    <img className="score-select-img" src={greenMan} alt="已選擇" />
                                    :
                                    <button className="select-btn reselect-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 3 } })}>選擇</button>
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 3 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="打算做到" className="">
                            {state[`item${pad(order)}`]
                                ? state[`item${pad(order)}`] === 2 ?
                                    <img className="score-select-img" src={greenMan} alt="已選擇" />
                                    :
                                    <button className="select-btn reselect-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 2 } })}>選擇</button>
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 2 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="不適用">
                            {state[`item${pad(order)}`]
                                ? state[`item${pad(order)}`] === 1 ?
                                    <img className="score-select-img" src={greenMan} alt="已選擇" />
                                    :
                                    <button className="select-btn reselect-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 1 } })}>選擇</button>
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 1 } })}>選擇</button>
                            }
                        </td>
                    </tr>
                )
            })}
        </>
    )

    function getCurrentPage(themeId) {
        switch (themeId) {
            case "1":
                return "旅遊之島";

            case "2":
                return "飲食之島";

            case "3":
                return "居家之島";

            case "4":
                return "辦公之島";

            case "5":
                return "消費之島";

            default:
                return "";
        }
    }


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} showLoginBtn={alertTitle.includes("請先登入喔~") && true} history={props.history} />
            }
            <BreadCrumb currentPage={getCurrentPage(themeId)} />
            <div className="island-wrapper">
                <div className="island-wrapper-island row">
                    <div className=" col-4 col-md-2"><img className="iconfaceship_roadmap" src={boat} /><img className="iconbighead" src={dogPic} alt="..." /></div>
                    <div className="single-island col-4 col-md-2"><img src={greenTour} className={themeId === "1" ? "currentIsland" : ""} alt="旅遊之島" /><h6>旅遊之島</h6></div>
                    <div className="single-island col-4 col-md-2"><img src={greenFood} className={themeId === "2" ? "currentIsland" : ""} alt="飲食之島" /><h6>飲食之島</h6></div>
                    <div className="single-island col-4 col-md-2"><img src={greenHome} className={themeId === "3" ? "currentIsland" : ""} alt="居家之島" /><h6>居家之島</h6></div>
                    <div className="single-island col-4 col-md-2"><img src={greenShopping} className={themeId === "5" ? "currentIsland" : ""} alt="購物之島" /><h6>購物之島</h6></div>
                    <div className="single-island col-4 col-md-2"><img src={greenOffice} className={themeId === "4" ? "currentIsland" : ""} alt="辦公之島" /><h6>辦公之島</h6></div>

                </div>
                <div className="dotted-line"></div>
            </div>

            <img alt="類別-橫幅圖片" className="w-100" src={bannerArray[+themeId - 1]} />
            <div className="container containerBox flip-tour">
                <div className="">
                    <table className="expertPoint-table">
                        <thead className="expertPoint-table-head">
                            <tr>
                                <th></th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">總是</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">經常</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">偶爾</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text">打算</h4>
                                        <h5>做到</h5>
                                    </div>
                                </th>
                                <th>
                                    <div className="frequency-wrapper">
                                        <h4 className="frequency-text width-zero">&nbsp;</h4>
                                        <h5>不適用</h5>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="expertPoint-table-body">
                            {TableData}
                        </tbody>
                    </table>
                    <div className="score-btn-wrapper">
                        <button onClick={submit} className="send-btn">送出成果</button>
                        <button onClick={() => dispatch({ type: "RESET", payload: initialData })} className="cancel-btn">重新評量</button>
                    </div>
                </div>




            </div>
            <SideBtn history={history} />
            {/* <Footer /> */}
        </>
    );
}

export default withRouter(GetScore);
