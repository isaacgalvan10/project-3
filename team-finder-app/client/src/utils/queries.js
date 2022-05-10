import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query Projects {
  projects {
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
    closed
    members {
      memberId
      picture
      username
    }
    tags
    requests {
      userId
      username
      picture
      status
    }
  }
}
`;

export const QUERY_PROJECT = gql`
query Project($projectId: ID!) {
  project(projectId: $projectId) {
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
    closed
    members {
      memberId
      picture
      username
    }
    tags
    requests {
      userId
      username
      picture
      status
    }
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
    github
    picture
    bio
    userPosts {
      projectId
      title
      tags
      description
    }
    userProjects {
      projectId
      title
      tags
      description
    }
  }
}
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      password
      github
      picture
  }
}
`;

export const SEARCH_TAG = gql`
query Search($input: String!) {
  search(input: $input) {
    _id
    title
    description
    projectImg
    tags
  }
}
`;
