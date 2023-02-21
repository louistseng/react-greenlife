import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseIntroEnterprisesPurch(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【民間企業與團體綠色採購】綠色採購申報" />
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="綠色採購申報" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroPriEnterprises`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購申報</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroEnterprisesPurch`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">綠色採購申報</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroPurchasePlan`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體推動綠色採購績優單位</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroPurchaseAchieve`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購成果統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>為什麼要推動民間綠色採購?</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-padding">
                                    (一) 買方要求：國際企業大廠要求其原物料供應商或其上下游廠商皆需依據綠色採購準則執行，並設計或製作符合綠色環保規範之商品。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (二) 降低成本：採購具有環保標章認證之商品，可有效降低成本的開支，以沃爾瑪公司販售永續產品濃縮洗衣劑為例，全美使用3年較一般的洗衣劑共省下9,500萬磅塑膠原料、4.3億加侖的水、52,000加侖的柴油及1.25億磅的瓦楞紙。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (三) 行銷考量：參與綠色採購的企業，配合政府的國家政策，可獲得更多的行政資源向外界行銷及推廣企業本身的文化及塑造良好的型象。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (四) 降低風險：採購具有環保標章的商品，使用壽命長、通過產品的檢測，不含會造成環境污染的物質及不添加不必要的化學品，能夠減少更多的成本開支(如：省水、省電…)。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (五) 法規要求：依據日本綠色採購法提及廠商應提供產品的環保訊息並依據其商業及公民的責任，盡可能多的自覺購買環保產品。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (六) 企業責任：企業社會責任（Corporate Social Responsibility, CSR）觀念早於歐洲至今已有數十年，歐洲企業將CSR內化到企業日常營運、改善溝通與決策透明化、與利害相關者結合、建立綠色供應鏈的合作聯盟，致力於提升競爭力，並有許多企業藉由綠色採購的手法，落實企業社會責任。
                                </p>
                            </div>

                            <div className="col-12 greenbar">
                                <h5>申報誘因</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-padding">
                                    (一) 民間企業及團體採購綠色產品之認定範圍包含我國環保標章、第二類環保標章、節能標章、省水標章、綠建材標章、碳足跡標籤、減碳標籤產品、國外環保標章產品與臺灣簽訂相互承認協議之對象國、能源之星、FSC及PEFC永續林業標章，上述標章產品皆可列入綠色採購統計之範圍。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (二) 採企業「自主管理、誠信申報」的模式，由民間企業及團體自行核算累計之綠色產品採購金額，並上網登錄相關資訊，簡化行政程序。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (三) 申報金額達當年度公布之標準金額以上之民間企業及團體，且當年度1月1日起至12月31日期間符合下述條件者，由環保署辦理公開表揚，表彰其對於環保的貢獻及落實企業社會責任之承諾：
                                    <ol>
                                        <li>未曾受到各級環境保護機關按日連續處罰、停工、停業、勒令歇業、撤銷許可證或移送刑罰等處分。</li>
                                        <li>未因違反各項環保法規（如環評、空、水、廢、毒、噪音、土壤地下水、海洋等）遭環境保護主管機關處分次數逾4次，總次數未逾8次，且未發生重大公害糾紛事件。</li>
                                    </ol>
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (四) 為鼓勵任何規模之民間企業與團體進行綠色採購，申報金額未達當年度公布之標準金額之民間企業及團體得由各縣市環保局酌情表揚，惟仍應考量是否曾違反環保法規相關事宜，以利作為環保表率。
                                </p>
                                <p className="pt-3 mb-2 text-padding">
                                    (五) 當年度公布之標準金額請參考當年度之「推動民間企業與團體實施綠色採購計畫」。
                                </p>
                            </div>

                            <div className="col-12 greenbar">
                                <h5>申報作業</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent text-wrap">
                                    請申報業者至「民間企業及團體綠色採購申報平臺」(<a href={`${SSL}//${domainBackendFormal}/GreenLife/PurChaseRpt/login.aspx`} target="_blank" title="民間企業及團體綠色採購申報平臺(在新視窗開啟鏈結)">https://greenliving.epa.gov.tw/GreenLife/PurChaseRpt/login.aspx</a>)，申報年度綠色採購成果，各年度綠色採購申報期限皆為當年度2月1日至隔年度1月31日。
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

export default withRouter(GreenPurchaseIntroEnterprisesPurch);
