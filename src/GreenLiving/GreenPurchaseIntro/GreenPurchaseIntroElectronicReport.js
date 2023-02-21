import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseIntroElectronicReport(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【機關綠色消費採購】機關綠色採購電子申報措施"/>
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="機關綠色採購電子申報措施" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroLaw`}><div className="col-12 col-md-6 col-lg-12">綠色採購的法規</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroElectronicReport`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">機關綠色採購電子申報措施</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroGovernment`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseProcurementPromote`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購推動成果查詢</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseGovPurchseLaw`}><div className="col-12 col-md-6 col-lg-12">政府採購相關法規</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>機關綠色採購電子申報措施</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                各政府機關往年皆透過Excel表格填報及另行下載匯整程式逐層彙總，不僅申報耗時，且申報資料僅為採購金額及採購比率，無法確實掌控機關實際採購情形。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                本署自96年完成「政府綠色採購網路申報系統」，推動網路電子化申報方式，導入共同供應契約電子採購資料，有效簡化申報流程及提升作業成效，大幅減少人力耗費、作業時間及提報時程。該系統整合各機關綠色採購申報資料，由系統自動產生各層級報表、統計資料及運算採購比率，且提昇申報系統管理功能，供主管機關即時瞭解所屬單位申報狀況及檢核各機關申報資料正確性，更有效管理、統計各機關採購成果及核算環境效益，以進一步分析各機關所採購之產品項目及金額，據以作為年度納入公告指定綠色採購項目之評估。此外，將規劃各機關年度績效評核採行線上評核，以有效掌握各機關辦理採購及宣導情形。
                                </p>
                            </div>

                            <div className="col-12 greenbar">
                                <h5>申報措施相關功能</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <ol>
                                    <li>運用機關網路資源及共同供應契約電子採購資料，簡化申報程序、減輕申報作業量、提高申報效率及申報資料正確性。</li>
                                    <li>提供產品類別及數量資料，估算綠色採購之環境效益。</li>
                                    <li>採行分層及電子化管理即時掌握各機關綠色採購推動情形。</li>
                                    <li>統計分析各機關綠色採購相關資料，作為政策推動規劃依據。</li>
                                    <li>申報系統採取分層管理方式，提供主管機關即時瞭解所屬單位申報狀況及檢核各機關申報資料正確性。</li>
                                    <li>整合各機關綠色採購申報資料，由系統自動產生各層級報表、統計資料及運算採購比率。</li>
                                    <li>導入共同供應契約電子採購資料，分析各機關所採購之產品項目及金額，據以作為年度納入公告指定綠色採購項目之評估。</li>
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

export default withRouter(GreenPurchaseIntroElectronicReport);
