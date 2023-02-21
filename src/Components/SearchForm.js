import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";


function SearchForm() {

    const [cityName, setCityName] = useState("");

    const submit = async (e) => {

        e.preventDefault()
        const uri = `http://192.168.95.248/api/api/Activity/Search?cityName=${cityName}`;
        await fetch(uri, {
            method: 'POST',
            body: encodeURI(JSON.stringify({
                cityName: cityName
            })),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result);
            });
    };



    useEffect(() => {


        // window.scrollTo(0, 0)
    }, []);


    return (
        <>
            <Form className="myform">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>縣市別</Form.Label>
                        <Form.Control as="select" defaultValue="請選擇" onBlur={e => setCityName(e.target.value)} >
                            <option value="">請選擇</option>
                            <option value="基隆市">基隆市</option>
                            <option value="台北市">台北市</option>
                            <option value="新北市">新北市</option>
                            <option value="桃園縣">桃園縣</option>
                            <option value="新竹市">新竹市</option>
                            <option value="新竹縣">新竹縣</option>
                            <option value="苗栗縣">苗栗縣</option>
                            <option value="台中市">台中市</option>
                            <option value="彰化縣">彰化縣</option>
                            <option value="南投縣">南投縣</option>
                            <option value="雲林縣">雲林縣</option>
                            <option value="嘉義市">嘉義市</option>
                            <option value="嘉義縣">嘉義縣</option>
                            <option value="台南市">台南市</option>
                            <option value="高雄市">高雄市</option>
                            <option value="屏東縣">屏東縣</option>
                            <option value="台東縣">台東縣</option>
                            <option value="花蓮縣">花蓮縣</option>
                            <option value="宜蘭縣">宜蘭縣</option>
                            <option value="澎湖縣">澎湖縣</option>
                            <option value="金門縣">金門縣</option>
                            <option value="連江縣">連江縣</option>

                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>選擇日期</Form.Label>
                        <div className="d-flex">
                            <label for="startDate"></label>
                            <input className="datePicker" type="date" name="startDate" id="startDate"></input>
                            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                            <div>到</div>
                            <label for="endDate"></label>
                            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
                            <input className="datePicker" type="date" name="endDate" id="endDate"></input>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>主辦單位</Form.Label>
                    <Form.Control placeholder="" />
                </Form.Group>
                {/* <Form.Group controlId="formGridAddress1">
    <Form.Label>活動地點</Form.Label>
    <Form.Control placeholder="" />
</Form.Group> */}
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>活動主題</Form.Label>
                    <Form.Control as="select" defaultValue="請選擇">
                        <option>請選擇</option>
                        <option>綠色消費</option>
                        <option>綠色旅遊</option>
                        <option>綠色飲食</option>
                        <option>淨灘</option>
                        <option>環境教育</option>
                        <option>全民綠生活</option>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>活動名稱</Form.Label>
                    <Form.Control placeholder="" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>活動類型</Form.Label>
                        <Form.Control as="select" defaultValue="請選擇">
                            <option>不限</option>
                            <option>好康活動</option>
                            <option>一般活動</option>
                            <option>線上活動</option>
                        </Form.Control>
                    </Form.Group>


                </Form.Row>



                <Button className="searchBtn" variant="primary" type="submit" onClick={submit}>
                    送出查詢
                </Button>
            </Form>
        </>
    );
}

export default SearchForm;