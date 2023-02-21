import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { clickLogout, formatDate } from '../../utils/Functions';
import './Point.scss';
import ReactPaginate from 'react-paginate';
import { clickRecord, fetchTotalGreenShop } from '../../utils/API';
import { useCookies } from "react-cookie";
import { Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import blankLeef from '../../images1/blankLeef.png';
import treePng from '../../images1/greenPoint/point-tree.png';
import fishPng from '../../images1/greenPoint/point-fish.png';
import treeReward from '../../images1/greenPoint/tree-reward.jpg';
import fishReward from '../../images1/greenPoint/fish-reward.jpg';


function RewardPoint(props) {

    let SSL = props.SSL
    let domain = props.domain
    var serialize = require('serialize-javascript');
    let history = useHistory()

    const [greenlifeCookies, removeCookie] = useCookies([]);

    const collector = greenlifeCookies.userGuid || "";
    const memberToken = greenlifeCookies.refreshToken || "";
    const identityType = greenlifeCookies.identityType || ""

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("")
    const count = 6;

    //點閱計數API
    useEffect(() => {
        clickRecord("E059C013-D0D8-4272-8DC0-AAD2DA925599", "22", collector)
    }, [collector]);


    //取得商城積分商品列表
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/GreenShop/Product/List`, {
            method: 'POST',
            body: serialize({
                Page: String(page),
                Count: String(count)
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(res => {
                return res.json();
            }).then(result => { 
                if(result.isSucess)
                setProductList(result.resultObject.products)
                setPageCount(result.resultObject.pageCount)
            })
    }, [])

     //按下換頁按鈕觸發
     const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    //總共多少魚多少樹
    const [fetchGreenShop, setFetchGreenShop] = useState([])
    useEffect(() => {
        fetchTotalGreenShop(setFetchGreenShop)
    }, []);

    return (
        <>

            <div className="col-12 col-lg-8 green-points-reward">
                <div className="total-section">
                    <h3 className="green-title">綠積分福利社</h3>
                    <h4 className="grey-desc">用綠行動推動公益，綠友們已經用綠積分...</h4>
                    <div className="section-wrapper">
                        <div className="tree-section">
                            <img src={treePng} alt="樹木圖示" />
                            {/* <h4>種了<span><CountUp end={fetchGreenShop.treeCount} separator="," /></span>棵樹</h4> */}
                            <h4>種了<span>{fetchGreenShop.treeCount}</span>棵樹</h4>
                        </div>
                        <div className="fish-section">
                            <img src={fishPng} alt="魚兒圖示"/>
                            {/* <h4>放流<span><CountUp end={fetchGreenShop.fishCount} separator="," /></span>條魚</h4> */}
                            <h4>放流<span>{fetchGreenShop.fishCount}</span>條魚</h4>
                        </div>
                    </div>
                </div>
                <div className="reward-gallery">
                    <h3 className="green-title">兌換項目</h3>
                    <div className="reward-card-wrapper">
                    {productList.map(data => 
                        <Card key={data.id} className="reward-card">
                            <img src={data.picHref} alt={data.name}/>
                            <h5 className="reward-card-desc">{data.name}</h5>
                            <div className="icon-point-wrapper"><img src={blankLeef} alt="綠積分點數" /><h6><span className="point-number">{data.price}</span>分</h6></div>
                            <div className={"hover-watermark hover-watermark" +  data.id}><h5>{data.waterMark}</h5></div>
                        </Card>)}
                        {/* <Card className="reward-card">
                            <img src={fishReward} />
                            <h5 className="reward-card-desc">魚苗捐贈計畫券</h5>
                            <div className="icon-point-wrapper"><img src={blankLeef} alt="綠積分點數" /><h6><span className="point-number">15,000</span>分</h6></div>
                            <div className="hover-watermark fish"><h5>放生一條魚</h5></div>
                        </Card> */}
                    </div>
                </div>
                {/* 頁碼 */}
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

        </>
    );
}

export default withRouter(RewardPoint);