const { AuthenticationError } = require('apollo-server-express');
const { Project, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    projects: async () => {
      return await Project.find({}).populate('members').populate('requests').populate('poster');
    },
    project: async (parent, { projectId }) => {
      return await Project.findOne({ _id: projectId }).populate('members').populate('requests').populate('poster');
    },
    users: async () => {
      return await User.find().populate('posts').populate('joinedProjects');
    },
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId }).populate('posts').populate('joinedProjects');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts').populate('joinedProjects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    search: async (parent, { input }) => {
      const inputArray = input.split(', ');

      return await Project.find({ tags: { $in: [inputArray[0]] } }, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
          return data;
        }
      });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, github, bio, picture, joinedProjects, posts  }) => {
      const user = await User.create({ username, email, password, github, picture, bio, joinedProjects, posts });
      const userId = user._id;
      const userData = { userId, username, email, password, github, bio, joinedProjects, posts  }
      const token = signToken(userData);
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
    addPost: async (parent, { title, tagsString, description, projectImg, repo }, context) => {
      if (context.user) {

        const tags = tagsString.split(', ');

        const me = await User.findOne({ _id: context.user?._id || context.user?.userId});

        const poster = me._id;

        // const date = 'May 5, 2022'

        const project = await Project.create({ title, tags, description, projectImg, repo, poster });

        await User.findOneAndUpdate(
          { _id: me._id },
          { $addToSet: { posts: project._id } },
          {
            new: true,
            runValidators: true,
          }
        );

        return project.populate('poster');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removePost: async (parent, { postId }, context) => {
      if (context.user) {

        const project = await Project.findOneAndDelete({
          _id: postId
        });

        return project;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addMember: async (parent, { userId, projectId }, context) => {
      // if (context.user) {
      const user = await User.findOne({ _id: userId });

      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { members: user._id } },
        {
          new: true,
          runValidators: true,
        }
      ).populate('members');

      await User.findOneAndUpdate(
        { _id: user._id },
        { 
          $addToSet: 
          { 
            joinedProjects: project._id 
          } 
        },
        {
          new: true,
          runValidators: true,
        }
      );

      await Project.findOneAndUpdate(
        { _id: project._id },
        {
          $pull: {
            requests: { _id: user._id }
          }
        },
        {
          new: true,
          runValidators: true,
        }
      );


      return project;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeMember: async (parent, { projectId, userId }, context) => {
      // if (context.user) {

      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        { $pull: { members: userId } },
        {
          new: true,
          runValidators: true,
        }
      );

      return project;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    addRequest: async (parent, { userId, projectId }, context) => {
      // if (context.user) {
      const user = await User.findOne({ _id: userId });

      return Project.findOneAndUpdate(
        { _id: projectId },
        { $addToSet: { requests: user._id, } },
        {
          new: true,
          runValidators: true,
        }
      ).populate('requests');
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeRequest: async (parent, { projectId, userId }, context) => {
      // if (context.user) {

      const project = await Project.findOneAndUpdate(
        { _id: projectId },
        { $pull: { requests: userId } },
        {
          new: true,
          runValidators: true,
        }
      );

      return project;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeProject: async (parent, { userId, projectId }, context) => {
      // if (context.user) {

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { joinedProjects: projectId } },
        {
          new: true,
          runValidators: true,
        }
      );

      return user;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
    editProfile: async (parent, { newUsername, newBio, newImg }, context) => {
      if (context.user) {

        const user = await User.findOneAndUpdate(
          { _id: context.user?._id || context.user?.userId },
          { 
            username: newUsername,
            bio: newBio,
            picture: newImg
          },
          {
            new: true,
            runValidators: true,
          }
        );

        const token = signToken(user);

        return { token, user };
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // setProfilePicture: async (parent, { userId, picture }, context) => {
    //   if (context.user) {

    //   const user = await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { picture: picture},
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );

    //   return user;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    checkUserExist: async (parent, { email }) => {
      const user = await User.findOne({ email });
      const token = signToken(user);
      return { token, user };
  },

  },
};

module.exports = resolvers;