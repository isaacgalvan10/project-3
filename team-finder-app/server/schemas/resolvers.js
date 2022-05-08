const { AuthenticationError } = require('apollo-server-express');
const { Project, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      projects: async () => {
        return await Project.find({}).populate('poster').populate('members');
      },
      project: async (parent, { projectId }) => {
        return await Project.findOne({ _id: projectId });
      },
      users: async () => {
        return await User.find();
      },
      user: async (parent, { userId }) => {
        return await User.findOne({ _id: userId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },

    Mutation: {
        addUser: async (parent, { username, email, password, github }) => {
            const user = await User.create({ username, email, password, github });
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
