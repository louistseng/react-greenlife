import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseGovPurchseLaw(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "${SSL}" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "${domainBackendFormal}/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "${domainBackendFormal}"

    return (
        <>
            <BreadCrumb currentPage="【機關綠色消費採購】政府採購相關法規" />
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="政府採購相關法規" /></div>
            <div className="">{/*  */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroLaw`}><div className="col-12 col-md-6 col-lg-12">綠色採購的法規</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroElectronicReport`}><div className="col-12 col-md-6 col-lg-12">機關綠色採購電子申報措施</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroGovernment`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseProcurementPromote`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購推動成果查詢</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseGovPurchseLaw`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">政府採購相關法規</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>政府採購相關法規</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <ul>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=1`} target="_blank" title="政府採購法(在新視窗開啟鏈結)">政府採購法</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=3`} target="_blank" title="資源回收再利用法(在新視窗開啟鏈結)">資源回收再利用法</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=2`} target="_blank" title="機關優先採購環境保護產品辦法(在新視窗開啟鏈結)">機關優先採購環境保護產品辦法</a></li>
                                    <li><a href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/DownCount.aspx?ID=99`} target="_blank" title="機關綠色採購績效評核作業要點(在新視窗開啟鏈結)">機關綠色採購績效評核作業要點</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenPurchaseGovPurchseLaw);
