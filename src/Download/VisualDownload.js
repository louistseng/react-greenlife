import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Download.scss';

import { withRouter, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDate, getType } from '../utils/Functions';
import { clickRecord, mulDownloadAPI } from '../utils/API';
import { useCookies } from "react-cookie";
import VisualTypes from '../Download/VisualTypes';
import ComfirmAlertDL from '../Components/ComfirmAlertDL';
import aiPng from '../images1/download/download-illu.png';
import zipPng from '../images1/download/download-zip.png';
import xlsxPng from '../images1/download/download-xlsx.png';
import filmPng from '../images1/download/download-film.png';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Loader = React.lazy(() => import('../Components/Loader'));



function VisualDownload(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    var serialize = require('serialize-javascript');

    const count = "8";
    const themeId = "3";
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState('');

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [loading, setLoading] = useState(false);
    const [visual, setVisual] = useState("0")
    const [underTimeSearch, setUnderTimeSearch] = useState(false);

    const [prevY, setPrevY] = useState(0);
    const loadingRef = useRef(null);
    const [maxPage, setMaxPage] = useState(3);

    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [visualBookMark, setVisualBookMark] = useState([]);

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    //點閱計數API
    const clickRecordDL = useCallback(() => {
        clickRecord("A24677D0-66EF-4BE9-B58A-EF4AC8E7C476", "20", collector)
    }, [collector]);

    const [zipName, setZipName] = useState('');
    const [visualName, setVisualName] = useState('全部類別');
    const [zipLoad, setZipLoad] = useState(false);
    const [dLAreaTheme] = useState('3')

    const fetchDataFunction = useCallback(() => {
        fetch(`${SSL}//${domain}/api/api/DLoad/Material`, {
            method: 'POST',
            body: serialize({
                Page: "1",
                Count: count,
                ThemeId: String(themeId),
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
                setFetchData(result.resultObject.listItems)
                setMaxPage(result.resultObject.pageCount)
                setTotalCount(result.resultObject.totalCount)
                setZipName('視覺素材-' + visualName)
            }
        })
    }, [SSL, domain, count, themeId, serialize, visual, visualName])


    //下載專區-視覺素材(排序新>舊)
    useEffect(() => {
        setPage(1)
        fetchDataFunction()
        clickRecordDL()
    }, [visual, fetchDataFunction])

    const fetchMaterialData = () => {
        fetch(`${SSL}//${domain}/api/api/DLoad/Material`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: count,
                ThemeId: String(themeId),
                TypeId: String(visual),
                StartTime: startDate,
                EndTime: endDate,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result)
            if (result.isSucess) {
                setFetchData([...fetchData, ...result.resultObject.listItems])
                setMaxPage(result.resultObject.pageCount)
                setTotalCount(result.resultObject.totalCount)
                setZipName('視覺素材-' + startDate + '/' + endDate)
            }
        })
    }



    useEffect(() => {
        if (page !== 1) {
            fetchMaterialData()
        }
    }, [page, SSL, domain])

    //觀察到底部loading字-觸發fetch頁數+1
    const lazyLoadImages = useCallback((entries) => {
        const y = entries[0].boundingClientRect.y;

        if (prevY > y) {
            setLoading(true)
            if (page + 1 <= maxPage) {
                if (fetchData.length === (page * count)) {
                    setPage(page + 1);
                } else {
                    setPage(page);
                };
            } else {
                if (maxPage !== 0) {
                    setPage(maxPage)
                }
            }
        } else {
            setLoading(false)
        }
        setPrevY(y);
    }, [prevY, page, maxPage, fetchData.length]);

    //滑至底部顯示更多-設定觀察範圍(底部loading字)
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.25
        }
        const observer = new IntersectionObserver(lazyLoadImages, options);

        if (loadingRef && loadingRef.current) {
            observer.observe(loadingRef.current)
        }
        return () => observer.unobserve(loadingRef.current);



    }, [loadingRef, lazyLoadImages])


    //Zip批次下載API
    const mulDownload = (e) => {
        clickRecord("CE286BEC-8650-49BC-ADAF-283513BB885E", "20", collector)
        setZipLoad(true)
        e.preventDefault(e)

        const uriFetchAll = `${SSL}//${domain}/api/api/DLoad/Material`
        const uriTimeSearch = `${SSL}//${domain}/api/api/DLoad/Material/Time`;

        if (!underTimeSearch) {
            fetch(uriFetchAll, {
                method: 'POST',
                body: serialize({
                    Page: "1",
                    Count: String(totalCount),
                    ThemeId: String(themeId),
                    TypeId: String(visual)
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                // console.log(res)
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    mulDownloadAPI(setZipLoad, result.resultObject.guids, dLAreaTheme, zipName)
                }
            })
        } else {
            fetch(uriTimeSearch, {
                method: 'POST',
                body: JSON.stringify({
                    Page: "1",
                    Count: String(totalCount),
                    StartTime: startDate,
                    EndTime: endDate,
                    ThemeId: String(themeId),
                    TypeId: String(visual)
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => {

                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        mulDownloadAPI(setZipLoad, result.resultObject.guids, dLAreaTheme, zipName)
                    }
                })
        }
    }

    return (
        <>
            <BreadCrumb currentPage={"視覺素材"} />
            <div className={zipLoad ? "black-background show" : "black-background"}></div>
            <div className="download-graph container">
                {zipLoad &&
                    <ComfirmAlertDL totalCount={totalCount} zipLoad={zipLoad} />
                }
                <div className="content-wrapper" style={zipLoad ? { height: "70vh", overflow: "hidden" } : {}}>
                    <div className="graph-main-content">
                        <h1 className="section-title"><i className="fas fa-caret-right" aria-hidden="true" alt="視覺素材圖示"></i>&nbsp;視覺素材</h1>
                        <div className="graph visual-graph">
                            <div className="graph graph-all">
                                <div className="search-area">
                                    <h4>區間查詢:&nbsp;</h4>
                                    <div className="section-search">
                                        <div className="date-wrapper">
                                            <label for="startDate"></label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                id="startDate"
                                                onChange={e => setStartDate(e.target.value)}
                                                max={endDate}
                                                value={startDate}
                                            ></input>
                                            <h4>至</h4>
                                            <label for="endDate"></label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                id="endDate"
                                                onChange={e => setEndDate(e.target.value)}
                                                min={startDate}
                                                value={endDate}
                                            ></input>
                                        </div>
                                        <div >
                                            <button className="search-btn" onClick={() => fetchMaterialData()}>查詢</button>
                                        </div>
                                        <button className="all-download-btn" disabled={fetchData.length === 0} onClick={e => mulDownload(e)}>批次下載</button>
                                        <button className="all-download-btn" onClick={() => {
                                            fetchDataFunction(true)
                                            setUnderTimeSearch(false)
                                            setVisual(0)
                                            setStartDate("")
                                            setEndDate("")
                                        }}>重新查詢</button>
                                        {/* <button className="all-search-btn">下載</button> */}
                                    </div>
                                </div>
                            </div>
                            <VisualTypes url={"/download/material/visual"} visual={visual} setVisual={setVisual} setVisualName={setVisualName} setVisualBookMark={setVisualBookMark} visualBookMark={visualBookMark} history={history} themeId={themeId} />
                            <div className="search-download-result">查詢結果共:&nbsp;<p>{fetchData.length === 0 ? 0 : totalCount}</p>&nbsp;筆</div>
                        </div>

                        <>

                            <div className="">
                                {fetchData.length === 0
                                    ?
                                    <>
                                        <div className="loading-note-wrapper">
                                            <p>查無搜尋結果</p>
                                        </div>
                                        <div style={{ height: "10vh" }} className="search-content"></div>
                                    </>
                                    :
                                    <>
                                        <div className="files-wrapper">
                                            {fetchData.map((visual, index) =>
                                                <a key={index} onClick={() => clickRecord(visual.guid, "20-4", collector)} target="_blank" rel="noopener noreferrer" href={visual.href} download={visual.title + "." + String(visual.href.split('\\').pop().split('.').pop())} title="在新視窗開啟鏈結">
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

                                                            <img title={visual.title} alt={visual.title} src={visual.href.includes('.xlsx') || visual.href.includes('.ods') ?
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
                                        </div>
                                        {page !== maxPage ?
                                            <div className="loading-note-wrapper">
                                                <h4 style={{ color: "#6CB15E" }}>往下滑看更多</h4>
                                            </div>
                                            :
                                            <div className="loading-note-wrapper">
                                                <h4 style={{ color: "#a1a1a1" }}>沒有更多檔案囉~</h4>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </>
                    </div>
                </div>
                <div ref={loadingRef}>
                    <Loader loading={!loading && page !== maxPage && fetchData.length !== 0} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(VisualDownload);