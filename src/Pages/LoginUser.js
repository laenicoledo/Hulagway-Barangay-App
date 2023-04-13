import React, { useState } from 'react';
import { UserAuth } from '../AuthContext.js';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import BarangayDataService from "../Services/barangay-service.js";
import {collection, getDoc, doc} from "firebase/firestore";
import { db, auth } from '../firebase.js';

//get collections in encoding year
const yearRef = collection(db, "encoding_year");

//get collection names user from document 2022
const userRef = collection(doc(yearRef,"2022"), "users")


function LoginUser() {

    //state variables
    const [enteredEmail, setEmail] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const { signIn } = UserAuth();

    //change handlers
    const emailChangeHandler = (event) => {setEmail(event.target.value);};
    const passwordChangeHandler = (event) => {setPassword(event.target.value);};

    //routing
    let navigate = useNavigate();

    //function to check if current user barangay desig exist in database
    const checkUserBarangay = async () => {

      const idRef = doc(userRef, auth.currentUser.uid)

      try {
        const userData = await getDoc(idRef);
        //console.log(userData.data())
        const barangay = await BarangayDataService.getBarangayByName(`${userData.data().city_desig}-${userData.data().brgy_desig}`)
        //console.log(`${userData.data().city_desig}-${userData.data().brgy_desig}`)
        await localStorage.setItem('barangay', userData.data().brgy_desig)
        await localStorage.setItem('city', userData.data().city_desig)
        await localStorage.setItem('region', userData.data().region)
        await localStorage.setItem('province', userData.data().province)


        if(barangay.data() === undefined){
           alert("Your barangay has not been set-up. Please go to Setup Barangay tab.") 
        }else{
          await localStorage.setItem('brgy',`${barangay.data().city}-${barangay.data().barangay_name}`)
          console.log("Barangay exists. View data.")
        }
      }catch (e) {
        return console.log(e);
      }
    }

    //login button
    const submitHandler = async (e) => {
        e.preventDefault()

        try {
          await signIn(enteredEmail, enteredPassword)
          await checkUserBarangay()
          await navigate('/dashboard')
        } catch (e) {
          //setError(e.message)
          console.log(e.message)
          alert('No user found. Contact admin for account approval.')
        }

        await setEmail('');
        await setPassword('');
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
              <Button className="super-user" size="lg" onClick={() => {navigate("/sign-up")}}>
              Sign-up&nbsp;&nbsp;&nbsp;<i className="bi bi-person-plus"></i>
              </Button>
               {/* <a className="super-user" href="/"> SIGN-UP</a>*/}
              </Col>        
          </Container>
        </Navbar>
      </div>
      
      <div className="loginbox">
          
          <h5>Barangay Representative Login</h5><br/>
          
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

              <Button variant="custom" type="submit">
                Log In
              </Button>
          </Form>

         {/* <img src="./google.png" alt="gmail"/>*/}
      </div>
      <br/>
      <div className="click-button">
          
      </div>

  </div>

   )
}

export default LoginUser;