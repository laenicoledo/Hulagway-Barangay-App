import React, { useState } from 'react';
import { UserAuth } from '../AuthContext.js';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function SignUp() {

    //use state variables
    const [enteredFname, setFname] = useState('');
    const [enteredLname, setLname] = useState('');
    const [enteredContact, setContact] = useState('');
    const [enteredBarangay, setBarangay] = useState('');
    const [enteredEmail, setEmail] = useState('');  
    const [enteredPassword, setPassword] = useState('');
    const [error, setError] = useState('');
    const {createUser} = UserAuth();

    //routing
    let navigate = useNavigate();

    //change handlers
    const fnameChangeHandler = (event) => {setFname(event.target.value);};
    const lnameChangeHandler = (event) => {setLname(event.target.value);};
    const contactChangeHandler = (event) => {setContact(event.target.value);};
    const barangayChangeHandler = (event) => {setBarangay(event.target.value);};
    const emailChangeHandler = (event) => {setEmail(event.target.value);};
    const passwordChangeHandler = (event) => {setPassword(event.target.value);};

    const submitHandler = async (e) => {
      e.preventDefault();
      setError('');
        try {
          await createUser(enteredEmail, enteredPassword, enteredFname, enteredLname, enteredContact, enteredBarangay)
          alert('Admin account created.')
          navigate('/setup-barangay')
        } catch (e) {
          setError(e.message);
          console.log(e);
        }

      setFname("");
      setLname("");
      setContact("");
      setBarangay("")
      setEmail("")
      setPassword("")  
    };
  
    return (
    
    <div className="body">
      
      <div className="logo">
        <Navbar className="header-span">
          <Container>
            <Row>
              <Col>
                <Navbar.Brand>
                <ul className="header-title"><img alt="" src="/final_logo.png" width="90" height="60" className="d-inline-block align-top"/>&nbsp;
                <a href="/"> Barangay Profiling System </a></ul>
                </Navbar.Brand>
              </Col>
              <Col>
                <a className="super-user" href="/"> Login as Barangay Rep</a>
              </Col>
            </Row>           
          </Container>
        </Navbar>
      </div>
      
      <div className="sign-upbox">
        
        <Form className="login-form" onSubmit={submitHandler}>
          <Form.Label style={{fontWeight: 'bold', display:'flex', justifyContent: 'center'}}>Create your account here.</Form.Label><br/>
             <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" value={enteredFname} onChange={fnameChangeHandler} placeholder="Juan" required/>
              </Form.Group>              
              <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text"  value={enteredLname} onChange={lnameChangeHandler} placeholder="Dela Cruz" required/>
              </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="text" value={enteredContact} onChange={contactChangeHandler} placeholder="" required/>
              </Form.Group>              
              <Form.Group as={Col}>
                <Form.Label>Barangay Designation</Form.Label>
                  <Form.Control type="text" value={enteredBarangay} onChange={barangayChangeHandler} placeholder="" required/>
              </Form.Group>
              </Row>
              <Row className="mb-3">
               <Form.Group as={Col}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email"  value={enteredEmail} onChange={emailChangeHandler} placeholder="sample@gmail.com" required/>
              </Form.Group>       
              <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"  value={enteredPassword} onChange={passwordChangeHandler} placeholder="password" required/>
              </Form.Group>
              </Row>
              <br/>
              <Button variant="custom" type="submit" onClick={submitHandler}>
                Register
              </Button>
          </Form>

          {/*<img src="./google.png" alt="gmail"/>*/}
      </div>
  </div>

   )
}

export default SignUp;
