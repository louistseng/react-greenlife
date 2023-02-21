import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../GreenLabel.css";
import buyBannerSmall from "../../images1/img/banner_buy_small.jpg";
import greenProcurement from "../../images1/greenLiving/GreenProcurementApplicationProcess.jpg";

const BreadCrumb = React.lazy(() => import("../../Components/BreadCrumb"));
const Footer = React.lazy(() => import("../../Components/Footer"));

function GreenPurchaseIntroGovernment(props) {
    let SSL = props.SSL; //props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"; //props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"; //props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="【機關綠色消費採購】政府機關綠色採購" />
            <div className="">
                <img
                    src={buyBannerSmall}
                    className="w-100 banner"
                    alt="政府機關綠色採購"
                />
            </div>
            <div className="">
                {/* */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenPurChase/GreenPurchaseIntroLaw`}>
                                <div className="col-12 col-md-6 col-lg-12">綠色採購的法規</div>
                            </Link>
                            <Link to={`/greenPurChase/GreenPurchaseIntroElectronicReport`}>
                                <div className="col-12 col-md-6 col-lg-12">
                                    機關綠色採購電子申報措施
                                </div>
                            </Link>
                            <Link
                                to={`/greenPurChase/GreenPurchaseIntroGovernment`}
                                className="leftbtnFocus"
                            >
                                <div className="col-12 col-md-6 col-lg-12">
                                    政府機關綠色採購
                                </div>
                            </Link>
                            <Link to={`/greenPurChase/GreenPurchaseProcurementPromote`}>
                                <div className="col-12 col-md-6 col-lg-12">
                                    政府機關綠色採購推動成果查詢
                                </div>
                            </Link>
                            <Link to={`/greenPurChase/GreenPurchaseGovPurchseLaw`}>
                                <div className="col-12 col-md-6 col-lg-12">
                                    政府採購相關法規
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>綠色採購申報</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-center text-bolder">
                                    成果填表時間
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    111年度填報時間111/1/1~112/1/20
                                </p>

                                <p className="pt-3 mb-2 text-center text-bolder">
                                    成果申報流程
                                </p>
                                <div className="text-center">
                                    <img
                                        src={greenProcurement}
                                        className="w-100"
                                        alt="成果申報流程圖"
                                        title="成果申報流程圖"
                                    />
                                </div>

                                <p className="pt-3 mb-2 text-center text-bolder">
                                    綠色採購範疇
                                </p>
                                <p className="pt-3 mb-2">(一)指定採購項目(附表1)</p>
                                <p className="pt-3 mb-2">
                                    凡採購「指定採購項目」皆應採購環保標章產品，如機關因特殊需求無法採購環保標章產品，應於下訂產品前簽准「不統計專簽」。指定採購項目需至少有2家以上廠商取得環保標章。
                                </p>
                                <p className="pt-3 mb-2">(二)加分項目</p>
                                <p className="pt-3 mb-2">
                                    加分採購項目包括採購環保標章、第二類環保標章、節能標章、省水標章、綠建材標章、碳足跡減量標籤、台灣木材標章及國外標章等產品時（以下簡稱綠色產品），可進行申報並納入「總分加減分」計算。
                                </p>
                                <p className="pt-3 mb-2">(三)計分認定</p>
                                <p className="pt-3 mb-2">
                                    環保標章、第二類環保標章、節能標章、省水標章、綠建材標章、碳足跡減量標籤、台灣木材標章及國外標章，皆有其證書之有效期限，機關應於上述標章（籤）產品證書有效期內下訂，方可納入計分，如下訂日期早於或晚於其證書有效期，不得納入計分。
                                </p>

                                <p className="pt-3 mb-2 text-center text-bolder">計分方式</p>
                                <p className="pt-3 mb-2">
                                    原始分數配分85分，依「機關綠色採購指定採購項目達成度」計分，計算公式如下：
                                </p>
                                <div
                                    style={{ marginLeft: "20px" }}
                                    className="table-small-text"
                                >
                                    <table id="tb1">
                                        <tr>
                                            <td headers="no" rowSpan="2">機關綠色採購指定採購項目達成度=</td>
                                            <td headers="no" style={{ textAlign: "center" }}>
                                                指定採購項目採購環保標章產品總金額
                                            </td>
                                            <td headers="no" rowSpan="2">×85分</td>
                                        </tr>
                                        <tr>
                                            <td headers="no"
                                                style={{
                                                    borderTop: "1px solid black",
                                                    textAlign: "center",
                                                }}
                                            >
                                                指定採購項目所有項目採購總金額
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <p className="pt-3 mb-2 text-indent table-small-text">
                                    註：凡採購指定採購項目即應至綠色生活資訊網申報，如於臺灣銀行「共同供應契約」採購，則將自動帶入綠色生活資訊網。
                                </p>
                                <p className="pt-3 mb-2 text-indent table-small-text">
                                    111年度總分加減分項目共計5項，詳細內容請參：
                                    <a
                                        href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=525`}
                                        target="_blank"
                                        title="評核作業評分方法(在新視窗開啟鏈結)"
                                    >
                                        【評核作業評分方法】
                                    </a>
                                    (PDF)
                                </p>

                                <p className="pt-3 mb-2 text-center text-bolder">
                                    111年評分等第級距及獎勵
                                </p>
                                <p className="pt-3 mb-2">（一）評分等第級距：</p>
                                <ol>
                                    <li>
                                        優等：績效評核成績為90分（含）以上，並符合以下2項條件者，否則僅列甲等。
                                        <ol className="list-none">
                                            <li>
                                                （1）機關綠色採購指定採購項目達成度達95%（年度目標值）。
                                            </li>
                                            <li>
                                                （2）總分加減之減分項目未遭扣分。
                                            </li>
                                            <li className="text-indent">
                                                （原始分數經加減分後以100分為上限值）。
                                            </li>
                                        </ol>
                                    </li>
                                    <li>甲等：績效評核成績為80分（含）以上未滿90分。</li>
                                    <li>乙等：績效評核成績為70分（含）以上未滿80分。</li>
                                    <li>丙等：績效評核成績為未滿70分。</li>
                                </ol>
                                <p className="pt-3 mb-2">
                                    （二）獎勵：執行績優人員由各受評機關辦理敘獎。
                                </p>
                                <p className="pt-3 mb-2">
                                    （三）本署將於112年公開表揚111年績效評核成績達100分，且評分等第為優等之機關。
                                </p>

                                <p className="pt-3 mb-2 text-center text-bolder">
                                    機關綠色採購成果填報、不統計金額申請及補件期限
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    各機關於111年1月1日至111年12月31日所辦理之綠色採購成果，及相關不統計申報需求，請於112年1月20日（星期五）前完成，112年1月21日（星期六）0:00起關閉111年機關綠色採購成果申報功能，屆時各機關將無法再行修改相關資料。
                                </p>

                                <p className="pt-3 mb-2 text-center text-bolder">
                                    綠色生活資訊網申報或查詢網址
                                </p>
                                <p className="pt-3 mb-2">（一）申報/查詢機關綠色採購成果</p>
                                <p className="pt-3 mb-2 text-indent text-wrap">
                                    請至
                                    <a
                                        href={`${SSL}//${domainBackendFormal}/GreenLife`}
                                        target="_blank"
                                        title="登入查詢(在新視窗開啟鏈結)"
                                    >
                                        https://greenliving.epa.gov.tw/GreenLife
                                    </a>
                                    登入查詢。
                                </p>
                                <p className="pt-3 mb-2">（二）查詢環保標章產品</p>
                                <p className="pt-3 mb-2 text-indent">
                                    請至
                                    <Link
                                        to={`/categories/GreenProductSearch`}
                                        target="_blank"
                                        title="環保產品查詢功能(在新視窗開啟鏈結)"
                                    >
                                        環保產品查詢功能
                                    </Link>
                                    查詢。
                                </p>
                                <p className="pt-3 mb-2">
                                    （三）民間企業及團體綠色採購申報平臺
                                </p>
                                <p className="pt-3 mb-2 text-indent text-wrap">
                                    請至
                                    <a
                                        href={`${SSL}//${domainBackendFormal}/GreenLife/PurChaseRpt/login.aspx`}
                                        target="_blank"
                                        title="登入查詢(在新視窗開啟鏈結)"
                                    >
                                        https://greenliving.epa.gov.tw/GreenLife/PurChaseRpt/login.aspx
                                    </a>
                                    登入查詢。
                                </p>

                                <p className="pt-3 mb-2 text-center table-small-text">
                                    附表1指定採購項目一覽表（項次1至項次50，計50項）
                                </p>
                                <table id="ItemsList" style={{ width: "100%" }}>
                                    <thead className="table-head-dark talbe-gray-border">
                                        <tr>
                                            <th id="no" rowspan="2" style={{ width: "6%" }}>
                                                項次
                                            </th>
                                            <th id="purchase" rowspan="2" style={{ width: "30%" }}>
                                                指定採購項目
                                            </th>
                                            <th id="noPurchase" rowspan="2" style={{ width: "30%" }}>
                                                非屬「指定採購項目」
                                            </th>
                                            <th id="standard" colspan="2">環保標章規格標準</th>
                                        </tr>
                                        <tr>
                                            <th id="standard-type" headers="standard" style={{ width: "17%" }}>
                                                產品類別
                                            </th>
                                            <th id="standard-name" headers="standard" style={{ width: "17%" }}>名稱</th>
                                        </tr>
                                    </thead>
                                    <tbody className="talbe-gray-border">
                                        <tr className="table-row-light">
                                            <td headers="no" >1</td>
                                            <td headers="purchase" >衛生紙、擦手紙</td>
                                            <td headers="noPurchase" >-</td>
                                            <td headers="standard-type" rowspan="7">資源回收產品類</td>
                                            <td headers="standard-name">衛生用紙</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">2</td>
                                            <td headers="purchase">孔夾、拱型夾、資料盒、資料箱、管夾、輕便夾</td>
                                            <td headers="noPurchase">塑膠檔案夾</td>
                                            <td headers="standard-name">使用再生紙之紙製文具及書寫用紙</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">3</td>
                                            <td headers="purchase">紙板、單/雙層瓦楞紙箱</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">使用回收紙之包裝用品</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">4</td>
                                            <td headers="purchase">回收碳粉匣、回收感光鼓匣、回收感光滾筒</td>
                                            <td headers="noPurchase">傳真機之單純碳粉匣(含色帶、碳粉、碳粉收集器、感光鼓匣、感光滾筒 )</td>
                                            <td headers="standard-name">回收再利用碳粉匣</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">5</td>
                                            <td headers="purchase">聚酯纖維(短纖本白色)</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">回收再生紡織品</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">6</td>
                                            <td headers="purchase">聚酯再生棉(黑棉/白棉)、廢輪胎橡膠粉(黑色)、廢輪胎橡膠顆粒(黑色)</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">回收塑橡膠再生品</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">7</td>
                                            <td headers="purchase" rowspan="2">垃圾袋、吸管、PLA 杯</td>
                                            <td headers="noPurchase" rowspan="2">地方政府法令規範須使用之專用垃圾袋</td>
                                            <td headers="standard-name">再生塑膠薄膜製品</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">8</td>
                                            <td headers="noPurchase">可分解產品類</td>
                                            <td headers="standard-name">生物可分解塑膠</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">9</td>
                                            <td headers="purchase">洗碗精、洗衣精、洗衣粉地板清潔劑、浴廁清潔劑、手洗精、廚房清潔劑</td>
                                            <td headers="noPurchase">玻璃清潔劑、漂白水、馬桶疏通劑</td>
                                            <td headers="standard-type" rowspan="2">清潔產品類</td>
                                            <td headers="standard-name">家用清潔劑</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">10</td>
                                            <td headers="purchase">洗手乳、沐浴乳/精、洗髮乳/精</td>
                                            <td headers="noPurchase">肥皂、固體皂、液體皂、皂類清潔劑</td>
                                            <td headers="standard-name">肌膚毛髮清潔劑</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">11</td>
                                            <td headers="purchase">一般辦公用電腦主機、工作站</td>
                                            <td headers="noPurchase">伺服器</td>
                                            <td headers="standard-type" rowspan="9">資訊產品類</td>
                                            <td headers="standard-name">電腦主機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">12</td>
                                            <td headers="purchase">28吋（含）以下顯示器</td>
                                            <td headers="noPurchase">超過28吋顯示器</td>
                                            <td headers="standard-name">顯示器</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">13</td>
                                            <td headers="no">雷射印表機、熱感式收據印表機</td>
                                            <td headers="no">3D印表機、大圖輸出機、大尺寸印表機、存摺印表機、噴墨印表機、點矩陣(點陣)式印表機、其他熱感式印表機</td>
                                            <td headers="standard-name">列印機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">14</td>
                                            <td headers="purchase">筆記型電腦、服務用終端機</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">筆記型電腦</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">15</td>
                                            <td headers="purchase">一體機電腦</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">桌上型個人電腦</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">16</td>
                                            <td headers="purchase">原生碳粉匣、原生感光鼓匣、原生感光滾筒</td>
                                            <td headers="noPurchase">傳真機之單純碳粉匣(含色帶、碳粉、碳粉收集器、感光鼓匣、感光滾筒 )</td>
                                            <td headers="standard-name">原生碳粉匣</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">17</td>
                                            <td headers="purchase">多功能事務機、多功能複合機、影印機、數位複合機</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">影像輸出裝置</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">18</td>
                                            <td headers="purchase">掃描器</td>
                                            <td headers="noPurchase">可攜式掃描器</td>
                                            <td headers="standard-name">掃描器</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">19</td>
                                            <td headers="purchase">投影機</td>
                                            <td headers="noPurchase">實物投影機</td>
                                            <td headers="standard-name">可攜式投影機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">20</td>
                                            <td headers="purchase">總有效內容積610公升（含）以下電冰箱</td>
                                            <td headers="noPurchase">冷凍櫃、儲藏櫃</td>
                                            <td headers="standard-type" rowspan="5">家電產品類</td>
                                            <td headers="standard-name">電冰箱</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">21</td>
                                            <td headers="purchase">20千瓦（含）以下窗型/分離式冷氣機、水冷式冷氣</td>
                                            <td headers="noPurchase">隱藏式空調、吊隱式、崁入式、氣冷式箱型、移動式冷氣</td>
                                            <td headers="standard-name">冷氣機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">22</td>
                                            <td headers="purchase">洗衣機</td>
                                            <td headers="noPurchase">脫水機</td>
                                            <td headers="standard-name">洗衣機</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">23</td>
                                            <td headers="purchase">除濕機</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">除濕機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">24</td>
                                            <td headers="purchase">天花板循環扇/循環吸頂扇、循環扇</td>
                                            <td headers="noPurchase">立扇、壁扇</td>
                                            <td headers="standard-name">電風扇</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">25</td>
                                            <td headers="purchase">二段式省水馬桶（含坐式及蹲式）</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-type" rowspan="2">省水產品類</td>
                                            <td headers="standard-name">兩段式省水馬桶</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">26</td>
                                            <td headers="purchase">臉盆龍頭、感應式龍頭</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">省水龍頭及其器材配件</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">27</td>
                                            <td headers="purchase">飲水機</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-type" rowspan="3">省電產品類</td>
                                            <td headers="standard-name">飲水供應機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">28</td>
                                            <td headers="purchase">貯備型電開水器</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">貯備型電開水器</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">29</td>
                                            <td headers="purchase">LED平板燈、LED燈管型崁燈</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">室內照明燈具</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">30</td>
                                            <td headers="purchase">A4、A3及B4白色用紙</td>
                                            <td headers="noPurchase">彩色用紙</td>
                                            <td headers="standard-type" rowspan="5">(OA)辦公室用具產品類</td>
                                            <td headers="standard-name">辦公室用紙</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="purchase">31</td>
                                            <td headers="noPurchase">數位複印機</td>
                                            <td headers="standard-type">-</td>
                                            <td headers="standard-name">數位複印機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="purchase">32</td>
                                            <td headers="noPurchase">數位複印機版紙</td>
                                            <td headers="standard-type">-</td>
                                            <td headers="standard-name">數位複印機版紙</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="purchase">33</td>
                                            <td headers="noPurchase">電動碎紙機</td>
                                            <td headers="standard-type">-</td>
                                            <td headers="standard-name">電動碎紙機</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="purchase">34</td>
                                            <td headers="noPurchase">數位複印機油墨</td>
                                            <td headers="standard-type">-</td>
                                            <td headers="standard-name">油墨</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">35</td>
                                            <td headers="purchase">有機質肥料</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-type" rowspan="2">有機資材類</td>
                                            <td headers="standard-name">堆肥</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">36</td>
                                            <td headers="purchase">注射液</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">塑膠類藥用輸液容器</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">37</td>
                                            <td headers="purchase">壓（亞）克力面材/樹脂</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-type" rowspan="4">建材類</td>
                                            <td headers="standard-name">塗料</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">38</td>
                                            <td headers="purchase">陶瓷面磚</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">窯燒類資源化建材</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">39</td>
                                            <td headers="purchase">地磚、植草磚、水泥板、矽酸鈣板、空心磚、緣石、石粉、隔熱磚、環保磚、高壓崗石磚、高壓混凝土地磚、透水性混凝土地磚、預鑄車輪擋</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">非窯燒類資源化建材</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">40</td>
                                            <td headers="purchase">聚乙烯塑膠管(一般用、自來水用、天然氣用)</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">塑膠類管材</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">41</td>
                                            <td headers="purchase">電動機車</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-type" rowspan="7">日常用品類</td>
                                            <td headers="standard-name">電動機車</td>
                                        </tr>                                      
                                        <tr className="table-row-light">
                                            <td headers="no">42</td>
                                            <td headers="purchase">機車</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">機車</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">43</td>
                                            <td headers="purchase">4-5人座小客車、5人座客貨兩用車</td>
                                            <td headers="noPurchase">小貨車、身心障礙交通車、柴油車、幼童專用車、復康巴士、資源回收車、救護車</td>
                                            <td headers="standard-name">小汽車</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">44</td>
                                            <td headers="purchase">彈簧床墊、記憶床墊、乳膠床墊、獨立筒床墊</td>
                                            <td headers="noPurchase">泡棉床墊</td>
                                            <td headers="standard-name">床墊</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">45</td>
                                            <td headers="purchase">棉質枕頭</td>
                                            <td headers="noPurchase">水凝膠枕頭、乳膠枕頭、記憶枕頭</td>
                                            <td headers="standard-name">枕頭</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">46</td>
                                            <td headers="purchase">面紙</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">家庭用紙</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="purchase">47</td><td headers="no">乾粉/泡沫/水滅火器</td>
                                            <td headers="noPurchase">二氧化碳滅火器、 強化液滅火器、 住宅滅火器</td>
                                            <td headers="standard-name">滅火器</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">48</td>
                                            <td headers="purchase">工業型乾式變壓器</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-type" rowspan="3">工業類</td>
                                            <td headers="standard-name">乾式變壓器</td>
                                        </tr>
                                        <tr className="table-row-dark">
                                            <td headers="no">49</td>
                                            <td headers="purchase">工業型電線電纜</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">電線電纜</td>
                                        </tr>
                                        <tr className="table-row-light">
                                            <td headers="no">50</td>
                                            <td headers="purchase">非晶質油浸式變壓器</td>
                                            <td headers="noPurchase">-</td>
                                            <td headers="standard-name">配電用變壓器</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="pt-3 mb-2 text-indent table-small-text">
                                    註：機關若透過「共同供應契約採購」採購非屬「指定採購項目」之產品，須於下訂完三天後至綠色生活資訊網更改該產品為「非綠色採購範圍」。
                                </p>

                                <p className="pt-3 mb-2 text-indent">
                                    <a
                                        href={`${SSL}//${domainBackendFormal}/GreenLife/green-life/downtime.aspx?id=525`}
                                        target="_blank"
                                        title="111年度機關綠色採購績效評核作業評分方法(在新視窗開啟鏈結)"
                                    >
                                        111年度機關綠色採購績效評核作業評分方法.PDF(點擊下載)
                                    </a>
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

export default withRouter(GreenPurchaseIntroGovernment);
