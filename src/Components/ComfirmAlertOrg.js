import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './css/ComfirmAlert.scss';
import greenMan from "../images1/greenMan/greenMan.png";
import verifyLogo from '../images1/greenLogo.gif';

export default class ComfirmAlertOrg extends React.Component {

    constructor(props) {
        super(props);
        let domain = window.location.hostname === "localhost" ? 'greenlife.epa.gov.tw' : 'greenlife.eri.com.tw'

        const options = {

            childrenElement: () => <div />,
            customUI: ({ onClose }) => {
                return (
                    <>
                        <div id="main-Alert" className='custom-ui react-confirm-alert-body' style={{ width: "480px" }}>
                            <div className="close-icon"
                                onClick={() => {
                                    onClose();
                                }}
                                onKeyPress={() => {
                                    onClose();
                                }}
                                tabIndex={0}
                            ><i className="fas fa-times-circle" aria-hidden="true" alt="關閉圖示"></i></div>
                            <div className="comfirm-title-wrapper">
                                <img src={greenMan} alt="綠寶圖示" />
                                <h2 className="comfirm-title">提醒您</h2>
                            </div>
                            <h2>目前帳號所屬縣市別為：<span className="city_colored">{props.city}</span></h2>
                            <div className="comfirmAlert_text_btn_wrapper">
                                <h3>若與實際狀況不符，請至</h3>
                                <a href={domain.includes('greenlife.epa.gov.tw') ? "https://greenliving.epa.gov.tw/GreenLife/Anonymous/LoginGreenLife.aspx" : "https://greenliving.eri.com.tw/GreenLife/Anonymous/LoginGreenLife.aspx"} className="greenliving_login_comfirmAlert" title="綠色生活資訊網鏈結"><img src={verifyLogo} alt="" /><h6>綠色生活資訊網</h6></a>
                                {/* <span className="greenliving_green">綠色生活資訊網</span> */}
                            </div>
                            <h3>更改地址資訊，重新登入</h3>

                            <div className="d-flex">
                                <div
                                    className="cancel-btn-forMain"
                                    onClick={() => {
                                        onClose();
                                    }}
                                    onKeyPress={() => {
                                        onClose();
                                    }}
                                    tabIndex={0}
                                >我知道了
                                </div>
                            </div>
                        </div>
                    </>
                );
            },
            closeOnClickOutside: false,
        };

        confirmAlert(options);
    }

    render() {
        return (
            <div className='container'>

            </div>
        );
    }
}