import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { clickLogout, formatDate } from '../../utils/Functions';
import '../office/Review.scss';
import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";
import ManagementTable from '../../Components/ManagementTable/ManagementTable';


function ClickRecordPage(props) {
    var XLSX = require('xlsx');

    var serialize = require('serialize-javascript');

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [fetchData, setFetchData] = useState([]);
    //const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("9465E3C6-7A0B-41B0-B7F0-13E7CFF1B5BB", "24", collector)
    }, [collector]);

    //會員專區-管理者專區-綠色辦公審核
    useEffect(() => {
        submit()

    }, []);

    const submit = () => {
        setLoading(true)

        fetch(`${props.SSL}//${props.domain}/api/api/Manager/Views`, {
            method: 'POST',
            body: serialize({
                StartTime: startTime ? String(formatDate(startTime)) : "",
                EndTime: endTime ? String(formatDate(endTime)) : ""
            }),
            headers: myHeaders
        })
            .then(res => {
                // console.log(res)
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
                    setFetchData(result.resultObject)

                }
            });

    }



    const tableHead = ["頁面分類", "包含頁面", "瀏覽量"]

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

    const tableData = (
        fetchData.map((data, index) => {
            const { mainType, subType, clickCount, typeId, hasSubView } = data
            return (
                <tr key={index}>
                    <td data-title={tableHead[0]} className="list-date">{mainType}</td>
                    <td data-title={tableHead[1]} className="download-time">{subType}</td>
                    <td data-title={tableHead[2]}>
                        {hasSubView ?
                            <Link to={`/member/click_record/detail_page?${typeId}`}>請點擊連結</Link>
                            :
                            clickCount}
                    </td>
                </tr >
            )
        })
    )


    return (
        <>

            {/* <BreadCrumb currentPage={"瀏覽量檢視"} />
            <div className="container member-info-wrapper shareBlog row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

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

                <ManagementTable tableData={tableData} fetchData={fetchData} loading={loading} tableHead={tableHead} />
            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(ClickRecordPage);