import React, { useState } from 'react';
import '../layout.css';
import fire from '../../fire';
import firebase from 'firebase';

import CloseContact from './CloseContact';
import { modalview } from 'react-ga';

var firestore = fire.firestore();

const AlertUser = () => {

    const [active, setActive] = useState("");
    const [positives, setPositives] = useState("");
    const [lname, setLname] = useState("");

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentDate = new Date();
    var time = currentDate.toLocaleTimeString();
    var day = currentDate.getDate();
    var month = months[currentDate.getMonth()];
    var year = currentDate.getFullYear();

    function newCloseContactMessage(lname, fname) {
        var message = "Dear " + fname + " " + lname + ". You have been in close contact with someone who has COVID-19. \n" +
            "You are at high risk of having and spreading it. Self-isolate now for 14 days. \n\n\n" +
            "Message sent: " + time + "  " + day + "/" + month + "/" + year;
        return message;
    }

    const addMessageToFirebase = async (email) => {
        var lname;
        var fname;
        const docRef = firestore.collection("users").doc(email);
        await docRef.get().then(user => {
            var data = user.data();
            lname = data.lastname;
            fname = data.firstname;
        })
        await docRef.update({ messages: firebase.firestore.FieldValue.arrayUnion(newCloseContactMessage(lname, fname)) });
        await docRef.update({ notified: false });
    }

    const messageCloseContact = async () => {
        var positiveCheckin = []
        positives.map((data, key) => {
            data.map((thing) => {
                if (typeof thing.checkins != "undefined") {
                    positiveCheckin.push(thing.checkins);
                }
            })
        })

        var dangerousDates = [];
        var dangerousPlaces = [];

        positiveCheckin.map((data, key) => {
            data.map((thing) => {
                var array = thing.split(",");
                var date = array[3];
                var dateArray = date.split("/");
                var positiveDateObj = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                dangerousDates.push(positiveDateObj);
                dangerousPlaces.push(array[0] + array[1] + array[2]);
            })
        })

        const informList = [];

        const contact = firestore.collection("users");
        const snapshot = await contact.get();
        snapshot.forEach((doc) => {
            const userData = doc.data();
            if (typeof userData.checkins != "undefined") {
                var userCheckins = userData.checkins;
                userCheckins.map((data, key) => {
                    var array = data.split(",");
                    var userPlaces = [];
                    var userDates = [];
                    var date = array[3];
                    var dateArray = date.split("/");
                    var dateVisited = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                    userDates.push(dateVisited);
                    userPlaces.push(array[0] + array[1] + array[2]);

                    var i;
                    for (i = 0; i < userPlaces.length; i++) {
                        var j;
                        var samePlace;
                        for (j = 0; j < dangerousPlaces.length; j++) {
                            var samePlace;
                            if (userPlaces[i] == dangerousPlaces[j]) {
                                samePlace = true;
                            }

                            var plusDangerousDate = new Date();
                            var minusDangerousDate = new Date();
                            plusDangerousDate.setDate(dangerousDates[j].getDate() + 14);
                            minusDangerousDate.setDate(dangerousDates[j].getDate() - 14);
                        }

                        if (samePlace == true && userDates[i] >= minusDangerousDate && userDates[i] <= plusDangerousDate) {
                            informList.push(doc.id);
                        }
                    }


                })

            }
        });

        console.log(informList);
        informList.forEach(element => addMessageToFirebase(element));

    }

    function getPositiveCases() {
        var todaysDate = document.getElementById("todaysDate").value
        const positiveUsers = [];
        firestore.collection("users")
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    var positiveTest = [];
                    positiveTest = userData.covidPositive;
                    if (typeof positiveTest != "undefined") {
                        if(positiveTest[1] == todaysDate) {
                            positiveUsers.push([userData]);
                        }
                    }
                });
            })

        setPositives(positiveUsers);

    }

    function displayPositiveCases() {
        return (
            <div className="account-container">
                <div className="account-edit">
                    <h2>Positive Cases</h2>
                    {positives.map((data, key) => {
                        return (
                            data.map((stuff) => {

                                if (typeof stuff.checkins != "undefined") {

                                }

                                return (
                                    <div key={key}>
                                        <h3>User: </h3>
                                        <p>{stuff.email}</p>
                                        <br></br>
                                        <h4>User Checkins: </h4>
                                        <p>{stuff.checkins}</p>
                                    </div>
                                )
                            })
                        )
                    })}
                    <button onClick={() => messageCloseContact()}>Alert All Close Contacts</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="account-container">
                <div className="account-edit">
                    <h2>Dashboard</h2>
                    <label>Date</label>
                    <input type="date" id="todaysDate"></input>
                    <button onClick={() => { getPositiveCases(); document.getElementById("inform").innerHTML = "Positive Cases Recieved"; }}>Get Positive Cases</button>
                    <button onClick={() => setActive("SearchResults")}>Search Positive Cases</button>
                    <p id="inform"></p>

                </div>
            </div>

            <div>
                {active === "SearchResults" && displayPositiveCases()}
                {active === "CloseContacts" && <CloseContact locations={document.getElementById("location").value} />}
            </div>
        </div>

    );
}

export default AlertUser;