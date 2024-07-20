// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLvfGKzQr2MbhXtICjNkAq8nF6tSy3tbU",
  authDomain: "myportfolio-9307d.firebaseapp.com",
  databaseURL: "https://myportfolio-9307d-default-rtdb.firebaseio.com",
  projectId: "myportfolio-9307d",
  storageBucket: "myportfolio-9307d.appspot.com",
  messagingSenderId: "882203421739",
  appId: "1:882203421739:web:b5996ce64f336407894e6e",
  measurementId: "G-QZJR6BHWY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

