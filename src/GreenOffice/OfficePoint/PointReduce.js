import React, { useEffect } from 'react';
import './officePoint.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import reduceImg from '../../images1/greenOffice/officePoint/02/reduce.png';
import recycleImg from '../../images1/greenOffice/officePoint/02/recycle.png';
import SideBtnOffice from '../../Components/SideBtnOffice';

import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function Energy() {
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("8A375A80-73F4-4821-B456-41025AC24F05", "10", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"指標02：源頭減量"} />


            <div class="topImg topImgCollection">
                <div className="leftBlue reduce col-5">
                    <div className="title-wrapper">
                        <p className="number">02</p>
                        <h1>源頭減量</h1>
                    </div>
                </div>
                <div className="img-area oneLayer col-7 row">
                    <div className="img-text-wrapper col-6">
                        <HashLink to="/categories/green_office/source_reduction#reduce" title="前往連結">
                            <div className="boxForTopImg">
                                <div className="inboxForTopImg">
                                    <div className="inboxForTopImgMask"><h2>減塑減廢</h2></div>
                                    <img src={reduceImg} alt="前往連結" title="" />
                                </div>
                            </div>
                        </HashLink>
                    </div>
                    <div className="img-text-wrapper col-6">
                        <HashLink to="/categories/green_office/source_reduction#recylcle" title="前往連結">
                            <div className="boxForTopImg">
                                <div className="inboxForTopImg">
                                    <div className="inboxForTopImgMask"><h2>資源回收</h2></div>
                                    <img src={recycleImg} alt="前往連結" title="" />
                                </div>
                            </div>
                        </HashLink>
                    </div>
                </div>
            </div>

            <div className="container office_point">
                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="reduce" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={reduceImg} alt="減塑減廢圖示" title="減塑減廢圖示" className="col-5" />
                        <div className="col-7 title-text">
                            <h2>項目1：減塑減廢</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 energy"><h3>類別</h3></div>
                            <div className="col-8 energy"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-energy">公用設備</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>裝設公用飲水設備。</p>
                                <p className="last-list-energy">提供公用杯盤餐具及環保袋，避免一次性用品浪費。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-energy">鐵盒便當</h3>
                            <div className="col-8 right-text-wrapper">
                                <p className="last-list-energy">改訂購鐵盒便當或自備容器裝餐食，減用一次性餐盒。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="recylcle" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={recycleImg} alt="項目2：資源回收圖示" title="項目2：資源回收" className="col-5" />
                        <div className="col-7 title-text">
                            <h2>項目2：資源回收</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 water"><h3>類別</h3></div>
                            <div className="col-8 water"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4  cate-title-water">分類回收</h3>
                            <div className="col-8 right-text-wrapper">

                                <p className="last-list-water">落實資源回收分類並節省資源，垃圾減量。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-water">重複利用</h3>
                            <div className="col-8 right-text-wrapper">

                                <p className="last-list-water">設置回收箱回收L夾、公文袋及迴紋針等辦公用品。</p>
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