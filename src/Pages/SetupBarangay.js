import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {regions, provinces, cities, barangays} from "select-philippines-address";
import BarangayDataService from "../Services/barangay-service.js";
import ZoneDataService from "../Services/zone-service.js";

function SetupBarangay() {

    //const [barangayList, setBarangayList] = useState([])

    //npm select phil address
    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    //STATE VARIABLES
    const [inputFields, setInputFields] = useState([{zone_num: '', zone_name: ''}])
    const [inputLivelihood, setInputLivelihood] = useState([{livelihoodId:'', livelihoodName: ''}])
    //const [inputDescription, setInputDescription] = useState({'':''})
    //general info
    const [enteredRegion, setSelectedRegion] = useState('')
    const [chosenLogo, setLogo] = useState('')
    const [enteredProvince, setSelectedProvince] = useState('')
    const [enteredClassification, setClassification] = useState('Rural')
    const [enteredCity, setSelectedCity] = useState('')
    const [enteredFoundingDate, setFoundingDate] = useState('')
    const [enteredBarangay, setSelectedBarangay] = useState('')
    const [enteredZipCode, setZipCode] = useState('')
    //for land area
    const [enteredLandArea, setLandArea] = useState({
      residential: '', commercial: '', industrial: '', agricultural: '', mineral:'', timberland:'', specialClasses:'', totalLand:''})
    //for characteristics switch option
    const [switchDesc, setSwitchDesc] = useState([{plains: false, upland: false, mountainous: false, coastal: false}])
    const [otherDesc, setOtherDesc] = useState([{others:''}]);
    //for barangays and it's boundaries
    const [enteredBoundaries, setBoundaries] = useState({east: '', north: '', west: '', south: ''})
    //for barangay council and personnel
    const [enteredCaptain, setEnteredCaptain] = useState([{name:[], maleTotal: '', femaleTotal: '', total:''}])
    const [enteredKagawad, setEnteredKagawad] = useState([{maleTotal: '', femaleTotal: '', total:''}])
    const [kagawadNames, setKagawadNames] = useState([{}])
    //for road network options
    const [switchRoad, setSwitchRoad] = useState(false);

    //use effect hook for barangay, region, city options
    useEffect(() => {
        handleRegionChange()
    }, [])

    //to handle data from add purok input field
    const handleFormChange = (index, event) => {
      let purokData = [...inputFields];
      purokData[index][event.target.name] = event.target.value;
      setInputFields(purokData);
    }

    //to handle data from add livelihood input field
    const handleLivelihoodChange = (index, event) => {
       let livelihoodData = [...inputLivelihood];
       livelihoodData[index][event.target.name] = event.target.value;
       setInputLivelihood(livelihoodData);
    }

    //to handle data from add more characteristic to barangay input field
      const handleDescChange = (index, event) => {
        let  newDescData= [...otherDesc];
        newDescData[index][event.target.name] = event.target.value;
        setOtherDesc(newDescData);
     }

    //to handle data from characteristics of barangay using switch 
    const handlePlainsChange = (event) => {
        const {name} = event.target;
        setSwitchDesc(prevState => ({...prevState, [name]: !switchDesc.plains}));
    }

    const handleUplandChange = (event) => {
        const {name} = event.target;
        setSwitchDesc(prevState => ({...prevState, [name]: !switchDesc.upland}));
    }

    const handleMountainousChange = (event) => {
        const {name} = event.target;
        setSwitchDesc(prevState => ({...prevState, [name]: !switchDesc.mountainous}));
    }

    const handleCoastalChange = (event) => {
        const {name} = event.target;
        setSwitchDesc(prevState => ({...prevState, [name]: !switchDesc.coastal}));
    }

    //to handle region input field
    const handleRegionChange = () => {regions().then(
      response => {setRegion(response);
    });}

    //to handle logo input
    const handleLogoChange = (event) => {setLogo(event.target.files[0])}

    //to handle province input
    const handleProvinceChange = (e) => {
        setSelectedRegion(e.target.selectedOptions[0].text);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    //to handle classification input
    const handleClassificationChange = (event) => {setClassification(event.target.value)}

     //to handle city/municipality input
     const handleCityChange = (e) => {
        setSelectedProvince(e.target.selectedOptions[0].text);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

     //to handle city/municipality input
    const handleDateChange = (event) => {setFoundingDate(event.target.value)}

    //to handle barangay name input
    const handleBarangayChange = (e) => {
        setSelectedCity(e.target.selectedOptions[0].text);
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const barangayChange = (e) => {
        setSelectedBarangay(e.target.selectedOptions[0].text);
    }

    //to handle zip code input
    const handleZipCodeChange = (event) => {setZipCode(event.target.value)}

    //to handle land area inputs
     const handleLandAreaChange = (event) => {
      const value = event.target.value;
      setLandArea({...enteredLandArea, [event.target.name]: value});
    }
    
    //to handle boundaries name input
    const handleBoundariesChange = (event) => {
      const value = event.target.value;
      setBoundaries({...enteredBoundaries, [event.target.name]: value});
    }

    //handle all barangay personnel inputs
    const handleCaptain = (event) => {
        const {name, value} = event.target
        setEnteredCaptain({...enteredCaptain, [name]: value})
    }

    const handleKagawad = (event) => {
        const {name, value} = event.target
        setEnteredKagawad({...enteredKagawad, [name]: value})
    }

    const handleKagawadNames = (index, event) => {
       let kagawadNameData = [...kagawadNames];
       kagawadNameData[index][event.target.name] = event.target.value;
       setKagawadNames(kagawadNameData);
    }

    //to handle road networks switch option
    const handleSwitchRoadChange = () => {
      setSwitchRoad(!switchRoad)
    }

    //for add field in purok button
    const addFields = () => {
        let newfield = { zone_num: '', zone_name: '' }
        setInputFields([...inputFields, newfield])
    }

    //for remove field button in purok
    const removeFields = (index) => {
        let purokData = [...inputFields];
        purokData.splice(index, 1)
        setInputFields(purokData)
    }

    //for add field in livelihood button
    const addFieldsLivelihood = () => {
        let newLivelihoodField = {livelihoodId:'', livelihoodName: ''}
        setInputLivelihood([...inputLivelihood, newLivelihoodField])
    }

    //for remove field button in livelihood
    const removeFieldsLivelihood = (index) => {
        let livelihoodData = [...inputLivelihood];
        livelihoodData.splice(index, 1)
        setInputLivelihood(livelihoodData)
    }

    //for add description/characteristic in barangay field
    const addFieldsDesc = () => {
        //setOtherDesc([...otherDesc, {others:'', }]) 
        let newDescField = {others:''}
        setOtherDesc([...otherDesc, newDescField])
    }

    //for remove a descripton/characteristic field
    const removeFieldsDesc= (index) => {
        let newDescData = [...otherDesc];
        newDescData.splice(index, 1)
        setOtherDesc(newDescData)
    }

    //add kagawad field
    const addFieldKagawad = () => {
        let newKagawadField = {}
        setKagawadNames([...kagawadNames, newKagawadField])
    }

    // const getBarangay = async () => {
    //     const data = await BarangayDataService.getBarangay();
    //     //console.log(data.docs);
    //      setBarangayList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //      console.log("found:"+data);
    // };

    //for form overall submit button
    const submitHandler = async (e) => {
        
        e.preventDefault();
        //getBarangay();
        
        const newBarangay = {enteredRegion, enteredProvince, enteredClassification, enteredCity, enteredFoundingDate, enteredBarangay, enteredZipCode};
        const newZone = inputFields

        try {
            await BarangayDataService.addBarangay(newBarangay);
            
            for (let i = 0; i < inputFields.length; i++) {
              await ZoneDataService.addZone(newZone[i],newBarangay)  
            } 
            console.log("success.")
            alert("Barangay has been set-up.")
            
        } catch (err) {
            console.log(err);
        }

        console.log(inputFields)
        console.log(enteredRegion)
        console.log(enteredProvince)
        console.log(enteredClassification)
        console.log(enteredCity)
        console.log(enteredFoundingDate)
        console.log(enteredBarangay)
        console.log(enteredZipCode)
        //console.log(inputLivelihood)
        //console.log(enteredBoundaries)
        //console.log(switchDesc)
        //console.log(otherDesc)
        //console.log(enteredLandArea)
        //console.log(enteredCaptain)
        //console.log(enteredKagawad)
        //console.log(kagawadNames)
        // console.log(chosenLogo)
        //console.log(switchRoad)
    }



    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>
          <nav>
            <Nav variant="pills" defaultActiveKey="/setup-barangay" fill>
                <Nav.Item>
                    <Nav.Link href="/dashboard">Community Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/purok-profile">Purok Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/household-profile">Household Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/resident-profile">Resident Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/setup-barangay">Setup Barangay</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/report">Reports</Nav.Link>
                </Nav.Item>
                </Nav>
          
          </nav>
          <aside>
            <Widgets/>
            <br/><br/>
          
          </aside>
          <br/>
          <main>
            <div className="setup-form">
                <h4>Welcome! Setup your barangay below. </h4><br/>
                <Form>
              {/*General Information*/}
                  {/*Region drop-down*/}
                  <Row className="mb-3">
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formRegion">
                      <Form.Label>Region</Form.Label>
                      <Form.Select onChange={handleProvinceChange} onSelect={handleRegionChange}>                         
                         {regionData && regionData.length > 0 && regionData.map((item) => 
                          <option key={item.region_code} value={item.region_code}>{item.region_name}</option>)}
                      </Form.Select>
                    </Form.Group>
                  {/*Choose Logo from file*/}
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formLogo">
                      <Form.Label>Upload Barangay Logo</Form.Label>
                      <Form.Control type="file" value={chosenLogo} onChange={handleLogoChange} size="sm"/>
                    </Form.Group>
                  </Row>  
                  {/*Province drop-down*/}
                  <Row className="mb-3">
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Select onChange={handleCityChange}>
                         {provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                            key={item.province_code} value={item.province_code}>{item.province_name}</option>)}
                      </Form.Select>
                    </Form.Group>
                  {/*Classification drop-down*/}
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formClassification">
                      <Form.Label>Classification</Form.Label>
                      <Form.Select onChange={handleClassificationChange}>
                        <option value="Rural">Rural</option>
                        <option value="Urban">Urban</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  {/*City drop-down*/}
                  <Row className="mb-3">
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formCity">
                      <Form.Label>City/Municipality</Form.Label>
                      <Form.Select onChange={handleBarangayChange}>
                        {cityData && cityData.length > 0 && cityData.map((item) => <option
                            key={item.city_code} value={item.city_code}>{item.city_name}</option>)}
                      </Form.Select>
                    </Form.Group>
                  {/*Founding Date Input*/}
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formFoundingDate">
                      <Form.Label>Founding Date</Form.Label>
                      <Form.Control type="date" value={enteredFoundingDate} onChange={handleDateChange} placeholder="Founding Date" />
                    </Form.Group>
                  </Row>
                  {/*Barangay drop-down*/}
                   <Row className="mb-3">
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formName">
                      <Form.Label>Name of Barangay</Form.Label>
                      <Form.Select onChange={barangayChange}>
                        <option disabled>Select Barangay</option>
                        {barangayData && barangayData.length > 0 && barangayData.map((item) => <option
                            key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</option>)}
                      </Form.Select>
                    </Form.Group>
                  {/*ZIP Code Input*/}
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formZipCode">
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control type="text" value={enteredZipCode} onChange={handleZipCodeChange} placeholder="" />
                    </Form.Group>
                  </Row>
                  {/*Dynamic Form for Adding Puroks*/}
                  <Row className="mb-3">

                    <Form.Group onSubmit={submitHandler} controlId="formAddPurok">
                      <Form.Label>Purok/Zones/Sitios</Form.Label>
                        {inputFields.map((input, index) => {
                          return (
                            <Row key={index}> 
                                <br/><br/>
                                <Col xl={2}>
                                    <Form.Control type="number" value={input.zone_num} onChange={event => handleFormChange(index, event)} name="zone_num" placeholder="No."/>
                                </Col>
                                <Col xl={8}>
                                    <Form.Control value={input.zone_name} onChange={event => handleFormChange(index, event)} name="zone_name" placeholder="Purok Name"/>
                                </Col>
                                <Col xl={1}>
                                    <Button className = "btn-add" onClick={addFields}> <i className="bi bi-plus"></i> </Button>
                                </Col>
                                <Col xl={1}>
                                    {(inputFields.length!==1)?<Button className = "btn-add" onClick={() => removeFields(index)}> 
                                    <i className="bi bi-dash"></i>
                                    </Button>:''}
                                </Col>
                            </Row>
                          )})
                      }
                    </Form.Group>
                  </Row>

                  {/*Table for land Profile*/}
                <Row className="mb-3">
                    <Form.Group onSubmit={submitHandler} controlId="formLandProfile">
                        <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th>Land Area</th>
                               <th>Area (in sq. km)</th>
                           </tr>
                        </thead>
                          <tbody>
                            <tr>
                              <td>Residential</td>
                              <td><Form.Control type="number" name="residential" value={enteredLandArea.residential} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                              <td>Commercial</td>
                              <td><Form.Control type="number" name="commercial" value={enteredLandArea.commercial} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                             <td>Industrial</td>
                             <td><Form.Control type="number" name="industrial" value={enteredLandArea.industrial} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                             <td>Agricultural</td>
                             <td><Form.Control type="number" name="agricultural" value={enteredLandArea.agricultural} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                             <td>Mineral</td>
                             <td><Form.Control type="number" name="mineral" value={enteredLandArea.mineral} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                             <td>Timberland</td>
                             <td><Form.Control type="number" name="timberland" value={enteredLandArea.timberland} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                             <td>Special Classes</td>
                             <td><Form.Control type="number" name="specialClasses" value={enteredLandArea.specialClasses} onChange={handleLandAreaChange}/></td>
                            </tr>
                            <tr>
                             <td style={{fontWeight: 'bold'}}>Total Land Area</td>
                             <td><Form.Control type="number" name="totalLand" value={enteredLandArea.totalLand} onChange={handleLandAreaChange}/></td>
                            </tr>
                          </tbody>
                        </Table>
                    </Form.Group>
                 </Row>

                 {/*Table for Adding General Charatcteristic of Barangay*/}
                 <Row className="mb-3">
                    <Form.Label style={{fontWeight: 'bold', display:'flex', justifyContent: 'center'}}> General Descriptions and Characteristics of the Barangay </Form.Label>
                    <Form.Group as={Col} onSubmit={submitHandler} controlId="formGeneralDesc">

                 <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th>Characteristics</th>
                               <th>No/Yes</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Plains</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label="" name="plains"
                                onChange={handlePlainsChange} checked={switchDesc.plains}/>
                              </td>
                            </tr>
                            <tr>
                              <td>Upland</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label="" name="upland"
                                onChange={handleUplandChange} checked={switchDesc.upland}/>
                              </td>
                            </tr>  
                            <tr>
                              <td>Mountainous</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label="" name="mountainous"
                                onChange={handleMountainousChange} checked={switchDesc.mountainous}/>
                              </td>
                            </tr>  
                            <tr>
                              <td>Coastal</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label="" name="coastal"
                                onChange={handleCoastalChange} checked={switchDesc.coastal}/>
                              </td>
                            </tr>       
                        </tbody>
                      </Table>

              </Form.Group>

               <Form.Group as={Col} onSubmit={submitHandler} controlId="formGeneralDesc">
                    <br/>
                    <Form.Label> Others, please specify below: </Form.Label>
                     {otherDesc.map((input, index) => {
                          return (
                            <Row key={index}> 
                                <br/><br/>
                                <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Form.Control type="text" value={input.others} onChange={event => handleDescChange(index, event)} name="others" placeholder="Add description"/>&nbsp;
                                    <Button className = "btn-add" onClick={addFieldsDesc}><i className="bi bi-plus"></i></Button>&nbsp;&nbsp;
                                    {(
                                        otherDesc.length!==1)?<Button className = "btn-add" onClick={() => removeFieldsDesc(index)}> 
                                        <i className="bi bi-dash"></i></Button>:''}
                                </Col>
                            </Row>
                        )})}
                      
              </Form.Group>
            </Row>

                <Row className="mb-3">
                {/*Input for the border barangays*/}
                  <Form.Group controlId="FormBoundaries">
                    <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th>Boundaries</th>
                               <th>Name of Barangay</th>
                           </tr>
                        </thead>
                          <tbody>
                            <tr>
                              <td>East</td>
                              <td><Form.Control type="text" name="east" value={enteredBoundaries.east} onChange={handleBoundariesChange}/></td>
                            </tr>
                            <tr>
                              <td>North</td>
                              <td><Form.Control type="text" name="north" value={enteredBoundaries.north} onChange={handleBoundariesChange}/></td>
                            </tr>
                            <tr>
                             <td>West</td>
                             <td><Form.Control type="text" name="west" value={enteredBoundaries.west} onChange={handleBoundariesChange}/></td>
                            </tr>
                            <tr>
                             <td>South</td>
                             <td><Form.Control type="text" name="south" value={enteredBoundaries.south} onChange={handleBoundariesChange}/></td>
                            </tr>
                          </tbody>
                        </Table>
                  </Form.Group>

                <Form.Group onSubmit={submitHandler} controlId="formLivelihood">
                    <Form.Label style={{fontWeight: 'bold', display:'flex', justifyContent: 'center'}}>Major Sources of Livelihood</Form.Label>
                      {inputLivelihood.map((input, index) => {
                        return (
                          <Row key={index}> 
                              <br/><br/>
                              <Col xl="10">
                                  <Form.Control value={input.livelihoodName} onChange={event => handleLivelihoodChange(index, event)} name="livelihoodName"/>
                              </Col>
                              <Col>
                                  <Button className = "btn-add" onClick={addFieldsLivelihood}> <i className="bi bi-plus"></i> </Button>&nbsp;&nbsp;
                                   {(inputLivelihood.length!==1)?<Button className = "btn-add" onClick={() => removeFieldsLivelihood(index)}> 
                                  <i className="bi bi-dash"></i>
                                  </Button>:''}
                              </Col>
                          </Row>
                        )})
                    }
                  </Form.Group>

              </Row>

              {/*For the Barangay Council Personnels*/}
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formCouncil">
                  <Form.Label style={{fontWeight: 'bold', display:'flex', justifyContent: 'center'}}> List of Barangay Council and Personnel </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="20%">Designation</th>
                               <th width="50%">Name(s)</th>
                               <th>Number of Male</th>
                               <th>Number of Female</th>
                               <th>Total</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Captain</td>
                              <td><Form.Control type="text" value={enteredCaptain.name} name="name" onChange={handleCaptain}/></td>
                              <td><Form.Control type="number" value={enteredCaptain.maleTotal} name="maleTotal" onChange={handleCaptain}/></td>
                              <td><Form.Control type="number" value={enteredCaptain.femaleTotal} name="femaleTotal" onChange={handleCaptain}/></td>
                              <td><Form.Control type="number" value={enteredCaptain.total} name="total" onChange={handleCaptain}/></td>
                            </tr>
                            <tr>
                              <td>Kagawad</td>
                             {kagawadNames.map((input, index) => {
                                return (
                                    <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} key={index}> 
                                     <Form.Control type="text" name="name" onChange={event => handleKagawadNames(index, event)}/>&nbsp;&nbsp;
                                     <Button className = "btn-add" onClick={addFieldKagawad}><i className="bi bi-plus"></i> </Button>
                                    </td>
                              )})}
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>SK Chair</td>
                              <td><Form.Control type="text"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Secretary</td>
                              <td><Form.Control type="text"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Treasurer</td>
                              <td><Form.Control type="text"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Tanod</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Health Workers</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Nutrition Scholar</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Purok Leaders</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Librarian</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Day Care Workers</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Utility Workers</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Midwife</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Admin Aide</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Clerk</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                             <td>Driver</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;
                                <Button className = "btn-add" /*{onClick={addFields}*/ variant = "add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

              {/*For Barangay Health Facilities*/}
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formHealthFacilties">
                  <Form.Label style={{fontWeight: 'bold', display:'flex', justifyContent: 'center'}}> List of Barangay Health Facilities </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="25%">Type</th>
                               <th width="45%">Name(s)</th>
                               <th>Distance From Barangay Hall (km)</th>
                               <th>Access to Drinking Water</th>
                               <th>Access to Toilet</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Health Center</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Hospital</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Maternity Clinic</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                             <td>Child Clinic</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                             <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                             <td>Maternity and Child Clinic</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Private Medical Clinic</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"/*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                             <td>Botika ng Barangay</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                             <td>Botika ng Bayan</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                             <td>Private Drugstores</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                             <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

              {/*For Educational Facility*/}
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formEducationalFacilties">
                  <Form.Label style={{fontWeight: 'bold'}}> List of Educational Facilities </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="25%">Type</th>
                               <th width="45%">Name(s)</th>
                               <th>Access to Drinking Water</th>
                               <th>Access to Toilet</th>
                               <th>Distance From Barangay Hall (km)</th>
                               <th>Total</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Daycare Centers</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Pre-Schools</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Elementary</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Junior High School</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Senior High School</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>SPED Schools/Centers</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>                            
                              <td></td>
                            </tr>
                            <tr>
                             <td>Technical/Vocational</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>College/Universities</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

              {/*For Service Facilities*/}
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formServiceFacilties">
                  <Form.Label style={{fontWeight: 'bold'}}> List of Service Facilities </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="25%">Type</th>
                               <th width="45%">Name(s)</th>
                               <th>Access to Drinking Water</th>
                               <th>Access to Toilet</th>
                               <th>Distance From Barangay Hall (km)</th>
                               <th>Total</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Multi-purpose Hall</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Police Station</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Women's Crisis Center</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Bank</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Post Office</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Market</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Go Negosyo Center</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

               {/*For Agricultural Facilities*/}
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formAgriculturalFacilties">
                  <Form.Label style={{fontWeight: 'bold'}}> List of  Agricultural Facilities </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="25%">Type</th>
                               <th width="45%">Name(s)</th>
                               <th>Access to Drinking Water</th>
                               <th>Access to Toilet</th>
                               <th>Distance From Barangay Hall (km)</th>
                               <th>Total</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Rice Mill</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Corn Mill</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Feed Mill</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Sugar Mill</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Produce Market</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Slaughter House</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" /*{onClick={addFields}*/> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

               {/*For Input Dealers*/}
               {/*
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formInputDealers">
                  <Form.Label style={{fontWeight: 'bold'}}> Input Dealer </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="20%">Types of Input</th>
                               <th width="40%">Name(s)</th>
                               <th>Access to Drinking Water</th>
                               <th>Access to Toilet</th>
                               <th>Distance From Barangay Hall (km)</th>
                               <th>Total</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Fertilizer Dealer</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td ><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Pesticide Dealer</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Seeds Dealer</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Feeds Dealer</td>
                             <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                            <tr>
                             <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

              {/*For Public Transport NOT FINISHED*
              <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formPublicTransport">
                  <Form.Label style={{fontWeight: 'bold'}}> Public Transport </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th>Types of Tranportation</th>
                               <th>No/Yes</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Bus</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Regular Taxi (Grab, Uber, Taxi)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Van/FX (UV Express)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Jeepney</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                           <tr>
                              <td>Tricycle</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Pedicab</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Boat</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Train</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Motorcycle (Habal-Habal)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>


            {/*For Road Networks Entry*/}
            <Row className="mb-3">
              <Form.Label style={{fontWeight: 'bold'}}> Road Networks </Form.Label>
              <Form.Group as={Col} onSubmit={submitHandler} controlId="formRoadNetworks">

                 <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th>Types of Road Network</th>
                               <th>Present in the Barangay? (No/Yes)</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Paved Concrete</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label="" 
                                onChange={handleSwitchRoadChange} checked={switchRoad}/>
                              </td>
                            </tr>
                            <tr>
                              <td>Paved Asphalt</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>  
                            <tr>
                              <td>Unpaved Gravel</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>  
                            <tr>
                              <td>Unpaved Earth</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>       
                        </tbody>
                      </Table>

              </Form.Group>

               <Form.Group as={Col} onSubmit={submitHandler} controlId="formRoadNetworksCondition">
                
              </Form.Group>

            </Row>

            {/* For Water Level System and Types of Water facility Entry*/}
            
            <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formWaterFacility">
                  <Form.Label style={{fontWeight: 'bold'}}> Water System </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="15%">Levels of Water System</th>
                               <th>Is the Barangay being served by a water station/company? (No/Yes)</th>
                               <th width="60%">Name of the Water Company</th>
                               <th>Is the source located in the barangay? (No/Yes)</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Level II Water System</td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                               <tr>
                              <td>Level III Water System</td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                        </tbody>
                      </Table>
                      <br/>
                      <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th>Types of Water Facilities</th>
                               <th width="10%">Present in the Barangay (No/Yes)</th>
                               <th width="10%">Total Number of Units/Stations Present</th>
                               <th width="50%">Name/Landmark</th>
                               <th width="10%">Functional (No/Yes)</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Deep Well</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Artesian Well</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Shallow Well</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                              <td>
                                <Form.Control type="number"/>
                              </td>
                                <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td>
                                <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                            </tr>
                            <tr>
                              <td>Commercial Water Refilling Stations</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Deep Well</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                            <tr>
                              <td>Other (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Check type="switch" id="custom-switch" label=""/>
                              </td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button>
                              </td>
                              <td><Form.Check type="switch" id="custom-switch" label=""/></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>
             
               {/* For Garbage Waste Disposal System*/}
               
            <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formWasteDisposal">
                  <Form.Label style={{fontWeight: 'bold'}}>  Garbage/Waste Disposal System </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="15%">Type of Disposal Facility</th>
                               <th>Are any of these present in the barangay? (No/Yes)</th>
                               <th>Total Number Present</th>
                               <th width="60%">Name/Landmark</th>
                               <th>Distance from the Barangay (in km/s)</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Open Dump Site</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Sanitary Landfill</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Compost Pits</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Material Recovery Facility (MRF)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add" > <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                            <tr>
                              <td>Others (Please specify)</td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Check type="switch" id="custom-switch" label=""/></td>
                              <td><Form.Control type="number"/></td>
                              <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Form.Control type="text"/>&nbsp;&nbsp;<Button className = "btn-add"> <i className="bi bi-plus"></i> </Button></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

                {/*For Electricity Services*/}
                {/*For Credit Institutions Entry*/}
                {/*For Registered Business Firms Entry*/}

                {/*Significant Events for the Barangay for the Past 3 Years*/}
                <Row className="mb-3">
              
               <Form.Group onSubmit={submitHandler} controlId="formEvents">
                  <Form.Label style={{fontWeight:'bold'}}>  Significant Events for the Barangay for the Past 3 Years </Form.Label>

                   <Table bordered hover as={Col}>
                        <thead>
                           <tr>
                               <th width="50%">Type of Significant Event</th>
                               <th>Number of occurrences in Year 1</th>
                               <th>Number of occurrences in Year 2</th>
                               <th>Number of occurrences in Year 3</th>
                           </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td>Typhoon</td>
                               <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>                        
                            </tr>
                            <tr>
                              <td>Flooding</td>
                                <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>                         
                            </tr>
                            <tr>
                              <td>Drought</td>
                                <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>                  
                            </tr>
                            <tr>
                              <td>Earthquake</td>
                                <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>                   
                            </tr>
                            <tr>
                              <td>Volcano Eruption</td>
                                <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>
                               <td><Form.Control type="number"/></td>                   
                            </tr>
                            <tr>
                              <td>Landslide</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                 
                            </tr>
                            <tr>
                              <td>Tsunami</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                 
                            </tr>
                            <tr>
                              <td>Forest Fire</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                     
                            </tr>
                            <tr>
                              <td>Fire</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                      
                            </tr>
                            <tr>
                              <td>Epidemic</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                     
                            </tr>
                            <tr>
                              <td>Pest Infestation</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                  
                            </tr>
                            <tr>
                              <td>Livestock/Poultry Diseases</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                      
                            </tr>
                            <tr>
                              <td>Armed Conflict</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                       
                            </tr>
                            <tr>
                              <td>Closure of Large Firm</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                       
                            </tr>
                            <tr>
                              <td>Closure of Many Small Firms</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                     
                            </tr>
                            <tr>
                              <td>Mass Lay-off</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                      
                            </tr>
                            <tr>
                              <td>Opening of Large Firms</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                     
                            </tr>
                             <tr>
                              <td>Opening of Many Small Firms </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                   
                            </tr>
                            <tr>
                              <td>Opening of Shopping Malls</td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>                      
                            </tr>
                            <tr>
                              <td>Opening of Large Fast-food Branch (Jolibee/McDo) </td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                              <td><Form.Control type="number"/></td>
                            </tr>
                        </tbody>
                      </Table>
               </Form.Group>
              </Row>

              {/*For Dissaster Risk Reduction and Preparedness Form*/}
              {/*For Peace and Order Form*/}


                {/*Programs, Projects and Activities Form*/}
                <Row className="mb-3">
                
                <Form.Label style={{fontWeight: 'bold'}}>  
                    Programs, Projects, and Activities (based on the barangay’s Annual Investment Program during the previous year)
                </Form.Label>
               <Form.Group onSubmit={submitHandler} controlId="formProgramsProjectsActivities">
                  <Form.Label>What Programs, Projects, and Activities (PPAs) were implemented in the barangay during the past year?</Form.Label>
                  <Form.Control as="textarea" rows={3}/>
                  <Form.Label>Provide a brief description of the Programs, Projects and Activities (PPA).</Form.Label>
                  <Form.Control as="textarea" rows={3}/>

                  <Form.Label>How much was allotted for the Programs, Projects, and Activities (PPA)?</Form.Label>
                  <Form.Control type="number"/>
                   <Form.Label>How many benefited from the PPA during the past year? (indicate unit)</Form.Label>
                  <Form.Control type="number"/>
              
              </Form.Group>
              </Row>

               {/*Budget, Revenue and Expenditure Form*/}
                <Row className="mb-3">
                
                <Form.Label style={{fontWeight: 'bold'}}>  
                    Budget, Revenue, and Expenditure 
                </Form.Label>
               <Form.Group onSubmit={submitHandler} controlId="formBudget">
                  <Form.Label>How much was the barangay’s budget, revenue and expenditure during the past 3 years?</Form.Label>

                  <Form.Label>  
                    Year
                  </Form.Label>
                  <Form.Control type="number"/>
              
              </Form.Group>
              </Row>

                  {/*  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="I've made sure all data is correct and valid." />
                  </Form.Group>*/}
                  <Button type="submit" onClick={submitHandler}> Submit </Button>

                </Form>
            </div>
          </main>
        </div>
    );

}

export default SetupBarangay