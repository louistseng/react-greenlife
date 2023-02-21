import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../Member/GreenPoint/Point.scss';
import { AuthContext } from '../../utils/Context';

function Points(props) {

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": props.memberToken
    });
    var myFriendHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8"
    });

    const [pointScore, setPointScore] = useState([])
    const { contextFriendGuid } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0)
        const urlToken = `${SSL}//${domain}/api/api/Point/Report`
        const urlGuid = `${SSL}//${domain}/api/api/Point/Report/${contextFriendGuid || props.collector}`
        // if (window.location.hostname !== "localhost")
        fetch(urlGuid, {
            method: 'GET',
            headers: contextFriendGuid ? myFriendHeaders : myHeaders
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                // console.log(urlGuid)
                setPointScore(result.resultObject)
            });
    }, [SSL, domain, contextFriendGuid])

    return (
        <>
            <div className="total-pointBanner">
                {props.withoutTitle && <h3 className="point-section-title">綠生活任務</h3>}
                <div className="score-board-wrapper">
                    {/* <div className="score-board">
                        <h5 className="board-title">我的總綠積分</h5>
                        <h3 key={pointScore?.totalPoint} className="top-big-score">{pointScore?.totalPoint}</h3>
                        <div className="totleScore-link-wrapper">
                            <Link to="/member/point_mission/record" className="link-bottomLine">詳細紀錄查詢</Link>
                            <h5 className="board-title">分</h5>
                        </div>
                    </div> */}
                    {/* <div className="score-board">
                        <h5 className="board-title">目前剩餘</h5>
                        <h3 className="top-big-score">{pointScore?.remainPoint}</h3>
                        <h5 className="board-title align-end">分</h5>
                    </div> */}
                    <div className="score-board">
                        <h5 className="board-title">目前剩餘綠積分</h5>
                        <h3 key={pointScore?.totalPoint} className="top-big-score">{pointScore?.remainPoint}</h3>
                        <div className="totleScore-link-wrapper">
                            <Link to="/member/point_mission/record" className="link-bottomLine">詳細紀錄查詢</Link>
                            <h5 className="board-title">分</h5>
                        </div>
                    </div>
                    <div className="score-board">
                        <h5 className="board-title">本日取得綠積分</h5>
                        <h3 key={pointScore?.todayPoint} className="top-big-score">＋{pointScore?.todayPoint}</h3>
                        <h5 className="board-title align-end">分</h5>
                    </div>
                </div>

            </div>


        </>
    );
}
export default Points;