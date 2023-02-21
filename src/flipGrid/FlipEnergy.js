import React, { useState, useEffect } from 'react';
import './FlipTour-old.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickRecord } from '../utils/API';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function FlipEnergy(props) {
    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');
    const [artData, setArtData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const count = "5";
    const themeId = "6" ;

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

    }, [SSL, domain, serialize, count, themeId]);

       //點閱計數API
       useEffect(() => {
        clickRecord("9E6B1F50-591E-4C8C-BE51-4439E239BAC7", "4", collector)
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
                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });
    }, [SSL, domain, serialize]);


    const delayRedirect = (route) => {
        setTimeout(
            () => history.push(`/${route}`), 400
        )
    }

    return (
        <>
            <BreadCrumb currentPage={"綠色能源 (能源夠綠)"}/>
            <AddPoint roleId="1" targetGuid="9E6B1F50-591E-4C8C-BE51-4439E239BAC7" roleItemId="13" autoAdd={true} />
            <img alt="綠色能源-橫幅" title="綠色能源-橫幅" className="w-100" src="../../../images/flip/energy/topBanner.jpg" />
            <div className="container containerBox">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/energy/energyLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>



                <div className="detail-info">
                    <div>
                        <p><span className="boldText title-font tour-top-title">綠色能源知識+</span></p>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {content.split("<br>").map((items, index) =>
                                    <p key={index}><span>&emsp;&emsp;{items}</span></p>
                                )}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-offset="200" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/energy/energyPic.svg" alt="綠色能源" title="綠色能源"/>
                        </div>
                    </div>


                    <div>
                        <div className="d-flex tour-subtitle mt-5"><img alt="綠色能源小撇步" title="綠色能源小撇步" className="subtitle-icon" src="../../../images/flip/tour/tipsIcon.png" /><span className="boldText title-font tour-subtitle">綠色能源小撇步</span></div>
                        <div className="tips-list d-flex mt-5 row">
                            <div className="d-flex col-sm-12 col-md-12 col-lg-6">
                              <div className="link-wrapper"><img alt={tipsData.step1} title={tipsData.step1} src={"../../../images/flip/energy/icon_05_001.svg"} />
                                    {String(tipsData.step1).split("，").map((data, index) =>
                                        <div key={index}>
                                            {data}
                                        </div>
                                    )}</div>
                               
                               <div className="link-wrapper"><img alt={tipsData.step2} title={tipsData.step2} src="../../../images/flip/energy/icon_05_002.svg" />
                                    {String(tipsData.step2).split("，").map((data, index) =>
                                        <div key={index}>
                                            {data}
                                        </div>
                                    )}</div>
        
                                <div className="link-wrapper"><img alt={tipsData.step3} title={tipsData.step3} src="../../../images/flip/energy/icon_05_003.svg" />
                                    {String(tipsData.step3).split("，").map((data, index) =>
                                        <div key={index}>
                                            {data}
                                        </div>
                                    )}</div>
                               
                            </div>
                            <div className="d-flex col-sm-12 col-md-12 col-lg-6">
                               <div className="link-wrapper"><img alt={tipsData.step4} title={tipsData.step4} src="../../../images/flip/energy/icon_05_004.svg" />
                                    {String(tipsData.step4).split("，").map((data, index) =>
                                        <div key={index}>
                                            {data}
                                        </div>
                                    )}</div>
                                
                                <div className="link-wrapper"><img alt={tipsData.step5} title={tipsData.step5} src="../../../images/flip/energy/icon_05_005.svg" />
                                    {String(tipsData.step5).split("，").map((data, index) =>
                                        <div key={index}>
                                            {data}
                                        </div>
                                    )}</div>
                               
                                <div className="link-wrapper"><img alt={tipsData.step6} title={tipsData.step6} src="../../../images/flip/energy/icon_05_006.svg" />
                                    {String(tipsData.step6).split("，").map((data, index) =>
                                        <div key={index}>
                                            {data}
                                        </div>
                                    )}</div>
                               
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="d-flex tour-subtitle mt-5"><img alt="綠色能源資訊" title="綠色能源資訊" className="subtitle-icon" src="../../../images/flip/tour/infoIcon.png" /><span className="boldText title-font tour-subtitle">綠色能源資訊</span>
                            <Link className="more-btn" to={`/knowledge?page=1&type=0&theme=6&n=綠色能源`}>點我看更多</Link>
                        </div>
                        <div className="inner-article mt-4 ">

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

                {/* <div className="col-sm-10 col-md-4 col-lg-4 joinBtn">參加綠色能源</div> */}
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipEnergy);
