import React, { useEffect } from 'react';
import './officePoint.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import productImg from '../../images1/greenOffice/officePoint/03/product.png';
import SideBtnOffice from '../../Components/SideBtnOffice';

import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function Energy() {
    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("220DAB02-DAB9-41F9-817B-1012D180E39B", "10", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"指標03：綠色採購"} />


            <div class="topImg topImgCollection">
                <div className="leftBlue shop col-5">
                    <div className="title-wrapper">
                        <p className="number">03</p>
                        <h1>綠色採購</h1>
                    </div>
                </div>

                <div className="img-area oneLayer col-7 row">
                    <div className="img-text-wrapper col-12">
                        <HashLink to="/categories/green_office/green_procurement#product">
                            <div className="boxForTopImg">
                                <div className="inboxForTopImg">
                                    <div className="inboxForTopImgMask"></div>
                                    <img src={productImg} alt="綠色產品" title="綠色產品" />
                                </div>
                            </div>
                        </HashLink>
                    </div>
                </div>
            </div>



            <div className="container office_point">
                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="product" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={productImg} className="col-5" alt="綠色採購" title="綠色採購" />
                        <div className="col-7 title-text">
                            <h2>綠色採購</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">

                            <div className="col-9 energy"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">

                            <div className="col-9 right-text-wrapper">
                                <p>優先選購具環保標章、節能標章、省水標章及綠建材標章等綠色產品。</p>
                                <p>優先採購符合節能標章、LPG車等低污染、高效率、低耗油之公務車輛。</p>
                                <p>製作宣導品或購買禮品不過度包裝，符合綠色採購或環保要求。</p>
                                <p>出租屋頂，租賃建置太陽能板服務，活用屋頂空間。</p>
                                <p className="last-list-energy">辦公室燈具、事務機、會議展示架與會議餐具，可採取租用服務響應以租代買。</p>
                                <p>優先選擇綠色場域及綠色餐廳舉辦會議、活動及用餐。</p>
                                <p className="last-list-energy">公差住宿優先選擇環保旅宿。</p>
                                <p className="last-list-energy">參與環保署「政府機關綠色採購」或「民間企業及團體綠色採購」，確實申報綠色採購金額。</p>
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