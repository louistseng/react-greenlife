import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { formatDate, pad, getYear } from '../utils/Functions';

import axios from "axios";


function CustomModal(props) {
    // const { productClass, year, month, Title, objCounter } = props;

    let history = useHistory();
    const paramsSearch = new URLSearchParams(history.location.search);


    const [arrHomeDetail, setArrHomeDetail] = useState([]);
    const [arrPassDetail, setArrPassDetail] = useState([]);

    const [arrDetailTable, setArrDetailTable] = useState([]);

    const [categoryName, setCategoryName] = useState("");
    const [totalActiveCount, setTotalActiveCount] = useState(0);
    const [totalHomeCount, setTotalHomeCount] = useState(0);
    const [totalPassCount, setTotalPassCount] = useState(0);

    const productCategory = ["資源回收產品類", "清潔產品類", "資訊產品類", "家電產品類",
        "省水產品類", "省電產品類", "(OA)辦公室用具產品類", "可分解產品類",
        "有機資材類", "建材類", "日常用品類", "工業類",
        "利用太陽能資源", "服務類"];

    let domainFormal = "greenliving.epa.gov.tw/newPublic";
    let arrActiveCount = [];
    let subHomeArray = [];
    let subPassArray = [];
    let tempArray = [];

    const tableDetailData = (
        <>
            {arrDetailTable.map((data, index) => {
                const { standardNum, category, homeCount, passCount, activeCount } = data
                return (
                    <tr key={data.CriteriaNo}>
                        <td data-title="規格標準編號" className="list-date">{standardNum}</td>
                        <td data-title="產品類別" className="list-date">{category}</td>
                        <td data-title="家次*" className="list-date">{homeCount ? homeCount : 0}</td>
                        <td data-title="通過數*" className="download-time">{passCount ? passCount : 0}</td>
                        <td data-title="有效數*" className="table-align-left">{activeCount ? activeCount : 0}</td>
                    </tr>
                )
            })}
            <tr>
                <td></td>
                <td>小計</td>
                <td>{totalHomeCount}</td>
                <td>{totalPassCount}</td>
                <td>{totalActiveCount}</td>
            </tr>
        </>
    );

    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }


    const groupByProduct = (keys) => (array) =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = keys.map((key) => obj[key]).join("-");
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    function initFetchData() {
        for (let productIndex = 0; productIndex < productCategory.length; productIndex++) {

            let apiUrl = `https://${domainFormal}/APIs/ProductsQueryAll?ctn=${(productIndex + 1)}`;
            let isCalc = false;

            fetch(apiUrl, {
                method: 'GET'
            }).then(allRes => {
                return allRes.json();
            }).then(allResult => {
                if (allResult.Detail.length > 0) {
                    let tempObj = {};
                    let tempCounter = {};
                    let subArray = [];

                    tempObj.Idx = productIndex + 1;

                    if (!isCalc && subArray.length <= 0) {

                        const groupByCriteria = groupByProduct(["Criteria"]);
                        for (let [groupName, values] of Object.entries(groupByCriteria(allResult.Detail))) {
                            tempCounter[groupName] = values.length;
                        }
                        subArray.push(tempCounter);
                    }

                    tempObj.arrActiveCount = subArray;
                    tempObj.TotalCount = allResult.RowsCount;
                    tempArray.push(tempObj);

                    // setObjCounter(tempArray);

                    console.log('Custom Modal Init Done');

                }
            });
        }
    }

    function fetchHomeData(ctn) {
        console.log('Custom Modal Home CTN=', ctn);

        let getHomeUrl = "";

        if (props.year !== "" || props.month !== 0) {
            getHomeUrl = `https://${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}&y=${props.year}&m=${props.month}`;

            let tempHomeCounter = [];


            const fetchData = async () => {
                const homeResult = await axios(
                    getHomeUrl,
                );
                console.log('Custom Modal homeResult Detail Length=', homeResult.data.Detail.length);

                try {
                    if (homeResult.data.Detail.length > 0) {

                        let removeDoubleData = removeDuplicates(homeResult.data.Detail, "CorpName");

                        const groupByCriteria = groupByProduct(["Criteria"]);
                        for (let [groupName, values] of Object.entries(groupByCriteria(removeDoubleData))) {
                            tempHomeCounter[groupName] = values.length;
                        }

                        subHomeArray.push(tempHomeCounter);
                        setArrHomeDetail(subHomeArray);

                        // return {
                        //     arrHome: subHomeArray
                        // }
                        console.log('Custom Modal Home Done');

                    }
                } catch (e) {
                    console.log('homeError=', e);
                }
            };
            fetchData();
        } else {
            return subHomeArray;
            // return {
            //     arrHome: subHomeArray
            // }
        }
    }

    function fetchPassData(ctn) {
        console.log('Custom Modal PASS CTN=', ctn);

        let getPassUrl = "";

        if (props.year !== "" && props.month !== 0) {
            getPassUrl = `https://${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}&y=${props.year}&m=${props.month}`;
            let tempCounter = [];

            const fetchPassData = async () => {
                const passResult = await axios(getPassUrl,);
                try {
                    if (passResult.data.Detail.length > 0) {

                        console.log('Custom Modal homeResult Detail Length=', passResult.data.Detail.length);

                        const groupByCriteriaPassCount = groupByProduct(["Criteria"]);
                        for (let [groupName, values] of Object.entries(groupByCriteriaPassCount(passResult.data.Detail))) {
                            tempCounter[groupName] = values.length;
                        }

                        subPassArray.push(tempCounter);
                        setArrPassDetail(subPassArray);

                        // return {
                        //     arrPass: subPassArray
                        // }
                        console.log('Custom Modal Pass Done');
                    };
                } catch (e) {
                    console.log('passError=', e);
                }
            }
            fetchPassData();
        } else {
            return subPassArray;
            // return {
            //     arrPass: subPassArray
            // }
        }
    }

    const getDetailTable = (ctn) => {
        //產品分類代碼

        let detailUrl = `${props.SSL}//${domainFormal}/APIs/CriteriaList/${ctn}`;

        return fetch(detailUrl).then((response) => response.json()).then((result) => {


            arrDetailTable.length = 0;
            if (result.Detail.length > 0) {

                for (let index = 0; index < result.Detail.length; index++) {

                    let dObject = {};
                    dObject.standardNum = result.Detail[index].CriteriaNo;
                    dObject.category = result.Detail[index].Criteria;

                    if (arrHomeDetail.length > 0) {
                        for (const key in arrHomeDetail[0]) {
                            if (Object.hasOwnProperty.call(arrHomeDetail[0], key)) {
                                if (dObject.category === key) {
                                    dObject.homeCount = arrHomeDetail[0][key];
                                }
                            }
                        }
                    }

                    // let passCountSum = 0;
                    if (arrPassDetail.length > 0) {
                        for (const key in arrPassDetail[0]) {
                            if (Object.hasOwnProperty.call(arrPassDetail[0], key)) {
                                if (dObject.category === key) {
                                    dObject.passCount = arrPassDetail[0][key];
                                }
                            }
                        }
                    }

                    if (props.objCounter.length > 0) {
                        for (let index = 0; index < props.objCounter.length; index++) {
                            const prdocutIdx = props.objCounter[index].Idx;
                            if (ctn === prdocutIdx) {

                                const element = props.objCounter[index].arrActiveCount;

                                for (const key in element[0]) {
                                    if (Object.hasOwnProperty.call(element[0], key)) {
                                        if (dObject.category === key) {
                                            dObject.activeCount = element[0][key];
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // setObjectDetailTable(dObject);

                    arrDetailTable.push(dObject);
                    setArrDetailTable(arrDetailTable);
                }

                return {
                    arrDetail: arrDetailTable
                }
            }
            return {
                arrDetail: arrDetailTable
            }
        })
    }


    useEffect(() => {
        initFetchData();
        fetchHomeData(props.productClass);
        fetchPassData(props.productClass);

    }, [props.show])


    return <>{props.show ?
        <div className='modalContainer'>
            <header className='modal_header'>
                <h2 className='modal_header-title'>{props.Title}</h2>
                <button className='close'>Close</button>
            </header>
            <main className='modal_content'>
                <table>
                    <thead>
                        <tr>
                            <th>規格標準編號</th>
                            <th>產品類別</th>
                            <th>家次*</th>
                            <th>通過數*</th>
                            <th>有效數*</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableDetailData}
                        {props.productClass}
                        {props.objCounter}
                        {props.year}
                        {props.month}
                    </tbody>
                </table>
            </main>
            <footer className='modal_footer'>
                <button>Cancel</button>
                <button>Submit</button>
            </footer>
        </div>
        :
        null
    }

    </>
}

export default CustomModal