import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'
import SearchBar from '../SearchBar.js'
import Spinner from 'react-bootstrap/Spinner';
import BarGraph from '../BarGraph.js'
import PieGraph from '../PieGraph.js'
import BarangayDataService from "../Services/barangay-service.js";
import ZoneDataService from "../Services/zone-service.js";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { UserAuth } from '../AuthContext.js';

function PurokProfile() {
    
    //carousel
    const [index, setIndex] = useState(0);

    const handleCarousel = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    //STATE VARIABLES
    const [barangayExists, setBarangayExists] = useState();
    const [zoneList, setZoneList] = useState([{}])
    const [selectedZone, setSelectedZone] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = UserAuth();
    const [personalInfo, setPersonalInfo] = useState([{}])

    const [hhTotal, setHHTotal] = useState(0);
    const [population, setPopulation] = useState(0);
    const [voters, setVoters] = useState(0);
    const [birth, setBirth] = useState(0);
    const [ofw, setOfw] = useState(0);
    const [pwd, setPwd] = useState(0);
    const [unregisteredPwd, setUnregisteredPwd] = useState(0);
    const [soloParent, setSoloParent] = useState(0);
    const [indigenous, setIndigenous] = useState(0);

    const [religion, setReligion] = useState([{}])
    const [sex, setSex] = useState([])
    const [civilStat, setCivilStat] = useState([])
    const [schoolStat, setSchoolStat] = useState([])
    const [educAtt, setEducAtt] = useState([])
    const [country, setCountry] = useState([])
    const [pwdIntensity, setPwdIntensity] = useState([])
    const [pwdType, setPwdType] = useState([])
    const [dialects, setDialects] = useState([])

    //to fetch zones in the barangay 
    const getZones = async () => {
        const data = await ZoneDataService.getZoneByBarangay();
        console.log(data.docs);
        setZoneList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    //function to check if current user barangay desig exist in database
    const checkUserBarangay = async () => {

      //console.log(user)

      try {
         const barangayRef = localStorage.getItem("brgy")
         //console.log(barangayRef);
        
         if(barangayRef != null){
            
            await setBarangayExists(true)
            setIsLoading(true)

            const data = await BarangayDataService.getBarangayByName(barangayRef)
            //await setBarangayList(data.data())
            await getZones();

            setIsLoading(false);
         }else{
            await setBarangayExists(false);
            //alert("Barangay data currently unavailable. Please proceed to Setup Barangay tab.")
            console.log("barangay data not available");
            setIsLoading(false);
         }
     }catch (e) {
        alert(e);
     }
     
    }

    function ZoneInfo({ zone }) {
        //console.log("ZoneInfo called with zone:", zone.zone_num);
        getHHTotal(zone.zone_num);
        getPopulationTotal(zone.zone_num);
        getVoterTotal(zone.zone_num);
        getBirthTotal(zone.zone_num);
        getOfwTotal(zone.zone_num);
        getPwdTotal(zone.zone_num);
        getUnregisteredPwd(zone.zone_num);
        getSoloParentTotal(zone.zone_num);
        getIndigenousTotal(zone.zone_num);
        getPersonalInfo(zone.zone_num);
      return (
        <Carousel activeIndex={index} onSelect={handleCarousel} variant="dark" interval={null}>
        <Carousel.Item>
        <br/>
        <h2>{zone.zone_name}</h2>
        <br/>
        <Table bordered hover>
        <tbody>
            <tr>
                <td width = "40%"><h5>Zone Number</h5></td>
                <td>{zone.zone_num}&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr>
                <td width = "40%"><h5>Barangay</h5></td>
                <td>{zone.brgy}&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
                <td width = "40%"><h5>Total Households</h5></td>
                <td>{hhTotal}&nbsp;&nbsp;&nbsp;</td>
            </tr> 
             <tr>
                <td width = "40%"><h5>Total Residents</h5></td>
                <td>{population}&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
                <td width = "40%"><h5>Total Registered Voters</h5></td>
                <td>{voters}&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
                <td width = "40%"><h5>Number of Birth-registered Residents</h5></td>
                <td>{birth}&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
                <td width = "40%"><h5>OFW Residents</h5></td>
                <td>{ofw}&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
                <td width = "40%"><h5>Residents with disability (PWD)</h5></td>
                <td>{pwd}&nbsp;&nbsp;&nbsp;</td>
            </tr>
             <tr>
                <td width = "40%"><h5>Unregistered PWDs</h5></td>
                <td>{unregisteredPwd}&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr>
                <td width = "40%"><h5>Solo Parents</h5></td>
                <td>{soloParent}&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr>
                <td width = "40%"><h5>Number of Indigenous Peoples</h5></td>
                <td>{indigenous}&nbsp;&nbsp;&nbsp;</td>
            </tr>
        </tbody>    
        </Table>
        </Carousel.Item>
        <Carousel.Item>
             {loading ? 
                    (    <>
                        <h4>Personal Information - Per Purok
                        &nbsp;&nbsp;&nbsp;
                        <Spinner animation="border"/></h4>
                        </>
                    ):(
                       <h4 style={{display: 'flex'}}>Personal Information - Per Purok
                       &nbsp;&nbsp;&nbsp;<i className="bi bi-people-fill"></i></h4>
                    )}
                 <br/>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getReligionCount();
                                //console.log(religion)
                            }
                }}>
                    <Accordion.Header>Religious Affiliations</Accordion.Header>
                    <Accordion.Body><BarGraph data={religion}/></Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getSexCount();
                                //console.log(sex)
                            }
                        }}>
                    <Accordion.Header>Total Male and Female</Accordion.Header>
                    <Accordion.Body>
                    <PieGraph data={sex}/>
                    {/*{sex.map((doc, index) => (
                                    <ul key={index}>
                                    <li>{doc.count}</li>
                                    <li>{doc.attribute}</li>
                                    </ul>
                                ))}*/}
                    </Accordion.Body>
                </Accordion>
                {/*<h4>Total Male and Female</h4>*/}
                {/*<PieGraph data={sex}/>*/}
                {/*{personalInfo.map((doc, index) => (
                                    <ul key={index}>
                                    <li>{doc.first_name}</li>
                                    </ul>
                                ))}*/}
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getCivilStatusCount();
                                //console.log(civilStat)
                            }
                        }}>
                    <Accordion.Header>Resident's Civil Status</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={civilStat}/>
                    </Accordion.Body>
                </Accordion>
                 <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){   
                                getSchoolStatusCount();
                                // console.log(schoolStat)
                            }
                        }}>
                    <Accordion.Header>School Status</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={schoolStat}/>
                    </Accordion.Body>
                </Accordion>
                 <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getEducAtt();
                                //console.log(sex)
                            }
                        }}>
                    <Accordion.Header>Highest Educational Attainment</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={educAtt}/>
                    </Accordion.Body>
                </Accordion>
                 <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getOFWCountry();
                                //console.log(country);
                            }
                        }}>
                    <Accordion.Header>Countries OFW Residents are Located</Accordion.Header>
                    <Accordion.Body>
                        <PieGraph data={country}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getPwdType();
                                console.log(pwdType);
                            }
                        }}>
                    <Accordion.Header>PWD Types</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={pwdType}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getPwdIntense();
                                //console.log(sex)
                            }
                        }}>
                    <Accordion.Header>PWD Disabilities Intensity</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={pwdIntensity}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getDialectSpoken();
                                //console.log(sex)
                            }
                        }}>
                    <Accordion.Header>Major Dialects Spoken</Accordion.Header>
                    <Accordion.Body>
                           <PieGraph data={dialects}/>
                    </Accordion.Body>
                </Accordion>
        </Carousel.Item>
        </Carousel>
      );
    }

    const getHHTotal = async (zoneNum) => {

        try{

           //setLoading(hhTotal === 0);

            const snapshot = await ZoneDataService.getTotalHouseholds(zoneNum)
            //console.log('count: ', snapshot.data().count);
            setHHTotal(snapshot.data().count)

        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

    const getPopulationTotal = async (zoneNum) => {

         try{

            //setLoading(population === 0);

            const snapshot = await ZoneDataService.getTotalPopulation(zoneNum)
            setPopulation(snapshot.data().count)      

        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

    const getVoterTotal = async (zoneNum) => {

        try{
        
            //setLoading(voters === 0)

            const snapshot = await ZoneDataService.getTotalVoters(zoneNum)
            setVoters(snapshot.data().count)
            
        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

    const getBirthTotal = async (zoneNum) => {

        try{

            //setLoading(birth === 0)

            const snapshot = await ZoneDataService.getTotalBirthRegistered(zoneNum)
            setBirth(snapshot.data().count)
        
        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

    const getOfwTotal = async (zoneNum) => {

        try{
            
            //setLoading(ofw === 0) 

            const snapshot = await ZoneDataService.getTotalOfw(zoneNum)
            setOfw(snapshot.data().count)
            
        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

    const getPwdTotal = async (zoneNum) => {
        
        try{

            //setLoading(pwd === 0)
            
            const snapshot = await ZoneDataService.getTotalPwd(zoneNum)
            setPwd(snapshot.data().count)
        
        }catch (e){
            console.log(e)
        }finally{
            //setLoading(false)
        }
    }

     const getUnregisteredPwd = async (zoneNum) => {
        
        try{
            
            //setLoading(unregisteredPwd === 0)

            const snapshot = await ZoneDataService.getTotalUnregisteredPwd(zoneNum)
            setUnregisteredPwd(snapshot.data().count)
        }catch (e){
            console.log(e)
        }finally{
            //setLoading(false)
        }
    }

    const getSoloParentTotal = async (zoneNum) => {

        try{

            //setLoading(soloParent === 0)

            const snapshot = await ZoneDataService.getTotalSoloParent(zoneNum)
            setSoloParent(snapshot.data().count)
        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

    const getIndigenousTotal = async (zoneNum) => {

        try{

            //setLoading(indigenous === 0) 

            const snapshot = await ZoneDataService.getIndigenousTotal(zoneNum)
            setIndigenous(snapshot.data().count)
        }catch (e){
            console.log("Error.")
        }finally{
            //setLoading(false)
        }
    }

     const getReligionCount = () => {
          
        let christianity = [];
        let islam = [];
        let nonReligious = [];
        let others = [];

        try{
            setLoading(religion.length === 0)

            personalInfo.forEach(item => {const affiliation = item.religious_affiliation.split(" ")[0]; // extract the first word of the affiliation
        
                if (affiliation === "Christianity") {
                  christianity.push(item);
                } else if (affiliation === "Islam") {
                  islam.push(item);
                } else if (affiliation === "Non-religious") {
                  nonReligious.push(item);
                } else {
                  others.push(item);
                }
            });

          const religionCount = [
            {attribute: "Christianity", count: christianity.length },
            {attribute: "Islam", count: islam.length }, 
            {attribute: "Non-religious", count: nonReligious.length },
            {attribute: "Others", count: others.length }];
      
        setReligion(religionCount);
       
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    };

    const getSexCount = async () => {

        try{
          
            setLoading(sex.length === 0)

            const mSnapshot = await ZoneDataService.getTotalMale();
            const fSnapshot = await ZoneDataService.getTotalFemale();

            setSex(prev => [{attribute:"Male", count:mSnapshot.data().count}]);
            setSex(prev => [...prev , {attribute:"Female", count:fSnapshot.data().count}]);
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getCivilStatusCount = async () => {

        try{
            setLoading(civilStat.length === 0)

            const dataSet = await ZoneDataService.getCivilStatus();
            setCivilStat(dataSet);

        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getSchoolStatusCount = async () => {

        try{

            setLoading(schoolStat.length === 0)

            const dataSet = await ZoneDataService.getSchoolStatus();
            setSchoolStat(dataSet); 

        }catch (e){
            console.log(e);
        }finally{
            setLoading(false)
        }
    }

    const getEducAtt = async () => {

        try{

            setLoading(educAtt.length === 0)
        
            const dataSet = await ZoneDataService.getEducAttainment();
            setEducAtt(dataSet); 

        }catch (e){
            console.log(e);
        }finally{
            setLoading(false)
        }
    }

    const getOFWCountry = () => {

        try{

            setLoading(country.length === 0)
        
            const countryTypes = personalInfo.map(item => item.ofw_location)
                                  .filter((countryType, index, array) => array.indexOf(countryType) === index)
            const countryCount = countryTypes.map(countryType => ({attribute: countryType, 
                                  count: personalInfo.filter(item => item.ofw_location === countryType).length}))
                                  .filter(item => item.attribute !== "Not Applicable"); // Filter out "Not Applicable" attribute
            setCountry(countryCount);
        }catch (e){
            console.log(e);
        }finally{
            setLoading(false)
        }
    }

   const getPwdType = () => {
      let seeing = [];
      let hearing = [];
      let walking = [];
      let remembering = [];
      let communicating = [];

      try{

            setLoading(pwdType.length === 0)
            
            personalInfo.forEach(item => {
            const disabilities = item.pwd_type.replace(/"/g, "").replace(/^\[|\]$/g, "").split(",")
            //console.log(disabilities);

            disabilities.forEach(disability => {
                  if (disability.trim() === "Difficulty in Seeing") {
                    seeing.push(item);
                  } else if (disability.trim() === "Difficulty in Hearing") {
                    hearing.push(item);
                  } else if (disability.trim() === "Difficulty in Walking") {
                    walking.push(item);
                  } else if (disability.trim() === "Difficulty in Remembering and Concentrating") {
                    remembering.push(item);
                  } else if (disability.trim() === "Difficulty in Communicating") {
                    communicating.push(item);
                  }
                });
            });

              const pwdCount = [
                { attribute: "Difficulty in Seeing", count: seeing.length },
                { attribute: "Difficulty in Hearing", count: hearing.length },
                { attribute: "Difficulty in Walking", count: walking.length },
                { attribute: "Difficulty in Remembering & Concentrating", count: remembering.length },
                { attribute: "Difficulty in Communicating", count: communicating.length }
              ];

            setPwdType(pwdCount);
            
        }catch (e){
            console.log(e);
        }finally{
            setLoading(false)
        }
    };


    const getPwdIntense = async () => {

        try{

            setLoading(pwdIntensity.length === 0)

            const dataSet = await ZoneDataService.getPwdIntensity();
            setPwdIntensity(dataSet); 

        }catch (e){
            console.log(e);
        }finally{
            setLoading(false)
        }
    }

    const getDialectSpoken = async () => {

        try{
            
            setLoading(dialects.length === 0)
            
            const dataSet = await ZoneDataService.getDialects();
            setDialects(dataSet); 
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }

    }

     const getPersonalInfo = async (zoneNum) => {

        try {
            const data = await ZoneDataService.getPersonalInfo(zoneNum);

            setPersonalInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
        }catch (e){
            return console.log(e);
        }
    }

    //to display the data from database  
    useEffect(() => { checkUserBarangay(); }, []);


    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/>
          <nav>
            <Nav variant="pills" defaultActiveKey="/purok-profile" fill>
               <Nav.Item>
                    <Nav.Link href="/dashboard">Community Profile</Nav.Link>
                </Nav.Item>&nbsp;
                <Nav.Item>
                    <Nav.Link href="/purok-profile">Purok Profile</Nav.Link>
                </Nav.Item>&nbsp;
                <Nav.Item>
                    <Nav.Link href="/household-profile">Household Profile</Nav.Link>
                </Nav.Item>&nbsp;
                <Nav.Item>
                    <Nav.Link href="/resident-profile">Resident Profile</Nav.Link>
                </Nav.Item>&nbsp;
                <Nav.Item>
                    <Nav.Link href="/barangay-tab">Setup/Edit Barangay</Nav.Link>
                </Nav.Item>&nbsp;
                <Nav.Item>
                    <Nav.Link href="/report">Reports</Nav.Link>
                </Nav.Item>
            </Nav>
          
          </nav>
         {/* <aside>
            <Widgets/>
            <br/><br/>
          </aside>*/}
          <br/>
          <main>

            {isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <br/><br/><br/><br/><br/>
                    <Spinner animation="grow"/>
                      <br/>
                    <h2>Loading...</h2>
                  </div>
            ) : (<>
           
           {barangayExists ? (
                  <div>
                    <SearchBar placeholder="Enter zone name..." data={zoneList} onSelect={setSelectedZone} />
                    <br/>  
                    {selectedZone && <ZoneInfo zone={selectedZone}/>}
                  </div>
              ) : (
                  <div style={{justifyContent: 'center', textAlign: 'center'}}>

                <h1> Welcome!</h1><br/>
                <p>Currently, there are no existing data in your community database. Please proceed to the "Setup Barangay" tab to get started.</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                </div>
              )} 
            </>)}          
          </main>
        </div>
    );

}

export default PurokProfile