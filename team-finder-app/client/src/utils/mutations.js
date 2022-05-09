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
    mutation addUser($username: String!, $email: String!, $password: String!, $github: String! ) {
        addUser(username: $username, email: $email, password: $password, github: $github) {
        token
        user {
            _id
            username
            github
        }
        }
    }
`;

export const ADD_POST = gql`
mutation AddPost($title: String!, $tagsString: String!, $description: String!, $teamSize: Int!, $projectImg: String!) {
  addPost(title: $title, tagsString: $tagsString, description: $description, teamSize: $teamSize, projectImg: $projectImg) {
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
    teamSize
    tags {
      tagId
      tagName
    }
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
mutation AddMember($projectId: ID!, $username: String!, $picture: String!, $memberId: String!) {
  addMember(projectId: $projectId, username: $username, picture: $picture, memberId: $memberId) {
    title
    members {
      memberId
      picture
      username
    }
  }
}
`;

export const REMOVE_MEMBER = gql`
mutation RemoveMember($projectId: ID!, $memberId: String!) {
  removeMember(projectId: $projectId, memberId: $memberId) {
    _id
    title
    members {
      memberId
      username
    }
  }
}
`;

export const ADD_REQUEST = gql`
mutation Mutation($projectId: ID!, $username: String!, $userId: String!, $picture: String!) {
  addRequest(projectId: $projectId, username: $username, userId: $userId, picture: $picture) {
    requests {
      userId
      username
      picture
    }
  }
}
`;

export const REMOVE_REQUEST = gql`
mutation RemoveRequest($projectId: ID!, $requestId: String!) {
  removeRequest(projectId: $projectId, requestId: $requestId) {
    _id
    title
    requests {
      userId
      username
    }
  }
}
`;