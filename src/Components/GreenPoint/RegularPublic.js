import React, { useEffect, useState } from 'react';
import '../../Member/GreenPoint/Point.scss';


function RegularPublic(props) {
    let SSL = window.location.protocol;
    let domain = window.location.hostname.includes("localhost") ? 'greenlife.eri.com.tw' : window.location.hostname;

    //我的綠積分任務-常態性任務-里程碑任務-主題特殊任務
    const [missionData, setMissionData] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Point/MissionRole/1`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result)
            if (result.isSucess)

                setMissionData(result.resultObject)
        })
    }, [])

    const RegularTableData = (

        <>
            <tr className="title-tr">
                <td data-title="綠生活知識＋" className="">綠生活知識＋</td>
                <td></td>
                <td></td>

            </tr>
            {missionData.filter(obj => obj.subTypeId === 1).map((data, index) => {
                const { limitDesc, missionLink, point, title, todayPoint } = data
                return (
                    <tr className="seperate-regular-table" key={index}>
                        <td data-title="常態性任務" className="">{title}</td>
                        <td data-title="獲得積分" className="number-center">+{point}</td>
                        <td data-title="每日上限" className="number-center">+{limitDesc}</td>

                    </tr>
                )
            })}
            <tr className="title-tr">
                <td data-title="綠生活分享＋" className="">綠生活分享＋</td>
                <td></td>
                <td></td>

            </tr>
            {missionData?.filter(obj => obj.subTypeId === 2).map((data, index) => {
                const { limitDesc, missionLink, point, title, todayPoint } = data
                return (
                    <tr className="seperate-regular-table" key={index}>
                        <td data-title="常態性任務" className="">{title}</td>
                        <td data-title="獲得積分" className="number-center">+{point}</td>
                        <td data-title="每日上限" className="number-center">+{limitDesc}</td>

                    </tr>
                )
            })}

            <tr className="title-tr">
                <td data-title="綠生活實踐＋" className="">綠生活實踐＋</td>
                <td></td>
                <td></td>

            </tr>
            {missionData?.filter(obj => obj.subTypeId === 3).map((data, index) => {
                const { limitDesc, missionLink, point, title, todayPoint } = data
                return (
                    <tr className="seperate-regular-table" key={index}>
                        <td data-title="常態性任務" className="">{title}</td>
                        <td data-title="獲得積分" className="number-center">+{point}</td>
                        <td data-title="每日上限" className="number-center">+{limitDesc}</td>

                    </tr>
                )
            })}

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
export default RegularPublic;