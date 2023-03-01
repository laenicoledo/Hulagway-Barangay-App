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
//import {regions, provinces, cities, barangays} from "select-philippines-address";
import BarangayDataService from "../Services/barangay-service.js";
import ZoneDataService from "../Services/zone-service.js";

function BarangayTab() {

    const [barangayExists, setBarangayExists] = useState();
    const [barangayList, setBarangayList] = useState([])
    const [zoneList, setZoneList] = useState([{}])

    //function to check if current user barangay desig exist in database
    const checkUserBarangay = async () => {

      try {
        const barangayRef = localStorage.getItem("brgy")
    
         if(barangayRef != null){
            
            const barangayData = await BarangayDataService.getBarangayByName(barangayRef)
            const zoneData = await ZoneDataService.getZoneByBarangay();
            setBarangayList(barangayData.data())
            setZoneList(zoneData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setBarangayExists(true)
         }else{
            //console.log("no");
            setBarangayExists(false)
         }
     }catch (e) {
         return console.log(e);
     }

      //console.log(barangayList)
      //console.log(zoneList)
    
    }

    useEffect(() => {
         checkUserBarangay();
    }, []);

    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>
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
          <aside>
            <Widgets/>
            <br/><br/>
          
          </aside>
          <br/>
          <main>
                {barangayExists ? (<EditBarangay barangay={barangayList} zones={zoneList}/>) : 
            (
                <SetupBarangay/>
            )}
                
          </main>
        </div>
    );

}

export default BarangayTab