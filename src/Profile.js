import {React, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';
import BarangayDataService from "./Services/barangay-service.js";
import {collection, getDoc, doc} from "firebase/firestore";
import { db, auth } from './firebase.js';

//get collections in encoding year
const yearRef = collection(db, "encoding_year");

//get collection names user from document 2022
const userRef = collection(doc(yearRef,"2022"), "users")


function Profile() {

    //STATE VARIABLES
    const [barangayList, setBarangayList] = useState([{}])

    //function to check if current user barangay desig exist in database
    const checkUserBarangay = async () => {

      const idRef = doc(userRef, auth.currentUser.uid)

      try {
        const userData = await getDoc(idRef);
        const barangay = await BarangayDataService.getBarangayByName(`${userData.data().brgy_desig}-${userData.data().city_desig}`)
        console.log(barangay.exists)
        
        if(barangay.exists){
          
        }else{
          
        }
      }catch (e) {
        return console.log(e);
      }
    }

    return(

    <div></div>

    );

}

export default Profile