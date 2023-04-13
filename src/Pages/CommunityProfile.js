import {React, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import BarGraph from '../BarGraph.js'
import PieGraph from '../PieGraph.js'
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import CommunityProfileDataService from "../Services/community-service.js";

function CommunityProfile({barangay}) {

    //carousel
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    //const [show, setShow] = useState(false)
  
    const handleCarousel = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [selected, setSelected] = useState(1)

    const [population, setPopulation] = useState(0)
    const [hhTotal, setHHTotal] = useState(0)
    const [voters, setVoters] = useState(0)
    const [birth, setBirth] = useState(0)
    const [ofw, setOfw] = useState(0)
    const [pwd, setPwd] = useState(0)
    const [unregisteredPwd, setUnregisteredPwd] = useState(0)
    const [soloParent, setSoloParent] = useState(0)
    const [personalInfo, setPersonalInfo] = useState([{}])
    const [religion, setReligion] = useState([{}])
    const [sex, setSex] = useState([])
    const [civilStat, setCivilStat] = useState([])
    const [schoolStat, setSchoolStat] = useState([])
    const [educAtt, setEducAtt] = useState([])
    const [pwdIntensity, setPwdIntensity] = useState([])
    const [dialects, setDialects] = useState([])
    const [isWorking, setIsWorking] = useState([])
    const [workingClass, setWorkingClass] = useState([])
    const [industry, setIndustry] = useState([])
    const [employmentLoc, setEmploymentLoc] = useState([])
    const [businessPermit, setBusinessPermit] = useState([])
    const [dwellingType, setDwellingType] = useState([])
    const [roofingType, setRoofingType] = useState([])
    const [wallingType, setWallingType] = useState([])
    const [houseOccupancy, setHouseOccupancy] = useState([])
    const [lotOccupancy, setLotOccupancy] = useState([])
    const [fuelCooking, setFuelCooking] = useState([])
    const [toiletType, setToiletType] = useState([])
    const [drinkingSource, setDrinkingSource] = useState([])
    const [electricityAccess, setElectrictyAccess] = useState([])
    const [electricitySource, setElectrictySource] = useState([])
    const [waterTransport, setWaterTransport] = useState([])
    const [crimeNumer, setCrimeNumber] = useState(0)
    const [communityParticipants, setCommunityParticipants] = useState(0)
    const [crimeTitles, setCrimeTitles] = useState([])
    const [crimeAge, setCrimeAge] = useState([])
    const [crimeLoc, setCrimeLoc] = useState([])
    const [crimeGender, setCrimeGender] = useState([])

    const getHHTotal = async () => {
        
        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getTotalHouseholds()
            console.log('count: ', snapshot.data().count);
            setHHTotal(snapshot.data().count)

        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getPopulationTotal = async () => {

        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getTotalPopulation()
            setPopulation(snapshot.data().count)      

        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
        
        // const snapshot = await CommunityProfileDataService.getTotalPopulation()
        // let total = 0;
        // snapshot.forEach((doc) => {
        //     //console.log(doc.id, " => ", doc.data());
        //     total = total + doc.data().total_household_members;
        //     //setPopulation(population + doc.data().total_household_members)
        // });

        // setPopulation(total)
    }

    const getVoterTotal = async () => {

        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getTotalVoters()
            setVoters(snapshot.data().count)
            //console.log('voters: ', snapshot.data().count);
            
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getBirthTotal = async () => {

        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getTotalBirthRegistered()
            //console.log('birth: ', snapshot.data().count);
            setBirth(snapshot.data().count)
        
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getOfwTotal = async () => {

        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getTotalOfw()
            setOfw(snapshot.data().count)
            
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getPwdTotal = async () => {

        setLoading(true)
        
        try{

            const snapshot = await CommunityProfileDataService.getTotalPwd()
            setPwd(snapshot.data().count)
        
        }catch (e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

     const getUnregisteredPwd = async () => {

        setLoading(true)
        
        try{
            const snapshot = await CommunityProfileDataService.getTotalUnregisteredPwd()
            setUnregisteredPwd(snapshot.data().count)
        }catch (e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    const getSoloParentTotal = async () => {

        setLoading(true)

        try{
            const snapshot = await CommunityProfileDataService.getTotalSoloParent()
            setSoloParent(snapshot.data().count)
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }    

    // const getReligionCount = () => {
        
    //     const religionTypes = personalInfo.map(item => item.religious_affiliation)
    //                             .filter((religionType, index, array) => array.indexOf(religionType) === index)
    //     const religionCount = religionTypes.map(religionType => ({attribute: religionType, 
    //                             count: personalInfo.filter(item => item.religious_affiliation === religionType).length}))
    //     setReligion(religionCount)
    // }

    const getSexCount = async () => {

        try{
            //console.log(sex);
            if(sex == ""){
                setLoading(true)
            }else{
                setLoading(false)
            } 

            const mSnapshot = await CommunityProfileDataService.getTotalMale();
            const fSnapshot = await CommunityProfileDataService.getTotalFemale();

            setSex(prev => [{attribute:"Male", count:mSnapshot.data().count}]);
            setSex(prev => [...prev , {attribute:"Female", count:fSnapshot.data().count}]);
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

    const getCivilStatusCount = async () => {

        const dataSet = await CommunityProfileDataService.getCivilStatus();
        setCivilStat(dataSet);
    }

    const getSchoolStatusCount = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getSchoolStatus();
            setSchoolStat(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getEducAtt = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getEducAttainment();
            setEducAtt(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getPwdIntense = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getPwdIntensity();
            setPwdIntensity(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getDialectSpoken = async () => {

        try{
            
            if(dialects==""){
                setLoading(true)
            }else{
                setLoading(false)
            } 
            
            const dataSet = await CommunityProfileDataService.getDialects();
            setDialects(dataSet); 
        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }

    }

    const getIfWorking = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getIsWorking();
            setIsWorking(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getWorkerClass = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getClassOfWorker();
            setWorkingClass(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getIndustry = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getIndustry();
            setIndustry(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getEmploymentLoc = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getEmploymentLoc();
            setEmploymentLoc(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getBusinessPermit = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getBusinessPermit();
            setBusinessPermit(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getDwellingType = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getDwellingType();
            setDwellingType(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getRoofingType = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getRoofingType();
            setRoofingType(dataSet); 

        }catch (e){
            console.log(e);
        }

    }

    const getWallingType = async () => {

         try{
        
            const dataSet = await CommunityProfileDataService.getWallingType();
            setWallingType(dataSet); 

        }catch (e){
            console.log(e);
        }

    }

    const getHouseOccupancy = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getHouseOccupancy();
            setHouseOccupancy(dataSet); 

        }catch (e){
            console.log(e);
        }

    }

    const getLotOccupancy = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getLotOccupancy();
            setLotOccupancy(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

     const getFuelForCooking = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getFuelForCooking();
            setFuelCooking(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getToiletType = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getToiletType();
            setToiletType(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getDrinkingSource = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getDrinkingSource();
            setDrinkingSource(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getElectricityAccess = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getElectricityAccess();
            setElectrictyAccess(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getElectricitySource = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getElectricitySource();
            setElectrictySource(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getNumberOfCrimes = async () => {

        
        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getNumberOfCrimes()
            setCrimeNumber(snapshot.data().count)      

        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

     const getCBOMembers = async () => {

        
        setLoading(true)

        try{

            const snapshot = await CommunityProfileDataService.getCBOMembers()
            setCommunityParticipants(snapshot.data().count)      

        }catch (e){
            console.log("Error.")
        }finally{
            setLoading(false)
        }
    }

     const getCrimeTitles = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getCrimeTitles();
            setCrimeTitles(dataSet); 

        }catch (e){
            console.log(e);
        }
    }


     const getCrimeAge = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getCrimeAge();
            setCrimeAge(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getCrimeLoc = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getCrimeLoc();
            setCrimeLoc(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getCrimeGender = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getCrimeGender();
            setCrimeGender(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getWaterTransport = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getWaterTransport();
            setWaterTransport(dataSet); 

        }catch (e){
            console.log(e);
        }
    }



    const getMonthlyExpenditures = () => {
        
        // const religionTypes = personalInfo.map(item => item.religious_affiliation)
        //                      .filter((religionType, index, array) => array.indexOf(religionType) === index)
        // const religionCount = religionTypes.map(religionType => ({attribute: religionType, 
        //                      count: personalInfo.filter(item => item.religious_affiliation === religionType).length}))
        // setReligion(religionCount)
    }
    const getPersonalInfo = async () => {

        try {
            const data = await CommunityProfileDataService.getPersonalInfo();

            setPersonalInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            //console.log(personalInfo)
            //console.log(personalInfo)
                       //snapshot.forEach((doc) => {
            //    setPersonalInfo(prevState => ({...prevState, [doc.id]: doc.data()}))
            //});
            //await setPersonalInfo(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }catch (e){
            return console.log(e);
        }

        //snapshot.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data());
            //total = total + doc.data().total_household_members;
            //setPopulation(population + doc.data().total_household_members)
            //setReligion(prevState => ({...prevState, [name]: doc.data().religious_affiliation, [count]: }))
        //    setPersonalInfo()
        //});
    }

    const fetchAllHHInfo = async () => {
        
        await getHHTotal();
        await getPopulationTotal();
        await getVoterTotal();
        await getBirthTotal();
        await getOfwTotal();
        await getPwdTotal();
        await getUnregisteredPwd();
        await getSoloParentTotal();
    }

    const fetchCommunityInfo = async () => {
        
        await getNumberOfCrimes();
        await getCBOMembers();
    }

    //to display the data from database  
    useEffect(() => { 
        //getPersonalInfo();
    }, 
      []);

    return(

        <Carousel activeIndex={index} onSelect={handleCarousel} variant="dark" interval={null}>
            <Carousel.Item>
                <h4> Barangay Basic Information&nbsp;&nbsp;&nbsp;<i className="bi bi-people-fill"></i></h4><br/>
                  <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "25%"><h5>Region </h5></td>
                            <td><h5>{barangay.region}</h5></td>
                          </tr> 
                          <tr>
                            <td width = "25%"><h5>Province </h5></td>
                            <td><h5>{barangay.province}</h5></td>
                          </tr>
                          <tr>
                            <td width = "25%"><h5>City </h5></td>
                            <td><h5>{barangay.city}</h5></td>
                          </tr>
                          <tr>
                            <td width = "25%"><h5>Barangay Name </h5></td>
                            <td><h5>{barangay.barangay_name}</h5></td>
                          </tr>
                          <tr>
                            <td width = "25%"><h5>Postal Code </h5></td>
                            <td><h5>{barangay.zip_code}</h5></td>
                          </tr>                      
                          <tr>
                            <td width = "25%"><h5>Classification </h5></td>
                            <td><h5>{barangay.classification}</h5></td>
                          </tr>
                          <tr>
                            <td width = "25%"><h5>Founding Date </h5></td>
                            <td><h5>{barangay.founding_date}</h5></td>
                          </tr>   
                        </tbody>
                      </Table>
            </Carousel.Item>
            <Carousel.Item>
                <h4 style={{display: 'flex'}}> Household Member's Personal Information
                &nbsp;&nbsp;
                </h4>
                <br/>
                <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "40%"><h5>Total Households</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{hhTotal}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getHHTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr>
                      <tr>
                        <td width = "40%"><h5>Total Population</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{population}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getPopulationTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr>
                      <tr>
                        <td width = "40%"><h5>Number of Registered Voters</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{voters}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getVoterTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr>  
                      <tr>
                        <td width = "40%"> <h5>Number of Birth-registered Residents</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{birth}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getBirthTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr>
                       <tr>
                        <td width = "40%"> <h5>OFW Residents</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{ofw}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getOfwTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr> 
                      <tr>
                        <td width = "40%"> <h5>Residents with disability (PWD)</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{pwd}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getPwdTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr>
                      <tr>
                        <td width = "40%"> <h5>Unregistered PWDs</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{unregisteredPwd}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getUnregisteredPwd}>Fetch</Button>&nbsp;</td>*/}
                      </tr>
                      <tr>
                        <td width = "40%"> <h5>Solo Parents</h5></td>
                        {loading ? (<td>&nbsp;<Spinner animation="border"/></td>):(<td>{soloParent}&nbsp;&nbsp;&nbsp;</td>)}
                        {/*<Button className="btn-add" onClick={getSoloParentTotal}>Fetch</Button>&nbsp;</td>*/}
                      </tr>      
                    </tbody>
                </Table>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="btn-add" onClick={fetchAllHHInfo}>Fetch Data</Button>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                 <h4 style={{display: 'flex'}}>Household Member's Personal Information Graphed</h4>
                 <br/>
                {/*<Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                //getReligionCount()
                                // console.log(religion)
                            }
                        }}>
                    <Accordion.Header>Religious Affiliations</Accordion.Header>
                    <Accordion.Body><BarGraph data={religion}/></Accordion.Body>
                </Accordion>*/}
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getSexCount()
                                //console.log(sex)
                            }
                        }}>
                    <Accordion.Header>Total Male and Female</Accordion.Header>
                    <Accordion.Body>
                        {loading ? (<Spinner animation="border"/>):(<PieGraph data={sex}/>)}
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
                           {loading ? (<Spinner animation="border"/>):(<PieGraph data={dialects}/>)}
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
            <Carousel.Item>
                <h4> Economic Profile </h4><br/>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getIfWorking();
                            }
                        }}>
                    <Accordion.Header>Percentage of Working Class</Accordion.Header>
                    <Accordion.Body>
                          {loading ? (<Spinner animation="border"/>):(<PieGraph data={isWorking}/>)}
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getWorkerClass();
                            }
                        }}>
                    <Accordion.Header>Class of Workers In Each Sector</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={workingClass}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getIndustry();
                            }
                        }}>
                    <Accordion.Header>Type of Industry</Accordion.Header>
                    <Accordion.Body>
                        <PieGraph data={industry}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getEmploymentLoc();
                            }
                        }}>
                    <Accordion.Header>Location of Employment</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={employmentLoc}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getBusinessPermit();
                            }
                        }}>
                    <Accordion.Header>Self-Employed Registration Status</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={businessPermit}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                
                            }
                        }}>
                    <Accordion.Header>Household Monthly Expenditures (not working yet)</Accordion.Header>
                    <Accordion.Body>
                        {/*<BarGraph data={workingClass}/>*/}
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
            <Carousel.Item>
                <h4> Living Conditions </h4><br/>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getDwellingType();
                            }
                        }}>
                    <Accordion.Header>Type of Dwelling</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={dwellingType}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getRoofingType();
                            }
                        }}>
                    <Accordion.Header>Types of Roofing Materials</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={roofingType}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getWallingType();
                            }
                        }}>
                    <Accordion.Header>Types of Walling Materials</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={wallingType}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getHouseOccupancy();
                            }
                        }}>
                    <Accordion.Header>Status of House Occupancy</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={houseOccupancy}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getLotOccupancy();
                            }
                        }}>
                    <Accordion.Header>Status of Lot Occupancy</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={lotOccupancy}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getFuelForCooking();
                            }
                        }}>
                    <Accordion.Header>Type of Fuel Used for Cooking</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={fuelCooking}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getToiletType();
                            }
                        }}>
                    <Accordion.Header>Type of Toilet</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={toiletType}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getDrinkingSource();
                            }
                        }}>
                    <Accordion.Header>Primary Source of Drinking Water</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={drinkingSource}/>
                    </Accordion.Body>
                </Accordion><Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getElectricityAccess();
                            }
                        }}>
                    <Accordion.Header>Access to Electricity</Accordion.Header>
                    <Accordion.Body>
                        <PieGraph data={electricityAccess}/>
                    </Accordion.Body>
                </Accordion><Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getElectricitySource();
                            }
                        }}>
                    <Accordion.Header>Source of Electricity</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={electricitySource}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                
                            }
                        }}>
                    <Accordion.Header>Liquid Waste Destination (not working yet)</Accordion.Header>
                    <Accordion.Body>
                        {/*<BarGraph data={workingClass}/>*/}
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                
                            }
                        }}>
                    <Accordion.Header>Type of functional Land Transport Vehicles Owned & number of units (not working yet)</Accordion.Header>
                    <Accordion.Body>
                        {/*<BarGraph data={workingClass}/>*/}
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getWaterTransport();
                            }
                        }}>
                    <Accordion.Header>Type of Water Transport Vehicles Owned (not working yet)</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={waterTransport}/>
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
            <Carousel.Item>
                <h4> Agriculture and Fisheries Data </h4><br/>
                  <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "60%"><h5>Number of Households involved in Farming</h5></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td width = "60%"><h5>Total Population involved in Farming</h5></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                      </tr>
                    </tbody>
                </Table>
                <Button className="btn-add">Fetch</Button><br/><br/>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                
                            }
                        }}>
                    <Accordion.Header></Accordion.Header>
                    <Accordion.Body>
                        {/*<BarGraph data={waterTransport}/>*/}
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
            <Carousel.Item>
                <h4> Community Participation </h4><br/>
                  <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "50%"><h5>Population involved in Community-Based Organization</h5></td>
                        <td>{communityParticipants}&nbsp;&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td width = "50%"><h5>Households with member that have become Victims of Crime</h5></td>
                        <td>{crimeNumer}&nbsp;&nbsp;&nbsp;</td>
                      </tr>
                    </tbody>
                </Table>
               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="btn-add" onClick={fetchCommunityInfo}>Fetch Data</Button>
                </div>
                <br/>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getCrimeTitles();
                            }
                        }}>
                    <Accordion.Header>Crime Titles</Accordion.Header>
                    <Accordion.Body>
                        <PieGraph data={crimeTitles}/>
                    </Accordion.Body>
                </Accordion>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getCrimeAge();
                            }
                        }}>
                    <Accordion.Header>Crimes - Age Bracket</Accordion.Header>
                    <Accordion.Body>
                        <PieGraph data={crimeAge}/>
                    </Accordion.Body>
                </Accordion>
                 <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getCrimeLoc();
                            }
                        }}>
                    <Accordion.Header>Crimes - Location</Accordion.Header>
                    <Accordion.Body>
                        <BarGraph data={crimeLoc}/>
                    </Accordion.Body>
                </Accordion>
                 <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getCrimeGender();
                            }
                        }}>
                    <Accordion.Header>Crimes - Gender</Accordion.Header>
                    <Accordion.Body>
                        <PieGraph data={crimeGender}/>
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
        </Carousel>
    );

}

export default CommunityProfile