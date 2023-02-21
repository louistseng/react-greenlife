let SSL = "https:";
let domain = window.location.hostname;
if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

var serialize = require('serialize-javascript');


//內頁點閱紀錄
function clickRecord(activityGuid, recordTypeId, clicker) {
    fetch(`${SSL}//${domain}/api/api/Common/ClickRecord`, {
        method: 'POST',
        body: serialize({
            Guid: String(activityGuid),
            TypeId: String(recordTypeId),
            Clicker: String(clicker)
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(res => {
        return res.json();
    })

}

//會員左上資訊
function getMemberCard(collector, contextFriendGuid, memberToken, setMemberData, clickLogout, removeCookie) {
    //點擊綠友-會員專區顯示綠友的資料
    const myFriendHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8"
    });
    const myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });
    //API規則:如果有傳Token且有效, 則以token這個使用者優先
    //所以這裡如果contextFriendGuid存在(有點擊綠友), 就headers就用myFriendHeaders,才能取到綠友資料
    const urlGuid = `${SSL}//${domain}/api/api/Member/Profile/SocialInfo/${contextFriendGuid || collector}`

    if (memberToken) {
        fetch(urlGuid, {
            method: 'GET',
            headers: contextFriendGuid ? myFriendHeaders : myHeaders
        })
            .then(res => {
                if (res.status === 401) {
                    clickLogout(removeCookie, collector)
                    throw new Error(res.statusText);
                } else {
                    return res.json();
                }
            }).then(result => {
                // console.log(result)
                setMemberData(result.resultObject)
            });
    }

}


//追蹤作者
function addTrack(creator, collector, memberToken, setTrack, setShowDialog, setAlertTitle) {
    //如果有登入再call api
    if (creator && collector) {
        fetch(`${SSL}//${domain}/api/api/Common/Collect`, {
            method: 'POST',
            body: serialize({
                Guid: creator,
                Collector: collector,
                TypeId: "3"
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "UserGuid": collector,
                "Token": memberToken
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                setShowDialog(true)
                setAlertTitle("已完成追蹤")
                setTrack(true)
            }
        })
    } else {
        setShowDialog(true)
        setAlertTitle("請先登入喔~")
        setTimeout(function () {
            setAlertTitle("請先登入喔~ ")
        }, 100)
    }
}


//Zip批次下載API
function mulDownloadAPI(setZipLoad, fetchDataGuid, dLAreaTheme, zipName) {
    setZipLoad(true)

    const uri = `${SSL}//${domain}/api/api/DLoad/MulDLoad`;
    fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
            Guids: fetchDataGuid,
            ThemeId: dLAreaTheme
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            return res.blob();
        }).then(resultObject => {
            var bind = document.createElement.bind(document);
            let elm = bind('a');
            elm.href = URL.createObjectURL(resultObject);
            elm.setAttribute('download', zipName);
            elm.click();
            setZipLoad(false)
        });
}

//公部門註冊API
function GovSignUp(email, verify, identityType, password, unitCode, unitFullName, applyName, telNumber, unitCityId, addrCode, address, setShowText, setShowDialog, setSubTitle, history, setGreenlifeCookies) {
    fetch(`${SSL}//${domain}/api/api/Auth/Register`, {
        method: 'POST',
        body: JSON.stringify({
            Email: email,
            VerifyStr: verify,
            IdentityTypeId: identityType,
            Password: password,
            UnitCode: unitCode,
            UnitFullName: unitFullName,
            Name: applyName,
            Tel: telNumber,
            UnitCityId: unitCityId,
            UnitAddrCode: addrCode,
            UnitAddr: address
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(res => {
            return res.json();
        }).then(result => {
            // console.log(result)

            if (result.isSucess) {
                //資料寫入storage
                sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                setGreenlifeCookies('refreshToken', result.resultObject.token)
                setGreenlifeCookies('userGuid', result.resultObject.userGuid)
                setGreenlifeCookies('userName', result.resultObject.userName)
                setGreenlifeCookies('identityType', result.resultObject.identityTypeId)
                setShowText("註冊成功")
                setSubTitle("歡迎加入全民綠色生活")
                setTimeout(function () {
                    setShowDialog(false)
                }, 1000)
                setTimeout(function () {
                    history.push('/member/memberCenter?sortType=6')
                }, 1500)
            } else {
                setShowText(result.userMsg)

            }
        });
}


//私部門註冊API
function CompSignUp(email, verify, identityType, password, applyName, contectNumber, mobile, faxNumber, contectCityId, contectAddrCode, contectAddr, unitCode, unitFullName, unitCHName, unitENName, manager, unitTel, unitFax, unitMail, unitHref, unitCityId, addrCode, address, setShowText, setShowDialog, setSubTitle, history, setGreenlifeCookies) {
    fetch(`${SSL}//${domain}/api/api/Auth/Register`, {
        method: 'POST',
        body: JSON.stringify({
            Email: email,
            VerifyStr: verify,
            IdentityTypeId: identityType,
            Password: password,
            Name: encodeURIComponent(applyName),
            Tel: contectNumber,
            Mobile: String(mobile) || "",
            Fax: faxNumber,
            CityId: contectCityId,
            AddrCode: contectAddrCode,
            Addr: contectAddr,
            UnitCode: unitCode,
            UnitFullName: encodeURIComponent(unitFullName),
            UnitCHName: encodeURIComponent(unitCHName) || "",
            UnitENName: unitENName || "",
            UnitManager: encodeURIComponent(manager),
            UnitTel: unitTel,
            UnitFax: unitFax || "",
            UnitMail: unitMail || "",
            UnitHref: unitHref || "",
            UnitCityId: unitCityId,
            UnitAddrCode: addrCode,
            UnitAddr: address
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                sessionStorage.setItem("userGuid", result.resultObject.userGuid);
                setGreenlifeCookies('refreshToken', result.resultObject.token)
                setGreenlifeCookies('userGuid', result.resultObject.userGuid)
                setGreenlifeCookies('userName', result.resultObject.userName)
                setGreenlifeCookies('identityType', result.resultObject.identityTypeId)
                setShowText("註冊成功")
                setSubTitle("歡迎加入全民綠色生活")
                setTimeout(function () {
                    setShowDialog(false)
                }, 1000)
                setTimeout(function () {
                    history.push('/member/memberCenter?sortType=6')
                }, 1500)
            } else {
                setShowText(result.userMsg)

            }
        });
}


//取得會員資訊
const getMemberProfile = (collector, memberToken, clickLogout, removeCookie) => {
    const urlToken = `${SSL}//${domain}/api/api/Member/Profile`
    return fetch(urlToken, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Token": memberToken
        }
    })
        .then(res => {
            if (res.status === 401) {
                clickLogout(removeCookie, collector)
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        }).then(result => {
            // console.log(result)
            return result
        });
}


const getCityDrop = (setCityDrop) => {
    fetch(`${SSL}//${domain}/api/api/Common/Citys`, {
        method: 'GET',
    })
        .then(res => {
            return res.json();
        }).then(result => {

            setCityDrop(result.resultObject)
        });
}

const getDistrictDrop = (unitCityId, setDistrict) => {
    fetch(`${SSL}//${domain}/api/api/Common/Towns/${unitCityId}`, {
        method: 'GET',
    })
        .then(res => {
            return res.json();
        }).then(result => {

            setDistrict(result.resultObject)
        });
}


const logoutLog = (UserGuid) => {
    if (UserGuid)
        fetch(`${SSL}//${domain}/api/api/Auth/LogOut/${UserGuid}`, {
            method: 'GET',
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
            });

}

//記錄軌跡(只有在使用者亂來,且被前端擋住的情況下紀錄)
const traceRecord = (collector, targetGuid, typeId, desc, myHeaders) => {
    fetch(`${SSL}//${domain}/api/api/Common/Trace`, {
        method: 'POST',
        body: serialize({
            UserGuid: collector,
            TargetGuid: targetGuid,
            TypeId: typeId,
            Desc: desc
        }),
        headers: myHeaders
    }).then(res => {
        return res.json();
    }).then(result => {
        // console.log(result)
    })

}

const fetchGreenliving = (typeId, guids, setFetchData) => {
    let domainFormal = "greenliving.epa.gov.tw/newPublic";
    let domainTest = "greenliving.eri.com.tw/PublicRwd"

    let uri

    if (guids.length > 0) {
        switch (typeId) {
            case "4":
            case "7-1":
            case "7-2":
                {
                    uri = `${SSL}//${domainFormal}/APIs//TravelTour?no=${guids}&p=3`
                    break;
                }
            case "5":
                {
                    uri = `${SSL}//${domainFormal}/APIs/Restaurant4?no=${guids}&r=3`
                    break;
                }
            case "6":
            case "8-1":
                {
                    uri = `${SSL}//${domainFormal}/APIs/Hotels?no=${guids}&h=3`
                    break;
                }
            case "7":
                {
                    uri = `${SSL}//${domainFormal}/APIs/Stores?no=${guids}`
                    break;
                }
            case "6-1":
                {
                    uri = `${SSL}//${domainFormal}/APIs/Restaurant5?no=${guids}&r=3`
                    break;
                }
        }


        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(uri)
                console.log(result)
                setFetchData(result.Detail)
            })

    } else {
        setFetchData([])
    }
}

const AddPointAndGetPointAmount = (memberToken, roleId, targetGuid, roleItemId, setGetPoint, setUserMsg) => {
    if (memberToken) {
        fetch(`${SSL}//${domain}/api/api/Point/Add`, {
            method: 'POST',
            body: serialize({
                RoleId: String(roleId),
                TargetGuid: String(targetGuid),
                RoleItemId: String(roleItemId),
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Token": memberToken
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                // console.log(result)
                setGetPoint(true)
                setUserMsg(result.userMsg)
            }
        })
    } else {
        // setShowDialog(true)
        // setAlertTitle("請先登入喔~")
        // setTimeout(function () {
        //     setAlertTitle("請先登入喔~ ")
        // }, 100)
    }
}


//資訊網更新資料
const greenlivingLogin = async (linkType, data, greenlivingToken) => {
    return await fetch(`${SSL}//${domain}/api/api/Auth/Login/GreenLiving`, {
        method: 'POST',
        body: serialize({
            IdentityTypeId: String(linkType),
            UserId: data.userid !== null ? data.userid : "",
            UserName: data.username !== null ? data.username : "",
            P_Tel: data.p_tel !== null ? data.p_tel : "",
            P_Fax: data.p_fax !== null ? data.p_fax : "",
            P_Cell_Phone: data.p_cell_phone !== null ? data.p_cell_phone : "",
            P_Email: data.p_email !== null ? data.p_email : "",
            P_Addr: data.p_addr !== null ? data.p_addr : "",
            P_Addr_Zipcode: data.p_addr_zipcode !== null ? data.p_addr_zipcode : "",
            U_Name: data.u_name !== null ? data.u_name : "",
            U_Short_Name: data.u_short_name !== null ? data.u_short_name : "",
            U_Charge_Name: data.u_charge_name !== null ? data.u_charge_name : "",
            U_Addr_Ch: data.u_addr_ch !== null ? data.u_addr_ch : "",
            U_Addr_Zipcode: data.u_addr_zipcode !== null ? data.u_addr_zipcode : "",
            U_Tel: data.u_tel !== null ? data.u_tel : "",
            U_Fax: data.u_fax !== null ? data.u_fax : "",
            U_Email: data.u_email !== null ? data.u_email : "",
            U_Url: data.u_url !== null ? data.u_url : "",
            Tax_No: data.tax_no !== null ? data.tax_no : "",
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Token": greenlivingToken
        }
    })
        .then(res => {
            return res.json();
        }).then(result => {
            return result
        })
}

const checkGLivingToken = (greenlivingToken, history) => {
    return fetch(`${SSL}//${domain}/api/api/Auth/CheckGLivingToken`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Token": greenlivingToken
        }
    })
        .then(res => {
            if (res.status === 403) {
                history.go(0)
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        }).then(result => {
            return result
        })
}

const fetchTotalGreenShop = (setFetchGreenShop) => {
    fetch(`${SSL}//${domain}/api/api/GreenShop/Release/Public`, {
        method: 'GET',
    })
        .then(res => {
            return res.json();
        }).then(result => {
            setFetchGreenShop(result.resultObject)
        });
}

const fetchMyTotalGreenShop = (memberToken, setMyFetchGreenShop) => {
    fetch(`${SSL}//${domain}/api/api/GreenShop/Release/Private`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Token": memberToken
        }
    })
        .then(res => {
            return res.json();
        }).then(result => {
            setMyFetchGreenShop(result.resultObject)
        });
}

const getDailyGreenData = (startDate, month, setActivityReportd) => {
    fetch(`${SSL}//${domain}/api/api/Point/ActivityReport`, {
        method: 'POST',
        body: serialize({
            Year: String(startDate),
            Month: String(month)
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    })
        .then(res => {
            return res.json();
        }).then(result => {
            setActivityReportd(result.resultObject)
        })
}

const EditDesignationPic = (designationId, myHeaders) => {
    return fetch(`${SSL}//${domain}/api/api/Member/Designation/Edit`, {
        method: 'POST',
        body: serialize({
            DesignationId: String(designationId)
        }),
        headers: myHeaders
    })
        .then(res => {
            return res.json();
        }).then(result => {
            return result
        })
}

//機關類型列表下拉項目API
const getOrgTypeDrop = (setTypeDrop) => {
    fetch(`${SSL}//${domain}/api/api/GOffice/Article/Type`, {
        method: 'GET'
    })
        .then(res => {
            return res.json();
        }).then(result => {
            setTypeDrop(result.resultObject)
        });
}

const getOrgTagDrop = (setTagDrop) => {
    fetch(`${SSL}//${domain}/api/api/GOffice/Article/Tag`, {
        method: 'GET'
    })
        .then(res => {
            return res.json();
        }).then(result => {
            setTagDrop(result.resultObject)
        });
}

const getThemeData = (setThemeFetchData) => {
    fetch(`${SSL}//${domain}/api/api/ThemeTask/GLMatch/Themes`, {
        method: 'GET',
    }).then(response => response.json())
        .then(result => {
            if (result.httpCode === 200) {
                // console.log(result)
                setThemeFetchData(result.resultObject)
            }
        })
        .catch(error => console.log('error', error));
}



export { clickRecord, getMemberCard, addTrack, mulDownloadAPI, GovSignUp, CompSignUp, getMemberProfile, getCityDrop, getDistrictDrop, logoutLog, traceRecord, fetchGreenliving, AddPointAndGetPointAmount, greenlivingLogin, checkGLivingToken, fetchTotalGreenShop, fetchMyTotalGreenShop, getDailyGreenData, EditDesignationPic, getOrgTypeDrop, getOrgTagDrop, getThemeData }