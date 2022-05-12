const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { Project } = require('../models');

const resolvers = {
    Query: {
      projects: async () => {
        return await Project.find();
      },
      project: async (parent, { projectId }) => {
        return await Project.findOne({ _id: projectId });
      },
    },

    Mutation: {
        addUser: async (parent, { username, email, password, github }) => {
            const user = await User.create({ username, email, password, github });
            const token = signToken(user);
            return { token, user };
        },

        checkUserExist: async (parent, { email }) => {
          const user = await User.findOne({ email });
          const token = signToken(user);
          return { token, user };
      },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
            throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
    },
  };

module.exports = resolvers;
