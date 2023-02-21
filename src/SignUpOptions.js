import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./Login.scss";
import greenLogo from "./images1/green-logo.PNG";
import signUpNormal from "./images1/login/signUp-normal.png";
import signUpOrg from "./images1/login/signUp-org.png";
import { clickRecord } from './utils/API';
import { GuidContext } from './utils/Context';

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));


function SignUp(props) {

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord(GuidContext._currentValue, "16", collector)
    }, [collector]);



    return (
        <>

            <BreadCrumb currentPage={"選擇帳號類別"} />

            <div className="sightUp-card-wrapper">
                <div className="signUp-content">
                    <img className="logo" src={greenLogo} alt="綠生活Logo" title="綠生活Logo"></img>
                    <h4 className="signUp-title">申請帳號</h4>
                    <h6 className="signUp-subtitle">請選擇帳號類別</h6>
                    <div className="signUp-btn-wrapper">
                        <div><p className="note-text">我是個人，我想發佈綠生活網誌、照片...</p><Link to="/PbSignUp" className="link-area"><div className="signUp-btn width_50"><img src={signUpNormal} width={"45%"} alt="一般註冊圖示" title="一般註冊圖示" /><h4>個人帳號註冊</h4></div></Link></div>
                        {/* <div><p className="note-text">我是個人，我想發佈綠生活網誌、照片...</p><Link to="/signUp_options/public_SignUp" className="link-area"><div className="signUp-btn width_50"><img src={signUpNormal} width={"45%"} alt="一般註冊圖示" title="一般註冊圖示"/><h4>一般註冊</h4></div></Link></div> */}
                        <div><p className="note-text">我是單位管理者，我要代表單位響應綠色辦公...</p><Link to="/signUp_options/organization_SignUp" className="link-area"><div className="signUp-btn width_50"><img src={signUpOrg} width={"45%"} alt="組織單位註冊圖示" title="組織單位註冊圖示" /><h4>組織帳號註冊</h4></div></Link></div>
                    </div>
                </div>
            </div>


            <Footer />

        </>
    );
}

export default withRouter(SignUp);