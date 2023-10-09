// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7Z2ce5KmVSLLQDBPF-kpCMKyygtAAX88",
  authDomain: "login-uid-lampung.firebaseapp.com",
  projectId: "login-uid-lampung",
  storageBucket: "login-uid-lampung.appspot.com",
  messagingSenderId: "995135796480",
  appId: "1:995135796480:web:198b0551df2144ee08efe5",
  measurementId: "G-0NH9RGLE32"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};