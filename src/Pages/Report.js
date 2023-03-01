import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet.css';
import Nav from 'react-bootstrap/Nav';
import HeaderLogo from '../HeaderLogo.js'
import Widgets from '../Widgets.js'

function Report() {

    return(
        <div className= "dashboard">
          <header>
            <HeaderLogo/>
          </header>
          <br/><br/><br/>
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
          <aside>
            <Widgets/>
            <br/><br/>
          </aside>
          <br/>
          <main>


            <h4 style={{display:'flex', justifyContent: 'center', textAlign: 'center'}}> 
                Still in development. Please come back for future updates.</h4>
             <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

          </main>
        </div>
    );

}

export default Report