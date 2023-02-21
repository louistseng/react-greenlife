import React, { useState, useEffect } from 'react';
import { getMemberProfile } from '../utils/API';
import '../Member/office/evaluation.scss';
import Footer from '../Components/Footer';
import BreadCrumb from '../Components/BreadCrumb';
import SideBtnOffice from '../Components/SideBtnOffice';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { checkAuth, clickLogout } from '../utils/Functions'
import ComfirmAlert from '../Components/ComfirmAlert';
import earthImg from '../images1/greenOffice/earth.png';
import reduceImg from '../images1/greenOffice/reduce.png';
import greenShopImg from '../images1/greenOffice/greenShop.png';
import leefImg from '../images1/greenOffice/leef.png';
import promoteImg from '../images1/greenOffice/promote.png';
import { useCookies } from "react-cookie";

import { energyCheckboxes, waterCheckboxes, fuelCheckboxes, paperCheckboxes, reduceCheckboxes, trashCheckboxes, itemShopCheckboxes, plantCheckboxes, teachCheckboxes } from '../Member/office/checkboxes';


function Evaluation(props) {

    const [memberInfo, setMemberInfo] = useState([]);
    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identity = greenlifeCookies.identityType || 0;

    //引入router路徑紀錄
    let history = useHistory()
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [showNote, setShowNote] = useState(true);


    //綠色辦公-判斷組織權限
    useEffect(() => {
        if (collector && memberToken) {
            getMemberProfile(collector, memberToken, clickLogout, removeCookie)
                .then(result => {
                    if (result.isSucess) {
                        setMemberInfo(result.resultObject)
                    }
                })
        }
    }, [collector, memberToken])


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={showDialog} alertTitle={alertTitle} subTitle={showNote ? "" : "若權限與實際不符，請撥打平台客服專線由專人為您服務"} showLoginBtn={showNote} history={history} showNote={showNote} />
            }
            <BreadCrumb currentPage={"響應自評表"} />
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="office_evaluation container">
                <div className="top-step-wrapper">
                    <div><h1 className="steps-title">綠色辦公響應指標及措施</h1></div>
                </div>

                <div className="energy-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={earthImg} alt="節省能資源" />
                        <h2>指標1&nbsp;:&nbsp;節省能資源</h2>
                    </div>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目1</p></div>
                            <h3>節約用電</h3>
                        </div>
                        {energyCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_1_${index}`}>
                                <label title="節約用電" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>

                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目2</p></div>
                            <h3>節約用水</h3>
                        </div>
                        {waterCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_2_${index}`}>
                                <label title="節約用水" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目3</p></div>
                            <h3>節約用油</h3>
                        </div>
                        {fuelCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_3_${index}`}>
                                <label title="節約用油" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目4</p></div>
                            <h3>節約用紙</h3>
                        </div>
                        {paperCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_4_${index}`}>
                                <label title="節約用紙" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>



                </div>

                <div className="reduce-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={reduceImg} alt="源頭減量" />
                        <h2>指標2&nbsp;:&nbsp;源頭減量</h2>
                    </div>
                    <div className="banner-line"></div>

                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目1</p></div>
                            <h3>減塑減廢</h3>
                        </div>
                        {reduceCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item2_1_${index}`}>
                                <label title="減塑減廢" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目2</p></div>
                            <h3>分類及回收再用</h3>
                        </div>
                        {trashCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item2_2_${index}`}>
                                <label title="分類及回收再用" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="greenShop-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={greenShopImg} alt="綠色採購" />
                        <h2>指標3&nbsp;:&nbsp;綠色採購</h2>
                    </div>
                    <div className="banner-line"></div>

                    <ul className="energy-list">
                        <div className="text-wrapper">
                            {/* <div className="list-title"><p>項目1</p></div>
                            <h3>用品採購</h3> */}
                        </div>
                        {itemShopCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item3_1_${index}`}>
                                <label title="綠色採購" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="envir-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={leefImg} alt="環境綠美化" />
                        <h2>指標4&nbsp;:&nbsp;環境綠美化</h2>
                    </div>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            {/* <div className="list-title"><p>項目1</p></div>
                            <h3>綠化植栽</h3> */}
                        </div>
                        {plantCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item4_1_${index}`}>
                                <label title="環境綠美化" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="promote-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={promoteImg} alt="宣導倡議" />
                        <h2>指標5&nbsp;:&nbsp;宣導倡議</h2>
                    </div>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            {/* <div className="list-title"><p>項目1</p></div>
                            <h3>教育宣導</h3> */}
                        </div>
                        {teachCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item5_1_${index}`}>
                                <label title="宣導倡議" className="checkbox-text" key={item.key}>{item.label}</label>
                            </div>
                        ))}
                        <div className="text-area-wrapper">
                            <label title="其他（請自行列舉具體措施）" className="checkbox-text">8. 其他（請自行列舉具體措施）</label>
                        </div>
                    </ul>

                </div>

                <div className="step-join-btn-wrapper">
                    <Link className="office-join-btn" onClick={() => checkAuth(identity, memberInfo.unitCode, setShowDialog, setAlertTitle, setShowNote, history)} to={memberToken ? (identity === "2" || identity === "4") ? Boolean(memberInfo?.unitCode?.match(/-0|-GL$/g)) ? "/categories/green_office/evaluation" : "/categories/green_office/steps" : "/categories/green_office/evaluation" : "#"}>
                        <img src={leefImg} alt="綠色辦公-簡介" />
                        <p>&nbsp;我要響應</p>
                    </Link>
                </div>

            </div>

            <SideBtnOffice history={history} type={"綠色辦公"} />
            <Footer />
        </>
    );
}

export default withRouter(Evaluation);
