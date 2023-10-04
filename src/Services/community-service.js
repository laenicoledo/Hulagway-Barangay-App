import { db } from "../firebase.js";
import {collection, where, query, getDocs, doc, getCountFromServer} from "firebase/firestore";

//references
const yearRef = collection(db, "encoding_year");

//queries
const barangay = localStorage.getItem("brgy")

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

//working class
const workingClass = [
  'Yes',
  'No'
];

//class of worker
const workerClass = [
  'Private Sector Employee',
  'Government Employee',
  'Self-Employed Employee',
  'Paid & Unpaid Family Workers'
];


//type of industry
const industryType = [
  'Accountancy, Banking & Finance',
  'Business, Consulting and Management',
  'Charity & Voluntary Work',
  'Creative Arts & Design',
  'Energy & Facilities',
  'Engineering & Manufacturing',
  'Environment & Agriculture',
  'Healthcare',
  'Hospitality & Events Management',
  'Information Technology',
  'Law',
  'Law Enforcement & Security',
  'Leisure, Sport and Tourism',
  'Marketing, Advertising & PR',
  'Media & Internet',
  'Property & Construction',
  'Public Service and Administration',
  'Recruitment & HR',
  'Retail',
  'Sales',
  'Science & Pharmaceuticals',
  'Social Care',
  'Teacher Training & Education',
  'Transport & Logistics'
];


//location of employment
const locationEmploy = [
  'Within the Barangay',
  'Within the City/Municipality',
  'Within the Province',
  'Within Mindanao',
  'Within the Country',
  'Abroad'
];


//business permit (for self-employed) 
const businessPermit = [
  'No Registration',
  'On Process',
  'DTI Registered',
  'Municipal/City Level',
  'Barangay Level'
];

//type of dweling
const dwellingType = [
  'Single',
  'Duplex',
  'Multi-Unit',
  'Commercial/Agricultural/Industrial',
  'Institutional',
  'Homeless',
  'Others'
];


//roofing materials
const roofingMats = [
  'Strong',
  'Light',
  'Salvaged Materials',
  'Mixed Mostly Strong',
  'Mixed Mostly Light',
  'Mixed Mostly Salvaged'
];

//walling material
const wallingMats = [
  'Strong',
  'Light',
  'Salvaged Materials',
  'Mixed Mostly Strong',
  'Mixed Mostly Light',
  'Mixed Mostly Salvaged'
];

//house occupancy 
const houseOccupy = [
  'Owner',
  'Renting',
  'Nakikitira/ Living with Parents or Relatives',
  'Caretaker',
  'Squatter',
  'Others'
];

//lot occupancy
const lotOccupy = [
  'Owner',
  'Renting',
  'Caretaker (using the property with consent)',
  'Squatter',
  'Others'
];

//fuel used in cooking
const fuelCooking = [
  'Wood',
  'Electricity',
  'LPG',
  'Biogas',
  'Charcoal',
  'Butane',
  'Others'
];

//type of toilet
const toiletTypes = [
  'Water-sealed Exclusive (exclusive to household only)',
  'Water-sealed Shared (several household)',
  'Antipolo Type Exclusive (exclusive to household only)',
  'Antipolo Type Shared (several household)',
  'Communal (intended for community use)',
  'None/Anywhere/Open Spaces'
];

//source of drinking water
const drinkingWaterSource = [
  'Deep Well (Level 1)',
  'Artesian Well (Level 1)',
  'Shallow Well (Level 1)',
  'Level II & Level III Water Systems',
  'Commercial Water Refill Stations',
  'Others'
];

//electricity access
const electricityAccess = [
  'With Electricity',
  'Without Electricity'
];


//source of electricity
const electricitySource = [
  'None',
  'Electric Company',
  'Generator',
  'Solar Panel',
  'Battery',
  'Others'
];

//water transpo
// const raftTranspo = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Raft/Balsa'))
// const motorizedBangka = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Small Boat/Bangka (non-motorized)'))
// const nonMotorizedBangka = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Small Boat/Bangka (motorized)'))
// const bigBoatQuery = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Big Boat/Lantsa (motorized)'))

//crime title   
const crimeTitles = [
  'Murder/Homicide',     
  'Physical Injury',     
  'Rape',      
  'Theft',     
  'Robbery',    
  'Prohibited Drug Use',     
  'Trafficking in Persons',      
  'Illegal Recruitment',    
  'Prostitution',      
  'Economic Abuse',     
  'Sexual Harassment',      
  'Others'     
];

//crime age bracket
const crimeAge = [
  '0-17 years',
  '18-above' 
];


//crime location
const crimeLoc = [
  'Within the Barangay',
  'Within the Municipality',
  'Within the Province',
  'Outside the Province'
];

//crime gender
const crimeGender = [
  'Male',
  'Female'
]; 

//const idRef = doc(userRef, auth.currentUser.uid)

class CommunityProfileDataService { 

  getTotalHouseholds = () => {

    const householdsRef = collection(doc(yearRef, localStorage.getItem("year")),"households");
    const brgyQuery = query(householdsRef, where('brgy', '==', barangay));
    
    return getCountFromServer(brgyQuery)
    
  };

  getTotalPopulation = () => {
    
    const householdMembersRef = collection(doc(yearRef, localStorage.getItem("year")), "householdMembers");
    const populationQuery = query(householdMembersRef, where('brgy', '==', barangay))
    return getCountFromServer(populationQuery)
  
  }

  getTotalVoters = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const votersQuery = query(personalInfoRef, where('brgy', '==', barangay), where('registered_voter', '==', 'Yes'))

    return getCountFromServer(votersQuery)
  }

  getTotalBirthRegistered = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const birthQuery = query(personalInfoRef, where('brgy', '==', barangay), where('birth_registered', '==', 'Yes'))

    return getCountFromServer(birthQuery)
  }

  getTotalOfw = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const ofwQuery = query(personalInfoRef, where('brgy', '==', barangay), where('ofw', '==', 'Yes'))

    return getCountFromServer(ofwQuery)
  }

  getTotalPwd = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const pwdQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd', '==', 'Yes'))

    return getCountFromServer(pwdQuery)
  }

 getTotalUnregisteredPwd = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const pwdUnregQuery = query(personalInfoRef, where('brgy', '==', barangay), where('pwd_registered', '==', 'No'))

    return getCountFromServer(pwdUnregQuery)
  }

  getTotalSoloParent = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const soloParentQuery = query(personalInfoRef, where('brgy', '==', barangay), where('solo_parent', '==', 'Yes'))

    return getCountFromServer(soloParentQuery)
  }

  getIndigenousTotal = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const indigenousQuery = query(personalInfoRef, where('brgy', '==', barangay), where('indigenous_people', '==', 'Yes'))

    return getCountFromServer(indigenousQuery)
  }


  getTotalMale = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const maleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('sex', '==', 'Female'))

    return getCountFromServer(maleQuery)
  }

  getTotalFemale = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const femaleQuery = query(personalInfoRef, where('brgy', '==', barangay), where('sex', '==', 'Male'))

    return getCountFromServer(femaleQuery)
  }

  getCivilStatus = async () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const csQueries = civilStatus.map(status => query(personalInfoRef, where('brgy', '==', barangay), where('civil_status', '==', status)));

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

  getSchoolStatus = async () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const schoolStatQueries = schoolStatus.map(status => query(personalInfoRef, where('brgy', '==', barangay), where('school_status', '==', status)));

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

  getEducAttainment = async () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const educAttQueries = educAtt.map(attainment => query(personalInfoRef, where('brgy', '==', barangay), where('highest_educational_attainment', '==', attainment)));

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

  getPwdIntensity = async () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const pwdIntensityQueries = pwdIntensity.map(intensity => query(personalInfoRef, where('brgy', '==', barangay), where('pwd_intensity', '==', intensity)));

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

  getDialects = async () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const dialectQueries = dialects.map(dialect => query(personalInfoRef, where('brgy', '==', barangay), where('major_dialect', '==', dialect)));

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

  getIsWorking = async () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const workingClassQueries = workingClass.map(type => query(personalInfoRef, where('brgy', '==', barangay), where('member_working', '==', type)));

    const data = await Promise.all(workingClassQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: workingClass[index],
          count: result.data().count
        };
      });
    });

    //console.log(data)
    return data;
  }

  getClassOfWorker = async () => {

    const economicRef = collection(doc(yearRef, localStorage.getItem("year")),"economicProfiles");
    const workerClassQueries = workerClass.map(type => query(economicRef, where('brgy', '==', barangay), where('class_of_worker', '==', type)));

    const data = await Promise.all(workerClassQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: workerClass[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getIndustry = async () => {

    const economicRef = collection(doc(yearRef, localStorage.getItem("year")),"economicProfiles");
    const industryTypeQueries = industryType.map(type => query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', type)));

    const data = await Promise.all(industryTypeQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: industryType[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getEmploymentLoc = async () => {

    const economicRef = collection(doc(yearRef, localStorage.getItem("year")),"economicProfiles");
    const locationEmployQueries = locationEmploy.map(loc => query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', loc)));

    const data = await Promise.all(locationEmployQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: locationEmploy[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getBusinessPermit = async () => {

    const economicRef = collection(doc(yearRef, localStorage.getItem("year")),"economicProfiles");
    const businessPermitQueries = businessPermit.map(type => query(economicRef, where('brgy', '==', barangay), where('business_registration', '==', type)));

    const data = await Promise.all(businessPermitQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: businessPermit[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getDwellingType = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const dwellingTypeQueries = dwellingType.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', type)));

    const data = await Promise.all(dwellingTypeQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: dwellingType[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;

  }

  getRoofingType = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const roofingMatsQueries = roofingMats.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', type)));

   const data = await Promise.all(roofingMatsQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: roofingMats[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;

  }

  getWallingType = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const wallingMatsQueries = wallingMats.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', type)));
    
    const data = await Promise.all(wallingMatsQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: wallingMats[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getHouseOccupancy = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const houseOccupyQueries = houseOccupy.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', type)));

   const data = await Promise.all(houseOccupyQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: houseOccupy[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;

  }

  getLotOccupancy = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const lotOccupyQueries = lotOccupy.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('lot_occupancy_status', '==', type)));


   const data = await Promise.all(lotOccupyQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: lotOccupy[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;

  }

  getFuelForCooking = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const fuelCookingQueries = fuelCooking.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', type)));

   const data = await Promise.all(fuelCookingQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: fuelCooking[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getToiletType = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const toiletTypesQueries = toiletTypes.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', type)));

    const data = await Promise.all(toiletTypesQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: toiletTypes[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getDrinkingSource = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const drinkingWaterQueries = drinkingWaterSource.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', type)));
    
   const data = await Promise.all(drinkingWaterQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: drinkingWaterSource[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  
  }

  getElectricityAccess = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const electricityAccessQueries = electricityAccess.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_access', '==', type)));

    const data = await Promise.all(electricityAccessQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: electricityAccess[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getElectricitySource = async () => {

    const livingConditionsRef = collection(doc(yearRef,localStorage.getItem("year")),"livingConditions");
    const electricitySourceQueries = electricitySource.map(type => query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', type)));

    const data = await Promise.all(electricitySourceQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: electricitySource[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  // getWaterTransport = async () => {

  //   const raft = await getCountFromServer(raftTranspo);
  //   const motorBangka = await getCountFromServer(motorizedBangka);
  //   const nonMotorBangka = await getCountFromServer(nonMotorizedBangka);
  //   const bigBoat = await getCountFromServer(bigBoatQuery);

  //   const data = [

  //         {attribute:'Raft/Balsa', count:raft.data().count},
  //         {attribute:'Small Boat/Bangka (non-motorized)', count:motorBangka.data().count},
  //         {attribute:'Small Boat/Bangka (motorized)', count:nonMotorBangka.data().count},
  //         {attribute:'Big Boat/Lantsa (motorized)', count:bigBoat.data().count}
  //     ]

  //     //console.log(data)
  //   return data;
  
  // }

  getNumberOfCrimes = () => {

    const crimesRef = collection(doc(yearRef, localStorage.getItem("year")),"crimes");
    const crimesQuery = query(crimesRef, where('brgy', '==', barangay))

    return getCountFromServer(crimesQuery);
  
  }

  getCBOMembers = () => {

    const hhmCPAndGQsRef = collection(doc(yearRef, localStorage.getItem("year")),"hhmCPAndGQs");
    const communityParticipation = query(hhmCPAndGQsRef, where('brgy', '==', barangay), where('membership_cbo', '==', 'Yes'))

    return getCountFromServer(communityParticipation);
  }

  getCrimeTitles = async () => {

    const crimesRef = collection(doc(yearRef, localStorage.getItem("year")),"crimes");
    const crimeTitleQueries = crimeTitles.map(type => query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', type)));
    
    const data = await Promise.all(crimeTitleQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: crimeTitles[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

  getCrimeAge = async () => {

    const crimesRef = collection(doc(yearRef, localStorage.getItem("year")),"crimes");
    const crimeAgeQueries = crimeAge.map(type => query(crimesRef, where('brgy', '==', barangay), where('age', '==', type)));
    
  const data = await Promise.all(crimeAgeQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: crimeAge[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  
  }

  getCrimeLoc = async () => {

    const crimesRef = collection(doc(yearRef, localStorage.getItem("year")),"crimes");
    const crimeLocQueries = crimeLoc.map(type => query(crimesRef, where('brgy', '==', barangay), where('location', '==', type)));
    
   const data = await Promise.all(crimeLocQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: crimeLoc[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }

   getCrimeGender = async () => {

    const crimesRef = collection(doc(yearRef, localStorage.getItem("year")),"crimes");
    const crimeGenderQueries = crimeGender.map(type => query(crimesRef, where('brgy', '==', barangay), where('sex', '==', type)));
    
  const data = await Promise.all(crimeGenderQueries.map(getCountFromServer)).then(results => {
      return results.map((result, index) => {
        return {
          attribute: crimeGender[index],
          count: result.data().count
        };
      });
    });
    //console.log(data)
    return data;
  }



  getPersonalInfo = () => {

    const personalInfoRef = collection(doc(yearRef, localStorage.getItem("year")),"personalInfos");
    const personalInfoQuery = query(personalInfoRef, where('brgy', '==', barangay))

    return getDocs(personalInfoQuery);
  }

  getEconomicProfile = () => {

    const economicRef = collection(doc(yearRef, localStorage.getItem("year")),"economicProfiles");
    const economicQuery = query(economicRef, where('brgy', '==', barangay))

    return getDocs(economicQuery);
  }

  gethhCPAndGQs = () => {

    const hhCPAndGQsRef = collection(doc(yearRef, localStorage.getItem("year")),"hhCPAndGQs");
    const hhCPAndGQsQuery = query(hhCPAndGQsRef, where('brgy', '==', barangay))

    return getDocs(hhCPAndGQsQuery);
  }

}

export default new CommunityProfileDataService;