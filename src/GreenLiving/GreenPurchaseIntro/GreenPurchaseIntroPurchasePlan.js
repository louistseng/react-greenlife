import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import './GreenPurchase.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseIntroPurchasePlan(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    //切換頁籤 預設最新年度
    const [showRow, setShowRow] = useState("#tab110");
    const style = {
        collapsed: {
            display: "none"
        },
        expanded: {
            display: ""
        }
    };

    return (
        <>
            <BreadCrumb currentPage="【民間企業與團體綠色採購】民間企業與團體推動綠色採購績優單位" />
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="民間企業與團體推動綠色採購績優單位" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroPriEnterprises`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購申報</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroEnterprisesPurch`}><div className="col-12 col-md-6 col-lg-12">綠色採購申報</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroPurchasePlan`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">民間企業與團體推動綠色採購績優單位</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroPurchaseAchieve`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購成果統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="Tabside text-center">
                                <ul id="link_bar">
                                    <li id="li_110"><a href="#tab110" onClick={() => setShowRow("#tab110")} title="110年度" style={{ background: showRow === "#tab110" && "#ff9408" }}>110年度</a></li>
                                    <li id="li_109"><a href="#tab109" onClick={() => setShowRow("#tab109")} title="109年度">109年度</a></li>
                                    <li id="li_108"><a href="#tab108" onClick={() => setShowRow("#tab108")} title="108年度">108年度</a></li>
                                    <li id="li_107"><a href="#tab107" onClick={() => setShowRow("#tab107")} title="107年度">107年度</a></li>
                                    <li id="li_106"><a href="#tab106" onClick={() => setShowRow("#tab106")} title="106年度">106年度</a></li>
                                    <li id="li_105"><a href="#tab105" onClick={() => setShowRow("#tab105")} title="105年度">105年度</a></li>
                                    <li id="li_104"><a href="#tab104" onClick={() => setShowRow("#tab104")} title="104年度">104年度</a></li>
                                    <li id="li_103"><a href="#tab103" onClick={() => setShowRow("#tab103")} title="103年度">103年度</a></li>
                                    <li id="li_102"><a href="#tab102" onClick={() => setShowRow("#tab102")} title="102年度">102年度</a></li>
                                    <li id="li_101"><a href="#tab101" onClick={() => setShowRow("#tab101")} title="101年度">101年度</a></li>
                                    <li id="li_100"><a href="#tab100" onClick={() => setShowRow("#tab100")} title="100年度">100年度</a></li>
                                    <li id="li_99"><a href="#tab99" onClick={() => setShowRow("#tab99")} title="99年度">99年度</a></li>
                                    <li id="li_98"><a href="#tab98" onClick={() => setShowRow("#tab98")} title="98年度">98年度</a></li>
                                    <li id="li_97"><a href="#tab97" onClick={() => setShowRow("#tab97")} title="97年度">97年度</a></li>
                                    <li id="li_96"><a href="#tab96" onClick={() => setShowRow("#tab96")} title="96年度">96年度</a></li>
                                </ul>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>民間企業與團體推動綠色採購績優單位</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <div className="tab-pane active" style={showRow === "#tab110" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        110年度民間企業團體推動綠色採購績優單位（採購金額逾5仟萬元），經審查符合表揚資格計119家。<br />綠色採購總金額達523億3,715萬0,024元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        申報金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>中華紙漿股份有限公司</td></tr>
                                                <tr><td>台灣汽電共生股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司大林廠</td></tr>
                                                <tr><td>臺灣水泥股份有限公司台北水泥製品廠</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠七期</td></tr>
                                                <tr><td>正隆股份有限公司大園紙器廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十八廠一期</td></tr>
                                                <tr><td>正隆股份有限公司燕巢廠</td></tr>
                                                <tr><td>統一企業股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠四期/五期</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十五B廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td></tr>
                                                <tr><td>台灣富士軟片資訊股份有限公司</td></tr>
                                                <tr><td>環球水泥股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td></tr>
                                                <tr><td>正隆股份有限公司台中廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司三廠</td></tr>
                                                <tr><td>正隆股份有限公司后里分公司</td></tr>
                                                <tr><td>正隆股份有限公司板橋廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司五廠</td></tr>
                                                <tr><td>威剛科技股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十五廠</td></tr>
                                                <tr><td>正隆股份有限公司苗栗廠</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司清水廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司</td></tr>
                                                <tr><td>台灣水泥股份有限公司高雄水泥製品廠台南分廠</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司楊梅廠</td></tr>
                                                <tr><td>台灣水泥股份有限公司高雄水泥製品廠</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td></tr>
                                                <tr><td>台灣水泥股份有限公司台中水泥製品廠</td></tr>
                                                <tr><td>永豐餘工業用紙股份有限公司新屋廠</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十八廠四期</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測三廠</td></tr>
                                                <tr><td>英屬蓋曼群島商金百利克拉克股份有限公司台灣分公司</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司</td></tr>
                                                <tr><td>誠毅紙器股份有限公司</td></tr>
                                                <tr><td>群創光電股份有限公司</td></tr>
                                                <tr><td>黑松股份有限公司</td></tr>
                                                <tr><td>中華汽車工業股份有限公司新竹廠</td></tr>
                                                <tr><td>萬青水泥股份有限公司</td></tr>
                                                <tr><td>中華電信股份有限公司數據通信分公司</td></tr>
                                                <tr><td>台灣化學纖維股份有限公司</td></tr>
                                                <tr><td>漢程汽車客運股份有限公司</td></tr>
                                                <tr><td>中華紙漿股份有限公司台東廠</td></tr>
                                                <tr><td>台灣高速鐵路股份有限公司</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td></tr>
                                                <tr><td>友達光電股份有限公司</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td></tr>
                                                <tr><td>台灣水泥股份有限公司台中水泥製品廠大肚分廠</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td></tr>
                                                <tr><td>小馬國際租賃股份有限公司</td></tr>
                                                <tr><td>中鹿汽車客運股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測二廠</td></tr>
                                                <tr><td>台灣美光記憶體股份有限公司</td></tr>
                                                <tr><td>榮成紙業股份有限公司</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td></tr>
                                                <tr><td>神準科技股份有限公司</td></tr>
                                                <tr><td>西北臺慶科技股份有限公司</td></tr>
                                                <tr><td>聯華電子股份有限公司</td></tr>
                                                <tr><td>台灣水泥股份有限公司高雄水泥製品廠嘉義分廠</td></tr>
                                                <tr><td>三洋窯業股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司大園廠</td></tr>
                                                <tr><td>京元電子股份有限公司竹南分公司</td></tr>
                                                <tr><td>永豐金融控股股份有限公司</td></tr>
                                                <tr><td>台灣塑膠工業股份有限公司</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td></tr>
                                                <tr><td>上銀科技股份有限公司</td></tr>
                                                <tr><td>根基營造股份有限公司</td></tr>
                                                <tr><td>中國人壽保險股份有限公司</td></tr>
                                                <tr><td>星展（台灣）商業銀行股份有限公司</td></tr>
                                                <tr><td>富邦人壽保險股份有限公司</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測六廠</td></tr>
                                                <tr><td>南茂科技股份有限公司</td></tr>
                                                <tr><td>悠旅生活事業股份有限公司</td></tr>
                                                <tr><td>碁富食品股份有限公司</td></tr>
                                                <tr><td>中華電信股份有限公司臺灣北區電信分公司</td></tr>
                                                <tr><td>中華開發金融控股股份有限公司</td></tr>
                                                <tr><td>臺北醫學大學</td></tr>
                                                <tr><td>台灣華可貴股份有限公司楊梅分公司</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司屏東廠</td></tr>
                                                <tr><td>友聯車材製造股份有限公司三義工廠</td></tr>
                                                <tr><td>台新國際商業銀行股份有限公司</td></tr>
                                                <tr><td>采鈺科技股份有限公司</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td></tr>
                                                <tr><td>力晶積成電子製造股份有限公司</td></tr>
                                                <tr><td>遠東百貨股份有限公司</td></tr>
                                                <tr><td>合勤投資控股股份有限公司</td></tr>
                                                <tr><td>合作金庫商業銀行股份有限公司</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td></tr>
                                                <tr><td>欣興電子股份有限公司</td></tr>
                                                <tr><td>資拓宏宇國際股份有限公司</td></tr>
                                                <tr><td>群創光電股份有限公司</td></tr>
                                                <tr><td>花蓮綠動車業</td></tr>
                                                <tr><td>名牌食品股份有限公司</td></tr>
                                                <tr><td>朝陽科技大學</td></tr>
                                                <tr><td>遠龍不銹鋼股份有限公司</td></tr>
                                                <tr><td>南臺科技大學</td></tr>
                                                <tr><td>永大正營造股份有限公司</td></tr>
                                                <tr><td>潤泰精密材料股份有限公司</td></tr>
                                                <tr><td>逢甲大學</td></tr>
                                                <tr><td>台灣美光晶圓科技股份有限公司</td></tr>
                                                <tr><td>兆豐國際商業銀行股份有限公司</td></tr>
                                                <tr><td>總太地產開發股份有限公司台中分公司</td></tr>
                                                <tr><td>第一商業銀行股份有限公司</td></tr>
                                                <tr><td>華盛營建工程股份有限公司</td></tr>
                                                <tr><td>精誠資訊股份有限公司</td></tr>
                                                <tr><td>精誠科技整合股份有限公司</td></tr>
                                                <tr><td>欣亞數位股份有限公司</td></tr>
                                                <tr><td>偉聖紙器工業有限公司</td></tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <div style={{ margin: "0 auto", width: "780px" }}>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane active" style={showRow === "#tab109" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        109年度民間企業團體推動綠色採購績優單位（採購金額逾5仟萬元），經審查符合表揚資格計101家。<br />綠色採購總金額達446億5,486萬5,145元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        申報金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>中華紙漿股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司大林廠</td></tr>
                                                <tr><td>臺灣水泥股份有限公司台北水泥製品廠</td></tr>
                                                <tr><td>遠東新世紀股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠四期/五期</td></tr>
                                                <tr><td>統一企業股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司大園紙器廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十八廠一期</td></tr>
                                                <tr><td>正隆股份有限公司燕巢廠</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td></tr>
                                                <tr><td>正隆股份有限公司板橋廠</td></tr>
                                                <tr><td>台灣富士軟片資訊股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司三廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td></tr>
                                                <tr><td>環球水泥股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司五廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十五B廠</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td></tr>
                                                <tr><td>台灣水泥股份有限公司高雄水泥製品廠台南分廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td></tr>
                                                <tr><td>正隆股份有限公司后里分公司</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td></tr>
                                                <tr><td>台灣水泥股份有限公司高雄水泥製品廠</td></tr>
                                                <tr><td>台灣水泥股份有限公司台中水泥製品廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td></tr>
                                                <tr><td>銘安科技股份有限公司</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司清水廠</td></tr>
                                                <tr><td>中華電信股份有限公司數據通信分公司</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司楊梅廠</td></tr>
                                                <tr><td>永豐餘工業用紙股份有限公司新屋廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十五廠</td></tr>
                                                <tr><td>英屬蓋曼群島商金百利克拉克股份有限公司台灣分公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測三廠</td></tr>
                                                <tr><td>誠毅紙器股份有限公司</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td></tr>
                                                <tr><td>台灣高速鐵路股份有限公司</td></tr>
                                                <tr><td>黑松股份有限公司</td></tr>
                                                <tr><td>萬青水泥股份有限公司</td></tr>
                                                <tr><td>加和紙業股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司台中廠</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td></tr>
                                                <tr><td>台灣水泥股份有限公司台中水泥製品廠大肚分廠</td></tr>
                                                <tr><td>正隆股份有限公司苗栗廠</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封裝廠</td></tr>
                                                <tr><td>中華紙漿股份有限公司台東廠</td></tr>
                                                <tr><td>中華電信股份有限公司臺灣北區電信分公司</td></tr>
                                                <tr><td>台灣水泥股份有限公司高雄水泥製品廠嘉義分廠</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td></tr>
                                                <tr><td>第一商業銀行股份有限公司</td></tr>
                                                <tr><td>聯華電子股份有限公司</td></tr>
                                                <tr><td>桃園航勤股份有限公司</td></tr>
                                                <tr><td>小馬國際租賃股份有限公司</td></tr>
                                                <tr><td>永豐金融控股股份有限公司</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td></tr>
                                                <tr><td>台灣化學纖維股份有限公司</td></tr>
                                                <tr><td>精誠資訊股份有限公司</td></tr>
                                                <tr><td>聚恆科技股份有限公司</td></tr>
                                                <tr><td>中龍鋼鐵股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司大園廠</td></tr>
                                                <tr><td>群創光電股份有限公司</td></tr>
                                                <tr><td>合作金庫商業銀行股份有限公司</td></tr>
                                                <tr><td>惠普股份有限公司國浦廠</td></tr>
                                                <tr><td>京元電子股份有限公司竹南分公司</td></tr>
                                                <tr><td>友聯車材製造股份有限公司三義工廠</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td></tr>
                                                <tr><td>香港商蘋果日報出版發展有限公司台灣分公司</td></tr>
                                                <tr><td>星展（台灣）商業銀行股份有限公司</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td></tr>
                                                <tr><td>悠旅生活事業股份有限公司</td></tr>
                                                <tr><td>榮成紙業股份有限公司</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td></tr>
                                                <tr><td>南茂科技股份有限公司</td></tr>
                                                <tr><td>富邦人壽保險股份有限公司</td></tr>
                                                <tr><td>神準科技股份有限公司</td></tr>
                                                <tr><td>碁富食品股份有限公司</td></tr>
                                                <tr><td>台新國際商業銀行股份有限公司</td></tr>
                                                <tr><td>花蓮綠動車業</td></tr>
                                                <tr><td>台灣塑膠工業股份有限公司</td></tr>
                                                <tr><td>中環股份有限公司</td></tr>
                                                <tr><td>臺北醫學大學</td></tr>
                                                <tr><td>南臺科技大學</td></tr>
                                                <tr><td>欣興電子股份有限公司</td></tr>
                                                <tr><td>中華開發金融控股股份有限公司</td></tr>
                                                <tr><td>朝陽科技大學</td></tr>
                                                <tr><td>台灣美光記憶體股份有限公司</td></tr>
                                                <tr><td>台灣美光晶圓科技股份有限公司</td></tr>
                                                <tr><td>台灣之星電信股份有限公司</td></tr>
                                                <tr><td>財團法人資訊工業策進會</td></tr>
                                                <tr><td>花旗（台灣）商業銀行股份有限公司</td></tr>
                                                <tr><td>潤泰精密材料股份有限公司</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td></tr>
                                                <tr><td>亞太電信股份有限公司</td></tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <div style={{ margin: "0 auto", width: "780px" }}>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane active" style={showRow === "#tab108" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        108年度民間企業團體推動綠色採購績優單位（採購金額逾5仟萬元），經審查符合表揚資格計86家。<br />綠色採購總金額達340億元5,366萬6,375元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        申報金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>中華紙漿股份有限公司</td></tr>
                                                <tr><td>遠東新世紀股份有限公司</td></tr>
                                                <tr><td>統一企業股份有限公司</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td></tr>
                                                <tr><td>正隆股份有限公司燕巢廠</td></tr>
                                                <tr><td>新光合成纖維股份有限公司中壢廠</td></tr>
                                                <tr><td>正隆股份有限公司后里分公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠四期/五期</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二B廠</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司台中廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司三廠</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td></tr>
                                                <tr><td>銘安科技股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td></tr>
                                                <tr><td>臺灣水泥股份有限公司</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司大園廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司二/五廠</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司楊梅廠</td></tr>
                                                <tr><td>金百利股份有限公司</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td></tr>
                                                <tr><td>台灣高速鐵路股份有限公司</td></tr>
                                                <tr><td>誠毅紙器股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td></tr>
                                                <tr><td>加和紙業股份有限公司</td></tr>
                                                <tr><td>黑松股份有限公司</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td></tr>
                                                <tr><td>中華紙漿股份有限公司台東廠</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測三廠</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td></tr>
                                                <tr><td>隆陽汽車股份有限公司</td></tr>
                                                <tr><td>統一超商股份有限公司</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td></tr>
                                                <tr><td>新光人壽保險股份有限公司</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td></tr>
                                                <tr><td>榮成紙業股份有限公司</td></tr>
                                                <tr><td>利晉工程股份有限公司</td></tr>
                                                <tr><td>臺灣菸酒股份有限公司竹南啤酒廠</td></tr>
                                                <tr><td>聯華電子股份有限公司</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td></tr>
                                                <tr><td>永豐商業銀行股份有限公司</td></tr>
                                                <tr><td>富邦人壽保險股份有限公司</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td></tr>
                                                <tr><td>中國時報文化事業股份有限公司</td></tr>
                                                <tr><td>星展（台灣）商業銀行股份有限公司</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td></tr>
                                                <tr><td>精誠資訊股份有限公司</td></tr>
                                                <tr><td>總太地產開發股份有限公司台中分公司</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td></tr>
                                                <tr><td>悠旅生活事業股份有限公司</td></tr>
                                                <tr><td>群創光電股份有限公司</td></tr>
                                                <tr><td>兆豐國際商業銀行股份有限公司</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封裝廠</td></tr>
                                                <tr><td>惠普股份有限公司</td></tr>
                                                <tr><td>長榮航空股份有限公司</td></tr>
                                                <tr><td>名牌食品股份有限公司</td></tr>
                                                <tr><td>中國人壽保險股份有限公司</td></tr>
                                                <tr><td>台灣美光晶圓科技股份有限公司</td></tr>
                                                <tr><td>西北臺慶科技股份有限公司</td></tr>
                                                <tr><td>碁富食品股份有限公司</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td></tr>
                                                <tr><td>財團法人資訊工業策進會</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td></tr>
                                                <tr><td>京元電子股份有限公司竹南分公司</td></tr>
                                                <tr><td>亞太電信股份有限公司</td></tr>
                                                <tr><td>正隆股份有限公司苗栗廠</td></tr>
                                                <tr><td>大訊科技股份有限公司</td></tr>
                                                <tr><td>中龍鋼鐵股份有限公司</td></tr>
                                                <tr><td>立交實業有限公司</td></tr>
                                                <tr><td>南臺科技大學</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td></tr>
                                                <tr><td>全家便利商店股份有限公司</td></tr>
                                                <tr><td>中華開發金融控股股份有限公司</td></tr>
                                                <tr><td>臺北醫學大學</td></tr>
                                                <tr><td>第一商業銀行股份有限公司</td></tr>
                                                <tr><td>台新國際商業銀行股份有限公司</td></tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <div style={{ margin: "0 auto", width: "780px" }}>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab107" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        107年度民間企業團體推動綠色採購績優單位（採購金額逾3仟萬元），經審查符合表揚資格計116家。<br />綠色採購總金額達297億元5,202萬8,856元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        申報金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>遠東新世紀股份有限公司</td><td style={{ display: "none" }}>1,926,336,065</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td><td style={{ display: "none" }}>1,275,960,419</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠四期/五期</td><td style={{ display: "none" }}>1,241,752,775</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司</td><td style={{ display: "none" }}>1,034,655,997</td></tr>
                                                <tr><td>正隆股份有限公司台中廠</td><td style={{ display: "none" }}>945,402,840</td></tr>
                                                <tr><td>中華電信股份有限公司數據通信分公司</td><td style={{ display: "none" }}>833,605,958</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠七期</td><td style={{ display: "none" }}>685,847,353</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司新營廠</td><td style={{ display: "none" }}>682,389,221</td></tr>
                                                <tr><td>正隆股份有限公司</td><td style={{ display: "none" }}>597,658,320</td></tr>
                                                <tr><td>正隆股份有限公司后里分公司</td><td style={{ display: "none" }}>586,261,250</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>543,666,810</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td><td style={{ display: "none" }}>510,578,586</td></tr>
                                                <tr><td>金百利股份有限公司中壢廠</td><td style={{ display: "none" }}>479,481,520</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td><td style={{ display: "none" }}>467,551,585</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司三廠3E廠</td><td style={{ display: "none" }}>459,922,674</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司</td><td style={{ display: "none" }}>435,674,837</td></tr>
                                                <tr><td>新光合成纖維股份有限公司中壢廠</td><td style={{ display: "none" }}>425,305,703</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td><td style={{ display: "none" }}>405,972,424</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司五廠</td><td style={{ display: "none" }}>386,237,654</td></tr>
                                                <tr><td>永豐餘消費品實業股份有限公司</td><td style={{ display: "none" }}>369,682,516</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>341,084,140</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td><td style={{ display: "none" }}>339,414,669</td></tr>
                                                <tr><td>臺灣水泥股份有限公司</td><td style={{ display: "none" }}>329,194,465</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>316,316,681</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td><td style={{ display: "none" }}>314,369,000</td></tr>
                                                <tr><td>山林水環境工程股份有限公司</td><td style={{ display: "none" }}>302,888,127</td></tr>
                                                <tr><td>黑松股份有限公司</td><td style={{ display: "none" }}>295,180,243</td></tr>
                                                <tr><td>台灣高速鐵路股份有限公司</td><td style={{ display: "none" }}>292,454,021</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td><td style={{ display: "none" }}>280,224,389</td></tr>
                                                <tr><td>統一企業股份有限公司</td><td style={{ display: "none" }}>273,542,188</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>266,206,338</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td><td style={{ display: "none" }}>264,497,185</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>255,621,831</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>244,961,111</td></tr>
                                                <tr><td>國泰醫療財團法人</td><td style={{ display: "none" }}>206,454,526</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td><td style={{ display: "none" }}>185,714,800</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>159,267,515</td></tr>
                                                <tr><td>中華紙漿股份有限公司台東廠</td><td style={{ display: "none" }}>143,449,773</td></tr>
                                                <tr><td>中華電信股份有限公司臺灣北區電信分公司</td><td style={{ display: "none" }}>125,454,069</td></tr>
                                                <tr><td>臺灣菸酒股份有限公司竹南啤酒廠</td><td style={{ display: "none" }}>121,665,192</td></tr>
                                                <tr><td>惠普股份有限公司</td><td style={{ display: "none" }}>120,040,425</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td><td style={{ display: "none" }}>116,592,938</td></tr>
                                                <tr><td>中國時報文化事業股份有限公司</td><td style={{ display: "none" }}>116,082,675</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td><td style={{ display: "none" }}>114,622,978</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>105,734,860</td></tr>
                                                <tr><td>榮成紙業股份有限公司</td><td style={{ display: "none" }}>105,219,097</td></tr>
                                                <tr><td>統一超商股份有限公司</td><td style={{ display: "none" }}>101,658,356</td></tr>
                                                <tr><td>新光人壽保險股份有限公司</td><td style={{ display: "none" }}>97,694,762</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td><td style={{ display: "none" }}>89,754,885</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>88,933,956</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封裝廠</td><td style={{ display: "none" }}>88,096,830</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td><td style={{ display: "none" }}>86,820,081</td></tr>
                                                <tr><td>永豐商業銀行股份有限公司營業部</td><td style={{ display: "none" }}>84,131,526</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>82,273,762</td></tr>
                                                <tr><td>西北臺慶科技股份有限公司</td><td style={{ display: "none" }}>81,598,046</td></tr>
                                                <tr><td>富邦人壽保險股份有限公司</td><td style={{ display: "none" }}>77,012,912</td></tr>
                                                <tr><td>同春紙品彩印有限公司</td><td style={{ display: "none" }}>71,066,050</td></tr>
                                                <tr><td>偉聖紙器工業有限公司</td><td style={{ display: "none" }}>70,049,222</td></tr>
                                                <tr><td>群創光電股份有限公司</td><td style={{ display: "none" }}>69,984,652</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td><td style={{ display: "none" }}>64,507,037</td></tr>
                                                <tr><td>兆豐國際商業銀行股份有限公司</td><td style={{ display: "none" }}>64,387,710</td></tr>
                                                <tr><td>第一商業銀行股份有限公司</td><td style={{ display: "none" }}>63,627,646</td></tr>
                                                <tr><td>萬能科技大學</td><td style={{ display: "none" }}>62,818,500</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>62,710,000</td></tr>
                                                <tr><td>碁富食品股份有限公司</td><td style={{ display: "none" }}>61,455,527</td></tr>
                                                <tr><td>工商財經數位股份有限公司</td><td style={{ display: "none" }}>57,315,000</td></tr>
                                                <tr><td>悠旅生活事業股份有限公司</td><td style={{ display: "none" }}>56,741,109</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司桃園營運處</td><td style={{ display: "none" }}>56,617,946</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠善化分廠</td><td style={{ display: "none" }}>56,525,751</td></tr>
                                                <tr><td>台灣明尼蘇達光電股份有限公司</td><td style={{ display: "none" }}>55,834,559</td></tr>
                                                <tr><td>亞東預拌混凝土股份有限公司永康廠</td><td style={{ display: "none" }}>55,210,590</td></tr>
                                                <tr><td>天地海事工程科技有限公司</td><td style={{ display: "none" }}>53,006,503</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠台南分廠</td><td style={{ display: "none" }}>51,748,348</td></tr>
                                                <tr><td>京元電子股份有限公司竹南分公司</td><td style={{ display: "none" }}>50,610,184</td></tr>
                                                <tr><td>尚志資產開發股份有限公司</td><td style={{ display: "none" }}>50,389,060</td></tr>
                                                <tr><td>國家中山科學研究院</td><td style={{ display: "none" }}>50,359,601</td></tr>
                                                <tr><td>森大開發有限公司</td><td style={{ display: "none" }}>50,000,000</td></tr>
                                                <tr><td>花旗（台灣）商業銀行股份有限公司</td><td style={{ display: "none" }}>48,502,265</td></tr>
                                                <tr><td>中華開發金融控股股份有限公司</td><td style={{ display: "none" }}>47,534,878</td></tr>
                                                <tr><td>中聯資源股份有限公司</td><td style={{ display: "none" }}>47,497,481</td></tr>
                                                <tr><td>長榮航空股份有限公司</td><td style={{ display: "none" }}>45,710,441</td></tr>
                                                <tr><td>環球水泥股份有限公司台南預拌混凝土場</td><td style={{ display: "none" }}>45,200,000</td></tr>
                                                <tr><td>大訊科技股份有限公司</td><td style={{ display: "none" }}>45,004,044</td></tr>
                                                <tr><td>中龍鋼鐵股份有限公司</td><td style={{ display: "none" }}>44,395,765</td></tr>
                                                <tr><td>中華電信股份有限公司</td><td style={{ display: "none" }}>44,341,835</td></tr>
                                                <tr><td>南臺科技大學</td><td style={{ display: "none" }}>43,789,935</td></tr>
                                                <tr><td>潤泰精密材料股份有限公司宜蘭分公司</td><td style={{ display: "none" }}>43,458,959</td></tr>
                                                <tr><td>南茂科技股份有限公司</td><td style={{ display: "none" }}>43,147,749</td></tr>
                                                <tr><td>中原大學</td><td style={{ display: "none" }}>43,061,651</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司</td><td style={{ display: "none" }}>42,668,384</td></tr>
                                                <tr><td>神準科技股份有限公司</td><td style={{ display: "none" }}>42,286,560</td></tr>
                                                <tr><td>正隆股份有限公司苗栗廠</td><td style={{ display: "none" }}>42,133,718</td></tr>
                                                <tr><td>聯邦商業銀行股份有限公司</td><td style={{ display: "none" }}>41,237,262</td></tr>
                                                <tr><td>名傑營造有限公司</td><td style={{ display: "none" }}>39,917,707</td></tr>
                                                <tr><td>冠軍建材股份有限公司</td><td style={{ display: "none" }}>39,080,000</td></tr>
                                                <tr><td>亞太電信股份有限公司</td><td style={{ display: "none" }}>38,500,263</td></tr>
                                                <tr><td>聯華電子股份有限公司Fab12A廠</td><td style={{ display: "none" }}>38,132,350</td></tr>
                                                <tr><td>台北醫學大學</td><td style={{ display: "none" }}>36,806,677</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠安平分廠</td><td style={{ display: "none" }}>36,011,405</td></tr>
                                                <tr><td>郢晟實業有限公司</td><td style={{ display: "none" }}>36,000,000</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>35,500,815</td></tr>
                                                <tr><td>全家便利商店股份有限公司</td><td style={{ display: "none" }}>34,745,360</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司台北營運處</td><td style={{ display: "none" }}>34,394,789</td></tr>
                                                <tr><td>大陸建設股份有限公司</td><td style={{ display: "none" }}>33,859,730</td></tr>
                                                <tr><td>太平洋崇光百貨股份有限公司</td><td style={{ display: "none" }}>33,855,324</td></tr>
                                                <tr><td>滙豐（台灣）商業銀行股份有限公司</td><td style={{ display: "none" }}>33,588,760</td></tr>
                                                <tr><td>萬青水泥股份有限公司</td><td style={{ display: "none" }}>33,501,485</td></tr>
                                                <tr><td>信義房屋仲介股份有限公司</td><td style={{ display: "none" }}>33,309,710</td></tr>
                                                <tr><td>台灣之星電信股份有限公司</td><td style={{ display: "none" }}>32,750,608</td></tr>
                                                <tr><td>群光電子股份有限公司</td><td style={{ display: "none" }}>32,698,838</td></tr>
                                                <tr><td>嘉南藥理大學</td><td style={{ display: "none" }}>32,614,134</td></tr>
                                                <tr><td>立富鑫股份有限公司</td><td style={{ display: "none" }}>31,858,674</td></tr>
                                                <tr><td>財團法人資訊工業策進會</td><td style={{ display: "none" }}>31,629,011</td></tr>
                                                <tr><td>台灣化學纖維股份有限公司</td><td style={{ display: "none" }}>30,618,354</td></tr>
                                                <tr><td>台北金融大樓股份有限公司</td><td style={{ display: "none" }}>30,148,419</td></tr>
                                                <tr><td>金儀股份有限公司</td><td style={{ display: "none" }}>30,029,050</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        23,642,660,244
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <div style={{ margin: "0 auto", width: "780px" }}>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab106" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        106年度民間企業團體推動綠色採購績優單位（採購金額逾3仟萬元），經審查符合表揚資格計88家。<br />綠色採購總金額達238億元9,300萬9,626元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>遠東新世紀股份有限公司</td><td style={{ display: "none" }}>2,586,378,396</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td><td style={{ display: "none" }}>1,390,922,933</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二A廠</td><td style={{ display: "none" }}>694,665,070</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二B廠</td><td style={{ display: "none" }}>640,557,027</td></tr>
                                                <tr><td>福爾摩莎紙業股份有限公司</td><td style={{ display: "none" }}>966,043,000</td></tr>
                                                <tr><td>中華電信數據通信分公司</td><td style={{ display: "none" }}>804,274,134</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司新營廠</td><td style={{ display: "none" }}>689,881,199</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td><td style={{ display: "none" }}>538,599,984</td></tr>
                                                <tr><td>正隆股份有限公司台中分公司</td><td style={{ display: "none" }}>507,176,656</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>477,371,114</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td><td style={{ display: "none" }}>474,120,160</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>443,636,755</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司三廠</td><td style={{ display: "none" }}>428,366,086</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司二、五廠</td><td style={{ display: "none" }}>402,661,549</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td><td style={{ display: "none" }}>394,156,170</td></tr>
                                                <tr><td>山林水環境工程股份有限公司</td><td style={{ display: "none" }}>392,600,000</td></tr>
                                                <tr><td>金百利股份有限公司中壢廠</td><td style={{ display: "none" }}>351,537,054</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司-大園廠</td><td style={{ display: "none" }}>314,117,514</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td><td style={{ display: "none" }}>304,522,000</td></tr>
                                                <tr><td>台灣高速鐵路股份有限公司</td><td style={{ display: "none" }}>302,415,547</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>297,801,241</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td><td style={{ display: "none" }}>285,457,992</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td><td style={{ display: "none" }}>266,941,602</td></tr>
                                                <tr><td>黑松股份有限公司</td><td style={{ display: "none" }}>262,229,308</td></tr>
                                                <tr><td>中華電信北區分公司</td><td style={{ display: "none" }}>257,731,399</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測三廠</td><td style={{ display: "none" }}>246,514,516</td></tr>
                                                <tr><td>統一企業股份有限公司</td><td style={{ display: "none" }}>245,864,109</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>224,362,239</td></tr>
                                                <tr><td>群創光電股份有限公司</td><td style={{ display: "none" }}>206,752,544</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>205,168,864</td></tr>
                                                <tr><td>中國時報事業股份有限公司</td><td style={{ display: "none" }}>158,144,600</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>149,516,680</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td><td style={{ display: "none" }}>140,266,395</td></tr>
                                                <tr><td>新光人壽保險股份有限公司</td><td style={{ display: "none" }}>129,346,151</td></tr>
                                                <tr><td>欣亞數位股份有限公司台南北門分公司</td><td style={{ display: "none" }}>128,547,085</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td><td style={{ display: "none" }}>117,192,867</td></tr>
                                                <tr><td>台灣菸酒股份有限公司竹南啤酒廠</td><td style={{ display: "none" }}>115,665,162</td></tr>
                                                <tr><td>九龍租賃有限公司</td><td style={{ display: "none" }}>110,011,000</td></tr>
                                                <tr><td>中龍鋼鐵股份有限公司</td><td style={{ display: "none" }}>104,154,085</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>104,066,750</td></tr>
                                                <tr><td>亞昕開發股份有限公司</td><td style={{ display: "none" }}>100,870,666</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封裝廠</td><td style={{ display: "none" }}>94,676,494</td></tr>
                                                <tr><td>悠旅生活事業(台灣星巴克)</td><td style={{ display: "none" }}>88,981,391</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td><td style={{ display: "none" }}>84,974,983</td></tr>
                                                <tr><td>環球水泥股份有限公司台南預拌混凝土場</td><td style={{ display: "none" }}>72,773,300</td></tr>
                                                <tr><td>西北臺慶科技股份有限公司</td><td style={{ display: "none" }}>71,099,703</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td><td style={{ display: "none" }}>66,188,178</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司</td><td style={{ display: "none" }}>64,182,965</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>61,509,549</td></tr>
                                                <tr><td>第一商業銀行</td><td style={{ display: "none" }}>60,677,528</td></tr>
                                                <tr><td>台灣明尼蘇達光電股份有限公司</td><td style={{ display: "none" }}>59,498,928</td></tr>
                                                <tr><td>中華電信桃園營運處</td><td style={{ display: "none" }}>58,999,442</td></tr>
                                                <tr><td>富邦人壽保險股份有限公司</td><td style={{ display: "none" }}>58,140,675</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td><td style={{ display: "none" }}>57,066,596</td></tr>
                                                <tr><td>台灣之星電信股份有限公司</td><td style={{ display: "none" }}>54,991,671</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td><td style={{ display: "none" }}>53,497,805</td></tr>
                                                <tr><td>碁富食品股份有限公司</td><td style={{ display: "none" }}>52,703,738</td></tr>
                                                <tr><td>中華電信行動通信分公司</td><td style={{ display: "none" }}>51,679,648</td></tr>
                                                <tr><td>潤泰精密材料股份有限公司宜蘭冬山廠</td><td style={{ display: "none" }}>49,957,534</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>46,965,189</td></tr>
                                                <tr><td>工商財經數位股份有限公司</td><td style={{ display: "none" }}>46,256,000</td></tr>
                                                <tr><td>聯邦商業銀行股份有限公司</td><td style={{ display: "none" }}>44,857,457</td></tr>
                                                <tr><td>滙豐(台灣)商業銀行股份有限公司</td><td style={{ display: "none" }}>42,351,026</td></tr>
                                                <tr><td>台北金融大樓股份有限公司</td><td style={{ display: "none" }}>42,215,913</td></tr>
                                                <tr><td>森大開發有限公司</td><td style={{ display: "none" }}>41,894,573</td></tr>
                                                <tr><td>台灣康寧顯示玻璃股份有限公司南科分公司台南廠</td><td style={{ display: "none" }}>41,700,000</td></tr>
                                                <tr><td>兆豐國際商業銀行股份有限公司</td><td style={{ display: "none" }}>40,318,937</td></tr>
                                                <tr><td>神準科技股份有限公司</td><td style={{ display: "none" }}>39,174,597</td></tr>
                                                <tr><td>偉聖紙器工業有限公司</td><td style={{ display: "none" }}>38,457,275</td></tr>
                                                <tr><td>朝陽科技大學</td><td style={{ display: "none" }}>38,438,308</td></tr>
                                                <tr><td>亞太電信股份有限公司</td><td style={{ display: "none" }}>37,976,316</td></tr>
                                                <tr><td>冠軍建材股份有限公司</td><td style={{ display: "none" }}>37,503,236</td></tr>
                                                <tr><td>郢晟實業有限公司</td><td style={{ display: "none" }}>36,000,000</td></tr>
                                                <tr><td>台灣櫻花股份有限公司</td><td style={{ display: "none" }}>35,890,985</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>33,241,111</td></tr>
                                                <tr><td>欣龍實業股份有限公司</td><td style={{ display: "none" }}>32,964,000</td></tr>
                                                <tr><td>彰化基督教醫療財團法人彰化基督教醫院-總分院</td><td style={{ display: "none" }}>32,863,708</td></tr>
                                                <tr><td>台灣水泥(股)有限公司鼓山水泥製品廠台南分廠</td><td style={{ display: "none" }}>32,801,617</td></tr>
                                                <tr><td>星展商業銀行股份有限公司</td><td style={{ display: "none" }}>32,546,760</td></tr>
                                                <tr><td>家樂福股份有限公司</td><td style={{ display: "none" }}>32,348,580</td></tr>
                                                <tr><td>台灣水泥(股)有限公司鼓山水泥製品廠善化分廠</td><td style={{ display: "none" }}>32,325,965</td></tr>
                                                <tr><td>長榮航空股份有限公司</td><td style={{ display: "none" }}>32,314,667</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司(第3廠)</td><td style={{ display: "none" }}>31,991,531</td></tr>
                                                <tr><td>台灣水泥股份有限公司台北水泥製品廠</td><td style={{ display: "none" }}>31,798,787</td></tr>
                                                <tr><td>宏普建設股份有限公司</td><td style={{ display: "none" }}>31,553,190</td></tr>
                                                <tr><td>同春紙品彩印有限公司</td><td style={{ display: "none" }}>30,585,800</td></tr>
                                                <tr><td>財團法人資訊工業策進會</td><td style={{ display: "none" }}>30,366,239</td></tr>
                                                <tr><td>慶隆預拌混凝土股份有限公司</td><td style={{ display: "none" }}>30,292,500</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        19,180,201,998
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <div style={{ margin: "0 auto", width: "780px" }}>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab105" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        105年度民間企業團體推動綠色採購績優單位（採購金額逾3仟萬元），經審查符合表揚資格計69家。<br />綠色採購總金額達157億元1,677萬8,034元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>遠東新世紀股份有限公司</td><td style={{ display: "none" }}>4,198,145,828</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td><td style={{ display: "none" }}>1,307,790,066</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td><td style={{ display: "none" }}>715,231,969</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>668,537,524</td></tr>
                                                <tr><td>圓展科技股份有限公司</td><td style={{ display: "none" }}>550,000,000</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td><td style={{ display: "none" }}>440,188,493</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td><td style={{ display: "none" }}>403,472,497</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司二、五廠</td><td style={{ display: "none" }}>403,472,490</td></tr>
                                                <tr><td>金百利股份有限公司中壢廠</td><td style={{ display: "none" }}>349,603,887</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠四期/五期</td><td style={{ display: "none" }}>344,993,223</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>338,299,808</td></tr>
                                                <tr><td>新光人壽保險股份有限公司</td><td style={{ display: "none" }}>314,291,814</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td><td style={{ display: "none" }}>306,639,096</td></tr>
                                                <tr><td>台灣水泥股份有限公司台中水泥製品廠大肚分廠</td><td style={{ display: "none" }}>250,321,762</td></tr>
                                                <tr><td>台中汽車客運股份有限公司</td><td style={{ display: "none" }}>240,900,867</td></tr>
                                                <tr><td>桃園汽車客運股份有限公司</td><td style={{ display: "none" }}>236,416,440</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td><td style={{ display: "none" }}>229,979,322</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>222,701,338</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>204,399,823</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td><td style={{ display: "none" }}>202,946,666</td></tr>
                                                <tr><td>統一企業股份有限公司</td><td style={{ display: "none" }}>193,472,715</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>193,016,020</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠研新廠</td><td style={{ display: "none" }}>191,705,482</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封測三廠</td><td style={{ display: "none" }}>145,257,049</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>144,744,864</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td><td style={{ display: "none" }}>142,375,695</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>140,607,914</td></tr>
                                                <tr><td>臺灣菸酒股份有限公司竹南啤酒廠</td><td style={{ display: "none" }}>133,404,102</td></tr>
                                                <tr><td>南亞塑膠工業股份有限公司</td><td style={{ display: "none" }}>126,627,016</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司新營廠</td><td style={{ display: "none" }}>117,995,358</td></tr>
                                                <tr><td>黑松股份有限公司</td><td style={{ display: "none" }}>117,966,502</td></tr>
                                                <tr><td>豐原汽車客運股份有限公司</td><td style={{ display: "none" }}>113,757,453</td></tr>
                                                <tr><td>統一星巴克股份有限公司</td><td style={{ display: "none" }}>96,914,686</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td><td style={{ display: "none" }}>96,173,939</td></tr>
                                                <tr><td>聯邦商業銀行股份有限公司</td><td style={{ display: "none" }}>95,404,415</td></tr>
                                                <tr><td>竹來寶有限公司</td><td style={{ display: "none" }}>94,555,411</td></tr>
                                                <tr><td>中國時報文化事業股份有限公司</td><td style={{ display: "none" }}>88,335,765</td></tr>
                                                <tr><td>台灣紙業股份有限公司</td><td style={{ display: "none" }}>82,667,750</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td><td style={{ display: "none" }}>81,482,982</td></tr>
                                                <tr><td>環球水泥股份有限公司台南預拌混凝土場</td><td style={{ display: "none" }}>78,983,389</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封裝廠</td><td style={{ display: "none" }}>74,494,740</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td><td style={{ display: "none" }}>74,454,314</td></tr>
                                                <tr><td>屏東汽車客運股份有限公司</td><td style={{ display: "none" }}>68,653,325</td></tr>
                                                <tr><td>台灣之星電信股份有限公司</td><td style={{ display: "none" }}>67,903,856</td></tr>
                                                <tr><td>彰化汽車客運股份有限公司</td><td style={{ display: "none" }}>66,417,141</td></tr>
                                                <tr><td>龍寶建設股份有限公司/名傑營造有限公司</td><td style={{ display: "none" }}>61,017,934</td></tr>
                                                <tr><td>永豐商業銀行股份有限公司</td><td style={{ display: "none" }}>59,493,790</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>59,263,355</td></tr>
                                                <tr><td>台灣水泥股份有限公司台北水泥製品廠</td><td style={{ display: "none" }}>53,860,992</td></tr>
                                                <tr><td>中龍鋼鐵股份有限公司</td><td style={{ display: "none" }}>52,307,848</td></tr>
                                                <tr><td>登陽建設有限公司</td><td style={{ display: "none" }}>45,139,374</td></tr>
                                                <tr><td>京元電子股份有限公司竹南分公司</td><td style={{ display: "none" }}>44,490,029</td></tr>
                                                <tr><td>工商財經數位股份有限公司</td><td style={{ display: "none" }}>44,328,769</td></tr>
                                                <tr><td>國家中山科學研究院</td><td style={{ display: "none" }}>42,494,610</td></tr>
                                                <tr><td>潤泰精密材料股份有限公司宜蘭冬山廠</td><td style={{ display: "none" }}>41,955,943</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>39,515,633</td></tr>
                                                <tr><td>太平洋醫材股份有限公司</td><td style={{ display: "none" }}>35,402,604</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>34,229,362</td></tr>
                                                <tr><td>神準科技股份有限公司</td><td style={{ display: "none" }}>33,239,920</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司第一廠</td><td style={{ display: "none" }}>33,103,262</td></tr>
                                                <tr><td>亞東預拌混凝土股份有限公司台南廠</td><td style={{ display: "none" }}>33,064,200</td></tr>
                                                <tr><td>財團法人資訊工業策進會</td><td style={{ display: "none" }}>31,795,924</td></tr>
                                                <tr><td>娜路彎大酒店股份有限公司</td><td style={{ display: "none" }}>31,571,100</td></tr>
                                                <tr><td>總太地產開發股份有限公司台中分公司</td><td style={{ display: "none" }}>31,464,375</td></tr>
                                                <tr><td>臺北市立萬芳醫院</td><td style={{ display: "none" }}>30,999,769</td></tr>
                                                <tr><td>偉聖紙器工業有限公司</td><td style={{ display: "none" }}>30,937,104</td></tr>
                                                <tr><td>星展(台灣)商業銀行股份有限公司</td><td style={{ display: "none" }}>30,708,964</td></tr>
                                                <tr><td>花旗(台灣)商業銀行股份有限公司</td><td style={{ display: "none" }}>30,463,035</td></tr>
                                                <tr><td>亞太電信股份有限公司</td><td style={{ display: "none" }}>30,225,342</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        15,716,778,034
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <div style={{ margin: "0 auto", width: "780px" }}>
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab104" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        104年度民間企業團體推動綠色採購績優單位（採購金額逾3仟萬元），經審查符合表揚資格計59家。綠色採購總金額達121億元4,734萬3,518元。另為鼓勵104年度民間企業與團體進行綠色採購，由各地方環保局推薦轄內響應綠色採購具有特殊表現的單位，共計11家接受表揚。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>格上汽車租賃股份有限公司</td><td style={{ display: "none" }}>1,174,479,100</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td><td style={{ display: "none" }}>1,069,958,780</td></tr>
                                                <tr><td>中華電信數據分公司</td><td style={{ display: "none" }}>1,018,932,539</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td><td style={{ display: "none" }}>1,010,090,725</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td><td style={{ display: "none" }}>955,500,103</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>582,709,538</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司八廠</td><td style={{ display: "none" }}>517,405,136</td></tr>
                                                <tr><td>圓展科技股份有限公司</td><td style={{ display: "none" }}>500,000,000</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>353,426,744</td></tr>
                                                <tr><td>中華電信北區分公司</td><td style={{ display: "none" }}>326,877,508</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四B廠</td><td style={{ display: "none" }}>324,398,891</td></tr>
                                                <tr><td>金百利克拉克台灣分公司-中壢廠</td><td style={{ display: "none" }}>302,651,901</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td><td style={{ display: "none" }}>292,783,950</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十四廠</td><td style={{ display: "none" }}>266,994,975</td></tr>
                                                <tr><td>統一企業股份有限公司</td><td style={{ display: "none" }}>207,635,982</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>204,846,006</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司二、五廠</td><td style={{ display: "none" }}>186,404,737</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>183,067,595</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司六廠</td><td style={{ display: "none" }}>168,206,835</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td><td style={{ display: "none" }}>162,993,000</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>157,223,208</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>127,322,820</td></tr>
                                                <tr><td>台灣菸酒股份有限公司竹南啤酒廠</td><td style={{ display: "none" }}>124,622,113</td></tr>
                                                <tr><td>龍寶建設股份有限公司（名傑營造）</td><td style={{ display: "none" }}>108,063,848</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>103,248,017</td></tr>
                                                <tr><td>優美股份有限公司</td><td style={{ display: "none" }}>97,386,816</td></tr>
                                                <tr><td>匯豐（台灣）商業銀行股份有限公司</td><td style={{ display: "none" }}>80,367,337</td></tr>
                                                <tr><td>第一商業銀行股份有限公司</td><td style={{ display: "none" }}>72,335,612</td></tr>
                                                <tr><td>中華電信股份有限公司</td><td style={{ display: "none" }}>70,440,343</td></tr>
                                                <tr><td>全家便利商店股份有限公司</td><td style={{ display: "none" }}>66,050,168</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>62,956,310</td></tr>
                                                <tr><td>統一星巴克股份有限公司</td><td style={{ display: "none" }}>61,726,962</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>57,338,219</td></tr>
                                                <tr><td>友達光電股份有限公司桃園分公司</td><td style={{ display: "none" }}>57,138,314</td></tr>
                                                <tr><td>逢甲大學</td><td style={{ display: "none" }}>56,472,392</td></tr>
                                                <tr><td>花旗（台灣）商業銀行股份有限公司</td><td style={{ display: "none" }}>55,980,706</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td><td style={{ display: "none" }}>55,562,710</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>54,879,952</td></tr>
                                                <tr><td>華南商業銀行股份有限公司</td><td style={{ display: "none" }}>54,228,420</td></tr>
                                                <tr><td>台灣之星電信股份有限公司</td><td style={{ display: "none" }}>50,399,370</td></tr>
                                                <tr><td>中華電信行動通信分公司</td><td style={{ display: "none" }}>50,327,849</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司先進封裝廠</td><td style={{ display: "none" }}>49,253,717</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td><td style={{ display: "none" }}>48,562,280</td></tr>
                                                <tr><td>黑松股份有限公司</td><td style={{ display: "none" }}>47,044,484</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠</td><td style={{ display: "none" }}>46,444,048</td></tr>
                                                <tr><td>兆豐國際商業銀行股份有限公司</td><td style={{ display: "none" }}>45,469,340</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>44,579,705</td></tr>
                                                <tr><td>南亞電路板股份有限公司</td><td style={{ display: "none" }}>43,380,000</td></tr>
                                                <tr><td>奇美實業股份有限公司</td><td style={{ display: "none" }}>41,214,541</td></tr>
                                                <tr><td>中國文化大學</td><td style={{ display: "none" }}>40,568,829</td></tr>
                                                <tr><td>臺億建築經理股份有限公司</td><td style={{ display: "none" }}>39,850,000</td></tr>
                                                <tr><td>台灣高鐵股份有限公司</td><td style={{ display: "none" }}>38,141,071</td></tr>
                                                <tr><td>朝陽科技大學</td><td style={{ display: "none" }}>36,101,627</td></tr>
                                                <tr><td>冠軍建材股份有限公司</td><td style={{ display: "none" }}>34,029,423</td></tr>
                                                <tr><td>遠雄建設事業股份有限公司</td><td style={{ display: "none" }}>33,212,768</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司</td><td style={{ display: "none" }}>32,971,380</td></tr>
                                                <tr><td>聯邦商業銀行股份有限公司</td><td style={{ display: "none" }}>31,442,426</td></tr>
                                                <tr><td>偉聖紙器工業有限公司</td><td style={{ display: "none" }}>31,239,578</td></tr>
                                                <tr><td>太平洋醫材股份有限公司</td><td style={{ display: "none" }}>30,402,770</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        12,147,343,518
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <table className="table report2">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "30px" }}>
                                                        項次
                                                    </th>
                                                    <th style={{ width: "200px" }}>
                                                        表揚業者
                                                    </th>
                                                    <th >
                                                        表揚原因
                                                    </th>
                                                    <th style={{ width: "100px" }}>
                                                        推薦環保局
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>1</td><td>也翔科技股份有限公司</td><td>也翔科技股份有限公司深感環境保護的重要性並遵循世界各國對限用物質相關規定，特定環保綠色供應鏈系統，採購國內外符合環境保護的產品，期望也翔科技與其所有供應商一同成長，並善盡企業責任及共同守護地球環境。</td><td>桃園市</td></tr>
                                                <tr><td>2</td><td>寶僑家品股份有限公司</td><td>寶僑家具不遺餘力的推動環保且不斷支持綠色採購，在國際上也成功將尿布產品製作成屋頂瓦片與鐵道枕木進行二次再利用與回收，也創造另一類的商機。</td><td>臺北市</td></tr>
                                                <tr><td>3</td><td>坤晉工程行</td><td>坤晉工程行致力於環保標章以及綠色採購推廣，主動申報綠色採購且提報金額為本市該年度未達500萬之採購金額最高者。</td><td>臺南市</td></tr>
                                                <tr><td>4</td><td>私立慧燈高級中學</td><td>私立慧燈高級中學除了教學成效卓著外，在不受機關綠色採購規範下，自2008年起即主動申報該校綠色採購成果供環保單位進行成果統計，已連續8年獲宜蘭縣政府頒發民間綠色採購績優榮譽狀，希望能藉此鼓勵並帶動各私立教育機構戮力推廣綠色採購及環境保護工作。</td><td>宜蘭縣</td></tr>
                                                <tr><td>5</td><td>台灣普利司通股份有限公司</td><td>為展現愛護地球及善盡社會責任的決心，台灣普利司通股份有限公司與行政院農業委員會林務局推動｢ECOPIA PZ-X植樹造林計畫｣。消費者至普利司通連鎖店購買4條ECOPIA PZ-X輪胎，即與普利司通的名義共同捐贈1顆臺灣原生種樹苗，並以定期樹苗存活追蹤機制，讓每一顆新植的樹苗都能為臺灣的水土保持盡份心力。截至104年，此計畫已在指定的捐贈區域種植超過13公頃的樹苗，希望藉此達到減少土石流及削減二氧化碳防止地球暖化等雙重效果。</td><td>新竹縣</td></tr>
                                                <tr><td>6</td><td>中華電信南投營運處</td><td>中華電信南投營運處，該處多年來在節能減碳綠色採購等均致力推廣並加強內部員工對環保理念的建立，且公司內部另訂有相關採購競賽，如營建修繕在未影響安全結構，均要求採用有(綠建材標章證書及證號)建材，在日常辦公用品上均採購再生影印紙、衛生紙、碳粉夾等，家電空調設備等均採用環保冷媒，能為地球盡一份力量南投營運處定持之以恆的永續經營。</td><td>南投縣</td></tr>
                                                <tr><td>7</td><td>大仁科技大學</td><td>大仁科技大學於每年度校慶，由學生擔任志工，設攤宣導綠色消費，並於課程中加入綠色消費觀念，進而宣導綠色消費。致力取得環境教育中心，推廣綠色消費不留餘力。</td><td>屏東縣</td></tr>
                                                <tr><td>8</td><td>中華電信北區分公司花蓮營運處</td><td>長期配合環保局活動且配合度良好並確實執行及宣導，且綠色採購金額較其他企業高。</td><td>花蓮縣</td></tr>
                                                <tr><td>9</td><td>西湖渡假村股份有限公司</td><td>西湖渡假村自願提報民間企業採購金額，採購環保標章商品且為金級環保旅館，推出綠悠遊專案優惠方案，長期配合政府機關辦理活動且為環保場域推動友善生活綠色旅遊。</td><td>苗栗縣</td></tr>
                                                <tr><td>10</td><td>中華電信臺東營運處</td><td>配合度良好並確實執行及宣導，且綠色採購金額較其他企業高。</td><td>臺東縣</td></tr>
                                                <tr><td>11</td><td>新研綠能科技有限公司</td><td>該公司連續4年參加本縣推動民間企業與團體實施綠色採購，採購金額雖不大，但參與度足堪本縣表率特提報表揚。</td><td>澎湖縣</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab103" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        103年度民間企業團體推動綠色採購績優單位（採購金額逾3仟萬元），經審查符合表揚資格計39家。綠色採購總金額達56億元4,723萬5,073元。另為鼓勵103年度民間企業與團體進行綠色採購，由各地方環保局推薦轄內響應綠色採購具有特殊表現的單位，共計3家接受表揚。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>中華電信數據分公司</td><td style={{ display: "none" }}>1,201,857,723</td></tr>
                                                <tr><td>格上汽車租賃股份有限公司</td><td style={{ display: "none" }}>906,865,000</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司二廠及五廠</td><td style={{ display: "none" }}>477,605,556</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>369,936,569</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td><td style={{ display: "none" }}>270,370,000</td></tr>
                                                <tr><td>統一企業股份有限公司</td><td style={{ display: "none" }}>242,676,107</td></tr>
                                                <tr><td>新世紀資通股份有限公司</td><td style={{ display: "none" }}>203,466,598</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>203,090,553</td></tr>
                                                <tr><td>台灣史谷脫紙業股份有限公司</td><td style={{ display: "none" }}>164,206,004</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td><td style={{ display: "none" }}>125,454,150</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>125,092,886</td></tr>
                                                <tr><td>國泰世華商業銀行股份有限公司</td><td style={{ display: "none" }}>109,389,244</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td><td style={{ display: "none" }}>100,598,814</td></tr>
                                                <tr><td>中華電信北區分公司</td><td style={{ display: "none" }}>95,383,648</td></tr>
                                                <tr><td>統一星巴克股份有限公司</td><td style={{ display: "none" }}>80,979,399</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>71,328,016</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>70,809,300</td></tr>
                                                <tr><td>中華電信行動通信分公司</td><td style={{ display: "none" }}>52,668,006</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>50,615,365</td></tr>
                                                <tr><td>洋基通運股份有限公司</td><td style={{ display: "none" }}>50,497,913</td></tr>
                                                <tr><td>桂田璽悅酒店股份有限公司</td><td style={{ display: "none" }}>49,373,263</td></tr>
                                                <tr><td>員林汽車客運股份有限公司</td><td style={{ display: "none" }}>41,244,000</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>40,772,227</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td><td style={{ display: "none" }}>40,582,659</td></tr>
                                                <tr><td>奇美實業股份有限公司</td><td style={{ display: "none" }}>38,834,770</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>37,110,250</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>37,041,733</td></tr>
                                                <tr><td>聯邦商業銀行股份有限公司</td><td style={{ display: "none" }}>34,954,866</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>34,640,216</td></tr>
                                                <tr><td>中國文化大學</td><td style={{ display: "none" }}>34,600,165</td></tr>
                                                <tr><td>偉聖紙器工業有限公司</td><td style={{ display: "none" }}>34,092,624</td></tr>
                                                <tr><td>中鋼鋁業股份有限公司</td><td style={{ display: "none" }}>33,385,573</td></tr>
                                                <tr><td>黑松股份有限公司中壢廠</td><td style={{ display: "none" }}>32,102,162</td></tr>
                                                <tr><td>台灣之星電信股份有限公司</td><td style={{ display: "none" }}>32,051,600</td></tr>
                                                <tr><td>佳朋開發股份有限公司</td><td style={{ display: "none" }}>31,362,993</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司第二廠</td><td style={{ display: "none" }}>31,110,148</td></tr>
                                                <tr><td>財團法人資訊工業策進會</td><td style={{ display: "none" }}>30,466,886</td></tr>
                                                <tr><td>裕隆汽車製造股份有限公司</td><td style={{ display: "none" }}>30,375,056</td></tr>
                                                <tr><td>信織實業股份有限公司</td><td style={{ display: "none" }}>30,243,031</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        5,647,235,073
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <table className="table report2">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "30px" }}>
                                                        項次
                                                    </th>
                                                    <th style={{ width: "200px" }}>
                                                        表揚業者
                                                    </th>
                                                    <th >
                                                        表揚原因
                                                    </th>
                                                    <th style={{ width: "100px" }}>
                                                        推薦環保局
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>鳳凰酒店股份有限公司</td>
                                                    <td>為宜蘭縣礁溪鄉觀光飯店業者，也是環保署環保旅店計畫參與伙伴，該公司長久以來配合宜蘭縣輔導民間綠色採購計畫，已連續多年參與並獲縣府公開表揚在案，103年該公司綠色採購金額雖不是縣內申報單位最高者，申報採購金額也已達124萬餘元，本次推薦該公司接受環保署表揚，一則肯定該公司在環保業務的配合及推動，一方面藉由中央單位的表揚活動，期許該公司在綠色消費的執行更往前邁進。</td>
                                                    <td>宜蘭縣</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>榮美精品商旅股份有限公司</td>
                                                    <td>為臺南市優秀之環保旅店，主動響應民間企業綠色採購，飯店設置時優先選購綠色商品，且為本市103年度未達500萬元之採購金額最高者，故推薦其接受表揚。</td>
                                                    <td>臺南市</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>桃園創新科技學校<br />財團法人桃園創新技術學院</td>
                                                    <td>創新技術學院為教育單位，宣導範圍層面較廣泛，希望能以此鼓勵帶動各私立教育機構大力推廣綠色採購及環保工作。</td>
                                                    <td>桃園市</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab102" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        102年度民間企業團體推動綠色採購績優單位（採購金額逾2仟萬元），共計79個單位，綠色採購總金額達80億元5006萬3266元
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>格上汽車租賃股份有限公司</td><td style={{ display: "none" }}>1,007,615,000</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td><td style={{ display: "none" }}>576,116,409</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td><td style={{ display: "none" }}>565,440,000</td></tr>
                                                <tr><td>中華電信北區分公司</td><td style={{ display: "none" }}>475,610,998</td></tr>
                                                <tr><td>永豐餘工業用紙股份有限公司竹南廠</td><td style={{ display: "none" }}>421,131,233</td></tr>
                                                <tr><td>統一企業股份有限公司</td><td style={{ display: "none" }}>412,790,018</td></tr>
                                                <tr><td>全家便利商店股份有限公司</td><td style={{ display: "none" }}>385,500,310</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>338,594,492</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>268,781,572</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>187,189,478</td></tr>
                                                <tr><td>小馬小客車租賃股份有限公司</td><td style={{ display: "none" }}>176,868,000</td></tr>
                                                <tr><td>桃園汽車客運股份有限公司</td><td style={{ display: "none" }}>171,775,650</td></tr>
                                                <tr><td>台灣塑膠工業股份有限公司</td><td style={{ display: "none" }}>166,263,557</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>163,565,624</td></tr>
                                                <tr><td>彰化汽車客運股份有限公司</td><td style={{ display: "none" }}>148,607,047</td></tr>
                                                <tr><td>名傑營造有限公司</td><td style={{ display: "none" }}>139,482,483</td></tr>
                                                <tr><td>台灣化學纖維股份有限公司</td><td style={{ display: "none" }}>116,901,639</td></tr>
                                                <tr><td>員林汽車客運股份有限公司</td><td style={{ display: "none" }}>108,307,571</td></tr>
                                                <tr><td>南亞塑膠工業股份有限公司</td><td style={{ display: "none" }}>104,816,447</td></tr>
                                                <tr><td>統一超商股份有限公司</td><td style={{ display: "none" }}>93,467,738</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>91,244,096</td></tr>
                                                <tr><td>中華電信南區分公司</td><td style={{ display: "none" }}>89,037,225</td></tr>
                                                <tr><td>日月光半導體股份有限公司</td><td style={{ display: "none" }}>76,533,154</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠</td><td style={{ display: "none" }}>75,201,691</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td><td style={{ display: "none" }}>74,755,900</td></tr>
                                                <tr><td>長庚醫療財團法人</td><td style={{ display: "none" }}>64,536,400</td></tr>
                                                <tr><td>台灣大哥大股份有限公司</td><td style={{ display: "none" }}>62,293,551</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>53,937,926</td></tr>
                                                <tr><td>玉山金融控股股份有限公司</td><td style={{ display: "none" }}>53,424,871</td></tr>
                                                <tr><td>臺灣康寧顯示玻璃股份有限公司</td><td style={{ display: "none" }}>49,855,531</td></tr>
                                                <tr><td>臺灣菸酒股份有限公司竹南啤酒廠</td><td style={{ display: "none" }}>44,984,100</td></tr>
                                                <tr><td>中華電信行動通信分公司</td><td style={{ display: "none" }}>43,079,115</td></tr>
                                                <tr><td>由鉅建設股份有限公司</td><td style={{ display: "none" }}>38,500,000</td></tr>
                                                <tr><td>中華電信新竹營運處</td><td style={{ display: "none" }}>37,859,829</td></tr>
                                                <tr><td>群創光電股份有限公司</td><td style={{ display: "none" }}>37,481,972</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td><td style={{ display: "none" }}>35,717,494</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠仁武分廠</td><td style={{ display: "none" }}>35,540,382</td></tr>
                                                <tr><td>鈺通營造工程股份有限公司</td><td style={{ display: "none" }}>35,475,817</td></tr>
                                                <tr><td>奇美實業股份有限公司</td><td style={{ display: "none" }}>32,928,744</td></tr>
                                                <tr><td>信義房屋仲介股份有限公司</td><td style={{ display: "none" }}>32,796,520</td></tr>
                                                <tr><td>聯邦商業銀行股份有限公司</td><td style={{ display: "none" }}>31,725,173</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>31,312,049</td></tr>
                                                <tr><td>統一星巴克股份有限公司</td><td style={{ display: "none" }}>31,152,274</td></tr>
                                                <tr><td>中鴻鋼鐵股份有限公司</td><td style={{ display: "none" }}>30,570,126</td></tr>
                                                <tr><td>正隆股份有限公司</td><td style={{ display: "none" }}>30,387,219</td></tr>
                                                <tr><td>中國文化大學</td><td style={{ display: "none" }}>29,515,817</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>29,074,800</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>28,161,750</td></tr>
                                                <tr><td>銅鑼紙器股份有限公司</td><td style={{ display: "none" }}>28,006,800</td></tr>
                                                <tr><td>中華電信國際分公司</td><td style={{ display: "none" }}>27,116,781</td></tr>
                                                <tr><td>臺北醫學大學附設醫院</td><td style={{ display: "none" }}>27,098,184</td></tr>
                                                <tr><td>中華電信數據通信分公司</td><td style={{ display: "none" }}>26,859,894</td></tr>
                                                <tr><td>中華電信台中營運處</td><td style={{ display: "none" }}>25,657,250</td></tr>
                                                <tr><td>中華電信股份有限公司</td><td style={{ display: "none" }}>25,366,438</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>25,257,644</td></tr>
                                                <tr><td>瑞士商格蘭富股份有限公司台灣分公司</td><td style={{ display: "none" }}>24,947,926</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>24,300,000</td></tr>
                                                <tr><td>中華電信新北營運處</td><td style={{ display: "none" }}>24,261,939</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司</td><td style={{ display: "none" }}>23,238,452</td></tr>
                                                <tr><td>信織實業股份有限公司</td><td style={{ display: "none" }}>23,075,167</td></tr>
                                                <tr><td>安侯建業聯合會計師事務所</td><td style={{ display: "none" }}>22,847,547</td></tr>
                                                <tr><td>中華電信研究院</td><td style={{ display: "none" }}>22,331,142</td></tr>
                                                <tr><td>金儀股份有限公司</td><td style={{ display: "none" }}>22,300,648</td></tr>
                                                <tr><td>台灣積體電路製造股份有限公司十二廠</td><td style={{ display: "none" }}>22,288,452</td></tr>
                                                <tr><td>朝陽科技大學</td><td style={{ display: "none" }}>22,217,424</td></tr>
                                                <tr><td>義守大學</td><td style={{ display: "none" }}>22,170,047</td></tr>
                                                <tr><td>輔仁大學學校財團法人輔仁大學</td><td style={{ display: "none" }}>21,950,818</td></tr>
                                                <tr><td>臺北市立萬芳醫院委託財團法人臺北醫學大學辦理</td><td style={{ display: "none" }}>21,865,290</td></tr>
                                                <tr><td>樹德科技大學</td><td style={{ display: "none" }}>21,860,700</td></tr>
                                                <tr><td>三麒建設股份有限公司</td><td style={{ display: "none" }}>21,760,646</td></tr>
                                                <tr><td>三洋窯業股份有限公司</td><td style={{ display: "none" }}>21,286,731</td></tr>
                                                <tr><td>達茂營造股份有限公司</td><td style={{ display: "none" }}>21,206,880</td></tr>
                                                <tr><td>中華電信台北營運處</td><td style={{ display: "none" }}>21,122,594</td></tr>
                                                <tr><td>麗寶建設股份有限公司</td><td style={{ display: "none" }}>21,067,116</td></tr>
                                                <tr><td>亞太電信股份有限公司</td><td style={{ display: "none" }}>20,781,036</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>20,708,490</td></tr>
                                                <tr><td>台灣國際造船股份有限公司</td><td style={{ display: "none" }}>20,584,792</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司第二廠</td><td style={{ display: "none" }}>20,427,851</td></tr>
                                                <tr><td>潤泰精密材料股份有限公司宜蘭冬山廠</td><td style={{ display: "none" }}>20,189,795</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        8,050,063,266
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab101" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        101年度民間企業團體推動綠色採購績優單位（採購金額逾2仟萬元），共記59個單位，綠色採購總金額達70億9167萬2,524元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>台灣積體電路製造股份有限公司</td><td style={{ display: "none" }}>1,412,209,342</td></tr>
                                                <tr><td>中華電信股份有限公司台灣南區分公司</td><td style={{ display: "none" }}>614,290,759</td></tr>
                                                <tr><td>中華紙漿股份有限公司久堂廠</td><td style={{ display: "none" }}>583,476,931</td></tr>
                                                <tr><td>新光合成纖維股份有限公司</td><td style={{ display: "none" }}>524,192,000</td></tr>
                                                <tr><td>永豐餘工業用紙股份有限公司竹南廠</td><td style={{ display: "none" }}>420,634,579</td></tr>
                                                <tr><td>大夏紙業股份有限公司</td><td style={{ display: "none" }}>408,024,880</td></tr>
                                                <tr><td>中華電信股份有限公司總公司</td><td style={{ display: "none" }}>234,317,244</td></tr>
                                                <tr><td>統一超商股份有限公司</td><td style={{ display: "none" }}>224,129,351</td></tr>
                                                <tr><td>全家便利商店股份有限公司</td><td style={{ display: "none" }}>188,398,010</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>157,245,978</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>155,772,948</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>130,339,808</td></tr>
                                                <tr><td>桃園汽車客運股份有限公司</td><td style={{ display: "none" }}>110,217,000</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td><td style={{ display: "none" }}>95,511,157</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>95,371,014</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司台北營運處</td><td style={{ display: "none" }}>91,746,830</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司</td><td style={{ display: "none" }}>91,603,666</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>91,269,555</td></tr>
                                                <tr><td>中華電信股份有限公司行動通信分公司</td><td style={{ display: "none" }}>78,241,681</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>72,320,139</td></tr>
                                                <tr><td>高雄醫學大學</td><td style={{ display: "none" }}>70,231,953</td></tr>
                                                <tr><td>中華電信股份有限公司台灣南區電信分公司台南營運處</td><td style={{ display: "none" }}>57,783,821</td></tr>
                                                <tr><td>龍寶建設股份有限公司</td><td style={{ display: "none" }}>52,368,082</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td><td style={{ display: "none" }}>51,503,526</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td><td style={{ display: "none" }}>49,167,639</td></tr>
                                                <tr><td>中華電信股份有限公司台灣南區分公司高雄營運處</td><td style={{ display: "none" }}>47,397,182</td></tr>
                                                <tr><td>玉山金融控股公司</td><td style={{ display: "none" }}>44,140,089</td></tr>
                                                <tr><td>冠軍建材股份有限公司</td><td style={{ display: "none" }}>43,940,000</td></tr>
                                                <tr><td>南亞塑膠工業股份有限公司</td><td style={{ display: "none" }}>43,764,190</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司新竹營運處</td><td style={{ display: "none" }}>37,516,583</td></tr>
                                                <tr><td>臺灣水泥股份有限公司鼓山水泥製品廠</td><td style={{ display: "none" }}>34,172,618</td></tr>
                                                <tr><td>信義房屋仲介股份有限公司</td><td style={{ display: "none" }}>33,430,528</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>32,974,850</td></tr>
                                                <tr><td>桃園汽車客運股份有限公司中壢站及中公站</td><td style={{ display: "none" }}>32,558,381</td></tr>
                                                <tr><td>麗寶建設股份有限公司</td><td style={{ display: "none" }}>27,529,580</td></tr>
                                                <tr><td>臺灣水泥股份有限公司鼓山水泥製品廠仁武分廠</td><td style={{ display: "none" }}>27,449,141</td></tr>
                                                <tr><td>臺灣塑膠工業股份有限公司</td><td style={{ display: "none" }}>26,402,095</td></tr>
                                                <tr><td>臺灣塑膠工業股份有限公司冬山廠</td><td style={{ display: "none" }}>26,705,941</td></tr>
                                                <tr><td>台灣福雷電子股份有限公司</td><td style={{ display: "none" }}>25,225,994</td></tr>
                                                <tr><td>鈺通營造工程股份有限公司</td><td style={{ display: "none" }}>25,030,889</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>24,910,000</td></tr>
                                                <tr><td>輔仁大學</td><td style={{ display: "none" }}>24,648,823</td></tr>
                                                <tr><td>福聚太陽能股份有限公司</td><td style={{ display: "none" }}>22,967,721</td></tr>
                                                <tr><td>台灣本田汽車股份有限公司</td><td style={{ display: "none" }}>22,697,389</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司</td><td style={{ display: "none" }}>22,686,117</td></tr>
                                                <tr><td>味王股份有限公司豐田廠</td><td style={{ display: "none" }}>22,615,600</td></tr>
                                                <tr><td>台灣康寧顯示玻璃股份有限公司南科分公司台南廠</td><td style={{ display: "none" }}>22,511,663</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>22,418,700</td></tr>
                                                <tr><td>臺灣化學纖維股份有限公司</td><td style={{ display: "none" }}>22,375,383</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>22,176,128</td></tr>
                                                <tr><td>群創光電股份有限公司</td><td style={{ display: "none" }}>21,773,219</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>21,680,000</td></tr>
                                                <tr><td>匯豐台灣商業銀行有限公司</td><td style={{ display: "none" }}>21,408,673</td></tr>
                                                <tr><td>臺灣中小企業銀行股份有限公司</td><td style={{ display: "none" }}>21,391,950</td></tr>
                                                <tr><td>中國文化大學</td><td style={{ display: "none" }}>21,169,529</td></tr>
                                                <tr><td>中鴻鋼鐵股份有限公司</td><td style={{ display: "none" }}>20,839,956</td></tr>
                                                <tr><td>慶隆預拌混凝土股份有限公司</td><td style={{ display: "none" }}>20,081,250</td></tr>
                                                <tr><td>中華電信股份有限公司台灣南區分公司台中營運處</td><td style={{ display: "none" }}>123,318,398</td></tr>
                                                <tr><td>臺灣永光化學工業股份有限公司第二廠</td><td style={{ display: "none" }}>21,396,071</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        7,091,672,524
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab100" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        100年度民間企業團體推動綠色採購績優單位（採購金額逾2仟萬元），共記45個單位，綠色採購總金額達37億7453萬7,291元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>永豐餘工業用紙公司竹南廠</td><td style={{ display: "none" }}>488,991,773</td></tr>
                                                <tr><td>永豐餘造紙股份有限公司(久堂廠)</td><td style={{ display: "none" }}>298,559,619</td></tr>
                                                <tr><td>統一超商股份有限公司</td><td style={{ display: "none" }}>273,489,668</td></tr>
                                                <tr><td>聯華電子股份有限公司</td><td style={{ display: "none" }}>231,747,092</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>191,424,000</td></tr>
                                                <tr><td>桃園汽車客運股份有限公司</td><td style={{ display: "none" }}>177,701,400</td></tr>
                                                <tr><td>中華電信股份有限公司南區分公司</td><td style={{ display: "none" }}>165,737,893</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>160,504,298</td></tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>137,637,152</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司</td><td style={{ display: "none" }}>110,871,334</td></tr>
                                                <tr><td>遠傳電信股份有限公司</td><td style={{ display: "none" }}>92,040,000</td></tr>
                                                <tr><td>統一星巴克股份有限公司</td><td style={{ display: "none" }}>90,120,597</td></tr>
                                                <tr><td>南亞塑膠工業股份有限公司</td><td style={{ display: "none" }}>88,245,322</td></tr>
                                                <tr><td>台灣化學纖維股份有限公司</td><td style={{ display: "none" }}>87,476,340</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td><td style={{ display: "none" }}>81,591,437</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>77,402,630</td></tr>
                                                <tr><td>奇美電子股份有限公司南科分公司</td><td style={{ display: "none" }}>77,124,440</td></tr>
                                                <tr><td>中華電信股份有限公司行動通信分公司</td><td style={{ display: "none" }}>62,977,768</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td><td style={{ display: "none" }}>58,777,728</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>57,591,085</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠</td><td style={{ display: "none" }}>51,722,979</td></tr>
                                                <tr><td>台灣塑膠工業股份有限公司</td><td style={{ display: "none" }}>48,912,955</td></tr>
                                                <tr><td>信義房屋仲介股份有限公司</td><td style={{ display: "none" }}>47,345,330</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>41,700,738</td></tr>
                                                <tr><td>正隆股份有限公司竹北廠</td><td style={{ display: "none" }}>36,989,233</td></tr>
                                                <tr><td>奇美電子股份有限公司</td><td style={{ display: "none" }}>36,627,657</td></tr>
                                                <tr><td>長庚醫療財團法人</td><td style={{ display: "none" }}>36,557,241</td></tr>
                                                <tr><td>正隆股份有限公司</td><td style={{ display: "none" }}>34,570,075</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>34,000,000</td></tr>
                                                <tr><td>匯豐(台灣)商業銀行有限公司</td><td style={{ display: "none" }}>32,355,275</td></tr>
                                                <tr><td>特力屋股份有限公司特力家居南崁分公司</td><td style={{ display: "none" }}>31,660,000</td></tr>
                                                <tr><td>玉山銀行</td><td style={{ display: "none" }}>30,985,553</td></tr>
                                                <tr><td>台灣水泥股份有限公司鼓山水泥製品廠仁武分廠</td><td style={{ display: "none" }}>27,042,388</td></tr>
                                                <tr><td>旺宏電子股份有限公司</td><td style={{ display: "none" }}>26,816,305</td></tr>
                                                <tr><td>輔仁大學</td><td style={{ display: "none" }}>25,404,941</td></tr>
                                                <tr><td>中國文化大學</td><td style={{ display: "none" }}>25,008,731</td></tr>
                                                <tr><td>元大金融控股股份有限公司</td><td style={{ display: "none" }}>24,148,784</td></tr>
                                                <tr><td>安侯建業聯合會計師事務所</td><td style={{ display: "none" }}>22,947,259</td></tr>
                                                <tr><td>中華電信股份有限公司北區分公司台北營運處</td><td style={{ display: "none" }}>22,758,623</td></tr>
                                                <tr><td>億欣營造股份有限公司</td><td style={{ display: "none" }}>22,576,038</td></tr>
                                                <tr><td>潤泰水泥股份有限公司(冬山工廠)</td><td style={{ display: "none" }}>22,501,352</td></tr>
                                                <tr><td>中華電信股份有限公司南區分公司台中營運處</td><td style={{ display: "none" }}>21,058,158</td></tr>
                                                <tr><td>財團法人彰化基督教醫院</td><td style={{ display: "none" }}>20,463,896</td></tr>
                                                <tr><td>台北市立萬芳醫院-委託財團法人台北醫學大學辦理</td><td style={{ display: "none" }}>20,190,030</td></tr>
                                                <tr><td>台灣康寧顯示玻璃股份有限公司</td><td style={{ display: "none" }}>20,182,174</td></tr>
                                                <tr style={{ fontWeight: "bold", display: "none" }}>
                                                    <td>
                                                        &nbsp;
                                                    </td>
                                                    <td>
                                                        3,774,537,291
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab99" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        99年度民間企業團體推動綠色採購績優單位（採購金額逾2仟萬元），共記37個單位，綠色採購總金額達27億6291萬6,378元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th >
                                                        申報單位
                                                    </th>
                                                    <th style={{ display: "none" }}>
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td >製造業（13單位）</td><td style={{ display: "none" }}>&nbsp;</td>
                                                </tr>
                                                <tr><td>永豐餘工業用紙股份有限公司竹南廠</td><td style={{ display: "none" }}>476,925,825</td></tr>
                                                <tr><td>瑞興工業股份有限公司</td><td style={{ display: "none" }}>123,201,000</td></tr>
                                                <tr><td>台灣化學纖維股份有限公司</td><td style={{ display: "none" }}>115,385,924</td></tr>
                                                <tr><td>南亞塑膠工業股份有限公司</td><td style={{ display: "none" }}>112,301,830</td></tr>
                                                <tr><td>潤弘精密工程事業股份有限公司</td><td style={{ display: "none" }}>82,715,862</td></tr>
                                                <tr><td>名牌食品股份有限公司</td><td style={{ display: "none" }}>58,172,561</td></tr>
                                                <tr><td>台灣塑膠工業股份有限公司</td><td style={{ display: "none" }}>49,500,129</td></tr>
                                                <tr><td>奇美電子股份有限公司</td><td style={{ display: "none" }}>48,732,331</td></tr>
                                                <tr><td>聯華電子(股)公司</td><td style={{ display: "none" }}>43,146,841</td></tr>
                                                <tr><td>台灣富士全錄股份有限公司</td><td style={{ display: "none" }}>32,190,834</td></tr>
                                                <tr><td>日月光半導體製造股份有限公司</td><td style={{ display: "none" }}>31,263,476</td></tr>
                                                <tr><td>台灣松下電器股份有限公司</td><td style={{ display: "none" }}>27,324,955</td></tr>
                                                <tr><td>廣翰光電股份有限公司</td><td style={{ display: "none" }}>20,000,000</td></tr>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td >醫療業（2單位）</td><td style={{ display: "none" }}>&nbsp;</td>
                                                </tr>
                                                <tr><td>長庚醫療財團法人</td><td style={{ display: "none" }}>39,971,406</td></tr>
                                                <tr><td>財團法人嘉義基督教醫院</td><td style={{ display: "none" }}>29,715,474</td></tr>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td >金融業（5單位）</td><td style={{ display: "none" }}>&nbsp;</td>
                                                </tr>
                                                <tr><td>國泰金融控股股份有限公司</td><td style={{ display: "none" }}>62,737,308</td></tr>
                                                <tr><td>富邦金融控股股份有限公司</td><td style={{ display: "none" }}>62,031,680</td></tr>
                                                <tr><td>匯豐(台灣)商業銀行股份有限公司</td><td style={{ display: "none" }}>43,027,366</td></tr>
                                                <tr><td>中國信託金融控股股份有限公司</td><td style={{ display: "none" }}>48,064,971</td></tr>
                                                <tr><td>玉山商業銀行股份有限公司</td><td style={{ display: "none" }}>34,945,209</td></tr>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td >鋼鐵業（2單位）</td><td style={{ display: "none" }}>&nbsp;</td>
                                                </tr>
                                                <tr><td>中龍鋼鐵股份有限公司</td><td style={{ display: "none" }}>180,546,000</td></tr>
                                                <tr><td>中國鋼鐵股份有限公司</td><td style={{ display: "none" }}>48,262,308</td></tr>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td >電信業（7單位）</td><td style={{ display: "none" }}>&nbsp;</td>
                                                </tr>
                                                <tr><td>中華電信股份有限公司南區分公司</td><td style={{ display: "none" }}>70,051,764</td></tr>
                                                <tr><td>中華電信股份有限公司行動通信分公司</td><td style={{ display: "none" }}>49,913,911</td></tr>
                                                <tr><td>中華電信股份有限公司數據電信分公司</td><td style={{ display: "none" }}>49,398,075</td></tr>
                                                <tr><td>中華電信股份有限公司台灣北區電信分公司</td><td style={{ display: "none" }}>44,924,975</td></tr>
                                                <tr><td>中華電信股份有限公司電信研究所</td><td style={{ display: "none" }}>42,825,186</td></tr>
                                                <tr><td>中華電信股份有限公司(總公司)</td><td style={{ display: "none" }}>28,946,205</td></tr>
                                                <tr><td>台灣大哥大股份有限公司</td><td style={{ display: "none" }}>23,640,236</td></tr>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td >服務業（8單位）</td><td style={{ display: "none" }}>&nbsp;</td>
                                                </tr>
                                                <tr><td>統一超商股份有限公司</td><td style={{ display: "none" }}>264,928,780</td></tr>
                                                <tr><td>桃園汽車客運股份有限公司</td><td style={{ display: "none" }}>129,948,749</td></tr>
                                                <tr><td>全家便利商店股份有限公司</td><td style={{ display: "none" }}>117,303,550</td></tr>
                                                <tr><td>萊爾富國際股份有限公司</td><td style={{ display: "none" }}>47,658,567</td></tr>
                                                <tr><td>信義房屋仲介股份有限公司</td><td style={{ display: "none" }}>46,013,860</td></tr>
                                                <tr><td>統一星巴克股份有限公司</td><td style={{ display: "none" }}>34,734,510</td></tr>
                                                <tr><td>安侯建業聯合會計師事務所</td><td style={{ display: "none" }}>21,659,024</td></tr>
                                                <tr><td>資誠聯合會計師事務所</td><td style={{ display: "none" }}>20,805,696</td></tr>
                                                <tr style={{ fontWeight: "bold" }}>
                                                    <td>綠色採購金額逾2仟萬元共計37家企業單位</td><td style={{ display: "none" }}>2,762,916,378</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab98" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        98年度民間企業團體推動綠色採購績優單位，共記20個單位，綠色採購總金額達159,395萬1,388元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "80px", textAlign: "center" }} id="county">
                                                        縣市別
                                                    </th>
                                                    <th style={{ width: "300px", textAlign: "center" }} id="industry">
                                                        民間企業團體業者
                                                    </th>
                                                    <th style={{ display: "none" }} id="dollar">
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" rowspan="11" headers="county"><b>臺北市</b></td>
                                                    <td headers="industry">南亞塑膠工業股份有限公司</td>
                                                    <td headers="dollar" style={{ display: "none" }}>61,407,649</td>
                                                </tr>
                                                <tr><td headers="industry">中華電信(股)公司北區分公司</td><td headers="dollar" style={{ display: "none" }}>51,493,990</td></tr>
                                                <tr><td headers="industry">台灣塑膠工業股份有限公司</td><td headers="dollar" style={{ display: "none" }}>40,196,616</td></tr>
                                                <tr><td headers="industry">中華電信(股)公司行動通信分公司</td><td headers="dollar" style={{ display: "none" }}>33,421,099</td></tr>
                                                <tr><td headers="industry">香港商上海匯豐銀行股份有限公司</td><td headers="dollar" style={{ display: "none" }}>33,132,667</td></tr>
                                                <tr><td headers="industry">中國信託商業銀行股份有限公司</td><td headers="dollar" style={{ display: "none" }}>30,833,631</td></tr>
                                                <tr><td headers="industry">統一開發股份有限公司</td><td headers="dollar" style={{ display: "none" }}>26,443,797</td></tr>
                                                <tr><td headers="industry">長庚醫療財團法人</td><td headers="dollar" style={{ display: "none" }}>24,670,725</td></tr>
                                                <tr><td headers="industry">玉山銀行</td><td headers="dollar" style={{ display: "none" }}>24,105,550</td></tr>
                                                <tr><td headers="industry">中華電信股份有限公司</td><td headers="dollar" style={{ display: "none" }}>21,201,319</td></tr>
                                                <tr><td headers="industry">信義房屋仲介股份有限公司</td><td headers="dollar" style={{ display: "none" }}>20,415,800</td></tr>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" rowspan="3" headers="county"><b>桃園市</b></td>
                                                    <td headers="industry">瑞興工業</td>
                                                    <td headers="dollar" style={{ display: "none" }}>100,000,000</td>
                                                </tr>
                                                <tr><td headers="industry">桃園汽車客運股份有限公司</td><td headers="dollar" style={{ display: "none" }}>80,659,751</td></tr>
                                                <tr><td headers="industry">中華電信股份有限公司電信研究所</td><td headers="dollar" style={{ display: "none" }}>24,630,951</td></tr>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" headers="county"><b>苗栗縣</b></td>
                                                    <td headers="industry">大夏紙業股份有限公司</td>
                                                    <td headers="dollar" style={{ display: "none" }}>440,029,770</td>
                                                </tr>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" headers="county"><b>雲林縣</b></td>
                                                    <td headers="industry">台灣化學纖維股份有限公司</td>
                                                    <td headers="dollar" style={{ display: "none" }}>76,927,208</td>
                                                </tr>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" headers="county"><b>臺南縣</b></td>
                                                    <td headers="industry">奇美電子股份有限公司</td>
                                                    <td headers="dollar" style={{ display: "none" }}>296,703,700</td>
                                                </tr>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" rowspan="2" headers="county"><b>高雄市</b></td>
                                                    <td headers="industry">中國鋼鐵股份有限公司</td>
                                                    <td headers="dollar" style={{ display: "none" }}>167,413,846</td>
                                                </tr>
                                                <tr><td headers="industry">中華電信股份有限公司南區分公司</td><td headers="dollar" style={{ display: "none" }}>20,178,597</td></tr>
                                                <tr>
                                                    <td className="WebControlsTableTextItem" headers="county"><b>宜蘭縣</b></td>
                                                    <td headers="industry">達和環保服務股份有限公司</td>
                                                    <td headers="dollar" style={{ display: "none" }}>20,084,722</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab97" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        97年度民間企業團體推動綠色採購績優單位，共記18個單位，綠色採購總金額達141,790萬6,614元。
                                    </div>
                                    <div className="reportdiv1">
                                        <table className="table reportPurchasePlan">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "80px", textAlign: "center" }} id="county">
                                                        縣市別
                                                    </th>
                                                    <th style={{ width: "300px", textAlign: "center" }} id="industry">
                                                        民間企業團體業者
                                                    </th>
                                                    <th style={{ display: "none" }} id="dollar">
                                                        環保產品採購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td className="WebControlsTableTextItem" rowspan="5" headers="county"><b>臺北市</b></td><td headers="industry">中華電信股份有限公司</td><td headers="dollar" style={{ display: "none" }}>26,184,956</td></tr>
                                                <tr><td headers="industry">新世紀資通股份有限公司</td><td headers="dollar" style={{ display: "none" }}>28,770,000</td></tr>
                                                <tr><td headers="industry">香港商上海匯豐銀行股份有限公司</td><td headers="dollar" style={{ display: "none" }}>29,370,238</td></tr>
                                                <tr><td headers="industry">中華電信股份有限公司行動通信分公司</td><td headers="dollar" style={{ display: "none" }}>38,164,980</td></tr>
                                                <tr><td headers="industry">遠傳電信股份有限公司</td><td headers="dollar" style={{ display: "none" }}>69,350,000</td></tr>
                                                <tr><td className="WebControlsTableTextItem" headers="county"><b>臺北縣</b></td><td headers="industry">明志科技大學</td><td headers="dollar" style={{ display: "none" }}>21,027,516</td></tr>
                                                <tr><td className="WebControlsTableTextItem" rowspan="2" headers="county"><b>桃園市</b></td><td headers="industry">長庚技術學院</td><td headers="dollar" style={{ display: "none" }}>34,741,113</td></tr>
                                                <tr><td headers="industry">長庚大學</td><td headers="dollar" style={{ display: "none" }}>48,380,586</td></tr>
                                                <tr><td className="WebControlsTableTextItem" rowspan="3" headers="county"><b>苗栗縣</b></td><td headers="industry">正裕起動有限公司</td><td headers="dollar" style={{ display: "none" }}>20,000,000</td></tr>
                                                <tr><td headers="industry">裕盛工業股份有限公司</td><td headers="dollar" style={{ display: "none" }}>20,180,000</td></tr>
                                                <tr><td headers="industry">大夏紙業股份有限公司</td><td headers="dollar" style={{ display: "none" }}>480,156,000</td></tr>
                                                <tr><td className="WebControlsTableTextItem" headers="county"><b>臺中縣</b></td><td headers="industry">中龍鋼鐵股份有限公司</td><td headers="dollar" style={{ display: "none" }}>294,087,511</td></tr>
                                                <tr><td className="WebControlsTableTextItem" rowspan="2" headers="county"><b>雲林縣</b></td><td headers="industry">南亞塑膠工業股份有限公司麥寮總廠</td><td headers="dollar" style={{ display: "none" }}>24,343,417</td></tr>
                                                <tr><td headers="industry">台灣化學纖維股份有限公司麥寮廠</td><td headers="dollar" style={{ display: "none" }}>71,609,175</td></tr>
                                                <tr><td className="WebControlsTableTextItem" rowspan="2" headers="county"><b>嘉義縣</b></td><td headers="industry">台灣化學纖維股份有限公司新港廠</td><td headers="dollar" style={{ display: "none" }}>23,882,238</td></tr>
                                                <tr><td headers="industry">南亞塑膠工業股份有限公司新港廠</td><td headers="dollar" style={{ display: "none" }}>56,104,360</td></tr>
                                                <tr><td className="WebControlsTableTextItem" rowspan="2" headers="county"><b>高雄市</b></td><td headers="industry">中華電信股份有限公司南區分公司</td><td headers="dollar" style={{ display: "none" }}>32,126,330</td></tr>
                                                <tr><td headers="industry">中國鋼鐵股份有限公司</td><td headers="dollar" style={{ display: "none" }}>99,428,194</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" style={showRow === "#tab96" ? style.expanded : style.collapsed} >
                                    <div className="clearfix"></div><br />
                                    <div className="section">
                                        96年度民間企業團體推動綠色採購績優單位，共記61個單位，綠色採購總金額達60,740萬6,075元。
                                    </div>
                                    <div className="reportdiv2">
                                        <table className="table report2">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "50px", textAlign: "center" }} id="county1">
                                                        縣市別
                                                    </th>
                                                    <th style={{ width: "190px", textAlign: "center" }} id="industry1">
                                                        民間企業團體業者
                                                    </th>
                                                    <th style={{ width: "110px", display: "none" }} id="dollar1">
                                                        環保產品採<br />
                                                        購金額/元
                                                    </th>
                                                    <th style={{ width: "60px", textAlign: "center" }} id="county2">
                                                        縣市別
                                                    </th>
                                                    <th style={{ width: "230px", textAlign: "center" }} id="industry2">
                                                        民間企業團體業者
                                                    </th>
                                                    <th style={{ width: "110px", display: "none" }} id="dollar2">
                                                        環保產品採<br />
                                                        購金額/元
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td rowspan="10" headers="county1">
                                                        苗栗縣
                                                    </td>
                                                    <td headers="industry1">
                                                        惠普股份有限公司國浦廠
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        35,000,000
                                                    </td>
                                                    <td headers="county2">
                                                        台南市
                                                    </td>
                                                    <td headers="industry2">
                                                        私立興國管理學院
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,360,474
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        裕盛工業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        26,000,000
                                                    </td>
                                                    <td headers="county2">
                                                        南投縣
                                                    </td>
                                                    <td headers="industry2">
                                                        南開技術學院
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,044,832
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        大夏紙業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        9,600,000
                                                    </td>
                                                    <td headers="county2">
                                                        嘉義縣
                                                    </td>
                                                    <td headers="industry2">
                                                        耐斯企業股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,840,606
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        台灣信德玻璃股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        6,000,000
                                                    </td>
                                                    <td rowspan="4" headers="county2">
                                                        嘉義市
                                                    </td>
                                                    <td headers="industry2">
                                                        財團法人嘉義基督教醫院
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        3,961,964
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        正達國際光電股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        3,700,000
                                                    </td>
                                                    <td headers="industry2">
                                                        嘉義市私立立仁高級中學
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,677,650
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        冠軍建材股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        2,900,000
                                                    </td>
                                                    <td headers="industry2">
                                                        嘉義市私立東吳高級工業家事職業學校
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,076,290
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        三得利興業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        2,000,000
                                                    </td>
                                                    <td headers="industry2">
                                                        祥太醫院
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,069,300
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        凱聚股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        2,000,000
                                                    </td>
                                                    <td rowspan="11" headers="county2">
                                                        新竹市
                                                    </td>
                                                    <td headers="industry2">
                                                        台灣積體電路製造股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        82,805,438
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        太平洋醫材股份有限公司銅鑼廠
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,000,000
                                                    </td>
                                                    <td headers="industry2">
                                                        台灣玻璃公司新竹廠
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        62,026,975
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        宏業電化股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,000,000
                                                    </td>
                                                    <td headers="industry2">
                                                        聯華電子股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        30,945,189
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="8" headers="county1">
                                                        台北市
                                                    </td>
                                                    <td headers="industry1">
                                                        遠傳電信股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        50,000,000
                                                    </td>
                                                    <td headers="industry2">
                                                        啟碁科技股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        20,994,923
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        遠雄營造股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        20,000,000
                                                    </td>
                                                    <td headers="industry2">
                                                        世界先進積體電路股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        11,315,242
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        新世紀資通股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        8,240,000
                                                    </td>
                                                    <td headers="industry2">
                                                        力晶半導體股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        10,146,500
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        台灣高速鐵路股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        6,620,000
                                                    </td>
                                                    <td headers="industry2">
                                                        旺宏電子股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        5,263,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        北台灣科學技術學院
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        6,057,000
                                                    </td>
                                                    <td headers="industry2">
                                                        和喬科技股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        3,817,072
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        亞都麗緻大飯店股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        4,918,500
                                                    </td>
                                                    <td headers="industry2">
                                                        中華大學 03-5186313曾筱均
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        2,685,987
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        台北市私立再興中學
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,926,100
                                                    </td>
                                                    <td headers="industry2">
                                                        嘉晶電子股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,157,505
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        新光三越南西分公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,220,000
                                                    </td>
                                                    <td headers="industry2">
                                                        柑仔店股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,014,546
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="8" headers="county1">
                                                        桃園市
                                                    </td>
                                                    <td headers="industry1">
                                                        久羿實業有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        5,851,280
                                                    </td>
                                                    <td rowspan="4" headers="county2">
                                                        新竹縣
                                                    </td>
                                                    <td headers="industry2">
                                                        大華技術學院
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        4,721,858
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        元智大學
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        3,244,846
                                                    </td>
                                                    <td headers="industry2">
                                                        大享容器工業股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,873,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        默克光電科技股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        2,700,000
                                                    </td>
                                                    <td headers="industry2">
                                                        明新科技大學
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,576,311
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        正隆股份有限公司大園廠
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        2,241,000
                                                    </td>
                                                    <td headers="industry2">
                                                        三陽工業股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,430,561
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        台達電子工業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,922,400
                                                    </td>
                                                    <td rowspan="4" headers="county2">
                                                        台中市
                                                    </td>
                                                    <td headers="industry2">
                                                        麗明營造股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,450,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        宏碁股份有限公司-桃園發貨中心
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,500,000
                                                    </td>
                                                    <td headers="industry2">
                                                        聯聚建設股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,300,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        大興高中
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,276,000
                                                    </td>
                                                    <td headers="industry2">
                                                        由鉅建設股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,250,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        東明纖維公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,000,000
                                                    </td>
                                                    <td headers="industry2">
                                                        龍寶建設股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        1,200,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td rowspan="5" headers="county1">
                                                        雲林縣
                                                    </td>
                                                    <td headers="industry1">
                                                        富喬工業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        65,758,571
                                                    </td>
                                                    <td rowspan="2" headers="county2">
                                                        高雄縣
                                                    </td>
                                                    <td headers="industry2">
                                                        中美水泥製品股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        12,000,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        福懋科技股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        31,205,090
                                                    </td>
                                                    <td headers="industry2">
                                                        逸錞企業有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        2,500,000
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        福懋興業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        19,908,138
                                                    </td>
                                                    <td headers="county2">
                                                        台中縣
                                                    </td>
                                                    <td headers="industry2">
                                                        立交實業有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        4,380,006
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        台灣色料廠有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,438,700
                                                    </td>
                                                    <td headers="county2">
                                                        高雄市
                                                    </td>
                                                    <td headers="industry2">
                                                        中國鋼鐵股份有限公司
                                                    </td>
                                                    <td headers="dollar2" style={{ display: "none" }}>
                                                        2,293,221
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td headers="industry1">
                                                        凱馨實業股份有限公司
                                                    </td>
                                                    <td headers="dollar1" style={{ display: "none" }}>
                                                        1,000,000
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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

export default withRouter(GreenPurchaseIntroPurchasePlan);
