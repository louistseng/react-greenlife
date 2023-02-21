import React, { useEffect } from 'react';
import './officePoint.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import actionImg from '../../images1/greenOffice/officePoint/05/action.png';
import promoteImg from '../../images1/greenOffice/officePoint/05/promote.png';
import SideBtnOffice from '../../Components/SideBtnOffice';

import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function Energy() {

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("487C21E8-1827-40DC-B844-8AF0730A4CCA", "10", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"指標05：宣導倡議"} />

            <div class="topImg topImgCollection">
                <div className="leftBlue promote col-5">
                    <div className="title-wrapper">
                        <p className="number">05</p>
                        <h1>宣導倡議</h1>
                    </div>
                </div>

                <div className="img-area oneLayer col-7 row">
                    <div className="img-text-wrapper col-6">
                        <HashLink to="/categories/green_office/advocacy#promote" title="前往連結">
                            <div className="boxForTopImg">
                                <div className="inboxForTopImg">
                                    <div className="inboxForTopImgMask"><h2>教育宣導</h2></div>
                                    <img src={promoteImg} alt="前往連結" title="" />
                                </div>
                            </div>
                        </HashLink>
                    </div>
                    <div className="img-text-wrapper col-6">
                        <HashLink to="/categories/green_office/advocacy#action" title="前往連結">
                            <div className="boxForTopImg">
                                <div className="inboxForTopImg">
                                    <div className="inboxForTopImgMask"><h2>環保行動</h2></div>
                                    <img src={actionImg} alt="前往連結" title="" />
                                </div>
                            </div>
                        </HashLink>
                    </div>
                </div>



            </div>

            <div className="container office_point">
                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="promote" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={promoteImg} className="col-5" alt="前往連結" title="教育宣導" />
                        <div className="col-7 title-text">
                            <h2>教育宣導</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">

                            <div className="col-9 energy"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">

                            <div className="col-9 right-text-wrapper">
                                <p>定期辦理環保知識培訓、體驗工作坊等活動，鼓勵同仁創意發想並規劃獎勵或競賽機制，落實環保且增加榮譽感。</p>
                                <p>將節能工作列為經常性辦理業務，並利用內部各種集會場合或活動中宣導節約能源觀念及作法；並派員參加節約能源相關研討(習)會。</p>
                                <p>宣導相關政府政策如經濟部「政府機關及學校用電效率管理計畫」、「機關學校常態節水行動獎勵原則」，及環保署「政府機關綠色採購」或「民間企業及團體綠色採購」等。</p>
                                <p>針對機關內部或所屬機關(構)學校辦理節能教育訓練，邀請專家學者提供最新之節能知識及作法，提升人員節能常識。</p>
                                <p>員工組織學習或旅遊活動，優先至環教場所辦理或規劃綠色旅遊。</p>
                                <p>休息時間，宣導關閉不必要電源（照明、電腦、空調等設備）。</p>
                                <p>最後離開辦公室之同仁協助確認該層樓電源已確實關閉。</p>
                                <p>推行步行運動，3樓以下步行不搭乘電梯，或電梯奇偶日分別開放，鼓勵員工走樓梯強身及節能。</p>
                                <p>於用水設備，如廁所及茶水間附近張貼節約用水標語。</p>
                                <p>暫停消防安全講習員工滅火噴水演練。</p>
                                <p>公務車以水桶擦拭方式清潔，不以水管直接噴水洗車。</p>
                                <p>自備環保杯，不用紙杯或塑膠杯；用餐自備環保筷，不用免洗筷；多用手帕擦汗、擦手，減少衛生紙和面紙浪費。</p>
                                <p>利用電子信箱及內部資訊網路，代替紙類公文書表。</p>
                                <p>減少訂閱紙本與電子DM，減少碳排放與避免衝動購物。</p>
                                <p>加入綠生活資訊平台等網站，持續汲取綠生活新知。</p>
                                <p className="last-list-energy">落實綠生活，並主動分享實踐心得。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="action" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={actionImg} className="col-5" alt="前往連結" title="環保行動" />
                        <div className="col-7 title-text">
                            <h2>環保行動</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">

                            <div className="col-9 water"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">

                            <div className="col-9 right-text-wrapper">

                                <p className="last-list-energy">定期辦理淨山、淨灘或植樹等環保行動，鼓勵同仁一起具體落實環保，培養綠生活思維。</p>
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