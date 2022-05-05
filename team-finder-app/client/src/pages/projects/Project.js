import { Container, Row, Col, Button, Image, ListGroup, Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import '../../components/styles/project.css';
import swal from "sweetalert";


const Project = () => {
    const [request, setRequest] = useState('Ask to Join!');
    const [userPicture, setPicture] = useState('./no-profile-picture.jpeg');
    const [show, setShow] = useState(false);

    const sendRequest = async (status) => {
        console.log(status);
        if (status === 'Ask to Join!') {
            const confirm = await swal({
                title: "Are you sure you want to join this team?",
                buttons: ["No", "Yes"],
            });

            if (confirm) {
                swal({
                    text: "You have sent lernantino a request to join their team",
                });
                setRequest('Pending...');

                const responseInterval = setInterval(() => {
                    setShow(true);
                    setRequest('Dropout');
                    setPicture('./pamela.jpeg')
                    clearInterval(responseInterval);
                }, 5000)
            }
        } else if (status === 'Pending...') {
            swal({
                text: "You've already sent a request to join this team.",
            });
        } else {
            const confirm = await swal({
                title: "Are you sure you want to dropout of this team??",
                buttons: ["No", "Yes"],
            });

            if (confirm) {
                swal({
                    text: "You have dropout of lernantino's team",
                });
                setRequest('Ask to Join!');
                setPicture('./no-profile-picture.jpeg')
            }

        }

    }

    return (
        <>
            <ToastContainer position="top-end">
                <Toast onClose={() => setShow(false)} show={show} delay={7000} autohide>
                    <Toast.Body>lernantino has accepted your request, you are part of the team!</Toast.Body>
                </Toast>
            </ToastContainer>

            <Container fluid className='d-flex flex-column align-items-center'>
                <h1 className='mb-3'>Job Tracker App</h1>
                <Row className='align-items-center mb-3'>

                    <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                    <Col>
                        <p>Lernantino</p>
                        <p>May 5, 2021</p>
                    </Col>
                    <Button variant="success" onClick={(e) => sendRequest(e.target.textContent)}>{request}</Button>
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
                        <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                    </Col>
                    <Col>
                        <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                    </Col>
                    <Col>
                        <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                    </Col>
                    <Col>
                        <Image src={userPicture} alt="empty" roundedCircle className='profile-img'></Image>
                    </Col>
                    <Col>
                        <Image src="./no-profile-picture.jpeg" alt="empty" roundedCircle className='profile-img'></Image>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Project;