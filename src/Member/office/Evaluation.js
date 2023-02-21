import React, { useState, useEffect } from 'react';
import './evaluation.scss';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import { withRouter, useHistory } from 'react-router-dom';
import { clickLogout } from '../../utils/Functions';
import ComfirmAlert from '../../Components/ComfirmAlert';
import ComfirmAlertOrg from '../../Components/ComfirmAlertOrg';
import earthImg from '../../images1/greenOffice/earth.png';
import reduceImg from '../../images1/greenOffice/reduce.png';
import greenShopImg from '../../images1/greenOffice/greenShop.png';
import leefImg from '../../images1/greenOffice/leef.png';
import promoteImg from '../../images1/greenOffice/promote.png';
import checkImg from '../../images1/greenOffice/check.png';

import { energyCheckboxes, waterCheckboxes, fuelCheckboxes, paperCheckboxes, reduceCheckboxes, trashCheckboxes, itemShopCheckboxes, plantCheckboxes, teachCheckboxes, finalCheckboxes } from './checkboxes';
import Checkbox from './Checkbox';
import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function Evaluation(props) {


    let history = useHistory()
    var serialize = require('serialize-javascript');

    const greenlivingCity = props.location.state?.city

    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [subTitle, setSubTitle] = useState(" ");

    const [checkedItems, setCheckedItems] = useState({});

    const [description, setDescription] = useState("");
    const [checkedOption, setCheckedOption] = useState(false);
    const [requiredAlert, setRequiredAlert] = useState(false);
    const [alertText, setAlerText] = useState(false);
    const [empors, setEmpors] = useState("")

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    console.log(empors)
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "UserGuid": collector,
        "Token": memberToken
    });

    useEffect(() => {
        if (!memberToken) {
            history.push("/AdvancingPage")
        }
    }, [])

    //點閱計數API
    useEffect(() => {

        clickRecord("84491617-5DE1-4CF4-8DB1-63CE15E3A7A2", "10", collector)
    }, [collector]);


    const handleChange = (e) => {

        const item = e.target.name;
        const isChecked = e.target.checked;
        setCheckedItems({
            ...checkedItems, [item]: isChecked
        });


    }

    //綠色辦公-響應申請單
    useEffect(() => {
        if (memberToken) {
            console.log(collector)
            fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Participate/${collector}`, {
                method: "GET"
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.resultObject.isWrite) {
                        history.push('/categories/green_office/evaluation_edit')
                    }
                })
        }
    }, [props.SSL, props.SSL, collector])


    const sendResult = () => {
        fetch(`${props.SSL}//${props.domain}/api/api/GOffice/Participate/Add`, {
            method: 'POST',
            body: serialize({
                I1_1_1: String(checkedItems.I1_1_1 || false),
                I1_1_2: String(checkedItems.I1_1_2 || false),
                I1_1_3: String(checkedItems.I1_1_3 || false),
                I1_1_4: String(checkedItems.I1_1_4 || false),
                I1_1_5: String(checkedItems.I1_1_5 || false),
                I1_1_6: String(checkedItems.I1_1_6 || false),
                I1_2_1: String(checkedItems.I1_2_1 || false),
                I1_2_2: String(checkedItems.I1_2_2 || false),
                I1_3_1: String(checkedItems.I1_3_1 || false),
                I1_3_2: String(checkedItems.I1_3_2 || false),
                I1_3_3: String(checkedItems.I1_3_3 || false),
                I1_3_4: String(checkedItems.I1_3_4 || false),
                I1_4_1: String(checkedItems.I1_4_1 || false),
                I1_4_2: String(checkedItems.I1_4_2 || false),
                I1_4_3: String(checkedItems.I1_4_3 || false),
                I1_4_4: String(checkedItems.I1_4_4 || false),
                I2_1_1: String(checkedItems.I2_1_1 || false),
                I2_1_2: String(checkedItems.I2_1_2 || false),
                I2_1_3: String(checkedItems.I2_1_3 || false),
                I2_2_1: String(checkedItems.I2_2_1 || false),
                I2_2_2: String(checkedItems.I2_2_2 || false),
                I3_1_1: String(checkedItems.I3_1_1 || false),
                I3_1_2: String(checkedItems.I3_1_2 || false),
                I4_1_1: String(checkedItems.I4_1_1 || false),
                I4_1_2: String(checkedItems.I4_1_2 || false),
                I4_1_3: String(checkedItems.I4_1_3 || false),
                I4_1_4: String(checkedItems.I4_1_4 || false),
                I5_1_1: String(checkedItems.I5_1_1 || false),
                I5_1_2: String(checkedItems.I5_1_2 || false),
                I5_1_3: String(checkedItems.I5_1_3 || false),
                I5_1_4: String(checkedItems.I5_1_4 || false),
                I5_1_5: String(checkedItems.I5_1_5 || false),
                I5_1_6: String(checkedItems.I5_1_6 || false),
                I5_1_7: String(checkedItems.I5_1_7 || false),
                I5_1_8: String(checkedItems.I5_1_8 || false),
                I5_1_8Desc: description,
                ForEPA: String(Boolean(document.querySelector('#yesforcity:checked'))),
                I6_1_1: String(checkedItems.I6_1_1 || false),
                I6_1_2: String(checkedItems.I6_1_2 || false),
                Empors: empors
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
                    setAlertTitle("響應完成")
                    setSubTitle("審核狀態請留意電子信箱，若需異動響應表，請至：【會員專區-功能清單-綠色辦公-響應綠色辦公自評表】編輯")
                    setTimeout(function () {
                        history.push('/categories/green_office')
                    }, 1500)
                } else {
                    setShowDialog(true)
                    setAlertTitle(result.userMsg || "響應失敗")
                    setSubTitle("")
                }
            })
            .catch(function (error) {
                // console.log(error);
            })
    }


    //送出響應申請單
    const submit = () => {

        if (checkedItems.I6_1_1 && checkedItems.I6_1_2 && Boolean(document.querySelectorAll('input[name=I6_1_3]:checked').length) && checkedItems.I5_1_1) {
            setRequiredAlert(false)
            if (Object.values(checkedItems).filter((v) => v).length > 26) {
                if (checkedItems.I5_1_8 === true) {
                    if (description === "") {
                        setRequiredAlert(true)
                        setAlerText("*請列舉具體措施")
                        document.getElementById('I5_1_8desc').focus()
                    } else {
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
                    setSubTitle("請您再一次確認勾選項目數 ")
                }, 100)
            }
        } else {
            setRequiredAlert(true)
            setAlerText('*請勾選必填欄位')
            // console.log(checkedOption)
        }

    }


    const getSelect = () => {
        setCheckedOption(true)

    }


    function resetAll() {

        var inputs = document.querySelectorAll('.myCheckbox');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
        setCheckedItems({});
        setCheckedOption(false)

        setDescription("")

    }

    return (
        <>
            <BreadCrumb currentPage={"響應自評表"} />
            {showDialog &&
                <ComfirmAlert key={subTitle} subTitle={subTitle} alertTitle={alertTitle} history={history} />
            }
            {greenlivingCity && <ComfirmAlertOrg history={history} city={greenlivingCity} />}

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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
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
                                    <Checkbox className="evaluation_checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                    {item.label}</label>
                            </div>
                        ))}
                        <div className="text-area-wrapper">
                            <label for="I5_1_8" className="checkbox-text withCheckBox">
                                <input className="myCheckbox" name="I5_1_8" id="I5_1_8" checked={checkedItems["I5_1_8"]} onChange={handleChange} type="checkbox"></input>
                                8. 其他（請自行列舉具體措施）</label>
                            <textarea className="evaluation-textarea" id="I5_1_8desc" value={description}
                                onChange={e => {
                                    // console.log(e.target.value)
                                    setDescription(e.target.value)
                                    checkedItems["I5_1_8"] = true
                                }}
                                placeholder="請簡述對於「綠色辦公」其他創意作為(500字為限)" maxLength={500} />
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
                                <Checkbox className="evaluation_checkbox" name="I6_1_1" checked={checkedItems["I6_1_1"]} onChange={handleChange} />
                                1. 我有確實對內部職員/員工進行宣導，員工人數共
                                <input type="number" name="I6_1_1" id="I6_1_1" value={empors} min="1" max="99999" style={{ borderColor: "#689a7d", textAlign: "center" }} onChange={(e) => { setEmpors(e.target.value) }} /> 人（包含非正職人員）</label>
                        </div>
                        <div className="box-text-wrapper">
                            <label for="I6_1_2" className="checkbox-text withCheckBox share-green-title" key="finalcheckBox2">
                                <Checkbox className="evaluation_checkbox" name="I6_1_2" id="I6_1_2" checked={checkedItems["I6_1_2"]} onChange={handleChange} />
                                2. 我有確實要求內部職員/員工落實我選響應的綠色辦公項目</label>
                        </div>
                        <div className="final-select-wrapper">
                            <label for="I6_1_3" className="checkbox-text withCheckBox share-green-title" key="finalcheckBox3">
                                <Checkbox className="evaluation_checkbox" name="I6_1_3" id="I6_1_3" checked={checkedOption} onChange={() => setCheckedOption(true)} />
                                3. 請問本次響應是否由縣市環保局協助輔導</label>
                            <div className="yes-no-wrapper">
                                <input className="myCheckbox" id="yesforcity" onClick={() => getSelect()} name="city" type="radio" value="yes" /><label for="yesforcity">是</label>
                                {/* <select id="selectcity" disabled={disabledSelect} className="city-select" onBlur={(e) => setCityId(e.target.value)}>
                                    <option value="0">請選擇縣市</option>
                                    {fetchData.map((fetchData, index) =>
                                        <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                                    )}
                                </select> */}
                                <input className="myCheckbox" onClick={() => getSelect()} name="city" id="noforcity" type="radio" value="no" /><label for="noforcity">否</label>
                            </div>
                        </div>
                    </ul>
                </div>

                <div className="evaluation-btn-wrapper">
                    {/* onClick={submit} */}

                    {requiredAlert && <h6 className="required-alert">{alertText}</h6>}


                    <button onClick={submit} className="active btn">確認送出</button>
                    <button onClick={resetAll} className="btn">重新填寫</button>
                    <button onClick={() => history.push('/categories/green_office')} className="btn">取消申請</button>
                </div>

            </div>

            <Footer />
        </>
    );
}

export default withRouter(Evaluation);
