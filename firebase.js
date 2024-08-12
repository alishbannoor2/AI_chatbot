// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn2Wb--mZWDZFnLo13uifa4IanA4C6fs8",
  authDomain: "ai-chatbot-cd0f9.firebaseapp.com",
  projectId: "ai-chatbot-cd0f9",
  storageBucket: "ai-chatbot-cd0f9.appspot.com",
  messagingSenderId: "920024163720",
  appId: "1:920024163720:web:44f98157b44e1ce542863d",
  measurementId: "G-TD9F3JRP4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth }; 