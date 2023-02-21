import React, { useState, useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { isLogin } from './Auth';
import NavBar from '../Components/NavBar';
import { AuthContext } from '../utils/Context';

const SideBtn = React.lazy(() => import('../Components/SideBtn'));
const InfoSideMenu = React.lazy(() => import('../Member/InfoSideMenu'));
const BreadCrumb = React.lazy(() => import('../Components/BreadCrumb'));
const Footer = React.lazy(() => import('../Components/Footer'));

const PrivateRoute = ({ component: Component, showNavBar, SSL, domain, memberField, currentPage, migrated, ...rest }) => (

    <>
        {showNavBar ? <NavBar /> : ""}
        {migrated ?
            <>
                <BreadCrumb currentPage={currentPage} />
                <div className="container member-info-wrapper row">
                        <InfoSideMenu />
                        <Route {...rest} render={props => (isLogin() ? <Component {...props} SSL={SSL} domain={domain} memberField={memberField} /> : <Redirect to="/Login" />)} />
                </div>
            </>
            :
            <Route {...rest} render={props => (isLogin() ? <Component {...props} SSL={SSL} domain={domain} memberField={memberField} /> : <Redirect to="/Login" />)} />
        }
        <Footer />
        <SideBtn history={useHistory()} />
    </>
)

export default PrivateRoute;