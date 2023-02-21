import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseProcurementPromote(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【機關綠色消費採購】政府機關綠色採購推動成果查詢"/>
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="政府機關綠色採購推動成果查詢" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroLaw`}><div className="col-12 col-md-6 col-lg-12">綠色採購的法規</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroElectronicReport`}><div className="col-12 col-md-6 col-lg-12">機關綠色採購電子申報措施</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroGovernment`}><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseProcurementPromote`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">政府機關綠色採購推動成果查詢</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseGovPurchseLaw`}><div className="col-12 col-md-6 col-lg-12">政府採購相關法規</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>政府機關綠色採購推動成果</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2">
                                機關綠色採購推動方案實施以來，總綠色採購金額除91年度為26億3千萬餘元外，其餘各年介於56億元至102億元間，有效擴大環境保護產品市場規模，鼓勵業者推動綠色生產。至於各年機關總綠色採購比率表列如下（108與109年因評核制度調整，因此該比率為「綠色採購指定採購項目達成度」）：
                                </p>

                                <table class="table reportPurchasePlan">
                                    <thead>
                                        <tr className="text-center table-head-dark">
                                            <th>年度</th>
                                            <th>綠色採購金額(元)</th>
                                            <th>比率(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>91年</td>
                                            <td>2,634,652,907</td>
                                            <td>60.5</td>
                                        </tr>
                                        <tr>
                                            <td>92年</td>
                                            <td>5,613,231,539</td>
                                            <td>73.8</td>
                                        </tr>
                                        <tr>
                                            <td>93年</td>
                                            <td>5,708,307,338</td>
                                            <td>79.2</td>
                                        </tr>
                                        <tr>
                                            <td>94年</td>
                                            <td>6,776,501,951</td>
                                            <td>81.6</td>
                                        </tr>
                                        <tr>
                                            <td>95年</td>
                                            <td>6,382,963,966</td>
                                            <td>88.0</td>
                                        </tr>
                                        <tr>
                                            <td>96年</td>
                                            <td>5,921,437,441</td>
                                            <td>71.9</td>
                                        </tr>
                                        <tr>
                                            <td>97年</td>
                                            <td>6,082,720,773</td>
                                            <td>76.4</td>
                                        </tr>
                                        <tr>
                                            <td>98年</td>
                                            <td>6,137,185,055</td>
                                            <td>90.4</td>
                                        </tr>
                                        <tr>
                                            <td>99年</td>
                                            <td>8,056,227,469</td>
                                            <td>93.7</td>
                                        </tr>
                                        <tr>
                                            <td>100年</td>
                                            <td>8,706,854,346</td>
                                            <td>93.1</td>
                                        </tr>
                                        <tr>
                                            <td>101年</td>
                                            <td>9,510,663,512</td>
                                            <td>94.9</td>
                                        </tr>
                                        <tr>
                                            <td>102年</td>
                                            <td>6,764,744,848</td>
                                            <td>97.4</td>
                                        </tr>
                                        <tr>
                                            <td>103年</td>
                                            <td>5,919,304,877</td>
                                            <td>96.1</td>
                                        </tr>
                                        <tr>
                                            <td>104年</td>
                                            <td>7,264,226,549</td>
                                            <td>97.3</td>
                                        </tr>
                                        <tr>
                                            <td>105年</td>
                                            <td>7,581,144,118</td>
                                            <td>97.2</td>
                                        </tr>
                                        <tr>
                                            <td>106年</td>
                                            <td>9,189,070,469</td>
                                            <td>97.9</td>
                                        </tr>
                                        <tr>
                                            <td>107年</td>
                                            <td>9,700,701,215</td>
                                            <td>98.4</td>
                                        </tr>
                                        <tr>
                                            <td>108年</td>
                                            <td>10,224,266,330</td>
                                            <td>98.0</td>
                                        </tr>
                                        <tr>
                                            <td>109年</td>
                                            <td>10,140,914,203</td>
                                            <td>99.3</td>
                                        </tr>
                                        <tr>
                                            <td>110年</td>
                                            <td>10,734,358,265</td>
                                            <td>99.1</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="pt-3 mb-2">
                                為提昇政府機關綠色採購成果申報正確性、申報效率及估算環境效益，於96年9月啟用政府綠色採購網路申報系統。該系統導入工程會共同供應契約電子採購系統資料，減少重複填報，並採分層管理， 自動產生各層級報表及統計資料。根據109年度機關綠色採購產品數量估算環境及經濟效益包括減少砍伐540.3萬棵樹、減少17,617.3噸CO₂排放、省電3336,6萬度、省水4.7萬噸，節省用電約10,009.8萬元、用水費約56.9萬元。
除了行政院及所屬機關自91年起，即依據「機關綠色採購推動方案」積極推動綠色採購作業，根據92年7月施行之「資源回收再利用法」第22條規定，所有政府機關、公立學校、公營事業或機構、 軍事機關都應優先採購環境保護產品。環保署於94年8月公告第一批應優先採購環境保護產品後，總統府及其他四院（含所屬機關）隨即於94年下半年試辦綠色採購，並自95年起正式加入機關綠色採購行列。
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

export default withRouter(GreenPurchaseProcurementPromote);
