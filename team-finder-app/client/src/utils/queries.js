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

// export const SEARCH_TAG = gql`
//   query Query($input: String) {
//     search(input: $input) {
//       _id
//       title
//       date
//       edited
//       description
//       projectImg
//       teamSize
//       tags
//     }
//   }
// `;
