import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import ComfirmAlert from '../Components/ComfirmAlert';

function IsOrgAuth(props) {
    const cookies = new Cookies();
    const [memberToken, setMemberToken] = useState(window.location.hostname.length > 10 ? cookies.get('refreshToken') : "");


    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");


    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} showLoginBtn={true} history={props.history} />
            }
        </>
       
    )
}

export default IsOrgAuth;
