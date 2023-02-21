import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import Captcha from 'react-captcha-code';
import { useCookies } from "react-cookie";
import ComfirmAlert from '../Components/ComfirmAlert';
import '../CustomerService/EmailService.scss';

const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));

function EmailService() {

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [number, setNumber] = useState();
    const [title, setTilte] = useState("");
    const [content, setContent] = useState("");
    const [account, setAccount] = useState("");
    const [classType, setClassType] = useState("");
    const [serialNumber, setSrialNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [fetchData, setFetchData] = useState([]);
    const [waringText, setWaringText] = useState("");
    const [success, setSuccess] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [subTitle, setSubTitle] = useState([]);


    let history = useHistory()

    let SSL = window.location.protocol;
    let domainFormal = window.location.hostname.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ASP.NET_SessionId=w5donqobknrkbzhcodknzj3q");

    var formData = new FormData();

    const APPKEY = "3325376A037641F5864407C4F768A0F3D5F38BC64B044AB49F532CC5A9A6A48CB6F31920BE704A958A7329BCD4D6DD7D33CE7B3AA9FC4873924FE0503A8434CFD7F64CD1A2024490AB98ABF53A1433A1";

    // 送出
    const submit = (e) => {
        e.preventDefault();

        formData.append("Class", classType);
        formData.append("Name", name);
        formData.append("Email", mail);
        formData.append("Phone", number);
        formData.append("Title", title);
        formData.append("Data", content);
        formData.append("APPID", "GreenLifePlatform");
        formData.append("APPKEY", APPKEY);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        };

        fetch(`${SSL}//${domainFormal}/APIs/NewQAMail`, requestOptions)
            .then(res => res.json())
            .then(result => {
                // console.log(result)
                if (result.Result === "Success") {
                    setSuccess(true)
                    setSubTitle("案件序號：" + result.Message.split("新增案件序號：")[1])
                    setAlertTitle("發送成功")
                    setSrialNumber(result.Message.split("新增案件序號：")[1])
                }
            })
            .catch(error => console.log('error', error));

    }


    const reset = (e) => {
        e.preventDefault();
        setName("")
        setMail("")
        setNumber("")
        setTilte("")
        setContent("")
        setSrialNumber("")
        setVerificationCode("")
    }

    //驗證碼
    const captchaRef = useRef();
    const [captcha, setCaptcha] = useState("");

    // console.log("captcha:", captcha);
    const handleChange = useCallback((code) => {
        setCaptcha(code);
    }, []);

    const handleClick = () => {
        captchaRef.current.refresh();
    };

    //客服留言查詢
    const [GetQAMail, setGetQAMail] = useState([])

    const search = (e) => {
        e.preventDefault()
        if (verificationCode === captcha) {
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            fetch(`${SSL}//${domainFormal}/APIs/GetQAMail?s=${serialNumber}&e=${mail}`, requestOptions)
                .then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result)
                    setGetQAMail(result.Detail)
                });
        } else {
            setWaringText("請重新輸入驗證碼")
            setTimeout(() => {
                setWaringText("")
            }, 5000);
            handleClick()
        }
    }

    //客服留言問題類型
    const [QAClass, setQAClass] = useState([])
    useEffect(() => {
        fetch(`${SSL}//${domainFormal}/APIs/QAClass`)
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result.Detail)
                setQAClass(result.Detail)
            });
    }, [SSL, domainFormal])

    return (
        <>
            <div className="container">
                <BreadCrumb current={'平台客服專區'} />
                <span id="tab-1">填寫客服信件</span>
                <span id="tab-2">案件查詢</span>
                <div id="tab">
                    <ul>
                        <li>
                            <a href="#tab-1" title="綠色消費客服留言功能鏈結">
                                <i className="fas fa-envelope" aria-hidden="true"></i>填寫客服信件
                            </a>
                        </li>
                        <li>
                            <a href="#tab-2" title="案件查詢鏈結">
                                <i className="fas fa-search" aria-hidden="true"></i>案件查詢

                            </a>
                        </li>
                    </ul>

                    <div className="tab-content-1">
                        <div className="waring-text">
                            <div><span>※</span>若想直接聯繫客服人員，請打「(02)2361-1999#438」。</div>
                            <div><span>※</span>若想查詢環保標章產品，請至「<a href="https://greenlife.epa.gov.tw/categories/GreenProductSearch">環保標章查詢</a>」。</div>
                        </div>
                        <div className="qa-class">
                            <div className="form-title"><h1>填寫客服信件</h1></div>
                        </div>
                        {success &&
                            <ComfirmAlert key={alertTitle} subTitle={`感謝您所提出的意見與問題，系統客服人員將針對您所提出項目盡快處理，並於下個上班日回覆。${subTitle} 請存取案件序號，以備查詢時所需，謝謝。`} alertTitle={alertTitle} history={history} />
                        }
                        <form>
                            <label for="FormControlSelect1" className="form-label d-flex"><span>*</span>問題類別:</label>
                            <select className="form-select form-select-lg mb-3 form-control" id="FormControlSelect1" onBlur={e => setClassType(e.target.value)}>
                                <option selected>請選擇</option>
                                {QAClass.map((d, i) =>
                                    <option key={i} value={d.ClassNo}>{d.ClassName}</option>
                                )}
                            </select>
                            <div className="mb-3">
                                <label for="FormControlInput2" className="form-label d-flex"><span>*</span>姓名:</label>
                                <input type="text" className="form-control" id="FormControlInput2" placeholder="請輸入您的姓名" onChange={e => setName(e.target.value)} value={name} />
                            </div>
                            <div className="mb-3">
                                <label for="FormControlInput3" className="form-label d-flex"><span>*</span>電子郵件:</label>
                                <input type="email" className="form-control" id="FormControlInput3" placeholder="請輸入您的電子郵件" onChange={e => setMail(e.target.value)} value={mail} />
                            </div>
                            <div className="mb-3">
                                <label for="FormControlInput4" className="form-label d-flex"><span>*</span>聯絡電話:</label>
                                <input type="mobile" className="form-control" id="FormControlInput4" placeholder="請輸入您的聯絡電話" onChange={e => setNumber(e.target.value)} value={number} />
                            </div>
                            <span>範例：02-12345678#123或023-1234567#123或0911123456</span>
                            <div className="mb-3">
                                <label for="FormControlInput5" className="form-label d-flex"><span>*</span>標題:</label>
                                <input type="title" className="form-control" id="FormControlInput5" placeholder="請輸入您的標題" onChange={e => setTilte(e.target.value)} value={title} />
                            </div>
                            <div className="mb-3">
                                <label for="FormControlTextarea6" className="form-label d-flex"><span>*</span>內文:</label>
                                <textarea className="form-control" id="FormControlTextarea6" rows="3" onChange={e => setContent(e.target.value)} value={content}></textarea>
                            </div>
                            <button className="submit-btn" onClick={e => submit(e)}>確認送出</button>
                            <button className="reset-btn" onClick={e => reset(e)}>重新設定</button>
                        </form>
                    </div>

                    <div className="tab-content-2">
                        <div className="waring-text">
                            <div><span>※</span>若想直接聯繫客服人員，請撥打「<a href="#">諮詢專線</a>」。</div>
                            <div><span>※</span>若想查詢環保標章產品，請至「<a href="#">環保標章查詢</a>」。</div>
                        </div>
                        <div className="qa-class">
                            <div className="form-title"><h1>案件查詢</h1></div>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label for="exampleFormControlInput7" className="form-label d-flex"><span>*</span>案件編號:</label>
                                <input type="text" className="form-control" id="exampleFormControlInput7" placeholder="請輸入案件編號" defaultValue={serialNumber} value={serialNumber} onChange={e => setSrialNumber(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput8" className="form-label d-flex"><span>*</span>電子郵件:</label>
                                <input type="email" className="form-control" id="exampleFormControlInput8" placeholder="請輸入您的Email" defaultValue={mail} value={mail} onChange={e => setMail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput9" className="form-label d-flex"><span>*</span>驗證碼:</label>
                                <input type="text" className="form-control" id="exampleFormControlInput9" placeholder="輸入下方驗證碼" onChange={e => setVerificationCode(e.target.value)} value={verificationCode} />
                            </div>
                            <div className="verificationCode">
                                <Captcha onChange={handleChange} ref={captchaRef} charNum={6} height={100} width={200} bgColor={"#b0b0b0"} />
                                <div>
                                    <button type="button" className="confirm-input" onClick={handleClick}>更換驗證碼</button>
                                </div>
                                <div className="remind-text">{waringText}</div>
                            </div>
                            <div className="btn">
                                <button className="search-btn" onClick={(e) => search(e)}>開始查詢</button>
                                <button className="research-btn" onClick={(e) => reset(e)}>重新查詢</button>
                            </div>
                        </form>
                        <div className="search-result">
                            <h2 className="search-result-count">案件查詢結果 : </h2>
                            {GetQAMail.length === 0 ?
                                <div className="search-result-count" style={{ textAlign: GetQAMail.length === 0 && "center" }}>查無搜尋結果</div>
                                :
                                <table className="table" >
                                    <thead>
                                        <tr>
                                            <th scope="col">案件編號</th>
                                            <th scope="col">案件狀態</th>
                                            <th scope="col">案件主旨</th>
                                            <th scope="col">案件內容</th>
                                            <th scope="col">回覆內容</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {GetQAMail.map((d, i) =>
                                            <tr key={i}>
                                                <td>{d.SerialNo}</td>
                                                <td>{d.StateDesc}</td>
                                                <td>{d.Title}</td>
                                                <td style={{ maxWidth: "400px" }}>{d.Data}</td>
                                                <td style={{ maxWidth: "400px" }}>{d.ReplyData ? d.ReplyData : "未回覆"}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}
export default withRouter(EmailService);