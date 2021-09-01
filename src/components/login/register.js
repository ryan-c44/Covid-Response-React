import React, {useState} from "react";
import Login from "./login";
import './register.css';
import fire from '../../fire';

var firestore = fire.firestore();

const Register = (props) => {
  const { setEmail, email, setFname, fname, setLname, lname } = props;
  const [state, setState] = useState("register");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = () => {

    // Check to see if an empty field was detected
    if (email == "" || password == "" || fname == "" || lname == "" || mobile == "" || dob == "" || address == "") {
      alert("Empty field detected")
      return;
    } 

    // Create user login 
    fire.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      updateFirestore();
    })
    .catch((err) => {
      console.log(err.code)
      switch(err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message)
          return;
          break;
        case 'auth/weak-password':
          setPasswordError(err.message)
          return;
          break;
      }
    });
  }

  function updateFirestore() {
    
    // add document to firestore
    const docRef = firestore.collection("users").doc(email);
    docRef.set({
      email: email,
      firstname: fname,
      lastname: lname,
      mobile: mobile,
      dob: dob,
      address: address,
      covidPositive: false
    })
    .then(function () {
      console.log("Firestore Success");
    })
    .catch(function(error) {
      console.log("Error:", error);
    });
  }

  return (
    <div className="register-base-container">
        {state === 'register' && (
          <div className="register-main">
            <h1 className="register-header">COVID RESPONSE</h1>
            <div className="register-box">
            <h2 className="register-box-header">SIGN UP</h2>
            <div className="form">
              <div className="form-group">
                <input type="text" id = "email" placeholder = "Email" onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                <p>{emailError}</p>
              </div>
              <div className="form-group">
                <input type="password" id = "password" placeholder = "Password" onChange={(e) => setPassword(e.target.value)} />
                <p>{passwordError}</p>
              </div>
              <div className="form-group">
                <input type="text" id = "firstname" placeholder = "First Name" onChange={(e) => setFname(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" id = "lastname" placeholder = "Last Name" onChange={(e) => setLname(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" id = "mobile" placeholder = "Mobile Number" onChange={(e) => setMobile(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="date" id ="dob" placeholder = "Date of Birth" onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" id = "address" placeholder = "Address" onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <div className="buttons">
              <div className="sign-up-button-container">
              <button className="sign-up-button" onClick={handleSignup}>Sign Up</button>
              </div>
              <div className="back-button-container">
              <button className="back-button" onClick={() => setState("Login")}>Back</button>
              </div>
            </div>
            </div>
          <footer className="register-footer">
            <a className="privacy-policy">Privacy Policy</a>
            <a className="terms-of-use">Terms of Use</a>
          </footer>

        </div>)}
        <div > 
          {state === "Login" && <Login />}
        </div>

    </div> 
  );
}

export default Register;
