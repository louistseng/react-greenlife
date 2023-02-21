import React, { useEffect } from 'react';
import './officePoint.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import environmentImg from '../../images1/greenOffice/officePoint/04/environment.jpg';
import plantImg from '../../images1/greenOffice/officePoint/04/plant.png';
import securityImg from '../../images1/greenOffice/officePoint/04/security.jpg';
import SideBtnOffice from '../../Components/SideBtnOffice';

import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function Energy() {
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("14A5D403-F644-4952-AB28-4EA525278590", "10", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"指標04：環境綠美化"} />

            <div class="topImg topImgCollection">
                <div className="leftBlue environment col-5">
                    <div className="title-wrapper">
                        <p className="number">04</p>
                        <h1>環境綠美化</h1>
                    </div>
                </div>


                <div className="img-area oneLayer col-7 row">
                    <div className="img-text-wrapper col-6">
                        <HashLink to="/categories/green_office/green_beautification#plant">
                            <div className="boxForTopImg">
                                <div className="inboxForTopImg">
                                    <div className="inboxForTopImgMask" title="前往連結"><h2>綠化植栽</h2></div>
                                    <img src={plantImg} alt="前往連結" title="" />
                                </div>
                            </div>
                        </HashLink>
                    </div>
                    <div className="customize-layer col-6">
                        <div className="img-text-wrapper-half">
                            <HashLink to="/categories/green_office/green_beautification#environment">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg" title="前往連結">
                                        <div className="inboxForTopImgMask"><h2>維護環境</h2></div>
                                        <img src={environmentImg} alt="前往連結" title="" />
                                    </div>
                                </div>
                            </HashLink>
                        </div>
                        <div className="img-text-wrapper-half">
                            <HashLink to="/categories/green_office/green_beautification#security">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg" title="前往連結">
                                        <div className="inboxForTopImgMask"><h2>安全管理</h2></div>
                                        <img src={securityImg} alt="前往連結" title="" />
                                    </div>
                                </div>
                            </HashLink>
                        </div>
                    </div>
                </div>

            </div>

            <div className="container office_point">
                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="plant" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={plantImg} className="col-5" alt="綠化植栽示意圖" title="綠化植栽示意圖" />
                        <div className="col-7 title-text">
                            <h2>綠化植栽</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">

                            <div className="col-9 energy"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">

                            <div className="col-9 right-text-wrapper">
                                <p>於公共空間設置盒栽及藝術造型盆景，定期巡視維護更換，營造綠化清新辦公環境及美化公共空間。</p>
                                <p>配置室內植栽、設置屋頂小田園，定期養護修剪，以提升人員舒適及解壓之辦公環境。</p>
                                <p className="last-list-energy">設置移動式綠色植栽屏風，改善室內空氣品質，營造友善辦公環境並提升效率。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="environment" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={environmentImg} className="col-5" alt="維護環境示意圖" title="維護環境示意圖" />
                        <div className="col-7 title-text">
                            <h2>維護環境</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">

                            <div className="col-9 water"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">

                            <div className="col-9 right-text-wrapper">

                                <p className="last-list-energy">定時清潔辦公室、訓練場地及廁所衛生環境。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="security" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={securityImg} className="col-5" alt="安全管理示意圖" title="安全管理示意圖" />
                        <div className="col-7 title-text">
                            <h2>安全管理</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">

                            <div className="col-9 water"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-9 right-text-wrapper">
                                <p className="last-list-energy">加強辦公室用品安全，減少使用含特定化學成分之用品。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SideBtnOffice history={useHistory()} type={"綠色辦公"} />
            <Footer />
        </>
    );
}

export default withRouter(Energy);