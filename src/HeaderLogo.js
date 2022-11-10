import {React, useState} from 'react'
import {useNavigate} from "react-router-dom";
import { UserAuth, user } from './AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function HeaderLogo() {

  const [confirm, setConfirm] = useState(false);
  const { user, logout } = UserAuth();
  
  //to navigate
  let navigate = useNavigate();

  //for confirmation
  const handleConfirm = () => {
    setConfirm(true);       
  }
  
  const handleCancel = () => {
    setConfirm(false);
  }

  //logout call
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear()
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return(
        <Navbar className="header-span">
          <Container>
              <Col>
                <Navbar.Brand>
                <ul className="header-title"><img alt="" src="/final_logo.png" 
                width="90" height="60" className="d-inline-block align-top"/>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="/dashboard"> Barangay Profiling System </a></ul>
                </Navbar.Brand>
              </Col>
              <Col>
                  <NavDropdown title="" as="button" className="header-options">
                  <NavDropdown.Item href="/add-encoder"><i className="bi bi-person-plus"></i>&nbsp;&nbsp;Add Encoders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick = {handleConfirm}>
                    <i className="bi bi-arrow-left-square"></i>&nbsp;&nbsp;Logout
                  </NavDropdown.Item>
                  </NavDropdown>

              </Col>&nbsp;&nbsp;&nbsp;
              <i className="bi bi-person-circle"></i>&nbsp;&nbsp;{user.email}
            {/*<ul className="header-options"><a href="/add-encoder"> <i className="bi bi-person-plus"></i> Add Encoder </a></ul>*/}
          </Container>
           {/*Pop-up box to confirm*/}
          <Modal show={confirm} onHide={handleCancel}  backdrop="static" centered>
            <Modal.Body>
              Are you sure you want to logout?
            </Modal.Body>
            <Modal.Footer>
                 <Button variant="custom" onClick={handleCancel}>
                      Cancel
                  </Button>
                  <Button variant="custom" onClick={handleLogout}>
                        Logout
                    </Button>
            </Modal.Footer>
          </Modal>
      </Navbar>
    );

}

export default HeaderLogo