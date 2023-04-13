import { db } from "../firebase.js";
import {collection, where, query, getDocs, doc, getCountFromServer} from "firebase/firestore";
//const q1 = query(citiesRef, where("state", "==", "CO"), where("name", "==", "Denver"));

//references
const yearRef = collection(db, "encoding_year");
const householdsRef = collection(doc(yearRef,"2022"),"households");
const personalInfoRef = collection(doc(yearRef,"2022"),"personalInfos");
const householdMembersRef = collection(doc(yearRef, "2022"), "householdMembers");
const economicRef = collection(doc(yearRef,"2022"),"economicProfiles");
const livingConditionsRef = collection(doc(yearRef,"2022"),"livingConditions");
const hhCPAndGQsRef = collection(doc(yearRef,"2022"),"hhCPAndGQs");
const hhmCPAndGQsRef = collection(doc(yearRef,"2022"),"hhmCPAndGQs");
const crimesRef = collection(doc(yearRef,"2022"),"crimes");

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
//class or worker
const privateQuery = query(economicRef, where('brgy', '==', barangay), where('class_of_worker', '==', 'Private Sector Employee'))
const governmentQuery = query(economicRef, where('brgy', '==', barangay), where('class_of_worker', '==', 'Government Employee'))
const selfEmployedQuery = query(economicRef, where('brgy', '==', barangay), where('class_of_worker', '==', 'Self-Employed Employee'))
const familyWorkerQuery = query(economicRef, where('brgy', '==', barangay), where('class_of_worker', '==', 'Paid & Unpaid Family Workers'))
//type of industry
const industry1 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Accountancy, Banking & Finance'));
const industry2 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Business, Consulting and Management'))
const industry3 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Charity & Voluntary Work'))
const industry4 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Creative Arts & Design'))
const industry5 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Energy & Facilities'))
const industry6 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Engineering & Manufacturing'))
const industry7 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Environment & Agriculture'))
const industry8 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Healthcare'))
const industry9 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Hospitality & Events Management'))
const industry10 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Information Technology'))
const industry11 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Law'))
const industry12 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Law Enforcement & Security'))
const industry13 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Leisure, Sport and Tourism'))
const industry14 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Marketing, Advertising & PR'))
const industry15 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Media & Internet'))
const industry16 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Property & Construction'))
const industry17 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Public Service and Administration'))
const industry18 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Recruitment & HR'))
const industry19 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Retail'))
const industry20 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Sales'))
const industry21 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Science & Pharmaceuticals'))
const industry22 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Social Care'))
const industry23 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Teacher Training & Education'))
const industry24 = query(economicRef, where('brgy', '==', barangay), where('type_of_industry', '==', 'Transport & Logistics'))
//location of employment
const withinBrgyQuery = query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', 'Within the Barangay'))
const withinCityQuery = query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', 'Within the City/Municipality'))
const withinProvinceQuery = query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', 'Within the Province'))
const withinMindanaoQuery = query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', 'Within Mindanao'))
const withinCountryQuery = query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', 'Within the Country'))
const abroadQuery = query(economicRef, where('brgy', '==', barangay), where('location_of_employment', '==', 'Abroad'))
//business permit (for self-employed) 
const noRegQuery = query(economicRef, where('brgy', '==', barangay), where('business_registration', '==', 'No Registration'))
const onProcessQuery = query(economicRef, where('brgy', '==', barangay), where('business_registration', '==', 'On Process'))
const dtiRFegQuery = query(economicRef, where('brgy', '==', barangay), where('business_registration', '==', 'DTI Registered'))
const municipalRegQuery = query(economicRef, where('brgy', '==', barangay), where('business_registration', '==', 'Municipal/City Level'))
const barangayRegQuery = query(economicRef, where('brgy', '==', barangay), where('business_registration', '==', 'Barangay Level'))
//type of dweling
const singleDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Single'))
const duplexDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Duplex'))
const multiDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Multi-Unit'))
const commercialDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Commercial/Agricultural/Industrial'))
const institutionalDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Institutional'))
const homelessDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Homeless'))
const otherDwelling = query(livingConditionsRef, where('brgy', '==', barangay), where('type_of_dwelling', '==', 'Others'))
//roofing materials
const strongRoofing = query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', 'Strong'))
const lightRoofing = query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', 'Light'))
const salvagedRoofing = query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', 'Salvaged Materials'))
const mostlyStrongRoofing = query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', 'Mixed Mostly Strong'))
const mostlyLightRoofing = query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', 'Mixed Mostly Light'))
const mostlySalvagedRoofing = query(livingConditionsRef, where('brgy', '==', barangay), where('roofing_material', '==', 'Mixed Mostly Salvaged'))
//walling material
const strongWalling = query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', 'Strong'))
const lightWalling = query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', 'Light'))
const salvagedWalling = query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', 'Salvaged Materials'))
const mostlyStrongWalling = query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', 'Mixed Mostly Strong'))
const mostlyLightWalling = query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', 'Mixed Mostly Light'))
const mostlySalvagedWalling = query(livingConditionsRef, where('brgy', '==', barangay), where('walling_material', '==', 'Mixed Mostly Salvaged'))
//house occupancy 
const ownerOccupy = query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', 'Owner'))
const rentOccupy = query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', 'Renting'))
const withOthersOccupy = query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', 'Nakikitira/ Living with Parents or Relatives'))
const caretakerOccupy = query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', 'Caretaker'))
const squatterOccupy = query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', 'Squatter'))
const otherOccupy = query(livingConditionsRef, where('brgy', '==', barangay), where('house_occupancy_status', '==', 'Others'))
//lot occupancy
const ownerLot = query(livingConditionsRef, where('brgy', '==', barangay), where('lot_occupancy_status', '==', 'Owner'))
const rentLot = query(livingConditionsRef, where('brgy', '==', barangay), where('lot_occupancy_status', '==', 'Renting'))
const caretakerLot = query(livingConditionsRef, where('brgy', '==', barangay), where('lot_occupancy_status', '==', 'Caretaker (using the property with consent)'))
const squatterLot = query(livingConditionsRef, where('brgy', '==', barangay), where('lot_occupancy_status', '==', 'Squatter'))
const otherLot = query(livingConditionsRef, where('brgy', '==', barangay), where('lot_occupancy_status', '==', 'Others'))
//fuel used in cooking
const woodFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'Wood'))
const electricFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'Electricity'))
const lpgFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'LPG'))
const biogasFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'Biogas'))
const charcoalFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'Charcoal'))
const butaneFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'Butane'))
const otherFuel = query(livingConditionsRef, where('brgy', '==', barangay), where('cooking_fuel_type', '==', 'Others'))
//type of toilet 
const waterSealedExclusive = query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', 'Water-sealed Exclusive (exclusive to household only)'))
const waterSealedShared = query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', 'Water-sealed Shared (several household)'))
const antipoloTypeExclusive = query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', 'Antipolo Type Exclusive (exclusive to household only)'))
const antipoloTypeShared = query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', 'Antipolo Type Shared (several household)'))
const communalToilet = query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', 'Communal (intended for community use)'))
const noToilet = query(livingConditionsRef, where('brgy', '==', barangay), where('toilet_type', '==', 'None/Anywhere/Open Spaces'))
//source of drinking water
const deepWellWater = query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', 'Deep Well (Level 1)'))
const artesianWater = query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', 'Artesian Well (Level 1)'))
const shallowWater = query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', 'Shallow Well (Level 1)'))
const leveledWater = query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', 'Level II & Level III Water Systems'))
const commercialWater = query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', 'Commercial Water Refill Stations'))
const otherWater = query(livingConditionsRef, where('brgy', '==', barangay), where('drinking_water_source', '==', 'Others'))
//electricity access
const withElectricity = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_access', '==', 'With Electricity'))
const withoutElectricity = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_access', '==', 'Without Electricity'))
//source of electricity
const noElectricSource = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'None'))
const companySource = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'Electric Company'))
const generatorSource = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'Generator'))
const solarcSource = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'Solar Panel'))
const batterySource = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'Battery'))
const otherSource = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'Others'))
//liquid waste destination
// a)  
// b)  Open pit
// c)  Vacant Lot
// d)  Bodies of Water (Swamp/River/Streams/Lake/Ocean)
// e)  Others, specify _____________
// const sewerDest = query(livingConditionsRef, where('brgy', '==', barangay), where('electricity_source', '==', 'Sewer/Drainage/Canals'))
//water transportation - di pa nagagamit
const raftTranspo = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Raft/Balsa'))
const motorizedBangka = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Small Boat/Bangka (non-motorized)'))
const nonMotorizedBangka = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Small Boat/Bangka (motorized)'))
const bigBoatQuery = query(livingConditionsRef, where('brgy', '==', barangay), where('water_transport', '==', 'Big Boat/Lantsa (motorized)'))
//crime number
const crimesQuery = query(crimesRef, where('brgy', '==', barangay))
//crime title        
const murderQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Murder/Homicide'))
const injuryQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Physical Injury'))
const rapeQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Rape'))
const theftQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Theft'))
const robberyQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Robbery'))
const drugsQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Prohibited Drug Use'))
const traffickingQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Trafficking in Persons'))
const illegalRecQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Illegal Recruitment'))
const prostitutionQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Prostitution'))
const econAbuseQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Economic Abuse'))
const sexualHarassQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Sexual Harassment'))
const othersQuery = query(crimesRef, where('brgy', '==', barangay), where('crime_title', '==', 'Others'))
//crime age bracket
const underageQuery = query(crimesRef, where('brgy', '==', barangay), where('age', '==', '0-17 years'))
const onAgeQuery = query(crimesRef, where('brgy', '==', barangay), where('age', '==', 'b) 18-above '))
//crime location
const withinBarangayQuery = query(crimesRef, where('brgy', '==', barangay), where('location', '==', 'Within the Barangay'))
const withinMunQuery = query(crimesRef, where('brgy', '==', barangay), where('location', '==', 'Within the Municipality'))
const withinProvQuery = query(crimesRef, where('brgy', '==', barangay), where('location', '==', 'Within the Province'))
const outProvQuery = query(crimesRef, where('brgy', '==', barangay), where('location', '==', 'Outside the Province'))
//crime gender
const maleCQuery = query(crimesRef, where('brgy', '==', barangay), where('sex', '==', 'Male'))
const femaleCQuery = query(crimesRef, where('brgy', '==', barangay), where('sex', '==', 'Female'))
//community participation total
const communityParticipation = query(hhmCPAndGQsRef, where('brgy', '==', barangay), where('membership_cbo', '==', 'Yes'))
//QUERY FOR FETCHING OF WHOLE DATA SET
const personalInfoQuery = query(personalInfoRef, where('brgy', '==', barangay))
const hhCPAndGQsQuery = query(hhCPAndGQsRef, where('brgy', '==', barangay))
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

     return getCountFromServer(pwdUnregQuery)
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

  getClassOfWorker = async () => {

    const privateWorker = await getCountFromServer(privateQuery)
    const government = await getCountFromServer(governmentQuery)
    const selfEmployed = await getCountFromServer(selfEmployedQuery)
    const familyWorker = await getCountFromServer(familyWorkerQuery)

    const data = [
      {attribute:'Private', count:privateWorker.data().count},
     {attribute:'Government', count:government.data().count},
     {attribute:'Self-employed', count:selfEmployed.data().count},
     {attribute:'Paid/Unpaid Family Worker', count:familyWorker.data().count}]

    //console.log(data)
    return data;
  }

  getIndustry = async () => {

    const i_1 = await getCountFromServer(industry1);
    const i_2 = await getCountFromServer(industry2);
    const i_3 = await getCountFromServer(industry3);
    const i_4 = await getCountFromServer(industry4);
    const i_5 = await getCountFromServer(industry5);
    const i_6 = await getCountFromServer(industry6);
    const i_7 = await getCountFromServer(industry7);
    const i_8 = await getCountFromServer(industry8);
    const i_9 = await getCountFromServer(industry9);
    const i_10 = await getCountFromServer(industry10); 
    const i_11 = await getCountFromServer(industry11);
    const i_12 = await getCountFromServer(industry12);
    const i_13 = await getCountFromServer(industry13);
    const i_14 = await getCountFromServer(industry14);
    const i_15 = await getCountFromServer(industry15);
    const i_16 = await getCountFromServer(industry16);
    const i_17 = await getCountFromServer(industry17);
    const i_18 = await getCountFromServer(industry18);
    const i_19 = await getCountFromServer(industry19);
    const i_20 = await getCountFromServer(industry20);
    const i_21 = await getCountFromServer(industry21);
    const i_22 = await getCountFromServer(industry22);
    const i_23 = await getCountFromServer(industry23);
    const i_24 = await getCountFromServer(industry24);

    const data = [
       {attribute:'Accountancy, Banking & Finance', count:i_1.data().count},
       {attribute:'Business, Consulting and Management', count:i_2.data().count},
       {attribute:'Charity & Voluntary Work', count:i_3.data().count},
       {attribute:'Creative Arts & Design', count:i_4.data().count},
       {attribute:'Energy & Facilities', count:i_5.data().count},
       {attribute:'Engineering & Manufacturing', count:i_6.data().count},
       {attribute:'Environment & Agriculture', count:i_7.data().count},
       {attribute:'Healthcare', count:i_8.data().count},
       {attribute:'Hospitality & Events Management', count:i_9.data().count},
       {attribute:'Information Technology', count:i_10.data().count},
       {attribute:'Law', count:i_11.data().count},
       {attribute:'Law Enforcement & Security', count:i_12.data().count},
       {attribute:'Leisure, Sport and Tourism', count:i_13.data().count},
       {attribute:'Marketing, Advertising & PR', count:i_14.data().count},
       {attribute:'Media & Internet', count:i_15.data().count},
       {attribute:'Property & Construction', count:i_16.data().count},
       {attribute:'Public Service and Administration', count:i_17.data().count},
       {attribute:'Recruitment & HR', count:i_18.data().count},
       {attribute:'Retail', count:i_19.data().count},
       {attribute:'Sales', count:i_20.data().count},
       {attribute:'Science & Pharmaceuticals', count:i_21.data().count},
       {attribute:'Social Care', count:i_22.data().count},
       {attribute:'Teacher Training & Education', count:i_23.data().count},
       {attribute:'Transport & Logistics', count:i_24.data().count}]

      //console.log(data)
      return data;
  }

  getEmploymentLoc = async () => {

    const brgy = await getCountFromServer(withinBrgyQuery);
    const city = await getCountFromServer(withinCityQuery);
    const province = await getCountFromServer(withinProvinceQuery);
    const mindanao = await getCountFromServer(withinMindanaoQuery);
    const country = await getCountFromServer(withinCountryQuery);
    const abroad = await getCountFromServer(abroadQuery);

    const data = [
      {attribute:'Within the Barangay', count:brgy.data().count},
      {attribute:'Within the City/Municipality', count:city.data().count},
      {attribute:'Within the Province', count:province.data().count},
      {attribute:'Within Mindanao', count:mindanao.data().count},
      {attribute:'Within the Country', count:country.data().count},
      {attribute:'Abroad', count:abroad.data().count}]

    //console.log(data)
    return data;
  }

  getBusinessPermit = async () => {

    const noreg = await getCountFromServer(noRegQuery);
    const onprocess = await getCountFromServer(onProcessQuery);
    const dti = await getCountFromServer(dtiRFegQuery);
    const municipalreg = await getCountFromServer(municipalRegQuery);
    const barangayreg = await getCountFromServer(barangayRegQuery);

     const data = [
      {attribute:'No Registration', count:noreg.data().count},
      {attribute:'On Process', count:onprocess.data().count},
      {attribute:'DTI Registered', count:dti.data().count},
      {attribute:'Municipal/City Level', count:municipalreg.data().count},
      {attribute:'Barangay Level', count:barangayreg.data().count}]

    //console.log(data)
    return data;
  }

  getDwellingType = async () => {

    const single = await getCountFromServer(singleDwelling);
    const duplex = await getCountFromServer(duplexDwelling); 
    const multi = await getCountFromServer(multiDwelling);
    const commercial = await getCountFromServer(commercialDwelling);
    const institutional = await getCountFromServer(institutionalDwelling);
    const homeless = await getCountFromServer(homelessDwelling);
    const othersD = await getCountFromServer(otherDwelling);

    const data = [

        {attribute:'Single', count:single.data().count},
        {attribute:'Duplex', count:duplex.data().count},
        {attribute:'Multi-Unit', count:multi.data().count},
        {attribute:'Commercial/Agricultural/Industrial', count:commercial.data().count},
        {attribute:'Institutional', count:institutional.data().count},
        {attribute:'Homeless', count:homeless.data().count},
        {attribute:'Others', count:othersD.data().count}]

      //console.log(data)
      return data;

  }

  getRoofingType = async () => {

    const strongR = await getCountFromServer(strongRoofing);
    const lightR = await getCountFromServer(lightRoofing);
    const salvagedR = await getCountFromServer(salvagedRoofing); 
    const mostlyStrongR = await getCountFromServer(mostlyStrongRoofing);
    const mostlyLightR = await getCountFromServer(mostlyLightRoofing);
    const mostlySalvagedR = await getCountFromServer(mostlySalvagedRoofing);
        
    const data = [

        {attribute:'Strong', count:strongR.data().count},
        {attribute:'Light', count:lightR.data().count},
        {attribute:'Salvaged Materials', count:salvagedR.data().count},
        {attribute:'Mixed Mostly Strong', count:mostlyStrongR.data().count},
        {attribute:'Mixed Mostly Light', count:mostlyLightR.data().count},
        {attribute:'Mixed Mostly Salvaged', count:mostlySalvagedR.data().count}]

    //console.log(data)
    return data;

  }

  getWallingType = async () => {
    
    const strongW = await getCountFromServer(strongWalling);
    const lightW = await getCountFromServer(lightWalling);
    const salvagedW = await getCountFromServer(salvagedWalling);
    const mostlyStrongW = await getCountFromServer(mostlyStrongWalling);
    const mostlyLightW = await getCountFromServer(mostlyLightWalling);
    const mostlySalvagedW = await getCountFromServer(mostlySalvagedWalling);
    
    const data = [

        {attribute:'Strong', count:strongW.data().count},
        {attribute:'Light', count:lightW.data().count},
        {attribute:'Salvaged Materials', count:salvagedW.data().count},
        {attribute:'Mixed Mostly Strong', count:mostlyStrongW.data().count},
        {attribute:'Mixed Mostly Light', count:mostlyLightW.data().count},
        {attribute:'Mixed Mostly Salvaged', count:mostlySalvagedW.data().count}]

    //console.log(data)
    return data;
  }

  getHouseOccupancy = async () => {

    const ownerH = await getCountFromServer(ownerOccupy);
    const rentingH = await getCountFromServer(rentOccupy);
    const withOthersH = await getCountFromServer(withOthersOccupy);
    const caretakerH = await getCountFromServer(caretakerOccupy);
    const squatterH = await getCountFromServer(squatterOccupy);
    const othersH = await getCountFromServer(otherOccupy);


    const data = [

        {attribute:'Owner', count:ownerH.data().count},
        {attribute:'Renting', count:rentingH.data().count},
        {attribute:'Nakikitira/Living with Parents or Relatives', count:withOthersH.data().count},
        {attribute:'Caretaker', count:caretakerH.data().count},
        {attribute:'Squatter', count:squatterH.data().count},
        {attribute:'Others', count:othersH.data().count}]

    //console.log(data)
    return data;

  }

  getLotOccupancy = async () => {

    const ownerL = await getCountFromServer(ownerLot);
    const rentingL = await getCountFromServer(rentLot);
    const caretakerL = await getCountFromServer(caretakerLot);
    const squatterL = await getCountFromServer(squatterLot);
    const othersL = await getCountFromServer(otherLot);

    const data = [

        {attribute:'Owner', count:ownerL.data().count},
        {attribute:'Renting', count:rentingL.data().count},
        {attribute:'Caretaker', count:caretakerL.data().count},
        {attribute:'Squatter', count:squatterL.data().count},
        {attribute:'Others', count:othersL.data().count}]

    //console.log(data)
    return data;

  }

  getFuelForCooking = async () => {

    const wood = await getCountFromServer(woodFuel);
    const electric = await getCountFromServer(electricFuel);
    const lpg = await getCountFromServer(lpgFuel);
    const biogas = await getCountFromServer(biogasFuel);
    const charcoal = await getCountFromServer(charcoalFuel);
    const butane = await getCountFromServer(butaneFuel);
    const othersF = await getCountFromServer(otherFuel);

    const data = [

        {attribute:'Wood', count:wood.data().count},
        {attribute:'Electricity', count:electric.data().count},
        {attribute:'LPG', count:lpg.data().count},
        {attribute:'Biogas', count:biogas.data().count},
        {attribute:'Charcoal', count:charcoal.data().count},
        {attribute:'Butane', count:butane.data().count},
        {attribute:'Others', count:othersF.data().count}]

    //console.log(data)
    return data;
  }

  getToiletType = async () => {

    const waterExclusive = await getCountFromServer(waterSealedExclusive);
    const waterShared = await getCountFromServer(waterSealedShared);
    const antipoloExclusive = await getCountFromServer(antipoloTypeExclusive);
    const antipoloShared = await getCountFromServer(antipoloTypeShared);
    const communal = await getCountFromServer(communalToilet);
    const noneToilet = await getCountFromServer(noToilet);

    const data = [

        {attribute:'Water-sealed Exclusive (exclusive to household only)', count:waterExclusive.data().count},
        {attribute:'Water-sealed Shared (several household)', count:waterShared.data().count},
        {attribute:'Antipolo Type Exclusive (exclusive to household only)', count:antipoloExclusive.data().count},
        {attribute:'Antipolo Type Shared (several household)', count:antipoloShared.data().count},
        {attribute:'Communal (intended for community use)', count:communal.data().count},
        {attribute:'None/Anywhere/Open Spaces', count:noneToilet.data().count}]

    //console.log(data)
    return data;
  }

  getDrinkingSource = async () => {
    
    const deepwell = await getCountFromServer(deepWellWater);
    const artesian = await getCountFromServer(artesianWater);
    const shallow = await getCountFromServer(shallowWater);
    const level = await getCountFromServer(leveledWater);
    const commercial = await getCountFromServer(commercialWater);
    const othersW = await getCountFromServer(otherWater);

    const data = [

          {attribute:'Deep Well (Level 1)', count:deepwell.data().count},
          {attribute:'Artesian Well (Level 1)', count:artesian.data().count},
          {attribute:'Shallow Well (Level 1)', count:shallow.data().count},
          {attribute:'Level II & Level III Water Systems', count:level.data().count},
          {attribute:'Commercial Water Refill Stations', count:commercial.data().count},
          {attribute:'Others', count:othersW.data().count}]

      //console.log(data)
      return data;
  
  }

  getElectricityAccess = async () => {

    const electricity = await getCountFromServer(withElectricity);
    const noElectricty = await getCountFromServer(withoutElectricity);

    const data = [

          {attribute:'With Electricity', count:electricity.data().count},
          {attribute:'Without Electricity', count:noElectricty.data().count}]

      //console.log(data)
      return data;
  }

  getElectricitySource = async () => {

    const nosource = await getCountFromServer(noElectricSource);
    const company = await getCountFromServer(companySource);
    const generator = await getCountFromServer(generatorSource);
    const solar = await getCountFromServer(solarcSource);
    const battery = await getCountFromServer(batterySource);
    const othersE = await getCountFromServer(otherSource);

    const data = [

          {attribute:'None', count:nosource.data().count},
          {attribute:'Electric Company', count:company.data().count},
          {attribute:'Generator', count:generator.data().count},
          {attribute:'Solar Panel', count:solar.data().count},
          {attribute:'Battery', count:battery.data().count},
          {attribute:'Others', count:othersE.data().count}
      ]

      //console.log(data)
    return data;
  }

  getWaterTransport = async () => {

    const raft = await getCountFromServer(raftTranspo);
    const motorBangka = await getCountFromServer(motorizedBangka);
    const nonMotorBangka = await getCountFromServer(nonMotorizedBangka);
    const bigBoat = await getCountFromServer(bigBoatQuery);

    const data = [

          {attribute:'Raft/Balsa', count:raft.data().count},
          {attribute:'Small Boat/Bangka (non-motorized)', count:motorBangka.data().count},
          {attribute:'Small Boat/Bangka (motorized)', count:nonMotorBangka.data().count},
          {attribute:'Big Boat/Lantsa (motorized)', count:bigBoat.data().count}
      ]

      //console.log(data)
    return data;
  
  }

  getNumberOfCrimes = () => {

    return getCountFromServer(crimesQuery);
  
  }

  getCBOMembers = () => {

    return getCountFromServer(communityParticipation);
  }

  getCrimeTitles = async () => {
    
    const murder = await getCountFromServer(murderQuery);
    const injury = await getCountFromServer(injuryQuery);
    const rape = await getCountFromServer(rapeQuery);
    const theft = await getCountFromServer(theftQuery);
    const robbery = await getCountFromServer(robberyQuery);
    const drugs = await getCountFromServer(drugsQuery);
    const trafficking = await getCountFromServer(traffickingQuery);
    const illegal = await getCountFromServer(illegalRecQuery);
    const prostitution = await getCountFromServer(prostitutionQuery);
    const econAbuse = await getCountFromServer(econAbuseQuery);
    const sexual = await getCountFromServer(sexualHarassQuery);
    const others = await getCountFromServer(othersQuery);

     const data = [

          {attribute:'Murder/Homicide', count:murder.data().count},
          {attribute:'Physical Injury', count:injury.data().count},
          {attribute:'Rape', count:rape.data().count},
          {attribute:'Theft', count:theft.data().count},
          {attribute:'Robbery', count:robbery.data().count},
          {attribute:'Prohibited Drug Use', count:drugs.data().count},
          {attribute:'Trafficking in Persons', count:trafficking.data().count},
          {attribute:'Illegal Recruitment', count:illegal.data().count},
          {attribute:'Prostitution', count:prostitution.data().count},
          {attribute:'Economic Abuse', count:econAbuse.data().count},
          {attribute:'Sexual Harassment', count:sexual.data().count},
          {attribute:'Others', count:others.data().count},
      ]

    //console.log(data)
    return data;
  }

  getCrimeAge = async () => {
    
    const underage = await getCountFromServer(underageQuery);
    const onAge = await getCountFromServer(onAgeQuery);

    const data = [

          {attribute:'0-17 years', count:underage.data().count},
          {attribute:'18-above', count:onAge.data().count}
      ]

    console.log(data)
    console.log(onAgeQuery)
    return data;
  
  }

  getCrimeLoc = async () => {
    
    const withinB = await getCountFromServer(withinBarangayQuery);
    const withinM = await getCountFromServer(withinMunQuery);
    const withinP = await getCountFromServer(withinProvQuery);
    const outP = await getCountFromServer(outProvQuery);

    const data = [

          {attribute:'Within the Barangay', count:withinB.data().count},
          {attribute:'Within the Municipality', count:withinM.data().count},
          {attribute:'Within the Province', count:withinP.data().count},
          {attribute:'Outside the Province', count:outP.data().count},
      ]

    //console.log(data)
    return data;
  }

   getCrimeGender = async () => {
    
    const maleC = await getCountFromServer(maleCQuery);
    const femaleC = await getCountFromServer(femaleCQuery);
  
    const data = [

          {attribute:'Male', count:maleC.data().count},
          {attribute:'Female', count:femaleC.data().count},
 
      ]

    //console.log(data)
    return data;
  }



  getPersonalInfo = () => {

    return getDocs(personalInfoQuery);
  }

  gethhCPAndGQs = () => {

    return getDocs(hhCPAndGQsQuery);
  }

}

export default new CommunityProfileDataService;