import React, { useState, useEffect } from 'react';
import './FlipTour.scss';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import DownloadCarouselFlip from '../Components/DownloadCarouselFlip';
import { clickRecord } from '../utils/API';
import htmlParse from 'html-react-parser';

import watchImg from '../images1/greenOffice/main/watch.png';
import checkImg from '../images1/greenOffice/main/check.png';
import manImg from '../images1/greenOffice/main/man.png';

import Icon17 from '../images1/flip/office/slideIcon/icon_01-01.png';
import Icon18 from '../images1/flip/office/slideIcon/icon_02-01.png';
import Icon19 from '../images1/flip/office/slideIcon/icon_03-01.png';
import Icon20 from '../images1/flip/office/slideIcon/icon_04-01.png';
import Icon21 from '../images1/flip/office/slideIcon/icon_05-01.png';
import Icon22 from '../images1/flip/office/slideIcon/icon_06-01.png';
import Icon23 from '../images1/flip/office/slideIcon/icon_07-01.png';
import Icon24 from '../images1/flip/office/slideIcon/icon_08-01.png';
import Icon25 from '../images1/flip/office/slideIcon/icon_09-01.png';
import Icon26 from '../images1/flip/office/slideIcon/icon_10-01.png';
import Icon27 from '../images1/flip/office/slideIcon/icon_11-01.png';
import Icon28 from '../images1/flip/office/slideIcon/icon_12-01.png';
import Icon29 from '../images1/flip/office/slideIcon/icon_13-01.png';
import Icon30 from '../images1/flip/office/slideIcon/icon_14-01.png';
import Icon31 from '../images1/flip/office/slideIcon/icon_15-01.png';
import Icon32 from '../images1/flip/office/slideIcon/icon_16-01.png';
import Icon33 from '../images1/flip/office/slideIcon/綠色辦公1-多搭大眾運輸5.png';
import Icon34 from '../images1/flip/office/slideIcon/綠色辦公2-開車選擇共乘6.png';
import Icon35 from '../images1/flip/office/slideIcon/綠色辦公14-飲水機定時器13.png';
import Icon36 from '../images1/flip/office/slideIcon/綠色辦公15-定期維護設備2.png';
import Icon37 from '../images1/flip/office/slideIcon/綠色辦公17-提升隔熱設計4.png';
import Icon38 from '../images1/flip/office/slideIcon/綠色辦公20-使用雨水撲滿1314.png';


const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function FlipOffice(props) {
    let history = useHistory()


    const collector = sessionStorage.getItem("userGuid") || "";

    var serialize = require('serialize-javascript');

    const [tipsData, setTipsData] = useState([]);
    const [content, setContent] = useState("");
    const [themeId] = useState("4");



    //主副標題&小撇步
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${props.SSL}//${props.domain}/api/api/GreenLife/Page/Understand`, {
            method: 'POST',
            body: serialize({
                ThemeId: themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setTipsData(result.resultObject)
                setContent(result.resultObject.content)
            });
    }, [props.SSL, props.domain, serialize, themeId]);

    //點閱計數API
    useEffect(() => {
        clickRecord("24CD53BA-E8A3-4D78-9A96-D452B42A024D", "4", collector)
    }, [collector]);


    return (
        <>
            <BreadCrumb currentPage={"綠色辦公 (上班夠綠)"} />
            <AddPoint roleId="1" targetGuid="24CD53BA-E8A3-4D78-9A96-D452B42A024D" roleItemId="13" autoAdd={true} />
            <img alt="綠色辦公-橫幅" title="綠色辦公-橫幅" className="w-100" src="../../../images/flip/office/topBanner.jpg" />
            <div className="container containerBox flip-office">
                <div className="d-flex top-logo justify-content-start">
                    {/* <img src="images/flip/office/officeLogo.png" /> */}
                    <div className="flip-title">
                        <h1 className="boldText tour-top-title">{tipsData.title}</h1>
                        <p><span className="boldText title-font tour-top-subtitle">{tipsData.subTitle}</span></p>
                    </div>
                </div>

                <div className="detail-info">
                    <div>
                        <h2><span className="boldText title-font tour-sub-title">綠色辦公</span></h2>
                        <div className="d-flex row">
                            <div className="inner-article col-12 col-md-8  col-lg-6">
                                {htmlParse(content)}
                            </div>
                            <img className="col-12 col-md-4  col-lg-6" height="100%" width="100%" src="../../../images/flip/office/officePic.svg" alt="綠色辦公" title="綠色辦公" />
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="title-with-line">你可以這樣選</h3>
                        <div className="choose-box-wrapper">

                            <Link className="choose-box office" to="/categories/green_office/steps">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={manImg} alt="" /></div>
                                    <div className="flip-icon-text">
                                        我要響應綠色辦公
                                        <span id="a"></span>
                                        {/* <span id="b">近期開放</span> */}
                                    </div>

                                </div>
                            </Link>

                            <HashLink className="choose-box office" to="/categories/green_office#point">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={checkImg} alt="" /></div>
                                    <div className="flip-icon-text">檢視響應指標及措施</div>
                                </div>
                            </HashLink>
                            <HashLink className="choose-box office" to="/categories/green_office#partner">
                                <div className="box-inner">
                                    <div className="flip-icon-wrapper"><img src={watchImg} alt=""></img></div>
                                    <div className="flip-icon-text">綠色辦公響應現況</div>
                                </div>
                            </HashLink>

                        </div>


                    </div>

                    <div className="content-section">
                        {/* <div className="d-flex tour-subtitle mt-2"><img className="subtitle-icon" src={tipsIcon} alt="綠色旅遊小撇步" title="綠色旅遊小撇步" /><span className="boldText title-font tour-subtitle">綠色旅遊小撇步</span></div> */}
                        <h3 className="title-with-line">你可以這樣做</h3>
                        <div className="tips-list-tour row">
                            <DownloadCarouselFlip computer={6} mobile={3} sigleWidth={115} infiniteLoop>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon17} /><li>採用視訊會議</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon18} /><li>辦公推無紙化  </li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon19} /><li>資料雙面印刷</li></div></div>

                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon20} /><li>採購環保產品</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon21} /><li>採綠牆綠屋頂</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon22} /><li>植栽綠化環境</li></div></div>

                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon23} /><li>自備餐盒用餐</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon24} /><li>減少餐飲外送</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon25} /><li>節約用水用電</li></div></div>

                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon26} /><li>調低螢幕亮度</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon27} /><li>設置節能模式</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon28} /><li>室內控溫26 ℃</li></div></div>

                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon29} /><li>減少搭乘電梯</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon30} /><li>安裝省水龍頭</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon31} /><li>減少開公務車</li></div></div>

                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon33} /><li>多搭大眾運輸</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon34} /><li>開車選擇共乘</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon35} /><li>飲水機定時器</li></div></div>

                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon36} /><li>定期維護設備</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon37} /><li>提升隔熱設計</li></div></div>
                                <div className="outter-wrapper-office"><div className="link-wrapper"><img alt="" src={Icon38} /><li>使用雨水撲滿</li></div></div>

                            </DownloadCarouselFlip>
                        </div>
                    </div>

                    <div className="content-section">
                        <h3 className="title-with-line">綠色辦公資訊</h3>
                        <div className="d-flex justify-content-center">

                            {/* <DownloadCarouselFlip computer={4} mobile={1} infiniteLoop sigleWidth={345}> */}
                            <Link className="flip-rec-card card" as={Link} to='/knowledge/info?2E50C694-3474-47B4-8EB6-2EFFB7A63635'>
                                <img className="ev-detail-img" src="\images\knowledge\2E50C694-3474-47B4-8EB6-2EFFB7A63635.jpg" alt="綠色辦公-環保署小學生的逆襲" title="綠色辦公-環保署小學生的逆襲" />
                                <div className="flip-kn-text">
                                    <div className="rec-time">
                                        <h6>2021/04/09</h6>
                                    </div>
                                    <div>
                                        <h6 className="flip-kn-title">綠色辦公-環保署小學生的逆襲</h6>
                                    </div>
                                </div>
                            </Link>

                            {/* </DownloadCarouselFlip> */}
                        </div>
                    </div>


                </div>

                {/* <div className="col-sm-10 col-md-4 col-lg-4 joinBtn">參加綠色辦公</div> */}
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(FlipOffice);
