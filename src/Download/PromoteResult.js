import React, { useState, useEffect } from 'react';
import './Download.scss';

import { withRouter } from 'react-router-dom';
import { getYear, formatDate } from '../utils/Functions';
import { clickRecord, mulDownloadAPI } from '../utils/API';
import DownloadMark from '../Components/DownloadMark';
import ComfirmAlertDL from '../Components/ComfirmAlertDL';
import PdfIcon from '../images1/download/PdfIcon.png';
import OdfIcon from '../images1/download/OdfIcon.png';
import DocIcon from '../images1/download/DocIcon.png';
import Mp4Icon from '../images1/download/Mp4Icon.png';

import { useCookies } from "react-cookie";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));


function PromoteResult(props) {

    let SSL = props.SSL
    let domain = props.domain

    var serialize = require('serialize-javascript');

    const count = "20";
    const [totalCount, setTotalCount] = useState('');
    const page = "1";
    const [typeId, setTypeId] = useState("0");
    const [detailId, setDetailId] = useState("0");
    const [keyWord, setKeyWord] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [markTypeId, setMarkTypeId] = useState("")

    const [zipName, setZipName] = useState('');
    const [zipLoad, setZipLoad] = useState(false);
    const [dLAreaTheme] = useState('1')

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    //點閱計數API
    useEffect(() => {
        clickRecord("94CE4BF7-CB9A-49BE-8276-27CCB1794A60", "20", collector)
    }, [collector]);


    //定義抓取後端api資料
    const [fetchData, setFetchData] = useState([]);
    const [fetchDataGuid, setFetchDataGuid] = useState([]);

    const fetchDataFunction = (refresh) => {

        if (refresh) {
            var dropDown = document.getElementById("detailDrop");
            dropDown.selectedIndex = 0;
            var dropDownType = document.getElementById("typeDrop");
            dropDownType.selectedIndex = 0;
        }

        fetch(`${SSL}//${domain}/api/api/DLoad/Business/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: count,
                StartTime: refresh ? "" : startDate,
                EndTime: refresh ? "" : endDate,
                Title: refresh ? "" : keyWord,
                DetailId: refresh ? "0" : String(detailId),
                TypeId: refresh ? "0" : String(typeId)
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result)
            if (result.isSucess) {
                setFetchData(result.resultObject.listItems)
                setFetchDataGuid(result.resultObject.guids)
                setTotalCount(result.resultObject.totalCount)
                setZipName('業務推動成果-所有檔案')
            }
        })
    }

    //下載專區-業務推動成果列表(排序新>舊)API
    useEffect(() => {
        setMarkTypeId("1")
        fetchDataFunction()
    }, [])


    //類別下拉項目API
    const [categoryDrop, setCategoryDrop] = useState([]);
    useEffect(() => {

        fetch(`${SSL}//${domain}/api/api/DLoad/Business/Type`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setCategoryDrop(result.resultObject)
            });
    }, [SSL, domain])


    //細項下拉項目API
    const [detailDrop, setDetailDrop] = useState([]);
    useEffect(() => {

        fetch(`${SSL}//${domain}/api/api/DLoad/Business/Detail`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDetailDrop(result.resultObject)
            });
    }, [SSL, domain])


    //Zip批次下載API
    const mulDownload = (e) => {
        clickRecord("9B52A89D-0D69-402E-90C3-8AE36ED4811E", "20", collector)
        e.preventDefault(e)
        mulDownloadAPI(setZipLoad, fetchDataGuid, dLAreaTheme, zipName)
    }


    const tableData = (
        fetchData.map((data, index) => {
            const { createTime, guid, title, pdf, odf, doc, mP4, typeName, detailName } = data
            return (
                <tr key={index} id={guid}>
                    <td className="list-date download_promote" data-title="上架日期" style={getYear(createTime) === 2021 ? { color: "#0066FF" } : { color: "#FF3333" }}>{formatDate(createTime)}</td>
                    <td className="download-time download_promote" data-title="檔案名稱">{title}</td>
                    <td className="download_promote" data-title="類別">{typeName}</td>
                    <td className="download_promote" data-title="細項">{detailName}</td>
                    <td className="link-wrapper download_promote" data-title="檔案下載">
                        {pdf &&
                            <a onClick={() => clickRecord(guid, "20-5", collector)} title="下載PDF檔案" target="_blank" rel="noopener noreferrer" href={pdf} download={title + ".pdf"}>
                                <img src={PdfIcon} alt="下載PDF" aria-label="下載PDF" />
                            </a>}
                        {odf &&
                            <a onClick={() => clickRecord(guid, "20-5", collector)} title="下載ODS檔案" target="_blank" rel="noopener noreferrer" href={odf} download={title + ".odf"}>
                                <img src={OdfIcon} alt="下載ODS" aria-label="下載ODS" />
                            </a>}
                        {doc &&
                            <a onClick={() => clickRecord(guid, "20-5", collector)} title="下載DOC檔案" target="_blank" rel="noopener noreferrer" href={doc} download={title + ".doc"}>
                                <img src={DocIcon} alt="下載DOC" aria-label="下載DOC" />
                            </a>}
                        {mP4 &&
                            <a onClick={() => clickRecord(guid, "20-5", collector)} title="下載MP4檔案" target="_blank" rel="noopener noreferrer" href={mP4} download={title + ".mP4"}>
                                <img src={Mp4Icon} alt="下載MP4" aria-label="下載MP4" />
                            </a>}
                    </td>
                </tr>
            )
        })
    )

    return (
        <>
            <BreadCrumb currentPage={"業務推動成果"} />
            <div className={zipLoad ? "black-background show" : "black-background"}></div>
            <div className="download-graph container">
                {zipLoad &&
                    <ComfirmAlertDL totalCount={fetchDataGuid.length} zipLoad={zipLoad} />
                }
                <div className="content-wrapper">
                    <DownloadMark typeId={markTypeId} setTypeId={setMarkTypeId} />
                    <div className="graph-main-content">

                        <div className="graph">
                            <h2><i className="fas fa-search" aria-hidden="true" alt="查詢條件圖示"></i>&nbsp;查詢條件</h2>

                        </div>

                        <div className="search-wrapper">
                            <div className="input-search">
                                <div className="promote-search-wrapper">
                                    <div className="keyword-search section-search">
                                        <label for="search-text">關鍵字&emsp;&nbsp;</label>
                                        <div className="input-icon-wrapper">
                                            <input
                                                value={keyWord}
                                                type="text"
                                                name="search-text"
                                                id="search-text"
                                                placeholder="請輸入關鍵字"
                                                onKeyPress={e => {
                                                    if (e.which === 13) {
                                                        fetchDataFunction(false)
                                                    }
                                                }}
                                                onChange={e => setKeyWord(e.target.value === "" ? " " : e.target.value)}
                                                title="請輸入關鍵字"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="section-search">
                                    <label for="srartDate">上架日期&nbsp;</label>
                                    <div className="date-wrapper">
                                        <input
                                            type="date"
                                            name="srartDate"
                                            id="srartDate"
                                            onChange={e => setStartDate(e.target.value)}
                                            max={endDate}
                                            value={startDate}
                                            title="開始日期"
                                        ></input>
                                        <label for="endDate">至</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            onChange={e => setEndDate(e.target.value)}
                                            min={startDate}
                                            value={endDate}
                                            title="結束日期"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="drop-search">
                                <div>
                                    <div className="section-search drop-div">
                                        <label for="typeDrop">類別&nbsp;</label>

                                        <div>
                                            <select id="typeDrop" onBlur={e => setTypeId(e.target.value)} aria-label="Please Select">
                                                <option value="0">請選擇</option>
                                                {categoryDrop.map((cate, index) =>
                                                    <option name="categoryDrop" key={index} value={cate.typeId}>{cate.typeName}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="section-search drop-div">
                                        <label for="detailDrop">細項&nbsp;</label>
                                        <div>
                                            <select id="detailDrop" onBlur={e => setDetailId(e.target.value)} aria-label="Please Select">
                                                <option value="0">請選擇</option>
                                                {detailDrop.map((detail, index) =>
                                                    <option name="detailDrop" key={index} value={detail.id}>{detail.name}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="search-area">
                                <div className="search-btn-wrapper">
                                    <button className="promote-search-btn" onClick={() => fetchDataFunction(false)} tabIndex={0}>查詢</button>
                                    <button className="all-download-btn" onClick={() => {
                                        fetchDataFunction(true)
                                        setKeyWord("")
                                        setStartDate("")
                                        setEndDate("")
                                    }} tabIndex={0} >重新查詢</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="graph-list">
                                <h3 className="section-title"> <i className="fas fa-download" aria-hidden="true" alt="檔案列表圖示"></i>檔案列表</h3>
                                <button className="all-download-btn" onClick={e => mulDownload(e)} tabIndex={0}>批次下載</button>
                            </div>
                            <div className="search-download-result">查詢結果共:&nbsp;<p>{totalCount}</p>&nbsp;筆</div>
                            <>
                                {fetchData.length === 0
                                    ?

                                    <div className="embla-bottom">
                                        <div className="embla__viewport">
                                            <p>查無搜尋結果</p>
                                        </div>
                                    </div>
                                    :

                                    <div>

                                        <table className="download-promote-card rwd-table download_promote">
                                            <thead className="text-content-wrapper">
                                                <tr>
                                                    <th className="download-th">上架日期</th>
                                                    <th className="download-th">檔案名稱</th>
                                                    <th className="download-th">類別</th>
                                                    <th className="download-th">細項</th>
                                                    <th className="download-th">檔案下載</th>
                                                </tr>
                                            </thead>
                                            <tbody className="card-content">
                                                {tableData}
                                            </tbody>

                                        </table>
                                    </div>


                                }
                            </>
                        </div>
                    </div>


                </div>

                <div style={{ height: "25vh" }} className="search-content"></div>

            </div>
            <Footer />
        </>
    );
}

export default withRouter(PromoteResult);