import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import HeaderLogo from '../HeaderLogo.js'
import Modal from 'react-bootstrap/Modal';

function AddSuperUser() {

    //state variable
    const [enteredUsername, setUsername] = useState('');
    const [enteredPassword, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const [userList, setUserList] = useState([{}]);


    //change handlers
    const userNameChangeHandler = (event) => {setUsername(event.target.value);};
    const passwordChangeHandler = (event) => {setPassword(event.target.value);};
    //const lnameChangeHandler = (event) => {setLname(event.target.value);};

    //URL PATH
    const API_URL = "http://localhost:8000/api/";

    //for pop-up
    const handleClose = () => {
        setShow(false);
    }
    const handleEdit = (admin_id) => {
        setShow(true);
        setId(admin_id);
    }
    const saveChanges = (id) => {

        Axios.put(`${API_URL}updateSuperuser/${id}`, {
            username: enteredUsername, 
            password:enteredPassword},
            {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
                if(response.data.error){
                    alert('You are not logged in.');
                }else{
                    setShow(false);
                    window.location.reload(false);  
                }
            }) 
    }
    
    //to display the data from database
    useEffect(() => {Axios.get(API_URL + "getSuperusers").then((response) => {setUserList(response.data)})}, [])

    //submit button handler
    const submitHandler = (event) => {
        
        Axios.post(API_URL + "addSuperuser", {
           newUsername: enteredUsername,
           newPassword: enteredPassword},
            {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
                if(response.data.error){
                    alert('You are not logged in.');
                }else{
                    window.location.reload(false);  
                }
            })

        //to automatically show the data in table
        //setUserList([...userList, {id: setUserList.sub_id, 
        //    fname: setUserList.first_name, lname: setUserList.last_name, email: setUserList.email, contact: setUserList.contact_num}])

        //reset the values of input fields
        setUsername('');
        setPassword('');
    
        //console.log(userList)
    }

    //delete user
    const deleteUser = (admin_id) => {
        Axios.delete(`${API_URL}deletesuperuser/${admin_id}`, 
            {headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) => {
                if(response.data.error){
                    alert('You are not logged in.');
                }else{
                    window.location.reload(false);
                }
            })   
    }

    return(
       <div className= "dashboard">
       
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>

            <div className="user-tables">
                <h5>Add more administrators</h5>
                <br/>
                <Form onSubmit={submitHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control type="text" value={enteredUsername} onChange={userNameChangeHandler} placeholder="Enter username" required/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} placeholder="Enter password" required/>
                        </Form.Group>
                    </Row>
                    <Button type= "submit" onClick={submitHandler} variant="outline-secondary" id="button-addon2">
                        Add Encoder
                    </Button>
                </Form>
                    <br/><br/>
                    <h5>List of all administrators:</h5><br/>

                    {/*For displaying tabled list of encoders*/}
                    <Table bordered hover>
                        <thead>
                            <tr>
                                 <th>ID</th>
                                 <th>Username</th>
                                 <th>Password</th>
                                 <th>Activity</th>
                            </tr>
                        </thead>
                        {userList.map((val,index) => {
                                return (
                            <tbody key={index}>
                                <tr>
                                    <td>{val.admin_id}</td>
                                    <td>{val.username}</td>
                                    <td>{val.password}</td>
                                    <td>
                                    <Button type="button" className="btn-add" onClick={() => {deleteUser(val.admin_id)}}>Delete</Button>&nbsp;
                                    <Button type="button" className="btn-add" onClick={() => {handleEdit(val.admin_id)}}>Edit Account</Button>
                                    </td>
                                </tr>                            
                            </tbody>
                        )})}
                    </Table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                          <Modal.Title>Enter new username and password.</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="" onChange={userNameChangeHandler} autoFocus/>
                                    <Form.Label>Password</Form.Label>
                                      <Form.Control type="password" placeholder="" onChange={passwordChangeHandler}/>
                                </Form.Group>
                          </Form>
                       </Modal.Body>
                       <Modal.Footer>
                           <Button variant="custom" onClick={handleClose}>
                            Cancel
                            </Button>
                            <Button variant="custom" onClick={() => {saveChanges(id)}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                     </Modal>
              </div>
        </div>
    );

}

export default AddSuperUser