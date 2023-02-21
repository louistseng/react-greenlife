import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import './Point.scss';


const Points = React.lazy(() => import('../../Components/GreenPoint/Points'));
const Regular = React.lazy(() => import('../../Components/GreenPoint/Regular'));
const Theme = React.lazy(() => import('../../Components/GreenPoint/Theme'))

function PointMission(props) {

    let history = useHistory()
    let SSL = props.SSL
    let domain = props.domain

    const params = new URLSearchParams(history.location.search);
    const [typeId, setTypeId] = useState(params.get('type'));

    const [greenlifeCookies] = useCookies([]);
    const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MzEzMzA4NDgsIm5iZiI6MTYzMTMyOTA0OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiZGI4OTYyZTMtZjlhNy00ODdkLThiMjQtZWRiMWEyYWZkNzg4In0.3GK2_HIBLhqSZkAc0yFJ3lReAXhxIbJ0krnH4V36TGtWUfRDrt49yj7oSTkWpJl19zMNy5s_s9315VV87AYi_Q";


    //會員功能api的header
    var myHeaders = new Headers({
        "Content-Type": "application/json; charset=utf-8",
        "Token": memberToken
    });

    //抓URL改變,例如上一頁(history.push)
    //  const location = useLocation();
    // useEffect(() => {
    //     setTypeId(params.get('type'))
    // }, [location]);

    //我的綠積分任務-頁籤
    const [bookMark, setBookMark] = useState([]);

    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Point/Tag`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                // if(result.isSucess)
                setBookMark(result.resultObject)

            })
    }, [])

    //我的綠積分任務-常態性任務-里程碑任務-主題特殊任務
    const [missionData, setMissionData] = useState([]);
    const [bingoTopics, setBingoTopics] = useState([]);
    const [findTopics,setFindTopics] = useState([])
    useEffect(() => {
        // console.log(typeId)     
        //常態性任務
        if (typeId)
            fetch(`${SSL}//${domain}/api/api/Point/Mission/${typeId}`, {
                method: 'GET',
                headers: myHeaders
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.isSucess)
                    // console.log(result)
                setMissionData(result.resultObject)
            })

        //Bingo主題任務題目
        // /ThemeTask/Bingo/Topic
        if (typeId === "2")
        //    fetch(`${SSL}//${domain}/api/api/Bingo/Index`, {
        //         method: 'GET',
        //         headers: myHeaders
        //     })
        //         .then(res => {
        //             return res.json();
        //         }).then(result => {
        //             // console.log(result)
        //             setBingoTopics(result.resultObject.topics)
        //         })     
                 
            //找碴主題任務題目
            fetch(`${SSL}//${domain}/api/api/ThemeTask/FindFault/Topic`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => {
                    return res.json();
                }).then(result => {
                    console.log("result",result)
                    setFindTopics([result.resultObject.topicList][0])
                })

    }, [typeId])

    useEffect(()=>{
         // 進行中的主題任務
            // fetch(`${SSL}//${domain}/api/ThemeTask/Index`, {
            // method: 'GET',
            // headers: myHeaders
            // })
            //     .then(res => {
            //         return res.json();
            // }).then(result => {
            //     console.log(result)
            //     setTaskIndex(result.resultObject)
            // })  
    },[])

    return (
        <>
            <div className="col-12 col-lg-8 green-points">
                <Points memberToken={memberToken} />
                {/* 選常態任務或主題任務的頁籤 */}
                <div className="point-bookmark-section">
                    <div className="bookmark-wrapper">
                        {/*先隱藏主題任務頁籤，只先顯示常態任務頁籤，之後拿掉slice(0,1)就可以顯示全部頁籤 */}
                        {bookMark.slice(0,1).map((data, index) =>
                            <div
                                key={index}
                                onClick={() => {
                                    setTypeId(String(data.id));
                                    history.push(`/member/point_mission?type=${data.id}`)
                                }}
                                className={typeId === String(data.id) ? "bookmark mission_focus" : "bookmark"}>
                                <h5>{data.name.split("性")}</h5>
                            </div>

                        )}

                        {/* <div
                                // key={index}
                                onClick={() => {
                                    // setTypeName(data.typeName)
                                    // setTypeHref(decodeURIComponent(data.typeHref))
                                    setTypeId("2");
                                    history.push(`/member/point_mission?type=2`)
                                }}
                                className={typeId === "2" ? "bookmark mission_focus" : "bookmark"}>
                                <h5>里程碑任務</h5>
                            </div> */}
                              {/* <div
                                // key={index}
                                onClick={() => {
                                    // setTypeName(data.typeName)
                                    // setTypeHref(decodeURIComponent(data.typeHref))
                                    setTypeId("3");
                                    history.push(`/member/point_mission?type=3`)
                                }}
                                className={typeId === "3" ? "bookmark mission_focus" : "bookmark"}>
                                <h5>主題特殊任務</h5>
                            </div> */}
                    </div>
                </div>
                {/* 常態性任務 */}
                {typeId === "1" && missionData.length > 3 && <Regular key={missionData} missionData={missionData} />}
                {/* 主題性任務 */}
                {/* bingoTopics={bingoTopics}  */}
                {typeId === "2" && <Theme findTopics={findTopics}/> }
                {/* {typeId === "2" &&  <ThemeTask findTopics={findTopics}/> } */}
            </div>




            {/* </div>


            <Footer /> */}

        </>
    );
}

export default withRouter(PointMission);