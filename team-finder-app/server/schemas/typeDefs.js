const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Member {
    memberId: String
    picture: String
    username: String
}

type Tag {
    tagId: String
    tagName: String
}

  type Project {
    _id: ID
    title: String
    date: String
    poster: String
    edited: Boolean
    profile: String
    description: String
    projectImg: String
    teamSize: Int
    members: [Member]
    tags: [Tag]
  }

  type Query {
    projects: [Project]
    project(_id: ID!): Project
  }
`;

module.exports = typeDefs;
