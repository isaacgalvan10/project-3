import { Container, Row, Col, Button, Image, ListGroup, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import '../../components/styles/project.css';
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useGlobalContext } from '../../utils/GlobalState';
import { SHOW_NOTIF, REMOVE_MEMBER, STATUS, SHOW_MODAL_NOTIF } from '../../utils/actions';
import { Link } from 'react-router-dom';

const Project = () => {
    const [state, dispatch] = useGlobalContext();

    const [isPoster, setPoster] = useState(false);
    const emptySpots = state.projects[0].spotsLeft();
    const myId = state.me.id;

    const switchUser = () => {
        if (!isPoster) {
            setPoster(true);

        } else {
            setPoster(false);
        }
    };

    const removeMember = async (memberId, username) => {
        const confirm = await swal({
            title: `Are you sure you want to remove ${username} from your team?`,
            buttons: ["No", "Yes"],
        });

        if (confirm) {
            dispatch({
                type: REMOVE_MEMBER,
                id: memberId
            });

            if (memberId === myId) {
                dispatch({
                    type: STATUS,
                    status: 'out'
                });
                dispatch({
                    type: SHOW_NOTIF,
                    payload: {
                        text: 'lernantino has kicked you out of their team :(',
                        route: '/project'
                    }
                });
            }
        }

    }

    const setBtnText = () => {
        if (state.me.status === 'out') {
            return 'Ask to Join!'
        } else if (state.me.status === 'pending') {
            return 'Pending...'
        } else {
            return 'Dropout'
        }
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
                    type: SHOW_MODAL_NOTIF,
                    payload: {
                        text: `${state.me.username} has sent a request to join your team!`,
                        route: '/project'
                    }
                });
                dispatch({
                    type: STATUS,
                    status: 'pending'
                });
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
                    type: REMOVE_MEMBER,
                    id: myId
                });
                dispatch({
                    type: STATUS,
                    status: 'out'
                });
            }
        }

    }

    return (
        <>
            <Button variant="success" onClick={() => switchUser()}>Switch</Button>
            <Container fluid className='d-flex flex-column align-items-center'>
                <h1 className='mb-3'>{state.projects[0].title}</h1>
                {!isPoster ? (
                    <p>USER SIDE</p>
                ) : (
                    <p>POSTER SIDE</p>
                )}
                <Row className='align-items-center mb-3'>
                    <Image src={state.projects[0].profile} alt="user" roundedCircle className='profile-img'></Image>
                    <Col>
                        <p>{state.projects[0].poster}</p>
                        <p>{state.projects[0].date}</p>
                    </Col>
                    {!isPoster ? (
                        <Button variant="success" onClick={(e) => sendRequest(e.target.textContent)}>{setBtnText()}</Button>
                    ) : (
                        <>
                            <Row className='edit-close-delete'>
                                <p className='mr-1'>Edit |</p>
                                <p className='mr-1'>Close |</p>
                                <p className='mr-1'>Delete</p>
                            </Row>
                            <a href='https://github.com/isaacgalvan10/project-3' target='_blank' rel='noreferrer' className='text-reset' ><FontAwesomeIcon icon={faGithub} className="gh-icon" /></a>
                        </>
                    )}
                    {!isPoster ? (
                        state.me.status === 'joined' ? (
                            <a href='https://github.com/isaacgalvan10/project-3' target='_blank' rel='noreferrer' className='text-reset' ><FontAwesomeIcon icon={faGithub} className="gh-icon" /></a>
                        ) : (
                            null
                        )
                    ) : (
                        null
                    )}
                </Row>
                <Image src={state.projects[0].projectImg} alt="project" className='project-img mb-3'></Image>
                <ListGroup horizontal className='mb-3'>
                    {state.projects[0].technologies.map((tech) => (
                        <ListGroup.Item key={tech.id}>{tech.techName}</ListGroup.Item>
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
                {emptySpots.length !== 0
                    ? (
                        <p>{emptySpots.length} Spots left!</p>
                    ) : (
                        null
                    )}
                <Row>
                    {state.projects[0].members.map((member) => (
                        <Col key={member.id}>
                            <Dropdown>
                                <Dropdown.Toggle className='dropdown-custom'>
                                    <Image src={member.picture} alt="user" roundedCircle className='profile-img'></Image>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/profile'>{member.username}</Dropdown.Item>
                                    {!isPoster ? (
                                        null
                                    ) : (
                                        <Dropdown.Item onClick={() => removeMember(member.id, member.username)}>Remove from team</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    )
                    )}
                    {emptySpots.map((emptySpot) => (
                        <Image key={emptySpot.id} src={emptySpot.pic} alt="user" roundedCircle className='profile-img'></Image>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Project;