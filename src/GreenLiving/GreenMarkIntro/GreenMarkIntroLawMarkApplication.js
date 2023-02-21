import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroLawMarkApplication(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "${SSL}" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "${domainBackendFormal}/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "${domainBackendFormal}"

    return (
        <>
            <BreadCrumb currentPage="【法規及審議會決議查詢】標章申請相關法規" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="標章申請相關法規" /></div>
            <div className="">{/*  */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroLawMarkApplication`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">標章申請相關法規</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLawCouncilResolution`}><div className="col-12 col-md-6 col-lg-12">環保標章審議會決議事項查詢</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>標章申請相關法規</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <ul>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=4`} target="_blank" title="商品標示法(在新視窗開啟鏈結)">商品標示法</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=5`} target="_blank" title="行政院環境保護署綠色消費暨環境保護產品推動使用作業要點(在新視窗開啟鏈結)">行政院環境保護署綠色消費暨環境保護產品推動使用作業要點</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=6`} target="_blank" title="行政院環境保護署環境保護產品申請審查作業規範(在新視窗開啟鏈結)">行政院環境保護署環境保護產品申請審查作業規範</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=7`} target="_blank" title="行政院環境保護署綠色消費暨環境保護產品審議會設置要點(在新視窗開啟鏈結)">行政院環境保護署綠色消費暨環境保護產品審議會設置要點</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=85`} target="_blank" title="行政院環境保護署環境保護產品管理作業規範(在新視窗開啟鏈結)">行政院環境保護署環境保護產品管理作業規範</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=101`} target="_blank" title="行政院環境保護署環境保護產品證書規費收費標準(在新視窗開啟鏈結)">行政院環境保護署環境保護產品證書規費收費標準</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroLawMarkApplication);
