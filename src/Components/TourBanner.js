import React from 'react';
import { Link } from 'react-router-dom';
import { isWebpSupported } from "react-image-webp/dist/utils";
import bannerAccommodationJpg from "../images1/accommodation/gt_bg.jpg";
import bannerAccommodationWebp from "../images1/accommodation/gt_bg.webp";


function TourBanner(props) {

    let url = window.location.href;

    let SSL = "https:";
    let domain = window.location.hostname.includes("localhost") || window.location.hostname.includes("eri.com.tw") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw";

    return (
        <>
            <div className={`${props.category} bigbanner mb-3`}>

                {isWebpSupported() ? <img src={bannerAccommodationWebp} alt="TourBanner" title="TourBanner" /> : <img src={bannerAccommodationJpg} alt="TourBanner" title="TourBanner" />}
                {/* <Image
                    src={bannerAccommodationJpg}
                    webp={bannerAccommodationWebp}
                /> */}
                <div className="Button-wrapper">
                    <Link to={`/categories/${props.introLink}`} className={url.includes(props.introLink) ? "onfocus btn-link" : "btn-link"}>
                        <button className="bannerButton bannerButton-line col-3">
                            <i className="fas fa-binoculars" aria-hidden="true" alt={`${props.intro}圖示`}></i>
                            &nbsp;{props.intro}
                        </button>
                    </Link>
                    {url.includes(props.category) ?
                        <Link to={`/categories/${props.category}`} className={url.includes(props.category) ? "onfocus btn-link" : "btn-link"}>
                            <button className="bannerButton bannerButton-line col-3">
                                <h1 style={{ fontSize: "calc(12px + 0.6vw)", fontWeight: "600", whiteSpace: "nowrap", marginBottom: "0" }}>
                                    <i className="fas fa-search" aria-hidden="true" alt={`${props.search}圖示`}></i>
                                    &nbsp;{props.search}
                                </h1>
                            </button>
                        </Link>
                        :
                        <Link to={`/categories/${props.category}`} className={url.includes(props.category) ? "onfocus btn-link" : "btn-link"}>
                            <button className="bannerButton bannerButton-line col-3">
                                <i className="fas fa-search" aria-hidden="true" alt={`${props.search}圖示`}></i>
                                &nbsp;{props.search}
                            </button>
                        </Link>
                    }
                    <a href={`${SSL}//${domain}/GreenLife/EcoHotel/DefaultEH.aspx?m=New`} target="_blank" rel="noopener noreferrer" className={url.includes(props.join) ? "onfocus btn-link" : "btn-link"}>
                        <button className="bannerButton bannerButton-line none-line col-3">
                            <i class="fas fa-sign-in-alt" aria-hidden="true" alt="加入環保旅店圖示"></i>
                            <span>&nbsp;加入環保旅店</span>
                        </button>
                    </a>
                    <Link to={`/categories/${props.download}`} className={url.includes(props.download) ? "onfocus btn-link" : "btn-link"}>
                        <button className="bannerButton bannerButton-line none-line col-3">
                            <i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>
                            &nbsp;下載專區
                        </button>
                    </Link>
                </div>
            </div>

        </>
    );
}

export default TourBanner;