import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import approvalPractice01 from '../../images1/greenLiving/ApprovalPractice01.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroApprovalPractice(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【檢測實驗室資訊查詢】檢測機構(實驗室)申請檢測項目登錄認可規範" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="檢測機構(實驗室)申請檢測項目登錄認可規範" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-11 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroCertificationLab`}><div className="col-12 col-md-6 col-lg-12">經認證的檢測實驗室</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroApprovalPractice`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">檢測機構(實驗室)<br />申請檢測項目登錄<br />認可規範</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLaboratory`}><div className="col-12 col-md-6 col-lg-12">實驗室查詢</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLabApprovedList`}><div className="col-12 col-md-6 col-lg-12">環保署審議委員認可清單</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>檢測機構(實驗室)申請檢測項目登錄認可規範</h1>
                            </div>
                            <div className=" col-12 bluebar mt-2 mb-2">
                                <p className=" pt-3 mb-2 text-indent">
                                    由於申請使用環保標章或第二類環保標章之產品，涉及檢測項目較廣，為解決申請者找不到經認證(可)檢測實驗室協助檢測，本署(管考處)特研訂<span style={{ color: "red" }}>檢測機構(實驗室)申請檢測項目登錄認可規範</span>，如下:
                                </p>
                                <div>
                                    <table className="" style={{ width: "100%" }}>
                                        <tr className="table-head-dark">
                                            <th>項目</th>
                                            <th>登錄認可</th>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td>申請資格</td>
                                            <td>合格實驗室</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td>申請文件</td>
                                            <td>
                                                <ol>
                                                    <li>申請資料表5份</li>
                                                    <li>實驗室品質手冊5份</li>
                                                    <li>品質系統作業程序5份</li>
                                                    <li>申請項目之標準作業程序5份</li>
                                                    <li>測試結果與原始數據、必要圖譜、儀器追溯校正之背景資料1份</li>
                                                    <li>量測不確定度評估數據資料5份</li>
                                                    <li>參加能力試驗或實驗室間比對活動結果 5份</li>
                                                </ol>
                                                <p className=" pt-3 mb-2 text-indent">
                                                    ＊申請文件2、3得以ISO 17025證書替代
                                                </p>
                                                <p className=" pt-3 mb-2 text-indent">
                                                    ＊申請文件5、6、7如實驗室未能提供，應檢附無法提供之原因說明，並由技審委員判定，是否仍需補充
                                                </p>
                                            </td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td>實驗室查核</td>
                                            <td>是</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td>作業時間</td>
                                            <td>包含書面審查、實驗室查核、實驗室補件及技審小組約1～3個月</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td>認可期限</td>
                                            <td>
                                                <ul>
                                                    <li>3年，期滿3個月前提出展延申請</li>
                                                    <li>前項展延申請，如期滿前未完成審查作業，得暫時展延有效期間，但每次以3個月為限</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td>失效條件</td>
                                            <td>
                                                <ul>
                                                    <li>未於3年重新評鑑</li>
                                                    <li>取得TAF認證，則無需申請及展延評鑑</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td>報告有效性起始時間</td>
                                            <td>認可日起，但原首件申請報告亦可採認</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="text-center"><img src={approvalPractice01} className="w-100" alt="行政院環境保護署檢測機構(實驗室)申請檢測項目登錄認可流程" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroApprovalPractice);
