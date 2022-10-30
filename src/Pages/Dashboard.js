import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'
import Profile from '../Profile.js'
import BarangayDataService from "../Services/barangay-service.js";



function Dashboard() {

   //STATE VARIABLES
  const [barangayList, setBarangayList] = useState([{}])

  //function to check if current user barangay desig exist in database
  const checkUserBarangay = async () => {

      try {
         const barangay = localStorage.getItem("brgy")
        
         if(barangay != null){
       
         }else{
           console.log("Need barangay first.")
         }
     }catch (e) {
         return console.log(e);
     }
  }
    //to display the data from database
    
    //useEffect(() => { checkUserBarangay(); }, []);

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
              {/*{barangayList.map((doc,index) => {
                                return (
                            <tbody>
                                <tr key={doc.id}>
                                    <td>{doc.city}</td>
                                </tr>                            
                            </tbody>
              )})}*/}
          </main>
        </div>
    );

}

export default Dashboard