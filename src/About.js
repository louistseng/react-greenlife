import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './greenliving0914.scss';
import './Components/css/Footer.css';
import { clickRecord } from './utils/API';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import $ from 'jquery';
import insData from "./media/ins-newmy.json";

import leef from './images1/blankLeef.png';

import shopImg from './images1/grid-shopping-new.png';
import homeImg from './images1/grid-home-new.png';
import foodImg from './images1/grid-food-new.png';
import powerImg from './images1/grid-power-new.png';
import tourImg from './images1/grid-tour-new.png';
import officeImg from './images1/grid-office-new.png';

import searchIcon1 from './images1/about/icon-001.png';
import searchIcon2 from './images1/about/icon-002.png';
import searchIcon3 from './images1/about/icon-003.png';
import searchIcon4 from './images1/about/icon-004.png';
import searchIcon5 from './images1/about/icon-005.png';
import searchIcon6 from './images1/about/icon-006.png';
import searchIcon7 from './images1/about/icon-007.png';
import searchIcon8 from './images1/about/icon-008.png';
import searchIcon9 from './images1/about/icon-009.png';
import searchIcon10 from './images1/about/icon-010.png';

import ins_1 from './images1/about/ins-0107/0107-1.jpg';
import ins_2 from './images1/about/ins-0107/0107-2.jpg';
import ins_3 from './images1/about/ins-0107/0107-3.jpg';
import ins_4 from './images1/about/ins-0107/0107-4.jpg';
import ins_5 from './images1/about/ins-0107/0107-5.jpg';
import ins_6 from './images1/about/ins-0107/0107-6.jpg';
import ins_7 from './images1/about/ins-0107/0107-7.jpg';
import ins_8 from './images1/about/ins-0107/0107-8.jpg';
import ins_9 from './images1/about/ins-0107/0107-9.jpg';
import ins_10 from './images1/about/ins-0107/0107-10.jpg';
import ins_11 from './images1/about/ins-0107/0107-11.jpg';
import ins_12 from './images1/about/ins-0107/0107-12.jpg';
import ins_13 from './images1/about/ins-0107/0107-13.jpg';
import ins_14 from './images1/about/ins-0107/0107-14.jpg';
import ins_15 from './images1/about/ins-0107/0107-15.jpg';


const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const Footer = React.lazy(() => import('./Components/Footer'));
const Slider = React.lazy(() => import('./Components/Slider'));

function About({ history }) {

    const collector = sessionStorage.getItem("userGuid") || "";

    //instagram-config
    var settings = {
        hashtag: '全民綠生活',
        get: '',
        limit: 40,
        links: true,
        squareImages: true,
        template: ''
    };

    let igImages = [ins_1, ins_2, ins_3, ins_4, ins_5, ins_6, ins_7, ins_8, ins_9, ins_10, ins_11, ins_12, ins_13, ins_14, ins_15]

    function fetchIG() {
        var nodes = [];
        nodes = insData.myContent;

        for (var i = 0; i < nodes.length; i++) {
            let post = nodes[i]

            const image = $(`<img/>`);
            var imageUrl = '';
            var linkUrl = post.href;

            imageUrl = igImages[i]

            image.attr('class', "lazy-load");
            //一開始載入統一預設圖片
            image.attr('src', leef);
            //alt
            image.attr('alt', "ig圖片");
            //另開視窗
            //存放實際圖片
            image.attr('data-src', imageUrl);

            if (settings.links) {
                const link = $('<a/>', {
                    href: linkUrl,
                    target: '_blank',
                    title: '另開視窗'
                }).append(image);
                var newclick = () => clickRecord("FE077CEB-791F-4EC0-85A0-58EDDEED496F", "3", collector)
                const item = $('<div class="ig-item ig-item' + i + '" />').append(link).attr('onclick', '').click(newclick);;
                $("#ig-wrapper").append(item);
                $(".ig-item" + i).slideUp(10).delay(50 * i).fadeIn(300);
            }
        }
    }

    useEffect(() => {

        //點閱計數API
        clickRecord("64C20608-69DE-43CD-ABD5-0728E1639EA3", "1", collector)
        //fetch ig照片牆
        fetchIG()
        //定義lazy-loading觀察範圍
        let options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        }

        //觀察到目標物時-把src(統一預設圖片)替換成data-src(實際圖片)
        const lazyLoadImages = (entries, observer) => {
            entries.map(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-src');
                }
                return null
            })
        }

        //建立IntersectionObserver, 觀察className=lazy-load的元素
        let observer = new IntersectionObserver(lazyLoadImages, options);
        let observTargets = document.querySelectorAll('.lazy-load');
        observTargets.forEach(target => observer.observe(target))

        //螢幕縮放比例超過100後，敘述文字靠左
        const radio = window.devicePixelRatio;
        if (radio > 1) {
            // console.log("頁面比例大於100，請點 ctrl + 0 恢復")
            const note = document.querySelector(".greenlife-note")
            note.style.textAlign = "left";
        }
    });

    //進入頁面捲動到了解綠生活的位置
    // const intro = () => {
    //     if (window.location.href = "/about#news") {
    //         history.push('/about#news')
    //         window.scrollTo(0, 0)

    //     }
    //     if (window.location.href = "/about#intro") {
    //         window.scrollTo(0, 500)
    //         history.push('/about#intro')
    //     }
    // }

    // useEffect(() => {
    //     intro()
    // }, [])


    //連結了解綠生活頁-延遲0.4秒(讓動畫跑完)
    const delayRedirect = (route) => {
        setTimeout(
            () => history.push(`/about/intro/${route}`), 400
        )
    }


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>全民綠生活資訊平台-關於綠生活</title>
                    <meta name="description" content="行政院環境保護署-全民綠生活資訊平台首頁，「綠生活」是一種親環境的生活方式，從食、衣、住、行、育、樂、購等生活小細節做起，來愛護我們的家園。" />
                </Helmet>
                <BreadCrumb />
                {/* cloudflare worker測試 */}
                {/* <img src="https://worker.insworker.workers.dev/https://instagram.ftpe7-4.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/c180.0.1080.1080a/s640x640/210925167_426572318320013_948358556871530413_n.jpg?tp=1&_nc_ht=instagram.ftpe7-4.fna.fbcdn.net&_nc_cat=105&_nc_ohc=Zx7PbZJtbwIAX_sLt4U&edm=ABZsPhsBAAAA&ccb=7-4&oh=cc8a12a582d74392094647ff6c4412e8&oe=60ED3ED7&_nc_sid=4efc9f" /> */}
                <div>
                    {/* <div id="target"> */}
                    <div className="myContent">
                        <div id="news" name="news"></div>
                        {/* 照片輪播 */}
                        <Slider />
                        <div className='wrap first'>
                            <div className="white-bg">
                                <div className="">
                                    <h1 className='d-flex align-items-center'>了解綠生活</h1>
                                    <div className="greenlife-note p-2">
                                        <p>
                                            <span className='greenlifeDesc'>「淨零綠生活」是臺灣2050淨零轉型12項關鍵戰略之一，臺灣淨零轉型需從推動「淨零綠生活」開始，包括全民食、衣、住、行、育、樂、購的行為及消費模式改變，進而促使產業供給端的改變，降低溫室氣體排放。</span>
                                            <span className='greenlifeDesc'>環保署自109年起為提升綠生活理念並養成民眾綠生活行為與習慣，積極推動「全民綠生活」運動，並以「全民綠生活資訊平台」，向全民推廣如何一起響應、力行綠生活。「愛地球不只是一種生活風格，也是一項很潮的生活態度」，「<span>綠生活</span>」是一種友善環境的生活方式，從食、衣、住、行、育、樂、購等生活小細節，結合全國機關、學校、企業、民間團體、社區及民眾一同動起來，改變小小的生活習慣，創造大大的綠生活未來。</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="restPage" id="restPage">
                            <div className="secondPage" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                                data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
                                <span id="intro" name="intro"></span>
                                <div className="wrap second">

                                    <div data-aos="zoom-in" data-aos-duration="500" className="tour-img grid-wrapper" onClick={() => delayRedirect("flipTour")} onKeyPress={e => { if (e.which === 13) { delayRedirect("flipTour") } }} tabIndex={0}>
                                        <div className="inner">
                                            <div className="img-wrap">
                                                <img className="lazy-load" src="" data-src={tourImg} alt="綠色旅遊.png" title="玩得夠綠-綠色旅遊" />
                                                <div className="tour-mask">
                                                    <div className="grid-text-tour">
                                                        <h2>玩得夠綠</h2>
                                                        <h3>綠色旅遊</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div data-aos="zoom-in" data-aos-duration="500" className="energy-grid-wrapper grid-wrapper" onClick={() => delayRedirect("flipEnergy")}>
                                        <div className="energy-grid">
                                            <div className="grid-text-wrapper">
                                                <h1>能源夠綠</h1>
                                                <h5>綠色能源</h5>
                                            </div>
                                        </div>
                                        <div className="energy-img">
                                            <div className="img-wrap">
                                                <img className="lazy-load" src="" data-src={powerImg} alt="綠色能源.png" title="能源夠綠-綠色能源" />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div data-aos="zoom-in" data-aos-duration="500" className="shop-grid-wrapper grid-wrapper" onClick={() => delayRedirect("flipShopping")} onKeyPress={e => { if (e.which === 13) { delayRedirect("flipShopping") } }} tabIndex={0}>
                                        <div className="shop-grid">
                                            <div className="grid-text-wrapper">
                                                <h2>買得夠綠</h2>
                                                <h3>綠色消費</h3>
                                            </div>
                                        </div>
                                        <div className="shop-img">
                                            <div className="img-wrap">
                                                <img className="lazy-load" src="" data-src={shopImg} alt="綠色消費.png" title="買得夠綠-綠色消費" />
                                            </div>
                                        </div>
                                    </div>

                                    <div data-aos="zoom-in" data-aos-duration="500" className="home-grid-wrapper grid-wrapper" onClick={() => delayRedirect("flipHome")} onKeyPress={e => { if (e.which === 13) { delayRedirect("flipHome") } }} tabIndex={0}>
                                        <div className="home-grid">
                                            <div className="grid-text-wrapper">
                                                <h2>宅得夠綠</h2>
                                                <h3>綠色居家</h3>
                                            </div>
                                        </div>
                                        <div className="home-img">
                                            <div className="img-wrap">
                                                <img className="lazy-load" src="" data-src={homeImg} alt="綠色居家.png" title="宅得夠綠-綠色居家" />
                                            </div>
                                        </div>
                                    </div>


                                    <div data-aos="zoom-in" data-aos-duration="500" className="food-img grid-wrapper" onClick={() => delayRedirect("flipFood")} onKeyPress={e => { if (e.which === 13) { delayRedirect("flipFood") } }} tabIndex={0}>
                                        <div className="img-wrap">
                                            <img className="lazy-load" src="" data-src={foodImg} alt="綠色飲食.png" title="吃得夠綠-綠色飲食" />
                                            <div className="food-mask">
                                                <div className="food-text">
                                                    <h2>吃得夠綠</h2>
                                                    <h3>綠色飲食</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div data-aos="zoom-in" data-aos-duration="500" className="office-img grid-wrapper" onClick={() => delayRedirect("flipOffice")} onKeyPress={e => { if (e.which === 13) { delayRedirect("flipOffice") } }} tabIndex={0}>
                                        <img className="lazy-load" src="" data-src={officeImg} alt="綠色辦公.png" title="辦公夠綠-綠色辦公" />

                                        <div className="office-mask">
                                            <div className="office-text">
                                                <h2>辦公夠綠</h2>
                                                <h3>綠色辦公</h3>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                                data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
                                <span id="anchor3"></span>
                                <div className="wrap d-flex third">
                                    <div id="u65" className="third-text d-flex justify-content-center">

                                        <div> <img alt="instagram" title="instagram" src="images/關於綠生活/u62.png"></img></div>
                                        <p><span>IG hashtag同步照片牆&nbsp; #全民綠生活</span></p>
                                    </div>
                                    <div className="ins-wall">
                                        <div id="ig-wrapper"></div>
                                    </div>
                                </div>
                            </div>



                            <div className="relative" data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                                data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
                                <span id="anchor4"></span>
                                <div className="page4 ab-search active">
                                    <img alt="綠生活常用查詢-背景" title="綠生活常用查詢-背景" className="bg-img" src="images/greenlifeSearch3.0.jpg" />
                                    <div className="icons-wrapper">
                                        <div className="green-bar">
                                            <h3>綠生活常用查詢</h3>
                                            <h4>Green Life Search</h4>
                                        </div>
                                        <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon"><a href="https://www.greenpoint.org.tw/GPHome/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon1} alt="環保集點圖示" /><h5>環保集點</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon"><a href="https://greenbuy.epa.gov.tw/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon2} alt="環保產品線上採購網" /><h5>環保產品線上採購網</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon"><a href="https://www.circuplus.org/water-refill-map/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon3} alt="奉茶圖示" /><h5>奉茶</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon"><a href="https://ecolife.epa.gov.tw/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon4} alt="清淨家園顧厝邊圖示" /><h5>清淨家園顧厝邊</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="500" className="single-icon"><a href="https://ienv.epa.gov.tw/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon5} alt="愛環境資訊網圖示" /><h5>愛環境資訊網</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon"><a href="https://eeis.epa.gov.tw/front/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon6} alt="環境教育資訊系統圖示" /><h5>環境教育資訊系統</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon"><a href="https://lcss.epa.gov.tw/default.aspx" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon7} alt="低碳永續家園圖示" /><h5>低碳永續家園</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon"><a href="https://cfp-calculate.tw/cfpc/WebPage/LoginPage.aspx" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon8} alt="碳足跡計算圖示" /><h5>碳足跡計算</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon"><a href="https://ecolife2.epa.gov.tw/coastal/" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon9} alt="海岸淨灘認養系統圖示" /><h5>海岸淨灘認養系統</h5></a></div>
                                        <div data-aos="zoom-in-up" data-aos-duration="900" className="single-icon"><a href="https://hwms.epa.gov.tw/dispPageBox/onceOff/onceOffHp.aspx?ddsPageID=EPATWH" title="另開視窗" target="_blank" rel="noreferrer noopener" onClick={() => clickRecord("1DDCD6F5-6E7D-4F66-AE2E-239D522FA7AB", "3", collector)}><img className="lazy-load" src="" data-src={searchIcon10} alt="一次用產品源頭減量宣導網圖示" /><h5>一次用產品源頭減量宣導網</h5></a></div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>

                    </div>

                </div>
            </HelmetProvider>
            {/* </div> */}
        </>
    );
}

export default withRouter(About);