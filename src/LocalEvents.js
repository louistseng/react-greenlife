import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import DownloadCarouselFlip from './Components/DownloadCarouselFlip';
import './localEvents.scss';
import './eventDetail.scss';
import { count, select } from "d3";
import { ReactComponent as TaiwanSVG } from './taiwanMap.svg'
import { localEvents_QA, cityMapData, cityLink, local_characteristic, alertText } from './LocalEventJson';
import { useCookies } from "react-cookie";

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import("./Components/Footer"));

function LocalEvents({ SSL, domain }) {

    var serialize = require('serialize-javascript');
    let history = useHistory()

    const [cityDirections, setCityDirections] = useState(); //地方特色說明
    const [relateds, setRelateds] = useState([]); //相關連結
    const [featureEvents, setFeatureEvents] = useState([]);  //特色活動

    const [fetchData, setFetchData] = useState([])
    const [guid, setGuid] = useState("")
    const [answer, setAnswer] = useState("");
    const [correct, setCorrect] = useState(null)
    const [cityName, setCityName] = useState("臺北市");
    const [clickCount, setClickCount] = useState(0);
    const [alert, setAlert] = useState([])
    const [point, setPoint] = useState(0)
    const [guidToken, setGuidToken] = useState("")
    const [video, setVideo] = useState("1")
    const [again, setAgain] = useState(false)
    const [isReply, setIsReply] = useState(true)
    const [isRequired, setIsRequired] = useState('true')


    const [cookies, setCookie, removeCookie] = useCookies();

    const memberToken = cookies.refreshToken;

    const refreshToken = memberToken || String(guidToken);

    var myHeaders = new Headers({
        "Token": refreshToken,
        "Content-Type": "application/json; charset=utf-8"
    });

    //題目
    const getTopic = () => {
        fetch(`${SSL}//${domain}/api/api/ThemeTask/EarthDay/Topic`, {
            method: 'POST',
            body: serialize({
                isLogin: memberToken ? 'true' : 'false',
                isRequired: isRequired,
                TopicGuids: guid,

            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setFetchData(result.resultObject.topics[0])
                    setGuid(result.resultObject.topics[0].topicGuid)
                }
            });
    }

    // 送出回答
    const sendReply = async () => {
        for (let i = 1; i <= 4; i++) {
            const getLocalAnswer = localStorage.getItem(`${i}answer`);
            const getLocalGuid = localStorage.getItem(`${i}TopicGuid`);

            await fetch(`${SSL}//${domain}/api/api/ThemeTask/EarthDay/Reply`, {
                method: 'POST',
                body: serialize({
                    Reply: getLocalAnswer,
                    TopicGuid: getLocalGuid,
                    IsRequired: i === 1 ? 'true' : 'false',
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        localStorage.removeItem(`${i}TopicGuid`);
                        localStorage.removeItem(`${i}answer`);
                        localStorage.removeItem(`${i}clickCount`);
                    }
                    if (result.errMsg === "使用者重複回答" || result.errMsg === "已完成地球日問答。") {
                        localStorage.removeItem(`${i}TopicGuid`);
                        localStorage.removeItem(`${i}answer`);
                        localStorage.removeItem(`${i}clickCount`);
                    }

                });
        }
        localStorage.setItem(`finish`, true);
        localStorage.setItem("alreadyGetPoint", true)
    }

    // 完成回答後畫面將滑到題目區
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("finish")) {
                window.scrollTo({
                    top: 1400,
                    behavior: "smooth"
                });
            }
        }, 1000);
    }, [])

    //訪客呼叫暫時 token 及是否已回答過問題
    useEffect(() => {
        if (!memberToken) {
            localStorage.removeItem("alreadyGetPoint")
            localStorage.removeItem("finish")

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
                    // console.log(result)
                    setGuidToken(result.resultObject.split(":")[1])
                    localStorage.setItem("guidToken", result.resultObject.split(":")[1]);
                }
            });
        } else {
            //移除訪客token
            localStorage.removeItem("guidToken");

            fetch(`${SSL}//${domain}/api/api/ThemeTask/EarthDay/Completed`, {
                method: 'GET',
                headers: myHeaders,
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.resultObject === true) {
                    for (let i = 1; i <= 4; i++) {
                        localStorage.removeItem(`${i}TopicGuid`);
                        localStorage.removeItem(`${i}answer`);
                    }
                    setIsReply(result.resultObject)
                    localStorage.removeItem(`4clickCount`);
                    localStorage.setItem(`finish`, true);
                    localStorage.setItem(`alreadyGetPoint`, true);
                }
            });
        }
    }, [])

    const getLocalClick = localStorage.getItem(`4clickCount`);
    const getLocalAlreadyGetPoint = localStorage.getItem("alreadyGetPoint");

    // 拉取題目
    useEffect(() => {
        if (guidToken || memberToken) {
            getTopic()
        }
    }, [guidToken, memberToken])

    // 送出答案
    useEffect(() => {
        if (getLocalClick && memberToken) {
            console.log("isReply", isReply)
            sendReply()
        }
    }, [memberToken, getLocalClick])

    //重玩機制
    useEffect(() => {
        if (again === true) {
            setIsRequired("true")
            for (let i = 1; i <= 4; i++) {
                localStorage.removeItem(`${i}TopicGuid`);
                localStorage.removeItem(`${i}answer`);
                setClickCount(0)
                setModalShow(false)
                setPoint(0)
            }
            localStorage.removeItem(`4clickCount`);
        }
        history.push("/localEvents")
        setAgain(false)

    }, [again, alert])

    //點擊選項
    const handleClick = (e) => {
        e.preventDefault()
        setModalShow(true)
        setClickCount(clickCount + 1)
        setAnswer(String(e.target.value).slice(0, 2))

        if (String(e.target.value).slice(0, 2) === fetchData.answer) {
            setAlert(alertText[0])
            setCorrect(true)
        } else {
            setAlert(alertText[1])
            setCorrect(false)
        }
    }

    // 訪客、會員領取積分
    const handlePoint = () => {
        if (!memberToken) {
            history.push('/login')
            localStorage.setItem("alreadyGetPoint", true);
        } else {
            localStorage.setItem("alreadyGetPoint", true);
            setTimeout(() => {
                window.location.href = "/localEvents"
            }, 500);
        }
    }

    //分數累計
    useEffect(() => {
        if (clickCount > 0 && clickCount <= 4 && !getLocalAlreadyGetPoint) {
            localStorage.setItem(`${clickCount}answer`, answer);
            localStorage.setItem(`${clickCount}TopicGuid`, guid);
            setIsRequired("false")

            if (clickCount === 4) {
                localStorage.setItem(`${clickCount}clickCount`, clickCount);
            }

            if (correct === true && correct !== null) {
                setPoint(point + 250)
            } else if ((correct === false && correct !== null)) {
                setPoint(point + 125)
            }
        }
    }, [clickCount])

    // 資料縣市抽換
    useEffect(() => {
        setCityDirections(cityMapData.filter(d => { if (d.city === cityName) return d }))
        setRelateds(cityLink.filter(d => { if (d.city === cityName) return d }))
        setFeatureEvents(local_characteristic.filter(d => { if (d.city === cityName) return d }))
    }, [cityName])


    // 地圖
    var d3 = require("d3");
    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {

        const svg = select(svgRef.current);
        svg
            .style("position", "relative")
            .selectAll('.section')


        //定義縣市小標籤
        const tooltipSvg = select(tooltipRef.current);
        var tooltip = tooltipSvg
            .append("div")
            .attr("class", "myTooltip")
            .style("position", "absolute")
            .style("opacity", "0")
            .style("transition", "all .3s")
            .style("background-color", "#b2e92c")
            .style("color", "black")
            .style("outline", "none")

        svg
            .selectAll('.section')
            // .on("mouseover", function () {
            //     return tooltip.style("visibility", "visible");
            // })
            .on("mouseover", function (d) {
                tooltip.style("opacity", "1");
                tooltip
                    .style("top", (d.clientY - 300) + "px")
                    .style("left", (d.clientX - 300) + "px")
                    .html(decodeURIComponent(JSON.parse(`"${d3.select(this).attr("name")}"`)))
                // .style("top", (d.clientY - 100) + "px")
                // .style("left", (d.clientX - 300) < 100 ? 200 : (d.clientX - 300) + "px")
                // .append("div")
                // .html('<svg xml:space="preserve" viewBox="0 0 1600 900">' + d3.select(this)._groups[0][0].outerHTML + '</svg>')


                d3.select(this)
                    .classed("hovered", true)
                //     .clone(true)
                //     .classed("myTooltip-map", true)
                //     .style("transform", "translateY(-200px)")
                //     .style("transform", "translateY(-200px)")
                //     .style("transform", "translateX(-" + d.clientX > 400 ? 1000 : d.clientX + "px)")
                //     // .style("top", (d.clientY - 400) + "px")
                //     // .style("left", (d.clientX - 850) + "px")
                //     .style("transform", "scale(.7)")

                svg
                    .selectAll('.section')
                    .filter(function () {
                        return !this.classList.contains('myTooltip-map') && !this.classList.contains('hovered')
                    })
                    .style("opacity", ".1")

            })
            .on("mouseout", function () {
                tooltip.style("opacity", "0")
                d3.selectAll(".myTooltip-map").attr("visibility", "hidden")
                //.classed("myTooltip-map", false)
                svg.selectAll('.section')
                    .style("opacity", "1")
                    .classed("hovered", false)
            })
            .on("click", function () {
                tooltip.style("opacity", "0")
                d3.selectAll(".myTooltip-map").attr("visibility", "hidden")
                //.classed("myTooltip-map", false)
                svg.selectAll('.section')
                    .style("opacity", "1")
                    .classed("hovered", false)

                setCityName(decodeURIComponent(JSON.parse(`"${d3.select(this).attr("name")}"`)))
                // history.push(`/searchEvent?page=${page}&pageNews=${pageNews}&city=${pad(d3.select(this).attr("id"))}&org=${organizer}&keyword=${activityTitle}&theme=${activityThemeId}&startDate=${startDate}&endDate=${endDate}&searched=1`)
            });
    });

    const [modalShow, setModalShow] = useState(null);
    const MyVerticallyCenteredModal = (props) => (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header style={{ border: "none" }}>
                <Modal.Title id="contained-modal-title-vcenter">{!getLocalClick && alert.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: "center" }}>
                {!getLocalClick ?
                    <>
                        <h4>{alert.subTitle}</h4>
                        <p>{alert.content}</p>
                        <div>您已完成 {clickCount} 題，共計累積 {point} 綠享積分，再答完 {4 - clickCount} 題即可領取累積的綠享積分！</div>
                    </>
                    :
                    <>
                        <p>您於1000分中，累積 {point} 綠享積分！</p>
                        <p>若想重新完遊戲，請點選「我要重新挑戰！」，但目前累積的綠享積分就會重置清空唷！</p>
                        <p>若想領取積分，請點選「我要領取綠享積分！」，便能獲得目前分數，但就不能再重新挑戰更高分囉！</p>
                    </>
                }
            </Modal.Body>
            <Modal.Footer style={{ border: "none" }}>
                {!getLocalClick ?
                    <>
                        <Button className="btn-focus" style={{ backgroundColor: "#b2e92c", color: "black", border: "none", margin: "0 auto" }} onClick={props.onHide}>下一題</Button>
                    </>
                    :
                    <>
                        <Button className="btn-focus" style={{ backgroundColor: "#b2e92c", color: "black", border: "none", margin: "0 auto" }} onClick={() => setAgain(true)}>我要重新挑戰！</Button>
                        <Button className="btn-focus" id="getPoint" style={{ backgroundColor: "#b2e92c", color: "black", border: "none", margin: "0 auto" }} onClick={() => handlePoint()}>我要領取綠享積分！</Button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    )

    useEffect(() => {
        if (modalShow !== null && modalShow === false) {
            getTopic()
        }
    }, [modalShow])

    return (
        <>
            <BreadCrumb currentPage={"活動專區"} />
            <div>
                <img src={`/images/活動專區/localEvent/banner.png`} width="100%" alt="banner" />
            </div>
            <div className="local-events-page">
                <div className=" d-flex row justify-content-center">
                    <div className="video-text col-sm-10 col-md-10 col-lg-6 my-2">
                        <div className="video-button mb-4">100秒精華版</div>
                        <div className="videobox mb-4">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/Kp5HKQnOn0o" title="全民綠生活，全民動起來(精華版)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="video-text col-sm-10 col-md-10 col-lg-4 my-5">
                        <h1 className="video-title mt-4">全民綠生活<br />全國動起來</h1>
                        <hr />
                        <p>我們只有<br />一個地球一個臺灣<br />讓我們一起全民綠生活</p>
                    </div>
                    <div className="video-text col-sm-10 col-md-10 col-lg-6 my-2">
                        <div className="video-button mb-4">3分鐘完整版</div>
                        <div className="videobox mb-4">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/6esKWMgAmw4" title="全民綠生活，全民動起來(完整版)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div className="video-text col-sm-10 col-md-10 col-lg-4 mt-5">
                        <p className="video-title mt-4">從臺灣的鄉村到城鎮<br />透過實際行動　做出改變<br />愛地球　一起「全民綠生活」</p>
                    </div>

                    {/* <div className="mt-5 botton-group">
                            <button className="video-button" value="1" onClick={(e) => setVideo(e.target.value)}>精華版</button>
                            <button className="video-button" value="2" onClick={(e) => setVideo(e.target.value)}>完整版</button>
                        </div> */}
                    <div className=" d-flex row justify-content-center my-5">
                        <div className="quiz-game-container col-sm-12 col-md-12 col-lg-12">
                            <h2>縣市快問快答</h2>
                            <hr />
                            <h3>參加縣市快問快答，一起來領平台綠享</h3>
                            <h4>不知道答案，可以再看一次影片，或是在下方全國淨零綠生活地圖找提示喔！</h4>
                            {!getLocalAlreadyGetPoint ?
                                <div className="quiz-box my-5">
                                    <h5><span>Q</span>以下特色是哪個縣市的綠生活行動？</h5>
                                    <p>{fetchData.question}</p>
                                    <h5>
                                        <span>A</span>
                                        <Button value={fetchData.option1} onClick={e => handleClick(e)}>{String(fetchData.option1).slice(3)}</Button>
                                        <Button value={fetchData.option2} onClick={e => handleClick(e)}>{String(fetchData.option2).slice(3)}</Button>
                                        <Button value={fetchData.option3} onClick={e => handleClick(e)}>{String(fetchData.option3).slice(3)}</Button>
                                        <Button value={fetchData.option4} onClick={e => handleClick(e)}>{String(fetchData.option4).slice(3)}</Button>
                                    </h5>
                                    <div className="instructions-text">
                                        <div className="game-rules">問答題遊戲規則</div>
                                        <h5>1.什麼是綠享積分？</h5>
                                        <h6>綠享積分是民眾在全民綠生活平台參與活動、分享自己的綠生活後，能獲得的點數，持續累積綠享後，未來可參加環保署辦理的抽獎活動、實體活動唷！</h6>
                                        <h5 className="mt-3">2.快問快答可以玩幾次？</h5>
                                        <h6>問答活動共有４題，可不限次數挑戰！您可於最佳成績時領取綠享積分（僅限領取1次），本問答最高上限綠享為1,000點，也就是4題問答都要答對唷！</h6>
                                        {/* <div className="mt-3 game-rules-p">註：綠享積分將於每周統計後匯入帳號中。</div> */}
                                    </div>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        backdrop="static"
                                        keyboard={false}
                                    />
                                </div>
                                : <div className="quiz-box my-5">
                                    <div>感謝您參與本次問答活動 </div>
                                    {/* <div>您本次活動的綠享積分，將於下週統一批次存入會員資料中！</div> */}
                                    <div>未來歡迎繼續參與平台活動獲取更多綠享積分，年底有機會參加抽獎獲得神秘禮物喔！</div>
                                    <div className="instructions-text mt-4">
                                        <div className="game-rules">問答題遊戲規則</div>
                                        <h5>1.什麼是綠享積分？</h5>
                                        <h6>綠享積分是民眾在全民綠生活平台參與活動、分享自己的綠生活後，能獲得的點數，持續累積綠享後，未來可參加環保署辦理的抽獎活動、實體活動唷！</h6>
                                        <h5 className="mt-3">2.快問快答可以玩幾次？</h5>
                                        <h6>問答活動共有４題，可不限次數挑戰！您可於最佳成績時領取綠享積分（僅限領取1次），本問答最高上限綠享為1,000點，也就是4題問答都要答對唷！</h6>
                                        {/* <div className="mt-3 game-rules-p">註：綠享積分將於每周統計後匯入帳號中。</div> */}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="d-flex flex-column taiwan-area my-4">
                        <div className="taiwan-area-data">
                            <h2 tabIndex={0}>全國淨零綠生活地圖</h2>
                            <hr />
                            <h3>點擊地圖上的縣市，一起了解各縣市「淨零綠生活」推動特色與亮點</h3>
                        </div>
                        <div className="d-flex row justify-content-center">
                            <div className="col-sm-10 col-md-10 col-lg-6 my-4">
                                <div className="tooltip-svg mt-4">
                                    <div ref={tooltipRef}></div>
                                    <TaiwanSVG ref={svgRef} className="taiwan-svg" alt="taiwan-svg" style={{ maxWidth: "800px" }} />
                                </div>
                            </div>
                            {cityDirections &&
                                <div className="place-introduction col-sm-10 col-md-10 col-lg-6 my-4">
                                    <div className="d-flex row top-area">
                                        <div className="place-img col-3">
                                            <img src={`/images/活動專區/localEvent/cityLogo/${cityDirections[0].city}.png`} alt={cityDirections[0].city} title={cityDirections[0].city} width="70%" />
                                        </div>
                                        <div className="place-title col-9">
                                            <h4>{cityDirections[0].city} {cityDirections[0].feature}</h4>
                                            <h5>{cityDirections[0].title}</h5>
                                        </div>
                                    </div>
                                    <p className="place-text mt-4">{cityDirections[0].directions}</p>
                                </div>
                            }
                        </div>
                    </div>


                    {relateds[0] &&
                        <div className="d-flex flex-column place-link mt-4 pb-4">
                            <h2>相關連結</h2>
                            <hr />
                            <div className="col-sm-12 col-md-12 col-lg-12 my-5">
                                <DownloadCarouselFlip computer={3} mobile={1} infiniteLoop sigleWidth={290} >
                                    {relateds.map((related, index) =>
                                        <>
                                            <a className="flip-rec-card card" key={index} as={Link} href={related.website_url} title={related.text} target="_blank">
                                                <img className="ev-detail-img" src={related.img_url} alt={related.text} style={{ backgroundColor: related.type === "旅遊" && "#fff" }} />
                                                <div className="flip-rec-text">
                                                    <div className="rec-type ">
                                                        <p className="col-sm-2 col-md-2 col-lg-4 type-text">{related.type}</p>
                                                        <p className="col-sm-8 col-md-8 col-lg-8 related-text">{related.text}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </>
                                    )}
                                </DownloadCarouselFlip>
                            </div>
                        </div>
                    }
                    {featureEvents[0]?.city_feature_events &&
                        featureEvents.map((featureEvent, index) =>
                            <div key={index} className="d-flex flex-column area-feature-events my-5">
                                <h2>地方特色活動</h2>
                                <hr />
                                <div className="feature-event-img col-sm-12 col-md-12 col-lg-12 my-4">
                                    <img src={featureEvent.img_url} alt={featureEvent.city_feature_events} title={featureEvent.city_feature_events} />
                                </div>
                                <h3>{featureEvent.city}-{featureEvent.city_feature_events}</h3>
                                <div className="feature-event-button my-2">
                                    <a href={featureEvent.url} title={featureEvent.city_feature_events} target="_blank">點我看更多</a>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </>

    );
}
export default withRouter(LocalEvents);
