import React, { useState, useEffect, useRef } from 'react';
import '../Knowledge.scss';

import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import { formatDate } from '../utils/Functions';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ReactPaginate from 'react-paginate';
import JoditEditor from "jodit-react";

import { clickRecord } from '../utils/API';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));
const Footer = React.lazy(() => import('../Components/Footer'));


function Knowledge(props) {
    let history = useHistory()

    let domain = props.domain
    //let domain = "greenlife.epa.gov.tw"

    let serialize = require('serialize-javascript');


    const [loading, setLoading] = useState(true);
    const [fetchData, setFetchData] = useState([]);

    const [selected, setSelected] = useState("type");

    const [state, setState] = useState({
        year: "",
        month: "",
        sortType: "10"
    })


    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = "10";
    const [themeId, setThemeId] = useState("");
    const [typeId, setTypeId] = useState("0");
    const [sortDisplay, setSortDisplay] = useState("全部");
    const [keyWord, setKeyWord] = useState("");

    const collector = sessionStorage.getItem("userGuid") || "";

    useEffect(() => {
        // 自動產生的 Textarea 標籤 加上 title
        const textareaList = document.querySelectorAll('textarea');
        for (const element of textareaList) {
            element.setAttribute("title", "textarea");
        }

        // 編輯器產生的圖片加上alt
        const joditEditor = document.querySelectorAll(".jodit-wysiwyg")
        if (joditEditor !== null) {
            for (const element of joditEditor) {
                const joditP = element.querySelectorAll("p")
                const joditTable = element.querySelectorAll("table")
                if (joditP !== null) {
                    for (const element of joditP) {
                        const img = element.querySelectorAll("img")
                        if (img !== null)
                            for (let i = 0; i < img.length; i++) {
                                img[i].setAttribute("alt", `joditEditor-img-${i}`)
                            }
                    }
                }
                if (joditTable !== null) {
                    for (const element of joditTable) {
                        element.remove();
                    }
                }
            }
        }
    })

    // 文章hashtag上色
    useEffect(() => {
        const hashtag = document.querySelectorAll("#hashtag-value");
        if (hashtag !== null) {
            for (const element of hashtag) {
                const hashValue = element.getAttribute("value").split("#")[1];

                switch (hashValue) {
                    case "綠色辦公": element.style.background = "#8ACCBD";
                        break;
                    case "綠色消費": element.style.background = "#F3A894";
                        break;
                    case "綠色旅遊": element.style.background = "#ABDCE6";
                        break;
                    case "綠色居家": element.style.background = "#F5E185";
                        break;
                    case "綠色飲食": element.style.background = "#F5A626";
                        break;
                    default: element.style.background = "#FFF";
                }

            }
        }

    })

    //點閱計數API
    useEffect(() => {
        sessionStorage.removeItem("test");
        clickRecord("0860B707-82C8-48D2-BA27-6BB6BBF81E6C", "14", collector)
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

    //主題分類觸發事件
    const themeOnChange = (event) => {
        setThemeId(event.target.value)
        setTypeId(0)
        setSelected("theme")
        setPage(1)
        let name = event.target.getAttribute('name');
        if (name === "theme") {
            const name = theme.filter(data => event.target.value === String(data.key))
            setSortDisplay(name[0].value)
        } else {
            setSortDisplay(name)
        }
    }

    //知識分類觸發事件
    const typeOnChange = (value, name) => {
        setTypeId(value)
        setThemeId("")
        setSelected("type")
        setPage(1)
        if (name === "" || name === undefined) {
            const name = category.filter(data => value === String(data.typeId))
            setSortDisplay(name[0].typeName)
        } else {
            setSortDisplay(name)
        }
    }

    //篩選觸發事件
    const handleChange = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }


    useEffect(() => {

        const params = new URLSearchParams(history.location.search);
        if (params.get('type') !== null) {
            setTypeId(params.get('type'))
        }
        if (params.get('page') !== null) {
            setPage(Number(params.get('page')))
        }

        const paramTheme = params.get('theme')

        if (params.get('n') !== null) {
            setSortDisplay(params.get('n'))
        }

        if (paramTheme) {
            setThemeId(paramTheme)
            setSelected("theme")
        }

    }, [])

    //篩選-複合查詢
    const FilterUri = `${props.SSL}//${domain}/api/api/Knowledge/Filter`;

    const submitSorted = async (e) => {
        // window.scrollTo({ top: 1000, behavior: 'smooth' })
        setPage(1)

        e.preventDefault()

        setLoading(true)
        fetch(FilterUri, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: count,
                Year: state.year,
                Month: state.month,
                SortType: state.sortType,
                TypeId: String(typeId),
                ThemeId: String(themeId),
                Title: keyWord,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    console.log(result.resultObject)
                    setLoading(false)
                    setFetchData(result.resultObject.knowledges.filter(d => d.typeName != "文宣"))
                    setPageCount(result.resultObject.pageCount)
                    history.push(`/knowledge?page=${page}&type=${typeId}&theme=${themeId}&n=${keyWord}`)
                }
            })
    }

    //焦點知識(置頂)
    const [topArticle, setTopArticle] = useState([]);
    useEffect(() => {

        fetch(`${props.SSL}//${domain}/api/api/Knowledge/Top`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setTopArticle(result.resultObject)
            });
    }, [props.SSL, props.domain])


    //知識分類、主題分類、keyWord 合併查詢
    useEffect(() => {
        setLoading(true)
        if (typeId || typeId == 0) {
            history.push(`/knowledge?page=${page}&type=${typeId}&theme=${themeId}&n=${sortDisplay}`)
            fetch(FilterUri, {
                method: 'POST',
                body: serialize({
                    Page: String(page),
                    Count: count,
                    Year: state.year,
                    Month: state.month,
                    SortType: state.sortType,
                    TypeId: String(typeId),
                    ThemeId: String(themeId)
                }),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    if (result.isSucess) {
                        // console.log(result.resultObject)
                        setLoading(false)
                        setFetchData(result.resultObject.knowledges.filter(d => d.typeName != "文宣"))
                        setPageCount(result.resultObject.pageCount)


                    }
                });
        }

    }, [typeId, themeId, page, props.SSL, props.domain]);

    //知識分類列表API
    const [category, setCategory] = useState([]);
    useEffect(() => {

        fetch(`${props.SSL}//${domain}/api/api/Knowledge/Type/Count`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setCategory(result.resultObject.filter(d => d.typeName != "文宣"))
            });
    }, [props.SSL, props.domain])

    //主題分類列表API
    const [theme, setTheme] = useState([]);
    useEffect(() => {

        fetch(`${props.SSL}//${domain}/api/api/Knowledge/Theme`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setTheme(result.resultObject)

            });
    }, [props.SSL, domain])


    //排序下拉API
    const [sortDrop, setSortDrop] = useState([]);
    useEffect(() => {

        fetch(`${props.SSL}//${domain}/api/api/Knowledge/Sort`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setSortDrop(result.resultObject)
                }
            });
    }, [props.SSL, domain])


    //年份下拉API
    const [yearDrop, setYearDrop] = useState([]);
    useEffect(() => {

        fetch(`${props.SSL}//${domain}/api/api/Knowledge/Year`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                if (result.isSucess) {
                    setYearDrop(result.resultObject)
                }
            });
    }, [props.SSL, domain])


    let displayImg;
    if (selected === "type") {
        displayImg = <img src={`images/knowledge/knowledge${typeId}.png`} alt="category-icon" />
    } else if (selected === "theme") {
        displayImg = <img src={`images/knowledge/theme${themeId}.png`} alt="category-icon" />
    } else {
        displayImg = ""
    }


    const handlePageClick = (data) => {

        setPage(data.selected + 1);
        history.push(`/knowledge?page=${data.selected + 1}&type=${typeId}&theme=${themeId}&n=${sortDisplay}`)
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>全民綠生活資訊平台-知識綠</title>
                    <meta name="description" content="綠色旅遊輕鬆玩 行程規畫免煩腦!" />
                </Helmet>
                <BreadCrumb />
                <div className="knowledge container-fluid">
                    <div className="left-card row">
                        <h1 className="kn-top-title col-lg-9"><i className="fas fa-play" aria-hidden="true" alt="焦點知識圖示"></i>&nbsp;焦點知識</h1>
                        {topArticle.length !== 0 &&
                            <div className="col-sm-10 col-md-6 col-lg-5">
                                {topArticle.slice(0, 1).map((data, index) =>
                                    <Card key={index} className="border-color big-card">
                                        <div className="d-flex row content-wrapper">
                                            <div className="col-12 kn-img-wrapper-big kn-img-wrapper">
                                                <Link key={index} className="card-focus" title={data.title + "(開啟連結)"} as={Link} to={`/knowledge/info?${data.guid}`}>
                                                    <img src={data.picPath} alt={data.title} />
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex justify-content-start category-ul-kn">
                                                    <li style={{ background: data.color }}>{data.typeName}</li><span className='align-self-center'>{formatDate(data.startDatetime)}</span>
                                                </div>
                                                <span className="mb-3 kn-content">
                                                    <p className="kn-focus-title">{data.title}</p>
                                                </span>
                                                <div className="d-flex">
                                                    <span className="d-flex hashtag" >
                                                        {data.themes.map((data, index) =>
                                                            <span key={index} id="hashtag-value" value={data.themeName}>{data.themeName}</span>
                                                        )}
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        }
                        {topArticle.length !== 0 &&
                            <div className="row col-sm-10 col-md-6 col-lg-4">
                                {topArticle.slice(1, 4).map((data, index) =>
                                    <Card className="border-color top-side">
                                        <div className="d-flex row content-wrapper">
                                            <div className="col-sm-6 col-md-5 col-lg-5 kn-img-wrapper">
                                                <Link key={index} className="card-focus" title={data.title + "(開啟連結)"} as={Link} to={`/knowledge/info?${data.guid}`}>
                                                    <img src={!data.picPath ? "../../images/blankLeef.png" : `${data.picPath}`} alt={data.title} />
                                                </Link>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex justify-content-start category-ul-kn">
                                                    <li style={{ background: data.color }}>{data.typeName}</li><span className='align-self-center'>{formatDate(data.startDatetime)}</span>
                                                </div>
                                                <span className="mb-3 kn-content">
                                                    <p className="kn-title">{data.title}</p>
                                                    {/* <h6 className="fetch-content">{data.content}</h6>*/}
                                                </span>
                                                {data.isUseEditTool === true ?
                                                    <JoditEditor
                                                        ref={editor}
                                                        value={data.content.replace(/<img[^>]*>/g, "")}
                                                        config={config}
                                                    />
                                                    :
                                                    <h6>{data.content}</h6>
                                                }
                                                {/* <div className="d-flex ">
                                            <span className="d-flex">
                                                {data.themes.map((data, index) =>
                                                    <h6 key={index}>{data.themeName}</h6>
                                                )}
                                            </span>
                                        </div> */}
                                            </div>
                                        </div>
                                    </Card>
                                )}


                            </div>
                        }
                    </div>


                    <div className="row justify-content-center ">
                        <div className="kn-side-search col-sm-10 col-md-10 col-lg-3 mt-2 mb-1">
                            <div className="col-12 kn-top-search">
                                <Form onSubmit={() => {
                                    return false;
                                }} className="form-text col-md-4 col-lg-10 mt-2">
                                    {/* <Form.Label style={{ color: "rgb(33, 140, 182)" }}>關鍵字查詢</Form.Label> */}
                                    <Form.Control onKeyPress={e => {
                                        if (e.which === 13) {
                                            submitSorted(e)
                                        }
                                    }} className="search-input" placeholder="知識搜尋" title="知識搜尋" onChange={e => setKeyWord(e.target.value === "" ? " " : e.target.value)} tabIndex={0} />
                                    <div className="searchBtn-kn" onClick={e => submitSorted(e)} onKeyPress={e => { if (e.which === 13) { submitSorted(e) } }}><i className="fas fa-search" aria-hidden="true" alt="知識搜尋圖示" tabIndex={0}></i></div>
                                </Form>
                                <div className="kn-top-search-child col-12">
                                    <div className="sideCategory col-md-5 col-lg-12">
                                        <div className="cate-wrapper">
                                            <h2>知識分類</h2>
                                            <div>
                                                {category.map((category) =>
                                                    <div key={category.typeId}><li onClick={() => typeOnChange(category.typeId, category.typeName)} name={category.typeName} value={category.typeId} onKeyPress={() => typeOnChange(category.typeId, category.typeName)} tabIndex={0}><div className="inner-li">{<img src={`images/knowledge/knowledge${category.typeId}.png`} alt="category-icon" />}{category.typeName}<div className="count">{category.count}</div></div></li></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sideCategory col-md-5 col-lg-12">
                                        <div className="cate-wrapper">
                                            <h2>主題分類</h2>
                                            <ul>
                                                {theme.map((theme) =>
                                                    <div key={theme.key}><li onClick={themeOnChange} onKeyPress={themeOnChange} name={theme.value} value={theme.key} className="inner-li" tabIndex={0}><img src={`images/knowledge/theme${theme.key}.png`} alt="主題搜尋icon" title="主題搜尋icon" />{theme.value}</li></div>
                                                )}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10 col-md-10 col-lg-8">


                            <div className="searchTB">
                                <div className="sort-text">
                                    <h2><div className="sorted-display">{displayImg}{sortDisplay}</div></h2>
                                    <div className="d-flex sort-bottom justify-content-center">
                                        <div className="sort-left">
                                            <select className="drop-kn sort-drop" name="type" title="type" onChange={(e) => typeOnChange(e.target.value, "")}>
                                                <option name="" value="0">知識分類</option>
                                                {category.map((category) =>
                                                    <option key={category.typeId} name={category.typeName} value={category.typeId}>{category.typeName}</option>
                                                )}
                                            </select>
                                            <select className="drop-kn sort-drop" name="theme" title="theme" onChange={themeOnChange}>
                                                <option name="" value="1">主題分類</option>
                                                {theme.map((theme) =>
                                                    <option key={theme.key} name={theme.value} value={theme.key} >{theme.value}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div>
                                            <div>
                                                <select className="drop-kn sort-drop" name="sortType" title="sortType" onChange={handleChange}>
                                                    {sortDrop.map((sortDrop, index) =>
                                                        <option key={index} value={sortDrop.typeId}>{sortDrop.typeName}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="date-sort d-flex">
                                                <div className="d-flex">
                                                    <select className="drop-kn" name="year" title="year" onChange={handleChange}>
                                                        <option name="year" value="">年份</option>
                                                        {yearDrop.map((yearDrop, index) =>
                                                            <option key={index} value={yearDrop}>{yearDrop}</option>
                                                        )}
                                                    </select>

                                                    <select className="drop-kn" name="month" title="month" onChange={handleChange}>
                                                        <option value="0">月份</option>
                                                        <option value="1">1月</option>
                                                        <option value="2">2月</option>
                                                        <option value="3">3月</option>
                                                        <option value="4">4月</option>
                                                        <option value="5">5月</option>
                                                        <option value="6">6月</option>
                                                        <option value="7">7月</option>
                                                        <option value="8">8月</option>
                                                        <option value="9">9月</option>
                                                        <option value="10">10月</option>
                                                        <option value="11">11月</option>
                                                        <option value="12">12月</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sort-btn" onClick={submitSorted} onKeyPress={submitSorted} tabIndex={0}>篩選</div>
                                    </div>

                                </div>
                                <div className="inner-content">
                                    <Loader loading={loading} />
                                    {fetchData.length === 0 ?
                                        <p>沒有相關結果喔~</p>
                                        :
                                        fetchData.map((fetchData, index) =>
                                            <Card className="border-color bottom-card">
                                                {/* <a key={index} href={fetchData.href} target="_blank"> */}
                                                <div className="d-flex row content-wrapper">
                                                    <div className="col-sm-5 col-md-4 col-lg-3 kn-img-wrapper">
                                                        <Link key={index} className="card-focus" as={Link} title={fetchData.title + "(開啟連結)"} to={`/knowledge/info?${fetchData.guid}`} >
                                                            <img src={!fetchData.picPath ? "../../images/blankLeef.png" : `${fetchData.picPath}`} alt={fetchData.title} />
                                                        </Link>
                                                    </div>
                                                    <div className="col-sm-7 col-md-8 col-lg-9">
                                                        <div className="d-flex justify-content-start category-ul-kn">
                                                            <li style={{ background: fetchData.color }}>{fetchData.typeName}</li><span className='align-self-center'>{formatDate(fetchData.startDatetime)}</span>
                                                        </div>
                                                        <span className="mb-3 kn-content">
                                                            <p className="kn-title">{fetchData.title}</p>
                                                            {/* <h6>{fetchData.content}</h6> */}
                                                            {fetchData.isUseEditTool === true ?
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    value={fetchData.content}
                                                                    config={config}
                                                                />
                                                                :
                                                                <p className="minHeight-content">{fetchData.content?.split('<br>').map((items, index) =>
                                                                    <span key={index}>&emsp;&emsp;{items}</span>
                                                                )}</p>
                                                            }
                                                        </span>
                                                        <div className="d-flex">
                                                            <span className="d-flex hashtag">
                                                                {fetchData.themes.map((data, index) =>
                                                                    <span key={index} id="hashtag-value" value={data.themeName}>{data.themeName}</span>
                                                                )}

                                                            </span>
                                                            {/* <button>看更多</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* </a> */}
                                            </Card>
                                        )
                                    }
                                </div>
                            </div>
                            <>
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
                                {/* <ul
                                style={{ visibility: loading ? 'hidden' : 'visible' }}
                                className="page-lists"
                            >
                                <Pagination.Prev
                                    className="list-btn"
                                    onClick={() => {
                                        setPage(page - 1)
                                        //history.push(`/categories/greenTour?page=${page - 1}&type=${tourType}&region=${tourRegion}&d=${tourDay}&search=${tourKeyword}`)
                                        // searched ? setSearchedPage(searchedPage - 1) : setPage(page - 1)
                                    }}
                                    disabled={(page === 1) ?
                                        true : false}
                                />
                                {lists}
                                <Pagination.Next
                                    onClick={() => {
                                        setPage(page + 1)
                                        //history.push(`/categories/greenTour?page=${page + 1}&type=${tourType}&region=${tourRegion}&d=${tourDay}&search=${tourKeyword}`)
                                        // searched ? setSearchedPage(searchedPage + 1) : setPage(page + 1)
                                    }}
                                    disabled={(page === pageCount) ?
                                        true : false}
                                />
                            </ul> */}
                            </>
                        </div>
                    </div>

                    <SideBtn history={history} />

                </div>
                <Footer />
            </HelmetProvider>
        </>
    );
}

export default withRouter(Knowledge);