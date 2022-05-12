import React, { useState, useEffect } from 'react';
import { Container, Card, Nav, Button, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileProjects = (props) => {
  const projectsSelected = props.profileProjectsData[props.displayProjects];
  //Continue here

  return (
    <Container className="projects-div d-flex flex-column align-items-center">
      {projectsSelected.length > 0 ? (
        <Row>
          <Col
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: '30px' }}
          >
            {projectsSelected.map((project) => (
              <div key={project._id}>
                <Card style={{ width: '18rem' }} className="mb-3">
                  <Card.Img variant="top" src={project.projectImg} />
                  <Card.Body className="text-center">
                    <Card.Title>{project.title} </Card.Title>
                    <Card.Subtitle className="mt-1 mb-2 fw-bold">
                      {project.tags.map((tag) => (
                        <p key={tag}>{tag} </p>
                      ))}
                    </Card.Subtitle>
                    <Card.Text>{project.description}</Card.Text>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/project/${project._id}`}
                    >
                      View Project
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      ) : (
        <h2>No projects</h2>
      )}
    </Container>
  );
};

export default ProfileProjects;
