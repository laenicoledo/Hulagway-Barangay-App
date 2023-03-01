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

        const mSnapshot = await CommunityProfileDataService.getTotalMale()
        const fSnapshot = await CommunityProfileDataService.getTotalFemale()

        setSex(prev => [{attribute:"Male", count:mSnapshot.data().count}]);
        setSex(prev => [...prev , {attribute:"Female", count:fSnapshot.data().count}]);

        //filter and count the number of instance in field
        //const sexTypes = personalInfo.map(item => item.sex)
        //                         .filter((sexType, index, array) => array.indexOf(sexType) === index)
        //const sexCount = sexTypes.map(sexType => ({attribute: sexType, 
                               //count: personalInfo.filter(item => item.sex === sexType).length}))
        //setSex(sexCount)
        //console.log(sexTypes)
        //console.log(sex)
    }

    const getCivilStatusCount = async () => {

        const dataSet = await CommunityProfileDataService.getCivilStatus()
        setCivilStat(dataSet);
    }

    const getSchoolStatusCount = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getSchoolStatus()
            setSchoolStat(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getEducAtt = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getEducAttainment()
            setEducAtt(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getPwdIntense = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getPwdIntensity()
            setPwdIntensity(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getDialectSpoken = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getDialects()
            setDialects(dataSet); 

        }catch (e){
            console.log(e);
        }
    }

    const getIfWorking = async () => {

        try{
        
            const dataSet = await CommunityProfileDataService.getIsWorking()
            setIsWorking(dataSet); 

        }catch (e){
            console.log(e);
        }
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

    //to display the data from database  
    // useEffect(() => { 
    //      getPersonalInfo();
    // }, 
   //      []);

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
                <h4 style={{display: 'flex'}}> Barangay Resident's Information
                &nbsp;&nbsp;
                </h4>
                <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "40%"><h5>Total Households</h5></td>
                        <td>{hhTotal}&nbsp;&nbsp;&nbsp;
                        <Button className="btn-add" onClick={getHHTotal}>Fetch</Button>&nbsp;</td>
                      </tr>
                      <tr>
                        <td width = "40%"><h5>Total Population</h5></td>
                        <td>{population}&nbsp;&nbsp;&nbsp;
                        <Button className="btn-add" onClick={getPopulationTotal}>Fetch</Button>&nbsp;</td>
                      </tr>
                      <tr>
                        <td width = "40%"><h5>Number of Registered Voters</h5></td>
                        <td>{voters}&nbsp;&nbsp;&nbsp;<Button className="btn-add" onClick={getVoterTotal}>Fetch</Button>&nbsp;</td>
                      </tr>  
                      <tr>
                        <td width = "40%"> <h5>Number of Birth-registered Residents</h5></td>
                        <td>{birth}&nbsp;&nbsp;&nbsp;<Button className="btn-add" onClick={getBirthTotal}>Fetch</Button>&nbsp;</td>
                      </tr>
                       <tr>
                        <td width = "40%"> <h5>OFW Residents</h5></td>
                        <td>{ofw}&nbsp;&nbsp;&nbsp;<Button className="btn-add" onClick={getOfwTotal}>Fetch</Button>&nbsp;</td>
                      </tr> 
                      <tr>
                        <td width = "40%"> <h5>Residents with disability (PWD)</h5></td>
                        <td>{pwd}&nbsp;&nbsp;&nbsp;<Button className="btn-add" onClick={getPwdTotal}>Fetch</Button>&nbsp;</td>
                      </tr>
                      <tr>
                        <td width = "40%"> <h5>Unregistered PWDs</h5></td>
                        <td>{unregisteredPwd}&nbsp;&nbsp;&nbsp;<Button className="btn-add" onClick={getUnregisteredPwd}>Fetch</Button>&nbsp;</td>
                      </tr>
                      <tr>
                        <td width = "40%"> <h5>Solo Parents</h5></td>
                        <td>{soloParent}&nbsp;&nbsp;&nbsp;<Button className="btn-add" onClick={getSoloParentTotal}>Fetch</Button>&nbsp;</td>
                      </tr>      
                    </tbody>
                </Table>
            </Carousel.Item>
            <Carousel.Item>
                 <h4 style={{display: 'flex'}}>More Information Graphed</h4>
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
                                getCivilStatusCount()
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
                                getSchoolStatusCount()
                                console.log(schoolStat)
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
                                
                                getEducAtt()
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
                                getPwdIntense()
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
                                getDialectSpoken()
                                //console.log(sex)
                            }
                        }}>
                    <Accordion.Header>Major Dialects Spoken</Accordion.Header>
                    <Accordion.Body>
                         <BarGraph data={dialects}/>
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
            <Carousel.Item>
                <h4> Economic Profile </h4><br/>
                <Accordion flush 
                        onSelect={(e) => {
                            if (e !== null){ 
                                getIfWorking()
                            }
                        }}>
                    <Accordion.Header>Percentage of Working Class</Accordion.Header>
                    <Accordion.Body>
                         <PieGraph data={isWorking}/>
                    </Accordion.Body>
                </Accordion>
            </Carousel.Item>
            <Carousel.Item>
                <h4> Living Conditions </h4><br/>
                  <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "40%"><h5></h5></td>
                        <td>&nbsp;&nbsp;&nbsp;<Button className="btn-add">Fetch</Button>&nbsp;</td>
                      </tr>
                    </tbody>
                </Table>
            </Carousel.Item>
        </Carousel>
    );

}

export default CommunityProfile