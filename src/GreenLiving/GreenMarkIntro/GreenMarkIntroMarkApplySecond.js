import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import greenMarkLogo from '../../images1/greenLogo.gif';
import greenMarkSecondLogo from '../../images1/greenLogo2.png';
import secondMarkImg1 from '../../images1/greenLiving/1-1-2.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApplySecond(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】環保標章共通文件" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="環保標章共通文件" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="col-12 col-md-6 col-lg-12">申請作業要點<br />、規格標準</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFirst`}><div className="col-12 col-md-6 col-lg-12">申請驗證流程</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySecond`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">環保標章共通文件</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyThird`}><div className="col-12 col-md-6 col-lg-12">標章申請費用</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFourth`}><div className="col-12 col-md-6 col-lg-12">產品驗證與單位</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div className="col-12 col-md-6 col-lg-12">服務類申請懶人包</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 div-flex topbtn justify-content-between">
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div>環保標章申請資訊與指引</div></Link>
                                <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div>服務類申請指引</div></Link>
                            </div>
                            <div className="col-12 greenbar">
                                <h1>基本條件及應備文件</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    環保署所核發的環保標章及第二類環保標章，為「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」規範之環境保護產品，係指商品或服務其原料取得、生產、銷售、使用及廢棄，符合減量、 可重覆使用、可回收再利用、低污染、省能源、省資源或對環境友善等特性，申請類型如下：
                                </p>
                                <table className="table-small-text">
                                    <tr className="table-head-dark">
                                        <th style={{ width: "15em" }}>種類</th>
                                        <th style={{ width: "15em" }}>定義</th>
                                        <th>環保特性</th>
                                        <th>標章圖樣</th>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>第一類環境保護產品<br />(簡稱環保標章產品)</td>
                                        <td>產品經認定符合本署公告之環保標章規格標準項目，並取得環保標章使用證書者。</td>
                                        <td>產品規格標準(<Link to={`/categories/GreenSpecificationSearch`} target="_blank" title="第一類環境保護產品標章圖樣(在新視窗開啟鏈結)">查詢</Link>)</td>{/*<a href="https://greenliving.epa.gov.tw/newPublic/GreenMark/Search" target="_blank">查詢</a>*/}
                                        <td><img src={greenMarkLogo} className="green-mark-img" alt="第一類環境保護產品標章圖樣" /></td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>第二類環境保護產品<br />(簡稱第二類環保標章產品)</td>
                                        <td>非屬本署公告之環保標章規格標準項目，但產品經認定符合本署公告之第二類環保標章環境訴求評定基準，並取得第二類環保標章使用證書者。</td>
                                        <td>第二類環保標章環境訴求評定基準(<a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=348" target="_blank" title="第二類環境保護產品標章圖樣(在新視窗開啟鏈結)">下載PDF文件</a>)</td>
                                        <td><img src={greenMarkSecondLogo} className="green-mark-img" alt="第二類環境保護產品標章圖樣" /></td>
                                    </tr>
                                </table>
                                <p className="pt-3 mb-2 text-indent">
                                    廠商申請時，除產品具有環保特性之環保優越性外，必須為合法公司，且生產廠場或服務場所應具環保法守法性，基本條件如下圖：
                                </p>
                                <div className="text-center"><img src={secondMarkImg1} className="w-100" alt="申請標章應符合之條件" /></div>

                                <table className="table-small-text">
                                    <tr className="table-head-dark">
                                        <th>條件</th>
                                        <th>規定</th>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>合法公司登記及工廠登記</td>
                                        <td>符合相關目的事業主管機關規定並取得登記。</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>生產廠場或服務場所之環保守法性</td>
                                        <td>
                                            <ol>
                                                <li>申請日前一年內生產廠場或服務場所未曾受到各級環境保護機關按日連續處罰、停工、停業、勒令歇業、撤銷許可證等處分或移送刑事偵查。</li>
                                                <li>申請日前一年內生產廠場或服務場所未因違反同一環保法規遭各級環境保護機關處分次數逾二次，或違反不同環保法規遭各級環境保護機關處分總次數逾四次，且未發生重大公害糾紛事件。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>生產實績</td>
                                        <td>申請環保標章或第二類環保標章者，該產品應有生產之實績。</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>生產製程、原料使用及品質控制機制等符合規定</td>
                                        <td>現場查核確定產品生產製程、原料使用及品質控制機制等符合規定。</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>品質符合國家標準及相關法令規定</td>
                                        <td>
                                            <ol>
                                                <li>產品項目已訂有國家標準者，應先取得測試合格證明文件或經濟部標準檢驗局核發之正字標記。</li>
                                                <li>產品品質、成分、運作、安全性及標示等應符合相關法規規定，且產品及製程運作不得使用本署公告列管毒性化學物質及蒙特婁議定書管制物質。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>產品環保性</td>
                                        <td>
                                            <ol>
                                                <li>環保標章產品:產品經認定符合本署公告之環保標章規格標準項目。</li>
                                                <li>第二類環保標章產品:非屬本署公告之環保標章規格標準項目，但產品經認定符合本署公告之第二類環保標章環境訴求評定基準。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>產品包裝材環保性</td>
                                        <td>產品使用包裝材質應符合下列規定：
                                            <ol>
                                                <li>使用塑膠包裝材質者，不得使用聚氯乙烯（PVC）塑膠或其他鹵化塑膠。</li>
                                                <li>產品出貨使用包裝紙箱者，應為回收紙混合率80%以上製成，或使用環保標章包裝紙箱。</li>
                                                <li>產品包裝材質製程中，不得使用蒙特婁議定書管制物質。</li>
                                            </ol></td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>其他事項</td>
                                        <td>未有其他本署綠色消費暨環境保護產品審議會決議之限制事項。
                                            <ol><li>「環保標章產品暫時不予受理奈米製程之相關產品申請案」。</li></ol></td>
                                    </tr>
                                </table>
                                <p className="pt-3 mb-2 text-indent text-bolder">
                                    廠商申請應備的文件：
                                </p>
                                <ol>
                                    <li>已用印申請書。</li>
                                    <li>已用印申請切結書及其相關說明資料。</li>
                                    <li>公司登記、商業登記或其他相關設立許可、登記、執照之證明文件。</li>
                                    <li>工廠登記證明文件，但依法得免除工廠登記者，應檢附主管機關之證明文件；生產廠場位於境外者，應檢附經我國駐外相關單位文書驗證之事業登記相關證明文件。</li>
                                    <li>經生產廠場、服務場所所在地直轄市或縣(市)環境保護機關出具符合本署環境保護產品申請審查作業規範第三點第一款及第二款之證明文件。證明文件出具日及公告資料查詢日，應以申請日前三個月內為期限。</li>
                                    <li>境外生產廠場應檢具產製該產品所在國有關機關出具申請日前一年內，未受重大污染處分紀錄之證明文件，並經我國駐外相關單位或其他外交部授權機構驗證。證明文件出具日及公告資料查詢日，應以申請日前一年內為期限。</li>
                                    <li>符合國家標準證明文件。但國家標準管制項目如國內無實驗室可執行檢測者，得免檢測。</li>
                                    <li>產品符合環保標章規格標準或第二類環保標章環境訴求評定基準之必要證明文件。</li>
                                    <li>產品基本資料、產品規格、銷售通路資訊及標章標示方式等。</li>
                                    <li>代理國內(外)產品之申請廠商，需檢附獨家代理文件。</li>
                                    <li>產品宣傳推廣計畫。</li>
                                </ol>
                                <p className="pt-3 mb-2 text-indent text-bolder">
                                    *注意事項：
                                </p>
                                <ol>
                                    <li>以檢測報告為證明文件者，應委託該檢測項目業經認證之專業檢測機構出具申請日前一年內（申請廠商送驗者）或二年內（零附件、配件或材料商送驗者）完成之檢測報告。</li>
                                    <li>產品塑膠件符合塑膠件檢測判定方式，且該原物料之材質、供應商及顏色皆與檢測報告之樣品相同者，該檢測報告出具日如在申請日前3年內，可作為替代相關項目之證明文件。</li>
                                    <li>產品使用之零附件、配件或材料經本署認定為環保標章產品或第二類環保標章產品者，可檢附其證書影本與採購證明，以替代相關項目之證明文件。</li>
                                    <li>第一點所稱經認證之專業檢測機構，係指經本署、財團法人全國認證基金會、當地國已簽署國際實驗室認證聯盟(ILAC)或亞太認證聯盟(APAC)相互承認協議之認證機構及國內政府機關等認證通過之檢測機構。 但申請時尚無經認證之檢測機構者，得經本署通過實驗室檢測項目登錄認可之機構出具同內容之檢測報告。</li>
                                    <li>產品原屬環境保護產品，經抽驗或現場查核發現品質不符合環保標章規格標準或第二類環保標章環境訴求評定基準，經本署依本署綠色消費暨環境保護產品推動使用作業要點第二十三點廢止環保標章或 第二類環保標章使用權之授與，廠商如就同一產品重新提出申請，應就原抽驗或現場查核發現品質不合格事項，檢附改善完成符合環保標章規格標準或第二類環保標章環境訴求評定基準之證明文件。</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroMarkApplySecond);
