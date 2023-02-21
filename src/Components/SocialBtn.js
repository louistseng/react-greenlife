import React, { useState } from 'react';
import './css/SocialBtn.scss';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';
import lineIcon from '../images1/share/line.png';
import facebookIcon from '../images1/share/facebook.png';
import heartIcon from '../images1/share/heart.png';
import emailIcon from '../images1/share/email.png';
import twitterIcon from '../images1/share/twitter.png';

const AddPoint = React.lazy(() => import('../Components/AddPoint'));

function SocialBtn(props) {

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var serialize = require('serialize-javascript');
    //alert提醒視窗顯示
    const [showDialog, setShowDialog] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [greenlifeCookies] = useCookies([]);
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjYwNjA0MDksIm5iZiI6MTYyNjA1ODYwOSwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiNTEwNTIwOTQwOTQ5Njk4NSJ9.KJzv8bV8hg_BGW_S2yHaZgRPY1__9pMFSDyhgzxU7OKNAAvi3UpYyofejafVnjGaJ1CaZ5wkRAZ3RtrJ31uh-A";

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "UserGuid": props.collector,
        "Token": memberToken
    });


    // //收藏按鈕
    const handleHeart = () => {
        // alert('近期開放~')
        // console.log(props)
        // console.log(track)
        //確認是否收藏
        if (props.activityGuid && props.collector) {
            fetch(`${SSL}//${domain}/api/api/Common/Collect/Check`, {
                method: 'POST',
                body: serialize({
                    Guid: props.activityGuid,
                }),
                headers: myHeaders
            }).then(res => {
                return res.json();
            }).then(result => {
                console.log(result)
                if (result.isSucess) {
                    if (result.resultObject) {
                        setShowDialog(true)
                        setAlertTitle("收藏過囉~")
                        setTimeout(function () {
                            setAlertTitle("收藏過囉~ ")
                        }, 100)
                    } else {
                        fetch(`${SSL}//${domain}/api/api/Common/Collect`, {
                            method: 'POST',
                            body: JSON.stringify({
                                Guid: props.activityGuid,
                                TypeId: props.collectTypeId,
                            }),
                            headers: myHeaders
                        }).then(res => {
                            // console.log(res)
                            if (res.ok) {
                                setShowDialog(true)
                                setAlertTitle("已加入收藏!")
                            }
                        })
                    }
                }
            })
        } else {
            setShowDialog(true)
            setAlertTitle("請先登入喔~")
            setTimeout(function () {
                setAlertTitle("請先登入喔~ ")
            }, 100)
        }
    }

    const [autoAdd, setAutoAdd] = useState(false);
    const clickAndAddPoint = () => {
        setAutoAdd(true)
        // AddPointAndGetPointAmount(memberToken, props.roleId, props.targetGuid, props.roleItemId)
    }

    return (
        <>
            {showDialog &&
                <ComfirmAlert key={alertTitle} alertTitle={alertTitle} subTitle=" " showLoginBtn={alertTitle.includes("請先登入喔~") && true} history={props.history} />
            }
            <div className={`${props.myStyle}` + ' socailBtn-wrapper'} >
                <AddPoint key={autoAdd} roleId={props.roleId} targetGuid={props.activityGuid} roleItemId={props.roleItemId} autoAdd={autoAdd} />
                <p className="socialBtn-share-text" style={{ width: "10%" }}>分享</p>
                <a onClick={clickAndAddPoint} title="line分享(另開視窗)" target="_blank" rel="noopener noreferrer" href={`http://line.naver.jp/R/msg/text/?大家跟我一起用Line分享吧!%0D%0A${SSL}//${domain}/${props.url}`}>
                    <img className="socailbtn-icon" src={lineIcon} alt="line分享" />
                </a>

                <a onClick={clickAndAddPoint} title="facebook分享(另開視窗)" target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${SSL}//${domain}/${props.url}`} className="fb-xfbml-parse-ignore">
                    <img className="socailbtn-icon" src={facebookIcon} alt="facebook分享" />
                </a>

                <a onClick={clickAndAddPoint} title="twitter分享(另開視窗)" target="_blank" rel="noopener noreferrer" className=""
                    href={`https://twitter.com/intent/tweet?url=${SSL}//${domain}/${props.url}`}
                >
                    <img className="socailbtn-icon" src={twitterIcon} alt="twitter分享" />
                </a>

                <a onClick={clickAndAddPoint} title="email分享(另開視窗)" target="_blank" rel="noopener noreferrer" href={`mailto:?subject=${props.title}&amp;body=${SSL}//${domain}/${props.url}`}>
                    <img className="socailbtn-icon-mail" src={emailIcon} alt="email分享" />
                </a>

                <div className="socailbtn-icon-printer" title="列印"
                    onClick={() => {
                        clickAndAddPoint()
                        props.handlePrint()
                    }}
                    onKeyPress={() => {
                        clickAndAddPoint()
                        props.handlePrint()
                    }}
                    tabIndex={0}
                >
                    <i className="fas fa-print" aria-hidden="true" alt="列印圖示"></i>
                </div>
                {props.hideHeart ||
                    <div onClick={handleHeart} onKeyPress={handleHeart} tabIndex={0}>
                        <img className="socailbtn-icon" src={heartIcon} alt="收藏" />
                    </div>}
            </div>
            {/* onClick={handleHeart} */}
        </>
    )


}
export default SocialBtn;