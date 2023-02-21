import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';
import { useHistory } from 'react-router-dom';
import './css/ComfirmAlert.scss';
import { AddPointAndGetPointAmount } from '../utils/API';

//給綠積分
function AddPoint(props) {

    let history = useHistory()

    const [greenlifeCookies] = useCookies([]);
    const memberToken = greenlifeCookies.refreshToken || "";
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [userMsg, setUserMsg] = useState("");
    const [getPoint, setGetPoint] = useState(false);

    //查看頁面自動加綠積分
    useEffect(() => {
        console.log(props.autoAdd)
        props.autoAdd && AddPointAndGetPointAmount(memberToken, props.roleId, props.targetGuid, props.roleItemId, setGetPoint, setUserMsg)
    }, [])

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} showLoginBtn={alertTitle === "請先登入喔~" && true} history={history} />
            }
            <div className="getPoint-wrapper">
                {getPoint && <p className="getPoint-tooltip">{userMsg}</p>}
                {/* <h4 className="getPoint-tooltip">+綠積分</h4> */}
            </div>
        </>
    );
}

export default AddPoint;