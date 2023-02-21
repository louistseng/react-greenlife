import React, { useState, useEffect, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { detectMob, checkLogin_and_redirect } from '../../utils/Functions';
import Sticky from 'react-stickynode';
import { Form } from 'react-bootstrap';
import '../css/NavBar.scss';
import FontSizeChanger from 'react-font-size-changer';
import { isWebpSupported } from "react-image-webp/dist/utils";

import CheckLoginAndRedirect from '../CheckLoginAndRedirect';
import { AuthContext } from '../../utils/Context';
import greenLogo from "../../images1/green-logo.PNG";
import greenLogoWebp from "../../images1/en_green_logo.png";
// import fontIcon from "../images1/about/u70.png";
import homeIcon from '../../images1/about/u84.png';
import aboutIcon from '../../images1/navBar/about.png';
import activityIcon from '../../images1/navBar/activity.png';
import greenIcon from '../../images1/navBar/green.png';
import verifyIcon from '../../images1/navBar/verify.png';
import videoIcon from '../../images1/navBar/film.png';
import greenManNav from '../../images1/greenMan/greenManNav.png';

function EnglishNavBar() {

    //google站內搜尋
    useEffect(() => {
        const includeScript = () => {
            var cx = '7a502e0e8f34030f9';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        }
        includeScript();

    }, []);

    const keyPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            window.location.replace(`/search?q=${e.target.value}`);
            return false;
        }
    }

    const [dropDown, setDropDown] = useState(true);
    const [keyWord, setKeyWord] = useState("");
    const [gotoUrl, setGotoUrl] = useState("");

    const showMemberBtn = sessionStorage.getItem("userGuid");
    const { contextMemberInfo } = useContext(AuthContext);

    const headPic = contextMemberInfo?.headPic

    return (
        <>

            <Sticky innerZ={100} enabled={true} top={0} bottomBoundary={0}>
                {gotoUrl &&
                    <CheckLoginAndRedirect key={gotoUrl} gotoUrl={gotoUrl} />
                }
                <nav className="nav-top">
                    <div className="top-dflex">

                        <div className="green-logo">
                            <Link as={Link} to="/en_Main"><img src={isWebpSupported() ? greenLogoWebp : greenLogo} alt="National Green Life Movement LOGO" title="National Green Life Movement LOGO" /></Link>
                        </div>

                        <form className="form-inline-ori">
                            <ul className="nav-top-ul font">
                                <a className="skip-nav" href="#" title="網站搜尋" accessKey="s">:::</a>
                                <div id="myDropdown" className='searchDropdown-content show'>
                                    <Form.Control onKeyPress={e => keyPress(e)} type="text" title="站內搜尋" className="search-input" placeholder="type something..." onChange={e => setKeyWord(e.target.value === "" ? " " : e.target.value)} />
                                    <Link className="searchBtn-kn" to={`/search?q=${keyWord}`} id="searchBtn" title="searchBtn" aria-labelledby="searchBtn" ><i className="fas fa-search" aria-labelledby="searchBtn"></i></Link>

                                </div>
                                {/* </div> */}

                                <div className="font-changer d-inline-block" style={{ right: "0", width: "100px", }}>
                                    <FontSizeChanger
                                        targets={['#target']}
                                        onChange={(element, newValue, oldValue) => {
                                        }}
                                        options={{
                                            stepSize: 1,
                                            range: 1
                                        }}
                                        customButtons={{
                                            down: <span style={{ 'fontSize': '28px', "cursor": "pointer" }}>A-</span>,
                                            up: <span style={{ 'fontSize': '28px', "cursor": "pointer" }}>A+</span>,
                                            style: {
                                                backgroundColor: 'transparent',
                                                color: 'grey',
                                                border: 'none',
                                                WebkitBoxSizing: 'border-box',
                                                WebkitBorderRadius: '5px',
                                                width: '30px'
                                            },
                                            buttonsMargin: 10
                                        }}
                                    />
                                </div>
                                <a className="skip-nav" href="#" title="site_map" accessKey="u">:::</a>
                                <Link as={Link} to="/en_Main" title="">
                                    <li className="d-block nav-top-li border-left">
                                        <img src={homeIcon} alt="Home icon"></img>
                                        <p title="Home">HOME</p>
                                    </li>
                                </Link>
                                <Link as={Link} to="/en_SiteNav" title="">
                                    <li className="d-block nav-top-li">
                                        <i className="far fa-compass" aria-labelledby="siteNav"></i>
                                        <p title="Sitemap">SITEMAP</p>
                                    </li>
                                </Link>
                            </ul>
                            <div className="d-flex justify-content-center align-items-center nav-top-ul">
                                <Link to="/about"><button style={{ backgroundColor: "#6CB15E", color: "#fff", border: "none", borderRadius: "10px", padding: "8px 14px", margin: "0px 5px 0 20px", fontSize: "calc(10px + 1vw)", fontWeight: "600" }}>中</button></Link>
                            </div>
                        </form>
                    </div>
                </nav>
                <div className={dropDown ? 'topnav-ori' : 'topnav-ori responsive'}>
                    <div className="dropdown-drop">
                        <Link to="/en_About">
                            <button className="dropbtn">
                                <img className="nav-img" src={aboutIcon} alt="Abou tGreen Life icon" />
                                <div>About Green Life</div>
                            </button>
                        </Link>
                    </div>
                    <div className="dropdown-drop">
                        <button className="dropbtn verify">
                            <img className="nav-img" src={verifyIcon} alt="What We Do icon" />
                            <div>What We Do</div>
                        </button>
                        {(!dropDown || !detectMob()) &&
                            <div className="dropdown-menu-ori nav-item-drop none">
                                <Link as={Link} onClick={() => setDropDown(true)} to="/en_FlipTour" className="nav-aniBtn" >Green Travel</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} to="/en_FlipFood" className="nav-aniBtn" >Green Dining</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} to="/en_FlipShopping" className="nav-aniBtn" >Green Consumption
                                    {(!dropDown || !detectMob()) &&
                                        <div className="dropdown-menu-ori-item nav-item-drop none">
                                            <Link as={Link} onClick={() => setDropDown(true)} to="/en_Mark" className="nav-aniBtn">Green Mark</Link>
                                            <Link as={Link} onClick={() => setDropDown(true)} to="/en_Procurement" className="nav-aniBtn">Green Procurement</Link>
                                        </div>}
                                </Link>
                                <Link as={Link} onClick={() => setDropDown(true)} to="/en_FlipHome" className="nav-aniBtn" >Green Home</Link>
                                <Link as={Link} onClick={() => setDropDown(true)} to="/en_FlipOffice" className="nav-aniBtn" >Green Office</Link>
                            </div>}
                    </div>
                    <a href="#" className="icon icon-bar" title="bar" id="bar" onClick={() => setDropDown(false)}>
                        <i className="fa fa-bars" aria-labelledby="bar"></i>
                    </a>
                    <div className={dropDown ? "drop-first-layer" : "drop-first-layer show"}>
                        <div className="w-100">
                            <Form.Control className="search-input" placeholder="type something.." title="search" onBlur={e => setKeyWord(e.target.value === "" ? " " : e.target.value)} />
                            <Link className="searchBtn-kn-nav" to={`/search?q=${keyWord}`} id="searchBtn" title="searchBtn" aria-labelledby="searchBtn" ><i className="fas fa-search" aria-labelledby="searchBtn"></i></Link>
                        </div>
                    </div>
                    <a href="#" className="icon icon-cancel" title="cancel" id="cancel" onClick={() => setDropDown(true)}>
                        <i className="fas fa-times" aria-labelledby="cancel"></i>
                    </a>
                </div>

            </Sticky>
            <div className={dropDown ? "aside-backdrop" : "aside-backdrop show"} onClick={() => setDropDown(true)}></div>
        </>
    );
}

export default EnglishNavBar;