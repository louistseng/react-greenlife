import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApplyThird(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】標章申請費用" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="標章申請費用" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="col-12 col-md-6 col-lg-12">申請作業要點<br />、規格標準</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFirst`}><div className="col-12 col-md-6 col-lg-12">申請驗證流程</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySecond`}><div className="col-12 col-md-6 col-lg-12">環保標章共通文件</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyThird`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">標章申請費用</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFourth`}><div className="col-12 col-md-6 col-lg-12">產品驗證與單位</div></Link>
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
                                <h1>費用</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <ol>
                                    <li>新申請、展延並換發新證申請、變更申請使用標章之廠商，應向驗證機構繳交審查費及工廠查核費等相關費用。(驗證機構資訊查詢)。</li>
                                    <li>經審查通過廠商，由驗證機構代為收取證書費(代收公文證明)， 每月交向本署完成繳交證書費後(詳證書費規費辦法)，繳費確認後3日，由驗證機構寄發證書及證書收據。</li>
                                </ol>
                                <table className="table-small-text talbe-gray-border">
                                    <tr className="table-head-dark">
                                        <th style={{ width: "5em", textAlign: "center" }}>編號</th>
                                        <th style={{ width: "6em", textAlign: "center" }}>項目代號</th>
                                        <th style={{ textAlign: "center" }}>收費項目</th>
                                        <th>財團法人環境與發展基金會</th>
                                        <th>財團法人台灣商品檢測驗證中心</th>
                                    </tr>
                                    {/* One Row */}
                                    <tr className="table-row-light">
                                        <td rowSpan="4">1</td>
                                        <td rowSpan="2">001-1</td>
                                        <td rowSpan="2">環保標章申請審查費</td>
                                        <td>20,000元</td>
                                        <td>20,000元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">
                                            <ol>
                                                <li>新申請與換發申請均同。</li>
                                                <li>同案每增加一件產品增加1,000元驗證費，每增加一件系列產品增加500元。</li>
                                                <li>新公告產品規格標準自公告日起 6個月內提出環保標章申請案之前 3家廠商( 1廠商僅限申請 1案不得重複)，免環保標章申請審查費。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td rowSpan="2">001-2</td>
                                        <td rowSpan="2">環保標章申請審查費(EPEAT)</td>
                                        <td>16,000元</td>
                                        <td>16,000元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">
                                            <ol>
                                                <li>新申請與換發申請均同。</li>
                                                <li>同案每增加一件產品增加1,000元，每增加一件系列產品增加500元。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    {/* One Row */}
                                    <tr className="table-row-dark">
                                        <td rowSpan="4">2</td>
                                        <td rowSpan="2">002-1</td>
                                        <td rowSpan="2">環保標章國內現場查核費</td>
                                        <td>8,500元</td>
                                        <td>8,500元</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td colSpan="2">以一廠址計，含變更申請之現場查核作業</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td rowSpan="2">002-2</td>
                                        <td rowSpan="2">環保標章國內遠端查核費</td>
                                        <td>7,000元</td>
                                        <td>7,000元</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td colSpan="2">以一廠址計，含變更申請之遠端查核作業</td>
                                    </tr>
                                    {/* One Row */}
                                    <tr className="table-row-light">
                                        <td rowSpan="4">3</td>
                                        <td rowSpan="2">003-1</td>
                                        <td rowSpan="2">第二類環保標章新申請之審查費</td>
                                        <td>30,000元</td>
                                        <td>30,000元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">
                                            <ol>
                                                <li>同案每增加一件產品增加1,000元，每增加一件系列產品增加500元。</li>
                                                <li>包含聘請三位委員審查費用。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td rowSpan="2">003-2</td>
                                        <td rowSpan="2">第二類環保標章產品展延申請之審查費</td>
                                        <td>20,000元</td>
                                        <td>20,000元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">同案每增加一件產品增加1,000元，每增加一件系列產品增加500元。</td>
                                    </tr>
                                    {/* One Row */}
                                    <tr className="table-row-dark">
                                        <td rowSpan="8">4</td>
                                        <td rowSpan="2">004-1</td>
                                        <td rowSpan="2">第二類環保標章新申請之國內現場查核費</td>
                                        <td>26,000元</td>
                                        <td>26,000元</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td colSpan="2">
                                            <ol>
                                                <li>以一廠址計。</li>
                                                <li>包含聘請三位委員現場查核及交通費用。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td rowSpan="2">004-2</td>
                                        <td rowSpan="2">第二類環保標章展延申請之國內現場查核費</td>
                                        <td>8,500元</td>
                                        <td>8,500元</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td colSpan="2">以一廠址計。</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td rowSpan="2">004-3</td>
                                        <td rowSpan="2">第二類環保標章新申請之國內遠端查核費</td>
                                        <td>22,000元</td>
                                        <td>22,000元</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td colSpan="2">
                                            <ol>
                                                <li>以一廠址計。</li>
                                                <li>包含聘請三位委員遠端查核費用。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td rowSpan="2">004-4</td>
                                        <td rowSpan="2">第二類環保標章展延申請之國內遠端查核費</td>
                                        <td>7,000元</td>
                                        <td>7,000元</td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td colSpan="2">以一廠址計。</td>
                                    </tr>
                                    {/* One Row */}
                                    <tr className="table-row-light">
                                        <td rowSpan="6">5</td>
                                        <td rowSpan="2">005-1</td>
                                        <td rowSpan="2">變更申請審查費(A)</td>
                                        <td>0元</td>
                                        <td>0元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">包括產品名稱、公司名稱(含公司合併、切割等)、工廠名稱、地址(因行政區名或街道名調整)或其他明顯因文件誤繕等事項之變更。</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td rowSpan="2">005-2</td>
                                        <td rowSpan="2">變更申請審查費(B)</td>
                                        <td>4,000元</td>
                                        <td>4,000元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">
                                            <ol>
                                                <li>包括登錄之生產廠場間產品轉換、產品功能規格、產品申請佐證之證書文件、標章標示位置、圖文設計及包裝容器等事項之變更。</li>
                                                <li>每增加一證書證號之產品變更增加100元。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td rowSpan="2">005-3</td>
                                        <td rowSpan="2">變更申請審查費(C)</td>
                                        <td>10,000元</td>
                                        <td>10,000元</td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td colSpan="2">
                                            <ol>
                                                <li>包括生產廠場地址、服務場所地址、產品型號、產品外觀、使用材質、產品特性、生產流程或系列產品登錄等事項之變更。</li>
                                                <li>每增加一證書證號之產品變更增加500元。</li>
                                            </ol>
                                        </td>
                                    </tr>
                                    {/* One Row */}
                                    <tr className="table-row-dark">
                                        <td>6</td>
                                        <td>006</td>
                                        <td>證書費</td>
                                        <td colSpan="2">新申請、換發及補發：500元/件<br />證書登錄基本資料變更：100元/件</td>
                                    </tr>
                                </table>
                                <br />
                                <p className="pt-3 mb-2 text-bolder text-underline">
                                    環保標章及第二類環保標章產品驗證機構驗證審查作業收費基準
                                </p>
                                <ol>
                                    <li>依據本署107年6月6日函頒「行政院環境保護署環境保護產品驗證機構管理要點」第20點規定：「驗證機構辦理驗證得收取費用，其收費項目及數額，應報本署核准。」辦理。</li>
                                    <li>有關驗證機構提報之「環保標章及第二類環保標章產品驗證審查作業收費基準」業經本署於108年1月8日環署管字第1080002012號函、1080002012A號函核准在案， <span className="text-red">並自108年7月1日生效</span> (如附件1、2)，<span className="text-red">於生效日前仍依本署104年11月18日核准之收費標準辦理</span>。</li>
                                    <li style={{ listStyleType: "none" }}>附件1： <a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=471`} target="_blank" title="環發會收費基準--108年1月8日環署管字第1080002012號函核准.PDF(在新視窗開啟鏈結)">環發會收費基準--108年1月8日環署管字第1080002012號函核准.PDF</a></li>
                                    <li style={{ listStyleType: "none" }}>附件2： <a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=472`} target="_blank" title="電檢中心收費基準--108年1月8日環署管字第1080002012A號函核准.PDF(在新視窗開啟鏈結)">電檢中心收費基準--108年1月8日環署管字第1080002012A號函核准.PDF</a></li>
                                </ol>
                                <p className="pt-3 mb-2">
                                    證書費代收：經驗證機構審查通過之廠商，直接向原驗證機構繳交證書費，驗證機構將於確認收到證書費三日內寄發證書及收據，並於每月造冊繳回證書費。
                                </p>
                                <br />
                                <p className="pt-3 mb-2">
                                    行政院環境保護署環境保護產品證書規費收費標準中華民國101 年12 月12 日行政院環境保護署環署管字第1010110642 號令訂定發布全文四條
                                </p>
                                <ol className="list-none">
                                    <li>第一條 本標準依規費法第十條第一項規定訂定之。</li>
                                    <li>第二條 環境保護產品證書之核發，應依下列規定收取規費：
                                        <ol className="list-none">
                                            <li>一、新申請、換發及補發案：每件新臺幣五百元。</li>
                                            <li>二、證書登錄基本資料變更：每件新臺幣一百元。</li>
                                        </ol>
                                    </li>
                                    <li>第三條 前條所定規費經繳納後，除有誤繳或溢繳情形，得依規費法相關規定辦理外，不得申請退費。</li>
                                    <li>第四條 本標準自發布日施行。</li>
                                </ol>
                                <p className="pt-3 mb-2">
                                    財團法人環境與發展基金會<br />匯款銀行：土地銀行工研院分行 匯款帳號： 156001000390
                                </p>
                                <p className="pt-3 mb-2">
                                    財團法人台灣商品檢測驗證中心<br />匯款銀行：彰化銀行-林口分行 匯款帳號： 9689-01-222175-00
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

export default withRouter(GreenMarkIntroMarkApplyThird);
