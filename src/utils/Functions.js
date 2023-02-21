import { logoutLog } from '../utils/API';
import { useLayoutEffect } from 'react';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('/');
}


function formatDateDot(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('.');
}


function formatDateTime(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;


    if (hour < 10)
        hour = '0' + hour;
    if (minutes < 10)
        minutes = '0' + minutes;

    // return year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + "00"
    return [year, month, day].join('/') + " " + [hour, minutes].join(':');
}

function formatDateTimeDash(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;


    if (hour < 10)
        hour = '0' + hour;
    if (minutes < 10)
        minutes = '0' + minutes;

    // return year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + "00"
    return [year, month, day].join('-') + "T" + [hour, minutes].join(':');
}

function getYear(date) {
    var d = new Date(date),
        year = d.getFullYear();

    return year
}


function getDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return month + "/" + day
}

function getExportDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;


    if (hour < 10)
        hour = '0' + hour;
    if (minutes < 10)
        minutes = '0' + minutes;

    return year + month + day + hour + minutes
}

//數字加千位數逗點 0,000
function addComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getType(fileName) {
    switch (fileName) {
        case "JPG":
            return { background: "orange" };

        case "PNG":
            return { background: "#6161ff" };

        case "ZIP":
            return { background: "#ff6262" };

        case "XLSX":
            return { background: "#6eca6e" };

        case "ODS":
            return { background: "#6eca6e" };

        case "AI":
            return { background: "#ff8a67" };

        case "MP4":
            return { background: "#52bebe" };

        default:
            return { background: "#555555" };
    }
}

function getBgColor(Id) {
    switch (Id) {
        case 1:
            return { background: "#ee6055" };

        case 2:
            return { background: "#4ad3c0" };

        case 3:
            return { background: "#fbb128" };

        case 4:
            return { background: "#c65b7c" };

        case 5:
            return { background: "#8390fa" };

        case 6:
            return { background: "#52bebe" };

        default:
            return { background: "#555555" };
    }
}

function getTypeBgColor(Id) {
    switch (Id) {
        case 1:
            return { background: "#60AC0A" };

        case 2:
            return { background: "#85C8D4" };

        case 3:
            return { background: "#F2A728" };

        case 4:
            return { background: "#E97A74" };

        case 5:
            return { background: "#58B6AF" };

        case 6:
            return { background: "#ECD738" };

        default:
            return { background: "#555555" };
    }
}




const clickLogout = (removeCookie, collector) => {
    logoutLog(collector)
    sessionStorage.removeItem("userGuid")
    removeCookie('userName')
    removeCookie('userGuid')
    removeCookie('refreshToken')
    removeCookie('greenlivingJWT')
    removeCookie('identityType')
    removeCookie('groups')
    //window.location.href = "/login";
    // history.push('/Login');
}


function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function getCityId(name) {
    switch (name) {
        case "臺北市":
            return "01";

        case "新北市":
            return "02";

        case "基隆市":
            return "03";

        case "桃園市":
            return "04";

        case "新竹市":
            return "05";

        case "新竹縣":
            return "06";

        case "苗栗縣":
            return "07";

        case "臺中市":
            return "08";

        case "彰化縣":
            return "09";

        case "南投縣":
            return "10";

        case "雲林縣":
            return "11";

        case "嘉義市":
            return "12";

        case "嘉義縣":
            return "13";

        case "臺南市":
            return "14";

        case "高雄市":
            return "15";

        case "屏東縣":
            return "16";

        case "宜蘭縣":
            return "17";

        case "花蓮縣":
            return "18";

        case "臺東縣":
            return "19";

        case "澎湖縣":
            return "20";

        case "金門縣":
            return "21";

        case "連江縣":
            return "22";

        default:
            return "0";
    }
}

function getCityName(id) {
    switch (id) {
        case "01":
            return "臺北市";

        case "02":
            return "新北市";

        case "03":
            return "基隆市";

        case "04":
            return "桃園市";

        case "05":
            return "新竹市";

        case "06":
            return "新竹縣";

        case "07":
            return "苗栗縣";

        case "08":
            return "臺中市";

        case "09":
            return "彰化縣";

        case "10":
            return "南投縣";

        case "11":
            return "雲林縣";

        case "12":
            return "嘉義市";

        case "13":
            return "嘉義縣";

        case "14":
            return "臺南市";

        case "15":
            return "高雄市";

        case "16":
            return "屏東縣";

        case "17":
            return "宜蘭縣";

        case "18":
            return "花蓮縣";

        case "19":
            return "臺東縣";

        case "20":
            return "澎湖縣";

        case "21":
            return "金門縣";

        case "22":
            return "連江縣";

        default:
            return "";
    }
}


function getidentityName(identityType) {
    switch (String(identityType)) {

        case "2":
            return "機關";

        case "3":
            return "企業";

        case "4":
            return "公立學校";

        case "5":
            return "私立學校";

        case "6":
            return "團體";

        default:
            return "(非組織)";
    }
}

function getEventTopic(topicId) {
    switch (topicId) {
        case 1:
            return "綠色旅遊";

        case 2:
            return "綠色消費";

        case 3:
            return "綠色飲食";

        case 4:
            return "綠色居家";

        case 5:
            return "綠色辦公";

        // case 6:
        //     return "綠色能源";

        case 7:
            return "環保集點";

        case 8:
            return "其他";

        default:
            return "其他2";
    }
}


//判斷 資訊網權限為機關或公立學校, unitCode結尾是否為-0或-GL
const checkAuth = (identity, unitCode, setShowDialog, setAlertTitle, setShowNote, history) => {
    var orgIdentity = ["2", "3", "4", "5", "6"];
    console.log(identity, unitCode)
    if (orgIdentity.indexOf(identity) !== -1) {

        if ((identity === "2" || identity === "4") && !Boolean(unitCode.match(/-0|-GL$/g))) {
            setShowDialog(true)
            setAlertTitle(`「響應綠色辦公」目前已開放機關及公立學校之綠色採購人員權限，其代碼末碼須為「-0」及「-GL」之使用者，以免造成重複響應問題。
            貴單位如欲響應綠色辦公，請貴單位「綠色採購人員（-0帳號管理者）」填寫響應措施表，或由該使用者申請「-GL」分帳號，以供其他人員填寫響應措施表。
            如欲查詢所屬單位綠色採購人員，請撥打系統諮詢專線02-2361-1999#438。`)
            setShowNote(false)
            setTimeout(function () {
                history.push('/member/memberCenter?sortType=6');
                setAlertTitle(`「響應綠色辦公」目前已開放機關及公立學校之綠色採購人員權限，其代碼末碼須為「-0」及「-GL」之使用者，以免造成重複響應問題。
                貴單位如欲響應綠色辦公，請貴單位「綠色採購人員（-0帳號管理者）」填寫響應措施表，或由該使用者申請「-GL」分帳號，以供其他人員填寫響應措施表。
                如欲查詢所屬單位綠色採購人員，請撥打系統諮詢專線02-2361-1999#438。`)
            }, 800)
        } else {
            history.push('/categories/green_office/evaluation')
        }
    } else {
        setShowDialog(true)
        setAlertTitle(`請申請/登入「組織單位管理帳號」`)
        setShowNote(true)
        setTimeout(function () {
            setAlertTitle(`請申請/登入「組織單位管理帳號」 `)
        }, 100)
    }
}


const getCountyValue = (defaultZipcode) => {
    const elements = Array.from(document.querySelectorAll("[data-zipcode]"))
        .find(el => el.dataset.zipcode === defaultZipcode)

    if (elements) {
        // console.log(elements.value)
        return elements.value
    }
}

const matchRegex = (string, regex) => {
    if (string)
        if (string.match(regex)) {
            return string
        } else {
            return ""
        }
}



const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        // Get original value of body overflow
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => document.body.style.overflow = originalStyle;
    }, []); // Empty array ensures effect is only run on mount and unmount
}

//滾動到element在的位置
const scrollElementIntoView = (element) => {

    let scrollTop = window.pageYOffset || element.scrollTop

    // Furthermore, if you have for example a header outside the iframe 
    // you need to factor in its dimensions when calculating the position to scroll to
    const headerOutsideIframe = window.parent.document.getElementsByClassName('topnav-ori')[0].clientHeight

    const finalOffset = element.getBoundingClientRect().top + scrollTop + headerOutsideIframe

    window.parent.scrollTo({
        top: finalOffset,
        behavior: 'auto'
    })
}

//登入後導回原本要去的頁面
const checkLogin_and_redirect = (setGotoUrl, url) => {
    setGotoUrl(url)
    setTimeout(function () {
        setGotoUrl("")
    }, 100)
}

//使用者的裝置是否為行動裝置
function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return Boolean(navigator.userAgent.match(toMatchItem));
    });

}

/**
 * 計算百分比
 * @param   {number} num   分子
 * @param   {number} total 分母
 * @returns {number} 返回數百分比
 */
 function percentage(num, total) {
    /// <summary>
    /// 求百分比
    /// </summary>
    /// <param name="num">當前數</param>
    /// <param name="total">總數</param>
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
}



export { formatDate, formatDateDot, formatDateTime, formatDateTimeDash, getYear, getDate, getType, getBgColor, getTypeBgColor, getExportDate, addComma, clickLogout, pad, getCityId, getCityName, getidentityName, checkAuth, getCountyValue, getEventTopic, matchRegex, useLockBodyScroll, checkLogin_and_redirect, scrollElementIntoView, detectMob, percentage }