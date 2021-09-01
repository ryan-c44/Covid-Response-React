import React, { useState } from 'react';
import './layout.css';

const StatisticDisplay = (props) => {
    return (
        
        <div className="big-container">
            
            {props.statData.map((data) => {
                return (
                    <div>
                        <span className="grid-span">{data.formattedDate}</span>
                        <div className="grid-container">
                            <div>{data.newCases} <br></br><span>New Cases</span></div>
                            <div>{data.newTests}<br></br><span>New Tests</span></div>
                            <div>{data.newVaccinations} <br></br><span>New Vaccinations</span></div>
                            <div>{data.totalCases}<br></br><span>Total Cases</span></div>
                            <div>{data.totalTests}<br></br><span>Total Tests</span></div>
                            <div>{data.totalVaccinations}<br></br><span>Total Vaccinations</span></div> 
                        </div>
                    </div>
                )
            })} 
        </div>
    );
}

export default StatisticDisplay;