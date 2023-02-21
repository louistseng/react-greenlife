import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useForm } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
import ComfirmAlert from '../../Components/ComfirmAlert';
import { clickLogout } from '../../utils/Functions';
import { YearPicker, DayPicker } from 'react-dropdown-date';
import '../office/Review.scss';
import './Management.scss';
import { clickRecord, getCityDrop, getDistrictDrop } from '../../utils/API';


function UserInfo(props) {

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = sessionStorage.getItem("userGuid") || "";
    const memberToken = greenlifeCookies.refreshToken || "";


    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    const [account, setAccount] = useState("");
    const [acType, setAcType] = useState("");
    const [unitCode, setUnitCode] = useState("");
    const [unitCodeComp, setUnitCodeComp] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const [totalCount, setTotalCount] = useState("");
    const count = "5"

    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);

    const [identityTypeId, setIdentityTypeId] = useState("");
    const [unitCityId, setUnitCityId] = useState("");
    const [unitAddrCode, setUnitAddrCode] = useState("");
    const [cityId, setCityId] = useState("");
    const [addrCode, setAddrCode] = useState("");

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [formDay, setFormDay] = useState("");
    const [gender, setGender] = useState("");
    const [lock, setLock] = useState(false)
    const [unLock, setUnLock] = useState(false)
    const [lockMsg, setlockMsg] = useState("")
    const [failCnt, setFailCnt] = useState(0)

    //點閱計數API
    useEffect(() => {
        clickRecord("AE8C24BD-34FB-48BD-A94D-037C07072651", "19", collector)
    }, [collector]);

    //換頁
    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        complexSearch(data.selected + 1)
    };


    //帳號類型下拉項目API
    const [acTypeDrop, setAcTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/AcTypes`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setAcTypeDrop(result.resultObject)
                // console.log(result)
            });
    }, [SSL, domain])

    const complexSearch = (page) => {
        fetch(`${SSL}//${domain}/api/api/Manager/Account/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Account: account,
                Email: userEmail,
                UnitCode: unitCode || unitCodeComp,
                AcType: acType,
                Page: String(page),
                Count: count
            }),
            headers: myHeaders
        }).then(res => {
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
                setFetchData(result.resultObject.accounts)
                setPageCount(result.resultObject.pageCount)
                setTotalCount(result.resultObject.totalCount)
            }
        })
    }

    // 解鎖密碼
    const handleLock = () => {
        // console.log(selected)
        fetch(`${SSL}//${domain}/api/api/Auth/Profile/UnLock`, {
            method: 'POST',
            body: serialize({
                Email: selected.email,
                UserName: selected.name,
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Token: memberToken
            }
        }).then(res => {
            if (res.status === 401) {
                clickLogout(removeCookie, collector)
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        }).then(result => {
            // console.log(result)
            if (result.isSucess) {
                setTimeout(function () {
                    setlockMsg(result.userMsg)
                    setUnLock(lock)
                }, 100)
            }
        })
    }

    const handleMemberSearch = (data) => {
        fetch(`${SSL}//${domain}/api/api/Auth/Profile`, {
            method: 'POST',
            body: serialize({
                Email: data.email,
                UserName: data.name,
                Guid: collector
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Token: memberToken
            }
        }).then(res => {
            if (res.status === 401) {
                clickLogout(removeCookie, collector)
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        }).then(result => {
            // console.log(result)
            if (result.isSucess) {
                setFailCnt(result.resultObject.failCnt)
                setLock(result.resultObject.isLock)
            }
        })
    }

    const submit = () => {
        setLoading(true)
        setSelected([])
        complexSearch(page)
    }

    const handleRefresh = () => {
        setAccount("")
        setAcType("")
        setUnitCode("")
        setUnitCodeComp("")
        setUserEmail("")
        setLoading(true)
        setSelected([])
        var dropDown = document.getElementById("typeDrop");
        dropDown.selectedIndex = 0;
    }

    const { register, errors, handleSubmit } = useForm({});

    const SaveChange = (data) => {
        let birthday
        if (year || month || formDay) {
            birthday = `${year}/${month}/${formDay}`
        }

        fetch(`${SSL}//${domain}/api/api/Manager/Account/Update`, {
            method: 'POST',
            body: serialize({
                Guid: selected.userGuid,
                IdentityTypeId: String(identityTypeId || selected.identityTypeId),
                Name: encodeURIComponent(data.name || selected.name) || "",
                Birth: birthday || selected.birth || "",
                Gender: String(gender) || selected.gender || "",
                Email: data.email || selected.email,
                Tel: data.tel || selected.tel || "",
                Mobile: data.mobile || selected.mobile || "",
                Fax: data.fax || selected.fax || "",
                Introduction: data.intro || selected.introduction || "",
                CityId: cityId || selected.cityId || "",
                AddrCode: addrCode || selected.addrCode || "",
                Addr: data.addr || selected.addr || "",
                UnitCode: data.unitCode || selected.unitCode || "",
                UnitFullName: encodeURIComponent(data.unitFullName || selected.unitFullName) || "",
                UnitCHName: encodeURIComponent(data.unitCHName || selected.unitCHName) || "",
                UnitENName: data.unitENName || selected.unitENName || "",
                UnitManager: data.unitManager || selected.unitManager || "",
                UnitTel: data.unitTel || selected.unitTel || "",
                UnitFax: data.unitFax || selected.unitFax || "",
                UnitCityId: unitCityId || selected.unitCityId || "",
                UnitAddrCode: unitAddrCode || selected.unitAddrCode || "",
                UnitAddr: data.unitAddr || selected.unitAddr || "",
                UnitHref: data.unitHref || selected.unitHref || "",
            }),
            headers: myHeaders
        }).then(res => {
            if (res.status === 401) {
                clickLogout(removeCookie, collector)
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        }).then(result => {
            // console.log(result)
            if (result.isSucess) {
                setShowDialog(true)
                setAlertTitle('更新成功')
                setTimeout(function () {
                    setAlertTitle('更新成功 ')
                }, 100)
                handleRefresh()
                setShowDialog(false)
            } else {
                setAlertTitle(result.userMsg || "更新失敗")
                setTimeout(function () {
                    setAlertTitle(result.userMsg || "更新失敗" + " ")
                }, 100)
                setShowDialog(true)
            }
        })
    }

    const [cityDrop, setCityDrop] = useState([])
    const [contectCityDrop, setContectCityDrop] = useState([])
    const [contectDistrict, setContectDistrict] = useState([])
    //城市下拉選單
    useEffect(() => {
        getCityDrop(setCityDrop)
        getCityDrop(setContectCityDrop)
    }, []);

    const [district, setDistrict] = useState([])
    //行政區下拉選單
    useEffect(() => {
        if (unitCityId)
            getDistrictDrop(unitCityId, setDistrict)
    }, [unitCityId]);

    //行政區下拉選單
    useEffect(() => {
        if (cityId)
            getDistrictDrop(cityId, setContectDistrict)
    }, [cityId]);

    const resultTableData = (
        fetchData.map((data, index) => {
            const { account, accountTypeName } = data
            return (
                <tr key={data.userGuid} onClick={() => {
                    // console.log(fetchData[index])
                    setSelected(fetchData[index])
                    setIdentityTypeId(fetchData[index].identityTypeId)
                    setUnitAddrCode(fetchData[index].unitAddrCode)
                    setUnitCityId(fetchData[index].unitCityId)
                    setAddrCode(fetchData[index].addrCode)
                    setCityId(fetchData[index].cityId)
                    handleMemberSearch(data)
                }}>
                    <td data-title="帳號名稱" className="list-date">{account}</td>
                    <td data-title="帳號來源" className="download-time">{accountTypeName}</td>
                </tr>
            )
        })
    )

    const Public = (
        <>
            <div className="user-bottom-content-wrapper">
                <h4 className="condition-label userInfo-content">生日</h4>
                {selected.accountTypeId === 1 ?
                    <>
                        <YearPicker
                            defaultValue={'年'}
                            reverse                     // default is ASCENDING
                            value={year}     // mandatory
                            onChange={(year) => {
                                setYear(year)
                            }}
                            id={'year'}
                            name={'year'}
                            classes={'classes info-drop'}
                            optionClasses={'option classes'}
                        />
                        <select className="info-drop" value={month} name="month" onChange={(e) => {
                            setMonth(e.target.value)
                        }}>
                            <option value="0">月</option>
                            <option value="01">1月</option>
                            <option value="02">2月</option>
                            <option value="03">3月</option>
                            <option value="04">4月</option>
                            <option value="05">5月</option>
                            <option value="06">6月</option>
                            <option value="07">7月</option>
                            <option value="08">8月</option>
                            <option value="09">9月</option>
                            <option value="10">10月</option>
                            <option value="11">11月</option>
                            <option value="12">12月</option>
                        </select>
                        <DayPicker
                            defaultValue={'日'}
                            year={year}    // mandatory
                            endYearGiven              // mandatory if end={} is given in YearPicker
                            value={day}    // mandatory
                            onChange={(day) => {
                                if (day < 10) {
                                    setFormDay("0" + day)
                                    setDay(day)
                                } else {
                                    setDay(day)
                                    setFormDay(day)
                                }
                            }
                            }
                            id={'day'}
                            name={'day'}
                            classes={'classes info-drop'}
                            optionClasses={'option classes'}
                        />
                    </>
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitCode}</h4>
                }
            </div>
            <div className="user-bottom-content-wrapper">
                <h4 className="condition-label userInfo-content">性別</h4>
                {selected.accountTypeId === 1 ?
                    <>
                        <input type="radio" onChange={e => {
                            setGender(String(e.target.value))
                        }} name="男" id="gender-M" value="1" checked={gender === "1"}></input>
                        <label for="gender-M">男</label>
                        <input type="radio" onChange={e => {
                            setGender(String(e.target.value))
                        }} name="女" id="gender-W" value="0" checked={gender === "0"}></input>
                        <label for="gender-W">女</label>
                        {/* <input type="radio" onChange={e => {
                                setGender(String(e.target.value))
                            }} name="不公開" value="2" checked={gender === "2"}></input>
                            <label>不公開</label> */}
                    </>
                    :
                    <h4 className="condition-label userInfo-content">{selected.gender}</h4>
                }
            </div>
            <div className="user-bottom-content-wrapper">

                <label for="intro">
                    <h4 className="condition-label userInfo-content">自我介紹</h4>
                </label>
                {selected.accountTypeId === 1 ?

                    <input
                        name="intro"
                        id="intro"
                        ref={register({
                            pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                        })}
                        className="intro-text" type="text" placeholder={selected.introduction}></input>

                    :
                    <h4 className="condition-label userInfo-content">{selected.introduction}</h4>
                }
            </div>
        </>
    )

    const GovTable = (
        <>
            <div className="user-bottom-content-wrapper">
                <label for="unitCode">
                    <h4 className="condition-label userInfo-content">機關代碼</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        className="email-input"
                        type="type"
                        name="unitCode"
                        id="unitCode"
                        ref={register({
                            // pattern: /-0$/,
                        })}
                        defaultValue={selected.unitCode || ""}
                        key={unitCode}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitCode}</h4>
                }
            </div>
            <div className="user-bottom-content-wrapper">

                <label for="unitFullName">
                    <h4 className="condition-label userInfo-content">機關名稱全銜</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        className="email-input"
                        type="type"
                        name="unitFullName"
                        id="unitFullName"
                        ref={register({
                            maxLength: {
                                value: 40,
                            }
                        })}
                        defaultValue={selected.unitFullName || ""}
                        key={selected.unitFullName}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitFullName}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="name">
                    <h4 className="condition-label userInfo-content">承辦人姓名</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        className="email-input"
                        type="type"
                        name="name"
                        id="name"
                        size="32"
                        ref={register({
                            pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                        })}
                        defaultValue={selected.name || ""}
                        key={selected.name}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.name}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="tel">
                    <h4 className="condition-label userInfo-content">承辦人聯絡電話</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        className="email-input"
                        type="tel"
                        name="tel"
                        id="tel"
                        placeholder={selected.tel || ""}
                        size="15"
                        maxLength="20"
                        ref={register({
                            pattern: /^(0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+))?$/,

                            minLength: {
                                value: 9,
                            }
                        })}
                        defaultValue={selected.tel}
                        key={selected.tel}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.tel}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitAddr">
                    <h4 className="condition-label userInfo-content">機關地址</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <>
                        <select value={unitCityId} onChange={e => {
                            setUnitCityId(e.target.value)
                        }}>
                            <option value="">請選擇</option>
                            {cityDrop.map((fetchData, index) =>
                                <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                            )}
                        </select>
                        <select value={unitAddrCode} onChange={e => {
                            setUnitAddrCode(e.target.value)
                        }}>
                            <option value="">請選擇</option>
                            {district.map((fetchData, index) =>
                                <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                            )}
                        </select>
                        <input
                            type="text"
                            name="unitAddr"
                            id="unitAddr"
                            maxLength="50"
                            minLength="4"
                            placeholder={selected.unitAddr || ""}
                            key={selected.unitAddr}
                            ref={register({
                            })}
                        />
                    </>
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitAddr}</h4>}
            </div>
        </>
    )

    const CompTable = (
        <>
            <div className="user-bottom-content-wrapper">
                <label for="name">
                    <h4 className="condition-label userInfo-content">姓名</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        className="email-input"
                        type="type"
                        name="name"
                        id="name"
                        size="32"
                        ref={register({
                            pattern: /[a-zA-Z\u4E00-\u9FFF]+$/
                        })}
                        defaultValue={selected.name || ""}
                        key={selected.name}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.name}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="tel">
                    <h4 className="condition-label userInfo-content">聯絡電話</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="tel"
                        name="tel"
                        id="tel"
                        size="32"
                        maxLength="20"
                        ref={register({
                            pattern: /^(0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+))?$/,
                            minLength: {
                                value: 9,
                            }
                        })}
                        defaultValue={selected.tel || ""}
                        key={selected.tel}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.tel}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="mobile">
                    <h4 className="condition-label userInfo-content">行動電話</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="tel"
                        name="mobile"
                        id="mabile"
                        size="32"
                        maxLength="10"
                        ref={register({
                            pattern: /^09[0-9]+$/,
                            minLength: {
                                value: 10,
                            }
                        })}
                        defaultValue={selected.mobile || ""}
                        key={selected.mobile}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.mobile}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="fax">
                    <h4 className="condition-label userInfo-content">聯絡傳真</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="fax"
                        name="fax"
                        id="fax"
                        size="32"
                        maxLength="10"
                        ref={register({
                            pattern: /^(0\d{1,3})(?:-)(\d{7,8})?$/,
                            minLength: {
                                value: 9,
                            }
                        })}
                        defaultValue={selected.fax || ""}
                        key={selected.fax}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.mofaxbile}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="addr">
                    <h4 className="condition-label userInfo-content">聯絡地址</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <>
                        <select className="signUp-addr-select" value={cityId} onChange={e => {
                            setCityId(e.target.value)
                        }}>
                            <option value="">請選擇</option>
                            {contectCityDrop.map((fetchData, index) =>
                                <option key={cityId} value={fetchData.cityId}>{fetchData.cityName}</option>
                            )}
                        </select>
                        <select className="signUp-addr-select" key={addrCode} value={addrCode} onChange={e => {
                            setAddrCode(e.target.value)
                        }}>
                            <option value="">請選擇</option>
                            {contectDistrict.map((fetchData, index) =>
                                <option key={index} value={fetchData.cityId}>{fetchData.cityName}</option>
                            )}
                        </select>
                        <input
                            type="text"
                            name="addr"
                            id="addr"
                            maxLength="50"
                            minLength="4"
                            ref={register({
                            })}
                            defaultValue={selected.addr || ""}
                            key={selected.addr}
                        />
                    </>
                    :
                    <h4 className="condition-label userInfo-content">{selected.addr}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitCode">
                    <h4 className="condition-label userInfo-content">統一編號</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitCode"
                        id="unitCode"
                        size="32"
                        maxLength="10"
                        ref={register({
                            pattern: /^[0-9]+$/,
                        })}
                        defaultValue={selected.unitCode || ""}
                        key={unitCode}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitCode}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitFullName">
                    <h4 className="condition-label userInfo-content">單位中文名稱</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitFullName"
                        id="unitFullName"
                        ref={register({
                            pattern: /[\u4E00-\u9FFF]/
                        })}
                        defaultValue={selected.unitFullName || ""}
                        key={selected.unitFullName}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitFullName}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitCHName">
                    <h4 className="condition-label userInfo-content">單位中文簡稱</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitCHName"
                        id="unitCHName"
                        ref={register({
                            pattern: /[\u4E00-\u9FFF]/
                        })}
                        defaultValue={selected.unitCHName || ""}
                        key={selected.unitCHName}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitCHName}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitENName">
                    <h4 className="condition-label userInfo-content">單位英文名稱</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitENName"
                        id="unitENName"
                        ref={register({
                            pattern: /[A-Za-z]/
                        })}
                        defaultValue={selected.unitENName || ""}
                        key={selected.unitENName}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitENName}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitManager">
                    <h4 className="condition-label userInfo-content">負責人/主管</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitManager"
                        id="unitManagrt"
                        ref={register({
                            pattern: /[A-Za-z]/
                        })}
                        defaultValue={selected.unitManager || ""}
                        key={selected.unitManager}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitManager}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitTel">
                    <h4 className="condition-label userInfo-content">單位聯絡電話</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="tel"
                        name="unitTel"
                        id="unitTel"
                        maxLength="20"
                        ref={register({
                            pattern: /^((0\d{1,3})(?:-)(\d{7,8})(?:(?:#)(\d+)))|([0-9]) ?$/,
                            minLength: {
                                value: 10,
                            }
                        })}
                        defaultValue={selected.unitTel || ""}
                        key={selected.unitTel}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitTel}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitFax">
                    <h4 className="condition-label userInfo-content">單位聯絡傳真</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitFax"
                        id="unitFax"
                        maxLength="13"
                        ref={register({
                            pattern: /^(0\d{1,3})(?:-)(\d{7,8})?$/,
                            minLength: {
                                value: 9,
                            }
                        })}
                        defaultValue={selected.unitFax || ""}
                        key={selected.unitFax}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitFax}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitMail">
                    <h4 className="condition-label userInfo-content">備用E-mail</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        className="email-input"
                        name="unitMail"
                        id="unitMail"
                        ref={register({
                            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        })}
                        defaultValue={selected.unitMail}
                        key={selected.unitMail}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitMail}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitHref">
                    <h4 className="condition-label userInfo-content">網址</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <input
                        type="text"
                        name="unitHref"
                        id="unitHref"
                        ref={register({
                            pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
                        })}
                        defaultValue={selected.unitHref || ""}
                        key={selected.unitHref}
                    />
                    :
                    <h4 className="condition-label userInfo-content">{selected.unitHref}</h4>}
            </div>
            <div className="user-bottom-content-wrapper">
                <label for="unitAddr">
                    <h4 className="condition-label userInfo-content">登記地址</h4>
                </label>
                {selected.accountTypeId === 1 ?
                    <>
                        <select className="signUp-addr-select" key={unitCityId} value={unitCityId} onChange={e => {
                            setUnitCityId(e.target.value)
                        }}>
                            <option value="">請選擇</option>
                            {cityDrop.map((fetchData, index) =>
                                <option key={"cityComp" + index} value={fetchData.cityId}>{fetchData.cityName}</option>
                            )}
                        </select>
                        <select className="signUp-addr-select" key={"cityUnit" + unitAddrCode} value={unitAddrCode} onChange={e => {
                            setUnitAddrCode(e.target.value)
                        }}>
                            <option value="">請選擇</option>
                            {district.map((fetchData, index) =>
                                <option key={"distUnit" + index} value={fetchData.cityId}>{fetchData.cityName}</option>
                            )}
                        </select>
                        <input
                            type="text"
                            name="unitAddr"
                            id="unitAddr"
                            maxLength="50"
                            minLength="4"
                            ref={register({
                            })}
                            defaultValue={selected.unitAddr || ""}
                            key={selected.unitAddr}
                        />
                    </>
                    :
                    <h4 className="condition-label userInfo-content">{selected.fullUnitAddr}</h4>}
            </div>
        </>
    )


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} subTitle=" " alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={props.history} />
            }
            {/* <BreadCrumb currentPage={"使用者帳號管理"} />
            <div className="container office_evaluation_process member-info-wrapper row">
                <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-12 col-lg-8">
                <h3 className="green-title">使用者帳號管理</h3>
                <div className="section">
                    <h4 className="userInfo-section-title">使用者帳號查詢</h4>
                    <div className="row search-conditions-userInfo">

                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="account" className="condition-label">帳號名稱</label>
                            <input type="text" name="account" id="account" value={account} onChange={e => setAccount(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="email" className="condition-label">電子信箱</label>
                            <input type="text" name="email" id="email" value={userEmail} onChange={e => setUserEmail(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="unitCodeComp" className="condition-label">統一編號</label>
                            <input type="text" name="unitCodeComp" id="unitCodeComp" value={unitCodeComp} onChange={e => setUnitCodeComp(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        submit()
                                    }
                                }} />
                        </div>



                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <label for="unitCode" className="condition-label">機關代碼</label>
                            <input type="text" name="unitCode" id="unitCode" value={unitCode} onChange={e => setUnitCode(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        submit()
                                    }
                                }} />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 userInfo-select-wrapper">
                            <label for="typeDrop" className="condition-label">帳號來源</label>
                            <select id="typeDrop" className="userInfo-management-select" onBlur={e => {
                                setAcType(e.target.value)
                            }}>
                                <option value="">請選擇</option>
                                {acTypeDrop.map((data, index) =>
                                    <option key={"actype" + index} value={data.accountTypeId}>{data.accountTypeName}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="btn-wrapper">
                        <button onClick={submit} className="userInfo-submit-btn">查詢</button>
                        <button onClick={handleRefresh} className="userInfo-refresh-btn">重新查詢</button>
                    </div>
                </div>

                {loading ||
                    <div className="section">
                        <div className="result-title">
                            <h4 className="">查詢結果</h4>
                            <h4 className="result-count">查詢結果：共 {totalCount} 筆資料</h4>
                        </div>
                        <div className="member-table-outter-wrapper">
                            <table className="review-card rwd-table">
                                <thead className="text-content-wrapper">
                                    <tr>
                                        <th>帳號名稱</th>
                                        <th>帳號來源</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultTableData}
                                </tbody>
                            </table>
                        </div>
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
                    </div>}
                {selected.length !== 0 &&
                    <>
                        <div className="section">
                            <h4 className="userInfo-section-title">帳號內容</h4>
                            <div className="search-conditions-userInfo">
                                <div className="user-bottom-content-wrapper">
                                    <h4 className="condition-label userInfo-content">帳號名稱</h4>
                                    <h4 className="condition-label userInfo-content">{selected.account}</h4>
                                </div>

                                <div className="user-bottom-content-wrapper">
                                    <h4 className="condition-label userInfo-content">帳號狀態</h4>
                                    <div className="condition-label userInfo-content">
                                        {lock ?
                                            <h4 style={{ color: "red", fontWeight: "600" }}>鎖定中</h4>
                                            :
                                            <h4 style={{ fontWeight: "600" }}>一般</h4>
                                        }
                                    </div>

                                    {lock && <input className="lock-btn" type="button" value="解鎖帳號"
                                        onClick={() => { handleLock() }}
                                    />}

                                </div>
                                {unLock &&
                                    <ComfirmAlert key={lockMsg} alertTitle={lockMsg} subTitle={" "} history={props.history} />
                                }
                                <div className="user-bottom-content-wrapper">
                                    <h4 className="condition-label userInfo-content">帳號來源</h4>
                                    <h4 className="condition-label userInfo-content">{selected.accountTypeName}</h4>
                                </div>
                                <div className="user-bottom-content-wrapper">
                                    <h4 className="condition-label userInfo-content">帳號類型</h4>
                                    <div>
                                        <div className="d-flex">
                                            <label for="accountType1"><input type="radio" checked={identityTypeId ? identityTypeId == 2 : selected.identityTypeId === 2} value="2" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType1" id="accountType1" />機關</label>
                                            <label for="accountType2"><input type="radio" checked={identityTypeId ? identityTypeId == 3 : selected.identityTypeId === 3} value="3" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType2" id="accountType2" />企業</label>
                                            <label for="accountType3"><input type="radio" checked={identityTypeId ? identityTypeId == 4 : selected.identityTypeId === 4} value="4" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType3" id="accountType3" />公立學校</label>
                                            <label for="accountType4"><input type="radio" checked={identityTypeId ? identityTypeId == 5 : selected.identityTypeId === 5} value="5" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType4" id="accountType4" />私立學校</label>
                                            <label for="accountType5"><input type="radio" checked={identityTypeId ? identityTypeId == 6 : selected.identityTypeId === 6} value="6" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType5" id="accountType5" />團體</label>
                                            <label for="accountType6"><input type="radio" checked={identityTypeId ? identityTypeId == 1 : selected.identityTypeId === 1} value="1" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType6" id="accountType6" />一般</label>
                                        </div>
                                        <div className="d-flex">
                                            <label for="accountType7"><input type="radio" checked={identityTypeId ? identityTypeId == 7 : selected.identityTypeId === 7} value="7" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType7" id="accountType7" />系統管理員</label>
                                            <label for="accountType8"><input type="radio" checked={identityTypeId ? identityTypeId == 8 : selected.identityTypeId === 8} value="8" onChange={(e) => setIdentityTypeId(Number(e.target.value))} name="accountType8" id="accountType8" />一般管理員</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-bottom-content-wrapper">
                                    <label for="email">
                                        <h4 className="condition-label userInfo-content">電子信箱</h4>
                                    </label>
                                    {selected.accountTypeId === 1 ?
                                        <input
                                            className="email-input"
                                            type="text"
                                            name="email"
                                            id="email"
                                            defaultValue={selected.email}
                                            key={selected.email}
                                            ref={register({
                                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                            })}
                                        />
                                        :
                                        <h4 className="condition-label userInfo-content">{selected.email}</h4>
                                    }
                                </div>
                                {(selected.identityTypeId === 1 || selected.identityTypeId === 7 || selected.identityTypeId === 8) && Public}
                                {(selected.identityTypeId === 2 || selected.identityTypeId === 4) && GovTable}
                                {(selected.identityTypeId === 3 || selected.identityTypeId === 5 || selected.identityTypeId === 6) && CompTable}
                            </div>
                        </div>
                        <div className="btn-wrapper">
                            <button className="userInfo-submit-btn" onClick={handleSubmit(SaveChange)}>儲存資料</button>
                        </div>
                    </>
                }
            </div>

            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(UserInfo);