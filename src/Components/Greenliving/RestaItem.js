import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import greenLogo from '../../images1/greenLogo.gif';

function RestaItem(props) {



    return (
        <>
            <Link as={Link} key={props.index} to={`/categories/restaurant/detailPage?res=${props.fetchData.Id}&type=${props.fetchData.RestType}`}>
                <Card className="res-card inner-content">
                    <div className="d-flex content-wrapper search-list-card">
                        <div className="col-4 res-img">
                            <img
                                alt={props.fetchData.Name}
                                title={props.fetchData.Name}
                                src={props.fetchData.ImgByte !== "" ? props.fetchData.ImgByte : "../../images/blankLeef.png"} />
                            {/* <img src={fetchData.RestPicList[0].RestUrl === "" ? "../images/greenTour/unload.PNG" : fetchPicPath} alt={fetchData.Name} title={fetchData.Name} /> */}
                        </div>
                        <div className="col-8 rs-right-content">
                            <div className="d-flex">
                                <div>
                                    <div className="d-flex justify-content-start category-ul">
                                        {props.fetchData.RestType === 1 ?
                                            <li style={{ background: "#ffbb00" }}>綠色餐廳</li>
                                            :
                                            <li style={{ background: "#ffbb00" }}>環保標章餐館</li>

                                        }
                                        {props.fetchData.SubType?.includes("1") &&
                                            <li style={{ background: "#FE6568" }}>員工餐廳</li>
                                        }
                                        {props.fetchData.Active?.indexOf(4) === -1 ?
                                            ""
                                            : <li style={{ background: "#67cf06" }}>環保集點</li>
                                        }
                                        {/* {fetchData.Active.indexOf(2) === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#f05f5f" }}>消費贈點</li>
                                                                    }

                                                                    {fetchData.Active.indexOf(3) === -1 ?
                                                                        ""
                                                                        : <li style={{ background: "#1ec0f1" }}>點數折抵</li>
                                                                    } */}
                                        {props.fetchData.Notes?.indexOf("金級") === -1 ||
                                            <li style={{ background: "#ff9933" }}>金級</li>
                                        }
                                        {props.fetchData.Notes?.indexOf("銀級") === -1 ||
                                            <li style={{ background: "#999999" }}>銀級</li>
                                        }
                                        {props.fetchData.Notes?.indexOf("銅級") === -1 ||
                                            <li style={{ background: "#cc5c28" }}>銅級</li>
                                        }
                                    </div>
                                    <div className="content-name">
                                        <div className="d-flex outterBox">
                                            <h6>{props.fetchData.Address?.substring(0, 3)}</h6>
                                        </div>
                                        <h5 title={props.fetchData.Name} className="res-title">{props.fetchData.Name}</h5>
                                    </div>

                                </div>

                            </div>
                            <div className="res-address">
                                <h4 className="ad-subtitle"><i className="fas fa-home" aria-hidden="true" alt="餐廳地址圖示"></i>&nbsp;餐廳地址:</h4>
                                <h4 className="ad-content" title={props.fetchData.Address}>{props.fetchData.Address?.replaceAll("台", "臺")}</h4>
                            </div>
                        </div>
                        {props.cancelCollect &&
                            <div onClick={(e) => props.cancelCollect(props.fetchData.Id, e)} className="col-2 heart-wrapper">
                                <span id="a"><i className="fas fa-heart" aria-hidden="true" alt="圖示"></i></span>
                                <span id="b"><i className="far fa-heart" aria-hidden="true" alt="圖示"></i></span>
                                <h6 className="cancel-text">取消收藏</h6>
                            </div>}
                    </div>
                </Card>
            </Link>

        </>
    );
}
export default RestaItem;
