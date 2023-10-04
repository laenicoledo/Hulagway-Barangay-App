import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'
import Spinner from 'react-bootstrap/Spinner';
import BarangayDataService from "../Services/barangay-service.js";

function Report() {

    //STATE VARIABLES
    const [barangayExists, setBarangayExists] = useState();
    const [barangayList, setBarangayList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    //function to check if current user barangay desig exist in database
    const checkUserBarangay = async () => {

      //console.log(user)

      try {
         const barangayRef = localStorage.getItem("brgy")
         //console.log(barangayRef);
        
         if(barangayRef != null){
            
            await setBarangayExists(true)
            setIsLoading(true)

            const data = await BarangayDataService.getBarangayByName(barangayRef)
            await setBarangayList(data.data())

            setIsLoading(false);
         }else{
            await setBarangayExists(false)
            console.log("barangay data not available")
            setIsLoading(false);
         }
     }catch (e) {
        alert(e);
     }
     
    }

  //to display the data from database  
  useEffect(() => { checkUserBarangay(); }, []);

    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/>
           <nav>
            <Nav variant="pills" defaultActiveKey="/report" fill>
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
         {/* <aside>
            <Widgets/>
            <br/><br/>
          </aside>*/}
          <br/>
          <main>
            {isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <br/><br/><br/><br/><br/>
                    <Spinner animation="grow"/>
                      <br/>
                    <h2>Loading...</h2>
                  </div>
            ) : (
            <>
            <h4 style={{display:'flex', justifyContent: 'center', textAlign: 'center'}}> 
                Still in development. Please come back for future updates.</h4>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
             </>
             )}
          </main>
        </div>
    );

}

export default Report