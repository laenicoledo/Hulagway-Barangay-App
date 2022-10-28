import React, { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginSuperUser() {

    //state variables
    const [enteredUsername, setUsername] = useState('');
    const [enteredPassword, setPassword] = useState('');
  

    //change handlers
    const usernameChangeHandler = (event) => {setUsername(event.target.value);};
    const passwordChangeHandler = (event) => {setPassword(event.target.value);};

    //routing
    let navigate = useNavigate();
    
    //button submit handler
    const submitHandler = (event) => {

      const data={username: enteredUsername, password: enteredPassword}

      //reset the values of input fields
          setUsername('');
          setPassword('');
    }
  
  return (
    
    <div className="body">
      
      <div className="logo">
        <Navbar className="header-span">
          <Container>
            <Row>
              <Col>
                <Navbar.Brand>
                <ul className="header-title"><img alt="" src="/final_logo.png" width="90" height="60" className="d-inline-block align-top"/>&nbsp;
                <a href="/dashboard"> Barangay Profiling System </a></ul>
                </Navbar.Brand>
              </Col>
              <Col>
                <a className="super-user" href="/">Barangay Rep Login</a>
              </Col>
            </Row>           
          </Container>
        </Navbar>
      </div>
      
      <div className="loginbox">
          <h4>Administrator Login</h4><br/>
          <Form className="login-form" onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={enteredUsername} onChange={usernameChangeHandler} placeholder="Enter username" required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"  value={enteredPassword} onChange={passwordChangeHandler} placeholder="Password" required/>
                </Form.Group>
              <Button variant="custom" type="submit" onClick={submitHandler}>
                Log In
              </Button>
          </Form>

         {/* <img src="./google.png" alt="gmail"/>*/}
      </div>

  </div>

   )
}

export default LoginSuperUser;
