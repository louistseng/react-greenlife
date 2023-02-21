import React, { useState, useEffect, useRef } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import "../DailyGreen/Article.scss";
import '../eventDetail.scss';
import { formatDate } from '../utils/Functions';
import JoditEditor from "jodit-react";
import { Card, CardDeck } from 'react-bootstrap';
import { useCookies } from "react-cookie";
import { readOnlyConfig } from '../utils/JoditConfig';

// import logoutIcon from "../images1/login/signUp-normal.png"

function KnowledgePage(props) {

    let history = useHistory()

    var serialize = require('serialize-javascript');

    const [greenlifeCookies] = useCookies([]);


    const [fetchData, setFetchData] = useState([]);

    const blogGuid = history.location.search.slice(1);

    console.log(history.location)

    //用URL抓GUID

    const editor = useRef(null)

    //單一文章API
    useEffect(() => {
        //render完成後,畫面從頂端呈現(解決Link會停留 上一個頁面視窗捲動位置的問題)
        window.scrollTo(0, 0)

        const uri = `${props.SSL}//${props.domain}/api/api/Knowledge/ByGuid`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Guid: blogGuid
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                console.log(result.resultObject[0])
                if (result.isSucess) {
                    setFetchData(result.resultObject[0])
                }
            })
    }, [blogGuid]);



    return (
        <>

            <div className="col-12 col-lg-8 main-card-wapper">
                <div className="top-card">
                    <h1 className="main-title">{fetchData.title}</h1>
                    <div className="d-flex">
                        <span className="d-flex hashtag">
                            <div className="kn-tag-name">
                                {fetchData.themes?.map((data, index) =>
                                    <h6 key={index}>#{data.themeName}</h6>
                                )}
                            </div>
                        </span>

                    </div>
                </div>
                <hr />
                <ul >
                    <li className="detail-list"><span className="ul-title">上架日期</span><span>{formatDate(fetchData.startDatetime)}</span></li>
                    <li className="detail-list">
                        <span className="ul-title">影片連結</span>
                        {fetchData.videoPath ?
                            <a target="_blank" rel="noopener noreferrer" href={fetchData.videoPath} title="影片連結(在新視窗開啟鏈結)">{fetchData.videoPath}</a>
                            :
                            <span>暫無相關資訊</span>
                        }
                    </li>

                </ul>
                <div className="content-img-wrapper">
                    <div className="single-img-wrapper"><img style={{ position: "relative" }} className="content-img" alt={fetchData.title} title={fetchData.title} src={fetchData.picPath} /></div>
                </div>

                <div className="inner-article-detail mt-5">
                    <JoditEditor
                        ref={editor}
                        value={fetchData.content}
                        config={readOnlyConfig}
                    // tabIndex={1} // tabIndex of textarea  
                    // onChange={e => setTextContent(e)}
                    />
                </div>


            </div>
        </>
    );
}

export default withRouter(KnowledgePage);