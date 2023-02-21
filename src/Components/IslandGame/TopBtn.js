import React from 'react';
import { useHistory } from 'react-router-dom';
import achievementsBtn from '../../../src/images1/GreenGame/GamePage/btnBg.svg';


function TopBtn(props) {
    const { setChooseShow, btnText } = props;

    let history = useHistory();

    const goBack = () => {
        if (btnText === "查看個人成就") {
            history.push("/achievementPage")
        }
        if (btnText === "返回地圖") {
            history.goBack(-1)
        }
    }

    return (
        <>
            <div>
                <div className="achievements-btn">
                    <img src={achievementsBtn} alt="achievements-btn" className="" />
                    <div className="achievements-btn-text" onClick={() => goBack()}>{btnText}</div>
                </div>
                <div className="change-game-btn" onClick={() => setChooseShow(true)}>
                    <img src={achievementsBtn} alt="" className="" />
                    <div className="change-game-btn-text">選擇遊戲</div>
                </div>
            </div>
        </>
    )
}
export default TopBtn;