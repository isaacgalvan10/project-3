import React, { useState } from "react";
import { Container, Card, Nav, Button } from "react-bootstrap";
import '../components/styles/profile.css';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import ProfileCard from '../components/ProfileCard';
import EditProfileForm from '../components/EditProfileForm';

const MyProfile = () => {

  const { userId } = useParams();

  const [editMode, setEditMode] = useState(false);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId },
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.user || "";

  const isMe = () => {
    if (Auth.loggedIn()) {
      return Auth.getProfile().data._id === user._id;
    }
  };

  return (

    <Container className="main-container">
      {Auth.loggedIn() && isMe() && !editMode ? (
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      ) : (
        null
      )}
      {!editMode ? (
        <ProfileCard user={user} />
      ) : (
        <EditProfileForm user={user} setEditMode={setEditMode} />
      )}
      <h2 className="text-center mb-3 fw-bold">Projects</h2>

      {/* I don't know how to set a default value without using href as it is seen in documentation */}
      <Nav fill variant="tabs" className="mb-3 fw-bold" defaultActiveKey="1">
        <Nav.Item>
          <Nav.Link eventKey="link-1">Posted Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Joined Projects</Nav.Link>
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