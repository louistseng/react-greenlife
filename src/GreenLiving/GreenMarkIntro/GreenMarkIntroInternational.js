import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import globalecolabelling from '../../images1/greenLiving/1-1-5_1a.jpg';
import globalGreenMarkOrgMap from '../../images1/greenLiving/1-1-5_1b.jpg';
import approvalWorldGreenMark from '../../images1/greenLiving/1-1-5_2.jpg';
import greenMarkCriteria from '../../images1/greenLiving/1-1-5_3.jpg';
import markAustralia from '../../images1/greenLiving/Mark/Mark_Australia.jpg';
import markCanada from '../../images1/greenLiving/Mark/Mark_Canada.jpg';
import markCzech from '../../images1/greenLiving/Mark/Mark_Czech.jpg';
import markJapan from '../../images1/greenLiving/Mark/Mark_Japan.jpg';
import markKorea from '../../images1/greenLiving/Mark/Mark_Korea.jpg';
import markNewZealand from '../../images1/greenLiving/Mark/Mark_NewZealand.jpg';
import markPhilippines from '../../images1/greenLiving/Mark/Mark_Philippines.jpg';
import markThailand from '../../images1/greenLiving/Mark/Mark_Thailand.jpg';
import markUkraine from '../../images1/greenLiving/Mark/Mark_Ukraine.png';
import markUSA from '../../images1/greenLiving/Mark/Mark_USA.jpg';
import '../../GreenProduct.scss';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroInternational(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【環保標章介紹】國際交流" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="國際交流" /></div>
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroFirst`}><div className="col-12 col-md-6 col-lg-12">環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroSecond`}><div className="col-12 col-md-6 col-lg-12">第二類環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroDeclarations`}><div className="col-12 col-md-6 col-lg-12">環保標章產品<br />正確環境宣告方式</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroHistory`}><div className="col-12 col-md-6 col-lg-12">推動歷程及成果</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroInternational`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">國際交流</div></Link>
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>國際交流</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    自從德國於1978年成立全球第一個藍天使環保標章，綠色生產與消費逐漸成為推動與續發展工作的重要環節，而經過各界長期努力，聯合國於2015年9月通過採納17項永續發展目標(SDG)中， 亦已將「負責任生產與消費」納入為推動永續發展之全球目標與工具，是故目前各國政府機構與民間組織為推動綠色消費與生產，紛紛大力推動政府與民間企業之綠色標章與採購倡議。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    我國自民國81年起推動環保標章制度，並積極與外國環保標章組織交流互動，引進國際最新趨勢並與各國組織交流推動經驗。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    民國83年由全球主要二十餘個環保標章組織聯合組成的全球環保標章網路組織（Global Ecolabelling Network，簡稱GEN）正式成立，我國為創始會員國之一，陸續推動全球環保標章組織之相互合作， 而我國環保標章執行單位于寧博士與陳靖原總經理，亦曾分別擔任該組織之主席與董事。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    由於環境保護議題日益重視，全球綠色商機與日俱增，各國環保標章影響力隨之提升，產品跨國銷售造成之跨國性環保查驗機制需求增加。雖然許多國家都已建立環保標章或類似制度， 但由於各國法規、天然環境、風俗文化與民生條件差異，各國訂定之規格標準與驗證方式皆不相同，若廠商重複於各國進行環保標章驗證，將大量消耗成本與浪費資源，此對出口導向國家之衝擊尤其明顯。 為因應此一挑戰，環保署致力於環保標章國際交流工作，建立與各國相互承認或合作機制，並持續參與全球環保標章網路組織活動，與各國環保標章組織密切交流。
                                </p>
                                <div className="text-center"><a href="https://globalecolabelling.net/" title="全球環保標章網路組織(在新視窗開啟鏈結)" target="_blank"><img src={globalecolabelling} className="w-100" alt="全球環保標章網路組織" /></a></div>
                                <div className="text-center">
                                    <img src={globalGreenMarkOrgMap} className="w-100" alt="" />
                                    <p>圖一、全球環保標章網路組織分佈圖</p>
                                </div>
                                <p className="pt-3 mb-2 text-indent">
                                    民國84年9月起我國環保標章計畫開始與加拿大的環境選擇計畫(目前已由北美UL環境公司接手執行)進行中加雙邊合作，探討雙方相互承認合作之可能性，並於84年10月簽署合作備忘錄， 為國際環保標章合作努力的目標之一，此為全球環保標章網路組織的第一個相互承認案例，其成果深獲國際認同。之後我國陸續美國、泰國、韓國、澳大利亞、日本、紐西蘭、烏克蘭、捷克及菲律賓等國完成相互承認協議之簽署， 有利於減少不必要之貿易障礙，俾利綠色產品之國際流通。
                                </p>
                                <div className="text-center">
                                    <img src={approvalWorldGreenMark} className="w-100" alt="" />
                                    <p>圖二、我國歷年簽訂相互承認協議之對象國示意圖</p>
                                </div>
                                <div className="marginTop">
                                    <p className="text-center">表一、我國歷年簽訂互相承認協議之對象國互相承認方式與範圍</p>
                                    <table className="table-international">
                                        <tr className="table-head-dark">
                                            <th>對象</th>
                                            <th>相互承認方式與範圍</th>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td><img src={markUSA} alt="美國環保標章" title="美國環保標章" /></td>
                                            <td>
                                                <ol>
                                                    <li>雙方互相承認對方代行查證之查核結果。</li>
                                                    <li>證書核發部分：<br />
                                                        <span className="text-indent">(1)若雙方之規格標準與查證要求皆相同，可直接換證無需再行查核。</span><br />
                                                        <span className="text-indent">(2)若雙方之規格近似但有差異時，若差異項目為與產品無關之生產過程及方法（non-product related Process and Production Method, npr-PPM）事項，則依對方標準認可。</span><br />
                                                        <span className="text-indent">(3)若差異項目涉及產品之使用或廢棄，仍須符合發證方要求。</span>
                                                    </li>
                                                </ol>
                                            </td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td><img src={markJapan} alt="日本環保標章" title="日本環保標章" /></td>
                                            <td>雙方互相承認對方代行查證之查核結果，然相關查證應遵循發證方之標準與查證方式執行。</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td><img src={markNewZealand} alt="紐西蘭環保標章" title="紐西蘭環保標章" /></td>
                                            <td>雙方互相承認對方代行查證之查核結果，然相關查證應遵循發證方之標準與查證方式執行。</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td><img src={markAustralia} alt="澳洲環保標章" title="澳洲環保標章" /></td>
                                            <td>雙方互相承認對方代行查證之查核結果，然相關查證應遵循發證方之標準與查證方式執行。</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td><img src={markThailand} alt="泰國環保標章" title="泰國環保標章" /></td>
                                            <td><ol>
                                                <li>雙方互相承認對方建議之檢測實驗室。</li>
                                                <li>雙方互相承認對方代行查證之查核結果，惟相關查證結果於發證前仍須經發證方認可。</li>
                                            </ol></td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td><img src={markCanada} alt="加拿大環保標章" title="加拿大環保標章" /></td>
                                            <td><ol>
                                                <li>雙方互相承認對方代行查證之查核結果。</li>
                                                <li>證書核發部分：<br />
                                                    <span className="text-indent">(1)若雙方之規格標準與查證要求皆相同，可直接換證無需再行查核。</span><br />
                                                    <span className="text-indent">(2)若雙方之規格近似但有差異時，若差異項目為與產品無關之生產過程及方法（non-product related Process and Production Method, npr-PPM）事項，則依對方標準認可。</span><br />
                                                    <span className="text-indent">(3)若差異項目涉及產品之使用或廢棄，仍須符合發證方要求。</span>
                                                </li>
                                            </ol></td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td><img src={markKorea} alt="韓國環保標章" title="韓國環保標章" /></td>
                                            <td><ol>
                                                <li>雙方互相承認對方為代驗證機構，然相關查證應遵循發證方之標準與查證方式執行。</li>
                                                <li>雙方互相承認對方建議之檢測實驗室。</li>
                                            </ol></td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td><img src={markUkraine} alt="烏克蘭環保標章" title="烏克蘭環保標章" /></td>
                                            <td><ol>
                                                <li>我方承認並接受烏克蘭naau執行測試之測試結果。</li>
                                                <li>烏克蘭接受我方建議實驗室之測試結果。</li>
                                                <li>雙方互相承認對方為代驗證機構，然相關查證應遵循發證方之標準與查證方式執行。</li>
                                            </ol></td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td><img src={markCzech} alt="捷克環保標章" title="捷克環保標章" /></td>
                                            <td>雙方互相承認對方為代驗證機構，然相關查證應遵循發證方之標準與查證方式執行。</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td><img src={markPhilippines} alt="菲律賓環保標章" title="菲律賓環保標章" /></td>
                                            <td>雙方互相承認對方為代驗證機構，然相關查證應遵循發證方之標準與查證方式執行。</td>
                                        </tr>
                                    </table>
                                </div>
                                <p className="pt-3 mb-2 text-indent">
                                    除前述雙邊相互承認協議外，我國環保標章執行單位于寧博士於擔任GEN主席期間，提出全球同步之全球環保標章網路組織標誌系統（Global Ecolabelling Network International Coordinated Ecolabelling System， 簡稱GENICES）構想，目前已成為全球環保標章網路組織之最重要政策之一。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    GENICES基本精神在於透過GEN董事針對各會員組織執行同行評鑑（peer review），依據ISO 14024與ISO/IEC Guide 65兩項標準，確認會員之標章具獨立公正性、已建立品質管理系統及符合第一類環保標章制度， 針對通過評鑑之會員發予證書證明其驗證流程與品質符合要求。此一證明可以有效解決歷年推動相互承認業務時，因相互承認雙方不瞭解對方驗證流程與品質，所造成之信任缺乏問題。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    目前已有包含我國在內之超過三十個GEN會員組織通過GENICES同行評鑑，通過之會員並已於2017年斯德哥爾摩GEN年會簽署合作意願書，透過GENICES同行評鑑制度持續擴大推動GEN會員組織間之合作。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    由於我國推行環保標章制度時間長久，全球而言屬於德國藍天使標章後之第二波推動國家，約略與歐盟、加拿大及日本環保標章同時期開始，且我國與美、加、日本、歐盟等國環保標章組織共同為組織GEN之倡議國， 故於國際間原本即為活動力較強之主要會員國家。此外，我國環保標章與政府綠色採購成效卓著，為全球第一個以法律推動機關綠色採購之國家，近年來每年驗證產品數皆超過千件，依據2020年全球環保標章網路組織(GEN)統計，我國有效之規格標準項目達128項，為全球第二。(如下圖)
                                </p>
                                <div className="text-center">
                                    <img src={greenMarkCriteria} className="w-100" alt="環保標章規格標準數量領先國家示意圖" title="環保標章規格標準數量領先國家示意圖" />
                                    <p>圖三、環保標章規格標準數量領先國家示意圖</p>
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

export default withRouter(GreenMarkIntroInternational);
