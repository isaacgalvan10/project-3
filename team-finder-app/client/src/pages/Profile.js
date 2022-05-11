import React, { useState, useEffect } from "react";
import { Container, Card, Nav, Button, Image } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import '../components/styles/profile.css';
import { Link, useParams } from 'react-router-dom';
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";


const MyProfile = () => {

  const { userId } = useParams();
  console.log(userId)
  // const userId = "6279aa574eea1e4d8c95a783"

  const {loading, data} = useQuery(QUERY_USER, {
    variables: {userId: userId},
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.user

  console.log(user)

    return (
      <Container>
        {data ?
        <div>
        <Card className="mb-3 margin-0-auto">
        <Card.Header>
          <Nav className="justify-content-between">
            <Nav.Item>
              <Nav.Link className="link-primary text-decoration-underline d-none">Edit</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Image src={`../${user.picture}`} alt="user" roundedCircle className='profile-img'></Image>
            </Nav.Item>
            <Nav.Item>
              <a href={"https://github.com/" + user.github} target="_blank"><FontAwesomeIcon icon={faGithub}  className=" fa-icons"/></a> 
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="text-center">
          <Card.Title>{user.username} </Card.Title>
          <Card.Text >
            Hi, I’m Pamela. I recently graduated from a 6-month full-stack web-development bootcamp and I’m looking to collab on interesting ideas in order to expand my portfolio.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <h2 className="text-center mb-3 fw-bold">Projects</h2>

      {/* <Nav fill variant="tabs" className="mb-3 fw-bold"  defaultActiveKey="1">
        <Nav.Item>
          <Nav.Link  eventKey="link-1">Posted Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="link-2">Joined Projects</Nav.Link>
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
      </div>  */}
      </div>
      : ""}
      
      
      </Container>
    )
}

export default MyProfile;