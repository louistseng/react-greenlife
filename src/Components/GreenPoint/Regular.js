import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clickRecord } from '../../utils/API';
import '../../Member/GreenPoint/Point.scss';
import { useCookies } from "react-cookie";

function RegularMission(props) {

    const [greenlifeCookies] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    //點閱計數API
    useEffect(() => {
        clickRecord("3D8B971D-7711-41AE-8010-7C25A0140800", "22", collector)
    }, [collector]);

    const RegularTableData = (

        <>
            <tr className="title-tr">
                <td data-title="綠生活知識＋" className="">綠生活知識＋</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            {props.missionData.filter(obj => obj.subTypeId === 1).map((data, index) => {
                const { limitDesc, missionLink, point, title, roleDesc, todayPoint } = data
                return (
                    <tr className="seperate-regular-table" key={index}>
                        <td data-title="常態性任務" className="">
                            <div className="d-flex">{title}
                                <div className="manageTable-name">
                                    <i className="fas fa-question-circle" aria-hidden="true"></i>
                                    <div className="point-percent">
                                        {roleDesc?.split('<br>').map((items, index) =>
                                            <h6 key={index}>{items}</h6>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td data-title="獲得積分" className="number-center">+{point}</td>
                        <td data-title="每日上限" className="number-center">+{limitDesc}</td>
                        <td data-title="本日獲得" className="number-center" style={{ color: "#342EF3" }}>+{todayPoint}</td>
                        <td data-title="執行任務"><Link to={decodeURIComponent(missionLink)} className="execute-btn">執行GO!</Link></td>
                    </tr>
                )
            })}
            <tr className="title-tr">
                <td data-title="綠生活分享＋" className="">綠生活分享＋</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            {props?.missionData?.filter(obj => obj.subTypeId === 2).map((data, index) => {
                const { limitDesc, missionLink, point, title, roleDesc, todayPoint } = data
                return (
                    <tr className="seperate-regular-table" key={index}>
                        <td data-title="常態性任務" className="">
                            <div className="d-flex">{title}
                                <div className=" manageTable-name">
                                    <i className="fas fa-question-circle" aria-hidden="true"></i>
                                    <h6 className="point-percent">{roleDesc}</h6>
                                </div>
                            </div>
                        </td>
                        <td data-title="獲得積分" className="number-center">+{point}</td>
                        <td data-title="每日上限" className="number-center">+{limitDesc}</td>
                        <td data-title="本日獲得" className="number-center" style={{ color: "#342EF3" }}>+{todayPoint}</td>
                        <td data-title="執行任務"><Link to={decodeURIComponent(missionLink)} className="execute-btn">執行GO!</Link></td>
                    </tr>
                )
            })}

            {/* <tr className="title-tr">
                            <td data-title="綠生活實踐＋" className="">綠生活實踐＋</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {props?.missionData?.filter(obj => obj.subTypeId === 3).map((data, index) => {
                            const { limitDesc, missionLink, point, title, roleDesc, todayPoint } = data
                            return (
                                <tr className="seperate-regular-table" key={index}>
                                    <td data-title="常態性任務" className="">
                                        <div className="d-flex">{title}
                                            <div className=" manageTable-name">
                                                <i className="fas fa-question-circle"></i>
                                                <h6 className="point-percent">{roleDesc}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title="獲得積分" className="number-center">+{point}</td>
                                    <td data-title="每日上限" className="number-center">+{limitDesc}</td>
                                    <td data-title="本日獲得" className="number-center" style={{ color: "#342EF3" }}>+{todayPoint}</td>
                                    <td data-title="執行任務"><Link to={decodeURIComponent(missionLink)} className="execute-btn">執行GO!</Link></td>
                                </tr>
                            )
                        })} */}

        </>


    )

    return (
        <>

            <div className="regularMission">
                <table className="regular-table">
                    <thead className="regular-table-head">
                        <tr>
                            <th>常態性任務</th>
                            <th>獲得積分</th>
                            <th>每日上限</th>
                            <th>本日獲得</th>
                            <th>執行任務</th>
                        </tr>
                    </thead>
                    <tbody className="regular-table-body">
                        {RegularTableData}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default RegularMission;