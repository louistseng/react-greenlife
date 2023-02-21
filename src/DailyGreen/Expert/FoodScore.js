import React, { useState, useEffect, useReducer } from 'react';
import './Expert.scss';
import BreadCrumb from '../../Components/BreadCrumb';
import ComfirmAlert from '../../Components/ComfirmAlert';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import SideBtn from '../../Components/SideBtn';
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

function FoodScore(props, initialData) {

    let history = useHistory()
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjU3MzcwMDEsIm5iZiI6MTYyNTczNTIwMSwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiM2UyMTY5MDQtZjA0Mi00NjY4LTliNzQtNTZmZTZhZDdkNDhjIn0.aURoKw2w-OQdSRqe6S5wuwXwMa28rB3W4pHrhP_TQCsq1Ozed76uAdt26U4GrGTBGKGogJImnc70jKr8zdJUFA";

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    var serialize = require('serialize-javascript');

    const params = new URLSearchParams(history.location.search);
    const [themeId, setThemeId] = useState(params.get('theme'));

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


    //我的綠積分任務-常態性任務-里程碑任務-主題特殊任務
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
                Item01: String(state.item01),
                Item02: String(state.item02),
                Item03: String(state.item03),
                Item04: String(state.item04),
                Item05: String(state.item05),
                Item06: String(state.item06),
                Item07: String(state.item07),
                Item08: String(state.item08),
                Item09: String(state.item09),
                Item10: String(state.item10),
                Item11: String(state.item11),
                Item12: String(state.item12),
                Item13: String(state.item13),
                Item14: String(state.item14),
                Item15: String(state.item15),
                Item16: String(state.item16),
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
                        <td data-title="標題" className="">
                            <div className="score-title-wrapper">
                                <h4 className="title-number">{pad(order)}</h4>
                                <div className="score-text-wrapper">
                                    <h4>{item}</h4>
                                    <h6>{desc}</h6>
                                </div>
                            </div>
                        </td>
                        <td data-title="總是做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 5 && <img className="score-select-img" src={greenMan} alt="總是做到" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 5 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="經常做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 4 && <img className="score-select-img" src={greenMan} alt="經常做到" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 4 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="偶爾做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 3 && <img className="score-select-img" src={greenMan} alt="偶爾做到" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 3 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="打算做到" className="">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 2 && <img className="score-select-img" src={greenMan} alt="打算做到" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 2 } })}>選擇</button>
                            }
                        </td>
                        <td data-title="不適用">
                            {state[`item${pad(order)}`] ? state[`item${pad(order)}`] === 1 && <img className="score-select-img" src={greenMan} alt="不適用" />
                                : <button className="select-btn" onClick={() => dispatch({ type: "SELECT", payload: { ['item' + pad(order)]: 1 } })}>選擇</button>
                            }
                        </td>
                    </tr>
                )
            })}
        </>
    )


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} showLoginBtn={alertTitle.includes("請先登入喔~") && true} history={props.history} />
            }
            <BreadCrumb currentPage={"綠色飲食 (吃得夠綠)"} />
            <div className="island-wrapper">
                <div className="island-wrapper-island">
                    <img className="iconfaceship_roadmap" src={boat} /><img className="iconbighead" src={dogPic} alt="吃得夠綠" />
                    <div className="single-island"><img src={greenTour} className={themeId === "1" ? "currentIsland" : ""} alt="旅遊之島" /><h6>旅遊之島</h6></div>
                    <div className="single-island"><img src={greenFood} className={themeId === "2" ? "currentIsland" : ""} alt="飲食之島" /><h6>飲食之島</h6></div>
                    <div className="single-island"><img src={greenHome} className={themeId === "3" ? "currentIsland" : ""} alt="居家之島" /><h6>居家之島</h6></div>
                    <div className="single-island"><img src={greenShopping} className={themeId === "5" ? "currentIsland" : ""} alt="購物之島" /><h6>購物之島</h6></div>
                    <div className="single-island"><img src={greenOffice} className={themeId === "4" ? "currentIsland" : ""} alt="辦公之島" /><h6>辦公之島</h6></div>

                </div>
                <div className="dotted-line"></div>
            </div>

            <img alt="綠色飲食-橫幅" title="綠色飲食-橫幅" className="w-100" src="../../../images/flip/food/topBanner.jpg" />
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

export default withRouter(FoodScore);
