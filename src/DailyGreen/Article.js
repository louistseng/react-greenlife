import React, { useState, useEffect, useRef } from 'react';
import './Article.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import greenMan from "../images1/greenMan/greenMan.png";
import thumb from "../images1/greenMan/thumb.png";
import { formatDate, checkLogin_and_redirect } from "../utils/Functions";
import { clickRecord } from '../utils/API';
import CheckLoginAndRedirect from '../Components/CheckLoginAndRedirect';
import { useCookies } from "react-cookie";
import filmPng from '../images1/download/download-film.png';
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Loader = React.lazy(() => import('../Components/Loader'));
const Footer = React.lazy(() => import('../Components/Footer'));

export const dataContext = React.createContext();

function Article(props) {

    var serialize = require('serialize-javascript');

    const [page, setPage] = useState(1);
    const count = "8";
    const [sortype, setSortype] = useState("1");
    const [fetchData, setFetchData] = useState([]);
    const [video, setVideo] = useState("")

    const [prevY, setPrevY] = useState(0);
    const [loading, setLoading] = useState(false);
    const [maxPage, setMaxPage] = useState(3);
    const [prevSortype, setPrevSortTrpe] = useState("");
    const [gotoUrl, setGotoUrl] = useState("");

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    const loadingRef = useRef(null);

    //點閱計數API
    useEffect(() => {
        clickRecord("E8F2C8B2-EB61-4BA8-AD26-FAF71F98FD4B", "15", collector)
    }, [collector]);

    //秀出我的綠篩選下拉選單API
    const [dropData, setDropData] = useState([]);
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/MyGreen/SortType`, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setDropData(result.resultObject)
            });
    }, [props.SSL, props.domain])

    //秀出我的綠-文章列表
    useEffect(() => {
        fetch(`${props.SSL}//${props.domain}/api/api/MyGreen/ComplexSearch`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: count,
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {

                if (result.isSucess) {
                    // setFetchData(result.resultObject.greens)
                    setFetchData([...fetchData, ...result.resultObject.greens])
                }

                setMaxPage(result.resultObject.pageCount)
                if (result.resultObject.videoPath) {
                    setVideo(result.resultObject.videoPath.split('=')[1])
                }
                setLoading(false)
            });
    }, [page, props.SSL, props.domain, serialize]);


    //觀察到底部loading字-觸發fetch頁數+1
    const lazyLoadImages = (entries) => {

        const y = entries[0].boundingClientRect.y;
        // console.log(y)
        // console.log(prevY)
        if (prevY > y) {
            setLoading(true)
            // const lastUser = fetchData[fetchData.length - 1];
            // const curPage = lastUser.index;
            if (page + 1 <= maxPage) {
                setPage(page + 1);
            } else {
                setPage(maxPage)
            }
        } else {
            setLoading(false)
        }
        setPrevY(y);
    };

    //滑至底部顯示更多-設定觀察範圍(底部loading字)
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25
        }
        const observer = new IntersectionObserver(lazyLoadImages, options);

        if (loadingRef && loadingRef.current) {
            observer.observe(loadingRef.current)
        }
        return () => observer.unobserve(loadingRef.current);

    }, [loadingRef, lazyLoadImages])


    return (
        <>
            <BreadCrumb currentPage={'秀出我的綠'} />
            {gotoUrl &&
                <CheckLoginAndRedirect key={gotoUrl} gotoUrl={gotoUrl} />
            }
            <div className="container-fluid mt-2">
                <div className="d-flex title-btn-wrapper">
                    <h1 className="share-green-title">秀出我的綠</h1>
                    <div className="d-flex share-green-wapper">
                        <div onClick={() => checkLogin_and_redirect(setGotoUrl, "/member/shareGreen")}><button className="share-green-btn">發佈綠生活照片/影片</button></div>
                    </div>
                </div>
                {/* <div className="d-flex title-btn-wrapper">
                    <div className="bookmark-wrapper-article">
                        {dropData.map((data, index) =>
                            <div key={index} onClick={() => {
                                setSortype(String(data.typeId));
                                history.push(`/daily/article?type=${data.typeId}`);
                            }}
                                className={sortype === data.typeId ? "bookmark focus" : "bookmark"}>
                                <h5>{data.typeName}</h5>
                            </div>
                        )}
                    </div>
                </div> */}
                <div className="article-wapper">
                    {fetchData.map((data, index) =>
                        // <Link
                        //     key={index}
                        //     className="lazy-load"
                        //     to={{
                        //         pathname: `/daily/article/info`,
                        //         state: data
                        //     }}>

                        <Link key={index} to={`/daily/article/info?${data.guid}`}>

                            <Card className="green-article">
                                <div className="d-flex justify-content-between">
                                    <div className='p-2'><img className="clip-avatar" src={data.creatorHeadPic ? data.creatorHeadPic : greenMan} alt="作者頭貼" title="作者頭貼" /></div>
                                    <div className='p-2'><div className='customH3'>{data.creator}</div></div>
                                    <div className='p-2'><div className='customH4'>{formatDate(data.createDateTime)}</div></div>
                                </div>

                                <img className="article-img" src={data.picHref ? data.picHref : filmPng} alt="文章圖片" title="文章圖片" />
                                <div className="card-bottom-content">

                                    <div className="card-bottom-btn">
                                        <span><img src={thumb} alt="按讚圖示" title="按讚圖示" />{data.likeCount}</span>
                                        <h2 className="card-truncate">{data.content}</h2>
                                        {/* <h6><img src={message} />0</h6> */}
                                    </div>
                                </div>
                            </Card>

                        </Link>

                    )}


                </div>
                <div ref={loadingRef}>
                    <Loader loading={loading} />
                </div>

            </div>
            <Footer />
        </>
    );
}

export default withRouter(Article);