import React, { useState, useContext } from 'react';
import { UserAuth } from '../AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function ForgotPassword() {

    //state variables
    const [enteredEmail, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const { forgotPassword } = UserAuth();

    //change handlers
    const emailChangeHandler = (event) => {setEmail(event.target.value);};
    const handleClose = () => {
      navigate("/");
      setShow(false);
    }
    const handleShow = () => setShow(true);
    const alert = () => {
    }
    
    //routing
    let navigate = useNavigate();

    //button submit handler
    const submitHandler = async (e) => {
      //e.preventDefault();

       try {
          await forgotPassword(enteredEmail)
          handleShow();
        } catch (e) {
          alert("Enter registered email.")
        }
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
          
          <h4>Reset Password</h4><br/>
          
          <Form className="login-form" onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Enter your account's email address</Form.Label>
                  <Form.Control type="text" value={enteredEmail} onChange={emailChangeHandler} placeholder="Your email here" required/>
              </Form.Group>
              <br/> 
              <Button variant="custom" type="submit" onClick={submitHandler}>
                Send Password Reset Link
              </Button>
          </Form>

      </div>
      <br/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Email sent. Please check your email and follow the instructions to reset your password.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  </div>

   )
}

export default ForgotPassword;