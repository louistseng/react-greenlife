import React from 'react';
import greenMan from "../images1/greenMan/greenMan.png";
import './css/ComfirmAlert.scss';

function ComfirmAlertDL(props) {
    return (

        <div className='custom-ui react-confirm-alert-body alert-wrapper'>
            <div className="img-title-wrapper">
                <div>
                    <img src={greenMan} alt="綠寶圖示" />
                </div>
                {props.zipLoad &&
                    <h4>正在壓縮{props.totalCount}個項目</h4>
                }
                {props.showDialog &&
                    <h4>{props.showText}</h4>
                }
            </div>
        </div>

    );
}
export default ComfirmAlertDL;