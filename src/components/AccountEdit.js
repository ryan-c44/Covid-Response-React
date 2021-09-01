import React, { Component } from 'react';
import './layout.css';
import VaccineCarousal from './VaccineCarousal';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";


var firestore = firebase.firestore();

const updateUser = event =>
{
    event.preventDefault(); // 
    var user = firebase.auth().currentUser; // get the current user login in

    var email = document.getElementById("email").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var dob = document.getElementById("dob").value
    var address = document.getElementById("address").value;
    var mobile = document.getElementById("mobile").value;

    //in firebase there is no way to upodate a documents ID, so if their email is the same then we update the same document thats all good
    //if they arent the same then we need to create a new record with that new email as the ID and copy all contents from the old record to the new one.

    //tried more efficnet ways but the fact that key comes out as  exactly how you type it not whats in the variable stuffed me so just doing it brute if else statement.
    var docRef = firestore.collection("users").doc(user.email);// search for their document in the db

    if(email == user.email || email == "")//if the email is the same we update like normal.
    {
        if(firstname != "")
        {
            docRef.update({
                firstname: firstname
            });
        }
        if(lastname != "")
        {
            docRef.update({
                lastname: lastname
            });
        }
        if(dob != "")
        {
            docRef.update({
                dob: dob
            });
        }
        if(address != "")
        {
            docRef.update({
                address: address
            });
        }
        if(mobile != "")
        {
            docRef.update({
                mobile: mobile
            });
        }
    }
    else // if the email is different we have to create a new record because email is the primary key and cannot be replaced.
    {

        //get the user's record
        docRef.get().then((doc) =>{
            if(doc.exists)
            {
                const newDocRef = firestore.collection("users").doc(email);//create a new document
                newDocRef.set(//set the email as email
                    {
                        email:email
                    })

                //update/create each field with the data from the record earlier

                //if the text fields arent empty then we update the doc with those new values, if they are empty thne we carry over the previous records data
                if(firstname != "")
                {
                    newDocRef.update({
                        firstname: firstname
                    });
                }
                else{
                    newDocRef.update({
                        firstname: doc.data().firstname
                    });  
                }
                if(lastname != "")
                {
                    newDocRef.update({
                        lastname: lastname
                    });
                }
                else
                {
                    newDocRef.update({
                        lastname: doc.data().lastname
                    }); 
                }
                if(dob != "")
                {
                    newDocRef.update({
                        dob: dob
                    });
                }
                else
                {
                    newDocRef.update({
                        dob: doc.data().dob
                    }); 
                }
                if(address != "")
                {
                    newDocRef.update({
                        address: address
                    });
                }
                else
                {
                    newDocRef.update({
                        address: doc.data().address
                    }); 
                }
                if(mobile != "")
                {
                    newDocRef.update({
                        mobile: mobile
                    });
                }
                else
                {
                    newDocRef.update({
                        mobile: doc.data().mobile
                    }); 
                }
                
                //carry on these 2 fields no matter what bcause they cant be updated.
                newDocRef.update({
                    covidPositive: doc.data().covidPositive,
                    checkins: doc.data().checkins
                  })

                  //update the users email in firebase auth
                  user.updateEmail(email).then(function(){
                      console.log("User updated in Auth")
                  }).catch(function(error){
                      console.log("Error", error)
                  })
                  
                //delete the older us from firestore
                  docRef.delete()
            }
        }).catch((error) =>{
            console.log("Error getting document: " + error)
        })

       
    }

}

const AccountEdit = (props) => {
    return (
        <div className="account-container">
            <h3>Account Details</h3>

            <div className="account-edit">
                <form>
                    <label>
                        First Name
                        <input type="text" id = "firstname" />
                    </label>
                    <label>
                        Last Name
                        <input type="text" id = "lastname" />
                    </label>
                    <label>
                        Date of Birth
                        <input type="date" id = "dob" />
                    </label>
                    <label>
                        Address
                        <input type="text" id = "address" />
                    </label>
                    <label>
                        Email
                        <input type="text" id = "email" placeholder = {props.email} />
                    </label>
                    <label>
                        Mobile
                        <input type="text" id = "mobile" />
                    </label>
                    
                    <button onClick = {updateUser}>Update Details</button> 
                </form>
            </div>

            <h3>Vaccine Certificates</h3>
            <div className="account-edit">
                <VaccineCarousal dose1={props.dose1} dose2={props.dose2} />
            </div>
        </div>
    );
}   

export default AccountEdit;