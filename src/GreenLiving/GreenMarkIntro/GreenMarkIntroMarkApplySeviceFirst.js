import React, { useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import servicelazy01 from '../../images1/greenLiving/Servicelazy01.jpg'
import servicelazy02 from '../../images1/greenLiving/Servicelazy02.jpg'

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApplySeviceFirst(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    {/*跳至指定標籤*/ }
    let anchorId = window.location.href.slice(window.location.href.indexOf("#") + 1)
    const a1 = useRef(null);
    const a2 = useRef(null);
    useEffect(() => {
        if (anchorId === "a1") {
            a1.current.scrollIntoView({ behavior: "smooth" });
        }
        else if (anchorId === "a2") {
            a2.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】服務類-為什麼要申請" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="服務類-為什麼要申請" /></div>
            <div className="">{/*  */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div className="col-12 col-md-6 col-lg-12">回到懶人包</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceFirst`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">為什麼要申請？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceSecond`}><div className="col-12 col-md-6 col-lg-12">有誰申請了？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceThird`}><div className="col-12 col-md-6 col-lg-12">需要符合什麼條件？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceFourth`}><div className="col-12 col-md-6 col-lg-12">要怎麼申請？</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="col-12 col-md-6 col-lg-12">標章申請指引</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 div-flex topbtn justify-content-between">
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div>環保標章申請資訊與指引</div></Link>
                                <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div>服務類申請指引</div></Link>
                            </div>
                            <div id="a1" ref={a1} className="col-12 greenbar">
                                <h1>什麼是服務類標章？</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2 text-center">
                                <img src={servicelazy01} className="w-100" alt="什麼是服務類標章？" />
                            </div>

                            <div id="a2" ref={a2} className="col-12 greenbar">
                                <h2>申請環保標章5大好處</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2 text-center">
                                <img src={servicelazy02} className="w-100" alt="申請環保標章5大好處" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroMarkApplySeviceFirst);
