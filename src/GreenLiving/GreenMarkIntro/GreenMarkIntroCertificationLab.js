import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroCertificationLab(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【檢測實驗室資訊查詢】經認證的檢測實驗室" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="經認證的檢測實驗室" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroCertificationLab`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">經認證的檢測實驗室</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroApprovalPractice`}><div className="col-12 col-md-6 col-lg-12">檢測機構(實驗室)<br />申請檢測項目登錄<br />認可規範</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLaboratory`}><div className="col-12 col-md-6 col-lg-12">實驗室查詢</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLabApprovedList`}><div className="col-12 col-md-6 col-lg-12">環保署審議委員認可清單</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>經認證的檢測實驗室</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className=" pt-3 mb-2 text-indent">
                                    申請使用環保標章或第二類產品，需提供相關條件、品質及安全性等規定之必要檢測證明文件。因此，檢測報告，應委託經認證之專業檢測機構辦理，檢測項目應包括在認證範圍內，並符合環保標章及第二類產品申請案件檢測報告基本規範。
                                </p>
                                <p className=" pt-3 mb-2 text-indent">
                                    經認證之專業檢測機構，係指經本署、財團法人全國認證基金會、當地國已簽署國際實驗室認證聯盟(ILAC)或亞太認證聯盟(APAC)相互承認協議之認證機構及國內政府機關等認證通過之檢測機構。但於特殊檢測技術申請時尚無經認證之檢測機構者，得經本署同意委託公私立學術研究機構代驗並出具同內容之檢測報告。
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

export default withRouter(GreenMarkIntroCertificationLab);
