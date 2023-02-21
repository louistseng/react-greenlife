import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
import Footer from '../Components/Footer';
import BreadCrumb from '../Components/BreadCrumb';
import { Link, withRouter, useHistory } from 'react-router-dom';
import SideBtn from '../Components/SideBtn';


function FlipTour(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    var serialize = require('serialize-javascript');
    const [artData, setArtData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const [count, setCount] = useState("5");
    const [themeId, setThemeId] = useState("1");

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

    }, []);

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
                // console.log(result)
                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });

    }, []);

    
    const delayRedirect = (route) => {
        setTimeout(
            () =>  history.push(`/${route}`), 400
        )
    }
    
    return (
        <>
            <BreadCrumb currentPage={"綠色旅遊 (玩得夠綠)"}/>
            <img alt="綠色旅遊-橫幅" title="綠色能源-橫幅" className="w-100" src="../../../images/flip/tour/topBanner.jpg" />
            <div className="container containerBox">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/tour/tourLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>



                <div className="detail-info">
                    <div>
                        <p><span className="boldText title-font tour-top-title">綠色旅遊知識+</span></p>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                            {content.split("<br>").map((items, index) => 
                               <p key={index}><span>{items}</span></p>
                               )}
                            </div>
                            <img className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/tour/tourPic.svg" alt="綠色旅遊" title="綠色能源"/>
                        </div>
                    </div>


                    <div>
                        <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src="../../../images/flip/tour/tipsIcon.png" alt="綠色旅遊小撇步" title="綠色旅遊小撇步"/><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div>
                        <div className="tips-list d-flex mt-2 row">
                            <div className="d-flex col-sm-12 col-md-12 col-lg-6">
                                <a href={tipsData.step1Href} target="_blank" rel="noopener noreferrer"><div className="link-wrapper"><img alt={tipsData.step2} title={tipsData.step2} src="../../../images/flip/tour/eco-transport.png" /><li>{tipsData.step1}</li></div></a>
                                <a href={tipsData.step2Href} target="_blank" rel="noopener noreferrer"><div className="link-wrapper"><img alt={tipsData.step5} title={tipsData.step5} src="../../../images/flip/tour/eco-bottle.png" /><li>{tipsData.step2}</li></div></a>
                                <a href={tipsData.step3Href} target="_blank" rel="noopener noreferrer"><div className="link-wrapper"><img alt={tipsData.step3} title={tipsData.step3} src="../../../images/flip/tour/eco-site.png" /><li>{tipsData.step3}</li></div></a>
                            </div>
                            <div className="d-flex col-sm-12 col-md-12 col-lg-6">
                                <a href={tipsData.step4Href} target="_blank" rel="noopener noreferrer"><div className="link-wrapper"><img alt={tipsData.step4} title={tipsData.step4}src="../../../images/flip/tour/eco-restaurant.png" /><li>{tipsData.step4}</li></div></a>
                                <a href={tipsData.step5Href} target="_blank" rel="noopener noreferrer"><div className="link-wrapper"><img alt={tipsData.step6} title={tipsData.step6} src="../../../images/flip/tour/eco-shower.png" /><li>{tipsData.step5}</li></div></a>
                                <a href={tipsData.step6Href} target="_blank" rel="noopener noreferrer"><div className="link-wrapper"><img alt={tipsData.step1} title={tipsData.step1} src="../../../images/flip/tour/eco-hotel.png" /><li>{tipsData.step6}</li></div></a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="d-flex tour-subtitle mt-5"><img className="subtitle-icon" src="../../../images/flip/tour/infoIcon.png" alt="綠色旅遊資訊" title="綠色旅遊資訊"/><span className="boldText title-font tour-subtitle">綠色旅遊資訊</span>
                        <Link className="more-btn" to={`/knowledge?page=1&type=0&theme=1&n=綠色旅遊`}>點我看更多</Link>
                        </div>
                        <div className="inner-article mt-4">


                            {artData.map((artData, index) =>
                                <div key={index} className="link" onClick={() => delayRedirect(`knowledge/info?${artData.guid}`)}>
                                     <li>
                                    <div style={{ background: artData.color }} className="info-btn">{artData.typeName}</div>
                                    <p className="flip-aniBtn">{artData.title}</p>
                                </li>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center tour-btn">
                    <Link className="col-sm-6 col-md-4 col-lg-4 " as={Link} to="/categories/greenTour"><div className="joinBtn">參加綠色旅遊</div></Link>
                    <Link className="col-sm-6 col-md-4 col-lg-4 " as={Link} to="/categories/accommodation"><div className="joinBtn">查詢環保旅宿</div></Link>
                </div>
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipTour);