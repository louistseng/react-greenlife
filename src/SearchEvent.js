import React, { useState, useEffect, useRef, useCallback } from 'react';
import './carousel.css';
import './eventDetail.scss';
import { Form, Col, Button } from 'react-bootstrap';
import { withRouter, useHistory, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { select } from "d3";
import { formatDate, getCityName, pad, matchRegex } from './utils/Functions';
import { ReactComponent as TaiwanSVG } from './taiwanMap.svg'
import { clickRecord } from './utils/API';

const BreadCrumb = React.lazy(() => import('./Components/BreadCrumb'));
const SideBtn = React.lazy(() => import('./Components/SideBtn'));
// const GeoChart = React.lazy(() => import('./Components/GeoChart'));
const Footer = React.lazy(() => import('./Components/Footer'));
const EmblaCarousel = React.lazy(() => import('./Components/CarouselRec'));
const EventSlider = React.lazy(() => import('./Components/Carousel'));
const BottomCarousel = React.lazy(() => import('./Components/BottomCarousel'));
const Loader = React.lazy(() => import('./Components/Loader'));


function SearchEvent(props) {

    var serialize = require('serialize-javascript');
    let history = useHistory()

    const paramsSearch = new URLSearchParams(history.location.search)
    var params
    let domainFormal = "https://greenliving.epa.gov.tw/newPublic";
    // let domainTest = "https://greenliving.eri.com.tw/PublicRwd"

    let testdomainFormal = props.domain.includes("eri") ? "https://greenliving.eri.com.tw/PublicRwd" : "https://greenliving.epa.gov.tw/newPublic";


    let SSL = "https://"
    let domain = "greenlife.epa.gov.tw"

    const [loading, setLoading] = useState(true)
    const [newsLoading, setNewsLoading] = useState(true)

    const [SLIDE_COUNTBt, setSLIDE_COUNTBt] = useState(12)
    const slidesBt = Array.from(Array(SLIDE_COUNTBt).keys());

    const [title, setTitle] = useState("")

    const [cityId, setCityId] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [activityTitle, setActivityTitle] = useState("");
    const [activityThemeId, setActivityThemeId] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [count] = useState("8")
    const [page, setPage] = useState(1)
    const [pageNews, setPageNews] = useState(1)
    const [pageCount, setPageCount] = useState("")
    const [pageCountNews, setPageCountNews] = useState("")

    const [searchData, setSearchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [updateTime, setUpdateTime] = useState("");

    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("CAD39E10-EF28-49DC-AE90-1293CD2C4C46", "5", collector)
        //9/10測試用
        // console.log(window.location.hostname)
    }, [collector]);




    //查詢前所有活動API
    const ComplexSearch = useCallback(() => {

        setLoading(true)
        params = new URLSearchParams(history.location.search);

        const uri = `${props.SSL}//${props.domain}/API/API/Activity/ComplexSearch`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                CityId: params.get('city') || cityId,
                StartDatetime: matchRegex(params.get('startDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || startDate,
                EndDatetime: matchRegex(params.get('endDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || endDate,
                Organizer: params.get('org') || organizer,
                Title: params.get('keyword') || activityTitle,
                ThemeId: params.get('theme') || String(activityThemeId),
                Page: params.get('page') || String(page),
                Count: count
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setLoading(false)
                    setSearchData(result.resultObject.activitys);
                    setSLIDE_COUNTBt(result.resultObject.activitys.length)
                    setPageCount(result.resultObject.pageCount)
                    if (params.get("searched")) {
                        window.scrollTo({ top: 1500, behavior: 'smooth' })
                    }
                }
            })
    }, [])


    //查詢前所有資訊網活動API
    const fetchNews = useCallback((uri) => {
        //console.log(uri)

        setNewsLoading(true)
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.Result === "Success") {
                    setNewsLoading(false)
                    var today = new Date();
                    var tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);

                    result.Detail = result.Detail.filter(function (item) {

                        return tomorrow < new Date(item.EventEnd);
                    });
                    setUpdateTime(result.Message)
                    setNewsData(result.Detail)
                    setSearchCount(result.RowsCount)
                    setPageCountNews(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                }
            });
    }, [])

    //地圖快速查詢
    useEffect(() => {
        setLoading(true)
        setNewsLoading(true)

        ComplexSearch()
        params = new URLSearchParams(history.location.search);
        fetchNews(`${testdomainFormal}/APIs/News/${params.get('pageNews') || pageNews}?et=1,2&ded=15,16&ec=${getCityName(cityId)}`)

    }, [cityId, ComplexSearch, fetchNews, testdomainFormal])

    const [newsData, setNewsData] = useState([])


    useEffect(() => {
        const uri = `${testdomainFormal}/APIs/News/${pageNews}?et=1,2&ded=15,16&org=${paramsSearch.get('org') || organizer}&ec=${getCityName(paramsSearch.get('city') || cityId)}&k=${paramsSearch.get('keyword') || activityTitle}&etc=${paramsSearch.get('theme') || activityThemeId}&ond=${matchRegex(paramsSearch.get('startDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || startDate}T00:00:00&eed=${matchRegex(paramsSearch.get('endDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || endDate}T23:55:55`
        fetchNews(uri)
        // console.log(uri)

    }, [pageNews, fetchNews])


    const tableData = (

        newsData.sort((a, b) => {
            if (a.EventStart < b.EventStart) return 1;
            if (a.EventStart > b.EventStart) return -1;
        }).map((data, index) => {
            const { Subject, EventStart, EventEnd, Organizer, Id } = data
            return (
                <tr key={index}>
                    <td data-title="活動名稱" className="news-name table-align-center">{Subject}</td>
                    <td data-title="活動開始時間" className="news-table-date table-align-center">{formatDate(EventStart)}</td>
                    <td data-title="活動結束時間" className="news-table-date download-time table-align-center">{formatDate(EventEnd)}</td>
                    <td data-title="主辦單位" className="table-align-left table-align-center">{Organizer}</td>
                    <td data-title="  " className="list-date"><Link to={`/searchEvent/eventDetail?news=${Id}`} className="news-table-btn">檢視內容</Link></td>
                </tr>
            )
        })

    )

    const localNewsRef = useRef()
    const bScrollToLocalNews = new URLSearchParams(history.location.search).toString().includes("localNews")
    const [localNewsOffset, setLocalNewsOffset] = useState(2000)

    //進入頁面-至頂
    useEffect(() => {
        //跳至地方消息
        if (params.toString().includes("localNews")) {
            //console.log(localNewsRef.current.offsetTop)
            //scroll.scrollTo(localNewsRef.current.offsetTop)
            //scroll.scrollMore(3000);
            //executeScroll()
            //window.scrollTo({ behavior: 'smooth', top: localNewsRef.current.offsetTop });
            //setLocalNewsOffset(localNewsRef.current.offsetTop)
            //console.log(localNewsOffset)
        }
        else {
            window.scrollTo(0, 0)
        }
    }, []);

    //跳至地方消息
    const ScrollToLocalNews = () => {
        window.scrollTo({ behavior: 'smooth', top: 3050 })//localNewsOffset
    };

    //每當page改變時,執行查詢所有活動API
    useEffect(() => {
        // params = new URLSearchParams(history.location.search);
        ComplexSearch()
        setCityId(params?.get('city') || "")
    }, [page, ComplexSearch]);


    //送出查詢
    const submit = (e) => {
        setLoading(true)
        setNewsLoading(true)
        setPageNews(1)
        setPage(1)

        e.preventDefault()

        history.push(`/searchEvent?page=${page}&pageNews=${pageNews}&city=${cityId}&org=${organizer}&keyword=${activityTitle}&theme=${activityThemeId}&startDate=${startDate}&endDate=${endDate}&searched=1`)

        ComplexSearch()
        fetchNews(`${testdomainFormal}/APIs/News/${pageNews}?et=1,2&ded=15,16&org=${paramsSearch.get('org') || organizer}&ec=${getCityName(paramsSearch.get('city') || cityId) || ""}&k=${paramsSearch.get('keyword') || activityTitle}&etc=${paramsSearch.get('theme') || activityThemeId}&ond=${matchRegex(paramsSearch.get('startDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || startDate}T00:00:00&eed=${matchRegex(paramsSearch.get('endDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || endDate}T23:55:55`)

    };

    //熱門推薦活動
    const carousel = (
        <>
            <div className="carouselRec">
                <EmblaCarousel activityTypeId={"3"} scrollProgress={0.2} SSL={props.SSL} domain={props.domain} />
            </div>
        </>
    )


    //縣市別下拉式選單API
    const [fetchData, setFetchData] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/Common/Citys`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setFetchData(result.resultObject)
                // console.log(result)
            });
    }, [props.SSL, props.domain])

    //活動主題下拉選單API
    const [dropDownTheme, setDropDownTheme] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/Activity/Theme/List`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDropDownTheme(result.resultObject)
                // console.log(result)
            });
    }, [props.SSL, props.domain])


    var d3 = require("d3");
    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {

        const svg = select(svgRef.current);
        svg
            .style("position", "relative")
            .selectAll('.section')


        //定義縣市小標籤
        const tooltipSvg = select(tooltipRef.current);
        var tooltip = tooltipSvg
            .append("div")
            .attr("class", "myTooltip")
            .style("position", "absolute")
            .style("opacity", "0")
            .style("transition", "all .3s")
        //


        svg
            .selectAll('.section')
            // .on("mouseover", function () {
            //     return tooltip.style("visibility", "visible");
            // })
            .on("mouseover", function (d) {
                tooltip.style("opacity", "1");
                tooltip
                    .style("top", (d.clientY - 300) + "px")
                    .style("left", (d.clientX - 300) + "px")
                    .html(decodeURIComponent(JSON.parse(`"${d3.select(this).attr("name")}"`)))
                // .style("top", (d.clientY - 100) + "px")
                // .style("left", (d.clientX - 300) < 100 ? 200 : (d.clientX - 300) + "px")
                // .append("div")
                // .html('<svg xml:space="preserve" viewBox="0 0 1600 900">' + d3.select(this)._groups[0][0].outerHTML + '</svg>')


                d3.select(this)
                    .classed("hovered", true)
                //     .clone(true)
                //     .classed("myTooltip-map", true)
                //     .style("transform", "translateY(-200px)")
                //     .style("transform", "translateY(-200px)")
                //     .style("transform", "translateX(-" + d.clientX > 400 ? 1000 : d.clientX + "px)")
                //     // .style("top", (d.clientY - 400) + "px")
                //     // .style("left", (d.clientX - 850) + "px")
                //     .style("transform", "scale(.7)")

                svg
                    .selectAll('.section')
                    .filter(function () {
                        return !this.classList.contains('myTooltip-map') && !this.classList.contains('hovered')
                    })
                    .style("opacity", ".1")

            })
            .on("mouseout", function () {
                tooltip.style("opacity", "0")
                d3.selectAll(".myTooltip-map").attr("visibility", "hidden")
                //.classed("myTooltip-map", false)
                svg.selectAll('.section')
                    .style("opacity", "1")
                    .classed("hovered", false)
            })
            .on("click", function () {
                tooltip.style("opacity", "0")
                d3.selectAll(".myTooltip-map").attr("visibility", "hidden")
                //.classed("myTooltip-map", false)
                svg.selectAll('.section')
                    .style("opacity", "1")
                    .classed("hovered", false)

                setCityId(pad(d3.select(this).attr("id")))
                history.push(`/searchEvent?page=${page}&pageNews=${pageNews}&city=${pad(d3.select(this).attr("id"))}&org=${organizer}&keyword=${activityTitle}&theme=${activityThemeId}&startDate=${startDate}&endDate=${endDate}&searched=1`)
            });
    });


    const handlePageClick = (data, setPage, category) => {
        setPage(data.selected + 1);
        history.push(`/searchEvent?page=${category === "page" ? data.selected + 1 : page}&pageNews=${category === "pageNews" ? data.selected + 1 : pageNews}&city=${cityId}&org=${organizer}&keyword=${activityTitle}&theme=${activityThemeId}&startDate=${startDate}&endDate=${endDate}&searched=1`)
    };



    var arrayCheck = []

    const getThemeCheck = () => {
        var chks = document.querySelectorAll('input#themeCheckbox0[type=checkbox]:checked, input#themeCheckbox1[type=checkbox]:checked, input#themeCheckbox2[type=checkbox]:checked, input#themeCheckbox3[type=checkbox]:checked, input#themeCheckbox4[type=checkbox]:checked, input#themeCheckbox5[type=checkbox]:checked, input#themeCheckbox6[type=checkbox]:checked, input#themeCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(chks[i].value)
            setActivityThemeId(arrayCheck)
        }
        // history.push(`/categories/green_office/participate?page=${page}&type=${arrayCheck}&city=${cityId}&year=${getYear(year)}&month=${month}&sort=${sortType}&n=${keyWord}`)
        chks.length === 0 && setActivityThemeId([])
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>全民綠生活資訊平台-活動專區</title>
                    <meta name="description" content="改善空品，大眾運輸點數「天天2倍送」！" />
                </Helmet>
                <BreadCrumb />

                <div className="container-fluid-middle containerBox">
                    <EventSlider activityTypeId={"4"} scrollProgress={0.2} SSL={props.SSL} title={"一縣市一活動"} />
                    <EventSlider activityTypeId={"2"} scrollProgress={0.2} SSL={props.SSL} title={"好康活動"} />
                    {carousel}
                    <h2 className="green-eventTitle">綠生活活動查詢</h2>
                    <div className="row event-slider">
                        <div className="col-sm-12 col-md-12  col-lg-6">
                            <div className="d-flex eventTitle">
                            </div>
                            <div className="d-flex secondTitle">
                                <i className="fas fa-search" aria-hidden="true" alt="快速搜尋圖示"></i>
                                <h3>快速查詢 ( 依縣市別 )</h3>
                            </div>
                            <div className="tooltip-svg">
                                <div ref={tooltipRef}></div>
                                <TaiwanSVG ref={svgRef} className="taiwan-svg" alt="taiwan-svg" />
                            </div>
                            {/* <GeoChart onChange={handleChange} data={data} property={property} countyId={countyId} cityId={cityId} /> */}
                        </div>


                        <div className="col-sm-12 col-md-12  col-lg-6 search-form">
                            <div className="d-flex secondTitle">
                                <i className="fas fa-search" aria-hidden="true" alt="快速搜尋圖示"></i>
                                <h3>一般查詢</h3>
                            </div>
                            {/* onSubmit={submit} */}
                            <Form className="myform" onSubmit={() => {
                                return false;
                            }} >
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        {/* onBlur={e => setCityName(e.target.value)}  */}
                                        <Form.Label htmlFor="縣市別">縣市別</Form.Label>
                                        <Form.Control className="myInput" id="縣市別" as="select" value={cityId} onChange={(e) => {
                                            setCityId(e.target.value)
                                            history.push(`/searchEvent?page=${page}&pageNews=${pageNews}&city=${e.target.value}&org=${organizer}&keyword=${activityTitle}&theme=${activityThemeId}&startDate=${startDate}&endDate=${endDate}&searched=1`)
                                        }}>
                                            <option value="">請選擇</option>
                                            {fetchData.map((fetchData, index) =>
                                                <option key={index} value={fetchData.cityId} >{fetchData.cityName}</option>
                                            )}

                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label htmlFor="startDate">選擇日期</Form.Label>
                                        <div className="d-flex">
                                            <input
                                                className="datePicker myInput"
                                                type="date"
                                                name="startDate"
                                                id="startDate"
                                                onChange={e => setStartDate(e.target.value)}
                                                max={endDate}
                                                defaultValue={paramsSearch.get('startDate')}
                                                title="開始日期"
                                            ></input>
                                            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                                            <div>到</div>
                                            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                                            <input
                                                className="datePicker myInput"
                                                type="date"
                                                name="endDate"
                                                id="endDate"
                                                onChange={e => setEndDate(e.target.value)}
                                                min={startDate}
                                                defaultValue={paramsSearch.get('endDate')}
                                                title="結束日期"
                                            ></input>
                                        </div>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label htmlFor="主辦單位">主辦單位</Form.Label>
                                    <Form.Control type="text" defaultValue={paramsSearch.get('org')} className="myInput" id="主辦單位" placeholder="" onChange={e => setOrganizer(e.target.value)} onKeyPress={e => {
                                        if (e.which === 13) {
                                            submit(e)
                                        }
                                    }} />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label htmlFor="活動名稱">活動名稱</Form.Label>
                                    <Form.Control type="text" className="myInput" id="活動名稱" placeholder="" defaultValue={paramsSearch.get('keyword')} onChange={e => setActivityTitle(e.target.value)} onKeyPress={e => {
                                        if (e.which === 13) {
                                            submit(e)
                                        }
                                    }} />
                                </Form.Group>
                                <Form.Group onChange={() => {
                                    getThemeCheck()
                                }}>
                                    <Form.Label htmlFor="themeCheckbox0">活動主題</Form.Label>
                                    <div className="theme-checkbox-wrapper">
                                        {dropDownTheme.map((dropDown, index) =>
                                            <Form.Check
                                                key={index}
                                                className="theme-checkbox"
                                                type="checkbox"
                                                label={dropDown.themeName}
                                                id={"themeCheckbox" + index}
                                                name="themeCheckbox"
                                                value={dropDown.themeId}
                                                defaultChecked={paramsSearch.get('theme') && paramsSearch.get('theme').includes(index + 1)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>

                                <Button className="searchBtn col-11 col-md-5  col-lg-5" variant="primary" type="submit" onClick={submit}>
                                    送出查詢
                                </Button>
                            </Form>

                        </div>
                    </div>
                    <div className="search-section">
                        <div className="d-flex eventTitle-search">
                            <i className="far fa-folder-open" aria-hidden="true" alt="活動查詢結果圖示"></i>
                            <h3>活動查詢結果</h3>
                        </div>

                        <BottomCarousel loading={loading} SLIDE_COUNTBt={SLIDE_COUNTBt} searchData={searchData} slides={slidesBt} scrollProgress={0.2} pageCount={pageCount} />
                    </div>
                    <>
                        <ReactPaginate
                            forcePage={page - 1}
                            style={{ visibility: loading ? 'hidden' : 'visible' }}
                            previousLabel={'上一頁'}
                            nextLabel={'下一頁'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(data) => handlePageClick(data, setPage, "page")}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                        />
                    </>


                    <div ref={localNewsRef} className="search-section news-section">
                        <div className="d-flex eventTitle-news">
                            <i className="far fa-folder-open" aria-hidden="true" alt="地方消息結果圖示"></i>
                            <h3>地方消息查詢結果</h3>
                        </div>

                        <div className="result-outter-wrapper">
                            <div className="search-result-wrapper">
                                <div className="office-sorted-wrapper">
                                    <h4 className="result-title">查詢結果 :</h4>
                                    <h4 className="search-result-value">此頁{searchCount > 10 ? 10 : searchCount}筆</h4>
                                    <h4 className="search-result-value">共有{searchCount}筆</h4>
                                    <h4 className="search-result-value">第{page}/{pageCountNews}頁 </h4>
                                </div>

                                <div className="search-result"><h4 className="result-title">最後更新日期:{updateTime}</h4></div>

                            </div>
                        </div>
                        {bScrollToLocalNews && ScrollToLocalNews()}

                        <div className="">
                            {newsLoading ? <Loader loading={newsLoading} /> :
                                <div className="table-outter-wrapper">
                                    {newsData.length === 0 ?
                                        <p>沒有相關結果喔~</p>
                                        :
                                        <table className="review-card-news rwd-table">
                                            <thead className="text-content-wrapper_news">
                                                <tr>
                                                    <th>活動名稱</th>
                                                    <th>活動開始時間</th>
                                                    <th>活動結束時間</th>
                                                    <th>主辦單位</th>
                                                    <th>  </th>
                                                </tr>
                                            </thead>
                                            <tbody className="card-content-news news-content-green">
                                                {tableData}
                                            </tbody>
                                        </table>
                                    }
                                </div>
                            }
                        </div>
                    </div>

                    <>
                        <ReactPaginate
                            forcePage={pageNews - 1}
                            style={{ visibility: newsLoading ? 'hidden' : 'visible' }}
                            previousLabel={'上一頁'}
                            nextLabel={'下一頁'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCountNews}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(data) => handlePageClick(data, setPageNews, "pageNews")}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                        />
                    </>


                </div>
                <SideBtn history={history} />
                <Footer />
            </HelmetProvider>
        </>
    );
}

export default withRouter(SearchEvent);
