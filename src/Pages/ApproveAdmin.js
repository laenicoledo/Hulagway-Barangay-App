import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import HeaderLogo from '../HeaderLogo.js'
//import Logout from '../Logout.js'

function ApproveAdmin() {

    //state variable
    const [userList, setUserList] = useState([{}]);

    //URL PATH
    const API_URL = "http://localhost:8000/api/";

    //to display the data from database
    //useEffect(() => {Axios.get(API_URL + "getUsers").then((response) => {setUserList(response.data)})}, [])
    
    //delete user
    // const deleteUser = (user_id) => {
    //     Axios.delete(`${API_URL}deleteUser/${user_id}`, 
    //         {headers: {accessToken:localStorage.getItem("accessToken")}}).then((response) => {
    //             if(response.data.error){
    //                 alert('You are not logged in.');
    //             }else{
    //                 window.location.reload(false);
    //             }
    //         }) 
    // }

    //update user status
    // const updateStatus = (user_id) => {
    //     Axios.put(`${API_URL}updateUser/${user_id}`, {status:'approved'},
    //         {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
    //             if(response.data.error){
    //                 alert('You are not logged in.');
    //             }else{
    //                 window.location.reload(false);
    //             }
    //         })   
    // }

    return(
       <div className= "dashboard">
       
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>

          <div className="user-tables">
            
            <h5>List of Barangay Representatives</h5><br/>

            {/*For displaying tabled list of admin*/}
             <Table bordered hover>
                    <thead>
                        <tr>
                             <th width="5%">ID</th>
                             <th>Name</th>
                             <th>Username</th>
                             <th>Email</th>
                             <th>Contact</th>
                             <th>Zone/Barangay</th>
                             <th>Status</th>
                             <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {userList.map((val,index) => {
                            return (
                            <tr key={index}>
                                <td>{val.user_id}</td>
                                <td>{val.first_name}&nbsp;{val.last_name}</td>
                                <td>{val.username}</td>
                                <td>{val.email}</td>
                                <td>{val.contact_num}</td>
                                <td>{val.admin_id}</td>
                                <td>{val.status}</td>
                                <td>
                                    {(val.status==="pending")?
                                    <Button className="btn-add" onClick={() => {updateStatus(val.user_id)}}>Approve</Button>:''}&nbsp;
                                  <Button type="button" className="btn-add" onClick={() => {deleteUser(val.user_id)}}>Delete</Button>
                                </td>
                            </tr>
                            )})}
                    </tbody>
                </Table>
          </div>
        </div>
    );

}

export default ApproveAdmin