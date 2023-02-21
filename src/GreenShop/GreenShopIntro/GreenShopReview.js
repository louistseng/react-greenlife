import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../GreenLiving/GreenLabel.css'

import greenstorereview from '../../images1/greenShop/greenstorereview.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenShopReview(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="綠色商店審核標準及執行程序" />{/*  */}
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/categories/GreenShopIntro/GreenShopApply`}><div className="col-12 col-md-6 col-lg-12">綠色商店申請與管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopReview`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">綠色商店審核標準及執行程序</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopTrack`}><div className="col-12 col-md-6 col-lg-12">綠色商店追蹤管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopStatistics`}><div className="col-12 col-md-6 col-lg-12">綠色商店歷年新增家數統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>綠色商店審核標準及執行程序</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                一、申請資格
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                為協助民眾辨識通路是否售有綠色商品進而選購之，本署定義售有一定數量綠色商品並針對該商品具有特定陳列方式之通路為「綠色商店」。其中，依是否具有實體店鋪，將綠色商店分為「實體」及「網路」綠色商店 ，如實體店面中以DM型錄方式販售，則DM型錄中3件環保標章商品視為一件實體環保標章商品，「實體」及「網路」綠色商店申請資格說明如下：
                                </p>
                                <p className="pt-3 mb-2">
                                (一) 實體綠色商店（含連鎖型及非連鎖型綠色商店）
                                <ol>
                                    <li>領有公司登記證或其他政府機關核發證明文件之販售業者。</li>
                                    <li>販售綠色商品數量情形符合以下任一條件：
                                        <p className="pt-3 mb-2 text-indent">(1)實體環保標章或第二類環保標章產品2種以上。</p>
                                        <p className="pt-3 mb-2 text-indent">(2)實體環保標章或第二類環保標章產品1種以上「及」實體碳足跡標籤產品3種以上。</p>
                                        <p className="pt-3 mb-2 text-indent">(3)實體環保標章或第二類環保標章產品1種以上「及」實體減碳標籤產品1種以上。</p>
                                    </li>
                                    <li>設有資源回收區。</li>
                                    <li>商品陳列方式以地貼或標誌牌等明顯標示使消費者辨識或尋得綠色商品。</li>
                                    <li>連鎖型及非連鎖型綠色商店定義
                                    <p className="pt-3 mb-2">凡業者之全臺分店達10家（含）以上，皆可申請「連鎖型綠色商店」，惟業者可依實祭需求申請連鎖型綠色商店或非連鎖型綠色商店，非強制性10家（含）以上皆須申請「連鎖型綠色商店」 ，亦可申請「非連鎖型綠色商店」。</p>
                                    </li>
                                </ol>
                                </p>
                                
                                <p className="pt-3 mb-2">
                                (二) 網路綠色商店
                                <ol>
                                    <li>領有公司登記證或其他政府機關核發證明文件之販售業者。</li>
                                    <li>需設立綠色產品專區。</li>
                                    <li>販售環保標章或第二類環保標章產品20種以上。</li>
                                </ol>
                                </p>

                                <p className="pt-3 mb-2 text-indent">
                                二、申請方式（整體流程詳見圖1）
                                </p>
                                <p className="pt-3 mb-2">
                                (一) 實體非連鎖型綠色商店：至綠色生活資訊網申請帳號後，進行線上申請，由該商店所轄環保局審查通過後即為實體非連鎖型綠色商店。
                                </p>
                                <p className="pt-3 mb-2">
                                (二) 實體連鎖型綠色商店：由總公司與本署聯繫，並提供申請資料（<a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=218`} target="_blank">綠色商店設置與執行規範附件一.pdf</a>） ，由環保署執行單位進行整體資料之系統匯入工作，並由各分店所轄環保局進行審查，通過後即為實體連鎖型綠色商店。
                                </p>
                                <p className="pt-3 mb-2">
                                (三) 綠色網路商店：至綠色生活資訊網申請帳號後，進行線上申請，由環保署委託之執行單位審查通過後即為綠色網路商店。
                                </p>
                                <div className="text-center">
                                    <img src={greenstorereview} className="w-100" alt="綠色商店申請流程圖" title="綠色商店申請流程圖" />
                                    <p className="table-small-text">圖1 綠色商店申請流程圖</p>
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

export default withRouter(GreenShopReview);
