import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Modal, Button } from 'react-bootstrap';
import './events.scss';
import game_event from '../../src/images1/events/game_event.jpg';
import office_leaf from '../../src/images1/events/office_leaf.png';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function GameEvent(props) {

    const [gameCookies] = useCookies([]);
    const [lotteryCount, setLotteryCount] = useState(0);
    const [ProductId, setProductId] = useState();
    const [show, setShow] = useState(false);
    const [pointScore, setPointScore] = useState([]);
    const [exchange, setExchange] = useState(false);


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        if (exchange) {
            setExchange(false)
        }
    };

    var serialize = require('serialize-javascript');
    const refreshToken = gameCookies.refreshToken || "";
    const collector = sessionStorage.getItem("userGuid") || "";

    const hasToken = refreshToken ? true : false;

    let SSL = props.SSL;
    let domain = props.domain;

    let myHeaders = new Headers({
        "Token": refreshToken,
        "Content-Type": "application/json; charset=utf-8",
    });

    // 點擊兌換
    const handleExchange = () => {
        if (pointScore.remainPoint >= 1000) {
            fetch(`${SSL}//${domain}/api/api/GreenShop/Order/New`, {
                method: 'POST',
                headers: myHeaders,
                body: serialize({
                    ProdId: String(ProductId),
                    Count: "1"
                }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.isSucess) {
                        // console.log(result)
                        setExchange(true)
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            handleClose()
        }
    }

    // 個人總積分
    useEffect(() => {
        if (refreshToken)
            fetch(`${SSL}//${domain}/api/api/Point/Report/${collector}`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        // console.log("個人總積分", result)
                        setPointScore(result.resultObject)
                    }
                });
    }, [exchange])

    // 兌換次數
    useEffect(() => {
        if (refreshToken)
            fetch(`${SSL}//${domain}/api/api/GreenShop/Release/Private`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(response => response.json())
                .then(result => {
                    if (result.isSucess) {
                        // console.log("兌換次數", result)
                        setLotteryCount(result.resultObject.lotteryCount)
                    }
                })
                .catch(error => console.log('error', error));
    }, [exchange])

    // 商品列表
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GreenShop/Product/List`, {
            method: 'POST',
            headers: myHeaders,
            body: serialize({
                Page: "1",
                Count: "10"
            }),
        })
            .then(response => response.json())
            .then(result => {
                // console.log("商品列表", result)
                setProductId(result.resultObject.products[0].id)
            })
            .catch(error => console.log('error', error));
    }, [])

    return (
        <>
            <BreadCrumb currentPage={"2022綠寶家族抽獎活動"} />
            <Modal show={show} onHide={handleClose} centered animation={false}
                style={{ fontSize: "calc(18px + 0.7vw)", fontWeight: "600", textAlign: "center" }}>
                <Modal.Header closeButton style={{ borderBottom: "none" }}>
                </Modal.Header>
                {exchange ?
                    <Modal.Body style={{ padding: "10%" }}>
                        兌換成功! 祝你中獎!
                    </Modal.Body>
                    :
                    <Modal.Body>
                        你將以1000綠積分兌換抽獎資格一次，請確認是否要兌換?
                    </Modal.Body>
                }
                <Modal.Footer style={{ borderTop: "none", justifyContent: "center" }}>
                    {exchange ?
                        ""
                        :
                        <Button variant="secondary" onClick={handleExchange} style={{ backgroundColor: "#fa8c07", borderColor: "#fa8c07" }}>
                            確認
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
            <div className="col-12 row m-0">
                <img src={game_event} alt="game-event-img" className="col-12 p-0" width="100%" />
            </div>
            <div className="container gmae-event-container my-4">
                <h1>抽獎活動詳情</h1>
                <hr />
                <div className="col-12 row m-0 justify-content-center">
                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-5">
                        <p className="label col-12">活動期間</p>
                    </div>
                    <p className="col-lg-10 col-md-10 col-sm-12 mt-2 mt-lg-5" style={{ color: "red" }}>活動好評延長！ 111/12/02（五） - 111/12/26（一）23:59</p>

                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-5">
                        <p className="label col-12">抽獎日期</p>
                    </div>
                    <div className="fas-content col-lg-10 col-md-10 col-sm-12 mt-2 mt-lg-5">
                        <p>111/12/28 （三） 17:00公佈於
                            <span>
                                <a href="https://tinyurl.com/y5duhcjs" title="粉絲團網址" target="_blank" rel="noopener noreferrer">「綠色生活」粉絲團</a>
                            </span>
                        </p>
                        <div>
                            <p>*抽獎過程公正公開並全程錄影</p>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-5">
                        <p className="label col-12">抽獎好禮</p>
                    </div>
                    <div className="prize-content col-lg-10 col-md-10 col-sm-12 d-lg-flex d-md-flex mt-2 mt-lg-5">
                        <div className="prize-card col-lg-4 col-md-4 col-sm-12 mb-4 mb-lg-0">
                            <p>福容大飯店</p>
                            <p>聯合住宿卷</p>
                            <p>1組</p>
                        </div>
                        <div className="prize-card col-lg-4 col-md-4 col-sm-12 mb-4 mb-lg-0">
                            <p>7-11</p>
                            <p>500元商品卡</p>
                            <p>4份</p>
                        </div>
                        <div className="prize-card col-lg-4 col-md-4 col-sm-12 mb-3 mb-lg-0">
                            <p>環保綠點</p>
                            <p>1萬點</p>
                            <p>10份</p>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-5">
                        <p className="label col-12" >抽獎辦法</p>
                    </div>
                    <div className="lottery-content col-lg-10 col-md-10 col-sm-12 mt-2 mt-lg-5">
                        <p>➊於活動期間內加入綠平台會員</p>
                        <p>➋遊玩「綠寶家族的綠活群島生活」小遊戲，累積遊戲獎勵</p>
                        <p>➌獲得遊戲獎勵後，於每日早晚8點自動轉換綠積分至會員帳戶</p>
                        <p>➍至本活動頁面使用綠積分兌換抽獎資格</p>
                        <p className="remind-text">完成以上步驟，即可等待抽獎結果出爐！</p>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-5">
                        <p className="label col-12">積分兌換</p>
                    </div>
                    <div className="point-content col-lg-10 col-md-10 col-sm-12 d-lg-flex d-md-flex mt-2 mt-lg-5">
                        <div className="point-left-card col-lg-7 col-md-7 col-sm-12 mb-4 mb-lg-0">
                            <p>▪︎有遊玩紀錄</p>
                            <p>第一關→1000積分</p>
                            <p>第二關→1000積分</p>
                            <p>▪︎
                                <img src={office_leaf} alt="office-leaf-img" width="10%" />
                                →10綠積分</p>
                            <p>（最高可獲得415片獎牌）</p>
                        </div>
                        <div className="point-right-card col-lg-5 col-md-5 col-sm-12">
                            <p>1000分</p>
                            <p>▼</p>
                            <p>抽獎資格1次</p>
                            <p className="card-remind">（可重複兌換抽獎資格）</p>
                        </div>
                    </div>


                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-4">
                        <p className="label d-none col-12"></p>
                    </div>
                    <div className="point-content col-lg-10 col-md-10 col-sm-12 mt-2 mt-lg-4">
                        <p className="remind-text">除了玩遊戲拿積分，平常瀏覽、分享綠平台也可以獲得積分喔！</p>
                        <p className="remind-text">想知道更多詳情歡迎至
                            <a href="member/point_mission?type=1" title="會員專區連結" target="_blank" rel="noopener noreferrer">會員中心綠生活任務</a>
                            查詢！</p>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-12 p-0 mt-2 mt-lg-5">
                        <p className="label col-12" >注意事項</p>
                    </div>
                    <div className="lottery-content col-lg-10 col-md-10 col-sm-12 mt-2 mt-lg-5">
                        <p>1.主辦單位保有最終修改、變更、活動解釋及取消本活動之權利。</p>
                        <p>2.如經查證使用不正當手段參與（#含非本人擁有權限、盜用會員資料等），主辦單位有權取消獲獎資格。</p>
                        <p>3.因會員可能同時擁有多次抽獎資格，若同時抽中不同獎項則保留價值較高者，若同時抽中同獎項2次以上僅保留1次。</p>
                        <p>4.綠點將以序號方式派送給幸運兒，點數無法更換其他商品或折換現金。</p>
                        <p>5.主辦單位將於111/12/28（三）抽出各獎項，抽獎過程公正公開並全程錄影；當日將發送中獎通知至會員信箱，且於17:00公布完整名單至綠色生活粉絲專頁（依綠平台會員名稱及Email帳號列出），中獎者須於112/01/04（三）回覆中獎通知信件，逾期者視同放棄資格。</p>
                    </div>
                    {!hasToken &&
                        <>
                            <Link to="/greenGame" className="play-game col-lg-5 col-md-5 col-sm-12 mt-2 mt-lg-5 mb-lg-5">點我玩遊戲 {">"}</Link>
                            <Link to="/login" className="login col-lg-5 col-md-5 col-sm-12 mt-2 mt-lg-5 mb-lg-5" onClick={() => sessionStorage.setItem("gameEventLogin", "gameEventLogin")}>點我登入會員兌換抽獎資格 {">"}</Link>
                        </>
                    }
                </div>
                {hasToken &&
                    <>
                        <div className="mt-4 exchange-area">
                            <h2 className="" >兌換抽獎資格</h2>
                            <hr />
                        </div>
                        <div className="d-flex justify-content-center col-12">
                            <div className="d-flex flex-column justify-content-center col-lg-6 col-md-6 col-sm-12">
                                <div className="total-point">
                                    <p className="text-left">目前剩餘綠積分</p>
                                    <p className="point">{pointScore.remainPoint !== 0 ? pointScore.remainPoint : pointScore.totalPoint}</p>
                                    <p className="text-right mb-0">分</p>
                                </div>
                                <div className="exchange-count">
                                    <p>已兌換抽獎資格<span className="point"> {lotteryCount} </span>次</p>
                                </div>
                            </div>
                            <div className="exchange d-flex flex-column justify-content-center col-lg-6 col-md-6 col-sm-12">
                                <p className="">1000分</p>
                                <p>▼</p>
                                <p>抽獎資格1次</p>
                                {pointScore.remainPoint >= 1000 ?
                                    <button className="exchange-btn d-flex" onClick={() => handleShow()}>點我兌換 {">"}</button>
                                    :
                                    <div className="exchange-btn d-flex">無積分可兌換</div>
                                }

                            </div>
                        </div>
                    </>
                }
            </div>
            <Footer />
        </>
    )
}
export default withRouter(GameEvent);