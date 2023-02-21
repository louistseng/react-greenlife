import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "./Info.scss";
import { Card } from 'react-bootstrap';
import { formatDate } from "../utils/Functions"
import ReactPaginate from 'react-paginate';
import heartIcon from "../images1/greenMan/heart.png";

import { clickRecord, fetchGreenliving } from '../utils/API';
import { useCookies } from "react-cookie";

const TourItem = React.lazy(() => import('../Components/Greenliving/TourItem'));
const RestaItem = React.lazy(() => import('../Components/Greenliving/RestaItem'));
const AccomItem = React.lazy(() => import('../Components/Greenliving/AccomItem'));

function BookMark(props) {
    var serialize = require('serialize-javascript');

    let history = useHistory()

    const params = new URLSearchParams(history.location.search);
    const [typeId, setTypeId] = useState(params.get('type'));
    const [typeName, setTypeName] = useState(params.get('name'));
    const [typeHref, setTypeHref] = useState(params.get('link'));

    const [greenlifeCookies] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = "10";

    const [fetchData, setFetchData] = useState([]);
    const [bookMark, setBookMark] = useState([]);

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("EB037B93-8676-4B72-93EC-D7929FD2B148", "18", collector)
    }, [collector]);

    //fetch收藏頁籤
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${props.SSL}//${props.domain}/api/api/Member/Collect/PageTag`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setBookMark(result.resultObject)
            });
    }, [props.SSL, props.domain, collector])

    //fetch收藏列表
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${props.SSL}//${props.domain}/api/api/Member/Collect`, {
            method: 'POST',
            body: serialize({
                TypeId: String(typeId),
                Page: String(page),
                Count: count
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                let greenlivingType = ["4", "5", "6", "7"]

                if (result.isSucess) {
                    if (greenlivingType.includes(typeId)) {
                        fetchGreenliving(typeId, (result.resultObject.data.flat()), setFetchData)
                    } else {
                        setFetchData(result.resultObject.data)
                    }
                    setPageCount(result.resultObject.pageCount)
                }

            });
    }, [typeId, props.SSL, props.domain])



    //取消收藏
    function cancelCollect(guid, e) {
        e.preventDefault();
        fetch(`${props.SSL}//${props.domain}/api/api/Common/Collect/Cancel`, {
            method: 'POST',
            body: JSON.stringify({
                Collector: collector,
                Guid: String(guid),
                TypeId: String(typeId)
            }),
            headers: myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.httpCode === 200) {
                    history.go(0)
                }
            });
    }

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };



    return (
        <>

            {/* <BreadCrumb currentPage={"功能清單"} />

            <div className="container member-info-wrapper row">
            <InfoSideMenu history={history} key={memberToken} collector={collector} memberToken={memberToken} identityType={identityType} /> */}

            <div className="col-sm-12 col-md-9 col-lg-9">
                <div className="d-flex"><img className="title-icon" src={heartIcon} alt="收藏" title="收藏" role="button" /><h3 className="bookMark-title">收藏</h3></div>
                <div className="bookmark-wrapper" id="sroll-style">
                    {/* 先隱藏綠色商店(顯示前5個), 要顯示商店再把.slice(0,5)拿掉就好惹  */}
                    {bookMark.slice(0, 5).map((data, index) =>
                        <div
                            key={index}
                            onClick={() => {
                                setTypeName(data.typeName)
                                setTypeHref(decodeURIComponent(data.typeHref))
                                setTypeId(String(data.typeId));
                                history.push(`/member/BookMark?type=${data.typeId}&name=${data.typeName}&link=${data.typeHref}`)
                            }}
                            className={typeId === String(data.typeId) ? "bookmark focus" : "bookmark"}>
                            {/* 收藏頁籤要請後端把綠色旅宿改成環保旅宿, 目前先.replace這樣急救 */}
                            <h5>{data.typeName.replace("綠色旅宿", '環保旅宿')}</h5>
                            <h5>({data.count})</h5>
                        </div>

                    )}

                </div>

                {(fetchData.length > 0) ?
                    fetchData.map((fetchData, index) =>
                        (typeId === "1" || typeId === "2") ?
                            <Link to={fetchData.href} key={index} className="row book-mark-content">
                                <img className="col-sm-5 col-md-4 col-lg-3" src={fetchData.picPath} alt="picPath" />
                                <div className="row col-sm-7 col-md-8 col-lg-9 content-text d-flex">
                                    <div className="col-10">
                                        <h3 className="dark-grey collect-title">{fetchData.title}</h3>
                                        <h6>發表日期:{formatDate(fetchData.startDatetime)}</h6>
                                    </div>
                                    <div onClick={(e) => cancelCollect(fetchData.guid, e)} className="col-2 heart-wrapper">
                                        <span id="a"><i class="fas fa-heart" aria-hidden="true"></i></span>
                                        <span id="b"><i class="far fa-heart" aria-hidden="true"></i></span>
                                        <h6 className="cancel-text">取消收藏</h6>
                                    </div>
                                </div>
                            </Link>
                            : typeId === "4" ? <TourItem fetchData={fetchData} index={index + "tour"} cancelCollect={cancelCollect} />
                                : typeId === "5" ? <RestaItem fetchData={fetchData} index={index + "resta"} cancelCollect={cancelCollect} />
                                    : typeId === "6" ? <AccomItem fetchData={fetchData} index={index + "accom"} cancelCollect={cancelCollect} />
                                        : ""
                    )

                    :
                    <div className="note-wrapper">
                        <h5>你目前沒有任何照片或影片喔!</h5>
                        <h5 className="d-flex justify-content-center">到<Link to={typeHref}><h5 style={{ color: "#13a513" }}>{typeName}</h5></Link>展現綠生活吧!</h5>
                    </div>
                }

                <ReactPaginate
                    forcePage={page - 1}
                    style={{ visibility: 'visible' }}
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