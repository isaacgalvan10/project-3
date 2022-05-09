const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Member {
    memberId: String
    picture: String
    username: String
  }
  type Project {
    _id: ID
    title: String
    date: String
    poster: [User]
    edited: Boolean
    description: String
    projectImg: String
    teamSize: Int
    members: [User]
    tags: [String]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    github: String
    picture: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    projects: [Project]
    project(projectId: ID!): Project
    users: [User]
    user(userId: ID!): User
    me: User
    search(input: String): [Project]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      github: String
    ): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
