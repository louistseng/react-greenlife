import React, { useState, useEffect, useRef, useCallback } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import './events.scss';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import { clickRecord, getCityDrop } from '../../src/utils/API';
import { formatDate } from "../../src/utils/Functions";
import ReactPaginate from 'react-paginate';



const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function ConferenceEvent(props) {

    var serialize = require('serialize-javascript');

    let history = useHistory()

    let SSL = props.SSL;
    let domain = props.domain;

    const params = new URLSearchParams(history.location.search);
    const searchGuid = params.get('search')
    const searchMode = Boolean(params.get('search'))

    const [page, setPage] = useState(1);
    const [count, setCount] = useState("10");
    const [maxPage, setMaxPage] = useState(3);
    const loadingRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const [keyWord, setKeyword] = useState("");
    const [mType, setMType] = useState("");  //實體或線上
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [cityId, setCityId] = useState("");
    const [fetchData, setFetchData] = useState([])
    const [afterFetchData, setAfterFetchData] = useState([])
    const [beforeFetchData, setBeforeFetchData] = useState([])
    const [search, setSearch] = useState(false)

    const collector = sessionStorage.getItem("userGuid") || "";

    let myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
    });

    useEffect(() => {
        //點閱計數API
        clickRecord("33972153-308E-4E02-B200-2A392377435D", "26", collector)
    })

    useEffect(() => {
        handleBeforeM()
        handleAfterM()
    }, [])

    useEffect(() => {
        if (search) {
            submit()
            history.push('/conferenceEvent?search=All')
        }
    }, [search])

    useEffect(() => {
        if (searchGuid === "after") {
            setSearch(false)
            handleAfterM()
        }
        if (searchGuid === "before") {
            setSearch(false)
            handleBeforeM()
        }
    }, [searchGuid])

    let today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
    const afterDay = today.setDate(today.getDate() + 30);

    const searchUrl = `${SSL}//${domain}/api/api/Meeting/ComplexSearch`;

    const submit = useCallback(() => {
        fetch(searchUrl, {
            method: 'POST',
            headers: myHeaders,
            body: serialize({
                StartDatetime: startTime,
                EndDatetime: endTime,
                CityCode: cityId,
                Key: keyWord,
                MType: mType,
                Page: String(page),
                Count: count
            })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.isSucess) {
                    setFetchData(result.resultObject.meetings)
                    setMaxPage(result.resultObject.pageCount)
                    history.push('/conferenceEvent?page=1&search=All')
                    setSearch(false)
                }
            })
            .catch(error => console.log('error', error));
    }, [SSL, domain, serialize, page])

    const reset = (e) => {
        e.preventDefault();
        setStartTime("")
        setEndTime("")
        setCityId("")
        setKeyword("")
        setMType("")
    }

    const handleAfterM = () => {
        fetch(searchUrl, {
            method: 'POST',
            headers: myHeaders,
            body: serialize({
                StartDatetime: formatDate(yesterday),
                EndDatetime: formatDate(afterDay),
                Page: String(page),
                Count: count
            })
        })
            .then(response => response.json())
            .then(result => {
                // console.log("after", result)
                setAfterFetchData(result.resultObject.meetings)
            })
            .catch(error => console.log('error', error));
    }

    const handleBeforeM = () => {
        fetch(searchUrl, {
            method: 'POST',
            headers: myHeaders,
            body: serialize({
                StartDatetime: "2022-08-01T00:00:00",
                EndDatetime: formatDate(yesterday),
                Page: String(page),
                Count: count
            })
        })
            .then(response => response.json())
            .then(result => {
                setBeforeFetchData(result.resultObject.meetings)
                // console.log("before", result)
            })
            .catch(error => console.log('error', error));
    }

    //觀察到底部loading字-觸發fetch頁數+1
    // const lazyLoadImages = useCallback((entries) => {

    //     const y = entries[0].boundingClientRect.y;

    //     if (prevY > y) {
    //         setLoading(true)
    //         if (page + 1 <= maxPage) {
    //             if (fetchData.length === (page * count)) {
    //                 setPage(page + 1);
    //             } else {
    //                 setPage(page);
    //             }
    //         } else {
    //             if (maxPage !== 0) {
    //                 setPage(maxPage)
    //             }
    //         }
    //         setPage(page + 1);
    //     } else {
    //         setLoading(false)
    //     }
    //     setPrevY(y);
    // }, [prevY, page, maxPage, fetchData.length]);

    //滑至底部顯示更多-設定觀察範圍(底部loading字)
    // useEffect(() => {
    //     if (search) {
    //         const options = {
    //             root: null,
    //             rootMargin: '100px',
    //             threshold: 0.25
    //         }
    //         const observer = new IntersectionObserver(lazyLoadImages, options);

    //         if (loadingRef && loadingRef.current) {
    //             observer.observe(loadingRef.current)
    //         }
    //         return () => observer.unobserve(loadingRef.current);
    //     }
    // }, [loadingRef, lazyLoadImages])


    //縣市下拉選單API
    // const [dropDown, setDropDown] = useState([]);
    // useEffect(() => {
    //     getCityDrop(setDropDown)
    // }, [])

    // const handlePageClick = (data, setPage, category) => {
    //     setPage(data.selected + 1);
    //     history.push(`/conferenceEvent?page=${category === "page" ? data.selected + 1 : page}&search=All`)
    // };


    return (
        <>
            <BreadCrumb currentPage={"淨零綠生活社會溝通"} />
            <div className="container event-container my-2">
                <h1 className="">淨零綠生活社會溝通</h1>
                <hr className="col-3" />
                <p className="info-net-zero my-5">臺灣2050淨零轉型十二大關鍵策略，包含「淨零綠生活」的生活轉型政策，要結合生活各面向推出相對應的政策與指引，讓更多民眾一同響應對環境友善之行動！為了凝聚各界共識，讓民眾一同響應對環境友善之行動，環保署積極辦理各項活動推廣「淨零綠生活」，讓全民都知道如何淨零綠生活！</p>
                <div className="col-12 row search-area">
                    <div className="left-side col-sm-12 col-md-12 col-lg-4">
                        <div>
                            <label>關鍵字</label>
                            <input type="text" className="keyword-input" value={keyWord} onChange={(e) => setKeyword(e.target.value)} />
                        </div>
                        <div>
                            <label>活動時間</label>
                            <input type="date" className="date-input" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                            至
                            <input type="date" className="date-input" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </div>
                    </div>
                    <div className="right-side col-sm-12 col-md-12 col-lg-4">
                        <div>
                            <label>活動類型</label>
                            <select className="place-input" onChange={(e) => history.push(`/conferenceEvent?search=${e.target.value}`)}>
                                <option value="0" selected={mType === ""}>請選擇</option>
                                <option value="after">未來溝通會議</option>
                                <option value="before">過去溝通會議</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 search-btn">
                        <button onClick={() => setSearch(true)}>查詢</button>
                        <button onClick={(e) => reset(e)}>重新查詢</button>
                    </div>
                </div>

                {searchMode ?
                    <div className="search-list meetingCarouselFlip">
                        <div className="link-list">
                            <Link to="/conferenceEvent?search=after" style={{ background: searchGuid === "after" && "#6cb15e", color: searchGuid === "after" && "#fff" }}>參加未來溝通會議</Link>
                            <Link to="/conferenceEvent?search=before" style={{ background: searchGuid === "before" && "#6cb15e", color: searchGuid === "before" && "#fff" }}>了解過去會議成果</Link>
                        </div>
                        <div className="carousel-flip card-wrap">
                            {searchGuid === "All" && fetchData.sort((a, b) => a.meetingStart < b.meetingStart ? 1 : -1).map((d, i) =>
                                <>
                                    <Link as={Link} to={`/conferenceEventPage?guid=${d.guid}`} key={i} className="flip-rec-card card" title={d.meetingName} target="_blank">
                                        <img className="ev-detail-img" src={d.fileUrl ? d.fileUrl : "/images/blankLeef_1.png"} alt={d.meetingName} />
                                        <div className="flip-rec-text">
                                            <div className="rec-type ">
                                                <p className="date">{formatDate(d.meetingStart)}</p>
                                                <p className="meet-title">{d.meetingName}</p>
                                                <div className="d-flex justify-content-end">
                                                    {/* <p className="city">{getCityName(d.city)}</p> */}
                                                    {d.isoffline && <p className="on">實體</p>}
                                                    {d.isonline && <p className="city">線上</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>)
                            }
                            {searchGuid === "after" && afterFetchData.sort((a, b) => a.meetingStart < b.meetingStart ? 1 : -1).map((d, i) =>
                                <>
                                    <Link as={Link} to={`/conferenceEventPage?guid=${d.guid}`} key={i} className="flip-rec-card card" title={d.meetingName} target="_blank">
                                        <img className="ev-detail-img" src={d.fileUrl ? d.fileUrl : "/images/blankLeef_1.png"} alt={d.meetingName} />
                                        <div className="flip-rec-text">
                                            <div className="rec-type ">
                                                <p className="date">{formatDate(d.meetingStart)}</p>
                                                <p className="meet-title">{d.meetingName}</p>
                                                <div className="d-flex justify-content-end">
                                                    {/* <p className="city">{getCityName(d.city)}</p> */}
                                                    {d.isoffline && <p className="on">實體</p>}
                                                    {d.isonline && <p className="city">線上</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )}
                            {searchGuid === "before" && beforeFetchData.sort((a, b) => a.meetingStart < b.meetingStart ? 1 : -1).map((d, i) =>
                                <>
                                    <Link as={Link} to={`/conferenceEventPage?guid=${d.guid}`} key={i} className="flip-rec-card card" title={d.meetingName} target="_blank">
                                        <img className="ev-detail-img" src={d.fileUrl ? d.fileUrl : "/images/blankLeef_1.png"} alt={d.meetingName} />
                                        <div className="flip-rec-text">
                                            <div className="rec-type ">
                                                <p className="date">{formatDate(d.meetingStart)}</p>
                                                <p className="meet-title">{d.meetingName}</p>
                                                <div className="d-flex justify-content-end">
                                                    {/* <p className="city">{getCityName(d.city)}</p> */}
                                                    {d.isoffline && <p className="on">實體</p>}
                                                    {d.isonline && <p className="city">線上</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                        {/* {search &&
                            page !== maxPage ?
                            <div className="loading-note-wrapper">
                                <h4 style={{ color: "#6CB15E" }}>往下滑看更多</h4>
                            </div>
                            :
                            <div className="loading-note-wrapper">
                                <h4 style={{ color: "#a1a1a1", marginBottom: "0" }}>沒有更多檔案囉~</h4>
                            </div>
                        }
                        <div ref={loadingRef}>
                            <Loader loading={!loading && page !== maxPage && fetchData.length !== 0} />
                        </div> */}
                        {/* <ReactPaginate
                            forcePage={page - 1}
                            style={{ visibility: loading ? 'hidden' : 'visible' }}
                            previousLabel={'上一頁'}
                            nextLabel={'下一頁'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={maxPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(data) => handlePageClick(data, setPage, "page")}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                        /> */}
                    </div>
                    :
                    <>
                        <div className="carousel-flip col-12 row meetingCarouselFlip">
                            <h2>參加未來溝通會議</h2>
                            <hr className="col-10 mb-5" />
                            <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={345} >
                                {afterFetchData.slice(0, 5).sort((a, b) => a.meetingStart < b.meetingStart ? 1 : -1).map(d =>
                                    <>
                                        <Link to={`/conferenceEventPage?guid=${d.guid}`} className="flip-rec-card card" as={Link} title={d.meetingName} target="_blank">
                                            <img className="ev-detail-img" src={d.fileUrl ? d.fileUrl : "/images/blankLeef_1.png"} alt={d.meetingName} />
                                            <div className="flip-rec-text">
                                                <div className="rec-type ">
                                                    <p className="date">{formatDate(d.meetingStart)}</p>
                                                    <p className="meet-title">{d.meetingName}</p>
                                                    <div className="d-flex justify-content-end">
                                                        {/* <p className="city">{getCityName(d.city)}</p> */}
                                                        {d.isoffline && <p className="on">實體</p>}
                                                        {d.isonline && <p className="city">線上</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </DownloadCarouselFlip>
                        </div>
                        <Link to="/conferenceEvent?search=after" className="more" >點我查看更多</Link>

                        <div className="carousel-flip col-12 row meetingCarouselFlip">
                            <h2>過去溝通會議</h2>
                            <hr className="col-10 mb-5" />
                            <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={345} >
                                {beforeFetchData.slice(0, 5).sort((a, b) => a.meetingStart < b.meetingStart ? 1 : -1).map(d =>
                                    <>
                                        <Link to={`/conferenceEventPage?guid=${d.guid}`} className="flip-rec-card card" as={Link} title={d.meetingName} target="_blank">
                                            <img className="ev-detail-img" src={d.fileUrl ? d.fileUrl : "/images/blankLeef_1.png"} alt={d.meetingName} />
                                            <div className="flip-rec-text">
                                                <div className="rec-type ">
                                                    <p className="date">{formatDate(d.meetingStart)}</p>
                                                    <p className="meet-title">{d.meetingName}</p>
                                                    <div className="d-flex justify-content-end">
                                                        {/* <p className="city">{getCityName(d.city)}</p> */}
                                                        {d.isoffline && <p className="on">實體</p>}
                                                        {d.isonline && <p className="city">線上</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </DownloadCarouselFlip>

                            <Link to="/conferenceEvent?search=before" className="more">點我查看更多</Link>
                        </div>
                    </>
                }
            </div>
            <Footer />
        </>
    )
}
export default withRouter(ConferenceEvent);