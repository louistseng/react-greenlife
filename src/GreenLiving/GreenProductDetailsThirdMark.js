import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import markBannerSmall from '../images1/img/banner_mark_small.jpg';
import buyBannerSmall from '../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));

function GreenProductDetailsThirdMark() {

    let anchorId = window.location.href;
    const [fromMark, setFromMark] = useState(false);
    useEffect(() => {
        if (anchorId.includes("greenLabel")) {
            setFromMark(true);
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【綠色產品相關】綠色產品相關網站" />
            <div className=""><img src={fromMark ? markBannerSmall : buyBannerSmall} className="w-100 banner" alt="綠色產品相關網站" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGov`}>政府單位</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsAffair`}>地方縣市環保局</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsThirdMark`} className="leftbtnFocus">綠色產品相關網站</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGroup`}>環保與消費者團體</Link></div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>綠色產品相關網站</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <ol className="list-none">
                                    <li><a href="https://tinyurl.com/y5zb39x5" target="_blank" rel="noopener noreferrer" title="財團法人台灣建築中心 綠建材標章(在新視窗開啟鏈結)">財團法人台灣建築中心 綠建材標章</a></li>
                                    <li><a href="https://www.wcis.org.tw/" target="_blank" rel="noopener noreferrer" title="節約用水資訊網(在新視窗開啟鏈結)">節約用水資訊網</a></li>
                                    <li><a href="https://www.energylabel.org.tw/index.aspx" target="_blank" rel="noopener noreferrer" title="節能標章全球資訊網(在新視窗開啟鏈結)">節能標章全球資訊網</a></li>
                                    <li><a href="https://gpi.edf.org.tw/" target="_blank" rel="noopener noreferrer" title="經濟部工業局資源再生綠色產品資訊區(在新視窗開啟鏈結)">經濟部工業局資源再生綠色產品資訊區</a></li>
                                    <li><a href="https://greenbuy.epa.gov.tw/" target="_blank" rel="noopener noreferrer" title="環保產品線上採購網(在新視窗開啟鏈結)">環保產品線上採購網</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(GreenProductDetailsThirdMark);
