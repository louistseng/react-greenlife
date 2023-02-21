import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroCriteriaDraft(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    return (
        <>
            <BreadCrumb currentPage="【規格標準訂定與查詢】規格標準之介紹-草案研擬" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="規格標準之介紹-草案研擬" /></div>
            <div className="">
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroCriteriaDraft`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">規格標準之介紹<br />-草案研擬</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroCriteriaReviewProcedures`}><div className="col-12 col-md-6 col-lg-12">規格標準之介紹<br />-制訂審查程序</div></Link>
                            <Link to={`/categories/GreenSpecificationSearch`}><div className="col-12 col-md-6 col-lg-12">環保標章<br />規格標準查詢</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>草案研擬</h1>
                            </div>
                            <div className=" col-12    bluebar mt-2 mb-2">
                                <p className="pt-3 mb-2 text-indent">
                                    由於環保標章標榜的是優良產品，每家廠商都可以宣稱自己的產品很優良，因此如何界定產品在生產時原料取得、製造、使用及廢棄、回收的生命週期中，符合「低污染、省資源、可回收」的環保特性，就需要一套嚴謹的規範。既然是要挑選出同級產品中排名前段的模範生，因此，依產品類別制訂的規格標準就非常重要。
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    這就好比拳擊賽，羽量級選手不能拿來跟重量級選手較量。傳統燈泡不能拿來跟LED燈泡比，因為比較的基礎不一樣。也因此，當初環保署在制訂環保標章制度時，首要事務就是必須訂定出公正的產品規格標準。為了讓這個規格標準更具公信力，環保署設定了2種方式：
                                </p>
                                <p className="pt-3 mb-2 text-indent text-bolder">
                                    方法一、環保署自訂
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    由審議委員依據國際趨勢、市場規模、機關採購需求、環境效益及業界意見等多方考量，決定制訂規格標準之產品類別優先順序，並訂出產品表現優良的前20%~30%的品質要求。
                                </p>
                                <p className="pt-3 mb-2 text-indent text-bolder">
                                    方法一、公會提議
                                </p>
                                <p className="pt-3 mb-2 text-indent">
                                    由產業公會結合會員依產品表現優良的前20%~30%品質要求，研擬環保標章規格標準的草案內容，直接向環保署提議訂定。
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

export default withRouter(GreenMarkIntroCriteriaDraft);
