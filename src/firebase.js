// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKc2Sg9Y-PHApQK_gDR7Ap-VGhDiaRua0",
  authDomain: "mail-cient-mails.firebaseapp.com",
  projectId: "mail-cient-mails",
  storageBucket: "mail-cient-mails.appspot.com",
  messagingSenderId: "326377322203",
  appId: "1:326377322203:web:ecbb7997ccf00c20717efe",
  measurementId: "G-XZZLF8ZE8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app};