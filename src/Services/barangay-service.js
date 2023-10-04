import { db } from "../firebase.js";
import {collection, where, query, getDocs, getDoc, addDoc, setDoc, updateDoc, doc} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");
//const barangayRef = collection(doc(yearRef,"2022"),"barangay")

//get collection names barangay from document - for adding new barangay
const currentYear = new Date().getFullYear();
const barangayRef = collection(doc(yearRef, currentYear.toString()), "barangay");

class BarangayDataService {

  addBarangay = (newBarangay) => {
    return setDoc(doc(barangayRef, `${newBarangay.enteredCity.toString()}-${newBarangay.enteredBarangay.toString()}`), {
        barangay_name: newBarangay.enteredBarangay,
        city: newBarangay.enteredCity,
        classification: newBarangay.enteredClassification,
        founding_date: newBarangay.enteredFoundingDate,
        province: newBarangay.enteredProvince,
        region: newBarangay.enteredRegion,
        zip_code: newBarangay.enteredZipCode});
  };

  getBarangayByName = async (barangayId) => {
  
  //Get a list of all the encoding years
  const yearSnapshot = await getDocs(yearRef);
  const years = yearSnapshot.docs.map((doc) => doc.id);

  // Loop through all the years and get the barangay by name
  for (const year of years) {
    
    const brgyRef = collection(doc(yearRef, year), "barangay");
    const barangaySnapshot = await getDoc(doc(brgyRef, barangayId));
    
    if(barangaySnapshot.exists()) {
      await localStorage.setItem('year', year)
      return barangaySnapshot.data();
    }
  }
    // Return null if the barangay is not found in any year
    return null;
  };
}

export default new BarangayDataService;