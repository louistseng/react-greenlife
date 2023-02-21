import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
import '../../src/GreenOffice/greenOffice.scss';
import '../../src/EnglishVersion.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import { clickRecord } from '../utils/API';
import htmlParse from 'html-react-parser';
import Icon17 from '../images1/flip/office/slideIcon/icon_01-01.png';
import Icon18 from '../images1/flip/office/slideIcon/icon_02-01.png';
import Icon19 from '../images1/flip/office/slideIcon/icon_03-01.png';
import Icon20 from '../images1/flip/office/slideIcon/icon_04-01.png';
import Icon21 from '../images1/flip/office/slideIcon/icon_05-01.png';
import Icon22 from '../images1/flip/office/slideIcon/icon_06-01.png';
import Icon23 from '../images1/flip/office/slideIcon/icon_07-01.png';
import Icon24 from '../images1/flip/office/slideIcon/icon_08-01.png';
import Icon25 from '../images1/flip/office/slideIcon/icon_09-01.png';
import Icon26 from '../images1/flip/office/slideIcon/icon_10-01.png';
import Icon27 from '../images1/flip/office/slideIcon/icon_11-01.png';
import Icon28 from '../images1/flip/office/slideIcon/icon_12-01.png';
import Icon29 from '../images1/flip/office/slideIcon/icon_13-01.png';
import Icon30 from '../images1/flip/office/slideIcon/icon_14-01.png';
import Icon31 from '../images1/flip/office/slideIcon/icon_15-01.png';
import Icon32 from '../images1/flip/office/slideIcon/icon_16-01.png';
import Icon33 from '../images1/flip/office/slideIcon/綠色辦公1-多搭大眾運輸5.png';
import Icon34 from '../images1/flip/office/slideIcon/綠色辦公2-開車選擇共乘6.png';
import Icon35 from '../images1/flip/office/slideIcon/綠色辦公14-飲水機定時器13.png';
import Icon36 from '../images1/flip/office/slideIcon/綠色辦公15-定期維護設備2.png';
import Icon37 from '../images1/flip/office/slideIcon/綠色辦公17-提升隔熱設計4.png';
import Icon38 from '../images1/flip/office/slideIcon/綠色辦公20-使用雨水撲滿1314.png';
import energyImg from '../images1/greenOffice/main/fivepoint/energy.png';
import environmentImg from '../images1/greenOffice/main/fivepoint/env.png';
import promoteImg from '../images1/greenOffice/main/fivepoint/promote.png';
import reduceImg from '../images1/greenOffice/main/fivepoint/reduce.png';
import shopImg from '../images1/greenOffice/main/fivepoint/shop.png';
import earth5Img from '../images1/greenOffice/earth.png';
import reduce5Img from '../images1/greenOffice/reduce.png';
import greenShop5Img from '../images1/greenOffice/greenShop.png';
import leef5Img from '../images1/greenOffice/leef.png';
import promote5Img from '../images1/greenOffice/promote.png';
import officeIcon1 from '../images1/flip/office/government.png';
import officeIcon2 from '../images1/flip/office/school.png';
import officeIcon3 from '../images1/flip/office/company.png';
import officeIcon4 from '../images1/flip/office/officePic2.png';

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));
const Impact = React.lazy(() => import('../Components/EnglishVersion/Impact'));
const TaiwanPartnerMap = React.lazy(() => import('../Components/EnglishVersion/TaiwanPartnerMap'));

function EnglishFlipOffice(props) {
    let history = useHistory()
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    const collector = sessionStorage.getItem("userGuid") || "";
    var serialize = require('serialize-javascript');
    const [gov, setGov] = useState(0);
    const [school, setSchool] = useState(0);
    const [company, setCompany] = useState(0);
    const [group, setGroup] = useState(0);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const [themeId] = useState("10");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    useEffect(() => {

        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/ComplexSearch`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "CityId": "",
                "Count": "30",
                "IdentityTypeIds": "2",
                "Month": "0",
                "Name": "",
                "Page": "1",
                "SortType": "10",
                "Year": "0"
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setGov(result.resultObject.totalCount)
            })
            .catch(error => console.log('error', error));

        // 企業
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/ComplexSearch`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "CityId": "",
                "Count": "30",
                "IdentityTypeIds": "3",
                "Month": "0",
                "Name": "",
                "Page": "1",
                "SortType": "10",
                "Year": "0"
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setCompany(result.resultObject.totalCount)
            })
            .catch(error => console.log('error', error));

        // 學校
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/ComplexSearch`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "CityId": "",
                "Count": "30",
                "IdentityTypeIds": "4,5",
                "Month": "0",
                "Name": "",
                "Page": "1",
                "SortType": "10",
                "Year": "0"
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setSchool(result.resultObject.totalCount)
            })
            .catch(error => console.log('error', error));
        // //團體
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/ComplexSearch`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "CityId": "",
                "Count": "30",
                "IdentityTypeIds": "6",
                "Month": "0",
                "Name": "",
                "Page": "1",
                "SortType": "10",
                "Year": "0"
            }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setGroup(result.resultObject.totalCount)
            })
            .catch(error => console.log('error', error));
    }, []);

    const impact = [
        { img: officeIcon1, title: `${gov}`, subTitle: "Government Agencies", desc: "", color: "#3FB8BA" },
        { img: officeIcon2, title: `${school}`, subTitle: "Schools", desc: "", color: "#3FB8BA" },
        { img: officeIcon3, title: `${company}`, subTitle: "Enterprises", desc: "", color: "#3FB8BA" },
        { img: officeIcon4, title: `${group}`, subTitle: "Organizations", desc: "", color: "#3FB8BA" },
    ]

    //主副標題&小撇步
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${props.SSL}//${props.domain}/api/api/GreenLife/Page/Understand`, {
            method: 'POST',
            body: serialize({
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });
    }, [props.SSL, props.domain, serialize, themeId]);

    //點閱計數API
    useEffect(() => {
        clickRecord("24CD53BA-E8A3-4D78-9A96-D452B42A024D", "4", collector)
    }, [collector]);


    return (
        <>
            <EnglishBreadcrumb />
            <AddPoint roleId="1" targetGuid="24CD53BA-E8A3-4D78-9A96-D452B42A024D" roleItemId="13" autoAdd={true} />
            <img alt="Green Office-Banner" title="Green Office-Banner" className="w-100" src="../../../images/flip/office/topBannerEN.jpg" />
            <div className="container containerBox flip-office">
                <div className="d-flex top-logo justify-content-start en-office">
                    {/* <img src="images/flip/office/officeLogo.png" /> */}
                    <div className="flip-etitle">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                        data-aos-easing="ease-in-out" data-aos-anchor-placement="top-center">
                        <p><span className="boldText title-font tour-sub-title">What is Green Office</span></p>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-top" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/office/officePic.svg" alt="綠色辦公" title="綠色辦公" />
                        </div>
                    </div>

                    {/* 介紹影片(中期規劃) */}
                    {/* <div className="video-slider mb-5">
                        <div className='col-lg-12 mt-5'>
                            <h3>Green Office Introduction Video (Mid-Term Planning)</h3>
                             <iframe width="560" height="315" src="https://www.youtube.com/embed/Kp5HKQnOn0o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div> */}

                    <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                        data-aos-easing="ease-in-out" data-aos-anchor-placement="top-center" className="content-section">
                        <h3 className="title-with-line">How Can you Choose</h3>
                        <div className="en-envRes5PointContent">
                            <div className="en-innerContent">
                                <div className="front-card">
                                    <img className="bg-img" src={energyImg} alt="Saving energy and resources" />
                                    <div className="colored-detail energy">
                                        <p>01 Saving energy and resources</p>
                                        <div className="img-wrapper"><img src={earth5Img} alt="Saving energy and resources" /></div>
                                    </div>
                                </div>
                                {/* <div className="back-card energy">
                                    <div className="back-card-inner">
                                        <h5>指標1  Saving energy and resources</h5>
                                        <div className="inner-list">
                                            <div>
                                                <p>節約用電</p>
                                                <p>節約用水</p>
                                                <p>節約用油</p>
                                                <p>節約用紙</p>
                                                <p>視訊會議</p>
                                            </div>
                                        </div>
                                        <div className="data-wrapper">
                                        </div>
                                        <div className="info-btn">Detail</div>

                                    </div>
                                </div> */}
                            </div>
                            <div className="en-innerContent">
                                <div className="front-card">
                                    <img className="bg-img" src={reduceImg} alt="Reduction at the source" />
                                    <div className="colored-detail reduce">
                                        <p>02 Reduction at the source</p>
                                        <div className="img-wrapper"><img src={reduce5Img} alt="Reduction at the source" /></div>
                                    </div>
                                </div>
                                <div className="back-card reduce">
                                    {/* <div className="back-card-inner">
                                        <h5>指標2  Reduction at the source</h5>
                                        <div className="inner-list">
                                            <div>
                                                <p>減塑減廢</p>
                                                <p>垃圾分類</p>
                                                <p>回收再利用</p>

                                            </div>
                                        </div>
                                        <div className="data-wrapper">
                                        </div>
                                        <div className="info-btn">Detail</div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="en-innerContent">
                                <div className="front-card">
                                    <img className="bg-img" src={shopImg} alt="Green procurement" />
                                    <div className="colored-detail shop">
                                        <p>03 Green procurement</p>
                                        <div className="img-wrapper"><img src={greenShop5Img} alt="Green procurement" /></div>
                                    </div>
                                </div>
                                {/* <div className="back-card shop">
                                    <div className="back-card-inner">
                                        <h5>指標3  Green procurement</h5>
                                        <div className="inner-list">
                                            <div>
                                                <p>用品採購</p>
                                                <p>綠色場域</p>
                                            </div>
                                        </div>
                                        <div className="data-wrapper">
                                        </div>
                                        <div className="info-btn">Detail</div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="en-innerContent half">
                                <div className="front-card">
                                    <img className="bg-img" src={environmentImg} alt="Environmental greening" />
                                    <div className="colored-detail environment">
                                        <p>04 Environmental greening</p>
                                        <div className="img-wrapper"><img src={leef5Img} alt="Environmental greening" /></div>
                                    </div>
                                </div>
                                {/* <div className="back-card environment">
                                    <div className="back-card-inner">
                                        <h5>指標4  Environmental greening</h5>
                                        <div className="inner-list">
                                            <div>
                                                <p>綠化植栽</p>
                                                <p>維護環境</p>
                                                <p>安全管理</p>
                                            </div>
                                        </div>
                                        <div className="data-wrapper">
                                        </div>
                                        <div className="info-btn">Detail</div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="en-innerContent half">
                                <div className="front-card">
                                    <img className="bg-img" src={promoteImg} alt="Promotion and initiatives" />
                                    <div className="colored-detail promote">
                                        <p>05 Promotion and initiatives</p>
                                        <div className="img-wrapper"><img src={promote5Img} alt="Promotion and initiatives" /></div>
                                    </div>
                                </div>
                                {/* <div className="back-card promote">
                                    <div className="back-card-inner">
                                        <h5>指標5  Promotion and initiatives</h5>
                                        <div className="inner-list">
                                            <div>
                                                <p>教育宣導</p>
                                                <p>環保行動</p>
                                                <p>其他</p>
                                            </div>
                                        </div>
                                        <div className="data-wrapper">
                                        </div>
                                        <div className="info-btn">Detail</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="80" data-aos-duration="1200"
                        data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom" className="content-section">
                        <h3 className="title-with-line">What Can You Do</h3>
                        <div className="tips-list-tour row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon17} /><li>Adopt video conferencing</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon18} /><li>Paperless office</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon19} /><li>Double-sided printing</li></div></div>

                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon20} /><li>Green product procurement</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon21} /><li>Green walls and green roofs</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon22} /><li>Grow indoor plants</li></div></div>

                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon23} /><li>Bring your own lunch box</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon24} /><li>Reduce food and beverage deliveries</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon25} /><li>Save water and electricity</li></div></div>

                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon26} /><li>Reduce screen brightness</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon27} /><li>Use energy-saving mode</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon28} /><li>Maintain an indoor temperature of 26°C</li></div></div>

                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon29} /><li>Use the elevator less</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon30} /><li>Install water-saving faucets</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon31} /><li>Reduce the use of company cars</li></div></div>

                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon33} /><li>Use public transportation</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon34} /><li>Carpool</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon35} /><li>Install socket timers for water dispensers</li></div></div>

                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon36} /><li>Regular equipment maintenance</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon37} /><li>Improve insulation design</li></div></div>
                                <div className="outter-ewrapper-office"><div className="link-wrapper"><img alt="" src={Icon38} /><li>Use a rainwater harvesting system</li></div></div>
                            </DownloadCarouselFlip>
                        </div>
                    </div>
                </div>
            </div>
            <Impact impact={impact} />
            <TaiwanPartnerMap theme={'Office'} />
            {/* <SideBtn history={history} /> */}
            {/* <EnglishFooter /> */}
            <Footer />
        </>
    );
}

export default withRouter(EnglishFlipOffice);
