import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseIntroPriEnterprises(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【民間企業與團體綠色採購】民間企業與團體綠色採購申報"/>
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="民間企業與團體綠色採購申報" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                        <Link to={`/greenPurChase/GreenPurchaseIntroPriEnterprises`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購申報</div></Link>
                        <Link to={`/greenPurChase/GreenPurchaseIntroEnterprisesPurch`}><div className="col-12 col-md-6 col-lg-12">綠色採購申報</div></Link>
                        <Link to={`/greenPurChase/GreenPurchaseIntroPurchasePlan`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體推動綠色採購績優單位</div></Link>
                        <Link to={`/greenPurChase/GreenPurchaseIntroPurchaseAchieve`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購成果統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>計畫目的</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                綠色採購及綠色消費為企業推動永續發展所不可或缺之核心價值。環保署為協助民間企業及其所屬員工響應綠色消費政策，擬協助企業擬訂綠色採購及員工綠色消費教育訓練計畫，鼓勵企業提出綠色採購導入方案，並建議員工選購「低污染、省能資源、可回收」的環保產品，除創造國內綠色消費市場之商機，擴展綠色商品市場外，並藉此將綠色採購及綠色觀念導入公司既有管考制度，達到節能、減碳及營運成本降低之目的。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                環保署研擬範例引導企業導入綠色供應鏈，以綠色採購及綠色消費為基礎，逐層要求供應商產品符合環保規範，以完整架構綠色採購制度，涵括蒐集國內外企業綠色採購及教育訓練實例，以提供參考，規劃並協助企業提出綠色採購、綠色供應鏈機制、員工綠色消費教育、環保活動及回收服務建立等計畫。
                                </p>
                            </div>

                            <div className="col-12 greenbar">
                                <h5>計畫目標</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-padding">
                                (一) 引導企業本體及其供應商全面導入綠色採購，建議企業自源頭做起，選用環保標章商品。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                (二) 鼓勵企業建構電子學習網，以便捷快速的網路傳遞方式進行線上學習，不但有助於內部員工知識學習的速度及其縮短傳遞時間，亦節省供應商、客戶差旅費用及時間，減少企業營運及教育訓練成本。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                (三) 蒐集彙整國內外各產業成功導入綠色採購及員工綠色消費教育之範例，並提供範本，以提供業者參考使用。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                (四) 提供整合性綠色採購輔導：輔導企業完成綠色採購及員工綠色消費訓練計畫之建立。
                                </p>
                            </div>

                            <div className="col-12 greenbar">
                                <h5>輔導內容</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                (一) 現行環保趨勢、相關法規及其對企業本身之影響</p>
                                <p className="pt-3 mb-2 text-padding">以保證製品安全性為前提，了解禁用物質之於企業本身產品之影響。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (二) 企業本身綠色經營策略的導入、預期目標及動機</p>
                                <p className="pt-3 mb-2 text-padding">企業思維建立:企業責任、產品策略、環境管理等說明。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (三) 綠色供應鏈的管理機制建立</p>
                                <p className="pt-3 mb-2 text-padding">生產材料綠色規範、生產材料綠色採購、一般辦公室用品綠色採購等機制建立，及達成率分析。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (四) 企業發展綠色產品之未來規劃</p>
                                <p className="pt-3 mb-2 text-padding">提出產品生命週期管理SOP、產品生命終期管理SOP，自源頭管理，以層層落實。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (五) 建立綠色學習機制，引入數位、無紙化的學習方式</p>
                                <p className="pt-3 mb-2 text-padding">建立網路學習機制，要求企業員工及供應廠商定期受訓，並建立管理機制，以落實教育訓練。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (六) 企業因應現行環境保護政令規範及相關貿易法規等，提出說明及規劃</p>
                                <p className="pt-3 mb-2 text-padding">提出產品分類、回收再利用分析、廢棄物處理、禁用物質、廠商製造之責任等分析說明。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (七) 企業置入綠色採購及綠色行銷之整體預估效益說明</p>
                                <p className="pt-3 mb-2 text-padding">綠色採購的目標與動機、綠色供應鏈管理機制建立、綠色行銷的積極意義、綠色行銷策略與做法、綠色產品驗證(環保標章商品申請流程說明)。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (八) 員工綠色消費訓練規劃</p>
                                <p className="pt-3 mb-2 text-padding">員工訓練機制建立(研討會、讀書會、說明會等)、課程規劃及難易度建立、員工訓練時數要求、廠商實體體驗說明等。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (九) 輔導企業施行綠色採購及宣導綠色採購項目</p>
                                <p className="pt-3 mb-2 text-padding">綠色採購之項目包括國內之第一類環保標章產品、第二類環保標章產品、第三類綠色標章產品（包含節能標章、省水標章、綠建材標章）、碳足跡標籤產品、減碳標籤產品，如：搭乘高鐵、汽車租賃、採購電動汽（機）車、腳踏車等，另外亦包括國外之環保標章產品與臺灣簽訂相互承認協議之對象國、能源之星、FSC、PEFC永續林業標章（國外標章產品需檢附佐證資料）等。
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

export default withRouter(GreenPurchaseIntroPriEnterprises);
