import React, { useEffect, useState, useRef, useCallback } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useCookies } from "react-cookie";
import { clickLogout, addComma, checkLogin_and_redirect } from '../utils/Functions';
import { fetchTotalGreenShop, getDailyGreenData } from '../utils/API';
import { formatDate } from '../utils/Functions';
import CountUp from 'react-countup';
import CheckLoginAndRedirect from '../Components/CheckLoginAndRedirect';
import './DailyGreen.scss';
import './Expert/Expert.scss';

import treePng from '../images1/greenPoint/point-tree.png';
import fishPng from '../images1/greenPoint/point-fish.png';
import tourPng from '../images1/flip/tour/tourPic.png';
import foodPng from '../images1/flip/food/foodPic.png';
import shoppingPng from '../images1/flip/shopping/shoppingPic.png';
import officePng from '../images1/flip/office/officePic.png';
import homePng from '../images1/flip/home/homePic.png';
import greenMan from "../images1/greenMan/greenMan.png";
import dash from "../images1/greenMan/dash.png";
import crown1 from '../images1/dailyGreen/crown1.png';
import crown2 from '../images1/dailyGreen/crown2.png';
import crown3 from '../images1/dailyGreen/crown3.png';
import crown4 from '../images1/dailyGreen/crown4.png';
import crown5 from '../images1/dailyGreen/crown5.png';
import crown6 from '../images1/dailyGreen/crown6.png';
import filmPng from '../images1/download/download-film.png';
import greenManNav from '../images1/greenMan/greenManNav.png';
import islandPng from '../images1/navBar/island.png';

import DatePicker, { registerLocale } from 'react-datepicker'
import zhTW from 'date-fns/locale/zh-TW'

import 'react-datepicker/dist/react-datepicker.css'

registerLocale('zh-TW', zhTW)

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));

function DailyGreen(props) {

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');

    const [startDate, setStartDate] = useState(0)
    const [gotoUrl, setGotoUrl] = useState("");
    //預設篩選項目為本年(8)
    const [sortTypeId, setSortTypeId] = useState(8);
    const [month, setMonth] = useState(0);

    const crowns = [crown1, crown2, crown3, crown4, crown5, crown6]

    //達人排行榜 排序頁籤-篩選項目(本日,本周,本月,本年)
    const [dropDownSort, setDropDownSort] = useState([]);
    useEffect(() => {
        // if (!greenlivingToken)
        fetch(`${SSL}//${domain}/api/api/Point/Rank/SortType`, {
            method: 'GET',
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDropDownSort(result.resultObject)
            });

        //9/10測試用
        // console.log(window.location.hostname)
    }, [SSL, domain])

    //每日一綠首頁-積分+關注+愛秀+文青排行榜
    const [rankBoard, setRankBoard] = useState([]);
    useEffect(() => {

        fetch(`${SSL}//${domain}/api/api/Point/Rank`, {
            method: 'POST',
            body: serialize({
                SortType: String(sortTypeId)
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setRankBoard(result.resultObject)
                console.log(result)
            });
    }, [SSL, domain, sortTypeId])

    //每日一綠首頁-綠生活達人榜+綠生活紀錄榜
    const [activityReport, setActivityReportd] = useState([]);
    useEffect(() => {
        getDailyGreenData(startDate, month, setActivityReportd)

    }, [SSL, domain, startDate, month])

    function formatValue(value) {
        let year = new Date(value)
        year = year.getFullYear() - 1911
        return year
    }

    //總共多少魚多少樹
    const [fetchGreenShop, setFetchGreenShop] = useState([])
    useEffect(() => {
        fetchTotalGreenShop(setFetchGreenShop)
    }, []);

    //秀出我的綠-文章列表
    const [myGreenData, setMyGreenData] = useState([]);
    useEffect(() => {

        fetch(`${SSL}//${domain}/api/api/MyGreen/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: "1",
                Count: "3",
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setMyGreenData(result.resultObject.greens)
                }
            });
    }, [SSL, domain, serialize]);

    //網誌-文章列表
    const [blogData, setBlogData] = useState([]);
    const [lastEditTime, setLastEditTime] = useState("");
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Blog/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Title: "",
                Year: "",
                Month: "",
                TypeIds: "",
                Page: "1",
                Count: "3",
                SortType: "10",
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setBlogData(result.resultObject.blogs)
                    setLastEditTime(result.resultObject.lastEditTime)
                }
            });
    }, [SSL, domain, serialize]);

    //魚跟樹的排行榜
    const [greenShopRank, setGreenShopRank] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GreenShop/Release/Rank`, {
            method: 'GET',
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setGreenShopRank(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])




    //觀察到底部loading字-觸發fetch頁數+1
    const [rerender, setRerender] = useState(false)
    const countUpRef = useRef(null);
    const lazyLoadImages = (entries) => {
        if (entries[0].isIntersecting) {
            setRerender(true)
        } else {
            setRerender(false)
        }
    };

    //滑到countUp 觸發重新渲染
    // useEffect(() => {
    //     const options = {
    //         root: null,
    //         rootMargin: '100px',
    //         threshold: 1
    //     }
    //     const observer = new IntersectionObserver(lazyLoadImages, options);

    //     if (countUpRef && countUpRef.current) {
    //         observer.observe(countUpRef.current)
    //     }
    //     return () => observer.unobserve(countUpRef.current);

    // }, [countUpRef, lazyLoadImages])

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>全民綠生活資訊平台-每日一綠</title>
                    <meta name="description" content="行政院環境保護署-全民綠生活資訊平台首頁，「綠生活」是一種親環境的生活方式，從食、衣、住、行、育、樂、購等生活小細節做起，來愛護我們的家園。" />
                </Helmet>
                <BreadCrumb />
                <div className="dailyGreen">

                    {gotoUrl &&
                        <CheckLoginAndRedirect key={gotoUrl} gotoUrl={gotoUrl} />
                    }

                    <div className="top-banner-daily">
                        <div className="text-area container">
                            <img className="daily-island" src={greenManNav} alt="greenMan" />
                            <div className="top-banner-text">
                                <h1 className="daily-banner-green-text">綠生活成果榜</h1>
                            </div>
                        </div>
                    </div>

                    {/* <div className="container title-time-wrapper">
                        <h3 className="page-title">每日一綠</h3>
                        <h5 className="update-time">最後更新時間：{lastEditTime === null ? "" : formatDate(lastEditTime)}</h5>
                    </div> */}
                    <div className="shareGreen_and_blog_wrapper">
                        <div className="container">
                            <div className="gallery-wrapper">
                                <div className="title_and_link">
                                    <h2>秀出我的綠</h2>
                                    <Link to="/daily/article" className="pink-link" title="秀出我的綠，看更多">看更多</Link>
                                </div>
                                <div className="gallery-img-wrapeer">
                                    <Link to={`/daily/article/info?${myGreenData[0]?.guid}`} className="radius-wrapper-bigger"><img src={myGreenData[0]?.picHref || filmPng} alt="秀出我的綠圖片-1" title="秀出我的綠圖片-1" /></Link>
                                    <div className="right-side-section">
                                        <Link to={`/daily/article/info?${myGreenData[1]?.guid}`} className="radius-wrapper"><img src={myGreenData[1]?.picHref || filmPng} alt="秀出我的綠圖片-2" title="秀出我的綠圖片-2" /></Link>
                                        <Link to={`/daily/article/info?${myGreenData[2]?.guid}`} className="radius-wrapper"><img src={myGreenData[2]?.picHref || filmPng} alt="秀出我的綠圖片-3" title="秀出我的綠圖片-3" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="gallery-wrapper">
                                <div className="title_and_link">
                                    <h2>綠生活網誌</h2>
                                    <Link to="/daily/blog?page=1&type=&award=&city=&n=" className="pink-link" title="綠生活網誌，看更多">看更多</Link>
                                </div>
                                <div className="gallery-img-wrapeer">
                                    <Link to={`/daily/blog/info?${blogData[0]?.guid}`} className="radius-wrapper-bigger">
                                        <img className="my-detail-img" src={blogData[0]?.picHref || "../../images/blankLeef.png"} alt={""} />
                                        <div className="kn-rec-text">
                                            {/* <div className="rec-time"><h6>{formatDate(blogData[0]?.createTime)}</h6></div> */}
                                            <p className="kn-rec-title">{blogData[0]?.title}</p>
                                        </div>
                                    </Link>
                                    <div className="right-side-section">
                                        <Link to={`/daily/blog/info?${blogData[1]?.guid}`}>
                                            <div className="radius-wrapper">
                                                <div className="my-card">
                                                    <img className="my-detail-img" src={blogData[1]?.picHref || "../../images/blankLeef.png"} alt={""} />
                                                    <div className="kn-rec-text">
                                                        {/* <div className="rec-time"><h6>{formatDate(blogData[1]?.createTime)}</h6></div> */}
                                                        <div><p className="kn-rec-title">{blogData[1]?.title}</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to={`/daily/blog/info?${blogData[2]?.guid}`}>
                                            <div className="radius-wrapper">
                                                <div className="my-card">
                                                    <img className="my-detail-img" src={blogData[2]?.picHref || "../../images/blankLeef.png"} alt={""} />
                                                    <div className="kn-rec-text">
                                                        {/* <div className="rec-time"><h6>{formatDate(blogData[2]?.createTime)}</h6></div> */}
                                                        <div><h3 className="kn-rec-title">{blogData[2]?.title}</h3></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="green-charity-board container">
                        <h4 className="title_and_link">綠生活公益榮譽榜</h4>
                        <div className="daily-tree-section">
                            <div className="left-charity-ammont">
                                <h5>綠友們總共</h5>
                                <img className="png-img" src={treePng} />
                                <div ref={countUpRef} className="text-countup-wrapper">
                                    <h4>種了</h4>
                                    <h4 className="countup-width">
                                        <CountUp end={fetchGreenShop.treeCount} redraw={true} useEasing={true} separator="," />
                                    </h4>
                                    <h4>棵樹</h4>
                                </div>
                            </div>
                            <div className="ranking-card-wrapper">
                                {greenShopRank.treeRank?.map((data, index) =>
                                    <div key={index} className="ranking-card">
                                        <div className="ranking-card-name">
                                            <img className="crown" src={crowns[data.rank]} />
                                            <div>
                                                <img className="clip-avatar-rank" src={data.headPic || dash} alt="會員頭像" />
                                            </div>
                                            <h5 className="rank-board-name">{data.userName}</h5>
                                        </div>
                                        <div>
                                            <h5 className="rank-amount">{data.count === 0 ? "-" : data.count}&nbsp;顆</h5>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                        <div className="daily-fish-section">
                            <div className="left-charity-ammont">
                                <h5>綠友們總共</h5>
                                <img className="png-img" src={fishPng} />
                                <img className="animated-png1" src={fishPng} />
                                <img className="animated-png2" src={fishPng} />
                                <div className="text-countup-wrapper">
                                    <h4>放流</h4>
                                    <h4 className="countup-width">
                                        <CountUp end={fetchGreenShop.fishCount} redraw={true} useEasing={true} separator="," />
                                    </h4>
                                    <h4>條魚苗</h4>
                                </div>
                            </div>
                            <div className="ranking-card-wrapper">
                                {greenShopRank.fishRank?.map((data, index) =>
                                    <div key={index} className="ranking-card">
                                        <div className="ranking-card-name">
                                            <img className="crown" src={crowns[data.rank]} />
                                            <div>
                                                <img className="clip-avatar-rank" src={data.headPic || dash} alt="會員頭像" title="會員頭像" />
                                            </div>
                                            <h5 className="rank-board-name">{data.userName}</h5>
                                        </div>
                                        <div>
                                            <h5 className="rank-amount">{data.count === 0 ? "-" : data.count}&nbsp;條</h5>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="green-expert-board">
                        <div className="container">
                            <h4 className="title_and_link">綠生活達人榜</h4>
                            <div className="d-flex">
                                <label className="pink-label">請選擇年度</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    locale='zh-TW'
                                    dateFormat={formatValue(startDate)}
                                    showYearPicker={true}
                                    defaultValue={'年'}
                                    className="year-picker"
                                />

                                <label className="pink-label">月份</label>
                                <select className="drop-kn" name="month" onChange={(e) => setMonth(e.target.value)}>
                                    <option value="0">月份</option>
                                    <option value="1">1月</option>
                                    <option value="2">2月</option>
                                    <option value="3">3月</option>
                                    <option value="4">4月</option>
                                    <option value="5">5月</option>
                                    <option value="6">6月</option>
                                    <option value="7">7月</option>
                                    <option value="8">8月</option>
                                    <option value="9">9月</option>
                                    <option value="10">10月</option>
                                    <option value="11">11月</option>
                                    <option value="12">12月</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="year-section brick">
                                    <h3>{formatValue(startDate)}年&emsp;{month && month !== "0" ?  month + '月' : "全年度"}</h3>
                                </div>
                                <div className="total-section brick">
                                    <h3>所有綠友已取得&emsp;
                                        <CountUp end={activityReport.totalPoint} separator="," redraw={true} />
                                        &emsp;點綠積分</h3>
                                </div>
                                <div className="expert-section brick row">
                                    <h3 className="col-sm-12 col-md-4 col-lg-4">綠行動100招已經有</h3>
                                    <div className="col-sm-12 col-md-8 col-lg-8 d-flex justify-content-center">
                                        <div className="data-wrapper"><h3>{activityReport.participateCount}</h3><h4>位響應</h4></div>
                                        <div className="data-wrapper"><h3>{activityReport.participateCompleteCount}</h3><h4>位完成</h4></div>
                                        <div className="data-wrapper"><h3>{activityReport.participatePercent}%</h3><h4>完成率</h4></div>
                                    </div>
                                </div>
                                <div className="island-wrapper">
                                    <div className="island-card tourDaily-card">
                                        <h6>綠色旅遊</h6>
                                        <img src={tourPng} />
                                        <h6 className="total-percent">{activityReport.completePercentTheme_1}%</h6>
                                        <h6>{activityReport.participateCountTheme_1}位&nbsp;響應</h6>
                                        <h6>{activityReport.completeCountTheme_1}位&nbsp;完成</h6>
                                    </div>
                                    <div className="island-card food-card">
                                        <h6>綠色飲食</h6>
                                        <img src={foodPng} />
                                        <h6 className="total-percent">{activityReport.completePercentTheme_2}%</h6>
                                        <h6>{activityReport.participateCountTheme_2}位&nbsp;響應</h6>
                                        <h6>{activityReport.completeCountTheme_2}位&nbsp;完成</h6>
                                    </div>
                                    <div className="island-card home-card">
                                        <h6>綠色居家</h6>
                                        <img src={homePng} />
                                        <h6 className="total-percent">{activityReport.completePercentTheme_3}%</h6>
                                        <h6>{activityReport.participateCountTheme_3}位&nbsp;響應</h6>
                                        <h6>{activityReport.completeCountTheme_3}位&nbsp;完成</h6>
                                    </div>
                                    <div className="island-card shopping-card">
                                        <h6>綠色購物</h6>
                                        <img src={shoppingPng} />
                                        <h6 className="total-percent">{activityReport.completePercentTheme_5}%</h6>
                                        <h6>{activityReport.participateCountTheme_5}位&nbsp;響應</h6>
                                        <h6>{activityReport.completeCountTheme_5}位&nbsp;完成</h6>
                                    </div>
                                    <div className="island-card office-card">
                                        <h6>綠色辦公</h6>
                                        <img src={officePng} />
                                        <h6 className="total-percent">{activityReport.completePercentTheme_4}%</h6>
                                        <h6>{activityReport.participateCountTheme_4}位&nbsp;響應</h6>
                                        <h6>{activityReport.completeCountTheme_4}位&nbsp;完成</h6>
                                    </div>
                                </div>
                                <div className="link-wrapper">
                                    <div onClick={() => checkLogin_and_redirect(setGotoUrl, "/daily/score")} className="pink-link mybutton">點我登入挑戰綠行動100招</div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="green-record-board container">
                        <div className="">
                            <div className="expert-section brick row">
                                <h2 className="col-sm-12 col-md-4 col-lg-4">綠生活紀事</h2>
                                <div className="col-sm-12 col-md-8 col-lg-8 d-flex justify-content-center">
                                    <div className="data-wrapper"><p>{activityReport.likeCount}</p><span>個讚</span></div>
                                    <div className="data-wrapper"><p>{activityReport.myGreenCount}</p><span>則照片/影片</span></div>
                                    <div className="data-wrapper"><p>{activityReport.blogCount}</p><span>篇網誌</span></div>
                                </div>
                            </div>
                            <div className="green-friend-title-wrapper">
                                <div className="data-title" >資料區間</div>
                                {dropDownSort.map((data, index) =>
                                    <div
                                        key={index}
                                        id={data.typeId}
                                        onClick={() => {
                                            setSortTypeId(data.typeId);
                                        }}
                                        className={sortTypeId === data.typeId ? "sort-type focus" : "sort-type"}>
                                        <span style={sortTypeId === data.typeId ? { color: "white" } : {}}>{data.typeName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="green-friend-wrapper ranking container">
                        <div className="two-card-wrapper">
                            {/* 綠積分達人start */}
                            <div className="ranking-wrapper">
                                <h3 className="ranking-title pointExpert-title">綠積分達人</h3>
                                {/* 綠積分達人紅色卡start */}
                                {rankBoard.pointRank?.slice(0, 1).map((data, index) =>
                                    <div key={index} className="ranking-top-card pointExpert">
                                        <div className="rank_crown_and_headPic">
                                            <div className="crown_headPic-wrapper">
                                                <div className="crown-wrapper"><img className="gold-crown" src={crowns[0]} alt="皇冠" /></div>
                                                <div className="crown-wrapper"><img className="clip-avatar-withCrown" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" /></div>
                                            </div>
                                            <p className="ranking-name">{data.userName}</p>
                                        </div>
                                        <div className="ranking-card-data-wrapper">
                                            <div>
                                                <p className="ranking-number">累積<span>{data.score === 0 ? "-" : addComma(data.score)}</span>點綠積分</p>
                                            </div>
                                        </div>
                                    </div>)}
                                {/* 綠積分達人紅色卡end */}
                                {rankBoard.pointRank?.slice(1).map((data, index) =>
                                    <div key={index} className="ranking-card">
                                        <div className="ranking-card-name">
                                            <img className="crown" src={crowns[index + 1]} alt="皇冠" />
                                            <div>
                                                <img className="clip-avatar-rank" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" />
                                            </div>
                                            <p className="rank-board-name">{data.userName}</p>
                                        </div>
                                        <div>
                                            <p className="rank-amount">{data.score === 0 ? "-" : addComma(data.score)}&nbsp;點</p>
                                        </div>
                                    </div>)}
                                {/* <div className="ranking-card">
                                    <div className="ranking-card-name">
                                        <img className="crown" src={crown3} />
                                        <div>
                                            <img className="clip-avatar-rank" src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg" alt="會員頭像" title="會員頭像" />
                                        </div>
                                        <h5 className="rank-board-name">小卓</h5>
                                    </div>
                                    <div>
                                        <h5 className="rank-amount">10,500&nbsp;點</h5>
                                    </div>
                                </div> */}
                            </div>
                            {/* 綠積分達人end */}
                            {/* 關注達人start */}
                            <div className="ranking-wrapper">
                                <h3 className="ranking-title followExpert-title">關注達人</h3>
                                {/* 綠積分達人橘色卡start */}
                                {rankBoard.attentionRank?.slice(0, 1).map(data =>
                                    <div key={data.userGuid} className="ranking-top-card followExpert">
                                        <div className="rank_crown_and_headPic">
                                            <div className="crown_headPic-wrapper">
                                                <div className="crown-wrapper"><img className="gold-crown" src={crowns[data.rank - 1]} alt="皇冠" /></div>
                                                <div className="crown-wrapper"><img className="clip-avatar-withCrown" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" /></div>
                                            </div>
                                            <p className="ranking-name">{data.userName}</p>
                                        </div>
                                        <div className="ranking-card-data-wrapper">
                                            <div>
                                                <p className="ranking-number">按讚/被按讚<span>{data.score === 0 ? "-" : addComma(data.score)}</span>次</p>

                                            </div>
                                        </div>
                                    </div>)}
                                {/* 綠積分達人橘色卡end*/}
                                {rankBoard.attentionRank?.slice(1).map((data, index) =>
                                    <div className="ranking-card" key={index}>
                                        <div className="ranking-card-name">
                                            <img className="crown" src={crowns[data.rank - 1]} alt="皇冠" />
                                            <div>
                                                <img className="clip-avatar-rank" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" />
                                            </div>
                                            <p className="rank-board-name">{data.userName}</p>
                                        </div>
                                        <div>
                                            <p className="rank-amount">{data.score === 0 ? "-" : addComma(data.score)}&nbsp;次</p>
                                        </div>
                                    </div>)}
                            </div>
                            {/* 關注達人end */}
                        </div>
                        <div className="two-card-wrapper">
                            {/* 愛秀達人start */}
                            <div className="ranking-wrapper">
                                <h3 className="ranking-title showExpert-title">愛秀達人</h3>
                                {/* 綠積分達人黃色卡start */}
                                {rankBoard.greenRank?.slice(0, 1).map(data =>
                                    <div key={data.userGuid} className="ranking-top-card showExpert">
                                        <div className="rank_crown_and_headPic">
                                            <div className="crown_headPic-wrapper">
                                                <div className="crown-wrapper"><img className="gold-crown" src={crowns[data.rank - 1]} alt="皇冠" /></div>
                                                <div className="crown-wrapper"><img className="clip-avatar-withCrown" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" /></div>
                                            </div>
                                            <p className="ranking-name">{data.userName}</p>
                                        </div>
                                        <div className="ranking-card-data-wrapper">
                                            <div>
                                                <p className="ranking-number">累積<span>{data.score === 0 ? "-" : addComma(data.score)}</span>則照片/影片</p>
                                            </div>
                                        </div>
                                    </div>)}
                                {/* 綠積分達人黃色卡end */}
                                {rankBoard.greenRank?.slice(1).map((data, index) =>
                                    <div key={index} className="ranking-card">
                                        <div className="ranking-card-name">
                                            <img className="crown" src={crowns[data.rank - 1]} alt="皇冠" />
                                            <div>
                                                <img className="clip-avatar-rank" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" />
                                            </div>
                                            <p className="rank-board-name">{data.userName}</p>
                                        </div>
                                        <div>
                                            <p className="rank-amount">{data.score === 0 ? "-" : addComma(data.score)}&nbsp;則</p>
                                        </div>
                                    </div>)}

                            </div>
                            {/* 愛秀達人end */}
                            {/* 文青達人start */}
                            <div className="ranking-wrapper">
                                <h3 className="ranking-title articleExpert-title">文青達人</h3>
                                {/* 綠積分達人綠色卡start */}
                                {rankBoard.blogRank?.slice(0, 1).map(data =>
                                    <div key={data.userGuid} className="ranking-top-card articleExpert">
                                        <div className="rank_crown_and_headPic">
                                            <div className="crown_headPic-wrapper">
                                                <div className="crown-wrapper"><img className="gold-crown" src={crowns[data.rank - 1]} alt="皇冠" /></div>
                                                <div className="crown-wrapper"><img className="clip-avatar-withCrown" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" /></div>
                                            </div>
                                            <p className="ranking-name">{data.userName}</p>
                                        </div>
                                        <div className="ranking-card-data-wrapper">
                                            <div>
                                                <p className="ranking-number">累積<span>{data.score === 0 ? "-" : addComma(data.score)}</span>篇網誌</p>
                                            </div>
                                        </div>
                                    </div>)}
                                {/* 綠積分達人綠色卡end */}
                                {rankBoard.blogRank?.slice(1).map((data, index) =>
                                    <div key={index} className="ranking-card">
                                        <div className="ranking-card-name">
                                            <img className="crown" src={crowns[data.rank - 1]} alt="皇冠" />
                                            <div>
                                                <img className="clip-avatar-rank" src={data.headPic ? data.headPic : data.userGuid ? greenMan : dash} alt="會員頭像" title="會員頭像" />
                                            </div>
                                            <p className="rank-board-name">{data.userName}</p>
                                        </div>
                                        <div>
                                            <p className="rank-amount">{data.score === 0 ? "-" : addComma(data.score)}&nbsp;篇</p>
                                        </div>
                                    </div>)}

                            </div>
                            {/* 文青達人end */}
                        </div>
                    </div>

                </div>

                <Footer />
            </HelmetProvider>
        </>

    );

}

export default withRouter(DailyGreen);