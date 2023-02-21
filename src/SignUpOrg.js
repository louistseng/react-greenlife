import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./Login.scss";

import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";

import greenLogo from "./images1/green-logo.PNG";
import govImg from './images1/greenOffice/gov.png';
import applyMan from './images1/greenOffice/applyMan.png';
import caseImg from './images1/login/case-white.png';
import bookImg from './images1/login/book-white.png';
import groupImg from './images1/login/group-white.png';

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));


function SignUp(props) {

    const collector = sessionStorage.getItem("userGuid") || "";

         //點閱計數API
         useEffect(() => {
            window.scrollTo(0, 0)
            clickRecord("EAFCA495-E4C6-412C-A187-AA50428260E0", "16", collector)
        },[collector]);

    

    return (
        <>

            <BreadCrumb currentPage={"選擇組織單位"} />

            <div className="sightUp-card-wrapper">
                <div className="signUp-content">
                    <img className="logo" src={greenLogo} alt="綠生活Logo" title="綠生活Logo"></img>
                    <h4 className="signUp-title">註冊帳號-組織單位管理帳號</h4>
                    <h6 className="signUp-subtitle">請選擇單位類別</h6>

                    <div className="org-type-wrapper">
                        <Link
                            className="org-type-button"
                            to={{
                                pathname: "/signUp_options/organization_SignUp/gov_SignUp",
                                state: { identityType: "2" }
                            }}>
                            <div className="inner-wrapper">
                                <div className="img-wrapper">
                                    <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-機關代表" />
                                    <img className="building" src={govImg} alt="機關圖示" title="響應綠色辦公-機關代表" />
                                </div>
                                <h2>我是機關代表</h2>
                                <h5>政府機關、國營事業</h5>
                            </div>
                        </Link>
                        <Link
                            className="org-type-button"
                            to={{
                                pathname: "/signUp_options/organization_SignUp/general_SignUp",
                                state: { identityType: "3" }
                            }}>
                            <div className="inner-wrapper">
                                <div className="img-wrapper">
                                    <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-企業代表" />
                                    <img className="building" src={caseImg} alt="企業圖示" title="響應綠色辦公-企業代表" />
                                </div>
                                <h2>我是企業代表</h2>
                                <h5>私營企業</h5>
                            </div>
                        </Link>

                        <Link
                            className="org-type-button"
                            to={{
                                pathname: "/signUp_options/organization_SignUp/gov_SignUp",
                                state: { identityType: "4" }
                            }}>
                            <div className="inner-wrapper">
                                <div className="img-wrapper">
                                    <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-學校代表" />
                                    <img className="building" src={bookImg} alt="學校圖示" title="響應綠色辦公-學校代表" />
                                </div>
                                <h2>我是學校代表</h2>
                                <h5>公/私立學校</h5>
                            </div>
                        </Link>
                        <Link
                            className="org-type-button"
                            to={{
                                pathname: "/signUp_options/organization_SignUp/general_SignUp",
                                state: { identityType: "6" }
                            }}>
                            <div className="inner-wrapper">
                                <div className="img-wrapper">
                                    <img src={applyMan} alt="響應人物圖示" title="響應綠色辦公-團體代表" />
                                    <img className="building" src={groupImg} alt="團體圖示" title="響應綠色辦公-團體代表" />
                                </div>
                                <h2>我是團體代表</h2>
                                <h5>有統編/廠編或無統編</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>


            <Footer />

        </>
    );
}

export default withRouter(SignUp);