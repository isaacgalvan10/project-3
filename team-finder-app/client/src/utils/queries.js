import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query Projects {
    projects {
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