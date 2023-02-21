import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ViewPoint(props) {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    function handleShow(e){
    //    props.getActiveView(e.currentTarget.id)
       setShow(!show)

    }

    const handleClose = () => setShow(false);

    useEffect(() => {
        //console.log(props.active)
        setData(props.viewPoint)
    }, [props.viewPoint])



    return (
        <>
        <div onMouseLeave={handleClose} className="dialog-wrapper">
            <div onClick={e => handleShow(e)} id={props.index} key={props.index} className="modal-title mr-2 d-flex">
                <div className="circle-icon2">{props.index + 1}</div>
                <p>{data.ViewName}</p>
            </div>
            <>
            {show
            ?
                <div className="pointDetail">
                    <Modal.Title>景點簡介</Modal.Title>
                    <Modal.Body>{data.ViewName}</Modal.Body>
                    <Modal.Body>{data.Address}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            關閉
                        </Button>
                    </Modal.Footer>
                </div>
                :
                ""
                }
            </>
         </div>

        </>
    );
}

export default ViewPoint;