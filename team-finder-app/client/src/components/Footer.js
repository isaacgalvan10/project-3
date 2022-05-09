import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <h4 style={{ color: 'white' }}>Popular Tags</h4>
          <Col md>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="badge rounded-pill">HTML</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">CSS</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">Javascript</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">React JS</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="badge rounded-pill">Angular JS</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">Vue JS</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">Python</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">PHP</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="badge rounded-pill">Java</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">C#</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">C+</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">C++</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span className="badge rounded-pill">React Native</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">Flutter</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">Swift</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="badge rounded-pill">TypeScript</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
