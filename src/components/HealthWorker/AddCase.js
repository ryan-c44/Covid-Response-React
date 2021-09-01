import {React, useState} from 'react';
import fire from '../../fire';
import MessageSent from './messageSent';
import '../layout.css';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebase from 'firebase';
import { UpdateStats } from '../AddStat';

var firestore = fire.firestore();

function addCaseToDb()
{
    //get the users inputs in the text fields
    var email = document.getElementById("id").value;
    var date = document.getElementById("date").value;
    var practice = document.getElementById("practice").value;

    var docRef = firestore.collection("users").doc(email);// search for their document in the db

    

    docRef.update({
        covidPositive:[
            true, date, practice
        ]
    })
    .then(() =>{
        console.log("Success")
        UpdateStats(date, "case")
        //here we would send a message to the contact tracer to alert them of a positive case for this person
    })
    .catch((error) =>{ 
        
        console.error("Error updating document: ", error) // possible alert to let the user know that email is incorrect
    })
}


const AddCase = () => {

    const [email, setEmail]=useState("");
    const [state, setState]=useState("");

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var currentDate = new Date();
    var time = currentDate.toLocaleTimeString();
    var day = currentDate.getDate();
    var month = months[currentDate.getMonth()];
    var year = currentDate.getFullYear();

    function newPositiveMessage(lname, fname) {
        var message = "Test Result: Dear " + fname + " " + lname + " your recent coronavirus test was POSITIVE. \n" +
                      "You are required to self isolate for 14 days, if symptoms become increasingly worse contact NSW \n" + 
                      "emergency services immediately. You will be contact shortly via phone call to explain the nessassary \n" + 
                      "steps for your quarantine. \n" + "Message sent: " + time + "  " + day + "/" + month + "/" + year; 
        return message;
    }

    const addMessageToFirebase = async (email) =>{
        var lname;
        var fname;
        const docRef = firestore.collection("users").doc(email);
        await docRef.get().then(user =>{
            var data = user.data();
            lname = data.lastname;
            fname = data.firstname;
        })
        await docRef.update({messages: firebase.firestore.FieldValue.arrayUnion(newPositiveMessage(lname, fname))});
        await docRef.update({notified: false});
    }

    return (
        <div className="account-container">
            <div className="account-edit">
                <h2>Add Case</h2>
                    <div>
                        <label>
                            ID
                            <input type="text" id = "id" name="name" onChange={event => setEmail(event.target.value)} />
                        </label>
                        <label>
                            Date
                            <input type="date" id = "date" />
                        </label>
                        <label>
                            Medical Practice
                            <input type="text" id = "practice" />
                        </label>
                        <button onClick={() => {addMessageToFirebase(email); setState("MessageSent"); addCaseToDb()}}>Add</button>
                    </div>
            </div>

            <div>
                {state === "MessageSent" && <MessageSent caseID={email}/>}

            </div>
        </div>
    );
}

export default AddCase;