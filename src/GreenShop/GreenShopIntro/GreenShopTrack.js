import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../GreenLiving/GreenLabel.css'

import greenmark1 from '../../images1/greenLogo.gif';
import greenmark2 from '../../images1/greenLogo2.png';
import carbonlabel from '../../images1/greenShop/carbonLabel.png';
import carbonreduction from '../../images1/greenShop/CarbonReduction.png';
import saveenergy from '../../images1/greenShop/energyLabel.png';
import watersaving from '../../images1/greenShop/waterLabel.png';
import greenbuilding from '../../images1/greenShop/buildingLabel.png';

import markAustralia from '../../images1/greenLiving/Mark/Mark_Australia.jpg';
import markCanada from '../../images1/greenLiving/Mark/Mark_Canada.jpg';
import markCzech from '../../images1/greenLiving/Mark/Mark_Czech.jpg';
import markJapan from '../../images1/greenLiving/Mark/Mark_Japan.jpg';
import markKorea from '../../images1/greenLiving/Mark/Mark_Korea.jpg';
import markNewZealand from '../../images1/greenLiving/Mark/Mark_NewZealand.jpg';
import markPhilippines from '../../images1/greenLiving/Mark/Mark_Philippines.jpg';
import markThailand from '../../images1/greenLiving/Mark/Mark_Thailand.jpg';
import markUkraine from '../../images1/greenLiving/Mark/Mark_Ukraine.png';
import markUSA from '../../images1/greenLiving/Mark/Mark_USA.jpg';
import markEnergyStar from '../../images1/greenLiving/Mark/Mark_Energystar.png';
import markFSC from '../../images1/greenLiving/Mark/Mark_FSC.png';
import markPEFC from '../../images1/greenLiving/Mark/Mark_PEFC.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenShopTrack(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="綠色商店追蹤管理" /> {/*  */}
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/categories/GreenShopIntro/GreenShopApply`}><div className="col-12 col-md-6 col-lg-12">綠色商店申請與管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopReview`}><div className="col-12 col-md-6 col-lg-12">綠色商店審核標準及執行程序</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopTrack`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">綠色商店追蹤管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopStatistics`}><div className="col-12 col-md-6 col-lg-12">綠色商店歷年新增家數統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>綠色商店追蹤管理</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                (一)為掌握我國綠色產品販售情形，各地方環保局應追蹤轄內綠色商店各年度綠色產品販售金額，並申報予環保署，可申報之標章產品詳見附表。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                (二)為提升綠色商店曝光度，本署於「綠色生活資訊網」揭露各綠色商店業者資訊及販售之綠色產品，為確保資訊正確性，業者應定期至「綠色生活資訊網」更新店家資訊。
                                </p>
                                <div>
                                    <table className="table-fixed" style={{width: "100%"}}>
                                        <tr className="table-head-dark text-center">
                                            <th scope="col" colSpan="4">國內綠色產品種類</th>
                                        </tr>
                                        <tr className="text-wrap">
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={greenmark1} className="greenmark-table-img" alt="第一類環保標章" title="第一類環保標章" />
                                                    <p>第一類環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={greenmark2} className="greenmark-table-img" alt="第二類環境保護產品" title="第二類環境保護產品" />
                                                    <p>第二類環境保護產品</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={carbonlabel} className="greenmark-table-img" alt="碳標籤" title="碳標籤" />
                                                    <p>碳標籤</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={carbonreduction} className="greenmark-table-img" alt="減碳標籤" title="減碳標籤" />
                                                    <p>減碳標籤</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={saveenergy} className="greenmark-table-img" alt="節能標章" title="節能標章" />
                                                    <p>節能標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={watersaving} className="greenmark-table-img" alt="省水標章" title="省水標章" />
                                                    <p>省水標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={greenbuilding} className="greenmark-table-img" alt="綠建材標章" title="綠建材標章" />
                                                    <p>綠建材標章</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div>
                                    <table className="table-fixed" style={{width: "100%"}}>
                                        <tr className="table-head-dark text-center">
                                            <th scope="col" colSpan="4">國外綠色產品種類</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markUSA} className="greenmark-table-img" alt="美國環保標章" title="美國環保標章" />
                                                    <p>美國環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markJapan} className="greenmark-table-img" alt="日本環保標章" title="日本環保標章" />
                                                    <p>日本環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markNewZealand} className="greenmark-table-img" alt="紐西蘭環保標章" title="紐西蘭環保標章" />
                                                    <p>紐西蘭環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markAustralia} className="greenmark-table-img" alt="澳洲環保標章" title="澳洲環保標章" />
                                                    <p>澳洲環保標章</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markThailand} className="greenmark-table-img" alt="泰國環保標章" title="泰國環保標章" />
                                                    <p>泰國環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markCanada} className="greenmark-table-img" alt="加拿大環保標章" title="加拿大環保標章" />
                                                    <p>加拿大環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markKorea} className="greenmark-table-img" alt="韓國環保標章" title="韓國環保標章" />
                                                    <p>韓國環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markCzech} className="greenmark-table-img" alt="捷克環保標章" title="捷克環保標章" />
                                                    <p>捷克環保標章</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markUkraine} className="greenmark-table-img" alt="烏克蘭環保標章" title="烏克蘭環保標章" />
                                                    <p>烏克蘭環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markPhilippines} className="greenmark-table-img" alt="菲律賓環保標章" title="菲律賓環保標章" />
                                                    <p>菲律賓環保標章</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markEnergyStar} className="greenmark-table-img" alt="能源之星" title="能源之星" />
                                                    <p>能源之星</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markFSC} className="greenmark-table-img" alt="FSC" title="FSC" />
                                                    <p>FSC</p>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="text-center table-small-text">
                                                    <img src={markPEFC} className="greenmark-table-img" alt="PEFC" title="PEFC" />
                                                    <p>PEFC</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <p className="pt-3 mb-2 table-small-text">附表 綠色商店可申報綠色產品類別</p>
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

export default withRouter(GreenShopTrack);
