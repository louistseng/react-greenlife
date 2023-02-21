import React, { useState, useLayoutEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ComfirmAlert from './ComfirmAlert';

function CheckLoginAndRedirect(props) {
    let history = useHistory()
    const isLogin = sessionStorage.getItem("userGuid");

    useLayoutEffect(() => {
        if (isLogin) {
            history.push(props.gotoUrl)
        }
    }, [props.gotoUrl]);

    return (
        !isLogin && <ComfirmAlert alertTitle="請先登入喔~" showLoginBtn={true} history={history} goHere={props.gotoUrl} />
    );

}

export default CheckLoginAndRedirect;