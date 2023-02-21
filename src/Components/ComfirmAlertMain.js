import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import './css/ComfirmAlert.scss';
import greenMan from "../images1/greenMan/greenMan.png";
import OutsideAlerter from './OutsideAlerter';

export default class ComfirmAlert extends React.Component {

    constructor(props) {

        let expiredDate = new Date('2021-07-10 16:00')
        let beginDate = new Date('2021-07-08')

        let alertExpiredDate = new Date('2021-07-06 23:59')
        let alertBeginDate = new Date('2021-07-05')

        let currentDate = new Date()

        super(props);

        const options = {

            childrenElement: () => <div />,
            customUI: ({ onClose }) => {
                return (
                    <>
                        <OutsideAlerter>
                            <div id="main-Alert" className='custom-ui react-confirm-alert-body' style={{ width: "450px" }}>
                                <a className="skip-nav" href="#" title="中央內容區塊" accessKey="c">:::</a>
                                <div className="close-icon"
                                    onClick={() => {
                                        onClose();
                                    }}
                                    onKeyPress={() => {
                                        onClose();
                                    }}
                                    tabIndex={0}
                                ><i className="fas fa-times-circle" aria-hidden="true" alt="關閉圖示"></i></div>
                                <div className="comfirm-title-wrapper with_animation">
                                    <img src={greenMan} alt="綠寶圖示" />
                                    <h2 className="comfirm-title">重要通知</h2>
                                </div>
                                <h2 className={props.tempForMain ? "alertTitle_forMain" : ""}>{this.props.alertTitle}</h2>

                                <p className="comfirmAlert-subTitle">{this.props.subTitle || "歡迎加入 享更多會員專屬功能 !"}</p>
                                {alertBeginDate < currentDate && currentDate < alertExpiredDate &&
                                    <p className="comfirmAlert-subTitle" >因系統服務廠商於7/5、7/6進行辦公室搬遷作業，可能影響系統客服專線，請多加利用「線上客服需求單」，造成不便敬請見諒</p>}
                                <div className="d-flex">
                                    <a
                                        className="comfirm-btn-forMain"
                                        onClick={() => {
                                            onClose();
                                        }}
                                        onKeyPress={() => {
                                            onClose();
                                        }}
                                        tabIndex={0}
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSfs0eoJ3-B6klu3KaKP28uSAsfQnCyqAShnyr_3Qd0_CY0Vew/viewform"
                                        target="_blank" rel="noreferrer noopener"
                                    >客服需求單
                                    </a>
                                    <div
                                        className="cancel-btn-forMain"
                                        onClick={() => {
                                            onClose();
                                        }}
                                        onKeyPress={() => {
                                            onClose();
                                        }}
                                        tabIndex={0}
                                    >我沒有客服需求
                                    </div>
                                </div>
                            </div>
                        </OutsideAlerter>
                    </>
                );
            },
            closeOnClickOutside: false,
            afterClose: () => {
                (beginDate < currentDate && currentDate < expiredDate) && alert("為提供系統更優質穩定的服務，系統將於110年7月10日（星期六）上午10時至下午4時，進行關機維護作業，因此將無法提供服務，若造成不便敬請見諒，謝謝。")
            }
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