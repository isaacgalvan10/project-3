import { Container, Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import '../../components/styles/project.css';
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useGlobalContext } from '../../utils/GlobalState';
import { SHOW_NOTIF, ADD_MEMBER, STATUS } from '../../utils/actions';

const Project = () => {
    const [teamFull, setTeamFull] = useState(false);
    const [state, dispatch] = useGlobalContext();

    const teamSize = 4;
    const [teamMembers, setMembers] = useState(['member1', 'member2', 'member3']);

    const setBtnText = () => {
        if (state.me.status === 'out') {
            return 'Ask to Join!'
        } else if (state.me.status === 'pending') {
            return 'Pending...'
        } else {
            return 'Dropout'
        }
    }
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
                dispatch({
                    type: STATUS,
                    status: 'pending'
                });

                const responseInterval = setInterval(() => {
                    dispatch({
                        type: SHOW_NOTIF,
                        payload: {
                            text: 'lernantino has accepted your request, you are part of the team!',
                            route: '/project'
                        }
                    });
                    dispatch({
                        type: ADD_MEMBER,
                        payload: {
                            id: 4,
                            picture: './pamela.jpeg'
                        }
                    });
                    setMembers([...teamMembers, 'member4']);
                    dispatch({
                        type: STATUS,
                        status: 'joined'
                    });
                    clearInterval(responseInterval);
                }, 10000)


                const kickedOut = setInterval(() => {
                    dispatch({
                        type: SHOW_NOTIF,
                        payload: {
                            text: 'lernantino has kicked you out of the team',
                            route: '/project'
                        }
                    });
                    dispatch({
                        type: ADD_MEMBER,
                        payload: {
                            id: 4,
                            picture: './no-profile-picture.jpeg'
                        }
                    });
                    setMembers(['member1', 'member2', 'member3']);
                    dispatch({
                        type: STATUS,
                        status: 'out'
                    });
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
                dispatch({
                    type: ADD_MEMBER,
                    payload: {
                        id: 4,
                        picture: './no-profile-picture.jpeg'
                    }
                });
                setMembers(['member1', 'member2', 'member3']);
                dispatch({
                    type: STATUS,
                    status: 'out'
                });
                setTeamFull(false);
            }
        }

    }

    return (
        <>
            <Container fluid className='d-flex flex-column align-items-center'>
                <h1 className='mb-3'>{state.projects[0].title}</h1>
                <Row className='align-items-center mb-3'>
                    <Image src={state.projects[0].profile} alt="user" roundedCircle className='profile-img'></Image>
                    <Col>
                        <p>{state.projects[0].poster}</p>
                        <p>{state.projects[0].date}</p>
                    </Col>
                    <Button variant="success" onClick={(e) => sendRequest(e.target.textContent)}>{setBtnText()}</Button>
                    {state.me.status === 'joined' ? (
                        <a href='https://github.com/isaacgalvan10/project-3' target='_blank' rel='noreferrer' className='text-reset' ><FontAwesomeIcon icon={faGithub} className="gh-icon" /></a>
                    ) : (
                        null
                    )}
                </Row>
                <Image src={state.projects[0].projectImg} alt="project" className='project-img mb-3'></Image>
                <ListGroup horizontal className='mb-3'>
                    {state.projects[0].technologies.map((tech) => (
                        <ListGroup.Item>{tech}</ListGroup.Item>
                    ))}
                </ListGroup>
                <p>
                    {state.projects[0].edited ? (
                        <>
                            <span className='mx-5'><em>edited</em></span>
                            <br></br>
                        </>
                    ) : (
                        null
                    )}
                    {state.projects[0].description}
                </p>
                <h3>Team Members</h3>
                {!teamFull
                    ? (
                        <p>{spotsLeft()} Spots left!</p>
                    ) : (
                        null
                    )}
                <Row>
                    {state.projects[0].members.map((member) => (
                        <Image src={member.picture} alt="user" roundedCircle className='profile-img'></Image>
                    )
                    )}
                </Row>
            </Container>
        </>
    )
}

export default Project;