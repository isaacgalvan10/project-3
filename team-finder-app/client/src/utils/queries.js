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
    tags {
      tagId
      tagName
    }
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
    tags {
      tagId
      tagName
    }
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
      tagsString
      description
    }
    userProjects {
      projectId
      title
      tagsString
      description
    }
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
