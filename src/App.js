import React, { useState, Fragment, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import NavRoute from './utils/NavRoute';
import { AuthContext } from './utils/Context';
import './App.css';
import AOS from 'aos';
import "aos/dist/aos.css";

import $ from 'jquery';
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import TestBanner from './Components/TestBanner';
import CacheBuster from './Components/cache/CacheBuster';

import { CookiesProvider } from 'react-cookie';
import { clickLogout } from './utils/Functions';
import { useCookies } from "react-cookie";
//包Google Analytics
import withTracker from './Analytics';

const Main = React.lazy(() => import('./Main'));
const About = React.lazy(() => import('./About'));

const EnglishMain = React.lazy(() => import('./EnglishMain'));
const EnglishAbout = React.lazy(() => import('./EnglishAbout'));
const EnglishSiteNav = React.lazy(() => import('./EnglishSiteNav'));

const Activity = React.lazy(() => import('./Activity'));

const SearchEvent = React.lazy(() => import('./SearchEvent'));
const EventDetail = React.lazy(() => import('./EventDetail'));
const LocalEvents = React.lazy(() => import('./LocalEvents'));
const GameEvent = React.lazy(() => import('../src/events/GameEvent'));
const ConferenceEvent = React.lazy(() => import('../src/events/ConferenceEvent'));
const ConferenceEventPage = React.lazy(() => import('../src/events/ConferenceEventPage'));
const GreenPoint = React.lazy(() => import('./GreenPoint/GreenPoint'));
const DailyGreen = React.lazy(() => import('./DailyGreen/DailyGreen'));
const Knowledge = React.lazy(() => import('./DailyGreen/Knowledge'));
const KnowPage = React.lazy(() => import('./DailyGreen/KnowPage'));
const Article = React.lazy(() => import('./DailyGreen/Article'));
const ArticleInfo = React.lazy(() => import('./DailyGreen/ArticleInfo'));
const ArticlePage = React.lazy(() => import('./Member/ArticlePage'));
const DailyBlog = React.lazy(() => import('./DailyGreen/DailyBlog'));
const DailyBlogPage = React.lazy(() => import('./DailyGreen/DailyBlogPage'));

const GetScore = React.lazy(() => import('./DailyGreen/Expert/GetScore'));
const ScoreIsland = React.lazy(() => import('./DailyGreen/Expert/ScoreIsland'));

const SiteNav = React.lazy(() => import('./SiteNav'));

const FlipTour = React.lazy(() => import('./flipGrid/FlipTour'));
// const FlipTourNew = React.lazy(() => import('./flipGrid/FlipTour1'));
const FlipShopping = React.lazy(() => import('./flipGrid/FlipShopping'));
const FlipOffice = React.lazy(() => import('./flipGrid/FlipOffice'));
const FlipHome = React.lazy(() => import('./flipGrid/FlipHome'));
const FlipEnergy = React.lazy(() => import('./flipGrid/FlipEnergy'));
const FlipFood = React.lazy(() => import('./flipGrid/FlipFood'));

// 英文版
const EnglishFlipTour = React.lazy(() => import('./flipGrid/EnglishFlipTour'));
const EnglishFlipFood = React.lazy(() => import('./flipGrid/EnglishFlipFood'));
const EnglishFlipShopping = React.lazy(() => import('./flipGrid/EnglishFlipShopping'));
const EnglishFlipHome = React.lazy(() => import('./flipGrid/EnglishFlipHome'));
const EnglishFlipOffice = React.lazy(() => import('./flipGrid/EnglishFlipOffice'));
const EnglishMark = React.lazy(() => import('./GreenLiving/EnglishMark'));
const EnglishMarkInfo = React.lazy(() => import('./GreenLiving/EnglishGreenMarkInfo'));
const EnglishProcurement = React.lazy(() => import('./GreenLiving/EnglishProcurement'));
const EnglishProcurementInfo = React.lazy(() => import('./GreenLiving/EnglishProcurementInfo'));



const GreenTour = React.lazy(() => import('./GreenTour/GreenTour'));
const GreenTourPage1 = React.lazy(() => import('./GreenTour/GreenTourPage1'));
const TourIntro = React.lazy(() => import('./GreenTour/TourIntro'));
// const TourIntroNew = React.lazy(() => import('./GreenTour/TourIntro1'));
const TourDownload = React.lazy(() => import('./GreenTour/TourDownload'));

const GreenResta = React.lazy(() => import('./GreenRestaurant/GreenResta'));
const RestaPage = React.lazy(() => import('./GreenRestaurant/RestaPage'));
const resIntro = React.lazy(() => import('./GreenRestaurant/RestaIntro'));
const resDownload = React.lazy(() => import('./GreenRestaurant/ResDownload'));

const GreenShopIntro = React.lazy(() => import('./GreenShop/GreenShopIntro'));
const GreenShop = React.lazy(() => import('./GreenShop/GreenShop'));
const ShopPage = React.lazy(() => import('./GreenShop/ShopPage'));
const OnlineShopPage = React.lazy(() => import('./GreenShop/OnlineShopPage'));
const GreenShopDownload = React.lazy(() => import('./GreenShop/GreenShopDownload'));

const GreenLabel = React.lazy(() => import('./GreenLiving/GreenLabel'));
const GreenPurChase = React.lazy(() => import('./GreenLiving/GreenPurChase'));
const GreenProductDetailsGov = React.lazy(() => import('./GreenLiving/GreenProductDetailsGov'));
const GreenProductDetailsAffair = React.lazy(() => import('./GreenLiving/GreenProductDetailsAffair'));
const GreenProductDetailsThirdMark = React.lazy(() => import('./GreenLiving/GreenProductDetailsThirdMark'));
const GreenProductDetailsGroup = React.lazy(() => import('./GreenLiving/GreenProductDetailsGroup'));
const GreenProductForeign = React.lazy(() => import('./GreenLiving/GreenProductForeign'));
const GreenProductLaboratory = React.lazy(() => import('./GreenLiving/GreenProductLaboratory'));
{/*標章及採購-環保標章內頁*/ }
const GreenMarkIntroFirst = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroFirst'));
const GreenMarkIntroSecond = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroSecond'));
const GreenMarkIntroDeclarations = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroDeclarations'));
const GreenMarkIntroHistory = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroHistory'));
const GreenMarkIntroThanking = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroThanking'));
const GreenMarkIntroInternational = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroInternational'));
const GreenMarkIntroCriteriaDraft = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroCriteriaDraft'));
const GreenMarkIntroCriteriaReviewProcedures = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroCriteriaReviewProcedures'));
const GreenMarkIntroLaboratory = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroLaboratory'));
const GreenMarkIntroLabApprovedList = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroLabApprovedList'));
const GreenMarkIntroCertificationLab = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroCertificationLab'));
const GreenMarkIntroApprovalPractice = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroApprovalPractice'));
const GreenMarkIntroMarkApply = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApply'));
const GreenMarkIntroMarkApplyFirst = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplyFirst'));
const GreenMarkIntroMarkApplySecond = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplySecond'));
const GreenMarkIntroMarkApplyThird = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplyThird'));
const GreenMarkIntroMarkApplyFourth = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplyFourth'));
const GreenMarkIntroMarkApplySeviceIndex = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplySeviceIndex'));
const GreenMarkIntroMarkApplySeviceFirst = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplySeviceFirst'));
const GreenMarkIntroMarkApplySeviceSecond = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplySeviceSecond'));
const GreenMarkIntroMarkApplySeviceThird = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplySeviceThird'));
const GreenMarkIntroMarkApplySeviceFourth = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroMarkApplySeviceFourth'));
const GreenMarkIntroApis = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroApis'));
{/*const GreenMarkIntroLockFactory = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroLockFactory'));*/ }
const GreenMarkIntroLawMarkApplication = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroLawMarkApplication'));
const GreenMarkIntroLawCouncilResolution = React.lazy(() => import('./GreenLiving/GreenMarkIntro/GreenMarkIntroLawCouncilResolution'));
const GreenPurchaseIntroLaw = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroLaw'));
const GreenPurchaseIntroElectronicReport = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroElectronicReport'));
const GreenPurchaseIntroGovernment = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroGovernment'));
const GreenPurchaseIntroPriEnterprises = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroPriEnterprises'));
const GreenPurchaseIntroEnterprisesPurch = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroEnterprisesPurch'));
const GreenPurchaseIntroPurchasePlan = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroPurchasePlan'));
const GreenPurchaseIntroPurchaseAchieve = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseIntroPurchaseAchieve'));
const GreenPurchaseProcurementPromote = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseProcurementPromote'));
const GreenPurchaseGovPurchseLaw = React.lazy(() => import('./GreenLiving/GreenPurchaseIntro/GreenPurchaseGovPurchseLaw'));

const GreenShopApply = React.lazy(() => import('./GreenShop/GreenShopIntro/GreenShopApply'));
const GreenShopReview = React.lazy(() => import('./GreenShop/GreenShopIntro/GreenShopReview'));
const GreenShopTrack = React.lazy(() => import('./GreenShop/GreenShopIntro/GreenShopTrack'));
const GreenShopStatistics = React.lazy(() => import('./GreenShop/GreenShopIntro/GreenShopStatistics'));

const GreenProductIntro = React.lazy(() => import('./GreenProduct/GreenProductIntro'));
const GreenProduct = React.lazy(() => import('./GreenProduct/GreenProduct'));
const ProductPage = React.lazy(() => import('./GreenProduct/ProductPage'));
const GreenProductReport = React.lazy(() => import('./GreenProduct/GreenProductReport'));
const GreenProductCount = React.lazy(() => import('./GreenProduct/GreenProductCount'));

const GreenSpecificationSearch = React.lazy(() => import('./GreenProduct/GreenSpecificationSearch'));
const GreenProductDownload = React.lazy(() => import('./GreenProduct/GreenProductDownload'));


const GreenAccom = React.lazy(() => import('./GreenAccom/GreenAccom'));
const AccomIntro = React.lazy(() => import('./GreenAccom/AccomIntro'));
const AccomDownload = React.lazy(() => import('./GreenAccom/AccomDownload'));
const AccomPage = React.lazy(() => import('./GreenAccom/AccomPage'));

const GreenOffice = React.lazy(() => import('./GreenOffice/GreenOffice'));
const ApplyOffice = React.lazy(() => import('./GreenOffice/ApplyOffice'));
const OfficeArticlePage = React.lazy(() => import('./GreenOffice/OfficeArticlePage'));
const OfficeArticles = React.lazy(() => import('./GreenOffice/OfficeArticles'));
const Participate = React.lazy(() => import('./GreenOffice/Participate'));
const Steps = React.lazy(() => import("./GreenOffice/Steps"));

const PointEnergy = React.lazy(() => import("./GreenOffice/OfficePoint/PointEnergy"));
const PointReduce = React.lazy(() => import("./GreenOffice/OfficePoint/PointReduce"));
const PointShop = React.lazy(() => import("./GreenOffice/OfficePoint/PointShop"));
const Environment = React.lazy(() => import("./GreenOffice/OfficePoint/Environment"));
const Advocacy = React.lazy(() => import("./GreenOffice/OfficePoint/Advocacy"));

const GoogleSearch = React.lazy(() => import('./GoogleSearch'));

const AdvancingPage = React.lazy(() => import('./AdvancingPage'))
const Login = React.lazy(() => import('./Login'));
const Policy = React.lazy(() => import('./Policy'));
const PolicyForGPoint = React.lazy(() => import('./PolicyForGPoint'));
const SignUpOptions = React.lazy(() => import('./SignUpOptions'));
const SignUpNormal = React.lazy(() => import('./SignUpNormal'));
const SignUpOrg = React.lazy(() => import('./SignUpOrg'));
const PublicSignUp = React.lazy(() => import("./SignUp/PublicSignup"));
const CompSignUp = React.lazy(() => import("./SignUp/CompSignup"));
const GovSignUp = React.lazy(() => import("./SignUp/GovSignup"));
const Edit = React.lazy(() => import("./Member/EditProfile/Edit"));
const MemberPage = React.lazy(() => import("./Member/MemberPage"));
const ActivityUpload = React.lazy(() => import("./Member/share/ActivityUpload"));
const ActivityPage = React.lazy(() => import("./Member/ActivityPage"));
const ConferenceUpload = React.lazy(() => import("./Member/share/ConferenceUpload"));
const ConferencePage = React.lazy(() => import("./Member/ConferencePage"));
const BookMark = React.lazy(() => import("./Member/BookMark"));
const BookMarkShare = React.lazy(() => import("./Member/BookMarkShare"));
const BookMarkBlog = React.lazy(() => import("./Member/BookMarkBlog"));
const BookMarkActivity = React.lazy(() => import("./Member/BookMarkActivity"));
const BookMarkOffice = React.lazy(() => import("./Member/BookMarkOffice"));
const BookMarkKnowledge = React.lazy(() => import("./Member/BookMarkKnowledge"));
const KnowledgePage = React.lazy(() => import("./Member/KnowledgePage"));
const BookMarkConference = React.lazy(() => import("./Member/BookMarkConference"));

const EditOffice = React.lazy(() => import("./Member/EditOffice"));
const ShareGreen = React.lazy(() => import("./Member/share/ShareGreen"));
const ShareBlog = React.lazy(() => import("./Member/share/ShareBlog"));
const ShareOffice = React.lazy(() => import("./Member/share/ShareOffice"));
const ShareKnowledge = React.lazy(() => import("./Member/share/ShareKnowledge"));


const TourApply = React.lazy(() => import("./Member/share/TourList"));

const EditBlog = React.lazy(() => import("./Member/EditBlog"));
const BlogPage = React.lazy(() => import("./Member/BlogPage"));
const OfficePage = React.lazy(() => import("./Member/OfficePage"));
const ResetPwd = React.lazy(() => import("./Member/ResetPwd"));
const ForgetPwd = React.lazy(() => import("./Member/ForgetPwd"));

const EditComp = React.lazy(() => import("./Member/EditProfile/EditComp"));
const EditGov = React.lazy(() => import("./Member/EditProfile/EditGov"));

const Evaluation = React.lazy(() => import("./Member/office/Evaluation"));
const EvaluationEdit = React.lazy(() => import("./Member/office/EvaluationEdit"));
const OfficeApplyManagement = React.lazy(() => import("./Member/Management/office/OfficeManagement"));
const OfficeApplyReview = React.lazy(() => import("./Member/Management/office/Review"));
const OfficeApplyProcess = React.lazy(() => import("./Member/Management/office/Process"));
const BlogManagement = React.lazy(() => import("./Member/Management/blog/BlogManagement"));
const BlogReview = React.lazy(() => import("./Member/Management/blog/BlogReview"));
const BlogProcess = React.lazy(() => import("./Member/Management/blog/BlogProcess"));
const ActivityManagement = React.lazy(() => import("./Member/Management/activity/ActivityManagement"));
const ActivityReview = React.lazy(() => import("./Member/Management/activity/ActivityReview"));
const ActivityProcess = React.lazy(() => import("./Member/Management/activity/ActivityProcess"));
const ArticleManagement = React.lazy(() => import("./Member/Management/officeArticle/ArticleManagement"));

const KnowledgeManagement = React.lazy(() => import("./Member/Management/knowledge/KnowledgeManagement"));
const KnowledgeReview = React.lazy(() => import("./Member/Management/knowledge/KnowledgeReview"));
const KnowledgeProcess = React.lazy(() => import("./Member/Management/knowledge/KnowledgeProcess"));

const GroupTourManagement = React.lazy(() => import("./Member/Management/groupTour/GroupTourManagement"));
const GroupTourProcess = React.lazy(() => import("./Member/Management/groupTour/GroupTourProcess"));

//Download
const Material = React.lazy(() => import("./Member/Management/Download/Material"));

const ArticleReview = React.lazy(() => import("./Member/Management/officeArticle/ArticleReview"));
const ArticleProcess = React.lazy(() => import("./Member/Management/officeArticle/ArticleProcess"));
const GreenManagement = React.lazy(() => import("./Member/Management/myGreen/GreenManagement"));
const GreenReview = React.lazy(() => import("./Member/Management/myGreen/GreenReview"));
const GreenProcess = React.lazy(() => import("./Member/Management/myGreen/GreenProcess"));
const UserInfo = React.lazy(() => import("./Member/Management/UserInfo"));
const PointMission = React.lazy(() => import("./Member/GreenPoint/PointMission"));
const PointRecord = React.lazy(() => import("./Member/GreenPoint/PointRecord"));
const RewardPoint = React.lazy(() => import("./Member/GreenPoint/RewardPoint"));
const ClickRecordPage = React.lazy(() => import("./Member/Management/ClickRecordPage"));
const ClickDetail = React.lazy(() => import("./Member/Management/ClickDetail"));

const Error = React.lazy(() => import("./Error"));

const MainDownload = React.lazy(() => import("./Download/MainDownload"));
const GraphDownload = React.lazy(() => import("./Download/GraphDownload"));
const VisualDownload = React.lazy(() => import("./Download/VisualDownload"));
const PromoteResult = React.lazy(() => import('./Download/PromoteResult'));
const EnvironmentTeacher = React.lazy(() => import('./Download/EnvironmentTeacher'));

const EmailService = React.lazy(() => import('./CustomerService/EmailService'));
const CallService = React.lazy(() => import('./CustomerService/CallService'));

const GreenGame = React.lazy(() => import('./GreenGame/GreenGame'));
const GamePage = React.lazy(() => import('./GreenGame/FirstGame/GamePage'));
const AchievementPage = React.lazy(() => import('./GreenGame/AchievementPage'));
const KnGamePage = React.lazy(() => import('./GreenGame/SecondGame/KnGamePage'));
const HouseGamePage = React.lazy(() => import('./GreenGame/ThirdGame/HouseGamePage.js'));

const TestGa = React.lazy(() => import('./TestGa'));

const WebsiteMaintenance = React.lazy(() => import('./WebsiteMaintenance'));

//loading動畫的樣式
const override = css`
 display: block;
 top:40%;
 left:calc(50% - 30px);
 position:absolute;
`;


function App() {

    //useContext可以在component之間自由傳值
    const [contextMemberInfo, setContextMemberInfo] = useState(null)
    const [contextFriendGuid, setContextFriendGuid] = useState(null)
    const contextObject = { contextMemberInfo, setContextMemberInfo, contextFriendGuid, setContextFriendGuid }

    const [greenlifeCookies, setGreenlifeCookies, removeCookie] = useCookies([]);
    const collector = greenlifeCookies.userGuid || "";

    // 測試機紅字顯示
    let domainBanner = window.location.hostname;

    let SSL = "https:";
    let domain = window.location.hostname;
    if (domain === "localhost") { domain = 'greenlife.eri.com.tw' }

    //當視窗寬度改變時重新抓目前字體大小-處理導覽列字體放大縮小按鈕的bug
    useEffect(() => {
        function handleResize() {
            $('[style*="font-size"]').css('font-size', '');
        }
        window.addEventListener('resize', handleResize)
    })

    //關閉視窗就會自動清掉sessionStorage所以userGuid不存在視為登出
    useEffect(() => {
        if (!sessionStorage.getItem("userGuid") && greenlifeCookies.refreshToken) {
            clickLogout(removeCookie, collector)
            console.log("clear")
        }
    }, [])

    //AOS在手機裝置停用
    useEffect(() => {
        AOS.init({ disable: 'mobile' });
        AOS.refresh();
    }, []);

    return (
        //清除快取機制
        <CacheBuster>
            {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                if (loading) return null;
                if (!loading && !isLatestVersion) {
                    refreshCacheAndReload();
                }
                return (
                    <>
                        {/* loading動畫 */}
                        <React.Suspense fallback={
                            <HashLoader
                                css={override}
                                size={80}
                                color={"#5cc777"}
                                loading={true}
                            />
                        }>
                            <Router>
                                <Fragment>
                                    {/* 測試機提示字樣 */}
                                    {domainBanner.includes("eri.com.tw") ?
                                        <TestBanner />
                                        :
                                        ""
                                    }
                                    <AuthContext.Provider value={contextObject}>
                                        <CookiesProvider>
                                            <Switch>
                                                {/* NavRoute-給一般頁面 */}
                                                {/* PrivateRoute-給會員權限頁面 */}
                                                <NavRoute path="/AdvancingPage" component={withTracker(AdvancingPage)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/login" component={withTracker(Login)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/Policy" component={withTracker(Policy)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/PolicyForGPoint" component={withTracker(PolicyForGPoint)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/signUp_options" exact component={withTracker(SignUpOptions)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/signUp_options/public_SignUp" component={withTracker(SignUpNormal)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/signUp_options/organization_SignUp" exact component={withTracker(SignUpOrg)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/PbSignUp" component={withTracker(PublicSignUp)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/signUp_options/organization_SignUp/general_SignUp" component={withTracker(CompSignUp)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/signUp_options/organization_SignUp/gov_SignUp" component={withTracker(GovSignUp)} showNavBar={false} SSL={SSL} domain={domain} />

                                                <PrivateRoute path="/member/edit" component={withTracker(Edit)} showNavBar={true} SSL={SSL} domain={domain} migrated={true} />

                                                <PrivateRoute path="/member/shareActivity" component={withTracker(ActivityUpload)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"活動上傳"} migrated={true} />
                                                <PrivateRoute path="/member/BookMarkActivity" component={withTracker(BookMarkActivity)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"活動清單"} migrated={true} />
                                                <PrivateRoute path="/member/ActivityPage" component={withTracker(ActivityPage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"活動內容"} migrated={true} />
                                                <PrivateRoute path="/member/BookMark" component={withTracker(BookMark)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"分享清單"} migrated={true} />
                                                <PrivateRoute path="/member/bookMarkKnowledge" component={withTracker(BookMarkKnowledge)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"知識綠清單"} migrated={true} />
                                                <PrivateRoute path="/member/knowledgePage" component={withTracker(KnowledgePage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"知識綠內容"} migrated={true} />

                                                <PrivateRoute path="/member/bookMarkConference" component={withTracker(BookMarkConference)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"分享清單"} migrated={true} />
                                                <PrivateRoute path="/member/conferencePage" component={withTracker(ConferencePage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"社會議題上傳"} migrated={true} />
                                                <PrivateRoute path="/member/shareConference" component={withTracker(ConferenceUpload)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"社會議題上傳"} migrated={true} />

                                                <PrivateRoute path="/member/memberCenter" component={withTracker(MemberPage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"個人專頁"} migrated={true} />
                                                <PrivateRoute path="/member" exact>
                                                    <Redirect to="/member/memberCenter" />
                                                </PrivateRoute>

                                                <PrivateRoute path="/member/BookMarkShare" component={withTracker(BookMarkShare)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"秀出我的綠清單"} migrated={true} />

                                                <PrivateRoute path="/resetPassword" component={withTracker(ResetPwd)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"帳號資料編輯"} migrated={true} />
                                                <NavRoute path="/regisPassword" component={withTracker(ForgetPwd)} showNavBar={false} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/shareGreen" component={withTracker(ShareGreen)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"分享照片/影片"} migrated={true} />
                                                <PrivateRoute path="/member/shareBlog" component={withTracker(ShareBlog)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"分享網誌"} migrated={true} />
                                                <PrivateRoute path="/member/shareKnowledge" component={withTracker(ShareKnowledge)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"分享知識綠"} migrated={true} />

                                                {/* 綠色旅遊團體行程列表 */}
                                                <PrivateRoute path="/member/tourList" exact component={withTracker(TourApply)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"團體旅遊行程列表"} migrated={true} />

                                                <PrivateRoute path="/member/green_office_upload" component={withTracker(ShareOffice)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"發布綠色辦公經驗分享文章"} migrated={true} />
                                                <PrivateRoute path="/member/BookMarkOffice" component={withTracker(BookMarkOffice)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"綠色辦公分享文章清單"} migrated={true} />
                                                <PrivateRoute path="/member/officePage" component={withTracker(OfficePage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"經驗分享內容"} migrated={true} />
                                                <PrivateRoute path="/member/edit_office" component={withTracker(EditOffice)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"編輯經驗分享文章"} migrated={true} />
                                                <PrivateRoute path="/member/BookMarkBlog" component={withTracker(BookMarkBlog)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"網誌清單"} migrated={true} />
                                                <PrivateRoute path="/member/edit_blog" component={withTracker(EditBlog)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"編輯網誌"} migrated={true} />
                                                <PrivateRoute path="/member/blogPage" component={withTracker(BlogPage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"網誌內容"} migrated={true} />
                                                <PrivateRoute path="/member/articlePage" component={withTracker(ArticlePage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"秀出我的綠內容"} migrated={true} />
                                                <PrivateRoute path="/member/general_auth" component={withTracker(EditComp)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"帳號編輯"} migrated={true} />
                                                <PrivateRoute path="/member/government_auth" component={withTracker(EditGov)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"帳號編輯"} migrated={true} />

                                                {/* / */}
                                                <NavRoute path="/categories/green_office/evaluation" component={withTracker(Evaluation)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/evaluation_edit" component={withTracker(EvaluationEdit)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* / */}

                                                <PrivateRoute path="/member/office_management" exact component={withTracker(OfficeApplyManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/office_management/review" component={withTracker(OfficeApplyReview)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"檢視"} migrated={true} />
                                                <PrivateRoute path="/member/office_management/process" component={withTracker(OfficeApplyProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />

                                                <PrivateRoute path="/member/blog_management" exact component={withTracker(BlogManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/blog_management/review" component={withTracker(BlogReview)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"檢視"} migrated={true} />
                                                <PrivateRoute path="/member/blog_management/process" component={withTracker(BlogProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />

                                                <PrivateRoute path="/member/activity_management" exact component={withTracker(ActivityManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/activity_management/review" component={withTracker(ActivityReview)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"檢視"} migrated={true} />
                                                <PrivateRoute path="/member/activity_management/process" component={withTracker(ActivityProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />

                                                <PrivateRoute path="/member/myGreen_management" exact component={withTracker(GreenManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/myGreen_management/review" component={withTracker(GreenReview)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"檢視"} migrated={true} />
                                                <PrivateRoute path="/member/myGreen_management/process" component={withTracker(GreenProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />

                                                <PrivateRoute path="/member/office_article_management" exact component={withTracker(ArticleManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/office_article_management/review" component={withTracker(ArticleReview)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"檢視"} migrated={true} />
                                                <PrivateRoute path="/member/office_article_management/process" component={withTracker(ArticleProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />
                                                {/* 知識綠route */}
                                                <PrivateRoute path="/member/knowledge_management" exact component={withTracker(KnowledgeManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/knowledge_management/review" component={withTracker(KnowledgeReview)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"檢視"} migrated={true} />
                                                <PrivateRoute path="/member/knowledge_management/process" component={withTracker(KnowledgeProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />

                                                {/* 前台上架-下載專區 */}
                                                <PrivateRoute path="/member/material" exact component={withTracker(Material)} showNavBar={true} SSL={SSL} domain={domain} />

                                                {/* 團體旅遊專區 */}
                                                <PrivateRoute path="/member/groupTour" exact component={withTracker(GroupTourManagement)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <PrivateRoute path="/member/groupTour/process" exact component={withTracker(GroupTourProcess)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"歷程"} migrated={true} />

                                                <PrivateRoute path="/member/user_info" exact component={withTracker(UserInfo)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"使用者帳號管理"} migrated={true} />
                                                <PrivateRoute path="/member/point_mission" exact component={withTracker(PointMission)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"綠生活任務"} migrated={true} />
                                                <PrivateRoute path="/member/point_mission/record" exact component={withTracker(PointRecord)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"我的綠積分查詢"} migrated={true} />
                                                <PrivateRoute path="/member/reward_point" exact component={withTracker(RewardPoint)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"綠積分商城"} migrated={true} />
                                                <PrivateRoute path="/member/click_record" exact component={withTracker(ClickRecordPage)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"瀏覽量檢視"} migrated={true} />
                                                <PrivateRoute path="/member/click_record/detail_page" component={withTracker(ClickDetail)} showNavBar={true} SSL={SSL} domain={domain} currentPage={"瀏覽量(詳細)"} migrated={true} />


                                                <NavRoute path="/" exact component={withTracker(Main)} showNavBar={false} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/about" exact component={withTracker(About)} showNavBar={true} />
                                                {/* <PublicRoute restricted={true} path="/about" exact component={About} /> */}

                                                {/* 英文版 */}
                                                <NavRoute path="/en_Main" exact component={withTracker(EnglishMain)} showEnglishNavBar={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_About" exact component={withTracker(EnglishAbout)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_SiteNav" exact component={withTracker(EnglishSiteNav)} showEnglishNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories" exact component={withTracker(Activity)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/siteNavigator" component={withTracker(SiteNav)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories/greenTour" exact component={withTracker(GreenTour)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/categories/tourIntro" component={withTracker(TourIntro)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                {/* <NavRoute path="/categories/tourIntroNew" component={TourIntroNew} showNavBar={true} SSL={SSL} domain={domain} /> */}
                                                <NavRoute path="/categories/tourDownload" component={withTracker(TourDownload)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/categories/greenTour/detailPage" component={withTracker(GreenTourPage1)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />

                                                <NavRoute path="/categories/restaurant" exact component={withTracker(GreenResta)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/categories/resIntro" component={withTracker(resIntro)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/categories/resDownload" component={withTracker(resDownload)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/categories/restaurant/detailPage" component={withTracker(RestaPage)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />

                                                {/**/}
                                                <NavRoute path="/categories/greenShopIntro" exact component={withTracker(GreenShopIntro)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/greenShopSearch" exact component={withTracker(GreenShop)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/greenShopDetailPage" exact component={withTracker(ShopPage)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/greenOnlineShopDetailPage" exact component={withTracker(OnlineShopPage)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenShopDownload" exact component={withTracker(GreenShopDownload)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories/greenProductIntro" exact component={withTracker(GreenProductIntro)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/greenProductSearch" exact component={withTracker(GreenProduct)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/greenProductdetailPage" component={withTracker(ProductPage)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenProductReport" component={withTracker(GreenProductReport)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenProductCount" component={withTracker(GreenProductCount)} showNavBar={true} SSL={SSL} domain={domain} />


                                                {/* SpecificationSearch */}
                                                <NavRoute path="/categories/GreenSpecificationSearch" exact component={withTracker(GreenSpecificationSearch)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories/GreenProductDownload" component={withTracker(GreenProductDownload)} showNavBar={true} SSL={SSL} domain={domain} />


                                                <NavRoute path="/greenLabel" exact component={withTracker(GreenLabel)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase" exact component={withTracker(GreenPurChase)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenProductDetailsGov" exact component={withTracker(GreenProductDetailsGov)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenProductDetailsAffair" exact component={withTracker(GreenProductDetailsAffair)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenProductDetailsThirdMark" exact component={withTracker(GreenProductDetailsThirdMark)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenProductDetailsGroup" exact component={withTracker(GreenProductDetailsGroup)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenProductForeign" exact component={withTracker(GreenProductForeign)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenProductLaboratory" exact component={withTracker(GreenProductLaboratory)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenProductDetailsGov" exact component={withTracker(GreenProductDetailsGov)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenProductDetailsAffair" exact component={withTracker(GreenProductDetailsAffair)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenProductDetailsThirdMark" exact component={withTracker(GreenProductDetailsThirdMark)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenProductDetailsGroup" exact component={withTracker(GreenProductDetailsGroup)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenProductForeign" exact component={withTracker(GreenProductForeign)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroFirst" exact component={withTracker(GreenMarkIntroFirst)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroSecond" exact component={withTracker(GreenMarkIntroSecond)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroDeclarations" exact component={withTracker(GreenMarkIntroDeclarations)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroHistory" exact component={withTracker(GreenMarkIntroHistory)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroThanking" exact component={withTracker(GreenMarkIntroThanking)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroInternational" exact component={withTracker(GreenMarkIntroInternational)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* 1021建置內頁 */}
                                                <NavRoute path="/greenLabel/GreenMarkIntroCriteriaDraft" exact component={withTracker(GreenMarkIntroCriteriaDraft)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroCriteriaReviewProcedures" exact component={withTracker(GreenMarkIntroCriteriaReviewProcedures)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroLaboratory" exact component={withTracker(GreenMarkIntroLaboratory)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroLabApprovedList" exact component={withTracker(GreenMarkIntroLabApprovedList)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroCertificationLab" exact component={withTracker(GreenMarkIntroCertificationLab)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroApprovalPractice" exact component={withTracker(GreenMarkIntroApprovalPractice)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApply" exact component={withTracker(GreenMarkIntroMarkApply)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplyFirst" exact component={withTracker(GreenMarkIntroMarkApplyFirst)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplySecond" exact component={withTracker(GreenMarkIntroMarkApplySecond)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* 1022建置內頁 */}
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplyThird" exact component={withTracker(GreenMarkIntroMarkApplyThird)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplyFourth" exact component={withTracker(GreenMarkIntroMarkApplyFourth)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplySeviceIndex" exact component={withTracker(GreenMarkIntroMarkApplySeviceIndex)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplySeviceFirst" exact component={withTracker(GreenMarkIntroMarkApplySeviceFirst)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplySeviceSecond" exact component={withTracker(GreenMarkIntroMarkApplySeviceSecond)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplySeviceThird" exact component={withTracker(GreenMarkIntroMarkApplySeviceThird)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroMarkApplySeviceFourth" exact component={withTracker(GreenMarkIntroMarkApplySeviceFourth)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroApis" exact component={withTracker(GreenMarkIntroApis)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/*<NavRoute path="/greenLabel/GreenMarkIntroLockFactory" exact component={withTracker(GreenMarkIntroLockFactory)} showNavBar={true} SSL={SSL} domain={domain} />*/}
                                                <NavRoute path="/greenLabel/GreenMarkIntroLawMarkApplication" exact component={withTracker(GreenMarkIntroLawMarkApplication)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenLabel/GreenMarkIntroLawCouncilResolution" exact component={withTracker(GreenMarkIntroLawCouncilResolution)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroLaw" exact component={withTracker(GreenPurchaseIntroLaw)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroElectronicReport" exact component={withTracker(GreenPurchaseIntroElectronicReport)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroGovernment" exact component={withTracker(GreenPurchaseIntroGovernment)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* 1025建置內頁 */}
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroPriEnterprises" exact component={withTracker(GreenPurchaseIntroPriEnterprises)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroEnterprisesPurch" exact component={withTracker(GreenPurchaseIntroEnterprisesPurch)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroPurchasePlan" exact component={withTracker(GreenPurchaseIntroPurchasePlan)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseIntroPurchaseAchieve" exact component={withTracker(GreenPurchaseIntroPurchaseAchieve)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseProcurementPromote" exact component={withTracker(GreenPurchaseProcurementPromote)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/greenPurChase/GreenPurchaseGovPurchseLaw" exact component={withTracker(GreenPurchaseGovPurchseLaw)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenShopIntro/GreenShopApply" exact component={withTracker(GreenShopApply)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenShopIntro/GreenShopReview" exact component={withTracker(GreenShopReview)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenShopIntro/GreenShopTrack" exact component={withTracker(GreenShopTrack)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/GreenShopIntro/GreenShopStatistics" exact component={withTracker(GreenShopStatistics)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories/accommodation" exact component={withTracker(GreenAccom)} showNavBar={true} SSL={SSL} domain={domain} sideBtn={false} />
                                                <NavRoute path="/categories/accomIntro" component={withTracker(AccomIntro)} showNavBar={true} SSL={SSL} domain={domain}>
                                                    <Redirect to='/categories/accommodation' />
                                                </NavRoute>
                                                <NavRoute path="/categories/accomDownload" component={withTracker(AccomDownload)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/accommodation/detailPage" component={withTracker(AccomPage)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories/green_office/apply" exact component={withTracker(ApplyOffice)} showNavBar={false} sideBtn={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office" exact component={withTracker(GreenOffice)} showNavBar={true} sideBtn={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/shared_articles" exact component={withTracker(OfficeArticles)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/shared_articles/mypage" exact component={withTracker(OfficeArticlePage)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/participate" exact component={withTracker(Participate)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/categories/green_office/conserve_energy" exact component={withTracker(PointEnergy)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/source_reduction" exact component={withTracker(PointReduce)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/green_procurement" exact component={withTracker(PointShop)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/green_beautification" exact component={withTracker(Environment)} sideBtn={false} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/advocacy" exact component={withTracker(Advocacy)} showNavBar={true} sideBtn={false} SSL={SSL} domain={domain} />
                                                <NavRoute path="/categories/green_office/steps" component={withTracker(Steps)} showNavBar={true} sideBtn={false} SSL={SSL} domain={domain} />

                                                <NavRoute path="/searchEvent" exact component={withTracker(SearchEvent)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/searchEvent/eventDetail" component={withTracker(EventDetail)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* <NavRoute path="/localEvents" component={withTracker(LocalEvents)} showNavBar={true} SSL={SSL} domain={domain} /> */}
                                                <NavRoute path="/gameEvent" component={withTracker(GameEvent)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/conferenceEvent" component={withTracker(ConferenceEvent)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/conferenceEventPage" component={withTracker(ConferenceEventPage)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/knowledge" exact component={withTracker(Knowledge)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/knowledge/info" component={withTracker(KnowPage)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/green_point" exact component={withTracker(GreenPoint)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/daily" exact component={withTracker(DailyGreen)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/daily/article" exact component={withTracker(Article)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/daily/article/info" component={withTracker(ArticleInfo)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/daily/blog" exact component={withTracker(DailyBlog)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/daily/blog/info" component={withTracker(DailyBlogPage)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* <PrivateRoute path="/daily/score" exact component={withTracker(ScoreIsland)} showNavBar={true} SSL={SSL} domain={domain} /> */}
                                                {/* <PrivateRoute path="/daily/score/get_score" exact component={withTracker(GetScore)} showNavBar={true} SSL={SSL} domain={domain} /> */}

                                                {/* 開放路由-測試機島嶼 */}
                                                <NavRoute path="/daily/score" exact component={withTracker(ScoreIsland)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/daily/score/get_score" exact component={withTracker(GetScore)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/search" component={withTracker(GoogleSearch)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/about/intro/flipShopping" component={withTracker(FlipShopping)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/about/intro/flipOffice" component={withTracker(FlipOffice)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/about/intro/flipHome" component={withTracker(FlipHome)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/about/intro/flipEnergy" component={withTracker(FlipEnergy)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/about/intro/flipFood" component={withTracker(FlipFood)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/about/intro/flipTour" component={withTracker(FlipTour)} showNavBar={true} SSL={SSL} domain={domain} />
                                                {/* <NavRoute path="/about/intro/flipTourNew" component={FlipTourNew} showNavBar={true} SSL={SSL} domain={domain} /> */}
                                                <Route exact path="/about/intro">
                                                    <Redirect to='/about#intro' />
                                                </Route>

                                                {/* 英文版 */}
                                                <NavRoute path="/en_FlipTour" component={withTracker(EnglishFlipTour)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_FlipFood" component={withTracker(EnglishFlipFood)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_FlipShopping" component={withTracker(EnglishFlipShopping)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_FlipHome" component={withTracker(EnglishFlipHome)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_FlipOffice" component={withTracker(EnglishFlipOffice)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_Mark" component={withTracker(EnglishMark)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_MarkInfo" component={withTracker(EnglishMarkInfo)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_Procurement" component={withTracker(EnglishProcurement)} showEnglishNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/en_ProcurementInfo" component={withTracker(EnglishProcurementInfo)} showEnglishNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute exact path="/download">
                                                    <Redirect to='/download/promote?type=1' />
                                                </NavRoute>
                                                <NavRoute path="/download/material" exact component={withTracker(MainDownload)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/download/material/graph" component={withTracker(GraphDownload)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/download/material/visual" component={withTracker(VisualDownload)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/download/promote" component={withTracker(PromoteResult)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/download/environment" component={withTracker(EnvironmentTeacher)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/EmailService" component={withTracker(EmailService)} showNavBar={true} SSL={SSL} domain={domain} />
                                                <NavRoute path="/CallService" component={withTracker(CallService)} showNavBar={true} SSL={SSL} domain={domain} />

                                                <NavRoute path="/greenGame" component={withTracker(GreenGame)} showNavBar={false} SSL={SSL} domain={domain} sideBtn={false} gamePage={true} />
                                                <NavRoute path="/gamePage" component={withTracker(GamePage)} showNavBar={false} SSL={SSL} domain={domain} sideBtn={false} gamePage={true} />
                                                <NavRoute path="/achievementPage" component={withTracker(AchievementPage)} showNavBar={false} SSL={SSL} domain={domain} sideBtn={false} gamePage={true} />
                                                <NavRoute path="/knGamePage" component={withTracker(KnGamePage)} showNavBar={false} SSL={SSL} domain={domain} sideBtn={false} gamePage={true} />
                                                <NavRoute path="/houseGamePage" component={withTracker(HouseGamePage)} showNavBar={false} SSL={SSL} domain={domain} sideBtn={false} gamePage={true} />

                                                <NavRoute path="/testGa" component={TestGa} showNavBar={true} />

                                                {/* 網站維護頁面 */}
                                                {/* <NavRoute path='/WebsiteMaintenance' component={WebsiteMaintenance} showNavBar={false} />
                                                <Redirect from='*' to='/WebsiteMaintenance' /> */}

                                                {/* <Route
                                                    path="/GIS"
                                                    component={() => {
                                                        global.window && (global.window.location.href = `${SSL}//${domain}/GIS`);
                                                        return null;
                                                    }}
                                                /> */}

                                                <NavRoute path='/404' component={withTracker(Error)} showNavBar={true} />
                                                <Redirect from='*' to='/404' />
                                                {/* <Route path="*" component={Error} /> */}
                                            </Switch>
                                        </CookiesProvider>
                                    </AuthContext.Provider>
                                </Fragment>

                            </Router>
                        </React.Suspense>
                    </>

                );
            }}
        </CacheBuster>
    );
}

export default App;
