import React, { useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import './GreenMarkLazy.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApplySeviceFourth(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    {/*跳至指定標籤*/ }
    let anchorId = window.location.href.slice(window.location.href.indexOf("#") + 1)
    const a2 = useRef(null);
    useEffect(() => {
        if (anchorId === "a2") {
            a2.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】服務類-要怎麼申請" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="服務類-要怎麼申請" /></div>
            <div className="">{/*  */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div className="col-12 col-md-6 col-lg-12">回到懶人包</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceFirst`}><div className="col-12 col-md-6 col-lg-12">為什麼要申請？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceSecond`}><div className="col-12 col-md-6 col-lg-12">有誰申請了？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceThird`}><div className="col-12 col-md-6 col-lg-12">需要符合什麼條件？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceFourth`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">要怎麼申請？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="col-12 col-md-6 col-lg-12">標章申請指引</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 div-flex topbtn justify-content-between">
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div>環保標章申請資訊與指引</div></Link>
                                <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div>服務類申請指引</div></Link>
                            </div>
                            <div className="col-12 greenbar">
                                <h1>先填寫自評表(ODS格式)</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <div id="fordummiesWRAP">
                                    <div className="fordummiesQ2" style={{ minHeight: "260px" }}>
                                        <ul>
                                            <li className="btnA2a"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=518`} title="旅館業鏈結"><span>旅館業</span></a></li>
                                            <li className="btnA2b"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=542`} title="餐館業鏈結"><span>餐館業</span></a></li>
                                            <li className="btnA2c"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=544`} title="育樂場所鏈結"><span>育樂場所</span></a></li>
                                            <li className="btnA2d"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=546`} title="旅館業鏈結"><span>旅行業</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div id="a2" ref={a2} className="col-12 greenbar">
                                <h2>再參考應備文件範本(RAR格式)</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <div id="fordummiesWRAP">
                                    <div className="fordummiesQ2" style={{ minHeight: "260px" }}>
                                        <ul>
                                            <li className="btnA2a"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=519`} title="旅館業鏈結"><span>旅館業</span></a></li>
                                            <li className="btnA2b"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=543`} title="餐館業鏈結"><span>餐館業</span></a></li>
                                            <li className="btnA2c"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=545`} title="育樂場所鏈結"><span>育樂場所</span></a></li>
                                            <li className="btnA2d"><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=547`} title="旅行業鏈結"><span>旅行業</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroMarkApplySeviceFourth);
