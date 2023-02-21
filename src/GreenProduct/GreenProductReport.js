import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref'
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { matchRegex } from '../utils/Functions';


import "react-datepicker/dist/react-datepicker.css";
import '../GreenProduct/GreenProductReport.scss'
import '../GreenOffice/greenOffice.scss';

import markBannerSmall from '../images1/img/banner_mark_small.jpg';

import Modal from 'react-bootstrap/Modal';
// import CustomModal from '../Components/CustomModal';
import Spinner from 'react-bootstrap/Spinner';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Loader = React.lazy(() => import('../Components/Loader'));

function GreenProductReport(props) {

    const [loading, setLoading] = useState(false);

    const [arrTable, setArrTable, arrTableRef] = useState([]);

    const [showAPI, setShowAPI] = useState(false);

    const handleShowAPIClose = () => setShowAPI(false);
    const handleShowAPIShow = () => setShowAPI(true);

    const [pctn, setPctn, pctnRef] = useState(0);

    const [categoryName, setCategoryName] = useState("");

    const [searched, setSearched, searchedRef] = useState(false);

    const productCategory = ["資源回收產品類", "清潔產品類", "資訊產品類", "家電產品類",
        "省水產品類", "省電產品類", "(OA)辦公室用具產品類", "可分解產品類",
        "有機資材類", "建材類", "日常用品類", "工業類",
        "利用太陽能資源", "服務類", "第二類"];

    const [effectiveReport, setEffectiveReport, effectiveReportRef] = useState([]);
    const [effectiveReportDetail, setEffectiveReportDetail, effectiveReportDetailRef] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    let history = useHistory()
    var paramsSearch = new URLSearchParams(history.location.search);

    const reset = () => {
        setStartDate("");
        setEndDate("");
    }

    let SSL = props.SSL;
    let hostname = props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    // 移除重複的Array
    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    // 對特定的Key值做群組
    const groupByProduct = (keys) => (array) =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = keys.map((key) => obj[key]).join("-");
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    const tableData = (

        effectiveReportRef.current.filter(obj => (obj.CriteriaClassNo !== 16 && obj.criteriaClassNo !== 15)).map((data, index) => {
            const { CriteriaClass, FactorySum, ProductSum, EffectiveSum } = data
            return (
                <tr key={index}>
                    <td data-title="產品類別" className="list-date">{CriteriaClass}</td>
                    <td data-title="家次*" className="list-date">{FactorySum}</td>
                    <td data-title="通過數*" className="list-date">{ProductSum}</td>
                    <td data-title="有效數*" className="list-date">{EffectiveSum}</td>
                    <td data-title="展開/收合" className="list-date">
                        <a href="#">

                            <div className="servicebtn div-flex" title="展開細項"
                                onClick={() => {
                                    setPctn(index + 1)
                                    clickShow(index)
                                }}
                            >
                                <span>展開/收合</span>
                            </div>
                        </a>
                    </td>
                </tr>
            )
        })
    );

    const tableDetailData = (
        <>
            {effectiveReportDetailRef.current.filter(obj => obj.CriteriaClassNo !== 999).map((data, index) => {
                const { CriteriaClassNo, CriteriaClass, FactorySum, ProductSum, EffectiveSum } = data
                return (
                    <tr key={index}>
                        <td data-title="規格標準編號" className="list-date">{CriteriaClassNo}</td>
                        <td data-title="產品類別" className="list-date">{CriteriaClass}</td>
                        <td data-title="家次*" className="list-date">{FactorySum ? FactorySum : 0}</td>
                        <td data-title="通過數*" className="list-date">{ProductSum ? ProductSum : 0}</td>
                        <td data-title="有效數*" className="list-date">{EffectiveSum ? EffectiveSum : 0}</td>
                    </tr>
                )
            })}
        </>
    );

    function getReportDetail(ctn) {
        let category = 1;
        if (ctn === 15) {
            ctn = "";
            category = 2;
        }
        let detailUrl = `${props.SSL}//${hostname}/APIs/ProductStatistics?d=Y${category && `&c=${category}`}&s=${matchRegex(paramsSearch.get('startDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || startDate}T00:00:00&e=${matchRegex(paramsSearch.get('endDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || endDate}T23:55:55&${ctn && `&ct=${ctn}`}`;

        fetch(detailUrl, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).then(result => {
            setEffectiveReportDetail([]);

            if (result.Result === "Success") {

                setEffectiveReportDetail(result.Detail);
                setLoading(false);
            }
        })
    }

    function clickShow(index) {
        setEffectiveReportDetail([]);

        let productName = productCategory[index];
        setCategoryName(productName);

        index += 1;
        console.log("****執行clickshow START****");

        // fetchHomePassNumber(index);
        // getDetailTable(index);
        getReportDetail(index);

        //顯示Modal
        setShowAPI(true);
    }

    useEffect(() => {
        setEffectiveReportDetail([]);
        // fetchHomePassNumber(pctnRef.current);
        // getDetailTable(pctnRef.current);
        getReportDetail(pctnRef.current);
    }, [pctnRef.current])


    useEffect(() => {
        fetchReportData();
    }, [SSL, hostname])

    function fetchReportData() {
        setLoading(true);


        let getConditionUrl = "";
        let getInitUrl = "";
        let isSearchByAPI = true;

        // 初次Render畫面
        if (!searchedRef.current) {
            getInitUrl = `${props.SSL}//${hostname}/APIs/ProductStatistics`;

        } else {
            getConditionUrl = `${SSL}//${hostname}/APIs/ProductStatistics?s=${matchRegex(paramsSearch.get('startDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || startDate}T00:00:00&e=${matchRegex(paramsSearch.get('endDate'), /[0-9]{4}-[0-9]{2}-[0-9]{2}/) || endDate}T23:55:55`;
        }

        if (!isSearchByAPI) {
            setArrTable([]);
            setLoading(false);

        } else {

            fetch(searchedRef.current ? getConditionUrl : getInitUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result.resultObject)
                if (result.Result === "Success") {
                    setEffectiveReport(result.Detail);
                    setLoading(false);
                }

            });
        }
    }

    const submit = () => {
        setLoading(true);
        setSearched(true);

        // initFetchData();
        fetchReportData();
    }

    return (
        <>
            <BreadCrumb currentPage="環保標章產品審查通過及有效數報表" />
            <div className="">
                <img
                    src={markBannerSmall}
                    className="w-100 banner"
                    alt="環保標章產品審查通過及有效數報表"
                />
            </div>
            <div className="">
                {/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link
                                to={`/categories/GreenProductReport`}
                                className="leftbtnFocus"
                                title="環保標章產品審查通過及有效數報表"
                            >
                                <div className="col-12 col-md-6 col-lg-12">
                                    環保標章產品審查通過及有效數報表
                                </div>
                            </Link>
                            <Link to={`/categories/GreenProductCount`}>
                                <div
                                    className="col-12 col-md-6 col-lg-12"
                                    title="廠商獲頒產品數統計"
                                >
                                    廠商獲頒產品數統計
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>環保標章產品審查通過及有效數報表</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">

                                <div className="d-flex">
                                    <div>通過時間從 </div>

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

                                    <div> 到 </div>
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

                                <input
                                    id="btnSearch"
                                    className="btn btn-success"
                                    style={{ background: '#6cb15e', color: 'white' }}
                                    value="開始查詢"
                                    type="submit"
                                    onClick={submit}
                                />
                                <input
                                    id="btnReset"
                                    className="btn btn-success"
                                    style={{ background: '#6cb15e', color: 'white' }}
                                    value="重新設定"
                                    type="button"
                                    onClick={reset}
                                />
                                <div className="table-outter-wrapper">
                                    {loading ? (
                                        <Loader loading={loading} />
                                    ) : effectiveReport.length === 0 ? (
                                        <p>查無搜尋結果</p>
                                    ) : (
                                        <table className="review-card rwd-table">
                                            <thead
                                                className="text-content-wrapper text-content-wrapper-darkgreen"
                                                style={{ 'text-align': 'center' }}
                                            >
                                                <tr>
                                                    <th>產品類別</th>
                                                    <th>家次*</th>
                                                    <th>通過數*</th>
                                                    <th>有效數*</th>
                                                    <th>展開/收合</th>
                                                </tr>
                                            </thead>
                                            <tbody className="card-content-office card-content-darkgreen">
                                                {tableData}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* API服務說明 */}

            <div>
                <Modal
                    show={showAPI}
                    onHide={handleShowAPIClose}
                    size="xl"
                    centered="true"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{categoryName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            effectiveReportDetail.length === 0 ?
                                <Spinner animation="border" variant="success" />
                                :
                                <table className="table table-responsive-md">
                                    <thead>
                                        <tr>
                                            <th>規格標準編號</th>
                                            <th>產品類別</th>
                                            <th>家次*</th>
                                            <th>通過數*</th>
                                            <th>有效數*</th>
                                        </tr>
                                    </thead>
                                    <tbody>{tableDetailData}</tbody>
                                </table>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleShowAPIClose}>
                            關閉
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Footer />
        </>
    );
}

export default withRouter(GreenProductReport);
