import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';


function DownloadMark(props) {

    let history = useHistory();
    const { typeId, setTypeId } = props

    return (
        <>
            <h1 className="cate-title"><i className="fas fa-cloud-download-alt" aria-hidden="true" alt="下載專區圖示"></i>下載專區</h1>
            <div className="download-bookmark-wrapper">
                <button
                    tabIndex={0}
                    role="" button
                    onClick={() => {
                        history.push('/download/promote?type=1')
                        setTypeId("1")
                    }}
                    className={typeId === "1" ? "categoty-btn focus" : "categoty-btn"}>
                    <div>業務推動成果</div>
                </button>
                <button
                    onClick={() => {
                        history.push('/download/material?type=2&visual=0')
                        setTypeId("2")
                    }}
                    className={typeId === "2" ? "categoty-btn focus" : "categoty-btn"}>
                    <div>圖文素材</div>
                </button>
                <button
                    onClick={() => {
                        history.push('/download/material?type=5&visual=0')
                        setTypeId("5")
                    }}
                    className={typeId === "5" ? "categoty-btn focus" : "categoty-btn"}>
                    <div>視覺素材</div>
                </button>
                <button
                    onClick={() => {
                        history.push('/download/environment?type=4')
                        setTypeId("4")
                    }}
                    className={typeId === "4" ? "categoty-btn focus" : "categoty-btn"}>
                    <div>環境教育種子教師</div>
                    {/* id="a"id="a" */}
                    {/* <h4 id="b">&emsp;&emsp;近期開放&emsp;&emsp;</h4> */}
                </button>
                <button
                    onClick={() => {
                        // history.push('/download?type=4')
                        // setTypeId("4")
                    }}
                    className={typeId === "99" ? "categoty-btn focus" : "categoty-btn"}>
                    <div id="c">&emsp;其他&emsp;</div>
                    <div id="d">近期開放</div>
                </button>
                <button
                    onClick={() => {
                        history.push('/download/environment?type=6')
                        setTypeId("6")
                    }}
                    className={typeId === "6" ? "categoty-btn focus" : "categoty-btn"}>
                    <div>環保標章</div>
                </button>
                <button
                    onClick={() => {
                        history.push('/download/environment?type=7')
                        setTypeId("7")
                    }}
                    className={typeId === "7" ? "categoty-btn focus" : "categoty-btn"}>
                    <div>政府機關及民間企業綠色採購</div>
                </button>
            </div>
        </>

    );
}

export default withRouter(DownloadMark);