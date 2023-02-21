import React, { useState, useEffect } from 'react';
import './FlipTour-old.scss';
import './FlipTour.scss';
import '../../src/EnglishVersion.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickRecord } from '../utils/API';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import htmlParse from 'html-react-parser';
import Card from 'react-bootstrap/Card';
import Icon0101 from '../images1/flip/shopping/icon-0101.png';
import Icon0102 from '../images1/flip/shopping/icon-0102.png';
import Icon0103 from '../images1/flip/shopping/icon-0103.png';
import Icon0104 from '../images1/flip/shopping/icon-0104.png';
import Icon0105 from '../images1/flip/shopping/icon-0105.png';
import Icon0106 from '../images1/flip/shopping/icon-0106.png';
import Icon0107 from '../images1/flip/shopping/icon-0107.png';
import Icon0108 from '../images1/flip/shopping/icon-0108.png';
import Icon0109 from '../images1/flip/shopping/icon-0109.png';
import Icon0110 from '../images1/flip/shopping/icon-0110.png';
import Icon0111 from '../images1/flip/shopping/icon-0111.png';
import Icon0112 from '../images1/flip/shopping/icon-0112.png';
import Icon0113 from '../images1/flip/shopping/icon-0113.png';
import Icon0114 from '../images1/flip/shopping/icon-0114.png';
import Icon0115 from '../images1/flip/shopping/icon-0115.png';
import shoppingIcon1 from '../images1/flip/shopping/shopping-icon-001.jpg';
import shoppingIcon2 from '../images1/flip/shopping/shopping-icon-002.jpg';
import shoppingIcon3 from '../images1/flip/shopping/shopping-icon-003.jpg';
import greenLogo1 from '../images1/greenLogo(70x70).png';
import government from '../images1/flip/shopping/government.png';
import company from '../images1/flip/shopping/company.png';

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));
const Impact = React.lazy(() => import('../Components/EnglishVersion/Impact'));

function EnglishFlipShopping(props) {
    let history = useHistory()
    let SSL = props.SSL;
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw';
    let domainFormal = window.location.host.includes("greenlife.eri.com.tw") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    const collector = sessionStorage.getItem("userGuid") || "";
    var serialize = require('serialize-javascript');
    const [shopCount, setShopCount] = useState(0);
    const [artData, setArtData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const count = "5";
    const themeId = "11";

    useEffect(() => {
        // 商店(全)
        fetch(`${SSL}//${domainFormal}/APIs/Stores?t=&cn=&k=&sc=C`)
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                setShopCount(result.RowsCount)
            });

    }, []);

    const impact = [
        { img: greenLogo1, title: `${shopCount}`, subTitle: "Green Mark Products", desc: "Recyclable, low-pollution, resource-saving products", color: "#f08080" },
        { img: government, title: "NT$10.7 billion in ", subTitle: "green procurement by government agencies", desc: "The annual amount of green products purchased by government agencies in 2021", color: "#f08080" },
        { img: company, title: "NT$52.3 billion in ", subTitle: "green procurement by private entities", desc: "The annual amount of green products purchased by private entities in 2021", color: "#f08080" },
    ]

    //最下面的資訊文章列表
    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/Knowledge/TopTheme`, {
            method: 'POST',
            body: serialize({
                Count: count,
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                setArtData(result.resultObject)
            });

    }, [SSL, domain, serialize, themeId, count]);

    //點閱計數API
    useEffect(() => {
        clickRecord("338D80E8-3076-4201-B7A2-E2BE40D8F012", "4", collector)
    }, [collector]);

    //主副標題&小撇步
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${SSL}//${domain}/api/api/GreenLife/Page/Understand`, {
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

                setContent(result.resultObject.content)
                setTipsData(result.resultObject)

            });

    }, [SSL, domain, serialize, themeId]);

    const delayRedirect = (route) => {
        setTimeout(
            () => history.push(`/${route}`), 400
        )
    }

    return (
        <>
            <EnglishBreadcrumb />
            <AddPoint roleId="1" targetGuid="338D80E8-3076-4201-B7A2-E2BE40D8F012" roleItemId="13" autoAdd={true} />
            <img alt="Green Consumption-Banner" title="Green Consumption-Banner" className="w-100" src="../../../images/flip/shopping/topBannerEN.jpg" />
            <div className="container containerBox">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/shopping/shoppingLogo.png" /> */}
                    <div className="flip-etitle">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <p><span className="boldText title-font tour-top-title">What is Green Consumption</span></p>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}
                            </div>
                            <img data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="bottom-bottom" className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/shopping/shoppingPic.svg" alt="Green Consumption" title="Green Consumption" />
                        </div>
                    </div>
                    {/* 介紹影片(中期規劃) */}
                    {/* <div className="video-slider mb-5">
                        <div className='col-lg-12 mt-5'>
                            <h3>Green Shopping Introduction Video (Mid-Term Planning)</h3>
                             <iframe width="560" height="315" src="https://www.youtube.com/embed/Kp5HKQnOn0o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div> */}

                    <div className="content-section">
                        <h3 className="shopping-title-with-line">How Can you Choose</h3>
                        <div className="d-flex justify-content-center row mt-4">
                            <div className="shopping-Choose col-sm-12 col-md-4 col-lg-4 mt-4">
                                <Card className="shopping-card">
                                    <div className="card-img">
                                        <Card.Img variant="top" src={shoppingIcon1} alt="shopping-icon" title="shopping-icon" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>Green Procurement</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className="shopping-hover-card">
                                    <Card.Body>
                                        <Card.Title>Green Procurement</Card.Title>
                                        <div className="card-content">
                                            <Card.Text> • Green-procurement-related systems and regulations</Card.Text>
                                            <Card.Text> • Green procurement e-declaration</Card.Text>
                                            <Card.Text> • Green procurement for private enterprises and organizations</Card.Text>
                                        </div>
                                        <div className="hover-card-btn">
                                            <Link to="/en_Procurement">Detail</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="shopping-Choose col-sm-12 col-md-4 col-lg-4 mt-4">
                                <Card className="shopping-card">
                                    <div className="card-img">
                                        <Card.Img variant="top" src={shoppingIcon2} alt="shopping-icon" title="shopping-icon" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>Environmental Protection Label</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className="shopping-hover-card">
                                    <Card.Body>
                                        <Card.Title>Environmental Protection Label</Card.Title>
                                        <div className="card-content">
                                            <Card.Text> • Green Mark</Card.Text>
                                            <Card.Text> • History of Promoting Green Mark in Taiwan</Card.Text>
                                            <Card.Text> • International Exchange and Cooperation</Card.Text>
                                            <Card.Text> • Specifications and Standards</Card.Text>
                                        </div>
                                        <div className="hover-card-btn">
                                            <Link to="/en_Mark">Detail</Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="shopping-Choose col-sm-12 col-md-4 col-lg-4 mt-4">
                                <Card className="shopping-card">
                                    <div className="card-img">
                                        <Card.Img variant="top" src={shoppingIcon3} alt="shopping-icon" title="shopping-icon" />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>Carbon Footprint Label</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className="shopping-hover-card">
                                    <Card.Body>
                                        <Card.Title>Carbon Footprint Label</Card.Title>
                                        <div className="card-content">
                                            <Card.Text> • Carbon Footprint Calculation Platform</Card.Text>
                                        </div>
                                        <div className="hover-card-btn">
                                            <a href="https://cfp-calculate.tw/eng/WebPage/LoginPage.aspx" title="Carbon Footprint Label" target="_blank">Detail</a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="綠色旅遊小撇步" title="綠色旅遊小撇步" /><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div> */}
                        <h3 className="shopping-title-with-line">What Can You Do</h3>
                        <div className="tips-list-shopping row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0101} /><li>Use fewer fossil fuels</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0102} /><li>Use uniform invoice apps</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0103} /><li>Use Green Points</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0104} /><li>Avoid impulsive shopping</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0105} /><li>Reuse items</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0106} /><li>Rent instead of buy</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0107} /><li>Use repair services</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0108} /><li>Cherish and care for things</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0109} /><li>Choose energy-saving equipment</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0110} /><li>Choose recycled products</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0111} /><li>Choose electric scooters</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0112} /><li>Choose minimum packaging</li></div></div>

                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0113} /><li>Buy green products</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0114} /><li>Bring your own bag when shopping</li></div></div>
                                <div className="outter-wrapper"><div className="link-wrapper-shopping"><img alt="" src={Icon0115} /><li>Buy clothes with sustainable fabrics</li></div></div>
                            </DownloadCarouselFlip>
                        </div>
                    </div>
                </div>
            </div>
            <Impact impact={impact} />
            {/* <SideBtn history={history} /> */}
            {/* <EnglishFooter /> */}
            <Footer />
        </>
    );
}

export default withRouter(EnglishFlipShopping);
