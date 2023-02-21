import React from 'react';
import Sticky from 'react-stickynode';

function TestBanner() {
    return (
        <>

            <Sticky innerZ={300} enabled={true} top={0} bottomBoundary={0}>
            <h1 className="testText" style={{ color:"#ff00007e", fontWeight:"700", position:"absolute", fontSize:"70px",marginTop:"0px",marginLeft:"70px" }}>測試機</h1>
            {/* <h1 className="testText" style={{ color:"#ff00007e", fontWeight:"700", position:"absolute", fontSize:"60px", marginTop:"500px" }}>測試機</h1>
            <h1 className="testText" style={{ color:"#ff00007e", fontWeight:"700", position:"absolute", fontSize:"60px", marginTop:"300px"}}>測試機</h1> */}
            </Sticky>

        </>
    );
}

export default TestBanner;