import React, { Component } from 'react';
import { phaseData } from './phaseData';
import './layout.css';

const VaccineRollout = (props) => {

    var dobArray = props.dob.split("-");
    var dobDate = new Date(dobArray[0], dobArray[1]-1, dobArray[2]);
    var today = new Date(Date.now());
    var age = today.getFullYear()-dobDate.getFullYear();
    
    return(
        <div>
            <h1 className="head__text">VACCINE ROLLOUT INFO</h1>
            {phaseData.map((data, key) => {

                if(age >= data.ageStart && age <= data.ageEnd){
                return (
                    <div key={key} style={{border : "2px solid red"}}className="phase-container">
                        <h3>{data.phaseNumber}</h3>
                        
                        <ul>
                            {
                                data.groups.map((groups) => { 

                                 
                                    return (
                                        <li >
                                            {groups.group}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )//
                }else{

                    return (
                        <div key={key} style={{border : "1px solid #0D3155"}}className="phase-container">
                            <h3>{data.phaseNumber}</h3>
                            
                            <ul>
                                {
                                    data.groups.map((groups) => { 
    
                                     
                                        return (
                                            <li >
                                                {groups.group}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )//

                }


            })}
        </div>
    );

}

export default VaccineRollout;

