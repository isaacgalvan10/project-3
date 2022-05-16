import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileProjects = (props) => {
  const projectsSelected = props.profileProjectsData;
  //Continue here

  return (
    <Container className="projects-div d-flex flex-column align-items-center">
      {projectsSelected.length > 0 ? (
        <Row>
          <Col
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: '20px' }}
            >
              {projectsSelected.map((project) => (
                <div key={project._id}>
                  <Card style={{ width: '250px' }}>
                    <Card.Img variant="top" src={project.projectImg} />
                    <Card.Body>
                      {project.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={`${index}${project.title}${project.tags[index]}`}
                          className="badge rounded-pill"
                          style={{
                            marginRight: '10px',
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        >
                          {project.tags[index]}
                        </span>
                      ))}
                      <Card.Title style={{ marginTop: '10px' }}>
                        {project.title}{' '}
                      </Card.Title>
  
                      <Card.Text>
                        {`${project.description.substring(0, 70)}...`}
                      </Card.Text>
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
