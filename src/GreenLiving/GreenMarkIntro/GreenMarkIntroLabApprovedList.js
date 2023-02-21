import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../GreenLabel.css'
import markBannerSmall from '../../images1/img/banner_mark_small.jpg';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenMarkIntroLabApprovedList(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    {/*fetch有效的環保署審議委員認可清單*/ }
    const [approvedList, setApprovedList] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domainFormal}/APIs/ApprovedList`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setApprovedList(result.Detail);
            });
    }, [SSL, domainFormal]);
    console.log(approvedList);
    return (
        <>
            <BreadCrumb currentPage="【檢測實驗室資訊查詢】環保署審議委員認可清單" />
            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="環保署審議委員認可清單" /></div>
            <div className="">{/*container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/greenLabel/GreenMarkIntroCertificationLab`}><div className="col-12 col-md-6 col-lg-12">經認證的檢測實驗室</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroApprovalPractice`}><div className="col-12 col-md-6 col-lg-12">檢測機構(實驗室)<br />申請檢測項目登錄<br />認可規範</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLaboratory`}><div className="col-12 col-md-6 col-lg-12">實驗室查詢</div></Link>
                            <Link to={`/greenLabel/GreenMarkIntroLabApprovedList`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">環保署審議委員認可清單</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h1>環保署審議委員認可清單</h1>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <talbe className="table-fixed table-lab-approved-list table-small-text">
                                    <thead>
                                        <tr className="table-head-dark">
                                            <th>檢測項目</th>
                                            <th>基質</th>
                                            <th>檢測機構</th>
                                            <th>實驗室</th>
                                            <th>檢測方法</th>
                                            <th>MDL</th>
                                            <th>備註</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {approvedList.sort((a, b) => a.ApprovedTimeStart <= b.ApprovedTimeStart ? 1 : -1).map((data, index) =>
                                            <tr className={index % 2 == 0 ? "table-head-light" : "table-row-dark"}>
                                                <td>{data.TestItems}</td>
                                                <td>{data.Matrix}</td>
                                                <td>{data.TestingOrganizations}</td>
                                                <td>{data.Laboratory}</td>
                                                <td>{data.Detection}</td>
                                                <td>{data.MDL}</td>
                                                <td>{data.Remark}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </talbe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenMarkIntroLabApprovedList);
