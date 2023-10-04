import { db } from "../firebase.js";
import {collection, where, query, getDocs, getDoc, setDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");
//const subUserRef = collection(doc(yearRef, ), "subusers");

const brgy = localStorage.getItem("brgy")

class SubUserDataService {

  getSubUserRef = async() => {

  if((localStorage.getItem("year")) != null){
      
      return collection(doc(yearRef, localStorage.getItem("year")), "subusers");
    
    }else{
    
    //Get a list of all the encoding years
    const yearSnapshot = await getDocs(yearRef);
    const years = yearSnapshot.docs.map((doc) => doc.id);

    // Loop through all the years and get the zone
    for (const year of years) {
       
       const searchSubUserRef = collection(doc(yearRef, year), "subusers");
       const subUserSnapshot = await getDocs(query(searchSubUserRef, where("brgy", "==", localStorage.getItem("brgy"))));
       
      if (!subUserSnapshot.empty) {
        return collection(doc(yearRef, year), "subusers");
      }
     }
       //return null;
    }
  }

  addEncoder = async(newEncoder) => {

    const subUserRef = await this.getSubUserRef();
    const now = new Date();

     return setDoc(doc(subUserRef, newEncoder.enteredEmail), {
         assigned_zones: "",
         contact_num: newEncoder.enteredContact,
         email: newEncoder.enteredEmail,
         first_name: newEncoder.enteredFname,
         last_name: newEncoder.enteredLname,
         middle_name: newEncoder.enteredMname,
         barangay_desig: localStorage.getItem("brgy"),
         encoding_end: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 23).replace('T', ' '),
         encoding_start: now.toISOString().slice(0, 23).replace('T', ' ')
      });
   }

  updateEncoder = async(email, checked) => {

      const subUserRef = await this.getSubUserRef();
      const encoderDoc = doc(subUserRef, email);
      return updateDoc(encoderDoc, {
       assigned_zones: `[${checked}]`});
  };

   updateToken = async(email) => {

    const subUserRef = await this.getSubUserRef();
    const encoderDoc = doc(subUserRef, email);
    const now = new Date();

    return updateDoc(encoderDoc, {
      encoding_end: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 23).replace('T', ' '),
      encoding_start: now.toISOString().slice(0, 23).replace('T', ' ')
    });
  };

  deleteEncoder = async(email) => {

      const subUserRef = await this.getSubUserRef();
      const encoderDoc = doc(subUserRef, email);
      return deleteDoc(encoderDoc);
  };

  getSubUsersByBarangay = async() => {

    const subUserRef = await this.getSubUserRef();
    const brgyQuery = query(subUserRef, where("barangay_desig", "==", brgy))

    return getDocs(brgyQuery); 

  }
     

}

export default new SubUserDataService;