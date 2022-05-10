import {
    Container,
    Row,
    Col,
    Button,
    Image,
    ListGroup,
    Dropdown,
    Card,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../components/styles/project.css';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useGlobalContext } from '../utils/GlobalState';
import {
    SHOW_NOTIF,
    DELETE_MEMBER,
    STATUS,
    SHOW_MODAL_NOTIF,
    UPDATE_PROJECTS,
} from '../utils/actions';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { QUERY_PROJECT } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_POST, ADD_REQUEST, REMOVE_MEMBER, REMOVE_USER_PROJECT } from '../utils/mutations';
import ModalRequests from '../components/ModalRequests';

const Project = () => {
    const { projectId } = useParams();

    const { loading, data } = useQuery(QUERY_PROJECT, {
        variables: { projectId: projectId },
    });

    const [showModal, setShowModal] = useState(false);
    const [state, dispatch] = useGlobalContext();

    const [addRequest] = useMutation(ADD_REQUEST);
    const [removePost] = useMutation(REMOVE_POST);
    const [deleteMember] = useMutation(REMOVE_MEMBER);
    const [removeProject] = useMutation(REMOVE_USER_PROJECT);

    if (loading) {
        return <div>Loading...</div>;
    }

    const project = data.project;

    const isPoster = () => {
        if (Auth.loggedIn()) {
            return Auth.getProfile().data.username === project.poster.username;
        }
    };

    const projectIndex = state.projects.findIndex(
        (project) => project._id === projectId
    );
    // const currentProject = state.projects[projectIndex];

    // const emptySpots = currentProject.spotsLeft();

    // const switchUser = () => {
    //     if (!isPoster) {
    //         setPoster(true);

    //     } else {
    //         setPoster(false);
    //     }
    // };

    const deletePost = async () => {
        try {
            removePost({
                variables: { postId: projectId }
            });

        } catch (e) {
            console.error(e);
            console.log('hi');
        }
    };

    const removeMember = async (memberId, username) => {
        console.log(memberId);
        const confirm = await swal({
            title: `Are you sure you want to remove ${username} from your team?`,
            buttons: ['No', 'Yes'],
        });

        if (confirm) {
            // dispatch({
            //     type: DELETE_MEMBER,
            //     payload: {
            //         id: memberId,
            //         index: projectIndex
            //     }
            // });
            try {
                await deleteMember({
                    variables: {
                        projectId: projectId,
                        memberId: memberId,
                    }
                });

            } catch (e) {
                console.error(e);
                console.log('hi');
            }
            try {
                removeProject({
                    variables: {
                        userId: memberId,
                        projectId: projectId,
                    }
                });

            } catch (e) {
                console.error(e);
            }
        }

            dispatch({
                type: SHOW_NOTIF,
                payload: {
                    text: `${project.poster.username} has kicked you out of their team :(`,
                    route: `/project/${projectId}`,
                },
            });
        }


    const setBtnText = () => {
        if (Auth.loggedIn()) {
            const meInProject = state.me.userProjects.find((project) => project.projectId === projectId);
            console.log(meInProject);
            if (meInProject) {
                return 'Dropout'
            }
            else {
                const meInRequests = project.requests.find((request) => request.userId === state.me._id);
                if (meInRequests) {
                    return 'Pending...'
                } else {
                    return 'Ask to Join!'
                }
            }
        } else {
            return 'Ask to Join!'
        }
    }

    const sendRequest = async (btnText) => {
        if (Auth.loggedIn()) {
            if (btnText === 'Ask to Join!') {
                const confirm = await swal({
                    title: 'Are you sure you want to join this team?',
                    buttons: ['No', 'Yes'],
                });

                if (confirm) {
                    swal({
                        text: `You have sent ${project.poster.username} a request to join their team`,
                    });

                    try {
                        addRequest({
                            variables: {
                                projectId: projectId,
                                picture: Auth.getProfile().data.picture,
                                username: Auth.getProfile().data.username,
                                userId: Auth.getProfile().data._id,
                            },
                        });
                    } catch (e) {
                        console.error(e);
                    }

                    dispatch({
                        type: SHOW_MODAL_NOTIF,
                        payload: {
                            text: `${Auth.getProfile().data.username
                                } has sent a request to join your team!`,
                            route: `/project/${projectId}`,
                            index: projectIndex,
                            projectId: projectId,
                        },
                    });
                    dispatch({
                        type: STATUS,
                        status: 'pending',
                    });
                }
            } else if (btnText === 'Pending...') {
                swal({
                    text: "You've already sent a request to join this team.",
                });
            } else {
                const confirm = await swal({
                    title: 'Are you sure you want to dropout of this team??',
                    buttons: ['No', 'Yes'],
                });
                if (confirm) {
                    swal({
                        text: `You have dropout of ${project.poster.username}'s team`,
                    });
                    // dispatch({
                    //     type: DELETE_MEMBER,
                    //     payload: {
                    //         id: Auth.getProfile().data._id,
                    //         index: projectIndex
                    //     }
                    // });
                    try {
                        await deleteMember({
                            variables: {
                                projectId: projectId,
                                memberId: state.me._id,
                            }
                        });

                    } catch (e) {
                        console.error(e);
                    }
                    try {
                        removeProject({
                            variables: {
                                userId: state.me._id,
                                projectId: projectId,
                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }
                    dispatch({
                        type: STATUS,
                        status: 'out',
                    });
                }
            }
        } else {
            alert('you need to log in to join a team!');
        }
    };

    return (
        <>
            <Container className="main-container d-flex flex-column align-items-start">
                <Row className="align-items-center mb-3">
                    <Col>
                        <h1 className="mb-3">{project.title}</h1>
                        {Auth.loggedIn() && isPoster() ? (
                            <h3>POSTER SIDE</h3>
                        ) : (
                            <h3>{state.me.username} SIDE</h3>
                        )}
                        <div className="d-flex align-items-center">
                            <div>
                                <Link as={Link} to="/profile">
                                    <Image
                                        src={`../${project.poster.picture}`}
                                        alt="user"
                                        roundedCircle
                                        className="profile-img"
                                    ></Image>
                                </Link>
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <p>User: {project.poster.username}</p>
                                <p>Posted on: {project.date}</p>
                            </div>
                        </div>

                        {Auth.loggedIn() && isPoster() ? (
                            <>
                                <Row className="edit-close-delete">
                                    <Button>Edit</Button>
                                    <Button>Close</Button>
                                    <Button onClick={() => deletePost()}>Delete</Button>
                                </Row>
                                <a
                                    href="https://github.com/isaacgalvan10/project-3"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-reset"
                                >
                                    <FontAwesomeIcon icon={faGithub} className="gh-icon" />
                                </a>
                            </>
                        ) : (
                            <Button
                                variant="success"
                                onClick={(e) => sendRequest(e.target.textContent)}
                            >
                                {setBtnText()}
                            </Button>
                        )}
                        {Auth.loggedIn() && isPoster() ? (
                            state.me.status === 'joined' ? (
                                <a
                                    href="https://github.com/isaacgalvan10/project-3"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-reset"
                                >
                                    <FontAwesomeIcon icon={faGithub} className="gh-icon" />
                                </a>
                            ) : null
                        ) : null}
                        {Auth.loggedIn() && isPoster() ? (
                            <Button onClick={() => setShowModal(true)}>View Requests</Button>
                        ) : null}

                        <h3>Team Members</h3>
                        {/* {currentProject.spotsLeft().length !== 0
                            ? (
                                <p>{currentProject.spotsLeft().length} Spots left!</p>
                            ) : (
                                null
                            )} */}
                        <Row className="d-flex">
                            {console.log(project.members)}
                            {project.members.map((member) => (
                                <Col md={2}>
                                    <div
                                        key={member.memberId}
                                        className="d-flex flex-column align-items-center"
                                    >
                                        <Link as={Link} to={`/profile/${member.memberId}`}>
                                            <Image
                                                src={`../${member.picture}`}
                                                alt="user"
                                                roundedCircle
                                                className="sm-profile-img"
                                            ></Image>
                                        </Link>
                                        <p style={{ textAlign: 'center' }}>{member.username}</p>

                                        {Auth.loggedIn() && isPoster() ? (
                                            <Button
                                                onClick={() =>
                                                    removeMember(member.memberId, member.username)
                                                }
                                            >
                                                Remove from team
                                            </Button>
                                        ) : null}
                                    </div>
                                </Col>
                            ))}
                            {/* {currentProject.spotsLeft().map((emptySpot) => (
                                <Image key={emptySpot.id} src={`../${emptySpot.pic}`} alt="user" roundedCircle className='profile-img'></Image>
                            ))} */}
                        </Row>
                    </Col>
                    <Col>
                        <Image
                            src={`../${project.projectImg}`}
                            alt="project"
                            className="project-img mb-3"
                        ></Image>
                        <ListGroup horizontal className="mb-3">
                            {project.tags.map((tag, index) => (
                                <span
                                    key={`${index}${project.title}${project.tags[index]}`}
                                    className="badge rounded-pill"
                                    style={{
                                        marginRight: '10px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                    }}
                                >
                                    {project.tags[index].tagName}
                                </span>
                            ))}
                        </ListGroup>
                        <p>
                            {project.edited ? (
                                <>
                                    <span className="">
                                        <em>edited</em>
                                    </span>
                                    <br></br>
                                </>
                            ) : null}
                            {project.description}
                        </p>
                    </Col>
                </Row>
            </Container>
            {
                Auth.loggedIn() ? (
                    <>
                        <ModalRequests
                            show={showModal}
                            setShowModal={setShowModal}
                            requests={project.requests}
                            projectId={projectId}
                            currentProject={project}
                        />
                    </>
                ) : (
                    null
                )
            }
        </>
    );
};

export default Project;
