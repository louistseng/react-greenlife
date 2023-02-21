import React, { useEffect, useState } from 'react';
import { useHistory, Link, withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import '../GreenLiving/GreenLabel.css';
import markBanner from '../images1/img/english_mark.jpg';
// import greenLogo1 from '../images1/greenLogo(70x70).png';
import greenLogo1 from '../images1/greenLogo.webp';
import greenLogo2 from '../images1/greenLogo2.png';
import markInfo1 from '../images1/img/en-mark-icon/markInfo/mark-info-1.png';
import markInfo2 from '../images1/img/en-mark-icon/markInfo/mark-info-2.png';
import markInfo3 from '../images1/img/en-mark-icon/markInfo/mark-info-3.jpg';
import markInfo4 from '../images1/img/en-mark-icon/markInfo/mark-info-4.jpg';
import markInfo5 from '../images1/img/en-mark-icon/markInfo/mark-info-5.jpg';
import { MarkTableData } from '../EnglishVersion_Json'

const EnglishBreadcrumb = React.lazy(() => import('../Components/EnglishBreadcrumb'));
const Footer = React.lazy(() => import('../Components/EnglishVersion/EnglishFooter'));

function EnglishGreenMarkInfo() {
    let history = useHistory()
    const hash = window.location.hash.split("#")[1] || "1"
    const [markArticle, setMarkArticle] = useState(hash || "1")
    const [title, setTitle] = useState("The Green Mark")

    useEffect(() => {
        switch (markArticle) {
            case "1": setTitle("The Green Mark")
                break;
            case "2": setTitle("The Effort to Promote Green Mark in Taiwan")
                break;
            case "3": setTitle("About Global Eco-Labeling Cooperation")
                break;
            case "4": setTitle("Contact of certification institutions")
                break;
            default: setTitle("The Green Mark")
        }
    }, [markArticle, title])

    return (
        <>
            <EnglishBreadcrumb />
            <div><img src={markBanner} className="w-100 banner" alt="markBanner" /></div>
            <div>
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">
                        <div className="row mark-leftbtn justify-content-between">
                            <Link to={`#1`} onClick={() => setMarkArticle("1")} className={hash === "1" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                <div className="col-12 col-md-12 col-lg-12">The Green Mark</div>
                            </Link>
                            <Link to={`#2`} onClick={() => setMarkArticle("2")} className={hash === "2" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                <div className="col-12 col-md-12 col-lg-12">The Effort to Promote Green Mark in Taiwan</div>
                            </Link>
                            <Link to={`#3`} onClick={() => setMarkArticle("3")} className={hash === "3" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                <div className="col-12 col-md-12 col-lg-12">About Global Eco-Labeling Cooperation</div>
                            </Link>
                            <Link to={`#4`} onClick={() => setMarkArticle("4")} className={hash === "4" ? "mark-leftbtnFocus" : "mark-leftbtnUnfocus"}>
                                <div className="col-12 col-md-12 col-lg-12">Contact of certification institutions</div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row">
                            <div className="col-12 mark-greenbar d-flex justify-content-center align-items-center" style={{ backgroundColor: "#6CB15E" }}>
                                <h5 >{title}</h5>
                            </div>
                            {markArticle === "1" &&
                                <div className="col-12 mark-greenbar mt-2 mb-2">
                                    <div className="col-12 d-flex justify-content-center align-items-center">
                                        <div className="col-2 d-flex justify-content-center align-items-center">
                                            <img src={greenLogo1} alt="greenLogo-1" title="greenLogo-1" style={{ width: "calc(70px + 0.8vw)" }} />
                                        </div>
                                        <div className="col-10">
                                            <h5 style={{ fontSize: "40px", textAlign: "left", borderBottom: "1px solid #6CB15E", color: "#6CB15E", margin: "2% 0" }}>The Green Mark</h5>
                                            <p>The Green Mark represents for “recyclable, low-polluting, and resource-saving”.</p>
                                        </div>
                                    </div>
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        Green consumerism emerged as a worldwide phenomenon since 1970s. The Blue Angel (Der Blaue Engel), a German certification for environmentally friendly products and services was introduced in 1977. Later, the Environmental Choice Program was established by Canadian Government in 1988, and countries around the world (such as Australia, Japan, Thailand and etc.) gradually came up with their own eco-labeling scheme too.
                                    </p>
                                    {/* <br /><br /> */}
                                    {/* <p className="text-center text-bolder"></p> */}
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        The Green Mark is administrated by the Environmental Protection Administrations of R.O.C (Taiwan). It was launched in 1992 in order to encourage companies to manufacture products that have less impact on the environment, reduces wastes and promotes recycling. In long term, the promotion of Green Mark’s products aims to promote green consumerism among consumers to select recyclable, low-polluting, resource-saving products.
                                    </p>
                                    {/* <br /><br /> */}
                                    {/* <p className="text-center text-bolder"></p> */}
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        The certification of Green Mark is designed on the basis of ISO 14024 eco-friendly principles. Practically, it acts as an economic tool to boost products and services that have less impact on environment. As a result, Green Mark is awarded to products in the top 20%-30% of its category.
                                    </p>

                                    <br /><br />

                                    <div className="col-12 mt-2 mb-2">
                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                            <div className="col-2 d-flex justify-content-center align-items-center" style={{ margin: "0 auto" }}>
                                                <img src={greenLogo2} alt="greenLogo-1" title="greenLogo-1" style={{ width: "calc(70px + 0.8vw)" }} />
                                            </div>
                                            <div className="col-10">
                                                <h5 style={{ fontSize: "40px", textAlign: "left", borderBottom: "1px solid #6CB15E", color: "#6CB15E", margin: "2% 0" }}>The Type 2 Green Mark</h5>
                                                <p>The Type 2 Green Mark is awarded to uncategorized products that comply with the standards of Green Mark.</p>
                                            </div>
                                        </div>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            The Type 2 Green Mark is awarded to uncategorized products that comply with the standards of Green Mark.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            On 28th September 2014, the EPA published the Verification Guidelines for the Environmental Claims of Type 2 Green Mark, including the adaptive extent, terms and definitions, properties and requests, labeling and other subjects. The environmental claims included 14 major sections, which are low pollution, being compostable, biodegradability, designs for disassembly, designs for recycling, reusability, using recycled materials, extended product life time, recovered energy, resource-saving manufacturing, using reproducible energy in manufacturing or products, reduction in solid wastes, using phase energy-saving and phase water-saving. Applicant should proclaim three of less environmental claims of their products that fit the verification guidelines.
                                        </p>
                                        <br /><br />
                                    </div>
                                </div>
                            }


                            {markArticle === "2" &&
                                <div className="col-12 mark-greenbar mt-2 mb-2 p-2">
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        Along with the global effort to promote Eco-labeled products, the EPA of Taiwan initiated the Green Mark products labeling as a voluntary scheme of environmental performance certification and product labeling in Taiwan beginning from 1992. It is aimed to endorse products that have less impact on the environment and resource saving, leading to less wastes and promotes recycling.
                                    </p>
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        As the fundamental regulations for the promotion of Green Mark, the Directions for the Promotions of the Green Mark Products and the Directions of Green Mark Verification Commissioning System were published in November 1992. EPA assigned the Industrial Technology Research Institute (ITRT) to draft the Green Mark’s standards and products’ categories, verification procedure to reveal the first chapter for the Green Mark introduction.
                                    </p>
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        In February 1993, the first versions of standards and products’ categories had been published and opened for application. Later in June, first batch of Green Mark certified products were officially available in the market. In February 1996, the official website for the Green Mark (Greenliving Information Platform) was established to enhance the promotion green consumerism. In 1997, the Environment and Development Foundation (EDF) was founded by ITRT as a solitary organization to facilitate the application and verification of the Green Mark and supports the refinement in the standards and products’ categories.
                                    </p>
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        The accumulated number of Green Mark products’ categories is shown in the following chart.
                                    </p>
                                    <br /><br />
                                    <div className="col-12 mt-2 mb-2">
                                        <div className="col-11 d-flex justify-content-center align-items-center" style={{ margin: "0 auto" }}>
                                            <img src={markInfo1} className="w-100" alt="mark-info-1" title="mark-info-1" />
                                        </div>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Thanks to the gradual increase in the amount of products of the Green Mark or Type 2 Green Mark, EPA imposed the post-market verification since March 2011, where Regulations of Management and Operation of Environmental Protection was announced. It’s to clearly define the verification operation, including onsite verification, condition and management in sales area and sampling products for verification. The following figure showed the numbers of certificated products of Green Marks in each year:
                                        </p>
                                        <div className="col-11 d-flex justify-content-center align-items-center" style={{ margin: "0 auto" }}>
                                            <img src={markInfo2} className="w-100" alt="mark-info-2" title="mark-info-2" />
                                        </div>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            In June 2012, EPA announced Directions of the Management for Verification Institutions of Eco-friendly Products to select and manage the certification institutions , which are assigned to cope with application, verification and certification. In November of the same year, EPA assigned the Environment and Development Foundation (EDF) and the Electronics Testing Center (ETC) as the 3rd party certification institutions for the EPA.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>

                                            In the work seminar of GEN in 2018, the attending representative of our country, Chen Jingyuan, General Manager, was invited to give research report on evaluating the overall benefits of ecolabelling in our country in recent years, and voluntarily joined the ecolabelling performance evaluation research carried out by the Oeko-Institute appointed by German government. In the report, representative of our country systematically introduced the evaluation of ecolabelling benefits in various aspects since 2010, starting from the earliest ecolabelling economic benefits evaluation in our country, evolving to evaluating the environmental benefits of individual products; subsequently, redeveloped the environmental benefit index of a single value, and carried out the development of automatic environmental benefits calculation starting from 2018, only a few GEN members tried to carry out the aforesaid operation, over the years, in relevant GEN meetings, only representatives from Korea, China and our country once proposed the report in similar directions, and our technological leading in this part was the main reason why Oeko-Institute invited our country to join the research continuously.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Besides, owing to long-term input and establishment of reputation and connection, Chen, Ching-Yuan, General Manager of Environment and Development Foundation, has been successfully elected as the director of two-year term again with the second highest votes, which maintains our country's image of technological leading, and GEN platform is utilized to promote the international ecolabelling cooperation and southward development policy of our country; in the board meeting after annual meeting, apart from accepting the assignment of the chairman to continue to carry out GEN performance evaluation research, General Manager, Chen, Ching-Yuan, has also voluntarily joined the task group newly set by board meeting, which will carry out research on how to improve the degree of participation of GEN members and how to facilitate international cooperations between and among GEN members, and propose specific suggestions in the next board meeting.
                                        </p>
                                        <br /><br />
                                    </div>
                                </div>
                            }


                            {markArticle === "3" &&
                                <div className="col-12 mark-greenbar mt-2 mb-2">
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        Since German has established the first global blue angel ecolabelling in 1978, green production and consumption have become the important part in promoting sustainable development, and after long-term efforts from all walks of life, among 17 Sustainable Development Goals (SDG) passed and adopted by United Nation in September 2015, “Responsible production and consumption” also has been included in global goals and tools for promoting sustainable development, therefore, in order to promote green consumption and production, national governments and civil organizations have been facilitating ecolabelling and procurement initiative among governmental and private enterprises successively and vigorously.
                                    </p>
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>

                                        Our country has been promoting ecolabelling system since 1992, and actively exchanging and interacting with foreign ecolabelling organizations, introducing the latest international trend and exchanging and promoting experiences with organizations from various countries.
                                    </p>
                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        In 1994, the Global Ecolabelling Network (GEN for short), comprising of over twenty major ecolabelling organizations worldwide, was established officially, and our country is one of the founding member states, it has been promoting mutual cooperations between and among global ecolabelling organizations successively; Dr. Yu Ning and General Manager, Chen, Ching-Yuan from the ecolabelling execution unit of our country once took the post of chairman and director of such organization respectively.
                                    </p>

                                    <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                        Since the issue of environmental protection has become increasingly important, global green business opportunities has been increasingly day by day, the influence of ecolabelling in each country rises accordingly, and the requirements in the transnational environmental protection inspection mechanism caused by international sales of products increase. Despite many countries have established ecolabelling or similar systems, due to the differences in laws and regulations, natural environment, customs and culture, and people's livelihood conditions in each country, the specification standards and certification methods formulated by each country are different, if manufacturers carry out ecolabelling certification in each country repeatedly, it will consume costs and waste resources massively, which especially has obvious impact on the export-oriented countries. In respond to such challenge, Environmental Protection Administration has been devoting to international exchange of ecolabelling, establishing mutual recognition or cooperative mechanism with various countries, and continuously participating in the activities of Global Ecolabelling Network to have close exchange with ecolabelling organizations from various countries.
                                    </p>

                                    <br /><br />

                                    <div className="col-12 mt-2 mb-2">
                                        <div className="col-11 d-flex justify-content-center align-items-center" style={{ margin: "0 auto" }}>
                                            <img src={markInfo3} className="w-100" alt="mark-info-3" title="mark-info-3" />
                                        </div>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Since September 1995, Sino-Canada bilateral cooperation has been carried out between the ecolabelling plan of our country and Canadian Environmental Choice Program (currently has undertaken and executed by UL Environment Company from North America), studying on the possibility of mutual recognition and cooperation between both parties, and memorandum of understanding was signed in October 1995, it is one of the goals for the cooperation and efforts of international ecolabelling, and it is the first mutual recognition case of Global Ecolabelling Network, and the outcome thereof is deeply recognized internationally. After that, our country has signed the mutual recognition agreements with US, Thailand, Korea, Australia, Japan, New Zealand, Ukraine, Czech Republic and Philippines successively, which is good for reducing unnecessary trade barriers and international circulation of green products.
                                        </p>
                                        <div className="col-11 d-flex justify-content-center align-items-center" style={{ margin: "0 auto" }}>
                                            <img src={markInfo4} className="w-100" alt="mark-info-4" title="mark-info-4" />
                                        </div>

                                        <div className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            <Table striped bordered hover>
                                                <thead style={{ backgroundColor: "rgba(108, 177, 94, 0.3)" }}>
                                                    <tr>
                                                        <th>Partners</th>
                                                        <th>Measures of Mutual Recognition</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {MarkTableData.map((d, index) =>
                                                        <tr key={index}>
                                                            <td><img src={d.img} className="w-100" alt={`mark-county-info-${index}`} title={`mark-county-info-${index}`} /></td>
                                                            <td>{d.content}</td>
                                                        </tr>
                                                    )}
                                                    <tr>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Apart from the aforesaid mutual recognition agreement, when taking the post of the chairman of GEN, Dr. Yu Ning from the ecolabelling execution unit of our country proposed the idea of Global Ecolabelling Network International Coordinated Ecolabelling System (GENICES for short), currently it has become one of the most important policies of Global Ecolabelling Network.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            The fundamental spirit of GENICES lies in carrying out peer review on membership organizations by GEN directors, based on two standards, namely ISO 14024 and ISO/IEC Guide 65, confirm that the member’s label has independent impartiality, has established quality management system and been conforming to the first class ecolabelling system, and issue certificate to members who have passed the review to testify that their certification processes and qualities are conforming to requirements. Such testification can effectively solve the problem of lack of trust caused due to both parties in mutual recognition don’t understand the certification process and quality of each other when promoting mutual recognition business in previous years.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Currently, over twenty GEN membership organizations including our country have passed the GENICES peer review, eligible members have signed the memorandum of understanding in the annual meeting of GEN in Stockholm in 2017, through GENICES peer review system, it will continuously expand the promotion of cooperations between and among GEN membership organizations.
                                        </p>
                                        <p className="pt-3 mb-2 col-11" style={{ margin: "0 auto" }}>
                                            Since our country has been implementing ecolabelling system for a long time, globally it is the second batch country promoting the system after German's blue angel ecolabelling, approximately starting at the same time with ecolabelling in European Union, Canada and Japan, and together with ecolabelling organizations from US, Canada, Japan, EU etc., our country is the initiating country of GEN organization, hence it is originally the major membership country with stronger motility internationally. Besides, the effect of ecolabelling and green government procurement in our country is outstanding, our country is the first country promoting green institutional procurement by law globally, in recent years, there are over thousands of product certification cases each year, and the specification standards and product items are only next to Korea. (As shown in the following picture)
                                        </p>
                                        <div className="col-11 d-flex justify-content-center align-items-center" style={{ margin: "0 auto" }}>
                                            <img src={markInfo5} className="w-100" alt="mark-info-5" title="mark-info-5" />
                                        </div>
                                        <br /><br />
                                    </div>
                                </div>
                            }
                            {markArticle === "4" &&
                                <div className="col-12 mt-4 mb-4" style={{ margin: "0 auto" }}>
                                    <Table striped bordered hover responsive="sm">
                                        <thead style={{ backgroundColor: "rgba(108, 177, 94, 0.3)" }}>
                                            <tr className="col-12">
                                                <th className="col-3">Certification institutions</th>
                                                <th className="col-3">Address</th>
                                                <th className="col-3">Telephone</th>
                                                <th className="col-3">E-mail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Electronics Testing Center,Taiwan</td>
                                                <td>No. 8, Ln. 29, Wenming Rd., Guishan Dist., Taoyuan City 333, Taiwan (R.O.C.)</td>
                                                <td>(03)328-0026#139</td>
                                                <td>lily@etc.org.tw</td>
                                            </tr>
                                            <tr>
                                                <td>Environment and Development Foundation</td>
                                                <td>No. 195, Sec. 4, Zhongxing Rd., Zhudong Township, Hsinchu County 310, Taiwan (R.O.C.)</td>
                                                <td>0800-300-556</td>
                                                <td>sherry@edf.org.tw</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(EnglishGreenMarkInfo);
