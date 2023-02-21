import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "./Info.scss";
import { formatDateTime } from "../utils/Functions"
import { useCookies } from "react-cookie";
import { clickRecord } from '../utils/API';
import bookIcon from "../images1/greenMan/book.png";
import ReactPaginate from 'react-paginate';


function BookMarkOffice(props) {
    var serialize = require('serialize-javascript');
    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    const params = new URLSearchParams(history.location.search);
    const [typeId, setTypeId] = useState(params.get('type'));
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
        clickRecord("EB037B93-8676-4B72-93EC-D7929FD2B148", "18", collector)
    }, [collector]);


    //網誌列表-只能查到自己的
    useEffect(() => {
        window.scrollTo(0, 0)
        const urlBlog = `${SSL}//${domain}/api/api/GOffice/Article/MyList`

        fetch(urlBlog, {
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
                    setFetchData(result.resultObject.data)
                    setPageCount(result.resultObject.pageCount)
                } else {

                }
            });
    }, [page])


    //經驗分享-刪除文章
    function deleteArticle(deleteGuid) {

        const comfirm = window.confirm("確定要刪除嗎?");
        if (comfirm) {
            fetch(`${SSL}//${domain}/api/api/GOffice/Article/Delete`, {
                method: 'POST',
                body: serialize({
                    Guid: deleteGuid
                }),
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    clickRecord("4E2ECCD8-7672-4A41-8AD9-B37BACDC3B0D", "10", collector)
                    history.go(0)
                });
        }
    }

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/member/BookMarkBlog?page=${data.selected + 1}&name=綠生活網誌&link=/member/shareBlog&type=9`)
    };



    return (
        <>

            {/* <BreadCrumb currentPage={"功能清單"} />

            <div className="container member-info-wrapper row">
            <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType}/> */}

            <div className="col-sm-12 col-md-8 col-lg-9">
                <div className="d-flex"><img className="title-icon" src={bookIcon} alt="icon" /><h3 className="bookMark-title">分享</h3></div>

                <div className="d-flex share-green-wapper">
                    <Link to="/member/green_office_upload"><button className="share-green-btn mt-2">發佈經驗分享文章</button></Link>
                </div>
                {fetchData ?
                    fetchData.map((fetchData, index) =>
                        <div key={index} className="book-mark-share-content">
                            <Link className="link-wrapper" to={`/member/officePage?${fetchData.guid}`}>
                                <div className="d-flex justify-content-start">
                                    <img src={String(fetchData.picHref).replaceAll("\\\\", "\\")} alt={fetchData.title} title="網誌圖片" />

                                    <div className="content-text">
                                        <h6>{formatDateTime(fetchData.createTime)}</h6>
                                        <h4>{fetchData.title}</h4>
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
                                    to={`/member/edit_office?${fetchData.guid}`} >
                                    <i className="fas fa-edit" aria-hidden="true"></i>
                                    <h6>編輯</h6>
                                </Link>
                            </div>
                        </div>
                    )
                    :
                    <div className="note-wrapper">
                        <h5>你目前沒有任何綠色辦公分享文章喔!</h5>
                        <h5 className="d-flex justify-content-center">到<Link to="/member/shareGreen"><h5 style={{ color: "#13a513" }}>發布綠色辦公文章</h5></Link>展現綠生活吧!</h5>
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

export default withRouter(BookMarkOffice);