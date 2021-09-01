import React, { Component, useState } from 'react';
import './layout.css';

import Form from './Form';

const CheckInForm = (props) => {

    console.log(props.email);

    return (
        <div>
            <div id="check-in">
                <Form email={props.email}/>
            </div>
        </div>
    );
        
}

export default CheckInForm;