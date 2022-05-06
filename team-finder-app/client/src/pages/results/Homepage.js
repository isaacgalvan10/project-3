import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useGlobalContext } from '../../utils/GlobalState';
import '../../components/styles/homepage.css';

const Homepage = () => {
  const [state, dispatch] = useGlobalContext();
  return (
    <Container style={{ marginTop: '30px' }}>
      <Row>
        <Col
          className="d-flex flex-wrap justify-content-center"
          style={{ gap: '30px' }}
        >
          {state.projects.map((project) => (
            <Card key={project}>
              <Card.Img variant="top" src={project.projectImg} />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{`${project.description.substring(
                  0,
                  70
                )}...`}</Card.Text>
                <Button variant="primary" href="/project">
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
