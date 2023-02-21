import React, { useEffect } from 'react';

function VisualTypes(props) {

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    var serialize = require('serialize-javascript');

    //下載專區-視覺素材-類型項目列表
    useEffect(() => {

        const uri = `${SSL}//${domain}/api/api/DLoad/Material/Type`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                ThemeId: props.themeId
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.isSucess) {
                props.setVisualBookMark(result.resultObject)
            }
        })
    }, [SSL, domain, serialize])

    return (
        <>
            <div className="search-area">
                <button
                    className={props.visual === "0" ? "focus-btn" : "all-search-btn"}
                    onClick={() => {
                        props.history.push(`${props.url}?type=2&visual=0`)
                        props.setVisual(0)
                        if (props.setVisualName) {
                            props.setVisualName("全部類別")
                        }
                    }}
                >全部</button>
                {props.visualBookMark.map((data, index) =>
                    <button
                        key={index + 1}
                        className={props.visual === data.id ? "focus-btn" : "all-search-btn"}
                        onClick={() => {
                            props.history.push(`${props.url}?type=2&visual=${data.id}`)
                            props.setVisual(data.id)
                            if (props.setVisualName) {
                                props.setVisualName(data.name)
                            }
                        }}
                    >{data.name}</button>
                )}
            </div>
        </>
    );
}

export default VisualTypes