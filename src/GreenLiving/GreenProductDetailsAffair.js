import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import markBannerSmall from '../images1/img/banner_mark_small.jpg';
import buyBannerSmall from '../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));

function GreenProductDetailsAffair() {

    let anchorId = window.location.href;
    const [fromMark, setFromMark] = useState(false);
    useEffect(() => {
        if (anchorId.includes("greenLabel")) {
            setFromMark(true);
        }
    }, [anchorId])

    return (
        <>
            <BreadCrumb currentPage="【綠色產品相關】地方縣市環保局" />
            <div className=""><img src={fromMark ? markBannerSmall : buyBannerSmall} className="w-100 banner" alt="地方縣市環保局" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGov`}>政府單位</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsAffair`} className="leftbtnFocus">地方縣市環保局</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsThirdMark`}>綠色產品相關網站</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGroup`}>環保與消費者團體</Link></div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>地方縣市環保局</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <ol className="list-none">
                                    <li><a href="https://www.dep.gov.taipei/" target="_blank" rel="noopener noreferrer">臺北市政府環境保護局</a></li>
                                    <li><a href="https://www.tydep.gov.tw/tydep/" target="_blank" rel="noopener noreferrer">桃園市政府環境保護局</a></li>
                                    <li><a href="https://www.epb.taichung.gov.tw/" target="_blank" rel="noopener noreferrer">臺中市政府環境保護局</a></li>
                                    <li><a href="https://web.tainan.gov.tw/epb/" target="_blank" rel="noopener noreferrer">臺南市政府環境保護局</a></li>
                                    <li><a href="https://ksepb.kcg.gov.tw/" target="_blank" rel="noopener noreferrer">高雄市政府環境保護局</a></li>
                                    <li><a href="https://www.ptepb.gov.tw/" target="_blank" rel="noopener noreferrer">屏東縣政府環境保護局</a></li>
                                    <li><a href="https://www.mlepb.gov.tw/" target="_blank" rel="noopener noreferrer">苗栗縣政府環境保護局</a></li>
                                    <li><a href="https://www.ilepb.gov.tw/" target="_blank" rel="noopener noreferrer">宜蘭縣政府環境保護局</a></li>
                                    <li><a href="https://cyepb.cyhg.gov.tw/" target="_blank" rel="noopener noreferrer">嘉義縣環境保護局</a></li>
                                    <li><a href="https://ttepb.taitung.gov.tw/" target="_blank" rel="noopener noreferrer">臺東縣環境保護局</a></li>
                                    <li><a href="https://www.hcepb.gov.tw/" target="_blank" rel="noopener noreferrer">新竹縣政府環境保護局</a></li>
                                    <li><a href="https://kepb.kinmen.gov.tw/" target="_blank" rel="noopener noreferrer">金門縣環境保護局</a></li>
                                    <li><a href="https://www.hlepb.gov.tw/" target="_blank" rel="noopener noreferrer">花蓮縣環境保護局</a></li>
                                    <li><a href="https://www.epd.ntpc.gov.tw/" target="_blank" rel="noopener noreferrer">新北市政府環境保護局</a></li>
                                    <li><a href="https://www.klepb.klcg.gov.tw/" target="_blank" rel="noopener noreferrer">基隆市環境保護局</a></li>
                                    <li><a href="https://epb.chiayi.gov.tw/" target="_blank" rel="noopener noreferrer">嘉義市政府環境保護局</a></li>
                                    <li><a href="https://www.hccepb.gov.tw/" target="_blank" rel="noopener noreferrer">新竹市環境保護局</a></li>
                                    <li><a href="https://www.chepb.gov.tw/" target="_blank" rel="noopener noreferrer">彰化縣環境保護局</a></li>
                                    <li><a href="https://www.ylepb.gov.tw/" target="_blank" rel="noopener noreferrer">雲林縣環境保護局</a></li>
                                    <li><a href="https://www.ntepb.gov.tw/" target="_blank" rel="noopener noreferrer">南投縣政府環境保護局</a></li>
                                    <li><a href="https://www.phepb.gov.tw/index.jsp" target="_blank" rel="noopener noreferrer">澎湖縣政府環境保護局</a></li>
                                    <li><a href="https://tinyurl.com/469b42ad" target="_blank" rel="noopener noreferrer">連江縣環境資源局</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(GreenProductDetailsAffair);
