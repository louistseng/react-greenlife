import React, { useState, useEffect } from 'react';
import './Download.scss';

import { withRouter, useHistory } from 'react-router-dom';
import { clickRecord } from '../utils/API';
import { clickLogout, formatDate } from '../utils/Functions';
import DownloadMark from '../Components/DownloadMark';
import PdfIcon from '../images1/download/PdfIcon.png';
import OdfIcon from '../images1/download/OdfIcon.png';
import OdtIcon from '../images1/download/odt.png';
import RarIcon from '../images1/download/rar.png';
import ZipIcon from '../images1/download/壓縮檔icon.png'
import PptIcon from '../images1/download/pptIcon.png';
import OdsIcon from '../images1/download/download-xlsx.png';
import OdpIcon from '../images1/download/odpIcon.png'
import DocIcon from '../images1/download/DocIcon.png'
import Mp4Icon from '../images1/download/Mp4Icon.png';



import { useCookies } from "react-cookie";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function EnvironmentTeacher() {

    var serialize = require('serialize-javascript');
    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const typeId = params.get('type')

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    const [markTypeId, setMarkTypeId] = useState("");
    const [zipLoad, setZipLoad] = useState(false);
    const [fetchData, setFetchData] = useState([]);
    const [count, setCount] = useState();

    const [greenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    //點閱計數API
    useEffect(() => {
        clickRecord("BA9747CE-DB36-498E-A444-44CCD3C79A4E", "20", collector)
    }, [collector]);

    useEffect(() => {
        setMarkTypeId(typeId)
    }, [])

    useEffect(() => {
        if (typeId == "4" || typeId == "6" || typeId == "7") {
            let url = `${SSL}//${domain}/api/api/DLoad/Material`;
            fetch(url, {
                method: 'POST',
                body: serialize({
                    Page: "1",
                    Count: "30",
                    TypeId: "",
                    ThemeId: typeId,
                    StartTime: "2001/01/01",
                    EndTime: "2200/12/25",
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Token": memberToken
                }
            })
                .then(res => {
                    // console.log(res)
                    if (res.status === 401) {
                        clickLogout(removeCookie, collector)
                        throw new Error(res.statusText);
                    } else {
                        return res.json();
                    }
                }).then(result => {
                    if (result.isSucess) {
                        console.log(result.resultObject.listItems)
                        setFetchData(result.resultObject.listItems)
                        setCount(result.resultObject.listItems.length)
                    }
                });
        }
    }, [typeId])

    //Zip批次下載API
    // const mulDownload = (e) => {
    //     clickRecord("9B52A89D-0D69-402E-90C3-8AE36ED4811E", "20", collector)
    //     e.preventDefault(e)
    //     mulDownloadAPI(setZipLoad, fetchDataGuid, dLAreaTheme, zipName)
    // }

    const tableData = (
        fetchData.map((data, index) => {
            const { createTime, href, linkSite, linkExt, title } = data
            let src;
            switch (href.slice(-3) || linkExt) {
                case "pdf": src = PdfIcon;
                    break;
                case "odt": src = OdtIcon;
                    break;
                case "rar": src = RarIcon;
                    break;
                case "zip": src = ZipIcon;
                    break;
                case "7z": src = ZipIcon;
                    break;
                case "ods": src = OdsIcon;
                    break;
                case "ppt": src = PptIcon;
                    break;
                case "pptx": src = PptIcon;
                    break;
                case "odf": src = OdfIcon;
                    break;
                case "odp": src = OdpIcon;
                    break;
                case "doc": src = DocIcon;
                    break;
                case "docx": src = DocIcon;
                    break;
                case "mp4": src = Mp4Icon;
                    break;
            }
            return (
                <>
                    <tr>
                        <td className="list-date download_promote" data-title="上架日期" style={{ color: "#0066FF" }}>{formatDate(createTime)}</td>
                        <td className="download-time download_promote" data-title="檔案名稱">{title}</td>
                        {linkSite != null || linkExt != null ?
                            <td className="link-wrapper download_promote" data-title="檔案下載鏈結">
                                <a target="_blank" rel="noopener noreferrer" href={linkSite} download={title} title={`下載${title}檔案`}>
                                    <img src={src} alt={`下載${title}`} style={{ width: "60px" }} />
                                </a>
                            </td>
                            :
                            <td className="link-wrapper download_promote" data-title="檔案下載">
                                <a target="_blank" rel="noopener noreferrer" href={href} download={title} title={`下載${title}檔案`}>
                                    <img src={src} alt={`下載${title}`} style={{ width: "60px" }} />
                                </a>
                            </td>
                        }
                    </tr>
                </>
            )
        })
    )

    //麵包屑 currentPage 切換
    const currentPage = typeId === "4" ? "環境教育種子教師" : typeId === "6" ? "環保標章" : typeId === "7" ? "政府機關及民間企業綠色採購" : ""

    return (
        <>
            <BreadCrumb currentPage={currentPage} />
            <div className={zipLoad ? "black-background show" : "black-background"}></div>
            <div className="download-graph container">

                <div className="content-wrapper">
                    <DownloadMark typeId={markTypeId} setTypeId={setMarkTypeId} />
                    <div className="graph-main-content">

                        <div>
                            <div className="graph-list">
                                <h2 className="section-title"> <i className="fas fa-download" aria-hidden="true" alt="檔案列表圖示"></i>檔案列表</h2>
                                {/* <button className="all-download-btn" onClick={e => mulDownload(e)}>批次下載</button> */}
                            </div>
                            <div className="search-download-result">查詢結果共:&nbsp;<p>{count}</p>&nbsp;筆</div>
                            <>

                                <div>

                                    <table className="download-promote-card rwd-table download_promote" >
                                        <thead className="text-content-wrapper">
                                            <tr>
                                                <th className="download-th">上架日期</th>
                                                <th className="download-th">檔案名稱</th>

                                                <th className="download-th">檔案下載</th>
                                            </tr>
                                        </thead>
                                        <tbody className="card-content" id="data-table">
                                            {tableData}
                                        </tbody>

                                    </table>
                                </div>

                            </>
                        </div>
                    </div>


                </div>

                <div style={{ height: "25vh" }} className="search-content"></div>

            </div>
            <Footer />
        </>
    );
}

export default withRouter(EnvironmentTeacher);