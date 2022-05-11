import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_PROJECTS } from '../utils/actions';
import { SEARCH_TAG } from '../utils/queries';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { useGlobalContext } from '../utils/GlobalState';
import { Link, useParams } from 'react-router-dom';
import '../components/styles/homepage.css';

const SearchResults = (props) => {
  // const [state, dispatch] = useGlobalContext();
  const { input } = useParams();

  const { loading, data } = useQuery(SEARCH_TAG, {
    variables: { input: input },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const projects = data.search;
  // const { loading, data } = useQuery(SEARCH_TAG);

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_PROJECTS,
  //       projects: data.projects,
  //     });
  //   }
  // }, [data, loading, dispatch]);

  return (
    <Container style={{ marginTop: '30px' }} className="main-container">
      {console.log(projects)}
      {projects.length ? (
        <Row>
          <Col
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: '30px' }}
          >
            {projects.map((project, index) => (
              <Card key={`${project}${index}`}>
                {/* {console.log(project)} */}
                <Card.Img variant="top" src={`../${project.projectImg}`} />
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
                    {project.title}
                  </Card.Title>
                  <Card.Text>{`${project.description.substring(
                    0,
                    70
                  )}...`}</Card.Text>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/project/${project._id}`}
                  >
                    View Project
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      ) : (
        <h3>There are no posts yet 😱</h3>
      )}
    </Container>
  );
};

export default SearchResults;
