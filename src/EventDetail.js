import React, { useState, useEffect, useRef, getFullYear } from 'react';
import './carousel.css';
import './eventDetail.scss';
import { useReactToPrint } from 'react-to-print';
import { Link, useHistory, withRouter, useLocation } from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import { formatDate, formatDateTime, getEventTopic } from './utils/Functions';
import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";
import JoditEditor from "jodit-react";

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const SideBtn = React.lazy(() => import('./Components/SideBtn'));
const Footer = React.lazy(() => import('./Components/Footer'));
const SocialBtn = React.lazy(() => import('./Components/SocialBtn'));
const AddPoint = React.lazy(() => import('./Components/AddPoint'));

function EventDetail(props) {

    let history = useHistory()

    var serialize = require('serialize-javascript');
    const [pageName, setPageName] = useState("");

    let domainFormal = "https://greenliving.epa.gov.tw/newPublic";
    //let domainTest = "http://greenliving.eri.com.tw/PublicRwd"

    let testdomainFormal = props.domain.includes("eri") ? "https://greenliving.eri.com.tw/PublicRwd" : "https://greenliving.epa.gov.tw/newPublic";


    // let SSL = "https://"
    // let domain = "greenlife.epa.gov.tw"


    //定義列印功能的範圍
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const [activityGuid, setActivityGuid] = useState(history.location.search.slice(1));
    const collectTypeId = "1"

    const [recomData, setRecomData] = useState([])
    const [fetchData, setFetchData] = useState([]);

    const params = new URLSearchParams(history.location.search);
    const newsId = params.get('news')

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setActivityGuid(newsId || history.location.search.slice(1))
        //點閱計數API
        clickRecord(newsId || history.location.search.slice(1), "5-1", collector)
    }, [location, collector]);

    const editor = useRef()

    const config = {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        inline: true,
        useSearch: false,
        disablePlugins: "source"
    }

    useEffect(() => {
        const textarea = document.querySelector("textarea")
        if (textarea !== null)
            textarea.setAttribute("title", "textarea")

        //<img/> 新增 alt 替代文字
        const joditImg = document.querySelector(".jodit-wysiwyg")
        if (joditImg !== null) {
            const title = document.querySelector("#main-title").textContent;
            const img = joditImg.querySelectorAll('img')
            const tagA = joditImg.querySelectorAll('a')

            if (img !== null) {
                for (let i = 0; i < img.length; i++) {
                    img[i].setAttribute("alt", `${title}內文圖示-${i}`);
                    img[i].style.width = '100%'
                }
            }
            if (tagA !== null) {
                for (let i = 0; i < tagA.length; i++) {
                    // tagA[0].remove()
                    tagA[i].setAttribute("title", `${title}-連結${i}`);

                    const tagATitle = tagA[i].getAttribute('title')

                    if (tagATitle === '「愛海無ㄐㄩˋ──海裡沒有我的塑」，一起響應國際淨灘行動，杜絕海廢危機！-連結2' || tagATitle === '「愛海無ㄐㄩˋ──海裡沒有我的塑」，一起響應國際淨灘行動，杜絕海廢危機！-連結3') {
                        tagA[i].remove()
                    }
                    if (tagATitle === '「愛海無ㄐㄩˋ──海裡沒有我的塑」，一起響應國際淨灘行動，杜絕海廢危機！-連結1') {
                        tagA[i].setAttribute("title", `荒野保護協會-活動訊息連結`);
                    }
                    if (tagATitle === '「愛海無ㄐㄩˋ──海裡沒有我的塑」，一起響應國際淨灘行動，杜絕海廢危機！-連結4') {
                        tagA[i].setAttribute("title", `35 年的海廢大數據告訴我們的事連結`);
                    }
                    if (tagATitle === '「愛海無ㄐㄩˋ──海裡沒有我的塑」，一起響應國際淨灘行動，杜絕海廢危機！-連結5') {
                        tagA[i].setAttribute("title", `海漂垃圾清潔不易 9 月墾丁淨灘一起來連結`);
                    }
                    if (tagATitle === '「愛海無ㄐㄩˋ──海裡沒有我的塑」，一起響應國際淨灘行動，杜絕海廢危機！-連結6') {
                        tagA[i].setAttribute("title", `一次用飲料杯限制使用對象及實施方式總說明連結`);
                    }

                    if (tagATitle === '今夏最大盛事「臺灣國際熱氣球嘉年華」，相約臺東，一起來體驗臺東慢經濟！-連結1') {
                        tagA[i].setAttribute("title", `查詢環境教育場所連結`);
                    }
                    if (tagATitle === '今夏最大盛事「臺灣國際熱氣球嘉年華」，相約臺東，一起來體驗臺東慢經濟！-連結2') {
                        tagA[i].setAttribute("title", `查詢臺東綠色餐廳連結`);
                    }
                    if (tagATitle === '今夏最大盛事「臺灣國際熱氣球嘉年華」，相約臺東，一起來體驗臺東慢經濟！-連結3') {
                        tagA[i].setAttribute("title", `查詢臺東環保旅宿`);
                    }

                    if (tagATitle === '111年Let’s Go Green淨零綠生活競賽-連結2') {
                        tagA[i].setAttribute("title", `Green淨零綠生活競賽，線上報名報名表單網址連結`);
                    }
                    if (tagATitle === '111年Let’s Go Green淨零綠生活競賽-連結3') {
                        tagA[i].setAttribute("title", `Green淨零綠生活競賽，上傳至下方雲端網址連結`);
                    }
                    if (tagATitle === '111年Let’s Go Green淨零綠生活競賽-連結4') {
                        tagA[i].setAttribute("title", `競賽說明會報名網址連結`);
                    }

                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結1') {
                        tagA[i].setAttribute("title", `環保集點「悠遊國旅‧綠點有禮」活動頁連結`);
                    }
                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結2') {
                        tagA[i].setAttribute("title", `交通部觀光局「悠遊國旅個別旅客住宿優惠活動」網站連結`);
                    }
                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結3') {
                        tagA[i].setAttribute("title", `環保集點「悠遊國旅‧綠點有禮」合作環保標章旅館/民宿清單連結`);
                    }
                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結4') {
                        tagA[i].setAttribute("title", `環保集點制度說明連結`);
                    }
                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結5') {
                        tagA[i].setAttribute("title", `環保集點「電子優惠券」頁連結`);
                    }
                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結6') {
                        tagA[i].setAttribute("title", `環保集點「兌換環保產品」說明頁連結`);
                    }
                    if (tagATitle === '環保集點APP搭配國旅補助,最高可折抵1,500 元!-連結7') {
                        tagA[i].setAttribute("title", `【標章申請資訊與指引】服務類-申請懶人包連結`);
                    }

                    if (tagATitle === '樂遊市集趣，來逛桃園市二手市集，減碳購物好環保-連結1') {
                        tagA[i].setAttribute("title", `線性經濟與循環經濟連結`);
                    }
                    if (tagATitle === '樂遊市集趣，來逛桃園市二手市集，減碳購物好環保-連結2') {
                        tagA[i].setAttribute("title", `環經濟推動方案連結`);
                    }
                    if (tagATitle === '樂遊市集趣，來逛桃園市二手市集，減碳購物好環保-連結3') {
                        tagA[i].setAttribute("title", `循環經濟方案-推動目標連結`);
                    }
                    if (tagATitle === '樂遊市集趣，來逛桃園市二手市集，減碳購物好環保-連結4') {
                        tagA[i].setAttribute("title", `儒鴻企業官網連結`);
                    }
                    if (tagATitle === '樂遊市集趣，來逛桃園市二手市集，減碳購物好環保-連結5') {
                        tagA[i].setAttribute("title", `儒鴻洪鎮海專訪》推ESG 導入搖籃到搖籃理念連結`);
                    }
                    if (tagATitle === '樂遊市集趣，來逛桃園市二手市集，減碳購物好環保-連結6') {
                        tagA[i].setAttribute("title", `常衣著開始，你也能做到「循環經濟」連結`);
                    }

                    if (tagATitle === 'Join 綠潮流，創造我的綠生活行動~-連結1') {
                        tagA[i].setAttribute("title", `活動簡章連結`);
                    }
                    if (tagATitle === 'Join 綠潮流，創造我的綠生活行動~-連結2') {
                        tagA[i].setAttribute("title", `預約網址連結`);
                    }
                    if (tagATitle === 'Join 綠潮流，創造我的綠生活行動~-連結3') {
                        tagA[i].setAttribute("title", `環境教育人才庫（授課專長：環保綠生活）連結`);
                    }
                    if (tagATitle === 'Join 綠潮流，創造我的綠生活行動~-連結4') {
                        tagA[i].setAttribute("title", `環保署綠生活資訊平台連結`);
                    }

                    if (tagATitle === '自行車王國，從製造業龍頭到全民享受單車旅行，快來2022臺灣自行車旅遊節吧！-連結1') {
                        tagA[i].setAttribute("title", `Go Bike Taiwan玩騎認證」活動連結`);
                    }
                    if (tagATitle === '自行車王國，從製造業龍頭到全民享受單車旅行，快來2022臺灣自行車旅遊節吧！-連結2') {
                        tagA[i].setAttribute("title", `2022臺灣自行車旅遊節系列活動連結`);
                    }
                    if (tagATitle === '自行車王國，從製造業龍頭到全民享受單車旅行，快來2022臺灣自行車旅遊節吧！-連結3') {
                        tagA[i].setAttribute("title", `遠見雜誌-台灣「自行車王國」 再創下一個盛世連結`);
                    }
                    if (tagATitle === '自行車王國，從製造業龍頭到全民享受單車旅行，快來2022臺灣自行車旅遊節吧！-連結4') {
                        tagA[i].setAttribute("title", `有樁才有好服務 YouBike 2.0翻轉城市交通連結`);
                    }

                }
                // console.log(img)
                // console.log(title)
            }
        }
    })

    //單一活動API
    useEffect(() => {
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)

        const uri = `${props.SSL}//${props.domain}/api/api/Activity/GetSingle`;
        const uriRec = `${props.SSL}//${props.domain}/api/api/Activity/GetReCommand`;

        if (activityGuid && !newsId)
            fetch(uri, {
                method: 'POST',
                body: serialize({
                    Guid: activityGuid
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log(result)
                    if (result.isSucess) {
                        setFetchData(result.resultObject)
                        setPageName(result.resultObject[0].title)
                    }
                })

        if (activityGuid && !newsId)
            fetch(uriRec, {
                method: 'POST',
                body: serialize({
                    Guid: activityGuid,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        // console.log(result.resultObject);
                        setRecomData(result.resultObject)
                    }
                });
    }, [activityGuid, props.SSL, props.domain, serialize]);

    useEffect(() => {
        // console.log(params.get('news'))
        const newsUri = `${testdomainFormal}/APIs/News?Id=${newsId}`;
        if (newsId)
            fetch(newsUri, {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log("result", result.Detail)
                    if (result.Result === "Success")
                        setFetchData(result.Detail)
                    setPageName(result.Detail[0].Subject)
                    let city = result.Detail[0]?.EventAddress?.substring(0, 3).includes("全國") ? "" : result.Detail[0]?.EventAddress?.substring(0, 3)
                    // console.log(`${domainFormal}/APIs/News?et=1,2&ded=15,16&ec=${city}`)
                    fetch(`${testdomainFormal}/APIs/News?et=1,2&ded=15,16&ec=${city}`, {
                        method: 'GET'
                    })
                        .then(res => {
                            return res.json();
                        }).then(result => {
                            // console.log(result)
                            if (result.Result === "Success") {
                                var removeIndex = result.Detail.map(function (item) { return String(item.Id); }).indexOf(newsId);
                                result.Detail.splice(removeIndex, 1);
                                setRecomData(result.Detail)
                            }

                        });
                });
    }, [newsId, testdomainFormal])

    const style = {
        hide: {
            display: "none"
        },
        show: {
            display: "",
        }
    };

    return (
        <>
            <div className="container-fluid-middle">
                <BreadCrumb currentPage={pageName} />
                <div className="event-detail-content">
                    <AddPoint key={activityGuid} roleId="1" targetGuid={activityGuid} roleItemId="2" autoAdd={true} />
                    <CardDeck className="row">
                        {fetchData.map((fetchData, index) =>
                            <Card key={index} className="main-card-wapper col-sm-12 col-md-8  col-lg-8">
                                <Card.Body ref={componentRef}>
                                    <div className="top-card">
                                        <h1 className="main-title" id="main-title">{newsId ? fetchData.Subject : fetchData.title}</h1>
                                        <div className="d-flex">
                                            <span className="d-flex hashtag">
                                                <div className="kn-tag-name">
                                                    {newsId && fetchData.EventTopics.map((data, index) =>
                                                        <p key={index}>#{getEventTopic(data)}</p >
                                                    )}
                                                </div>
                                                <div className="kn-tag-name">
                                                    {!newsId && fetchData.themes.map((data, index) =>
                                                        <p key={index}>#{data.themeName}</p>
                                                    )}
                                                </div>
                                            </span>

                                        </div>
                                        <div className="">
                                            <SocialBtn myStyle={'justify-content-start'} handlePrint={handlePrint} activityGuid={activityGuid} url={newsId ? `searchEvent/eventDetail?news=${activityGuid}` : `searchEvent/eventDetail?${activityGuid}`} title={pageName} collectTypeId={collectTypeId} collector={collector} history={history} roleId="2" roleItemId="5" />
                                        </div>
                                    </div>
                                    <hr />
                                    <ul >
                                        <li className="detail-list" style={new Date(fetchData.EventStart).getFullYear() === 1900 ? style.hide : style.show}><span className="ul-title">活動日期</span><span>{newsId ? formatDateTime(fetchData.EventStart) : formatDate(fetchData.startDatetime)} ~ {newsId ? formatDateTime(fetchData.EventEnd) : fetchData.endDatetime ? formatDate(fetchData.endDatetime) : ""}</span></li>
                                        <li className="detail-list" style={fetchData.Organizer ? style.show : style.hide}><span className="ul-title">主辦單位</span><span>{newsId ? fetchData.Organizer : fetchData.organizer}</span></li>
                                        <li className="detail-list" style={fetchData.EventAddress ? style.show : style.hide}><span className="ul-title">活動地點</span><span>{newsId ? fetchData.EventAddress : fetchData.cityName}</span></li>
                                        <li className="detail-list" style={fetchData.Contact ? style.show : style.hide}><span className="ul-title">聯絡資訊</span><span>{newsId && fetchData.Contact}</span></li>
                                        <li className="detail-list">
                                            <p>
                                                <span className="ul-title">相關連結</span>
                                                {fetchData.EventLink || fetchData.href ?
                                                    fetchData.guid === 'c0b969dd-6860-495d-9a5a-a0bf9449a93f' || fetchData.guid === '2c7aa6f7-4377-463a-a1d9-17d2bcff74d4' ?
                                                        <a title="在新視窗開啟鏈結" target="_blank" rel="noopener noreferrer" href={newsId ? fetchData.EventLink : fetchData.href}>比賽辦法</a>
                                                        :
                                                        fetchData.guid === "008fd1d2-3353-4686-ad07-72db6be7d89e" ?
                                                            <a title="在新視窗開啟鏈結" target="_blank" rel="noopener noreferrer" href={newsId ? fetchData.EventLink : fetchData.href}>活動資訊</a>
                                                            :
                                                            <a title="在新視窗開啟鏈結" target="_blank" rel="noopener noreferrer" href={newsId ? fetchData.EventLink : fetchData.href}>活動網址</a>
                                                    :
                                                    <span>暫無相關資訊</span>
                                                }
                                            </p>
                                            <p>
                                                {fetchData.guid === '753e6fee-ef61-454b-9aa2-904b6f0bc3cd' ?
                                                    <>
                                                        <span className="ul-title">直播連結</span>
                                                        <a title="在新視窗開啟鏈結" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCMjPPrchHKECjK25Ypjwqtg" >名家講座直播連結</a>
                                                    </>
                                                    :
                                                    ""
                                                }
                                            </p>
                                        </li>

                                    </ul>
                                    <div className="content-img-wrapper">

                                        {newsId ?
                                            <>
                                                {fetchData?.AppendInfos[0]?.Picex[0] && <div className="single-img-wrapper" style={{ height: "calc(100px + 40vw)" }}><img style={{ position: "absolute", objectFit: "contain" }} className="content-img" alt={fetchData.AppendInfos[0].Picex[0]} title={fetchData.AppendInfos[0].Picex[0]} src={fetchData.AppendInfos[0].Pic[0]} /></div>}
                                                {fetchData?.AppendInfos[0]?.Picex[1] && <div className="single-img-wrapper" style={{ height: "calc(100px + 40vw)" }}><img style={{ position: "absolute", objectFit: "contain" }} className="content-img" alt={fetchData.AppendInfos[0].Picex[1]} title={fetchData.AppendInfos[0].Picex[1]} src={fetchData.AppendInfos[0].Pic[1]} /></div>}
                                                {fetchData?.AppendInfos[0]?.Picex[2] && <div className="single-img-wrapper" style={{ height: "calc(100px + 40vw)" }}><img style={{ position: "absolute", objectFit: "contain" }} className="content-img" alt={fetchData.AppendInfos[0].Picex[2]} title={fetchData.AppendInfos[0].Picex[2]} src={fetchData.AppendInfos[0].Pic[2]} /></div>}
                                            </>
                                            :
                                            //只有環保集點夏日感謝祭這篇的圖片寬度要與內文等寬
                                            <div className={fetchData.title.includes('環保集點夏日感謝祭，綠色消費享多重回饋！') ? " single-detail-img-wrapper img-100" : " single-detail-img-wrapper"}>
                                                <img style={{ position: "relative" }} className="content-img" alt={fetchData.title} title={fetchData.title} src={fetchData.picPath} />
                                            </div>
                                        }
                                    </div>
                                    <div className="cinner-article-detail mt-5">
                                        <JoditEditor
                                            ref={editor}
                                            value={fetchData.introduction}
                                            config={config} />
                                    </div>
                                    {newsId &&
                                        fetchData?.Content.split('\r\n').map((items, index) =>
                                            <p key={index}>&emsp;&emsp;{items}</p>
                                        )}
                                    {newsId && fetchData?.AppendInfos[0]?.UrlInfo &&
                                        <div className="news-content-keyword"><p>關鍵字:</p> <a href={fetchData?.AppendInfos[0].UrlInfo.includes("http") ? fetchData?.AppendInfos[0].UrlInfo : `https://${fetchData?.AppendInfos[0].UrlInfo}`} title="在新視窗開啟鏈結" target="_blank" rel="noopener noreferrer">{fetchData?.AppendInfos[0].LinkWord}</a></div>
                                    }

                                </Card.Body>
                            </Card>
                        )}


                        {!newsId &&
                            <div className="col-sm-12 col-md-3 col-lg-3 sideCard-container">
                                {/* <Card className="sideCard">
                            <Weather location={location} location2={location2} />
                        </Card> */}
                                <Card className="sideCard">
                                    <Card.Body>
                                        <h2 className="share-text">推薦活動</h2>
                                        {recomData.map((recomData, index) =>
                                            <Link key={index} onClick={() => setActivityGuid(recomData.guid)} title={recomData.title} as={Link} to={`/searchEvent/eventDetail?${recomData.guid}`}>
                                                <Card key={index} className="mb-3 rec-card">
                                                    <div>
                                                        <img className="ev-detail-img"
                                                            src={recomData.picPath}
                                                            alt={recomData.title}
                                                            title={recomData.title} />


                                                        <div className="d-block dec-wrapper">
                                                            {!newsId && <p className="date">{formatDate(recomData.startDatetime)}</p>}
                                                            <p className="carousel-name-text">{newsId ? recomData.Subject : recomData.title}</p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        )}
                                    </Card.Body>
                                </Card>
                            </div>
                        }
                    </CardDeck>
                    {newsId &&
                        <>
                            <div className="col-sm-12 col-md-8 col-lg-8 mb-3 title-card-wrapper">
                                <h2>推薦活動</h2>
                                <Card className="content-card-news">
                                    <div className="d-block">
                                        <div className="rec-content-wrapper">
                                            {recomData.map((fetchRecData, index) =>
                                                <Link onClick={() => setActivityGuid(recomData.Id)} title={fetchRecData.Subject} key={index} as={Link} to={`/searchEvent/eventDetail?news=${fetchRecData.Id}`}>
                                                    <div className="tour-rec">
                                                        <div className="day-city-wrapper-news">
                                                            <div className="news-recom-date">
                                                                {formatDate(fetchRecData.EventStart)}
                                                            </div>
                                                            <div className="news-recom-city">
                                                                <h3>{fetchRecData.EventAddress.length > 3 ? fetchRecData.EventAddress?.substring(0, 3) : fetchRecData.EventAddress}</h3>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="tour-rec-content">{fetchRecData.Subject}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </>
                    }
                </div>
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );

}

export default withRouter(EventDetail);