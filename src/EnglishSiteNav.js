import React, { useEffect } from 'react';
import './SiteNav.scss';
import BreadCrumb from './Components/BreadCrumb';
import { HashLink as Link } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom';
import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";

const Footer = React.lazy(() => import('./Components/EnglishVersion/EnglishFooter'));

function EnglishNavBar() {

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";


    //點閱計數API
    useEffect(() => {
        clickRecord("5FF6ECE3-D43A-4677-9B54-2DFE4341F61B", "1", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"SiteMap"} />
            <div className="container site-nav">
                <div>
                    <div className="d-flex justify-content-start">
                        <img src="images/blankLeef.png" alt="SiteMap-img" title="SiteMap-img" />
                        <div className="site-main-title"><h1>SiteMap</h1></div>
                    </div>
                </div>

                <div className="siteNav-content">
                    <a className="skip-nav" href="#" title="主要內容區" accessKey="c">:::</a>
                    <div className="row site-sub-title">
                        <Link className="title-link" to="/en_Main"><h2 className="col-sm-12 col-md-3 col-lg-3" style={{ color: "#FF0066" }}>0.Intro</h2></Link>
                    </div>
                    <div className="row site-sub-title d-flex justify-content-start">
                        <h2 className="col-sm-12 col-md-4 col-lg-4" style={{ color: "#FF6666" }}>1.About Green Life</h2>
                        <ul className="col-sm-12 col-md-8 col-lg-8">
                            <Link to="/en_About#news"><li>1-1.News</li></Link>
                            <Link to="/en_About#intro"><li>1-2.About Green Life</li></Link>
                            <Link to="/en_About#wedo"><li>1-3.What We Do</li></Link>
                            <Link to="/en_About#media"><li>1-4.Green Life Media</li></Link>
                            <Link to="/en_About#search"><li>1-5.Green Life Search</li></Link>

                        </ul>
                    </div>

                    <div className="row site-sub-title">
                        <Link className="title-link col-sm-12 col-md-4 col-lg-4" to="#"><h2 style={{ color: "#FFCC33" }}>2.What We Do</h2></Link>
                        <ul className="col-sm-12 col-md-8 col-lg-8">
                            <Link to="/en_FlipTour"><li>2-1.Green Travel </li></Link>
                            <Link to="/en_FlipFood"><li>2-2.Green Dining</li></Link>
                            <Link to="/en_FlipShopping"><li>2-3.Green Consumption</li></Link>
                            <Link to={`/en_FlipHome`}><li>2-4.Green Home </li></Link>
                            <Link to="/en_FlipOffice"><li>2-5.Green Office</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(EnglishNavBar);