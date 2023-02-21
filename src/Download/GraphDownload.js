import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Download.scss';
import { withRouter } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDate, getType } from '../utils/Functions';
import { clickRecord, mulDownloadAPI } from '../utils/API';
import { useCookies } from "react-cookie";
import ComfirmAlertDL from '../Components/ComfirmAlertDL';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Loader = React.lazy(() => import('../Components/Loader'));

function GraphDownload(props) {

    let SSL = props.SSL
    let domain = props.domain

    var serialize = require('serialize-javascript');

    const count = "8";
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState('');

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [loading, setLoading] = useState(false);

    const [prevY, setPrevY] = useState(0);
    const loadingRef = useRef(null);
    const [maxPage, setMaxPage] = useState(3);

    const [fetchDataGraph, setFetchDataGraph] = useState([]);
    const [zipName, setZipName] = useState('');
    const [zipLoad, setZipLoad] = useState(false);
    const dLAreaTheme = '2'
    const themeIdGraph = "2";
    const graph = "0"

    const uriFetchAll = `${SSL}//${domain}/api/api/DLoad/Material`;
    const uriTimeSearch = `${SSL}//${domain}/api/api/DLoad/Material/Time`;

    const [underTimeSearch, setUnderTimeSearch] = useState(false);

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    //點閱計數API
    const clickRecordDL = useCallback(() => {
        clickRecord("A24677D0-66EF-4BE9-B58A-EF4AC8E7C476", "20", collector)
    }, [collector]);

    const fetchDataFunction = useCallback(() => {

        fetch(uriFetchAll, {
            method: 'POST',
            body: serialize({
                Page: String(page),
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

            if (result.isSucess) {
                // console.log(result)
                setLoading(false)
                setFetchDataGraph([...fetchDataGraph, ...result.resultObject.listItems])
                // setFetchDataGuid([...fetchDataGuid, ...result.resultObject.guids])
                setTotalCount(result.resultObject.totalCount)
                setZipName('圖文素材-所有檔案')
                setMaxPage(result.resultObject.pageCount)

            }
        })
    }, [SSL, domain, serialize, page, uriFetchAll])

    useEffect(() => {
        fetchDataFunction()
        clickRecordDL()
    }, [])

    //下載專區-圖文素材-宣傳圖卡(排序新>舊)
    useEffect(() => {
        setLoading(true)

        if (!underTimeSearch && page !== 1) {
            fetchDataFunction()
        } else if ((startDate || endDate) && underTimeSearch && page !== 1) {
            fetch(uriTimeSearch, {
                method: 'POST',
                body: serialize({
                    Page: String(page),
                    Count: count,
                    StartTime: startDate,
                    EndTime: endDate,
                    ThemeId: themeIdGraph,
                    TypeId: graph
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        setLoading(false)
                        setFetchDataGraph([...fetchDataGraph, ...result.resultObject.listItems])
                        setZipName('圖文素材-' + startDate + '/' + endDate)
                        setMaxPage(result.resultObject.pageCount)

                    }
                });

        }
    }, [page, SSL, domain])

    //時間搜尋API
    const timeSearch = (e) => {

        e.preventDefault(e)
        setLoading(true)
        setUnderTimeSearch(true)

        setPage(1)

        const uri = `${SSL}//${domain}/api/api/DLoad/Material/Time`;

        if (startDate || endDate) {

            fetch(uri, {
                method: 'POST',
                body: serialize({
                    Page: "1",
                    Count: count,
                    StartTime: startDate,
                    EndTime: endDate,
                    ThemeId: themeIdGraph,
                    TypeId: graph
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        // console.log(result)
                        setLoading(false)
                        setFetchDataGraph(result.resultObject.listItems)
                        setZipName('圖文素材-' + startDate + '/' + endDate)
                        setMaxPage(result.resultObject.pageCount)
                        setTotalCount(result.resultObject.totalCount)
                    }
                });
        }
    }


    //觀察到底部loading字-觸發fetch頁數+1
    const lazyLoadImages = useCallback((entries) => {

        const y = entries[0].boundingClientRect.y;

        if (prevY > y) {
            setLoading(true)
            // const lastUser = fetchData[fetchData.length - 1];
            // const curPage = lastUser.index;
            if (page + 1 <= maxPage) {
                if (fetchDataGraph.length === (page * count)) {
                    setPage(page + 1);
                } else {
                    setPage(page);
                }
            } else {
                if (maxPage !== 0) {
                    setPage(maxPage)
                }
            }
        } else {
            setLoading(false)
        }
        setPrevY(y);
    }, [prevY, page, maxPage, fetchDataGraph.length]);

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
        clickRecord("C12FD5F8-8693-49ED-AD24-ACB59D6BE0FF", "20", collector)
        setZipLoad(true)
        e.preventDefault(e)

        if (!underTimeSearch) {
            fetch(uriFetchAll, {
                method: 'POST',
                body: JSON.stringify({
                    Page: "1",
                    Count: String(totalCount),
                    ThemeId: themeIdGraph,
                    TypeId: graph
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
        } else {
            fetch(uriTimeSearch, {
                method: 'POST',
                body: JSON.stringify({
                    Page: "1",
                    Count: String(totalCount),
                    StartTime: startDate,
                    EndTime: endDate,
                    ThemeId: themeIdGraph,
                    TypeId: graph
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
            <BreadCrumb currentPage={"宣傳圖卡"} />
            <div className={zipLoad ? "black-background show" : "black-background"}></div>
            <div className="download-graph container">
                {zipLoad &&
                    <ComfirmAlertDL totalCount={totalCount} zipLoad={zipLoad} />
                }
                <div className="content-wrapper" style={zipLoad ? { height: "70vh", overflow: "hidden" } : {}}>
                    <div className="graph-main-content">
                        <h1 className="section-title"><i className="fas fa-caret-right" aria-hidden="true" alt="宣傳圖卡圖示"></i>&nbsp;宣傳圖卡</h1>
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
                                        <button className="search-btn" onClick={e => timeSearch(e)}>查詢</button>
                                    </div>
                                    <button className="all-download-btn" onClick={e => mulDownload(e)}>批次下載</button>
                                    <button disabled={!underTimeSearch} className="all-download-btn" onClick={() => {
                                        fetchDataFunction(true)
                                        setUnderTimeSearch(false)
                                        setStartDate("")
                                        setEndDate("")
                                        setPage(1)
                                    }}>重新查詢</button>
                                    {/* <button onClick={groupDownload} className="all-search-btn">下載</button> */}
                                </div>
                            </div>
                        </div>
                        <div className="search-download-result">查詢結果共:&nbsp;<p>{totalCount}</p>&nbsp;筆
                        </div>

                        <>

                            <div className="">
                                {fetchDataGraph.length === 0
                                    ?
                                    <>
                                        <div className="loading-note-wrapper">
                                            <p>查無搜尋結果</p>
                                        </div>
                                        <div style={{ height: "12vh" }} className="search-content"></div>
                                    </>
                                    :
                                    <>
                                        <div className="files-wrapper">
                                            {fetchDataGraph.map((graph, index) =>
                                                <a key={index} target="_blank" rel="noopener noreferrer" href={graph.href} download={graph.title + "." + String(graph.href.split('\\').pop().split('.').pop())}>
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

                                                            <img src={graph.href} alt="下載圖片" title="下載圖片" />
                                                        </div>
                                                        <div className="extension" style={getType(String(graph.href.split('\\').pop().split('.').pop().toUpperCase()))}>
                                                            {String(graph.href.split('\\').pop().split('.').pop().toUpperCase())}
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
                    <Loader loading={!loading && page !== maxPage && fetchDataGraph.length !== 0} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GraphDownload);