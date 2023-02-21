import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroLaboratory(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【檢測實驗室資訊查詢】實驗室查詢" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="實驗室查詢" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroCertificationLab`}><div className="col-12 col-md-6 col-lg-12">經認證的檢測實驗室</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroApprovalPractice`}><div className="col-12 col-md-6 col-lg-12">檢測機構(實驗室)<br />申請檢測項目登錄<br />認可規範</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLaboratory`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">實驗室查詢</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLabApprovedList`}><div className="col-12 col-md-6 col-lg-12">環保署審議委員認可清單</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>實驗室查詢</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2">
                                    ※申請環境保護產品委託經認證之專業檢測機構，以經<span className="text-bolder">本署、財團法人全國認證基金會、當地國已簽署國際實驗室認證聯盟(ILAC)或亞太認證聯盟(APAC)相互承認協議之認證機構及國內政府機關等認證通過</span>最新資訊為主，國內經認證專業檢測機構相關查詢網址如下：
                                </p>
                                <p className="pt-3 mb-2 text-indent"><a href="https://www.taftw.org.tw/directory/scheme/testLab/list/" target="_blank" title="財團法人全國認證基金會(TAF)(在新視窗開啟鏈結)">(1) 財團法人全國認證基金會(TAF)</a></p>
                                <p className="pt-3 mb-2 text-indent"><a href="https://www.epa.gov.tw/niea/A048BA729D1F7D58" target="_blank" title="行政院環境保護署環境檢驗所(在新視窗開啟鏈結)">(2) 行政院環境保護署環境檢驗所</a></p>
                                {/*<a href="https://greenliving.epa.gov.tw/newPublic/Laboratory/ApprovedList" target="_blank">*/}
                                <p className="pt-3 mb-2 text-indent"><Link to={`/greenLabel/GreenMarkIntroLabApprovedList`}>(3) 環保署審議委員認可清單</Link></p>
                                <p className="pt-3 mb-2">
                                    ※環保標章產品項目中，<span className="text-bolder">80塗料/25家用清潔劑/68肌膚毛髮清潔劑/130工商業用清潔劑/50回收再利用碳粉匣 /84生物可分解塑膠</span>，共6項產品，產品成分檢測時，應由申請廠商會同<span style={{ color: "blue" }}>本署登錄之檢測機構(經認證之專業檢測機構)</span>派員，於該類產品銷售場所進行隨機採樣；必要時，得由環保署派員會同至生產場所進行採樣。
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

export default withRouter(GreenMarkIntroLaboratory);
