import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./Error.scss";
import greenLogo from './images1/error/greenLogo.png';
import questionMan from './images1/error/questionMan.png';

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));


function Error({ history }) {

    return (
        <>

            <BreadCrumb currentPage={"錯誤頁面"} />

            <div className="error-wrapper">
                <div className="man-wrapper">
                    <img className="man-img" title="人物圖片" alt="人物圖片" src={questionMan} />
                </div>
                <div className="right-content">
                    <h1>看起來發生404錯誤了...</h1>
                    <img className="logo-img" title="全民綠生活LOGO" alt="全民綠生活LOGO" src={greenLogo} />
                    <h2>要試試看<Link className="back-main-link" to="/about">回首頁</Link>嗎?</h2>
                </div>
            </div>

            <div style={{ height: "30vh" }} className="search-content"></div>
            <Footer />

        </>
    );
}

export default withRouter(Error);