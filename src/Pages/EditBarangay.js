import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {regions, provinces, cities, barangays} from "select-philippines-address";
import BarangayDataService from "../Services/barangay-service.js";
import ZoneDataService from "../Services/zone-service.js";

function EditBarangay() {

    return(

        <div style={{display:'flex', justifyContent: 'center', textAlign: 'center'}}>

            <h4> Barangay is currently unavailable for edit. Please standby for future updates. </h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>

    )

}

export default EditBarangay