import React from 'react';
import { withRouter } from 'react-router-dom';

const Footer = React.lazy(() => import('./Components/Footer'));


function TestGa() {

    return (
        <>

            <div className="container-sm policy-container">
                <h4>測試機GA測試頁面</h4>
                <div style={{ height: "45vh" }} className="search-content"></div>
            </div>


            <Footer />

        </>
    );
}

export default withRouter(TestGa);