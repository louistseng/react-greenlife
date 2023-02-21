import React, { useState, useEffect, useRef } from 'react';
import '../GreenOffice/greenOffice.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import SideBtnOffice from '../Components/SideBtnOffice';
import { Card, Form, Button, Row } from 'react-bootstrap';
import { formatDateDot, formatDate, pad, getYear, getTypeBgColor, checkLogin_and_redirect } from '../utils/Functions';
import CheckLoginAndRedirect from '../Components/CheckLoginAndRedirect';
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import JoditEditor from "jodit-react";
import "react-datepicker/dist/react-datepicker.css";
import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";

const Footer = React.lazy(() => import('../Components/Footer'));
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Loader = React.lazy(() => import('../Components/Loader'));

function DailyBlog(props) {
    let SSL = props.SSL
    let domain = props.domain
    // let domain = "greenlife.epa.gov.tw"

    var serialize = require('serialize-javascript');
    let history = useHistory();

    //從URL抓搜尋參數
    const paramsSearch = new URLSearchParams(history.location.search);

    const [month, setMonth] = useState(0)
    const [time, setTime] = useState("")
    const [year, setYear] = useState("0")

    const [keyWord, setKeyWord] = useState("");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const count = "10";
    const [sortType, setSortType] = useState(10);
    const [identityType, setIdentityType] = useState([]);

    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(true)
    const [searched, setSearched] = useState(false);
    const [gotoUrl, setGotoUrl] = useState("");

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("6447A760-9C11-4BC1-AA72-447F00E2C874", "25", collector)
    }, [collector]);

    //文字編輯器config
    const config = {
        toolbar: false,
        readonly: true,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        inline: true,
        useSearch: false,
        disablePlugins: "source"
    }
    const editor = useRef(null)
    const joditDate = new Date("2021-07-12")

    //綠色辦公-查詢的類別項目-下拉
    const [typeTag, setTypeTag] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Blog/Types`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setTypeTag(result.resultObject)
                }

            });
    }, [SSL, domain])

    //排序下拉選單項目
    const [sortTypeDrop, setSortTypeDrop] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Blog/SortType`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setSortTypeDrop(result.resultObject)
                }

            });
    }, [])

    //fetch響應名單+複合查詢
    const [fetchData, setFetchData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [lastEditTime, setLastEditTime] = useState("");

    const complexSearch = () => {
        const params = new URLSearchParams(history.location.search);

        let inputYear = params.get('year') || (time && String(getYear(time)));
        let requestPayload;

        setKeyWord(params.get('n'))

        if (inputYear === "0" || inputYear === "" || inputYear === "1970") {
            requestPayload = serialize({
                Title: params.get('n') || keyWord,
                Year: "0",
                Month: params.get('month') || pad(month),
                TypeIds: params.get('type') || String(identityType),
                Page: inputYear === "" ? "1" : params.get('page'),
                Count: count,
                SortType: params.get('sort') || String(sortType),
            })

        } else {
            requestPayload = serialize({
                Title: params.get('n') || keyWord,
                Year: params.get('year') || (time && String(getYear(time))),
                Month: params.get('month') || pad(month),
                TypeIds: params.get('type') || String(identityType),
                Page: params.get('page') || String(page),
                Count: count,
                SortType: params.get('sort') || String(sortType),
            })
        }

        fetch(`${SSL}//${domain}/api/api/Blog/ComplexSearch`, {
            method: 'POST',
            body: requestPayload,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result.resultObject)
                if (result.isSucess) {
                    setFetchData(result.resultObject.blogs)
                    setPageCount(result.resultObject.pageCount)
                    setTotalCount(result.resultObject.totalCount)
                    setLastEditTime(result.resultObject.lastEditTime)
                    setLoading(false)
                }
            });
    }

    useEffect(() => {
        // 自動產生的 Textarea 標籤 加上 title
        const textareaList = document.querySelectorAll('textarea');
        for (let idx = 0; idx < textareaList.length; idx++) {
            textareaList[idx].setAttribute("title", "textarea");
        }
        // console.log(textareaList)

        //<img/> 新增 alt 替代文字
        const joditEditor = document.querySelectorAll(".jodit-wysiwyg")
        if (joditEditor !== null) {
            for (let i = 0; i < joditEditor.length; i++) {
                const joditImg = joditEditor[i].querySelectorAll("img")
                const joditA = joditEditor[i].querySelectorAll("a")
                const title = document.querySelector("#daily-title").textContent;
                if (joditA !== null)
                    for (let i = 0; i < joditA.length; i++) {
                        joditA[i].setAttribute("title", `${title}-連結${i}`);
                        if (i === 10) {
                            joditA[i].remove()
                        }
                    }
                if (joditImg !== null)
                    for (let i = 0; i < joditImg.length; i++) {
                        joditImg[i].setAttribute("alt", `${title}內文圖示-${i}`);
                    }
            }
            // console.log(joditEditor)
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        // history.push(`/daily/blog?page=${page}&type=${identityType}&year=${time}&month=${month}&sort=${sortType}&n=${keyWord}`)
        // history.push(`/daily/blog?page=${page}&type=&award=&city=&n=`);
        history.push(`/daily/blog?page=${page}&year=${year}&month=${month}&type=&award=&city=&n=`);

        complexSearch()
    }, [page])


    useEffect(() => {
        if (searched) {
            complexSearch()
        }
    }, [sortType]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/daily/blog?page=${data.selected + 1}&year=${year}&month=${month}&type=&award=&city=&n=`);
    };

    const searchOnchange = () => {
        setSearched(false)
    };

    const sortOnchange = (e) => {
        setSortType(e.target.value)
        history.push(`/daily/blog?page=${page}&year=${year}&month=${month}&type=&award=&city=&n=&sort=${e.target.value}&n=${keyWord}`)
        complexSearch()
    };



    const submit = async (e) => {
        if (getYear(time) == "0") {
            history.push(`/daily/blog?page=${page}&month=${month}&type=&award=&city=&n=`)
        } else {
            history.push(`/daily/blog?page=${page}&year=${year}&month=${month}&type=&award=&city=&n=`)
        }
        setSearched(true)
        window.scrollTo(0, 300)
        setPage(1)
        e.preventDefault()

        setLoading(true)
        complexSearch()
    };


    //類別checkbox
    var arrayCheck = []
    const getIdentityCheck = () => {

        var chks = document.querySelectorAll('input#typeCheckbox0[type=checkbox]:checked, input#typeCheckbox1[type=checkbox]:checked, input#typeCheckbox2[type=checkbox]:checked, input#typeCheckbox3[type=checkbox]:checked, input#typeCheckbox4[type=checkbox]:checked, input#typeCheckbox5[type=checkbox]:checked, input#typeCheckbox6[type=checkbox]:checked, input#typeCheckbox7[type=checkbox]:checked')
        for (var i = 0; i < chks.length; i++) {
            arrayCheck.push(Number(chks[i].value))
            setIdentityType(arrayCheck)
        }
        chks.length === 0 && setIdentityType([])
    }


    return (
        <>
            <BreadCrumb currentPage={"網誌清單"} />
            {gotoUrl &&
                <CheckLoginAndRedirect key={gotoUrl} gotoUrl={gotoUrl} />
            }
            <div className="container office-participate">
                <div className="title-wrapper-blog">
                    <h1 className="share-green-title">綠生活網誌</h1>
                    <div className="d-flex share-green-wapper">
                        {/* 如果尚未登入引導登入, 登入完成後導回原本要去的頁面 */}
                        <div onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/shareBlog")}><button className="share-green-btn">分享綠生活網誌</button></div>
                    </div>
                </div>
                <div className="content-wrapper shared-article row">
                    <div className={`col-12 col-md-10 col-lg-3 mb-5 ${click ? 'search-office show' : 'search-office'} `}>
                        <Form className="form-text">
                            <Form.Group className="col-md-3 col-lg-12">
                                <Form.Label htmlFor="關鍵字查詢">關鍵字查詢</Form.Label>
                                <Form.Control id="關鍵字查詢" onKeyPress={e => {
                                    if (e.which === 13) {
                                        submit(e)
                                    }
                                }} placeholder="請輸入關鍵字" value={keyWord} onChange={e => setKeyWord(e.target.value === "" ? "" : e.target.value)} />
                                <span className="keyword-note">*可查詢文章名稱/作者名稱</span>
                            </Form.Group>


                            <fieldset className="col-md-5 col-lg-12" style={{ margin: '1.2vw 0' }}>
                                <legend className="form-label" style={{ width: 'auto' }}>日期區間</legend>
                                <Form.Group as={Row} controlId="date" className="data-wrapper">
                                    <DatePicker
                                        onChange={date => {
                                            setTime(date)
                                            setYear(getYear(date))
                                            searchOnchange()
                                        }}
                                        id="日期區間"
                                        showYearPicker
                                        dateFormat="yyyy"
                                        placeholderText="年份"
                                        selected={time}
                                        className="myInput"
                                        title="年份"
                                    />
                                    <Form.Control className="myInput" as="select" defaultValue={paramsSearch.get('month')} onChange={() => searchOnchange()} onBlur={e => {
                                        setMonth(e.target.value)
                                    }} aria-label="月份"
                                    >
                                        <option value="0">月份</option>
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
                                    </Form.Control>
                                </Form.Group>
                            </fieldset>

                            <div>
                                <Form.Check
                                    style={{ display: "none" }}
                                    type="checkbox"
                                    className="participate-checkbox"
                                    label="不限"
                                    id="dateCheckbox"
                                    name="dateCheckbox"
                                    value="不限"
                                    checked={time === "" || time === "1970" || time === "0" || time === null || time == 1970}
                                    disabled
                                />
                            </div>
                            <fieldset className="col-md-5  col-lg-12" style={{ margin: '1.2vw 0' }}>

                                <legend className="col-12 form-label col-form-label col">
                                    類別
                                </legend>
                                <Form.Group as={Row} onChange={() => {
                                    getIdentityCheck()
                                    searchOnchange()

                                }}>
                                    <div>
                                        {typeTag.map((data, index) =>
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                label={data.name}
                                                className={"checkboxlabel form-check-label-blog typeCheckbox" + index}
                                                id={"typeCheckbox" + index}
                                                name="typeCheckbox"
                                                value={data.id}
                                                defaultChecked={paramsSearch.get('type') && paramsSearch.get('type').includes(index + 1)}
                                            />
                                        )}
                                    </div>
                                </Form.Group>
                            </fieldset>

                            <Button className="searchButton col-12" variant="primary" type="submit" onClick={e => submit(e)} >
                                <i className="fas fa-search" aria-hidden="true" alt="查詢圖示"></i>
                                &nbsp;查詢
                            </Button>

                        </Form>
                    </div>
                    <div className="col-sm-12 col-md-10 col-lg-9 ">
                        <div className="">
                            <div className="result-outter-wrapper">
                                <div className="search-result-wrapper">
                                    <div className="office-sorted-wrapper">
                                        <p className="result-title">查詢結果 :</p>
                                        <p className="search-result-value">此頁{totalCount > count ? count : totalCount}筆</p>
                                        <p className="search-result-value">共有{totalCount}筆</p>
                                        <p className="search-result-value">第{page}/{pageCount}頁 </p>
                                    </div>

                                    <div className="search-result">
                                        <p className="result-title">選擇排序</p>
                                        <select as="select" className="sortDrop" value={paramsSearch.get('sort') || "10"} onChange={(e) => sortOnchange(e)} aria-label="選擇排序">
                                            {sortTypeDrop.map((sortType, index) =>
                                                <option key={index} value={sortType.typeId}>{sortType.typeName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="article-update-time"><h6 className="result-title">最後更新日期:</h6><h6 className="search-result-value">{formatDate(lastEditTime)}</h6></div> */}
                            </div>

                            <div className="inner-content">
                                {loading ? <Loader loading={loading} /> :
                                    <div className="article-outter-wrapper">
                                        {fetchData.length === 0 ?
                                            <p>沒有相關結果喔~</p>
                                            :
                                            fetchData
                                                .map((data, index) =>
                                                    <Link as={Link} key={index} to={`/daily/blog/info?${data.guid}`} title="前往連結">&emsp;&emsp;
                                                        <div className="card mb-3" style={{ 'border': '1px solid rgba(0,0,0,.125) !important', height: "25vh", objectFit: "cover", overflow: "hidden" }}>
                                                            <div className="row no-gutters" >
                                                                <div className="col-md-4" >
                                                                    <img className="img-fluid"
                                                                        alt={data.title}
                                                                        src={data.picHref !== "" ? data.picHref : "../../images/blankLeef.png"} />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="card-body">
                                                                        <p>{formatDateDot(data.createTime)}</p>
                                                                        <div className='title-content-wrapper horizontal-card-component'>
                                                                            <h2 className="office-title" id="daily-title" style={{ color: '#009933', fontSize: 'calc(12px + .8vw) !important', fontWeight: '600' }}>{data.title}</h2>
                                                                            <div className="office-article-content">{new Date(data?.createTime) > joditDate ?
                                                                                <JoditEditor
                                                                                    ref={editor}
                                                                                    value={data.content}
                                                                                    config={config}
                                                                                />
                                                                                :
                                                                                data.content.split('<br>').slice(0, 2).map((items, index) =>
                                                                                    <h6 key={index}>&emsp;&emsp;{items}</h6>
                                                                                )}</div>
                                                                        </div>
                                                                        <div className="award-btn">
                                                                            <div className="companyAwards"
                                                                                style={getTypeBgColor(data.typeId)}>
                                                                                {data.typeName}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Link>

                                                )}
                                    </div>
                                }
                            </div>
                        </div>
                        <>
                            {!loading &&
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
                            }
                        </>
                    </div >




                </div >

            </div >

            <SideBtnOffice history={useHistory()} />
            <Footer />
        </>
    );
}

export default withRouter(DailyBlog);