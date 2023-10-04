import { db } from "../firebase.js";
import {collection, where, query, getDocs, setDoc, doc, updateDoc, deleteDoc, getDoc, getCountFromServer} from "firebase/firestore";

const yearRef = collection(db, "encoding_year");

const barangay = localStorage.getItem("brgy")

//const zoneRef = collection(doc(yearRef,"2022"), "zones")
//const currentYear = new Date().getFullYear();

//civil status
const civilStatus = [
  'Single',
  'Married',
  'Common Law',
  'Widowed',
  'Separated',
  'Annulled',
  'Non-conforming',
];

//school status
const schoolStatus = [
  'No Formal Education',
  'In-School',
  'Out-School',
  'Graduated (Technical/Vocational',
  'Graduated (College)',
  'Graduated (Post Degree)',
];
//educational attainment
const educAtt = [
  'No Formal Education/No Grade Completed',
  'Preschool/Kinder/Day Care',
  'Special Education',
  'Elementary Level (Grade 1-6)',
  'Elementary Graduate',
  'High School Level (Grade 7-12)',
  'High School Graduate',
  'Technical/Vocational',
  'College Level',
  'College Graduate',
  'Post Graduate'
];

//pwd intensity
const pwdIntensity = [
  'Yes, Slightly Difficult',
  'Yes, Very Difficult',
  'Cannot do at all'
];

//major dialects spoken

const dialects = [
  'Tagalog',
  'Kapangpangan',
  'Pangasinense',
  'Iloko',
  'Bikol',
  'Cebuano/Bisaya',
  'Hiligaynon',
  'Surigaonon',
  'Waray',
  'Tausug',
  'Manguindanaoan',
  'Maranao',
  'Chabacano',
  'English',
  'Other, Foreign Languages',
  'Other, Local Languages'
];

class ZoneDataService {

  // addZone = (newZone, newBarangay) => {

  //   const zoneRef = collection(doc(yearRef, localStorage.getItem("year")), "zones");

  //    return setDoc(doc(zoneRef, `${newBarangay.enteredBarangay.toString()}-${newZone.zone_num.toString()}-${newZone.zone_name.toString()}`), {
  //     zone_num: parseInt(newZone.zone_num),
  //     zone_name: newZone.zone_name,
  //     brgy: `${newBarangay.enteredCity}-${newBarangay.enteredBarangay}`});
  // };

  addZone = async (newZone, newBarangay, oldZone) => {
  
    const zoneId = `${newBarangay.enteredBarangay}-${oldZone.zone_num}-${oldZone.zone_name}`;
    const zoneRef = doc(collection(doc(yearRef, localStorage.getItem("year")), "zones"), zoneId);
    const zoneSnapshot = await getDoc(zoneRef);

    if (zoneSnapshot.exists()) {
      // If the zone already exists, update its data
      return setDoc(zoneRef, {
        ...zoneSnapshot.data(),
        zone_num: parseInt(newZone.zone_num),
        zone_name: newZone.zone_name,
        brgy: `${newBarangay.enteredCity}-${newBarangay.enteredBarangay}`
      });
    } else {
      // If the zone does not exist, add a new document for it
      return setDoc(zoneRef, {
        zone_num: parseInt(newZone.zone_num),
        zone_name: newZone.zone_name,
        brgy: `${newBarangay.enteredCity}-${newBarangay.enteredBarangay}`
      });
    }
  };


  // updateZone = (zoneName, zoneNum, oldName, oldNum) => {

  //   const zoneRef = collection(doc(yearRef, localStorage.getItem("year")), "zones");

  //   return updateDoc(doc(zoneRef, `${localStorage.getItem("brgy")}-${oldNum.toString()}-${oldName.toString()}`), {
  //     zone_num: parseInt(zoneNum),
  //     zone_name: zoneName});
  // }

  deleteZone = async (zoneId) => {
    
    const zoneRef = doc(yearRef, localStorage.getItem("year"), "zones", zoneId);

    try {
      await deleteDoc(zoneRef);
      console.log("Zone deleted successfully.");
    } catch (err) {
      console.log("Error deleting zone: ", err);
    }
  };

  getZoneByBarangay = async () => {
     
     //Get a list of all the encoding years
     const yearSnapshot = await getDocs(yearRef);
     const years = yearSnapshot.docs.map((doc) => doc.id);

     // Loop through all the years and get the zone
     for (const year of years) {
       
       const searchZoneRef = collection(doc(yearRef, year), "zones");
       const zoneSnapshot = await getDocs(query(searchZoneRef, where("brgy", "==", localStorage.getItem("brgy"))));
       
      if (!zoneSnapshot.empty) {
         return zoneSnapshot;
      }
     }
       return null;
    };

  getTotalHouseholds = (zoneNum) => {

    const householdsRef = collection(doc(yearRef, localStorage.getItem("year")),"households");
    const brgyQuery = query(householdsRef, where('brgy', '==', barangay), where('zone_num', '==', parseInt(zoneNum)));
    
    return getCountFromServer(brgyQuery)
    
  };

  getTotalPopulation = (zoneNum) => {
    
    const householdMembersRef = collection(doc(yearRef, localStorage.getItem("year")), "householdMembers");
    const populationQuery = query(householdMembersRef, where('brgy', '==', barangay),  where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(populationQuery)
  
  }

  getTotalVoters = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const votersQuery = query(personalInfoRef, where('brgy', '==', barangay), where('registered_voter', '==', 'Yes'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(votersQuery)
  }

  getTotalBirthRegistered = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const birthQuery = query(personalInfoRef, where('brgy', '==', barangay), where('birth_registered', '==', 'Yes'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(birthQuery)
  }

  getTotalOfw = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const ofwQuery = query(personalInfoRef, where('brgy', '==', barangay), where('ofw', '==', 'Yes'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(ofwQuery)
  }

  getTotalPwd = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const pwdQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd', '==', 'Yes'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(pwdQuery)
  }

 getTotalUnregisteredPwd = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const pwdUnregQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd_registered', '==', 'No'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(pwdUnregQuery)
  }

  getTotalSoloParent = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const soloParentQuery = query(personalInfoRef, where('brgy', '==', barangay), where('solo_parent', '==', 'Yes'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(soloParentQuery)
  }

  getIndigenousTotal = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const indigenousQuery = query(personalInfoRef, where('brgy', '==', barangay), where('indigenous_people', '==', 'Yes'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(indigenousQuery)
  }

  getTotalMale = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const maleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('sex', '==', 'Female'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(maleQuery)
  }

  getTotalFemale = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const femaleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('sex', '==', 'Male'), where('zone_num', '==', parseInt(zoneNum)));

    return getCountFromServer(femaleQuery)
  }

  getCivilStatus = async (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const csQueries = civilStatus.map(status => query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', status), where('zone_num', '==', parseInt(zoneNum))));

    const data = await Promise.all(csQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: civilStatus[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getSchoolStatus = async (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const schoolStatQueries = schoolStatus.map(status => query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', status), where('zone_num', '==', parseInt(zoneNum))));

    const data = await Promise.all(schoolStatQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: schoolStatus[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getEducAttainment = async (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const educAttQueries = educAtt.map(attainment => query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', attainment), where('zone_num', '==', parseInt(zoneNum))));

    const data = await Promise.all(educAttQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: educAtt[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getPwdIntensity = async (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const pwdIntensityQueries = pwdIntensity.map(intensity => query(personalInfoRef, where('brgy', '==', barangay), where('pwd_intensity', '==', intensity), where('zone_num', '==', parseInt(zoneNum))));

    const data = await Promise.all(pwdIntensityQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: pwdIntensity[index],
          count: result.data().count
        };
      });
    });
    
    //console.log(data)
    return data;
  }

  getDialects = async (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const dialectQueries = dialects.map(dialect => query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', dialect), where('zone_num', '==', parseInt(zoneNum))));

    const data = await Promise.all(dialectQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: dialects[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }


  getPersonalInfo = (zoneNum) => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const personalInfoQuery = query(personalInfoRef, where('brgy', '==', barangay), where('zone_num', '==', parseInt(zoneNum)));

    return getDocs(personalInfoQuery);
  }

}

export default new ZoneDataService;