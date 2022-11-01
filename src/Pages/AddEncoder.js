import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import HeaderLogo from '../HeaderLogo.js'
import Modal from 'react-bootstrap/Modal';
import SubUserDataService from "../Services/encoder-service.js";
import ZoneDataService from "../Services/zone-service.js";


function AddEncoder() {

    //state variable
    const [enteredEmail, setEmail] = useState('');
    const [enteredFname, setFname] = useState('');
    const [enteredLname, setLname] = useState('');
    const [enteredMname, setMname] = useState('');
    const [enteredContact, setContact] = useState('');

    //edit zones
    const [checked, setChecked] = useState([]);

    //fetch all subusers or encoders in firestore
    const [userList, setUserList] = useState([]);

    //fetch all zone by barangay
    const [zoneList, setZoneList] = useState([]);

    //for modal purposes
    const [show, setShow] = useState(false);
    const [emailId, setEmailId] = useState('')

    //change handlers
    const emailChangeHandler = (event) => {setEmail(event.target.value);};
    const fnameChangeHandler = (event) => {setFname(event.target.value);};
    const lnameChangeHandler = (event) => {setLname(event.target.value);};
    const mnameChangeHandler = (event) => {setMname(event.target.value);};
    const contactChangeHandler = (event) => {setContact(event.target.value);};
    // checked item from list handler
    const handleCheck = (event) => {
        var updatedList = [...checked];
            if (event.target.checked) {
                updatedList = [...checked, event.target.value];
            } else {
                updatedList.splice(checked.indexOf(event.target.value), 1);
            }
            setChecked(updatedList);
            //console.log(checked);
    };

    //for pop-up
    const handleClose = () => {
        setChecked([]);
        setEmailId('')
        setShow(false);
    }
    const handleEdit = (email) => {
        setShow(true);
        getZones();
        setEmailId(email);
    }
    //save zone
    const saveChanges = async (emailId) => {

         try {
            await SubUserDataService.updateEncoder(emailId,checked.toString());  
            console.log("success.");
        } catch (err) {
            console.log(err);
        }
        
        handleClose();
        window.location.reload(); 
    }
    
    //fetching all encoders
    const getEncoders = async () => {
        const data = await SubUserDataService.getSubUsersByBarangay();
        console.log(data.docs);
        setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    //to display the data from database
    useEffect(() => { getEncoders(); }, []);

    //to fetch zones in the barangay 
    const getZones = async () => {
        const data = await ZoneDataService.getZoneByBarangay();
        console.log(data.docs);
        setZoneList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    //submit button to add encoder handler
    const submitHandler = async (e) => {

        e.preventDefault()
        const newEncoder = {enteredEmail, enteredFname, enteredLname, enteredMname, enteredContact};
        console.log(newEncoder);

        try {
            await SubUserDataService.addEncoder(newEncoder);
            console.log("Success.")
        } catch (err) {
            console.log(err)
        }

        setFname('');
        setMname('');
        setLname('');
        setEmail('');
        setContact('');
    };

    //delete user
    const deleteButton = async (email) => {
        await SubUserDataService.deleteEncoder(email);
        console.log("success")
        getEncoders()
    };

    return(
       <div className= "dashboard">
       
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>

            <div className="user-tables">
                <h5>Add encoder below:</h5>
                <br/>
                <Form onSubmit={submitHandler}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control type="text" value={enteredFname} onChange={fnameChangeHandler} placeholder="Enter first name" required/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control type="text" value={enteredMname} onChange={mnameChangeHandler} placeholder="Enter middle name" required/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control type="text" value={enteredLname} onChange={lnameChangeHandler} placeholder="Enter last name" required/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Control type="text" value={enteredContact} onChange={contactChangeHandler} placeholder="Enter contact number"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control value={enteredEmail} onChange={emailChangeHandler} placeholder="Enter email address" aria-label=""
                                    aria-describedby="basic-addon2" required/>
                        </Form.Group>
                    </Row>
                    <Button type= "submit" onClick={submitHandler} variant="outline-secondary" id="button-addon2">
                        Add Encoder
                    </Button>
                </Form>
                    <br/><br/>
                    <h5>List of Encoders</h5><br/>

                    {/*For displaying tabled list of encoders*/}
                    <Table bordered hover>
                        <thead>
                            <tr>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Contact</th>
                                 <th>Barangay</th>
                                 <th>Zone ID</th>
                                 <th>Activity</th>
                            </tr>
                        </thead>
                        {userList.map((doc,index) => {
                                return (
                            <tbody key={doc.id}>
                                <tr>
                                    <td>{doc.first_name}&nbsp;{doc.last_name}</td>
                                    <td>{doc.email}</td>
                                    <td>{doc.contact_num}</td>
                                    <td>{doc.barangay_desig}</td>
                                    <td>{doc.assigned_zones}</td>
                                    <td>
                                    <Button type="button" className="btn-add" onClick={() => {deleteButton(doc.email)}}>Delete</Button>&nbsp;
                                    <Button type="button" className="btn-add" onClick={() => {handleEdit(doc.email)}}>Edit Zone</Button>
                                    </td>
                                </tr>                            
                            </tbody>
                        )})}
                    </Table>
                    {/*Pop-up box to assign zone*/}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                          <Modal.Title>Check the assigned zone/s to encoder:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                              {/*  <Form.Group className="mb-3" controlId="editZoneForm">
                                    <Form.Label>Zone Number</Form.Label>
                                        <Form.Control type="number" placeholder="" onChange={zoneNumHandler} autoFocus/>
                                    <Form.Label>Zone Name</Form.Label>
                                      <Form.Control type="text" placeholder="" onChange={zoneNameHandler}/>
                                </Form.Group>*/}
                                {zoneList.map((doc, index) => (
                                    <div key={doc.id}>
                                        <input value={doc.zone_num} type="checkbox" onChange={handleCheck}/>
                                        &nbsp;&nbsp;&nbsp;<span>{doc.zone_name}</span>
                                        {/*<span className={isChecked(doc.zone_name)}>{doc.zone_name}</span>*/}
                                    </div>
                                ))}
                          </Form>
                       </Modal.Body>
                       <Modal.Footer>
                           <Button variant="custom" onClick={handleClose}>
                            Cancel
                            </Button>
                            <Button variant="custom" onClick={() => {saveChanges(emailId)}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                     </Modal>
              </div>
        </div>
    );

}

export default AddEncoder

