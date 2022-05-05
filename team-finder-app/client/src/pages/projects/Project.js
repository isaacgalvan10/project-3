import { Container, Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import '../../components/styles/project.css';
import swal from "sweetalert";
import Notification from '../../components/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Project = () => {
    const [request, setRequest] = useState('Ask to Join!');
    const [userPicture, setPicture] = useState('./no-profile-picture.jpeg');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [teamFull, setTeamFull] = useState(false);
    const [joined, setJoined] = useState(false);

    const teamSize = 4;
    const [teamMembers, setMembers] = useState(['member1', 'member2', 'member3']);

    const spotsLeft = () => {
        const spots = teamSize - teamMembers.length;
        if (spots === 0) {
            setTeamFull(true);
        } 
        
        return spots;
    }

    const sendRequest = async (btnText) => {
        if (btnText === 'Ask to Join!') {
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
                    setText('lernantino has accepted your request, you are part of the team!');
                    setRequest('Dropout');
                    setPicture('./pamela.jpeg');
                    setMembers([...teamMembers, 'member4']);
                    setJoined(true);
                    clearInterval(responseInterval);
                }, 10000)


                const kickedOut = setInterval(() => {
                    setShow(true);
                    setText('lernantino has kicked you out of their team')
                    setRequest('Ask to Join!');
                    setPicture('./no-profile-picture.jpeg');
                    setMembers(['member1', 'member2', 'member3']);
                    setJoined(false);
                    setTeamFull(false);
                    clearInterval(kickedOut);
                }, 25000)
            }
        } else if (btnText === 'Pending...') {
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
                setPicture('./no-profile-picture.jpeg');
                setMembers(['member1', 'member2', 'member3']);
                setJoined(false);
                setTeamFull(false);
            }
        }

    }

    return (
        <>
            <Notification show={show} setShow={setShow} text={text} />
            <Container fluid className='d-flex flex-column align-items-center'>
                <h1 className='mb-3'>Job Tracker App</h1>
                <Row className='align-items-center mb-3'>

                    <Image src="./lernantino.jpeg" alt="user" roundedCircle className='profile-img'></Image>
                    <Col>
                        <p>Lernantino</p>
                        <p>May 5, 2021</p>
                    </Col>
                    <Button variant="success" onClick={(e) => sendRequest(e.target.textContent)}>{request}</Button>
                    {joined ? (
                        <a href='https://github.com/isaacgalvan10/project-3' target='_blank' rel='noreferrer' className='text-reset' ><FontAwesomeIcon icon={faGithub} className="gh-icon" /></a>
                    ) : (
                        null
                    )}
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
                {!teamFull
                    ? (
                        <p>{spotsLeft()} Spots left!</p>
                    ) : (
                        null
                    )}
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
                </Row>
            </Container>
        </>
    )
}

export default Project;