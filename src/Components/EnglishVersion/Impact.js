import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';



function Impact(props) {
    const { impact } = props;
    return (
        <>
            <div className="impact-container">
                <h3 className="impact-title">Our Achievements</h3>
                <div className="impact-content d-flex justify-content-center col-12 col-sm-12 col-md-12 col-lg-12 row">
                    {impact?.map((d, index) =>
                        <Card key={index} className="col-12 col-sm-12 col-md-2 col-lg-2">
                            <div className="impact-img d-flex justify-content-center align-items-center" style={{ borderColor: d.color }}>
                                <Card.Img variant="top" src={d.img} alt="" title="" />
                            </div>
                            <Card.Body>
                                <div className="impact-text">
                                    <Card.Title style={{ color: d.color }}>{d.title}</Card.Title>
                                    <Card.Title style={{ color: d.color }}>{d.subTitle}</Card.Title>
                                </div>
                                <Card.Text style={{ "white-space": "pre-wrap" }}>
                                    {d.desc?.replace(",", "\n")}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </>
    )
}
export default Impact;