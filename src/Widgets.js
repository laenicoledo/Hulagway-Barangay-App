import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheet.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

{/*for additional features*/}

function Widgets() {

    return(
       <div className="widget">
         <br/>
         <Row> <Button className="btn-widget"> PSA REPORT</Button> </Row>
         <br/><br/>
         <Row> <Button className="btn-widget"> Economic and Agriculture Data </Button> </Row>
         <br/><br/>
         <Row> <Button className="btn-widget"> Living Conditions and Peace&Order</Button> </Row>
         <br/><br/>
         <Row> <Button className="btn-widget"> Community Participation</Button> </Row>
         <br/>
       </div> 

    );

}

export default Widgets