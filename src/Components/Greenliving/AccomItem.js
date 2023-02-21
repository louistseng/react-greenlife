import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import greenLogo from '../../images1/greenLogo.gif';

function AccomItem(props) {


    return (
        <>
            <Link as={Link} key={props.index} to={`/categories/accommodation/detailPage?hotel=${props.fetchData.Num}&type=${props.fetchData.HotelType}`}>
                <Card className="res-card inner-content">
                    <div className="d-flex content-wrapper search-list-card">
                        <div className="col-4 res-img">
                            <img
                                alt={props.fetchData.Name}
                                title={props.fetchData.Name}
                                src={props.fetchData.ImgByte !== "" ? props.fetchData.ImgByte : "../images/blankLeef.png"} />
                            {/* <img src={fetchData.RestPicList[0].RestUrl === "" ? "../images/greenTour/unload.PNG" : fetchPicPath} alt={fetchData.Name} title={fetchData.Name} /> */}
                        </div>
                        <div className="col-8 rs-right-content">
                            <div className="d-flex">
                                <div>
                                    <div className="d-flex justify-content-start category-ul">
                                        {props.fetchData.HotelType === 1 ?
                                            <li style={{ background: "green" }}>環保旅店</li>
                                            : <li style={{ background: "green" }}>環保標章旅館</li>
                                        }

                                        {props.fetchData.InteCaseList?.map((data, index) =>
                                            data.InteCase1 !== "0" || data.InteCase1_1 !== "0" || data.InteCase1_2 !== "0" || data.InteCase1_3 !== "0" || data.InteCase1_4 !== "0" || data.InteCase1_5 !== "0" ?
                                                <li style={{ background: "rgba(153, 124, 8, 1)" }}>方案一</li>
                                                :
                                                ""
                                        )}
                                        {props.fetchData.InteCaseList?.map((data, index) =>
                                            data.InteCase2 !== "0" ?
                                                <li style={{ background: "rgba(153, 19, 15, 1)" }}>方案二</li>
                                                :
                                                ""
                                        )}
                                        {props.fetchData.InteCaseList?.map((data, index) =>
                                            data.InteCase3 !== "0" ?
                                                <li style={{ background: "rgba(15, 21, 153, 1)" }}>方案三</li>
                                                :
                                                ""
                                        )}


                                        {props.fetchData.Memo?.indexOf("金級") === -1 ?
                                            ""
                                            : <li style={{ background: "#ff9933" }}>金級</li>
                                        }
                                        {props.fetchData.Memo?.indexOf("銀級") === -1 ?
                                            ""
                                            : <li style={{ background: "#999999" }}>銀級</li>
                                        }
                                        {props.fetchData.Memo?.indexOf("銅級") === -1 ?
                                            ""
                                            : <li style={{ background: "#cc5c28" }}>銅級</li>
                                        }
                                    </div>
                                    <div className="content-name">
                                        <div className="d-flex outterBox">
                                            <h6>{props.fetchData.HotelType === 1 ? props.fetchData.Address?.substring(0, 3).replaceAll("台", "臺") : props.fetchData.ServicePlaceAddr?.substring(0, 3).replaceAll("台", "臺")}</h6>
                                        </div>
                                        <h5 title={props.fetchData.Name} className="res-title">{props.fetchData.Name}</h5>
                                    </div>
                                </div>

                            </div>
                            <div className="res-address">
                                <h4 className="ad-subtitle"><i className="fas fa-home" aria-hidden="true"></i>&nbsp;旅宿地址:</h4>
                                <h4 className="ad-content" title={props.fetchData.HotelType === 1 ? props.fetchData.Address : props.fetchData.ServicePlaceAddr}>{props.fetchData.HotelType === 1 ? props.fetchData.Address : props.fetchData.ServicePlaceAddr}</h4>
                            </div>
                        </div>
                        {props.cancelCollect &&
                            <div onClick={(e) => props.cancelCollect(props.fetchData.Num, e)} className="col-2 heart-wrapper">
                                <span id="a"><i class="fas fa-heart" aria-hidden="true"></i></span>
                                <span id="b"><i class="far fa-heart" aria-hidden="true"></i></span>
                                <h6 className="cancel-text">取消收藏</h6>
                            </div>}
                    </div>
                </Card>
            </Link>
        </>
    );
}
export default AccomItem;
