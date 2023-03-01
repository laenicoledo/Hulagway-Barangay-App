import { db } from "../firebase.js";
import {collection, where, query, getDocs, getDoc, addDoc, doc, getCountFromServer} from "firebase/firestore";
//const q1 = query(citiesRef, where("state", "==", "CO"), where("name", "==", "Denver"));

//references
const yearRef = collection(db, "encoding_year");
const householdsRef = collection(doc(yearRef,"2022"),"households")
const personalInfoRef = collection(doc(yearRef,"2022"),"personalInfos")
const householdMembersRef = collection(doc(yearRef, "2022"), "householdMembers")

//queries
const barangay = localStorage.getItem("brgy")

//SPECIFIC COUNTS
const brgyQuery = query(householdsRef, where('brgy', '==', barangay));
//const populationQuery = query(householdsRef, where('brgy', '==', barangay))
const populationQuery = query(householdMembersRef, where('brgy', '==', barangay))
const votersQuery = query(personalInfoRef, where('brgy', '==', barangay), where('registered_voter', '==', 'Yes'))
const birthQuery = query(personalInfoRef, where('brgy', '==', barangay), where('birth_registered', '==', 'Yes'))
const ofwQuery = query(personalInfoRef, where('brgy', '==', barangay), where('ofw', '==', 'Yes'))
const pwdQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd', '==', 'Yes'))
const pwdUnregQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd_registered', '==', 'No'))
const soloParentQuery = query(personalInfoRef, where('brgy', '==', barangay), where('solo_parent', '==', 'Yes'))
const maleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('sex', '==', 'Female'))
const femaleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('sex', '==', 'Male'))
//civil status
const singleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Single'))
const marriedQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Married'))
const commonLawQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Common Law'))
const widowedQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Widowed'))
const separatedQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Separated'))
const annulledQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Annulled'))
const nonConformingQuery = query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', 'Non-conforming'))
//school status
const noEducQuery = query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', 'No Formal Education'))
const inSchoolQuery = query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', 'In-School'))
const outSchoolQuery = query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', 'Out-School'))
const techVocQuery = query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', 'Graduated (Technical/Vocational'))
const collegeQuery = query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', 'Graduated (College)'))
const postDegQuery = query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', 'Graduated (Post Degree)'))
//educational attainment
const nothingQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'No Formal Education/No Grade Completed'))
const preschoolQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'Preschool/Kinder/Day Care'))
const specialEducQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'Special Education'))
const elemQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'Elementary Level (Grade 1-6)'))
const elemGradQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'Elementary Graduate'))
const highSchoolQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'High School Level (Grade 7-12)'))
const hsGradQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'High School Graduate'))
const techVQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'Technical/Vocational'))
const collegeLevelQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'College Level'))
const collegeGradQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'College Graduate'))
const postGradQuery = query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', 'Post Graduate'))
//pwd intensity
const slightQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd_intensity', '==', 'Yes, Slightly Difficult'))
const veryQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd_intensity', '==', 'Yes, Very Difficult'))
const cannotQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd_intensity', '==', 'Cannot do at all'))
//major dialects spoken
const tagalogQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Tagalog'))
const kapangpanganQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Kapangpangan'))
const pangasinenseQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Pangasinense'))
const ilokoQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Iloko'))
const bikolQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Bikol'))
const cebuanoQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Cebuano/Bisaya'))
const hiligaynonQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Hiligaynon'))
const surigaononQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Surigaonon'))
const warayQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Waray'))
const tausugQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Tausug'))
const manguindanaoanQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Manguindanaoan'))
const maranaoQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Maranao'))
const chabacanoQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Chabacano'))
const englishQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'English'))
const foreignQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Other, Foreign Languages'))
const localQuery = query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', 'Other, Local Languages '))
//working class
const isWorkingQuery = query(personalInfoRef, where('brgy', '==', barangay), where('member_working', '==', 'Yes'))
const notWorkingQuery = query(personalInfoRef, where('brgy', '==', barangay), where('member_working', '==', 'No'))
//QUERY FOR FETCHING OF WHOLE DATA SET
const personalInfoQuery = query(personalInfoRef, where('brgy', '==', barangay))

//const idRef = doc(userRef, auth.currentUser.uid)

class CommunityProfileDataService { 

  getTotalHouseholds = () => {

    return getCountFromServer(brgyQuery)
    
  };

  getTotalPopulation = () => {
    
    //return getDocs(populationQuery)
    return getCountFromServer(populationQuery)
  
  }

  getTotalVoters = () => {

    return getCountFromServer(votersQuery)
  }

  getTotalBirthRegistered = () => {

    return getCountFromServer(birthQuery)
  }

  getTotalOfw = () => {

    return getCountFromServer(ofwQuery)
  }

  getTotalPwd = () => {

    return getCountFromServer(pwdQuery)
  }

 getTotalUnregisteredPwd = () => {

     return getCountFromServer(pwdQuery)
  }

  getTotalSoloParent = () => {

    return getCountFromServer(soloParentQuery)
  }

  getTotalMale = () => {

    return getCountFromServer(maleQuery)
  }

  getTotalFemale = () => {

    return getCountFromServer(femaleQuery)
  }

  getCivilStatus = async () => {

    const single = await getCountFromServer(singleQuery)
    const married = await getCountFromServer(marriedQuery)
    const commonLaw = await getCountFromServer(commonLawQuery)
    const widowed = await getCountFromServer(widowedQuery)
    const separated = await getCountFromServer(separatedQuery)
    const annulled = await getCountFromServer(annulledQuery)
    const nonConforming = await getCountFromServer(nonConformingQuery)

    const data = [{attribute:'Single', count:single.data().count},
     {attribute:'Married', count:married.data().count},
     {attribute:'Common Law', count:commonLaw.data().count},
     {attribute:'Widowed', count:widowed.data().count},
     {attribute:'Separated', count:separated.data().count},
     {attribute:'Annulled', count:annulled.data().count},
     {attribute:'Non-conforming', count:nonConforming.data().count}]

    //console.log(data)
    return data;
  }

  getSchoolStatus = async () => {

    const noEduc = await getCountFromServer(noEducQuery)
    const inSchool = await getCountFromServer(inSchoolQuery)
    const outSchool = await getCountFromServer(outSchoolQuery)
    const techVoc = await getCountFromServer(techVocQuery)
    const college = await getCountFromServer(collegeQuery)
    const postDeg = await getCountFromServer(postDegQuery)

    const data = [{attribute:'No Formal Education', count:noEduc.data().count},
     {attribute:'In-School', count:inSchool.data().count},
     {attribute:'Out-School', count:outSchool.data().count},
     {attribute:'Graduate - TechVoc', count:techVoc.data().count},
     {attribute:'Graduate - College', count:college.data().count},
     {attribute:'Graduate - Post-Degree', count:postDeg.data().count}]

    //console.log(data)
    return data;
  }

  getEducAttainment = async () => {

    const none = await getCountFromServer(nothingQuery)
    const preschool = await getCountFromServer(preschoolQuery)
    const special = await getCountFromServer(specialEducQuery)
    const elem = await getCountFromServer(elemQuery)
    const elemGrad = await getCountFromServer(elemGradQuery)
    const highschool = await getCountFromServer(highSchoolQuery)
    const hsGrad = await getCountFromServer(hsGradQuery)
    const techVoc = await getCountFromServer(techVQuery)
    const college = await getCountFromServer(collegeLevelQuery)
    const collegeGrad = await getCountFromServer(collegeGradQuery)
    const postGrad = await getCountFromServer(postGradQuery)

    const data = [{attribute:'No Formal Education', count:none.data().count},
     {attribute:'Preschool/Kinder/Day Care', count:preschool.data().count},
     {attribute:'Special Education', count:special.data().count},
     {attribute:'Elementary Level (Grade 1-6)', count:elem.data().count},
     {attribute:'Elementary Graduate', count:elemGrad.data().count},
     {attribute:'High School Level (Grade 7-12)', count:highschool.data().count},
     {attribute:'High School Graduate', count:hsGrad.data().count},
     {attribute:'Technical/Vocational', count:techVoc.data().count},
     {attribute:'College Level', count:college.data().count},
     {attribute:'College Graduate', count:collegeGrad.data().count},
     {attribute:'Post Graduate', count:postGrad.data().count}]

    //console.log(data)
    return data;
  }

  getPwdIntensity = async () => {

    const slight = await getCountFromServer(slightQuery)
    const very = await getCountFromServer(veryQuery)
    const cannot = await getCountFromServer(cannotQuery)

    const data = [{attribute:'Slightly Difficult', count:slight.data().count},
     {attribute:'Very Difficult', count:very.data().count},
     {attribute:'Cannot do anything at all', count:cannot.data().count}]

    return data;
  }

   getDialects = async () => {
    const tagalog = await getCountFromServer(tagalogQuery)
    const kapangpangan = await getCountFromServer(kapangpanganQuery)
    const pangasinense = await getCountFromServer(pangasinenseQuery)
    const iloko = await getCountFromServer(ilokoQuery)
    const bikol = await getCountFromServer(bikolQuery)
    const cebuano = await getCountFromServer(cebuanoQuery)
    const hiligaynon = await getCountFromServer(hiligaynonQuery)
    const surigaonon = await getCountFromServer(surigaononQuery)
    const waray = await getCountFromServer(warayQuery)
    const tausug = await getCountFromServer(tausugQuery)
    const manguindanaoan = await getCountFromServer(manguindanaoanQuery)
    const maranao = await getCountFromServer(maranaoQuery)
    const chabacano = await getCountFromServer(chabacanoQuery)
    const english = await getCountFromServer(englishQuery)
    const foreign = await getCountFromServer(foreignQuery)
    const local = await getCountFromServer(localQuery)

    const data = [{attribute:'Tagalog', count:tagalog.data().count},
     {attribute:'Kapangpangan', count:kapangpangan.data().count},
     {attribute:'Pangasinense', count:pangasinense.data().count},
     {attribute:'Iloko', count:iloko.data().count},
     {attribute:'Bikol', count:bikol.data().count},
     {attribute:'Cebuano/Bisaya', count:cebuano.data().count},
     {attribute:'Hiligaynon', count:hiligaynon.data().count},
     {attribute:'Surigaonon', count:surigaonon.data().count},
     {attribute:'Waray', count:waray.data().count},
     {attribute:'Tausug', count:tausug.data().count},
     {attribute:'Manguindanaoan', count:manguindanaoan.data().count},
     {attribute:'Maranao', count:maranao.data().count},
     {attribute:'Chabacano', count:chabacano.data().count},
     {attribute:'English', count:english.data().count},
     {attribute:'Other, Foreign Languages', count:foreign.data().count},
     {attribute:'Other, Local Languages', count:local.data().count}]

    //console.log(data)
    return data;
  }

  getIsWorking = async () => {

    const working = await getCountFromServer(isWorkingQuery)
    const notWorking = await getCountFromServer(notWorkingQuery)

    const data = [{attribute:'Employed', count:working.data().count},
     {attribute:'Unemployed', count:notWorking.data().count}]

    //console.log(data)
    return data;
  }

  getPersonalInfo = () => {

    return getDocs(personalInfoQuery)
  }

}

export default new CommunityProfileDataService;