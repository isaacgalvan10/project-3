import { Container, Row, Col, Image, ListGroup, Dropdown } from 'react-bootstrap';
import '../../components/styles/project.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const MyProject = () => {
    return (
        <Container fluid className='d-flex flex-column align-items-center'>
            <h1 className='mb-3'>Job Tracker App</h1>
            <Row className='align-items-center mb-3'>

                <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                <Col>
                    <p>Lernantino</p>
                    <p>May 5, 2021</p>
                </Col>
                <Row className='edit-close-delete'>
                    <p className='mr-1'>Edit |</p>
                    <p className='mr-1'>Close |</p>
                    <p className='mr-1'>Delete</p>
                </Row>
                <FontAwesomeIcon icon={faGithub} className="gh-icon" />
            </Row>
            <Image src="./project.png" alt="project" className='project-img mb-3'></Image>
            <ListGroup horizontal className='mb-3'>
                <ListGroup.Item>HTML</ListGroup.Item>
                <ListGroup.Item>CSS</ListGroup.Item>
                <ListGroup.Item>JavaScript</ListGroup.Item>
            </ListGroup>
            <p>
                <span className='mx-5'><em>This post has been edited</em></span>
                <br></br>
                This is an app that helps the user keep track of their job applications and reminds them what jobs they have applied to and update the status on their job applications and will remind them to follow up after a interview.

                I’m looking for a team of 5 with basic HTML, CSS, and JAVASCRIPT knowledge.
                <br></br>
                Edit
                <br></br>
                We have two spots left! Preferably good with CSS.
            </p>
            <h3>Team Members</h3>
            <p>2 Spots left!</p>
            <Row>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-custom'>
                            <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Remove from team</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-custom'>
                            <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Remove from team</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-custom'>
                            <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Remove from team</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>                </Col>
                <Col>
                    <Image src="./no-profile-picture.jpeg" alt="empty" roundedCircle className='profile-img'></Image>
                </Col>
                <Col>
                    <Image src="./no-profile-picture.jpeg" alt="empty" roundedCircle className='profile-img'></Image>
                </Col>
            </Row>
        </Container>
    )
}

export default MyProject;