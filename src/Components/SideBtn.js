import React, { useEffect } from 'react';
import './css/sideBtn.css';
import { animateScroll as scroll } from 'react-scroll';
import $ from 'jquery';


function SideBtn(props) {

    //右側"回到上方"按鈕
    const goTop = () => {
        scroll.scrollToTop();
    }

    useEffect(() => {
        $(function () {
            var $inp = $('#toTop-btn');

            $inp.bind('keydown', function (e) {
                var key = e.which;
                if (key === 13) {
                    e.preventDefault();
                    $("#goMain").focus();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                }

            });

        });
    })

    return (
        <>
            {props.sideBtn !== false &&
                <div className="sideBtn-wrapper">
                    <div className="toTop-btn sideBtn" id="toTop-btn" onClick={() => goTop()} tabIndex={0}>TOP<i className="fas fa-sort-up sideBtn-icon" aria-hidden="true" alt="至頂圖示"></i></div>

                    <div className="toPrev-btn sideBtn" onClick={() => props.history.goBack()} onKeyPress={e => { if (e.which === 13) { props.history.goBack() } }} tabIndex={0} >上一頁<i className="fas fa-undo-alt sideBtn-icon" aria-hidden="true" alt="回上一頁圖示"></i></div>
                </div>
            }
            {/* 遊戲頁面sideBtn */}
            {props.gamePage === true &&
                <div className="sideBtn-wrapper">
                    <div className="toPrev-btn sideBtn" onClick={() => props.history.push('/about')} onKeyPress={e => { if (e.which === 13) { props.history.push('/about') } }} tabIndex={0} >回首頁<i className="fas fa-undo-alt sideBtn-icon" aria-hidden="true" alt="回上一頁圖示"></i></div>
                </div>
            }
        </>
    );
}

export default SideBtn;