import { db } from "../firebase.js";
import {collection, where, query, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");
const zoneRef = collection(doc(yearRef,"2022"), "zones")

const zoneQuery = query(zoneRef, where("brgy_name","==","Proper Tiguisan"))

class ZoneDataService {

  addZone = (newZone,newBarangay) => {
     return setDoc(doc(zoneRef, `${newZone.zone_num.toString()}-${newZone.zone_name.toString()}-${newBarangay.enteredBarangay.toString()}`), {
      zone_num: parseInt(newZone.zone_num),
      zone_name: newZone.zone_name,
      brgy_name: newBarangay.enteredBarangay});
  };

  // updateBook = (id, updatedBook) => {
  //   const bookDoc = doc(db, "books", id);
  //   return updateDoc(bookDoc, updatedBook);
  // };

  // deleteEncoder = (email) => {
  //    const encoderDoc = doc(subUserRef, email);
  //    return deleteDoc(encoderDoc);
  // };

  getZoneByBarangay = () => {
     return getDocs(zoneQuery);
  };

  //getZones = () => {
  //  return getDocs(zoneRef);

  //   const bookDoc = doc(db, "books", id);
  //   return getDoc(bookDoc);
  // };
}

export default new ZoneDataService;