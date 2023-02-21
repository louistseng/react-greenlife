import React, { useState, useEffect, useRef } from 'react';
import './greenOffice.scss';
import BreadCrumb from '../Components/BreadCrumb';
import ComfirmAlert from '../Components/ComfirmAlert';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import SideBtnOffice from '../Components/SideBtnOffice';
import { formatDateDot, formatDate, getBgColor, pad, clickLogout, checkAuth } from '../utils/Functions';
import { getMemberProfile } from '../utils/API';
import greenOfficeBanner from '../images1/flip/office/topBanner.jpg';
import LeefImg from '../images1/greenOffice/main/bannerLeef.png';
import bookImg from '../images1/greenOffice/main/book.png';
import checkImg from '../images1/greenOffice/main/check1.png';
import manImg from '../images1/greenOffice/main/man1.png';
import IntroBanner from '../images1/greenOffice/main/topBanner.jpg';
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


import { ReactComponent as TaiwanSVG } from '../taiwanMap-office.svg'
import { select } from "d3";

import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";

const Footer = React.lazy(() => import('../Components/Footer'));

function GreenOffice(props) {

    let SSL = props.SSL
    let domain = props.domain
    //引入router路徑紀錄
    let history = useHistory()
    //地圖SVG
    var d3 = require("d3");
    const svgRef = useRef();
    const tooltipRef = useRef();

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identity = greenlifeCookies.identityType || 0;

    const [memberInfo, setMemberInfo] = useState([]);

    const [point, setPoint] = useState(0)
    const [percentType, setPercentType] = useState(false)

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [showNote, setShowNote] = useState(true);

    const { hash } = window.location;

    //點閱計數API
    useEffect(() => {
        clickRecord("256A18B2-4213-4FDA-B64F-4552100B53AE", "10", collector)
    }, [collector]);

    useEffect(() => {

        const svg = select(svgRef.current);
        svg
            .style("position", "relative")
            .selectAll('.section')
            .style("fill", function (d) {
                return getCityColor(pad(this.id))
            })

        //定義縣市小標籤
        const tooltipSvg = select(tooltipRef.current);
        var tooltip = tooltipSvg
            .append("div")
            .attr("class", "myTooltip-office")
            .style("position", "absolute")
            .style("opacity", "0")
            .style("transition", "all .3s")
        svg
            .selectAll('.section')

            .on("mouseover", function (d) {
                if (getCityData(d.target.id)) {
                    tooltip.style("opacity", "1");
                    tooltip
                        .style("top", (d.clientY - 300) + "px")
                        .style("left", (d.clientX - 300) + "px")
                        .html(decodeURIComponent(JSON.parse(`"${d3.select(this).attr("name")}"`)) + "<br/>" + `<div class=myWrapper><h4 className=myText-title>企業&nbsp;</h4><h4 className=tooltip-value>${percentType ? getCityData(d.target.id).comPercent + "%" : getCityData(d.target.id).comTotal + "家"}</h4></div><br/><div class=myWrapper><h4 className=myText-title>機關&nbsp;</h4><h4 className=tooltip-value>${percentType ? getCityData(d.target.id).govPercent + "%" : getCityData(d.target.id).govTotal + "家"}</h4></div><br/><div class=myWrapper><h4 className=myText-title>學校&nbsp;</h4><h4 className=tooltip-value>${percentType ? getCityData(d.target.id).schoolPercent + "%" : getCityData(d.target.id).schoolTotal + "家"}</h4></div><br/><div class=myWrapper><h4 className=myText-title>團體&nbsp;</h4><h4 className=tooltip-value>${percentType ? getCityData(d.target.id).groupPercent + "%" : getCityData(d.target.id).groupTotal + "家"}</h4></div>`)
                    d3.select(this)
                        .classed("hovered", true)
                    svg
                        .selectAll('.section')
                        .filter(function () {
                            return !this.classList.contains('myTooltip-map') && !this.classList.contains('hovered')
                        })
                        .style("opacity", ".1")
                }
            })
            .on("mouseout", function () {
                tooltip.style("opacity", "0")
                d3.selectAll(".myTooltip-map").attr("visibility", "hidden")
                //.classed("myTooltip-map", false)
                svg.selectAll('.section')
                    .style("opacity", "1")
                    .classed("hovered", false)
            });
    });

    //綠色辦公-首頁文章
    const [article, setArticle] = useState([]);
    useEffect(() => {
        // console.log(greenlifeCookies)
        fetch(`${SSL}//${domain}/api/api/GOffice/Article/Top2`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setArticle(result.resultObject)
                }
                if (hash) {
                    const id = hash.replace('#', '');
                    const element = document.getElementById(id)
                    if (element) {
                        element.scrollIntoView()
                    }
                }
            });

    }, [SSL, domain])

    //綠色辦公-響應5類指標 & 縣市數據
    const [joinData, setJoinData] = useState([]);
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
                    setCityReports(result.resultObject.cityReports)
                }

            });
    }, [SSL, domain])


    //各指標標題與ID
    const [pointTitle, setPointTitle] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/Target`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setPointTitle(result.resultObject)
                }
            });
    }, [SSL, domain])

    //各指標數據
    const [detailData, setDetailData] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/ByTarget/${point}`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setDetailData(result.resultObject)
                }
            });
    }, [point, SSL, domain])



    const getCityColor = (id) => {
        var index = cityReports.findIndex(city => city.cityId === id)
        if (index !== -1) {
            return cityReports[index].color
        }
    }

    const getCityData = (id) => {
        var index = cityReports.findIndex(city => city.cityId === pad(id))
        if (index !== -1) {
            return cityReports[index]
        }
    }
    const barName = ["energy", "reduce", "shop", "environment", "promote"]


    const [sortTable, setSortTable] = useState([]);

    //綠色辦公-首頁文章
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/Top4`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setSortTable(result.resultObject)
                }
                // console.log(result)
            });
    }, [SSL, domain])


    //綠色辦公-判斷組織權限
    useEffect(() => {
        if (collector && memberToken) {
            getMemberProfile(collector, memberToken, clickLogout, removeCookie)
                .then(result => {
                    if (result.isSucess) {
                        setMemberInfo(result.resultObject)
                    }
                })
        }
    }, [collector, memberToken])


    const tableData = (
        sortTable.map((data, index) => {
            const { createTime, cityName, identityName, name, participateCount } = data
            return (
                <tr key={index}>
                    <td data-title="日期" className="list-date">{formatDate(createTime)}</td>
                    <td data-title="縣市" className="list-date">{cityName}</td>
                    <td data-title="性質" className="download-time">{identityName}</td>
                    <td data-title="單位名稱" className="table-align-left">{name}</td>
                    <td data-title="響應措施數量">{participateCount}</td>
                </tr>
            )
        })
    )


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle={showNote ? "" : "若權限與實際不符，請撥打平台客服專線由專人為您服務"} showLoginBtn={showNote} history={props.history} showNote={showNote} />
            }
            <BreadCrumb currentPage={"響應綠色辦公"} />
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src={greenOfficeBanner} />
            <div className="Button-wrapper">
                {/* onClick={() => checkAuth(memberToken, setShowDialog, setAlertTitle, identity)} */}
                {/* to={memberToken ? identity === 2 || 3 || 4 || 5 || 6 ? "/categories/green_office/apply/evaluation" :  "#" : greenlivingToken ? "/categories/green_office/apply" : "#"} */}
                <Link className="btn-link" onClick={() => checkAuth(identity, memberInfo.unitCode, setShowDialog, setAlertTitle, setShowNote, history)} to={memberToken ? (identity === "2" || identity === "4") ? Boolean(memberInfo?.unitCode?.match(/-0|-GL$/g)) ? "/categories/green_office/evaluation" : "/categories/green_office" : "/categories/green_office/evaluation" : "#"} title="前往連結">
                    <button className="bannerButton-office bannerButton-line">
                        <img src={LeefImg} alt="綠色辦公-簡介" title="綠色辦公-簡介" />
                        {/* <span id="a"> &nbsp;預計5/7上線</span> */}
                        &nbsp;我要響應
                        {/* <span id="b"></span> */}
                    </button>
                </Link>

                <HashLink className="btn-link" to="/categories/green_office#article">
                    <button className="bannerButton-office bannerButton-line ">
                        <img src={bookImg} alt="綠色辦公-經驗分享" title="綠色辦公-經驗分享" />
                        &nbsp;經驗分享
                    </button>
                </HashLink>
                <HashLink className="btn-link" to="/categories/green_office#point">
                    <button className="bannerButton-office bannerButton-line">
                        <img src={checkImg} alt="綠色辦公-響應指標" title="綠色辦公-響應指標" />
                        &nbsp;響應指標
                    </button>
                </HashLink>
                <HashLink className="btn-link" to="/categories/green_office#partner">
                    <button className="bannerButton-office bannerButton-line none-line">
                        <img src={manImg} alt="綠色辦公-綠色夥伴" title="綠色辦公-綠色夥伴" />
                        &nbsp;綠色夥伴
                    </button>
                </HashLink>
            </div>


            <div className="joinGreenOffice row">
                <div className="joinGreenOfficeContent col-sm-12 col-md-6 col-lg-6">
                    <div className="text-wrapper">
                        <div id="intro" style={{ position: "absolute", top: "-145px", left: "0" }}></div>
                        {/* <h3 className="office-main-title greenIntroduction">綠色辦公簡介</h3> */}
                        <p className="spaceTwo"> &emsp;&emsp;我國推動辦公室節能減碳、綠色採購已行之多年，包括自85年推動「各級機關辦公室推行環境保護運動須知」，86年舉辦「辦公室做環保績優單位選拔」活動，91年執行「機關綠色採購推動方案」，97年推動「政府機關及學校全面節能減碳措施」，100年推動「政府機關及學校四省計畫」等，鼓勵各機關應倡導並推行辦公室減廢、資源回收及再利用、環境管理等環境保護工作，以為民間企業團體表率。</p>
                        <p className="spaceTwo"> &emsp;&emsp;為宣傳國人從日常辦公中簡單力行綠生活，經綜整簡單易行的辦公100項環保措施，分別就「<Link to="/categories/green_office/conserve_energy">節省能資源</Link>」、「<Link to="/categories/green_office/source_reduction">源頭減量</Link>」、「<Link to="/categories/green_office/green_procurement">綠色採購</Link>」、「<Link to="/categories/green_office/green_beautification">環境綠美化</Link>」和「<Link to="/categories/green_office/advocacy">宣導倡議</Link>」5大指標，挑選35項列為主要響應綠色辦公措施，國內企業、機關、學校或團體等只要響應25項（含）以上，並對員工推廣綠生活訊息者，即可成為「綠色夥伴」的一員，更歡迎綠色夥伴們提供經驗分享，彼此學習精進，除了員工辦公更環保之外，又可節省成本及兼顧員工健康、安全。</p>
                        {/* <p className="spaceTwo">&emsp;&emsp;讓我們一起<span className="greenIntrodcctionBlueChoose">付諸行動</span>，從辦公室落實更美好的綠色生活！</p> */}
                        <div className="btn-wrapper">
                            <Link to="/categories/green_office/steps" className="office-join-btn" title="前往連結">響應綠色辦公措施</Link>
                            {/* <div id="l">&emsp;預計5/7上線&emsp;</div> */}
                            {/* <div id="k"></div> */}
                            <Link className="office-join-btn" onClick={() => checkAuth(identity, memberInfo.unitCode, setShowDialog, setAlertTitle, setShowNote, history)} to={memberToken ? (identity === "2" || identity === "4") ? Boolean(memberInfo?.unitCode?.match(/-0|-GL$/g)) ? "/categories/green_office/evaluation" : "/categories/green_office" : "/categories/green_office/evaluation" : "#"} title="前往連結">加入綠色辦公行列</Link>
                            {/* <div to={memberToken ? identity === 2 || 3 || 4 || 5 || 6 ? "/categories/green_office/evaluation" : "#" : greenlivingToken ? "/categories/green_office/apply" :"#"} className="office-join-btn" href="#">加入綠色辦公行列</div> */}
                            {/* <div id="i">  </div> */}
                            {/* <div id="j">&emsp;預計5/7上線&emsp;</div> */}
                            {/* onClick={() => checkAuth(memberToken, setShowDialog, setAlertTitle, identity)} */}
                        </div>
                    </div>
                </div>
                <div className="joinGreenOfficeImg col-sm-12 col-md-6 col-lg-6">
                    <img src={IntroBanner} alt="綠色辦公簡介" title="綠色辦公簡介" />
                </div>
            </div>

            <div className="env-response-wrapper">
                <div className="content-wrapper">
                    <div className="envResponseHead">
                        <div className="envResponseHeadLeft">
                            <div id="article" style={{ position: "absolute", top: "-145px", left: "0" }}></div>
                            <h1 id="article" className="office-main-title environmentResponse">經驗分享</h1>
                        </div>
                        <Link to="/categories/green_office/shared_articles?page=1&type=&sort=&city=&n=" className="envResponseHead-btn" title="前往連結">更多資訊</Link>
                    </div>

                    <div className="envResponseContent">
                        {article.map((data, index) =>
                            <Link key={index} className="content-wrapper" to={`/categories/green_office/shared_articles/mypage?${data.guid}`} title="前往連結">
                                <img src={data.picHref} alt={data.title} title={data.title} />
                                <div className="award-btn">
                                    {data.tags.map((tag, index) =>
                                        <div key={index} className="companyAwards"
                                            style={getBgColor(tag.officeArticleTagId)}>
                                            {tag.officeArticleTagName}</div>
                                    )}
                                    <p>{formatDateDot(data.createTime)}</p>
                                </div>
                                <p className="env-response-title">{data.title}</p>
                                {/* <div className="office-article-content env-response-desc">
                                    {data.content.split('<br>').slice(0, 2).map((items, index) =>
                                        <p key={index}>&emsp;&emsp;{items}</p>
                                    )}
                                </div> */}
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="envResponse5PointHead row">
                <div className="envResponse5PointHeadLeft col-sm-12 col-md-5 col-lg-5">
                    <div id="point" style={{ position: "absolute", top: "-145px", left: "0" }}></div>
                    <h2 className="office-main-title environmentResponsePoint">綠⾊辦公響應 5 類指標 </h2>
                </div>
                <div className="col-sm-12 col-md-7 col-lg-7 point-text-wrapper">
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.govCount}個</p>
                        <p className="envResponse5PointHeadRightSmall display-computer">機關響應</p>
                        <p className="envResponse5PointHeadRightSmall display-mobile">機關</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.schoolCount}間</p>
                        <p className="envResponse5PointHeadRightSmall display-computer">學校響應</p>
                        <p className="envResponse5PointHeadRightSmall display-mobile">學校</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.companyCount}家</p>
                        <p className="envResponse5PointHeadRightSmall display-computer">企業響應</p>
                        <p className="envResponse5PointHeadRightSmall display-mobile">企業</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.groupCount}個</p>
                        <p className="envResponse5PointHeadRightSmall display-computer">團體響應</p>
                        <p className="envResponse5PointHeadRightSmall display-mobile">團體</p>
                    </div>
                    <div className="text-wrapper">
                        <p className="office-main-title envResponse5PointHeadRightBig">{joinData.allItem}項</p>
                        <p className="envResponse5PointHeadRightSmall">措施</p>
                    </div>
                </div>
            </div>


            <div className="envRes5PointContent">
                <Link to="/categories/green_office/conserve_energy" className="innerContent" title="前往連結">
                    <div className="front-card">
                        <img className="bg-img" src={energyImg} alt="節省能資源" />
                        <div className="colored-detail energy">
                            <p>01節省能資源</p>
                            <div className="img-wrapper"><img src={earth5Img} alt="節省能資源" /></div>
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
                </Link>
                <Link to="/categories/green_office/source_reduction" className="innerContent " title="前往連結">
                    <div className="front-card">
                        <img className="bg-img" src={reduceImg} alt="源頭減量" />
                        <div className="colored-detail reduce">
                            <p>02源頭減量</p>
                            <div className="img-wrapper"><img src={reduce5Img} alt="源頭減量" /></div>
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
                </Link>
                <Link to="/categories/green_office/green_procurement" className="innerContent" title="前往連結">
                    <div className="front-card">
                        <img className="bg-img" src={shopImg} alt="綠色採購" />
                        <div className="colored-detail shop">
                            <p>03綠色採購</p>
                            <div className="img-wrapper"><img src={greenShop5Img} alt="綠色採購" /></div>
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
                </Link>

                <Link to="/categories/green_office/green_beautification" className="innerContent half" title="前往連結">
                    <div className="front-card">
                        <img className="bg-img" src={environmentImg} alt="環境綠美化" />
                        <div className="colored-detail environment">
                            <p>04環境綠美化</p>
                            <div className="img-wrapper"><img src={leef5Img} alt="環境綠美化" /></div>
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
                </Link>
                <Link to="/categories/green_office/advocacy" className="innerContent half" title="前往連結">
                    <div className="front-card">
                        <img className="bg-img" src={promoteImg} alt="宣導倡議" />
                        <div className="colored-detail promote">
                            <p>05宣導倡議</p>
                            <div className="img-wrapper"><img src={promote5Img} alt="宣導倡議" /></div>
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
                </Link>
            </div>

            <div className="responsePointTop">
                <div className="tilte-content-wrapper">
                    <div className="responsePointTopHead">
                        <h3>響應指標 TOP</h3>
                    </div>
                    <div className="content-wrapper row">
                        <div className="responsePointTopChoose col-sm-12 col-md-4 col-lg-4">
                            <div className="btn-wrapper">
                                {pointTitle.map((data, index) =>
                                    <div key={index} onClick={() => setPoint(data.targetId)} className={point === data.targetId ? `classPointBackground active pointBackground${index}` : `classPointBackground pointBackground${index}`}><h4>{data.targetName}</h4></div>
                                )}
                                {/* <div onClick={() => setPoint("0")} className={point == "0" ? "classPointBackground active all" : "classPointBackground all"}><Link>All</Link></div>
                                <div onClick={() => setPoint("1")} className={point === "1" ? "classPointBackground energy active" : "classPointBackground energy"}><Link>指標1 節省能資源</Link></div>
                                <div onClick={() => setPoint("2")} className={point === "2" ? "classPointBackground reduce active" : "classPointBackground reduce"}><Link>指標2 源頭減量</Link></div>
                                <div onClick={() => setPoint("3")} className={point === "3" ? "classPointBackground shop active" : "classPointBackground shop"}><Link>指標3 綠色採購</Link></div>
                                <div onClick={() => setPoint("4")} className={point === "4" ? "classPointBackground environment active" : "classPointBackground environment"}><Link>指標4 環境綠美化</Link></div>
                                <div onClick={() => setPoint("5")} className={point === "5" ? "classPointBackground promote active" : "classPointBackground promote"}><Link>指標5 宣導倡議</Link></div> */}
                            </div>
                        </div>

                        <div className="responsePointTopChart col-sm-12 col-md-8 col-lg-8">
                            {detailData.map((data, index) =>
                                <div key={index} className="bar-text-wrapper">
                                    <div className="point-title-wrapper">
                                        <h5>{data.title}</h5><i className="far fa-question-circle" aria-hidden="true"></i>
                                        <div className="point-desc">{data.desc}</div>
                                    </div>
                                    <div className="col-9">
                                        <div className={`bar-div ${barName[index]}`} style={{ width: data.percent + '%' }}>
                                            <div className="point-percent"><h6>響應率：{data.percent}%</h6></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="response-note-wrapper">
                            <div className="response-note">
                                <h6>*響應率=實際響應措施數/（實際響應家數×應響應措施數）</h6>
                                <h6>*統計資料呈現：響應率由高至低排序5筆資料</h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="greenFriend">
                <div className="greenFriendHead">
                    <div id="partner" style={{ position: "absolute", top: "-145px", left: "0" }}></div>
                    <h3 className="office-main-title greenEnvironmentFriend">綠色夥伴</h3>
                    <div className="friend-btn-wrapper">

                        <h4>資料類型</h4>
                        <button className={percentType ? "data-type-btn" : "data-type-btn active"} onClick={() => setPercentType(false)}>家數</button>
                        <button className={percentType ? "data-type-btn recent active" : "data-type-btn recent"}>
                            <span id="a">&nbsp;百分比&nbsp;</span>
                            <span id="b">近期開放</span>
                        </button>
                    </div>
                </div>

                <div className="greenFriendContent">
                    <div className="greenFriendContentMap col-sm-12 col-md-11  col-lg-6">
                        <div className="office-taiwan-svg">
                            <div ref={tooltipRef}></div>
                            <TaiwanSVG ref={svgRef} className="office-taiwan-svg" alt="office-taiwan-svg" />
                            <div className="office-tooltip">
                                <div className="tooltip-thead">
                                    <h5>圖例</h5>
                                    <h5>家數</h5>
                                </div>
                                <div className="tooltip-content">
                                    <div className="d-flex">
                                        <div style={{ background: "#FD413F" }} className="circle"></div>
                                        <div className="text-wrapper">
                                            <h6>1</h6></div>
                                    </div>
                                    <div className="d-flex">
                                        <div style={{ background: "#FE9A31" }} className="circle"></div>
                                        <div className="text-wrapper"><h6>2~50</h6></div>
                                    </div>
                                    <div className="d-flex">
                                        <div style={{ background: "#FFF94F" }} className="circle"></div>
                                        <div className="text-wrapper"><h6>51~200</h6></div>
                                    </div>
                                    <div className="d-flex">
                                        <div style={{ background: "#3CFD50" }} className="circle"></div>
                                        <div className="text-wrapper"><h6>201以上</h6></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mapData-wrapper col-sm-12 col-md-12  col-lg-5 ">
                        <div className="greenFriendContentJoinPercent allCountryJoinPercent">
                            <div className="allCountryJoinPercentTitle">各縣市綠⾊辦公參與率</div>
                            <div className="allCountryJoinPercentCountry">
                                <div className="city-outter-wrapper"><div className="city-wrapper"><span className="greenAllCountryPercentColume1">臺北市</span><div style={{ background: getCityColor("01") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">基隆市</span><div style={{ background: getCityColor("03") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">嘉義市</span><div style={{ background: getCityColor("12") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">臺東縣</span><div style={{ background: getCityColor("19") }} className="circle"></div></div></div>
                                <div className="city-outter-wrapper"><div className="city-wrapper"><span className="greenAllCountryPercentColume1">新北市</span><div style={{ background: getCityColor("02") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">新竹市</span><div style={{ background: getCityColor("05") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">嘉義縣</span><div style={{ background: getCityColor("13") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">澎湖縣</span><div style={{ background: getCityColor("20") }} className="circle"></div></div></div>
                                <div className="city-outter-wrapper"><div className="city-wrapper"><span className="greenAllCountryPercentColume1">臺中市</span><div style={{ background: getCityColor("08") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">新竹縣</span><div style={{ background: getCityColor("06") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">屏東縣</span><div style={{ background: getCityColor("16") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">連江縣</span><div style={{ background: getCityColor("22") }} className="circle"></div></div></div>
                                <div className="city-outter-wrapper"><div className="city-wrapper"><span className="greenAllCountryPercentColume1">臺南市</span><div style={{ background: getCityColor("14") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">苗栗縣</span><div style={{ background: getCityColor("07") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">南投縣</span><div style={{ background: getCityColor("10") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">金門縣</span><div style={{ background: getCityColor("21") }} className="circle"></div></div></div>
                                <div className="city-outter-wrapper"><div className="city-wrapper"><span className="greenAllCountryPercentColume1">高雄市</span><div style={{ background: getCityColor("15") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">彰化縣</span><div style={{ background: getCityColor("09") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">宜蘭縣</span><div style={{ background: getCityColor("17") }} className="circle"></div></div></div>
                                <div className="city-outter-wrapper"><div className="city-wrapper"><span className="greenAllCountryPercentColume1">桃園市</span><div style={{ background: getCityColor("04") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">雲林縣</span><div style={{ background: getCityColor("11") }} className="circle"></div></div><div className="city-wrapper"><span className="greenAllCountryPercentColume1">花蓮縣</span><div style={{ background: getCityColor("18") }} className="circle"></div></div></div>
                            </div>
                        </div>
                        <div className="greenFriendContentResName">
                            <div className="title-input-wrapper">
                                <h4>最新響應名單</h4>
                                <Link to="/categories/green_office/participate?page=1&type=&city=&year=&month=0&sort=10&n=" className="more-link" title="前往連結">看詳細名單</Link>
                            </div>
                            <div className="table-outter-wrapper">
                                <table className="review-card-main rwd-table">
                                    <thead className="text-content-wrapper-green">
                                        <tr>
                                            {/* <i className="fas fa-sort-down"></i> */}
                                            <th>日期</th>
                                            <th>縣市</th>
                                            <th>性質</th>
                                            <th>單位名稱</th>
                                            <th>響應措施數量</th>
                                        </tr>
                                    </thead>
                                    <tbody className="card-content-office card-content-green">
                                        {tableData}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <SideBtnOffice history={useHistory()} type={"綠色辦公"} />


            <Footer />
        </>
    );
}

export default withRouter(GreenOffice);