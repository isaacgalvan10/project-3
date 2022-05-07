const { Project } = require('../models');

const resolvers = {
    Query: {
      projects: async () => {
        return await Project.find();
      },
      project: async (parent, { _id }) => {
        return await Project.findById(_id);
      },
    },
  };
  
  module.exports = resolvers;