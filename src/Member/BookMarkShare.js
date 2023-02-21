import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "./Info.scss";
import { formatDateTime } from "../utils/Functions"
import bookIcon from "../images1/greenMan/book.png";
import ReactPaginate from 'react-paginate';

import { clickRecord } from '../utils/API';
import { useCookies } from "react-cookie";
// import logoutIcon from "../images1/login/signUp-normal.png"
import filmPng from '../images1/download/download-film.png';

function BookMark(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain


    const params = new URLSearchParams(history.location.search);
    const [typeId, setTypeId] = useState(params.get('type'));
    const [typeName] = useState(params.get('name'));
    const [typeHref] = useState(params.get('link'));

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [page, setPage] = useState(1);
    const count = "10";

    const [fetchData, setFetchData] = useState([]);
    const [bookMark, setBookMark] = useState([]);
    const [pageCount, setPageCount] = useState("")

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("E8F2C8B2-EB61-4BA8-AD26-FAF71F98FD4B", "15", collector)
    }, [collector]);

    //fetch收藏頁籤
    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/Member/Share/PageTag`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setBookMark(result.resultObject)
            });
    }, [SSL, domain])

    //fetch收藏列表
    useEffect(() => {
        window.scrollTo(0, 0)

        const urlArticle = `${SSL}//${domain}/api/api/MyGreen/MyList`
        fetch(urlArticle, {
            method: 'POST',
            body: JSON.stringify({
                Page: String(page),
                Count: count
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setFetchData(result.resultObject.greens)
                    setPageCount(result.resultObject.pageCount)
                }
            });

    }, [page, SSL, domain])

    //秀出我的綠列表-刪除文章
    function deleteArticle(deleteGuid) {

        const comfirm = window.confirm("確定要刪除嗎?");
        if (comfirm) {
            fetch(`${SSL}//${domain}/api/api/MyGreen/Delete`, {
                method: 'POST',
                body: JSON.stringify({
                    Guid: deleteGuid
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    clickRecord("91474205-5C98-443D-8C5F-1F752FCE2A95", "15", collector)
                    if (result.isSucess)
                        history.go(0)
                });
        }
    }


    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/member/BookMarkShare?page=${data.selected + 1}&name=秀出我的綠&link=/daily/article&type=2`)
    };


    return (
        <>

            <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="d-flex"><img className="title-icon" src={bookIcon} alt="分享圖示" /><h3 className="bookMark-title">分享</h3></div>
                <div className="bookmark-wrapper-bookMark">
                    {bookMark.slice(0, 3).map((data, index) =>
                        <div
                            key={index}
                            onClick={() => {
                                setTypeId(data.typeId);
                                data.typeId === 1 ?
                                    history.push(`/member/BookMarkActivity?name=${data.typeName}&link=/daily/article&type=${data.typeId}`)
                                    :
                                    data.typeId === 2 ?
                                        history.push(`/member/BookMarkShare?name=${data.typeName}&link=/daily/article&type=${data.typeId}`)
                                        :
                                        history.push(`/member/BookMarkBlog?name=${data.typeName}&link=/member/shareBlog&type=${data.typeId}`)
                            }}
                            className={typeId === String(data.typeId) ? "bookmark focus" : "bookmark"}>
                            <h5 className="bookMark-title">{data.typeName}({data.count})</h5>

                        </div>

                    )}

                </div>
                <div className="d-flex share-green-wapper">
                    <Link to="/member/shareGreen"><button className="share-green-btn mt-2">發佈照片/影片</button></Link>
                </div>
                {fetchData ?
                    fetchData.map((fetchData, index) =>
                        <div key={index} className="book-mark-share-content">
                            <Link className="link-wrapper" to={`/member/articlePage?${fetchData.guid}`}>
                                <div className="d-flex justify-content-start">
                                    <img src={fetchData.picHref || filmPng} alt={fetchData.content} title={fetchData.content} style={fetchData.picHref ? { objectFit: "cover" } : { objectFit: "contain" }} />

                                    <div className="content-text">
                                        <h6>{formatDateTime(fetchData.createDateTime)}</h6>
                                        <h4>{fetchData.content}</h4>
                                    </div>
                                </div>
                            </Link>
                            <div className="right-side-btn">
                                <div className="btn-wrapper" onClick={() => deleteArticle(fetchData.guid)}>
                                    <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                    <h6>刪除</h6>
                                </div>
                                <Link
                                    className="btn-wrapper"
                                    to={`/member/articlePage?${fetchData.guid}`} >
                                    <i className="fas fa-edit" aria-hidden="true"></i>
                                    <h6>編輯</h6>
                                </Link>
                            </div>
                            <p className="status-note">{fetchData.status}</p>
                        </div>

                    )
                    :
                    <div className="note-wrapper">
                        <h5>你目前沒有任何照片或影片喔!</h5>
                        <h5 className="d-flex justify-content-center">到<Link to={typeHref}><h5 style={{ color: "#13a513" }}>{typeName}</h5></Link>展現綠生活吧!</h5>
                    </div>
                }

                <ReactPaginate
                    forcePage={page - 1}
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
            {/* </div>
            <Footer /> */}

        </>
    );
}

export default withRouter(BookMark);