import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_PROJECTS } from '../../utils/actions';
import { QUERY_PROJECTS } from '../../utils/queries';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useGlobalContext } from '../../utils/GlobalState';
import { Link } from 'react-router-dom';
import '../../components/styles/homepage.css';

const Homepage = () => {
  const [state, dispatch] = useGlobalContext();

  const { loading, data } = useQuery(QUERY_PROJECTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PROJECTS,
        projects: data.projects,
      });
    } 
  }, [data, loading, dispatch]);

  return (
    <Container style={{ marginTop: '30px' }} className="main-container">
      {state.projects.length ? (
              <Row>
              <Col
                className="d-flex flex-wrap justify-content-center"
                style={{ gap: '30px' }}
              >
                {state.projects.map((project, index) => (
                  <Card key={`${project}${index}`}>
                    {console.log(project)}
                    <Card.Img variant="top" src={`./${project.projectImg}`} />
                    <Card.Body>
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={`${index}${project.title}${tag.tagName}`}
                          className="badge rounded-pill"
                          style={{
                            marginRight: '10px',
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        >
                          {tag.tagName}
                        </span>
                      ))}
                      <Card.Title style={{ marginTop: '10px' }}>
                        {project.title}
                      </Card.Title>
                      <Card.Text>{`${project.description.substring(
                        0,
                        70
                      )}...`}</Card.Text>
                      <Button variant="primary" as={Link} to={`/project/${project._id}`}>
                        View Project
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
      ) : (
        <h1>{loading}</h1>
      )}
    </Container>
  );
};

export default Homepage;
