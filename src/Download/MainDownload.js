import React, { useState, useEffect } from 'react';
import './Download.scss';

import { withRouter, Link, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDate, getType } from '../utils/Functions';
import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";
import DownloadCarousel from '../Components/DownloadCarousel';
import DownloadMark from '../Components/DownloadMark';
import VisualTypes from '../Download/VisualTypes';
import aiPng from '../images1/download/download-illu.png';
import zipPng from '../images1/download/download-zip.png';
import xlsxPng from '../images1/download/download-xlsx.png';
import filmPng from '../images1/download/download-film.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));


function MainDownload(props) {
    let history = useHistory()

    const params = new URLSearchParams(history.location.search);
    const type = params.get('type');

    let SSL = props.SSL
    let domain = props.domain

    var serialize = require('serialize-javascript');

    const count = "10";
    const themeIdGraph = "2";
    const themeIdVisual = "3";
    const page = "1";

    const [typeId, setTypeId] = useState("")

    const [visual, setVisual] = useState("0")
    const graph = "0"

    const [loading, setLoading] = useState(false);

    const [fetchDataGraph, setFetchDataGraph] = useState([]);
    const [fetchDataVisual, setFetchDataVisual] = useState([]);
    const [visualBookMark, setVisualBookMark] = useState([]);

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    //點閱計數API
    useEffect(() => {
        clickRecord("70D56692-3A8E-453C-B951-2A189E2B3FF4", "20", collector)
    }, [collector]);

    //下載專區-圖文素材-宣傳圖卡(排序新>舊)
    useEffect(() => {
        history.push('/download/material?type=2&visual=0')
        setTypeId("2")
        const uri = `${SSL}//${domain}/api/api/DLoad/Material`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Page: page,
                Count: count,
                ThemeId: themeIdGraph,
                TypeId: graph
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            // console.log(result)
            if (result.isSucess) {
                setFetchDataGraph(result.resultObject.listItems)
            }
        })
    }, [graph, SSL, domain, serialize, themeIdGraph])

    //下載專區-視覺素材(排序新>舊)
    useEffect(() => {
        // history.push('/download/material?type=7&visual=0')
        // setTypeId("7")
        const uri = `${SSL}//${domain}/api/api/DLoad/Material`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Page: page,
                Count: count,
                ThemeId: String(themeIdVisual),
                TypeId: String(visual)
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            // console.log(result)
            if (result.isSucess) {
                setFetchDataVisual(result.resultObject.listItems)
            }
        })
    }, [visual, SSL, domain, serialize])


    return (
        <>
            <BreadCrumb currentPage={typeId === "2" ? "圖文素材" : "視覺素材"} />
            <div className="download-graph container">

                <div className="content-wrapper">
                    <DownloadMark typeId={typeId} setTypeId={setTypeId} key={typeId} />
                    {typeId === "2" ?
                        <div className="graph-main-content">
                            {/* <h1 className="section-title">圖文素材</h1> */}
                            <div className="graph">
                                <h2 className="graph-title"><i className="fas fa-caret-right" aria-hidden="true" alt="宣傳圖卡圖示"></i>&nbsp;宣傳圖卡</h2>
                                <div className="search-area right">
                                    <Link to="/download/material/graph?type=2" className="all-detail-btn">檢視所有檔案</Link>
                                </div>
                            </div>
                            {loading
                                ?
                                <Loader loading={loading} />
                                :
                                <>

                                    <div className="files-wrapper">
                                        <DownloadCarousel show={4} infiniteLoop>
                                            {fetchDataGraph.map((graph, index) =>
                                                <a key={index} target="_blank" rel="noopener noreferrer" href={graph.href} download={graph.title + "." + String(graph.href.split('\\').pop().split('.').pop())} title="在新視窗開啟鏈結">
                                                    <Card className="download-graph-card">
                                                        <div className="text-area">
                                                            <div className="d-flex justify-content-start">
                                                                <div><i className="fas fa-download" aria-hidden="true" alt={`${graph.title}圖示`}></i></div>&emsp;
                                                                <div className="download-title">
                                                                    <p className="download-time">{formatDate(graph.createTime)}</p>
                                                                </div>
                                                                {/* <div className="sort-type">{String(graph.desc)}</div> */}
                                                            </div>
                                                            <div className="card-title"><p>{graph.title}</p></div>
                                                        </div>
                                                        <div className="img-area-wrapper">

                                                            <img src={graph.href} alt={graph.title} title={graph.title} />
                                                        </div>
                                                        <div className="extension"
                                                            style={getType(String(graph.href.split('\\').pop().split('.').pop().toUpperCase()))}>
                                                            {String(graph.href.split('\\').pop().split('.').pop().toUpperCase())}
                                                        </div>
                                                    </Card>
                                                </a>
                                            )}
                                        </DownloadCarousel>
                                    </div>
                                </>
                            }
                        </div >
                        :
                        <div className="graph-main-content">
                            <div className="graph">
                                <div className="graph-title-wrapper">
                                    <div>
                                        <h2 className="graph-title"><i className="fas fa-caret-right" aria-hidden="true" alt="視覺素材圖示"></i>&nbsp;視覺素材</h2>
                                    </div>
                                    <VisualTypes url={"/download/material"} visual={visual} setVisual={setVisual} setVisualBookMark={setVisualBookMark} setVisualName={null} visualBookMark={visualBookMark} history={history} themeId={themeIdVisual} />
                                </div>
                                <div className="search-area">
                                    <Link to="/download/material/visual?type=2&visual=0" className="all-detail-btn">檢視所有檔案</Link>
                                </div>
                            </div>

                            <>

                                <div className="files-wrapper">
                                    {fetchDataVisual.length === 0
                                        ?
                                        <h6>此分類將持續更新中</h6>
                                        :
                                        <DownloadCarousel show={4} infiniteLoop key={fetchDataVisual} visual={visual}>
                                            {fetchDataVisual.map((visual, index) =>
                                                <a key={index} target="_blank" rel="noopener noreferrer" onClick={() => clickRecord(visual.guid, "20-4", collector)} href={visual.href} download={visual.title + "." + String(visual.href.split('\\').pop().split('.').pop())} title="在新視窗開啟鏈結">
                                                    <Card className="download-graph-card">
                                                        <div className="text-area">
                                                            <div className="d-flex justify-content-start">
                                                                <div><i className="fas fa-download" aria-hidden="true" alt={`${visual.title}圖示`}></i></div>&emsp;
                                                                <div className="download-title">
                                                                    <p className="download-time">{formatDate(visual.createTime)}</p>
                                                                </div>
                                                                <div className="sort-type">{String(visual.typeName)}</div>
                                                            </div>
                                                            <div className="card-title"><p>{visual.title}</p></div>
                                                        </div>
                                                        <div className="img-area-wrapper">

                                                            <img alt={String(visual.href.split('\\').pop().split('.').pop().toUpperCase())} src={visual.href.includes('.xlsx') || visual.href.includes('.ods') ?
                                                                xlsxPng
                                                                :
                                                                visual.href.includes('.ai') ?
                                                                    aiPng
                                                                    :
                                                                    visual.href.includes('.zip') ?
                                                                        zipPng
                                                                        :
                                                                        visual.href.includes('.mp4') ?
                                                                            filmPng
                                                                            :
                                                                            visual.href} />
                                                            {/* <img src={ted} /> */}
                                                        </div>
                                                        <div className="extension" style={getType(String(visual.href.split('\\').pop().split('.').pop().toUpperCase()))}>
                                                            {String(visual.href.split('\\').pop().split('.').pop().toUpperCase())}
                                                        </div>
                                                    </Card>
                                                </a>
                                            )}

                                        </DownloadCarousel>
                                    }
                                </div>
                            </>
                        </div>}
                </div >
                <SideBtn history={history} />
            </div >
            <Footer />
        </>
    );
}

export default withRouter(MainDownload);