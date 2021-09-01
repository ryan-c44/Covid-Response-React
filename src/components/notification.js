import React, { Component, useState} from 'react';
import './layout.css';
import fire from '../fire';
import VaccineNews from './VaccineNews';

var firestore = fire.firestore()

const Notification = (props) =>{
    const [active, setActive] = useState("Notification")

    function notificationViewed(){
        const docRef = firestore.collection("users").doc(props.email);
        docRef.update({notified: true});
    }

    if(props.check == false){
        return(
               <div>
                   {active === "Notification" && (
                       <div>
                   <br></br>
                   <h1 className="notification-banner">NEW NOTIFICATION</h1>
                   <br></br>
                   <div className="notification-box">
                       <p>You have a new message in your message tab.</p>
                       <br></br>
                       <button onClick={() => {setActive("VaccineNews"); notificationViewed()}}>Ok</button>
                   </div>
                   </div>
                   )}

                   <div>
                       {active === "VaccineNews" && <VaccineNews/>}
                   </div>
               </div>
        );
    }else if(props.check == true){
        return(
            <VaccineNews/>
        );
    }else{
        return(<VaccineNews/>);
    }

}

export default Notification;