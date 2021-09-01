import React, {useState} from "react";
import '../layout.css';
import firebase from "firebase/app";
import fire from '../../fire';
import { UpdateStats } from '../AddStat';
var firestore = fire.firestore();

const Certify = () => {
  
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [brand, setBrand] = useState("");
  const [dosageNum, setDosageNum] = useState("");


    function getForm(){

        var ID = document.getElementById("email").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var vaccineBrand = document.getElementById("brand").value;
        var dosageNum = document.getElementById("dosage").value;

        if(dosageNum == 1){
           firestore.collection("users").doc(ID).update({dosage1: [ID, date, time, vaccineBrand, dosageNum]});
        }

        if(dosageNum == 2){
            firestore.collection("users").doc(ID).update({dosage2: [ID, date, time, vaccineBrand, dosageNum]});
        }
    }

 
    const certifyVaccination = () => {

        if (email == "" || date == "" || time == "" || brand == "" || dosageNum == "") {
            alert("Empty field detected")
            return;
        } else {
            
            UpdateStats(date, "vaccination")
            alert("Certified user");
        }

    }

    return (
        <div className="account-container">
            <div className="account-edit">
                <h2>Certify Vaccination</h2>
                <div>
                    <label>
                        Email
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Date
                        <input type="date" id="date" onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <label>
                        Time
                        <input type="text" id="time" onChange={(e) => setTime(e.target.value)} />
                    </label>
                    <label>
                        Vaccine Brand
                        <input type="text" id="brand" onChange={(e) => setBrand(e.target.value)} />
                    </label>
                    <label>
                        Dosage #
                        <input type="text" id="dosage" onChange={(e) => setDosageNum(e.target.value)} />
                    </label>
                    <button onClick={() => {certifyVaccination(); getForm()}}>Submit</button>
            
                </div>

            </div>
        </div>
    );
}

export default Certify;