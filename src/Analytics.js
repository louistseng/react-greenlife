import React, { useEffect } from 'react';
import GoogleAnalytics from 'react-ga';

let domain = window.location.hostname

//domain是正式機, 才註冊GA, 應用程式序號:UA-180980211-1
if (domain === "greenlife.epa.gov.tw")
    GoogleAnalytics.initialize('UA-180980211-1');

const withTracker = (WrappedComponent, options = {}) => {

    const trackPage = page => {
        GoogleAnalytics.set({
            page,
            ...options,
        });
        GoogleAnalytics.pageview(page);
    };

    function HOC (props) {
        const page = props.location.pathname;
        useEffect(() => {
            domain === "greenlife.epa.gov.tw" && trackPage(page);
        },[page])
            return <WrappedComponent {...props} />;
    };
    return HOC;
};

export default withTracker;