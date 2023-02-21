import React, { useState, useEffect, useRef } from 'react';
import '../../../src/GreenOffice/greenOffice.scss';
import { useHistory } from 'react-router-dom';
import { formatDateDot, formatDate, getBgColor, pad, getCityId, clickLogout, checkAuth } from '../../utils/Functions';
import { getMemberProfile, clickRecord } from '../../utils/API';
import { ReactComponent as TaiwanSVG } from '../../../src/taiwanMapPartner.svg'
import { select } from "d3";
import { useCookies } from "react-cookie";

const Loader = React.lazy(() => import('../../Components/Loader'));

function TaiwanPartnerMap(props) {
    const { theme } = props;
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }
    // let domain = "greenlife.epa.gov.tw";
    let domainFormal = "greenliving.epa.gov.tw/newPublic";

    //引入router路徑紀錄
    let history = useHistory()
    //地圖SVG
    var d3 = require("d3");
    const svgRef = useRef();
    const tooltipRef = useRef();
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const [percentType, setPercentType] = useState(false)
    const [loading, setLoading] = useState(true)

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
            .attr("class", "en-myTooltip-office")
            .style("position", "absolute")
            .style("opacity", "0")
            .style("transition", "all .3s")
        svg
            .selectAll('.section')
            .on("mouseover", function (d) {
                if (getCityData(d.target.id)) {
                    let tooltipContainer;
                    const cityData = getCityData(d.target.id);
                    // (cityData.comTotal == 0 && cityData.govTotal == 0 && cityData.schoolTotal == 0 && cityData.schoolTotal == 0) ? "" : "";
                    switch (theme) {
                        case "Office":
                            tooltipContainer = (cityData.comTotal == 0 && cityData.govTotal == 0 && cityData.schoolTotal == 0 && cityData.schoolTotal == 0) ? "<br/>" + `<div class=myWrapper><h6 class="myText-title tooltip-text">Data not find &nbsp;</h6>`
                                : (cityData.comTotal != 0 || cityData.govTotal != 0 || cityData.schoolTotal != 0 || cityData.schoolTotal != 0)
                                    ? `${cityData.comTotal != 0 ? `<div class=myWrapper><h6 class="tooltip-value tooltip-text">${cityData.comTotal}&nbsp;&nbsp;</h6><h6 class="myText-title tooltip-text">Enterprises &nbsp;</h6></div><br/>` : ""}
                                    ${cityData.govTotal != 0 ? "<br/>" + `<div class=myWrapper><h6 class="tooltip-value tooltip-text">${cityData.govTotal}</h6><h6 class="myText-title tooltip-text">Government Agencies &nbsp;</h6></div><br/>` : ""}
                                    ${cityData.schoolTotal != 0 ? "<br/>" + `<div class=myWrapper><h6 class="tooltip-value tooltip-text">${cityData.schoolTotal}&nbsp;&nbsp;</h6><h6 class="myText-title tooltip-text">Schools &nbsp;</h6></div><br/>` : ""}
                                    ${cityData.groupTotal != 0 ? `<div class=myWrapper><h6 class="tooltip-value tooltip-text">${cityData.groupTotal}&nbsp;&nbsp;</h6><h6 class="myText-title tooltip-text">Organizations &nbsp;</h6>` : ""}</div>` : "";
                            break;
                        case "Travel":
                            tooltipContainer = (cityData.hotelQuantity == 0 && cityData.labelQuantity == 0) ?
                                "<br/>" + `<div class="myWrapper-tour"><h6 class="myText-title tooltip-text">Data not find &nbsp;</h6>`
                                : "<br/>" + `${cityData.hotelQuantity != 0 ? `<div class="myWrapper-tour"><h6 class="tooltip-value">${cityData.hotelQuantity}</h6><h6 class="myText-title tooltip-text">Eco-friendly Hotels &nbsp;</h6>` : ""}
                                ${cityData.labelQuantity != 0 ? `<h6 class="tooltip-value">${cityData.labelQuantity}</h6><h6 class="myText-title tooltip-text">Green Mark Hotels &nbsp;</h6>` : ""}</div>`;
                            break;
                        case "Dining":
                            tooltipContainer = (cityData.greenQuantity == 0 && cityData.labelQuantity == 0) ?
                                "<br/>" + `<div class="myWrapper-food"><h6 class="myText-title tooltip-text">Data not find &nbsp;</h6>`
                                : "<br/>" + `${cityData.greenQuantity != 0 ? `<div class="myWrapper-food"><h6 class="tooltip-value">${cityData.greenQuantity}</h6><h6 class="myText-title tooltip-text">Green Restaurants &nbsp;</h6>` : ""}
                                ${cityData.labelQuantity != 0 ? `<h6 class="tooltip-value">${cityData.labelQuantity}</h6><h6 class="myText-title tooltip-text">Green Mark Restaurants &nbsp;</h6>` : ""}</div>`;
                            break;
                    }

                    tooltip.style("opacity", "1")
                    tooltip
                        .style("top", (d.clientY - 400) + "px")
                        .style("left", (d.clientX - 100) + "px")
                        .style("z-index", "9999")
                        .html(decodeURIComponent(JSON.parse(`"${d3.select(this).attr("name")}"`)) + tooltipContainer)

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



    //綠色辦公-響應5類指標 & 縣市數據
    const [cityReports, setCityReports] = useState([]);

    useEffect(() => {
        if (theme === 'Office') {
            fetch(`${SSL}//${domain}/api/api/GOffice/Participate/Report`, {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        setLoading(false)
                        let dtail = result.resultObject.cityReports;
                        console.log(result)
                        dtail.map((d, index) => {
                            if (d.color == "#FD413F") {
                                d.color = '#EE7F7F';
                            }
                            if (d.color == "#FE9A31") {
                                d.color = "#F5A626";
                            }
                            if (d.color == "#FFF94F") {
                                d.color = "#FFEC61";
                            }
                            if (d.color == "#3CFD50") {
                                d.color = "#78CB67";
                            }

                        })
                        // console.log(dtail)
                        setCityReports(dtail)
                    }
                });
        }
    }, [SSL, domain])

    const cityName = ["基隆市", "嘉義市", "臺北市", "嘉義縣", "新北市", "臺南市", "桃園市", "高雄市", "新竹市", "屏東縣", "新竹縣", "臺東縣", "苗栗縣", "花蓮縣", "臺中市", "宜蘭縣", "彰化縣", "澎湖縣", "南投縣", "金門縣", "雲林縣", "連江縣",]
    const cityEName = ["Keelung City", "Chiayi City", "Taipei City", "Chiayi County", "New Taipei City", "Tainan City", "Taoyuan City", "Kaohsiung City", "Hsinchu City", "Pingtung County", "Hsinchu County", "Taitung County", "Miaoli County", "Hualien County", "Taichung City", "Yilan County", "Changhua County", "Penghu County", "Nantou County", "Kinmen County", "Yunlin County", "Lienchiang County",]

    const [fetchData, setFetchData] = useState([])
    useEffect(() => {
        if (theme === 'Travel') {
            fetch(`${SSL}//${domainFormal}/APIs/HotelsIntro/2000`)
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.Result === "Success") {
                        setLoading(false)
                        setFetchData(result.Detail)
                        // console.log(result)
                        let fetchData = result.Detail;
                        const map_1 = {};
                        const map_2 = {};
                        let newCityData = [];
                        fetchData.map(d => {
                            if (d.HotelType === 2) {
                                for (let i of cityName) {
                                    if (d.ServicePlaceAddr.includes(i)) {
                                        return d.City = i;
                                    }
                                }
                            } else {
                                for (let i of cityName) {
                                    if (d.CityName.includes(i)) {
                                        return d.City = i;
                                    }
                                }
                            }
                        })
                        const quantityResult = fetchData.filter((item) => {
                            if (item.HotelType === 1) {
                                if (map_1[item.City] === undefined) {
                                    map_1[item.City] = 1;
                                    return true
                                } else {
                                    map_1[item.City]++
                                    return false
                                }
                            }
                            if (item.HotelType === 2) {
                                if (map_2[item.City] === undefined) {
                                    map_2[item.City] = 1;
                                    return true
                                } else {
                                    map_2[item.City]++
                                    return false
                                }
                            }
                        }).map((item, i) => {
                            const hotel_map = map_1[item.City] === undefined ? 0 : map_1[item.City];
                            const label_map = map_2[item.City] === undefined ? 0 : map_2[item.City];
                            item.quantity = hotel_map + label_map;
                            item.hotelQuantity = hotel_map;
                            item.labelQuantity = label_map;
                            return item;
                        })

                        for (let i of quantityResult) {
                            let flag = true;
                            for (let j of newCityData) {
                                if (i.City == j.City) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                newCityData.push(i);
                            }
                        }
                        let color;
                        let totalData = newCityData.map((d, index) => {
                            if (d.quantity >= 0 && d.quantity <= 1) {
                                color = '#EE7F7F';
                            }
                            if (d.quantity >= 2 && d.quantity <= 50) {
                                color = '#F5A626';
                            }
                            if (d.quantity > 50 && d.quantity <= 200) {
                                color = '#FFEC61';
                            }
                            if (d.quantity > 200) {
                                color = '#78CB67';
                            }
                            return { cityId: getCityId(pad(d.City)), hotelType: d.HotelType, city: d.City, quantity: d.quantity, hotelQuantity: d.hotelQuantity, labelQuantity: d.labelQuantity, color: color }
                        })
                        // console.log("totalData", totalData)
                        setCityReports(totalData)
                    }
                });
        }
    }, [SSL, domainFormal])

    useEffect(() => {
        if (theme === 'Dining') {
            fetch(`${SSL}//${domainFormal}/APIs/RestaurantIntro/2000`)
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.Result === "Success") {
                        setLoading(false)
                        setFetchData(result.Detail)
                        // console.log(result)
                        let fetchData = result.Detail;
                        const map_1 = {};
                        const map_2 = {};
                        let newCityData = [];
                        fetchData.map(d => {
                            if (d.RestType === 2) {
                                for (let i of cityName) {
                                    if (d.Address.includes(i)) {
                                        return d.City = i;
                                    }
                                }
                            } else {
                                for (let i of cityName) {
                                    if (d.CityName.includes(i)) {
                                        return d.City = i;
                                    }
                                }
                            }
                        })
                        const quantityResult = fetchData.filter((item) => {
                            if (item.RestType === 1) {
                                if (map_1[item.City] === undefined) {
                                    map_1[item.City] = 1;
                                    return true
                                } else {
                                    map_1[item.City]++
                                    return false
                                }
                            }
                            if (item.RestType === 2) {
                                if (map_2[item.City] === undefined) {
                                    map_2[item.City] = 1;
                                    return true
                                } else {
                                    map_2[item.City]++
                                    return false
                                }
                            }
                        }).map((item, i) => {
                            const green_map = map_1[item.City] === undefined ? 0 : map_1[item.City];
                            const label_map = map_2[item.City] === undefined ? 0 : map_2[item.City];
                            item.quantity = green_map + label_map;
                            item.greenQuantity = green_map;
                            item.labelQuantity = label_map;
                            return item;
                        })
                        for (let i of quantityResult) {
                            let flag = true;
                            for (let j of newCityData) {
                                if (i.City == j.City) {
                                    flag = false;
                                }
                            }
                            if (flag) {
                                newCityData.push(i);
                            }
                        }
                        let color;
                        let totalData = newCityData.map((d, index) => {
                            if (d.quantity >= 0 && d.quantity <= 1) {
                                color = '#EE7F7F';
                            }
                            if (d.quantity >= 2 && d.quantity <= 50) {
                                color = '#F5A626';
                            }
                            if (d.quantity > 50 && d.quantity <= 200) {
                                color = '#FFEC61';
                            }
                            if (d.quantity > 200) {
                                color = '#78CB67';
                            }

                            return { cityId: getCityId(pad(d.City)), RestType: d.RestType, city: d.City, quantity: d.quantity, greenQuantity: d.greenQuantity, labelQuantity: d.labelQuantity, color: color }
                        })
                        // console.log("totalData", totalData)
                        setCityReports(totalData)
                    }
                });
        }
    }, [SSL, domainFormal])

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

    return (
        <>
            <h3 className="office-main-title greenEnvironmentFriend" style={{ textAlign: "center" }}>{`Green ${theme} Partners`}</h3>
            {loading ?
                <div className="m-5">
                    <Loader loading={loading} />
                </div>
                :
                <div className="greenFriend mb-5">
                    <div className="greenFriendContent">
                        <div className="greenFriendContentMap col-sm-12 col-md-11  col-lg-6">
                            <div className="office-taiwan-svg">
                                <div ref={tooltipRef}></div>
                                <TaiwanSVG ref={svgRef} className="office-taiwan-svg" alt="office-taiwan-svg" />
                                <div className="office-tooltip">
                                    <div className="tooltip-thead">
                                        <h6>圖例</h6>
                                        <h6>家數</h6>
                                    </div>
                                    <div className="tooltip-content">
                                        <div className="d-flex">
                                            <div style={{ background: "#EE7F7F" }} className="circle"></div>
                                            <div className="text-wrapper">
                                                <h6>1</h6></div>
                                        </div>
                                        <div className="d-flex">
                                            <div style={{ background: "#F5A626" }} className="circle"></div>
                                            <div className="text-wrapper"><h6>2~50</h6></div>
                                        </div>
                                        <div className="d-flex">
                                            <div style={{ background: "#FFEC61" }} className="circle"></div>
                                            <div className="text-wrapper"><h6>51~200</h6></div>
                                        </div>
                                        <div className="d-flex">
                                            <div style={{ background: "#78CB67" }} className="circle"></div>
                                            <div className="text-wrapper"><h6>above 201</h6></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mapData-wrapper col-sm-12 col-md-12  col-lg-6">
                            <div className="greenFriendContentJoinPercent allCountryJoinPercent">
                                <div className="allCountryJoinPercentTitle">{`Green ${theme === "Dining" ? "Restaurant" : theme} participation by county and city`}</div>
                                <div className="en-allCountryJoinPercentCountry">
                                    <div className="city-outter-wrapper">
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Taipei City</span><div style={{ background: getCityColor("01") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Keelung City</span><div style={{ background: getCityColor("03") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Chiayi City</span><div style={{ background: getCityColor("12") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Taitung County</span><div style={{ background: getCityColor("19") }} className="circle"></div></div>
                                    </div>
                                    <div className="city-outter-wrapper">
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">New Taipei City</span><div style={{ background: getCityColor("02") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Hsinchu City</span><div style={{ background: getCityColor("05") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Chiayi County</span><div style={{ background: getCityColor("13") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Penghu County</span><div style={{ background: getCityColor("20") }} className="circle"></div></div>
                                    </div>
                                    <div className="city-outter-wrapper">
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Taichung City</span><div style={{ background: getCityColor("08") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Hsinchu County</span><div style={{ background: getCityColor("06") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Pingtung County</span><div style={{ background: getCityColor("16") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Lienchiang County</span><div style={{ background: getCityColor("22") }} className="circle"></div></div>
                                    </div>
                                    <div className="city-outter-wrapper">
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Tainan City</span><div style={{ background: getCityColor("14") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Miaoli County</span><div style={{ background: getCityColor("07") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Nantou County</span><div style={{ background: getCityColor("10") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Kinmen County</span><div style={{ background: getCityColor("21") }} className="circle"></div></div>
                                    </div>
                                    <div className="city-outter-wrapper">
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Kaohsiung City</span><div style={{ background: getCityColor("15") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Changhua County</span><div style={{ background: getCityColor("09") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Yilan County</span><div style={{ background: getCityColor("17") }} className="circle"></div></div>
                                    </div>
                                    <div className="city-outter-wrapper">
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Taoyuan City</span><div style={{ background: getCityColor("04") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Yunlin County</span><div style={{ background: getCityColor("11") }} className="circle"></div></div>
                                        <div className="city-wrapper"><span className="greenAllCountryPercentColume1">Hualien County</span><div style={{ background: getCityColor("18") }} className="circle"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default TaiwanPartnerMap;