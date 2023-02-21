import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css'
import markBannerSmall from '../images1/img/banner_mark_small.jpg';
import buyBannerSmall from '../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));

function GreenProductLaboratory() {

    let anchorId = window.location.href;
    const [fromMark, setFromMark] = useState(false);
    useEffect(() => {
        if (anchorId.includes("greenLabel")) {
            setFromMark(true);
        }
    }, [])

    return (
        <>
            <BreadCrumb currentPage="【研究與測試單位】研究與測試單位" />
            <div className=""><img src={fromMark ? markBannerSmall : buyBannerSmall} className="w-100 banner" alt="研究與測試單位" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-11 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>研究與測試單位</h5>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <ol className="list-none">
                                    <li><a href="https://www.itri.org.tw/index.aspx" target="_blank" title="工業技術研究院(在新視窗開啟鏈結)">工業技術研究院</a></li>
                                    <li><a href="https://info.taiwantrade.com/" target="_blank" title="台灣經貿網(在新視窗開啟鏈結)">台灣經貿網</a></li>
                                    <li><a href="https://www.etc.org.tw/default.aspx" target="_blank" title="財團法人台灣商品檢測驗證中心(在新視窗開啟鏈結)">財團法人台灣商品檢測驗證中心</a></li>
                                    {/* <li><a href="http://www.ptri.org.tw/" target="_blank" title="財團法人印刷創新科技研究發展中心(在新視窗開啟鏈結)">財團法人印刷創新科技研究發展中心</a></li> */}
                                    <li><a href="https://www.ier.org.tw/home/" target="_blank" title="財團法人環境資源研究發展基金會(在新視窗開啟鏈結)">財團法人環境資源研究發展基金會</a></li>
                                    <li><a href="https://www.pidc.org.tw/" target="_blank" title="財團法人塑膠工業技術發展中心(在新視窗開啟鏈結)">財團法人塑膠工業技術發展中心</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(GreenProductLaboratory);
