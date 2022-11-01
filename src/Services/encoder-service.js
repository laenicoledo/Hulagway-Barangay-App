import { db } from "../firebase.js";
import {collection, where, query, getDocs, setDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";

//const subUserRef = query(collection(db, "subuser"), where("assigned_zones", "==", "[1,2,3,4,5]"));
//const querySnapshot = await getDocs(subUserRef);
//const subUserRef = db.collection('subuser');

//const subUserRef = db.collection('encoding_year').doc('2022').collection('subusers').get()
const yearRef = collection(db, "encoding_year");
const subUserRef = collection(doc(yearRef,"2022"), "subusers")

const brgyQuery = query(subUserRef, where("barangay_desig", "==", localStorage.getItem("brgy")))

class SubUserDataService {

  addEncoder = (newEncoder) => {
     return setDoc(doc(subUserRef, newEncoder.enteredEmail), {assigned_zones: "",
        contact_num: newEncoder.enteredContact,
        email: newEncoder.enteredEmail,
        first_name: newEncoder.enteredFname,
        last_name: newEncoder.enteredLname,
        middle_name: newEncoder.enteredMname,
        barangay_desig: localStorage.getItem("brgy")
     });
  };

  updateEncoder = (email, checked) => {
     const encoderDoc = doc(subUserRef, email);
     return updateDoc(encoderDoc, {
      assigned_zones: `[${checked}]`});
  };

  deleteEncoder = (email) => {
     const encoderDoc = doc(subUserRef, email);
     return deleteDoc(encoderDoc);
  };

  getSubUsersByBarangay = () => {
    return getDocs(brgyQuery);
  };

  //getSubUsers = () => {
  //   return getDocs(subUserRef);

  //   const bookDoc = doc(db, "books", id);
  //   return getDoc(bookDoc);
  // };
}

export default new SubUserDataService;