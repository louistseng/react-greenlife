import React, { useEffect } from 'react';
import './SiteNav.scss';
import SideBtn from './Components/SideBtn';
import BreadCrumb from './Components/BreadCrumb';
import Footer from './Components/Footer';
import { HashLink as Link } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';
import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";


function GreenTour({ SSL, domain }) {

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";


    //點閱計數API
    useEffect(() => {
        clickRecord("5FF6ECE3-D43A-4677-9B54-2DFE4341F61B", "1", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"網站導覽"} />
            <div className="container site-nav">
                <div>
                    <div className="d-flex justify-content-start">
                        <img src="images/blankLeef.png" alt="網站導覽圖示" title="網站導覽圖示" />
                        <div className="site-main-title"><h1>網站導覽</h1></div>
                    </div>
                    <div className="navigator-content">
                        <p>本網站依無障礙網頁設計原則建置，網站的主要內容分為2大區塊：</p>
                        <br />
                        <p>1.上方功能區塊、2.中央內容區塊。</p>
                        <br />
                        <p>本網站的快速鍵﹝Accesskey﹞設定如下：</p>
                        <br />
                        <p>Alt+U：上方導覽連結區，此區塊列有本網站主要連結。</p>
                        <p>Alt+C：中央內容區塊，為本頁主要內容區。</p>
                        <p>Alt+Z：頁尾網站資訊。</p>
                        <p>Alt+S：網站搜尋。</p>
                    </div>
                </div>


                <div className="siteNav-content">
                    <a className="skip-nav" href="#" title="主要內容區" accessKey="c">:::</a>
                    <div className="row site-sub-title">
                        <Link className="title-link" to="/"><h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#FF0066" }}>0.入口網頁</h2></Link>
                    </div>
                    <div className="row site-sub-title d-flex justify-content-start">
                        <h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#FF6666" }}>1.關於綠生活</h2>
                        <ul className="col-sm-12 col-md-9 col-lg-9">
                            <Link to="/about#page1"><li>1-1. 最新消息</li></Link>
                            <Link to="/about#intro"><li>1-2. 了解綠生活</li></Link>
                            <Link to="/about#anchor3"><li>1-3. 綠生活焦點照片</li></Link>
                            <Link to="/about#anchor4"><li>1-4. 綠生活常用查詢</li></Link>
                        </ul>
                    </div>


                    <div className="row site-sub-title">
                        <Link className="title-link" to="/searchEvent"><h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#FFCC33" }}>2.活動專區</h2></Link>
                    </div>

                    {/* <div className="row site-sub-title d-flex justify-content-start">
                        <h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#009966" }}>3.每日一綠</h2>
                        <ul className="col-sm-12 col-md-9 col-lg-9">
                            <li>3-1. 秀出你的綠</li>
                            <Link to="/knowledge"><li>3-2. 知識綠</li></Link>
                            <li>3-3. 綠生活達人榜</li>
                        </ul>
                    </div> */}

                    <div className="row site-sub-title d-flex justify-content-start">
                        <Link className="title-link col-sm-12 col-md-3 col-lg-3" to="/categories"><h2 style={{ color: "#009966" }}>3.綠生活選擇</h2></Link>
                        <ul className="col-sm-12 col-md-9 col-lg-9">
                            <Link to="/categories/restaurant"><li>3-1. 綠色餐廳</li></Link>
                            <Link to="/categories/greenTour"><li>3-2. 綠色旅遊</li></Link>
                            <Link to="/categories/accommodation"><li>3-3. 環保旅宿</li></Link>
                            <Link to={`/categories/GreenShopSearch`}><li>3-4. 綠色商店</li></Link>
                            {/*<a href={`#/`}><li>3-4. 綠色商店</li></a>*/}
                            <Link to="/categories/green_office"><li>3-5. 綠色辦公</li></Link>
                            {/*環保產品 href="https://greenliving.epa.gov.tw/newPublic/Product/ProductQuery" */}
                            <Link to={`/categories/greenProductSearch`}><li>3-6. 環保產品</li></Link>
                            {/*<a href={`#/`}><li>3-6. 環保產品</li></a>*/}
                            {/*產品碳足跡 href="https://cfp-calculate.tw/cfpc/Carbon/WebPage/visitors/FLProductinfo.aspx" */}
                            <a href="https://cfp-calculate.tw/cfpc/Carbon/WebPage/visitors/FLProductinfo.aspx" target="_blank" tilte="產品碳足跡(另開視窗)"><li>3-7. 產品碳足跡</li></a>
                            {/*GIS整合查詢 href="/GIS" */}
                            <a href={`${SSL}//${domain}/GIS`} target="_blank" title="GIS整合查詢(另開視窗)"><li>3-8. GIS整合查詢</li></a>
                        </ul>
                    </div>

                    <div className="row site-sub-title d-flex justify-content-start">
                        <h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#33CCFF" }}>4.知識綠</h2>
                        <ul className="col-sm-12 col-md-9 col-lg-9">
                            <Link to="/knowledge"><li>4-1. 知識綠</li></Link>
                        </ul>
                    </div>

                    <div className="row site-sub-title">
                        <Link className="title-link" to="/download/promote?type=1"><h2 className="col-sm-12 col-md-3 col-lg-5" style={{ color: "#3366FF" }}>5.下載專區</h2></Link>
                    </div>

                    <div className="row site-sub-title d-flex justify-content-start">
                        <h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#9900CC" }}>6.標章及採購</h2>
                        <ul className="col-sm-12 col-md-9 col-lg-9">
                            <Link to={`/greenLabel`}><li>6-1. 環保標章</li></Link>
                            <Link to={`/greenPurChase`}><li>6-2. 綠色採購</li></Link>
                        </ul>
                    </div>

                    <div className="row site-sub-title d-flex justify-content-start">
                        <h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#009966" }}>7.我的綠行動</h2>
                        <ul className="col-sm-12 col-md-9 col-lg-9">
                            <Link to="/daily"><li>7-1. 綠生活成果榜</li></Link>
                            <Link to="/daily/article"><li>7-2. 秀出我的綠</li></Link>
                            <Link to="/daily/blog?page=1&type=&award=&city=&n="><li>7-3. 綠生活網誌</li></Link>

                        </ul>
                    </div>

                    {/* <div className="row site-sub-title">
                        <h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#009966" }}>7.聯絡我們</h2>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenTour);