import React, { useEffect, useState } from "react";
import Register from "./register";
import Header from '../Header';
import fire from '../../fire';

var firestore = fire.firestore();

const Login = (props) => {
  const [state, setState] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const clearErrors = () => {
    setEmailError("")
    setPasswordError("")
  }



  const handleLogin = () => {
    clearErrors();
    fire.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError("Incorrect Email")
            break;
          case "auth/wrong-password":
            setPasswordError("Incorrect Password");
            break;
        }
      });
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {

      if (user && props.newAccount != true) { // if user exists determine usertype and login
        determineUserType(user["email"])
        setEmail(user["email"])
        setState("Header")
        console.log(user)
      } else {  // else stay on login screen
        setState("Login")
      }
    })
  }

  useEffect(() => {
    authListener();
  }, []);

  function determineUserType(email) {
    var emailServer = email.slice(email.indexOf("@") + 1, email.length)
    if (emailServer == "tracer.com") {
      setUserType("Tracer")
    } else if (emailServer == "health.com") {
      setUserType("Health")
    } else {
      setUserType("User")
    }
  }

  function showPassword() {
    var showPassBox = document.getElementById("show-password"),
      password_box = document.getElementById("password");

    if (showPassBox.checked) {
      password_box.type = "text";
    } else {
      password_box.type = "password";
    }
  }

  return (
    <div className="base-container" >
      {state === 'Login' && (
        <div className="login-main">
          <h1 className="login-header">COVID RESPONSE</h1>
          <div className="login-box">
            <h2 className="login-box-header">LOG IN</h2>
            <div className="form">
              <div className="form-group">
                <input type="text" className="log-in-email" name="email" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                <p>{emailError}</p>
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />
                <p>{passwordError}</p>
              </div>
              <div className="show-password">
                <input type="checkbox" name="show-password-checkbox" value="Show Password" id="show-password" onClick={showPassword}></input>
                <label for="show-password-checkbox">Show Password</label>
              </div>
              
            </div>
            <div className="buttons">
              <div className="sign-in-button-container">
                <button type="button" className="sign-in-button" onClick={handleLogin}>Sign In</button>
              </div>
              <div className="sign-in-button-container">
                <button type="button" className="sign-up-button" onClick={() => setState("Register")}>Sign Up</button>
              </div>
            </div>
            <div className="password-recovery">
              <a className="password-recovery-text">Forgotten Password?</a>
            </div>
          </div>
          <footer className="login-footer">
            <a className="privacy-policy">Privacy Policy</a>
            <a className="terms-of-use">Terms of Use</a>
          </footer>
        </div>
      )}
      <div className="state">
        {state === "Header" && <Header userType={userType} email={email} setFname={setFname} fname={fname} setLname={setLname} lname={lname} />}
        {state === "Register" && <Register setEmail={setEmail} email={email} setFname={setFname} fname={fname} setLname={setLname} lname={lname} />}
      </div>
    </div>
  );
}


export default Login;
