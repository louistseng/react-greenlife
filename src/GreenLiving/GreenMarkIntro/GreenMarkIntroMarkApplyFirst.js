import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import greenMarkValidationProcess1 from '../../images1/greenLiving/GreenMarkValidationProcessV2.jpg';
import greenMarkValidationProcess2 from '../../images1/greenLiving/GreenMarkValidationProcessV2_2.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApplyFirst(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】申請驗證流程" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="申請驗證流程" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div className="col-12 col-md-6 col-lg-12">申請作業要點<br />、規格標準</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFirst`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">申請驗證流程</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySecond`}><div className="col-12 col-md-6 col-lg-12">環保標章共通文件</div></Link>
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
                                <h1>申請驗證流程(逐案現場查核及新案)</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <ol>
                                    <li>申請方式以網路傳輸方式上傳電子檔至環保署指定資料庫登錄通過後，相關文件經列印、用印後向環保署遴選之驗證機構提出。</li>{/*  (<a href={`${SSL}//${domainBackendFormal}/GreenLife/Anonymous/LoginById.aspx`} target="_blank">電子化系統之申請介紹查詢</a>) */}
                                    <li>驗證機構資訊請至綠色生活資訊網查詢。 (<Link to={`/greenLabel/GreenMarkIntroMarkApplyFourth`} target="_blank">驗證機構資訊</Link>)</li>
                                    <li>標章申請案審查作業流程如下圖：</li>
                                </ol>
                                <div className="text-center"><img src={greenMarkValidationProcess1} className="w-100" alt="標章申請案逐案現場查核及新案審查作業流程" title="標章申請案逐案現場查核及新案審查作業流程" /></div>
                            </div>

                            <div className="col-12 greenbar">
                                <h2>申請驗證流程(非逐案現場查核)</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <ol>
                                    <li>申請方式以網路傳輸方式上傳電子檔至環保署指定資料庫登錄通過後，相關文件經列印、用印後向環保署遴選之驗證機構提出。</li>{/*  (<a href={`${SSL}//${domainBackendFormal}/GreenLife/Anonymous/LoginById.aspx`} target="_blank">電子化系統之申請介紹查詢</a>) */}
                                    <li>驗證機構資訊請至綠色生活資訊網查詢。 (<Link to={`/greenLabel/GreenMarkIntroMarkApplyFourth`} target="_blank">驗證機構資訊</Link>)</li>
                                    <li>標章申請案審查作業流程如下圖：</li>
                                </ol>
                                <div className="text-center"><img src={greenMarkValidationProcess2} className="w-100" alt="標章申請案非逐案現場查核審查作業流程" title="標章申請案非逐案現場查核審查作業流程" /></div>
                                <p className="pt-3 mb-2 text-indent">
                                    依據103年審議會決議原則篩選，免逐案現場查核之產品規格標準分類為(OA)辦公室用具產品類（墨水筆、油墨、數位複印機、辦公室用桌、辦公室用椅、電動碎紙機、數位複印機版紙）、工業類、日常用品類、省水產品類 、省電產品類、家電產品類與資訊產品類。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    其餘產品如(OA)辦公室用具產品類（辦公室用紙、印刷品、紙製膠帶）、資源回收產品類、清潔產品類、可分解產品類、有機資材類、建材類、利用太陽能資源、服務類與第二類環保標章產品應依申請驗證流程進行逐案現場查核。
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

export default withRouter(GreenMarkIntroMarkApplyFirst);
