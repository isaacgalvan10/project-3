import { Container, Row, Col, Button, Image, ListGroup, Dropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../../components/styles/project.css';
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useGlobalContext } from '../../utils/GlobalState';
import { SHOW_NOTIF, REMOVE_MEMBER, STATUS, SHOW_MODAL_NOTIF, UPDATE_PROJECTS } from '../../utils/actions';
import { Link, useParams } from 'react-router-dom';
import { QUERY_PROJECT } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

const Project = () => {
    const [state, dispatch] = useGlobalContext();
    const { id } = useParams();

    const [currentProject, setCurrentProject] = useState({});

    const { loading, data } = useQuery(QUERY_PROJECT);

    const { projects } = state;

    const projectIndex = projects.findIndex((project) => project._id === id)

    useEffect(() => {
        if (projects.length) {
            setCurrentProject(projects.find((project) => project._id === id));
        } else if (data) {
            dispatch({
                type: UPDATE_PROJECTS,
                projects: data.projects,
            });
        }
    }, [projects, data, loading, dispatch, id]);

    const [isPoster, setPoster] = useState(false);
    // const emptySpots = currentProject.spotsLeft();
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
                payload: {
                    id: memberId,
                    index: projectIndex
                } 
            });

            if (memberId === Auth.getProfile().data._id) {
                dispatch({
                    type: STATUS,
                    status: 'out'
                });
                dispatch({
                    type: SHOW_NOTIF,
                    payload: {
                        text: `${projects[projectIndex].poster[0].username} has kicked you out of their team :(`,
                        route: `/project/${id}`
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
        if (Auth.loggedIn()) {
            if (btnText === 'Ask to Join!') {
                const confirm = await swal({
                    title: "Are you sure you want to join this team?",
                    buttons: ["No", "Yes"],
                });

                if (confirm) {
                    swal({
                        text: `You have sent ${projects[projectIndex].poster[0].username} a request to join their team`,
                    });
                    dispatch({
                        type: SHOW_MODAL_NOTIF,
                        payload: {
                            text: `${Auth.getProfile().data.username} has sent a request to join your team!`,
                            route: `/project/${id}`,
                            index: projectIndex
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
                        text: `You have dropout of ${projects[projectIndex].poster[0].username}'s team`,
                    });
                    dispatch({
                        type: REMOVE_MEMBER,
                        payload: {
                            id: Auth.getProfile().data._id,
                            index: projectIndex
                        }
                    });
                    dispatch({
                        type: STATUS,
                        status: 'out'
                    });
                }
            }
        } else {
            alert('you need to log in to join a team!')
        }
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
            {currentProject ? (
                <>
                    <Button variant="success" onClick={() => switchUser()}>Switch</Button>
                    <Container fluid className='d-flex flex-column align-items-center'>
                        <h1 className='mb-3'>{currentProject.title}</h1>
                        {!isPoster ? (
                            <p>USER SIDE</p>
                        ) : (
                            <p>POSTER SIDE</p>
                        )}
                        <Row className='align-items-center mb-3'>
                            {projects[projectIndex] ? (
                                <Col as={Link} to='/profile'>
                                    <Image src={`../${projects[projectIndex].poster[0].picture}`} alt="user" roundedCircle className='profile-img'></Image>
                                </Col>
                            ) : (
                                <h3>Image dissapears on reload idk why 😠</h3>
                            )}
                            <Col>
                                {projects[projectIndex] ? (
                                    <>
                                        <p>{projects[projectIndex].poster[0].username}</p>
                                        <p>{currentProject.date}</p>
                                    </>

                                ) : (
                                    <h3>all properties that are arrays dissapear 🤔</h3>

                                )}

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
                        {currentProject.projectImg ? (
                            <Image src={`../${currentProject.projectImg}`} alt="project" className='project-img mb-3'></Image>
                        ) : (
                            <h3>WE NEED TO FIX THIS 😩</h3>
                        )}
                        <ListGroup horizontal className='mb-3'>
                            {currentProject.tags ? (
                                <>
                                    {
                                        projects[projectIndex].tags.map((tag, index) => (
                                            <ListGroup.Item key={index}>{tag.tagName}</ListGroup.Item>
                                        ))
                                    }
                                </>
                            ) : (
                                <h3>The tags too 😣</h3>
                            )}
                        </ListGroup>
                        <p>
                            {currentProject.edited ? (
                                <>
                                    <span className='mx-5'><em>edited</em></span>
                                    <br></br>
                                </>
                            ) : (
                                null
                            )}
                            {currentProject.description}
                        </p>
                        <h3>Team Members</h3>
                        {/* {currentProject.spotsLeft().length !== 0
                            ? (
                                <p>{currentProject.spotsLeft().length} Spots left!</p>
                            ) : (
                                null
                            )} */}
                        <Row>
                            {currentProject.members ? (
                                <>
                                {console.log(projects[projectIndex].members)}
                                    {projects[projectIndex].members.map((member) => (
                                        <Col key={member._id}>
                                            <Dropdown>
                                                <Dropdown.Toggle className='dropdown-custom'>
                                                    <Image src={`../${member.picture}`} alt="user" roundedCircle className='profile-img'></Image>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to='/profile'>{member.username}</Dropdown.Item>
                                                    {!isPoster ? (
                                                        null
                                                    ) : (
                                                        <Dropdown.Item onClick={() => removeMember(member._id, member.username)}>Remove from team</Dropdown.Item>
                                                    )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    )
                                    )}
                                </>
                            ) : (
                                <h3>And the team members 😭 (images and arrays)</h3>
                            )}
                            {/* {currentProject.spotsLeft().map((emptySpot) => (
                                <Image key={emptySpot.id} src={`../${emptySpot.pic}`} alt="user" roundedCircle className='profile-img'></Image>
                            ))} */}
                        </Row>
                    </Container>
                </>
            ) : null}
            {loading ? <h3>Loading...</h3> : null}
        </>
    )
}

export default Project;