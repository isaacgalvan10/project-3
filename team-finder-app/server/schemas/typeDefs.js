const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Member {
    memberId: String
    picture: String
    username: String
}

type Request {
    userId: String
    username: String
    picture: String
}

type Tag {
    tagId: String
    tagName: String
}

type Poster {
    username: String
    picture: String
}

  type Project {
    _id: ID
    title: String
    date: String
    poster: Poster
    edited: Boolean
    description: String
    projectImg: String
    teamSize: Int
    members: [Member]
    tags: [Tag]
    requests: [Request]
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
  }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, github: String): Auth
        login(email: String!, password: String!): Auth
        addPost(title: String!, tagsString: String!, description: String!, teamSize: Int!, projectImg: String!): Project
        removePost(postId: ID!): Project
        addMember(projectId: ID!, memberId: String!, username: String!, picture: String!): Project
        removeMember(projectId: ID!, memberId: String!): Project
        addRequest(projectId: ID!, username: String!, userId: String!, picture: String!): Project
        removeRequest(projectId: ID!, requestId: String!): Project
    }
`;

module.exports = typeDefs;
