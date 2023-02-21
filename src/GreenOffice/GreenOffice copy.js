import React, { useState, useEffect, useRef } from 'react';
import './greenOffice.scss';
import Footer from '../Components/Footer';
import BreadCrumb from '../Components/BreadCrumb';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { formatDateDot } from '../utils/Functions';
import LeefImg from '../images1/greenOffice/main/bannerLeef.png';
import bookImg from '../images1/greenOffice/main/book.png';
import checkImg from '../images1/greenOffice/main/check.png';
import manImg from '../images1/greenOffice/main/man.png';
import topBanner from '../images1/greenOffice/main/topBanner.jpg';
import energyImg from '../images1/greenOffice/main/fivepoint/energy.png';
import environmentImg from '../images1/greenOffice/main/fivepoint/env.png';
import promoteImg from '../images1/greenOffice/main/fivepoint/promote.png';
import reduceImg from '../images1/greenOffice/main/fivepoint/reduce.png';
import shopImg from '../images1/greenOffice/main/fivepoint/shop.png';
import earth5Img from '../images1/greenOffice/earth.png';
import reduce5Img from '../images1/greenOffice/reduce.png';
import greenShop5Img from '../images1/greenOffice/greenShop.png';
import leef5Img from '../images1/greenOffice/leef.png';
import promote5Img from '../images1/greenOffice/promote.png';
import { ReactComponent as TaiwanSVG } from '../taiwanMap.svg'
import { select } from "d3";

function GreenOffice(props) {
    let SSL = props.SSL
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'
    var serialize = require('serialize-javascript');
    var d3 = require("d3");
    const svgRef = useRef();
    const tooltipRef = useRef();

    const [point, setPoint] = useState("0")

    useEffect(() => {
        const svg = select(svgRef.current);
        svg
            .style("position", "relative")
            .selectAll('.section')
            .style("fill", function (d) {
                return getSvgColor(this.id)
            })
            //滑鼠事件發生時 改變的CSS
            .on("click", function (i) {
                tooltip.style("visibility", "hidden")
                d3.selectAll(".myTooltip-map").attr("visibility", "hidden").classed("myTooltip-map", false)
            })
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
            .on("mouseover", function (d) {
                tooltip.style("opacity", "1");
                tooltip
                    .style("top", (d.clientY - 360) + "px")
                    .style("left", (d.clientX - 260) + "px")
                    .html(decodeURIComponent(JSON.parse(`"${d3.select(this).attr("name")}"`)) + "<br/>" + "<div class=myWrapper><h6 class=myText-title>參與企業&nbsp;</h6><h6 class=tooltip-value>123家</h6></div>" + "<br/>" + "<div class=myWrapper><h6 class=myText-title>參與機關&nbsp;</h6><h6 class=tooltip-value>123家</h6></div>")

                d3.select(this)
                    .classed("hovered", true)

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

                svg.selectAll('.section')
                    .style("opacity", "1")
                    .classed("hovered", false)
            });
    })

    //綠色辦公-首頁文章
    const [article, setArticle] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Article/Top2`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setArticle(result.resultObject)
                }
                console.log(result)
            });
    }, [])

    //綠色辦公-響應5類指標 & 縣市數據
    const [joinData, setJoinData] = useState([]);
    // const [targetData1, setTargetData1] = useState([]);
    // const [targetData2, setTargetData2] = useState([]);
    // const [targetData3, setTargetData3] = useState([]);
    // const [targetData4, setTargetData4] = useState([]);
    // const [targetData5, setTargetData5] = useState([]);
    const [cityReports, setCityReports] = useState([]);

    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/Report`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setJoinData(result.resultObject.totalReport)
                    // setTargetData1(result.resultObject.targetReports[0])
                    // setTargetData2(result.resultObject.targetReports[1])
                    // setTargetData3(result.resultObject.targetReports[2])
                    // setTargetData4(result.resultObject.targetReports[3])
                    // setTargetData5(result.resultObject.targetReports[4])
                    setCityReports(result.resultObject.cityReports)
                }
                console.log(result.resultObject)
            });
    }, [])


    //各指標數據
    const [detailData, setDetailData] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/ByTarget/${point}`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setDetailData(result.resultObject)
                }
            });
    }, [point])


    const [sortName, setSortName] = useState(false);
    const [sortDate, setSortDate] = useState(true);
    const [sortCity, setSortCity] = useState(false);
    const [sortType, setSortType] = useState(false);
    const [sortCount, setSortCount] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const [count, setCount] = useState("4");

    const [sortTable, setSortTable] = useState([]);
    useEffect(() => {
        console.log(sort === 3)
        let uri = `${SSL}//${domain}/api/api/GOffice/Participate/ComplexSearch`
        fetch(uri, {
            method: 'POST',
            body: serialize({
                SortName: String(sort === 3),
                SortDate: String(sort === 0),
                SortCity: String(sort === 1),
                SortIdType: String(sort === 2),
                SortCount: String(sort === 4),
                Page: String(page),
                Count: count
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result.resultObject)
                if (result.isSucess) {
                    setSortTable(result.resultObject.participates)
                    setPageCount(result.resultObject.pageCount)
                }

            });
    }, [sort])


    const getSvgColor = (id) => {
        function pad(d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        }
        var index = cityReports.findIndex(city => city.cityId === pad(id))
        if (index !== -1) {
            return cityReports[index].color
        }
    }

    const getCityColor = (id) => {
        var index = cityReports.findIndex(city => city.cityId === id)
        if (index !== -1) {
            return cityReports[index].color
        }
    }

    const getCityData = (id) => {
        function pad(d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        }
        var index = cityReports.findIndex(city => city.cityId === pad(id))
        if (index !== -1) {
            return cityReports[index]
        }
    }

    const barColor = ["#395627", "#55813B", "#AAD092", "#C6DFB6", "#E2F0DA"]

    const tableData = (
        // fetchData.map((data, index) => {
        // const { createTime, guid, title, pdf, odf, doc, mP4, typeName, detailName } = data
        // return (
        // key={index} id={guid}
        <>
            <tr>
                <td data-title="審查狀態" className="list-date">臺北市</td>
                <td data-title="評核計分" className="download-time">企業團體</td>
                <td data-title="組織性質">環資國際有限公司</td>
                <td data-title="響應措施數量">16</td>
            </tr>

            <tr>
                <td data-title="審查狀態" className="list-date">臺北市</td>
                <td data-title="評核計分" className="download-time">企業團體</td>
                <td data-title="組織性質">環資國際有限公司</td>
                <td data-title="響應措施數量">16</td>
            </tr>
        </>
        // )
        // })
    )

    console.log(detailData)


    return (
        <>
            <BreadCrumb currentPage={"綠色辦公"} />
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="Button-wrapper">
                <Link className="btn-link">
                    <button className="onfocus bannerButton bannerButton-line">
                        <img src={LeefImg} alt="綠色辦公-簡介" title="綠色辦公-簡介" />
                        &nbsp;簡介
                    </button>
                </Link>
                <Link className="btn-link">
                    <button className="bannerButton bannerButton-line ">
                        <img src={bookImg} alt="綠色辦公-經驗分享" title="綠色辦公-經驗分享" />
                        &nbsp;經驗分享
                    </button>
                </Link>
                <Link className="btn-link">
                    <button className="bannerButton bannerButton-line">
                        <img src={checkImg} alt="綠色辦公-響應指標" title="綠色辦公-響應指標" />
                        &nbsp;響應指標
                    </button>
                </Link>
                <Link className="btn-link">
                    <button className="bannerButton bannerButton-line none-line">
                        <img src={manImg} alt="綠色辦公-綠色夥伴" title="綠色辦公-綠色夥伴" />
                        &nbsp;綠色夥伴
                    </button>
                </Link>
            </div>


            <div className="joinGreenOffice">
                <div className="joinGreenOfficeContent">
                    <div className="text-wrapper">
                        <h3 className="office-main-title greenIntroduction">綠色辦公簡介</h3>
                        <p className="spaceTwo"> &emsp;&emsp;聯合國發布永續發展目標SDGs後，成為近年來各國政府與企業積極發展環保行動的重要指標。而「綠色辦公計畫」不僅是呼應SDGs，更著重我們日常辦公當中，每個人都可實踐的環保行動。</p>
                        <p className="spaceTwo">&emsp;&emsp;我們在「<span className="greenIntrodcctionBlueChoose">節省能資源</span>」、「<span className="greenIntrodcctionBlueChoose">源頭減量</span>」、「<span className="greenIntrodcctionBlueChoose">綠色採購</span>」、「<span className="greenIntrodcctionBlueChoose">環境綠美化</span>」和「<span className="greenIntrodcctionBlueChoose">宣導倡議</span>」等五大指標，個別提供簡單易行的措施，期望號召各機關、學校、企業團體及所屬成員們共同響應，打造友善環境的綠色辦公場域，並建立每個人的綠生活習慣。</p>
                        <p className="spaceTwo">&emsp;&emsp;讓我們一起<span className="greenIntrodcctionBlueChoose">付諸行動</span>，從辦公室落實更美好的綠色生活！</p>
                        <div className="btn-wrapper">
                            <Link to="/categories/green_office/apply" className="office-join-btn" href="#">我要響應</Link>
                        </div>
                    </div>
                </div>
                <div className="joinGreenOfficeImg">
                    <img src={topBanner} />
                </div>
            </div>

            <div className="env-response-wrapper">
                <div className="content-wrapper">
                    <div className="envResponseHead">
                        <div className="envResponseHeadLeft">
                            <h3 className="office-main-title environmentResponse">經驗分享</h3>
                        </div>
                        <Link className="envResponseHead-btn">更多資訊</Link>
                    </div>

                    <div className="envResponseContent">
                        {article.map((data, index) =>
                            <Link key={index} className="content-wrapper" to={`/categories/green_office/article?${data.guid}`}>
                                <img src={data.picHref} />
                                <div className="award-btn">
                                    {data.tags.map((tag, index) =>
                                        <div key={index} className="companyAwards"
                                            style={tag.officeArticleTagId === 1 ?
                                                { background: "#ffc251" }
                                                : tag.officeArticleTagId === 3 ?
                                                    { background: '#0066ff' }
                                                    : { background: "#cc3300" }
                                            }>{tag.officeArticleTagName}</div>
                                    )}
                                    <p>{formatDateDot(data.createTime)}</p>
                                </div>
                                <p className="env-response-title">{data.title}</p>
                                <p className="env-response-desc">{data.content}</p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="envResponse5PointHead row">
                <div className="envResponse5PointHeadLeft col-6">
                    <h3 className="office-main-title environmentResponsePoint">綠⾊辦公響應 5 類指標 </h3>
                </div>
                <div className="col-6 point-text-wrapper">
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.govCount}家</p>
                        <p className="envResponse5PointHeadRightSmall">企業</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.companyCount}處</p>
                        <p className="envResponse5PointHeadRightSmall">機關</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.allItem}項</p>
                        <p className="envResponse5PointHeadRightSmall">措施</p>
                    </div>
                </div>
            </div>


            <div className="envRes5PointContent">
                <div className="innerContent">
                    <div className="front-card">
                        <img className="bg-img" src={energyImg} />
                        <div className="colored-detail energy">
                            <p>01節省能資源</p>
                            <div className="img-wrapper"><img src={earth5Img} /></div>
                        </div>
                    </div>
                    <div className="back-card energy">
                        <div className="back-card-inner">
                            <h5>指標1  節省能資源</h5>
                            <div className="inner-list">
                                <div>
                                    <p>節約用電</p>
                                    <p>節約用水</p>
                                    <p>節約用油</p>
                                    <p>節約用紙</p>
                                    <p>視訊會議</p>
                                </div>
                            </div>
                            <div className="data-wrapper">
                                {/* <div className="text-wrapper">
                                    <p>{targetData1.companyCount}家</p>
                                    <p>企業</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData1.govCount}處</p>
                                    <p>機關</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData1.itemCount}項</p>
                                    <p>措施</p>
                                </div> */}
                            </div>
                            <div className="info-btn">更多資訊</div>

                        </div>
                    </div>
                </div>
                <div className="innerContent ">
                    <div className="front-card">
                        <img className="bg-img" src={reduceImg} />
                        <div className="colored-detail reduce">
                            <p>02源頭減量</p>
                            <div className="img-wrapper"><img src={reduce5Img} /></div>
                        </div>
                    </div>
                    <div className="back-card reduce">
                        <div className="back-card-inner">
                            <h5>指標2  源頭減量</h5>
                            <div className="inner-list">
                                <div>
                                    <p>減塑減廢</p>
                                    <p>垃圾分類</p>
                                    <p>回收再利用</p>

                                </div>
                            </div>
                            <div className="data-wrapper">
                                {/* <div className="text-wrapper">
                                    <p>{targetData2.companyCount}家</p>
                                    <p>企業</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData2.govCount}處</p>
                                    <p>機關</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData2.itemCount}項</p>
                                    <p>措施</p>
                                </div> */}
                            </div>
                            <div className="info-btn">更多資訊</div>
                        </div>
                    </div>
                </div>
                <div className="innerContent">
                    <div className="front-card">
                        <img className="bg-img" src={shopImg} />
                        <div className="colored-detail shop">
                            <p>03綠色採購</p>
                            <div className="img-wrapper"><img src={greenShop5Img} /></div>
                        </div>
                    </div>
                    <div className="back-card shop">
                        <div className="back-card-inner">
                            <h5>指標3  綠色採購</h5>
                            <div className="inner-list">
                                <div>
                                    <p>用品採購</p>
                                    <p>綠色場域</p>
                                </div>
                            </div>
                            <div className="data-wrapper">
                                {/* <div className="text-wrapper">
                                    <p>{targetData3.companyCount}家</p>
                                    <p>企業</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData3.govCount}處</p>
                                    <p>機關</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData3.itemCount}項</p>
                                    <p>措施</p>
                                </div> */}
                            </div>
                            <div className="info-btn">更多資訊</div>
                        </div>
                    </div>
                </div>

                <div className="innerContent">
                    <div className="front-card">
                        <img className="bg-img" src={environmentImg} />
                        <div className="colored-detail environment">
                            <p>04環境綠美化</p>
                            <div className="img-wrapper"><img src={leef5Img} /></div>
                        </div>
                    </div>
                    <div className="back-card environment">
                        <div className="back-card-inner">
                            <h5>指標4  環境綠美化</h5>
                            <div className="inner-list">
                                <div>
                                    <p>綠化植栽</p>
                                    <p>維護環境</p>
                                    <p>安全管理</p>
                                </div>
                            </div>
                            <div className="data-wrapper">
                                {/* <div className="text-wrapper">
                                    <p>{targetData4.companyCount}家</p>
                                    <p>企業</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData4.govCount}處</p>
                                    <p>機關</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData4.itemCount}項</p>
                                    <p>措施</p>
                                </div> */}
                            </div>
                            <div className="info-btn">更多資訊</div>
                        </div>
                    </div>
                </div>
                <div className="innerContent">
                    <div className="front-card">
                        <img className="bg-img" src={promoteImg} />
                        <div className="colored-detail promote">
                            <p>05宣導倡議</p>
                            <div className="img-wrapper"><img src={promote5Img} /></div>
                        </div>
                    </div>
                    <div className="back-card promote">
                        <div className="back-card-inner">
                            <h5>指標5  倡議宣導</h5>
                            <div className="inner-list">
                                <div>
                                    <p>教育宣導</p>
                                    <p>環保行動</p>
                                    <p>其他</p>
                                </div>
                            </div>
                            <div className="data-wrapper">
                                {/* <div className="text-wrapper">
                                    <p>{targetData5.companyCount}家</p>
                                    <p>企業</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData5.govCount}處</p>
                                    <p>機關</p>
                                </div>
                                <div className="text-wrapper">
                                    <p>{targetData5.itemCount}項</p>
                                    <p>措施</p>
                                </div> */}
                            </div>
                            <div className="info-btn">更多資訊</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="responsePointTop">
                <div className="responsePointTopHead">
                    <h3>響應指標 TOP</h3>
                </div>
                <div className="content-wrapper">
                    <div className="responsePointTopChoose col-4">
                        <div className="btn-wrapper">
                            <div onClick={() => setPoint("0")} className={point == "0" ? "classPointBackground active all" : "classPointBackground all"}><Link>All</Link></div>
                            <div onClick={() => setPoint("1")} className={point === "1" ? "classPointBackground energy active" : "classPointBackground energy"}><Link>指標1 節省能資源</Link></div>
                            <div onClick={() => setPoint("2")} className={point === "2" ? "classPointBackground reduce active" : "classPointBackground reduce"}><Link>指標2 源頭減量</Link></div>
                            <div onClick={() => setPoint("3")} className={point === "3" ? "classPointBackground shop active" : "classPointBackground shop"}><Link>指標3 綠色採購</Link></div>
                            <div onClick={() => setPoint("4")} className={point === "4" ? "classPointBackground environment active" : "classPointBackground environment"}><Link>指標4 環境綠美化</Link></div>
                            <div onClick={() => setPoint("5")} className={point === "5" ? "classPointBackground promote active" : "classPointBackground promote"}><Link>指標5 宣導倡議</Link></div>
                        </div>
                    </div>

                    <div className="responsePointTopChart col-8">
                        {detailData.map((data, index) =>
                            <div className="bar-text-wrapper">
                                <div className="point-title-wrapper">
                                    <h5>{data.title}</h5><i class="far fa-question-circle" aria-hidden="true" alt={`${data.title}圖示`}></i>
                                    <div className="point-desc">{data.desc}</div>
                                </div>
                                <div className="col-9">
                                    <div className="bar-div" style={{ width: data.percent + '%', background: barColor[index] }}>
                                        <div className="point-percent">{data.percent}%</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="greenFriend">
                <div className="greenFriendHead">
                    <h3 className="office-main-title greenEnvironmentFriend">綠色夥伴</h3>
                </div>

                <div className="greenFriendContent">
                    <div className="greenFriendContentMap col-sm-12 col-md-11  col-lg-6">
                        <div className="taiwan-svg">
                            <div ref={tooltipRef}></div>
                            <TaiwanSVG ref={svgRef} className="taiwan-svg" alt="taiwan-svg" />
                        </div>
                        <div className="office-tooltip">
                            <div className="tooltip-thead">
                                <h6>圖例</h6>
                                <h6>家數</h6>
                            </div>
                            <div className="tooltip-content">
                                <div className="d-flex">
                                    <div style={{ background: "#cef1ce" }} className="circle"></div>
                                    <div className="text-wrapper">
                                        <h6>1</h6></div>
                                </div>
                                <div className="d-flex">
                                    <div style={{ background: "#adf3ad" }} className="circle"></div>
                                    <div className="text-wrapper"><h6>2~50</h6></div>
                                </div>
                                <div className="d-flex">
                                    <div style={{ background: "#67d367" }} className="circle"></div>
                                    <div className="text-wrapper"><h6>51~200</h6></div>
                                </div>
                                <div className="d-flex">
                                    <div style={{ background: "green" }} className="circle"></div>
                                    <div className="text-wrapper"><h6>201以上</h6></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mapData-wrapper col-sm-12 col-md-12  col-lg-6 ">
                        <div className="greenFriendContentJoinPercent allCountryJoinPercent">
                            <div className="allCountryJoinPercentTitle">各縣市綠⾊辦公參與率</div>
                            <div className="allCountryJoinPercentCountry">
                                <div className="city-wrapper"><div className="d-flex"><span className="greenAllCountryPercentColume1">臺北市</span><div style={{ background: getCityColor("01") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">基隆市</span><div style={{ background: getCityColor("03") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">嘉義市</span><div style={{ background: getCityColor("12") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">臺東縣</span><div style={{ background: getCityColor("01") }} className="circle"></div></div></div>
                                <div className="city-wrapper"><div className="d-flex"><span className="greenAllCountryPercentColume1">新北市</span><div style={{ background: getCityColor("02") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">新竹市</span><div style={{ background: getCityColor("05") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">嘉義縣</span><div style={{ background: getCityColor("13") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">澎湖縣</span><div style={{ background: getCityColor("20") }} className="circle"></div></div></div>
                                <div className="city-wrapper"><div className="d-flex"><span className="greenAllCountryPercentColume1">臺中市</span><div style={{ background: getCityColor("08") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">新竹縣</span><div style={{ background: getCityColor("06") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">屏東縣</span><div style={{ background: getCityColor("16") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">連江縣</span><div style={{ background: getCityColor("22") }} className="circle"></div></div></div>
                                <div className="city-wrapper"><div className="d-flex"><span className="greenAllCountryPercentColume1">臺南市</span><div style={{ background: getCityColor("14") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">苗栗縣</span><div style={{ background: getCityColor("07") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">南投縣</span><div style={{ background: getCityColor("10") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">金門縣</span><div style={{ background: getCityColor("21") }} className="circle"></div></div></div>
                                <div className="city-wrapper"><div className="d-flex"><span className="greenAllCountryPercentColume1">高雄市</span><div style={{ background: getCityColor("15") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">彰化縣</span><div style={{ background: getCityColor("09") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">宜蘭縣</span><div style={{ background: getCityColor("17") }} className="circle"></div></div></div>
                                <div className="city-wrapper"><div className="d-flex"><span className="greenAllCountryPercentColume1">桃園市</span><div style={{ background: getCityColor("04") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">雲林縣</span><div style={{ background: getCityColor("11") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">花蓮縣</span><div style={{ background: getCityColor("18") }} className="circle"></div></div></div>
                            </div>
                        </div>
                        <div className="greenFriendContentResName">

                            <div className="title-input-wrapper">
                                <h4>響應名單</h4>
                                <label for="list-input"></label>
                                <input
                                    // value={keyWord}
                                    type="text"
                                    name="list-input"
                                    id="list-input"
                                    placeholder="請輸入關鍵字"
                                // onKeyPress={e => {
                                //     if (e.which === 13) {
                                //         fetchDataFunction(false)
                                //     }
                                // }}
                                // onChange={e => setKeyWord(e.target.value === "" ? " " : e.target.value)}
                                />
                            </div>
                            <div className="table-outter-wrapper">
                                <table className="review-card rwd-table">
                                    <thead className="text-content-wrapper">
                                        <tr>
                                            <th>縣市</th>
                                            <th>性質</th>
                                            <th>單位名稱</th>
                                            <th>響應措施數量</th>
                                        </tr>
                                    </thead>
                                    <tbody className="card-content">
                                        {tableData}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>





            <Footer />
        </>
    );
}

export default withRouter(GreenOffice);