import React from 'react';
import './addstyle.css';


const Footer = React.lazy(() => import('./Components/Footer'));

function AdvancingPage(props) {

    const localhost = window.location.hostname.includes("localhost");
    const eriTest = window.location.hostname.includes("eri.com.tw");

    const SSL = localhost ? window.location.protocol : props.SSL;
    const domain = localhost ? window.location.host : props.domain;

    const greenlivingDomain = localhost || eriTest ? "https://greenliving.eri.com.tw" : "https://greenliving.epa.gov.tw";

    return (
        <>
            <section class="SelectService" style={{ background: `url(images/advancingPage/bg.jpg) bottom center no-repeat` }}>
                <div class="logo">
                    <img src="images/advancingPage/u1.png" alt="綠生活Logo" />
                    <h1 class="optservice">請選擇服務</h1>
                </div>
                <section class="width1028">
                    <section class="green_web_border">
                        {/* <!-- 我要查看綠生活平台 --> */}
                        <a class="green_web" href={`${SSL}//${domain}`} title="我要查看綠生活平台">
                            <img src="images/advancingPage/u35.png" alt="" />
                            <h2 class=" green3">
                                我要查看
                                <span class="green_web2">綠生活平台</span>
                            </h2>
                        </a>
                        {/* <!-- 我要查看綠生活平台 --> */}
                        {/* <!-- 我要挑戰綠生活任務 --> */}
                        <a class="green_web" href={`${SSL}//${domain}/login`} title="我要挑戰綠生活任務">
                            <img src="images/advancingPage/u5.png" alt="" />
                            <h2 class=" green3">
                                我要挑戰
                                <span class="green_web2">綠生活任務</span>
                            </h2>
                            <p class="account">個人帳號</p>
                        </a>
                        {/* <!-- 我要挑戰綠生活任務 --> */}
                        {/* <!-- 響應綠色辦公 --> */}
                        <a class="green_web" href={`${SSL}//${domain}/login`} title="我要響應綠色辦公" >
                            <img src="images/advancingPage/u11.png" alt="" />
                            <h2 class=" green3">
                                我要<span class="green_web2">響應綠色辦公</span>
                            </h2>
                            <span class="account">組織帳號</span>
                        </a>
                        {/* <!-- 響應綠色辦公 --> */}
                    </section>
                    <section class="green_web_border">
                        {/* <!-- 機關綠色採購 --> */}
                        <div class=" green_web3">
                            <div class="icon blue">
                                <img src="images/advancingPage/u21.jpg" alt="" /><span>機關綠色採購</span>
                            </div>
                            <hr class="Spin" />
                            <a class="green_web4" href={`${SSL}//${domain}/greenPurChase`} title="檢視資訊"> 檢視資訊</a>
                            <hr class="Spin" />
                            <a class="green_web4" href={`${greenlivingDomain}/GreenLife/Anonymous/LoginById.aspx`} title="登入申報"> 登入申報</a>
                        </div>
                        {/* <!-- 機關綠色採購 --> */}

                        {/* <!-- 民間綠色採購 --> */}
                        <div class=" green_web3">
                            <div class="icon green">
                                <img src="images/advancingPage/u20.svg" alt="" /><span>民間綠色採購</span>
                            </div>
                            <hr class="Spin" />
                            <a class="green_web4" href={`${SSL}//${domain}/greenPurChase`} title="檢視資訊"> 檢視資訊</a>
                            <hr class="Spin" />
                            <a class="green_web4" href={`${greenlivingDomain}/GreenLife/PurChaseRpt/Login.aspx`} title="登入申報"> 登入申報</a>
                        </div>
                        {/* <!-- 民間綠色採購 --> */}


                        {/* <!-- 環保標章 --> */}
                        <div class=" green_web3">
                            <div class="icon green2">
                                <img src="images/advancingPage/u19.svg" alt="" /><span>環保標章</span>
                            </div>
                            <hr class="Spin" />
                            <a class="green_web4" href={`${SSL}//${domain}/greenLabel`} title="查詢標章"> 查詢標章</a>
                            <hr class="Spin" />
                            <a class="green_web4" href={`${greenlivingDomain}/GreenLife/Anonymous/LoginById.aspx`} title="登入申請"> 登入申請</a>
                        </div>
                        {/* <!-- 環保標章 --> */}
                    </section>
                </section>
            </section>

            <Footer />
        </>

    )
}


export default AdvancingPage

