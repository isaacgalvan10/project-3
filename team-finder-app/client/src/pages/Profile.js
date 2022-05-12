import React, { useState } from "react";
import { Container, Card, Nav, Button, Image } from "react-bootstrap";
import ProfileProjects from "../components/ProfileProjects";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import '../components/styles/profile.css';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import ProfileCard from '../components/ProfileCard';
import EditProfileForm from '../components/EditProfileForm';

const MyProfile = () => {

  const [displayProjects, setDisplayProjects] = useState();
  const [profileProjectsData, setProfileProjectsData] = useState();

  const { userId } = useParams();
  // const userId = "6279aa574eea1e4d8c95a783"

  const [editMode, setEditMode] = useState(false);

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId },
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.user

  const isMe = () => {
    if (Auth.loggedIn()) {
      return Auth.getProfile().data._id === user._id;
    }
  };
  function clickHandler(e) {
    const id = e.target.id;
    setDisplayProjects(id);
    setProfileProjectsData(user);
    
  }

  function RenderProjects() {
    if(displayProjects) {
      return (
        <div>
          <ProfileProjects 
            displayProjects = {displayProjects}
            setDisplayProjects = {setDisplayProjects}
            profileProjectsData = {profileProjectsData}
            setProfileProjectsData = {setProfileProjectsData}
          />
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }

    return (
      <Container>
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
        {data ?
        <div>
      
      <h2 className="text-center mb-3 fw-bold">Projects</h2>

      {/* <Nav fill variant="tabs" className="mb-3 fw-bold"  defaultActiveKey="1">

    <Container className="main-container"> */}
      

      <Nav fill variant="tabs" className="mb-3 fw-bold"  defaultActiveKey="1">
        <Nav.Item>
          <Nav.Link id="posts" onClick={clickHandler} eventKey="link-1">Posted Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="joinedProjects" onClick={clickHandler} eventKey="link-2">Joined Projects</Nav.Link>
        </Nav.Item>
      </Nav>

      
      <RenderProjects />
      </div>
      : ""}
      
      
      </Container>
    )
}

export default MyProfile;
