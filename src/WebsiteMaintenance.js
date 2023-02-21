import React from 'react';
import { withRouter } from 'react-router-dom';
import Website_img from './images1/error/WebsiteMaintenance.png';

function WebsiteMaintenance() {

    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <img src={Website_img} alt="Website_Maintenance" title="Website_Maintenance" />
            </div>
        </>
    );
}

export default WebsiteMaintenance;