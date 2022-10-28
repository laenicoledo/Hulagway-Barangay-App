import { db } from "../firebase.js";
import {collection, where, query, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");
const barangayRef = collection(doc(yearRef,"2022"),"barangay")

//const brgyQuery = query(barangayRef, where("barangay_name", "==",""))

class BarangayDataService {

  addBarangay = (newBarangay) => {
    return setDoc(doc(barangayRef, `${newBarangay.enteredZipCode.toString()}-${newBarangay.enteredBarangay.toString()}`), {
        barangay_name: newBarangay.enteredBarangay,
        city: newBarangay.enteredCity,
        classification: newBarangay.enteredClassification,
        founding_date: newBarangay.enteredFoundingDate,
        province: newBarangay.enteredProvince,
        region: newBarangay.enteredRegion,
        zip_code: newBarangay.enteredZipCode});
  };

  // updateBook = (id, updatedBook) => {
  //   const bookDoc = doc(db, "books", id);
  //   return updateDoc(bookDoc, updatedBook);
  // };

  // deleteEncoder = (email) => {
  //    const encoderDoc = doc(subUserRef, email);
  //    return deleteDoc(encoderDoc);
  // };

   // getBarangayByName = (newBarangay) => {
   //    return getDocs(query(barangayRef, where("barangay_name", "==", newBarangay.enteredName)));
   // };

   //getBarangay = () => {
   //  return getDocs(barangayRef);

  //   const bookDoc = doc(db, "books", id);
  //   return getDoc(bookDoc);
  // };
}

export default new BarangayDataService;