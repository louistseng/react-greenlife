import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import greenMarkLogo from '../../images1/greenLogo.gif';
import greenMarkSecondLogo from '../../images1/greenLogo2.png';
import greenMarkLogoSingleColor from '../../images1/greenLiving/greenmark_singlecolor.png';
import greenMarkExDeclarations from '../../images1/greenLiving/GreenMarkDeclarations1.jpg';
import greenMarkExLogo from '../../images1/greenLiving/GreenMarkDeclarations2.jpg';
import greenMarkExWord from '../../images1/greenLiving/GreenMarkDeclarations3.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroDeclarations(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【環保標章介紹】環保標章產品正確環境宣告方式" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="環保標章產品正確環境宣告方式" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroFirst`}><div className="col-12 col-md-6 col-lg-12">環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroSecond`}><div className="col-12 col-md-6 col-lg-12">第二類環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroDeclarations`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">環保標章產品<br />正確環境宣告方式</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroHistory`}><div className="col-12 col-md-6 col-lg-12">推動歷程及成果</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroInternational`}><div className="col-12 col-md-6 col-lg-12">國際交流</div></Link>
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>標示規定</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    依據「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」及各產品規格標準之標示規定。
                                </p>
                                <ol className="list-line-height">
                                    <li>本署向智慧財產局註冊之環保標章(左)及第二類環保標章(右)。</li>
                                    <div className="logo-wrapper space-evenly">
                                        <div className="text-center">
                                            <img src={greenMarkLogo} alt="環保標章圖像" />
                                            <p>環保標章圖案</p>
                                        </div>
                                        <div className="text-center">
                                            <img src={greenMarkSecondLogo} alt="第二類環保標章圖像" />
                                            <p>第二類環保標章圖案</p>
                                        </div>
                                    </div>
                                    <li>標章顏色應以國際標準色卡(Pantone Matching System)色票系統之綠色標準色(3415C號)單色印刷。</li>
                                    <li>經授與環保標章或第二類環保標章使用權之廠商(以下簡稱取得標章使用權廠商)應於環保標章或第二類環保標章使用期間內，依本署註冊之標章圖樣標示，<span className="text-bolder">不得變形或加註字樣</span>。但得依等比例放大或縮小，<span className="text-bolder">且其寬度不得小於0.5公分、高度不得小於1公分</span>。</li>
                                    <li>取得標章使用權廠商因產品包裝容器需求得申請調整標示顏色及標示方式，<span className="text-bolder">但以單色印刷為限，並應於申請時一併提出審查</span>。</li>
                                    <div className="logo-wrapper space-evenly">
                                        <div className="text-center">
                                            <p>環保標章原色</p>
                                            <img src={greenMarkLogo} alt="環保標章原色圖像" />
                                        </div>
                                        <div className="text-center">
                                            <p>顏色變更</p>
                                            <img src={greenMarkLogoSingleColor} alt="環保標章顏色變更圖像" />
                                        </div>
                                    </div>
                                    <li>取得標章使用權廠商應於取得證書之日起一個月內，依審查通過之環保標章或第二類環保標章標示方式，將標章標示於產品、包裝容器或服務場所，並將標示後之照片登錄於系統，由驗證機構確認。</li>
                                    <li>環境保護產品之產品名稱、外觀、包裝容器、圖文設計等事項應與申請文件一致。如有變更者，取得標章使用權廠商應檢具相關證明文件、技術文件或測試報告提出變更申請。</li>
                                </ol>
                            </div>

                            <div className="col-12 greenbar">
                                <h2>環保標章環境宣告標示方法</h2>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    除環保標章圖樣外，環境宣告需依據該項規格標準之標示規定標示，範例如下：
                                </p>
                                <div className="text-center">
                                    <img src={greenMarkExDeclarations} className="w-100" alt="環保標章環境宣告標示方法" />
                                    <p>備註：右圖黃圈為環保標章，藍圈為該產品之環境宣告</p>
                                </div>
                            </div>

                            <div className="col-12 greenbar">
                                <h2>錯誤使用環保標章LOGO範例</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    依據「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」第25點，廠商未經授與環保標章或第二類環保標章使用權而<span className="text-bolder">擅自使用標章於產品、包裝容器或其他消費者能取得之文件或資訊者</span>，應塗銷環保標章或第二類環保標章之標示；本署除依法追究其法律責任，並得公布廠商名稱及產品。情節重大者將依據違反商標法提起告訴。
                                </p>
                                <div className="text-center">
                                    <img src={greenMarkExLogo} className="w-100" alt="錯誤使用環保標章LOGO範例" />
                                </div>
                            </div>

                            <div className="col-12 greenbar">
                                <h2>錯誤使用環境保護產品或環保標章文字範例</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    依據「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」第26點，廠商就<span className="text-bolder">非屬環境保護產品之商品或服務，標示、宣傳或廣告其為環境保護產品</span>，應塗銷標示及停止刊播宣傳或廣告；本署除依法追究其法律責任， 並得公布廠商名稱及產品。情節重大者將依據違反公平交易法提起告訴。
                                </p>
                                <div className="text-center">
                                    <img src={greenMarkExWord} className="w-100" alt="錯誤使用環境保護產品或環保標章文字範例" />
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

export default withRouter(GreenMarkIntroDeclarations);
