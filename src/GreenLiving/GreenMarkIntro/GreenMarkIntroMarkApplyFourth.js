import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApplyFourth(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】產品驗證與單位" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="產品驗證與單位" /></div>
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="col-12 col-md-6 col-lg-12">申請作業要點<br />、規格標準</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFirst`}><div className="col-12 col-md-6 col-lg-12">申請驗證流程</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySecond`}><div className="col-12 col-md-6 col-lg-12">環保標章共通文件</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyThird`}><div className="col-12 col-md-6 col-lg-12">標章申請費用</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFourth`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">產品驗證與單位</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div className="col-12 col-md-6 col-lg-12">服務類申請懶人包</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 div-flex topbtn justify-content-between">
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div>環保標章申請資訊與指引</div></Link>
                                <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div>服務類申請指引</div></Link>
                            </div>
                            <div className="col-12 greenbar">
                                <h1>驗證機構及其他相關單位聯絡資訊</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="talbe-gray-border table-fixed table-break" style={{ margin: "auto" }}>
                                    <tr className="table-head-dark text-center">
                                        <th scope="col" colSpan="2">諮詢項目</th>
                                        <th scope="col" style={{ width: "12em" }}>單位名稱</th>
                                        <th scope="col" style={{ width: "10em" }}>統編</th>
                                        <th scope="col" style={{ width: "10em" }}>單位電話</th>
                                        <th scope="col" style={{ width: "15em" }}>地址</th>
                                        <th scope="col" style={{ width: "10em" }}>信箱</th>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td rowSpan="5" style={{ width: "7em" }}>環保標章</td>
                                        <td rowSpan="4" style={{ width: "8em" }}>申請與驗證</td>
                                        <td rowSpan="2">財團法人環境與發展基金會</td>
                                        <td>19650192</td>
                                        <td>0800-300-556</td>
                                        <td>新竹縣竹東鎮中興路四段195號52館512室</td>
                                        <td>sherry@edf.org.tw</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="4">
                                            環境與發展基金會（以下簡稱本會）係於民國86年由工業技術研究院捐助，以技術轉移方式設立之環保專業團體。 本會核心價值為專業執行環保驗證與推廣綠色消費之單位。自1997年起，即持續受環保署委託，辦理環保標章之審查驗證作業及規格標準之研擬作業。熟悉環保標章相關法規、規格標準、審查驗證等相關程序及作業。 本會為全球環保標章網路組織(Global Ecolabelling Network, GEN)創始會員。與多國簽訂相互承認協議，依各國環保標章組織之相互協議，協助廠商申請其他國家之環保標章。 詳情請至本會網站查詢：http:/www.edf.org.tw
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td rowSpan="2">財團法人台灣商品檢測驗證中心</td>
                                        <td>14101850</td>
                                        <td>(03)328-0026#139</td>
                                        <td>桃園市龜山區文明路29巷8號</td>
                                        <td>lily@etc.org.tw</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="4">
                                            財團法人台灣商品檢測驗證中心(TTC)[原名：財團法人台灣電子檢驗中心(ETC)]之前身為工業技術研究院電子工業研究所所屬之電子檢驗服務組，1983年在經濟部和台灣區電機電子工業同業公會的推動下，成立了財團法人台灣電子檢驗中心。 中心之宗旨為提供檢驗與發證之服務，發展品管與檢驗技術，促進產業之進步與繁榮，並謀求其公益。本中心員工數超過300人，包含電子、電機、機械、化工、材料、環保、醫工….等各領域之專業技術人力資源。 本中心提供廣泛領域之服務包含：儀器校正、產品安全測試、電磁相容(EMC)測試、通信產品測試、環境可靠度試驗、環保與節能標章測試、綠色產品測試、連接器測試、LED照明產品測試、光學產品測試、醫療器材測試 、法定度量衡器檢定、天線特性測試與研發。另外，在管理系統輔導方面包含：品質、環保、工安、醫療、智慧財產權、碳排放….等。 中心除了提供多元化之產品檢測服務外，也朝向驗證機構發展，本中心是最早獲得國家通訊傳播委員會(NCC)及經濟部標準檢驗局(BSMI)授權核發產品驗證證書之驗證機構， 於2012年11月更取得環保署環境保護產品驗證機構 ，可以提供核發環保標章之服務。
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>系統操作</td>
                                        <td>環資國際有限公司</td>
                                        <td colSpan="4">(02)2361-1999#438</td>
                                    </tr>
                                </table>
                            </div>

                            <div className="col-12 greenbar">
                                <h2>檢測機構資訊</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="talbe-gray-border" style={{ width: "100%", lineHeight: "2em" }}>
                                    <tr className="table-head-dark text-center">
                                        <th>檢測機構</th>
                                        <th>實驗室</th>
                                        <th>聯絡方式</th>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>台灣檢驗科技股份有限公司</td>
                                        <td>超微量工業安全實驗室</td>
                                        <td>02-2299-3279#3133</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>全國公證檢驗股份有限公司</td>
                                        <td>化學與微生物實驗室</td>
                                        <td>02-6602-2888#220 #224 #234</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>財團法人台灣商品檢測驗證中心</td>
                                        <td>環境保護與工業安全衛生部</td>
                                        <td>03-327-6189</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td>財團法人台灣大電力研究試驗中心</td>
                                        <td>電器試驗處</td>
                                        <td>03-483-9090#7113</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td>財團法人塑膠工業技術發展中心</td>
                                        <td>分析技術部</td>
                                        <td>04-2359-5900#622 #526 #580</td>
                                    </tr>
                                </table>
                                <p className="pt-3 mb-2">
                                    ※申請環境保護產品委託經認證之專業檢測機構，以經<span className="text-bolder">本署、財團法人全國認證基金會、當地國已簽署國際實驗室認證聯盟(ILAC)或亞太認證聯盟(APAC) 相互承認協議之認證機構及國內政府機關等認證通過</span>最新資訊為主，國內經認證專業檢測機構相關查詢網址如下：
                                </p>
                                <ol className="list-none">
                                    <li><a href="https://www.taftw.org.tw/directory/scheme/testLab/list/" target="_blank" title="財團法人全國認證基金會(TAF)(在新視窗開啟鏈結)">(1) 財團法人全國認證基金會(TAF)</a></li>
                                    <li><a href="https://www.epa.gov.tw/niea/491FE6F691D6687E" target="_blank" title="行政院環境保護署環境檢驗所(在新視窗開啟鏈結)">(2) 行政院環境保護署環境檢驗所</a></li>
                                    <li><Link to={`/greenLabel/GreenMarkIntroLabApprovedList`} title="環保署審議委員認可清單">(3) 環保署審議委員認可清單</Link></li>
                                </ol>
                                <p className="pt-3 mb-2">
                                    ※環保標章產品項目中，<span className="text-bolder">80塗料/25家用清潔劑/68肌膚毛髮清潔劑/130工商業用清潔劑/50回收再利用碳粉匣 /84生物可分解塑膠</span>，共6項產品， 產品成分檢測時，應由申請廠商會同<span className="text-blue">本署登錄之檢測機構(經認證之專業檢測機構)</span>派員，於該類產品銷售場所進行隨機採樣；必要時，得由環保署派員會同至生產場所進行採樣。
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

export default withRouter(GreenMarkIntroMarkApplyFourth);
