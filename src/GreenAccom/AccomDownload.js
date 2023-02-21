import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';

import { withRouter, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utils/Functions';
import { clickRecord } from '../utils/API';

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
    const themeId = "3";
    const [page, setPage] = useState("1");

    const [download, setDownload] = useState([]);
    const [loading, setLoading] = useState(true);

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("F6294D3C-EEC8-45ED-910B-7F8D3680DEA4", "8", collector)
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

    }, [SSL, domain]);

    download.forEach(d => {
        if (d.title === "環保旅店業者資料表") {
            d.title = "環保旅店業者資料表【odt】"
        }
    })




    return (
        <>
            <BreadCrumb currentPage={"環保旅宿下載"} />
            <div className="download">
                <TourBanner intro={"近期開放"} search={"環保旅宿查詢"} category={"accommodation"} introLink={'accomIntro'} download={"accomDownload"} join={"join"} />
                <div class="container download-content">

                    <h1><i class="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>下載專區</h1>
                    {loading
                        ?
                        <Loader loading={loading} />
                        :
                        download.map((download, index) =>
                            <a onClick={() => clickRecord(download.guid, "8-2", collector)} target="_blank" rel="noopener noreferrer" href={download.href} download={download.title} title={`${download.title}(在新視窗開啟鏈結)`}>
                                <Card key={index} className="download-card">
                                    <h2 className="d-flex justify-content-start">
                                        <i class="fas fa-download" aria-hidden="true" alt={`${download.title}圖示`}></i>&emsp;
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
                <SideBtnOffice history={useHistory()} type={"環保旅店"} />
                {/* <SideBtn history={history} /> */}
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenTour);