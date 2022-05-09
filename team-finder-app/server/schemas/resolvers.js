const { AuthenticationError } = require('apollo-server-express');
const { Project, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    projects: async () => {
      return await Project.find({}).populate('members').populate('requests');
    },
    project: async (parent, { projectId }) => {
      return await Project.findOne({ _id: projectId }).populate('members').populate('requests');
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
    // search: async (parent, { input }) => {
    //   const inputArray = input.split(', ');

    //   return await Project.find({ tags: inputArray[0] }, (error, data) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log(data);
    //       return data;
    //     }
    //   });
    // },
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
    addPost: async (parent, { title, tagsString, description, teamSize, projectImg }, context) => {
      if (context.user) {

        const tags = tagsString.split(', ').map((tag, index) => {
          return {
            tagId: index + '00',
            tagName: tag
          }
        });

        const me = await User.findOne({ _id: context.user._id });

        const poster = {
          username: me.username,
          picture: me.picture
        }

        const date = 'May 5, 2022'

        const project = Project.create({ title, tags, description, teamSize, projectImg, poster, date });

        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {

        const thought = await Project.findOneAndDelete({
          _id: postId
        });

        return thought;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addMember: async (parent, { projectId, memberId, username, picture }, context) => {
      // if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              members: { memberId, username, picture },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        ).populate('members');
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    addRequest: async (parent, { userId, username, projectId, picture }, context) => {
      // if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              requests: { userId, username, picture },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        ).populate('requests');
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

  },
};

module.exports = resolvers;
