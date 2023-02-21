import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseIntroLaw(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【機關綠色消費採購】綠色採購的法規"/>
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="綠色採購的法規" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroLaw`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">綠色採購的法規</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroElectronicReport`}><div className="col-12 col-md-6 col-lg-12">機關綠色採購電子申報措施</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroGovernment`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseProcurementPromote`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購推動成果查詢</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseGovPurchseLaw`}><div className="col-12 col-md-6 col-lg-12">政府採購相關法規</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>綠色採購的法規</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                以發起政府綠色採購行動，進而推動國家綠色消費，已經成國際間綠色消費的主流。一般來說推動的手法可區分為強制性法規或志願性協議方式，我國採取的方式是屬於前者，正式立法並強制推動，如此將綠色採購目標、產品項目與產品準則清楚規定，在相關事宜的遵循與實施也較容易執行。
                                </p>
                                <br /><br />
                                <p className="text-center text-bolder">「政府採購法」、「機關優先採購環境保護產品辦法」</p>
                                <p className="pt-3 mb-2 text-indent">
                                我國政府於 1998 年 5 月公布施行的「政府採購法」第 96 條中納入「政府機構得優先採購環境保護產品」之相關規定。 1999 年由環保署與公共工程委員會會銜公告「機關優先採購環境保護產品辦法」，除針對環境保護產品相關之專有名詞加以定義，並明訂相關產品採購之規定，另外，對於採購環保產品較具績效之機關應有所獎勵也規範於該辦法中。
                                </p>
                                <br /><br />
                                <p className="text-center text-bolder">「機關綠色採購績效評核作業要點」</p>
                                <p className="pt-3 mb-2 text-indent">
                                為順應二十一世紀之綠色消費潮流， 2001 年 7 月行政院頒布「機關綠色採購方案」，並為辦理核定機關綠色之執行積效，訂定「機關綠色採購績效評核作業要點」，透過環保署所組成之「機關綠色採購評核小組」，依評核指標及權重對受核各機關進行綠色採購績效評核。「機關綠色採購方案」對於綠色採購目標比率及推動範圍均有明確的說明，環保署也在 2007 年將採購目標比率上修至 83% ，以擴大機關綠色採購之效能。
                                </p>
                                <br /><br />
                                <p className="text-center text-bolder">「資源回收再利用法」.「第一批政府機關、公立學校、公營事業或機構<br />、軍事機關應優先採購環境保護產品項目」</p>
                                <p className="pt-3 mb-2 text-indent">
                                「資源回收再利用法」第 22 條亦明列各機關、公營單位學校，應優先採購政府認可之環境保護產品，並辦理相關之推廣活動。而「第一批政府機關、公立學校、公營事業或機構、軍事機關應優先採購環境保護產品項目」亦詳細列出機關應優先採購之環保產品項目及年度採購比例。
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

export default withRouter(GreenPurchaseIntroLaw);
