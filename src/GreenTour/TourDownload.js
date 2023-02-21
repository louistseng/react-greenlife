import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
// import SideBtn from '../Components/SideBtn';
// import Footer from '../Components/Footer';
// import Loader from '../Components/Loader';
// import BreadCrumb from '../Components/BreadCrumb';
// import TourBanner from '../Components/TourBanner';
import { formatDate } from '../utils/Functions';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { clickRecord } from '../utils/API';
import tourBanner from '../images1/greenTour/gt_bg.jpg';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtnOffice = React.lazy(() => import('../Components/SideBtnOffice'));
// const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));


function GreenTour(props) {
    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'

    var serialize = require('serialize-javascript');
    const count = "20";
    const themeId = "1";
    const [page, setPage] = useState("1");

    const [download, setDownload] = useState([]);
    const [loading, setLoading] = useState(true);

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("592FC75C-1E89-488E-871D-13134C561D29", "7", collector)
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
                // console.log(result)
                setLoading(false)
                setDownload(result.resultObject.files)
            });
    }, [SSL, domain, serialize]);

    download.forEach(d => {
        if (d.title === "綠色旅遊文宣") {
            d.title = "綠色旅遊文宣【pdf】"
        }
    })



    return (
        <>
            <BreadCrumb currentPage={"綠色旅遊下載"} />
            <div className="download">
                <div className={`greenTour bigbanner mb-3`}>
                    <img className="relative" src={tourBanner} width="100%" height="100%" alt="Banner" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/tourIntro`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色旅遊介紹圖示"></i>
                                &nbsp;綠色旅遊介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=1`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="自由行查詢圖示"></i>
                                &nbsp;自由行查詢
                            </button>
                        </Link>
                        <Link to={`/categories/greenTour?type=2`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-search" aria-hidden="true" alt="團體旅遊查詢圖示"></i>
                                &nbsp;團體旅遊查詢
                            </button>
                        </Link>
                        <Link to={`/categories/tourDownload`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <TourBanner intro={"綠色旅遊介紹"} search={"行程查詢"} category={"greenTour"} color={'#218cb6'} introLink={"tourIntro"} download={"tourDownload"} /> */}
                <div className="container download-content">

                    <h1><i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>下載專區</h1>
                    {loading
                        ?
                        <Loader loading={loading} />
                        :
                        download.map((download, index) =>
                            <a onClick={() => clickRecord(download.guid, "7-3", collector)} key={index} target="_blank" rel="noopener noreferrer" title="(在新視窗開啟鏈結)" href={download.href} download={download.title}>
                                <Card className="download-card">
                                    <h2 className="d-flex justify-content-start">
                                        <i className="fas fa-download" aria-hidden="true" alt={`${download.title}圖示`}></i>&emsp;
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
                <SideBtnOffice history={history} type={"團體旅遊"} />
                {/* <SideBtn history={history} /> */}
            </div>
            <Footer />

        </>
    );
}

export default withRouter(GreenTour);