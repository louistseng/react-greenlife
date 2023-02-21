import React, { useState, useEffect } from 'react';
import './evaluation.scss';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout } from '../../utils/Functions';
import ComfirmAlert from '../../Components/ComfirmAlert';
import earthImg from '../../images1/greenOffice/earth.png';
import reduceImg from '../../images1/greenOffice/reduce.png';
import greenShopImg from '../../images1/greenOffice/greenShop.png';
import leefImg from '../../images1/greenOffice/leef.png';
import promoteImg from '../../images1/greenOffice/promote.png';
import checkImg from '../../images1/greenOffice/check.png';

import { energyCheckboxes, waterCheckboxes, fuelCheckboxes, paperCheckboxes, reduceCheckboxes, trashCheckboxes, itemShopCheckboxes, plantCheckboxes, teachCheckboxes, finalCheckboxes } from './checkboxes';
import Checkbox from './CheckboxEdit';
import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function EvaluationEdit(props) {
    let SSL = props.SSL
    let domain = props.domain

    let history = useHistory()
    var serialize = require('serialize-javascript');

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [subTitle, setSubTitle] = useState(" ");

    const [checkedItems, setCheckedItems] = useState({});
    const [forEPA, setForEPA] = useState(false);
    const [description, setDescription] = useState("");
    const [checkedOption, setCheckedOption] = useState(false);
    const [requiredAlert, setRequiredAlert] = useState(false);
    const [alertText, setAlerText] = useState(false);
    const [empors, setEmpors] = useState("")

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "UserGuid": collector,
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("94AB8647-7EC4-4B72-BD89-106F18750337", "10", collector)
    }, []);

    const handleChange = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setCheckedItems({
            ...checkedItems, [item]: isChecked
        });

    }

    //綠色辦公-響應申請單
    const [fetchStatus, setFetchStatus] = useState(false);
    const [checkboxData, setCheckboxData] = useState([]);
    useEffect(() => {
        if (!memberToken) {
            history.push("/AdvancingPage")
        } else {
            fetch(`${SSL}//${domain}/api/api/GOffice/Participate/${collector}`, {
                method: "GET"
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log(result)
                    setFetchStatus(result.resultObject.isWrite)
                    setCheckboxData(result.resultObject.participate)
                    setDescription(result.resultObject.participate.i5_1_8Desc)
                    setForEPA(result.resultObject.participate.forEPA)
                    // 鎖住checkbox
                    const checkbox = document.querySelectorAll("input[type=checkbox],input[type=number],input[type=radio]")
                    if (result.resultObject.isWrite === true) {
                        for (let i of checkbox) {
                            i.disabled = true;
                        }
                    }
                })
        }
    }, [])


    const sendResult = () => {
        //    console.log(forEPA)
        fetch(`${SSL}//${domain}/api/api/GOffice/Participate/Edit`, {
            method: 'POST',
            body: serialize({
                I1_1_1: String(checkedItems.I1_1_1 !== undefined ? checkedItems.I1_1_1 : checkboxData.i1_1_1),
                I1_1_2: String(checkedItems.I1_1_2 !== undefined ? checkedItems.I1_1_2 : checkboxData.i1_1_2),
                I1_1_3: String(checkedItems.I1_1_3 !== undefined ? checkedItems.I1_1_3 : checkboxData.i1_1_3),
                I1_1_4: String(checkedItems.I1_1_4 !== undefined ? checkedItems.I1_1_4 : checkboxData.i1_1_4),
                I1_1_5: String(checkedItems.I1_1_5 !== undefined ? checkedItems.I1_1_5 : checkboxData.i1_1_5),
                I1_1_6: String(checkedItems.I1_1_6 !== undefined ? checkedItems.I1_1_6 : checkboxData.i1_1_6),
                I1_2_1: String(checkedItems.I1_2_1 !== undefined ? checkedItems.I1_2_1 : checkboxData.i1_2_1),
                I1_2_2: String(checkedItems.I1_2_2 !== undefined ? checkedItems.I1_2_2 : checkboxData.i1_2_2),
                I1_3_1: String(checkedItems.I1_3_1 !== undefined ? checkedItems.I1_3_1 : checkboxData.i1_3_1),
                I1_3_2: String(checkedItems.I1_3_2 !== undefined ? checkedItems.I1_3_2 : checkboxData.i1_3_2),
                I1_3_3: String(checkedItems.I1_3_3 !== undefined ? checkedItems.I1_3_3 : checkboxData.i1_3_3),
                I1_3_4: String(checkedItems.I1_3_4 !== undefined ? checkedItems.I1_3_4 : checkboxData.i1_3_4),
                I1_4_1: String(checkedItems.I1_4_1 !== undefined ? checkedItems.I1_4_1 : checkboxData.i1_4_1),
                I1_4_2: String(checkedItems.I1_4_2 !== undefined ? checkedItems.I1_4_2 : checkboxData.i1_4_2),
                I1_4_3: String(checkedItems.I1_4_3 !== undefined ? checkedItems.I1_4_3 : checkboxData.i1_4_3),
                I1_4_4: String(checkedItems.I1_4_4 !== undefined ? checkedItems.I1_4_4 : checkboxData.i1_4_4),
                I2_1_1: String(checkedItems.I2_1_1 !== undefined ? checkedItems.I2_1_1 : checkboxData.i2_1_1),
                I2_1_2: String(checkedItems.I2_1_2 !== undefined ? checkedItems.I2_1_2 : checkboxData.i2_1_2),
                I2_1_3: String(checkedItems.I2_1_3 !== undefined ? checkedItems.I2_1_3 : checkboxData.i2_1_3),
                I2_2_1: String(checkedItems.I2_2_1 !== undefined ? checkedItems.I2_2_1 : checkboxData.i2_2_1),
                I2_2_2: String(checkedItems.I2_2_2 !== undefined ? checkedItems.I2_2_2 : checkboxData.i2_2_2),
                I3_1_1: String(checkedItems.I3_1_1 !== undefined ? checkedItems.I3_1_1 : checkboxData.i3_1_1),
                I3_1_2: String(checkedItems.I3_1_2 !== undefined ? checkedItems.I3_1_2 : checkboxData.i3_1_2),
                I4_1_1: String(checkedItems.I4_1_1 !== undefined ? checkedItems.I4_1_1 : checkboxData.i4_1_1),
                I4_1_2: String(checkedItems.I4_1_2 !== undefined ? checkedItems.I4_1_2 : checkboxData.i4_1_2),
                I4_1_3: String(checkedItems.I4_1_3 !== undefined ? checkedItems.I4_1_3 : checkboxData.i4_1_3),
                I4_1_4: String(checkedItems.I4_1_4 !== undefined ? checkedItems.I4_1_4 : checkboxData.i4_1_4),
                I5_1_1: String(checkedItems.I5_1_1 !== undefined ? checkedItems.I5_1_1 : checkboxData.i5_1_1),
                I5_1_2: String(checkedItems.I5_1_2 !== undefined ? checkedItems.I5_1_2 : checkboxData.i5_1_2),
                I5_1_3: String(checkedItems.I5_1_3 !== undefined ? checkedItems.I5_1_3 : checkboxData.i5_1_3),
                I5_1_4: String(checkedItems.I5_1_4 !== undefined ? checkedItems.I5_1_4 : checkboxData.i5_1_4),
                I5_1_5: String(checkedItems.I5_1_5 !== undefined ? checkedItems.I5_1_5 : checkboxData.i5_1_5),
                I5_1_6: String(checkedItems.I5_1_6 !== undefined ? checkedItems.I5_1_6 : checkboxData.i5_1_6),
                I5_1_7: String(checkedItems.I5_1_7 !== undefined ? checkedItems.I5_1_7 : checkboxData.i5_1_7),
                I5_1_8: String(checkedItems.I5_1_8 !== undefined ? checkedItems.I5_1_8 : checkboxData.i5_1_8),
                I5_1_8Desc: description !== checkboxData.i5_1_8Desc ? description : checkboxData.i5_1_8Desc,
                ForEPA: String(forEPA),
                I6_1_1: String(checkedItems.I6_1_1 !== undefined ? checkedItems.I6_1_1 : checkboxData.I6_1_1),
                I6_1_2: String(checkedItems.I6_1_2 !== undefined ? checkedItems.I6_1_2 : checkboxData.I6_1_2),
                Empors: String(empors)
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
            })
            .then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setShowDialog(true)
                    setAlertTitle("您已成功編輯")
                    setSubTitle(" ")
                    setTimeout(function () {
                        history.push('/categories/green_office')
                    }, 1500)
                } else {
                    setShowDialog(true)
                    // setAlertTitle(result.errMsg)

                }
            })
            .catch(function (error) {
                // console.log(error);
            })
    }



    //送出響應申請單
    const submit = () => {
        // console.log(description || checkboxData.i5_1_8Desc)
        // console.log(document.querySelectorAll("input[type=checkbox]:checked").length)

        if ((checkedItems.I6_1_1 !== undefined ? checkedItems.I6_1_1 : true) && (checkedItems.I6_1_2 !== undefined ? checkedItems.I6_1_2 : true) && (checkedItems.I5_1_1 !== undefined ? checkedItems.I5_1_1 : checkboxData.i5_1_1)) {
            setRequiredAlert(false)
            if (document.querySelectorAll("input[type=checkbox]:checked").length > 27) {
                if (checkedItems.I5_1_8 === true) {
                    if (description === "") {
                        setRequiredAlert(true)
                        setAlerText("*請列舉具體措施")
                        document.getElementById('I5_1_8desc').focus()
                    }
                    else {
                        setRequiredAlert(false)
                        setAlerText("")
                        sendResult()
                    }
                } else {
                    setShowDialog(true)
                    setAlertTitle("表單提交中")
                    setSubTitle(" ")
                    sendResult()
                }
            } else {
                setShowDialog(true)
                setAlertTitle("5項指標之響應項目共需符合25項以上")
                setSubTitle("請您再一次確認勾選項目數")
                setTimeout(function () {
                    setAlertTitle("5項指標之響應項目共需符合25項以上 ")
                }, 100)
            }
        } else {
            setRequiredAlert(true)
            setAlerText('*請勾選必填欄位')
            // console.log(checkedOption)
        }
    }


    function resetAll() {

        document.querySelectorAll("input[type=checkbox]:checked").forEach((item) => {
            item.checked = false;
        })

        setCheckedItems({});
        setCheckedOption(false)
        // setCityId("0")
        setDescription("")
        var dropDown = document.getElementById("selectcity");
        dropDown.selectedIndex = 0;

    }


    return (
        <>
            <BreadCrumb currentPage={"響應自評表"} />

            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle={subTitle} alertTitle={alertTitle} history={history} />
            }
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="office_evaluation container">
                <div className="top-step-wrapper">
                    <div className="top-step">
                        <div className="ball-wrapper"><h4 className="number active">1</h4></div>
                        <div className="ball-wrapper"><h4 className="number">2</h4></div>
                        <div className="ball-wrapper"><h4 className="number">3</h4></div>
                    </div>
                    <div className="top-step-text">
                        <div className="text-wrapper"><h6>STEP 1</h6><h6>響應項目評量</h6></div>
                        <div className="text-wrapper"><h6>STEP 2</h6><h6>響應項目確認</h6></div>
                        <div className="text-wrapper"><h6>STEP 3</h6><h6>送出審核</h6></div>
                    </div>
                </div>

                <div className="energy-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={earthImg} alt="節省能資源" title="指標1:節省能資源" />
                        <h2>指標1&nbsp;:&nbsp;節省能資源</h2>
                    </div>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目1</p></div>
                            <h5>節約用電</h5>
                        </div>
                        {energyCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_1_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>

                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目2</p></div>
                            <h5>節約用水</h5>
                        </div>
                        {waterCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_2_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目3</p></div>
                            <h5>節約用油</h5>
                        </div>
                        {fuelCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_3_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目4</p></div>
                            <h5>節約用紙</h5>
                        </div>
                        {paperCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item1_4_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>



                </div>

                <div className="reduce-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={reduceImg} alt="源頭減量" title="指標2:源頭減量" />
                        <h2>指標2&nbsp;:&nbsp;源頭減量</h2>
                    </div>
                    <div className="banner-line"></div>

                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目1</p></div>
                            <h5>減塑減廢</h5>
                        </div>
                        {reduceCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item2_1_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目2</p></div>
                            <h5>分類及回收再用</h5>
                        </div>
                        {trashCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item2_2_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="greenShop-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={greenShopImg} alt="綠色採購" title="指標3:綠色採購" />
                        <h2>指標3&nbsp;:&nbsp;綠色採購</h2>
                    </div>
                    <div className="banner-line"></div>

                    <ul className="energy-list">
                        <div className="text-wrapper">
                            {/* <div className="list-title"><p>項目1</p></div> */}
                            {/* <h5>用品採購</h5> */}
                        </div>
                        {itemShopCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item3_1_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="envir-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={leefImg} alt="環境綠美化" title="指標4:環境綠美化" />
                        <h2>指標4&nbsp;:&nbsp;環境綠美化</h2>
                    </div>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            {/* <div className="list-title"><p>項目1</p></div> */}
                            {/* <h5>綠化植栽</h5> */}
                        </div>
                        {plantCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item4_1_${index}`}>
                                <label className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                    </ul>

                </div>

                <div className="promote-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={promoteImg} alt="宣導倡議" title="指標5:宣導倡議" />
                        <h2>指標5&nbsp;:&nbsp;宣導倡議</h2>
                    </div>
                    <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            {/* <div className="list-title"><p>項目1</p></div> */}
                            {/* <h5>教育宣導</h5> */}
                        </div>
                        {teachCheckboxes.map((item, index) => (
                            <div className="box-text-wrapper" key={`item5_1_${index}`}>
                                <label name={item.name} className="checkbox-text withCheckBox" key={item.key}>
                                    <Checkbox name={item.name} defaultChecked={checkboxData[item.name.toLowerCase()]} onClick={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                        <div className="text-area-wrapper">
                            <label for="I5_1_8" className="checkbox-text withCheckBox">
                                <input className="myCheckbox" name="I5_1_8" id="I5_1_8" defaultChecked={checkboxData["i5_1_8"]} onClick={handleChange} type="checkbox"></input>
                                8. 其他（請自行列舉具體措施）</label>
                            <textarea className="evaluation-textarea" id="I5_1_8desc"
                                onChange={e => {
                                    setDescription(e.target.value)
                                    checkedItems["I5_1_8"] = true
                                }}

                                placeholder={fetchStatus ? description === "" ? description : checkboxData.i5_1_8Desc : "請簡述對於「綠色辦公」其他創意作為(500字為限)"}
                                defaultValue={checkboxData.i5_1_8Desc ? checkboxData.i5_1_8Desc.replace("\\n", `\n`) : ""}
                                maxLength={500} />
                        </div>
                    </ul>
                    {/* <div className="banner-line"></div>
                    <ul className="energy-list">
                        <div className="text-wrapper">
                            <div className="list-title"><p>項目3</p></div>
                            <h5>其他</h5>
                        </div>
                        <div className="text-area-wrapper">
                            <input className="myCheckbox" name="I5_3_1" checked={checkedItems["I5_3_1"]} onChange={handleChange} type="checkbox"></input>
                            <textarea className="evaluation-textarea" value={description}
                                onChange={e => {
                                    setDescription(e.target.value)
                                    checkedItems["I5_3_1"] = true
                                }}
                                placeholder="請簡述對於「綠色辦公」其他創意作為(500字為限)" maxLength={500} />
                        </div>
                    </ul> */}

                </div>

                <div className="final-banner section">
                    <div className="banner-line"></div>
                    <div className="banner-main">
                        <img src={checkImg} alt="落實與宣導" title="Final:落實與宣導" />
                        <h2>Final&nbsp;:&nbsp;落實與宣導</h2>
                    </div>
                    <div className="banner-line"></div>

                    <ul className="final-list">
                        <div className="box-text-wrapper">
                            <label for="I6_1_1" className="checkbox-text withCheckBox share-green-title" key="finalcheckBox1">
                                <Checkbox className="evaluation_checkbox" name="I6_1_1" id="I6_1_1" checked={checkedItems["I6_1_1"]} onChange={handleChange} />
                                1. 我有確實對內部職員/員工進行宣導，員工人數共
                                <input type="number" name="I6_1_1" id="I6_1_1" value={empors} min="1" max="99999" style={{ borderColor: "#689a7d", textAlign: "center" }} onChange={(e) => { setEmpors(e.target.value) }} /> 人（包含非正職人員）</label>
                        </div>
                        <div className="box-text-wrapper">
                            <label for="I6_1_2" className="checkbox-text withCheckBox share-green-title" key="finalcheckBox2">
                                <Checkbox className="evaluation_checkbox" name="I6_1_2" id="I6_1_2" checked={checkedItems["I6_1_2"]} onChange={handleChange} />
                                2. 我有確實要求內部職員/員工落實我選響應的綠色辦公項目</label>
                        </div>
                        <div className="final-select-wrapper">
                            <label for="I6-1-3" className="checkbox-text withCheckBox share-green-title" key="finalcheckBox3">
                                <Checkbox name="I6-1-3" id="I6-1-3" checked={true} readOnly={true} onChange={() => setCheckedOption(true)} />
                                3. 請問本次響應是否由縣市環保局協助輔導</label>
                            <div className="yes-no-wrapper">
                                <input className="myCheckbox" id="yesforcity" name="city" type="radio" value="yes" defaultChecked={checkboxData?.forEPA} onClick={() => setForEPA(true)} /><label for="yesforcity">是</label>
                                <input className="myCheckbox" id="noforcity" name="city" type="radio" value="no" defaultChecked={!checkboxData?.forEPA} onClick={() => setForEPA(false)} /><label for="noforcity">否</label>
                            </div>
                        </div>
                    </ul>
                </div>

                <div className="evaluation-btn-wrapper">
                    {/* onClick={submit} */}

                    {requiredAlert && <h6 className="required-alert">{alertText}</h6>}

                    {fetchStatus !== true &&
                        <>
                            <button onClick={submit} className="active btn">確認送出</button>
                            <button onClick={resetAll} className="btn">重新填寫</button>
                            <button onClick={() => history.push('/categories/green_office')} className="btn">取消申請</button>
                        </>
                    }
                </div>
                {/* () => history.goBack() */}
            </div>

            <Footer />
        </>
    );
}

export default withRouter(EvaluationEdit);
