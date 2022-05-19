import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import '../components/styles/project.css';
import swal from 'sweetalert';
import { useGlobalContext } from '../utils/GlobalState';
import { DELETE_MEMBER, POST_REQUEST, DELETE_POST, DELETE_PROJECT, SHOW_MODAL } from '../utils/actions';
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { QUERY_PROJECT } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { REMOVE_POST, ADD_REQUEST, REMOVE_MEMBER } from '../utils/mutations';
import ModalRequests from '../components/ModalRequests';

const Project = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { projectId: projectId },
  });

  const [showModal, setShowModal] = useState(false);

  const [state, dispatch] = useGlobalContext();
  const navigate = useNavigate();
  const [addRequest] = useMutation(ADD_REQUEST);
  const [removePost] = useMutation(REMOVE_POST);
  const [removeMember] = useMutation(REMOVE_MEMBER);

  const isPoster = () => {
    if (Auth.loggedIn()) {
      return (Auth.getProfile().data?._id || Auth.getProfile().data?.userId) === project.poster._id;
    }
  };

  const projectIndex = state.projects.findIndex(
    (project) => project._id === projectId
  );

  const project = state?.projects[projectIndex] || data?.project || {};
  const members = project?.members || [];
  const tags = project?.tags || [];
  const posterPicture = project.poster?.picture || 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png';
  const joinedProjects = state?.me?.joinedProjects || [];
  const requests = project?.requests || [];

  if (loading) {
    return <h3>Loading...</h3>;
  }

  const spotsLeft = () => {
    const spots = [];
    console.log(project.teamSize);
    console.log(members.length);
    const spotsQty = project.teamSize - members.length;
    console.log(spotsQty);
    for (let i = 0; i < spotsQty; i++) {
      spots.push({
        id: i
      });
    };
    console.log(spots);
    return spots;
  }

  const deletePost = async () => {
    const confirm = await swal({
      title: 'Are you sure you want to delete your post?',
      buttons: ['No', 'Yes'],
    });

    if (confirm) {
      try {
        await dispatch({
          type: DELETE_POST,
          payload: {
            id: projectId,
          }
        });
        await removePost({
          variables: { postId: projectId }
        });
        await swal({
          title: `Your post has been deleted`,
          button: 'Go to homepage'
        });
      } catch (e) {
        console.error(e);
      }
      if (state.projects.length > 0) {
        navigate(`/`);
      } else {
        window.location.replace('/');
      }
    }
  };

  const deleteMember = async (memberId, username) => {
    const confirm = await swal({
      title: `Are you sure you want to remove ${username} from your team?`,
      buttons: ['No', 'Yes'],
    });

    if (confirm) {
      if (state.projects.length > 0) {
        dispatch({
          type: DELETE_MEMBER,
          payload: {
            id: memberId,
            index: projectIndex
          }
        });
        dispatch({
          type: DELETE_PROJECT,
          projectId: projectId
        });
      }
      try {
        await removeMember({
          variables: {
            projectId: projectId,
            userId: memberId,
          },
        });
      } catch (e) {
        console.error(e);
      }
      // try {
      //   removeProject({
      //     variables: {
      //       userId: memberId,
      //       projectId: projectId,
      //     },
      //   });
      // } catch (e) {
      //   console.error(e);
      // }
    }

    // dispatch({
    //   type: SHOW_NOTIF,
    //   payload: {
    //     text: `${project.poster.username} has kicked you out of their team :(`,
    //     route: `/project/${projectId}`,
    //   },
    // });
  };

  let meInProject;
  let meInRequests;

  if (Auth.loggedIn()) {
    meInProject = joinedProjects.find((project) => project._id === projectId);
    meInRequests = requests.find((request) => request._id === (state?.me?._id || Auth.getProfile().data?.userId));
  }

  const setBtnText = () => {
    if (Auth.loggedIn()) {
      if (meInProject) {
        return 'Dropout';
      } else {
        if (meInRequests) {
          return 'Pending...';
        } else {
          return 'Ask to Join!';
        }
      }
    } else {
      return 'Ask to Join!';
    }
  };

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
          if (state.projects.length > 0) {
            dispatch({
              type: POST_REQUEST,
              payload: {
                _id: Auth.getProfile().data?._id || Auth.getProfile().data?.userId,
                index: projectIndex,
                username: state?.me?.username || Auth.getProfile().data.username,
                picture: state?.me?.picture || 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png'
              }
            });
          }
          try {
            addRequest({
              variables: {
                projectId: projectId,
                userId: state?.me?._id || Auth.getProfile().data?.userId,
              },
            });
          } catch (e) {
            console.error(e);
          }

          // dispatch({
          //   type: SHOW_MODAL_NOTIF,
          //   payload: {
          //     text: `${
          //       Auth.getProfile().data.username
          //     } has sent a request to join your team!`,
          //     route: `/project/${projectId}`,
          //     index: projectIndex,
          //     projectId: projectId,
          //   },
          // });
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
          if (state.projects.length > 0) {
            dispatch({
              type: DELETE_MEMBER,
              payload: {
                id: state.me._id || Auth.getProfile().data._id,
                index: projectIndex
              }
            });
            dispatch({
              type: DELETE_PROJECT,
              projectId: projectId
            });
          }
          try {
            await removeMember({
              variables: {
                projectId: projectId,
                userId: state.me._id,
              },
            });
          } catch (e) {
            console.error(e);
          }
        }
      }
    } else {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          request: false,
          post: false,
          login: true
        },
      });
    }
  };

  return (
    <>
      <Container className="main-container d-flex flex-column align-items-start">
        <Row className=" mb-3 flex-wrap" style={{ width: '100%' }}>
          <Col className="responsive-col">
            <h1 className="mb-3">{project.title}</h1>
            <div className="d-flex align-items-center">
              <div>
                <Link as={Link} to={`/profile/${project.poster._id}`}>
                  <Image
                    src={posterPicture}
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
              <div className="d-flex" style={{ marginTop: '20px' }}>
                <Button
                  onClick={() => deletePost()}
                  className="delete-btn"
                  style={{ marginRight: '10px' }}
                >
                  Delete
                </Button>
                <div style={{ marginRight: '10px' }}>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <Button>Repository</Button>
                  </a>
                </div>
                <Button onClick={() => setShowModal(true)}>
                  View Requests
                </Button>
              </div>
            ) : (
              <>
                <div className="d-flex" style={{ marginTop: '20px' }}>
                  <Button
                    variant="success"
                    onClick={(e) => sendRequest(e.target.textContent)}
                    style={{ marginTop: '20px' }}
                  >
                    {setBtnText()}
                  </Button>
                  {meInProject ? (
                    <div style={{ marginLeft: '10px', marginTop: '20px' }}>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-reset"
                      >
                        <Button>Repository</Button>
                      </a>
                    </div>
                  ) : (
                    null
                  )}
                </div>
              </>
            )}
          </Col>
          <Col className="responsive-col">
            <Image
              src={project.projectImg}
              alt="project"
              className="project-img mb-3"
            ></Image>
            <div className="mb-3">
              <span
                style={{
                  color: 'white',
                  marginRight: '10px',
                  fontSize: '16px',
                }}
              >
                Tags:
              </span>
              {tags.map((tag, index) => (
                <span
                  key={`${index}${project.title}${project.tags[index]}`}
                  className="badge rounded-pill"
                  style={{
                    marginRight: '10px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  {project.tags[index]}
                </span>
              ))}
            </div>

            <p>
              {/* {project.edited ? (
                  <>
                    <span className="">
                      <em>edited</em>
                    </span>
                    <br></br>
                  </>
                ) : null} */}
              {project.description}
            </p>
          </Col>
        </Row>
        <Row className="d-flex">
          <h3>Team Members</h3>
          {spotsLeft().length !== 0
            ? (
              <h4>{spotsLeft().length} Spots left!</h4>
            ) : (
              null
            )}
          {members.map((member) => (
            <Col className="xs-col" xs={2} key={member._id}>
              <div className="d-flex flex-column align-items-center">
                <Link as={Link} to={`/profile/${member._id}`}>
                  <Image
                    src={member.picture}
                    alt={member.username}
                    roundedCircle
                    className="sm-profile-img"
                  ></Image>
                </Link>
                <p style={{ textAlign: 'center' }}>{member.username}</p>

                {Auth.loggedIn() && isPoster() ? (
                  <Button
                    onClick={() => deleteMember(member._id, member.username)}
                    className="delete-btn"
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            </Col>
          ))}
          {spotsLeft().map((emptySpot) => (
            <Col className="xs-col" xs={2} key={emptySpot.id}>
              <div className="d-flex flex-column align-items-center">
                <Image src={`../spot.png`} alt="user" roundedCircle className="sm-profile-img"
                ></Image>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      {
        Auth.loggedIn() ? (
          <>
            <ModalRequests
              show={showModal}
              setShowModal={setShowModal}
              requests={requests}
              projectId={projectId}
              currentProject={project}
              projectIndex={projectIndex}
            />
          </>
        ) : null
      }
    </>
  );
};

export default Project;
