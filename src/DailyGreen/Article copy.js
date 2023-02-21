import React, { useState, useEffect } from 'react';
import './Article.scss';
// import Footer from './Components/Footer';
// import BreadCrumb from './Components/BreadCrumb'
// import SideBtn from './Components/SideBtn';
import { Link, withRouter } from 'react-router-dom';
import { Card, Form, Pagination } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Cookies from 'universal-cookie';
import greenMan from "../images1/greenMan/greenMan.png";
import thumb from "../images1/greenMan/thumb.png";
import message from "../images1/greenMan/message.png";
import { formatDate } from "../utils/Functions";

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const Loader = React.lazy(() => import('../Components/Loader'));
const Footer = React.lazy(() => import('../Components/Footer'));

export const dataContext = React.createContext();

function Article({ history }) {


    let SSL = window.location.protocol
    let domain = window.location.hostname.length > 10 ? window.location.hostname : 'greenlife.eri.com.tw'


    var serialize = require('serialize-javascript');
    const cookies = new Cookies();
    const [collector, setCollector] = useState(cookies.get("userGuid"));
    const [page, setPage] = useState(1);
    const [count, setCount] = useState("10");
    const [sortype, setSortype] = useState("4");
    const [fetchData, setFetchData] = useState([]);
    const [video, setVideo] = useState("")


    //文章列表
    useEffect(() => {



        window.scrollTo(0, 0)
        const uri = `${SSL}//${domain}/api/api/MyGreen/Filter`;

        fetch(uri, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: count,
                SortType: sortype
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess) {
                    console.log(result)
                    setFetchData(result.resultObject.greens)
                    if (result.resultObject.videoPath) {
                        setVideo(result.resultObject.videoPath.split('=')[1])
                        console.log(result.resultObject.videoPath)
                    }
                }
            });





    }, [sortype, page]);

    useEffect(() => {

        let options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        }

        const lazyLoadImages = (entries, observer) => {

            entries.map(entry => {
                if (entry.intersectionRatio > 0) {
                    console.log(entry)
                    entry.target.style.display = "block";
                }

            })
        }

        let observer = new IntersectionObserver(lazyLoadImages, options);
        let observTargets = document.querySelectorAll('.lazy-load');
        observTargets.forEach(target => observer.observe(target))
    })


    return (
        <>
            <BreadCrumb currentPage={'秀出你的綠'} />
            <div className="container-fluid mt-2">
                <div className="d-flex title-btn-wrapper">
                    <h2 className="share-green-title">秀出你的綠</h2>
                    <div className="d-flex share-green-wapper">
                        <Link to="/member/shareGreen"><button className="share-green-btn">發佈綠生活照片/影片</button></Link>
                    </div>
                </div>
                <div className="bookmark-wrapper-article">
                    <div onClick={() => {
                        setSortype("1");
                        history.push(`/daily/article?type=1`);
                    }}
                        className={sortype == 1 ? "bookmark focus" : "bookmark"}>
                        <h5>最新</h5>
                    </div>
                    <div onClick={() => {
                        setSortype("2");
                        history.push(`/daily/article?type=2`);
                    }}
                        className={sortype == 2 ? "bookmark focus" : "bookmark"}>
                        <h5>最多觀看</h5>
                    </div>
                    <div onClick={() => {
                        setSortype("3");
                        history.push(`/daily/article?type=3`);
                    }}
                        className={sortype == 3 ? "bookmark focus" : "bookmark"}>
                        <h5>本周熱門</h5>
                    </div>
                    <div onClick={() => {
                        setSortype("4");
                        history.push(`/daily/article?type=4`);
                    }}
                        className={sortype == 4 ? "bookmark focus" : "bookmark"}>
                        <h5>本月熱門</h5>
                    </div>
                </div>
                <div className="article-wapper">
                    {fetchData.map((data, index) =>
                        <Link
                            key={index}
                            className="lazy-load"
                            to={{
                                pathname: `/daily/article/info`,
                                state: data
                            }}>
                            <Card className="green-article">
                                <div className="d-flex">
                                    <img className="clip-avatar" src={data.creatorHeadPic ? data.creatorHeadPic : greenMan} alt={data.creatorHeadPic ? "會員頭像" : "綠寶圖示"} />
                                    <h5>{data.creator}</h5>
                                    <h6 className="date">{formatDate(data.createDateTime)}</h6>
                                </div>

                                <img className="article-img" src={data.picHref ? data.picHref : "../images/blankLeef.png"} alt={data.picHref ? "文章封面" : "預設圖示"} />
                                <div className="card-bottom-content">
                                    <h6>{data.content}</h6>
                                    <div className="card-bottom-btn">
                                        <h6><img src={thumb} alt="按讚圖示" />{data.likeCount}</h6>
                                        {/* <h6><img src={message} />0</h6> */}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )}


                </div>

                <SideBtn history={history} />

            </div>
            <Footer />
        </>
    );
}

export default withRouter(Article);