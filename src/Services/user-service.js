import { db, auth } from "../firebase.js";
import {collection, getDoc, doc} from "firebase/firestore";

//get collections in encoding year
const yearRef = collection(db, "encoding_year");

//get collection named user from document 2022
const currentYear = new Date().getFullYear();
const userRef = collection(doc(yearRef, currentYear.toString()), "users");

class UserDataService {


  getUserDataById = (userId) => {

       return getDoc(doc(userRef, userId))
   };

}

export default new UserDataService;