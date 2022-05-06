import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../../components/styles/homepage.css';

const Homepage = () => {
  return (
    <Container style={{ marginTop: '30px' }}>
      <Row>
        <Col
          className="d-flex flex-wrap justify-content-center"
          style={{ gap: '30px' }}
        >
          <Card>
            <Card.Img variant="top" src="./project.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" href="/project">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="./project.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" href="/project">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="./project.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" href="/project">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="./project.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" href="/project">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="./project.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" href="/project">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="./project.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary" href="/project">
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
