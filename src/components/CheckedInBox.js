import React, { Component, useState } from 'react';
import './layout.css';

const CheckInForm = (props) =>  {

    const [active, setActive] = useState("");

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var currentDate = new Date();
    var time = currentDate.toLocaleTimeString();
    var day = currentDate.getDate();
    var month = months[currentDate.getMonth()];
    var year = currentDate.getFullYear();

    /* Fix */
    function checkOut() {
        return (
            <div className="checked-in-container">
                <h3>{props.business}</h3>
                <span>Checked out</span>
                <br></br>
                <span>{day} {month} {year} {time}</span>
                <br></br>
            </div>
        );
    }

    return (

        <div>
            <div className="checked-in-container">
                <h3>{props.business}</h3>
                <span>Checked in</span>
                <br></br>
                <span>{day} {month} {year} {props.time}</span>
                <br></br>
                <button onClick={() => setActive("CheckedOut")}>Check Out</button> 
            </div>

            <div>
                    {active === "CheckedOut" && <div className="checked-in-arrow"></div>}
                    {active === "CheckedOut" && checkOut() }                          
            </div>    
        </div>
    );
        
}

export default CheckInForm;