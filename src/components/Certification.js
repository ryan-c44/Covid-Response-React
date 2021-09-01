import React, { Component } from 'react';
import './layout.css';

const Certification = (props) => {

    if(typeof props.dose != "undefined"){

        return (
            <div className="certification">
                <h2>{props.text}</h2>
                <div>
                    <h3>Vaccine Recipient:</h3>
                    <p>{props.dose[0]}</p>
                </div>
                <div>
                    <h3>Date Recieved:</h3>
                    <p>{props.dose[1]}</p>
                </div>
                <div>
                    <h3>Time Recieved:</h3>
                    <p>{props.dose[2]}</p>
                </div>
                <div>
                    <h3>Vaccine Brand:</h3>
                    <p>{props.dose[3]}</p>
                </div>
                <div>
                    <h3>Dose Number:</h3>
                    <p>{props.dose[4]}</p>
                </div>
            </div>
        )

    }else{

    return (
        <div className="certification">
            <h2>{props.text}</h2>
            <div>
                <p>No Record Found</p>
            </div>
        </div>
    )
    }
}

export default Certification;