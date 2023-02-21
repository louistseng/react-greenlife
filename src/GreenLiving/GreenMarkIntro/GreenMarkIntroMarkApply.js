import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroMarkApply(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【標章申請資訊與指引】申請作業要點、規格標準" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="規格標準" /></div>
            <div className="">{/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroMarkApply`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">申請作業要點<br />、規格標準</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFirst`}><div className="col-12 col-md-6 col-lg-12">申請驗證流程</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySecond`}><div className="col-12 col-md-6 col-lg-12">環保標章共通文件</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyThird`}><div className="col-12 col-md-6 col-lg-12">標章申請費用</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplyFourth`}><div className="col-12 col-md-6 col-lg-12">產品驗證與單位</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div className="col-12 col-md-6 col-lg-12">服務類申請懶人包</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 div-flex topbtn justify-content-between">
                                <Link to={`/greenLabel/GreenMarkIntroMarkApply`}><div>環保標章申請資訊與指引</div></Link>
                                <Link to={`/greenLabel/GreenMarkIntroMarkApplySeviceIndex`}><div>服務類申請指引</div></Link>
                            </div>
                            <div className="col-12 greenbar">
                                <h1>作業要點查詢(你必須知道什麼?)</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2 text-center">
                                <talbe className="table-lab-approved-list">
                                    <tr className="table-head-dark">
                                        <th>標章申請</th>
                                        <th>標章維護管理</th>
                                        <th>後市場查核</th>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td><a href="https://oaout.epa.gov.tw/law/LawContent.aspx?id=GL006024" target="_blank" title="行政院環境保護署環境保護產品申請審查作業規範(在新視窗開啟鏈結)">行政院環境保護署環境保護產品申請審查作業規範</a></td>
                                        <td><a href="https://oaout.epa.gov.tw/law/LawContent.aspx?id=GL004922" target="_blank" title="行政院環境保護署綠色消費暨環境保護產品推動使用作業要點(在新視窗開啟鏈結)">行政院環境保護署綠色消費暨環境保護產品推動使用作業要點</a></td>
                                        <td><a href="https://oaout.epa.gov.tw/law/LawContent.aspx?id=GL004945" target="_blank" title="行政院環境保護署環境保護產品管理作業規範(在新視窗開啟鏈結)">行政院環境保護署環境保護產品管理作業規範</a></td>
                                    </tr>
                                </talbe>
                            </div>

                            <div className="col-12 greenbar">
                                <h2>規格標準查詢(你可以申請什麼?)</h2>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2 text-center">
                                <talbe className="table-lab-approved-list mark-apply-table">
                                    <tr className="table-head-dark">
                                        <th colSpan="5">規格標準分類</th>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=1`} target="_blank">資源回收產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=7`} target="_blank">(OA)辦公室用品產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=2`} target="_blank">清潔產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=8`} target="_blank">可分解產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=3`} target="_blank">資訊產品類</Link></td>
                                    </tr>
                                    <tr className="table-row-dark">
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=9`} target="_blank">有機資材類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=4`} target="_blank">家電產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=10`} target="_blank">建材類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=5`} target="_blank">省水產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=11`} target="_blank">日常用品類</Link></td>
                                    </tr>
                                    <tr className="table-row-light">
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=6`} target="_blank">省電產品類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=12`} target="_blank">工業類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=13`} target="_blank">利用太陽能資源</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=14`} target="_blank">服務類</Link></td>
                                        <td><Link to={`/categories/GreenSpecificationSearch?searched=true&page=1&a=1&cn=15`} target="_blank">第二類</Link></td>
                                    </tr>
                                </talbe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroMarkApply);
