import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBB-Z4PL3Gino77D_ndoAqN4p7XQbDr-AI",
  authDomain: "elevate-d1850.firebaseapp.com",
  projectId: "elevate-d1850",
  storageBucket: "elevate-d1850.appspot.com",
  messagingSenderId: "259305914491",
  appId: "1:259305914491:web:5110f92257d7fc1f0062de",
  measurementId: "G-042YFXTZV8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);