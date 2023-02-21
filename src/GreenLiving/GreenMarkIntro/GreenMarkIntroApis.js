import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroApis(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【API服務說明】API說明"/>
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="API說明" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-11 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>使用說明</h5>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className=" pt-3 mb-2">
                                若需要API說明，請洽信箱wwlryu@eri.com.tw，謝謝！
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroApis);
