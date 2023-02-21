import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import EnglishNavBar from '../Components/EnglishVersion/EnglishNavBar';

const SideBtn = React.lazy(() => import('../Components/SideBtn'));
// const Footer = React.lazy(() => import('../Components/Footer'));

const NavRoute = ({ component: Component, showNavBar, showEnglishNavBar, sideBtn, gamePage, restricted, SSL, domain, memberField, ...rest }) => (

    <>
        {showNavBar && <NavBar />}
        {showEnglishNavBar && <EnglishNavBar />}
        <div id="target">
            <Route {...rest} render={props => <Component {...props} SSL={SSL} domain={domain} memberField={memberField} />} />
            <SideBtn sideBtn={sideBtn} gamePage={gamePage} history={useHistory()} />
        </div>
    </>
)

export default NavRoute;