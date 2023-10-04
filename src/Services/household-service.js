import { db } from "../firebase.js";
import {collection, where, query, getDocs, setDoc, doc} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");
//const zoneRef = collection(doc(yearRef,"2022"), "zones")

const currentYear = new Date().getFullYear();
const zoneRef = collection(doc(yearRef, currentYear.toString()), "zones");

//const zoneQuery = query(zoneRef, where("brgy", "==", localStorage.getItem("brgy")))

class HouseholdDataService {

  

}

export default new ZoneDataService;