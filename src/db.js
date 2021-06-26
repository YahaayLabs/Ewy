import firebase from "firebase/app";
import "firebase/database";

const config = {
    //API Keys
    apiKey: "AIzaSyDB1QlBUe6hbn4UeGYp7FP2gAcKJMc05SM",
    authDomain: "ewy-app.firebaseapp.com",
    databaseURL: "https://ewy-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ewy-app",
    storageBucket: "ewy-app.appspot.com",
    messagingSenderId: "266173516143",
    appId: "1:266173516143:web:0964102cb1bf8ea6fc409a",
    measurementId: "G-BP5WDPF6MP"
}

const db = firebase.initializeApp(config);
export default db;