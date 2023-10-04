import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'
import SetupBarangay from './SetupBarangay.js'
import EditBarangay from './EditBarangay.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
//import {regions, provinces, cities, barangays} from "select-philippines-address";
import BarangayDataService from "../Services/barangay-service.js";
import ZoneDataService from "../Services/zone-service.js";

function BarangayTab() {

    const [barangayExists, setBarangayExists] = useState();
    const [barangayList, setBarangayList] = useState([])
    const [zoneList, setZoneList] = useState([{}])
    const [isLoading, setIsLoading] = useState(true);

    //function to check if current user barangay desig exist in database
    const checkUserBarangay = async () => {

      try {
        const barangayRef = localStorage.getItem("brgy")
    
         if(barangayRef != null){
            setIsLoading(true)
            const barangayData = await BarangayDataService.getBarangayByName(barangayRef)
            const zoneData = await ZoneDataService.getZoneByBarangay();
            setBarangayList(barangayData)
            setZoneList(zoneData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setBarangayExists(true)
            setIsLoading(false);
         }else{
            //console.log("no");
            setBarangayExists(false)
            setIsLoading(false);
         }
     }catch (e) {
         return console.log(e);
     }
    
    }

    useEffect(() => {
         checkUserBarangay();
    }, []);

    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/>
          <nav>
            <Nav variant="pills" defaultActiveKey="/barangay-tab" fill>
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
          {/*<aside>
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
                ):(<>

                    {barangayExists ? (<EditBarangay barangay={barangayList} zones={zoneList}/>) : 
                    (
                        <SetupBarangay/>
                    )}

                </>)}
                
          </main>
        </div>
    );

}

export default BarangayTab