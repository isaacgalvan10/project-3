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
    poster: [User]
    edited: Boolean
    description: String
    projectImg: String
    teamSize: Int
    members: [User]
    tags: [Tag]
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
    user(username: String!): User
    me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, github: String): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
