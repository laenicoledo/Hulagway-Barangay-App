import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import {regions, provinces, cities, barangays} from "select-philippines-address";
import BarangayDataService from "../Services/barangay-service.js";
import ZoneDataService from "../Services/zone-service.js";

function EditBarangay({barangay, zones}) {

    const [confirm, setConfirm] = useState(false);

    //STATE VARIABLES
    const [inputFields, setInputFields] = useState([{zone_num: '', zone_name: ''}])
    //const [inputLivelihood, setInputLivelihood] = useState([{livelihoodId:'', livelihoodName: ''}])
    //const [inputDescription, setInputDescription] = useState({'':''})
    //general info
    const [enteredRegion, setSelectedRegion] = useState('')
    const [chosenLogo, setLogo] = useState('')
    const [enteredProvince, setSelectedProvince] = useState('')
    const [enteredClassification, setClassification] = useState('')
    const [enteredCity, setSelectedCity] = useState('')
    const [enteredFoundingDate, setFoundingDate] = useState('')
    const [enteredBarangay, setSelectedBarangay] = useState('')
    const [enteredZipCode, setZipCode] = useState('')
    
    //use effect hook for barangay, region, city options
    useEffect(() => {
        setSelectedCity(localStorage.getItem("city"))
        setSelectedBarangay(localStorage.getItem("barangay"))
        setSelectedRegion(localStorage.getItem("region"))
        setSelectedProvince(localStorage.getItem("province"))

        setInputFields(zones)
        setClassification(barangay.classification)
        setFoundingDate(barangay.founding_date)
        setZipCode(barangay.zip_code)
        //console.log(barangay)
        //console.log(zones)
    }, [])

    //for confirmation
    const handleConfirm = () => {
        setConfirm(true);       
    }
  
    const handleCancel = () => {
        setConfirm(false);
    }

    //to handle data from add purok input field
   const handleFormChange = (index, event) => {
      let purokData = [...inputFields];
      purokData[index][event.target.name] = event.target.value;
      setInputFields(purokData);
    }

    //to handle logo input
    const handleLogoChange = (event) => {setLogo(event.target.files[0])}

    //to handle classification input
    const handleClassificationChange = (event) => {setClassification(event.target.value)}

    //to handle founding date input
    const handleDateChange = (event) => {
        setFoundingDate(event.target.value)
    }

    //to handle zip code input
    const handleZipCodeChange = (event) => {setZipCode(event.target.value)}

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

    //for form overall submit button
    const submitHandler = async (e) => {
        
        e.preventDefault();
        
        const newBarangay = {enteredRegion, enteredProvince, enteredClassification, enteredCity, enteredFoundingDate, enteredBarangay, enteredZipCode};
        const newZone = inputFields

        try {
            await BarangayDataService.addBarangay(newBarangay);
            
            for (let i = 0; i < inputFields.length; i++) {
              await ZoneDataService.addZone(newZone[i],newBarangay)  
            } 
            console.log("success.")
            await localStorage.setItem('brgy',`${enteredCity}-${enteredBarangay}`)
            await alert("Barangay data has been updated.")
            await window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    return(

         <div className="setup-form">
                <h4>Edit saved barangay data below.</h4><br/>
            
                <Form onSubmit={submitHandler}>
              {/*General Information*/}
                  {/*Region drop-down*/}
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formRegion">
                      <Form.Label>Region</Form.Label>
                    <Form.Control type="text" defaultValue={enteredRegion} readOnly />
                     {/* <Form.Select onChange={handleProvinceChange} onSelect={handleRegionChange} value={enteredRegion} disabled>                         
                         {regionData && regionData.length > 0 && regionData.map((item) => 
                          <option key={item.region_code} value={item.region_code}>{item.region_name}</option>)}
                      </Form.Select>*/}
                    </Form.Group>
                  {/*Choose Logo from file*/}
                    <Form.Group as={Col} controlId="formLogo">
                      <Form.Label>Upload Barangay Logo</Form.Label>
                      <Form.Control type="file" value={chosenLogo} onChange={handleLogoChange} size="sm"/>
                    </Form.Group>
                  </Row>  
                  {/*Province drop-down*/}
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Control type="text" defaultValue={enteredProvince} readOnly />
                      {/*<Form.Select value={enteredProvince} onChange={handleCityChange} disabled>
                         {provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                            key={item.province_code} value={item.province_code}>{item.province_name}</option>)}
                      </Form.Select>*/}
                    </Form.Group>
                  {/*Classification drop-down*/}
                    <Form.Group as={Col} controlId="formClassification">
                      <Form.Label>Classification</Form.Label>
                      <Form.Select value={enteredClassification} onChange={handleClassificationChange} required>
                        <option value="Rural">Rural</option>
                        <option value="Urban">Urban</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  {/*City drop-down*/}
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCity">
                      <Form.Label>City/Municipality</Form.Label>
                      <Form.Control type="text" defaultValue={enteredCity} readOnly />
                      {/*<Form.Select value= {enteredCity} onChange={handleBarangayChange} disabled>
                        {cityData && cityData.length > 0 && cityData.map((item) => <option
                            key={item.city_code} value={item.city_code}>{item.city_name}</option>)}
                      </Form.Select>*/}
                    </Form.Group>
                  {/*Founding Date Input*/}
                    <Form.Group as={Col} controlId="formFoundingDate">
                      <Form.Label>Founding Date</Form.Label>
                      <Form.Control type="date" value={enteredFoundingDate} onChange={handleDateChange} placeholder="Founding Date" required/>
                    </Form.Group>
                  </Row>
                  {/*Barangay drop-down*/}
                   <Row className="mb-3">
                    <Form.Group as={Col} controlId="formName">
                      <Form.Label>Name of Barangay</Form.Label>
                      <Form.Control type="text" defaultValue={enteredBarangay} readOnly />
                      {/*<Form.Select value={enteredBarangay} onChange={barangayChange} disabled>
                        <option disabled>Select Barangay</option>
                        {barangayData && barangayData.length > 0 && barangayData.map((item) => <option
                            key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</option>)}
                      </Form.Select>*/}
                    </Form.Group>
                  {/*ZIP Code Input*/}
                    <Form.Group as={Col} controlId="formZipCode">
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control type="text" value={enteredZipCode||''} onChange={handleZipCodeChange} placeholder="" required/>
                    </Form.Group>
                  </Row>
                  {/*Dynamic Form for Adding Puroks*/}
                  <Row className="mb-3">

                    <Form.Group controlId="formAddPurok">
                      <Form.Label>Purok/Zones/Sitios</Form.Label>
                        {/*{zones.map((input, index) => {
                            return (
                               <Row key={index}>
                               <br/><br/>
                                <Col xl={2}>
                                    <Form.Control type="number" value={zone.zone_num} onChange={event => handleFormChange(index, event)} name="zone_num" placeholder="No."/>
                                </Col>
                                <Col xl={8}>
                                    <Form.Control value={zone.zone_name} onChange={event => handleFormChange(index, event)} name="zone_name" placeholder="Purok Name" required/>
                                </Col>
        
                                <Col xl={1}>
                                    {(inputFields.length!==1)?<Button className = "btn-add" onClick={() => removeFields(index)}> 
                                    <i className="bi bi-dash"></i>
                                    </Button>:''}
                                </Col>
                                </Row> 
                            )
                        })}*/}
                        {inputFields.map((input, index) => {
                          return (
                            <Row key={index}> 
                                <br/><br/>
                                <Col xl={2}>
                                    <Form.Control type="number" value={input.zone_num||""} onChange={event => handleFormChange(index, event)} name="zone_num" placeholder="No."/>
                                </Col>
                                <Col xl={8}>
                                    <Form.Control value={input.zone_name||""} onChange={event => handleFormChange(index, event)} name="zone_name" placeholder="Purok Name" required/>
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
                  <p>Please make sure all data is correct. After pressing submit all data is final.</p>
                  <p>Additional fields still in development.</p>
                  <Form.Group className="mb-3" id="formCheckbox">
                    <Form.Check type="checkbox" label="I've made sure all data is correct and valid." />

                  </Form.Group>
                  <Button type="button" variant="custom" onClick={handleConfirm}> Submit </Button>

            </Form>

            <Modal show={confirm} onHide={handleCancel}  backdrop="static" centered>
                <Modal.Body>
                  Are you sure you want to submit data?
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="custom" onClick={handleCancel}>
                          Cancel
                      </Button>
                      <Button type="submit" variant="custom" onClick={submitHandler}>
                        Submit
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>

        // <div style={{display:'flex', justifyContent: 'center', textAlign: 'center'}}>

        //     <h4> Barangay is currently unavailable for edit. Please standby for future updates. </h4>
        //     <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        // </div>

    )

}

export default EditBarangay