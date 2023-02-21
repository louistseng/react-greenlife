// import React, { useState, useEffect } from 'react';
// import './Download.scss';

// import { withRouter, Link } from 'react-router-dom';
// import { Card } from 'react-bootstrap';
// import { formatDate } from '../utils/Functions';
// import { clickRecord } from '../utils/API';
// import Cookies from 'universal-cookie';
// import DownloadCarousel from '../Components/DownloadCarousel';
// import DownloadMark from '../Components/DownloadMark';

// const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
// const Footer = React.lazy(() => import('../Components/Footer'));
// const SideBtn = React.lazy(() => import('../Components/SideBtn'));
// const Loader = React.lazy(() => import('../Components/Loader'));


// function GreenTour({ history }) {

//     const SLIDE_COUNT = 5;
//     const slides = Array.from(Array(SLIDE_COUNT).keys());
//     // let SSL = props.SSL
//     // let domain = props.domain
//     var serialize = require('serialize-javascript');

//     const [count, setCount] = useState("2");
//     const [themeId, setThemeId] = useState("3");
//     const [page, setPage] = useState("1");

//     const [download, setDownload] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const cookies = new Cookies();
//     const [collector, setCollector] = useState(window.location.hostname.length > 10 ? cookies.get('userGuid') : "5105209409496985");
//     const [recordTypeId, setRecordTypeId] = useState("11")
//     const [clicker, setClicker] = useState(null);
//     const [focus, setFocus] = useState(true);

//     fetch下載專區
//     useEffect(() => {
//         window.scrollTo(0, 0)

//         fetch(`${SSL}//${domain}/api/api/GreenLife/File/List`, {
//             method: 'POST',
//             body: serialize({
//                 Page: page,
//                 Count: count,
//                 ThemeId: themeId
//             }),
//             headers: {
//                 'Content-Type': 'application/json; charset=utf-8'
//             }
//         })
//             .then(res => {
//                 return res.json();
//             }).then(result => {
//                 setLoading(false)
//                 setDownload(result.resultObject.files)
//             });

//     }, []);




//     return (
//         <>
//             <BreadCrumb currentPage={"圖文素材"} />
//             <div className="download-graph container">

//                 <div className="content-wrapper">
//                     <DownloadMark />


//                     <div className="graph-main-content">
//                         <div className="graph">
//                             <h2 className="graph-title"><i class="fas fa-caret-right"></i>&nbsp;視覺素材</h2>
//                             <div className="search-section">

//                                 <button className="search-btn">全部</button>
//                                 <button className="all-search-btn">主視覺</button>
//                                 <button className="all-search-btn">海報</button>
//                                 <button className="all-search-btn">易拉展</button>
//                                 <button className="all-search-btn">綠行動達人</button>

//                             </div>
//                         </div>

//                         <>

//                             <div className="files-wrapper">

//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=531" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" href={download.href} download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="text-area">
//                                             <div className="d-flex justify-content-start">
//                                                 <div><i class="fas fa-download"></i></div>&emsp;
//                                                 <div className="download-title">
//                                                     <p className="download-time">2020/12/29</p>
//                                                 </div>
//                                                 <div className="sort-type">主視覺</div>
//                                             </div>
//                                             <div className="card-title"><p>全民綠生活LOGO(彩色版)</p></div>
//                                         </div>
//                                         <div className="img-area-wrapper">
//                                             <div className="extension" style={{ background: "red" }}>PDF</div>
//                                             <img src="https://cdn.pixabay.com/photo/2020/11/01/23/22/breakfast-5705180_960_720.jpg" alt="PDF" title="PDF" />
//                                         </div>

//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=532" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="text-area">
//                                             <div className="d-flex justify-content-start">
//                                                 <div><i class="fas fa-download"></i></div>&emsp;
//                                                 <div className="download-title">
//                                                     <p className="download-time">2021/01/09</p>
//                                                 </div>
//                                                 <div className="sort-type">主視覺</div>
//                                             </div>
//                                             <div className="card-title"><p>全民綠生活LOGO(彩色版)</p></div>
//                                         </div>
//                                         <div className="img-area-wrapper">
//                                             <div className="extension" style={{ background: "blue" }}>JPG</div>
//                                             <img src="https://cdn.pixabay.com/photo/2021/01/31/04/55/boat-5965850_960_720.jpg" alt="JPG" title="JPG" />
//                                         </div>
//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=533" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="text-area">
//                                             <div className="d-flex justify-content-start">
//                                                 <div><i class="fas fa-download"></i></div>&emsp;
//                                                 <div className="download-title">
//                                                     <p className="download-time">2021/01/10</p>
//                                                 </div>
//                                                 <div className="sort-type">海報</div>
//                                             </div>
//                                             <div className="card-title"><p>全民綠生活LOGO(彩色版)</p></div>
//                                         </div>
//                                         <div className="img-area-wrapper">
//                                             <div className="extension" style={{ background: "green" }}>PNG</div>
//                                             <img src="https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803_960_720.jpg" alt="PNG" title="PNG" />
//                                         </div>
//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=534" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="d-flex justify-content-start">
//                                             <i class="fas fa-download"></i>&emsp;
//                                             <div>
//                                                 <div className="download-title">
//                                                     <p className="download-time">{formatDate(download.createTime)}</p>
//                                                     4
//                                                 </div>
//                                                 {/* <p>{download.desc}</p> */}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <img src="https://cdn.pixabay.com/photo/2020/11/28/02/17/island-5783440_960_720.jpg" alt="圖示" />
//                                         </div>
//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=531" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" href={download.href} download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="text-area">
//                                             <div className="d-flex justify-content-start">
//                                                 <div><i class="fas fa-download"></i></div>&emsp;
//                                                 <div className="download-title">
//                                                     <p className="download-time">2020/12/29</p>
//                                                 </div>
//                                                 <div className="sort-type">主視覺</div>
//                                             </div>
//                                             <div className="card-title"><p>全民綠生活LOGO(彩色版)</p></div>
//                                         </div>
//                                         <div className="img-area-wrapper">
//                                             <div className="extension" style={{ background: "red" }}>PDF</div>
//                                             <img src="https://cdn.pixabay.com/photo/2020/11/01/23/22/breakfast-5705180_960_720.jpg" alt="PDF" title="PDF" />
//                                         </div>

//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=532" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="text-area">
//                                             <div className="d-flex justify-content-start">
//                                                 <div><i class="fas fa-download"></i></div>&emsp;
//                                                 <div className="download-title">
//                                                     <p className="download-time">2021/01/09</p>
//                                                 </div>
//                                                 <div className="sort-type">主視覺</div>
//                                             </div>
//                                             <div className="card-title"><p>全民綠生活LOGO(彩色版)</p></div>
//                                         </div>
//                                         <div className="img-area-wrapper">
//                                             <div className="extension" style={{ background: "blue" }}>JPG</div>
//                                             <img src="https://cdn.pixabay.com/photo/2021/01/31/04/55/boat-5965850_960_720.jpg" alt="JPG" title="JPG" />
//                                         </div>
//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=533" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="text-area">
//                                             <div className="d-flex justify-content-start">
//                                                 <div><i class="fas fa-download"></i></div>&emsp;
//                                                 <div className="download-title">
//                                                     <p className="download-time">2021/01/10</p>
//                                                 </div>
//                                                 <div className="sort-type">海報</div>
//                                             </div>
//                                             <div className="card-title"><p>全民綠生活LOGO(彩色版)</p></div>
//                                         </div>
//                                         <div className="img-area-wrapper">
//                                             <div className="extension" style={{ background: "green" }}>PNG</div>
//                                             <img src="https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803_960_720.jpg" alt="PNG" title="PNG" />
//                                         </div>
//                                     </Card>
//                                 </a>
//                                 <a href="https://greenliving.epa.gov.tw/GreenLife/green-life/downtime.aspx?id=534" onClick={() => clickRecord(download.guid, recordTypeId, clicker)} target="_blank" download={download.title} title="在新視窗開啟鏈結">
//                                     <Card className="download-graph-card">
//                                         <div className="d-flex justify-content-start">
//                                             <i class="fas fa-download"></i>&emsp;
//                                             <div>
//                                                 <div className="download-title">
//                                                     <p className="download-time">{formatDate(download.createTime)}</p>
//                                                     4
//                                                 </div>
//                                                 {/* <p>{download.desc}</p> */}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <img src="https://cdn.pixabay.com/photo/2020/11/28/02/17/island-5783440_960_720.jpg" alt="圖示" />
//                                         </div>
//                                     </Card>
//                                 </a>
//                             </div>
//                         </>

//                     </div>

//                     <div style={{ height: "45vh" }} className="search-content"></div>
//                 </div>
//                 <SideBtn history={history} />
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default withRouter(GreenTour);