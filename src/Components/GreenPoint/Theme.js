import React, { useEffect, useState } from 'react';
import { Tabs } from 'react-bootstrap';
import '../../Member/GreenPoint/Point.scss';
import BingoPopUp from '../BingoPopUp';
import { useCookies } from "react-cookie";
import greenManBingo from '../../images1/bingo/greenMan.png';
import homeLeef from '../../images1/bingo/homeLeef.png';
import homeLeefBlack from '../../images1/bingo/homeLeefBlack.png';
// import findData from './data.json';
import FindTask from "./FindTask";
import FindTask1 from '../../images1/ThemeTask/綠生活糾察隊居家篇.png';
import FindTask2 from '../../images1/ThemeTask/綠生活糾察隊學校篇.png';
import FindTask3 from '../../images1/ThemeTask/綠生活糾察隊出遊篇.jpg';

function ThemeMission(props) {
    const findTopics = props.findTopics;
    // console.log("props-findTopics",findTopics)

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var serialize = require('serialize-javascript');
    const [greenlifeCookies] = useCookies([]);
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MzEzMzA4NDgsIm5iZiI6MTYzMTMyOTA0OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiZGI4OTYyZTMtZjlhNy00ODdkLThiMjQtZWRiMWEyYWZkNzg4In0.3GK2_HIBLhqSZkAc0yFJ3lReAXhxIbJ0krnH4V36TGtWUfRDrt49yj7oSTkWpJl19zMNy5s_s9315VV87AYi_Q";

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const [showDialog, setShowDialog] = useState(false);
    const [data, setData] = useState([]);

    //找碴圈圈位置
    const position = [
        [
            { top: "4%", left: "3%" },
            { top: "10%", left: "53%" },
            { top: "20%", left: "75%" },
            { top: "24%", left: "40%" },
            { top: "32.5%", left: "52%" },
        ],
        [
            { top: "49%", left: "9%" },
            { top: "50%", left: "50%" },
            { top: "57%", left: "15%" },
            { top: "56%", left: "37%" },
            { top: "57%", left: "79%" },
        ],
        [
            { top: "77%", left: "6%" },
            { top: "83%", left: "17%" },
            { top: "90%", left: "20%" },
            { top: "84%", left: "72%" },
            { top: "90%", left: "48%" },
        ],
    ];
    //將 top,left 塞入物件
    findTopics.forEach((item, index) => {
        // console.log("sample foreach",item.topics)
        // console.log("position foreach", position[index]);
        for (let i = 0; i < item.topics.length; i++) {
            Object.assign(item.topics[i], position[index][i]);
        }
    });
    //   console.log("findDataList",findDataList)

    useEffect(() => {

        // 進行中的主題任務
        // fetch(`${SSL}//${domain}/api/ThemeTask/Index`, {
        // method: 'GET',
        // headers: myHeaders
        // })
        //     .then(res => {
        //         return res.json();
        // }).then(result => {
        //     console.log(result)
        //     setTaskIndex(result.resultObject)
        // })  
    }, [])



    return (
        <>
            <BingoPopUp data={data} rightAnswer={data.correct === 1} showDialog={showDialog} setShowDialog={setShowDialog} />
            {/* 任務01 */}
            {/* <h3>近期開放～</h3> */}
            <div className="themeMission">
                <div className="mission-description">
                    <div id="tab">
                        <ul>
                            {/* <li className="title-container">
                                <a href="#tab-1">
                                    <h3 class="mission-title">任務01</h3>
                                    <h3 class="name-title">居家BINGO樂活GO</h3>
                                </a>
                            </li> */}
                            <li className="title-container">
                                <a href="#tab-2">
                                    <h3 class="mission-title">任務</h3>
                                    <h3 class="name-title">綠生活糾察隊</h3>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content-1">
                            {/* <div className="d-flex row">
                                <h6 className="col-1 des-title">任務期間</h6>
                                <h6 className="col-10 mission-date">10/1 ~ 10/17</h6>
                            </div>
                            <div className="d-flex row">
                                <h6 className="col-1 des-title">任務說明</h6>
                                <h6 className="col-7 des-text">以25宮格賓果翻牌搭配快問快答的遊戲方式，民眾可依「題目類型」選擇翻牌，閱讀各式居家生活情境題，並從選項中點選符合綠生活的選項，即可完成該題情境任務。答對，該格將顯示綠生活LOGO綠葉；若不幸答錯，該題將無法重新答題。
                                    <br />
                                    <p>完成快問快答的翻牌後，另可進行賓果連線，25格題目皆可翻牌填答。若完成1連線可得100分、2連線可得200分、3連線可得300分、4連線可得400分、5連線可得500分。完成遊戲任務，最高將可累積的1,500分。</p></h6>

                                <div className="score-board col-sm-5 col-md-10 col-lg-3">
                                    <table style={{ width: "100%" }}>
                                        <thead className="bingo-table-head">
                                            <th className="align-center">連線</th>
                                            <th className="align-center">獎勵積分</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="align-center">1連線</td>
                                                <td className="align-center">100</td>
                                                {props.bingoTopics.lineCount && <i className="far fa-check-circle color-red"></i>}
                                            </tr>
                                            <tr>
                                                <td className="align-center">2連線</td>
                                                <td className="align-center">200</td>
                                                {props.bingoTopics.lineCount && <i className="far fa-check-circle color-red"></i>}
                                            </tr>
                                            <tr>
                                                <td className="align-center">3連線</td>
                                                <td className="align-center">300</td>
                                                {props.bingoTopics.lineCount && <i className="far fa-check-circle color-red"></i>}
                                            </tr>
                                            <tr>
                                                <td className="align-center">4連線</td>
                                                <td className="align-center">400</td>
                                                {props.bingoTopics.lineCount && <i className="far fa-check-circle color-red"></i>}
                                            </tr>
                                            <tr>
                                                <td className="align-center">5連線</td>
                                                <td className="align-center">500</td>
                                                {props.bingoTopics.lineCount && <i className="far fa-check-circle color-red"></i>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bingo-outside-container">
                                <div className="d-flex">
                                    <img src={greenManBingo} style={{ width: "20%" }} />
                                    <div>
                                        <div className="bingo-dialogue">
                                            <h6>點選題目後，下方就可以看到題目內容囉！一起實踐綠生活吧！</h6>
                                        </div>

                                    </div>
                                </div>
                                <div className="bingo-wrapper">
                                    {props.bingoTopics.map((data, index) =>
                                        <div key={index} className="bingo-box"
                                            onClick={() => {
                                                setData(data)
                                                setShowDialog(true)
                                            }}>
                                            <h6>{data.type}</h6>
                                            {data.correct === 1 && <img src={homeLeef} className="bingo-mark-leef" />}
                                            {data.correct === 1 || data.reply !== null && <img src={homeLeefBlack} className="bingo-wrong-leef" />}
                                            <img src={homeLeef} className="bingo-mark-leef blank-leef" />
                                        </div>
                                    )}
                                </div>
                            </div> */}
                        </div>
                        {/* 任務02 */}
                        {/* <h3>近期開放～</h3> */}
                        <div className="mission-description">
                            <div className="d-flex row">
                                <h6 className="col-2 des-title">任務期間</h6>
                                <h6 className="col-9 mission-date">10/20 ~ 11/9</h6>
                            </div>
                            <div className="d-flex row">
                                <h6 className="col-2 des-title">任務說明</h6>
                                <h6 className="col-9 des-text">
                                    <p>學生時期的你，是否也有經歷過「環保股長」呢？環保股長總是督促同學們一起將垃圾分類回收、維持整潔環境，久而久之也影響了我們，在日常生活有著好的環保習慣。</p>
                                    <p>現在要號召所有熱愛綠生活的朋友，也一起擔任「綠生活糾察隊」！從日常生活的情境圖中，好好觀察、找出應該還可以做得更環保的項目，讓自己與身邊的親朋好友都知道如何綠化自己的生活！</p>

                                </h6>
                            </div>
                        </div>
                        <div className="bingo-outside-container" >
                            <div className="d-flex">
                                <img src={greenManBingo} style={{ width: "20%", objectFit: "contain", marginTop: "60px" }} alt="bingo" />
                                <div>
                                    <div className="bingo-dialogue">
                                        <p className="task-role">本次任務共有三個情境，每情境中都有5個項目等你來挑出，每圈出1項就可以獲得100分，最高將可以獲得1,500分喔！快來完成挑戰吧！GO！</p>
                                        <p id="task-text">※請觀察圖片還可以做更環保的環節，直接點擊該位置就可以完成圈選!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="findtask-wrapper">
                                <div className="task-img">
                                    <h3>綠生活糾察隊居家篇</h3>
                                    <img src={FindTask1} alt="綠生活糾察隊居家篇" />
                                    <h3>綠生活糾察隊學校篇</h3>
                                    <img src={FindTask2} alt="綠生活糾察隊學校篇" />
                                    <h3>綠生活糾察隊出遊篇</h3>
                                    <img src={FindTask3} alt="綠生活糾察隊出遊篇" />
                                    {findTopics.map((item, index) => {
                                        const { topics } = item;
                                        return (
                                            <FindTask topics={topics} number={index} />
                                        );
                                    })}
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
export default ThemeMission;