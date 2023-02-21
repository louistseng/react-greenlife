import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import greenMarkLogo from '../../images1/greenLogo.gif';

import computerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/A1-009-017電腦主機.png';
import printerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/A2-011-019列印機.png';
import paperLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/A3-027-002辦公室用紙.png';
import cleanerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/A4-008-068肌膚毛髮清潔劑.png';
import washerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/A5-018-023洗衣機.png';
import labtopLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/B1-012-059筆記型電腦.png';
import printImageLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/B2-015-078影像輸出裝置.png';
import cutterLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/B3-030-146電動碎紙機.png';
import homeCleanerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/B4-007-025家用清潔劑.png';
import refigerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/B5-019-028電冰箱.png';
import personComputerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/C1-013-066桌上型個人電腦.png';
import scanerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/C2-017-088掃描器.png';
import carLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/C3-040-094小汽車.png';
import toiletPaperLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/C4-001-003衛生用紙.png';
import airConditionerLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/C5-020-029冷氣機.png';
import monitorLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/D1-010-018顯示器.png';
import tonerCartriLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/D2-014-074原生碳粉匣.png';
import motorLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/D3-042-110機車.png';
import waterSaveToiletLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/D4-023-027二段式省水馬桶.png';
import bedLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/D5-041-097床墊.png';
import bringProjectorLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/E1-016-082可攜式投影機.png';
import recyTonerCartriLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/E2-004-050回收再利用碳粉匣.png';
import eMotorLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/E3-039-021電動機車.png';
import faucetLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/E4-024-040省水龍頭及其器材配件.png';
import cupLogo from '../../images1/greenLiving/GreenMarkIntro/ProductIcon/E5-043-113重複使用飲料容器.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroFirst(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【環保標章介紹】環保標章" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="環保標章" /></div>
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroFirst`} className="leftbtnFocus" title="前往連結"><div className="col-12 col-md-6 col-lg-12">環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroSecond`}><div className="col-12 col-md-6 col-lg-12" title="前往連結">第二類環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroDeclarations`}><div className="col-12 col-md-6 col-lg-12" title="前往連結">環保標章產品<br />正確環境宣告方式</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroHistory`}><div className="col-12 col-md-6 col-lg-12" title="前往連結">推動歷程及成果</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroInternational`}><div className="col-12 col-md-6 col-lg-12" title="前往連結">國際交流</div></Link>
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>環保標章</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <div className="logo-wrapper space-evenly">
                                    <img src={greenMarkLogo} alt="環保標章圖像" />
                                    <p>「一片綠色樹葉包裹著純淨、不受污染的地球」<br />
                                        象徵「可回收、低污染、省資源」的環保理念。</p>
                                </div>
                                <p className=" pt-3 mb-2 text-indent">
                                    民國60年代歐美國家興起環保運動，推行「綠色消費」概念，減少過度生產與消費之生活型態而造成對環境的衝擊，環保標章運動因應而生且蓬勃發展。66年由德國政府首創藍天使環保標章計畫，77年加拿大政府的環境選擇標章計畫與78年日本及北歐國家的環保標章制度也都陸續推出。
                                </p>
                                <p className=" pt-3 mb-2 text-indent">
                                    環保署為順應世界環保趨勢，特參考國際先進國家實施環保標章之經驗，及國內標章制度，於民國81年推動環保標章制度，經公開徵選環保標章圖樣，於81年9月16日取得服務標章專用權，廠商產品經認可符合環保標章規格標準者，核發環保標章使用證書，廠商可於產品或包裝上，標示環保標章圖樣，供民眾採購辨識，透過環保標章制度，鼓勵廠商設計製造產品時，考量降低環境之污染及節省資源之消耗，促進廢棄物之減量及回收再利用，同時喚醒消費者慎選可回收、低污染、省資源之產品，以提昇環境品質。
                                </p>
                                <p className=" pt-3 mb-2 text-indent">
                                    環保標章是依據ISO 14024環保標章原則與程序而定，其本質上，是一種經濟工具，目的是鼓勵那些對於環境造成較少衝擊的產品與服務，透過生產製造、供應及需求之市場機制，驅動環境保護潛力。為達成其效用，我國環保標章只頒發給同一類產品中，前20%~30%環保表現最優良的產品。
                                </p>
                                <p className=" pt-3 mb-2 text-indent">
                                    自民國82年2月15日公告第一批產品環保標章規格標準起，迄今已有14大類產品類別，超過1百多種產品項目，詳細內容，請至本網站之 <Link to={`/categories/GreenSpecificationSearch`} target="_blank" title="另開視窗">環保標章規格標準查詢</Link> 、<Link to={`/categories/greenProductSearch`} target="_blank" title="另開視窗">環保標章產品查詢功能</Link> ，進一步認識環保標章認證的產品。
                                </p>
                            </div>
                            <div className="col-12 greenbar">
                                <h2>常見的環保標章產品（圖片點下去就能查到產品唷）</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2" style={{ width: "100%" }}>
                                {/*<table className="w-100 text-center">
                                <tr className="productlist-index">
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=17`} target="_blank" title="另開視窗"><img src={computerLogo} alt="電腦主機" title="電腦主機" /><p>電腦主機</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=59`} target="_blank" title="另開視窗"><img src={labtopLogo} alt="筆記型電腦" title="筆記型電腦" /><p>筆記型電腦</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=66`} target="_blank" title="另開視窗"><img src={personComputerLogo} alt="桌上型個人電腦" title="桌上型個人電腦" /><p>桌上型個人電腦</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=18`} target="_blank" title="另開視窗"><img src={monitorLogo} alt="顯示器" title="顯示器" /><p>顯示器</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=82`} target="_blank" title="另開視窗"><img src={bringProjectorLogo} alt="可攜式投影機" title="可攜式投影機" /><p>可攜式投影機</p></Link></td>
                                </tr>
                                <tr className="productlist-index">
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=19`} target="_blank" title="另開視窗"><img src={printerLogo} alt="列印機" title="列印機" /><p>列印機</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=78`} target="_blank" title="另開視窗"><img src={printImageLogo} alt="影像輸出裝置" title="影像輸出裝置" /><p>影像輸出裝置</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=88`} target="_blank" title="另開視窗"><img src={scanerLogo} alt="掃描器" title="掃描器" /><p>掃描器</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=74`} target="_blank" title="另開視窗"><img src={tonerCartriLogo} alt="原生碳粉匣" title="原生碳粉匣" /><p>原生碳粉匣</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=1&cn=50`} target="_blank" title="另開視窗"><img src={recyTonerCartriLogo} alt="回收再利用碳粉匣" title="回收再利用碳粉匣" /><p>回收再利用碳粉匣</p></Link></td>
                                </tr>
                                <tr className="productlist-index">
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=7&cn=2`} target="_blank" title="另開視窗"><img src={paperLogo} alt="辦公室用紙" title="辦公室用紙" /><p>辦公室用紙</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=7&cn=146`} target="_blank" title="另開視窗"><img src={cutterLogo} alt="電動碎紙機" title="電動碎紙機" /><p>電動碎紙機</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=94`} target="_blank" title="另開視窗"><img src={carLogo} alt="小汽車" title="小汽車" /><p>小汽車</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=110`} target="_blank" title="另開視窗"><img src={motorLogo} alt="機車" title="機車" /><p>機車</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=21`} target="_blank" title="另開視窗"><img src={eMotorLogo} alt="電動機車" title="電動機車" /><p>電動機車</p></Link></td>
                                </tr>
                                <tr className="productlist-index">
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=2&cn=68`} target="_blank" title="另開視窗"><img src={cleanerLogo} alt="肌膚毛髮清潔劑" title="肌膚毛髮清潔劑" /><p>肌膚毛髮<br />清潔劑</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=2&cn=25`} target="_blank" title="另開視窗"><img src={homeCleanerLogo} alt="家用清潔劑" title="家用清潔劑" /><p>家用清潔劑</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=1&cn=3`} target="_blank" title="另開視窗"><img src={toiletPaperLogo} alt="衛生用紙" title="衛生用紙" /><p>衛生用紙</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=5&cn=27`} target="_blank" title="另開視窗"><img src={waterSaveToiletLogo} alt="二段式省水馬桶" title="二段式省水馬桶" /><p>二段式<br />省水馬桶</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=5&cn=40`} target="_blank" title="另開視窗"><img src={faucetLogo} alt="省水龍頭及其器材配件" title="省水龍頭及其器材配件" /><p>省水龍頭<br />及其器材配件</p></Link></td>
                                </tr>
                                <tr className="productlist-index">
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=23`} target="_blank" title="另開視窗"><img src={washerLogo} alt="洗衣機" title="洗衣機" /><p>洗衣機</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=28`} target="_blank" title="另開視窗"><img src={refigerLogo} alt="電冰箱" title="電冰箱" /><p>電冰箱</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=29`} target="_blank" title="另開視窗"><img src={airConditionerLogo} alt="冷氣機" title="冷氣機" /><p>冷氣機</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=97`} target="_blank" title="另開視窗"><img src={bedLogo} alt="床墊" title="床墊" /><p>床墊</p></Link></td>
                                    <td><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=113`} target="_blank" title="另開視窗"><img src={cupLogo} alt="重複使用飲料容器" title="重複使用飲料容器" /><p>重複使用<br />飲料容器</p></Link></td>
                                </tr>
                                </table>*/}
                                <div className="productlist-index w-100 text-center">
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=17`} target="_blank" title="另開視窗"><img src={computerLogo} alt="另開視窗" /><p>電腦主機</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=59`} target="_blank" title="另開視窗"><img src={labtopLogo} alt="另開視窗" /><p>筆記型電腦</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=66`} target="_blank" title="另開視窗"><img src={personComputerLogo} alt="另開視窗" /><p>桌上型個人電腦</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=18`} target="_blank" title="另開視窗"><img src={monitorLogo} alt="另開視窗" /><p>顯示器</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=82`} target="_blank" title="另開視窗"><img src={bringProjectorLogo} alt="另開視窗" /><p>可攜式投影機</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=19`} target="_blank" title="另開視窗"><img src={printerLogo} alt="另開視窗" /><p>列印機</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=78`} target="_blank" title="另開視窗"><img src={printImageLogo} alt="另開視窗" /><p>影像輸出裝置</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=88`} target="_blank" title="另開視窗"><img src={scanerLogo} alt="另開視窗" /><p>掃描器</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=3&cn=74`} target="_blank" title="另開視窗"><img src={tonerCartriLogo} alt="另開視窗" /><p>原生碳粉匣</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=1&cn=50`} target="_blank" title="另開視窗"><img src={recyTonerCartriLogo} alt="另開視窗" /><p>回收再利用碳粉匣</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=7&cn=2`} target="_blank" title="另開視窗"><img src={paperLogo} alt="另開視窗" /><p>辦公室用紙</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=7&cn=146`} target="_blank" title="另開視窗"><img src={cutterLogo} alt="另開視窗" /><p>電動碎紙機</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=94`} target="_blank" title="另開視窗"><img src={carLogo} alt="另開視窗" /><p>小汽車</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=110`} target="_blank" title="另開視窗"><img src={motorLogo} alt="另開視窗" /><p>機車</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=21`} target="_blank" title="另開視窗"><img src={eMotorLogo} alt="另開視窗" /><p>電動機車</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=2&cn=68`} target="_blank" title="另開視窗"><img src={cleanerLogo} alt="另開視窗" /><p>肌膚毛髮<br />清潔劑</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=2&cn=25`} target="_blank" title="另開視窗"><img src={homeCleanerLogo} alt="另開視窗" /><p>家用清潔劑</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=1&cn=3`} target="_blank" title="另開視窗"><img src={toiletPaperLogo} alt="另開視窗" /><p>衛生用紙</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=5&cn=27`} target="_blank" title="另開視窗"><img src={waterSaveToiletLogo} alt="另開視窗" /><p>二段式<br />省水馬桶</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=5&cn=40`} target="_blank" title="另開視窗"><img src={faucetLogo} alt="另開視窗" /><p>省水龍頭<br />及其器材配件</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=23`} target="_blank" title="另開視窗"><img src={washerLogo} alt="另開視窗" /><p>洗衣機</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=28`} target="_blank" title="另開視窗"><img src={refigerLogo} alt="另開視窗" /><p>電冰箱</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=4&cn=29`} target="_blank" title="另開視窗"><img src={airConditionerLogo} alt="另開視窗" /><p>冷氣機</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=97`} target="_blank" title="另開視窗"><img src={bedLogo} alt="另開視窗" /><p>床墊</p></Link></div>
                                    <div className="productlist-content-div"><Link to={`/categories/greenProductSearch?searched=true&page=1&sta=1&k=&crn=&t=&y=&m=&ctn=11&cn=113`} target="_blank" title="另開視窗"><img src={cupLogo} alt="另開視窗" /><p>重複使用<br />飲料容器</p></Link></div>
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

export default withRouter(GreenMarkIntroFirst);
