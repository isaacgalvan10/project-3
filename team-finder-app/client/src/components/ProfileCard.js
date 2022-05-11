import { Card, Nav, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useState, useEffect } from 'react';

const ProfileCard = ({ user }) => {
    return (
        <Card className="mb-3">
            <Card.Header>
                <Nav className="justify-content-between">
                    <Nav.Item>
                        <Nav.Link className="link-primary text-decoration-underline d-none">Edit</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Image src={`../${user.picture}`} alt="user" roundedCircle className='profile-img'></Image>
                    </Nav.Item>
                    <Nav.Item>
                        <a href={"https://github.com/" + user.github} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} className=" fa-icons" /></a>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body className="text-center">
                <Card.Title>{user.username} </Card.Title>
                <Card.Text >
                    {user.bio}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default ProfileCard;

