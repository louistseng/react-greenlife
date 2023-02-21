import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import markBannerSmall from '../images1/img/banner_mark_small.jpg';
import buyBannerSmall from '../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));

function GreenProductForeign() {

    let anchorId = window.location.href;
    const [fromMark, setFromMark] = useState(false);
    useEffect(() => {
        if (anchorId.includes("greenLabel")) {
            setFromMark(true);
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【國外環保標章網站】國外環保標章網站" />
            <div className=""><img src={fromMark ? markBannerSmall : buyBannerSmall} className="w-100 banner" alt="國外環保標章網站" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-11 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>國外環保標章網站</h5>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <ol className="list-none">
                                    <li><a href="https://www.blauer-engel.de/" target="_blank" title="Blauer-Engel(在新視窗開啟鏈結)">Blauer-Engel</a></li>
                                    <li><a href="https://www.environmentalchoice.org.nz/" target="_blank" title="Environmental Choice New Zealand(在新視窗開啟鏈結)">Environmental Choice New Zealand</a></li>
                                    <li><a href="https://www.greenseal.org/" target="_blank" title="Green Seal(在新視窗開啟鏈結)">Green Seal</a></li>
                                    <li><a href="https://tinyurl.com/muyw9fd9" target="_blank" title="Japan Environment Association(在新視窗開啟鏈結)">Japan Environment Association</a></li>
                                    <li><a href="https://www.naturskyddsforeningen.se/" target="_blank" title="Naturskyddsforeningen - Sveriges aldsta och storsta natur- och miljoorganisation(在新視窗開啟鏈結)">Naturskyddsforeningen - Sveriges aldsta och storsta natur- och miljoorganisation</a></li>
                                    <li><a href="https://tcocertified.com/" target="_blank" title="TCO Certified – Toward Sustainable IT products(在新視窗開啟鏈結)">TCO Certified – Toward Sustainable IT products</a></li>
                                    <li><a href="https://www.globalecolabelling.net/" target="_blank" title="Global Ecolabelling Network (GEN)(在新視窗開啟鏈結)">Global Ecolabelling Network (GEN)</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(GreenProductForeign);
