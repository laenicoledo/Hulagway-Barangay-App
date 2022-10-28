import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhqKcdnJRMn-VOOcF6GQcPIBotuxp3cks",
  authDomain: "kaagapay-fa8b5.firebaseapp.com",
  projectId: "kaagapay-fa8b5",
  storageBucket: "kaagapay-fa8b5.appspot.com",
  messagingSenderId: "1052404833991",
  appId: "1:1052404833991:web:07cd21001d692bdad228e2",
  measurementId: "G-3BQCNPHQ9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app