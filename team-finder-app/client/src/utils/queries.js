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
    members {
      memberId
      username
      picture
    }
    tags {
      tagId
      tagName
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
    members {
      memberId
      username
      picture
    }
    tags {
      tagId
      tagName
    }
    requests {
      userId
      username
      picture
    }
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      github
      picture
    }
  }
`;