import React, { useState, useEffect } from "react";
import { Container, Card, Nav, Button, Image } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import '../../components/styles/profile.css';

const MyProfile = () => {
    return (
      <Container>
      <Card className="mb-3">
        <Card.Header>
          <Nav className="justify-content-between">
            <Nav.Item>
              <Nav.Link className="link-primary text-decoration-underline d-none">Edit</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
            </Nav.Item>
            <Nav.Item>
              <a href="https://github.com/AndreV96" target="_blank"><FontAwesomeIcon icon={faGithub}  className=" fa-icons"/></a> 
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="text-center">
          <Card.Title>Pamela</Card.Title>
          <Card.Text >
            Hi, I’m Pamela. I recently graduated from a 6-month full-stack web-development bootcamp and I’m looking to collab on interesting ideas in order to expand my portfolio.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <h2 className="text-center mb-3 fw-bold">Projects</h2>

      {/* I don't know how to set a default value without using href as it is seen in documentation */}
      <Nav fill variant="tabs" className="mb-3 fw-bold"  defaultActiveKey="1">
        <Nav.Item>
          <Nav.Link activeKey="1" eventKey="link-1">Posted Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link activeKey="2" eventKey="link-2">Joined Projects</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="projects-div d-flex flex-column align-items-center">
        <Card style={{ width: '18rem' }} className="mb-3">
          <Card.Body className="text-center">
            <Card.Title>Job Tracker App</Card.Title>
            <Card.Subtitle className="mt-1 mb-2 fw-bold">HTML, CSS, JavaScript</Card.Subtitle>
            <Card.Text>
              This is an app that helps the user keep track of their job applica….
            </Card.Text>
            <Button variant="primary">Open</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }} className="mb-3">
          <Card.Body className="text-center">
            <Card.Title>Job Tracker App</Card.Title>
            <Card.Subtitle className="mt-1 mb-2 fw-bold">HTML, CSS, JavaScript</Card.Subtitle>
            <Card.Text>
              This is an app that helps the user keep track of their job applica….
            </Card.Text>
            <Button variant="danger">Closed</Button>
          </Card.Body>
        </Card>
      </div>
      
      </Container>
    )
}

export default MyProfile;