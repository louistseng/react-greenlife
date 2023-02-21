import React, { useEffect, useState } from 'react';
import '../../Member/GreenPoint/Point.scss';
import { useCookies } from "react-cookie";

//作答渲染
function Circle(props) {
  let SSL = "https:";
  let domain = window.location.hostname;
  if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

  var serialize = require('serialize-javascript');
  const [greenlifeCookies] = useCookies([]);
  const memberToken = greenlifeCookies.refreshToken || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MzEzMzA4NDgsIm5iZiI6MTYzMTMyOTA0OCwiaXNzIjoiZ3JlZW5saWZlIiwiYXVkIjoiZ3JlZW5saWZlIiwic3ViIjoiZGI4OTYyZTMtZjlhNy00ODdkLThiMjQtZWRiMWEyYWZkNzg4In0.3GK2_HIBLhqSZkAc0yFJ3lReAXhxIbJ0krnH4V36TGtWUfRDrt49yj7oSTkWpJl19zMNy5s_s9315VV87AYi_Q";

  var myHeaders = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Token": memberToken
  });
  const { show, setShow, trunOn, setIstrunOn, isReply, number, index, item, action, left, top } = props;
  const descriptionTop = top + 20;

  const [topicGuidData, setTopicGuidData] = useState([])
  const [orderData, setOrderData] = useState()

  // console.log("data",topicGuidData)
  // console.log(",orderData",orderData)

  useEffect(() => {
    if (trunOn) {
      //找碴回答
      fetch(`${SSL}//${domain}/api/api/ThemeTask/FindFault/Reply`, {
        method: 'POST',
        body: serialize({
          topicGuid: topicGuidData,
          order: orderData
        }),
        headers: myHeaders
      })
        .then(res => {
          return res.json();
        }).then(result => {
          console.log("結果", result)
        });
      setTimeout(() => {
        setIstrunOn(false)
      }, 100);
    }
  }, [show[number][index]]);
  return (
    <div key={index}>
      {(show[number][index] || isReply === true) && (
        <div className="speech-bubble" style={{ top: top, left: left }}>
          {action}
        </div>
      )}
      <div
        onClick={(e) => {
          setIstrunOn(true)
          if (!show[number][index]) {
            const newShow = [...show];
            newShow[number][index] = true;
            setShow(newShow);
            setTopicGuidData(item.topicGuid);
            setOrderData(item.order);
            // console.log("item",item);
          }
        }}
        className={"circle " + ((show[number][index] || isReply === true) && ("isActive"))}
        style={{ top: top, left: left }}
        id="circle"
      ></div>
    </div>
  );
}

function FindTask(props) {

  const { topics, number } = props;

  const [trunOn, setIstrunOn] = useState(false);
  const [show, setShow] = useState([
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]);


  return (
    <div className="findtask-container">
      {topics.map((item, index) => {
        const { action, isReply, left, top } = item;
        return (
          <Circle
            show={show}
            setShow={setShow}
            isReply={isReply}
            trunOn={trunOn}
            setIstrunOn={setIstrunOn}
            number={number}
            index={index}
            action={action}
            left={left}
            top={top}
            item={item}
          />
        );
      })}
      {/* </div> */}
    </div>

  );
}
export default FindTask;