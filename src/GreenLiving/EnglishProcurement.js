import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './GreenLabel.css';
import '../../src/flipGrid//FlipTour.scss';
import { useHistory } from "react-router-dom";
import { clickRecord } from '../utils/API';
import purchaseBanner from '../images1/img/en-procurement.jpg';
import icon3D_01 from '../images1/img/icon_3D_01.png';
import icon3D_02 from '../images1/img/icon_3D_02.png';

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));
const SideBtn = React.lazy(() => import('../Components/SideBtn'));

function EnglishProcurement(props) {
    let history = useHistory()
    const collector = sessionStorage.getItem("userGuid") || "";

    //點閱計數API
    useEffect(() => {
        clickRecord("D104FC4C-FE39-43D4-9C0E-FB68EB2C4060", "23-2", collector)
    }, [collector]);

    return (
        <>
            <EnglishBreadcrumb />
            <div className=""><img src={purchaseBanner} className="w-100 banner" alt="Bnner" /></div>

            <div className="col-lg-9 col-md-12" style={{ margin: "0 auto" }}>
                <div className="container containerBox flip-mark">
                    <div className="d-flex top-logo justify-content-start">
                        <div className="flip-title">
                            <h1 className="boldText mark-top-title">GreenProcurement</h1>
                        </div>
                    </div>

                    <div className="detail-info">
                        <div className="d-flex justify-content-around align-items-center row top-side">
                            <div className="inner-article col-12">
                                <p><span className="boldText title-font mark-sub-title">Green Procurement</span></p>
                                After years of discussions and coordination, the Environmental Protection Administration, Executive Yuan added Article 96—「<span className="boldText mark-sub-title">Green Procurement</span>」—to the Government Procurement Act. This article specifies product types, preferential rates, and preferential procurement methods. It also establishes the relevant incentive regulations to encourage government agencies to implement green procurement. The 「<span className="boldText mark-sub-title">Private Enterprises and Organizations Green Procurement Program</span>」 was promoted in 2007 to encourage private enterprises and organizations to prioritize the procurement of green products.
                            </div>
                        </div>

                        <div className="content-section">
                            <h3 className="procurement-title-with-line">How Can you Choose</h3>
                            <div className="row justify-content-between col-12 procurement-link" >
                                <div className="col-lg-5 col-md-5 procurement-link-1 mt-2">
                                    <div className="content" style={{ "max-height": "350px" }}>
                                        <Link to={`/en_ProcurementInfo?type=1`}>
                                            <div className="pt-3 d-flex justify-content-center align-items-center">
                                                <img src={icon3D_01} width="50%" height="50%" alt="go to link" />
                                            </div>
                                            <div className="link-text">About Green Procurement in the public sector</div>
                                        </Link>
                                    </div>

                                    <div className="hover-content" style={{ "max-height": "350px" }}>
                                        <div className="pt-3 d-flex justify-content-center align-items-center">
                                            <h3>About Green Procurement in the public sector</h3>
                                        </div>
                                        <div className="link-text">
                                            <h6>The Rules and Regulations of Green Procurement in Taiwan</h6>
                                            <h6>E-declaration for Green Procurement</h6>
                                        </div>
                                        <Link to="/en_ProcurementInfo?type=1" className="content-btn">Read More</Link>
                                    </div>
                                </div>

                                <div className="col-lg-5 col-md-5 procurement-link-1 mt-2">
                                    <div className="content" style={{ "max-height": "350px" }}>
                                        <Link to={`/en_ProcurementInfo?type=2`} title="go to link">
                                            <div className="pt-3 d-flex justify-content-center align-items-center">
                                                <img src={icon3D_02} width="50%" height="50%" alt="go to link" />
                                            </div>
                                            <div className="link-text">About Green Procurement for private enterprises and organizations</div>
                                        </Link>
                                    </div>

                                    <div className="hover-content" style={{ "max-height": "350px" }}>
                                        <div className="pt-3 d-flex justify-content-center align-items-center">
                                            <h3>About Green Procurement for private enterprises and organizations</h3>
                                        </div>
                                        <div className="link-text">
                                            <h6>Green Procurement for private enterprises and organizations</h6>
                                        </div>
                                        <Link to="/en_ProcurementInfo?type=2" className="content-btn">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(EnglishProcurement);
