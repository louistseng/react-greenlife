import React, { useEffect, useState } from 'react';
import { useHistory, Link, withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import '../GreenLiving/GreenLabel.css';
import markBanner from '../images1/img/english_mark.jpg';
import greenLogo1 from '../images1/greenLogo(70x70).png';
import greenLogo2 from '../images1/greenLogo2.png';
import markInfo1 from '../images1/img/en-mark-icon/markInfo/mark-info-1.png';
import markInfo2 from '../images1/img/en-mark-icon/markInfo/mark-info-2.png';
import markInfo3 from '../images1/img/en-mark-icon/markInfo/mark-info-3.jpg';
import markInfo4 from '../images1/img/en-mark-icon/markInfo/mark-info-4.jpg';
import markInfo5 from '../images1/img/en-mark-icon/markInfo/mark-info-5.jpg';
import { MarkTableData } from '../EnglishVersion_Json'

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));

function EnglishProcurementInfo() {
    let history = useHistory()
    const params = new URLSearchParams(history.location.search);
    const typeId = params.get('type')
    // console.log(typeId)
    const hash = window.location.hash.split("#")[1] || "1"
    const [markArticle, setMarkArticle] = useState(hash || "1")
    const [title, setTitle] = useState("The Rules and Regulations of Green Procurement in Taiwan")

    useEffect(() => {
        if (typeId === "2") {
            setMarkArticle("3")
        }
    }, [typeId])

    useEffect(() => {
        switch (markArticle) {
            case "1": setTitle("The Rules and Regulations of Green Procurement in Taiwan")
                break;
            case "2": setTitle("E-declaration for Green Procurement")
                break;
            case "3": setTitle("Green Procurement for private enterprises and organizations")
                break;
        }
    }, [markArticle, title])

    return (
        <>
            <EnglishBreadcrumb />
            <div><img src={markBanner} className="w-100 banner" alt="markBanner" /></div>
            <div>
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-12 col-lg-2 col-md-12">
                        {typeId === "1" &&
                            <div className="row mark-leftbtn justify-content-between">
                                <Link to={`/en_ProcurementInfo?type=1#1`} onClick={() => setMarkArticle("1")} className={hash === "1" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                    <div>The Rules and Regulations of</div>
                                    <div>Green Procurement in Taiwan</div>
                                </Link>
                                <Link to={`/en_ProcurementInfo?type=1#2`} onClick={() => setMarkArticle("2")} className={hash === "2" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                    <div className="col-12 col-md-12 col-lg-12">E-declaration for Green Procurement</div>
                                </Link>
                            </div>
                        }
                        {typeId === "2" &&
                            <div className="row mark-leftbtn justify-content-between">
                                <Link to={`/en_ProcurementInfo?type=2#3`} onClick={() => setMarkArticle("3")} className={markArticle === "3" || hash === "3" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                    <div className="">Green Procurement for</div>
                                    <div className="">private enterprises and organizations</div>
                                </Link>
                            </div>
                        }
                    </div>

                    {typeId === "1" &&
                        <div className="col-lg-9 col-md-12">
                            <div className="row">
                                <div className="col-12 mark-greenbar d-flex justify-content-center align-items-center" style={{ backgroundColor: "#6CB15E" }}>
                                    <h5 >{title}</h5>
                                </div>

                                {markArticle === "1" &&
                                    <div className="col-12 mark-greenbar mt-2 mb-2 p-2">
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            product production. Taiwan’s government agencies including public schools, public enterprises or organizations, and military authorities should procure environmental preferable products in priority.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            The Article 96 of the Government Procurement Act was promulgated on May 1998, it stated, “An entity may provide in the tender documentation that preference shall be given to a product which has been permitted to use a label of environmental protection approved by the government”. Later, the Environmental Protection Administration (EPA) and Public Construction Commission jointly published the Regulations for Priority Procurement of Eco-Products in 1999. It defined the specific terms used when addressing the issue of environmental protection products, the governmental procurement specification, and commendation for government agencies that adopts using environmentally preferable products.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            In order to adapt the trend of green consuming of the 21st century, the Executive Yuan promulgated Program for Priority Procurement of Government Agencies in July 2001. Then, the Directions for the Performance Appraisal of Priority Procurement of Government Agencies was made as a guidelines to evaluate the overall performance of the procurement program. . The performance appraisal committee was set up to evaluate the performance in accordance of the weighting criteria and appraisal index. The Program defined clearly the proportion of the environmentally preferable product and the category of the product that the governmental agency shall purchase. The EPA set the green procurement goal as 95% by 2020 and it is amended annually according to yearly performance.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Along with the Taiwanese government green procurement effort, the Article 22 of Resources Recycling Act stated government agencies, public schools, public enterprises and organizations, and military authorities should purchase the prioritized products listed. These prioritized products listed were named as priority procurement products (1st Batch) for government agencies, public schools, public enterprises or organizations, and military authorities.
                                        </p>
                                        <br /><br />
                                    </div>
                                }

                                {markArticle === "2" &&
                                    <div className="col-12 mark-greenbar mt-2 mb-2 p-2">
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            In order to simplify the green procurement declaration by the government agencies, EPA set up a web-based E-declaration system green procurement in 1996. It integrated green procurement data of each agency automatically into the system, providing statistical information and result for the annual performance appraisal. The E-declaration system integrate real-time results for the head of each agencies to understand and inspect the correctness of declared data. It also helps manage the outcomes of green procurement and analyse the environmental effects of the categories and capital of each agency.
                                        </p>
                                        <p className="pt-3 mb-2 col-11">
                                            <h5 style={{ fontSize: "calc(12px + 1vw)", color: "#6CB15E" }}>Relevant Functions of E-declaration</h5>
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            1. Utilize online resources of agency and purchases information of collaborative supplying contract to simplify the procedures of declaration, reduce the loading of paper work and improve the efficiency and  correctness.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            2. Provide information of product categories and product amount to estimate the environmental effects of green procurement.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            3. Implement organised e-management to swiftly have situation of promoting green procurement of each agency in hand.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            4. Use statistical measures to analyse relevant information of each agency to be critical references for policy planning.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            5. The declaration system is of organised management to offer chief agencies with real-time situation report and to inspect correctness of declared information of each agency.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            6. Integrate all declared green procurement information and the system can automatically produce forms for different level, statistical data and ratio counts of purchases.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            7. Introduce in purchases information of collaborative supplying contract to analyse the categories and capital of purchases of each agency as a basis for yearly assessment of announced and assigned categories of green procurement.
                                        </p>
                                        <br /><br />
                                    </div>
                                }
                            </div>
                        </div>
                    }

                    {typeId === "2" &&
                        <div className="col-lg-9 col-md-12">
                            <div className="row">
                                <div className="col-12 mark-greenbar d-flex justify-content-center align-items-center" style={{ backgroundColor: "#6CB15E" }}>
                                    <h5 >{title}</h5>
                                </div>

                                {markArticle === "3" &&
                                    <div className="col-12 mark-greenbar mt-2 mb-2 p-2">
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Green procurement and consumerism are the essential core values for enterprises in pursuit of sustainable development. The Environmental Protection Administrations of R.O.C (Taiwan) encourages local enterprises to implement green purchases, putting green products which would be more low-polluting, energy-saving, recyclable at the top of the procurement list.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            EPA makes an effort to lead enterprises creating a green supply chain. As the demand for green products raise, manufacturer will be requested to be in accordance with the up-to-the-minute environmental regulations. The ultimate goal is to assist enterprises to propose projects such as green purchases, mechanism of green supply chain, and education of green consuming for employees, activities of environmental protection and services of recycling.
                                        </p>
                                        <br /><br />
                                        <p className="pt-3 mb-2 col-11">
                                            <h5 style={{ fontSize: "calc(12px + 1vw)", color: "#6CB15E" }}>Efforts of the EPA</h5>
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            1. Encourage enterprises and their suppliers to support green purchases, increase green procurement on eco-labeled products, such as Green Mark.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            2. Encourage the enterprises to establish e-learning network on green consumerism for employees and suppliers.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            3. Collect and share case study on successful communication on green consumerism among employees and management.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            4. Provide integrated counseling of green purchases: Support the enterprises to organize green purchases educational training.
                                        </p>
                                        <br /><br />
                                        <p className="pt-3 mb-2 col-11">
                                            <h5 style={{ fontSize: "calc(12px + 1vw)", color: "#6CB15E" }}>The Benefits of Green Procurement Declaration for Private Sector</h5>
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            1. Enterprises that registered in Taiwan are eligible to declare their green procurement. Eco-labeled products: Type I (Green Mark), Type II (Type 2 Green Mark) and Type III (includes Energy Label, Water Conservation Label, Green Building Material Label) are open for declaration. Furthermore, green products that certified by other foreign eco-label organizations such as energy stars, FSC, PEFC and etc. are also accepted for declaration.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            2. The declaration for private sector method is based self-managed & integrity, in which one is fully responsible for its declaration. Amount and details green purchases could be declared using web based system in order to simplify the administrational procedures.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            3. In order to boost up the declaration, enterprises that accomplish declaration above the amount of NT$50 million within the effective date are eligible appraisal by EPA,to honour its contribution in environmental protection and CSR.
                                        </p>
                                        <br /><br />
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(EnglishProcurementInfo);
