
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './css/Breadcrumb.css';

function EnglishBreadcrumb(props) {
    // console.log(props.currentPage)
    const pathlist = [
        '/',
        '/en_Main',
        '/en_About',
        '/en_FlipTour',
        '/en_FlipFood',
        '/en_FlipShopping',
        '/en_FlipHome',
        '/en_FlipOffice',
        '/en_Mark',
        '/en_MarkInfo',
        '/en_Procurement',
        '/en_ProcurementInfo',

    ]
    const pathnames = ['Home', 'Main', 'About', 'Green Travel', 'Green Dining', 'Green Consumption', 'Green Home', 'Green Office', 'Green Mark', 'Green MarkInfo', 'Green Procurement', 'Green ProcurementInfo']

    // 先找出對應的中文詞
    let locationPathname = props.location.pathname
    var split = locationPathname.split('/');
    var second = split[1]
    var third = split[2]
    var forth = split[3]
    let secParam = `/${second}`
    let thirdParam = `/${second}/${third}`
    let forthParam = `/${second}/${third}/${forth}`

    // console.log(split)
    // console.log(props)
    const index = pathlist.findIndex((v) => v === locationPathname)
    const index2 = pathlist.findIndex((v) => v === secParam)
    const index3 = pathlist.findIndex((v) => v === thirdParam)
    const index4 = pathlist.findIndex((v) => v === forthParam)
    // console.log(locationPathname)
    const detail = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/en_About">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href={secParam}>{pathnames[index2]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )

    const four = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/en_About">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href={secParam}>{pathnames[index2]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href={thirdParam}>{pathnames[index3]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )

    const five = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/en_About">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href={secParam}>{pathnames[index2]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href={thirdParam}>{pathnames[index3]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a href={forthParam}>{pathnames[index4]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )

    const two = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/en_About">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )

    let display;
    switch (split.length) {
        case 1:
            display = two;
            break;
        case 2:
            display = two;
            break;
        case 3:
            display = detail;
            break;
        case 4:
            display = four;
            break;
        case 5:
            display = five;
            break;
        default:
            display = two;
    }

    const baseTitle = "GreenLife";
    var Breadtitle = props.currentPage ? baseTitle + "-" + props.currentPage : baseTitle;
    var Doctitle = pathnames[index] ? baseTitle + "-" + pathnames[index] : document.title;
    // console.log(props.currentPage);
    // console.log(Breadtitle);
    // console.log(Doctitle);
    var HelmetTitle = Breadtitle == baseTitle ? Doctitle : Breadtitle;

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{HelmetTitle}</title>
                </Helmet>
            </HelmetProvider>
            <nav aria-label="breadcrumb">
                {display}
            </nav>
        </>
    )
}

export default withRouter(EnglishBreadcrumb)