import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../GreenLiving/GreenLabel.css'

import greenshopstatistics from '../../images1/greenShop/GreenStoreStatistics02.png';

const BreadCrumb = React.lazy(() => import('../../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../../Components/Footer'));

function GreenShopStatistics(props) {
    let SSL = props.SSL//props.domain.includes("eri") ? "https:" : props.SSL
    let domainFormal = "greenliving.epa.gov.tw/newPublic"//props.domain.includes("eri") ? "greenliving.eri.com.tw/PublicRwd" : "greenliving.epa.gov.tw/newPublic"
    let domainBackendFormal = "greenliving.epa.gov.tw"//props.domain.includes("eri") ? "greenliving.eri.com.tw" : "greenliving.epa.gov.tw"

    return (
        <>
            <BreadCrumb currentPage="綠色商店歷年新增家數統計" />{/*  */}
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row leftbtn justify-content-between">
                            <Link to={`/categories/GreenShopIntro/GreenShopApply`}><div className="col-12 col-md-6 col-lg-12">綠色商店申請與管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopReview`}><div className="col-12 col-md-6 col-lg-12">綠色商店審核標準及執行程序</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopTrack`}><div className="col-12 col-md-6 col-lg-12">綠色商店追蹤管理</div></Link>
                            <Link to={`/categories/GreenShopIntro/GreenShopStatistics`} className="leftbtnFocus"><div className="col-12 col-md-6 col-lg-12">綠色商店歷年新增家數統計</div></Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12 bigpic">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>綠色商店歷年新增家數統計圖</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <div className="w-100 text-center"><img src={greenshopstatistics} className="w-100" style={{ maxWidth: "45em" }} alt="綠色商店歷年新增家數統計圖" title="綠色商店歷年新增家數統計圖" /></div>
                            </div>

                            <div className="col-12 greenbar">
                                <h5>綠色商店歷年新增家數統計表</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                                <table className="talbe-gray-border table-fixed" style={{ width: "100%" }}>
                                    <tr className="table-head-dark">
                                        <th>年度/月份</th>
                                        <th>1</th>
                                        <th>2</th>
                                        <th>3</th>
                                        <th>4</th>
                                        <th>5</th>
                                        <th>6</th>
                                        <th>7</th>
                                        <th>8</th>
                                        <th>9</th>
                                        <th>10</th>
                                        <th>11</th>
                                        <th>12</th>
                                    </tr>
                                    <tr>
                                        <td class="t1">97</td>
                                        <td class="crossOut"></td>
                                        <td class="crossOut"></td>
                                        <td class="crossOut"></td>
                                        <td>17</td>
                                        <td>57</td>
                                        <td>112</td>
                                        <td>63</td>
                                        <td>267</td>
                                        <td>149</td>
                                        <td>52</td>
                                        <td>17</td>
                                        <td>71</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">98</td>
                                        <td>14</td>
                                        <td>11</td>
                                        <td>9</td>
                                        <td>17</td>
                                        <td>33</td>
                                        <td>91</td>
                                        <td>68</td>
                                        <td>37</td>
                                        <td>57</td>
                                        <td>80</td>
                                        <td>57</td>
                                        <td>86</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">99</td>
                                        <td>7</td>
                                        <td>3</td>
                                        <td>26</td>
                                        <td>7254</td>
                                        <td>6</td>
                                        <td>1272</td>
                                        <td>23</td>
                                        <td>20</td>
                                        <td>18</td>
                                        <td>277</td>
                                        <td>14</td>
                                        <td>53</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">100</td>
                                        <td>45</td>
                                        <td>0</td>
                                        <td>18</td>
                                        <td>46</td>
                                        <td>26</td>
                                        <td>67</td>
                                        <td>46</td>
                                        <td>38</td>
                                        <td>134</td>
                                        <td>22</td>
                                        <td>127</td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">101</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td>9</td>
                                        <td>9</td>
                                        <td>115</td>
                                        <td>28</td>
                                        <td>22</td>
                                        <td>12</td>
                                        <td>31</td>
                                        <td>68</td>
                                        <td>57</td>
                                        <td>22</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">102</td>
                                        <td>24</td>
                                        <td>8</td>
                                        <td>25</td>
                                        <td>43</td>
                                        <td>106</td>
                                        <td>66</td>
                                        <td>29</td>
                                        <td>102</td>
                                        <td>37</td>
                                        <td>88</td>
                                        <td>32</td>
                                        <td>15</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">103</td>
                                        <td>2</td>
                                        <td>26</td>
                                        <td>22</td>
                                        <td>5</td>
                                        <td>22</td>
                                        <td>35</td>
                                        <td>88</td>
                                        <td>41</td>
                                        <td>28</td>
                                        <td>86</td>
                                        <td>34</td>
                                        <td>41</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">104</td>
                                        <td>12</td>
                                        <td>10</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>4</td>
                                        <td>7</td>
                                        <td>20</td>
                                        <td>27</td>
                                        <td>1</td>
                                        <td>20</td>
                                        <td>27</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">105</td>
                                        <td>4</td>
                                        <td>1</td>
                                        <td>17</td>
                                        <td>9</td>
                                        <td>5</td>
                                        <td>17</td>
                                        <td>6</td>
                                        <td>4</td>
                                        <td>2</td>
                                        <td>402</td>
                                        <td>8</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">106</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                        <td>3</td>
                                        <td>11</td>
                                        <td>6</td>
                                        <td>4</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>7</td>
                                        <td>24</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">107</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>2</td>
                                        <td>7</td>
                                        <td>24</td>
                                        <td>7</td>
                                        <td>12</td>
                                        <td>0</td>
                                        <td>2</td>
                                        <td>60</td>
                                        <td>3</td>
                                        <td>5</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">108</td>
                                        <td>0</td>
                                        <td>71</td>
                                        <td>1</td>
                                        <td>12</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>6</td>
                                        <td>10</td>
                                        <td>3</td>
                                        <td>3</td>
                                        <td>86</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">109</td>
                                        <td>18</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>1</td>
                                        <td>7</td>
                                        <td>5</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>80</td>
                                        <td>39</td>
                                    </tr>
                                    <tr>
                                        <td class="t1">110</td>
                                        <td>33</td>
                                        <td>3</td>
                                        <td>3</td>
                                        <td>3</td>
                                        <td>11</td>
                                        <td>0</td>
                                        <td>5</td>
                                        <td>5</td>
                                        <td>2</td>
                                        <td>0</td>
                                        <td>5</td>
                                        <td>14</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(GreenShopStatistics);
