import React, { useState, useEffect } from 'react';
import './FlipTour-old.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickRecord } from '../utils/API';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import htmlParse from 'html-react-parser';


import Icon001 from '../images1/flip/home/選購標章產品-1.png';
import Icon002 from '../images1/flip/home/定期清理雜物-2.png';
import Icon003 from '../images1/flip/home/栽種綠色植物-3.png';
import Icon004 from '../images1/flip/home/注重冰箱收納-4.png';
import Icon005 from '../images1/flip/home/剩食妥善保存-5.png';
import Icon006 from '../images1/flip/home/清理冷氣濾網-6.png';
import Icon007 from '../images1/flip/home/減少油煙排放-7.png';
import Icon008 from '../images1/flip/home/避免製造噪音-8.png';
import Icon009 from '../images1/flip/home/注意居家用藥-9.png';
import Icon010 from '../images1/flip/home/藥品確實回收-10.png';
import Icon011 from '../images1/flip/home/少使用殺蟲劑-11.png';
import Icon012 from '../images1/flip/home/選擇簡單裝潢-12.png';
import Icon013 from '../images1/flip/home/減少焚香燒金-13.png';
import Icon014 from '../images1/flip/home/定期清潔環境-14.png';
import Icon015 from '../images1/flip/home/隨手清理狗便-15.png';
import Icon016 from '../images1/flip/home/不隨意丟菸蒂-16.png';
import Icon017 from '../images1/flip/home/多淋浴少泡澡-17.png';
import Icon018 from '../images1/flip/home/選太陽能設備-18.png';
import Icon019 from '../images1/flip/home/調整熱水溫度-19.png';
import Icon020 from '../images1/flip/home/衣物分類洗滌-20.png';
import Icon021 from '../images1/flip/home/使用環保洗劑-21.png';
import Icon022 from '../images1/flip/home/衣物自然風乾-22.png'
import Icon023 from '../images1/flip/home/開窗自然通風-23.png';
import Icon024 from '../images1/flip/home/隨手關閉電源-24.png';
import Icon025 from '../images1/flip/home/定期清潔燈具-25.png';
import Icon026 from '../images1/flip/home/汰換老舊家電-26.png';
import Icon027 from '../images1/flip/home/注意漏水維修-27.png';
import Icon028 from '../images1/flip/home/抹布代替紙巾-28.png';
import Icon029 from '../images1/flip/home/做好資源回收-29.png';
import Icon030 from '../images1/flip/home/電池延壽回收-30.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function FlipHome(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');
    const [artData, setArtData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const count = "5";
    const themeId = "3";

    //最下面的資訊文章列表
    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/Knowledge/TopTheme`, {
            method: 'POST',
            body: serialize({
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

                setArtData(result.resultObject)
            });

    }, [SSL, domain, serialize, themeId, count]);

    //主副標題&小撇步
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${SSL}//${domain}/api/api/GreenLife/Page/Understand`, {
            method: 'POST',
            body: serialize({
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {

                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });
    }, [SSL, domain, serialize, themeId]);

    //點閱計數API
    useEffect(() => {
        clickRecord("AD713318-C208-4233-B798-6412FB68C14C", "4", collector)
    }, [collector]);

    const delayRedirect = (route) => {
        setTimeout(
            () => history.push(`/${route}`), 400
        )
    }

    return (
        <>
            <BreadCrumb currentPage={"綠色居家 (宅得夠綠)"} />
            <AddPoint roleId="1" targetGuid="AD713318-C208-4233-B798-6412FB68C14C" roleItemId="13" autoAdd={true} />
            <img alt="綠色居家-橫幅" title="綠色居家-橫幅" className="w-100" src="../../../images/flip/home/topBanner.jpg" />
            <div className="container containerBox">
                <div className="d-flex top-logo-home top-logo justify-content-start">
                    {/* <img src="images/flip/home/homeLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title-home">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <h2><span className="boldText title-font tour-top-title-home">綠色居家</span></h2>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/home/homePic.svg" alt="綠色居家" title="綠色居家" />
                        </div>
                    </div>

                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="綠色旅遊小撇步" title="綠色旅遊小撇步" /><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div> */}
                        <h3 className="title-with-line">你可以這樣做</h3>
                        <div className="tips-list-home row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon001} /><li>選購標章產品</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon002} /><li>定期清理雜物</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon003} /><li>栽種綠色植物</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon004} /><li>注重冰箱收納</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon005} /><li>剩食妥善保存</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon006} /><li>清理冷氣濾網</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon007} /><li>減少油煙排放</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon008} /><li>避免製造噪音</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon009} /><li>注意居家用藥</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon010} /><li>藥品確實回收</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon011} /><li>少使用殺蟲劑</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon012} /><li>選擇簡單裝潢</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon013} /><li>減少焚香燒金</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon014} /><li>定期清潔環境</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon015} /><li>隨手清理狗便</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon016} /><li>不隨意丟菸蒂</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon017} /><li>多淋浴少泡澡</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon018} /><li>選太陽能設備</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon019} /><li>調整熱水溫度</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon020} /><li>衣物分類洗滌</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon021} /><li>使用環保洗劑</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon022} /><li>衣物自然風乾</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon023} /><li>開窗自然通風</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon024} /><li>隨手關閉電源</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon025} /><li>定期清潔燈具</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon026} /><li>汰換老舊家電</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon027} /><li>注意漏水維修</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon028} /><li>抹布代替紙巾</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon029} /><li>做好資源回收</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-home"><img alt="" src={Icon030} /><li>電池延壽回收</li></div></div>
                            </DownloadCarouselFlip>
                        </div>
                    </div>

                    <div>
                        <div className="mt-5">
                            <h3 className="title-with-line">綠色居家資訊</h3>

                            {/* <Link className="more-btn" to={`/knowledge?page=1&type=0&theme=5&n=綠色消費`}>點我看更多</Link> */}
                        </div>
                        <div className="inner-article my-4">
                            <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={345}>
                                {artData.map((artData, index) =>
                                    <div key={index} className="flip-rec-card card" onClick={() => delayRedirect(`knowledge/info?${artData.guid}`)}
                                        onKeyPress={() => delayRedirect(`knowledge/info?${artData.guid}`)} tabIndex={0}>
                                        <img className="ev-detail-img" src={artData.picPath} style={{ width: "100%" }} alt="" />
                                        <li>
                                            <div style={{ background: artData.color }} className="info-btn">{artData.typeName}</div>
                                            <p className="flip-aniBtn">{artData.title}</p>
                                        </li>
                                    </div>
                                )}
                            </DownloadCarouselFlip>

                        </div>
                    </div>
                </div>

                {/* <div className="col-sm-10 col-md-4 col-lg-4 joinBtn">參加綠色居家</div> */}
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipHome);
