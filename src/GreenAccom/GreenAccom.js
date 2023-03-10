import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { isWebpSupported } from "react-image-webp/dist/utils";

import ReactPaginate from 'react-paginate';
import TwCitySelector from 'tw-city-selector';

import { clickRecord } from '../utils/API';
import { getExportDate } from '../utils/Functions';

import greenLogo from '../images1/greenLogo.webp';
import verifyHotelPng from '../images1/accommodation/verifyHotel.png';
import verifyHotelWebp from '../images1/accommodation/verifyHotel.webp';
import blankLeaf from "../images1/blankLeef.webp";
import blankLeafPng from "../images1/blankLeef.png";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtnOffice = React.lazy(() => import('../Components/SideBtnOffice'));
// const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const TourBanner = React.lazy(() => import('../Components/TourBanner'));
const Loader = React.lazy(() => import('../Components/Loader'));


function GreenTour(props) {

    let history = useHistory();
    const params = new URLSearchParams(history.location.search);
    const myPage = params.get('page')
    const accomType = params.get('type')
    const city = params.get('city')
    const dist = params.get('dist')
    const accomKeyword = params.get('search')
    const searchedCase = params.get('d')
    const level = params.get('level')
    const search = params.get('searched')

    // let domainFormal = "greenliving.epa.gov.tw/newPublic";
    let domainTest = "greenliving.eri.com.tw/PublicRwd"

    let domainFormal = window.location.hostname === "localhost" ? 'greenliving.eri.com.tw/PublicRwd' : window.location.hostname === "greenlife.eri.com.tw" ? "greenliving.eri.com.tw/PublicRwd" : 'greenliving.epa.gov.tw/newPublic';

    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(true)

    const [fetchData, setFetchData] = useState([]);
    const [searchCount, setSearchCount] = useState(0);

    const [resType1, setResType1] = useState(false);
    const [resType2, setResType2] = useState(false);

    const [zipCode, setZipCode] = useState("");
    const [cityName, setCityName] = useState("");

    const [keyWord, setKeyWord] = useState("");
    const [caseDisplay, setCaseDisplay] = useState([]);

    const [levelDisplay, setLevelDisplay] = useState([]);


    const [page, setPage] = useState(myPage);
    const [pageCount, setPageCount] = useState("");

    const [searched, setSearched] = useState(false);

    const collector = sessionStorage.getItem("userGuid") || "";

    //????????????API
    useEffect(() => {
        clickRecord("4EAEC3C9-A98B-4C0D-B4DD-CB8C9B0ECC4E", "8", collector)
    }, [collector]);


    // let activityName = [];
    let caseName = [];
    let levelName = [];

    //????????????????????????????????????
    useEffect(() => {
        new TwCitySelector({
            el: '.city-selector-set-has-value',
            elCounty: '.county',
            elDistrict: '.district',
            standardWords: true,
        });
        // new TwCitySelector();
    }, [])

    //????????????????????????????????????????????????
    function OnSelectChange(event) {
        setZipCode(event.currentTarget.value)
    }

    //
    let basePage = myPage
    //??????????????????
    const submit = async (e) => {
        setPage(1)
        window.scrollTo(0, 0)
        if (click) {
            setClick(false)
        }
        setLoading(true)
        //??????????????????
        e.preventDefault()
        setSearched(true)

        //??????????????????&??????????????????
        let resTypeVar
        if (!resType1) {
            if (resType2) {
                resTypeVar = 2
            } else {
                resTypeVar = 0
            }
        } else {
            if (resType2) {
                resTypeVar = 0
            } else {
                resTypeVar = 1
            }

        }


        //????????????????????????????????????
        var levelCheckVar = []
        var levelCheckboxes = document.querySelectorAll('input#gold[type=checkbox]:checked, input#silver[type=checkbox]:checked, input#copper[type=checkbox]:checked')

        for (var i = 0; i < levelCheckboxes.length; i++) {
            levelCheckVar.push(Number(levelCheckboxes[i].value))
            levelName.push(levelCheckboxes[i].name)
        }
        setLevelDisplay(levelName)

        // const uri = `https://cors-anywhere.herokuapp.com/https://greenliving.eri.com.tw/PublicRwd/APIs/TravelTour?p=${projType}&z=${region}&d=${formatted}&k=${keyWord}`;

        //??????????????????????????????????????????
        var arrayCheck = []
        var checkboxes = document.querySelectorAll('input#formHorizontalRadios0[type=checkbox]:checked, input#formHorizontalRadios1[type=checkbox]:checked, input#formHorizontalRadios2[type=checkbox]:checked, input#formHorizontalRadios3[type=checkbox]:checked, input#formHorizontalRadios4[type=checkbox]:checked, input#formHorizontalRadios5[type=checkbox]:checked, input#formHorizontalRadios6[type=checkbox]:checked, input#formHorizontalRadios7[type=checkbox]:checked')

        for (i = 0; i < checkboxes.length; i++) {
            arrayCheck.push(checkboxes[i].value)
            caseName.push(checkboxes[i].name)
        }
        setCaseDisplay(caseName)

        if (levelCheckVar.length !== 0) {
            resTypeVar = 2
        }


        if (arrayCheck.length !== 0) {
            resTypeVar = 1
            if (levelCheckVar.length !== 0) {
                resTypeVar = 0
            }
        }

        // console.log(resTypeVar)
        history.push(`/categories/accommodation?searched=true&page=1&level=${levelCheckVar}&type=${resTypeVar}&d=${arrayCheck}&city=${cityName}&dist=${zipCode}&search=${keyWord}`)


        const uri = `${props.SSL}//${domainFormal}/APIs/Hotels/${page}?m=${levelCheckVar}&h=${resTypeVar}&ic=${arrayCheck}&cn=${cityName}&zn=${zipCode}&k=${keyWord}`;

        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                setFetchData(result.Detail)
                //??????????????? = ????????? / ???????????? +1
                setSearchCount(result.RowsCount)
                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                console.log(result)
                //????????????????????????
                setPage(result.PageIndex)
                // console.log(result.Detail)
            });
    };





    useEffect(() => {

        setLoading(true)
        // setSearched(true)
        window.scrollTo(0, 0)

        //???????????????fetch
        const uriSearched = `${props.SSL}//${domainFormal}/APIs/Hotels/${page}?m=${level}&h=${accomType}&ic=${searchedCase}&cn=${city}&zn=${dist}&k=${accomKeyword}`;

        //??????-??????????????????
        const uri = `${props.SSL}//${domainFormal}/APIs/Hotels/${basePage}`;
        // const uri = `https://cors-anywhere.herokuapp.com/https://greenliving.eri.com.tw/PublicRwd/APIs/TravelTour`;

        //????????????????????????(????????????????????????????????????)???fetch:uriSearched,
        // ?????????(????????????????????????????????????)???fetch:uri
        fetch((search === 'true' ? uriSearched : uri), {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setLoading(false)
                setSearchCount(result.RowsCount)
                setFetchData(result.Detail)

                setPageCount(parseInt(result.RowsCount % 10 === 0 ? result.RowsCount / 10 : result.RowsCount / 10 + 1))
                setPage(result.PageIndex)
                // console.log(result)
            });

    }, [basePage]);



    //??????-????????????
    // const lists = []

    // for (let i = 1; i <= pageCount; i++) {
    //     if (i < 10) {
    //         lists.push(
    //             <Pagination.Item
    //                 className="course-list-btn"
    //                 key={i}
    //                 value={i}
    //                 onClick={() => {
    //                     setPage(i)
    //                     //   searched ? setSearchedPage(i) : setPage(i)
    //                     history.push(`/categories/accommodation?page=${i}&tactivity=${join}&d=${addtion}&city=${cityName}&dist=${zipCode}&search=${keyWord}`)
    //                 }}
    //                 active={i === page}
    //             >
    //                 0{i}
    //             </Pagination.Item>

    //         )

    //     } else {
    //         lists.push(
    //             <Pagination.Item
    //                 className="course-list-btn"
    //                 key={i}
    //                 value={i}
    //                 onClick={() => {
    //                     setPage(i)
    //                     history.push(`/categories/accommodation?page=${i}&tactivity=${join}&d=${addtion}&city=${cityName}&dist=${zipCode}&search=${keyWord}`)
    //                 }}
    //                 active={i === page}
    //             >
    //                 {i}
    //             </Pagination.Item>
    //         )
    //     }
    // }

    const handlePageClick = (data) => {

        setPage(data.selected + 1);
        history.push(`/categories/accommodation?searched=${searched}&page=${data.selected + 1}&level=${level}&type=${accomType}&d=${searchedCase}&city=${city}&dist=${dist}&search=${accomKeyword}`)

    };

    // ??????EXCEL
    function handleExportExcel() {
        //???????????????fetch
        const uriSearched = `${props.SSL}//${domainFormal}/APIs/HotelsIntro/${searchCount}?m=${level}&h=${accomType}&ic=${searchedCase}&cn=${city}&zn=${dist}&k=${accomKeyword}`;

        //??????-??????????????????
        const uri = `${props.SSL}//${domainFormal}/APIs/HotelsIntro/${searchCount}`;

        var XLSX = require('xlsx');

        if (fetchData.length !== 0) {
            fetch((searched === true ? uriSearched : uri), {
                method: 'GET'
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log("xlsx-result", result.Detail)
                    const file = result.Detail;
                    const fileDate = getExportDate()
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');

                    file.forEach(item => {
                        delete item.Email
                        delete item.HotelNo
                        delete item.ImageName
                        delete item.ImgByte
                        delete item.Lat
                        delete item.Lon
                        delete item.ServicePlaceAddr
                        delete item.ServicePlaceName
                        delete item.StayNo
                        delete item.StayCity
                        delete item.StayType
                        delete item.Url
                        delete item.Num
                        item.Mobile = item.Mobile !== "" ? item.Mobile : "--";
                        item.HotelType = item.HotelType === 1 ? "????????????" : "??????????????????";
                        item.InteCaseList = item.InteCaseList[0]?.InteCase4_6 || "--";

                        if (item.HotelType === "??????????????????") {
                            item.CityName = item.Address.slice(0, 3)
                        }
                    })

                    // console.log(file)
                    var ws = XLSX.utils.json_to_sheet(result.Detail);
                    //????????????
                    // ws['!rows'] = [];
                    // ws['!rows'][0] = { hidden: true };
                    //????????????
                    ws['!cols'] = [];
                    // ws['!cols'][1] = { hidden: true };
                    // ws['!cols'][0] = { hidden: true };
                    var wb = XLSX.utils.book_new();
                    ws.A1.v = "????????????"
                    ws.B1.v = "????????????"
                    ws.C1.v = "?????????"
                    ws.D1.v = "????????????"
                    ws.E1.v = "????????????"
                    ws.F1.v = "????????????"
                    ws.G1.v = "????????????"
                    ws.H1.v = "????????????????????????"

                    XLSX.utils.book_append_sheet(wb, ws, "Table Export");
                    XLSX.writeFile(wb, `?????????_????????????_${fileDate}.ods`);

                    /* generate an XLSX file */
                    // XLSX.writeFile(wb, "sheetjs.xlsx");
                });
        }
    }




    return (
        <>
            <div className={click ? "ac-aside-backdrop show" : "ac-aside-backdrop"} onClick={() => setClick(false)}></div>
            <BreadCrumb />
            <TourBanner intro={"????????????"} search={"??????????????????"} category={"accommodation"} introLink={'accomIntro'} download={"accomDownload"} join={"join"} />
            <div style={{ height: click ? "calc(55vh + 30px)" : "auto", overflow: "hidden" }} className="row justify-content-center restaurant res-hidden-content">
                <div onClick={() => setClick(!click)} className="responsive-search ac-color">
                    <i className="fas fa-search" aria-hidden="true" alt="??????"></i><div className="responsive-search-text">???????????????????????????????????????????????????????????????????????????????????????</div>
                </div>


                <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-tour show' : 'search-tour'} `}>
                    <Form className="form-text col-12">
                        <div className="col-md-3 col-lg-12">
                            <Form.Label for="key-word" className="form-label col-form-label col" style={{ color: "#009933" }}>???????????????</Form.Label>
                            <Form.Control style={{ borderColor: "#009933" }} id="key-word" placeholder="??????????????????" onChange={e => setKeyWord(e.target.value)} aria-label="??????????????????" />
                            <span className="keyword-note">???????????????????????????</span>
                        </div>
                        <div className="col-md-5 col-lg-12">
                            <div className="city-selector-set-has-value">
                                <Form.Label for="county" className="col-12 accom-bottom-line bottom-line form-label col-form-label col">?????????</Form.Label>
                                <Col sm={12}>
                                    <div>
                                        <select className="county" id="county" onChange={(e) => setCityName(e.target.value)} aria-label="?????????"></select>
                                    </div>
                                </Col>
                                <Form.Label as="legend" column for="district" className="col-12 accom-bottom-line bottom-line">??????</Form.Label>
                                <Col sm={12}>
                                    <div>
                                        <select className="district" id="district" onChange={OnSelectChange} aria-label="??????"></select>
                                    </div>
                                </Col>
                            </div>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="hotel" className="col-12 accom-bottom-line bottom-line form-label col-form-label col">??????????????????</Form.Label>
                            <Col className="">
                                <Form.Check
                                    label="????????????"
                                    name="????????????"
                                    type="checkbox"
                                    id="hotel"
                                    value="1"
                                    onChange={() => {
                                        setResType1(!resType1)
                                    }}
                                />
                                <Form.Check
                                    label="??????????????????"
                                    name="??????????????????"
                                    type="checkbox"
                                    id="certify"
                                    value="2"
                                    onChange={() => {
                                        setResType2(!resType2)
                                    }}
                                />

                            </Col>
                        </div>

                        <div className="col-md-5 col-lg-12">
                            <Form.Label for="gold" className="col-12 accom-bottom-line bottom-line form-label col-form-label col">????????????????????????</Form.Label>
                            <Col>
                                <Form.Check className="level gold" label="??????" name="??????" type="checkbox" id="gold" value="1" />
                                <Form.Check className="level silver" label="??????" name="??????" type="checkbox" id="silver" value="2" />
                                <Form.Check className="level copper" label="??????" name="??????" type="checkbox" id="copper" value="3" />
                            </Col>
                        </div>

                        <div className="col-md-5  col-lg-12">
                            <Form.Label id="formHorizontalRadios0" column className="col-12 accom-bottom-line bottom-line form-label col-form-label col">
                                ????????????????????????</Form.Label>
                            <Col>
                                <Form.Check
                                    type="checkbox"
                                    label={<span className="d-flex"><div className="case-label" style={{ background: "#095194" }}>?????????</div> &nbsp;????????????????????????</span>}
                                    name="????????????????????????"
                                    id="formHorizontalRadios0"
                                    value="4b"
                                />

                                <Form.Check
                                    type="checkbox"
                                    label={<span className="d-flex"><div className="case-label" style={{ background: "#264653" }}>?????????</div> &nbsp;?????????????????????????????????</span>}
                                    name="?????????????????????????????????"
                                    id="formHorizontalRadios1"
                                    value="4c"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label={<span className="d-flex"><div className="case-label" style={{ background: "#2a9d8f" }}>?????????</div> &nbsp;?????????????????????????????????????????????</span>}
                                    name="?????????????????????????????????????????????"
                                    id="formHorizontalRadios2"
                                    value="4d"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label={<span className="d-flex"><div className="case-label" style={{ background: "#e9c46a" }}>?????????</div> &nbsp;??????????????????????????????????????????</span>}
                                    name="??????????????????????????????????????????"
                                    id="formHorizontalRadios3"
                                    value="4e"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label={<span className="d-flex"><div className="case-label" style={{ background: "#f4a261" }}>?????????</div> &nbsp;?????????????????????????????????</span>}
                                    name="?????????????????????????????????"
                                    id="formHorizontalRadios4"
                                    value="4f"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label={<span className="d-flex"><div className="case-label" style={{ background: "#e76f51" }}>?????????</div> &nbsp;????????????????????????</span>}
                                    name="????????????????????????"
                                    id="formHorizontalRadios5"
                                    value="4g"
                                />
                            </Col>
                        </div>

                        <Button className="accom-searchButton category-search-button mt-3 col-12" variant="primary" type="submit" onClick={submit} >
                            <i className="fas fa-search" aria-hidden="true" alt="????????????"></i>
                            ??????
                        </Button>
                        <Button id="btnExportExcel" className="accom-searchButton category-search-button mt-3 col-12" variant="primary" onClick={handleExportExcel}>
                            <i className="far fa-arrow-alt-circle-down" aria-hidden="true" alt="??????EXCEL??????"></i>&nbsp;??????EXCEL
                        </Button>
                    </Form>
                </div>
                <div className="col-10 col-lg-8">

                    {loading
                        ?
                        <Loader loading={loading} />
                        :
                        <div className="">
                            <div className="d-flex search-result">
                                <p className="">???????????? :</p>
                                <div className="right-result">
                                    <div className="sorted-count-wrapper">
                                        <p>??????{fetchData.length}???</p>
                                        <p>??????{searchCount}???</p>
                                        <p>{page}/{pageCount}??? </p>
                                    </div>

                                </div>
                            </div>

                            <div className="inner-content">

                                {fetchData
                                    // .sort((a, b) => {
                                    //     if (a.TravelTourNo < b.TravelTourNo) return -1;
                                    //     if (a.TravelTourNo > b.TravelTourNo) return 1;
                                    // })
                                    .map((fetchData, index) =>
                                        <a as={Link} key={index} target="_blank" rel="noreferrer noopener" href={`/categories/accommodation/detailPage?hotel=${fetchData.Num}&type=${fetchData.HotelType}&hotelNo=${fetchData.HotelNo}`}>
                                            <Card className="res-card">
                                                <div className="d-flex row content-wrapper search-list-card">
                                                    <div className="col-4 res-img">
                                                        <img
                                                            alt={fetchData.Name}
                                                            title={fetchData.Name}
                                                            src={fetchData.ImgByte !== "" ?
                                                                fetchData.ImgByte
                                                                :
                                                                isWebpSupported() ? blankLeaf : blankLeafPng}

                                                        // src={fetchData.ImgByte !== "" ? fetchData.ImgByte : blankLeaf} 
                                                        />
                                                        {/* <img src={fetchData.RestPicList[0].RestUrl === "" ? "../images/greenTour/unload.PNG" : fetchPicPath} alt={fetchData.Name} title={fetchData.Name} /> */}
                                                    </div>
                                                    <div className="col-8 rs-right-content">
                                                        <div className="d-flex">
                                                            <div>
                                                                <div className="d-flex justify-content-start category-ul">
                                                                    {fetchData.HotelType === 1 ?
                                                                        <li style={{ background: "green" }}>????????????</li>
                                                                        : <li style={{ background: "green" }}>??????????????????</li>
                                                                    }

                                                                    {fetchData.InteCaseList.map((data, index) =>
                                                                        data.InteCase4 === "1" ?
                                                                            <li style={{ background: "#095194" }}>?????????</li>
                                                                            :
                                                                            ""
                                                                    )}
                                                                    {fetchData.InteCaseList.map((data, index) =>
                                                                        data.InteCase4 === "2" ?
                                                                            <li style={{ background: "#264653" }}>?????????</li>
                                                                            :
                                                                            ""
                                                                    )}
                                                                    {fetchData.InteCaseList.map((data, index) =>
                                                                        data.InteCase4 === "3" ?
                                                                            <li style={{ background: "#2a9d8f" }}>?????????</li>
                                                                            :
                                                                            ""
                                                                    )}
                                                                    {fetchData.InteCaseList.map((data, index) =>
                                                                        data.InteCase4 === "4" ?
                                                                            <li style={{ background: "#e9c46a" }}>?????????</li>
                                                                            :
                                                                            ""
                                                                    )}
                                                                    {fetchData.InteCaseList.map((data, index) =>
                                                                        data.InteCase4 === "5" ?
                                                                            <li style={{ background: "#f4a261" }}>?????????</li>
                                                                            :
                                                                            ""
                                                                    )}
                                                                    {fetchData.InteCaseList.map((data, index) =>
                                                                        data.InteCase4 === "6" ?
                                                                            <li style={{ background: "#e76f51" }}>?????????</li>
                                                                            :
                                                                            ""
                                                                    )}


                                                                    {fetchData.Memo.indexOf("??????") === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#ff9933" }}>??????</li>
                                                                    }
                                                                    {fetchData.Memo.indexOf("??????") === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#999999" }}>??????</li>
                                                                    }
                                                                    {fetchData.Memo.indexOf("??????") === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#cc5c28" }}>??????</li>
                                                                    }
                                                                    {/* {??????????????????} */}
                                                                    {fetchData?.HotelNo !== "" && <li style={{ background: "rgb(75 207 174)" }}>{fetchData.HotelNo}</li>}
                                                                </div>
                                                                <div className="content-name">
                                                                    <div className="d-flex outterBox">
                                                                        <p>{fetchData.HotelType === 1 ? fetchData.Address.substring(0, 3).replaceAll("???", "???") : fetchData.ServicePlaceAddr.substring(0, 3).replaceAll("???", "???")}</p>
                                                                    </div>
                                                                    <h2 title={fetchData.Name} className="res-title">{fetchData.Name}</h2>
                                                                </div>
                                                            </div>
                                                            <div className="accom-logo-wrapper">
                                                                <img className="accom-resType-logo" src={fetchData.HotelType === 2 ?
                                                                    greenLogo
                                                                    :
                                                                    isWebpSupported() ? verifyHotelWebp : verifyHotelPng
                                                                } alt={fetchData.HotelType === 2 ? "????????????Logo" : "??????????????????Logo"} title={fetchData.HotelType === 2 ? "????????????Logo" : "??????????????????Logo"} />

                                                            </div>
                                                        </div>
                                                        <div className="res-address">
                                                            <h3 className="ad-subtitle"><i className="fas fa-home" aria-hidden="true" alt="??????????????????"></i>&nbsp;????????????:</h3>
                                                            <h3 className="ad-content" title={fetchData.HotelType === 1 ? fetchData.Address : fetchData.ServicePlaceAddr}>{fetchData.HotelType === 1 ? fetchData.Address : fetchData.ServicePlaceAddr}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </a>

                                    )}


                            </div>

                        </div>
                    }
                    <>
                        <ReactPaginate
                            forcePage={page - 1}
                            style={{ visibility: loading ? 'hidden' : 'visible' }}
                            previousLabel={'?????????'}
                            nextLabel={'?????????'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            disabledClassName={'disabled'}
                        />
                        {/* <ul
                            style={{ visibility: loading ? 'hidden' : 'visible' }}
                            className="page-lists"
                        >
                            <Pagination.Prev
                                className="list-btn"
                                onClick={() => {
                                    setPage(page - 1)
                                    history.push(`/categories/accommodation?page=${page - 1}&tactivity=${join}&d=${addtion}&city=${cityName}&dist=${zipCode}&search=${keyWord}`)
                                    // searched ? setSearchedPage(searchedPage - 1) : setPage(page - 1)
                                }}
                                disabled={(page === 1) ?
                                    true : false}
                            />
                            {lists}
                            <Pagination.Next
                                onClick={() => {
                                    setPage(page + 1)
                                    history.push(`/categories/accommodation?page=${page + 1}&tactivity=${join}&d=${addtion}&city=${cityName}&dist=${zipCode}&search=${keyWord}`)
                                    // searched ? setSearchedPage(searchedPage + 1) : setPage(page + 1)
                                }}
                                disabled={(page === pageCount) ?
                                    true : false}
                            />
                        </ul> */}
                    </>
                </div>
            </div>
            <SideBtnOffice history={useHistory()} type={"????????????"} />
            {/* <SideBtn history={history} /> */}
            <Footer />


        </>
    );
}

export default withRouter(GreenTour);