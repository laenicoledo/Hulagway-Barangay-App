import {React, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';

function Profile() {

    //STATE VARIABLES
    const [barangayList, setBarangayList] = useState([{}])

    //URL PATH
    //const API_URL = "http://localhost:8000/api/";

    //to display the data from database
    // useEffect(() => {Axios.get(API_URL + "getBarangay", 
    //   {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
    //     setBarangayList(response.data)
        
    //   })}, [])

    return(

      <div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
    );

}

export default Profile