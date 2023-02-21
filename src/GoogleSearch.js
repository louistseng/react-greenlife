import React, { useState, useEffect } from 'react';
import Footer from './Components/Footer';
import BreadCrumb from './Components/BreadCrumb';
import { withRouter } from 'react-router-dom';
import SideBtn from './Components/SideBtn';
import './GoogleSearch.scss';
import { clickRecord } from './utils/API';
import { useCookies } from "react-cookie";


function GoogleSearch({ history }) {
    const params = new URLSearchParams(history.location.search);
    const [searchValue, setSearchValue] = useState(params.get("q"))

    const [greenlifeCookies] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    useEffect(() => {

        const includeScript = () => {
            var cx = '7a502e0e8f34030f9';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        }
        includeScript();

    }, []);

    const handleChange = (event) => {
        setSearchValue(event.target.value)
    }


    //點閱計數API
    useEffect(() => {
        clickRecord("855C27BB-3E65-43A0-A54A-9C07A9A66788", "1", collector)
    }, [collector]);


    return (
        <>

            <BreadCrumb />
            <div className="container containerBox">

                <form role="search" method="get" id="searchform1" class="search-form" action="/search"  >
                    {/* <input type="hidden" name="cx" value="97bb058f7b76e7bce" /> */}
                    <div className="d-flex">
                        <input type="text" title="輸入關鍵字" name="q" id="search" size="31" placeholder="輸入關鍵字" value={searchValue} onChange={handleChange} className="csetext" />
                        <a href={`/search?q=${searchValue}`} title="搜尋鏈結" type="submit" class="google-search_btn"><h1><i class="fas fa-search" alt="搜尋圖示"></i>搜尋</h1></a>
                    </div>
                </form>
                <div class="gcse-searchresults-only"></div>


                <div style={{ height: "45vh" }} className="search-content"></div>
            </div>
            <SideBtn history={history} />
            <Footer />
        </>
    );
}

export default withRouter(GoogleSearch);
