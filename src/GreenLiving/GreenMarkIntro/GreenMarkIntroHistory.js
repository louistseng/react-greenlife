import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';
import yearOfCriteria from '../../images1/greenLiving/1-1-1-3_1v2.png';
import yearOfGreenProduct from '../../images1/greenLiving/1-1-1-3_2v2.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroHistory(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【環保標章介紹】推動歷程及成果" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="推動歷程及成果" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroFirst`}><div className="col-12 col-md-6 col-lg-12">環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroSecond`}><div className="col-12 col-md-6 col-lg-12">第二類環保標章</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroDeclarations`}><div className="col-12 col-md-6 col-lg-12">環保標章產品<br />正確環境宣告方式</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroHistory`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">推動歷程及成果</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroInternational`}><div className="col-12 col-md-6 col-lg-12">國際交流</div></Link>
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 div-flex topbtn justify-content-between">
                                <Link to={`/greenLabel/GreenMarkIntroHistory`}><div>推動歷程及成果</div></Link>
                                <Link to={`/greenLabel/GreenMarkIntroThanking`}><div>感謝這些年，有您一路相隨</div></Link>
                            </div>
                            <div className="col-12 greenbar">
                                <h1>推動歷程及成果</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    民國60年代歐美國家興起環保運動，主要以減少人類對於環境的破壞行為為訴求，並且推行「綠色消費」概念，以減少過度生產與消費之生活型態而造成對環境的衝擊，環保標章運動因應而生且蓬勃發展。 民國66年由德國政府首創藍天使環保標章計畫，民國77年加拿大政府的環境選擇標章計畫與民國78年日本及北歐國家的環保標章制度也都陸續推出。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    環保署為順應世界環保趨勢，特參考國際先進國家實施環保標章之經驗，於民國81年推動環保標章制度，以鼓勵事業單位於產品之原料取得、製造販賣、使用及廢棄之產品生命週期過程中， 能夠降低環境之污染及節省資源之消耗，促進廢棄物之減量及回收再利用，同時喚醒消費者慎選可回收、低污染、省資源之產品，以維護環境品質。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    經邀集專家學者及相關單位研商訂定實施辦法，於民國81年2月，正式向社會大眾公開徵求環保標章圖樣。經邀請美術設計師、環保專家學者、民間團體等共19人組成評審團，評選環保標章的圖案，並依法註冊登記其商標專用權及對外界公告。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    環保標章計畫推動之初，即於民國81年11月公告實施環保標章制度的兩項重要法規，包括「環保標章推動使用作業要點」與「環保標章審議委員會設置要點」，為實施環保標章制度之法源依據， 同年12月與財團法人工業技術研究院(簡稱工研院)正式簽約，委託研擬環保標章制度、產品規格標準及審核認證，開啟我國推動環保標章之序幕。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    民國82年2月公告第一批產品規格標準，並於同年6月核發首批環保標章使用證書產品，至此印有環保標章之產品正式上市。民國85年2月建立環保標章資訊站，以加強對於環保標章計畫之宣導， 每年亦參與各項環保展覽，辦理說明會、研討會及園遊會等各項宣導工作，另運用廣播媒體、流動廣告、將綠色產品訊息傳播給消費者，進行深入民間的環境教育。民國86年工研院為技術轉移， 捐助成立財團法人環境與發展基金會(以下簡稱環發會)之環保專業團體，自始由環發會協助受理申請、審查、查核等標章工作，並協助相關規格標準研訂與修正。歷年累積公告標章規格標準項目如下圖。
                                </p>
                                <div className="text-center"><img src={yearOfCriteria} className="w-100" alt="歷年累積公告標章規格標準項" /></div>
                                <p className="pt-3 mb-2 text-indent">
                                    除環保標章制度外，為配合政府綠色採購需求，於民國89年建立第二類環境保護產品證明機制，針對非環保署公告之產品環保標章規格標準項目，經認定產品或其原料之製造、 使用過程及廢棄物處理，符合再生材質、可回收、低污染或省資源者，予以核發第二類環境保護產品證明，提供政府機關及民眾更多環保產品選擇性。對於廠商申請部分乃成立單一窗口， 處理環保產品審查、驗證等工作，提供廠商更簡便之申請途徑。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    由於環保標章及第二類環保產品種類及數量日益增加，環保署為強化後市場追蹤查核，於民國100年3月函頒「行政院環境保護署環境保護管理作業規範」，明訂查核工作 ，包括查核生產現場、販售場所管理情形及產品抽樣檢驗，如有不符合規定時，將請廠商限期內提出說明和改善計畫、且改善期間不得使用環保標章。改善後仍不符合規定或不改善者 ，則取消其環保標章資格，以加強管理制度。歷年環保標章產品核發產品件數如下圖。
                                </p>
                                <div className="text-center"><img src={yearOfGreenProduct} className="w-100" alt="歷年環保標章產品核發產品件數" /></div>
                                <p className="pt-3 mb-2 text-indent">
                                    民國101年6月環保署函頒「行政院環境保護署環境保護產品驗證機構管理要點」，以遴選、管理驗證機構，執行受理申請、審查、核發證書及追蹤管理等驗證業務， 並於同年11月委託環發會及財團法人台灣商品檢測驗證中心(原名：財團法人台灣電子檢驗中心)為驗證機構，導入第三機構專業驗證作法，健全環境保護產品之驗證管理制度。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    環保署為讓民眾安心選購環保標章產品、強化產品後市場管理及確保環保標章產品品質，於民國103年9月函頒修正「行政院環境保護署綠色消費暨環境保護產品推動使用作業要點」， 取消產品缺失記點機制、刪除提改善計畫及暫停證書機制，並針對產品抽驗不符合環保標章規格標準者，直接廢止環保標章使用權及命其停止販售該類產品，但塗銷標章者不在此限， 避免違規產品繼續流通，確保標章產品公信力，並促使廠商加強原物料與產品品質管理。而且針對未經同意擅自使用環保標章者，依商標法追究法律責任，其中環保標章廠商有擅用者， 自公布日起，三年內不受理其申請案，以督促廠商積極改正缺失，作好內部管理。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    同年為推廣第二類環境保護產品，特設計專用標章圖案，修正名稱為第二類環保標章，向智慧財產局申請註冊，取得證明標章權人後，針對廠商冒用環保標章及第二類環保標章情形， 除命其限期改善，並依違反商標法第96條侵害證明標章權，移送地檢署偵辦，相關違規訊息，公布於環保署綠色生活資訊網之「違規公司與產品消息公布」專區，提供民眾正確選購環保標章產品資訊及發揮市場監督機制， 保障公眾對環保標章信賴之期待。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    我國出席代表陳靖原總經理於2018年GEN工作討論會，受邀提出我國近年就評估環保標章整體效益進行之研究報告，並自願加入德國政府委託德國Oeko-Institute進行之環保標章績效評估研究。 我國代表於報告中有系統地介紹我國自2010年迄今曾進行之各方面向環保標章效益評估嘗試，我國最早的環保標章經濟效益評估開始，演變到針對個別產品環境效益評估，其後再開發單一數值之環境效益指標， 並自2018年起展開自動化環境效益計算器開發作業，前述作業於GEN會員中少有人嘗試，於歷年GEN相關會議中亦僅有我國、韓國、中國代表曾提出類似方向之報告，我國於此部分之技術領先事實亦為德國Oeko-Institute邀請我國持續加入研究之主要原因。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    此外由於長期投入建立之聲譽與人脈，環發會陳靖原總經理，成功以第二高票再次取得二年制董事一席，而維持我國技術領先形象，並利用GEN平台推動我國環保標章之國際合作與南向政策，於年會後之董事會， 我國陳靖原總經理除持續接受主席指派，繼續進行GEN績效評估研究外，亦自願加入董事會新設之任務小組，針對如何提升GEN會員之參與程度，與如何促進GEN會員間之國際合作，進行研討並於下次董事會提出具體建議。
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

export default withRouter(GreenMarkIntroHistory);
