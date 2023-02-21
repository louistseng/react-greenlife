import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tourIcon from '../../images1/greenTour/tourIcon.png';

function TourItem(props) {

    return (
        <>

            <a as={Link} key={props.index} target="_blank" rel="noreferrer noopener" href={`/categories/greenTour/detailPage?${props.fetchData.ProjNo}`}>
                <Card className="res-card inner-content">
                    <div className="d-flex content-wrapper search-list-card">
                        {props.fetchData.ProjType === 2 ?
                            <div className="col-4 res-img">
                                <img src={props.fetchData.TourUrl ? props.fetchData.TourUrl : tourIcon} alt={props.fetchData.ProjName} title={props.fetchData.ProjName} />
                            </div>
                            :
                            ""}
                        <div className={props.fetchData.ProjType === 2 ? "col-8 rs-right-content" : "col-12 tour-card-item"}>
                            <div className="d-flex">
                                <div className="w-100">
                                    <div className="d-flex justify-content-start category-ul">
                                        <li style={{ background: "#444343" }}>{props.fetchData.ProjType === 2 ? "團體旅遊" : "自由行"}</li>

                                        {props.fetchData?.ProjType &&
                                            props.fetchData.TravelTourNo !== "" && <li style={{ background: "orange" }}>{props.fetchData.TravelTourNo}</li>
                                        }
                                        {props.fetchData.Zoom === "" ?
                                            ""
                                            : <li style={{ background: "#f06b62" }}>{props.fetchData.Zoom}</li>
                                        }

                                        <li style={{ background: "#4bcfae" }}>{props.fetchData.TotalDay}日</li>
                                    </div>
                                    <div className="content-name">
                                        <div className="d-flex outterBox">
                                            <p>{props.fetchData.Travel === "" ? props.fetchData.CityName : props.fetchData.Travel}</p>
                                        </div>
                                        <h2 title={props.fetchData.ProjName} className="tour-title">{props.fetchData.ProjName}</h2>
                                    </div>
                                </div>
                            </div>
                            {props.fetchData.Zoom === "" ?
                                ""
                                :
                                <div className="green-price-wrapper">
                                    <div className="price">
                                        <> <h3>參考價格&nbsp;&nbsp;</h3><h3 id="price">{props.fetchData?.Price?.split('/').shift()} &nbsp;元/人</h3></>
                                    </div>
                                    {/* <button className="tour-bottom-price">看更多</button> */}
                                </div>
                            }
                        </div>
                        {props.cancelCollect &&
                            <div onClick={(e) => props.cancelCollect(props.fetchData.ProjNo, e)} className="col-2 heart-wrapper">
                                <span id="a"><i class="fas fa-heart" aria-hidden="true"></i></span>
                                <span id="b"><i class="far fa-heart" aria-hidden="true"></i></span>
                                <h4 className="cancel-text">取消收藏</h4>
                            </div>}
                    </div>
                </Card>
            </a>

        </>
    );
}
export default TourItem;
