import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import GreenLabel from '../GreenLabel';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroLawCouncilResolution(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "${SSL}" : props.SSL
    let domainFormal = "${domainBackendFormal}/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "${domainBackendFormal}/newPublic"
    let domainBackendFormal = "${domainBackendFormal}"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "${domainBackendFormal}"

    const style = {
        contentStyle1: {
            MARGINBOTTOM: "0px",
            MARGINLEFT: "12pt",
            MARGINTOP: "0px",
            TEXTINDENT: "0pt"
        },
        contentStyle2: {
            MARGINBOTTOM: "0px",
            MARGINLEFT: "42pt",
            MARGINTOP: "0px",
            TEXTINDENT: "-20pt"
        },
        contentStyle3: {
            MARGINBOTTOM: "0px",
            MARGINLEFT: "32pt",
            MARGINTOP: "0px",
            TEXTINDENT: "-20pt"
        },
        contentStyle4: {
            MARGINBOTTOM: "0px",
            MARGINLEFT: "32pt",
            MARGINTOP: "0px",
            TEXTINDENT: "-10pt"
        },
        contentStyle5: {
            MARGINBOTTOM: "0px",
            MARGINLEFT: "32pt",
            MARGINTOP: "0px",
            TEXTINDENT: "0pt"
        },
        contentStyle6: {
            MARGINBOTTOM: "0px",
            MARGINLEFT: "42pt",
            MARGINTOP: "0px",
            TEXTINDENT: "10pt"
        },
        contentStyle7: {
            fontsize: "9pt",
            fontfamily: "SimSun"
        },
        contentStyle8: {
            fontsize: "13px",
            /*letterspacing: "2px"*/
        },
        contentStyle9: {
            fontsize: "small",
            letterspacing: "2px",
            fontfamily: "NSimSun"
        },
        contentStyle10: {
            msobidifontsize: "12.0pt",
            fontfamily: "Times New Roman,serif",
            msofareastfontfamily: "標楷體"
        },
        contentStyle11: {
            fontfamily: "NSimSun",
            fontsize: "small"
        },
        contentStyle12: {
            fontsize: "9pt",
            fontfamily: "細明體"
        },
        contentStyle13: {
            fontfamily: "Calibri, sansserif",
            fontsize: "12pt"
        },
        contentStyle14: {
            msobidifontsize: "12.0pt",
            fontfamily: "Times New Roman,serif",
            msofareastfontfamily: "標楷體"
        }
    };
    return (
        <>
            <BreadCrumb currentPage="【法規及審議會決議查詢】環保標章審議會決議事項查詢" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="環保標章審議會決議事項查詢" /></div>
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroLawMarkApplication`}><div className="col-12 col-md-6 col-lg-12">標章申請相關法規</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLawCouncilResolution`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">環保標章審議會決議事項查詢</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>環保標章審議會決議事項列表</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                {/*<table className="table-lab-approved-list">
                                    <tr className="table-head-dark">
                                        <th style={{width: "5em"}}>年度</th>
                                        <th style={{width: "5em"}}>場次</th>
                                        <th style={{width: "20em"}}>決議事項</th>
                                    </tr>
                                    <tr className="table-row-light"><td>104</td><td>2</td><td><div><span style={style.contentStyle8}><b>修正環保標章工廠現場查核執行指引</b></span><p><b><span lang="EN-US" style={style.contentStyle10}></span></b></p><b style={style.contentStyle9}>決議：</b><span style={style.contentStyle9}>本指引審議通過，請於會後公布於本署綠色生活資訊網。</span><div><span style={style.contentStyle9}>{/*參考網址：* /}</span>{/*<a href="https://greenliving.epa.gov.tw/newPublic/GreenMark/ValidationProcess" style={style.contentStyle13} target=""><span style={style.contentStyle14}><span color="#0000ff">https://greenliving.epa.gov.tw/newPublic/GreenMark/ValidationProcess</span></span></a>* /}</div></div></td></tr>
                                    <tr className="table-row-dark"><td>106</td><td>3</td><td><div><p><span size="5"><b>「冷氣機」環保標章規格標準之驗證審查標準一致性討論<br /></b></span><b style={style.contentStyle11}>決議：</b><span style={style.contentStyle11}>現行「冷氣機」規格標準，其中「冷氣能力分類」所稱「冷氣能力」定義為額定冷氣能力之標示值，並採標示值作為驗證審查標準。</span></p></div></td></tr>
                                    <tr className="table-row-light"><td>106</td><td>1</td><td><div><div><b>申請環保標章檢具之工廠未受環保處分證明開立日期期限案</b></div><div><b>決議：</b>考量國情及作業時間，未受環保處分證明開立日距案件申請日之期間，國外以6個月內為期限，國內以3個月內為期限，並請廠商於申請時出具切結書，保證於未受環保處分證明至申請期間內，產品生產工廠未受環保處分情形亦符合環保標章申請相關規定。</div><div><br /></div></div></td></tr>
                                    <tr className="table-row-dark"><td>106</td><td>1</td><td><div><p><b>電腦主機、桌上型個人電腦及筆記型電腦CPU變更申請方式案<br /></b><b>決議：</b>為使採購機關能更方便獲取完整而明確之資訊，有關電腦主機、桌上型個人電腦及筆記型電腦產品CPU之變更，取消「102年度第2次綠色消費暨環境保護產品審議會」決議免經驗證機構驗審會審查程序之作法，回歸依一般規定程序提出申請並經驗證機構驗審會審查。</p><div><br /></div></div></td></tr>
                                    <tr className="table-row-light"><td>105</td><td>3</td><td><div><p><b><span style={style.contentStyle7}>未取得環保標章使用權廠商冒用環保標章之處理作法</span></b><span lang="EN-US" style={style.contentStyle12}></span></p><p> </p><p><b><span style={style.contentStyle7}>決議：</span></b><span style={style.contentStyle7}>針對未取得環保標章使用權廠商如有違反「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」第<span lang="EN-US">25</span>點第<span lang="EN-US">1</span>項、第<span lang="EN-US">26</span>點第<span lang="EN-US">1</span>項之情形，且屬未完成改善、累犯或惡意冒用，經本署移送法辦並公布廠商名稱及產品者，自公布之日起三年內，本署不受理其申請使用環保標章或第二類環保標章。</span></p><p><b><u><span style={{fontFamily: "新細明體, serif", color: "red"}}><span>本項規定已修正，請依最新公告之規定辦理</span></span></u></b></p><div><br /></div></div></td></tr>
                                    <tr className="table-row-dark"><td>104</td><td>1</td><td><div><p><span size="5"><b>中國大陸未受重大環境污染證明之替代作法<span lang="EN-US"></span></b></span></p> <span size="5">決議：針對設廠於中國大陸廠商申請環保標章未受重大污染處分之證明文件，請業務單位循法制程序儘速修正申請審查作業規範之規定，修正前同意由本署委託之驗證機構至官方網站查詢確認。</span></div></td></tr>
                                    <tr className="table-row-light"><td>103</td><td>5</td><td><div><p style={style.contentStyle1}><p className="text-bolder">檢討環保產品工廠查核之必要性與做法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle4}>1.同意本案工廠查核作法，有關服務業、第二類環境保護產品及使用回收料再生產品類別，維持逐案查核，其餘產品類別免逐案工廠查核，採認其3年內有效之工廠查核報告，並比照境外工廠作法，將申請案與工廠查核案分開。</p><br /> <p style={style.contentStyle4}>2.請業務單位就工廠查核指引內容另案召開專家諮詢會討論。</p></div></td></tr>
                                    <tr className="table-row-dark"><td>102</td><td>8</td><td><div><p style={style.contentStyle1}><p className="text-bolder">環保標章規定不得使用具歐盟指令判定風險警語代碼之有害物質及應檢附物質安全資料表之驗證作法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle4}>1.申請業者提供之MSDS品質良好，化學品CAS編號明確，MSDS各子項資訊詳實完整，且依67/548/EEC指令提供Risk Phrases與Safety phrases代碼者，依MSDS內容進行審查。</p> <p style={style.contentStyle4}>2.申請業者提供之MSDS品質良好，化學品CAS編號明確，MSDS各子項資訊詳實完整，雖未依67/548/EEC指令提供Risk Phrases與Safety phrases代碼，但有明確之特性敘述(如吸入有毒、吞食有毒等)，驗證機構足以依67/548/EEC指令逕行判定者，依MSDS內容進行審查。</p> <p style={style.contentStyle4}>3.申請業者提供之MSDS品質不佳，化學品CAS編號明確，但其他資訊缺漏(如標記N/A、留白未填、缺乏特性敘述等)，應要求業者補件，若補件後仍未改善，則驗證機構得依CAS編號進行查詢，並依查詢結果進行審查。</p> <p style={style.contentStyle4}>4.申請業者提供之MSDS品質不佳、未註明CAS編號、其他資訊亦有缺漏(如標記N/A、留白未填等)，應要求業者補件至足以依前述方式處理，或補件期滿為止。</p> <p style={style.contentStyle4}>5.廠商所使用之個別原料MSDS有登載不得含有之警語，但如因化學反應後導致原性狀消失者，可檢附相關證明文件或測試報告，經審查確認合理後亦可視為排除條款。</p></div></td></tr>
                                    <tr className="table-row-light"><td>102</td><td>8</td><td><div><p style={style.contentStyle1}><p className="text-bolder">「回收再生紡織品」之產品認定及檢測報告採認作法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle2}>1.國家標準：無。</p> <p style={style.contentStyle2}>2.產品染色部分：</p> <p style={style.contentStyle5}>如產品用料、混紡比例、染料種類、染色製程等相同者，僅因剪裁與縫製不同導致產品形狀尺寸不同或功能不同，其產品檢測報告應可通用。但若同類型產品之印染花色或顏色不同，則應分別檢測。</p> <p style={style.contentStyle2}>3.證書及產品認定：</p> <p style={style.contentStyle6}>(1)產品名稱不同，視為不同件，應分別提出申請，且證書分開，如手帕、襪子各一張證書。</p> <p style={style.contentStyle6}>(2)同樣配方及製程相同，僅尺寸差異時，視為同一件，如不同尺寸的襪子、手帕。</p> <p style={style.contentStyle6}>(3)同一產品名稱如手帕，其配方及製程相同，僅後段染印成不同花色或顏色，視為同一件產品，登載於同一張證書，產品名稱為手帕（紅色、黃色、花色）。</p> <p style={style.contentStyle6}>(4)如顏色或花色差異在於產品配方及製程不同，應視為不同件，給予不同產品證書。</p></div></td></tr>
                                    <tr className="table-row-dark"><td>102</td><td>8</td><td><div><p style={style.contentStyle1}><p className="text-bolder">「資源回收再利用建材」之產品認定及檢測報告採認作法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle2}>1.國家標準：</p> <p style={style.contentStyle6}>(1)矽酸鈣板類：因已於商品驗證登錄證書中登錄各型號產品，所附登載之產品均視為符合國家標準。</p> <p style={style.contentStyle6}>(2)對於桌、椅等水泥模鑄式產品：因無國家標準，故無須檢附符合國家標準之證明，產品之品質由廠商與採購者自行規定。</p> <p style={style.contentStyle6}>(3)水泥製品類:有國家標準對應之產品，如廠商取得正字標記該類產品證書者，因所有尺寸已包含正字標記驗證範圍中，申請時檢附最近一期正字標記檢驗紀錄表者，可代表所有尺寸。非取得正字標記之廠商，申請時產品應標明尺寸，並應檢附該尺寸對應之國家標準檢測報告提出申請，並於環保標章使用證書上標註尺寸，如需增加尺寸，則應檢具測試報告等證明文件，向驗證機構申請變更增列。</p> <p style={style.contentStyle2}>2.產品使用回收料及染料：</p> <p style={style.contentStyle5}>再生料戴奧辛與染料重金屬分別係針對產品使用之再生原料與染料進行測試，不同產品項目，回收料及染料之測試報告可以通用。</p> <p style={style.contentStyle2}>3.產品整體之TCLP部分：</p> <p style={style.contentStyle5}>產品原料種類、產品原料配比(此配比包含不同種類原料配比與同一種類但粒徑大小不同之配比)、產品製程差異(如經高壓與未高壓)，可能影響產品TCLP測試結果，如僅製程模具不同導致產品形狀尺寸不同，不致影響TCLP測試結果者，其TCLP檢測報告可以通用。</p> <p style={style.contentStyle5}>另添加色料部分僅為外加，配方相同僅有顏色不同之產品，可以其中一種顏色或本色產品進行TCLP，其他顏色之水泥磚類，無須逐一檢測。</p> <p style={style.contentStyle2}>4.證書及產品認定：</p> <p style={style.contentStyle6}>(1)產品名稱不同，視為不同件，應分別提出申請，且證書分開，如空心磚與圍牆磚、各類水泥模具所製之桌、椅、欄杆，均為不同張證書。</p> <p style={style.contentStyle6}>(2)同樣配方僅顏色差異時，視為同一件，如產品名稱為圍牆磚（本色、紅色、黃色）。</p> <p style={style.contentStyle6}>(3)同樣原料配方僅尺寸及包裝量不同，視為同一件產品。</p></div></td></tr>
                                    <tr className="table-row-light"><td>102</td><td>6</td><td><div><p style={style.contentStyle1}><p className="text-bolder">環保標章規格標準與「節能標章」、「省水標章」、「綠建材標章」相同規定項目之直接採認作法</p></p> <p style={style.contentStyle3}>決議：有關環保標章規格標準與「節能標章」、「省水標章」、「綠建材標章」相同規定項目，同意直接採認使用證書之作法，另於廠商應檢附文件部分，原則同意修正為「至少尚有6個月以上有效期限之節能標章使用證書或能源效率檢測報告」</p></div></td></tr>
                                    <tr className="table-row-dark"><td>102</td><td>4</td><td><div><p style={style.contentStyle1}><p className="text-bolder">環保標章規格標準相關數值判定之驗證原則</p></p> <p style={style.contentStyle3}>決議：檢測報告或計算結果數值呈現為管制限值下一位，管制限值下二位則以四捨五入修整，作為驗證判斷原則。</p></div></td></tr>
                                    <tr className="table-row-light"><td>102</td><td>3</td><td><div><p style={style.contentStyle1}><p className="text-bolder">因應新增項目登錄認可之作法</p></p> <p style={style.contentStyle3}>決議：針對特定基質或項目未有認可實驗室可執行時，如該實驗室具有同基質或同項目經認可之檢測能力且於本署網站登錄者，由實驗室出具首件檢測報告，包括檢測原始數據、圖譜或儀器校正紀錄等資料，由本署邀集檢測相關專家進行審查，經通過後，則暫時認可該實驗室具有該項檢測項目1年，並登載於本署網站，供廠商選定及驗證機構驗證遵循，但該實驗室應於1年內向本署申請認可或TAF認可，否則不再受理其申請暫行認可，一旦有實驗室取得本署或TAF認可，亦不再適用。</p> <p></p></div></td></tr>
                                    <tr className="table-row-dark"><td>102</td><td>3</td><td><div><p style={style.contentStyle1}><p className="text-bolder">「旅館業」環保標章規格標準所訂室內空氣品質之驗證處理原則</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle4}>1.旅館業室內場所如經公告為室內空氣品質之公告場所，即依相關規定辦理，於未公告前，先行依下列驗證原則辦理。</p> <p style={style.contentStyle4}>2.旅館業室內空氣品質之驗證原則：包括檢測項目為二氧化碳、甲醛、總揮發性有機化合物及細菌，標準值比照「室內空氣品質標準」，檢測方法請依本署公告之標準檢測方法執行，檢測地點判定如下：</p> <p style={style.contentStyle6}>(1)二氧化碳、甲醛及總揮發性有機化合物檢測項目部分：於大廳、附屬餐廳用餐區(座位100人以上)、附屬商店、室內游泳池及會議室各擇1點進行巡查檢驗，依巡檢結果，選擇各檢測項目濃度較高之1點巡檢點分別進行檢測，如均無上述場所則擇一室內公眾場所進行檢測。</p> <p style={style.contentStyle6}>(2)細菌檢測項目部分：於採樣前先進行現場觀察，優先採樣有滲漏水漬或微生物生長痕跡之位置1點。</p></div></td></tr>
                                </table>*/}
                                <div className="">
                                    <div className="div-flex table-head-dark">
                                        <div style={{ width: "5em" }}>年度</div>
                                        <div style={{ width: "5em" }}>場次</div>
                                        <div className="w-100">決議事項</div>
                                    </div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>104</div>
                                        <div style={{ width: "5em" }}>2</div>
                                        <div className="w-100"><div><span style={style.contentStyle8}><b>修正環保標章工廠現場查核執行指引</b></span><p><b><span lang="EN-US" style={style.contentStyle10}></span></b></p><b style={style.contentStyle9}>決議：</b><span style={style.contentStyle9}>本指引審議通過，請於會後公布於本署綠色生活資訊網。</span><div><span style={style.contentStyle9}>{/*參考網址：*/}</span>{/*<a href="https://greenliving.epa.gov.tw/newPublic/GreenMark/ValidationProcess" style={style.contentStyle13} target=""><span style={style.contentStyle14}><span color="#0000ff">https://greenliving.epa.gov.tw/newPublic/GreenMark/ValidationProcess</span></span></a>*/}</div></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>106</div>
                                        <div style={{ width: "5em" }}>3</div>
                                        <div className="w-100"><div><p><span size="5"><b>「冷氣機」環保標章規格標準之驗證審查標準一致性討論<br /></b></span><b style={style.contentStyle11}>決議：</b><span style={style.contentStyle11}>現行「冷氣機」規格標準，其中「冷氣能力分類」所稱「冷氣能力」定義為額定冷氣能力之標示值，並採標示值作為驗證審查標準。</span></p></div></div></div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>106</div>
                                        <div style={{ width: "5em" }}>1</div>
                                        <div className="w-100"><div><div><b>申請環保標章檢具之工廠未受環保處分證明開立日期期限案</b></div><div><b>決議：</b>考量國情及作業時間，未受環保處分證明開立日距案件申請日之期間，國外以6個月內為期限，國內以3個月內為期限，並請廠商於申請時出具切結書，保證於未受環保處分證明至申請期間內，產品生產工廠未受環保處分情形亦符合環保標章申請相關規定。</div><div><br /></div></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>106</div>
                                        <div style={{ width: "5em" }}>1</div>
                                        <div className="w-100"><div><p><b>電腦主機、桌上型個人電腦及筆記型電腦CPU變更申請方式案<br /></b><b>決議：</b>為使採購機關能更方便獲取完整而明確之資訊，有關電腦主機、桌上型個人電腦及筆記型電腦產品CPU之變更，取消「102年度第2次綠色消費暨環境保護產品審議會」決議免經驗證機構驗審會審查程序之作法，回歸依一般規定程序提出申請並經驗證機構驗審會審查。</p><div><br /></div></div></div></div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>105</div>
                                        <div style={{ width: "5em" }}>3</div>
                                        <div className="w-100"><div><p><b><span style={style.contentStyle7}>未取得環保標章使用權廠商冒用環保標章之處理作法</span></b><span lang="EN-US" style={style.contentStyle12}></span></p><p> </p><p><b><span style={style.contentStyle7}>決議：</span></b><span style={style.contentStyle7}>針對未取得環保標章使用權廠商如有違反「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」第<span lang="EN-US">25</span>點第<span lang="EN-US">1</span>項、第<span lang="EN-US">26</span>點第<span lang="EN-US">1</span>項之情形，且屬未完成改善、累犯或惡意冒用，經本署移送法辦並公布廠商名稱及產品者，自公布之日起三年內，本署不受理其申請使用環保標章或第二類環保標章。</span></p><p><b><u><span style={{ fontFamily: "新細明體, serif", color: "red" }}><span>本項規定已修正，請依最新公告之規定辦理</span></span></u></b></p><div><br /></div></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>104</div>
                                        <div style={{ width: "5em" }}>1</div>
                                        <div className="w-100"><div><p><span size="5"><b>中國大陸未受重大環境污染證明之替代作法<span lang="EN-US"></span></b></span></p> <span size="5">決議：針對設廠於中國大陸廠商申請環保標章未受重大污染處分之證明文件，請業務單位循法制程序儘速修正申請審查作業規範之規定，修正前同意由本署委託之驗證機構至官方網站查詢確認。</span></div></div></div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>103</div>
                                        <div style={{ width: "5em" }}>5</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">檢討環保產品工廠查核之必要性與做法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle4}>1.同意本案工廠查核作法，有關服務業、第二類環境保護產品及使用回收料再生產品類別，維持逐案查核，其餘產品類別免逐案工廠查核，採認其3年內有效之工廠查核報告，並比照境外工廠作法，將申請案與工廠查核案分開。</p><br /> <p style={style.contentStyle4}>2.請業務單位就工廠查核指引內容另案召開專家諮詢會討論。</p></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>8</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">環保標章規定不得使用具歐盟指令判定風險警語代碼之有害物質及應檢附物質安全資料表之驗證作法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle4}>1.申請業者提供之MSDS品質良好，化學品CAS編號明確，MSDS各子項資訊詳實完整，且依67/548/EEC指令提供Risk Phrases與Safety phrases代碼者，依MSDS內容進行審查。</p> <p style={style.contentStyle4}>2.申請業者提供之MSDS品質良好，化學品CAS編號明確，MSDS各子項資訊詳實完整，雖未依67/548/EEC指令提供Risk Phrases與Safety phrases代碼，但有明確之特性敘述(如吸入有毒、吞食有毒等)，驗證機構足以依67/548/EEC指令逕行判定者，依MSDS內容進行審查。</p> <p style={style.contentStyle4}>3.申請業者提供之MSDS品質不佳，化學品CAS編號明確，但其他資訊缺漏(如標記N/A、留白未填、缺乏特性敘述等)，應要求業者補件，若補件後仍未改善，則驗證機構得依CAS編號進行查詢，並依查詢結果進行審查。</p> <p style={style.contentStyle4}>4.申請業者提供之MSDS品質不佳、未註明CAS編號、其他資訊亦有缺漏(如標記N/A、留白未填等)，應要求業者補件至足以依前述方式處理，或補件期滿為止。</p> <p style={style.contentStyle4}>5.廠商所使用之個別原料MSDS有登載不得含有之警語，但如因化學反應後導致原性狀消失者，可檢附相關證明文件或測試報告，經審查確認合理後亦可視為排除條款。</p></div></div></div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>8</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">「回收再生紡織品」之產品認定及檢測報告採認作法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle2}>1.國家標準：無。</p> <p style={style.contentStyle2}>2.產品染色部分：</p> <p style={style.contentStyle5}>如產品用料、混紡比例、染料種類、染色製程等相同者，僅因剪裁與縫製不同導致產品形狀尺寸不同或功能不同，其產品檢測報告應可通用。但若同類型產品之印染花色或顏色不同，則應分別檢測。</p> <p style={style.contentStyle2}>3.證書及產品認定：</p> <p style={style.contentStyle6}>(1)產品名稱不同，視為不同件，應分別提出申請，且證書分開，如手帕、襪子各一張證書。</p> <p style={style.contentStyle6}>(2)同樣配方及製程相同，僅尺寸差異時，視為同一件，如不同尺寸的襪子、手帕。</p> <p style={style.contentStyle6}>(3)同一產品名稱如手帕，其配方及製程相同，僅後段染印成不同花色或顏色，視為同一件產品，登載於同一張證書，產品名稱為手帕（紅色、黃色、花色）。</p> <p style={style.contentStyle6}>(4)如顏色或花色差異在於產品配方及製程不同，應視為不同件，給予不同產品證書。</p></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>8</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">「資源回收再利用建材」之產品認定及檢測報告採認作法</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle2}>1.國家標準：</p> <p style={style.contentStyle6}>(1)矽酸鈣板類：因已於商品驗證登錄證書中登錄各型號產品，所附登載之產品均視為符合國家標準。</p> <p style={style.contentStyle6}>(2)對於桌、椅等水泥模鑄式產品：因無國家標準，故無須檢附符合國家標準之證明，產品之品質由廠商與採購者自行規定。</p> <p style={style.contentStyle6}>(3)水泥製品類:有國家標準對應之產品，如廠商取得正字標記該類產品證書者，因所有尺寸已包含正字標記驗證範圍中，申請時檢附最近一期正字標記檢驗紀錄表者，可代表所有尺寸。非取得正字標記之廠商，申請時產品應標明尺寸，並應檢附該尺寸對應之國家標準檢測報告提出申請，並於環保標章使用證書上標註尺寸，如需增加尺寸，則應檢具測試報告等證明文件，向驗證機構申請變更增列。</p> <p style={style.contentStyle2}>2.產品使用回收料及染料：</p> <p style={style.contentStyle5}>再生料戴奧辛與染料重金屬分別係針對產品使用之再生原料與染料進行測試，不同產品項目，回收料及染料之測試報告可以通用。</p> <p style={style.contentStyle2}>3.產品整體之TCLP部分：</p> <p style={style.contentStyle5}>產品原料種類、產品原料配比(此配比包含不同種類原料配比與同一種類但粒徑大小不同之配比)、產品製程差異(如經高壓與未高壓)，可能影響產品TCLP測試結果，如僅製程模具不同導致產品形狀尺寸不同，不致影響TCLP測試結果者，其TCLP檢測報告可以通用。</p> <p style={style.contentStyle5}>另添加色料部分僅為外加，配方相同僅有顏色不同之產品，可以其中一種顏色或本色產品進行TCLP，其他顏色之水泥磚類，無須逐一檢測。</p> <p style={style.contentStyle2}>4.證書及產品認定：</p> <p style={style.contentStyle6}>(1)產品名稱不同，視為不同件，應分別提出申請，且證書分開，如空心磚與圍牆磚、各類水泥模具所製之桌、椅、欄杆，均為不同張證書。</p> <p style={style.contentStyle6}>(2)同樣配方僅顏色差異時，視為同一件，如產品名稱為圍牆磚（本色、紅色、黃色）。</p> <p style={style.contentStyle6}>(3)同樣原料配方僅尺寸及包裝量不同，視為同一件產品。</p></div></div></div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>6</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">環保標章規格標準與「節能標章」、「省水標章」、「綠建材標章」相同規定項目之直接採認作法</p></p> <p style={style.contentStyle3}>決議：有關環保標章規格標準與「節能標章」、「省水標章」、「綠建材標章」相同規定項目，同意直接採認使用證書之作法，另於廠商應檢附文件部分，原則同意修正為「至少尚有6個月以上有效期限之節能標章使用證書或能源效率檢測報告」</p></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>4</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">環保標章規格標準相關數值判定之驗證原則</p></p> <p style={style.contentStyle3}>決議：檢測報告或計算結果數值呈現為管制限值下一位，管制限值下二位則以四捨五入修整，作為驗證判斷原則。</p></div></div></div>
                                    <div className="div-flex table-row-light">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>3</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">因應新增項目登錄認可之作法</p></p> <p style={style.contentStyle3}>決議：針對特定基質或項目未有認可實驗室可執行時，如該實驗室具有同基質或同項目經認可之檢測能力且於本署網站登錄者，由實驗室出具首件檢測報告，包括檢測原始數據、圖譜或儀器校正紀錄等資料，由本署邀集檢測相關專家進行審查，經通過後，則暫時認可該實驗室具有該項檢測項目1年，並登載於本署網站，供廠商選定及驗證機構驗證遵循，但該實驗室應於1年內向本署申請認可或TAF認可，否則不再受理其申請暫行認可，一旦有實驗室取得本署或TAF認可，亦不再適用。</p> <p></p></div></div></div>
                                    <div className="div-flex table-row-dark">
                                        <div style={{ width: "5em" }}>102</div>
                                        <div style={{ width: "5em" }}>3</div>
                                        <div className="w-100"><div><p style={style.contentStyle1}><p className="text-bolder">「旅館業」環保標章規格標準所訂室內空氣品質之驗證處理原則</p></p> <p style={style.contentStyle1}>決議：</p> <p style={style.contentStyle4}>1.旅館業室內場所如經公告為室內空氣品質之公告場所，即依相關規定辦理，於未公告前，先行依下列驗證原則辦理。</p> <p style={style.contentStyle4}>2.旅館業室內空氣品質之驗證原則：包括檢測項目為二氧化碳、甲醛、總揮發性有機化合物及細菌，標準值比照「室內空氣品質標準」，檢測方法請依本署公告之標準檢測方法執行，檢測地點判定如下：</p> <p style={style.contentStyle6}>(1)二氧化碳、甲醛及總揮發性有機化合物檢測項目部分：於大廳、附屬餐廳用餐區(座位100人以上)、附屬商店、室內游泳池及會議室各擇1點進行巡查檢驗，依巡檢結果，選擇各檢測項目濃度較高之1點巡檢點分別進行檢測，如均無上述場所則擇一室內公眾場所進行檢測。</p> <p style={style.contentStyle6}>(2)細菌檢測項目部分：於採樣前先進行現場觀察，優先採樣有滲漏水漬或微生物生長痕跡之位置1點。</p></div></div></div>
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

export default withRouter(GreenMarkIntroLawCouncilResolution);
