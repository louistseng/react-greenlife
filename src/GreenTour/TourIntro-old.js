import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';

// import SideBtn from '../Components/SideBtn';
// import Footer from '../Components/Footer';
// import BreadCrumb from '../Components/BreadCrumb';
// import TourBanner from '../Components/TourBanner';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));


function GreenTour(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const [artData, setArtData] = useState([]);
    const [count, setCount] = useState("2");
    const [themeId, setThemeId] = useState("1");


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

    }, []);


    return (
        <>
            <BreadCrumb currentPage={"綠色旅遊介紹"} />
            <div className="greenTour container-fluid">
                <div className={`greenTour bigbanner mb-3`}>
                    <img className="relative" src={`../../images/greenTour/gt_bg.jpg`} width="100%" height="100%" alt="Banner" />
                    <div className="Button-wrapper">
                        <Link to={`/categories/tourIntro`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true"></i>
                                &nbsp;綠色旅遊介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=1`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                                &nbsp;自由行查詢
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=2`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-search" aria-hidden="true"></i>
                                &nbsp;團體旅遊查詢
                            </button>
                        </Link>
                        <Link to={`/categories/tourDownload`} className="btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色旅遊介紹"} search={"行程查詢"} category={"greenTour"} color={'#218cb6'} introLink={"tourIntro"} download={"tourDownload"} /> */}
                <div className="container">

                    <div>
                        <div className="intro-title">
                            <h2><i className="fas fa-play" aria-hidden="true"></i>&nbsp;最新消息</h2>
                        </div>
                        <div className="intro-content">
                            {artData.map((artData, index) =>
                                <div key={index} className="d-flex justify-content-start">
                                    <h4 className="rs-intro-subtitle">{artData.typeName}</h4>
                                    <a target="_blank" href={artData.href} title="(在新視窗開啟鏈結)" >
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
                            <h2><i className="fas fa-play" aria-hidden="true"></i>&nbsp;綠色旅遊介紹</h2>
                        </div>
                        <div className="intro-content">
                            <h3><div>&emsp;&emsp;行政院環境保護署(以下簡稱環保署)一直以來推動許多民眾旅遊行程相關環保政策，例如鼓勵至綠色餐廳及環保標章餐館業用餐、優先選擇環保旅店或環保標章旅館， 旅遊做好資源回收、自備餐具及盥洗用品、鼓勵使用大眾運輸工具、使用雲端發票、選購環保產品等。</div>
                                <div>&emsp;&emsp;環保署本(109)年與國內旅行業者合作推出綠色旅遊之套裝行程，針對行程符合至少選擇1處環境教育設施場所或生態遊憩場所、至少選擇1間綠色餐廳用餐，以及至少選擇1間環保標章旅館或環保旅店住宿(一日遊免住宿)者 ，納入團體旅遊範疇供民眾查詢，並可直接透過查詢連結報名參加。</div>
                                <div>&emsp;&emsp;另外環保署亦結合各縣市環保局針對轄內生態遊憩場所推薦相關行程，供民眾規劃自由行行程之參考，共同響應綠色旅遊，並透過玩得更放鬆，也享受人文生態，更玩出環保綠生活的思維。</div>
                            </h3>
                        </div>
                    </div>


                    <div>
                        <div className="intro-title">
                            <h2><i className="fas fa-play" aria-hidden="true"></i>&nbsp;綠色旅遊宣言</h2>
                        </div>
                        <div className="intro-content">
                            <h3>在行程中，從食、住、行、育、樂、購等日常面向做到以下事項:</h3>
                            <br />
                            <div><h3>食：優先選擇「綠色餐廳」，吃多少、點多少，並自備環保餐具。</h3></div>

                            <div><h3>住：優先選擇「環保標章旅館」或「環保旅店」，自備清潔盥洗用品。</h3></div>

                            <div><h3>育樂：優先選擇「綠色景點」，如環境教育設施場所或生態遊憩場所。</h3></div>

                            <div><h3>行：優先選擇低碳交通工具或搭乘大眾運輸。</h3></div>

                            <div><h3>購：優先選購「綠色產品」，並自備購物袋。</h3></div>
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