import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import markBannerSmall from '../images1/img/banner_mark_small.jpg';
import buyBannerSmall from '../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));

function GreenProductDetailsGov() {

    let anchorId = window.location.href;
    const [fromMark, setFromMark] = useState(false);
    useEffect(() => {
        if (anchorId.includes("greenLabel")) {
            setFromMark(true);
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【綠色產品相關】政府單位" />
            <div className=""><img src={fromMark ? markBannerSmall : buyBannerSmall} className="w-100 banner" alt="政府單位" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGov`} className="leftbtnFocus">政府單位</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsAffair`}>地方縣市環保局</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsThirdMark`}>綠色產品相關網站</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGroup`}>環保與消費者團體</Link></div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>政府單位</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <ol className="list-none">
                                    <li><a href="https://www.abri.gov.tw/" target="_blank">中華民國內政部建築研究所</a></li>
                                    <li><a href="https://www.mofa.gov.tw/default.aspx" target="_blank">中華民國外交部 全球資訊網</a></li>
                                    <li><a href="https://www.pcc.gov.tw/Index.aspx" target="_blank">中華民國行政院公共工程委員會 全球資訊網</a></li>
                                    <li><a href="https://www.nstc.gov.tw/" target="_blank">國家科學及技術委員會全球資訊網</a></li>
                                    <li><a href="https://www.coa.gov.tw/" target="_blank">行政院農業委員會</a></li>
                                    <li><a href="https://www.epa.gov.tw/" target="_blank">行政院環境保護署</a></li>
                                    <li><a href="https://www.moeaidb.gov.tw/" target="_blank">經濟部工業局全球資訊網</a></li>
                                    <li><a href="https://eris.utrust.com.tw/environet/" target="_blank">經濟部工業局生質能暨環保產業資訊網</a></li>
                                    <li><a href="https://www.wra.gov.tw/" target="_blank">經濟部水利署中文版全球資訊網</a></li>
                                    <li><a href="https://www.moea.gov.tw/MNS/doit/home/Home2.aspx" target="_blank">經濟部技術處</a></li>
                                    <li><a href="https://www.moeaboe.gov.tw/" target="_blank">經濟部能源局</a></li>
                                    <li><a href="https://www.trade.gov.tw/" target="_blank">經濟部國際貿易局經貿資訊網</a></li>
                                    <li><a href="https://www.bsmi.gov.tw/wSite/mp?mp=1" target="_blank">經濟部標準檢驗局</a></li>
                                    <li><a href="https://www.cpami.gov.tw/" target="_blank">中華民國內政部營建署全球資訊網</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(GreenProductDetailsGov);
