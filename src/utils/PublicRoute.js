import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './Auth';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (isLogin() && restricted ? <Component {...props} /> : <Redirect to="/about" />)} />
)

export default PublicRoute;