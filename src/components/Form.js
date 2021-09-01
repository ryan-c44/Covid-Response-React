import React, { Component, useState} from 'react';
import './layout.css';

import CheckedInBox from './CheckedInBox';
import firebase from "firebase/app";
import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";


var firestore = firebase.firestore();
var date = new Date();

var day = date.getDate()
var month = date.getMonth() + 1
var year = date.getFullYear()

var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); // get the full time into a string
var currentDate = day + "/" + month + "/" + year;//get full date into string


const Form = (props) => {
    var test = new Date();
    var testTime = test.toLocaleTimeString();

    function checkInDb ()
{
    //var user = firebase.auth().currentUser; // get the current user login in
   
    var docRef = firestore.collection("users").doc(props.email);// search for their document in the db

    var business = document.getElementById("business").value
    var address = document.getElementById("address").value

    // Check to see if an empty field was detected
    if (business == "" || address == "") {
        alert("Empty field detected")
        return;
      } 

    var fullCheckInString = business + " , " + address + ", " + currentDate + ", " + time; // get the users full check in togethr into one string

    //updates the current logged in users record and appends any new check ins to the previous check ins array.
    docRef.update({
        checkins: firebase.firestore.FieldValue.arrayUnion(fullCheckInString)
    })
    .then(() =>{
        // possible clearing of filled in fields here, was experiencing some errors to didnt do it for now
    })
    .catch((error) =>{ 
        console.error("Error updating document: ", error)
    })

}

    const clickCheckIn = () =>{ 


        var business = document.getElementById("business").value
        var address = document.getElementById("address").value
        
        if(business != "" && address != ""){
            setActive("CheckedIn");
        }

    }

    const [active, setActive] = useState("");

        return (
            <div>
                <div className="check-in-box">
                    <h2>covid-safe check in form</h2>
                    <form>
                        <label>
                            Business Name
                            <input type="text"  id = "business" />
                        </label>
                        <label>
                            Suburb
                            <input type="text" id = "address" />
                        </label>
                        <label>
                            Date
                            <input type="text" id = "date" value = {currentDate} readOnly/>
                        </label>
                        <label>
                            Time
                            <input type = "text" id = "time" value = {testTime} readOnly/>
                        </label>
                    </form>
                    <button onClick={() => {clickCheckIn(); checkInDb()}}>Check in</button> 
                </div>

                <div>
                    {active === "CheckedIn" && <div className="checked-in-arrow"></div>}
                    {active === "CheckedIn" && <CheckedInBox business={document.getElementById("business").value} time={testTime}/>}                          
                </div>           
            </div>
        );
}

export default Form;