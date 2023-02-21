import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import criteriaReviewProcedures1 from '../../images1/greenLiving/174-183-3-14-epa-1.jpg';
import criteriaReviewProcedures2 from '../../images1/greenLiving/174-183-3-14-epa-2.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroCriteriaReviewProcedures(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【規格標準訂定與查詢】規格標準之介紹-制訂審查程序" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="規格標準之介紹-制訂審查程序" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroCriteriaDraft`}><div className="col-12 col-md-6 col-lg-12">規格標準之介紹<br />-草案研擬</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroCriteriaReviewProcedures`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">規格標準之介紹<br />-制訂審查程序</div></Link>
                            <Link to={`/categories/GreenSpecificationSearch`}><div className="col-12 col-md-6 col-lg-12">環保標章<br />規格標準查詢</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>制訂審查程序</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    環保標章規格標準草案出爐後，會先經過環保署工作小組審查，通過後舉辦公聽會，邀請產業及相關單位之利害關係人一同討論，以利收集廣納各方意見。公聽會結束後，再舉行委員專家諮詢會，檢討公聽會的意見，哪些合理要求應該被採納或修正。最後，提交綠色消費暨環境保護產品審議會（簡稱審議會）審議，若審議通過，則予以公告。
                                </p>
                                <div className="text-center"><img src={criteriaReviewProcedures1} className="w-100" alt="環保標章規格標準制定審查程序" title="環保標章規格標準制定審查程序" /></div>
                                <p className="pt-3 mb-2 text-indent">
                                    其中扮演重要決策關鍵角色的審議會，係由環保署召集組成，委員經署內提名20至30位專家學者，由署長遴選出11至15位聘任，兩年一任。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    審議會成員包括環保署代表2至3位，專家學者4至7位，政府機關專家代表3位和民間相關團體代表2位。原則每個月召開一次會議，必要時也可召開臨時會議。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    透過前述審查程序如此層層意見的收集、彙整、修正與審定，最後擬定出的規範，即是綜合產官學界各方最大公約數的規格標準，未來同類性質產品如要申請環保標章，都必須符合此規範。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    另一方面，環保標章規格標準也並非萬年條款，而是會隨著產業趨勢、廠商生產技術的進步，以及環境保護法規等不同因素而予以修正。每次修正，就必須重新進行工作小組、公聽會、專家學者諮詢會乃至審議會的程序，讓環保標章的規格標準能與時俱進，永不與時代脫節。
                                </p>
                                <div className="text-center"><img src={criteriaReviewProcedures2} className="w-100" alt="公聽會的組成與辦理程序" title="公聽會的組成與辦理程序" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroCriteriaReviewProcedures);
