import React, { useState, useEffect } from 'react';
import './FlipTour-old.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickRecord } from '../utils/API';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import htmlParse from 'html-react-parser';

import Icon0101 from '../images1/flip/shopping/icon-0101.png';
import Icon0102 from '../images1/flip/shopping/icon-0102.png';
import Icon0103 from '../images1/flip/shopping/icon-0103.png';
import Icon0104 from '../images1/flip/shopping/icon-0104.png';
import Icon0105 from '../images1/flip/shopping/icon-0105.png';
import Icon0106 from '../images1/flip/shopping/icon-0106.png';
import Icon0107 from '../images1/flip/shopping/icon-0107.png';
import Icon0108 from '../images1/flip/shopping/icon-0108.png';
import Icon0109 from '../images1/flip/shopping/icon-0109.png';
import Icon0110 from '../images1/flip/shopping/icon-0110.png';
import Icon0111 from '../images1/flip/shopping/icon-0111.png';
import Icon0112 from '../images1/flip/shopping/icon-0112.png';
import Icon0113 from '../images1/flip/shopping/icon-0113.png';
import Icon0114 from '../images1/flip/shopping/icon-0114.png';
import Icon0115 from '../images1/flip/shopping/icon-0115.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function FlipShopping(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');
    const [artData, setArtData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const count = "5";
    const themeId = "5";


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
                console.log(result)
                setArtData(result.resultObject)
            });

    }, [SSL, domain, serialize, themeId, count]);

    //點閱計數API
    useEffect(() => {
        clickRecord("338D80E8-3076-4201-B7A2-E2BE40D8F012", "4", collector)
    }, [collector]);

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

                setContent(result.resultObject.content)
                setTipsData(result.resultObject)

            });

    }, [SSL, domain, serialize, themeId]);

    const delayRedirect = (route) => {
        setTimeout(
            () => history.push(`/${route}`), 400
        )
    }

    return (
        <>
            <BreadCrumb currentPage={"綠色消費 (買得夠綠)"} />
            <AddPoint roleId="1" targetGuid="338D80E8-3076-4201-B7A2-E2BE40D8F012" roleItemId="13" autoAdd={true} />
            <img alt="綠色消費-橫幅" title="綠色消費-橫幅" className="w-100" src="../../../images/flip/shopping/topBanner.jpg" />
            <div className="container containerBox">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/shopping/shoppingLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <h2><span className="boldText title-font tour-top-title">綠色消費</span></h2>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/shopping/shoppingPic.svg" alt="綠色消費" title="綠色消費" />
                        </div>
                    </div>
                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="綠色旅遊小撇步" title="綠色旅遊小撇步" /><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div> */}
                        <h3 className="title-with-line">你可以這樣做</h3>
                        <div className="tips-list-shopping row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0101} /><li>少用化石燃料</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0102} /><li>使用發票載具</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0103} /><li>使用環保集點</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0104} /><li>拒絕衝動購物</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0105} /><li>物品重複使用</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0106} /><li>租借代替購買</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0107} /><li>善用修繕服務</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0108} /><li>愛惜物品使用</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0109} /><li>選用節能設備</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0110} /><li>選擇再生製品</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0111} /><li>選擇電動機車</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0112} /><li>選購低度包裝</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0113} /><li>選購綠色產品</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0114} /><li>購物自備袋子</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0115} /><li>購買天然衣料</li></div></div>
                            </DownloadCarouselFlip>
                        </div>
                    </div>

                    <div>
                        <div className="mt-5">
                            <h3 className="title-with-line">綠色消費資訊</h3>

                            {/* <Link className="more-btn" to={`/knowledge?page=1&type=0&theme=5&n=綠色消費`}>點我看更多</Link> */}
                        </div>
                        <div className="inner-article my-4">
                            <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={345}>
                                {artData.map((artData, index) =>
                                    <Link key={index} className="flip-rec-card card" onClick={() => delayRedirect(`knowledge/info?${artData.guid}`)}>
                                        <img className="ev-detail-img" src={artData.picPath} alt={`綠色消費${artData.typeName}`} style={{ width: "100%" }} />
                                        <li>
                                            <div style={{ background: artData.color }} className="info-btn">{artData.typeName}</div>
                                            <p className="flip-aniBtn">{artData.title}</p>
                                        </li>
                                    </Link>
                                )}
                            </DownloadCarouselFlip>

                        </div>
                    </div>
                </div>

                {/* <a target="_blank" rel="noopener noreferrer"><div className="col-sm-10 col-md-4 col-lg-4 joinBtn"><span id="c">&nbsp;&nbsp;綠色消費</span><span id="d">&nbsp;&nbsp;近期開放</span></div></a> */}
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipShopping);
