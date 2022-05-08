import {
  Container,
  Row,
  Col,
  Button,
  Image,
  ListGroup,
  Dropdown,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../../components/styles/project.css';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useGlobalContext } from '../../utils/GlobalState';
import {
  SHOW_NOTIF,
  REMOVE_MEMBER,
  STATUS,
  SHOW_MODAL_NOTIF,
  UPDATE_PROJECTS,
} from '../../utils/actions';
import { Link, useParams } from 'react-router-dom';
import { QUERY_PROJECTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import '../../components/styles/projectPage.css';

const Project = () => {
  const [state, dispatch] = useGlobalContext();
  const { id } = useParams();

  const [currentProject, setCurrentProject] = useState({});

  const { loading, data } = useQuery(QUERY_PROJECTS);

  const { projects } = state;

  const projectIndex = projects.findIndex((project) => project._id === id);
  console.log(projectIndex);
  useEffect(() => {
    if (projects.length) {
      setCurrentProject(projects.find((project) => project._id === id));
      console.log(projects.find((project) => project._id === id));
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
      buttons: ['No', 'Yes'],
    });

    if (confirm) {
      dispatch({
        type: REMOVE_MEMBER,
        id: memberId,
      });

      if (memberId === myId) {
        dispatch({
          type: STATUS,
          status: 'out',
        });
        dispatch({
          type: SHOW_NOTIF,
          payload: {
            text: 'lernantino has kicked you out of their team :(',
            route: `/project/${id}`,
          },
        });
      }
    }
  };

  const setBtnText = () => {
    if (state.me.status === 'out') {
      return 'Ask to Join!';
    } else if (state.me.status === 'pending') {
      return 'Pending...';
    } else {
      return 'Dropout';
    }
  };

  const sendRequest = async (btnText) => {
    if (btnText === 'Ask to Join!') {
      const confirm = await swal({
        title: 'Are you sure you want to join this team?',
        buttons: ['No', 'Yes'],
      });

      if (confirm) {
        swal({
          text: 'You have sent lernantino a request to join their team',
        });
        dispatch({
          type: SHOW_MODAL_NOTIF,
          payload: {
            text: `${state.me.username} has sent a request to join your team!`,
            route: `/project/${id}`,
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
          text: "You have dropout of lernantino's team",
        });
        dispatch({
          type: REMOVE_MEMBER,
          id: myId,
        });
        dispatch({
          type: STATUS,
          status: 'out',
        });
      }
    }
  };

  return (
    <>
      {currentProject ? (
        <>
          <Button variant="success" onClick={() => switchUser()}>
            Switch
          </Button>
          <Container
            fluid
            className="main-container d-flex flex-column align-items-center"
          >
            <h1 className="mb-3">{currentProject.title}</h1>
            {!isPoster ? <p>USER SIDE</p> : <p>POSTER SIDE</p>}
            <Row className="align-items-center mb-3">
              <Image
                src={`../${currentProject.profile}`}
                alt="user"
                className="profile-img"
              ></Image>
              <Col>
                <p>{currentProject.poster}</p>
                <p>{currentProject.date}</p>
              </Col>
              {!isPoster ? (
                <Button
                  variant="success"
                  onClick={(e) => sendRequest(e.target.textContent)}
                >
                  {setBtnText()}
                </Button>
              ) : (
                <>
                  <Row className="edit-close-delete">
                    <p className="mr-1">Edit |</p>
                    <p className="mr-1">Close |</p>
                    <p className="mr-1">Delete</p>
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
              )}
              {!isPoster ? (
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
            </Row>
            <Image
              src={`../${currentProject.projectImg}`}
              alt="project"
              className="project-img mb-3"
            ></Image>
            <ListGroup horizontal className="mb-3">
              {projects[projectIndex].tags.map((tag, index) => (
                <ListGroup.Item key={index}>{tag.tagName}</ListGroup.Item>
              ))}
            </ListGroup>
            <p>
              {currentProject.edited ? (
                <>
                  <span className="mx-5">
                    <em>edited</em>
                  </span>
                  <br></br>
                </>
              ) : null}
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
              {projects[projectIndex].members.map((member) => (
                <Col key={member.id}>
                  <Dropdown>
                    <Dropdown.Toggle className="dropdown-custom">
                      <Image
                        src={`../${member.picture}`}
                        alt="user"
                        roundedCircle
                        className="profile-img"
                      ></Image>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">
                        {member.username}
                      </Dropdown.Item>
                      {!isPoster ? null : (
                        <Dropdown.Item
                          onClick={() =>
                            removeMember(member.id, member.username)
                          }
                        >
                          Remove from team
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              ))}
              {/* {currentProject.spotsLeft().map((emptySpot) => (
                                <Image key={emptySpot.id} src={`../${emptySpot.pic}`} alt="user" roundedCircle className='profile-img'></Image>
                            ))} */}
            </Row>
          </Container>
        </>
      ) : null}
      {loading ? <h3>Loading...</h3> : null}
    </>
  );
};

export default Project;
