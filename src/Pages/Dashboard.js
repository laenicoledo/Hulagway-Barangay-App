import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'
// import Profile from '../Profile.js'
import BarangayDataService from "../Services/barangay-service.js";
import { auth } from '../firebase.js';
import { UserAuth } from '../AuthContext.js';



function Dashboard() {

   //STATE VARIABLES
  const [barangayExists, setBarangayExists] = useState();
  const [barangayList, setBarangayList] = useState([])
  const { user } = UserAuth();


  //function to check if current user barangay desig exist in database
  const checkUserBarangay = async () => {

      //console.log(user)

      try {
         const barangayRef = localStorage.getItem("brgy")
         console.log(barangayRef);
        
         if(barangayRef != null){
            const data = await BarangayDataService.getBarangayByName(barangayRef)
            setBarangayList(data.data())
            setBarangayExists(true)
            //console.log(barangayList)
         }else{
          setBarangayExists(false)
          //alert("Barangay data currently unavailable. Please proceed to Setup Barangay tab.")
          console.log("barangay data not available")
         }
     }catch (e) {
         return console.log(e);
     }
     
  }
  
  //to display the data from database  
  useEffect(() => { checkUserBarangay(); }, []);


    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>
          <nav>
            <Nav variant="pills" defaultActiveKey="/dashboard" fill>
              <Nav.Item>
                    <Nav.Link href="/dashboard">Community Profile</Nav.Link>
              </Nav.Item>&nbsp;
              <Nav.Item>
                  <Nav.Link href="/purok-profile">Purok Profile</Nav.Link>
              </Nav.Item>&nbsp;
              <Nav.Item>
                  <Nav.Link href="/household-profile">Household Profile</Nav.Link>
              </Nav.Item>&nbsp;
              <Nav.Item>
                   <Nav.Link href="/resident-profile">Resident Profile</Nav.Link>
              </Nav.Item>&nbsp; 
             <Nav.Item>
                  <Nav.Link href="/barangay-tab">Setup/Edit Barangay</Nav.Link>
              </Nav.Item>&nbsp;
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
              {barangayExists ? (
                  <div><h4> Barangay Basic Information <i class="bi bi-info-circle"></i></h4><br/>
                  <Table bordered hover>  
                    <tbody>
                      <tr>
                        <td width = "25%"><h5>Region </h5></td>
                        <td><h5>{barangayList.region}</h5></td>
                      </tr> 
                      <tr>
                        <td width = "25%"><h5>Province </h5></td>
                        <td><h5>{barangayList.province}</h5></td>
                      </tr>
                      <tr>
                        <td width = "25%"><h5>City </h5></td>
                        <td><h5>{barangayList.city}</h5></td>
                      </tr>
                      <tr>
                        <td width = "25%"><h5>Barangay Name </h5></td>
                        <td><h5>{barangayList.barangay_name}</h5></td>
                      </tr>
                      <tr>
                        <td width = "25%"><h5>Postal Code </h5></td>
                        <td><h5>{barangayList.zip_code}</h5></td>
                      </tr>                      
                      <tr>
                        <td width = "25%"><h5>Classification </h5></td>
                        <td><h5>{barangayList.classification}</h5></td>
                      </tr>
                      <tr>
                        <td width = "25%"><h5>Founding Date </h5></td>
                        <td><h5>{barangayList.founding_date}</h5></td>
                      </tr>   
                    </tbody>
                  </Table></div>
              ) : (
                  <div style={{justifyContent: 'center', textAlign: 'center'}}>

                <h1> Welcome!</h1><br/>
                <p>Currently, there are no existing data in your community database. Please proceed to the "Setup Barangay" tab to get started.</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                </div>
              )}           
          </main>
        </div>
    );

}

export default Dashboard