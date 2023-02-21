import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { clickLogout, formatDate } from '../../utils/Functions';
import '../office/Review.scss';
import ReactPaginate from 'react-paginate';
import { clickRecord, fetchGreenliving } from '../../utils/API';
import { useCookies } from "react-cookie";
import ManagementTable from '../../Components/ManagementTable/ManagementTable';

function ClickDetail(props) {
    var XLSX = require('xlsx');
    let history = useHistory()

    var serialize = require('serialize-javascript');

    const [greenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const [fetchData, setFetchData] = useState([]);
    //const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const greenlivingData = (history.location.search.slice(1) === "6-1" || history.location.search.slice(1) === "7-1" || history.location.search.slice(1) === "7-2" || history.location.search.slice(1) === "8-1")
    const [greenlivingTitle, setGreenlivingTitle] = useState([]);


    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = "10"


    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const [subTitleType, setSubTitleType] = useState(history.location.search.slice(1));

    const [greenlivingArr, setGreenlivingArr] = useState([]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    //抓URL改變,例如上一頁(history.push)
    const location = useLocation();
    useEffect(() => {
        setSubTitleType(history.location.search.slice(1))
    }, [location]);

    //點閱計數API
    useEffect(() => {
        clickRecord("10B47B55-58B0-4646-AD4E-D728094679CB", "24", collector)
    }, [collector]);

    //會員專區-管理者專區-瀏覽數
    useEffect(() => {
        submit()

    }, [subTitleType, page]);


    const submit = () => {
        setLoading(true)

        if (subTitleType)
            fetch(`${props.SSL}//${props.domain}/api/api/Manager/Views/Sub`, {
                method: 'POST',
                body: serialize({
                    StartTime: startTime ? String(formatDate(startTime)) : "",
                    EndTime: endTime ? String(formatDate(endTime)) : "",
                    TypeId: subTitleType,
                    Page: String(page),
                    Count: count
                }),
                headers: myHeaders
            })
                .then(res => {
                    if (res.status === 401) {
                        clickLogout(removeCookie, collector)
                        throw new Error(res.statusText);
                    } else {
                        return res.json();
                    }
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        setLoading(false)
                        setPageCount(result.resultObject.pageCount)
                        setFetchData(result.resultObject.views)

                        let greenlivingArray = []
                        result.resultObject.views.map(function (obj) {
                            var rObj = {};
                            greenlivingArray.push(obj.title);
                            return rObj;
                        })
                        // console.log(greenlivingArray)
                        setGreenlivingArr(greenlivingArray)

                        if (greenlivingData) {
                            fetchGreenliving(subTitleType, greenlivingArray, setGreenlivingTitle)

                        }
                    }
                });

    }

    // console.log(greenlivingTitle)
    // console.log(greenlivingArr)

    //greenlivingTitle.forEach(data => console.log(data.Id, greenlivingArr.indexOf(String(data.Id))));


    const matchId = (data) => {

        switch (subTitleType) {
            //綠色餐廳Guid抓Id欄位, 名稱抓Name欄位
            case "6-1":
                return greenlivingTitle[greenlivingTitle.findIndex(obj => obj.Id == data)]?.Name;
            //綠色旅遊Guid抓ProjNo欄位, 名稱抓ProjName欄位
            case "7-1":
                return greenlivingTitle[greenlivingTitle.findIndex(obj => obj.ProjNo == data)]?.ProjName;
            case "7-2":
                return greenlivingTitle[greenlivingTitle.findIndex(obj => obj.ProjNo == data)]?.ProjName;
            //綠色旅宿Guid抓Num欄位
            case "8-1":
                return greenlivingTitle[greenlivingTitle.findIndex(obj => obj.Num == data)]?.Name;

        }



    }

    const tableHead = ["頁面分類", "名稱", "瀏覽量"]
    const tableData = (
        fetchData.map((data, index) => {
            const { subType, clickCount, title } = data
            return (
                <tr key={index}>
                    <td data-title={tableHead[0]} className="list-date">{subType}</td>
                    {greenlivingData ?
                        <td className="download-time" key={matchId(title)}>{matchId(title)}</td>
                        :
                        <td data-title={tableHead[1]} className="download-time">{title}</td>}
                    <td data-title={tableHead[2]}>{clickCount}
                    </td>
                </tr >
            )
        })
    )


    function handleExport() {

        const fileDate = formatDate(startTime) + "-" + formatDate(endTime)
        if (typeof XLSX == 'undefined') XLSX = require('xlsx');
        var ws = XLSX.utils.json_to_sheet(fetchData);
        //隱藏橫列
        // ws['!rows'] = [];
        // ws['!rows'][0] = { hidden: true };
        //隱藏直行
        ws['!cols'] = [];
        // ws['!cols'][1] = { hidden: true };
        // ws['!cols'][0] = { hidden: true };
        var wb = XLSX.utils.book_new();

        ws.A1.v = tableHead[0]
        ws.B1.v = tableHead[1]
        ws.C1.v = tableHead[2]

        XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
        XLSX.writeFile(wb, `全民綠生活_瀏覽量_${fileDate}.ods`);

        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");

    }


    return (
        <>

            {/* <BreadCrumb currentPage={"瀏覽量檢視"} /> */}

            {/* <div className="container member-info-wrapper shareBlog row"> */}
            {/* <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

            <div className="col-12 col-lg-8">
                <h3 className="green-title">瀏覽量檢視</h3>
                <div className="search-conditions clickRecord-search">
                    <div className="input-wrapper">
                        <label for="anotherStartDatetime" className="member-info-label">開始</label>
                        <div className="time-label-wrapper">
                            <input
                                className="startDatetime"
                                type="date"
                                name="anotherStartDatetime"
                                id="anotherStartDatetime"
                                defaultValue={startTime}
                                onBlur={(e) => setStartTime(e.target.value)}
                            ></input>
                        </div>
                        <div className="time-label-wrapper">
                            <label for="anotherEndDatetime" className="member-info-label">結束</label>
                            <input
                                className="endDatetime"
                                type="date"
                                name="anotherEndDatetime"
                                id="anotherEndDatetime"
                                defaultValue={endTime}
                                onBlur={(e) => setEndTime(e.target.value)}
                                min={startTime}
                            ></input>
                        </div>
                    </div>
                    <button onClick={submit} className="condition-submit-btn">查詢</button>
                    <button onClick={handleExport} className="condition-submit-btn">匯出</button>
                </div>

                <ManagementTable key={tableData} tableData={tableData} fetchData={fetchData} loading={loading} tableHead={tableHead} />
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
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                />
            </div>


            {/* </div> */}

            {/* 
            <Footer /> */}

        </>
    );
}

export default withRouter(ClickDetail);