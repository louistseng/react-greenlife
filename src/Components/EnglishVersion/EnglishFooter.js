import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../GreenTour.scss';
import '../css/Footer.css'
import facebookIcon from '../../images1/footer/fb.svg';
import insIcon from '../../images1/footer/ig.svg';
import youtubeIcon from '../../images1/footer/youtube.svg';
import accessibility from '../../images1/footer/accessibility.png';

function EnglishFooter() {
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }
    var serialize = require('serialize-javascript');

    //紀錄瀏覽人次API
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/VisitRecord`, {
            method: 'POST',
            body: serialize({
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }, [SSL, domain, serialize]);

    //取得瀏覽人次API
    const [visitedCount, setVisitedCount] = useState([]);
    // https://cors-anywhere.herokuapp.com/
    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Common/VisitCount`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setVisitedCount(result.resultObject)
            });

    }, [SSL, domain]);

    //系統資訊API
    const [siteInfo, setSiteInfo] = useState([]);
    const [items, setItems] = useState([]);
    const type = "IndexEnglish";
    const code = "Footer";

    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Common/SystemInfo`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Type: type,
                Code: code
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.resultObject[0])
                    setItems(result.resultObject[0].item5.split('<br>'))
                if (result.isSucess) {
                    setSiteInfo(result.resultObject[0]);
                }
            });
    }, [SSL, domain, serialize]);

    return (
        <div className="site-footer">
            <div className="container-fluid">
                <div className="row footer-wrapper">
                    <div className="offset-lg-1 col-lg-8 col-md-12 col-sm-12">
                        <a className="skip-nav" href="#" title="上方導覽連結區" accessKey="z">:::</a>
                        {siteInfo &&
                            <>
                                <p className="footer-text-site">
                                    Copyright: Environmental Protection Agency, Executive Yuan
                                </p>
                                {/* 網站維護：{siteInfo.item2}<br /> */}
                                <p className="footer-text-site">No. 83, Section 1, Zhonghua Road, Zhongzheng District, Taipei City 100006</p>
                                <p className="footer-text-site">tel：{siteInfo.item4}</p>
                                {/*<div>
                                    <p>If you have any question <a href="/CallService" className="call-line" target="_blank" rel="noreferrer noopener">check here</a></p>
                                </div>
                                */}
                                <div className="service-mailbox">
                                    <Link className="link-with-border" to="/EmailService" title="Customer service mailbox link">Customer service Mailbox</Link>
                                    <a className="link-with-border" href={"https://epamail.epa.gov.tw/front/mailboxhome"} target="_blank" rel="noopener noreferrer" title={String(siteInfo.item10).split(",")[0] + "link"}>{String(siteInfo.item10).split(",")[0]}</a>
                                    <a className="link-with-border" href={"https://www.epa.gov.tw/eng/747CF571E0ACBE79"} target="_blank" rel="noopener noreferrer" title={String(siteInfo.item7).split(",")[0] + "link"}>{String(siteInfo.item7).split(",")[0]}</a><br />
                                </div>
                            </>
                        }
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12">
                        <div className="footer-icons-wrapper">
                            <div className="type-icons-wrapper">
                                <p className="footer-icons-label">Greenlife</p>
                                <a className="social-icons" title="Greenlife Facebook(New page)" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/greenlife123/?ref=nf"><img className="footer-social-icon" src={facebookIcon} alt="綠色生活facebook連結" aria-label="綠色生活facebook連結" /></a>
                            </div>
                            <div className="type-icons-wrapper">
                                <p className="footer-icons-label">EPA</p>
                                <a className="social-icons" title="EPA Facebook(New page)" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/MOENR.TW/"><img className="footer-social-icon" src={facebookIcon} alt="環保署facebook連結" aria-label="環保署facebook連結" /></a>
                                <a className="social-icons" title="EPA YouTube(New page)" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/TaiwanEpa"><img className="footer-social-icon" src={youtubeIcon} alt="環保署youtube連結" aria-label="環保署youtube連結" /></a>
                                <a className="social-icons" title="EPA Instagram(New page)" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/epa.tw/"><img className="footer-social-icon" src={insIcon} alt="環保署instagram連結" aria-label="環保署instagram連結" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="style-two" />
                {siteInfo &&
                    <div className="row">
                        <div className="offset-lg-1 col-lg-5 col-md-6 col-sm-12">{siteInfo.item8}
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="social">
                                <li>Last updated: {siteInfo.item9}</li>
                                <li>View count: {visitedCount}</li>
                                &nbsp;&nbsp;
                                <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20220908164911" title="無障礙網站">
                                    <img src={accessibility} border="0" width="88" height="31" alt="通過A無障礙網頁檢測" />
                                </a>
                            </ul>
                        </div>
                    </div>
                }
            </div>
            <br />
        </div>
    );
}

export default EnglishFooter;