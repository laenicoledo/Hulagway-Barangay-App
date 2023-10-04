import React, { useState, useEffect } from 'react';
import { UserAuth } from '../AuthContext.js';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {regions, provinces, cities, barangays} from "select-philippines-address";

function SignUp() {

    //use state variables
    const [enteredFname, setFname] = useState('');
    const [enteredLname, setLname] = useState('');
    const [enteredEmail, setEmail] = useState('');  
    const [enteredPassword, setPassword] = useState('');
    const {createUser} = UserAuth();

    //npm select phil address
    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [enteredRegion, setSelectedRegion] = useState('')
    const [enteredProvince, setSelectedProvince] = useState('')
    const [enteredCity, setSelectedCity] = useState('')
    const [enteredBarangay, setSelectedBarangay] = useState('')

    //confirm message
    const [confirm, setConfirm] = useState(false);
    const [validated, setValidated] = useState(false);

    //use effect hook for barangay, region, city options
    useEffect(() => {
        handleRegionChange()
    }, [])

    //to handle region input field
    const handleRegionChange = () => {regions().then(
      response => {setRegion(response);
    });}

    //to handle province input
    const handleProvinceChange = (e) => {
        setSelectedRegion(e.target.selectedOptions[0].text);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    //to handle city/municipality input
     const handleCityChange = (e) => {
        setSelectedProvince(e.target.selectedOptions[0].text);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

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

    //routing
    let navigate = useNavigate();

    //change handlers
    const fnameChangeHandler = (event) => {setFname(event.target.value);};
    const lnameChangeHandler = (event) => {setLname(event.target.value);};
    const emailChangeHandler = (event) => {setEmail(event.target.value);};
    const passwordChangeHandler = (event) => {setPassword(event.target.value);};

    //for confirmation
    const handleConfirm = (e) => {
      checkIfValid(e);
      if (validated === true){
        setConfirm(true);   
      }
    }
    
    const handleCancel = () => {
      setConfirm(false);
    }

    const checkIfValid = (event) => {
      
      const form = event.currentTarget;
      
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        setValidated(true);
      }
    }
      
    //submit
    const submitHandler = async (e) => {
      e.preventDefault();

        try {
          await createUser(enteredEmail, enteredPassword, enteredFname, enteredLname, enteredRegion, enteredProvince, enteredCity, enteredBarangay)
          await localStorage.setItem('barangay', enteredBarangay)
          await localStorage.setItem('city', enteredCity)
          await localStorage.setItem('region', enteredRegion)
          await localStorage.setItem('province', enteredProvince)
           await localStorage.setItem('year', new Date().getFullYear().toString())
          await alert('Admin account created.')
          await navigate('/barangay-tab')
        } catch (e) {
          console.log(e);
        }

      setFname("");
      setLname("");
      setCity("");
      setBarangay("")
      setEmail("")
      setPassword("")  
    };
  
    return (
    
    <div className="body">
      
      <div className="logo">
        <Navbar className="header-span">
          <Container>
              <Col>
                <Navbar.Brand>
                <ul className="header-title"><img alt="" src="/final_logo.png" width="100" height="70" className="d-inline-block align-top"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/"> Barangay Profiling System </a></ul>
                </Navbar.Brand>
              </Col>
              <Col>
                <Button className="super-user" onClick={() => {navigate("/")}}>Log-in&nbsp;&nbsp;&nbsp;<i className="bi bi-box-arrow-in-right"></i></Button>
              </Col>           
          </Container>
        </Navbar>
      </div>
      
      <div className="sign-upbox">
        
        <Form className="login-form" onSubmit={submitHandler} noValidate validated={validated}>
          <Form.Label style={{fontWeight: 'bold', display:'flex', justifyContent: 'center'}}>Create your account here.</Form.Label><br/>
             <Row className="mb-3">
                <Form.Group as={Col}>
                  {/*<Form.Label>First Name</Form.Label>*/}
                    <Form.Control type="text" value={enteredFname} onChange={fnameChangeHandler} placeholder="First name" required/>
                      <Form.Control.Feedback type="invalid">
                      Please enter first name.
                      </Form.Control.Feedback>
                </Form.Group>              
                <Form.Group as={Col}>
                    {/*<Form.Label>Last Name</Form.Label>*/}
                    <Form.Control type="text"  value={enteredLname} onChange={lnameChangeHandler} placeholder="Last name" required/>
                    <Form.Control.Feedback type="invalid">
                      Please enter last name.
                    </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                    {/*<Form.Label>Email Address</Form.Label>*/}
                    <Form.Control type="email"  value={enteredEmail} onChange={emailChangeHandler} placeholder="Email address" required/>
                    <Form.Control.Feedback type="invalid">
                      Please enter valid email.
                    </Form.Control.Feedback>
                </Form.Group>         
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control type="password"  value={enteredPassword} onChange={passwordChangeHandler} placeholder="New password" required/>
                    <Form.Control.Feedback type="invalid">
                      Please enter your password.
                    </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formRegion">
                  <Form.Label>Region</Form.Label>
                    <Form.Select onChange={handleProvinceChange} onSelect={handleRegionChange} required>                         
                       {regionData && regionData.length > 0 && regionData.map((item) => 
                        <option key={item.region_code} value={item.region_code}>{item.region_name}</option>)}
                  </Form.Select>
                  {/*<Form.Select.Feedback type="invalid">
                      Please choose region.
                  </Form.Select.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} controlId="formProvince">
                      <Form.Label>Province</Form.Label>
                      <Form.Select onChange={handleCityChange} required>
                         {provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                            key={item.province_code} value={item.province_code}>{item.province_name}</option>)}
                      </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formCity">
                      <Form.Label>City/Municipality</Form.Label>
                      <Form.Select onChange={handleBarangayChange} required>
                        {cityData && cityData.length > 0 && cityData.map((item) => <option
                            key={item.city_code} value={item.city_code}>{item.city_name}</option>)}
                      </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formName">
                      <Form.Label>Name of Barangay</Form.Label>
                      <Form.Select onChange={barangayChange} required>
                        <option disabled>Select Barangay</option>
                        {barangayData && barangayData.length > 0 && barangayData.map((item) => <option
                            key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</option>)}
                      </Form.Select>
                </Form.Group>
              </Row>
              <br/>
              <Button variant="custom" type="button" onClick={handleConfirm}>
                Register
              </Button>
              {/*Pop-up box to confirm*/}
              <Modal show={confirm} onHide={handleCancel}  backdrop="static" centered>
                <Modal.Body>
                  Are you sure all credentials are correct?
                </Modal.Body>
                <Modal.Footer>
                   <Button variant="custom" onClick={handleCancel}>
                      Go back
                    </Button>
                    <Button variant="custom" type="submit" onClick={submitHandler}>
                      Confirm  
                    </Button>
                  </Modal.Footer>
              </Modal>
          </Form>
      </div>
  </div>

   )
}

export default SignUp;
