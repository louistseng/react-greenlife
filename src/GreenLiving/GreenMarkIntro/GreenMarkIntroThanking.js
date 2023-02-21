import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import thankingLogo from '../../images1/greenLiving/1-1-4_1.png';
import yearValidGreenMark from '../../images1/greenLiving/1-1-4_2.png';
import yearValidCriteria from '../../images1/greenLiving/1-1-4_3.png';
import worldProductionMap from '../../images1/greenLiving/1-1-4_4.png';
import companyLogo from '../../images1/greenLiving/1-1-4_5.gif';
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroThanking(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【環保標章介紹】感謝這些年，有您一路相隨"/>
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="感謝這些年有您一路相隨" /></div>
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
                                <h5>感謝這些年，有您一路相隨</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <div className="text-center">
                                    <img src={thankingLogo} className="thanklogo" alt="感謝這些年有您一路相隨" title="感謝這些年有您一路相隨" />
                                </div>
                                <p className="pt-3 mb-2 text-indent">
                                環保標章，「一片綠色樹葉包裹著純淨、不受污染的地球」的圖示，象徵著「可回收、低污染、省資源」的環保理念。自81年起推動至今，已有14大類產品類別，超過1百多種產品項目，從一般產品的認證推展至服務業 ，目前約有4,600件有效產品，其中還包含30餘件服務類產品。
                                </p>
                                <div className="text-center">
                                    <img src={yearValidGreenMark} className="w-100" alt="歷年環保標章產品發證及有效數（83-107年）" title="歷年環保標章產品發證及有效數（83-107年）" />
                                    <img src={yearValidCriteria} className="w-100" alt="歷年環保標章各產品規格發證數（83-107年）" title="歷年環保標章各產品規格發證數（83-107年）" />
                                </div>
                                <p className="pt-3 mb-2 text-indent">
                                環保標章產品，不僅超過六成在臺灣本土生產，更與世界接軌，於世界各地生產，並於臺灣取得認證。除了臺灣，環保標章產品也來自中國大陸、日本、東南亞各國（包含越南、泰國、新加坡、印尼、菲律賓、馬來西亞） 以及小部分產自歐洲，包含波蘭、荷蘭及德國等。
                                </p>
                                <div className="text-center"><img src={worldProductionMap} className="w-100" alt="環保標章各產品之產地圖" title="環保標章各產品之產地圖" /></div>
                                <p className="pt-3 mb-2 text-indent">
                                環保標章的推行，是希望鼓勵廠商生產對於環境衝擊較少的產品，藉由市場機制，帶動環境保護潛力。這一路走來，環保標章作為臺灣的綠色產品領頭羊，創造了可觀的綠色經濟及環境效益。這其中要感謝持續支持環保標章產品認證的業者 ，長期支持環保標章制度，並引導其他業者仿效，共同開創綠色消費市場。
                                </p>
                                <div className="text-center"><img src={companyLogo} className="w-100" alt="響應環保標章公司概覽" title="響應環保標章公司概覽" /></div>
                                <p className="pt-3 mb-2 text-indent">
                                綠色消費政策與成果之推動，須仰賴民間單位的配合及努力。尤其，近年來透過政府機關與民間企業不斷努力，綠色產品範疇逐漸擴大，提升我國在國際間的綠色競爭力，亦逐步提高國人對綠色產品及綠色服務的認同。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                期許未來透過生產製造、供應及需求，三方面的相互配合，將此環境保護力量加以推廣，為下一代子孫創造更優質的綠色家園。
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

export default withRouter(GreenMarkIntroThanking);
