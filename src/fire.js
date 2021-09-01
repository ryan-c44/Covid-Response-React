import firebase from "firebase";



const fire = firebase.initializeApp({
  apiKey: "AIzaSyDqfKSpPS9v7ExERtD8WpjwEzTRGlUrp-w",
  authDomain: "csci334-project.firebaseapp.com",
  databaseURL: "https://csci334-project-default-rtdb.firebaseio.com",
  projectId: "csci334-project",
  storageBucket: "csci334-project.appspot.com",
  messagingSenderId: "971326205509",
  appId: "1:971326205509:web:d9fafc407b675d118fbd2c",
  measurementId: "G-FY11MJT3LH"
});

export default fire;
