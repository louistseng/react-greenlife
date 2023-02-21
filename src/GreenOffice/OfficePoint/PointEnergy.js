import React, { useEffect } from 'react';
import './officePoint.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Footer from '../../Components/Footer';
import BreadCrumb from '../../Components/BreadCrumb';
import energyImg from '../../images1/greenOffice/officePoint/01/energy.jpg';
import meetingImg from '../../images1/greenOffice/officePoint/01/meeting.jpg';
import oilImg from '../../images1/greenOffice/officePoint/01/oil.png';
import paperImg from '../../images1/greenOffice/officePoint/01/paper.jpg';
import waterImg from '../../images1/greenOffice/officePoint/01/water.jpg';
import SideBtnOffice from '../../Components/SideBtnOffice';

import { clickRecord } from '../../utils/API';
import { useCookies } from "react-cookie";

function Energy() {

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("105ACE7F-CE9C-4A70-ABEA-6B6782383A55", "10", collector)
    }, [collector]);

    return (
        <>
            <BreadCrumb currentPage={"指標01：節省能資源"} />
            <div className="topImg topImgCollection">
                <div className="leftBlue energy col-5">
                    <div className="title-wrapper">
                        <p className="number">01</p>
                        <h1>節省能資源</h1>
                    </div>
                </div>
                <div className="img-area col-7">
                    <div className="first-layer">
                        <div className="img-text-wrapper col-6">
                            <HashLink to="/categories/green_office/conserve_energy#electricity" title="前往連結">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg">
                                        <div className="inboxForTopImgMask"><h2>節約用電</h2></div>
                                        <img src={energyImg} alt="前往連結" title="" />
                                    </div>
                                </div>
                            </HashLink>
                        </div>
                        <div className="img-text-wrapper col-6">
                            <HashLink to="/categories/green_office/conserve_energy#water" title="前往連結">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg">
                                        <div className="inboxForTopImgMask"><h2>節約用水</h2></div>
                                        <img src={waterImg} alt="前往連結" title="" />
                                    </div>
                                </div>
                            </HashLink>
                        </div>
                    </div>
                    <div className="second-layer">
                        <div className="img-text-wrapper col-4">
                            <HashLink to="/categories/green_office/conserve_energy#paper" title="前往連結">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg">
                                        <div className="inboxForTopImgMask"><h2>節約用紙</h2></div>
                                        <img src={paperImg} alt="前往連結" title="" />
                                    </div>
                                </div>
                            </HashLink>

                        </div>
                        <div className="img-text-wrapper col-4">
                            <HashLink to="/categories/green_office/conserve_energy#fuel" title="前往連結">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg">
                                        <div className="inboxForTopImgMask"><h2>節約用油</h2></div>
                                        <img src={oilImg} alt="前往連結" title="" />
                                    </div>
                                </div>
                            </HashLink>

                        </div>
                        <div className="img-text-wrapper col-4">
                            <HashLink to="/categories/green_office/conserve_energy#online_meeting" title="前往連結">
                                <div className="boxForTopImg">
                                    <div className="inboxForTopImg">
                                        <div className="inboxForTopImgMask"><h2>視訊會議</h2></div>
                                        <img src={meetingImg} alt="前往連結" title="" />
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
                        <div id="electricity" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={energyImg} className="col-5" alt="前往連結" title="項目1：節約用電" />
                        <div className="col-7 title-text">
                            <h2>項目1：節約用電</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 energy"><h3>類別</h3></div>
                            <div className="col-8 energy"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-energy">照明設備</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>選用高效率LED照明燈具及電子式安定器。</p>
                                <p>出口指示燈、避難方向指示燈、消防指示燈等採用省電LED產品。</p>
                                <p>依國家標準（CNS）所訂之照度標準，檢討各環境照度是否適當，並作改善。</p>
                                <p>走廊及通道等照明需求低之公共場所，設定隔盞開燈或間接照明，達到燈光調和、減少燈管數量；無安全顧慮下，於白天全不開燈。</p>
                                <p>非經常使用之照明場所，如廁所、茶水間等，改採感應式開關燈。</p>
                                <p>牆面及天花版選用乳白色或淡色系列，增加光線反射效果，減少所需燈具數。</p>
                                <p>採取責任分區及個人責任區管理，隨手關閉不需使用之照明。</p>
                                <p>適度調整燈具位置至辦公桌面正上方，並增設獨立之電源開關。</p>
                                <p className="last-list-energy">定期清潔燈具，依燈管光衰及黑化程度更換燈管。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-energy">電器設備</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>設定電腦節電模式或自動關閉，例如停止運作10分鐘後，即自動進入低耗能休眠狀態。</p>
                                <p>以遠端限時工具關閉電器與電腦。</p>
                                <p>資訊機房根據資訊設備電力容量裝置適當之不斷電系統，或選用模組化設計，依設備量增加模組。</p>
                                <p>針對機房內所有用電設施，裝設可動態量測電力使用效率(PUE) 之智慧型電力監控系統。</p>
                                <p>飲水機及開飲機裝設定時控制器或手動控制使用時間。</p>
                                <p className="last-list-energy">變壓器放置場所保持良好通風，必要時加裝風扇或空調散熱。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="water" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={waterImg} className="col-5" alt="前往連結" title="項目2：節約用水" />
                        <div className="col-7 title-text">
                            <h2>項目2：節約用水</h2>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 water"><h3>類別</h3></div>
                            <div className="col-8 water"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4  cate-title-water">省水裝置</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>廁所、茶水間均裝置感應式水龍頭，並購置符合省水標章之器材。</p>
                                <p>安裝省水型馬桶或二段式沖水配件。</p>
                                <p className="last-list-water">飲水機裝設控制器，例如設定上班日早上6時至晚上20時始運作，餘時間均自動關閉飲水機電源。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-water">線路查修</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>加強水管線路查修、巡檢，降低漏水率。</p>
                                <p>適時調節廁所及茶水間等水龍頭出水率。</p>
                                <p>適時廁所自動沖水器流量。</p>
                                <p className="last-list-water">定期檢視水費單，發現水費異常即進行查漏維修。(PUE) 之智慧型電力監控系統。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-4 cate-title-water"><h3>循環利用</h3></div>
                            <div className="col-8 right-text-wrapper">
                                <p>定時檢查大樓雨水回收系統管路暢通並供廁所用水。</p>
                                <p className="last-list-water">增設收集逆滲透飲水機過濾廢棄水，回收用以澆花與清潔、清洗用水。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="paper" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={paperImg} className="col-5" alt="前往連結" title="項目3：節約用紙" />
                        <div className="col-7 title-text">
                            <h2>項目3：節約用紙</h2>
                            <h3>環保用紙、紙張利用、電子化作業、記錄管控</h3>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 paper"><h3>類別</h3></div>
                            <div className="col-8 paper"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4  cate-title-paper">環保用紙</h3>
                            <div className="col-8 right-text-wrapper">
                                <p className="last-list-paper">使用環保標章認證之回收再生紙。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-paper">紙張利用</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>宣導書面資料採雙面列印，背面空白紙張再利用（再影印或裁剪為便條紙或草稿紙使用）。</p>
                                <p>設置「背面空白用紙再利用專用箱」，影印紙依大小分類放置。</p>
                                <p className="last-list-paper">設置紙類回收箱，且不混入釘書針、其他金屬、複寫紙、感熱紙、含蠟紙、塑膠等。(PUE) 之智慧型電力監控系統。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-4 cate-title-paper"><h3>電子化作業</h3></div>
                            <div className="col-8 right-text-wrapper">
                                <p>公文及簽核系統電子化，取代紙本列印。</p>
                                <p className="last-list-paper">個人名片電子化，環保與時尚感兼具。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-4 cate-title-paper"><h3>記錄管控</h3></div>
                            <div className="col-8 right-text-wrapper">
                                <p>統計領紙量及個人影印使用次數，定期編表通知提醒即時檢討，調整控管用紙量。</p>
                                <p className="last-list-paper">影印功能預設雙面列印，避免不必要浪費。</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="fuel" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={oilImg} className="col-5" alt="前往連結" title="項目4：節約用油" />
                        <div className="col-sm-7 col-md-7 col-lg-6 title-text">
                            <h2>項目4：節約用油</h2>
                            <h3>車輛保養、車輛共乘、優良駕駛、記錄管控、大眾運輸</h3>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 oil"><h3>類別</h3></div>
                            <div className="col-8 oil"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4  cate-title-oil">車輛保養</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>車輛定期(達10,000公里數)維修保養及檢驗。</p>
                                <p>按時更換機油及濾清器，選用適當粘度的潤滑油。</p>
                                <p>車輛胎壓維持原廠建議值(35)。</p>
                                <p>保持車體乾淨，可減少風阻力，相對減少耗油量。</p>
                                <p>注意引擎散熱系統，確保車輛引擎維持正常工作溫度。</p>
                                <p>注意排氣管是否油垢堵塞，而致排氣不順使馬力降低。</p>
                                <p className="last-list-oil">減少車輛不必要的負載，行李箱經常清理。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4 cate-title-oil">車輛共乘</h3>
                            <div className="col-8 right-text-wrapper">
                                <p>交通車接送，依人數決定租賃大型、中型客運車輛或叫計程車共乘方式，以節約能源。</p>
                                <p className="last-list-oil">公務車調派應儘量共乘，減少車輛出勤次數。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-4 cate-title-oil"><h3>優良駕駛</h3></div>
                            <div className="col-8 right-text-wrapper">
                                <p>減少怠速，停車未關閉引擎持續時間不逾3分鐘。</p>
                                <p>保持適當車速，避免重踩油門。</p>
                                <p>善用剩餘動力滑行並保持車距，避免猛踩煞車。</p>
                                <p>避免熱車過度，起步低速行駛。</p>
                                <p className="last-list-oil">保持車內適當溫度，不要將冷氣溫度設定過低。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-4 cate-title-oil"><h3>記錄管控</h3></div>
                            <div className="col-8 right-text-wrapper">
                                <p className="last-list-oil">定期記錄公務車輛用油量，彙製「用油紀錄表」。</p>
                            </div>
                        </div>
                        <div className="inner-content-wrapper">
                            <div className="col-4 cate-title-oil"><h3>大眾運輸</h3></div>
                            <div className="col-8 right-text-wrapper">
                                <p className="last-list-oil">鼓勵同仁上下班、外出洽公以搭乘大眾運輸工具為主</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-section">
                    <div className="content-top-wrapper">
                        <div id="online_meeting" style={{ position: "absolute", top: "-125px", left: "0" }}></div>
                        <img src={meetingImg} className="col-5" alt="前往連結" title="項目5：視訊會議" />
                        <div className="col-7 title-text">
                            <h2>項目5：視訊會議</h2>
                            <h3>視訊會議</h3>
                        </div>
                    </div>
                    <div className="bottom-content">
                        <div className="inner-title-wrapper">
                            <div className="col-4 meeting"><h3>類別</h3></div>
                            <div className="col-8 meeting"><h3>參考措施</h3></div>
                        </div>
                        <div className="inner-content-wrapper">
                            <h3 className="col-4  cate-title-meeting">視訊會議</h3>
                            <div className="col-8 right-text-wrapper">
                                <p className="last-list-meeting">建置視訊會議系統設備，提高溝通效率，減少與會人員舟車勞頓及撙節差旅費。</p>
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

export default withRouter(Energy)