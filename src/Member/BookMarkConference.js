import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "./Info.scss";
import { formatDateTime, formatDate } from "../utils/Functions"
import { useCookies } from "react-cookie";
import { clickRecord } from '../utils/API';
import bookIcon from "../images1/greenMan/book.png";
import ReactPaginate from 'react-paginate';


function BookMarkConference(props) {
    var serialize = require('serialize-javascript');
    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    const params = new URLSearchParams(history.location.search);
    const [typeId, setTypeId] = useState(params.get('type'));
    const typeName = params.get('name');
    const typeHref = params.get('link');
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [page, setPage] = useState("1");
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
        clickRecord("45162DCA-1BC4-45D1-986A-A2FD4539F34B", "19", collector)
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
                // console.log(result)
                const knowledgeBookMark = [
                    { typeId: 5, typeName: '知識綠上傳', count: pageCount, typeHref: null },
                    { typeId: 6, typeName: '社會溝通會議', count: pageCount, typeHref: null }
                ]
                setBookMark(result.resultObject.concat(knowledgeBookMark).filter(d => d.typeId !== 4))
            });
    }, [pageCount])

    useEffect(() => {
        window.scrollTo(0, 0)

        fetch(`${SSL}//${domain}/api/api/Meeting/MyList`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: count
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    setFetchData(result.resultObject.meetings)
                    setPageCount(result.resultObject.pageCount)
                    console.log(result.resultObject)
                } else {

                }
            });
    }, [page])


    //活動列表-刪除文章
    // function deleteArticle(deleteGuid) {

    //     const comfirm = window.confirm("確定要刪除嗎?");
    //     if (comfirm) {
    //         fetch(`${SSL}//${domain}/api/api/Meeting/Delete?${deleteGuid}`, {
    //             method: 'POST',
    //             headers: myHeaders
    //         })
    //             .then(res => {
    //                 return res.json();
    //             }).then(result => {
    //                 if (result.isSucess) {
    //                     console.log(result)
    //                     clickRecord("617D5746-4DBE-4F25-BA27-6471BD9DCF79", "5", collector)
    //                     history.go(0)
    //                 }
    //             });
    //     }
    // }

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/member/bookMarkConference?page=${data.selected + 1}name=社會溝通會議&link=/member/conferenceEventUpload&type=6`)

    };



    return (
        <>

            {/* <BreadCrumb currentPage={"功能清單"} />

            <div className="container member-info-wrapper row">
            <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-sm-12 col-md-8 col-lg-9">
                <div className="d-flex"><img className="title-icon" src={bookIcon} alt="icon" /><h3 className="bookMark-title">分享</h3></div>
                <div className="bookmark-wrapper-bookMark">
                    {bookMark.slice(0, 5).map((data, index) =>
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
                                        data.typeId === 3 ?
                                            history.push(`/member/BookMarkBlog?name=${data.typeName}&link=/member/shareBlog&type=${data.typeId}`)
                                            :
                                            history.push(`/member/BookMarkKnowledge?name=${data.typeName}&link=/member/shareBlog&type=${data.typeId - 1}`)
                            }}
                            className={typeId === String(data.typeId) ? "bookmark focus" : "bookmark"}>
                            <h5>{data.typeName}</h5>
                            <h5>({data.count})</h5>
                        </div>
                    )}
                </div>
                <div className="d-flex share-green-wapper">
                    {typeId === "6" &&
                        <Link to="/member/shareConference"><button className="share-green-btn mt-2">發佈社會溝通會議</button></Link>
                    }
                </div>
                {fetchData ?
                    fetchData.map((fetchData, index) =>
                        <div key={index} className="book-mark-share-content">
                            <Link className="link-wrapper" to={`/member/conferencePage?${fetchData.guid}`}>
                                <div className="d-flex justify-content-start">
                                    <img src={String(fetchData.fileUrl).replaceAll("\\\\", "\\")} alt={fetchData.fileName} />

                                    <div className="content-text">
                                        <h6>{formatDate(fetchData.meetingStart)}</h6>
                                        <h4>{fetchData.meetingName}</h4>
                                    </div>
                                </div>
                            </Link>
                            <div className="right-side-btn">
                                {/* <div className="btn-wrapper" onClick={() => deleteArticle(fetchData.guid)}>
                                    <i className="fas fa-trash-alt" aria-hidden="true"></i>
                                    <h6>刪除</h6>
                                </div> */}
                                <Link
                                    className="btn-wrapper"
                                    to={`/member/shareConference?edit=${fetchData.guid}`} >
                                    <i className="fas fa-edit" aria-hidden="true"></i>
                                    <h6>編輯</h6>
                                </Link>
                            </div>
                        </div>
                    )
                    :
                    <div className="note-wrapper">
                        <h5>你目前尚未發布任何會議活動喔!</h5>
                        {/* <h5 className="d-flex justify-content-center">到<Link to={typeHref}><h5 style={{ color: "#13a513" }}>{typeName}</h5></Link>展現綠生活吧!</h5> */}
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

export default withRouter(BookMarkConference);