import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import { formatDateTime } from '../../src/utils/Functions';
import '../CustomerService/EmailService.scss';


const BreadCrumb = React.lazy(() => import("../Components/BreadCrumb"));
const Footer = React.lazy(() => import("../Components/Footer"));

function CallService() {

    // const [tel, setTel] = useState("(02)7753-3766#438")
    // const date = new Date()

    // useEffect(() => {
    //     if (formatDateTime(date) >= "2022/07/11 00:00")
    //         setTel("(02)2361-1999")
    // }, [])


    return (
        <>
            <div className="container">
                <BreadCrumb current={"諮詢專線"} />

                <Table className="call-service-table my-4">
                    <thead >
                        <tr className="col-12">
                            <th className="col-3"><h1>諮詢項目</h1></th>
                            <th className="col-3"> </th>
                            <th className="col-3">單位名稱</th>
                            <th className="col-3">聯絡項目</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="item-title item-color-first">
                            <td><h2>全民綠生活</h2></td>
                            <td>申請相關業務(綠色餐廳、綠色旅遊)</td>
                            <td>工業技術研究院</td>
                            <td> (06)363-6619 張小姐</td>
                        </tr>
                        <tr className="item-color-first">
                            <td></td>
                            <td>系統操作業務</td>
                            <td>環資國際有限公司</td>
                            <td>(02)2361-1999#437<p><Link to="/EmailService">寄信至系統客服信箱</Link></p></td>

                        </tr>
                        <tr className="item-title item-color-second">
                            <td><h2>政府機關及民間企業綠色採購</h2></td>
                            <td>政府機關及民間企業綠色採購(含系統操作、帳密管理，如忘記密碼、密碼被鎖定問題)</td>
                            <td>環資國際有限公司</td>
                            <td>(02)2361-1999#438<p><Link to="/EmailService">寄信至系統客服信箱</Link></p></td>

                        </tr>
                        <tr className="item-color-second">
                            <td></td>
                            <td>機關綠色採購評核舆不統計審查(含綠色採購範疇、評核標準、不統計審查)</td>
                            <td>財團法人台灣產業服務基金會</td>
                            <td>(02)7704-5254<p className="m-0">(02)7704-5268</p><p>(如電話無人接聽，請改寄電子郵件至<a href="mailto:yishwang@ftis.org.tw"> yishwang@ftis.org.tw</a>)</p></td>
                        </tr>
                        <tr className="item-title item-color-third">
                            <td><h2>環保標章</h2></td>
                            <td>環保標章-申請與驗證(含廠商申請環保標章之流程及驗證標準諮詢)</td>
                            <td>
                                <tr>財團法人台灣商品檢測驗證中心</tr>
                                <td></td>
                                <tr>財團法人環境與發展基金會</tr>
                            </td>
                            <td>
                                <tr>(03)328-0026#139</tr>
                                <td></td>
                                <tr>0800-300-556<p>(如電話無人接聽，請改寄電子郵件至<a href="mailto:victor@edf.org.tw"> victor@edf.org.tw</a>)</p></tr>
                            </td>
                        </tr>
                        <tr className="item-bottom item-color-third">
                            <td></td>
                            <td>環保標章-系統操作(含申請環保標章之系統操作問題)</td>
                            <td>環資國際有限公司</td>
                            <td>(02)2361-1999#438<p><Link to="/EmailService">寄信至系統客服信箱</Link></p></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(CallService);
