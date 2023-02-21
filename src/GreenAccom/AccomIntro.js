import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';

import { clickRecord } from '../utils/API';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));


function GreenTour(props) {
    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const [artData, setArtData] = useState([]);
    const count = "3";
    const themeId = "3";

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("CD5FF5AE-A710-4E4B-95E4-C10488AC6038", "8", collector)
    }, [collector]);

    //fetch最新消息
    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/GreenLife/News/List`, {
            method: 'POST',
            body: JSON.stringify({
                Count: count,
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setArtData(result.resultObject)
            });

    }, [SSL, domain, count, themeId]);



    return (
        <>
            <BreadCrumb currentPage={"環保旅宿介紹"} />
            <div className="greenTour container-fluid">
                <TourBanner intro={"近期開放"} search={"環保旅宿查詢"} category={"accommodation"} introLink={'accomIntro'} download={"accomDownload"} join={"近期開放"} />
                <div class="container">

                    <div>
                        <div className="intro-title">
                            <h2><i class="fas fa-play" aria-hidden="true"></i>&nbsp;最新消息</h2>
                        </div>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="d-flex justify-content-start">
                                    <h4 className="rs-intro-subtitle">{artData.typeName}</h4>
                                    <a target="_blank" rel="noopener noreferrer" href={artData.href} title="在新視窗開啟鏈結">
                                        <div className="subtitle-content">
                                            <h3>{artData.startTime}  {artData.title}</h3>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="intro-title">
                            <h2><i class="fas fa-play" aria-hidden="true"></i>&nbsp;環保旅宿介紹</h2>
                        </div>
                        <div className="accom-intro-content">
                            <h2>環保旅店</h2>
                            <h3><div>&emsp;&emsp; 凡旅宿業者於108年1月1日至110年12月31日期間，對於消費者不使用一次性即丟盥洗用具（牙刷、洗髮精、沐浴乳、香皂、刮鬍刀、浴帽等）或續住不更換床單、毛巾或其他特定之環保作為，填寫附件1業者資料表並交予環保局，經審核通過即可成為環保旅店，環保旅店可選擇提供之優惠措施方案如下：</div>
                                <br />

                                <div className="accom-subtitle">方案一：提供配合環保作為之消費者優惠措施，其優惠內容參考如下：</div>
                                <div>住宿價格優惠，以較低的房價回饋消費者。</div>
                                <div>用餐優惠券，除原本住宿附贈之餐點外，另外提供用餐優惠。</div>
                                <div>商品折價，旅館內商店或附近商店優惠折價。</div>
                                <div>套裝行程或旅遊景點參觀相關優惠。</div>
                                <div>其他優惠方案，由環保旅店業者自行設計。</div>

                                <br />
                                <div className="accom-subtitle">方案二：自消費者配合環保作為所節省下來之費用中，提撥部分經費贊助推廣環保活動。（贊助對象及推廣環保活動內容將洽請所在地環保局指導）</div>

                                <br />
                                <div className="accom-subtitle">方案三：提供房價較一般客房低價之環保客房供民眾選擇，即客房內不準備一次性即丟盥洗用品（牙刷、洗髮精、沐浴乳、香皂、刮鬍刀、浴帽等）且續住不更換床單、毛巾等備品。</div>
                                <div>詳情活動辦法請參閱<Link>「環保旅店推廣計畫」</Link></div>
                            </h3>
                            <br />
                            <h2>環保標章旅館</h2>
                        </div>
                    </div>

                </div>
                <SideBtn history={history} />
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenTour);