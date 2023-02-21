import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clickLogout, formatDate } from '../../../utils/Functions';
import ReactPaginate from 'react-paginate';
import '../../office/Review.scss';
import { clickRecord } from '../../../utils/API';
import { useCookies } from "react-cookie";
import Loader from '../../../Components/Loader';
import PdfIcon from '../../../images1/download/PdfIcon.png';
import Mp4Icon from '../../../images1/download/Mp4Icon.png';
import PptIcon from '../../../images1/download/pptIcon.png';
import OdsIcon from '../../../images1/download/download-xlsx.png';
import OdfIcon from '../../../images1/download/OdfIcon.png';
import OdtIcon from '../../../images1/download/odt.png';
import RarIcon from '../../../images1/download/rar.png';
import ZipIcon from '../../../images1/download/壓縮檔icon.png'
import OdpIcon from '../../../images1/download/odpIcon.png'
import DocIcon from '../../../images1/download/DocIcon.png'


import ImageUploading from 'react-images-uploading';
import Compressor from 'compressorjs';
import ComfirmAlert from '../../../Components/ComfirmAlert';


const BreadCrumb = React.lazy(() => import('../../../Components/BreadCrumb'));
// const Footer = React.lazy(() => import('../../../Components/Footer'));

function Material() {

    var XLSX = require('xlsx');

    let history = useHistory()
    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var serialize = require('serialize-javascript');

    const [greenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";


    const [showDialog, setShowDialog] = useState(false);
    const [showText, setShowText] = useState("");

    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("");
    const count = 30;
    const [title, setTitle] = useState(""); //檔案名稱
    const [beginData, setBeginData] = useState(""); //上架日期
    const [endData, setEndData] = useState(""); //上架日期
    const [typeId, setTypeId] = useState("1"); //分類
    const [themeId, setThemeId] = useState("1"); //分類
    const [fileType, setFileType] = useState(""); //分類
    const [detailId, setDetailId] = useState(""); //細項
    const [updateFile, setUpdateFile] = useState(null); //上傳文件
    const [linkSite, setLinkSite] = useState(""); //連結網址
    const [order, setOrder] = useState("");

    const [showUploadBtn, setShowUploadBtn] = useState(true); //上傳圖片
    const [images, setImages] = useState([]); //圖片
    const [errMsg, setErrMsg] = useState(""); //錯誤訊息
    const [imageInfo, setImageInfo] = useState(null);
    const [onEdit, setOnEdit] = useState(false);

    const formData = new FormData();

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("45162DCA-1BC4-45D1-986A-A2FD4539F34B", "19", collector)
    }, [collector]);

    //換頁
    useEffect(() => {
        getFetchData()
        window.scrollTo(0, 0)
    }, [page]);

    //換頁按鈕
    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    const getFetchData = () => {
        let url;
        if (themeId === "1") {
            url = `${SSL}//${domain}/api/api/Dload/Business/ComplexSearch`;
        } else {
            url = `${SSL}//${domain}/api/api/Manager/DownloadArea/GetMaterialList`;
        }
        fetch(url, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                title: title,
                DetailId: themeId === "1" ? detailId : "",
                TypeId: themeId === "1" ? "1" : detailId,
                ThemeId: themeId === "1" ? "" : themeId,
                StartTime: beginData,
                EndTime: endData,
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
            }).then(result => {
                if (result.isSucess) {
                    console.log(result)
                    setLoading(false)
                    setFetchData(result.resultObject.listItems)
                    setPageCount(result.resultObject.pageCount)
                    setTotalCount(result.resultObject.totalCount)
                    setDetailId("")
                    setBeginData("")
                    setEndData("")
                    setTitle("")
                }
            });
    }

    useEffect(() => {
        getFetchData()
        if (isEditing) {
            setIsEditing(false)
        }
    }, [themeId])

    //查詢按鈕
    const search = () => {
        //查詢結果回到第一頁
        setPage(1)
        setLoading(true)
        getFetchData()
    }

    //刪除按鈕
    const deleteRow = (guid) => {
        if (guid) {
            setShowDialog(true)
            setShowText("刪除中")
            window.scrollTo(0, 0)
            let url;
            if (themeId === "1") {
                url = `${SSL}//${domain}/api/api/Manager/Business/Delete?Guid=${guid}`;
            } else {
                url = `${SSL}//${domain}/api/api/Manager/DownloadArea/Delete?Guid=${guid}`;
            }

            fetch(url, {
                method: 'POST',
                headers: myHeaders
            })
                .then(res => {
                    // console.log(res)
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    if (result.isSucess) {
                        setShowText("刪除成功")
                        setTimeout(function () {
                            window.location.href = '/member/material';
                        }, 1000)
                    }
                });
        }
    }

    //編輯
    const [isEditing, setIsEditing] = useState(false);
    const [currentData, setCurrentData] = useState();

    const editRow = data => {
        window.scrollTo(0, 0)
        setIsEditing(true);
        // console.log("data", data)
        setCurrentData(data);
    };

    const updateData = (e, currentData) => {
        e.preventDefault();
        setIsEditing(false);
        setShowDialog(true);
        setShowText("更新中")
        window.scrollTo(0, 0)

        let url;
        if (themeId === "1") {
            url = `${SSL}//${domain}/api/api/Manager/Business/Edit`;

            formData.append("Guid", currentData.guid);
            formData.append("Title", encodeURIComponent(title) || currentData.title);
            formData.append("StartTime", "2001/1/1");
            formData.append("EndTime", "2200/12/25");
            formData.append("TypeId", "1");
            formData.append("DetailId", detailId);
            updateFile !== null && formData.append("File", updateFile);
            updateFile === null && formData.append("Href", currentData.href);

            // for (var value of formData.values()) {
            //     console.log("value", value);
            // }
        } else {
            url = `${SSL}//${domain}/api/api/Manager/DownloadArea/Edit`

            formData.append("Guid", currentData.guid)
            formData.append("Title", encodeURIComponent(title) || currentData.title);
            formData.append("StartTime", beginData || currentData.startTime);
            formData.append("EndTime", endData || currentData.endTime);
            formData.append("ThemeId", themeId || currentData.themeId);
            formData.append("TypeId", detailId || currentData.typeId);
            formData.append("LinkSite", linkSite || currentData.linkSite);
            formData.append("LinkExt", fileType || currentData.linkExt);
            formData.append("Order", order || currentData.order);
            imageInfo !== null && formData.append("File", imageInfo);
            updateFile !== null && formData.append("File", updateFile);
            (imageInfo === null && updateFile === null) && formData.append("Href", currentData.href);
        }
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: { "Token": memberToken }
        })
            .then(res => {
                console.log(res)
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess) {
                    setShowText("更新成功")
                    setTimeout(function () {
                        window.location.href = '/member/material';
                    }, 1000)
                }
            });
    };

    // 送出按鈕
    const submit = () => {
        setShowDialog(true)
        setShowText("上傳中")
        window.scrollTo(0, 0)
        let url;
        if (themeId === "1") {
            url = `${SSL}//${domain}/api/api/Manager/Business/Add`;
            formData.append("Title", encodeURIComponent(title))
            formData.append("StartTime", "2001/1/1");
            formData.append("EndTime", "2200/12/25");
            formData.append("TypeId", "1");
            formData.append("DetailId", detailId || "2");
            formData.append("File", updateFile);
            // for (var value of formData.values()) {
            //     console.log("value", value);
            // }
        } else {
            url = `${SSL}//${domain}/api/api/Manager/DownloadArea/Add`;
            formData.append("Title", encodeURIComponent(title));
            // formData.append("StartTime", beginData);
            // formData.append("EndTime", endData);
            formData.append("StartTime", "2001/1/1");
            formData.append("EndTime", "2200/12/25");
            formData.append("ThemeId", themeId);
            formData.append("TypeId", detailId);
            formData.append("LinkSite", linkSite);
            formData.append("LinkExt", fileType);
            formData.append("Order", order);
            updateFile === null && formData.append("File", imageInfo);
            updateFile !== null && formData.append("File", updateFile);
        }

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: { "Token": memberToken }
        })
            .then(res => {
                console.log(res)
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setShowText("上傳成功")
                    setTimeout(function () {
                        window.location.href = '/member/material';
                    }, 1000)
                }
            });
    }

    const tableData = (
        fetchData.map((data, index) => {
            const { guid, createTime, title, typeName, themeName, detailName, href, linkSite, linkExt, order, pdf, mP4, odf, ods, ppt } = data
            let src;
            // .odp .gif .jpg .jpeg .png.7z .mp4
            if (themeId === "4" || themeId === "6" || themeId === "7") {
                switch (href.slice(-3) || linkExt) {
                    case "pdf": src = PdfIcon;
                        break;
                    case "odt": src = OdtIcon;
                        break;
                    case "rar": src = RarIcon;
                        break;
                    case "zip": src = ZipIcon;
                        break;
                    case "7z": src = ZipIcon;
                        break;
                    case "ods": src = OdsIcon;
                        break;
                    case "ppt": src = PptIcon;
                        break;
                    case "pptx": src = PptIcon;
                        break;
                    case "odf": src = OdfIcon;
                        break;
                    case "odp": src = OdpIcon;
                        break;
                    case "doc": src = DocIcon;
                        break;
                    case "docx": src = DocIcon;
                        break;
                    case "mp4": src = Mp4Icon;
                        break;
                    default:
                }
            }
            return (
                <tr key={index}>
                    <td data-title="日期">{formatDate(createTime)}</td>
                    <td data-title="檔案名稱" className="list-date">{themeId === "5" ? title + "-" + order : title}</td>
                    <td data-title="分類" className="list-date">{themeId === "1" ? typeName : themeName}</td>
                    <td data-title="細項" className="list-date">{themeId === "1" ? detailName : typeName}</td>
                    {themeId === "1" ?
                        <td data-title="檔案下載" className="manageTable-name">
                            <a target="_blank" rel="noopener noreferrer" href={href}
                                download={href} title="檔案下載鏈結">
                                {pdf !== null && <img src={PdfIcon} style={{ width: "60px" }} alt="下載PDF" aria-label="下載PDF" />}
                                {mP4 !== null && <img src={Mp4Icon} style={{ width: "60px" }} alt="下載MP4" aria-label="下載MP4" />}
                                {odf !== null && <img src={OdfIcon} style={{ width: "60px" }} alt="下載ODF" aria-label="下載ODF" />}
                                {ods !== null && <img src={OdsIcon} style={{ width: "60px" }} alt="下載ODS" aria-label="下載ODS" />}
                                {ppt !== null && <img src={PptIcon} style={{ width: "60px" }} alt="下載PPT" aria-label="下載PPT" />}
                            </a>
                        </td>
                        :
                        (themeId === "4" || themeId === "6" || themeId === "7") ?
                            linkSite != null || linkExt != null ?
                                <td className="link-wrapper download_promote" data-title="檔案下載鏈結">
                                    <a target="_blank" rel="noopener noreferrer" href={linkSite} download={title} title={`下載${title}檔案`}>
                                        <img src={src} alt={`下載${title}`} style={{ width: "60px" }} />
                                    </a>
                                </td>
                                :
                                <td className="link-wrapper download_promote" data-title="檔案下載">
                                    <a target="_blank" rel="noopener noreferrer" href={href} download={title} title={`下載${title}檔案`}>
                                        <img src={src} alt={`下載${title}`} style={{ width: "60px" }} />
                                    </a>
                                </td>
                            :
                            <td data-title="圖片下載" className="manageTable-name">
                                <a target="_blank" rel="noopener noreferrer" href={href} download={href} title="圖片下載鏈結">
                                    <img src={href} alt={title} style={{ width: "60px" }} />
                                </a>
                            </td>
                    }
                    {onEdit &&
                        <td>
                            <button
                                onClick={() => editRow(data)}
                                className="button muted-button">
                                編輯
                            </button>
                            <button
                                onClick={() => deleteRow(guid)}
                                className="button muted-button">
                                刪除
                            </button>
                        </td>
                    }
                </tr >
            )
        })

    )

    // 下載專區-取得主題
    const [themeDrop, setThemeDrop] = useState([]);
    useEffect(() => {
        const materialTheme = `${SSL}//${domain}/api/api/DLoad/Material/Theme`
        fetch(materialTheme, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setThemeDrop(result.resultObject)
                // console.log("themeId", result)
            });
    }, [SSL, domain])

    const [fileTypeDrop, setFileTypeDrop] = useState("")
    // 檔案類型下拉
    useEffect(() => {
        const materialTheme = `${SSL}//${domain}/api/api/DLoad/Material/Ext`
        fetch(materialTheme, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setFileTypeDrop(result.resultObject)
                // console.log("fileType", result)
            });
    }, [SSL, domain])

    // 取得各主題所擁有的類型項目
    const [detailDrop, setDetailDrop] = useState([]);
    useEffect(() => {
        if (themeId === "1") {
            fetch(`${SSL}//${domain}/api/api/Dload/Business/Detail`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    setDetailDrop(result.resultObject)
                    // console.log("detail", result)
                });

            fetch(`${SSL}//${domain}/api/api/Dload/Business/Type`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    setTypeId(result.resultObject)
                    // console.log("type", result)
                });
        } else {
            fetch(`${SSL}//${domain}/api/api/DLoad/Material/Type?ThemeId=${themeId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Token": memberToken
                }
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setDetailDrop(result.resultObject)
                    // console.log("detail", result)
                }
            });
        }

    }, [SSL, domain, themeId])



    //json匯出ods
    const handleExport = () => {
        let url
        let tableHead
        if (themeId === "1") {
            url = `${SSL}//${domain}/api/api/Dload/Business/ComplexSearch`
            tableHead = ["檔案名稱", "分類", "細項", "日期", "上傳檔案"]

        } else {
            url = `${SSL}//${domain}/api/api/Manager/DownloadArea/GetMaterialList`
            tableHead = ["檔案名稱", "細項", "分類", "上傳檔案", "日期"]
        }

        fetch(url, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count),
                title: title,
                DetailId: themeId === "1" ? detailId : "",
                TypeId: themeId === "1" ? "1" : detailId,
                ThemeId: themeId === "1" ? "" : themeId,
                StartTime: beginData,
                EndTime: endData,
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                //從陣列中刪除Guid欄位
                result.resultObject.listItems.forEach(function (v) {
                    delete v.guid
                    delete v.desc
                    delete v.linkSite
                    delete v.themeId
                    delete v.typeId
                    delete v.order
                    delete v.startTime
                    delete v.endTime
                });
                if (result.isSucess) {
                    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                    var ws = XLSX.utils.json_to_sheet(result.resultObject.listItems);

                    const wb = XLSX.WorkBook = XLSX.utils.book_new();
                    //表格中項目名稱
                    ws.A1.v = tableHead[0]
                    ws.B1.v = tableHead[1]
                    ws.C1.v = tableHead[2]
                    ws.D1.v = tableHead[3]
                    ws.E1.v = tableHead[4]


                    XLSX.utils.book_append_sheet(wb, ws, "Table Export2");
                    XLSX.writeFile(wb, `全民綠生活_下載專區_共${totalCount}筆.ods`);
                }
            });
        /* generate an XLSX file */
        // XLSX.writeFile(wb, "sheetjs.xlsx");
    }

    const onImageChange = (imageList, addUpdateIndex) => {
        console.log(addUpdateIndex, imageList[0])
        setImages(imageList);
        if (imageList[0]) {
            if (imageList[0].file.size < 5000000) {
                if (imageList[0]) {
                    setShowUploadBtn(false)
                    setImageInfo(imageList[0].file)
                    setErrMsg("")
                }
            } else {
                // setErrMsg("檔案需小於5MB")
                // setImages("");
                setShowUploadBtn(false)
                //照片大於2.5MB的話, 壓縮照片到原本的0.1倍
                new Compressor(imageList[0].file, {
                    quality: 0.1,
                    success(result) {
                        console.log(result)
                        setImageInfo(result);
                    },
                    error(err) {
                        console.log(err.message);
                    },
                });
            }
        }

    };
    const handleChange = (event) => {
        setUpdateFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    return (
        <>
            <BreadCrumb currentPage={"下載專區"} />
            <div className={showDialog ? "black-background show" : "black-background"}></div>
            {showDialog &&
                <ComfirmAlert key={showText} subTitle=" " alertTitle={showText} showLoginBtn={false} history={history} />
            }
            {/* tab-1 查詢 */}
            <div className="container member-info-wrapper shareBlog">
                <div className="col-12 mt-4">
                    <h3 className="green-title">下載專區</h3>
                    <span id="tab-1">查詢</span>
                    <span id="tab-2">上傳/編輯</span>
                    <div id="tab">
                        <ul>
                            <li><a href="#tab-1" title="查詢鏈結" onClick={() => { setOnEdit(false) }}>查詢</a></li>
                            <li><a href="#tab-2" title="上傳/編輯鏈結" onClick={() => { setOnEdit(true) }}>上傳/編輯</a></li>
                        </ul>

                        <div className="row search-conditions tab-content-1">
                            <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                                <label for="beginDate" className="condition-label">上架日期</label>
                                <input type="date" name="beginDate" id="beginDate" onChange={e => setBeginData(e.target.value)} />
                                至
                                <label for="endDate"></label>
                                <input type="date" name="endDate" id="endDate" onChange={e => setEndData(e.target.value)} />
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <label for="type" className="condition-label">分類</label>
                                <select className="management-select" id="type" onChange={e => setThemeId(e.target.value)}>
                                    <option value="">請選擇</option>
                                    {themeDrop.map((data, index) =>
                                        <option key={index} value={data.id}>{data.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <label for="fileName" className="condition-label">檔案名稱</label>
                                <input type="text" name="fileName" id="fileName" onChange={e => setTitle(e.target.value)}
                                    onKeyPress={e => { if (e.which === 13) { getFetchData() } }} />
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <label for="detail" className="condition-label">細項</label>
                                <select className="management-select" id="detail" onBlur={e => setDetailId(e.target.value)}>
                                    <option value="">請選擇</option>
                                    {detailDrop.map((data, index) =>
                                        <option key={index} value={data.id}>{data.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-6">
                                <button onClick={handleExport} className="send-btn" style={{ width: "40%" }}>匯出檔案清單</button>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6 d-flex justify-content-end">
                                <button onClick={search} className="condition-submit-btn">查詢</button>
                            </div>
                        </div>
                        {/* ---------------------------------tab-2 ------------------------------------*/}
                        {/* 上傳/編輯 */}
                        <div className="row search-conditions tab-content-2">
                            {isEditing ?
                                (<>
                                    <div className="row condition-select-wrapper">
                                        <div className="col-sm-12 col-md-12 col-lg-6">
                                            <label for="createTime" className="condition-label"> 上架日期</label>
                                            <input type="date" name="beginDate" id="beginDate" defaultValue={themeId === "1" ? currentData?.createTime.split("T")[0] : currentData?.startTime.split("T")[0]} onChange={e => setBeginData(e.target.value)} />
                                            至
                                            <label for="endDate"></label>
                                            <input type="date" name="endDate" id="endDate" defaultValue={themeId === "1" ? currentData?.createTime.split("T")[0] : currentData?.endTime.split("T")[0]} onChange={e => setEndData(e.target.value)} />
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-6">
                                            <label for="typeEdit" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>分類</label>
                                            <select className="management-select" id="typeEdit" onChange={(e) => { setThemeId(e.target.value) }}>
                                                <option value="">請選擇</option>
                                                {themeDrop.map((data, index) =>
                                                    <option key={index} name="themeName" value={data.id} selected={themeId === "1" ? Number(themeId) === data.id : currentData?.themeName === data.name}>{data.name}</option>
                                                )}
                                            </select>
                                        </div>

                                        <div className="col-sm-12 col-md-12 col-lg-6">
                                            <label for="titleEdit" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>檔案名稱</label>
                                            <input type="text" name="titleEdit" id="titleEdit" defaultValue={currentData?.title}
                                                onChange={(e) => { setTitle(e.target.value) }}
                                                onKeyPress={e => { if (e.which === 13) { updateData(e) } }}
                                                style={{ width: "240px" }} />
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-6">
                                            <label for="detailEdit" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>細項</label>
                                            <select className="management-select" id="detailEdit" onChange={(e) => { setDetailId(e.target.value) }}>
                                                <option value="">請選擇</option>
                                                {detailDrop.map((data, index) =>
                                                    <option key={index} name="typeName" value={data.id} selected={themeId === "1" ? currentData.detailName === data.name : currentData.typeName === data.name}>{data.detailName || data.name}</option>
                                                )}
                                            </select>
                                        </div>
                                        {themeId === "5" &&
                                            <>
                                                <div className="col-sm-12 col-md-12 col-lg-6">
                                                    <label for="linkSite" className="condition-label">連結網址</label>
                                                    <input type="text" name="link" id="linkSite" onChange={e => setLinkSite(e.target.value)}
                                                        defaultValue={currentData.linkSite} />
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-6">
                                                    <label for="orderAdd" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>順序</label>
                                                    <input type="text" name="order" id="OrderAdd" onChange={e => setOrder(e.target.value)}
                                                        defaultValue={currentData.order} />
                                                </div>
                                            </>
                                        }
                                        {(themeId === "6" || themeId === "7") &&
                                            <>
                                                <div className="col-sm-12 col-md-12 col-lg-6">
                                                    <label for="linkSite" className="condition-label">
                                                        <sapn style={{ color: "red" }}>*</sapn>連結網址</label>
                                                    <input type="text" name="link" id="linkSite" onChange={e => setLinkSite(e.target.value)}
                                                        defaultValue={currentData?.linkSite} style={{ width: "240px" }} />
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-6">
                                                    <label for="type" className="condition-label">
                                                        <sapn style={{ color: "red" }}>*</sapn>檔案類型</label>
                                                    <select className="management-select" id="type" onChange={e => setFileType(e.target.value)}>
                                                        <option value="">請選擇</option>
                                                        {fileTypeDrop.map((data, index) =>
                                                            <option key={index} value={data} selected={(themeId === "6" || themeId === "7") && currentData?.linkExt === data}>{data}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </>
                                        }
                                        {themeId !== "1" && themeId !== "4" && themeId !== "6" && themeId !== "7" ?
                                            <div className="col-sm-12 col-md-12 col-lg-6 d-flex ">
                                                <label className="condition-label"><sapn style={{ color: "red" }}>*</sapn>上傳圖片</label>
                                                <ImageUploading
                                                    multiple
                                                    maxFileSize="10485760"
                                                    value={images}
                                                    onChange={onImageChange}
                                                    maxNumber={1}
                                                    acceptType={["gif", "bmp", "svg", "png", "jpg", "jpeg", "pdf"]}
                                                    dataURLKey="data_url"
                                                >
                                                    {({
                                                        imageList,
                                                        onImageUpload,
                                                        onImageUpdate,
                                                        onImageRemove,
                                                        isDragging,
                                                        dragProps
                                                    }) => (
                                                        <>
                                                            <div>
                                                                <div className="upload__image-wrapper mt-3 d-flex">
                                                                    <div>
                                                                        {showUploadBtn ?
                                                                            <>
                                                                                <button
                                                                                    className="share-green-btn"
                                                                                    style={isDragging ? { color: "red" } : null}
                                                                                    onClick={onImageUpload}
                                                                                    {...dragProps}
                                                                                >
                                                                                    上傳圖片
                                                                                </button>
                                                                                <h6 className="upload-note">檔案小於5MB</h6>
                                                                            </>
                                                                            : ""
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="img-preview-note">
                                                                        <h6>圖片預覽:</h6>
                                                                        {imageInfo === null && <img src={currentData.href} alt="image_url" width="100" />}
                                                                        {imageList.map((image, index) => (
                                                                            <div key={index} className="image-item share-green-img">
                                                                                <img src={image.data_url} alt="image_url" width="100" />
                                                                                <div className="d-flex image-item__btn-wrapper">
                                                                                    <button className="share-green-btn" onClick={() => onImageUpdate(index)}><i className="fas fa-redo-alt" aria-hidden="true"></i>&nbsp;重新上傳</button>
                                                                                    <button className="share-green-btn" onClick={() => {
                                                                                        onImageRemove(index)
                                                                                        setShowUploadBtn(true)
                                                                                        setImageInfo(null)
                                                                                    }}>移除</button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </ImageUploading>
                                            </div>
                                            :
                                            <>
                                                <div className="col-sm-12 col-md-12 col-lg-6 d-flex ">
                                                    <label className="condition-label"><sapn style={{ color: "red" }}>*</sapn>上傳檔案</label>
                                                    <label for="input-file-edit" className="updatefile-label">上傳檔案</label>
                                                    <input type="file" multiple="multiple" maxLength="1" className="input-file" id="input-file-edit" acceptType=".gif,.bmp,.svg,.png,.jpg,.jpeg,.pdf,.mp4,.ods,.odf,.odt,.odp,.pdf,.ppt,.pptx,.doc,.docx" onChange={handleChange} />
                                                </div>
                                                <div className="col-sm-12 col-md-12 col-lg-6 ">
                                                    <h6 className="updatefile-text" >{updateFile ? updateFile?.name : currentData.href}</h6>
                                                </div>
                                            </>
                                        }
                                        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end">
                                            {/* <button onClick={handleEditClick} className="condition-submit-btn">編輯</button> */}
                                            <button className="condition-submit-btn" onClick={(e) => updateData(e, currentData)}>更新</button>
                                            <button className="condition-submit-btn"
                                                onClick={() => {
                                                    setIsEditing(false)
                                                    setUpdateFile(null)
                                                }}>取消</button>
                                        </div>
                                    </div>
                                </>)
                                :
                                (<>
                                    <div className="col-sm-12 col-md-12 col-lg-6 condition-select-wrapper">
                                        <label for="startTimeAdd" className="condition-label"> 上架日期</label>
                                        <input type="date" name="startTime" id="startTimeAdd" onChange={e => setBeginData(e.target.value)} />
                                        至
                                        <label for="endTimeAdd"></label>
                                        <input type="date" name="endTime" id="endTimeAdd" onChange={e => setEndData(e.target.value)} />
                                    </div>

                                    <div className="col-sm-12 col-md-12 col-lg-6">
                                        <label for="typeAdd" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>分類</label>
                                        <select className="management-select" id="typeAdd" onChange={e => setThemeId(e.target.value)}>
                                            <option value="">請選擇</option>
                                            {themeDrop.map((data, index) =>
                                                <option key={index} name="themeName" value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="col-sm-12 col-md-12 col-lg-6">
                                        <label for="titleAdd" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>檔案名稱</label>
                                        <input type="text" name="title" id="titleAdd" onChange={e => setTitle(e.target.value)}
                                            onKeyPress={e => { if (e.which === 13) { submit() } }} />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-6">
                                        <label for="detailAdd" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>細項</label>
                                        <select className="management-select" id="detailAdd" onBlur={e => setDetailId(e.target.value)}>
                                            <option value="">請選擇</option>
                                            {detailDrop.map((data, index) =>
                                                <option key={index} name="typeName" value={data.id}>{data.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    {themeId === "5" &&
                                        <>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <label for="linkSite" className="condition-label">連結網址</label>
                                                <input type="text" name="link" id="linkSite" onChange={e => setLinkSite(e.target.value)} />
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <label for="orderAdd" className="condition-label"><sapn style={{ color: "red" }}>*</sapn>順序</label>
                                                <input type="text" name="order" id="OrderAdd" onChange={e => setOrder(e.target.value)} />
                                            </div>
                                        </>
                                    }
                                    {(themeId === "6" || themeId == "7") &&
                                        <>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <label for="linkSite" className="condition-label">
                                                    <sapn style={{ color: "red" }}>*</sapn>連結網址</label>
                                                <input type="text" name="link" id="linkSite" onChange={e => setLinkSite(e.target.value)}
                                                    defaultValue={currentData?.linkSite} />
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <label for="type" className="condition-label">
                                                    <sapn style={{ color: "red" }}>*</sapn>檔案類型</label>
                                                <select className="management-select" id="type" onChange={e => setFileType(e.target.value)}>
                                                    <option value="">請選擇</option>
                                                    {fileTypeDrop.map((data, index) =>
                                                        <option key={index} value={data} selected={themeId == "6" || themeId == "7" ? currentData?.linkExt === data : currentData?.linkExt == data}>{data}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </>
                                    }
                                    {themeId !== "1" && themeId !== "4" && themeId !== "6" && themeId !== "7" ?
                                        <div className="col-sm-12 col-md-12 col-lg-6 d-flex ">
                                            <label className="condition-label col-3">上傳圖片</label>
                                            <ImageUploading
                                                multiple
                                                maxFileSize="10485760"
                                                value={images}
                                                onChange={onImageChange}
                                                maxNumber={1}
                                                acceptType={["gif", "bmp", "svg", "png", "jpg", "jpeg", "pdf"]}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    imageList,
                                                    onImageUpload,
                                                    onImageUpdate,
                                                    onImageRemove,
                                                    isDragging,
                                                    dragProps
                                                }) => (
                                                    <>
                                                        <div>
                                                            <div className="upload__image-wrapper mt-3 d-flex" style={{ marginLeft: "30%", width: "100%" }}>
                                                                <div>
                                                                    {showUploadBtn ?
                                                                        <>
                                                                            <button
                                                                                className="share-green-btn"
                                                                                style={isDragging ? { color: "red" } : null}
                                                                                onClick={onImageUpload}
                                                                                {...dragProps}
                                                                            >
                                                                                上傳圖片
                                                                            </button>
                                                                            <h6 className="upload-note">檔案小於5MB</h6>
                                                                        </>
                                                                        : ""
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="img-preview-note">
                                                                    <h6 style={{ marginLeft: imageInfo === null ? "30%" : "8%", width: "100%" }}>圖片預覽:</h6>
                                                                    {imageList.map((image, index) => (
                                                                        <div key={index} className="image-item share-green-img">
                                                                            <img src={image.data_url} alt="image_url" width="100" />
                                                                            <div className="d-flex image-item__btn-wrapper">
                                                                                <button className="share-green-btn" onClick={() => onImageUpdate(index)}><i className="fas fa-redo-alt" aria-hidden="true"></i>&nbsp;重新上傳</button>
                                                                                <button className="share-green-btn" onClick={() => {
                                                                                    onImageRemove(index)
                                                                                    setShowUploadBtn(true)
                                                                                    setImageInfo(null)
                                                                                }}>移除</button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </ImageUploading>
                                        </div>
                                        :
                                        <>
                                            <div className="col-sm-12 col-md-12 col-lg-6">
                                                <label className="condition-label">上傳檔案</label>
                                                <label for="input-file-add" className="updatefile-label">上傳檔案</label>
                                                <input type="file" multiple="multiple" maxLength="1" className="input-file" id="input-file-add" acceptType=".gif,.bmp,.svg,.png,.jpg,.jpeg,.pdf,.mp4,.ods,.odf,.odt,.odp,.pdf,.ppt,.pptx,.doc,.docx" onChange={handleChange} />
                                                <div>
                                                    {updateFile && <h6 className="updatefile-text" >{updateFile?.name}</h6>}
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end">
                                        <button onClick={submit} className="condition-submit-btn">送出</button>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                    <div className="member-table-outter-wrapper mt-5">
                        {loading
                            ?
                            <Loader loading={loading} />
                            :
                            fetchData.length === 0
                                ?
                                <p>查無搜尋結果</p>
                                :
                                <table className="review-card rwd-table">
                                    <thead className="text-content-wrapper text-content-wrapper-darkgreen">
                                        <tr>
                                            <th className="">上架日期</th>
                                            <th className="">檔案名稱</th>
                                            <th className="">分類</th>
                                            <th className="">細項</th>
                                            <th className="">檔案下載</th>
                                            {onEdit &&
                                                <th className="">編輯</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className="card-content">
                                        {tableData}
                                    </tbody>
                                </table>
                        }
                    </div>

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

            </div>
        </>
    )
}
export default Material;