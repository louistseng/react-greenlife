import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Member/GreenPoint/Point.scss';

const ProgressBar = React.lazy(() => import('../../Components/ProgressBar'));

function Regular(props) {
    let domain = window.location.hostname

    const MileStoneTableData = (
        // applyRecords.map((data, index) => {
        //     const { createTime, desc, status, statusUser } = data
        //     return (
            <>
                <tr>
                    <td data-title="常態性任務" className="">
                        <h5>累積登入天數達30天</h5>
                        <ProgressBar done={100}/>
                    </td>
                    <td data-title="" className="number-center">30/30</td>
                    <td data-title="" className="number-center">+50分</td>
                    <td data-title="執行任務"><div className="getPoint-btn">領取獎勵</div></td>
                </tr>
                  <tr>
                    <td data-title="常態性任務" className="">
                        <h5>累積分享達30篇</h5>
                         <ProgressBar done={16.6}/>
                    </td>
                    <td data-title="" className="number-center">5/30</td>
                    <td data-title="" className="number-center">+200分</td>
                    <td data-title="執行任務"><Link className="getPoint-btn gotPoint">領取獎勵</Link></td>
                </tr>
            </>
               
        //     )
        // })
    )

    return (
        <>
          
            <div className="regularMission">
                 <table className="regular-table">
                    <thead className="regular-table-head">
                       <tr>
                         <th className="align-center table-head">里程碑任務</th>
                         <th></th>
                         <th></th>
                         <th className="align-center table-head">領取</th>
                      </tr>
                    </thead>
                    <tbody className="regular-table-body mileStone-table">
                        {MileStoneTableData}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Regular;