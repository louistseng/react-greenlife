import React, { useEffect, useContext, useState } from 'react';
import './Activity.css';
import { Link, withRouter } from 'react-router-dom';
import { clickRecord } from './utils/API';
import { AuthContext } from './utils/Context';
import tourImg from './images1/activity-tour.jpg';
import officeImg from './images1/activity-office.png';
import greenbuyImg from './images1/greenbuy.png';

// import PropTypes from 'prop-types'
// import Tour from 'reactour'
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));

function Activity({ SSL, domain }) {
    const collector = sessionStorage.getItem("userGuid") || "";
    //const { contextCollector, contextToken } = useContext(AuthContext);

    //紀錄本頁點閱數
    useEffect(() => {

        window.scrollTo(0, 0)
        clickRecord("3C716904-475F-433A-A254-3491FBB91445", "1", collector)
    });

    return (
        <>
            <BreadCrumb />
            <div className="row ac-wrapper">
                <Link to="/categories/restaurant" className="green-restaurant category-bar col-12 col-md-12  col-lg-6" title="前往連結">
                    <div className="d-flex">
                        <h1 id="a" className="title">綠色餐廳</h1>
                        <div className="middle"></div>
                        <img src="https://cdn.pixabay.com/photo/2016/04/25/06/39/food-1351287_960_720.jpg" alt="綠色餐廳圖示" title="綠色餐廳" className="image" />

                        <div className="overlay">
                            <h1 className="title">綠色餐廳</h1>
                        </div>
                    </div>
                </Link>

                <Link to="/categories/tourIntro" className="green-travel category-bar col-12 col-md-12 col-lg-6" title="前往連結">
                    <div className="d-flex">
                        <h1 className="title">綠色旅遊</h1>
                        <div className="middle"></div>
                        <img style={{ marginTop: "-10%" }} src={tourImg} alt="綠色旅遊圖示" title="綠色旅遊" className="image" />
                    </div>
                    <div className="overlay">
                        <h1 className="title">綠色旅遊</h1>
                    </div>

                </Link>
                <Link to="/categories/accommodation" className="green-hotel category-bar col-12 col-md-12  col-lg-6" title="前往連結">
                    <div className="d-flex">
                        <h1 className="title">環保旅宿</h1>
                        <div className="middle"></div>
                        <img src="https://cdn.pixabay.com/photo/2012/11/21/10/24/building-66789_960_720.jpg" alt="環保旅宿圖示" title="環保旅宿" className="image" />

                        <div className="overlay">
                            <h1 className="title">環保旅宿</h1>
                        </div>
                    </div>
                </Link>
                {/* /categories/GreenShopSearch */}
                <Link to="/categories/GreenShopSearch" className="green-shop category-bar col-12 col-md-12  col-lg-6" title="前往連結">
                    <div className="d-flex">
                        <h1 className="title">綠色商店</h1>
                        {/* <h1 id="e" className="title">綠色商店</h1>
                        <h1 id="f" className="title">近期開放</h1> */}
                        <div className="middle"></div>
                        <img src="images/綠色商店-2.jpg" alt="綠色商店圖示" title="綠色商店" className="image" />
                    </div>
                    <div className="overlay">
                        <h1 className="title">綠色商店</h1>
                        {/* <h1 id="e" className="title">綠色商店</h1>
                        <h1 id="f" className="title">近期開放</h1> */}
                    </div>
                </Link>

                <Link to="/categories/green_office" className="green-office category-bar col-12 col-md-12  col-lg-4" title="前往連結">
                    <div className="d-flex">
                        <h1 className="title">綠色辦公</h1>
                        {/* <h1 id="b" className="title">近期開放</h1> */}
                        <div className="middle"></div>
                        <img src={officeImg} alt="綠色辦公圖示" title="綠色辦公" className="image" />

                        <div className="overlay">
                            <h1 className="title">綠色辦公</h1>
                            {/* <h1 id="b" className="title">近期開放</h1> */}
                        </div>
                    </div>
                </Link>
                {/* href="https://greenliving.epa.gov.tw/newPublic/Product/ProductQuery" */}
                {/* /categories/GreenProductSearch */}
                <Link to="/categories/GreenProductSearch" className="green-verify-hotel category-bar col-12 col-md-12  col-lg-4" title="前往連結">
                    <div className="d-flex">
                        <h1 className="title">環保產品</h1>
                        {/* <h1 id="g" className="title">環保產品</h1>
                        <h1 id="h" className="title">近期開放</h1> */}
                        <div className="middle"></div>
                        <img src="https://cdn.pixabay.com/photo/2017/06/06/08/13/hotel-2376536_960_720.jpg" alt="環保產品圖示" title="環保產品" className="image" />

                        <div className="overlay">
                            <h1 className="title">環保產品</h1>
                            {/*<h1 id="g" className="title">環保產品</h1>
                            <h1 id="h" className="title">近期開放</h1>*/}

                        </div>
                    </div>
                </Link>
                <div>
                    {/* href="https://cfp-calculate.tw/cfpc/Carbon/WebPage/visitors/FLProductinfo.aspx"  */}
                    {/* <a  title="在新視窗打開鏈結" target="_blank" className="green-verify-product category-bar col-12 col-md-12  col-lg-4" ></a> */}
                </div>
                <a href="https://cfp-calculate.tw/cfpc/Carbon/WebPage/visitors/FLProductinfo.aspx" title="另開視窗" target="_blank" rel="noopener noreferrer" className="green-verify-product category-bar col-12 col-md-12  col-lg-4">
                    <div className="d-flex">
                        <h1 id="i" className="title">產品碳足跡</h1>
                        <h1 id="j" className="title">產品碳足跡</h1>
                        {/* <h1 id="j" className="title">近期開放</h1> */}
                        <div className="middle"></div>
                        <img src="https://cdn.pixabay.com/photo/2015/04/10/17/03/pots-716579_960_720.jpg" alt="產品碳足跡圖示" title="產品碳足" className="image" />
                    </div>
                    <div className="overlay">
                        {/* <h1 id="i" className="title">產品碳足跡</h1> */}
                        {/* <h1 id="j" className="title">近期開放</h1> */}

                    </div>
                </a>

                {/* target="_blank" rel="noreferrer noopener" href="/GIS" */}
                <a href={`${SSL}//${domain}/GIS`} title="另開視窗" className="gis-map category-bar col-12 col-md-12 col-lg-6">

                    <div className="d-flex">
                        <h1 id="k" className="title">GIS整合查詢</h1>
                        <h1 id="l" className="title">GIS整合查詢</h1>
                        {/* <h1 id="l" className="title">近期開放</h1> */}
                        <div className="middle"></div>
                        <img src="https://cdn.pixabay.com/photo/2017/11/13/22/12/compass-2946959_960_720.jpg" alt="GIS整合查詢圖示" title="GIS整合查詢" className="image" />
                    </div>
                    <div className="overlay">
                        {/* <h1 id="k" className="title">GIS整合查詢</h1> */}
                        {/* <h1 id="l" className="title">近期開放</h1> */}
                        {/* <div className="text">Hello World</div> */}
                    </div>

                </a>
                <a href="https://greenbuy.epa.gov.tw/" title="另開視窗" target="_blank" rel="noopener noreferrer" className="green-Pur-Chase category-bar col-12 col-md-12  col-lg-6">
                    <div className="d-flex">
                        <h1 className="title">環保產品線上採購網</h1>
                        <div className="middle"></div>
                        <img src={greenbuyImg} alt="採購網圖示" title="採購網圖示" className="image" style={{ width: "100%", top: "-60%" }} />
                        <div className="overlay">
                            <h1 className="title">環保產品線上採購網</h1>
                        </div>
                    </div>
                </a>


            </div>

            <Footer />


            {/* <div className="green-travel bar"><h1>綠色旅遊</h1></div> */}

        </>
    );
}

export default withRouter(Activity);
