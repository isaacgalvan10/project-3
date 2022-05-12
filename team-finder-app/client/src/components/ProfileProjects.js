import React, { useState, useEffect } from "react";
import { Container, Card, Nav, Button, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

const ProfileProjects = (props) => {

  const projectsSelected = props.profileProjectsData[props.displayProjects]
console.log(projectsSelected)
//Continue here

  return (
    <Container className="projects-div d-flex flex-column align-items-center">
      {projectsSelected 
        ? projectsSelected.map((project) => (
        <div key={project.id}>
          <Card style={{ width: '18rem' }} className="mb-3">
            <Card.Img variant="top" src={project.projectImg} />
            <Card.Body className="text-center">
              <Card.Title>{project.title} </Card.Title>
              <Card.Subtitle className="mt-1 mb-2 fw-bold">
                {project.tags.map((tag) => (
                  <p key={tag} >{tag} </p>
                ))}
              </Card.Subtitle>
              <Card.Text>
                {project.description}
              </Card.Text>
              <Button 
                variant="primary"
                as={Link}
                to={`/project/${project._id}`}
                >View Project</Button>
            </Card.Body>
          </Card>
        </div>
      ))
    : ""}
        
    
  </Container> 
  )
  
}

export default ProfileProjects