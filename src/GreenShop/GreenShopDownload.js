import React, { useState, useEffect } from 'react';
import '../GreenShop.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utils/Functions';
import { clickRecord } from '../utils/API';
import shopBanner from '../images1/greenShop/shop_banner.jpg';
import downloadData from './GreenShopDownload.json'
import pdf from '../../src/images1/download/PdfIcon.png'
import rar from '../../src/images1/download/rar.png';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));

function GreenShopDownload(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    var serialize = require('serialize-javascript');

    const count = "20";
    const themeId = "3";
    const [page, setPage] = useState("1");

    const [download, setDownload] = useState([]);
    const [loading, setLoading] = useState(false);

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("F6294D3C-EEC8-45ED-910B-7F8D3680DEA4", "8", collector)
    }, [collector]);

    //fetch下載專區
    /*useEffect(() => {
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

    }, [SSL, domain]);*/

    return (
        <>
            <BreadCrumb currentPage={"環保產品下載專區"} />
            <div className="download">
                {/*<TourBanner intro={"近期開放"} search={"環保旅宿查詢"} category={"accommodation"} introLink={'accomIntro'} download={"accomDownload"} />*/}
                <div className={`shop bigbanner mb-3`}>
                    <img className="relative" src={shopBanner} width="100%" height="100%" alt="環保產品下載專區" title="環保產品下載專區" />

                    <div className="Button-wrapper">
                        <Link to={`/categories/GreenShopIntro`} className="btn-link">
                            <button className="bannerButton bannerButton-line">
                                <i className="fas fa-binoculars" aria-hidden="true" alt="綠色商店介紹圖示"></i>
                                &nbsp;綠色商店介紹
                            </button>
                        </Link>
                        <Link to={`/categories/greenShopSearch`} className="btn-link">
                            <button className="bannerButton bannerButton-line ">
                                <i className="fas fa-map-marker-alt" aria-hidden="true" alt="綠色商店查詢圖示"></i>
                                &nbsp;綠色商店查詢
                            </button>
                        </Link>
                        <Link to={`/categories/GreenShopIntro/GreenShopApply`} className="btn-link">
                            <button className="bannerButton bannerButton-line soon-btn">
                                <i className="fas fa-sign-in-alt" aria-hidden="true" alt="加入綠色商店圖示"></i>
                                &nbsp;加入綠色商店
                            </button>
                        </Link>
                        <Link to={`/categories/GreenShopDownload`} className="onfocus btn-link">
                            <button className="bannerButton bannerButton-line none-line">
                                <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                                &nbsp;下載專區
                            </button>
                        </Link>
                    </div>
                </div>
                <div class="container download-content">

                    <h1><i class="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>下載專區</h1>
                    {loading
                        ?
                        <Loader loading={loading} />
                        :
                        // <div className="download-card">
                        //     <div className="download-title">暫無資料</div>
                        // </div>
                        <>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-2">上架日期</th>
                                        <th className="col-4">檔案名稱</th>
                                        <th className="col-2">類別</th>
                                        <th className="col-2">細項</th>
                                        <th className="col-2">檔案下載</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {downloadData.map(data =>
                                        <tr>
                                            <td className="col-2">2021-12-09</td>
                                            <td className="col-4">{data.fileName}</td>
                                            <td className="col-2">{data.typeId}</td>
                                            <td className="col-2">{data.detailId}</td>
                                            <td className="col-2"><a href={data.link}><img src={data.extension === "PDF" ? pdf : rar} alt={data.fileName} title="檔案下載" className="pdf-img" /></a></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </>
                        /*download.map((download, index) =>
                <a onClick={() => clickRecord(download.guid, "8-2", collector)} target="_blank" rel="noopener noreferrer" href={download.href} download={download.title}>
                    <Card key={index} className="download-card">
                        <h2 className="d-flex justify-content-start">
                            <i class="fas fa-download"></i>&emsp;
                            <div>
                                <div className="download-title">
                                    <p className="download-time">{formatDate(download.createTime)}</p>
                                    {download.title}
                                </div>
                                {/* <p>{download.desc}</p> * /}
                                        </div>
                                    </h2>

                                </Card>
                            </a>
                        )*/
                    }

                </div>
                <SideBtn history={history} />
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenShopDownload);