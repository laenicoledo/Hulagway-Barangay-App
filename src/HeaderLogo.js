import {React, useContext} from 'react'
import {useNavigate} from "react-router-dom";
import { UserAuth } from './AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeaderLogo() {


  const { /*user,*/ logout } = UserAuth();
  
  //to navigate
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("brgy");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return(
        <Navbar className="header-span">
          <Container>
            <Row>
              <Col>
                <Navbar.Brand>
                <ul className="header-title"><img alt="" src="/final_logo.png" 
                width="90" height="60" className="d-inline-block align-top"/>&nbsp;&nbsp;
                <a href="/dashboard"> Barangay Profiling System </a></ul>
                </Navbar.Brand>
              </Col>
              <Col>
                  <NavDropdown title="Options" className="header-options" as="button">
                  <NavDropdown.Item href="/add-encoder"><i class="bi bi-person-plus"></i>&nbsp;Add Encoders</NavDropdown.Item>
                  {/*<NavDropdown.Item href="/approve-admin">Pending Accounts</NavDropdown.Item>*/}
                  {/*<NavDropdown.Item href="/add-superuser">Admin Page</NavDropdown.Item>*/}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick = {handleLogout}>
                    <i class="bi bi-arrow-left-square"></i>&nbsp;&nbsp;Logout
                  </NavDropdown.Item>
                  </NavDropdown>
              </Col>
            {/*<ul className="header-options"><a href="/add-encoder"> <i className="bi bi-person-plus"></i> Add Encoder </a></ul>*/}

            </Row>           
          </Container>
      </Navbar>
    );

}

export default HeaderLogo