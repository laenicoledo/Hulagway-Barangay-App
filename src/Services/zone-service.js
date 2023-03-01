import { db } from "../firebase.js";
import {collection, where, query, getDocs, setDoc, doc} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");
const zoneRef = collection(doc(yearRef,"2022"), "zones")

const zoneQuery = query(zoneRef, where("brgy", "==", localStorage.getItem("brgy")))

class ZoneDataService {

  addZone = (newZone,newBarangay) => {
     return setDoc(doc(zoneRef, `${newZone.zone_num.toString()}-${newZone.zone_name.toString()}-${newBarangay.enteredBarangay.toString()}`), {
      zone_num: parseInt(newZone.zone_num),
      zone_name: newZone.zone_name,
      brgy: `${newBarangay.enteredCity}-${newBarangay.enteredBarangay}`});
  };

  getZoneByBarangay = () => {
     return getDocs(zoneQuery);
  };

}

export default new ZoneDataService;