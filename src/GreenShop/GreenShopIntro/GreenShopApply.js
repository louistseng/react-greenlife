import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../GreenLiving/GreenLabel.css'

import greenmark1 from '../../images1/greenLogo.gif';
import greenmark2 from '../../images1/greenLogo2.png';
import carbonlabel from '../../images1/greenShop/carbonLabel.png';
import carbonreduction from '../../images1/greenShop/CarbonReduction.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenShopApply(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="綠色商店申請與管理" /> {/*  */}
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/categories/GreenShopIntro/GreenShopApply`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">綠色商店申請與管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopReview`}><div className="col-12 col-md-6 col-lg-12">綠色商店審核標準及執行程序</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopTrack`}><div className="col-12 col-md-6 col-lg-12">綠色商店追蹤管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopStatistics`}><div className="col-12 col-md-6 col-lg-12">綠色商店歷年新增家數統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>綠色商店申請與管理</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                所謂「綠色商店」，意即該賣場內販售「綠色商品」，而所謂「綠色商品」是指該產品在原料的取得、產品的製造、銷售、使用及廢棄處理過程中，具有可回收、低污染、省資源等功能或理念，並經政府驗證通過取得環保標章 、節能標章、省水標章、綠建材標章及第二類環境保護證明書之產品或服務。此外，為支持廠商進行產品碳足跡盤查，瞭解產品由原料取得、製造、配送銷售、使用及廢棄回收等階段所產生的碳排放量，並找出產品本身 、製程及供應鏈中碳排放減量的機會，甚至檢討產品綠色設計，進一步降低消費者在使用及廢棄回收階段的碳排量，取得減碳標籤驗證之產品，或經設定減碳基線，並於三年內達成宣告減碳承諾者， 經環保署同意減碳標籤使用權之商品，均納入綠色產品範圍。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                凡業者販賣綠色商品且具有合法登記者，皆可至「綠色生活資訊網（https://greenliving.epa.gov.tw/newPublic）」線上申請加入「綠色商店」。綠色商店依有無實體店面區分為實體綠色商店及綠色網路商店， 其次，考量商店服務範圍、分店是否擴及多縣市等條件，實體綠色商店再細分為連鎖型（以縣市及鄉鎮為主要服務範圍，且分店遍及多縣市）及非連鎖型（以鄰里村落為主要服務範圍）二種類型， 此外，若有實體點店面但無實體商品者（即以DM型錄商方式販售產品）其設置規範比照實體綠色商店辦理。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                綠色商店宗旨為便利消費者優先採購綠色商品，並善盡企業社會責任，引領全民綠色消費，推動過程應加強下列工作：
                                </p>
                                <ol className="list-zh">
                                    <li className="pt-3 mb-2">綠色商品導入與管理： 盡可能導入更多綠色商品，讓消費者有更多選擇機會，並考量陳列方式及標示，凸顯綠色商品，方便採購，可參考下列措施確認賣場是否符合要求。
                                        <ol>
                                            <li>引進商品時檢視該商品是否取得下列標章（籤），且注意其證書有效期限，並定期更新綠色生活資訊網販售資訊。
                                                <div className="div-flex-wrap space-evenly">
                                                    <div className="text-center table-small-text">
                                                        <img src={greenmark1} style={{width: "4em"}} alt="第一類環保標章" title="第一類環保標章" />
                                                        <p>第一類環保標章</p>
                                                    </div>
                                                    <div className="text-center table-small-text">
                                                        <img src={greenmark2} style={{width: "4em"}} alt="第二類環境保護產品" title="第二類環境保護產品" />
                                                        <p>第二類環境保護產品</p>
                                                    </div>
                                                    <div className="text-center table-small-text">
                                                        <img src={carbonlabel} style={{width: "6em"}} alt="碳足跡標籤（碳標籤）" title="碳足跡標籤（碳標籤）" />
                                                        <p>碳足跡標籤<br />（碳標籤）</p>
                                                    </div>
                                                    <div className="text-center table-small-text">
                                                        <img src={carbonreduction} style={{width: "5em"}} alt="碳足跡減量標籤（減碳標籤）" title="碳足跡減量標籤（減碳標籤）" />
                                                        <p>碳足跡減量標籤<br />（減碳標籤）</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>以地貼或標誌牌等明顯標示，使消費者容易辨識或尋得綠色商品。</li>
                                            <li>如為「綠色網路商店」，需有綠色商品專區標示。</li>
                                        </ol>
                                    </li>
                                    <li className="pt-3 mb-2">綠色行銷推廣：行銷方式應融入環保概念，不引導過度消費，並提供顧客相關之商品環保特性資訊。</li>
                                    <li className="pt-3 mb-2">賣場環保概念：賣場照明及空調使用節能設備，或有節能相關作法，另包裝盡可能採用無污染、易於回收的材質並適度包裝。</li>
                                    <li className="pt-3 mb-2">綠色消費觀念宣導：賣場應提供顧客綠色消費觀念與綠色商品資訊，可參考下列措施確認賣場是否符合要求。
                                        <ol>
                                            <li>是否提供綠色產品資訊。</li>
                                            <li>員工訓練課程是否包含綠色消費，以便店員向顧客解說綠色消費理念。</li>
                                            <li>賣場是否擺設環保宣導資料、海報看板或資訊。</li>
                                        </ol>
                                    </li>
                                    <li className="pt-3 mb-2">參與或辦理環保活動：綠色商店除販賣綠色商品外，應主動參與或配合辦理相關環保活動，以推廣環保觀念，可參考下列措施確認賣場是否符合要求。
                                        <ol>
                                            <li>配合地方環保單位或鄰里村落辦理相關環保活動。</li>
                                            <li>結合員工福利辦理清潔活動或是生態旅遊等活動。</li>
                                            <li>辦理相關講座或實作推廣環保觀念。</li>
                                        </ol>
                                    </li>
                                    <li>資源回收宣導：設置廢棄物回收處，並推廣資源回收。</li>
                                </ol>
                                <br />
                                <a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=218`} target="_blank"><p className="pt-3 mb-2">下載綠色商店設置與執行規範.pdf</p></a>
                                <a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=439`} target="_blank"><p className="pt-3 mb-2">下載綠色商店設置與執行規範文宣手冊.pdf</p></a>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenShopApply);
