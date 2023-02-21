import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utils/Functions';
import { clickRecord } from '../utils/API';
import resBanner from '../images1/restaurant/gt_bg1.jpg';
import SideBtnOffice from '../Components/SideBtnOffice';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));


function GreenTour(props) {
    let history = useHistory()
    let SSL = props.SSL;
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    // let resFormal = window.location.hostname === "localhost" ? 'greenliving.eri.com.tw' : window.location.hostname === "greenlife.eri.com.tw" ? "greenliving.eri.com.tw" : 'greenliving.epa.gov.tw';

    // let resFormal = "https://greenliving.epa.gov.tw";
    // let resTest = "https://greenliving.eri.com.tw";

    let resFormal = "";
    switch (window.location.hostname) {
        case "localhost":
        case "greenlife.eri.com.tw":
            resFormal = 'greenliving.eri.com.tw';
            break;
        case "greenlife.epa.gov.tw":
            resFormal = 'greenliving.epa.gov.tw';
            break;
    }

    var serialize = require('serialize-javascript');

    const count = "20";
    const themeId = "2";
    const page = "1";

    const [download, setDownload] = useState([]);
    const [loading, setLoading] = useState(true);

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("8A31A2B3-CD47-4C4A-9923-C6A22C9A67CF", "6", collector)
    }, [collector]);

    //fetch下載專區
    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/GreenLife/File/List`, {
            method: 'POST',
            body: serialize({
                Page: page,
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
                setLoading(false)
                setDownload(result.resultObject.files)
            });

    }, [SSL, domain, serialize, themeId, page]);

    download.forEach(d => {
        switch (d.title) {
            case "110年綠色餐廳DM-民眾介紹文宣":
                d.title = "110年綠色餐廳DM-民眾介紹文宣【pdf】";
                break;
            case "110年綠色餐廳DM-店家加入流程":
                d.title = "110年綠色餐廳DM-店家加入流程【pdf】";
                break;
            case "「綠色餐廳」自我檢核表下載":
                d.title = "「綠色餐廳」自我檢核表下載【odt】";
                break;
            case "「綠色餐廳」制度下載":
                d.title = "「綠色餐廳」制度下載【pdf】";
                break;
        }
    })



    return (
        <>
            <BreadCrumb currentPage={"綠色餐廳介紹"} />
            <div className="download">
                <div className={`restaurant bigbanner mb-3`}>
                    <img className="relative" src={resBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/resIntro`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色餐廳介紹圖示"></i>
                                &nbsp;綠色餐廳介紹
                            </button>
                        </Link>
                        <Link to={`/categories/restaurant`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="綠色餐廳查詢圖示"></i>
                                &nbsp;綠色餐廳查詢
                            </button>
                        </Link>
                        <a className="btn-link" target="_blank" rel="noopener noreferrer" title="加入綠色餐廳鏈結(在新視窗開啟鏈結)" href={`${SSL}//${resFormal}/GreenLife/GreenRestaurantNew/GreenPlanformRestaurant.aspx?m=New`} onClick={() => clickRecord("E54B7ABD-B570-4AAA-9ACD-3C6201A82F8C", "6", collector)}>
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入綠色餐廳圖示"></i>
                                &nbsp;加入綠色餐廳
                            </button>
                        </a>
                        <Link to={`/categories/resDownload`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色餐廳介紹"} search={"綠色餐廳查詢"} category={"restaurant"} introLink={'resIntro'} download={"resDownload"} /> */}
                <div className="container download-content">

                    <h1><i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>下載專區</h1>
                    {loading
                        ?
                        <Loader loading={loading} />
                        :
                        download.map((download, index) =>
                            <a onClick={() => clickRecord(download.guid, "6-2", collector)} key={index} href={download.href} target="_blank" rel="noopener noreferrer" title="下載鏈結(在新視窗開啟鏈結)" download={download.title}>
                                <Card className="download-card">
                                    <h2 className="d-flex justify-content-start">
                                        <i className="fas fa-download" aria-hidden="true" alt="圖示"></i>&emsp;
                                        <div>
                                            <div className="download-title">
                                                <p className="download-time">{formatDate(download.createTime)}</p>
                                                {download.title}
                                            </div>
                                            {/* <p>{download.desc}</p> */}
                                        </div>
                                    </h2>

                                </Card>
                            </a>
                        )
                    }
                </div>
                {/* <SideBtn history={history} /> */}
                <SideBtnOffice history={useHistory()} type={"綠色餐廳"} />
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenTour);