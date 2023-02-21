import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './css/ComfirmAlert.scss';
import greenMan from "../images1/greenMan/greenMan.png";
import verifyLogo from '../images1/greenLogo.gif';

export default class ComfirmAlert extends React.Component {


    constructor(props) {
        super(props);
        let domain = window.location.hostname === "localhost" ? 'greenlife.eri.com.tw' : 'greenlife.epa.gov.tw'
        const options = {

            childrenElement: () => <div />,
            customUI: ({ onClose }) => {
                return (
                    <>
                        <div className='custom-ui react-confirm-alert-body' style={(props.showNote || props.tempForMain) && { width: "100%" }}>
                            <div className="close-icon"
                                onClick={() => {
                                    onClose();
                                }}
                                onKeyPress={() => {
                                    onClose();
                                }}
                                tabIndex={0}
                            ><i className="fas fa-times-circle" aria-hidden="true" alt="關閉圖示"></i></div>
                            <div className="img-title-wrapper">
                                <div>
                                    <img src={greenMan} alt="綠寶圖片" />
                                </div>
                                <p className={props.tempForMain ? "alertTitle_forMain" : ""}>{this.props.alertTitle}</p>
                            </div>
                            <p className="comfirmAlert-subTitle">{this.props.subTitle || "歡迎加入 享更多會員專屬功能 !"}</p>
                            {props.showNote &&
                                <div className="org-comfirmAlert-note">
                                    <div className="alert-content-wrapper">
                                        <h4>如您已於「綠色生活資訊網」具備帳號</h4>
                                        <div className="note-btn-wrapper">
                                            <div className="alert-btn-wrapper">
                                                <h4>請點擊</h4>
                                                <button
                                                    className="comfirm-btn"
                                                    onClick={() => {
                                                        this.props.history.push({ pathname: "/login", state: { goHere: this.props.goHere } })
                                                        onClose();
                                                    }}
                                                    onKeyPress={() => {
                                                        this.props.history.push({ pathname: "/login", state: { goHere: this.props.goHere } })
                                                        onClose();
                                                    }}
                                                    tabIndex={0}
                                                >我要登入
                                                </button>
                                                <h4>，</h4>
                                            </div>
                                            <div className="alert-btn-wrapper">
                                                <h4>並選擇</h4>
                                                <a href={domain.includes('greenlife.epa.gov.tw') ? "https://greenliving.epa.gov.tw/GreenLife/Anonymous/LoginGreenLife.aspx" : "https://greenliving.eri.com.tw/GreenLife/Anonymous/LoginGreenLife.aspx"} className="greenliving_login_comfirmAlert" title="綠色生活資訊網帳號同步鏈結"><img src={verifyLogo} alt="" className="rwd-width" /><h5>綠色生活資訊網</h5></a>
                                            </div>
                                        </div>
                                        <h4>可進行帳號同步。</h4>
                                    </div>
                                </div>
                            }
                            {/* {props.tempForMain &&
                                <div>
                                    <a
                                        className="comfirm-btn-forMain"
                                        onClick={() => {
                                            onClose();
                                        }}
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSfs0eoJ3-B6klu3KaKP28uSAsfQnCyqAShnyr_3Qd0_CY0Vew/viewform" target="_blank" rel="noreferrer noopener" title="客服需求單(另開視窗)">客服需求單
                                    </a>
                                </div>
                            } */}

                            {props.showLoginBtn &&
                                <div className="react-confirm-alert-button-group">
                                    <button
                                        className="comfirm-btn"
                                        onClick={() => {
                                            this.props.history.push({ pathname: "/login", state: { goHere: this.props.goHere } })
                                            onClose();
                                        }}
                                        onKeyPress={() => {
                                            this.props.history.push({ pathname: "/login", state: { goHere: this.props.goHere } })
                                            onClose();
                                        }}
                                        tabIndex={0}
                                    >我要登入
                                    </button>
                                    <button
                                        className="goLogin-btn"
                                        onClick={() => {
                                            this.props.history.push('/Policy')
                                            onClose();
                                        }}
                                        onKeyPress={() => {
                                            this.props.history.push({ pathname: "/login", state: { goHere: this.props.goHere } })
                                            onClose();
                                        }}
                                        tabIndex={0}
                                    >
                                        立即加入
                                    </button>
                                </div>
                            }
                        </div>
                    </>
                );
            },
        };

        confirmAlert(options);
    }



    render() {
        return (
            <div className=''>

            </div>
        );
    }
}