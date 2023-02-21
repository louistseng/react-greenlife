import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import buyBannerSmall from '../../images1/img/banner_buy_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenPurchaseIntroPurchaseAchieve(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【民間企業與團體綠色採購】民間企業與團體綠色採購成果統計" />
            <div className=""><img src={buyBannerSmall} className="w-100 banner" alt="民間企業與團體綠色採購成果統計" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroPriEnterprises`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購申報</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroEnterprisesPurch`}><div className="col-12 col-md-6 col-lg-12">綠色採購申報</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroPurchasePlan`}><div className="col-12 col-md-6 col-lg-12">民間企業與團體推動綠色採購績優單位</div></Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroPurchaseAchieve`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">民間企業與團體綠色採購成果統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>110年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>110年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>128家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>2,160家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣1,097,902萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>4,095,652人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>109年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>109年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>163家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>2,132家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣974,900萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>830,119人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>108年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>108年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>192家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>2,357家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣877,951萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>855,027人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>107年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>107年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>122家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>2,135家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣617,651萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>855,087人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>106年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>106年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>68家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>2,033家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣2,555,286萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>1,023,246人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>105年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>105年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>448家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>1,612家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣760,699萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>1,578,506人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>104年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>104年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>153家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>1,483家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣3,711,933萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>1,342,703人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>103年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>103年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>507家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>1,394家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣2,897,644萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>1,643,923人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>102年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>102年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>567家</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>1,114家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣5,011,917萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>2,830,116人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>101年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th>項次</th>
                                            <th>101年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>輔導設立綠色商店家數</td>
                                            <td>368家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品行銷通路相關活動場次</td>
                                            <td>2,758場次</td>
                                        </tr>
                                        <tr>
                                            <td>輔導民間企業及團體綠色採購家數</td>
                                            <td>826家</td>
                                        </tr>
                                        <tr>
                                            <td>環保產品採購金額</td>
                                            <td>總計新臺幣2,744,868萬元</td>
                                        </tr>
                                        <tr>
                                            <td>綠色消費宣導活動</td>
                                            <td>1,261,016人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 greenbar">
                                <h5>100年成果統計</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="table-report" style={{ margin: "auto" }}>
                                    <thead>
                                        <tr>
                                            <th id="item">項次</th>
                                            <th id="result">100年度綠色採購實施成果</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td headers="item">輔導設立綠色商店家數</td>
                                            <td headers="result">813家</td>
                                        </tr>
                                        <tr>
                                            <td headers="item">環保產品行銷通路相關活動場次</td>
                                            <td headers="result">1861場次</td>
                                        </tr>
                                        <tr>
                                            <td headers="item">輔導民間企業及團體綠色採購家數</td>
                                            <td headers="result">664家</td>
                                        </tr>
                                        <tr>
                                            <td headers="item">環保產品採購金額</td>
                                            <td headers="result">總計新臺幣3,978,156,014元</td>
                                        </tr>
                                        <tr>
                                            <td rowspan="5" headers="item">綠色消費宣導活動</td>
                                            <td headers="result">1. 說明會：883場/163099人</td>
                                        </tr>
                                        <tr>
                                            <td headers="result">2. 研習會：56場/10479人</td>
                                        </tr>
                                        <tr>
                                            <td headers="result">3. 觀摩會：14場/1659人</td>
                                        </tr>
                                        <tr>
                                            <td headers="result">4. 展覽會：21場/177307人次</td>
                                        </tr>
                                        <tr>
                                            <td headers="result">5. 專題演溝：30場/3876人次</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenPurchaseIntroPurchaseAchieve);
