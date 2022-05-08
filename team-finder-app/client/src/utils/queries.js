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
      email
      password
      github
      picture
    }
    edited
    description
    projectImg
    teamSize
    members {
      _id
      username
      email
      password
      github
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
      poster
      edited
      profile
      description
      projectImg
      teamSize
      members {
        memberId
        picture
        username
      }
      tags {
        tagId
        tagName
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