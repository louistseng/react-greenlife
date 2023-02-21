import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./Login.scss";
import greenLogo from "./images1/green-logo.PNG";
import signUpFacebook from "./images1/login/signUp-fb.png";
import signUpNormal from "./images1/login/signUp-normal.png";
import googleLogo from "./images1/login/google.png";

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));


function SignUp(props) {


    return (
        <>

            <BreadCrumb currentPage={"會員註冊"} />

            <div className="sightUp-card-wrapper">
                <div className="signUp-content">
                    <img className="logo" src={greenLogo} alt="綠生活Logo" title="綠生活Logo"></img>
                    <h4 className="signUp-title">請選擇註冊方式</h4>
                    <div className="signUp-btn-wrapper">
                        <Link to="/PbSignUp"><div className="signUp-btn"><img src={signUpNormal} width={"50%"} alt="一般註冊圖示" title="一般註冊圖示" /><h4>一般註冊</h4></div></Link>
                        <a href="https://www.facebook.com/v8.0/dialog/oauth?client_id=671711793527935&display=popup&response_type=token&redirect_uri=https://greenlife.eri.com.tw/login" title="FACEBOOK註冊鏈結"><div className="signUp-btn"><img src={signUpFacebook} width={"50%"} alt="FACEBOOK註冊圖示" /><h4>FACEBOOK註冊</h4></div></a>
                        <a href="https://accounts.google.com/o/oauth2/v2/auth?
                            scope=https%3a%2f%2fwww.googleapis.com%2fauth%2fuserinfo.profile+https%3a%2f%2fwww.googleapis.com%2fauth%2fuserinfo.email
                            &response_type=code
                            &access_type=offline
                            &client_id=1098236736077-btshlu2s7sephf72kjpphi0iso8mc219.apps.googleusercontent.com
                            &state=greenlife
                            &redirect_uri=https://greenlife.eri.com.tw/login" className="GG-login" title="GOOGLE註冊圖示">
                            <div className="signUp-btn"><img width={"50%"} src={googleLogo} alt="GOOGLE註冊圖示" /><h4>GOOGLE註冊</h4>
                            </div>
                        </a>

                    </div>
                </div>
            </div>


            <Footer />

        </>
    );
}

export default withRouter(SignUp);