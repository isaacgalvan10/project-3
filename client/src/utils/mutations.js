import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    } 
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $github: String!, $picture: String! ) {
        addUser(username: $username, email: $email, password: $password, github: $github, picture: $picture) {
        token
        user {
            _id
            username
            github
            picture
        }
        }
    }
`;

export const ADD_POST = gql`
mutation AddPost($title: String!, $tagsString: String!, $description: String!, $projectImg: String!, $repo: String!) {
  addPost(title: $title, tagsString: $tagsString, description: $description, projectImg: $projectImg, repo: $repo) {
    _id
    title
    date
    poster {
      username
      picture
    }
    edited
    description
    projectImg
    tags 
  }
}
`;

export const REMOVE_POST = gql`
mutation RemovePost($postId: ID!) {
  removePost(postId: $postId) {
    _id
  }
}
`;

export const ADD_MEMBER = gql`
mutation AddMember($userId: ID!, $projectId: ID!) {
  addMember(userId: $userId, projectId: $projectId) {
    title
    members {
      picture
      username
    }
  }
}
`;

export const REMOVE_MEMBER = gql`
mutation RemoveMember($projectId: ID!, $userId: ID!) {
  removeMember(projectId: $projectId, userId: $userId) {
    _id
    title
    members {
      _id
      username
    }
  }
}
`;

export const ADD_REQUEST = gql`
mutation AddRequest( $userId: ID!, $projectId: ID!) {
  addRequest(projectId: $projectId userId: $userId) {
    _id
    title
    requests {
      username
      picture
    }
  }
}
`;

export const REMOVE_REQUEST = gql`
mutation RemoveRequest($projectId: ID!, $userId: ID!) {
  removeRequest(projectId: $projectId, userId: $userId) {
    _id
    title
    requests {
      _id
      username
    }
  }
}
`;

export const REMOVE_PROJECT = gql`
mutation RemoveProject($userId: ID!, $projectId: ID!) {
  removeProject(userId: $userId, projectId: $projectId) {
    _id
    username
    joinedProjects {
      _id
      title
      tags
      description
    }
  }
}
`;

export const EDIT_PROFILE = gql`
mutation EditProfile($newUsername: String!, $newBio: String, $newImg: String) {
  editProfile(newUsername: $newUsername, newBio: $newBio, newImg: $newImg) {
    token
    user {
      _id
      username
      bio
      picture
    }
  }
}
`;