import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import markBannerSmall from '../images1/img/banner_mark_small.jpg';
import buyBannerSmall from '../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));

function GreenProductDetailsGroup() {

    let anchorId = window.location.href;
    const [fromMark, setFromMark] = useState(false);
    useEffect(() => {
        if (anchorId.includes("greenLabel")) {
            setFromMark(true);
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【綠色產品相關】環保與消費者團體" />
            <div className=""><img src={fromMark ? markBannerSmall : buyBannerSmall} className="w-100 banner" alt="環保與消費者團體" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGov`}>政府單位</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsAffair`}>地方縣市環保局</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsThirdMark`}>綠色產品相關網站</Link></div>
                            <div className="col-12 col-md-6 col-lg-12"><Link to={`/${fromMark ? "greenLabel" : "greenPurChase"}/GreenProductDetailsGroup`} className="leftbtnFocus">環保與消費者團體</Link></div>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>環保與消費者團體</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <ol className="list-none">
                                    <li><a href="https://csrone.com/" target="_blank" rel="noopener noreferrer">永續溝通與知識平台 – CSROne</a></li>
                                    <li><a href="https://bcsd.org.tw/" target="_blank" rel="noopener noreferrer">中華民國企業永續發展協會</a></li>
                                    <li><a href="https://www.consumers.org.tw/home.html" target="_blank" rel="noopener noreferrer">財團法人中華民國消費者文教基金會</a></li>
                                    <li><a href="https://www.huf.org.tw/" target="_blank" rel="noopener noreferrer">主婦聯盟環境保護基金會</a></li>
                                    <li><a href="https://www.ftis.org.tw/" target="_blank" rel="noopener noreferrer">財團法人台灣產業服務基金會</a></li>
                                    <li><a href="https://www.tgpf.org.tw/" target="_blank" rel="noopener noreferrer">財團法人台灣綠色生產力基金會</a></li>
                                    <li><a href="https://tinyurl.com/28pstzfv" target="_blank" rel="noopener noreferrer">綠色公民行動聯盟</a></li>
                                    <li><a href="https://tinyurl.com/bdfmp4ze" target="_blank" rel="noopener noreferrer">環境品質文教基金會</a></li>
                                    <li><a href="https://www.edf.org.tw/" target="_blank" rel="noopener noreferrer">財團法人環境與發展基金會</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(GreenProductDetailsGroup);
