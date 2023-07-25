// Import the functions you need from the SDKs you need
import  firebase  from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSwjml7GivwIdEX_b0LK-pifoUsw0vuH8",
  authDomain: "travelzara-8d93b.firebaseapp.com",
  projectId: "travelzara-8d93b",
  storageBucket: "travelzara-8d93b.appspot.com",
  messagingSenderId: "379483541994",
  appId: "1:379483541994:web:9e0c7ace5aac07182ca293",
  measurementId: "G-QYDPZL0NS7"
};

// Initialize Firebase
if(!firebase.getApps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

