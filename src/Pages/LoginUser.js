import React, { useState, useContext } from 'react';
import { UserAuth } from '../AuthContext.js';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginUser() {

    //state variables
    const [enteredEmail, setEmail] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = UserAuth();

    //change handlers
    const emailChangeHandler = (event) => {setEmail(event.target.value);};
    const passwordChangeHandler = (event) => {setPassword(event.target.value);};

    //routing
    let navigate = useNavigate();
    
    const submitHandler = async (e) => {
      e.preventDefault();
      setError('')
        try {
          await signIn(enteredEmail, enteredPassword)
          //localStorage.setItem("name", response.data.token);
          navigate('/dashboard')
        } catch (e) {
          setError(e.message)
          console.log(e.message)
          alert('No user found. Contact admin for account approval.')
        }
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
                <a className="super-user" href="#"></a>
              </Col>
            </Row>           
          </Container>
        </Navbar>
      </div>
      
      <div className="loginbox">
          
          <h4>Barangay Representative Login</h4><br/>
          
          <Form className="login-form" onSubmit={submitHandler}>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={enteredEmail} onChange={emailChangeHandler} placeholder="Enter email" required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"  value={enteredPassword} onChange={passwordChangeHandler} placeholder="Password" required/>
                </Form.Group>

              <a href="/forgot-password">Forgot Password</a><br/><br/>

              <Button variant="custom" type="submit" onClick={submitHandler}>
                Log In
              </Button>
          </Form>

         {/* <img src="./google.png" alt="gmail"/>*/}
      </div>
      <br/>
      <div className="click-button">
          <Button variant="custom" size="lg" onClick={() => {navigate("/sign-up")}}>
                Create Barangay Rep Account
          </Button>
      </div>

  </div>

   )
}

export default LoginUser;