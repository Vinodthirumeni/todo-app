import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBePUMMdr1ehXXljKJ4icu_SVsqp6bCDro",
  authDomain: "todo-app-d0126.firebaseapp.com",
  databaseURL: "https://todo-app-d0126.firebaseio.com",
  projectId: "todo-app-d0126",
  storageBucket: "todo-app-d0126.appspot.com",
  messagingSenderId: "962466824028",
  appId: "1:962466824028:web:6caf5868ad07ee80590b99",
  measurementId: "G-SQHSSRXKZY",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
