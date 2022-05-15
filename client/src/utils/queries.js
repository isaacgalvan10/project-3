import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query Projects {
  projects {
    _id
    title
    date
    poster {
      _id
      username
      picture
    }
    description
    projectImg
    members {
      _id
      username
      picture
    }
    tags
    requests {
      _id
      username
      picture
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
      _id
      username
      picture
    }
    repo
    edited
    description
    projectImg
    closed
    members {
      _id
      username
      picture
    }
    tags
    requests {
      _id
      username
      picture
    }
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    github
    picture
    bio
    posts {
      _id
      title
      repo
      description
    }
    joinedProjects {
      _id
      title
      repo
      description
    }
  }
} 
`;

export const QUERY_USER = gql`
query User($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    email
    github
    picture
    bio
    posts {
      _id
      title
      date
      repo
      description
      projectImg
      closed
      members {
        _id
        username
        email
        github
        picture
        bio
      }
      tags
      requests {
        _id
        username
        picture
      }
    }
    joinedProjects {
      _id
      title
      date
      repo
      edited
      description
      projectImg
      closed
      tags
    }
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
