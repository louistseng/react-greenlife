import React, { useState, useEffect } from 'react';
import tourBanner from '../../images1/greenTour/gt_bg.jpg';
import { Link, withRouter, useHistory } from 'react-router-dom';
import "../../Member/Info.scss";
import { formatDateTime } from "../../utils/Functions"
import { useCookies } from "react-cookie";
import { clickRecord } from '../../utils/API';
import bookIcon from "../../images1/greenMan/book.png";
import blankLeef from "../../images1/blankLeef.png";
import ReactPaginate from 'react-paginate';




function TourList() {

    const SSL = window.location.hostname === "localhost" ? "https:" : window.location.protocol;
    const hostname = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic";

    let greenliving = window.location.host.includes("eri") || window.location.host.includes("localhost") ? "https://greenliving.eri.com.tw/GreenLife/GreenTravel/GreenPlatformTravel.aspx" : "https://greenliving.epa.gov.tw/GreenLife/GreenTravel/GreenPlatformTravel.aspx";

    var serialize = require('serialize-javascript');
    let history = useHistory()


    const Footer = React.lazy(() => import('../../Components/Footer'));

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
    const [pageCount, setPageCount] = useState("")
    const [status, setStatus] = useState("");
    const [keyWord, setKeyWord] = useState("")


    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //點閱計數API
    useEffect(() => {
        clickRecord("45162DCA-1BC4-45D1-986A-A2FD4539F34B", "19", collector)
    }, [collector]);

    //團體行程申請列表
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("k", keyWord);
        urlencoded.append("s", status);
        // urlencoded.append("u", collector);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(`${SSL}//${hostname}/APIs/TravelGroupApplyList?u=${collector}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.Result === "Success") {
                    setFetchData(result.Detail)
                    setPageCount(result.PageIndex)
                }
            })
            .catch(error => console.log('error', error));

        window.scrollTo(0, 0)
    }, [page])

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
        history.push(`/member/tourList?page=${data.selected + 1}`)
    };



    return (
        <>
            <div className="col-sm-12 col-md-8 col-lg-9">
                <div className="d-flex"><img className="title-icon" src={bookIcon} alt="icon" /><h3 className="bookMark-title">列表</h3></div>
                {fetchData.length > 0 ?
                    fetchData.map((fetchData, index) =>
                        <div key={index} className="book-mark-share-content">
                            <a className="link-wrapper" target="_blank" href={`${greenliving}?m=View&p=${fetchData.ProjNo}`}>
                                <div className="d-flex justify-content-start">
                                    <img src={String(fetchData.TourUrl).replaceAll("\\\\", "\\")} alt={fetchData.ProjName} title={fetchData.ProjName} />

                                    <div className="content-text">
                                        <h6>{formatDateTime(fetchData.CreateDate)}</h6>
                                        <h4>{fetchData.ProjName}</h4>
                                        <h6 style={{ border: "1px solid #aaa", display: "inline-block", padding: "5px" }}>{fetchData.States}</h6>

                                    </div>
                                </div>
                            </a>
                            <div className="right-side-btn">
                                {fetchData.States === "未送出" ?
                                    <a
                                        className="btn-wrapper" target="_blank"
                                        href={`${greenliving}?m=Update&p=${fetchData.ProjNo}`} >
                                        <i className="fas fa-edit" aria-hidden="true"></i>
                                        <h6>編輯</h6>
                                    </a>
                                    :
                                    <a
                                        className="btn-wrapper" target="_blank"
                                        href={`${greenliving}?m=View&p=${fetchData.ProjNo}`} >
                                        <i class="far fa-eye" aria-hidden="true"></i>
                                        <h6>檢視</h6>
                                    </a>
                                }
                            </div>
                        </div>
                    )
                    :
                    <div className="note-wrapper">
                        <h5>你目前沒有申請任何團體旅遊行程喔!</h5>
                    </div>
                }
                {page > 1 &&
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
                }
            </div>
        </>
    );
}

export default withRouter(TourList);