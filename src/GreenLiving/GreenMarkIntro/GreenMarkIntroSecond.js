import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import greenMarkSecondLogo from '../../images1/greenLogo2.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroSecond(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【環保標章介紹】第二類環保標章" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="第二類環保標章" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroFirst`}><div className="col-12 col-md-6 col-lg-12">環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroSecond`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">第二類環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroDeclarations`}><div className="col-12 col-md-6 col-lg-12">環保標章產品<br />正確環境宣告方式</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroHistory`}><div className="col-12 col-md-6 col-lg-12">推動歷程及成果</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroInternational`}><div className="col-12 col-md-6 col-lg-12">國際交流</div></Link>
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>第二類環保標章</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <div className="logo-wrapper space-evenly">
                                    <img src={greenMarkSecondLogo} alt="第二類環保標章圖像" title="第二類環保標章圖像" />
                                    <p>以「一片綠色樹葉包裹著純淨、不受污染的地球」<br />
                                        ，並於右下角註記數字2，象徵產品符合「可回收、<br />
                                        低污染、省資源」的環保理念，但未有對應產品之<br />
                                        環保標章規格標準者，給予第二類環保標章圖案。</p>
                                </div>
                                <p className=" pt-3 mb-2 text-indent">
                                    第二類環保標章係環保署於103年9月11日函頒修正「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」為第二類環境保護產品之簡稱，該制度於自89年起推動，針對產品非屬本署公告之環保標章規格標準項目，但經認定符合減量、可重複使用、可回收再利用、低污染、省能源、省資源或對環境友善等環保特性，核予證明書。
                                </p>
                                <p className=" pt-3 mb-2 text-indent">
                                    環保署為推廣更多環保產品，於103年9月28日公告「第二類環保標章環境訴求評定基準」，內容包括適用範圍、用語及定義、特性及要求、標示及其他事項，其中適用範圍中，可申請主張之環境訴求項目，包括低污染、具可堆肥化、具可生物分解、具可拆解設計、具可回收設計、具可再使用、使用回收料、具可延長壽命、回收能源、製程省資源、製程或產品使用可再生能源、廢棄物減量、使用階段省能源及使用階段省水，共14項，廠商可依據產品主要特性選擇3項以內，作為申請之評定基準，並據以提出產品環保優越性之佐證資料，供驗證機構驗證審查，審查通過後，核發第二類環保標章使用證書，廠商可於產品或包裝標示第二類環保標章圖案，進而共同推動環保行銷，推廣更多環保產品。 (第二類環保標章環境訴求評定基準查詢)
                                </p>
                                <p className=" pt-3 mb-2 text-indent">
                                    可申請的環境訴求之定義及產品介紹如下:
                                </p>
                                <div>
                                    <table>
                                        <tr className="table-head-dark"><th>環境訴求</th><th>定義</th></tr>
                                        <tr className="table-row-light"><td>1.產品低污染</td><td>產品及其組成分未含特定物質或其含量低於其他同級產品。</td></tr>
                                        <tr className="table-row-dark"><td>2.具可堆肥化</td><td>產品或其組成分可被生物分解為相當均質性且穩定類似腐植質之物質。</td></tr>
                                        <tr className="table-row-light"><td>3.具可生物分解</td><td>產品可在特定情況下，於一定時間內生物分解至特定之程度。</td></tr>
                                        <tr className="table-row-dark"><td>4.具可拆解設計</td><td>產品於有用壽命結束後，其組件與零件可被再利用、回收、回收能源或其他可自廢棄物流中轉移的方式拆解。</td></tr>
                                        <tr className="table-row-light"><td>5.具可回收設計</td><td>產品或其組成分，可自廢棄物流中轉移出來，經收集處理，且以原料或產品的型態恢復使用。</td></tr>
                                        <tr className="table-row-dark"><td>6.具可再使用</td><td>產品未改變原物質形態，可直接重複使用或經過適當程序恢復原功用或部分功用後使用。</td></tr>
                                        <tr className="table-row-light"><td>7.使用回收料</td><td>產品使用回收料，其回收料摻配比率高於其他同級產品。</td></tr>
                                        <tr className="table-row-dark"><td>8.具可延長壽命</td><td>產品具更佳耐用性或可升級之特點，被設計為可延長使用壽命，以減少使用資源或減少廢棄物。</td></tr>
                                        <tr className="table-row-light"><td>9.回收能源</td><td>原本可能被當作廢棄物處置，卻經由管理程序中收集來自於物料或能源所製之能源。</td></tr>
                                        <tr className="table-row-dark"><td>10.製程省資源</td><td>製造產品時，減少所需物料、能源或水之使用量，優於同級產品。</td></tr>
                                        <tr className="table-row-light"><td>11.製程或產品使用可再生能源</td><td>製程或產品使用太陽能、風能、生質能及地熱等可再生能源。</td></tr>
                                        <tr className="table-row-dark"><td>12.廢棄物減量</td><td>產品或製程的改變，減少進入廢棄物流之物料量(質量)。</td></tr>
                                        <tr className="table-row-light"><td>13.使用階段省能源</td><td>產品在展現同等功能下，所能減少之能源消耗量優於同級產品。</td></tr>
                                        <tr className="table-row-dark"><td>14.使用階段省水</td><td>產品在展現同等功能下，所能減少之水量優於同級產品。</td></tr>
                                    </table>
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

export default withRouter(GreenMarkIntroSecond);
