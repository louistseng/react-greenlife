import React from 'react';
// import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

function WordCloud() {

    const options = {
        rotations: 2,
        rotationAngles: [0, 0],
        fontFamily:"Microsoft JhengHei",
    };
    const size = [360, 260];

    const words = [
        {
            text: '臺北市',
            value: 3,
        },
        {
            text: '新北市',
            value: 5,
        },
        {
            text: '桃園市',
            value: 6,
        },
        {
            text: '新竹市',
            value: 7,
        },
        {
            text: '臺南市',
            value: 3,
        },
        {
            text: '新竹市',
            value: 2,
        },
        {
            text: '高雄市',
            value: 3,
        },
        {
            text: '雲林縣',
            value: 4,
        },
        {
            text: '花蓮縣',
            value: 6,
        },
    ]

    // return <ReactWordcloud words={words} 
    //     options={options}
    //     size={size}
    // />
}
export default WordCloud;